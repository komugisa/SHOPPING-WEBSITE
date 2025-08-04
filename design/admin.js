const adminPassword = "naju2025";

function checkPassword() {
  const input = document.getElementById("admin-password").value;
  const errorMsg = document.getElementById("login-error");

  if (input === adminPassword) {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("upload-section").style.display = "block";
    errorMsg.textContent = "";
    displayAdminProducts();
  } else {
    errorMsg.textContent = "Incorrect password. Try again.";
  }
}

function uploadProduct() {
  const name = document.getElementById("product-name").value.trim();
  const price = document.getElementById("product-price").value.trim();
  const image = document.getElementById("product-image").value.trim();
  const successMsg = document.getElementById("success-msg");

  if (!name || !price || !image) {
    successMsg.style.color = "red";
    successMsg.textContent = "Please fill in all fields.";
    return;
  }

  fetch("upload_product.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, price, image })
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === "success") {
      successMsg.style.color = "green";
      successMsg.textContent = "Product uploaded successfully!";
      document.getElementById("product-name").value = "";
      document.getElementById("product-price").value = "";
      document.getElementById("product-image").value = "";
      displayAdminProducts();
    } else {
      successMsg.style.color = "red";
      successMsg.textContent = "Failed to upload.";
    }
  });
}

function displayAdminProducts() {
  fetch("get_products.php")
    .then(res => res.json())
    .then(products => {
      const container = document.getElementById("admin-product-list") || createProductListContainer();
      container.innerHTML = "";

      products.forEach(product => {
        const div = document.createElement("div");
        div.innerHTML = `
          <div style="margin-bottom: 10px;">
            <h4>${product.name}</h4>
            <p>${product.price}</p>
            <img src="${product.image}" alt="" style="max-width: 150px;"><br>
            <button onclick="deleteProduct(${product.id})">Delete</button>
            <hr>
          </div>
        `;
        container.appendChild(div);
      });
    });
}

function deleteProduct(id) {
  if (confirm("Are you sure you want to delete this product?")) {
    fetch("delete_product.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === "success") {
        displayAdminProducts();
      } else {
        alert("Failed to delete.");
      }
    });
  }
}

function createProductListContainer() {
  const div = document.createElement("div");
  div.id = "admin-product-list";
  document.querySelector(".admin-container").appendChild(div);
  return div;
}
