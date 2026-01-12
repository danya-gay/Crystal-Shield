importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp({ messagingSenderId: "1026779668106" });
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    const title = payload.notification.title;
    const options = {
        body: payload.notification.body,
        icon: 'https://img.icons8.com/color/96/shield.png'
    };
    return self.registration.showNotification(title, options);
});
