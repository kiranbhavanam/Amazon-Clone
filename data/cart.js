export let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart)
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOption: "1",
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 10,
      deliveryOption: "2",
    },
  ];
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function calculateCartQunatity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}
export function updateQuantity(productId, newQuantity) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) cartItem.quantity = newQuantity;
  });
  saveToStorage();
}
export function addToCart(productId, quantity) {
  let matchingItem;
  cart.forEach((item) => {
    if (productId === item.productId) matchingItem = item;
  });
  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity, deliveryOption: "3" });
  }
  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) newCart.push(cartItem);
  });
  cart = newCart;
  saveToStorage();
}
//updating the  product's delivery option in the cart with the selected delivery id:
export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((item) => {
    if (productId === item.productId) matchingItem = item;
  });
  matchingItem.deliveryOption = deliveryOptionId;
  saveToStorage();
}

export function loadCart() {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    console.log(xhr.response);
  });

  xhr.open("GET", "https:supersimplebackend.dev/cart");
  xhr.send();
}
