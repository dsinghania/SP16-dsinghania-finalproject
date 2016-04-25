$(document).ready(function(){
    
    var apiKey = "null";  
    
    $("#btn-apikey").click(function(){
        apiKey = prompt("Please Enter your API Key");
        localStorage.setItem("BEST_BUY_API_KEY", apiKey);
    });
    
    var page1 =  "https://api.bestbuy.com/v1/categories(id=pcmcat209400050001|id=abcat0501000|id=abcat0401000"+
                "|id=pcmcat242800050021|id=abcat0204000|id=pcmcat241600050001|id=pcmcat254000050002|id=pcmcat209000050006" +
                "|id=abcat0502000|id=pcmcat232900050000|id=pcmcat295700050012|id=pcmcat310200050004|id=pcmcat243400050029" + 
                "|id=abcat0904000|id=abcat0901000|id=abcat0912000|id=abcat0101000|id=abcat0910000|id=pcmcat273800050036)" +
                "?show=all&page=1&format=json";  
    
    var page2 = "https://api.bestbuy.com/v1/categories(id=pcmcat209400050001|id=abcat0501000|id=abcat0401000"+
                "|id=pcmcat242800050021|id=abcat0204000|id=pcmcat241600050001|id=pcmcat254000050002|id=pcmcat209000050006" +
                "|id=abcat0502000|id=pcmcat232900050000|id=pcmcat295700050012|id=pcmcat310200050004|id=pcmcat243400050029|" + 
                "id=abcat0904000|id=abcat0901000|id=abcat0912000|id=abcat0101000|id=abcat0910000|id=pcmcat273800050036)" +
                "?show=all&page=2&format=json";    
                
     var $categoryId = $("#category");    
        
     var url = getUrl(page1);
     //var newUrl = getUrl(page2);
     console.log("url is " + url);
     addData(url);
     //addData(newUrl);
     
    $("#category").on("click", "a", function(event){    
        var $linkClicked = $(event.target);    
        console.log($linkClicked);
        var $dataId = $linkClicked.data("id");
        console.log($dataId);
        sessionStorage.setItem("dataId", $dataId);
        //this.href = "subCategories-list.html";
        this.href = "product-list.html"
    });
    
    function getUrl(page){
        var api = apiKey || localStorage.getItem("BEST_BUY_API_KEY");
        console.log("apiKey is : " + api);
        if(api !== "null")
            return page + "&apiKey=" + api;
        else
            return "https://parkland-csc175.github.io/csc175data/bestbuy/categories-list.json";
    }
    
    function addData(url){
        $.get(url, function(result){
            console.log(result);
            result.categories.forEach(function(post){
                console.log(post);             
                var $li = $("<li></li>");
                var $a = $("<a />").attr('href', "#").attr("data-id", post.id).text(post.name);
                $li.append($a);
                $categoryId.append($li); 
            });
        });
    }
});        