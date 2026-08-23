let cartItems = JSON.parse(localStorage.getItem("mavrenxCart")) || [];

const product = {
  name: "RGB LED Neon Rope Light — 10M",
  price: 29.99,
  image: "https://m.media-amazon.com/images/I/71+x5N3Z7QL._AC_SX679_.jpg"
};

const productImages = [
  "https://m.media-amazon.com/images/I/71+x5N3Z7QL._AC_SX679_.jpg",
  "https://m.media-amazon.com/images/I/71RVtS3ExoL._AC_SX679_.jpg",
  "https://m.media-amazon.com/images/I/81EIn29oIjL._AC_SL1500_.jpg"
];

let currentImage = 0;


/* IMAGE CAROUSEL */

function showImage() {
  const image = document.getElementById("product-image");

  if (image) {
    image.src = productImages[currentImage];
  }
}

function nextImage() {
  currentImage++;

  if (currentImage >= productImages.length) {
    currentImage = 0;
  }

  showImage();
}

function previousImage() {
  currentImage--;

  if (currentImage < 0) {
    currentImage = productImages.length - 1;
  }

  showImage();
}


/* CART */

function saveCart() {
  localStorage.setItem(
    "mavrenxCart",
    JSON.stringify(cartItems)
  );
}

function updateCartCount() {
  const cartCountElement =
    document.getElementById("cart-count");

  if (cartCountElement) {
    cartCountElement.textContent =
      cartItems.length;
  }
}

function addToCart() {
  cartItems.push(product);

  saveCart();
  updateCartCount();
  updateCartDisplay();

  openCart();
}

function updateCartDisplay() {
  const cartItemsElement =
    document.getElementById("cart-items");

  if (!cartItemsElement) {
    return;
  }

  if (cartItems.length === 0) {
    cartItemsElement.innerHTML = `
      <p>Your cart is empty.</p>
    `;

    return;
  }

  cartItemsElement.innerHTML =
    cartItems.map((item, index) => `
      <div class="cart-item">

        <img
          src="${item.image}"
          alt="${item.name}"
        >

        <div class="cart-item-info">

          <h3>${item.name}</h3>

          <p>€${item.price.toFixed(2)}</p>

          <button
            onclick="removeFromCart(${index})">
            Remove
          </button>

        </div>

      </div>
    `).join("");
}

function removeFromCart(index) {
  cartItems.splice(index, 1);

  saveCart();
  updateCartCount();
  updateCartDisplay();
}


/* CART OPEN / CLOSE */

function openCart() {
  const cart =
    document.getElementById("cart-panel");

  if (cart) {
    cart.classList.add("active");
    updateCartDisplay();
  }
}

function closeCart() {
  const cart =
    document.getElementById("cart-panel");

  if (cart) {
    cart.classList.remove("active");
  }
}


/* LOAD CART WHEN PAGE OPENS */

updateCartCount();
updateCartDisplay();
