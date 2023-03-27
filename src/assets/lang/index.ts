import zh from './zh'
import en from './en'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: localStorage.getItem('lang') || 'zh',
    messages: { zh, en }
})

export default i18n

