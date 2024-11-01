function insertDynamicProducts(productArray){
    var dynamicProductList = document.getElementById("dynamicProductDataList")
    //Start with an empty string to build up the new HTML
    let newContent = "<table class='table'><tr class=> ";

    // Loop through the productArray elements
    for (let i = 0; i < productArray. length; i++) {
    // Log the current product object to the console
    console.log(productArray[i]);

    
    newContent +=
    "<td class='products'><a href='update_product.html?id=" + productArray[i].id + "'>" + "<div class='product-content'>" +
    "<img src='" + productArray[i].picture + "' width='250' height='250' id='picz'><br>" + 
    "<p class='pname'><b>" + productArray[i].name + "</b></p>" +
    "<p class='price'><b>" + "$" + productArray[i].price + "</b></p>" +
    "<br><p class='cat'><b>"  + productArray[i].category + "</b></p>" +
    "<p class='desc'>" + productArray[i].description + "</p>" +
    "</div>" + "</td></a>";

    // After every third product, end the current row and start a new one
        if ((i + 1) % 5 === 0 && i < productArray.length - 1) { //% 3 is how any in one row
        newContent += "</tr><tr>";
        } 
    }
    // Close the last row and the table
    newContent += "</tr></table>";
    /* alert(newContent) //show new table is created */
    // Update the innerHTML once, after building the complete HTML string
    dynamicProductList.innerHTML = newContent;
}

function loadProductData() {
    var request = new XMLHttpRequest();
    var productArray = []
    request.open("GET","/product",true)
    request.onload=function(){
        productArray = JSON.parse(request.responseText)
        insertDynamicProducts(productArray)
    }
    request.send()
}



// Example usage

function addProductData() {
    var product = new Object(); // create an object to be send over
    product.name = document.getElementById('name').value;
    product.description = document.getElementById('description').value;
    product.price = document.getElementById('price').value;
    product.category_id = document.getElementById('category_id').value;
    product.picture = document.getElementById('picture').value;

    

    if (product.name.length > 100 ){ /* check name length */
        alert('Name should be less than 100 characters')
        return
    }else if (product.description.length > 200 ){ /* check desc length */
        alert('Description should be less than 200 characters')
        return
    }else if (!product.name || !product.description || !product.price || !product.picture){ /* check for empty input*/
        alert('Please do not leave anything empty!')
        return
    }else if (product.price.length > 10 ){
        alert('Product Price Limit is 10 digits incusive of 2 decimal places')
        return;

    }


    var request = new XMLHttpRequest(); // new HttpRequest instance to send product data
    request.open("POST","/product", true) ; //Use The HTTP POST method to send data to server
    request.setRequestHeader("Content-Type", "application/json"); //lor Post method we have specific the content type

    request.onload = function() {
    alert("Successfully Added Product!")
    }
    request.send(JSON.stringify(product));
}

function loadProductDetail() {
    var request = new XMLHttpRequest();
    var params = new URLSearchParams(location.search);
    var id = params.get("id");

    console.log("id is " + id);
    var product;
    var urlLink = "/product/" + id;
    request.open("GET", urlLink, true);
    request.onload = function () {
        product = JSON.parse(request.responseText);
        console.log(product);
        setProductDetail(product[0]);
        loadCategoryDatas(product[0]); // Call loadCategoryDatas with product data
    };
    request.send();
}


function setProductDetail(product) /* set prod detail */
{
    document.getElementById('name').value = product.name;
    document.getElementById('description').value = product.description;
    document.getElementById('price').value = product.price;
    document.getElementById('category_id').value = product.category_id;
    document.getElementById('picture').value = product.picture;
    document.getElementById('id').value = product.id;
    document.getElementById('deleteButton').setAttribute("prodId",product.id)
}   



