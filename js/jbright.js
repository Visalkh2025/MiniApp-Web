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
