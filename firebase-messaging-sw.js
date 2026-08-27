importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);


firebase.initializeApp({

  apiKey:
    "AIzaSyCSXAkvMhLGaJMBwGGY1SYqoDhulIMn5F4",

  authDomain:
    "mavrenxsecurity.firebaseapp.com",

  projectId:
    "mavrenxsecurity",

  storageBucket:
    "mavrenxsecurity.firebasestorage.app",

  messagingSenderId:
    "351069637181",

  appId:
    "1:351069637181:web:d204c4904017679506b854",

  measurementId:
    "G-MLY1MC2SDR"

});


const messaging =
  firebase.messaging();


/* =========================================
   BACKGROUND NOTIFICATIONS
========================================= */

messaging.onBackgroundMessage(
  function(payload) {

    console.log(
      "MAVRENX background notification:",
      payload
    );

  }
);


/* =========================================
   NOTIFICATION CLICK
========================================= */

self.addEventListener(
  "notificationclick",

  function(event) {

    event.notification.close();


    const notificationData =
      event.notification.data ||
      {};


    const fcmMessage =
      notificationData.FCM_MSG ||
      {};


    const targetUrl =

      notificationData.trackingUrl ||

      notificationData.url ||

      fcmMessage.data?.trackingUrl ||

      fcmMessage.data?.url ||

      fcmMessage.fcmOptions?.link ||

      "https://mavrenxofficial.github.io/mavrenx-store/";


    event.waitUntil(

      clients
        .matchAll({

          type:
            "window",

          includeUncontrolled:
            true

        })

        .then(

          async function(windowClients) {

            for (
              const client of windowClients
            ) {

              if (
                "focus" in client
              ) {

                await client.focus();


                if (
                  "navigate" in client
                ) {

                  await client.navigate(
                    targetUrl
                  );

                }


                return;
              }

            }


            if (
              clients.openWindow
            ) {

              return clients.openWindow(
                targetUrl
              );

            }

          }

        )

    );

  }

);
