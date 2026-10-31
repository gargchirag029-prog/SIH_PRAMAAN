# PARIKALP — Integrated AICTE Approval Workflow Automation, Compliance Monitoring and Alert Management System

### Smart India Hackathon 2026
* **Problem Statement ID:** 26265
* **Team Name:** PARIKALP
* **Team ID:** 199059
* **Theme:** Smart Automation
* **Category:** Software
* **Product Statement:** *"One Platform. Smarter Approvals. Continuous Compliance. Transparent Governance."*

---

## 🏛️ Executive Summary

**PARIKALP** is an end-to-end Government Enterprise Digital Platform engineered for the **All India Council for Technical Education (AICTE)**, Ministry of Education, Government of India.

The platform transforms the annual approval process from fragmented, manual exchanges into an automated, transparent, single-window workflow. It unifies institutional application submission, AI-assisted document verification, automated discrepancy routing, Expert Visit Committee (EVC) scheduling, Standing Appellate Committee (SAC) endorsement, and post-approval continuous compliance monitoring with a 3-tier escalation matrix.

---

## 🚀 Key Modules & Capabilities

### 1. Three Dedicated Role-Based Portals (RBAC)
* **Portal 1 — Technical Institution Portal:** For colleges and universities to register, submit multi-step approval applications, upload mandatory statutory annexures, monitor real-time review progress, respond to discrepancies, and download digitally signed Letters of Approval (LOA/EOA).
* **Portal 2 — Regional Officer Portal:** For regional scrutiny officers (e.g., NWRO, SRO, WRO) to scrutinise applications in a dual-pane workspace, cross-check land and infrastructure parameters, raise enforceable discrepancy notices, and route dossiers.
* **Portal 3 — Admin & Executive Committee Portal:** For AICTE Headquarters, Member Secretary, and SAC/SHC review committees to manage EVC visit agendas, inspect physical audit reports, record regulatory dispositions, issue official orders with cryptographic QR codes, and monitor portal-wide compliance.

### 2. Multi-Step Application Submission Wizard
* **Step 1:** Institution & Signatory Identification (Name, AICTE PID, Region, Type, Contact).
* **Step 2:** Approval Category & Infrastructure Norms (Land acreage, built-up area, faculty cadre ratio, course & intake table).
* **Step 3:** Statutory Document Dossier Upload with simulated AES-256 private vault storage.
* **Step 4:** Automated Pre-Submission Completeness Audit (100% check against APH 2026-27 norms).
* **Step 5:** Final Submission Acknowledgement with unique Reference ID generation (e.g., `AICTE/NWRO/2026/APP-8492`).

### 3. AI-Assisted Document Verification Engine
* **Pipeline:** Ingestion → Classification → Text/Layout Analysis → Information Extraction → Completeness Validation → Tampering Detection → Officer Review.
* **Confidence Scoring & Tampering Screening:** Optical character recognition (OCR) cross-checks issuing authorities, survey numbers, and validity dates against statutory rules.
* **Status Flags:**
  * 🟢 **GREEN:** Passed validation.
  * 🟡 **AMBER:** Requires officer review / nearing expiration.
  * 🔴 **RED:** Potential discrepancy / expired validity / layout anomaly.
* *Governance Principle:* AI assists officers with high-speed screening; authorized officers retain final regulatory determination.

### 4. Expert Visit Committee (EVC) Management
* Automated conflict-of-interest screening prior to committee constitution.
* Multi-member committee constitution: Chairman (Senior Academician), Subject Expert, Architect/PWD Representative.
* Digital inspection dossier submission with geotagged photographic confirmation, video recording verification, composite scoring (out of 100), and formal recommendations.

### 5. SAC / SHC Committee Review & Digital Order Generation
* Synthesizes Scrutiny Clearance Score, EVC Physical Audit Score, and Compliance Index into a single decision workspace.
* Formal regulatory dispositions: **Grant Approval**, **Reject Application**, **Return for Clarification**.
* Generates authentic, printable **AICTE Letter of Approval (LOA)** featuring national emblem header, approved intake matrix, digital QR code verification, and cryptographic digest.

