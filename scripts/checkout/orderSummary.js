import {
  cart,
  removeFromCart,
  calculateCartQunatity,
  updateQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import {
  calculateDeliveryDate,
  deliveryOptions,
} from "../../data/deliveryOptions.js";
import { findProduct } from "../../data/products.js";
import { findDeliveryOption } from "../../data/deliveryOptions.js";
import { paymentSummary } from "./paymentSummary.js";
//Code to genrate html dynamically
export function renderOrderSummary() {
  let checkoutHTML = "";
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingItem = findProduct(productId);
    // console.log(matchingItem);

    const deliveryOptionId = cartItem.deliveryOption;
    const deliveryOption = findDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);

    checkoutHTML += `<div class="cart-item-container js-cart-item-container-${
      matchingItem.id
    }">
  <div class="delivery-date">
    Delivery date: ${dateString}
  </div>
  
  <div class="cart-item-details-grid ">
    <img class="product-image"
      src="${matchingItem.image}">
  
    <div class="cart-item-details">
      <div class="product-name">
        ${matchingItem.name}
      </div>
      <div class="product-price">
        ${matchingItem.getPrice()}
      </div>
      <div class="product-quantity">
        <span>
          Quantity: <span class="quantity-label js-quantity-label-${
            matchingItem.id
          }">${cartItem.quantity}</span>
        </span>
        <span class="update-quantity-link link-primary js-update-link" data-product-id=${
          matchingItem.id
        }>
          Update
          
        </span>
        <input class="quantity-input js-quantity-input-${matchingItem.id}">
          <span class="save-quantity-link link-primary js-save-link" data-product-id=${
            matchingItem.id
          }>save</span>
        <span class="delete-quantity-link link-primary js-delete-link"
        data-product-id=${matchingItem.id}>
          Delete
        </span>
      </div>
    </div>
  
    <div class="delivery-options">
      <div class="delivery-options-title">
        Choose a delivery option:
      </div>
      ${deliveryHTML(matchingItem, cartItem)}
    </div>
  </div>
  </div>`;
  });
  const orderSummarySelector = document.querySelector(".js-order-summary");
  orderSummarySelector.innerHTML = checkoutHTML;

  //Updating the page

  //function to update the no of items in top of page:
  function updateCartQuantity() {
    document.querySelector(
      ".js-return-to-home"
    ).innerHTML = `${calculateCartQunatity()} items`;
  }
  updateCartQuantity();

  //deleting a item from the page
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const deleteProductId = link.dataset.productId;
      // console.log(link);
      // console.log(deleteProductId);
      removeFromCart(deleteProductId);
      renderOrderSummary();
      paymentSummary();
    });
  });
  //updating quantity value
  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      // console.log("update")
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add("is-editing-quantity");
    });
  });

  //saving quantity value
  document.querySelectorAll(".js-save-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const newQuantity = Number(
        document.querySelector(`.js-quantity-input-${productId}`).value
      );

      // console.log(updatedQuantity);
      if (newQuantity <= 0 || newQuantity > 1000) {
        alert("Quantity should be within range of 0 - 1000");
        return;
      }
      updateQuantity(productId, newQuantity);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.remove("is-editing-quantity");
      const quantityLabelSelector = document.querySelector(
        `.js-quantity-label-${productId}`
      );
      quantityLabelSelector.innerHTML = newQuantity;
      updateCartQuantity();
      paymentSummary();
    });
  });

  //Dayjs library

  // console.log(deliveryDate.format("dddd, MMMM D"));
  function deliveryHTML(matchingItem, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption);
      const deliveryCharge = formatCurrency(deliveryOption.priceCents);
      // console.log(deliveryCharge);
      const isChecked =
        cartItem.deliveryOption === deliveryOption.id ? "checked" : "";
      html += `
      <div class="delivery-option js-delivery-option"
      data-delivery-option-id=${deliveryOption.id}
      data-product-id=${cartItem.productId}>
      <input type="radio" ${isChecked}
      class="delivery-option-input"
      name="delivery-option-${matchingItem.id}">
      <div>
      <div class="delivery-option-date">
      ${dateString}
      </div>
      <div class="delivery-option-price">
      ${deliveryCharge === "0.00" ? "Free" : `$${deliveryCharge}-`}Shipping
      </div>
      </div>
      </div>
      `;
    });
    return html;
  }
  //when we click the radio button the date has to be updated.
  document.querySelectorAll(".js-delivery-option").forEach((button) => {
    button.addEventListener("click", () => {
      // console.log(cart);
      const { productId, deliveryOptionId } = button.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      paymentSummary();
    });
  });
}
