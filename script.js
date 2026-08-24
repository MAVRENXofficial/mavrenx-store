/* =========================================
   MAVRENX STORE
========================================= */

let cart =
  JSON.parse(localStorage.getItem("mavrenx-cart")) || [];

let likedItems =
  JSON.parse(localStorage.getItem("mavrenx-liked")) || [];


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

function addToCart(id, name, price, image) {

  const existingItem =
    cart.find(item => item.id === id);

  if (existingItem) {

    existingItem.quantity += 1;

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


/* =========================================
   CART QUANTITY
========================================= */

function increaseQuantity(id) {

  const item =
    cart.find(item => item.id === id);

  if (!item) return;

  item.quantity += 1;

  saveCart();

  updateCart();
}


function decreaseQuantity(id) {

  const item =
    cart.find(item => item.id === id);

  if (!item) return;

  item.quantity -= 1;

  if (item.quantity <= 0) {

    cart =
      cart.filter(item => item.id !== id);

  }

  saveCart();

  updateCart();
}


/* =========================================
   REMOVE FROM CART
========================================= */

function removeFromCart(id) {

  cart =
    cart.filter(item => item.id !== id);

  saveCart();

  updateCart();
}


/* =========================================
   UPDATE CART
========================================= */

function updateCart() {

  const count =
    document.getElementById("cart-count");

  const container =
    document.getElementById("cart-items");


  let totalQuantity = 0;


  cart.forEach(item => {

    totalQuantity += item.quantity;

  });


  if (count) {

    count.textContent =
      totalQuantity;

  }


  if (!container) return;


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

    totalPrice +=
      item.price * item.quantity;


    html += `

      <div class="cart-item">

        <img
          src="${item.image}"
          alt="${item.name}"
        >

        <div class="cart-item-info">

          <h3>
            ${item.name}
          </h3>

          <p class="cart-price">
            €${item.price.toFixed(2)}
          </p>


          <div class="quantity-controls">

            <button
              onclick="decreaseQuantity('${item.id}')">
              −
            </button>

            <span>
              ${item.quantity}
            </span>

            <button
              onclick="increaseQuantity('${item.id}')">
              +
            </button>

          </div>


          <button
            class="remove-item"
            onclick="removeFromCart('${item.id}')">
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
        class="checkout-button"
        onclick="checkout()">
        Checkout
      </button>

    </div>

  `;


  container.innerHTML = html;
}


/* =========================================
   OPEN / CLOSE CART
========================================= */

function openCart() {

  closeLikes();

  const panel =
    document.getElementById("cart-panel");

  if (panel) {

    panel.classList.add("active");

  }

  updateCart();
}


function closeCart() {

  const panel =
    document.getElementById("cart-panel");

  if (panel) {

    panel.classList.remove("active");

  }
}


/* =========================================
   LIKES
========================================= */

function toggleLike(id, name, price, image) {

  const existing =
    likedItems.find(item => item.id === id);


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


/* =========================================
   REMOVE LIKED ITEM
========================================= */

function removeLike(id) {

  likedItems =
    likedItems.filter(
      item => item.id !== id
    );

  saveLikes();

  updateLikes();

  updateProductLikeButtons();
}


/* =========================================
   UPDATE LIKES
========================================= */

function updateLikes() {

  const count =
    document.getElementById("likes-count");

  const container =
    document.getElementById("liked-items");


  if (count) {

    count.textContent =
      likedItems.length;

  }


  if (!container) return;


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

        <img
          src="${item.image}"
          alt="${item.name}"
        >

        <div class="liked-info">

          <h3>
            ${item.name}
          </h3>

          <p>
            €${item.price.toFixed(2)}
          </p>


          <button
            onclick="addToCart(
              '${item.id}',
              '${escapeText(item.name)}',
              ${item.price},
              '${item.image}'
            )"
          >
            Add to cart
          </button>


          <button
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


function updateProductLikeButtons() {

  document
    .querySelectorAll("[data-product-like]")
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
   OPEN / CLOSE LIKES
========================================= */

function openLikes() {

  closeCart();

  const panel =
    document.getElementById("likes-panel");

  if (panel) {

    panel.classList.add("active");

  }

  updateLikes();
}


function closeLikes() {

  const panel =
    document.getElementById("likes-panel");

  if (panel) {

    panel.classList.remove("active");

  }
}


/* =========================================
   LIGHT / DARK MODE
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
    dark ? "dark" : "light"
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

  }


  updateThemeButton();
}


function updateThemeButton() {

  const button =
    document.getElementById(
      "theme-button"
    );


  if (!button) return;


  const dark =
    document.body.classList.contains(
      "dark-mode"
    );


  button.textContent =
    dark ? "☀" : "☾";
}


/* =========================================
   CHECKOUT PLACEHOLDER
========================================= */

function checkout() {

  if (cart.length === 0) {

    alert(
      "Your cart is empty."
    );

    return;
  }


  alert(
    "Secure checkout will be connected to your payment provider."
  );
}


/* =========================================
   HELPERS
========================================= */

function escapeText(text) {

  return String(text)
    .replace(/'/g, "\\'")
    .replace(/"/g, "&quot;");
}


/* =========================================
   CLICK OUTSIDE PANELS
========================================= */

document.addEventListener(
  "click",
  function(event) {

    const cartPanel =
      document.getElementById(
        "cart-panel"
      );

    const likesPanel =
      document.getElementById(
        "likes-panel"
      );

    const cartButton =
      document.querySelector(
        ".cart-button"
      );

    const likeButton =
      document.querySelector(
        ".like-button"
      );


    if (
      cartPanel &&
      cartPanel.classList.contains("active") &&
      !cartPanel.contains(event.target) &&
      !cartButton?.contains(event.target)
    ) {

      closeCart();

    }


    if (
      likesPanel &&
      likesPanel.classList.contains("active") &&
      !likesPanel.contains(event.target) &&
      !likeButton?.contains(event.target)
    ) {

      closeLikes();

    }

  }
);


/* =========================================
   START
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    loadTheme();

    updateCart();

    updateLikes();

    updateProductLikeButtons();

  }
);
/* =========================================
   FIREBASE PUSH NOTIFICATIONS
========================================= */

const firebaseConfig = {
  apiKey: "AIzaSyCSXAkvMhLGaJMBwGGY1SYqoDhulIMn5F4",
  authDomain: "mavrenxsecurity.firebaseapp.com",
  projectId: "mavrenxsecurity",
  storageBucket: "mavrenxsecurity.firebasestorage.app",
  messagingSenderId: "351069637181",
  appId: "1:351069637181:web:d204c4904017679506b854",
  measurementId: "G-MLY1MC2SDR"
};


/* START FIREBASE */

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();


/* =========================================
   ENABLE NOTIFICATIONS
========================================= */

async function enableNotifications() {

  if (!("Notification" in window)) {

    alert(
      "This browser does not support notifications."
    );

    return;
  }


  if (!("serviceWorker" in navigator)) {

    alert(
      "This browser does not support the notification service worker."
    );

    return;
  }


  try {

    const permission =
      await Notification.requestPermission();


    if (permission !== "granted") {

      alert(
        "Notifications were not enabled."
      );

      return;
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

      return;
    }


    /* TEMPORARILY SAVE TOKEN ON DEVICE */

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


  } catch (error) {

    console.error(
      "Notification error:",
      error
    );


    alert(
      "There was a problem enabling notifications."
    );

  }

}


/* =========================================
   FOREGROUND NOTIFICATIONS
========================================= */

messaging.onMessage(
  function(payload) {

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
      Notification.permission ===
      "granted"
    ) {

      new Notification(
        title,
        {
          body: body
        }
      );

    }

  }
);
