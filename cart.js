
let cart = [];             
let appliedPromo = null;   


function updateCartUI() {
  const cartBody = document.getElementById("cartBody");
  const cartCount = document.getElementById("cartCount");
  const cartSubtotalElem = document.getElementById("cartSubtotal");
  const discountAmountElem = document.getElementById("discountAmount");
  const finalTotalElem = document.getElementById("finalTotal");
  const promoMessage = document.getElementById("promoMessage");


  cartBody.innerHTML = "";


  let subtotal = 0;
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;


    const row = document.createElement("div");
    row.classList.add("d-flex", "justify-content-between", "align-items-center", "mb-3");
    row.innerHTML = `
      <div>
        <h6>${item.title}</h6>
        <p class="mb-0">Price: $${item.price} x ${item.quantity} = $${itemTotal.toFixed(2)}</p>
      </div>
      <div>
        <button class="btn btn-sm btn-secondary minus-btn">-</button>
        <span class="mx-2">${item.quantity}</span>
        <button class="btn btn-sm btn-secondary plus-btn">+</button>
        <button class="btn btn-sm btn-danger ms-2 remove-btn">Remove</button>
      </div>
    `;


    row.querySelector(".minus-btn").addEventListener("click", () => changeQuantity(index, -1));
    row.querySelector(".plus-btn").addEventListener("click", () => changeQuantity(index, 1));
    row.querySelector(".remove-btn").addEventListener("click", () => removeFromCart(index));

    cartBody.appendChild(row);
  });


  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;


  let discountPercentage = 0;
  if (appliedPromo === "ostad10") {
    discountPercentage = 0.10;
  } else if (appliedPromo === "ostad5") {
    discountPercentage = 0.05;
  }
  const discountAmount = subtotal * discountPercentage;
  const finalTotal = subtotal - discountAmount;

 
  cartSubtotalElem.textContent = subtotal.toFixed(2);
  discountAmountElem.textContent = discountAmount.toFixed(2);
  finalTotalElem.textContent = finalTotal.toFixed(2);

 
  if (!appliedPromo) {
    promoMessage.textContent = "";
  }
}


function changeQuantity(index, delta) {
  if (cart[index].quantity + delta >= 1) {
    cart[index].quantity += delta;
    updateCartUI();
  }
}


function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}


function addToCart(product) {
 
  const existingIndex = cart.findIndex(item => item.id === product.id);
  if (existingIndex === -1) {
    cart.push({ ...product, quantity: 1 });
  } else {
    cart[existingIndex].quantity++;
  }
  alert(`${product.title} has been added to the cart!`);
  updateCartUI();
}


document.getElementById("applyPromoBtn").addEventListener("click", () => {
  const promoInput = document.getElementById("promoInput").value.trim().toLowerCase();
  const promoMessage = document.getElementById("promoMessage");


  if (appliedPromo) {
    promoMessage.textContent = "A promo code has already been applied.";
    promoMessage.style.color = "red";
    return;
  }


  if (promoInput === "ostad10" || promoInput === "ostad5") {
    appliedPromo = promoInput;
    promoMessage.textContent = "Promo code applied successfully!";
    promoMessage.style.color = "green";
  } else {
    promoMessage.textContent = "Invalid promo code.";
    promoMessage.style.color = "red";
  }
  updateCartUI();
});


document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  const finalTotal = document.getElementById("finalTotal").textContent;
  alert(`Proceeding to checkout. Your total is $${finalTotal}.`);

});


document.getElementById("clearCartBtn").addEventListener("click", () => {
  if (confirm("Are you sure you want to clear the cart?")) {
    cart = [];
    appliedPromo = null; 
    document.getElementById("promoInput").value = "";
    document.getElementById("promoMessage").textContent = "";
    updateCartUI();
  }
});
