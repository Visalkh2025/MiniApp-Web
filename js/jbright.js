window.JBright = {
    call: function(action, data, callback) {
        console.log("JBright action:", action)

        if (window.webkit &&
            window.webkit.messageHandlers &&
            window.webkit.messageHandlers.jbright) {
            window.webkit.messageHandlers.jbright.postMessage({
                action: action,
                data: data || {}
            })
            if (callback) {
                window._jbrightCallbacks = window._jbrightCallbacks || {}
                window._jbrightCallbacks[action] = callback
            }
            return
        }

        if (action === "banking.payment.initiate" && data && data.paymentlink) {
            window.location.href = data.paymentlink
            return
        }

        setTimeout(() => {
            if (callback) callback({ success: true, granted: true })
        }, 500)
    }
}

window.onNativeResult = function(action, result) {
    const callbacks = window._jbrightCallbacks || {}
    if (callbacks[action]) {
        callbacks[action](result)
        delete callbacks[action]
    }
}
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
