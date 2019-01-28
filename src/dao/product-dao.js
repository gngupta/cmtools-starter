import gql from "graphql-tag";
import gqlFactory from '@/dao/graphql-factory';
import productListing from '@/graphql/ProductListing.gql'
import productById from '@/graphql/ProductById.gql'

const productDao = Object.assign({}, gqlFactory());

/**
 * All the functions to read, create, update and delete a product
 * @param {*} action the action you would like to perform
 * @param {*} params given parameters 
 * @param {*} context from which page this gets called
 */
export default function product(action, params, context){
  if(action === 'getListing') {
    //Gets all the products under a category
    let query = gql`${ productListing }`;
    return productDao.query(query, params, context);

  } else if(action === 'getInformation') {
    //Gets the product details
    let query = gql`${ productById }`;
    return productDao.query(query, params, context);

  }
} 