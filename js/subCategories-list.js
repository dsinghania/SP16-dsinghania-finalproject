// custom code for parkland bookstore

$(document).ready(function(){    
    var dataId = sessionStorage.getItem("dataId");
    var $ul = $("#sub-category");   
    var $divHeader = $("#head");
    var $h1 = $("<h1></h1>");
    $h1.html("Best Buy Sub-Categories List");
    $divHeader.append($h1);
    var apiKey = null;
    var url = getUrl();
    console.log("url is " + url);
    console.log("data id is " + dataId);
    if(dataId !== "null"){
          $.get(url, function(result){
         //console.log(result);
          result.categories[0].subCategories.forEach(function(post){
              //console.log(post);
              var $li = $("<li></li>");
              var $a = $("<a />").attr('href', "#").attr("data-id", post.id).text(post.name);
              $li.append($a);
              $ul.append($li); 
          });
          
         $("#sub-category").on("click", "a", function(event){    
            var $linkClicked = $(event.target);    
            //console.log($linkClicked);
            var $proId = $linkClicked.data("id");
            //console.log($proId);
            sessionStorage.setItem("productId", $proId);
            this.href = "products-list.html";            
         });
     });
   }
   function getUrl(){
        var api = apiKey || localStorage.getItem("BEST_BUY_API_KEY");
        console.log("apiKey is : " + api);
        if(api !== null)
            return "https://api.bestbuy.com/v1/categories(id=" + dataId + ")?format=json&apiKey=" + api + "&show=subCategories";
        else
            return "https://parkland-csc175.github.io/csc175data/bestbuy/category-subcategories-abcat0101000.json";
    }
});

///products-list.html?categoryId=30 (query string)
//document.location.search will give categoryid=30
//or
//single page application model (SPA)
//
