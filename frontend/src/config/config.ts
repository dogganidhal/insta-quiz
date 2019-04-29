

export interface EnvironmentConfig {
  apiBaseUrl: string;
  firebaseConfig: {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
},
  googleOAuth2ClientId: string;
}

export interface Config {
  [key: string]: EnvironmentConfig;
  staging: EnvironmentConfig;
  development: EnvironmentConfig;
}

export function getConfig(): Config {
  return require("./config.json");
}