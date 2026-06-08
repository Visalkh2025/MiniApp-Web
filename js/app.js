let paymentTimeout = null;

function payNow() {

    const paymentData = {
        merchantId: "CAFE001",
        merchantName: "Mini Cafe",
        amount: 5.50,
        currency: "USD",
        orderId: "ORDER001",
        description: "Cafe Payment",
        paymentlink: "https://epaymentuat.acledabank.com.kh/acleda?partner_id=KOFI&payment_data=S6+ByBsYikp+HlKo1KvvNEKSds3yyQeu9SewRKG3F4f5LpAZ6C985acledabankSecurityTCgUACHayDOd7PeZTPUacledabank[...]"
    };
    
    console.log("Mini App Start Payment");
    console.log("paymentData:", JSON.stringify(paymentData, null, 2));

    showLoading(true);

    // Navigate to deeplink
    JBright.call(
        "banking.payment.initiate",
        paymentData
    );

    // Hide loading after 1 second (gives time for deeplink to open)
    paymentTimeout = setTimeout(() => {
        showLoading(false);
    }, 1000);
}


// Native callback from banking app
window.onPaymentResult = function(res) {

    console.log("Native Callback:", res);

    clearTimeout(paymentTimeout);

    showLoading(false);

    if (res.success) {

        localStorage.setItem(
            "paymentResult",
            JSON.stringify({
                status: "success",
                transactionId: res.transactionId,
                amount: res.amount,
                currency: res.currency,
                message: res.message
            })
        );

    } else {

        localStorage.setItem(
            "paymentResult",
            JSON.stringify({
                status: "failed",
                message: res.message || "Payment Failed"
            })
        );

    }

    window.location.href =
        "success.html";

};


// Permissions

function requestCamera() {

    JBright.call(
        "permission.camera",
        {},
        function(res) {

            alert(
                "📷 Camera Permission Granted"
            );

        }
    );

}

function requestContacts() {

    JBright.call(
        "permission.contacts",
        {},
        function(res) {

            alert(
                "👤 Contacts Permission Granted"
            );

        }
    );

}

function requestLocation() {

    JBright.call(
        "permission.location",
        {},
        function(res) {

            alert(
                "📍 Location Permission Granted"
            );

        }
    );

}

function requestPhotos() {

    JBright.call(
        "permission.photos",
        {},
        function(res) {

            alert(
                "🖼️ Photo Permission Granted"
            );

        }
    );

}


// Navigation

function openPermissionPage() {

    window.location.href =
        "permission.html";

}

function goHome() {

    window.location.href =
        "index.html";

}


// Loading UI

function showLoading(show) {

    const loading =
        document.getElementById(
            "loading"
        );

    if (!loading) return;

    loading.style.display =
        show ? "flex" : "none";

}
