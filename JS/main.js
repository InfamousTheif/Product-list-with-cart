import itemsData from "../data.json" with { type: "json"};
console.log(itemsData)

const gridWrapper = document.querySelector(".responsive-grid");
let itemAmount = new Array(itemsData.length).fill(0); // An array that keeps track of the number of items ordered for each product

function insertItems() {
  for(let i = 0; i < itemsData.length; i++) {
    gridWrapper.insertAdjacentHTML("beforeend",
      `
     <div class="item-wrapper" data-item-no="${i}">
          <div class="img-wrapper">
            <img src="${itemsData[i]["image"]["desktop"]}" alt="${itemsData[i]["name"]}">
            <button data-item-no="${i}" class="add-button">
              <img src="./assets/images/icon-add-to-cart.svg" alt="">
              Add to cart
            </button>
            <div class="add-button-active">
                <button data-item-no="${i}" aria-label="decrement by 1" class="decrement-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="currentColor" d="M0 .375h10v1.25H0V.375Z"/></svg>
                </button>
                <p>${itemAmount[i]}</p>
                <button data-item-no="${i}" aria-label="increment by 1" class="increment-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="currentColor" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
                </button>
            </div>
          </div>
          <p class="item-name">${itemsData[i]["category"]}</p>
          <p class="item-desc">${itemsData[i]["name"]}</p>
          <p class="item-price">$${itemsData[i]["price"].toFixed(2)}</p>
        </div>
      `
    );
  };
};

insertItems();

const addCartButtons = document.querySelectorAll(".add-button");
const decrementButtons = document.querySelectorAll(".decrement-button");
const incrementButtons = document.querySelectorAll(".increment-button");
const cartWrapper = document.querySelector(".cart-wrapper");
const cartItemsWrapper = document.querySelector(".cart-items-wrapper");
const confirmedItemsWrapper = document.querySelector(".confirmed-items-wrapper");
const allItemsWrapper = document.querySelectorAll(".item-wrapper");
const cartTotalPriceWrapper = document.querySelector(".cart-total-price");
const confirmedTotalPriceWrapper = document.querySelector(".confirmed-cart-total-price ");

function updateAmount(index) {
  document.querySelector(
    `.item-wrapper[data-item-no="${index}"] .add-button-active p`
  ).textContent = itemAmount[index]; // updating the amount displayed on the increment buttons
}

function addCartHandler() {  
  console.log(itemAmount);

  addCartButtons.forEach((button) => {
    let index = button.dataset.itemNo; // unique index for each item
    button.addEventListener("click", () => {
      itemAmount[index]++;
      console.log(itemAmount);
      document.querySelector(`div[data-item-no="${index}"]`).classList.add("active"); // changing the item-wrapper div to active 
      updateAmount(index);
      updateCart();
    });
  });

  decrementButtons.forEach((button) => {
    let index = button.dataset.itemNo;
    button.addEventListener("click", () => {
      itemAmount[index]--;
      if( itemAmount[index] <= 0 ) {
        document.querySelector(`div[data-item-no="${index}"]`).classList.remove("active");
      };
      console.log(itemAmount);
      updateAmount(index);
      updateCart();
    });
  });

  incrementButtons.forEach((button) => {
    let index = button.dataset.itemNo;
    button.addEventListener("click", () => {
      itemAmount[index]++;
      if( itemAmount[index] < 99 ) {
      }else {
        console.log("maximum limit reached");
        return;
      };
      console.log(itemAmount);
      updateAmount(index);
      updateCart();
    });
  });
  
};

function updateCart() {
  let amountSum = 0; // the total number of products ordered
  let cartTotalPrice = 0;
  amountSum = itemAmount.reduce((acc, currentVal) => acc + currentVal, 0);

  cartWrapper.classList.add("active");

  if(amountSum <= 0) {
    cartWrapper.classList.remove("active"); // no items in the cart means an inactive cart
  };

  for(let i = 0; i < itemAmount.length; i++) {
    let itemTotalPrice = (itemAmount[i] * itemsData[i]["price"]); //total price of an individual item
    cartTotalPrice += itemTotalPrice;

    const itemWrapper = document.querySelector(`#cart-item-${i}`);
    const confirmedItemWrapper = document.querySelector(`#confirmed-item-${i}`);

    // The following two if conditions remove existing cart item/ confirmed items, that have been incremented, to prevent duplicates
    // Otherwise you'll have both waffle x1 and waffle x2 in the same cart. 
    if(itemWrapper) {
      itemWrapper.remove();
    };

    if(confirmedItemWrapper) {
      confirmedItemWrapper.remove();
    };

    if(itemAmount[i] > 0) {
      cartItemsWrapper.insertAdjacentHTML("afterbegin", 
        `
        <div class="cart-item flex-center-sb" id="cart-item-${i}">
          <div class="cart-item-content">
            <p>${itemsData[i]["name"]}</p>
            <ul>
              <li class="cart-item-amount">${itemAmount[i]}x</li>
              <li class="cart-item-price">@$${itemsData[i]["price"].toFixed(2)}</li>
              <li class="cart-item-total">$${itemTotalPrice.toFixed(2)}</li>
            </ul>
          </div>
          <button class="remove-item-button" data-item-no="${i}">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="currentColor" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
          </button>
        </div>
        `
      );

      confirmedItemsWrapper.insertAdjacentHTML("afterbegin",
        `
        <div class="confirmed-item flex-center-sb" id="confirmed-item-${i}">
          <div class="confirmed-item-info">
            <img src="${itemsData[i]["image"]["thumbnail"]}" alt="">
            <div class="cart-item-content">
              <p>${itemsData[i]["name"]}</p>
              <ul>
                <li class="cart-item-amount">${itemAmount[i]}x</li>
                <li class="cart-item-price">@$${itemsData[i]["price"].toFixed(2)}</li>
              </ul>
            </div>
          </div>
          <p>$${itemTotalPrice.toFixed(2)}</p>
        </div>
        `
      );
    }
  };

  cartTotalPriceWrapper.textContent = `$${cartTotalPrice.toFixed(2)}`;

  confirmedTotalPriceWrapper.textContent = `$${cartTotalPrice.toFixed(2)}`;
};

function handleConfirmButtons() {
  const confirmButton = document.querySelector(".confirm-button");
  const darkOverlay = document.querySelector(".dark-overlay");
  const newOrderButton = document.querySelector(".new-order-button");

  confirmButton.addEventListener("click", () => {
    darkOverlay.classList.add("active");
  });

  newOrderButton.addEventListener("click", () => {
    darkOverlay.classList.remove("active");
    itemAmount.fill(0); // reset the number of each product ordered to zero.
    updateCart();
    allItemsWrapper.forEach((item) => {
      item.classList.remove("active");
    }); // a loop that removes the active state from each item so that the increment button disappears
  });
};

function handleRemoveButton() {
  //Event delegation for dynamically created remove buttons
  document.addEventListener("click", (e) => {
  const button = e.target.closest(".remove-item-button");

  if (button) {
    const index = button.dataset.itemNo;
    button.parentElement.remove();
    itemAmount[index] = 0;
    updateCart();
    document.querySelector(`.item-wrapper[data-item-no="${index}"]`).classList.remove("active");
    };
  });
};

addCartHandler();
handleConfirmButtons();
handleRemoveButton();