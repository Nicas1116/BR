var scoopObject;
var templateShopIceCream='<div class="row"><div class="col three"><p class="txtcenter">Scoop</p></div><div class="col seven"><p>Serving Size</p></div><br class="clear"/></div><div class="row"><div class="col three"><span class="productscoop_title">Single</span><img src="images/scoop_single.png"/></div><div class="col seven"><div class="pServing bottom" onclick="selectScoop(0)"><span class="productscoop_size">Junior Scoop</span><span class="productscoop_price">RM PRODUCT_SINGLE_JUNIOR</span><span class="productscoop_tick"><img src="images/shop_tick.png"/></span></div><div class="pServing top" onclick="selectScoop(1)"><span class="productscoop_size">Regular Scoop</span><span class="productscoop_price">RM PRODUCT_SINGLE_REGULAR</span><span class="productscoop_tick"><img src="images/shop_tick.png"/></span></div></div><br class="clear"/></div><div class="row"><div class="col three"><span class="productscoop_title">Double</span><img src="images/scoop_double.png"/></div><div class="col seven"><div class="pServing bottom" onclick="selectScoop(2)"><span class="productscoop_size">Junior Scoop</span><span class="productscoop_price">RM PRODUCT_DOUBLE_JUNIOR</span><span class="productscoop_tick"><img src="images/shop_tick.png"/></span></div><div class="pServing top" onclick="selectScoop(3)"><span class="productscoop_size">Regular Scoop</span><span class="productscoop_price">RM PRODUCT_DOUBLE_REGULAR</span><span class="productscoop_tick"><img src="images/shop_tick.png"/></span></div></div><br class="clear"/></div><div class="row"><div class="col three"><span class="productscoop_title">Triple</span><img src="images/scoop_triple.png"/></div><div class="col seven"><div class="pServing bottom" onclick="selectScoop(4)"><span class="productscoop_size">Junior Scoop</span><span class="productscoop_price">RM PRODUCT_TRIPLE_JUNIOR</span><span class="productscoop_tick"><img src="images/shop_tick.png"/></span></div><div class="pServing top" onclick="selectScoop(5)"><span class="productscoop_size">Regular Scoop</span><span class="productscoop_price">RM PRODUCT_TRIPLE_REGULAR</span><span class="productscoop_tick"><img src="images/shop_tick.png"/></span></div></div><br class="clear"/></div><div class="bottomline"></div>'
var productshopTemplate ='<div class="row formcontentshop PRODUCT_ISCAKE"><div class="col serv1"><div class="productdetail"><img src="PRODUCT_IMAGE" class="productphoto"/><span class="productname">PRODUCT_NAME<br/><span class="productprice">RM PRODUCT_PRICE</span><span><a href="javascript:viewCake(PRODUCT_ID);void(0);" class="product_viewdetail">View Details</a></span></span></div><a href="javascript:deleteFromCart(PRODUCT_ID);void(0);" class="cancelproduct"><img src="images/button_cancel.png"/></a></div><div class="col serv2"><input type="number" min="1" max="9" value="PRODUCT_QUANTITY" class="quantity" onchange="recountShopCart(PRODUCT_ID)"/></div><div class="col serv2"><p class="product_totalprice">RM PRODUCT_TOTALPRICE</p></div><br class="clear"/><div class="bottomline" style="left:54%;"></div><div class="bottomline" style="left:77%;"></div></div>'
var productshopRedeemTemplate ='<div class="row formcontentshop PRODUCT_ISCAKE"><div class="col serv1"><div class="productdetail"><img src="PRODUCT_IMAGE" class="productphoto"/><span class="productname">PRODUCT_NAME<br/><span class="productprice">PRODUCT_PRICE pt</span><span><a href="javascript:viewCake(PRODUCT_ID);void(0);" class="product_viewdetail">View Details</a></span></span></div></div><div class="col serv2"><input type="number" disabled="disabled" min="1" max="9" value="PRODUCT_QUANTITY" class="quantity" onchange="recountShopCart(PRODUCT_ID)"/></div><div class="col serv2"><p class="product_totalprice">PRODUCT_TOTALPRICE pt</p></div><br class="clear"/><div class="bottomline" style="left:54%;"></div><div class="bottomline" style="left:77%;"></div></div>'
var inventoryScoopTemplate ='<div class="myfreezer_item myfreezer_itemscoop PISUSER"><div class="row"><div class="col four"><img class="productimage" src="PPRODUCTIMAGE"/><p class="expiretext">Expires <span>PEXPIREDATE</span></p></div><div class="col six"><p class="product_text">PPRODCUTNAME</p><p class="product_pricec"><span class="product_price">PPRODUCTPRICE</span><span class="product_recieved">Received PRECIEVEDDATE</span></p><p class="product_oriuser">PORINAME</p><div class="voucherContainer">Voucher No. PPRODUCTODE</div><div class="fbuttoncontainer"><a href="javascript:sendGift(PRODUCTNOD);void(0);" class="pinkbg pinkborder giftbutton"><img src="images/button_sendasgift.png"/>Send As Gift</a><a class="bluebg blueborder shareubtton"><img src="images/button_share.png"/>Share</a></div></div><br class="clear"/><div class="bottomline"></div></div></div>'
var inventoryUsedScoopTemplate ='<div class="myfreezer_item myfreezer_itemscoop PISUSER"><div class="row"><div class="col four"><img class="productimage" src="PPRODUCTIMAGE" /><p class="expiretext">Expired<span></span></p><div class="usedtext"><p>PPUSEDTEXT</p></div></div><div class="col six"><p class="product_text">PPRODCUTNAME</p><p class="product_pricec"><span class="product_price">PPRODUCTPRICE</span><span class="product_recieved">Received PRECIEVEDDATE</span></p><p class="product_oriuser">PORINAME</p><div class="voucherContainer">Voucher No. PPRODUCTODE</div></div><br class="clear" /><div class="bottomline"></div></div></div>'
var inventoryCakeTemplate ='<div class="myfreezer_item myfreezer_itemcake PISUSER"><div class="row"><div class="col four"><img class="productimage" src="PPRODUCTIMAGE"/><p class="expiretext">Expires <span>PEXPIREDATE</span></p></div><div class="col six"><p class="product_text">PPRODCUTNAME</p><p class="product_pricec"><span class="product_price">PPRODUCTPRICE</span><span class="product_recieved">Received PRECIEVEDDATE</span></p><p class="product_oriuser">PORINAME</p><div class="voucherContainer">Voucher No. PPRODUCTODE</div><div class="cakeinfo"><div class="row"><div class="col five"><p class="caketitle">Serving Size</p></div><div class="col five"><p class="cakedesc">PSERVINGSIZE</p></div><br class="clear"/></div><div class="row"><div class="col five"><p class="caketitle">Cake Design</p></div><div class="col five"><p class="cakedesc">PCAKEDESIGN</p></div><br class="clear"/></div><div class="row"><div class="col five"><p class="caketitle">Ice Cream Flavor</p></div><div class="col five"><p class="cakedesc">PICECREAMFLAVOR</p></div><br class="clear"/></div><div class="row"><div class="col five"><p class="caketitle">Add-on</p></div><div class="col five"><p class="cakedesc">PADDON</p></div><br class="clear"/></div><div class="row"><div class="col five"><p class="caketitle">Message</p></div><div class="col five"><p class="cakedesc">PMESSAGE</p></div><br class="clear"/></div><div class="row"><div class="col five"><p class="caketitle">Pick up Outlet</p></div><div class="col five"><p class="cakedesc">PICKUPOUTLET</p></div><br class="clear"/></div><div class="row"><div class="col five"><p class="caketitle">Pick up Date</p></div><div class="col five"><p class="cakedesc">PICKUPDATE</p></div><br class="clear"/></div><div class="row"><div class="col five"><p class="caketitle">Pick up Time</p></div><div class="col five"><p class="cakedesc">PICKUPDTIME</p></div><br class="clear"/></div></div><div class="fbuttoncontainer"><a class="pinkbg pinkborder giftbutton"><img src="images/button_sendasgift.png"/>Send As Gift</a><a class="bluebg blueborder shareubtton"><img src="images/button_share.png"/>Share</a></div></div><br class="clear"/><div class="bottomline"></div><p class="tnctextd">*This is a non-refundable voucher, which cannot be cancelled or amended. In case of no-show, the selected -up outlet will only keep the cake for 3 more days.</p></div></div>'
var inventoryUsedCakeTemplate ='<div class="myfreezer_item myfreezer_itemcake PISUSER"><div class="row"><div class="col four"><img class="productimage" src="PPRODUCTIMAGE"/><p class="expiretext">Expired<span></span></p><div class="usedtext"><p>PPUSEDTEXT</p></div></div><div class="col six"><p class="product_text">PPRODCUTNAME</p><p class="product_pricec"><span class="product_price">PPRODUCTPRICE</span><span class="product_recieved">Received PRECIEVEDDATE</span></p><p class="product_oriuser">PORINAME</p><div class="voucherContainer">Voucher No. PPRODUCTODE</div><div class="cakeinfo"><div class="row"><div class="col five"><p class="caketitle">Serving Size</p></div><div class="col five"><p class="cakedesc">PSERVINGSIZE</p></div><br class="clear"/></div><div class="row"><div class="col five"><p class="caketitle">Cake Design</p></div><div class="col five"><p class="cakedesc">PCAKEDESIGN</p></div><br class="clear"/></div><div class="row"><div class="col five"><p class="caketitle">Ice Cream Flavor</p></div><div class="col five"><p class="cakedesc">PICECREAMFLAVOR</p></div><br class="clear"/></div><div class="row"><div class="col five"><p class="caketitle">Add-on</p></div><div class="col five"><p class="cakedesc">PADDON</p></div><br class="clear"/></div><div class="row"><div class="col five"><p class="caketitle">Message</p></div><div class="col five"><p class="cakedesc">PMESSAGE</p></div><br class="clear"/></div><div class="row"><div class="col five"><p class="caketitle">Pick up Outlet</p></div><div class="col five"><p class="cakedesc">PICKUPOUTLET</p></div><br class="clear"/></div><div class="row"><div class="col five"><p class="caketitle">Pick up Date</p></div><div class="col five"><p class="cakedesc">PICKUPDATE</p></div><br class="clear"/></div><div class="row"><div class="col five"><p class="caketitle">Pick up Time</p></div><div class="col five"><p class="cakedesc">PICKUPDTIME</p></div><br class="clear"/></div></div></div><br class="clear"/><div class="bottomline"></div><p class="tnctextd">*This is a non-refundable voucher, which cannot be cancelled or amended. In case of no-show, the selected -up outlet will only keep the cake for 3 more days.</p></div></div>'

