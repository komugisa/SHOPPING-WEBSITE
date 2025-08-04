const productsPerPage = 6;
let currentPage = 1;

function displayProducts() {
  const productList = document.getElementById("product-list");
  const pagination = document.getElementById("pagination");

  const products = JSON.parse(localStorage.getItem("products")) || [];

  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;
  const paginatedItems = products.slice(start, end);

  productList.innerHTML = "";

  paginatedItems.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.price}</p>
    `;
    productList.appendChild(card);
  });

  pagination.innerHTML = "";
  const totalPages = Math.ceil(products.length / productsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = i === currentPage ? "active-page" : "";
    btn.onclick = () => {
      currentPage = i;
      displayProducts();
    };
    pagination.appendChild(btn);
  }
}

window.onload = displayProducts;
