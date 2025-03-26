# BuckeyeConnect

BuckeyeConnect is a project with separate frontend, backend, and database components. This README explains how to set up and run the project using the provided scripts.

---

## Prerequisites

Before running the scripts, ensure you have the following installed on your system:
- **Node.js** (v16 or later)
- **npm** (Node Package Manager)
- **Python 3** (for the backend virtual environment)
- **pip** (Python package manager)

---

## Scripts Overview

The following scripts are defined in the `package.json` file:

### **1. Install Root Dependencies**
- **Install all dependencies to run the scripts:**
  ```bash
  npm i
  ```
---
### **2. Install Other Dependencies**
- **Install all dependencies for the frontend and backend:**
  ```bash
  npm run dep-installer
  ```
  This will:
  - Run `npm install` in the `frontend` directory.
  - Run `npm install` in the `server` directory.

---

### **3. Backend Setup**
The backend requires a Python virtual environment and dependencies from `requirements.txt`. Follow these steps:

1. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

2. Install the required Python packages:
   ```bash
   pip install -r backend/requirements.txt
   ```

3. Get certificate:
   ```bash
   docker cp docker-es01-1:/usr/share/elasticsearch/config/certs/ca/ca.crt backend/ca.crt
   ```

---

### **4. Start the Project**
- **Start all components (frontend, backend, and database) in parallel:**
  ```bash
  npm start
  ```
  This will:
  - Start the frontend development server.
  - Start the backend server.
    - It won't ask for your password, but you still need to enter it into the terminal. 
  - Start the database.
  * *This script is a bit buggy. I got it to work most of the time, but you can start it manually as well.*