function updateProductData(){
    
    var product = new Object();
    product.name = document.getElementById('name').value;
    product.description = document.getElementById('description').value;
    product.price = document.getElementById('price').value;
    product.category_id = document.getElementById('category_id').value;
    product.picture = document.getElementById('picture').value;
    var id = document.getElementById('id').value;

    

    if (product.name.length > 100 ){ /* check name length */
        alert('Name should be less than 100 characters')
        return
    }else if (product.description.length > 200 ){ /* check desc length */
        alert('Description should be less than 200 characters')
        return
    }else if (!product.name || !product.description || !product.price || !product.picture){ /* check for empty input*/
        alert('Please do not leave anything empty!')
        return
    }else if (product.price.length > 10 ){
        alert('Product Price Limit is 10 digits incusive of 2 decimal places')
        return;

    }



    var request = new XMLHttpRequest();
    var urlLink = "/product/" + id;
    request.open("PUT", urlLink, true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function(){
        alert("Successfully Updated Product!")
    };
    request.send(JSON.stringify(product));
};

function deleteProductData(item){
    var id = item.getAttribute("prodId")
    console.log("delete id" + id)
    var request = new XMLHttpRequest();

    request.open("delete", "/product/" + id, true)

    request.onload = function(){
        alert("Successfully Deleted Product!")
        location.href = "/product.html"

    }
    request.send()
}

function loadCategoryData() {
    var request = new XMLHttpRequest();
    var categoryArray = []
    request.open("GET","/category",true)
    request.onload=function(){
        categoryArray = JSON.parse(request.responseText)
        insertDynamicCategory(categoryArray)
    }
    request.send()
}
function insertDynamicCategory(categoryArray) {

    var dynamicCategoryBox = document.getElementById("category_id")
    let newContent
    for (let i = 0; i < categoryArray.length; i++) {
    newContent+=
    " <option value=" + categoryArray[i].id+">" + categoryArray[i].name +"</option>";
    // Update the innerHTML once, after building the complete HTML string
    dynamicCategoryBox.innerHTML = newContent;
}
}

function searchProducts() { /* used for search function */
    var input, filter, table, tr, td, i, txtValue; /* declare each variable */
    input = document.getElementById("search"); /*gets search id and assign to input */
    filter = input.value.toUpperCase(); /* get input n convert to uppercase */
    table = document.getElementById("dynamicProductDataList"); /* gets element table */
    tr = table.getElementsByTagName("td"); /* gets element in td */

    for (i = 0; i < tr.length; i++) { /* loops thru td */
        td = tr[i]; /* assigns current elemt to td */
        if (td) { /* check if element even exists */

            txtValue = td.textContent || td.innerText; /*gets cont of text in td element */
            if (txtValue.toUpperCase().indexOf(filter) > -1) { /* if text contains search filter */
                tr[i].style.display = ""; /*display current table */
            } else { /*if text DOESNT exist */
                tr[i].style.display = "none"; /*displays nothing */
            }
        }
    }
}


/* this for update */

function loadCategoryDatas(productData) {
    var request = new XMLHttpRequest();
    var categoryArray = []
    request.open("GET","/category",true)
    request.onload=function(){
        categoryArray = JSON.parse(request.responseText)
        insertDynamicCategorys(categoryArray,productData)
    }
    request.send()
}

function insertDynamicCategorys(categoryArray,productData) {

    var dynamicCategoryBox = document.getElementById("category_id")
    let newContent = '';
    for (let i = 0; i < categoryArray.length; i++) {
        console.log(productData.category_id)
        console.log()
    if(productData.category_id == categoryArray[i].id) {
    newContent+=
    " <option value=" + categoryArray[i].id+ " selected "+">" + categoryArray[i].name +"</option>";
}
    else{
        newContent+=
        " <option value=" + categoryArray[i].id+">" + categoryArray[i].name +"</option>";
    }
        // Update the innerHTML once, after building the complete HTML string
    
        }   
    dynamicCategoryBox.innerHTML = newContent;
}



