# MedIDap: AI-Powered Decentralized Health Identity

> **"One Patient, One Identity: Bridging Paper Healthcare to Digital Future"**

**Team Name:** BlackSheep

![Hospital Dashboard](assets/MediDap_Image.png)

---

## 📖 Table of Contents
1. [Project Overview](#-i-project-overview)
2. [Problem Landscape & Statistics](#-ii-problem-landscape--statistics)
3. [Problem Statement](#-iii-problem-statement-high-risk-low-digital-access)
4. [The Solution: MedIDap](#-iv-the-solution-medidap)
5. [Value Proposition](#-v-value-proposition-why-medidap)
6. [Technical Architecture](#-vi-technical-architecture)
7. [Technology Stack](#-vii-technology-stack)
8. [Impact & Measurable Outcomes](#-viii-impact--measurable-outcomes)
9. [The Team](#-ix-the-team)
10. [Getting Started (Development)](#-x-getting-started-development)

---

## 🚀 I. Project Overview

**MedIDap** is a unified, portable medical identity ecosystem designed to bridge the gap between physical paper records and a digital future. It ensures that patient data is accessible, secure, and portable, empowering both patients and healthcare providers with a seamless "One Patient, One Identity" system.

---

## 📊 II. Problem Landscape & Statistics

### 🇲🇾 Current Healthcare Infrastructure Status (Malaysia Context)

#### Public Sector 🏥
*   **99.9%** of public clinics are paper-based.
*   **85.3%** of public hospitals are paper-based.
*   Only **14.7%** of public hospitals have adopted Electronic Medical Records (EMR).

#### Private Sector 🏨
*   **75.2%** of private hospitals use vendor-specific EMR systems.
*   **24.8%** of private hospitals remain paper-based.

> *(Source: MOH Town Hall Putrajaya, 13 Jan 2025)*

### Patient Health Trends
There is a rising prevalence of **Non-Communicable Diseases (NCDs)** correlated with age, increasing steadily from the 18-29 age group up to the 60+ age group.
> *(Source: National Health & Morbidity Survey 2023)*

### Core Issues Identified
*   **The Digital Divide:** Patient risk is currently unmanaged by existing infrastructure.
*   **Chronic Disease Management:** High rates of non-adherence to follow-up appointments.
*   **Data Integrity:** Frequent medication history discrepancies.

---

## 🔴 III. Problem Statement: High Risk, Low Digital Access

*   **Inefficient Processes:** Medical staff spend excessive time searching through scattered paper records.
*   **Patient Burden & Data Inaccuracy:**
    *   Patients are forced to repeat complex health histories at every visit.
    *   Relying on patient memory and paper leads to missing or inaccurate records.
*   **Medication Errors:** Doctors often lack knowledge of a patient's actual allergies or current medications, which can cause errors and put lives at risk.

---

## 🟢 IV. The Solution: MedIDap

### 📱 Product Concept
**Description:** An all-in-one portable health record where health information is available at the user's fingertips.

### 💳 Physical Interface
*   **NFC Smart Card:** A "Universal Health MedIDap" card containing Name, ID, and Blood Type.
*   **Dynamic QR:** Users can scan a QR code to view medical information or regenerate the QR for security.

### ✨ Key Features
1.  **AI Vision & OCR:** Scans physical prescriptions using Optical Character Recognition (OCR).
2.  **Universal Access:** User and family views are available anywhere.
3.  **Medical History Import:** Immediately views chronic conditions, allergies, and past labs.
4.  **Data Processing:** Extracts medical data, imports it, and converts it to standardized **FHIR JSON** format to update the User ID.
5.  **Guardian Control:**
    *   Allows management of support for dependents (e.g., OKU support).
    *   Enables guardian access for emergency support.
    *   Lists active guardians with contact details and relationship (e.g., Daughter, Son).

---

## 💎 V. Value Proposition: Why MedIDap?

| Feature | Service Value |
| :--- | :--- |
| **Organizational Efficiency** | Provides instant access to complete digital patient profiles, eliminating paper file searches, speeding up workflows, and reducing errors. |
| **Convenience** | One ID carries all medical history (reports/documents) and follows the patient anywhere, including rural areas or overseas. |
| **Error-Free Reporting** | Addresses the issue of patients (especially the elderly) forgetting history; ensures accurate data to prevent medication errors. |
| **Guidance & Long-Term Care** | Connects patients with family/guardians to ensure better support for chronic care and follow-ups. |

---

## 🏗️ VI. Technical Architecture

### Architecture Diagram
<div align="center">
  <img src="assets/Architecture_Diagram.png" alt="Architecture Diagram" width="100%" />
</div>

<br>

### Workflow

1.  **Input:** Doctors/Nurses upload or type data into the **Hospital Panel (Web)**.
2.  **Processing:**
    *   An **OCR & AI Processor** converts the input.
    *   **Core Technology:** The system is powered by **Google Gemini 2.5 Flash**.
    *   **Standardization:** Data is converted into **FHIR R4 JSON** format.
3.  **Storage:** Data is written to and stored on a **Decentralized Ledger (Smart ID Ledger)**.
4.  **Access:**
    *   **Patient:** Uses an **NFC Smart Card** or **QR Smart Health Pass**.
5.  **Sync:** Supports online sync and offline data exchange.

---

## 🛠️ VII. Technology Stack

| Component | Tech |
| :--- | :--- |
| **Frontend Framework** | React (Vite) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **AI Model** | Google Gemini 2.5 Flash (Vision & NLP) |
| **Data Standard** | HL7 FHIR R4 (JSON) |

---

## 🌟 VIII. Impact & Measurable Outcomes

*   ✅ **Safety:** Prevents medication conflicts to guarantee patient safety.
*   ✅ **Efficiency:** Eliminates duplicate tests, leading to smarter resource use.
*   ✅ **Administration:** Reduces administrative burden by up to **80%**, speeding up clinic operations.
*   ✅ **Inclusion:** Brings healthcare access to rural and low-connectivity zones.
*   ✅ **Patient Experience:** Empowers the elderly with a "zero-paper" healthcare journey.

---

## 👥 IX. The Team

<div align="center">

| ![Chang Wei Lam](https://github.com/Weilamm.png?size=100) | ![Yap Jia Xin](https://github.com/Jiaxin061.png?size=100) | ![Tan Zheng Yu](https://github.com/zhengyu89.png?size=100) | ![Karen Voon Xiu Wen](https://github.com/Karen040409.png?size=100) | ![Tan Qing Qing](https://github.com/qingqing44.png?size=100) |
| :---: | :---: | :---: | :---: | :---: |
| **Chang Wei Lam** | **Yap Jia Xin** | **Tan Zheng Yu** | **Karen Voon Xiu Wen** | **Tan Qing Qing** |
| Project Leader | UI/UX Designer | Software Developer | Data & AI Specialist | Test Architect |

</div>

---

## ⚡ X. Getting Started (Development)

To run the entire ecosystem locally:

### Prerequisites
*   Node.js (v18+)
*   Google Gemini API Key

### 1. Setup Hospital Panel
```bash
cd Hospital_Panel
npm install
# Create .env file with VITE_GEMINI_API_KEY=your_key
npm run dev
```

### 2. Setup User Interface (Mobile Prototype)
```bash
cd User_Interface
npm install
npm run dev
```

> **Mobile View Note**: For the best experience with the User Interface, open your browser's Developer Tools (`F12`), toggle the Device Toolbar (`Ctrl+Shift+M`), and select **iPhone 14 Pro Max**.
