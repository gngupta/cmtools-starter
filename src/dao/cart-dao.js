import gql from "graphql-tag";
import gqlFactory from '@/dao/graphql-factory';
import createCart from '@/graphql/CreateCart.gql';
import updateProductsInCart from '@/graphql/UpdateProductsInCart.gql';
import addAddressToCartQuery from "@/graphql/AddAddressToCart.gql";

const cartDao = Object.assign({}, gqlFactory());

/**
 * All Cart methods related to GraphQL
 * @param { The action you would like to perform } action 
 * @param { Patameters for the action } params 
 * @param { Where does it happen } context 
 */
export default function cart(action, params, context) {
  if(action === 'create') {
    //create a cart
    let mutation = gql`${ createCart }`;
    return cartDao.mutate(mutation, params, context);

  } else if(action === 'update') {
    //update the products in a cart
    let mutation = gql`${ updateProductsInCart }`;
    return cartDao.mutate(mutation, params, context);

  } else if(action === 'updateAddress') {
    //add an address to the cart
    let mutation = gql`${ addAddressToCartQuery }`;
    return cartDao.mutate(mutation, params, context);

  }
}