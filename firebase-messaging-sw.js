importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCSXAkvMhLGaJMBwGGY1SYqoDhulIMn5F4",
  authDomain: "mavrenxsecurity.firebaseapp.com",
  projectId: "mavrenxsecurity",
  storageBucket: "mavrenxsecurity.firebasestorage.app",
  messagingSenderId: "351069637181",
  appId: "1:351069637181:web:d204c4904017679506b854",
  measurementId: "G-MLY1MC2SDR"
});

const messaging = firebase.messaging();
