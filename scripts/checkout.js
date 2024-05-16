import { renderOrderSummary } from "./checkout/orderSummary.js";
import { paymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import "../data/backend-practice.js";
loadProductsFetch().then(() => {
  renderOrderSummary();
  paymentSummary();
});
/*
Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve();
    });
  }),
  new Promise((resolve) => {
    loadCart();
    resolve();
  }),
]).then((values) => {
  console.log(values);
  renderOrderSummary();
  paymentSummary();
});
*/
/*
new Promise((resolve) => {
  console.log("In a promise");
  loadProducts(() => {
    resolve();
  });
})
  .then(() => {
    new Promise((resolve) => {
      loadCart(() => {
        console.log()
        resolve();
      });
    });
  })
  .then(() => {
    new Promise(() => {
      renderOrderSummary();
      paymentSummary();
    });
  });
*/
// loadProducts(() => {
//   renderOrderSummary();

//   paymentSummary();
// });
