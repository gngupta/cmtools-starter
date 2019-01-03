const LOCALE_LANGUAGE_START = 0
const LOCALE_LANGUAGE_END = 2

export default{
  language: state => state.locale.substring( LOCALE_LANGUAGE_START, LOCALE_LANGUAGE_END).toUpperCase(),
  locale: state => state.locale,
  categories: state => state.categories,
  cart: state => state.cart
}