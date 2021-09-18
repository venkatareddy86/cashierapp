import { getDomainName } from './appUtil';
export const loadPaypal = (callback) => {
    const existingScript = document.getElementById('paypalcheckout');
    if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://www.paypalobjects.com/api/checkout.js';
        script.id = 'paypalcheckout';
        document.body.appendChild(script);
        script.onload = (paypal) => {
            if (callback) callback(paypal);
        };
    }
    if (existingScript && callback) callback();
};
export const pullPaypalCheckout = (amount, instructionId, depositType, paypalEnv, salesChannel, redirectModuleRequest) => {
    loadPaypal(() => {
        if (typeof window !== "undefined") {
            const { paypal } = window;
            paypal.Button.render({
                funding:
                {
                    disallowed: [paypal.FUNDING.CREDIT]
                },
                env: paypalEnv.value,
                payment: function (data, actions) {
                    if (depositType === "initialDeposit") {
                        amount = document.getElementById('amount').value;
                    }
                    let params = {
                        amount: amount,
                        instructionId: instructionId,
                        salesChannelId: salesChannel,
                        reason: '',
                        returnURL: getDomainName() + 'PayPalReturn.jsp',
                        cancelURL: getDomainName() + 'PayPalCancel.jsp'
                    }
                    redirectModuleRequest({ componentCode: "PayPal2", endpointName: "createCheckout", params: params });
                },
                onAuthorize: function (data, actions) {
                    let params = {
                        paymentId: data.paymentID,
                        payerId: data.payerID
                    }
                    redirectModuleRequest({ componentCode: "PayPal2", endpointName: "executeCheckout", params: params });
                },
                onCancel: function (data, actions) {
                    let params = {
                        paymentId: data.paymentID,
                        payerId: ""
                    }
                    redirectModuleRequest({ componentCode: "PayPal2", endpointName: "executeCheckout", params: params });
                }
            }, '#paypal-button');
        }
    });
}