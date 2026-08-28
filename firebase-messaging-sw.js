/* =========================================
   FORCE NEW SERVICE WORKER TO ACTIVATE
========================================= */

self.addEventListener(
  "install",
  function(event) {
    self.skipWaiting();
  }
);


self.addEventListener(
  "activate",
  function(event) {

    event.waitUntil(
      self.clients.claim()
    );

  }
);


/* =========================================
   NOTIFICATION CLICK
   IMPORTANT: BEFORE FIREBASE IMPORTS
========================================= */

self.addEventListener(
  "notificationclick",
  function(event) {

    event.notification.close();


    const data =
      event.notification.data || {};


    const fcm =
      data.FCM_MSG || {};


    const targetUrl =
      data.trackingUrl ||
      data.url ||
      fcm.data?.trackingUrl ||
      fcm.data?.url ||
      fcm.fcmOptions?.link ||
      "https://mavrenxofficial.github.io/mavrenx-store/";


    event.waitUntil(

      clients
        .matchAll({
          type: "window",
          includeUncontrolled: true
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


/* =========================================
   FIREBASE
========================================= */

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
   BACKGROUND PUSH
========================================= */

messaging.onBackgroundMessage(
  function(payload) {

    console.log(
      "MAVRENX background push:",
      payload
    );


    const title =
      payload.notification?.title ||
      payload.data?.title ||
      "MAVRENX";


    const body =
      payload.notification?.body ||
      payload.data?.body ||
      "You have a new MAVRENX update.";


    const targetUrl =
      payload.data?.trackingUrl ||
      payload.data?.url ||
      "https://mavrenxofficial.github.io/mavrenx-store/";


    return self.registration
      .showNotification(
        title,
        {

          body: body,

          tag:
            "mavrenx-" +
            (
              payload.messageId ||
              Date.now()
            ),

          renotify: true,

          data: {
            url: targetUrl,
            trackingUrl: targetUrl
          }

        }
      );

  }
);
