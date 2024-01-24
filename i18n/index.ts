import 'intl-pluralrules'

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
        wjkk: "Waheguru Ji Ka Khalsa!",
        wjkf: "Waheguru Ji Ki Fateh!",
    },
  },
  pa: {
    translation: {
        wjkk: "ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖਾਲਸਾ।।",
        wjkf: "ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਿਹ।।",
        "Full Name": "ਪੂਰਾ ਨਾਮ",
        "Full Address": "ਪੂਰਾ ਪਤਾ",
        "Date of Birth": "Date of Birth",
        "Email": "ਈ - ਮੇਲ",
        Password:"ਪਾਸਵਰਡ",
        "Something Went Wrong":"ਕੁਝ ਗਲਤ",
        "Kindly fill out the missing details":"ਕਿਰਪਾ ਕਰਕੇ ਖੇਤਰਾਂ ਨੂੰ ਭਰੋ।",

    },
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3', 
  resources,
  lng: "en", // Default language
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
