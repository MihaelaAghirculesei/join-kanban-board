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
cd join

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

## 🔥 **Firebase Deployment**

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