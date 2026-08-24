/* =========================================
   MAVRENX STORE SCRIPT
========================================= */


/* =========================================
   PRODUCT
========================================= */

const product = {
  id: "main-product",
  name: "RGB LED Neon Rope Light — 10M",
  price: 29.99,

  images: [
    "https://m.media-amazon.com/images/I/71ugRQSCacL._AC_SX342_SY445_QL70_FMwebp_.jpg",
    "https://m.media-amazon.com/images/I/71+x5N3Z7QL._AC_SX679_.jpg",
    "https://m.media-amazon.com/images/I/71D+waz6LsL._AC_SX679_.jpg",
    "https://m.media-amazon.com/images/I/81kf8ndZNoL._AC_SX679_.jpg",
    "https://m.media-amazon.com/images/I/81QmxX1XyFL._AC_SX679_.jpg"
  ]
};


/* =========================================
   LOAD SAVED DATA
========================================= */

let cart = JSON.parse(localStorage.getItem("mavrenx-cart")) || [];

let likedItems =
  JSON.parse(localStorage.getItem("mavrenx-liked")) || [];

let currentImage = 0;


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
   IMAGE SLIDER
========================================= */

function nextImage() {

  currentImage++;

  if (currentImage >= product.images.length) {
    currentImage = 0;
  }

  updateProductImage();
}


function previousImage() {

  currentImage--;

  if (currentImage < 0) {
    currentImage = product.images.length - 1;
  }

  updateProductImage();
}


function updateProductImage() {

  const image =
    document.getElementById("product-image");

  if (!image) return;

  image.src =
    product.images[currentImage];
}


/* =========================================
   CART
========================================= */

function addToCart() {

  const existingItem =
    cart.find(
      item => item.id === product.id
    );


  if (existingItem) {

    existingItem.quantity++;

  } else {

    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1
    });

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


function updateCart() {

  const cartCount =
    document.getElementById("cart-count");

  const cartItems =
    document.getElementById("cart-items");


  if (!cartCount || !cartItems) return;


  let totalItems = 0;


  cart.forEach(item => {

    totalItems += item.quantity;

  });


  cartCount.textContent =
    totalItems;


  /* EMPTY CART */

  if (cart.length === 0) {

    cartItems.innerHTML = `
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

          <p>
            €${item.price.toFixed(2)}
          </p>

          <p>
            Quantity: ${item.quantity}
          </p>

          <button
            onclick="removeFromCart('${item.id}')"
          >
            Remove
          </button>

        </div>

      </div>

    `;

  });


  html += `

    <div class="cart-total">

      <h3>
        Total: €${totalPrice.toFixed(2)}
      </h3>

      <button
        class="checkout-button"
        onclick="checkout()"
      >
        Proceed to Checkout
      </button>

    </div>

  `;


  cartItems.innerHTML = html;

}


/* =========================================
   OPEN / CLOSE CART
========================================= */

function openCart() {

  const panel =
    document.getElementById("cart-panel");

  if (!panel) return;

  panel.classList.add("active");

  updateCart();

}


function closeCart() {

  const panel =
    document.getElementById("cart-panel");

  if (!panel) return;

  panel.classList.remove("active");

}


/* =========================================
   LIKED ITEMS
========================================= */

function toggleLike() {

  const existingItem =
    likedItems.find(
      item => item.id === product.id
    );


  if (existingItem) {

    likedItems =
      likedItems.filter(
        item => item.id !== product.id
      );

  } else {

    likedItems.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]
    });

  }


  saveLikes();

  updateLikes();

  updateLikeButtons();

}


function removeLike(id) {

  likedItems =
    likedItems.filter(
      item => item.id !== id
    );

  saveLikes();

  updateLikes();

  updateLikeButtons();

}


function updateLikes() {

  const likesCount =
    document.getElementById("likes-count");

  const likedItemsContainer =
    document.getElementById("liked-items");


  if (likesCount) {

    likesCount.textContent =
      likedItems.length;

  }


  if (!likedItemsContainer) return;


  /* EMPTY */

  if (likedItems.length === 0) {

    likedItemsContainer.innerHTML = `
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

        <div>

          <h3>
            ${item.name}
          </h3>

          <p>
            €${item.price.toFixed(2)}
          </p>

          <button
            onclick="removeLike('${item.id}')"
          >
            Remove
          </button>

        </div>

      </div>

    `;

  });


  likedItemsContainer.innerHTML =
    html;

}


/* =========================================
   UPDATE LIKE BUTTONS
========================================= */

function updateLikeButtons() {

  const isLiked =
    likedItems.some(
      item => item.id === product.id
    );


  const productLikeButton =
    document.querySelector(
      ".like-product-button"
    );


  if (productLikeButton) {

    if (isLiked) {

      productLikeButton.classList.add(
        "liked"
      );

      productLikeButton.innerHTML =
        "♥ Liked";

    } else {

      productLikeButton.classList.remove(
        "liked"
      );

      productLikeButton.innerHTML =
        "♡ Like";

    }

  }

}


/* =========================================
   OPEN / CLOSE LIKES
========================================= */

function openLikes() {

  const panel =
    document.getElementById("likes-panel");

  if (!panel) return;

  panel.classList.add("active");

  updateLikes();

}


function closeLikes() {

  const panel =
    document.getElementById("likes-panel");

  if (!panel) return;

  panel.classList.remove("active");

}


/* =========================================
   CHECKOUT
========================================= */

function checkout() {

  if (cart.length === 0) {

    alert(
      "Your cart is empty!"
    );

    return;

  }


  let total = 0;


  cart.forEach(item => {

    total +=
      item.price * item.quantity;

  });


  alert(

    "Checkout system coming next!\n\n" +

    "Your total is €" +

    total.toFixed(2)

  );

}


/* =========================================
   DARK / LIGHT MODE
========================================= */

function toggleTheme() {

  document.body.classList.toggle(
    "light-mode"
  );


  const isLight =
    document.body.classList.contains(
      "light-mode"
    );


  localStorage.setItem(
    "mavrenx-theme",
    isLight
      ? "light"
      : "dark"
  );


  updateThemeButton();

}


function loadTheme() {

  const savedTheme =
    localStorage.getItem(
      "mavrenx-theme"
    );


  if (savedTheme === "light") {

    document.body.classList.add(
      "light-mode"
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


  if (
    document.body.classList.contains(
      "light-mode"
    )
  ) {

    button.innerHTML = "☀";

  } else {

    button.innerHTML = "☾";

  }

}


/* =========================================
   START WEBSITE
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    updateProductImage();

    updateCart();

    updateLikes();

    updateLikeButtons();

    loadTheme();

  }
);