$(function() {

    //populate our years select box
    for (i = new Date().getFullYear(); i > 1900; i--){
        $('.years').append($('<option />').val(i).html(i));
    }
	 $('.months').append($('<option />').val("01").html("January"));
	 $('.months').append($('<option />').val("02").html("February"));
	 $('.months').append($('<option />').val("03").html("March"));
	 $('.months').append($('<option />').val("04").html("April"));
	 $('.months').append($('<option />').val("05").html("May"));
	 $('.months').append($('<option />').val("06").html("June"));
	 $('.months').append($('<option />').val("07").html("July"));
	 $('.months').append($('<option />').val("08").html("August"));
	 $('.months').append($('<option />').val("09").html("September"));
	 $('.months').append($('<option />').val("10").html("October"));
	 $('.months').append($('<option />').val("11").html("November"));
	 $('.months').append($('<option />').val("12").html("December"));
    //populate our Days select box
    updateNumberOfDays(); 

    //"listen" for change events
    $('.years, .months').change(function(){
        updateNumberOfDays(); 
    });

});

//function to update the days based on the current values of month and year
function updateNumberOfDays(){
    $('.days').html('');
    month = $('.months').val();
    year = $('.years').val();
    days = daysInMonth(month, year);

    for(i=1; i < days+1 ; i++){
		itext=i;
		if(itext<10)
		{itext="0"+itext}
            $('.days').append($('<option />').val(itext).html(i));
    }
}

