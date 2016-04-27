
$(document).ready(function(){
    var productId = sessionStorage.getItem("productId");
    var $ul = $("#product-category");
    var apiKey = null;
    var url = getUrl();
    
     $.get(url, function(result){
         console.log(result);
          result.products.forEach(function(post){
              console.log(post);
              var $table= $(".table");
              var $tr = $("<tr></tr>");
              var $img = $("<img>").attr("src", post.thumbnailImage);
              var $td1 = $("<td></td>").attr("id", "brand").text(post.manufacturer);
              var $td2 = $("<td></td>").attr("id", "name").text(post.name);
              var $td3 = $("<td></td>").attr("id", "price").text(post.salePrice);
              var $a = $("<a></a>").attr("href", "#").attr("sku", post.sku).attr("data-id", post.productId).text("Click to view");
              $tr.append($img);
              $tr.append($td1);
              $tr.append($td2);
              $tr.append($td3);
              $tr.append($a);
              $table.append($tr);
          });
          
         $(".table").on("click", "a", function(event){    
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
   function getUrl(){
        var api = apiKey || localStorage.getItem("BEST_BUY_API_KEY");
        //console.log("apiKey is : " + api);
        if(api !== "null")
            return "https://api.bestbuy.com/v1/products(categoryPath.id=" + productId + ")?format=json&apiKey=" + apiKey;
        else
            return "https://parkland-csc175.github.io/csc175data/bestbuy/products-list.json";
    }
});

/*
              var $li = $("<li></li>");
              var $text1 = $("<text />").text(post.manufacturer);
              var $a = $("<a />").attr('href', "#").attr("sku", post.sku).attr("data-id", post.productId).text(post.name);
              $li.append($a);
              $ul.append($li); 
              */