### 6. Continuous Compliance Monitoring & Document Vault
* Post-approval continuous compliance monitoring beyond the initial approval cycle.
* Automatic monitoring of:
  * Perpetual Land Lease Deeds
  * Fire & Life Safety NOC renewals
  * Joint AICTE Security FDR maturities (9-month alert threshold)
  * Biometric Faculty Cadre Ratio (1:15 standard)
  * Statutory Anti-Ragging and POSH Internal Complaints Committees (ICC)
* Document versioning and frictionless replacement workflow.

### 7. Real-Time Alerts & 3-Tier Escalation Matrix
* Configurable statutory SLA rules preventing institutional pendency:
  * **Level 1 (Officer):** Initial automated reminder and application assignment.
  * **Level 2 (Regional Authority):** Escalated to Regional Director if SLA window lapses.
  * **Level 3 (AICTE HQ / Member Secretary):** High-priority executive intervention.
* Integrated multi-channel simulation: In-App notification, Official Email, SMS Gateway.

### 8. Immutable Audit Trail & MIS Analytics
* Every regulatory action is immutably logged with actor identity, timestamp, IP gateway, and SHA-256 hash.
* Interactive Recharts visualizations: National status distribution, regional office throughput, submission trajectories, and CSV export.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 18, Vite, TypeScript |
| **Styling & Design** | Tailwind CSS, Lucide React Icons |
| **Animation & Visuals** | Framer Motion, Canvas Confetti |
| **Data Visualisation** | Recharts (Area, Bar, Pie charts) |
| **Routing** | React Router v7 |
| **State & Persistence** | Reactive Context API + Dual-mode LocalStorage Persistent Store with FastAPI REST Client Sync |
| **Backend** | Python FastAPI, Pydantic, REST APIs |
| **Security & Standards** | Role-Based Access Control (RBAC), SHA-256 Integrity Verification, Government UI Accessibility |

---

## 💻 Quick Start & Running the Project

### 1. Prerequisites
* Node.js v18+ (tested on v24)
* npm v9+
* Python 3.10+ (optional, for FastAPI backend)

### 2. Frontend Development Server
```bash
# In the project root directory
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build & Verification
```bash
npm run build
npm run preview
```

### 4. FastAPI Backend (Optional)
```bash
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --port 8000
```
API Documentation will be accessible at [http://localhost:8000/docs](http://localhost:8000/docs).

---

## 🎬 15-Step SIH 2026 Jury Demonstration Flow

1. **Step 1:** Log in via the top interactive switcher as **Institution** (*Dr. Ramesh Sharma, Registrar, DIAT*).
2. **Step 2:** Click **Submit New Application** to walk through the 5-step registration wizard.
3. **Step 3:** Review uploaded documents and automated completeness validation.
4. **Step 4:** Submit the application to generate an official reference number (e.g., `AICTE/NWRO/2026/APP-8492`).
5. **Step 5:** Switch role to **Regional Officer Portal** (*Dr. R. K. Soni, NWRO*).
6. **Step 6:** Open the **Scrutiny Workspace** to inspect application data and documents.
7. **Step 7:** Open **AI Document Verification** to observe the AI screening engine flag an expired Fire Safety NOC.
8. **Step 8:** Issue an official **Discrepancy Notice** with a 7-day rectification directive.
9. **Step 9:** Switch back to **Institution Portal** to view the active discrepancy alert, click **Upload Rectified Document**, and submit the renewed Fire Safety Certificate.
10. **Step 10:** As Officer, verify the renewed certificate, mark scrutiny passed, and schedule the **Expert Visit Committee (EVC)** inspection.
11. **Step 11:** As EVC Chairman, open **EVC Management** and submit the inspection report with a 94/100 score and geotagged photographic confirmation.
12. **Step 12:** Switch role to **Admin / Committee Portal** (*Prof. Anil Sahasrabudhe, SAC Chairman*).
13. **Step 13:** Open **Committee Review** and click **Record Decision** → Select **Grant Approval**.
14. **Step 14:** Observe the confetti celebration and click **View & Print Approval Order** to inspect the official digitally sealed AICTE Letter of Approval with verification QR code.
15. **Step 15:** Verify that the institution is automatically enrolled in **Continuous Compliance Monitoring**, with all activities recorded in the **Immutable Audit Log**.
