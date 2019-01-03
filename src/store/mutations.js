export const SET_DATA_BY_SLUG = 'SET_DATA_BY_SLUG';
export const SET_LANGUAGE = 'SET_LANGUAGE';


export default {
  SET_LANGUAGE(state, language) {
    state.language = language
  },

  SET_LOCALE(state, locale){
    state.locale = locale
  },

  SET_DATA_BY_SLUG(state, categories){
    state.categories = categories;
  },
  setCart(state, cart){
    state.cart = cart
  },
  
}