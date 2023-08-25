const API_CLIENT_SETTINGS = {
    projectKey: process.env.REACT_APP_CTP_PROJECT_KEY,
    clientSecret: process.env.REACT_APP_CTP_CLIENT_SECRET,
    clientId: process.env.REACT_APP_CTP_CLIENT_ID,
    authUrl: process.env.REACT_APP_CTP_AUTH_URL,
    apiUrl: process.env.REACT_APP_CTP_API_URL,
    scope: process.env.REACT_APP_CTP_SCOPES,
    region: process.env.REACT_APP_CTP_REGION,
};

export default API_CLIENT_SETTINGS;
