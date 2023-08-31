const socket = io() // levantamos el socket desde el lado del cliente

socket.on('render', (data) => {
    console.log(data)
})


const form = document.getElementById("formProducts")
form.addEventListener("submit", (e) => {
    e.preventDefault()
    
    const productTitle = document.getElementById("productTitle");
    const productDescription = document.getElementById("productDescription")
    const productPrice = document.getElementById("productPrice")
    const productCode = document.getElementById("productCode")
    const productStock = document.getElementById("productStock")

    const product = {
        title: productTitle.value,
        description: productDescription.value,
        price: productPrice.value,
        code: productCode.value,
        stock: productStock.value,
    }

    socket.emit('addProduct', product)

    productTitle.value = ""
    productDescription.value = ""
    productPrice.value= ""
    productCode.value= ""
    productStock.value = ""

    location.reload()
})


socket.on("initialProductList", (productList) => {
  updateProductList(productList);

  
});

socket.on("nuevoProductoAgregado", (newProduct) => {
  const productList = document.getElementById("productList");
  const li = document.createElement("li");
  li.textContent = newProduct.title;

  productList.appendChild(li);
});

function updateProductList(products) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  products.forEach((product) => {
    const div = document.createElement("div");
    div.innerHTML = `
    
      <p>Id: ${product.id}</p>
      <p>Título: ${product.title}</p>
      <p>Descripción: ${product.description}</p>
      <p>Precio: ${product.price}</p>
      <p>Código: ${product.code}</p>
      <p>Stock: ${product.stock}</p>
      <p>Status: ${product.status}</p>
      <button class="deleteButton" data-product-id="{{this.id}}">Eliminar</button>
    `;

          
    productList.appendChild(div);
  });
}

const deleteButton = document.querySelectorAll(".deleteButton")
deleteButton.forEach(button => {
    button.addEventListener("click", () => {
        const id = button.id
        const productId = {
            id: id
        }

        socket.emit('delete-product', productId)
        
        location.reload()
    })
})