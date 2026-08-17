import axios from 'axios';

const APP_API_URL = import.meta.env.VITE_APP_API_URL;

const APP_GITHUB_OAUTH_CALLBACK_URL = import.meta.env.VITE_APP_GITHUB_OAUTH_CALLBACK_URL;

export async function apiGithubOAuthRedirect() {
  try {
    return await axios.get(APP_API_URL + '/github/oauth/redirect', { params: { callback_url: APP_GITHUB_OAUTH_CALLBACK_URL } });
  } catch (error) {
    throw error;
  }
}
export async function apiGithubOAuthExchangeToken(token) {
  try {
    return await axios.post(APP_API_URL + '/github/oauth/exchange/token', null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
}
