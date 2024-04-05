import { cart, addToCart, calculateCartQunatity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
let productsHTML = "";

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="${product.rating.stars}"
              src=${product.imgSrc()}>
            <div class="product-rating-count link-primary">
            ${product.rating.count}
            </div>
          </div>

          <div class="product-priceCents">
            ${product.getPrice()}}
          </div>

          <div class="product-quantity-container ">
            <select class="js-product-quantity-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button js-add-to-cart button-primary" data-product-id="${
            product.id
          }">
            Add to Cart
          </button>
        </div>`;
  //   console.log(html);
});

function updateCartQuantity(quantity) {
  document.querySelector(".js-cart-quantity").innerHTML =
    calculateCartQunatity();
}
updateCartQuantity(); //to load the no of items in cart before addding anything to cart
function addMessage(productId) {
  const addMessage = document.querySelector(`.js-added-to-cart-${productId}`);
  addMessage.classList.add("added-to-cart-visible");
  let addMessageTimeoutId;
  // const previousTimeoutId = timeouts[productId];
  // const timeouts = {}; can also be done using closure
  if (addMessageTimeoutId) {
    clearTimeout(addMessageTimeoutId);
  }
  const timeoutId = setTimeout(() => {
    addMessage.classList.remove("added-to-cart-visible");
  }, 2000);
  addMessageTimeoutId = timeoutId;
  // console.log(addMessageTimeoutId);
}
document.querySelector(".js-products-grid").innerHTML = productsHTML;
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    // console.log("clicked add to cart button",button.dataset.productName);
    const productId = button.dataset.productId;
    const quantitySelector = document.querySelector(
      `.js-product-quantity-${productId}`
    );
    const quantity = parseInt(quantitySelector.value);
    addToCart(productId, quantity);
    updateCartQuantity(quantity);
    addMessage(productId);
  });
});
