let paymentTimeout = null;

function payNow() {

    const paymentData = {
        merchantId: "CAFE001",
        merchantName: "Mini Cafe",
        amount: 5.50,
        currency: "USD",
        orderId: "ORDER001",
        description: "Cafe Payment",
        paymentlink: "https://epaymentuat.acledabank.com.kh/acleda?partner_id=KOFI&payment_data=S6+ByBsYikp+HlKo1KvvNEKSds3yyQeu9SewRKG3F4f5LpAZ6C985acledabankSecurityTCgUACHayDOd7PeZTPUacledabankSecurityTCdjNqdCXr0qqacledabankSecurityTCF8EyBgUQqC56u1U9HbTB0x10LkB9aZmxxqO8S64f1NQ+0JBFlNuSf1P1udx8sVreoZyhJX5BoxzrBDI2VsDqjl4wgDkvhpUZy8xt8NSWszgKSKGl6BKB2acledabankSecurityTCASbLNR++nJUKsh01cKMNvaMYkzVMWeQymWxbnWzPNTL1Wbqk08T2UA63qCpq7L3ZaDQkqSU8FFdCPD4G9d2hU0aL6jE9KK+L31C3fHOhq+9wkNck3bdCaeJcO4UG08wHXDR19jFtZW4bYXweilEjFqpxdacledabankSecurityTC4KoLVWNtTmHvB6z4tY+OImxc3bUzsUOjzZs8PFm2G8LhJOH6f3MLuAS+OxABUvfCacledabankSecurityTCuhEm0iaGWFR3B4OzChPs+wfacledabankSecurityTC1An6TO195m1D93JacledabankSecurityTC8y43vE4w3oavKgvEhBvAaYPqMbqqacledabankSecurityTCOYuacledabankSecurityTC5JjfYtpTPbACJb2yfxZcc852EtJGmu1HvNM9OaZqI0lHHOrlkpy+uMK2sukV1G8m6dEzNm78WmBYzvTacledabankSecurityTCV+xlkJ30ddZ+TAdJYPyL7iYrmAaLi23A0TfT3mci6GK7PONzmm1S+nxO8sj6Irvv1bn127asiLgJJzD++cBam3Sg=="
    };
    
    console.log("Mini App Start Payment");
    console.log("paymentData:", JSON.stringify(paymentData, null, 2));

    showLoading(true);

    JBright.call(
        "banking.payment.initiate",
        paymentData
    );

   // paymentTimeout = setTimeout(() => {
   //      showLoading(false)
   //      localStorage.setItem('paymentResult', JSON.stringify({
   //          status: 'pending',
   //          transactionId: '-',
   //          amount: 5.50,
   //          currency: 'USD',
   //          message: 'Waiting Bank Confirmation'
   //      }))
   //      window.location.href = 'https://visalkh2025.github.io/MiniApp-Web/success.html'
   //  }, 10000)
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
