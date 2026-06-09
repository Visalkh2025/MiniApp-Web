window.JBright = {
    call: function(action, data, callback) {
        console.log("JBright action:", action);

        // iOS WebView Handler
        if (window.webkit &&
            window.webkit.messageHandlers &&
            window.webkit.messageHandlers.jbright) {
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
            window.jbright.call(
                action,
                JSON.stringify(data || {}),
                callback ? callback.toString() : null
            );
            return;
        }

        // Payment Deeplink Handler
        if (action === "banking.payment.initiate" && data && data.paymentlink) {
            window.location.href = data.paymentlink;
            return;
        }

        // Fallback: Simulate permission grants
        setTimeout(() => {
            if (callback) callback({ success: true, granted: true });
        }, 500);
    },

    // Build payment deeplink
    buildPaymentDeeplink: function(paymentData) {
        const params = new URLSearchParams({
            merchantId: paymentData.merchantId || "",
            merchantName: paymentData.merchantName || "",
            amount: paymentData.amount || "0",
            currency: paymentData.currency || "USD",
            orderId: paymentData.orderId || "",
            description: paymentData.description || "",
            callbackUrl: window.location.href
        });

        return `banking://payment?${params.toString()}`;
    }
};

// Native callback handler for webview responses
window.onNativeResult = function(action, result) {
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
