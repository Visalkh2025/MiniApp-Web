window.JBright = {
    call: function(action, data, callback) {
        
        console.log("action:", action)
        console.log("data:", data)
        console.log("data.paymentlink:", data?.paymentlink) // ← check នេះ
        
        // iOS WKWebView
        if (window.webkit && 
            window.webkit.messageHandlers && 
            window.webkit.messageHandlers.jbright) {
            window.webkit.messageHandlers.jbright.postMessage({
                action: action,
                data: data
            })
            return
        }
        
        // Browser fallback
        if (action === "banking.payment.initiate" && data && data.paymentlink) {
            console.log("Redirecting to:", data.paymentlink)
            window.location.href = data.paymentlink
            return
        }
        
        console.warn("JBright: bridge not found")
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

    }

};



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
