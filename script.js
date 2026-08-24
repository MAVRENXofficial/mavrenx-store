/* =========================================
   MAVRENX
   MAIN JAVASCRIPT
========================================= */


/* =========================================
   SAVED CART + LIKES
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
   CART
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
      price: Number(price),
      image: image,
      quantity: 1
    });
  }

  saveCart();
  updateCart();
  openCart();
}


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
        item => item.id !== id
      );
  }

  saveCart();
  updateCart();
}


function removeFromCart(id) {
  cart =
    cart.filter(
      item => item.id !== id
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

  container.innerHTML = html;
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
   LIKES
========================================= */

function toggleLike(
  id,
  name,
  price,
  image
) {
  const existing =
    likedItems.some(
      item => item.id === id
    );

  if (existing) {
    likedItems =
      likedItems.filter(
        item => item.id !== id
      );
  } else {
    likedItems.push({
      id: id,
      name: name,
      price: Number(price),
      image: image
    });
  }

  saveLikes();
  updateLikes();
  updateProductLikeButtons();
}


function removeLike(id) {
  likedItems =
    likedItems.filter(
      item => item.id !== id
    );

  saveLikes();
  updateLikes();
  updateProductLikeButtons();
}


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

  container.innerHTML = html;
}


/* =========================================
   LIKE BUTTON APPEARANCE
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
          item => item.id === id
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
   DARK / LIGHT THEME
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
   FIREBASE CONFIG
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
    if (
      firebase.apps &&
      firebase.apps.length === 0
    ) {
      firebase.initializeApp(
        firebaseConfig
      );
    }

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
   POPUP HELPERS
========================================= */

function getNotificationPopup() {
  return document.getElementById(
    "notification-overlay"
  );
}


function getNotificationText() {
  const popup =
    getNotificationPopup();

  if (!popup) {
    return null;
  }

  return popup.querySelector("p");
}


function getNotificationButton() {
  const popup =
    getNotificationPopup();

  if (!popup) {
    return null;
  }

  return popup.querySelector(
    ".enable-notifications-button"
  );
}


/* =========================================
   CHANGE POPUP MESSAGE
========================================= */

function setNotificationMessage(
  message
) {
  const text =
    getNotificationText();

  if (text) {
    text.textContent = message;
  }
}


function setNotificationButton(
  text,
  disabled = false
) {
  const button =
    getNotificationButton();

  if (!button) {
    return;
  }

  button.textContent = text;
  button.disabled = disabled;

  if (disabled) {
    button.style.opacity = "0.55";
    button.style.cursor =
      "not-allowed";
  } else {
    button.style.opacity = "1";
    button.style.cursor =
      "pointer";
  }
}


/* =========================================
   CLOSE NOTIFICATION POPUP
========================================= */

function closeNotificationPopup() {
  const popup =
    getNotificationPopup();

  if (popup) {
    popup.style.display =
      "none";
  }

  sessionStorage.setItem(
    "mavrenx-popup-seen",
    "yes"
  );
}


/* =========================================
   NOTIFICATION SUPPORT CHECK
========================================= */

function checkNotificationSupport() {
  if (!window.isSecureContext) {
    return {
      supported: false,
      reason:
        "Notifications require a secure HTTPS connection. You can still track your order normally."
    };
  }

  if (
    !("Notification" in window)
  ) {
    return {
      supported: false,
      reason:
        "Notifications aren't supported in this browser. You can still track your order normally."
    };
  }

  if (
    !("serviceWorker" in navigator)
  ) {
    return {
      supported: false,
      reason:
        "This browser doesn't support the notification service needed by MAVRENX. Order tracking will still work normally."
    };
  }

  if (!messaging) {
    return {
      supported: false,
      reason:
        "Push notifications aren't available in this browser setup right now. You can still track your order normally."
    };
  }

  return {
    supported: true
  };
}


/* =========================================
   ENABLE NOTIFICATIONS
========================================= */

