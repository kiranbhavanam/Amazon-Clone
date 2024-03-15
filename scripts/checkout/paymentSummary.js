import { formatCurrency } from "../utils/money.js";
import { cart } from "../../data/cart.js";
import { findProduct } from "../../data/products.js";
import { findDeliveryOption } from "../../data/deliveryOptions.js";

export function paymentSummary() {
  //find the details of product inside the cart/
  let sum = 0;
  let deliveryCharge = 0;
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    const matchingItem = findProduct(cartItem.productId);
    sum += matchingItem.priceCents * cartItem.quantity;
    const deliveryOption = findDeliveryOption(cartItem.deliveryOption);
    deliveryCharge += deliveryOption.priceCents;
    cartQuantity += cartItem.quantity;
  });
  const totalSum = sum;
  const deliverySum = deliveryCharge;
  const totalBeforeTax = totalSum + deliverySum;
  const tax = totalBeforeTax * 0.1;
  const finalSum = formatCurrency(totalBeforeTax + tax);
  //   console.log("payment", totalBeforeTax,finalSum);
  const html = `
    <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalSum
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(
              deliverySum
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalBeforeTax
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${finalSum}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
`;
  document.querySelector(".js-payment-summary").innerHTML = html;
}
