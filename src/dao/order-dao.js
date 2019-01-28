import { ajaxClient } from '@/services/comtools-provider';

//endpoint for orders
const endpoint = '/me/orders';

/**
 * All the functions to read, create, update and delete an order
 * @param { the action you would like to perform } action 
 * @param { parameters for the request} params
 */
export default function order(action, params) {
  if(action === 'convertCart') {
    //create a POST request
    const request = {
      uri: endpoint,
      method: "POST",
      body: params
    };

    //send the request to the api
    return ajaxClient().execute(request); 

  } 
}