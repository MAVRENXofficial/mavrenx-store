/* =========================================
   MAVRENX STORE
========================================= */


/* =========================================
   SAVED DATA
========================================= */

let cart =
  JSON.parse(
    localStorage.getItem("mavrenx-cart")
  ) || [];


let likedItems =
  JSON.parse(
    localStorage.getItem("mavrenx-liked")
  ) || [];



/* =========================================
   SAVE DATA
========================================= */

function saveCart() {

  localStorage.setItem(
    "mavrenx-cart",
    JSON.stringify(cart)
  );

}


function saveLikes() {

  localStorage.setItem(
    "mavrenx-liked",
    JSON.stringify(likedItems)
  );

}



/* =========================================
   ADD TO CART
========================================= */

function addToCart(
  id,
  name,
  price,
  image
) {

  const existing =
    cart.find(
      item => item.id === id
    );


  if (existing) {

    existing.quantity += 1;

  } else {

    cart.push({

      id: id,

      name: name,

      price:
        Number(price),

      image: image,

      quantity: 1

    });

  }


  saveCart();

  updateCart();

  openCart();

}



/* =========================================
   QUANTITY +
========================================= */

function increaseQuantity(id) {

  const item =
    cart.find(
      item => item.id === id
    );


  if (!item) {
    return;
  }


  item.quantity += 1;


  saveCart();

  updateCart();

}



/* =========================================
   QUANTITY -
========================================= */

function decreaseQuantity(id) {

  const item =
    cart.find(
      item => item.id === id
    );


  if (!item) {
    return;
  }


  item.quantity -= 1;


  if (item.quantity <= 0) {

    cart =
      cart.filter(
        item =>
          item.id !== id
      );

  }


  saveCart();

  updateCart();

}



/* =========================================
   REMOVE CART ITEM
========================================= */

function removeFromCart(id) {

  cart =
    cart.filter(
      item =>
        item.id !== id
    );


  saveCart();

  updateCart();

}



/* =========================================
   UPDATE CART
========================================= */

function updateCart() {

  const count =
    document.getElementById(
      "cart-count"
    );


  const container =
    document.getElementById(
      "cart-items"
    );


  let totalQuantity = 0;


  cart.forEach(item => {

    totalQuantity +=
      Number(item.quantity) || 1;

  });


  if (count) {

    count.textContent =
      totalQuantity;

  }


  if (!container) {
    return;
  }


  if (cart.length === 0) {

    container.innerHTML = `

      <p class="empty-message">
        Your cart is empty.
      </p>

    `;

    return;

  }


  let html = "";

  let totalPrice = 0;


  cart.forEach(item => {

    const quantity =
      Number(item.quantity) || 1;


    const price =
      Number(item.price) || 0;


    totalPrice +=
      price * quantity;


    html += `

      <div class="cart-item">

        ${
          item.image
            ? `
              <img
                src="${item.image}"
                alt="${item.name}"
              >
            `
            : ""
        }

        <div class="cart-item-info">

          <h3>
            ${item.name}
          </h3>


          <p class="cart-price">
            €${price.toFixed(2)}
          </p>


          <div class="quantity-controls">

            <button
              type="button"
              onclick="decreaseQuantity('${item.id}')"
            >
              −
            </button>


            <span>
              ${quantity}
            </span>


            <button
              type="button"
              onclick="increaseQuantity('${item.id}')"
            >
              +
            </button>

          </div>


          <button
            type="button"
            class="remove-item"
            onclick="removeFromCart('${item.id}')"
          >
            Remove item
          </button>

        </div>

      </div>

    `;

  });


  html += `

    <div class="cart-total">

      <p>
        Total
      </p>

      <strong>
        €${totalPrice.toFixed(2)}
      </strong>


      <button
        type="button"
        class="checkout-button"
        onclick="checkout()"
      >
        Checkout
      </button>

    </div>

  `;


  container.innerHTML =
    html;

}



/* =========================================
   CART PANEL
========================================= */

function openCart() {

  closeLikes();


  const panel =
    document.getElementById(
      "cart-panel"
    );


  if (panel) {

    panel.classList.add(
      "active"
    );

  }


  updateCart();

}


function closeCart() {

  const panel =
    document.getElementById(
      "cart-panel"
    );


  if (panel) {

    panel.classList.remove(
      "active"
    );

  }

}



/* =========================================
   LIKE PRODUCT
========================================= */

