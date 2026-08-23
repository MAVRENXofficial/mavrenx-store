let cartCount = 0;

const productImages = [
  "https://m.media-amazon.com/images/I/71ugRQSCacL._AC_SX342_SY445_QL70_FMwebp_.jpg",

  "https://m.media-amazon.com/images/I/71ugRQSCacL._AC_SX342_SY445_QL70_FMwebp_.jpg",

  "https://m.media-amazon.com/images/I/71ugRQSCacL._AC_SX342_SY445_QL70_FMwebp_.jpg"
];

let currentImage = 0;

function showImage() {
  document.getElementById("product-image").src =
    productImages[currentImage];
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

  document.getElementById("cart-count").textContent = cartCount;
}

function openCart() {
  document.getElementById("cart-panel").classList.add("active");
}

function closeCart() {
  document.getElementById("cart-panel").classList.remove("active");
}
