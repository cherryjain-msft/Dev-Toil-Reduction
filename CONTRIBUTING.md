# Contributing to OctoCAT Supply Workshop

Thank you for your interest in contributing to the OctoCAT Supply Chain Management Workshop! This project is a hands-on workshop environment for learning GitHub Copilot features.

## 🎯 About This Workshop

**Important:** This is a workshop application designed to teach GitHub Copilot capabilities through hands-on labs. The primary objective is to provide a clean, realistic codebase for workshop participants to practice AI-assisted development. All contributions should keep this goal in mind.

## 🤝 How to Contribute

We welcome contributions in several areas:

### 1. Application Code (TypeScript/React)

Contributions to the actual application code (frontend and API) should:

- Be realistic and representative of typical enterprise applications
- Support existing or new workshop lab scenarios
- Follow existing patterns and coding standards
- Include tests where appropriate

### 2. Workshop Labs & Instructions

Workshop lab instructions live in the [`workshop/labs/`](./workshop/labs/) directory:

- **[lab-01-coding-agent](./workshop/labs/lab-01-coding-agent/README.md)** — Coding Agent: Zero to PR
- **[lab-02-agent-mode](./workshop/labs/lab-02-agent-mode/README.md)** — Agent Mode: Feature Build
- **[lab-03-code-review](./workshop/labs/lab-03-code-review/README.md)** — Code Review: AI First-Pass Review
- *(and more — see [workshop/README.md](./workshop/README.md) for the full list)*

When contributing to workshop labs:

- Keep scenarios realistic and relevant to enterprise developers
- Ensure steps are clear and reproducible
- Update related documentation if you change application behavior
- Test your lab walkthrough end-to-end before submitting

### 3. Documentation

Documentation improvements are always welcome:

- Architecture documentation in [`docs/`](./docs/)
- Setup and configuration instructions
- Troubleshooting guides
- Workshop best practices

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **npm** (comes with Node.js)
- **Git**

- **(Optional)** GitHub Personal Access Token (PAT) for MCP server demos

### Initial Setup

1. **Clone the repository**:

   ```bash
   git clone <your-repo-url>
   cd <repo-name>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Build the projects:**

   ```bash
   npm run build
   ```

4. **Initialize the database:**

   ```bash
   npm run db:seed
   ```

5. **Start the development servers:**

   ```bash
   npm run dev
   ```

   This starts both the API (port 3000) and frontend (port 5173).

### Development Workflow

1. **Create a feature branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the guidelines below

3. **Test your changes:**

   ```bash
   # Run all tests
   npm test
   
   # Run API tests only
   npm run test:api
   
   # Run frontend tests only
   npm run test:frontend
   
   # Lint frontend code
   npm run lint
   ```

4. **Build to ensure no errors:**

   ```bash
   npm run build
   ```

5. **Commit your changes** with a clear, descriptive commit message:

   ```bash
   git add .
   git commit -m "feat: Add shopping cart demo scenario"
   ```

6. **Push to your fork and create a Pull Request:**

   ```bash
   git push origin feature/your-feature-name
   ```

## 📋 Code Standards

### TypeScript/JavaScript

- Use TypeScript for type safety (avoid `any` unless absolutely necessary)
- Follow existing patterns in the codebase
- Use meaningful variable and function names
- Write tests for new features and bug fixes
- Run Prettier to format code: `npm run prettify`

### React/Frontend

- Use functional components with hooks
- Follow existing component structure patterns
- Use Tailwind CSS for styling (avoid custom CSS when possible)
- Ensure responsive design (test at mobile, tablet, and desktop sizes)
- Follow accessibility best practices (semantic HTML, ARIA labels when needed)

### API/Backend

- Follow RESTful conventions
- Use the repository pattern for data access
- Validate inputs and handle errors appropriately
- Update Swagger/OpenAPI documentation for new endpoints
- Use parameterized SQL queries (never build raw query strings with user input)

### Database

- Add migrations for schema changes in `api/sql/migrations/`
- Never modify existing migration files - always create a new sequential file
- Update seed data in `api/sql/seed/` if needed
- Test migrations with: `npm run db:migrate --workspace=api`

## 🧪 Testing Guidelines

All code changes should include appropriate tests:

- **Unit tests** for business logic and utilities
- **Integration tests** for API endpoints
- **Component tests** for complex React components
- Ensure tests are deterministic and don't depend on external services

Run tests before submitting:

```bash
npm test
```

## 📝 Commit Message Guidelines

Use conventional commit format:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `test:` - Test additions or updates
- `refactor:` - Code refactoring
- `chore:` - Build process or auxiliary tool changes

Example:

```
feat: Add product filtering to catalog page

- Implement filter by category
- Add price range slider
- Update API endpoint to support filtering
```

## 🌐 Contribution Paths

### For Repository Contributors

1. Create a branch in the repository
2. Make your changes following the guidelines above
3. Submit a pull request for review

### For Workshop Participants

If you're a workshop participant and want to share improvements:

1. **Fork the repository** to your account
2. **Document your changes thoroughly** in your pull request description
3. **Include testing evidence** (screenshots, test output, etc.)
4. **Open an issue** describing your proposed improvement

## 🔍 Review Process

All contributions go through a review process:

1. **Automated checks** - Linting, tests, and builds must pass
2. **Code review** - At least one maintainer will review your changes
3. **Workshop validation** - Changes that affect workshop labs will be tested
4. **Documentation review** - Ensure docs are updated for behavioral changes

## ❓ Questions or Issues?

- **General questions**: Open a GitHub Discussion in this repository
- **Bug reports**: Open an Issue with details
- **Feature proposals**: Open an Issue describing the workshop scenario

## 📚 Additional Resources

- [Main README](./README.md) - Project overview and setup
- [Workshop Labs](./workshop/README.md) - Complete workshop labs
- [Facilitator Guide](./workshop/FACILITATOR-GUIDE.md) - Workshop facilitation guide
- [Architecture Documentation](./docs/architecture.md) - System design details
- [Custom Instructions](./.github/copilot-instructions.md) - Copilot configuration for this repo

## 🙏 Thank You

Your contributions help make this workshop better for everyone learning GitHub Copilot. We appreciate your time and effort!

---

**Remember:** This is a workshop application designed to teach GitHub Copilot features. Keep the learning experience and lab effectiveness as your primary consideration when contributing.
