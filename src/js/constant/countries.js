const languages = {
    EN: {
        languageCode: "EN",
        languageName: "English",
        languageTimeCode: "en-us"
    },
    VN: {
        languageCode: "VN",
        languageName: "Việt Nam",
        languageTimeCode: "vi"
    },
    NL: {
        languageCode: "NL",
        languageName: "Netherlands",
        languageTimeCode: "en-us"
    }
}

const countries = {
    AU: {
        countryCode: "AU",
        countryName: "Australia",
        languages: {
            default: languages.EN
        }
    },
    US: {
        countryCode: "US",
        countryName: "USA",
        languages: {
            default: languages.EN
        }
    },
    NL: {
        countryCode: "NL",
        countryName: "Netherlands",
        languages: {
            default: languages.EN
        }
    },
    DE: {
        countryCode: "DE",
        countryName: "Germany",
        languages: {
            default: languages.EN
        }
    },
    FR: {
        countryCode: "FR",
        countryName: "France",
        languages: {
            default: languages.EN
        }
    },
    VN: {
        countryCode: "VN",
        countryName: "Viet Nam",
        languages: {
            default: languages.VN,
            EN: languages.EN
        }
    },
    TH: {
        countryCode: "TH",
        countryName: "Thailand",
        languages: {
            default: languages.EN
        }
    }
}

export default countries;