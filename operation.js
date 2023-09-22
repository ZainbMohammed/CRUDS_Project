// catch all needed element to deal with them
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let btnDeleteAll = document.getElementById("deleteAll");
let search = document.getElementById("search");
let mode = "create";
let tmp;

// func to get total price.. it work when write on price partion
function getTotal() {
  // console.log("writting");
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "purple";
  }
}

//check localStorage if it contain data or not to prevent override data list
let products;
if (localStorage.products != null) {
  products = JSON.parse(localStorage.products);
} else {
  // products = [];
}

// fn to collect info about the product and add it to products list
submit.onclick = function () {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML, // it not input field
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (mode === "create") {
    // add new product (object) to product list depended on count number
    if (newProduct.count > 1) {
      for (let i = 0; i < newProduct.count; i++) {
        // add multip at once
        products.push(newProduct);
      }
    } else {
      products.push(newProduct); // create only one product
    }
  } else {
    // here will update an exisiting product
    products[tmp] = newProduct;
    mode = "create";
    submit.innerHTML = "Create";
    count.style.display = "block";
  }

  // add & update producs in localStorage
  localStorage.setItem("products", JSON.stringify(products));
  // after added make the field ready to writr for another product
  clearInputFields();
  showData();
};

// fn to erase character from input field for make them ready to write
function clearInputFields() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
// fn to read all products one by one and add product as a row in table
function showData() {
  if (products.length > 0) {
    btnDeleteAll.style.display = "block";
  } else {
    btnDeleteAll.style.display = "none";
  }
  let rows = "";
  for (let i = 0; i < products.length; i++) {
    rows += `
        <tr>
            <td>${i}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td><button onclick  = "update( ${i} )" id="update">update</button></td>
            <td><button onclick = "deleteProduct( ${i} )" id="delett">delete</button></td>
        </tr>`;
  }
  document.getElementById("tbody").innerHTML = rows;
}
// call here for disply data all time.. not just when create new product
showData();

// delete a specified product when click on delete button of a product row
function deleteProduct(index) {
  products.splice(index, 1); // 1- delete product from products list depended on its index
  localStorage.products = JSON.stringify(products); // 2- update the localStotage after deleteed
  showData(); // 3- update disply  data
}

// delete all products when click on delete all button
function deleteAll() {
  products.splice(0); // delete from start to end
  localStorage.clear();
  showData();
}

// update sepecific product
function update(index) {
  currntProduct = products[index];
  // console.log(currntProduct);
  title.value = currntProduct.title;
  price.value = currntProduct.price;
  taxes.value = currntProduct.taxes;
  ads.value = currntProduct.ads;
  discount.value = currntProduct.discount;
  total.innerHTML = currntProduct.total;
  // count.value = currntProduct.count;
  count.style.display = "none";
  category.value = currntProduct.category;
  submit.innerHTML = "Update";
  mode = "update";
  tmp = index; // to pass index of product for submit.onclick
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// determin which mode will be used to search when click on search by title || category
let searchMode = "title";
function determineMode(id) {
  if (id === "searchTite") {
    searchMode = "title";
    search.placeholder = "Searche By Title";
  } else {
    searchMode = "category";
    search.placeholder = "Searche By Category";
  }
  search.focus();
  search.value = '';
  showData();
}

// search data dependent  on the character writting in search input
function searchFN(value) {
  let rows = "";
  if (searchMode === "title") {
    for (let i = 0; i < products.length; i++) {
      if (products[i].title.includes(value.toLowerCase())) {
        rows += `
          <tr>
              <td>${i}</td>
              <td>${products[i].title}</td>
              <td>${products[i].price}</td>
              <td>${products[i].taxes}</td>
              <td>${products[i].ads}</td>
              <td>${products[i].discount}</td>
              <td>${products[i].total}</td>
              <td>${products[i].category}</td>
              <td><button onclick  = "update( ${i} )" id="update">update</button></td>
              <td><button onclick = "deleteProduct( ${i} )" id="delett">delete</button></td>
          </tr>`;
      }
    }
  }
  else{
    for (let i = 0; i < products.length; i++) {
      if (products[i].category.includes(value.toLowerCase())) {
        rows += `
          <tr>
              <td>${i}</td>
              <td>${products[i].title}</td>
              <td>${products[i].price}</td>
              <td>${products[i].taxes}</td>
              <td>${products[i].ads}</td>
              <td>${products[i].discount}</td>
              <td>${products[i].total}</td>
              <td>${products[i].category}</td>
              <td><button onclick  = "update( ${i} )" id="update">update</button></td>
              <td><button onclick = "deleteProduct( ${i} )" id="delett">delete</button></td>
          </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = rows;
}
