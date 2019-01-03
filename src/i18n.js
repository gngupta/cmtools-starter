import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { messages } from '@/lang/EN'
import axios from 'axios'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: "EN", // set locale
  fallbackLocale: 'EN',
  messages // set locale messages
})

const loadedLanguages = ['EN'] // our default language that is preloaded 

function setI18nLanguage (lang) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync (lang) {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return import(`@/lang/${lang}`).then(msgs => {
        i18n.setLocaleMessage(lang, msgs.messages[lang])
        loadedLanguages.push(lang)
        return setI18nLanguage(lang)
      })
    } 
    return Promise.resolve(setI18nLanguage(lang))
  }
  return Promise.resolve(lang)
}
