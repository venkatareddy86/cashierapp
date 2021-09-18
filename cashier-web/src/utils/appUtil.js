export const getClassModifier = (methodId, baseClass) => {
    let className = baseClass ? baseClass : '';
    let classModifier = '';
    switch (methodId) {
        case 'VFI01':
        case 'VFIBT':
        case 'GPL00':
        case 'GPLBT':
            classModifier = 'bank';
            break;
        case 'NBXVI':
        case 'CC':
            classModifier = 'netbanx';
            break;
        case 'NetellerNS':
            classModifier = 'netteller';
            break;
        case 'NETELLER':
            classModifier = 'netteller';
            break;
        case 'PayNearMe':
            classModifier = 'paynearme';
            break;
        case 'PayPal':
        case 'PayPal2':
            classModifier = 'paypal';
            break;
        case 'Paysafecard':
            classModifier = 'paysafecard';
            break;
        case 'SEPACT':
            classModifier = 'sepact';
            break;
        case 'VFIVI':
        case 'VTVVI':
        case 'NBXVD':
        case 'VI':
        case 'VD':
            classModifier = 'visa';
            break;
        case 'VFIMC':
        case 'VTVMC':
        case 'NBXMD':
        case 'NBXMC':
        case 'MC':
        case 'MD':
            classModifier = 'mastercard';
            break;
        case 'NBXMA':
        case 'NBXMI':
        case 'MA':
        case 'MI':
            classModifier = 'maestro';
            break;
        case 'VFIAE':
        case 'VTVAE':
        case 'AE':
            classModifier = 'amex';
            break;
        case 'VFIDI':
        case 'VTVDI':
        case 'DI':
            classModifier = 'discover';
            break;
        case 'VFIDC':
        case 'VTVDC':
        case 'DC':
            classModifier = 'diners-club';
            break;
        case 'VFIJC':
        case 'VTVJC':
        case 'JC':
            classModifier = 'jcb';
            break;
        case 'NBXVE':
        case 'VE':
            classModifier = 'visa-electron';
            break;
        case 'VFI00':
        case 'VTV00':
        case '00':
        case 'Lottomaticard':
        case 'SC':
            classModifier = 'credit-card';
            break;
        case 'ApplePay':
            classModifier = 'apple-pay';
            break;
        case 'CHECK':
            classModifier = 'check';
            break;
        case 'Sightline':
            classModifier = 'sightline';
            break;
        default:
            classModifier = 'fallback';
            break;
    }

    if (classModifier) {
        className += '--' + classModifier;
    }

    return className;
}

export const getCardYears = () => {
    var year = new Date().getFullYear();
    var years = [];
    years.push({ name: "Year", value: '' });
    for (var i = year; i <= year + 10; i++) {
        years.push({ name: i, value: i.toString().slice(2) });
    }
    return years;
}
export const getCardMonths = () => {
    var months = [];
    months.push({ name: "Month", value: '' });
    for (let i = 1; i <= 12; i++) {
        let month = i.toString().padStart(2, "0");
        months.push({ name: month, value: month });
    }
    return months;
}

export const isEmptyObject = inputObject => {
    return Object.keys(inputObject).length === 0;
};
export const setCookie = (name, value, exdays) => {
    let exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    document.cookie = name + "=" + escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
}

export const getCookie = (name) => {
    let i, x, y, cookies = document.cookie.split(";");
    for (i = 0; i < cookies.length; i++) {
        x = cookies[i].substr(0, cookies[i].indexOf("="));
        y = cookies[i].substr(cookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x === name) {
            return unescape(y);
        }
    }
}

export const getDomainName = () => {
    if (process.env.NODE_ENV !== 'production') {
        return process.env.REACT_APP_PROXYURL;
    } else {
        return "/";
    }
}