//helper function
function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}
//===START VERIFICATION==================================================================
function validateIsAlphabet(param){
	var val = $("#"+param).val();
	var reg = /^[A-Za-z\s]+$/;
	if(reg.test(val)){
		return true;
	}else{
		var paramlabel = param+"_label";
		$(location).attr("href", "#"+paramlabel);
		$("#"+param).select();
		return false;
	}
}//end function
function validateIsNumber(param){
	var val = $("#"+param).val();
	var reg = /^[0-9]+$/;
	if(reg.test(val)){
		return true;
	}else{
		var paramlabel = param+"_label";
		$(location).attr("href", "#"+paramlabel);
		$("#"+param).focus();
		return false;
	}
}//end function
function validateIsEmail(param){
	var oval = param.val();
	var val = param.val();
	val = $.trim(val);
	val = val.toLowerCase();
	var reg = /^[a-z0-9]+(?:[\.\-\_]{0,1}[a-z0-9]+[\.\-\_]{0,1})?[a-z0-9]+[\.\-\_]{0,1}@(?:[a-z0-9-]+\.)+[a-z]{2,6}$/;
	if(reg.test(val)){
		return true;
	}else{
		param.focus();
		return false;
	}
}//end function
function validateIsNotEmpty(param){
	var val = param.val();
	if(val != ""){
		return true;
	}else{
		param.focus();
		return false;
	}
}//end function
function validateIsRadioChecked(param){
	var checker = 0;
	$("input[name = '"+param+"']").each(function(){
		if($(this).attr('checked')){
			checker = 1;	
		}
	});
	if(checker == 1){
		return true;	
	}else{
		var paramlabel = param+"_label";
		$(location).attr("href", "#"+paramlabel);
		$("input[name = '"+param+"']").focus();	
		return false;	
	}
}//end function
function validateIsCheckboxChecked(param){
	var checker = 0;
	if(param.is(':checked')){
			checker = 1;	
	}
	if(checker == 1){
		return true;	
	}else{
		param.focus();	
		return false;	
	}
}//end function
//===END VERIFICATION=======================================================================

