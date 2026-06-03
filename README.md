# Introduction

JBright allows web developers to build mini apps using standard JavaScript, HTML, and CSS while still accessing native mobile features such as camera, permissions, notifications, biometrics, and other device capabilities through simple JavaScript functions.

It also enables communication between the mini app and the native iOS/Android application, allowing JavaScript to trigger native functions and securely exchange data between the web layer and the native mobile application.

For example, a mini app can send payment data to the native banking app through JBright, where the native application securely processes the payment and returns the transaction result back to the mini app.


# Mini App Web Sample

Professional mini app demo for banking/native mobile integration using JavaScript, HTML, and CSS.

This project demonstrates how a mini web application can communicate with a native banking application through a JavaScript bridge (`JBright`).

The sample includes:

* payment flow
* native callback handling
* permission access
* mobile-first UI
* dark mode support
* responsive banking-style UX

---

# JBright Concept

JBright is a JavaScript bridge layer between:

```text id="hf4q9k"
Mini Web App
        ↕
JBright Bridge
        ↕
Native Mobile Application
```

It allows web developers to build mini apps using standard web technologies while still being able to access native mobile capabilities through simple JavaScript APIs.

---

# Features

* Cafe payment receipt UI
* Banking payment initiation flow
* Payment success / pending / failed screens
* Native callback simulation
* Device permission demo
* Camera permission
* Contacts permission
* Location permission
* Photo & file permission
* Mobile responsive UI
* Dark mode support
* Professional mini app architecture

---

# Project Structure

```text id="ch4qzt"
miniapp-web/
│
├── index.html
├── permission.html
├── success.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   └── jbright.js
│
└── README.md
```

---

# Mini App Payment Flow

```text id="dlfcga"
Mini Web
   ↓
banking.payment.initiate
   ↓
Native Banking App
   ↓
Payment Processing
   ↓
Native Callback
   ↓
window.onPaymentResult()
   ↓
Mini App UI Update
```

---

# JBright Architecture

```text id="vt0sn9"
Web Layer
    ↓
JBright.call(...)
    ↓
Native Bridge
    ↓
iOS / Android Native Layer
    ↓
Banking SDK / Native Features
```

---

# Example Payment Request

```javascript id="ehvtot"
const paymentRequest = {

    merchantId: "CAFE001",
    amount: 5.50,
    currency: "USD",
    orderId: "ORDER001"

};

JBright.call(
    "banking.payment.initiate",
    paymentRequest
);
```

---

# Example Native Callback

```javascript id="kqb72x"
window.onPaymentResult({

    success: true,
    transactionId: "TXN999888",
    amount: 5.50,
    currency: "USD",
    message: "Payment Completed"

});
```

---

# Device Permission APIs

```javascript id="njm78x"
JBright.call("permission.camera");

JBright.call("permission.contacts");

JBright.call("permission.location");

JBright.call("permission.photos");
```

---

# Supported Native Features

JBright can communicate with native mobile capabilities such as:

* Payment
* Camera
* Contacts
* Location
* Photos & Files
* Biometrics
* QR Scanner
* Push Notifications
* Native Navigation

---

# Purpose

This sample project demonstrates:

* Mini app architecture
* Native bridge communication
* Banking app integration
* Mobile WebView interaction
* Payment transaction flow
* Permission handling
* Mobile-first UI/UX
* Cross-platform mini apps

---

# Technologies

* HTML5
* CSS3
* JavaScript
* WebView Bridge
* Mobile Web UI

---

# Run Project

Open directly:

```text id="jnj76d"
index.html
```

Or use local server:

```bash id="upw2cm"
npx serve
```

---

# GitHub Pages Deployment

Enable GitHub Pages:

```text id="f3ap5i"
Settings
→ Pages
→ Deploy from branch
→ main
→ /root
```

Live URL example:

```text id="wfqt43"
https://YOUR_USERNAME.github.io/miniapp-web/
```

---

# Example Use Cases

* Banking Mini Apps
* Merchant Checkout
* QR Payment
* Embedded WebView Apps
* Super App Ecosystem
* Payment Gateway Integration
* Loyalty Programs

---

# Notes

This project is a frontend demo and simulates native bridge communication.

Real production implementations should:

* validate native requests
* securely verify payment status
* encrypt sensitive data
* use production banking SDKs
* implement authentication & authorization

---

# License

MIT License
