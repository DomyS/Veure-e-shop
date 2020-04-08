let carts = document.querySelectorAll(".addToCart");

let products = [
  {
    name: "Timer Blue",
    tag: "blueTimer",
    price: 150,
    inCart: 0
  },
  {
    name: "Timer White",
    tag: "whiteTimer",
    price: 100,
    inCart: 0
  },
  {
    name: "Timer Black",
    tag: "blackTimer",
    price: 120,
    inCart: 0
  },
  {
    name: "GTM White",
    tag: "whiteGtm",
    price: 100,
    inCart: 0
  },
  {
    name: "GTM Blue",
    tag: "blueGtm",
    price: 130,
    inCart: 0
  },
  {
    name: "GTM Black",
    tag: "blackGtm",
    price: 150,
    inCart: 0
  }
];

// added animation when onclick
function added(carts) {
  carts.value = "Added";
  setTimeout(function() {
    carts.value = "Add To Cart";
  }, 3000);
}

// loop through products with an onclick func
for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

//add products to cart and localsTorage as numbers
function onLoadCartNumber() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);
  // if product number exist then execute 1, if 1 exist then execute number + 1
  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }
  setItems(product);
}

// inside the cart
function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product
      };
    }

    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
// total price of products
function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productsContainer = document.querySelector(".cartProducts");
  let cartCost = localStorage.getItem("totalCost");

  if (cartItems && productsContainer) {
    productsContainer.innerHTML = "";
    Object.values(cartItems).map(item => {
      productsContainer.innerHTML += `
        <div class="cartProduct">
         <div class="cartHeader">
            <img src="./images/${item.tag}.jpg">
            <span>${item.name}</span>
          </div>
        <div class="price">$${item.price}</div>
        <div class="quantity">
           <span>${item.inCart}</span>
        </div>
        <div class="total">
          $${item.inCart * item.price},00
        </div>
        `;
    });

    productsContainer.innerHTML += `
    <div class="basketTotalContainer">
      <h4 class="basketTotalTitle">
      $${cartCost},00
      </h4>
      <h4 class="basketTotal">
      Basket Total
      </h4>
    `;
  }
}

onLoadCartNumber();
displayCart();