var  mapobjects 
function getOutlets(){
	 $.ajax({
        method: "POST",
        url: baselink+"phps/get_stores.php"
    }).done(function(msg) {
		mapobjects = JSON.parse(msg);
		console.log(mapobjects);
		var outletHtml="<option value=''>Select Outlets</option>";
		 mapobjects_outlets = mapobjects.outlets;
		for (var i = 0; i < mapobjects_outlets.length; i++) {
            var theStates = mapobjects_outlets[i].outlets_name;
			outletHtml+=("<option value='" + mapobjects_outlets[i].outlets_id + "'>" + theStates + "</option>")
        }
		$(".shopping_outlets").html(outletHtml);
	});
}
var sizeselectno;
function getProductScoop(){
	$.ajax({
        method: "POST",
        url: baselink+"phps/get_scoops.php",
    }).done(function(msg) {
		scoopObject = JSON.parse(msg);
		console.log(scoopObject)
		templateShopIceCream = templateShopIceCream.replace("PRODUCT_SINGLE_JUNIOR",scoopObject[0].scoop_price)
		templateShopIceCream = templateShopIceCream.replace("PRODUCT_SINGLE_REGULAR",scoopObject[1].scoop_price)
		templateShopIceCream = templateShopIceCream.replace("PRODUCT_DOUBLE_JUNIOR",scoopObject[2].scoop_price)
		templateShopIceCream = templateShopIceCream.replace("PRODUCT_DOUBLE_REGULAR",scoopObject[3].scoop_price)
		templateShopIceCream = templateShopIceCream.replace("PRODUCT_TRIPLE_JUNIOR",scoopObject[4].scoop_price)
		templateShopIceCream = templateShopIceCream.replace("PRODUCT_TRIPLE_REGULAR",scoopObject[5].scoop_price)
		$("#chooseicecream .bcontent_content").html(templateShopIceCream);
	});
}
var productPrice
function getProductPrice(){
	$.ajax({
        method: "POST",
        url: baselink+"phps/get_prices.php",
    }).done(function(msg) {
		productPrice = JSON.parse(msg);
	});
}
var sizeselectno;
var sizeText= ["6 Inch","9 Inch","Special Size"]
function buildProductServeSize(){
	/*var txtHtml = '<div class="sky-carousel-wrapper"><ul class="sky-carousel-container">';
	for(var m = 0 ;m<productsobj["products_beverages"] .length;m++){
		txtHtml += '<li><div><img src="images/products/beverages/'+productsobj["products_beverages"][m].productimg+'"/></div></li>'
	}
	txtHtml+='</ul></div>';
	$("#sizeproduct").html(txtHtml);*/
	sizeproductcarousel = $("#sizeproduct.sky-carousel").carousel({
		itemWidth: 190,
		itemHeight: 190,
		distance: 5,
		selectedItemDistance: 60,
		selectedItemZoomFactor: 1,
		unselectedItemZoomFactor: 0.65,
		unselectedItemAlpha: 0.8,
		motionStartDistance: 210,
		topMargin: 125,
		gradientStartPoint: 0.0,
		gradientEndPoint: 0.0,
		gradientOverlayColor: "#fff",
		gradientOverlaySize: 190,
		selectByClick: true,
		enableMouseWheel:false,
		loop:true
	});

	sizeproductcarousel.on('selectionAnimationEnd.sc', function(evt) {
		if($("#choosecake").css("display")=="block"){
			cakeSizeCart=evt.item.index();
			if(evt.item.index()==0){
				$(".cservesize a.Shop_ChooseItem img").attr("src","images/size_6.png")
			}else if(evt.item.index()==1){
				$(".cservesize a.Shop_ChooseItem img").attr("src","images/size_9.png")
			}else if(evt.item.index()==2){
				$(".cservesize a.Shop_ChooseItem img").attr("src","images/size_special.png")
			}
			var result =  $.grep(productPrice, function(e){ return (e.cakedesign == cakeDesignCart+1 && e.cakesize==cakeSizeCart+1); });
			if(result.length>=1){
				$(".ccakedesign a.Shop_ChooseItem span").html(productsobj["products_cake"][cakeselectno].title+"<br/>RM "+parseFloat(result[0].cakeprice).toFixed(2))
			}
		}else{
			
		}
	});
	
}
var beverageelectno
function buildProductBeverage(){
	var txtHtml = '<div class="sky-carousel-wrapper"><ul class="sky-carousel-container">';
	for(var m = 0 ;m<productsobj["products_beverages"] .length;m++){
		txtHtml += '<li><div><img src="images/products/beverages/'+productsobj["products_beverages"][m].productimg+'"/></div></li>'
	}
	txtHtml+='</ul></div>';
	$("#beverageproduct").html(txtHtml);
	beverageproductcarousel = $("#beverageproduct.sky-carousel").carousel({
		itemWidth: 190,
		itemHeight: 190,
		distance: 5,
		selectedItemDistance: 60,
		selectedItemZoomFactor: 1,
		unselectedItemZoomFactor: 0.65,
		unselectedItemAlpha: 0.8,
		motionStartDistance: 210,
		topMargin: 95,
		gradientStartPoint: 0.0,
		gradientEndPoint: 0.0,
		gradientOverlayColor: "#fff",
		gradientOverlaySize: 190,
		selectByClick: true,
		enableMouseWheel:false,
		loop:true
	});
	beverageproductcarousel.on('selectionAnimationEnd.sc', function(evt) {
		beverageelectno = evt.item.index();
		$(".product_content").fadeOut(function(){
			$(".product_content h1").html(productsobj["products_beverages"][beverageelectno].title);
			$(".product_content p").html(productsobj["products_beverages"][beverageelectno].description);
			$(".product_content").fadeIn();
		});
	});
	
}

