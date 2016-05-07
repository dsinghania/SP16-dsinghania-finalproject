
$(document).ready(function(){
    var productId = sessionStorage.getItem("productId");   
    sessionStorage.setItem("currentPage", 1);
    var apiKey = null;
    var api = apiKey || localStorage.getItem("BEST_BUY_API_KEY");
    var url = getUrl();
    showData(url);
      
    var $divHeader = $("#head");
    var $h1 = $("<h1></h1>");
    $h1.html("Best Buy Products List");
    $divHeader.append($h1);
    $(".container").on("click", "button", function(e){
        var $buttonClicked = $(this).data("action");
        console.log($buttonClicked);
        $(".table").remove();
        if($buttonClicked === "next"){
            var nextPage = Number(sessionStorage.getItem("currentPage")) + 1;
            var total = Number(sessionStorage.getItem("totalPages"));
            if(nextPage > total){
                alert("You are on the last page");
                var href = "http://api.bestbuy.com/v1/products(categoryPath.id=" + productId + ")?page=" + total + "&format=json&apiKey=" + api;
                showData(href);   
            }else{
                sessionStorage.setItem("currentPage", nextPage);
                var url = "http://api.bestbuy.com/v1/products(categoryPath.id=" + productId + ")?page=" + nextPage + "&format=json&apiKey=" + api;
                showData(url);
            }
        }
        if($buttonClicked === "previous"){
            var prevPage = Number(sessionStorage.getItem("currentPage")) - 1;
            if(prevPage === 0){
                alert("You are on the first page");  
                var href = "http://api.bestbuy.com/v1/products(categoryPath.id=" + productId + ")?page=1&format=json&apiKey=" + api;
                showData(href);               
            }
            else {
                sessionStorage.setItem("currentPage", prevPage);
                var url = "http://api.bestbuy.com/v1/products(categoryPath.id=" + productId + ")?page=" + prevPage + "&format=json&apiKey=" + api;
                showData(url);                
            }
        } 
    });
         
    $(".row").on("click", "a", function(event){    
        var $linkClicked = $(event.target);    
        console.log("link clicked is  " + $linkClicked);
        if($linkClicked !== undefined || $linkClicked !== null){
            var $prodId = $linkClicked.data("id");
            console.log("prod id is " + $prodId);
            var $sku = $linkClicked.sku;
            sessionStorage.setItem("sku", $sku);
            sessionStorage.setItem("prodId", $prodId);
            this.href = "product-details.html";
        }    
    });
   function getUrl(){
        var api = apiKey || localStorage.getItem("BEST_BUY_API_KEY");
        //console.log("apiKey is : " + api);
        if(api !== null)
            return "http://api.bestbuy.com/v1/products(categoryPath.id=" + productId + ")?page=1&format=json&apiKey=" + api;
        else
            return "http://parkland-csc175.github.io/csc175data/bestbuy/products-list.json";
    }
function showData(url){
    $.get(url, function (result) {
        console.log(result);
        console.log("number  of pages is : " + result.totalPages);
        var numPages = result.totalPages;
        sessionStorage.setItem("totalPages", numPages);
        var $row = $(".row");
        var $table = $("<table></table>").addClass("table").addClass("table-striped").addClass("table-hover");
        $row.append($table);
        var $thead = $("<thead></thead>");
        $table.append($thead);
        var $trhead = $("<tr></tr>");
        $thead.append($trhead);
        var $th1 = $("<th></th>").text("Image");
        var $th2 = $("<th></th>").text("Name");
        var $th3 = $("<th></th>").text("Price");
        var $th4 = $("<th></th>");
        $trhead.append($th1);
        $trhead.append($th2);
        $trhead.append($th3);
        $trhead.append($th4);
        
        result.products.forEach(function (post) {
            console.log(post.thumbnailImage);
            var $tbody = $("<tbody></tbody>");
            $table.append($tbody);
            var $tr = $("<tr></tr>");
            var $img = $("<img>").attr("src", post.thumbnailImage);
            var $td2 = $("<td></td>").attr("id", "name").text(post.name);
            var $td3 = $("<td></td>").attr("id", "price").text(post.salePrice);
            var $a = $("<a></a>").attr("href", "#").attr("sku", post.sku).attr("data-id", post.productId).text("Click to view");
            $tr.append($img);
            $tr.append($td2);
            $tr.append($td3);
            $tr.append($a);
            $tbody.append($tr);
        });
    });
}
function goBack() {
    window.history.back();
}
});

