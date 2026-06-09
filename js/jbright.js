window.JBright = {
    call: function(action, data, callback) {
        console.log("=== JBright.call ===");
        console.log("action:", action);
        console.log("data:", data);

        // PRIMARY: Send to iOS Native Bridge
        if (window.webkit &&
            window.webkit.messageHandlers &&
            window.webkit.messageHandlers.jbright) {
            
            console.log("✅ Sending to iOS Native Bridge");
            
            const message = {
                action: action,
                data: data || {}
            };
            
            console.log("Message to native:", JSON.stringify(message));
            window.webkit.messageHandlers.jbright.postMessage(message);
            
            // Store callback for later
            if (callback) {
                window._jbrightCallbacks = window._jbrightCallbacks || {};
                window._jbrightCallbacks[action] = callback;
            }
            return;
        }

        // FALLBACK: Android WebView Handler
        if (window.jbright && typeof window.jbright.call === 'function') {
            console.log("✅ Sending to Android Native Bridge");
            window.jbright.call(
                action,
                JSON.stringify(data || {}),
                callback ? callback.toString() : null
            );
            return;
        }

        // FALLBACK: Direct Deeplink (for web testing only)
        if (action === "banking.payment.initiate" && data && data.paymentlink) {
            console.log("⚠️ Using Fallback Deeplink (Native Bridge not available)");
            setTimeout(() => {
                window.location.href = data.paymentlink;
            }, 100);
            return;
        }

        // FALLBACK: Permission Simulation
        console.log("⚠️ Native Bridge not available - using fallback");
        setTimeout(() => {
            if (callback) {
                callback({ 
                    success: true, 
                    granted: true,
                    permission: action
                });
            }
        }, 500);
    }
};

// Native callback handler - iOS calls this from Swift
window.onNativeResult = function(action, result) {
    console.log("=== Native Result Received ===");
    console.log("action:", action);
    console.log("result:", result);
    
    const callbacks = window._jbrightCallbacks || {};
    if (callbacks[action]) {
        console.log("✅ Executing callback for:", action);
        callbacks[action](result);
        delete callbacks[action];
    } else {
        console.log("⚠️ No callback registered for:", action);
    }
};

// ========================================
// NATIVE APP CALLBACK EXAMPLES (for testing)
// ========================================

function nativePaymentSuccess() {
    window.onPaymentResult({
        success: true,
        transactionId: "TXN999888",
        amount: 5.50,
        currency: "USD",
        message: "Payment Successful"
    });
}

function nativePaymentFailed() {
    window.onPaymentResult({
        success: false,
        message: "Insufficient Balance"
    });
}