var sundaeselectno;
function buildProductSundaes(){
	var txtHtml = '<div class="sky-carousel-wrapper"><ul class="sky-carousel-container">';
	for(var m = 0 ;m<productsobj["products_sundaes"] .length;m++){
		txtHtml += '<li><div><img src="images/products/sundaes/'+productsobj["products_sundaes"][m].productimg+'"/></div></li>'
	}
	txtHtml+='</ul></div>';
	$("#sundaesproduct").html(txtHtml);
	sundaesproductcarousel = $("#sundaesproduct.sky-carousel").carousel({
		itemWidth: 220,
		itemHeight: 220,
		distance: 5,
		selectedItemDistance: 60,
		selectedItemZoomFactor: 1,
		unselectedItemZoomFactor: 0.65,
		unselectedItemAlpha: 0.8,
		motionStartDistance: 210,
		topMargin: 95,
		gradientStartPoint: 0.0,
		gradientEndPoint: 0.0,
		gradientOverlayColor: "#fff",
		gradientOverlaySize: 190,
		selectByClick: true,
		enableMouseWheel:false
	});
	sundaesproductcarousel.on('selectionAnimationEnd.sc', function(evt) {
		sundaeselectno = evt.item.index();
		
		$(".product_content").fadeOut(function(){
			$(".product_content h1").html(productsobj["products_sundaes"][sundaeselectno].title);
			$(".product_content p").html(productsobj["products_sundaes"][sundaeselectno].description);
			$(".product_content").fadeIn();
		});
	});

}

var icecreamelectno;
function buildProductIceCream(){
	var txtHtml = '<div class="sky-carousel-wrapper"><ul class="sky-carousel-container">';
	for(var m = 0 ;m<productsobj["products_icecream"] .length;m++){
		txtHtml += '<li><div><img src="images/products/icecream/'+productsobj["products_icecream"][m].productimg+'"/></div></li>'
	}
	txtHtml+='</ul></div>';
	$("#flavoursproduct").html(txtHtml);
	flavoursproductcarousel = $("#flavoursproduct.sky-carousel").carousel({
		itemWidth: 190,
		itemHeight: 190,
		distance: 5,
		selectedItemDistance: 60,
		selectedItemZoomFactor: 1,
		unselectedItemZoomFactor: 0.65,
		unselectedItemAlpha: 0.8,
		motionStartDistance: 210,
		topMargin: 95,
		gradientStartPoint: 0.0,
		gradientEndPoint: 0.0,
		gradientOverlayColor: "#fff",
		gradientOverlaySize: 190,
		selectByClick: true,
		enableMouseWheel:false,
		loop:true
	});
	flavoursproductcarousel.on('selectionAnimationEnd.sc', function(evt) {
		icecreamelectno = evt.item.index();
		if($("#choosecake").css("display")=="block"){
			$(".cicf a.Shop_ChooseItem img").attr("src","images/products/icecream/"+productsobj["products_icecream"][icecreamelectno].productimg)
			$(".cicf .icecreamname").html(productsobj["products_icecream"][icecreamelectno].title)
			cakeIceCreamCart=icecreamelectno;
		}else{
			$(".product_content").fadeOut(function(){
				idescription = productsobj["products_icecream"][icecreamelectno].description.replace(/\\n/g, "");
				idescription = idescription.replace(/\\n/g, "");
				$(".product_content h1").html(productsobj["products_icecream"][icecreamelectno].title);
				$(".product_content p").html(idescription);
				$(".product_content").fadeIn();
			});
		}
	});

}




var cakeselectno;
function buildProductCake(){
	var txtHtml = '<div class="sky-carousel-wrapper"><ul class="sky-carousel-container">';
	for(var m = 0 ;m<productsobj["products_cake"] .length;m++){
		txtHtml += '<li><div><img src="images/products/cakes/'+productsobj["products_cake"][m].productimg+'"/></div></li>'
	}
	txtHtml+='</ul></div>';
	$("#cakesproduct").html(txtHtml);
	cakesproductcarousel = $("#cakesproduct.sky-carousel").carousel({
		itemWidth: 190,
		itemHeight: 190,
		distance: 5,
		selectedItemDistance: 60,
		selectedItemZoomFactor: 1,
		unselectedItemZoomFactor: 0.65,
		unselectedItemAlpha: 0.8,
		motionStartDistance: 210,
		topMargin: 95,
		gradientStartPoint: 0.0,
		gradientEndPoint: 0.0,
		gradientOverlayColor: "#fff",
		gradientOverlaySize: 190,
		selectByClick: true,
		enableMouseWheel:false,
		loop:true
	});
	cakesproductcarousel.on('selectionAnimationEnd.sc', function(evt) {
		cakeselectno = evt.item.index();
		if($("#choosecake").css("display")=="block"){
			
			cakeDesignCart=cakeselectno;
			$(".ccakedesign a.Shop_ChooseItem img").attr("src","images/products/cakes/"+productsobj["products_cake"][cakeselectno].productimg)
			var result = $.grep(productPrice, function(e){ return (e.cakedesign == cakeDesignCart+1 && e.cakesize==cakeSizeCart+1); });
			if(result.length>=1){
				$(".ccakedesign a.Shop_ChooseItem span").html(productsobj["products_cake"][cakeselectno].title+"<br/>RM "+parseFloat(result[0].cakeprice).toFixed(2))
			}else{
				$(".ccakedesign a.Shop_ChooseItem span").html(productsobj["products_cake"][cakeselectno].title)
			}
		}else{
			$(".product_content").fadeOut(function(){
				$(".product_content h1").html(productsobj["products_cake"][cakeselectno].title);
				$(".product_content p").html(productsobj["products_cake"][cakeselectno].description);
				$(".product_content").fadeIn();
			});
		}
	});
}




