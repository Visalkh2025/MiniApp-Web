window.JBright = {

    call: function(action, data, callback) {

        console.log(
            "JBright Action:",
            action
        );

        console.log(
            "Payload:",
            data
        );


        // PAYMENT FLOW
        if (action === "banking.payment.initiate") {

            console.log(
                "Open Native Banking App"
            );

            // Send paymentData to native iOS via WKWebView bridge
            if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.jbright) {
                window.webkit.messageHandlers.jbright.postMessage({
                    action: action,
                    data: data
                });
            }

            return;

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