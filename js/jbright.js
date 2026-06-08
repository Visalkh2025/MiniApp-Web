window.JBright = {
    call: function(action, data, callback) {
        
        console.log("action:", action)
        console.log("data:", data)
        console.log("data.paymentlink:", data?.paymentlink) 
        
        // PAYMENT FLOW
        if (action === "banking.payment.initiate") {

            console.log("Open Native Banking App");

            // Build deeplink URL for native banking app
            const deeplink = this.buildPaymentDeeplink(data);
            
            console.log("Deeplink:", deeplink);

            // Try to send to native iOS via WKWebView bridge first
            if (window.webkit && 
                window.webkit.messageHandlers && 
                window.webkit.messageHandlers.jbright) {
                
                window.webkit.messageHandlers.jbright.postMessage({
                    action: action,
                    data: data,
                    deeplink: deeplink
                });
                
                console.log("Message sent to native app");

            } else {

                // Fallback: Open deeplink directly if webkit not available
                console.log("Webkit not available, opening deeplink directly");

                // Try paymentlink from data first (if provided by server)
                if (data && data.paymentlink) {
                    console.log("Redirecting to:", data.paymentlink);
                    window.location.href = data.paymentlink;
                } else {
                    // Use generated deeplink
                    window.location.href = deeplink;
                }

            }

            return;
        }
        
        // Browser fallback for non-payment actions
        if (action === "banking.payment.initiate" && data && data.paymentlink) {
            console.log("Redirecting to:", data.paymentlink)
            window.location.href = data.paymentlink
            return
        }
        
        console.warn("JBright: action not handled");
    },

    // Build deeplink for banking app
    buildPaymentDeeplink: function(paymentData) {

        // Example deeplink formats:
        // For Khmer banking apps: banking://payment?params
        // Adjust based on your banking partner's deeplink scheme

        const params = new URLSearchParams({
            merchantId: paymentData.merchantId || "",
            merchantName: paymentData.merchantName || "",
            amount: paymentData.amount || "0",
            currency: paymentData.currency || "USD",
            orderId: paymentData.orderId || "",
            description: paymentData.description || "",
            callbackUrl: window.location.href // Return to this page after payment
        });

        // Banking app deeplink scheme
        // Change this based on your banking partner (e.g., acleda://, payapp://, etc.)
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
