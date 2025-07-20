# 🚀 Join - Advanced Project Management Kanban Board

<div align="center">

![Join Logo](./src/assets/icon/join-logo-sidebar.png)

**A modern, collaborative project management and task organization platform built with Angular and Firebase**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-View_Project-success?style=for-the-badge)](https://join-1-46a2d.web.app)
[![Angular](https://img.shields.io/badge/Angular-17+-DD0031?style=for-the-badge&logo=angular)](https://angular.io/)
[![Firebase](https://img.shields.io/badge/Firebase-11.6+-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2+-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

[🎯 Live Demo](#-quick-start) • [✨ Features](#-features) • [🛠️ Tech Stack](#️-tech-stack) • [🚀 Installation](#-installation) • [📖 Usage](#-usage)

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
- ✅ **Project Organization** - Multiple boards and workspaces
- ✅ **Due Date Tracking** - Never miss important deadlines
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
- ✅ **Export/Import** - Data portability and backup options

</td>
</tr>
</table>





---

## 🛠️ **Tech Stack**

<div align="center">

| Frontend | Backend & Database | Development Tools | Deployment |
|----------|-------------------|-------------------|------------|
| ![Angular](https://img.shields.io/badge/Angular-17+-DD0031?style=flat&logo=angular&logoColor=white) | ![Firebase](https://img.shields.io/badge/Firebase-11.6+-FFCA28?style=flat&logo=firebase&logoColor=black) | ![TypeScript](https://img.shields.io/badge/TypeScript-5.2+-3178C6?style=flat&logo=typescript&logoColor=white) | ![Firebase Hosting](https://img.shields.io/badge/Firebase_Hosting-FFCA28?style=flat&logo=firebase&logoColor=black) |
| ![Angular Material](https://img.shields.io/badge/Angular_Material-UI_Components-607D8B?style=flat) | ![Firestore](https://img.shields.io/badge/Firestore-NoSQL_Database-FFCA28?style=flat&logo=firebase) | ![Angular CLI](https://img.shields.io/badge/Angular_CLI-17.0+-DD0031?style=flat&logo=angular) | ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI/CD-2088FF?style=flat&logo=github-actions&logoColor=white) |
| ![RxJS](https://img.shields.io/badge/RxJS-7.8+-B7178C?style=flat&logo=reactivex&logoColor=white) | ![Firebase Auth](https://img.shields.io/badge/Firebase_Auth-Authentication-FFCA28?style=flat&logo=firebase) | ![Karma](https://img.shields.io/badge/Karma-Testing-green?style=flat) | ![PWA](https://img.shields.io/badge/PWA-Progressive_Web_App-5A0FC8?style=flat) |
| ![SCSS](https://img.shields.io/badge/SCSS-Styling-CC6699?style=flat&logo=sass&logoColor=white) | ![Firebase Storage](https://img.shields.io/badge/Firebase_Storage-File_Storage-FFCA28?style=flat&logo=firebase) | ![Jasmine](https://img.shields.io/badge/Jasmine-Unit_Testing-8A4182?style=flat&logo=jasmine) | ![Responsive](https://img.shields.io/badge/Responsive-Mobile_First-06B6D4?style=flat) |

</div>

### 🏗️ **Architecture Highlights**

```typescript
📁 Project Structure
├── 🅰️ src/
│   ├── 📱 app/
│   │   ├── 🔧 core/           # Singleton services (Auth, API)
│   │   ├── 📄 features/       # Feature modules (Kanban, Projects)
│   │   ├── 🎨 shared/         # Reusable components & pipes
│   │   ├── 🔒 guards/         # Route protection
│   │   └── 📋 models/         # TypeScript interfaces
│   ├── 🎨 assets/            # Images, icons, styles
│   ├── 🌍 environments/      # Environment configurations
│   └── 🎯 main.ts           # Application bootstrap
├── 🔥 firebase.json         # Firebase configuration
├── ⚙️ angular.json          # Angular CLI configuration
└── 📦 package.json          # Dependencies and scripts
```

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
ng serve

# Open http://localhost:4200 in your browser
```

### 🔧 **Firebase Setup**

```bash
# Install Firebase CLI (if not already installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Use the Join project
firebase use join-1-46a2d

# Deploy to Firebase Hosting
ng build
firebase deploy
```

### 🌍 **Environment Configuration**
