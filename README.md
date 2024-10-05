# Jira Clone Application

This is a Jira clone built using **Angular** for the frontend and **Laravel** for the backend. The application provides features for task management, project tracking, and role-based access control, allowing for efficient project collaboration.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Preview](#preview)

## Features

- **User Authentication**:
  - Registration, login, logout
  - Password reset functionality
  - User profile management
- **Role-Based Access Control**:
  - Admin, Project Manager, Developer, Viewer
  - Different access levels based on roles
- **Project Management**:
  - Create, update, delete projects
  - Assign users to projects
  - Track project status and activity
- **Task Management**:
  - Create, update, delete tasks
  - Assign tasks to users
  - Task prioritization (Low, Medium, High)
  - Task progress tracking (To Do, In Progress, Done)
  - Set task deadlines
- **Comments and Discussions**:
  - Add and manage comments on tasks
- **Notifications**:
  - Receive role-based notifications for updates
- **Dashboard and Reporting**:
  - Project and task status overview
- **Responsive UI**:
  - Optimized for desktop and mobile

## Technologies

### Frontend (Angular)
- **Angular**: Framework for building the frontend
- **Tailwind CSS**: Responsive and modern UI design
- **TypeScript**: Strongly typed JavaScript for scalable apps
- **NgRx**: State management

### Backend (Laravel)
- **Laravel**: Framework for API development
- **pgsql**: Database for storing data
- **Auth Sanctum**: Secure user authentication
- **Composer**: Dependency manager

## Installation

### Prerequisites
- Node.js & npm
- PHP (>= 8.x)
- Composer
- MySQL or any preferred database

## Preview

### Register Page

Below is the Register page of the application:

![Register Page](./Task%20Manager/Client/Jira/jiraClone/src/assets/Register.png)

### Login Page

Below is the Login page of the application:

![Login Page](./Task%20Manager/Client/Jira/jiraClone/src/assets/Login.png)

### User Candidate Login (when there is no task assign)

Below is the User Candidate Login page when there are no tasks:

![User Candidate Login](./Task%20Manager/Client/Jira/jiraClone/src/assets/UserCandidate.png)

### User Role Permissions

Below is an illustration showing that the user role has no rights except for changing the status of tasks:

![User Role Permissions](./Task%20Manager/Client/Jira/jiraClone/src/assets/user%20role%20have%20now%20rights.png)


### Admin Dashboard

Below is the Admin Dashboard of the application:

![Admin Dashboard](./Task%20Manager/Client/Jira/jiraClone/src/assets/admin%20Dash%20board.png)


### Role-Based Activity: Change Assignee

Below is an illustration of the admin's capability to change the assignee of a task:

![Admin Change Assignee](./Task%20Manager/Client/Jira/jiraClone/src/assets/Admin%20have%20right%20to%20change%20asignee.png)

## Navigation Bar Differences: User vs. Admin

In our application, the navigation bar is tailored to reflect the permissions associated with different user roles, specifically the Admin and User roles. The Admin navigation bar is equipped with additional functionalities that empower administrators to effectively manage tasks and projects. Notably, Admins have the right to create new tasks, enabling them to delegate work and monitor project progress actively. This capability is crucial for maintaining an organized workflow, as it allows Admins to assign tasks to team members, set deadlines, and prioritize workloads based on project needs. Conversely, the User navigation bar is designed with a more limited scope of functionality, as users do not possess the rights to create tasks. Instead, their focus is primarily on viewing and updating tasks assigned to them. This distinction ensures that the responsibility of task creation and project management remains with those who have the necessary oversight and control, while users can concentrate on completing their assigned tasks efficiently. By implementing these role-specific navigation features, the application fosters a structured environment that enhances collaboration and accountability within the team.

