// custom code for parkland bookstore

$(document).ready(function(){
    
    var dataId = sessionStorage.getItem("dataId");
    var $ul = $("#sub-category");
    //var href = "https://api.bestbuy.com/v1/categories(id=" + dataId + ")?format=json&apiKey=&show=subCategories";//add apikey
    var href = "";
    if(dataId){
          $.get(href, function(result){
         console.log(result);
          result.categories[0].subCategories.forEach(function(post){
              console.log(post);
              var $li = $("<li></li>");
              var $a = $("<a />").attr('href', "#").attr("data-id", post.id).text(post.name);
              $li.append($a);
              $ul.append($li); 
          });
          
         $("#sub-category").on("click", "a", function(event){    
            var $linkClicked = $(event.target);    
            console.log($linkClicked);
            var $proId = $linkClicked.data("id");
            console.log($proId);
            sessionStorage.setItem("productId", $proId);
            this.href = "product-list.html";
            
         });
     });
   }
});
///products-list.html?categoryId=30 (query string)
//document.location.search will give categoryid=30
//or
//single page application model (SPA)
//