import settings from '@/config/settings';
import { createAuthMiddlewareForAnonymousSessionFlow } from '@commercetools/sdk-middleware-auth/dist/commercetools-sdk-middleware-auth.cjs';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import createProvider from './apollo';
import createAjaxClient from './ajax';

//general
const projectKey = process.env.VUE_APP_CT_PROJECT_KEY;

//authentication
const authMiddleware = createAuthMiddlewareForAnonymousSessionFlow(settings.ct.auth);

//endpoints
const endpointGraphQL = `https://api.commercetools.com/${settings.ct.auth.projectKey}/graphql`;
const endpointREST = 'https://api.sphere.io/' + projectKey;


//building a link for graphQL with authentication
function addAuthHeader(request) {
  return new Promise(success => authMiddleware(requestWithAuth => success(requestWithAuth))(request));
}

const linkGraphQL = setContext(request => addAuthHeader(request)).concat(new HttpLink({ uri: endpointGraphQL }));

//create an instant of the clients
var ajaxInstance = createAjaxClient(endpointREST, authMiddleware);
var apolloInstance = createProvider(endpointGraphQL, linkGraphQL);

//returns the ajax client
export function ajaxClient() {
  return ajaxInstance;
}

//returns the apollo client
export function apolloClient() {
  return apolloInstance;
}