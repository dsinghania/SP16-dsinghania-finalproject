$(document).ready(function(){
    var prodId = sessionStorage.getItem("prodId");
    //var $ul = $("#product-detail");
    var apiKey = null;
    var url = getUrl();
    
    var $divprice = $("#price");
    var $name = $("#name");
     
     $.get(url, function(result){
         //console.log(result);
         //console.log("Name- " + result.products[0].name + " Regular Price- " + result.products[0].regularPrice);
         //console.log("Brand- " + result.products[0].manufacturer + " Sale Price- " + result.products[0].salePrice);  
        $(".img-responsive").attr("src", result.products[0].image);
        //var $li = $("<li></li>");
        var prodName = document.createTextNode(result.products[0].name + " (Product ID: " + prodId +")");
        var t1 = document.createTextNode( "$ " + result.products[0].salePrice);
        //var t2 = document.createTextNode(" Brand- " + result.products[0].manufacturer);
        $name.append(prodName); 
        $divprice.append(t1); 
         
        var $divWell = $(".well");    
             
        var sku = result.products[0].sku;
        console.log("sku for this product is " + sku);
        var href = getReviewUrl(sku);
        
        if(href){
         $.get(href, function(result1){
             console.log(result1);
             $("#comment").text(result1.total + " comments"); 
             result1.reviews.forEach(function(post){
                 console.log(post);
                 var $divRow = $("<div></div>").attr("class", "row");
                 var $divCol = $("<div></div>").attr("class", "col-md-12");
                 $divWell.append($divRow);
                 $divRow.append($divCol);
                 for(var i = 1; i <= post.rating; i++){
                     var $spanFilled = $("<span></span>").addClass("glyphicon glyphicon-star");                     
                     $divCol.append($spanFilled);
                 }
                  
                 for (var i = 5; i > post.rating; i--){
                     var $spanEmpty = $("<span></span>").addClass("glyphicon glyphicon-star-empty");
                     $divCol.append($spanEmpty);
                 }
                     
                 if (post.rating == 5)
                    $spanFilled.text(" " +  post.reviewer[0].name);
                 else
                    $spanEmpty.text(" " +  post.reviewer[0].name);
                    
                 var dateToday = new Date().getTime(); 
                 var commentTime = new Date(post.submissionTime).getTime();
                 var  newTime = Math.round( (dateToday - commentTime) / (24 * 60 * 60 * 1000));
                 var $divTime = $("<div></div>").addClass("pull-right").text(newTime + " days");
                 //var $time = $(document.createTextNode(newTime + " days"));
                 $divCol.append($divTime);   
                    
                 var $p = $("<p></p>").text(post.comment);
                 $divCol.append($p);
                 var $hr = $("<hr>");
                 $divCol.append($hr);
             });
         });
       }
    });
    $("#productId").val(prodId);
     
    $('[type*="radio"]').change(function() {
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
    
   function getUrl(){
        var apik = apiKey || localStorage.getItem("BEST_BUY_API_KEY");
        console.log("apiKey is : " + apik);
        if(apik !== null)
            return "https://api.bestbuy.com/v1/products(productId=" + prodId + ")?format=json&apiKey=" + apik;
        else
            return "https://parkland-csc175.github.io/csc175data/bestbuy/product-details-4506800.json";
    }
    function getReviewUrl(sku){
        var api = apiKey || localStorage.getItem("BEST_BUY_API_KEY");
        //var sku = sessionStorage.getItem("sku");
        console.log("apiKey is : " + api);
        if(api !== null)
            return "http://api.bestbuy.com/v1/reviews(sku=" + sku + ")?format=json&apiKey=" + api;
        else
            return "https://parkland-csc175.github.io/csc175data/bestbuy/product-reviews-4506800.json";
    }

});

function myFunction(){
    $("#email_form").valid();
    alert("Comments take upto 48 hours to be reviewed before being posted to the site.");
};
function goBack() {
    window.history.back();
}

//http://api.bestbuy.com/v1/reviews(sku=SKUNUMBER)?format=json&apiKey=XXXXX
