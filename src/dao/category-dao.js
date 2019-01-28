import gql from "graphql-tag";
import gqlFactory from '@/dao/graphql-factory';
import getCategories from '@/graphql/Categories.gql';

const categoryDao = Object.assign({}, gqlFactory());

/**
 * All Category methods related to GraphQL
 * @param { The action you would like to perform } action 
 * @param { Patameters for the action } params 
 * @param { Where does it happen } context 
 */
export default function category(action, params, context) {
  if(action === 'getAll') {
    //get all categories and sub-categories
    let query = gql`${ getCategories }`;
    return categoryDao.query(query, params, context);

  }
}