function toggleLike(
  id,
  name,
  price,
  image
) {

  const existing =
    likedItems.some(
      item =>
        item.id === id
    );


  if (existing) {

    likedItems =
      likedItems.filter(
        item =>
          item.id !== id
      );

  } else {

    likedItems.push({

      id: id,

      name: name,

      price:
        Number(price),

      image: image

    });

  }


  saveLikes();

  updateLikes();

  updateProductLikeButtons();

}



/* =========================================
   REMOVE LIKE
========================================= */

function removeLike(id) {

  likedItems =
    likedItems.filter(
      item =>
        item.id !== id
    );


  saveLikes();

  updateLikes();

  updateProductLikeButtons();

}



/* =========================================
   ADD LIKED PRODUCT TO CART
========================================= */

function addLikedItemToCart(id) {

  const item =
    likedItems.find(
      product =>
        product.id === id
    );


  if (!item) {
    return;
  }


  addToCart(
    item.id,
    item.name,
    item.price,
    item.image
  );

}



/* =========================================
   UPDATE LIKES
========================================= */

function updateLikes() {

  const count =
    document.getElementById(
      "likes-count"
    );


  const container =
    document.getElementById(
      "liked-items"
    );


  if (count) {

    count.textContent =
      likedItems.length;

  }


  if (!container) {
    return;
  }


  if (likedItems.length === 0) {

    container.innerHTML = `

      <p class="empty-message">
        You haven't liked anything yet.
      </p>

    `;

    return;

  }


  let html = "";


  likedItems.forEach(item => {

    html += `

      <div class="liked-item">

        ${
          item.image
            ? `
              <img
                src="${item.image}"
                alt="${item.name}"
              >
            `
            : ""
        }

        <div class="liked-info">

          <h3>
            ${item.name}
          </h3>


          <p class="cart-price">
            €${Number(item.price).toFixed(2)}
          </p>


          <button
            type="button"
            class="main-button"
            onclick="addLikedItemToCart('${item.id}')"
          >
            Add to cart
          </button>


          <button
            type="button"
            class="remove-item"
            onclick="removeLike('${item.id}')"
          >
            Remove
          </button>

        </div>

      </div>

    `;

  });


  container.innerHTML =
    html;

}



/* =========================================
   PRODUCT LIKE BUTTONS
========================================= */

function updateProductLikeButtons() {

  document
    .querySelectorAll(
      "[data-product-like]"
    )
    .forEach(button => {

      const id =
        button.dataset.productLike;


      const liked =
        likedItems.some(
          item =>
            item.id === id
        );


      button.textContent =
        liked
          ? "♥ Liked"
          : "♡ Like";


      button.classList.toggle(
        "liked",
        liked
      );

    });

}



/* =========================================
   LIKES PANEL
========================================= */

function openLikes() {

  closeCart();


  const panel =
    document.getElementById(
      "likes-panel"
    );


  if (panel) {

    panel.classList.add(
      "active"
    );

  }


  updateLikes();

}


function closeLikes() {

  const panel =
    document.getElementById(
      "likes-panel"
    );


  if (panel) {

    panel.classList.remove(
      "active"
    );

  }

}



/* =========================================
   THEME
========================================= */

function toggleTheme() {

  document.body.classList.toggle(
    "dark-mode"
  );


  const dark =
    document.body.classList.contains(
      "dark-mode"
    );


  localStorage.setItem(
    "mavrenx-theme",
    dark
      ? "dark"
      : "light"
  );


  updateThemeButton();

}


function loadTheme() {

  const saved =
    localStorage.getItem(
      "mavrenx-theme"
    );


  if (saved === "dark") {

    document.body.classList.add(
      "dark-mode"
    );

  } else {

    document.body.classList.remove(
      "dark-mode"
    );

  }


  updateThemeButton();

}


function updateThemeButton() {

  const button =
    document.getElementById(
      "theme-button"
    );


  if (!button) {
    return;
  }


  const dark =
    document.body.classList.contains(
      "dark-mode"
    );


  button.textContent =
    dark
      ? "☀"
      : "☾";

}



/* =========================================
   CHECKOUT
========================================= */

function checkout() {

  if (cart.length === 0) {

    alert(
      "Your cart is empty."
    );

    return;

  }


  alert(
    "Secure checkout will be connected later."
  );

}



/* =========================================
   FIREBASE
========================================= */

const firebaseConfig = {

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

};



/* =========================================
   START FIREBASE
========================================= */

