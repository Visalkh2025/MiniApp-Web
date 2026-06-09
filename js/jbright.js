window.JBright = {
    call: function(action, data, callback) {
        console.log("JBright action:", action);
        console.log("JBright data:", data);

        // iOS WebView Handler
        if (window.webkit &&
            window.webkit.messageHandlers &&
            window.webkit.messageHandlers.jbright) {
            console.log("Using iOS WebView handler");
            window.webkit.messageHandlers.jbright.postMessage({
                action: action,
                data: data || {}
            });
            if (callback) {
                window._jbrightCallbacks = window._jbrightCallbacks || {};
                window._jbrightCallbacks[action] = callback;
            }
            return;
        }

        // Android WebView Handler
        if (window.jbright && typeof window.jbright.call === 'function') {
            console.log("Using Android WebView handler");
            window.jbright.call(
                action,
                JSON.stringify(data || {}),
                callback ? callback.toString() : null
            );
            return;
        }

        // Payment Deeplink Handler - MUST BE CALLED FIRST
        if (action === "banking.payment.initiate") {
            if (data && data.paymentlink) {
                console.log("Redirecting to payment deeplink:", data.paymentlink);
                // Small delay to ensure logs are written before redirect
                setTimeout(() => {
                    window.location.href = data.paymentlink;
                }, 100);
                return;
            }
        }

        // Permission Handlers - Simulate native response
        if (action.startsWith("permission.")) {
            console.log("Permission request:", action);
            setTimeout(() => {
                if (callback) {
                    callback({ 
                        success: true, 
                        granted: true,
                        permission: action
                    });
                }
            }, 500);
            return;
        }

        // Fallback
        console.log("Using fallback handler for:", action);
        setTimeout(() => {
            if (callback) callback({ success: true, granted: true });
        }, 500);
    }
};

// Native callback handler for webview responses
window.onNativeResult = function(action, result) {
    console.log("Native result received:", action, result);
    const callbacks = window._jbrightCallbacks || {};
    if (callbacks[action]) {
        callbacks[action](result);
        delete callbacks[action];
    }
};

// ========================================
// NATIVE APP CALLBACK EXAMPLES (for testing)
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
