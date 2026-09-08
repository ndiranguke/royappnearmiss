# ROY &mdash; Near-Miss Reporting Portal

A modern, full-featured online fleet safety and near-miss reporting portal engineered for transport drivers, warehouse staff, and EHS (Environmental Health and Safety) managers.

> **Motto:** *"Report what almost went wrong &mdash; before it does."*

---

## 🌟 Features

- **Multi-Role Authentication & Access Control:**
  - **Fleet Drivers:** Log in with employee number and truck registration; report close calls on the road with photos/videos; view incident status; confirm feedback receipt.
  - **Operations Staff:** Report warehouse, yard, or dispatch near misses.
  - **EHS Administrators:** Access the Review Queue; acknowledge receipt of submissions; assign root-cause investigations; implement corrective actions; manage master user accounts; export comprehensive CSV audits.
- **Incident Reporting Workflow (4-Step Lifecycle):**
  1. **Employee Report:** Detailed occurrence location, timestamp, vehicle, description, and suggested action.
  2. **EHS Acknowledgement:** Immediate supervisory receipt logging that transitions status to *Under Review*.
  3. **Corrective Action:** Physical engineering, procedural briefing, or maintenance repair logged by EHS (*In Progress* &rarr; *Corrected*).
  4. **Employee Verification:** Reporting worker reviews corrective feedback and confirms closure.
- **Evidence & Media Attachments:** Client-side image compression and video attachment handling with direct preview.
- **Live Notifications:** Real-time alert notifications for status changes, review milestones, and closure requests with unread counters.
- **Master Safety Data & User Administration:**
  - Complete searchable log of all incident history.
  - User management (create user/admin, edit details, suspend/reactivate accounts).
  - One-click CSV export ready for Excel and safety regulatory audits.
- **Educational Guide:** Comprehensive fleet safety documentation detailing Heinrich's pyramid and operational hazard categories (road skids, brake fade, load shifts, driver fatigue, yard blind corners).

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser at http://localhost:3000
```

---

## 📦 How to Deploy to GitHub & GitHub Pages

### Method 1: Deploy to GitHub Repository
1. Initialize Git in your project folder (if not already initialized):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: ROY Near-Miss Reporting Portal"
   ```
2. Create a new repository on [GitHub](https://github.com/new).
3. Push to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```

### Method 2: Deploy to GitHub Pages (Free Hosting)
1. In `vite.config.ts`, set the base path to your repo name:
   ```ts
   export default defineConfig({
     base: '/<your-repo-name>/',
     // ...
   });
   ```
2. Build the production bundle:
   ```bash
   npm run build
   ```
3. Push the `dist` folder to the `gh-pages` branch, or enable GitHub Pages in your repository settings via **Settings &gt; Pages &gt; Source: GitHub Actions (Vite)**.

---

## 🔑 Pre-Configured Demo Accounts

| Role | Staff No. | Password | Truck No. |
| :--- | :--- | :--- | :--- |
| **EHS Administrator** | `ADMIN001` | `Admin@123` | *N/A* |
| **Fleet Driver** | `DRV-101` | `Driver@123` | `KDN 221A` |
| **Tanker Driver** | `DRV-102` | `Driver@123` | `KDG 849Z` |
| **Operations Staff** | `STF-501` | `Staff@123` | *N/A* |

*EHS/Admin Registration Access Code:* `ROY-SAFE2026`
