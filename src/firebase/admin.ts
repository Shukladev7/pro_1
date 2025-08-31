
import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK
let app: admin.app.App;

if (!admin.apps.length) {
  try {
    // For Vercel deployment, use service account from environment variables
    const serviceAccount = {
      type: process.env.FIREBASE_TYPE || 'service_account',
      project_id: process.env.FIREBASE_PROJECT_ID || 'test_project',
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID || 'test_key_id',
      private_key: (process.env.FIREBASE_PRIVATE_KEY || 'test_key')?.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL || 'test@test.com',
      client_id: process.env.FIREBASE_CLIENT_ID || 'test_client_id',
      auth_uri: process.env.FIREBASE_AUTH_URI || 'https://accounts.google.com/o/oauth2/auth',
      token_uri: process.env.FIREBASE_TOKEN_URI || 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL || 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL || 'https://www.googleapis.com/robot/v1/metadata/x509/test@test.com',
    };

    // Only initialize if we have valid credentials (not test values)
    if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY) {
      app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
      });
    } else {
      // Create a mock app for build time
      app = admin.initializeApp({
        projectId: 'test_project',
        credential: admin.credential.applicationDefault(),
      });
    }
  } catch (error) {
    console.warn('Firebase Admin initialization failed:', error);
    // Create a mock app for build time
    app = admin.initializeApp({
      projectId: 'test_project',
      credential: admin.credential.applicationDefault(),
    });
  }
} else {
  app = admin.apps[0]!;
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();