/*SHARING*/
function shareNews(){
	FB.ui({
	  method: 'feed',
	  link: 'http://kraftmob.com/BaskinRobbins/',
	  name: 'Flavor of the month - Caramel Chocolate Crunch 1',
	  caption: "Baskin Robbins",
	  picture: 'http://kraftmob.com/BaskinRobbins/images/newsfeed1.jpg',
	  description :'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in dui ornare, efficitur felis ac, iaculis tortor morbi sollicitudin ex leo, id eleifend eros adipiscing elit vestibulum ti.'
	}, function(response){
		if(response.post_id){
			$.ajax({
				method: "POST",
				url: baselink+"phps/user_addsharereward.php",
				data: {
					user_session: current_usersession
				}
			}).done(function(msg) {
				var obj = JSON.parse(msg);
				shopRedeemCart = [];
				if (obj.error_no) {
					openPage("Register");
				} else {
					issharefb=true;
					checkUserSession();
				}
			});
		}
	});
}

function shareHome(pNo){
	FB.ui({
	  method: 'feed',
	  link: 'http://kraftmob.com/BaskinRobbins/',
	  name: 'Baskin Robbins',
	  caption: "Baskin Robbins",
	  picture: 'http://kraftmob.com/BaskinRobbins/images/Home'+pNo+'.jpg',
	  description :'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in dui ornare, efficitur felis ac, iaculis tortor morbi sollicitudin ex leo, id eleifend eros adipiscing elit vestibulum ti.'
	}, function(response){
		if(response.post_id){
			$.ajax({
				method: "POST",
				url: "phps/user_addsharereward.php",
				data: {
					user_session: current_usersession
				}
			}).done(function(msg) {
				var obj = JSON.parse(msg);
				shopRedeemCart = [];
				if (obj.error_no) {
					openPage("Register");
				} else {
					issharefb=true;
					checkUserSession();
				}
			});
		}
	});
}
function shareProduct(){
	var currrentProduct;
	switch(currrentProductSection){
		case "Cakes":
			currrentProduct =productsobj["products_cake"][cakeselectno];
			productimagepath = "images/products/cakes/";
            break;
        case "Beverages":
			currrentProduct =productsobj["products_beverages"][beverageelectno];
			productimagepath = "images/products/beverages/";
            break;
        case "Flavours":
			currrentProduct =productsobj["products_icecream"][icecreamelectno];
			productimagepath = "images/products/icecream/";
            break;
        case "Sundaes":
			currrentProduct =productsobj["products_sundaes"][sundaeselectno];
			productimagepath = "images/products/sundaes/";
            break;
	}
	
	/*FB.ui({
	  method: 'feed',
	  link: 'http://kraftmob.com/BaskinRobbins/',
	  name: currrentProduct.title,
	  caption: "Baskin Robbins",
	  picture: 'http://kraftmob.com/BaskinRobbins/'+productimagepath+currrentProduct.productimg,
	  description : currrentProduct.description
	}, function(response){
		if(response.post_id){
			$.ajax({
				method: "POST",
				url: baselink+"phps/user_addsharereward.php",
				data: {
					user_session: current_usersession
				}
			}).done(function(msg) {
				var obj = JSON.parse(msg);
				shopRedeemCart = [];
				if (obj.error_no) {
					openPage("Register");
				} else {
					issharefb=true;
					checkUserSession();
				}
			});
		}
	});*/
	facebookConnectPlugin.showDialog({
	  method: 'feed',
	  link: 'http://kraftmob.com/BaskinRobbins/',
	  name: currrentProduct.title,
	  caption: "Baskin Robbins",
	  picture: 'http://kraftmob.com/BaskinRobbins/'+productimagepath+currrentProduct.productimg,
	  description : currrentProduct.description
	},  function(response){
		if(response.post_id){
			$.ajax({
				method: "POST",
				url: baselink+"phps/user_addsharereward.php",
				data: {
					user_session: current_usersession
				}
			}).done(function(msg) {
				var obj = JSON.parse(msg);
				shopRedeemCart = [];
				if (obj.error_no) {
					openPage("Register");
				} else {
					issharefb=true;
					checkUserSession();
				}
			});
		}
	}, function(){
	})
}
/*REDEEM REWARD*/
var currentRewardSelect=-1;
function openPinkPointReward(pReward) {
	currentRewardSelect=pReward;
	$(".mypinkpoints_reward_container").html('<p class="mypinkpoints_reward_title">'+pointrewards[currentRewardSelect].pointsreward_title+'</p><div class="reward_container"><div class="reward_container_images" style="background-image:url('+pointrewards[currentRewardSelect].pointsreward_bigimage+')"></div><div class="reward_container_description"><p class="mypinkpoints_reward_subtitle">'+pointrewards[currentRewardSelect].pointsreward_subtitle+'</p><p class="mypinkpoints_reward_desc">'+pointrewards[currentRewardSelect].pointsreward_description+'</p></div></div>')
    $(".page").hide()
    $(".page_mypinkpoints_reward").show();
}

