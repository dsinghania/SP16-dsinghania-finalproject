$(document).ready(function(){
    var prodId = sessionStorage.getItem("prodId");
    var $ul = $("#product-detail");
    
     //var href = "https://api.bestbuy.com/v1/products(productId=" + prodId + ")?format=json&apiKey=";
     var href = "https://parkland-csc175.github.io/csc175data/bestbuy/product-details-4506800.json";
     var $divprice = $("#price");
     var $name = $("#name");
     $.get(href, function(result){
         //console.log(result);
         //console.log("Name- " + result.products[0].name + " Regular Price- " + result.products[0].regularPrice);
         //console.log("Brand- " + result.products[0].manufacturer + " Sale Price- " + result.products[0].salePrice);  
         $(".img-responsive").attr("src", result.products[0].image);
         var $li = $("<li></li>");
         var prodName = document.createTextNode(result.products[0].name + " (Product ID: " + prodId +")");
         var t1 = document.createTextNode( "$ " + result.products[0].salePrice);
         var t2 = document.createTextNode(" Brand- " + result.products[0].manufacturer);
         $name.append(prodName); 
         $divprice.append(t1); 
     });
     
     $("#productId").val(prodId);
     
    $('[type*="radio"]').change(function () {
        var value = $(this).attr('value');
        //console.log("rating is " + document.forms['rate_form'].elements["rating"].value);
        $("#rate").val(value);
    });
     $("#email_form").validate({
         rules:{
             "email": {
                required: true,
                email:    true
             },
             "firstName": {
                 required: true
             },
             "lastName": {
                 required: true
             },
             "productId":{
                 required: true   
             },
             "rating":{
                 required: true,
                 digits: true,
                 min: 1,
                 max: 5
             },
             "comment":{
                 required: true   
             }
         },
         messages:{
            "email":{
                required: "Please enter a valid email."
            },
            "firstName": {
                required: "Please enter your first name."
            },
            "lastName": {
                required: "Please enter your last name."
            },
             "productId":{
                 required: "Please enter the product id."  
             },
             "rating":{
                 required: "Rating should be 1 thru 5."
             },
             "comment":{
                 required: "Please enter your comment here."  
             }
        }
     });   
     
    $('.btn').on('click',"button", function() {
        $("#email_form").valid();
        alert("Comments take upto 48 hours to be reviewed before being posted to the site.");
    });
});

function myFunction(){
   // $("#email_form").valid();
    alert("Comments take upto 48 hours to be reviewed before being posted to the site.");
};
function goBack() {
    window.history.back();
}

