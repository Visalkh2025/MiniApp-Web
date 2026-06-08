window.JBright = {
    call: function(action, data, callback) {
        
        console.log("action:", action)
        console.log("data:", data)
        console.log("data.paymentlink:", data?.paymentlink) 
        
        // PAYMENT FLOW
        if (action === "banking.payment.initiate") {

            console.log("Opening Banking App");

            // Use paymentlink from data if provided
            if (data && data.paymentlink) {
                console.log("Navigating to deeplink:", data.paymentlink);
                window.location.href = data.paymentlink;
                return;
            }

            // Otherwise, build deeplink from payment data
            const deeplink = this.buildPaymentDeeplink(data);
            console.log("Generated deeplink:", deeplink);
            window.location.href = deeplink;

            return;
        }
        
        console.warn("JBright: action not handled");
    },

    // Build deeplink for banking app
    buildPaymentDeeplink: function(paymentData) {

        // Generate deeplink with payment parameters
        const params = new URLSearchParams({
            merchantId: paymentData.merchantId || "",
            merchantName: paymentData.merchantName || "",
            amount: paymentData.amount || "0",
            currency: paymentData.currency || "USD",
            orderId: paymentData.orderId || "",
            description: paymentData.description || "",
            callbackUrl: window.location.href
        });

        // Update this with your actual banking app deeplink scheme
        // Examples:
        // - acleda://payment?...
        // - payapp://payment?...
        // - khqr://payment?...
        const deeplink = `banking://payment?${params.toString()}`;

        return deeplink;

    }
}


// PERMISSION FLOW
setTimeout(() => {

    let response = {
        success: true,
        message: "Success",
        action: action
    };

    if (callback) {
        callback(response);
    }

}, 1000);


// ========================================
// NATIVE APP CALLBACK EXAMPLES
// ========================================


// Native payment success
function nativePaymentSuccess() {

    window.onPaymentResult({

        success: true,
        transactionId: "TXN999888",
        amount: 5.50,
        currency: "USD",
        message: "Payment Successful"

    });

}


// Native payment failed
function nativePaymentFailed() {

    window.onPaymentResult({

        success: false,
        message: "Insufficient Balance"

    });

}
