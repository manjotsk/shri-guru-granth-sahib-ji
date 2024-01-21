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
        Password:"ਪਾਸਵਰਡ"

    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
