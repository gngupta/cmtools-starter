const GraphQL = function() {
  //init factory object
  const graphql = {}

  //setting method for queries and mutations
  graphql.query = async function(query, params, context) {

    //creating a promise so it can be used outside this script
    let promise = new Promise(function (resolve, reject) {
      //Executes query
      context.$apollo.query({
        query: query,
        variables: params 

      }).then(function(data) {
        //give back the result of the query
        resolve(data);
    
      }).catch((error) =>{
        //error check
        reject(Error(error));

      })
    });
  
    //return the result
    let result = await(promise);
    return result;
  }

  graphql.mutate = async function(mutation, params, context) {

    //creating a promise so it can be used outside this script
    let promise = new Promise(function (resolve, reject) {
      //Executes query
      context.$apollo.mutate({
        mutation: mutation,
        variables: params 

      }).then(function(data) {
        //give back the result of the query
        resolve(data);
    
      }).catch((error) =>{
        //error 
        reject(Error(error));

      })
    });
  
    //return the result
    let result = await(promise);
    return result;
  }

  //return the object which can do everything
  return graphql;
}

//export the factory
export default GraphQL;