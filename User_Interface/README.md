# MedIDap User Interface Prototype

## Overview
This project is the **frontend design prototype** for the MedIDap mobile application. It is currently built with **React (Vite)** to visualize the user interface and user experience (UI/UX) before migrating to **React Native** for the final mobile application development.

The interface is designed specifically for mobile screens.

## Key Features

### 1. 🏠 Home Dashboard
- **Quick Access QR Code**: Displays a personal QR code that can be scanned by healthcare providers to instantly retrieve medical records.
- **Fullscreen Mode**: Tap the QR code to expand it for easier scanning.
- **Intuitive Navigation**: Easy access to all core features via the bottom navigation bar.

### 2. 💳 NFC Card Management
- **Digital NFC Card**: Simulates the management of a physical MedIDap NFC card.
- **Security Control**:
    - **Freeze Card**: Instantly lock the card if lost or stolen to prevent unauthorized access.
    - **Access Logs**: View a history of when and where the card was accessed (mock data for prototype).
- **Status Monitoring**: Toggle NFC availability and view card registration details.

### 3. 📋 Digital ID Information
- View detailed patient demographics, allergies, and critical medical alerts.
- Acts as a digital counterpart to the physical ID card.

### 4. 🛡️ Guardian Control
- Manage access for dependents or family members.
- Control sharing permissions with healthcare providers.

## Tech Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **UI Components**: Shadcn UI (Radix UI primitives)

## Setup & Running
1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start Development Server**:
    ```bash
    npm run dev
    ```

## 📱 Development View Instructions (Crucial)
**Since this is a mobile-first design prototype running in a web browser:**

1.  Open the local server link (e.g., `http://localhost:5173`) in Google Chrome or Edge.
2.  Press **F12** to open Developer Tools.
3.  Click the **Device Toolbar** icon (or press `Ctrl + Shift + M`).
4.  Select **iPhone 14 Pro Max** (or a similar mobile device) from the dimensions dropdown.
5.  Refresh the page to ensure all styles load associated with the mobile viewport.

> **Note**: This web version is for design verification only. The final application will be developed using **React Native** for deployment on iOS and Android devices.