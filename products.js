async function fetchProducts() {
    try {
      const response = await fetch("https://fakestoreapiserver.reactbd.com/smart");
      if (!response.ok) throw new Error("Network Error");
      const products = await response.json();
      renderProducts(products);
    } catch (error) {
      console.error("Error fetching Products:", error);
    }
  }

fetchProducts();