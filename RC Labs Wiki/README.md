# RC Labs Internal Wiki

A professional, interactive company wiki built with React for RC Labs - Intelligent Battery Management Systems.

## Overview

This wiki serves as the central knowledge hub for RC Labs employees, containing:
- HR Policies and guidelines
- Employee onboarding resources
- Project documentation and templates

## Features

- Clean, minimal, and professional design
- Interactive navigation with collapsible sidebar
- Responsive layout for desktop and mobile
- Structured content organization
- Easy-to-navigate nested pages

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

## Project Structure

```
rc-labs-wiki/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Layout.js
│   │   └── Layout.css
│   ├── pages/
│   │   ├── Home.js
│   │   ├── HRPolicies.js
│   │   ├── EmployeeOnboarding.js
│   │   ├── ProjectDocumentation.js
│   │   ├── hr/
│   │   │   ├── WorkHours.js
│   │   │   ├── LeavePolicy.js
│   │   │   ├── SalaryBenefits.js
│   │   │   ├── CodeOfConduct.js
│   │   │   └── ExitProcess.js
│   │   ├── onboarding/
│   │   │   ├── PreJoining.js
│   │   │   ├── Day1Steps.js
│   │   │   ├── ToolsAccess.js
│   │   │   ├── FirstWeekPlan.js
│   │   │   └── TeamContacts.js
│   │   └── projects/
│   │       ├── ActiveProjects.js
│   │       ├── CompletedProjects.js
│   │       └── ProjectTemplate.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Wiki Sections

### 1. HR Policies
- Work Hours
- Leave Policy
- Salary & Benefits
- Code of Conduct
- Exit Process

### 2. Employee Onboarding
- Pre-Joining Requirements
- Day 1 Steps
- Tools & Access
- First Week Plan
- Team Contacts

### 3. Project Documentation
- Active Projects
- Completed Projects
- Project Template

## Customization

To customize the wiki for your needs:

1. Update company information in `src/pages/Home.js`
2. Modify team contacts in `src/pages/onboarding/TeamContacts.js`
3. Add or update projects in the projects folder
4. Adjust styling in CSS files to match your brand colors

## Technologies Used

- React 18
- React Router DOM 6
- CSS3
- Modern JavaScript (ES6+)

## About RC Labs

RC Labs designs and manufactures Intelligent Battery Management Systems for EVs and stationary energy storage. Our solutions are adaptive, chemistry-agnostic, and modular, supporting various battery chemistries and applications from electric bikes to electric buses.

## License

Internal use only - RC Labs © 2026
