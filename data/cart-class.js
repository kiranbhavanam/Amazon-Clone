class Cart {
  cartItems;
  localStorageKey;
  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
  }
  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
    if (!this.cartItems)
      this.cartItems = [
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
  }

  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }
  calculateCartQunatity() {
    let cartQuantity = 0;
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
  }
  updateQuantity(productId, newQuantity) {
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) cartItem.quantity = newQuantity;
    });
    this.saveToStorage();
  }

  addToCart(productId, quantity) {
    let matchingItem;
    this.cartItems.forEach((item) => {
      if (productId === item.productId) matchingItem = item;
    });
    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({ productId, quantity, deliveryOption: "3" });
    }
    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) newCart.push(cartItem);
    });
    this.cartItems = newCart;
    this.saveToStorage();
  }
  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    this.cartItems.forEach((item) => {
      if (productId === item.productId) matchingItem = item;
    });
    matchingItem.deliveryOption = deliveryOptionId;
    this.saveToStorage();
  }
}

//updating the  product's delivery option in the cart with the selected delivery id:
const cart = new Cart("cart-class");
const businessCart = new Cart("cart-businessClass");

cart.loadFromStorage();
cart.addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e", 2);
businessCart.loadFromStorage();

console.log("cart: ", cart);
console.log("Bussinesscart: ", businessCart);
