let cartCount = 0;

const productImages = [
  "https://m.media-amazon.com/images/I/71ugRQSCacL._AC_SX342_SY445_QL70_FMwebp_.jpg",
  "https://m.media-amazon.com/images/I/51Kad9g-8jL._AC_SR38,50_.jpg",
  "https://m.media-amazon.com/images/I/51nxe5h4vQL._AC_SR38,50_.jpg",
  "https://m.media-amazon.com/images/I/51mNpTyIaJL._AC_SR38,50_.jpg",
  "https://m.media-amazon.com/images/I/5181oUsRCxL._AC_SR38,50_.jpg",
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
