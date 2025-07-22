# 🚀 Join - Advanced Project Management Kanban Board

<div align="center">

![Join Logo](./src/assets/icon/join-logo-sidebar.png)

**A modern, collaborative project management and task organization platform built with Angular and Firebase**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-View_Project-success?style=for-the-badge)](https://join-1-46a2d.web.app)
[![Angular](https://img.shields.io/badge/Angular-17+-DD0031?style=for-the-badge&logo=angular)](https://angular.io/)
[![Firebase](https://img.shields.io/badge/Firebase-11.6+-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2+-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

[🎯 Project Overview](#-project-overview) • [✨ Features](#-features) • [🛠️ Tech Stack](#️-tech-stack) • [🚀 Installation](#-installation) • [📖 Usage](#-usage)

</div>

---

## 🎯 **Project Overview**

**Join** is a comprehensive project management platform designed to streamline team collaboration and task organization. Built with cutting-edge Angular 17 and Firebase integration, it offers real-time synchronization, intuitive Kanban boards, and powerful project management tools that scale with your team's needs.

### 🌟 **What Makes This Special**

- **⚡ Real-Time Collaboration** - Instant updates across all team members
- **🔥 Firebase Integration** - Scalable cloud backend with real-time database
- **📱 Responsive Design** - Perfect experience on desktop, tablet, and mobile
- **🎨 Modern Angular 17** - Latest features with standalone components
- **🔐 Secure Authentication** - Firebase Auth with role-based access control
- **🏗️ Enterprise Architecture** - Scalable, maintainable, and testable codebase

---

## ✨ **Features**

<table>
<tr>
<td width="50%">

### 🎯 **Core Features**
- ✅ **Kanban Board System** - Intuitive drag-and-drop task management
- ✅ **Real-Time Sync** - Instant updates across all devices
- ✅ **Team Collaboration** - Multi-user project sharing
- ✅ **Task Management** - Detailed task creation and tracking
- ✅ **Contact Management** - Team member profiles and assignment
- ✅ **Dashboard Analytics** - Project overview and statistics
- ✅ **Priority Management** - Color-coded task prioritization

</td>
<td width="50%">

### 🔧 **Advanced Features**
- ✅ **Firebase Authentication** - Secure user management
- ✅ **Cloud Storage** - Persistent data with automatic backup
- ✅ **Responsive UI** - Optimized for all screen sizes
- ✅ **PWA Ready** - Progressive Web App capabilities
- ✅ **Dark/Light Theme** - Customizable user experience
- ✅ **Search & Filter** - Quick task and project discovery
- ✅ **Legal Compliance** - Privacy policy and legal notices

</td>
</tr>
</table>

---

## 🛠️ **Tech Stack**

<div align="center">

| Frontend | Backend & Database | Development Tools | Deployment |
|----------|-------------------|-------------------|------------|
| ![Angular](https://img.shields.io/badge/Angular-17+-DD0031?style=flat&logo=angular&logoColor=white) | ![Firebase](https://img.shields.io/badge/Firebase-17+-FFCA28?style=flat&logo=firebase&logoColor=black) | ![TypeScript](https://img.shields.io/badge/TypeScript-5.2+-3178C6?style=flat&logo=typescript&logoColor=white) | ![Firebase Hosting](https://img.shields.io/badge/Firebase_Hosting-FFCA28?style=flat&logo=firebase&logoColor=black) |
| ![Angular Material](https://img.shields.io/badge/Angular_Material-UI_Components-607D8B?style=flat) | ![Firestore](https://img.shields.io/badge/Firestore-NoSQL_Database-FFCA28?style=flat&logo=firebase) | ![Angular CLI](https://img.shields.io/badge/Angular_CLI-17.0+-DD0031?style=flat&logo=angular) | ![Responsive](https://img.shields.io/badge/Responsive-Mobile_First-06B6D4?style=flat) |
| ![RxJS](https://img.shields.io/badge/RxJS-7.8+-B7178C?style=flat&logo=reactivex&logoColor=white) | ![Firebase Auth](https://img.shields.io/badge/Firebase_Auth-Authentication-FFCA28?style=flat&logo=firebase) | ![Karma + Jasmine](https://img.shields.io/badge/Testing-Karma_+_Jasmine-green?style=flat) | ![Angular CDK](https://img.shields.io/badge/Angular_CDK-Drag_&_Drop-DD0031?style=flat) |

</div>

---

## 🚀 **Installation**

### 🔥 **Quick Start**

```bash
# Clone the repository
git clone https://github.com/MihaelaAghirculesei/join-kanban-board.git

# Navigate to project directory
cd join-kanban-board

# Install dependencies
npm install

# Start development server
npm start
# Open http://localhost:4200 in your browser
```

### 🌍 **Environment Configuration**

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  firebase: {
    apiKey: "your-firebase-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.firebasestorage.app",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id",
    measurementId: "your-measurement-id"
  }
};
```

> 💡 **Nota**: Sostituisci i placeholder con le tue credenziali Firebase reali ottenute dalla Firebase Console

### 📦 **Development Scripts**

```bash
# Start development server
npm start

# Build for production
npm run build

# Build and watch for changes
npm run watch

# Run unit tests
npm test

# Angular CLI commands
ng generate component your-component-name
ng generate service your-service-name
```

---

## 📖 **Usage**

### 🚀 **Getting Started**

1. **🌐 Landing Page**: Welcome page with project overview
2. **📝 Sign Up**: Create your account with email/password
3. **🔐 Login**: Access your workspace
4. **📊 Summary Dashboard**: View project overview and statistics
5. **🎯 Start Managing**: Create tasks, contacts, and organize your workflow

### 🔑 **Core Features**

| Feature | Description | Location |
|---------|-------------|----------|
| **📋 Task Management** | Create, edit, and track tasks | Board & Add Task |
| **👥 Contact Management** | Manage team members and contacts | Contact List |
| **📊 Kanban Board** | Visual task organization with drag & drop | Board |
| **📈 Dashboard** | Project summary and analytics | Summary |
| **🔐 Authentication** | Secure login/signup system | Login/Signup |
| **📱 Responsive Design** | Works on desktop, tablet, and mobile | All Pages |

### 🎯 **Main Workflow**

#### **Task Management:**
- **Create Tasks**: Use "Add Task" to create new tasks with priorities and due dates
- **Organize Tasks**: Drag and drop tasks between columns on the Kanban board
- **Track Progress**: View task status and completion in the board view
- **Edit Tasks**: Click on any task to modify details

#### **Contact Management:**
- **Add Contacts**: Create new team member profiles
- **Contact List**: View all team members and their details
- **Assign Tasks**: Link contacts to specific tasks for accountability

#### **Dashboard:**
- **Summary View**: Get overview of all projects and task statistics
- **Quick Actions**: Access frequently used features from the main dashboard

### 📱 **Navigation Structure**

```
├── 🏠 Landing Page (Welcome)
├── 🔐 Authentication (Login/Signup)
├── 📊 Main Content
│   ├── 📈 Summary Dashboard
│   ├── 📋 Kanban Board
│   ├── ➕ Add Task
│   ├── 👥 Contacts
│   │   ├── 📝 Add Contact
│   │   ├── 📋 Contact List
│   │   └── 👤 Single Contact View
├── ❓ Help & Support
├── ⚖️ Legal Notice
└── 🔒 Privacy Policy
```

---

## 🔥 **Firebase Setup**

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Deploy to Firebase Hosting
npm run build
firebase deploy
```
---

## 🔥 **Firebase Integration**

### 🗃️ **Database Structure**

```typescript
// Firestore Collections
interface Task {
 id: string;
 title: string;
 description: string;
 dueDate: Timestamp;
 priority: 'urgent' | 'medium' | 'low';
 assignedTo: string[];
 category: 'User Story' | 'Technical Task' | 'Design'; 
 status: 'todo' | 'in-progress' | 'await-feedback' | 'done';  
 subtasks: SubTask[]; 
 createdAt: Timestamp;
 updatedAt: Timestamp;
 createdBy: string;
}

interface SubTask {
 id: string;
 title: string;
 completed: boolean;
 createdAt: Timestamp;
}

interface Contact {
 id: string;
 name: string;
 email: string;
 phone?: string;
 initials: string;
 color: string;  
 createdAt: Timestamp;
 createdBy: string;
}

interface User {
 uid: string;
 email: string;
 displayName: string;
 photoURL?: string;
 createdAt: Timestamp;
}

interface BoardColumn {
 id: string;
 title: 'To do' | 'In progress' | 'Await feedback' | 'Done';
 order: number;
 tasks: string[];
}
```

### 🔐 **Authentication Flow**

```typescript
// Authentication Service
@Injectable({
 providedIn: 'root'
})
export class AuthService {
 constructor(
   private afAuth: AngularFireAuth,
   private firestore: AngularFirestore,
   private router: Router
 ) {}

 async signIn(email: string, password: string): Promise<UserCredential> {
   try {
     return await this.afAuth.signInWithEmailAndPassword(email, password);
   } catch (error: any) {
     throw new Error(this.getErrorMessage(error.code));
   }
 }

 async signUp(email: string, password: string, displayName?: string): Promise<UserCredential> {
   try {
     const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
     
     if (displayName && credential.user) {
       await credential.user.updateProfile({ displayName });
       await this.createUserDocument(credential.user);
     }
     
     return credential;
   } catch (error: any) {
     throw new Error(this.getErrorMessage(error.code));
   }
 }

 getCurrentUser(): Observable<User | null> {
   return this.afAuth.authState;
 }

 async signOut(): Promise<void> {
   await this.afAuth.signOut();
   this.router.navigate(['/login']);
 }

 isAuthenticated(): Observable<boolean> {
   return this.afAuth.authState.pipe(map(user => !!user));
 }

 async resetPassword(email: string): Promise<void> {
   return await this.afAuth.sendPasswordResetEmail(email);
 }

 private async createUserDocument(user: User): Promise<void> {
   const userData = {
     uid: user.uid,
     email: user.email,
     displayName: user.displayName,
     joinedProjects: [],
     createdAt: new Date()
   };
   await this.firestore.doc(`users/${user.uid}`).set(userData, { merge: true });
 }

 private getErrorMessage(code: string): string {
   const errors: { [key: string]: string } = {
     'auth/user-not-found': 'User not found',
     'auth/wrong-password': 'Incorrect password',
     'auth/email-already-in-use': 'Email already registered',
     'auth/weak-password': 'Password too weak',
     'auth/invalid-email': 'Invalid email'
   };
   return errors[code] || 'Authentication error';
 }
}

---

## 📖 **Usage**

### 🏠 **Getting Started**

1. **🔐 Landing Page** - Sign up with email or login to access your workspace
2. **📊 Summary Dashboard** - Overview of tasks, deadlines, and team activity
3. **➕ Add Task** - Create tasks with title, description, priority, and assignees
4. **📋 Board (Kanban)** - Visualize workflow with "To Do", "In Progress", "Await Feedback", "Done"
5. **👥 Contacts** - Add and manage team members for task assignments
6. **📝 Task Details** - Click any task to edit, update status, or add comments

### 🎯 **Key Workflows**

#### 🆕 Creating a New Task
```typescript
// Step-by-step task creation
1. Click "Add Task" in the main navigation
2. Fill required fields:
  - Task title and description
  - Select assignee from contacts
  - Choose priority level (High/Medium/Low)
  - Set due date
3. Assign to board column (To Do/In Progress/Await Feedback/Done)
4. Click "Create Task" - instantly appears on Kanban board
5. All team members see the update in real-time

### 🎯 **Key Workflows**

#### Creating a New Task
```typescript
// Task creation flow
1. Navigate to "Add Task" section
2. Fill in task details (title, description, assignee)
3. Set priority and due date
4. Select project and status column
5. Save task - automatically syncs to Kanban board
```

#### Managing the Kanban Board
// Interactive board operations
1. View four main columns: To Do → In Progress → Await Feedback → Done
2. Drag & drop tasks between columns to update status
3. Click on any task card to open detailed view
4. Edit task properties directly from the board
5. Use search function to quickly find specific tasks
6. Filter by assignee, priority, or due date
```

👥 Contact Management
// Team collaboration setup
1. Navigate to "Contacts" section
2. Add team members with name and email
3. Assign roles and responsibilities
4. Use contacts when creating/assigning tasks
5. View contact activity and task assignments
---

## 🎨 **UI/UX Features**

### 🎭 **Theme Customization**

```scss
// Custom SCSS Variables
:root {
  --primary-color: #1976d2;
  --secondary-color: #424242;
  --accent-color: #ff4081;
  --background-color: #fafafa;
  --surface-color: #ffffff;
  --text-primary: #212121;
  --text-secondary: #757575;
}

[data-theme="dark"] {
  --background-color: #121212;
  --surface-color: #1e1e1e;
  --text-primary: #ffffff;
  --text-secondary: #aaaaaa;
}

🎯 Component Structure
typescript// Shared Components
├── HeaderComponent      # Navigation and user menu
├── SidebarComponent    # Main navigation menu
├── FooterComponent     # App footer information

// Feature Components
├── SummaryComponent    # Dashboard overview
├── AddTaskComponent    # Task creation form
├── BoardComponent      # Kanban board display
├── ContactsComponent   # Contact management
└── TaskComponent       # Task detail view


🎯 Angular Material Integration
typescript// Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';

---



## 🚀 **Deployment**

### 🔥 **Firebase Hosting**

```bash
# Build for production
ng build --configuration production

# Deploy to Firebase
firebase deploy

# Deploy with custom message
firebase deploy -m "Version 1.2.0 release"
```

### 🌐 **Custom Domain Setup**

```bash
# Add custom domain in Firebase Console
firebase hosting:channel:deploy preview-channel

# Configure SSL (automatic with Firebase)
# Update DNS records as instructed
```

---

## 📋 **Roadmap**

<div align="center">

### 🎯 **Planned Features**

| Phase | Features | Status |
|-------|----------|--------|
| **Phase 1** | 📊 Advanced Analytics Dashboard | 📅 Planned |
| **Phase 2** | 📱 Mobile App (Ionic) | 📅 Planned |
| **Phase 3** | 🔌 Third-party Integrations | 📅 Planned |
| **Phase 4** | 🤖 AI Task Suggestions | 💡 Concept |
| **Phase 5** | 📈 Team Performance Reports | 💡 Concept |

</div>

### 🎯 **Feature Details**

- [ ] 📊 **Enhanced Analytics** - Team productivity insights and project metrics
- [ ] 📱 **Mobile Application** - Native iOS and Android apps with Ionic
- [ ] 🔌 **API Integrations** - Slack, Microsoft Teams, Google Workspace
- [ ] 🤖 **AI Features** - Smart task prioritization and deadline predictions
- [ ] 📈 **Advanced Reports** - Burndown charts, velocity tracking, team performance
- [ ] 🔄 **Workflow Automation** - Custom rules and automated task assignments
- [ ] 🌍 **Internationalization** - Multi-language support
- [ ] 📧 **Email Notifications** - Customizable notification system
- [ ] 🔍 **Advanced Search** - Full-text search across tasks and projects
- [ ] 💾 **Data Export** - CSV, PDF, and JSON export capabilities

---

## 🤝 **Contributing**

We welcome contributions! Here's how you can help improve Join:

### 🔧 **Development Setup**

```bash
# Fork and clone the repository
git clone https://github.com/MihaelaAghirculesei/join-kanban-board

# Create feature branch
git checkout -b feature/amazing-feature

# Make your changes
# Follow Angular style guide and best practices

# Run tests
npm run test
npm run test:e2e

# Commit with conventional commits
git commit -m "feat: add amazing new feature"

# Push and create pull request
git push origin feature/amazing-feature
```

### 💡 **Contribution Ideas**

- 🎨 **UI/UX Improvements** - Enhanced user interface and experience
- 🔧 **Performance Optimization** - Bundle size reduction and loading speed
- 🌍 **Internationalization** - Translations for different languages
- 📱 **Mobile Enhancements** - Better mobile responsiveness and PWA features
- 🔌 **Integrations** - Connect with popular tools and services
- 🧪 **Testing** - Increase test coverage and add e2e tests
- 📚 **Documentation** - Improve docs and add tutorials

---

## 🎖️ **Project Highlights**

<div align="center">

| 🏆 **Technical Excellence** | 🎯 **User Experience** | 🚀 **Performance** |
|------------------------------|-------------------------|-------------------|
| ✅ Angular 17 with Standalone Components | ✅ Intuitive drag-and-drop interface | ✅ Optimized bundle size |
| ✅ Firebase real-time integration | ✅ Responsive design across devices | ✅ Lazy loading modules |
| ✅ TypeScript strict mode | ✅ Accessibility (a11y) compliant | ✅ Service worker caching |
| ✅ Reactive programming with RxJS | ✅ Cross-browser compatibility | ✅ Tree-shaking optimization |
| ✅ Modular component architecture | ✅ Clean and modern UI/UX | ✅ Real-time data synchronization |

</div>

---

## 📞 **Contact & Links**

<div align="center">

<!-- [![Portfolio](https://img.shields.io/badge/Portfolio-Coming_Soon-orange?style=for-the-badge&logo=firefox)](https://mihaela-melania-aghirculesei.de) -->
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/mihaela-aghirculesei-84147a23b/)
[![Email](https://img.shields.io/badge/Email-Get_In_Touch-D14836?style=for-the-badge&logo=gmail)](mailto:kontakt@mihaela-melania-aghirculesei.de)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/MihaelaAghirculesei)

**Built with 💖 and ☕ by Mihaela Melania Aghirculesei**

</div>

---

## 🙏 **Acknowledgments**

- **Angular Team** - For the amazing framework and continuous improvements
- **Firebase Team** - For the powerful backend platform and real-time capabilities
- **Material Design** - For the beautiful and accessible UI components
- **Open Source Community** - For continuous inspiration and collaborative spirit
- **Developer Community** - For feedback, suggestions, and contributions

---

<div align="center">

### 🌟 **If you found this project helpful, please give it a star!** ⭐

**Thank you for checking out Join!** 🚀📋

*Empowering teams with better project management and collaboration*

---

### 📈 **Project Stats**

![GitHub stars](https://img.shields.io/github/stars/MihaelaAghirculesei/advanced-kanban-board?style=social)
![GitHub forks](https://img.shields.io/github/forks/MihaelaAghirculesei/advanced-kanban-board?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/MihaelaAghirculesei/join-kanban-board?style=social)

**Made with Angular 17 + Firebase 🔥**

</div>
