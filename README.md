# HerBody Frontend

HerBody is a privacy-focused femtech education and health-journey web application. It gives users a calm, accessible interface for learning about their bodies, exploring a 3D-inspired anatomical atlas, and managing an authenticated health journey.

This repository contains the frontend only. The backend is hosted separately and is not modified by this project.

## Product experience

### Public experience

- Branded HerBody sign-in screen
- Confidential account registration
- Email verification with OTP
- Verification OTP resend
- Forgot-password OTP request
- Password reset using an OTP
- Anonymous exploration links to the educational areas
- Responsive layout for desktop, tablet, and mobile screens

### Authenticated experience

- Interactive Body dashboard
- Curriculum sidebar with:
  - Interactive Body
  - Organ Details
  - AI Companion
- Cycle status indicator
- Whole Body, Pelvic System, and Neuroendocrine atlas tabs
- Anatomical model visual with heart and uterus focus points
- Uterus detail card with cycle and lining information
- Functional logout that revokes the backend session and clears the local access token

The current dashboard is a frontend experience. Interactive atlas controls and clinical data are visual UI elements until their corresponding backend features are available.

## Technology

- Next.js `16.4.5`
- React `19.3.0`
- TypeScript `5`
- Tailwind CSS `4`
- ESLint
- Next.js App Router
- Next.js rewrites for the backend proxy

## Backend API

Production backend:

<https://herbody-backend.onrender.com>

The frontend uses these existing backend routes:

| Method | Route | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Create a user account |
| `POST` | `/api/auth/login` | Authenticate a user |
| `GET` | `/api/auth/me` | Retrieve the current user |
| `POST` | `/api/auth/verify-email` | Verify an email with an OTP |
| `POST` | `/api/auth/resend-verification-otp` | Resend an email verification OTP |
| `POST` | `/api/auth/forgot-password` | Request a password-reset OTP |
| `POST` | `/api/auth/reset-password` | Reset a password with an OTP |
| `POST` | `/api/auth/refresh` | Refresh the access token using the `refreshToken` cookie |
| `POST` | `/api/auth/logout` | Revoke the refresh session and clear the cookie |
| `GET` | `/health` | Check API availability |
| `GET` | `/health/db` | Check database availability |

### API request behavior

API requests are centralized in [`src/lib/api.ts`](./src/lib/api.ts). The helper:

- Sends JSON request bodies
- Includes cookies with requests
- Adds a Bearer access token when one is available
- Parses backend error messages
- Throws explicit errors for non-success responses
- Stores access tokens returned by login or registration in `sessionStorage`

The backend currently responds with a wildcard CORS origin. To support credentialed cookies safely in the browser, requests use the Next.js proxy path `/backend-api/*`. The rewrite in [`next.config.ts`](./next.config.ts) forwards those requests to the production backend.

## Routes

| Frontend route | Description |
| --- | --- |
| `/` | Login screen |
| `/login` | Login screen |
| `/register` | Account registration |
| `/verify-email` | Email OTP verification and resend |
| `/forgot-password` | Request a password recovery OTP |
| `/reset-password` | Reset a password using an OTP |
| `/health-journey` | Authenticated-style body atlas dashboard |
| `/healthy-life` | Healthy Life educational topics |

## Project structure

```text
frontend/
├── public/
│   └── body.png                  # Anatomical illustration used in auth UI
├── src/
│   ├── app/
│   │   ├── forgot-password/      # Password recovery request
│   │   ├── health-journey/       # Logged-in body atlas dashboard
│   │   ├── healthy-life/         # Educational topic cards
│   │   ├── login/                # Login page
│   │   ├── register/             # Registration page
│   │   ├── reset-password/       # Password reset page
│   │   ├── verify-email/         # Email verification page
│   │   ├── globals.css           # Theme and responsive UI styles
│   │   ├── layout.tsx            # Root metadata and font configuration
│   │   └── page.tsx              # Home/login entry screen
│   ├── components/
│   │   ├── auth/
│   │   │   ├── AuthForm.tsx      # Shared authentication form logic
│   │   │   └── AuthShell.tsx     # Shared authentication layout
│   │   ├── layout/               # Legacy shared navigation/footer components
│   │   └── ui/                   # Reusable UI components
│   └── lib/
│       └── api.ts                # Backend request and token helpers
├── next.config.ts                # Backend rewrite and Turbopack configuration
├── package.json
└── tsconfig.json
```

## Requirements

- Node.js 20 or newer is recommended
- npm
- Access to the HerBody backend for authentication requests

## Local development

From the repository root:

```bash
cd frontend
npm install
npm run dev
```

Open <http://localhost:3000>.

The development server uses the same `/backend-api/*` proxy as production, so no local backend URL configuration is required.

## Available scripts

Run these commands from `frontend/`:

```bash
npm run dev       # Start the development server
npm run lint      # Run ESLint
npm run build     # Create a production build
npm run start     # Serve the production build locally
```

Before opening a pull request, run:

```bash
npm run lint
npm run build
```

## Deploying to Vercel

1. Import `herbody-team/herbody-frontend` into Vercel.
2. Set **Root Directory** to `frontend`.
3. Use the **Next.js** framework preset.
4. Use `npm run build` as the build command.
5. Leave the output directory at its default.
6. Deploy.

No frontend environment variables are currently required. The production backend URL is configured through the rewrite in [`next.config.ts`](./next.config.ts).

After deployment, verify:

- Login and registration
- Email verification and OTP resend
- Password recovery and reset
- Dashboard navigation
- Logout
- Mobile layout

## Design and accessibility notes

- The interface uses a blush, cream, and berry color palette.
- Authentication layouts are responsive and collapse into a mobile-friendly single-column design.
- Form controls include browser validation, disabled loading states, and visible error/success messages.
- Images include descriptive alternative text where they convey information.
- Health content is educational and does not replace professional medical advice.

## Privacy and security notes

- The frontend does not contain database credentials or backend secrets.
- Refresh sessions are handled through the backend `HttpOnly` cookie.
- Access tokens returned by the backend are stored in browser `sessionStorage`.
- Do not commit credentials, API keys, or private user data.
- The frontend does not diagnose medical conditions or replace a healthcare professional.

## Scope and future work

The current frontend establishes the visual foundation and authentication flow. Future backend-connected work may include:

- Real user profile data on the dashboard
- Protected route middleware
- Real-time cycle and health data
- Interactive 3D anatomy controls
- Organ detail pages
- AI Companion conversations
- User preferences and settings
- Automated frontend tests

These features should be added using existing backend contracts rather than inventing new API routes.
