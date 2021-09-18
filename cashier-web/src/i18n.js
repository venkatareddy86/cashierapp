import translationEn from "./assets/i18n/en.json";
import translationIt from "./assets/i18n/it.json";

export const getI18nContent = (language = "en", messages) => {
    let response = {};
    if (language === "en") {
        response = translationEn;
    }
    if (language === "it") {
        response = translationIt;
    }
    messages && messages.forEach((message) => response[message.code] = message.value);
    return response;
}
