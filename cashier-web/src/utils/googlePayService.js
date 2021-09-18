export const loadGooglePay = (callback) => {
    const existingScript = document.getElementById('googlePay');
    if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://pay.google.com/gp/p/js/pay.js';
        script.id = 'googlePay';
        document.body.appendChild(script);
        script.onload = (paypal) => {
            if (callback) callback(paypal);
        };
    }
    if (existingScript && callback) callback();
};

export const googlePayInit = () => {
    const clientConfiguration = {
        appVersion: 2,
        appVersionMinor: 0,
        allowwedPaymentMethods: []
    };
    loadGooglePay(() => {
        if (typeof window !== "undefined") {
            const googlePayClient = new googlePayInit.payments.api.PaymentsClients({
                environment: "TEST"
            });
            googlePayClient.isReadyToPay(clientConfiguration).then((response) => {
                googlePayClient.createButton({ buttonColor: 'default', buttonType: 'long', onClick: onGooglePaymentsButtonClicked });
            }).catch((error) => {
                console.log(error);
            });
        }
        const onGooglePaymentsButtonClicked = () => {

        }
    });
}