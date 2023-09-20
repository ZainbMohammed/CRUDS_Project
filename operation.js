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
  products = [];
}


// fn to collect info about the product and add it to products list
submit.onclick = function () {
  let newProduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML, // it not input field
    count: count.value,
    category: category.value,
  };
  // add new product (object) to prosucts list
  products.push(newProduct);
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
  if (products.length > 0){
    btnDeleteAll.style.display = 'block';
  }else {
    btnDeleteAll.style.display = 'none';
  }
  let rows = '';
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
            <td><button id="update">update</button></td>
            <td><button onclick = "deleteProduct( ${i} )" id="delett">delete</button></td>
        </tr>`;
  }
  document.getElementById('tbody').innerHTML = rows;
}
// call here for disply data all time.. not just when create new product
showData()


// delete a specified product when click on delete button of a product row
function deleteProduct(index){

    products.splice(index,1);   // 1- delete product from products list depended on its index
    localStorage.products = JSON.stringify(products);  // 2- update the localStotage after deleteed
    showData();  // 3- update disply  data
}


// delete all products when click on delete all button
function deleteAll(){
    products.splice(0); // delete from start to end
    localStorage.clear(); 
    showData();
}

