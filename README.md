![CI/CD Pipeline](https://github.com/banerjeeabhinandan5-sys/CI-CD-DEMO-APP/actions/workflows/ci-cd.yml/badge.svg)

# CI/CD Pipeline Demo — Automated Testing & Docker Deployment

A hands-on project built to understand how real CI/CD pipelines work — not just in theory, but by actually setting one up from scratch, breaking it, debugging it, and getting it running end-to-end.

**Live pipeline:** [View on GitHub Actions](https://github.com/banerjeeabhinandan5-sys/CI-CD-DEMO-APP/actions)

---

## What this project does

Every time code is pushed to this repository:
1. **GitHub Actions automatically runs the test suite** (Jest + Supertest) against a small Node.js/Express app
2. **If — and only if — all tests pass**, it builds a Docker image of the app
3. The image is **automatically pushed to Docker Hub**, ready to be pulled and deployed anywhere

No manual testing, no manual building, no manual uploading. Push code, and the pipeline handles the rest.

---

## Why I built this

I wanted to actually *understand* DevOps concepts instead of just reading about them. CI/CD is one of those things that sounds simple in a tutorial but has a lot of small, practical details that only show up when you try to build it yourself — authentication, secrets management, permissions, caching. This project was my way of learning by doing.

---

## Tech stack

- **Node.js + Express** — the sample application
- **Jest + Supertest** — automated testing
- **Docker** — containerization
- **GitHub Actions** — CI/CD automation
- **Docker Hub** — image registry

---

## Project structure

```
ci-cd-demo-app/
├── index.js                     # Express app with two endpoints + a sample function
├── index.test.js                # Unit and API tests
├── package.json
├── package-lock.json
├── Dockerfile                   # Containerizes the app
├── .dockerignore
└── .github/workflows/ci-cd.yml  # The pipeline definition itself
```

---

## What I actually learned building this (not just the theory)

Setting this up wasn't a straight line — most of the real learning happened while fixing things that broke:

- **Git authentication has changed.** GitHub no longer accepts your account password for `git push` — you need a Personal Access Token, and if your workflow touches files inside `.github/workflows/`, that token specifically needs the **`workflow` scope**, not just `repo`. This isn't obvious until you hit the error.
- **CI caching needs a lock file.** GitHub Actions' `cache: 'npm'` option fails silently-ish (well, loudly, but confusingly) if there's no `package-lock.json` committed — `package.json` alone isn't enough.
- **Secrets aren't optional for private services.** The Docker Hub login step fails with "Username and password required" until you explicitly add `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` as encrypted secrets in the repo settings — CI runners have zero access to anything outside what you give them.
- **Jobs can depend on each other.** Using `needs: test` in the workflow means the Docker build/push job simply never runs if tests fail — which is the entire point of CI/CD: broken code never gets packaged.
- **Reading pipeline logs is a skill in itself.** GitHub Actions gives you a full breakdown per step, and the annotations section usually tells you exactly what's wrong — you just have to know where to look.

---

## How to run it yourself

```bash
git clone https://github.com/banerjeeabhinandan5-sys/CI-CD-DEMO-APP.git
cd CI-CD-DEMO-APP
npm install
npm test              # run the test suite locally
```

To run it in Docker:
```bash
docker build -t ci-cd-demo-app .
docker run -p 3000:3000 ci-cd-demo-app
# visit http://localhost:3000
```

To trigger the pipeline yourself: push any commit to `main` and watch the **Actions** tab.

---

## What I'd add next

- A real deployment step (Render/Railway) so the app goes live automatically after the Docker push, not just gets built
- ESLint as a step before tests
- Code coverage reporting via `jest --coverage`
- Branch-based environments — `dev` deploys to staging, `main` deploys to production

---

## About

Built by [Abhinandan Banerjee](https://github.com/banerjeeabhinandan5-sys) as a self-directed project to learn CI/CD fundamentals hands-on.
