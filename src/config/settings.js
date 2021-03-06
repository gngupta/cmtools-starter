// default commercetools project credentials
const projectKey = process.env.VUE_APP_CT_PROJECT_KEY 
const clientId = process.env.VUE_APP_CT_CLIENT_ID 
const clientSecret = process.env.VUE_APP_CT_CLIENT_SECRET 

const authHost = process.env.VUE_APP_CT_AUTH_HOST || 'https://auth.commercetools.com';
const apiHost = process.env.VUE_APP_CT_API_HOST || 'https://api.commercetools.com';

function scopes() {
  return [
    'create_anonymous_token',
    'manage_my_payments',
    'manage_my_shopping_lists',
    'view_products',
    'manage_my_orders',
    'manage_my_profile'
  ]
    .map(scope => `${scope}:${projectKey}`);
}

export default {
  ct: {
    auth: {
      host: authHost,
      projectKey,
      credentials: {
        clientId,
        clientSecret,
      },
      scopes: scopes(),
    },
    api: {
      host: apiHost,
    },
  },
  languages: {
    en: 'English',
    de: 'Deutsch',
    nl: 'Nederlands'
  },
  categories: {
    salesExternalId: '6',
  },
};