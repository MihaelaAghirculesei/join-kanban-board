// Verifies firestore.rules against the local Firestore emulator.
import { readFileSync } from 'node:fs';
import { initializeTestEnvironment, assertSucceeds, assertFails } from '@firebase/rules-unit-testing';
import {
  doc, getDoc, setDoc, updateDoc, deleteDoc, addDoc, collection, getDocs, query, where, limit, orderBy,
} from 'firebase/firestore';

const env = await initializeTestEnvironment({
  projectId: 'demo-join-rules',
  firestore: { rules: readFileSync(new URL('../firestore.rules', import.meta.url), 'utf8'), host: '127.0.0.1', port: 8080 },
});

await env.withSecurityRulesDisabled(async (ctx) => {
  const db = ctx.firestore();
  await setDoc(doc(db, 'tasks/t1'), { title: 'Task', priority: 'Low' });
  await setDoc(doc(db, 'contacts/c1'), { name: 'Anna', email: 'anna@example.com' });
  await setDoc(doc(db, 'users/alice'), { username: 'alice', email: 'alice@example.com' });
  await setDoc(doc(db, 'users/bob'), { username: 'bob', email: 'bob@example.com' });
  await setDoc(doc(db, 'secrets/x'), { value: 1 });
});

const anon = env.unauthenticatedContext().firestore();
const alice = env.authenticatedContext('alice').firestore();

const cases = [
  // anonymous visitors
  ['anon cannot read tasks', () => assertFails(getDocs(collection(anon, 'tasks')))],
  ['anon cannot read contacts', () => assertFails(getDocs(query(collection(anon, 'contacts'), orderBy('name'))))],
  ['anon cannot write tasks', () => assertFails(addDoc(collection(anon, 'tasks'), { title: 'x' }))],
  ['anon cannot list all users', () => assertFails(getDocs(collection(anon, 'users')))],
  ['anon cannot get a user profile', () => assertFails(getDoc(doc(anon, 'users/alice')))],
  ['anon can look up one username (login)', () =>
    assertSucceeds(getDocs(query(collection(anon, 'users'), where('username', '==', 'alice'), limit(1))))],
  ['anon cannot look up two profiles', () =>
    assertFails(getDocs(query(collection(anon, 'users'), where('username', '==', 'alice'), limit(2))))],
  // signed-in users
  ['user reads tasks ordered by priority', () => assertSucceeds(getDocs(query(collection(alice, 'tasks'), orderBy('priority'))))],
  ['user creates, updates and deletes a task', async () => {
    const ref = await assertSucceeds(addDoc(collection(alice, 'tasks'), { title: 'New' }));
    await assertSucceeds(updateDoc(ref, { title: 'Edited' }));
    await assertSucceeds(deleteDoc(ref));
  }],
  ['user reads and writes contacts', async () => {
    await assertSucceeds(getDocs(query(collection(alice, 'contacts'), where('email', '==', 'anna@example.com'), limit(1))));
    await assertSucceeds(addDoc(collection(alice, 'contacts'), { name: 'Ben', email: 'ben@example.com' }));
  }],
  ['user reads own profile', () => assertSucceeds(getDoc(doc(alice, 'users/alice')))],
  ['user cannot read another profile', () => assertFails(getDoc(doc(alice, 'users/bob')))],
  ['user creates own profile (sign-up)', () =>
    assertSucceeds(setDoc(doc(env.authenticatedContext('carol').firestore(), 'users/carol'), { username: 'carol', email: 'carol@example.com' }))],
  ['user cannot write another profile', () => assertFails(setDoc(doc(alice, 'users/bob'), { username: 'x', email: 'x@example.com' }))],
  ['profile cannot contain extra fields', () => assertFails(updateDoc(doc(alice, 'users/alice'), { role: 'admin' }))],
  ['profile cannot be deleted', () => assertFails(deleteDoc(doc(alice, 'users/alice')))],
  ['other collections are closed', () => assertFails(getDoc(doc(alice, 'secrets/x')))],
];

let failed = 0;
for (const [name, run] of cases) {
  try { await run(); console.log(`PASS  ${name}`); }
  catch (e) { failed++; console.log(`FAIL  ${name}: ${e.message.split('\n')[0]}`); }
}
await env.cleanup();
console.log(`\n${cases.length - failed}/${cases.length} rule checks passed`);
process.exit(failed ? 1 : 0);
