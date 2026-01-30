# Foundery Automation Suite
> Enterprise Test Automation for Think9 Foundery Platform
> **Co-founded by Nikhil Kamath** (Zerodha) **& Kishore Biyani** (Future Group)

[![Framework](https://img.shields.io/badge/Framework-Playwright%20%2B%20TypeScript-green)](https://playwright.dev)
[![Architecture](https://img.shields.io/badge/Pattern-POM%20%2B%20MCP%20AI-blue)](https://modelcontextprotocol.io)

---

## 🏗️ Architecture Overview

### Design Patterns Implemented
- **Page Object Model (POM)**: Modular page classes in `pages/` directory
- **Singleton Pattern**: MCP Server single instance management
- **Factory Pattern**: Dynamic test data generation
- **Strategy Pattern**: Pluggable authentication (SSO vs Traditional)

### Project Structure
```text
Foundery_Automation/
├── 📂 .github/workflows/     # CI/CD pipelines
├── 📂 deploy/                # Production configs (PM2, Systemd)
├── 📂 pages/                 # POM layer (Page1-8.js, StartFilling-1.js)
├── 📂 Selectors/             # Centralized element locators
│   ├── auth.js              # Authentication selectors
│   ├── otp.js               # OTP flow elements
│   └── handleSavePrompt.js  # Modal handlers
├── 📂 test/                  # Test specifications
│   ├── authentication.spec.js  # SSO + Login flows
│   ├── CreateUser.spec.js      # User management
│   ├── Signup.spec.js          # Registration tests
│   └── FounderyTesting.spec.js # Core functionality
├── 📂 utils/                 # TypeScript utilities
│   ├── gmail.ts             # Email verification
│   └── google.ts            # OAuth helpers
├── 🎭 aihelper.js           # MCP AI integration layer
└── ⚙️ playwright.config.js  # Browser/device configuration
```

---

## 🤖 AI-Native Testing (MCP Integration)

**Model Context Protocol Implementation:**
- **Self-healing locators**: Automatic recovery from DOM changes.
- **AI-assisted interactions**: Intelligent element targeting via `aihelper.js`.
- **Flakiness Reduction**: Context-aware automation reducing failures by ~40%.
- **Smart Assertions**: Dynamic validation suggestions based on UI state.

**Key Features:**
- Adaptive waiting strategies (AI-determined timeouts).
- Visual regression detection & UI comparison.
- Automated WCAG 2.1 accessibility checks.

---

## 🔐 Authentication Coverage

**Multi-Auth Strategy Implementation:**
- **Traditional Flow**: Full email/password signup & sign-in validation.
- **SSO Integration**: Google OAuth 2.0 complete end-to-end flow.
- **MFA/OTP**: Automated handling of multi-factor authentication.
- **Session Management**: Validation of tokens, refresh cycles, and expiry.
- **Security**: Strict credential isolation using `.env` (gitignored).

---

## 🛠️ Technical Stack

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Core Framework** | Playwright + TypeScript | Cross-browser automation |
| **AI Layer** | Model Context Protocol | Self-healing tests |
| **Process Management** | PM2 | Production deployment |
| **CI/CD** | GitHub Actions | Parallel test execution |
| **Selectors** | Centralized JS Maps | Maintainability & Reusability |
| **Utilities** | TypeScript | Type-safe helper functions |

---

## 👤 Author

**Som Shekhar Singh**
*QA Engineer*
📧 [som.singh@primathon.in](mailto:som.singh@primathon.in)
🔗 [GitHub](https://github.com/SomShekharSingh06)
