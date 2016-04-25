
$(document).ready(function(){
   // var productId = sessionStorage.getItem("productId");
   var productId = sessionStorage.getItem("dataId");
    var $ul = $("#product-category");
     //var href = "https://api.bestbuy.com/v1/products(categoryPath.id=" + productId + ")?format=json&apiKey=";
     var href = "https://parkland-csc175.github.io/csc175data/bestbuy/products-list.json";
     $.get(href, function(result){
         console.log(result);
          result.products.forEach(function(post){
              console.log(post);
              var $li = $("<li></li>");
              var $text1 = $("<text />").text(post.manufacturer);
              var $a = $("<a />").attr('href', "#").attr("sku", post.sku).attr("data-id", post.productId).text(post.name);
              $li.append($a);
              $ul.append($li); 
          });
          
         $("#product-category").on("click", "a", function(event){    
            var $linkClicked = $(event.target);    
            console.log($linkClicked);
            if($linkClicked !== undefined || $linkClicked !== null){
                var $prodId = $linkClicked.data("id");
                console.log($prodId);
                sessionStorage.setItem("prodId", $prodId);
                this.href = "product-details.html";
            }            
         });
     });
});
function goBack() {
    window.history.back();
}