import electron from "electron";
import en from "../../lang/en";

const app = electron.app || electron.remote.app;
const locale = app.getLocale();

let languageOverrides = {};

if (locale && locale !== "en") {
  try {
    languageOverrides = require(`../../lang/${locale}.json`);
  } catch (e) {
    console.warn("No language pack for user setting, falling back to en");
    console.warn(
      `Add a language pack by making the file src/lang/${locale}.json`
    );
  }
}

const translations = Object.keys(en).reduce((memo, key) => {
  memo[key] = languageOverrides[key] || en[key];
  return memo;
}, {});

export default key => {
  return translations[key];
};