console.log("hello");

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
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
            ${product.rating.count}
            </div>
          </div>

          <div class="product-priceCents">
            $${(product.priceCents / 100).toFixed(2)}
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
document.querySelector(".js-products-grid").innerHTML = productsHTML;
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    // console.log("clicked add to cart button",button.dataset.productName);
    const productId = button.dataset.productId;
    // const timeouts = {}; can also be done using closure
    let matchingItem;
    cart.forEach((item) => {
      if (productId === item.productId) matchingItem = item;
    });
    const quantitySelector = document.querySelector(
      `.js-product-quantity-${productId}`
    );
    // console.log(quantitySelector.value);
    const quantity = parseInt(quantitySelector.value);

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }
    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
    // console.log(cartQuantity);
    // console.log(cart);
    const addMessage = document.querySelector(`.js-added-to-cart-${productId}`);
    addMessage.classList.add("added-to-cart-visible");
    // const previousTimeoutId = timeouts[productId];
    let addMessageTimeoutId;
    if (addMessageTimeoutId) {
      clearTimeout(addMessageTimeoutId);
    }
    const timeoutId = setTimeout(() => {
      addMessage.classList.remove("added-to-cart-visible");
    }, 2000);
    addMessageTimeoutId= timeoutId;
    console.log(addMessageTimeoutId);
  });
});
