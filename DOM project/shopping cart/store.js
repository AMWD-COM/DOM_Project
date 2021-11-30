//Run function When DOM is Ready

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

//////////EVENTS LISTENERS////////////////////////////////

function ready() {
  // Add Items to cart

  let addToCartButton = document.getElementsByClassName("shop-item-button");
  for (let i = 0; i < addToCartButton.length; i++) {
    const button = addToCartButton[i];
    button.addEventListener("click", addToCartClicked);
  }

  //Remove Items from cart
  let removeCartItemButtons = document.getElementsByClassName("btn-danger");
  // console.log(removeCartItemButtons);
  for (let i = 0; i < removeCartItemButtons.length; i++) {
    let button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  //Update total
  let quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  //Increment and Decrement Item quantity

  //Increment button
  let incrementBtn = document.getElementsByClassName("btn-plus");
  for (let i = 0; i < incrementBtn.length; i++) {
    const button = incrementBtn[i];
    button.addEventListener("click", upQty);
  }
  //decrement button
  let decrementBtn = document.getElementsByClassName("btn-minus");

  for (let i = 0; i < decrementBtn.length; i++) {
    const button = decrementBtn[i];
    button.addEventListener("click", downQty);
  }

  //Submit Purchase
  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", purchaseClicked);

  //Heart like
  const hearts = document.getElementsByClassName("heart-item");
  // console.log(hearts);

  for (let i = 0; i < hearts.length; i++) {
    const heart = hearts[i];

    heart.addEventListener("click", likeUnlikePost);
  }
}

////////////////FUNCTION////////////////////

//Add Heart Like function

function likeUnlikePost(e) {
  let buttonClicked = e.target;
  let heartClicked = buttonClicked.parentElement.parentElement.children[0];
  console.log(heartClicked);
  if (heartClicked.classList.contains("like")) {
    heartClicked.classList.remove("like");
    heartClicked.classList.add("unlike");
  } else {
    heartClicked.classList.remove("unlike");
    heartClicked.classList.add("like");
  }
}

//Purchase Function with delete all cart

function purchaseClicked() {
  alert(`" Thank you for your purchase
            See you soon !! "`);
  let cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

//Increment function
function upQty(e) {
  let buttonClicked = e.target;
  let inputQty = buttonClicked.parentElement.children[1];
  inputQty.value++;
  updateCartTotal();
}
//Decrement function
function downQty(e) {
  let buttonclicked = e.target;
  let inputQty = buttonclicked.parentElement.children[1];
  console.log(inputQty);
  if (isNaN(inputQty.value) || inputQty.value <= 1) {
    inputQty.value = 1;
  } else {
    inputQty.value--;
  }

  updateCartTotal();
}

//Add Function
function addToCartClicked(e) {
  let buttonAdd = e.target;
  let shopItem = buttonAdd.parentElement.parentElement;
  let title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  let price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  let imgSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  // console.log(title, price, imgSrc);
  addItemToCart(title, price, imgSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imgSrc) {
  let cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  let cartItems = document.getElementsByClassName("cart-items")[0];
  let cartItemsTitles = cartItems.getElementsByClassName("cart-item-title");
  for (let i = 0; i < cartItemsTitles.length; i++) {
    let cartTitle = cartItemsTitles[i];
    if (cartTitle.innerText == title) {
      alert("This item is already added to cart !!");
      return;
    }
  }
  cartRow.innerHTML = `
                    <div class="cart-item cart-column">
                        <img class="cart-item-image" src="${imgSrc}">
                        <span class="cart-item-title">${title}</span>
                    </div>
                    <span class="cart-price cart-column">${price}</span>
                    <div class="cart-quantity cart-column">
                        <button class="btn btn-secondary btn-minus" type="button">-</button>
                        <input class="cart-quantity-input" type="number" value="1">
                        <button class="btn btn-secondary btn-plus" type="button">+</button>
                        <button class="btn btn-danger" type="button">REMOVE</button>
                    </div>`;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);

  let buttonPlus = cartRow.getElementsByClassName("btn-plus");
  for (let i = 0; i < buttonPlus.length; i++) {
    buttonPlus[i].addEventListener("click", upQty);
  }
  let buttonMinus = cartRow.getElementsByClassName("btn-minus");
  for (let i = 0; i < buttonMinus.length; i++) {
    buttonMinus[i].addEventListener("click", downQty);
  }
}

//Remove Function

function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

//QuantityChanged Function

function quantityChanged(e) {
  let input = e.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

//Update total while add or remove Items

function updateCartTotal() {
  let cartItemContainer = document.getElementsByClassName("cart-items")[0];
  let cartRows = cartItemContainer.getElementsByClassName("cart-row");
  let total = 0;

  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName("cart-price")[0];
    let quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    let price = parseFloat(priceElement.innerHTML.replace("DZD", ""));
    let quantity = quantityElement.value;
    total += price * quantity;
    //   console.log(total);
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "DZD " + total;
}
