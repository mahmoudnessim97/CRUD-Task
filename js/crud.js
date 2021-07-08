var ProductName = document.getElementById('productName');//input kolo
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productDesc = document.getElementById('productDesc');
var tableBody= document.getElementById('tableBody');
var searchInput= document.getElementById('searchInput');
var mainBtn = document.getElementById("mainBtn");
var productContainer ;
var productIndex="";
mainBtn.addEventListener("click",function(){

    if (mainBtn.innerHTML=="update") 
{
    addProduct();
    mainBtn.innerHTML="add product";
}
 else {
    
    updateProduct();
    
}
})

if(localStorage.getItem('producstList') == null)
{
    productContainer=[];
}
else
{
    productContainer = JSON.parse(localStorage.getItem("producstList"));
    displayProduct();

}

function addProduct() {
    
    if (checkInput()==true) {
       
        if(validateProductName()==true){
                
            var product = {
                name:productName.value,
                price:productPrice.value,
                category:productCategory.value,
                desc:productDesc.value
            };
            // console.log(productContainer);
            productContainer.push(product);
            localStorage.setItem("producstList",JSON.stringify(productContainer));
            displayProduct();
            clearForm();
            
        
        }

        else{
            window.alert('productName in-valid');
        } 
    }
    else{
        window.alert('Sorry All Fields Are Required');
    }
      
        
    }

function clearForm() {
    productName.value='';
    productPrice.value='';
    productCategory.value='';
    productDesc.value='';

    
}
function displayProduct() {
    var cartona=``;
    for (var i = 0; i < productContainer.length; i++) {
        cartona+=`<tr>
        <td>${i}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].desc}</td>
        <td><button onclick='updateProduct(${i})' class="btn btn-outline-warning">update</button></td>
        <td><button onclick='deleteProduct(${i})' class="btn btn-outline-danger">delete</button></td>

        </tr>`
        tableBody.innerHTML=cartona;   
    }
   
}

function checkInput() {
    if (productName.value !="" && productPrice.value !=""
     && productCategory.value !="" && productDesc.value !="") {
        
        return true;
    }
    else {
        return false;
        }
    
}
function deleteProduct(index) {
    productContainer.splice(index,1);
    
   localStorage.setItem("producstList",JSON.stringify(productContainer));

    displayProduct(); 

    
}
 function updateProduct(index) {
    

     productName.value=productContainer[index].name;
     productPrice.value=productContainer[index].price;
     productCategory.value=productContainer[index].category;
     productDesc.value=productContainer[index].desc;

    var product = {
        name:productName.value,
        price:productPrice.value,
        category:productCategory.value,
        desc:productDesc.value
    };
    // console.log(productContainer);
    productContainer[productIndex]=product;

    localStorage.setItem("producstList",JSON.stringify(productContainer));
    displayProduct();
    // clearForm();
    mainBtn.innerHTML="update";
 }




function searchProduct() {
    var cartona=``;
   
    for (var i = 0; i <productContainer.length; i++ ){

        if(productContainer[i].name.toLowerCase().includes(searchInput.value.toLowerCase())
        ||productContainer[i].category.toLowerCase().includes(searchInput.value.toLowerCase())
        ||productContainer[i].desc.toLowerCase().includes(searchInput.value.toLowerCase()))
        {
            cartona+=`<tr>
            <td>${i}</td>
            <td>${productContainer[i].name}</td>
            <td>${productContainer[i].price}</td>
            <td>${productContainer[i].category}</td>
            <td>${productContainer[i].desc}</td>
            <td><button class="btn btn-outline-warning">update</button></td>
            <td><button onclick='deleteProduct(${i})' class="btn btn-outline-danger">delete</button></td>
    
            </tr>`
        }      

    }
    tableBody.innerHTML=cartona;
}

function validateProductName() {
    var regex = /^([A-Z0-9]|[a-z0-9]){3,8}$/;
    if (regex.test(ProductName.value) == true) 
    {
    return true;    
    }
    else
    {
        return false;
    }
    
}