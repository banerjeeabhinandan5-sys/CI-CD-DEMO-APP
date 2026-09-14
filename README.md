# CI/CD Pipeline Demo Project

A beginner-friendly project that demonstrates a real CI/CD pipeline using
**GitHub Actions** + **Docker**. Tests run automatically on every push, and
if they pass, a Docker image is built and pushed to Docker Hub — with zero
manual steps.

---

## 1. What is CI/CD? (Quick concepts)

- **CI (Continuous Integration):** Every time you push code, it's automatically
  tested. This catches bugs early, before they reach production.
- **CD (Continuous Delivery/Deployment):** If tests pass, the code is
  automatically packaged (here: built into a Docker image) and pushed
  somewhere ready to deploy.
- **Pipeline:** The sequence of automated steps (test → build → push → deploy)
  that runs on every code change.
- **GitHub Actions:** GitHub's built-in automation tool. You define "workflows"
  in `.yml` files inside `.github/workflows/`, and GitHub runs them on events
  like `push` or `pull_request`.
- **Secrets:** Sensitive values (like passwords/tokens) that you never hardcode.
  GitHub lets you store them securely and reference them in workflows.

---

## 2. Project structure

```
ci-cd-demo-app/
├── index.js                     # Express app
├── index.test.js                # Jest tests
├── package.json
├── Dockerfile                   # How to containerize the app
├── .dockerignore
└── .github/workflows/ci-cd.yml  # The actual CI/CD pipeline definition
```

---

## 3. Step-by-step: How to set this up yourself

### Step 1 — Create a GitHub repo
1. Go to github.com → New repository → name it `ci-cd-demo-app`.
2. Push these files to it:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: CI/CD demo app"
   git branch -M main
   git remote add origin https://github.com/<your-username>/ci-cd-demo-app.git
   git push -u origin main
   ```

### Step 2 — Create a Docker Hub account (free)
1. Sign up at hub.docker.com.
2. Go to **Account Settings → Security → New Access Token**.
3. Copy the generated token (you won't see it again).

### Step 3 — Add secrets to GitHub
1. In your GitHub repo, go to **Settings → Secrets and variables → Actions**.
2. Add two secrets:
   - `DOCKERHUB_USERNAME` → your Docker Hub username
   - `DOCKERHUB_TOKEN` → the access token from Step 2

### Step 4 — Push and watch it run
1. Make any small change and push to `main`.
2. Go to the **Actions** tab in your GitHub repo.
3. You'll see the pipeline run: first "Run Tests", then "Build and Push Docker Image".
4. Once it's green ✅, check your Docker Hub — a new image will appear there automatically.

### Step 5 (optional, bonus) — Test it locally first
```bash
npm install
npm test          # run the tests yourself
docker build -t ci-cd-demo-app .
docker run -p 3000:3000 ci-cd-demo-app
# visit http://localhost:3000
```

---

## 4. How the pipeline actually works (line by line)

- `on: push / pull_request` → defines *when* the pipeline triggers.
- **Job 1 (`test`)**: checks out code, installs Node, runs `npm test`.
  If any test fails, the pipeline stops here — nothing broken ever gets built.
- **Job 2 (`build-and-push`)**: only runs if Job 1 succeeds (`needs: test`).
  Logs into Docker Hub using secrets, then builds and pushes the image.

This mirrors what real companies do: **no code reaches production without
passing tests first.**

---

## 5. Ideas to extend this (great for showing depth in interviews)

- Add a **deploy step** to Render.com or Railway.app (free tiers) so the app
  actually goes live after the Docker push.
- Add a **linter** step (ESLint) before tests.
- Add **code coverage** reporting (Jest has this built in: `jest --coverage`).
- Add a **Slack/Discord notification** step on pipeline failure.
- Use a **staging vs production** branch strategy (`dev` → auto-deploys to
  staging, `main` → auto-deploys to production).

---

## 6. Resume bullet points (copy-paste and tweak)

- Built and deployed a CI/CD pipeline using **GitHub Actions** and **Docker**
  that automatically runs unit tests and builds/pushes container images on
  every code push, eliminating manual build steps.
- Designed a multi-stage pipeline (test → build → push) with job dependencies
  to ensure untested code never reaches the deployable image.
- Containerized a **Node.js/Express** application using Docker, reducing
  environment inconsistencies between development and production.
- Managed pipeline secrets securely using GitHub Actions secrets, following
  standard DevOps security practices.

**Resume title options:**
- "CI/CD Pipeline for Automated Testing & Containerized Deployment"
- "Automated Docker Build Pipeline using GitHub Actions"

---

## 7. If asked about this in an interview

Be ready to explain, in your own words:
- Why CI/CD matters (catches bugs early, faster/safer releases)
- What happens if a test fails (pipeline stops, bad image never gets pushed)
- Why Docker is used (consistent environment everywhere it runs)
- What secrets are and why they're not hardcoded in code
