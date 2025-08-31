# Escalation Tracker System

A modern escalation management system built with Next.js, Firebase, and Tailwind CSS, designed for deployment on Vercel.

## Features

- 🔥 **Real-time Escalation Management** - Track and manage customer escalations efficiently
- 👥 **Team Member Assignment** - Assign escalations to team members with automated notifications
- 📊 **Dashboard & Analytics** - Comprehensive reporting and status tracking
- 📧 **Email Notifications** - Automated email notifications using SendGrid
- 🤖 **AI-Powered Suggestions** - AI-driven department suggestions using Google AI
- 🔐 **Secure Authentication** - Firebase Authentication integration
- 📱 **Responsive Design** - Mobile-first design with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **Backend**: Next.js API Routes
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **AI**: Google Generative AI (Gemini)
- **Email**: SendGrid
- **Deployment**: Vercel

## Prerequisites

Before deploying, you'll need:

1. **Firebase Project** - Create a new Firebase project
2. **SendGrid Account** - For email notifications
3. **Google AI API Key** - For AI-powered suggestions
4. **Vercel Account** - For deployment

## Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd escalation-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your actual values in `.env.local`

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Variables

### Firebase Configuration
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Firebase Admin SDK
```bash
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key Here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_CLIENT_ID=your_client_id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your_service_account_email
FIREBASE_DATABASE_URL=https://your_project_id.firebaseio.com
```

### SendGrid Configuration
```bash
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=your_verified_sender_email
```

### Google AI Configuration
```bash
GOOGLE_AI_API_KEY=your_google_ai_api_key
```

## Deployment to Vercel

### 1. Connect to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project"
4. Import your GitHub repository

### 2. Configure Environment Variables

In your Vercel project settings, add all the environment variables from your `.env.local` file:

1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add each variable with the appropriate scope (Production, Preview, Development)

### 3. Deploy

1. Vercel will automatically detect it's a Next.js project
2. Click "Deploy"
3. Your app will be built and deployed

### 4. Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain

## Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database
4. Enable Authentication
5. Create a web app

### 2. Service Account

1. Go to Project Settings > Service Accounts
2. Generate new private key
3. Download the JSON file
4. Use the values in your environment variables

### 3. Firestore Rules

Update your Firestore rules in `firestore.rules` and deploy them:

```bash
firebase deploy --only firestore:rules
```

## SendGrid Setup

### 1. Create Account

1. Sign up at [SendGrid](https://sendgrid.com/)
2. Verify your sender email address
3. Generate an API key

### 2. Configure

1. Add your API key to environment variables
2. Add your verified sender email to environment variables

## Google AI Setup

### 1. Get API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create a new API key
3. Add it to your environment variables

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── ai/            # AI-related APIs
│   │   └── notifications/ # Notification APIs
│   ├── (main)/            # Main application routes
│   │   ├── dashboard/     # Dashboard page
│   │   ├── employees/     # Employee management
│   │   ├── escalations/   # Escalation management
│   │   └── settings/      # Application settings
│   └── layout.tsx         # Root layout
├── components/             # Reusable components
│   ├── ui/                # Base UI components
│   ├── dashboard/         # Dashboard-specific components
│   ├── employees/         # Employee-related components
│   └── escalations/       # Escalation-related components
├── context/                # React context providers
├── firebase/               # Firebase configuration
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and actions
├── services/               # External service integrations
└── types/                  # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository or contact the development team.
# Project01
# pro_1
# pro_1
# pro_1