var shopRedeemCart=[];
var pointCharged;
var pointAvaiable
var pointRemain;
function proceedRedeem() {
	if(currentuser.user_points>parseFloat(pointrewards[currentRewardSelect].pointsreward_pointamount)){
		$(".page").hide();
		$(".page_goshoppingpoints").show();
		
		shopRedeemCart=[];
		var ob = new Object()
		ob.productId =  pointrewards[currentRewardSelect].pointsreward_productid;
		ob.productname = pointrewards[currentRewardSelect].pointsreward_productname;
		ob.productprice = parseFloat(pointrewards[currentRewardSelect].pointsreward_pointamount);
		ob.productquantity = 1;
		ob.productimage =  pointrewards[currentRewardSelect].pointsreward_productimage;
		ob.iscake = 0;
		shopRedeemCart.push(ob);
		displayRedeemShopCart()
	}
}


function displayRedeemShopCart() {
    var shopHtml = "";
    var totalPrice = 0;
    for (var m = 0; m < shopRedeemCart.length; m++) {
        var dt = productshopRedeemTemplate;
        dt = dt.replace("PRODUCT_ID", m);
        dt = dt.replace("PRODUCT_ID", m);
        dt = dt.replace("PRODUCT_ID", m);
        dt = dt.replace("PRODUCT_IMAGE", shopRedeemCart[m].productimage);
        dt = dt.replace("PRODUCT_PRICE", shopRedeemCart[m].productprice);
        dt = dt.replace("PRODUCT_NAME", shopRedeemCart[m].productname);
        dt = dt.replace("PRODUCT_QUANTITY", shopRedeemCart[m].productquantity);
        var currentQPrice = parseInt(shopRedeemCart[m].productquantity) * parseFloat(shopRedeemCart[m].productprice)
        dt = dt.replace("PRODUCT_TOTALPRICE", currentQPrice);
        totalPrice += currentQPrice
        if (shopRedeemCart[m].iscake == 0) {
            dt = dt.replace("PRODUCT_ISCAKE", "isicecream");
        } else {
            dt = dt.replace("PRODUCT_ISCAKE", "");
        }
        shopHtml += dt;
    }
	
	$(".balancecharged").html(totalPrice.toLocaleString()+" pt");
	$(".balanceavail").html(parseFloat(currentuser.user_points).toLocaleString()+" pt");
	var balanceafter = parseFloat(currentuser.user_points) - totalPrice;
	
	pointCharged=totalPrice;
	pointAvaiable=currentuser.user_points;
	pointRemain=balanceafter;
	
	$(".balanceafter").html(balanceafter.toLocaleString()+" pt");
    $(".page_goshoppingpoints .shopdetail").html(shopHtml);
    $(".page_goshoppingpoints .grandtotal").html(totalPrice +" pt")
	
}

function checkOutRedeem() {
    $.ajax({
        method: "POST",
        url: baselink+"phps/user_addinvoices.php",
        data: {
            user_session: current_usersession,
            shopcart: JSON.stringify(shopRedeemCart)
        }
    }).done(function(msg) {
        var obj = JSON.parse(msg);
        shopRedeemCart = [];
        if (obj.error_no) {
            openPage("Register");
        } else {
            current_invoiceid = obj.invoiceid;
            openPaymentPointPage();

        }
    });
}

function openPaymentPointPage() {
    $("#header_navigation").show();
    $("#content").show();
    $("#content_main").hide();
    $(".page").hide();
    currentMainPage = "Go Shopping"
    $("#content").css("background", "#f3f3f3")
    $(".buttonimage_shopping").parent().addClass("footer_active");
    $(".page_paymentpoints").show();
    currentSecoPage = "PAYMENT GATEWAY";
    updateHeaderNavigation();
}


/*INVENTORY*/

