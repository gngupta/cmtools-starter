import cart from '@/dao/cart-dao';

const CartHandler = function() {
  const cartHandler = {};

  cartHandler.addProduct = function(cartExists, productId, context) {
    if(!cartExists) {
      //parameters
      let params = {
        locale: 'EN', 
        cart: {
          currency:'EUR',
          lineItems: {
            productId: productId,
            quantity: 1
          }
        }
      }

      //creates the cart
      return cart('create', params, context).then((data) => {
        context.$store.commit("setCart", data.data.createMyCart);
      });
    } else {
      //given parameters
      let params = {
        locale: 'EN', 
        cartId: context.$store.getters.cart.id, 
        version: context.$store.getters.cart.version, 
        actions: [{
          addLineItem: {
            productId: productId, 
            quantity: 1
          }
        }]
      }

      //updates cart
      return cart('update', params, context).then((data) => {
        context.$store.commit("setCart", data.data.updateMyCart);
      });
    }
  }

  return cartHandler;
}

export default CartHandler;