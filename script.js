/* =========================
   MAVRENX SCRIPT
========================= */


/* =========================
   SAVED DATA
========================= */

let cart =
  JSON.parse(localStorage.getItem("mavrenx-cart")) || [];

let likedItems =
  JSON.parse(localStorage.getItem("mavrenx-liked")) || [];


/* =========================
   CART
========================= */

function saveCart() {
  localStorage.setItem(
    "mavrenx-cart",
    JSON.stringify(cart)
  );
}


function updateCart() {
  const count =
    document.getElementById("cart-count");

  const container =
    document.getElementById("cart-items");

  if (count) {
    let totalItems = 0;

    cart.forEach(item => {
      totalItems += item.quantity || 1;
    });

    count.textContent = totalItems;
  }

  if (!container) {
    return;
  }

  if (cart.length === 0) {
    container.innerHTML = `
      <p>Your cart is empty.</p>
    `;

    return;
  }

  let html = "";

  cart.forEach(item => {
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

          ${
            typeof item.price === "number"
              ? `
                <p>
                  €${item.price.toFixed(2)}
                </p>
              `
              : ""
          }

          ${
            item.quantity
              ? `
                <p>
                  Quantity: ${item.quantity}
                </p>
              `
              : ""
          }

        </div>

      </div>
    `;
  });

  container.innerHTML = html;
}


function openCart() {
  const panel =
    document.getElementById("cart-panel");

  if (panel) {
    panel.classList.add("active");
  }

  closeLikes();

  updateCart();
}


function closeCart() {
  const panel =
    document.getElementById("cart-panel");

  if (panel) {
    panel.classList.remove("active");
  }
}


/* =========================
   LIKED ITEMS
========================= */

function saveLikes() {
  localStorage.setItem(
    "mavrenx-liked",
    JSON.stringify(likedItems)
  );
}


function updateLikes() {
  const count =
    document.getElementById("likes-count");

  const container =
    document.getElementById("liked-items");

  if (count) {
    count.textContent = likedItems.length;
  }

  if (!container) {
    return;
  }

  if (likedItems.length === 0) {
    container.innerHTML = `
      <p>You haven't liked anything yet.</p>
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

        <div>

          <h3>
            ${item.name}
          </h3>

          ${
            typeof item.price === "number"
              ? `
                <p>
                  €${item.price.toFixed(2)}
                </p>
              `
              : ""
          }

        </div>

      </div>
    `;
  });

  container.innerHTML = html;
}


function openLikes() {
  const panel =
    document.getElementById("likes-panel");

  if (panel) {
    panel.classList.add("active");
  }

  closeCart();

  updateLikes();
}


function closeLikes() {
  const panel =
    document.getElementById("likes-panel");

  if (panel) {
    panel.classList.remove("active");
  }
}


/* =========================
   LIGHT / DARK MODE
========================= */

function toggleTheme() {
  document.body.classList.toggle(
    "dark-mode"
  );

  const isDark =
    document.body.classList.contains(
      "dark-mode"
    );

  localStorage.setItem(
    "mavrenx-theme",
    isDark
      ? "dark"
      : "light"
  );

  updateThemeButton();
}


function loadTheme() {
  const savedTheme =
    localStorage.getItem(
      "mavrenx-theme"
    );

  if (savedTheme === "dark") {
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

  const isDark =
    document.body.classList.contains(
      "dark-mode"
    );

  if (isDark) {
    button.textContent = "☀";
  } else {
    button.textContent = "☾";
  }
}


/* =========================
   CLICK OUTSIDE PANELS
========================= */

document.addEventListener(
  "click",
  function (event) {

    const likesPanel =
      document.getElementById(
        "likes-panel"
      );

    const cartPanel =
      document.getElementById(
        "cart-panel"
      );

    const likeButton =
      document.querySelector(
        ".like-button"
      );

    const cartButton =
      document.querySelector(
        ".cart-button"
      );


    if (
      likesPanel &&
      likesPanel.classList.contains("active") &&
      !likesPanel.contains(event.target) &&
      !likeButton?.contains(event.target)
    ) {
      closeLikes();
    }


    if (
      cartPanel &&
      cartPanel.classList.contains("active") &&
      !cartPanel.contains(event.target) &&
      !cartButton?.contains(event.target)
    ) {
      closeCart();
    }

  }
);


/* =========================
   ESCAPE KEY CLOSES PANELS
========================= */

document.addEventListener(
  "keydown",
  function (event) {

    if (event.key === "Escape") {
      closeLikes();
      closeCart();
    }

  }
);


/* =========================
   START WEBSITE
========================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    loadTheme();

    updateCart();

    updateLikes();

  }
);