function getUserInventory() {
    $.ajax({
        method: "POST",
        url: baselink+"phps/get_userinventory.php",
        data: {
            user_session: current_usersession,
            user_state: $(".inventory_selection").val()
        }
    }).done(function(msg) {
        var obj = JSON.parse(msg);
        console.log(obj);
        if (obj.error_no) {
            openPage("Register");
        } else {
            currentuserinventory = obj.userinventory;
            localStorage.current_usersession = current_usersession;
            var invenHtml = "";
            var tTemplate = "";
            console.log(currentuserinventory.length)
            for (var m = 0; m < currentuserinventory.length; m++) {
                console.log(m)
                console.log(currentuserinventory[m])
                if (currentuserinventory[m].productscoop_text) {
					if($(".inventory_selection").val()==1){
						tTemplate = inventoryScoopTemplate;
                  	}else if($(".inventory_selection").val()==2){
						tTemplate = inventoryUsedScoopTemplate
					}
						tTemplate = tTemplate.replace("PPRODCUTNAME", currentuserinventory[m].productscoop_text)
						tTemplate = tTemplate.replace("PPRODUCTIMAGE", "images/" + currentuserinventory[m].productscoop_img)					
					
                } else {
					if($(".inventory_selection").val()==1){
						tTemplate = inventoryCakeTemplate;
					}else if($(".inventory_selection").val()==2){
						tTemplate = inventoryUsedCakeTemplate;
					}
                    tTemplate = tTemplate.replace("PPRODCUTNAME", currentuserinventory[m].cakeDesignName)
                    tTemplate = tTemplate.replace("PPRODUCTIMAGE", "images/products/cakes/" + currentuserinventory[m].cakeDesignImage)
                    tTemplate = tTemplate.replace("PSERVINGSIZE", currentuserinventory[m].cakeSizeName)
                    tTemplate = tTemplate.replace("PCAKEDESIGN", currentuserinventory[m].cakeDesignName)
                    tTemplate = tTemplate.replace("PICECREAMFLAVOR", currentuserinventory[m].iceCreamFlavour)
                    tTemplate = tTemplate.replace("PADDON", "")
                    tTemplate = tTemplate.replace("PMESSAGE", currentuserinventory[m].cakeMessage)
                    tTemplate = tTemplate.replace("PICKUPOUTLET", currentuserinventory[m].outlets_name)
                    tTemplate = tTemplate.replace("PICKUPDATE", currentuserinventory[m].pickUpDate)
                    tTemplate = tTemplate.replace("PICKUPDTIME", currentuserinventory[m].pickUpTime)
                    tTemplate = tTemplate.replace("PMESSAGE", currentuserinventory[m].pickUpTime)
                }
                tTemplate = tTemplate.replace("PRODUCTNOD", m)
                tTemplate = tTemplate.replace("PEXPIREDATE", currentuserinventory[m].date_expired)
                tTemplate = tTemplate.replace("PPRODUCTODE", currentuserinventory[m].transactionCode)
                tTemplate = tTemplate.replace("PRECIEVEDDATE", currentuserinventory[m].date_recieved)
				if(currentuserinventory[m].invoices_paymenttype == 1){
					tTemplate = tTemplate.replace("PPRODUCTPRICE", parseFloat(currentuserinventory[m].transaction_price)+" pt")
				}else{
					tTemplate = tTemplate.replace("PPRODUCTPRICE", "RM "+parseFloat(currentuserinventory[m].transaction_price).toFixed(2))
				}
                var oriusername = currentuserinventory[m].ori_firstname + " " + currentuserinventory[m].ori_lastname;
                var username = currentuserinventory[m].firstname + " " + currentuserinventory[m].lastname;
				if($(".inventory_selection").val()==2){
					tTemplate = tTemplate.replace("PORINAME", "Forwarded to "+username)

					
				}else if($(".inventory_selection").val()==1){
					tTemplate = tTemplate.replace("PORINAME", "From "+oriusername)
				}
				
                if (oriusername == username) {
                    tTemplate = tTemplate.replace("PISUSER", "")
					tTemplate = tTemplate.replace("PPUSEDTEXT", "Used")
					
                } else {
                    tTemplate = tTemplate.replace("PISUSER", "isuseritem")
					tTemplate = tTemplate.replace("PPUSEDTEXT", "Forwarded")

                }
                invenHtml += tTemplate;
            }
            $(".page_myfreezer").html(invenHtml)
			$(".button_backnavigation").hide();
			$(".inventory_selection").show();
        }
    });
}
function closeSendGift(){
	$("#blackcontentoverlay").hide();
	$(".blackcontentoverlay_content").hide();
}
var isoktosend;
function sendGift(pNo){
	currentItemToSend = currentuserinventory[pNo];
	if(currentItemToSend){
		$(".giftproduct_image").attr("src","images/"+currentItemToSend.productscoop_img)
		$(".giftproduct_name").html(currentItemToSend.productscoop_text)
		if(currentItemToSend.invoices_paymenttype==1){
			$(".giftproduct_price").html(currentItemToSend.transaction_price +" pt");
		}else{
			$(".giftproduct_price").html("RM "+parseFloat(currentItemToSend.transaction_price).toFixed(2));
		}
		$(".inputgiftemailsender").val(currentuser.email)
	}
	$(".inputgiftemailmessage").val("").html("")
	$("#blackcontentoverlay").show();
	$(".blackcontentoverlay_content").hide();
	isoktosend=false;
	$("#sendgiftdetail").show();
	
}

function sendingGift(){
	if(isoktosend){
		$.ajax({
			method: "POST",
			url: baselink+"phps/user_sendgift.php",
			data: {
				user_session: current_usersession,
				inventory_id:currentItemToSend.transactionCode,
				user_email: $(".inputgiftemailreciever").val(),
				user_message: $(".inputgiftemailmessage").val()
			}
		}).done(function(msg) {
			var obj = JSON.parse(msg);
			if (obj.error_no) {
				
			} else {
				$("#blackcontentoverlay").hide();
				$(".blackcontentoverlay_content").hide();
				getUserInventory();
			}
		});
	}
}