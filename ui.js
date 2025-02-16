function renderProducts(products) {
    const productRow = document.getElementById("productRow");
    productRow.innerHTML = ""; // Clear previous content
  
    products.forEach(product => {
      // Ensure the product has a unique id (it should already have one)
      if (!product.id) {
        // fallback: assign based on array index (not recommended if API provides unique ids)
        product.id = Math.floor(Math.random() * 100000);
      }
  
      // Build star rating HTML (assuming product.rating is numeric)
      const maxStars = 5;
      let starRatingHTML = "";
      for (let i = 1; i <= maxStars; i++) {
        starRatingHTML += i <= product.rating 
          ? '<i class="bi bi-star-fill text-warning"></i>' 
          : '<i class="bi bi-star text-warning"></i>';
      }
  
      // Create card element
      const colDiv = document.createElement("div");
      colDiv.className = "col-sm-12 col-md-6 col-lg-4 mb-4";
      colDiv.innerHTML = `
        <div class="card h-100">
          <img src="${product.image}" class="card-img-top" alt="${product.title}">
          <div class="card-body d-flex flex-column">
            <a href="#"><h6 class = 'card-text'>${product.category} </h6></a>
            <hr>
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
            <div class="mb-2">${starRatingHTML}</div>
            <p class="card-text"><strong>$${product.price}</strong></p>
            <button type="button" class="btn btn-primary mt-auto" 
                    data-bs-toggle="offcanvas" 
                    data-bs-target="#cartCanvas" 
                    aria-controls="cartCanvas">
              Add to Cart
            </button>
          </div>
        </div>
      `;
  
      // When button is clicked, call addToCart
      colDiv.querySelector("button").addEventListener("click", () => {
        addToCart(product);
      });
  
      productRow.appendChild(colDiv);
    });
  }