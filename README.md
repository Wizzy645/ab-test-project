 GrowthApp: Real-Time A/B Testing & Activation Funnel



 Project Description
GrowthApp is a full-stack A/B testing engine designed to optimize user activation. Instead of relying on guesswork, this application randomly splits inbound traffic between two distinct landing page variations and programmatically tracks user behavior to determine the highest-converting design. 

The Business Problem Solved: Improving top-of-funnel conversion rates. By tracking both "Views" (exposure) and "Signups" (activation), the backend automatically calculates the exact conversion rate percentage for each variation and displays the winning variant on a live administrative dashboard.

## Tech Stack
* **Frontend:** HTML5, Vanilla JavaScript, Tailwind CSS (CDN)
* **Graphics Engine:** Custom WebGL Fragment Shader (for the interactive background)
* **Backend:** Node.js, Express.js
* **Database:** SQLite (Persistent file-based storage)
* **API:** RESTful endpoints for event tracking (`/api/track-view`, `/api/signup`, `/api/results`)

<img width="1366" height="646" alt="image" src="https://github.com/user-attachments/assets/520c24bd-9354-4c94-9394-904b9929c2e6" />


## Setup Instructions
Want to run this experiment locally? Follow these steps:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Wizzy645/ab-test-project.git](https://github.com/Wizzy645/ab-test-project.git)
   cd ab-test-project

```

2. **Install dependencies:**
```bash
npm install

```


3. **Start the server:**
```bash
npm start

```


4. **View the Application:**
* Landing Page: `http://localhost:3000`
* Results Dashboard: `http://localhost:3000/results.html`