async function enableNotifications() {
  const support =
    checkNotificationSupport();

  if (!support.supported) {
    setNotificationMessage(
      support.reason
    );

    setNotificationButton(
      "Notifications unavailable",
      true
    );

    return false;
  }


  /*
    Browser has already blocked
    notification permission.
  */

  if (
    Notification.permission ===
    "denied"
  ) {
    setNotificationMessage(
      "Notifications are blocked in this browser. That's okay — you can still use MAVRENX and track your order normally."
    );

    setNotificationButton(
      "Notifications blocked",
      true
    );

    return false;
  }


  /*
    Browser already has permission.
  */

  if (
    Notification.permission ===
    "granted"
  ) {
    return await createNotificationToken();
  }


  /*
    First-time permission request.
  */

  try {
    setNotificationButton(
      "Waiting for permission...",
      true
    );

    const permission =
      await Notification
        .requestPermission();


    if (
      permission ===
      "granted"
    ) {
      return await createNotificationToken();
    }


    if (
      permission ===
      "denied"
    ) {
      setNotificationMessage(
        "Notifications weren't allowed. No problem — MAVRENX will still work normally and you can track your order from the Track Order page."
      );

      setNotificationButton(
        "Notifications blocked",
        true
      );

      return false;
    }


    setNotificationMessage(
      "Notifications weren't enabled. You can still track your order normally."
    );

    setNotificationButton(
      "Enable notifications",
      false
    );

    return false;

  } catch (error) {
    console.error(
      "Permission error:",
      error
    );

    setNotificationMessage(
      "Notifications aren't available in this browser right now. You can still track your order normally."
    );

    setNotificationButton(
      "Notifications unavailable",
      true
    );

    return false;
  }
}


/* =========================================
   CREATE FIREBASE TOKEN
========================================= */

async function createNotificationToken() {
  try {
    setNotificationMessage(
      "Setting up MAVRENX notifications..."
    );

    setNotificationButton(
      "Setting up...",
      true
    );


    const registration =
      await navigator
        .serviceWorker
        .register(
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
      setNotificationMessage(
        "Push notifications couldn't be activated in this browser. You can still track your order normally."
      );

      setNotificationButton(
        "Notifications unavailable",
        true
      );

      return false;
    }


    /*
      Temporary storage for testing.

      Later we'll save this securely
      with the customer's account/order.
    */

    localStorage.setItem(
      "mavrenx-notification-token",
      token
    );


    console.log(
      "MAVRENX notification token:",
      token
    );


    localStorage.setItem(
      "mavrenx-notifications-enabled",
      "yes"
    );


    setNotificationMessage(
      "Notifications are enabled! You'll be able to receive MAVRENX order updates on this device."
    );


    setNotificationButton(
      "Notifications enabled ✓",
      true
    );


    setTimeout(
      function() {
        closeNotificationPopup();
      },
      1200
    );


    return true;

  } catch (error) {
    console.error(
      "Firebase notification error:",
      error
    );


    /*
      This can happen in browsers
      such as Brave when their push
      service is disabled.
    */

    setNotificationMessage(
      "Push notifications aren't available with this browser setup. You can still shop and track your order normally."
    );


    setNotificationButton(
      "Notifications unavailable",
      true
    );


    return false;
  }
}


/* =========================================
   ENABLE BUTTON
========================================= */

async function enableNotificationsFromPopup() {
  await enableNotifications();
}


/* =========================================
   FOREGROUND PUSH MESSAGES
========================================= */

if (messaging) {
  try {
    messaging.onMessage(
      async function(payload) {
        console.log(
          "MAVRENX notification received:",
          payload
        );

        const title =
          payload.notification?.title ||
          "MAVRENX";

        const body =
          payload.notification?.body ||
          "You have a new order update.";


        if (
          "Notification" in window &&
          Notification.permission ===
            "granted"
        ) {
          try {
            const registration =
              await navigator
                .serviceWorker
                .ready;

            await registration
              .showNotification(
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

  } catch (error) {
    console.error(
      "Foreground messaging error:",
      error
    );
  }
}


/* =========================================
   ESCAPE KEY
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
   START WEBSITE
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {
    loadTheme();

    updateCart();

    updateLikes();

    updateProductLikeButtons();


    const popup =
      getNotificationPopup();

    if (!popup) {
      return;
    }


    /*
      If notifications are already
      allowed, never show the popup.
    */

    if (
      "Notification" in window &&
      Notification.permission ===
        "granted"
    ) {
      popup.style.display =
        "none";

      return;
    }


    /*
      If browser permission has already
      been denied, don't keep bothering
      the customer on every visit.
    */

    if (
      "Notification" in window &&
      Notification.permission ===
        "denied"
    ) {
      popup.style.display =
        "none";

      return;
    }


    /*
      Don't show again after a refresh
      during the same browser session.
    */

    const seenThisSession =
      sessionStorage.getItem(
        "mavrenx-popup-seen"
      );


    if (
      seenThisSession ===
      "yes"
    ) {
      popup.style.display =
        "none";

      return;
    }


    /*
      First entry during this session:
      show once, then mark as seen.
    */

    popup.style.display =
      "flex";


    sessionStorage.setItem(
      "mavrenx-popup-seen",
      "yes"
    );
  }
);
