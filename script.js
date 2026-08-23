let cartCount = 0;

const productImages = [
  "https://m.media-amazon.com/images/I/71+x5N3Z7QL._AC_SX679_.jpg",
  "https://m.media-amazon.com/images/I/71D+waz6LsL._AC_SX679_.jpg",
  "https://m.media-amazon.com/images/I/81kf8ndZNoL._AC_SX679_.jpg",
  "https://m.media-amazon.com/images/I/81QmxX1XyFL._AC_SX679_.jpg",
  "https://m.media-amazon.com/images/I/71RVtS3ExoL._AC_SX679_.jpg",
  "https://m.media-amazon.com/images/I/81EIn29oIjL._AC_SL1500_.jpg"
];

let currentImage = 0;

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

function addToCart() {
  cartCount++;

  const cartCountElement = document.getElementById("cart-count");

  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
  }
}

function openCart() {
  const cart = document.getElementById("cart-panel");

  if (cart) {
    cart.classList.add("active");
  }
}

function closeCart() {
  const cart = document.getElementById("cart-panel");

  if (cart) {
    cart.classList.remove("active");
  }
}