let messaging = null;


try {

  if (
    typeof firebase !==
    "undefined"
  ) {

    firebase.initializeApp(
      firebaseConfig
    );


    messaging =
      firebase.messaging();

  }

} catch (error) {

  console.error(
    "Firebase startup error:",
    error
  );

}



/* =========================================
   ENABLE NOTIFICATIONS
========================================= */

async function enableNotifications() {

  if (!window.isSecureContext) {

    alert(
      "Notifications require a secure HTTPS website."
    );

    return false;

  }


  if (
    !("Notification" in window)
  ) {

    alert(
      "This browser does not support notifications."
    );

    return false;

  }


  if (
    !("serviceWorker" in navigator)
  ) {

    alert(
      "This browser does not support notification service workers."
    );

    return false;

  }


  if (!messaging) {

    alert(
      "Notifications are not ready yet."
    );

    return false;

  }


  try {

    const permission =
      await Notification.requestPermission();


    if (
      permission !==
      "granted"
    ) {

      alert(
        "Notifications were not enabled."
      );

      return false;

    }


    const registration =
      await navigator.serviceWorker.register(
        "./firebase-messaging-sw.js"
      );


    const token =
      await messaging.getToken({

        vapidKey:
          "BPRe8I4x0JBgKbx4JgV68pX_R2aVpAJMacWlBfV0RS0D19P1i2Msr2BBcvcrLE8j18hacj-kDrFNmIif-tois8w",

        serviceWorkerRegistration:
          registration

      });


    if (!token) {

      alert(
        "We couldn't create a notification token."
      );

      return false;

    }


    /*
      TEMPORARY TEST STORAGE.

      Later this token will be stored
      privately with the customer's account.
    */

    localStorage.setItem(
      "mavrenx-notification-token",
      token
    );


    console.log(
      "MAVRENX notification token:",
      token
    );


    alert(
      "MAVRENX notifications are enabled!"
    );


    return true;


  } catch (error) {

    console.error(
      "Notification error:",
      error
    );


    alert(
      "There was a problem enabling notifications."
    );


    return false;

  }

}



/* =========================================
   FOREGROUND NOTIFICATIONS
========================================= */

if (messaging) {

  messaging.onMessage(
    async function(payload) {

      console.log(
        "MAVRENX notification:",
        payload
      );


      const title =
        payload.notification?.title ||
        "MAVRENX";


      const body =
        payload.notification?.body ||
        "You have a new order update.";


      if (
        Notification.permission ===
        "granted"
      ) {

        try {

          const registration =
            await navigator
              .serviceWorker
              .ready;


          registration.showNotification(
            title,
            {
              body: body
            }
          );

        } catch (error) {

          console.error(
            "Notification display error:",
            error
          );

        }

      }

    }
  );

}



/* =========================================
   CLOSE NOTIFICATION POPUP
========================================= */

function closeNotificationPopup() {

  const popup =
    document.getElementById(
      "notification-overlay"
    );


  if (popup) {

    popup.style.display =
      "none";

  }


  /*
    sessionStorage survives refresh,
    but disappears after the browsing
    session ends.
  */

  sessionStorage.setItem(
    "mavrenx-popup-seen",
    "yes"
  );

}



/* =========================================
   ENABLE FROM POPUP
========================================= */

async function enableNotificationsFromPopup() {

  await enableNotifications();


  closeNotificationPopup();

}



/* =========================================
   ESC KEY
========================================= */

document.addEventListener(
  "keydown",
  function(event) {

    if (
      event.key ===
      "Escape"
    ) {

      closeCart();

      closeLikes();

    }

  }
);



/* =========================================
   WEBSITE START
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    loadTheme();

    updateCart();

    updateLikes();

    updateProductLikeButtons();


    const popup =
      document.getElementById(
        "notification-overlay"
      );


    if (!popup) {
      return;
    }


    const seen =
      sessionStorage.getItem(
        "mavrenx-popup-seen"
      );


    /*
      If notifications are already enabled,
      don't bother showing the popup.
    */

    if (
      typeof Notification !==
        "undefined" &&
      Notification.permission ===
        "granted"
    ) {

      popup.style.display =
        "none";

      return;

    }


    /*
      If they've already seen it during
      this browsing session, don't show
      it again after refresh.
    */

    if (seen === "yes") {

      popup.style.display =
        "none";

    } else {

      popup.style.display =
        "flex";

    }

  }
);
