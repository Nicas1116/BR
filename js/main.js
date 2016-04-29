var currentuser_isfb = 0;
var currentuser;
var currentuserinventory;
var currentuserpoints;
var current_usersession;
var sundaesproductcarousel;
var flavoursproductcarousel;
var beverageproductcarousel;
var sizeproductcarousel;
var cakesproductcarousel;
var currentMainPage = "";
var currentSecoPage = "";
var baselink = "http://kraftmob.com/BaskinRobbins/";
var newsupdateslider
var mainpageslider;
var videocontent = "";
$(document).ready(function() {
	if (!window.cordova) {
		var appId = prompt("1638823863039406", "");
		facebookConnectPlugin.browserInit(appId);
	}
    window.scrollTo(0, 1);
    /*$("#mobileapp").css("transform-origin" ,"0% 0%");
	$("#mobileapp").width(638);
	$("#mobileapp").css("transform" ,"scale("+screen.width/640+")");
	$("#mobileapp").height(screen.height /(screen.width/640));
	*/
    var viewport = $('meta[name="viewport"]');
    var scaleno = screen.width / 640;
    $("#mobileapp").height($(window).height());
    viewport.attr("content", "width=640, initial-scale=" + scaleno + " minimum-scale=" + scaleno + " maximum-scale=" + scaleno + " user-scalable=no");
    $(".page_main,.homepage_template_container,.homepagebig_slider ").height($("#content_main").height() - 180);
    $(".page_storelocator ").height($("#content_main").height() - 228);
    $(".dailyreward_container").height($("#content_main").height() - 228);

    $(".blackcontentoverlay_fcontent").height($("#content_main").height());
    $(".newsupdate_slider ").height($("#content_main").height() - 170);
    $("div,a,ul").show();
    $(".page_whatnews").show();
    $(".newsupdate_slider").show();
    newsupdateslider = $(".newsupdate_slider .newsupdate_c").slick({
        dots: true,
        arrows: false
    });
    mainpageslider = $(".homepagebig_c").slick({
        dots: true,
        arrows: false
    });
    $(".slick-track").height($("#content_main").height() - 180);

    $("select").select2();
    $("#datepicker").datepicker();
    $("#datepicker").datepicker();
    $("#datepicker").datepicker("option", "dateFormat", "yy-mm-dd");
    $(".button_backnavigation").click(function() {
        if (currentSecoPage.length > 0) {
            switch (currentMainPage) {
                case "Whats News":
                    openPage("WhatNews");
                    break;
                case "Products":
                    openPage("Products");
                    break;
                case "MY ACCOUNT":
                    openPage("Profile");
                    break;
                case "Go Shopping":
                    openPage("Shopping");
                    break;
            }

        } else {
            openPage("Home");
        }
    });
    $("#content_main .home_close").click(function() {
        $(".homepagebig_slider ").hide();
        videocontent = $("#content_main .iframevideo").attr("src");
        $("#content_main .iframevideo").attr("src", "");
        setTimeout(function() {
            $("#content_main .iframevideo").attr("src", videocontent);
        });
    });
    $(".faq_q").find(".faq_close").hide();;
    $(".faq_q").click(function() {
        var ic = $(this).find(".internalcontent");
        if (ic.css("display") == "inline-block" || ic.css("display") == "block") {
            ic.slideUp();
            $(this).find(".faq_close").hide();;
        } else {
            ic.slideDown();
            $(this).find(".faq_close").show();;
        }

    });
    $($(".faq_q")[0]).click();
    getOutlets();
    getProducts();
    getProductPrice();
    getProductScoop();
    console.log(localStorage.shopCart);
    if (localStorage.shopCart == undefined) {
        shopCart = []
    } else {
        if (localStorage.shopCart.length > 0) {
            shopCart = JSON.parse(localStorage.shopCart);
        } else {
            shopCart = []
        }
    }
    //shopCart=[];
    current_usersession = localStorage.current_usersession;
    openLoading();
    $(".blackcontentoverlay").click(function() {
        $(".productselection_container").hide();
    });
	$(".inventory_selection").change(function(){
		getUserInventory();
	})
	$(".inputgiftemailreciever").change(function(){
		var useremail = $(".inputgiftemailreciever").val()
		if(useremail.length>0){
			$.ajax({
				method: "POST",
				url: baselink+"phps/user_checkemail.php",
				data: {
					user_session: current_usersession,
					user_email:useremail
				}
			}).done(function(msg) {
				var obj = JSON.parse(msg);
				if (obj.error_no) {
					$(".inputgiftemailreciever").addClass("haserror");
					$(".inputgiftemailreciever_error").html("No user found.")
					isoktosend=false;
				} else {
					$(".inputgiftemailreciever").removeClass("haserror");
					$(".inputgiftemailreciever_error").html("")
					isoktosend=true;
				}
			});
		}
	});
});
$(window).load(function() {
    checkUserSession()

})

function closeShopCake() {
    $("#blackcontentoverlay").fadeOut("fast");
}

function openShopCake() {
    cakeEditId = -1;
    $("#choosecake .bbutton_container a").html("Add to cart");
    $("#choosecake .bbutton_container a").attr("href", "javascript:cakeAddToCart();void(0);");
    $("#blackcontentoverlay").show();
    $(".blackcontentoverlay_content,.blackcontentoverlay_fcontent").hide();
    $("#choosecake").show();

}

function openShopIceCream() {
    $("#blackcontentoverlay").show();
    $(".blackcontentoverlay_content,.blackcontentoverlay_fcontent").hide();
    $("#chooseicecream").show();

}

function openLoading() {

    $("#contentoverlay").show();
    $(".page_register").hide();
    $(".page_loadingbar").show();
    $(".page_loading").hide();
}

function closeLoading() {

    $("#contentoverlay").hide();
    $(".page_register").hide();
    $(".page_loadingbar").hide();
    $(".page_loading").hide();
}

function openRegisterPage(pPageNo) {
    $(".button_container").hide();
    $(".button_container" + pPageNo).show();
}

function openNotification(pPageNo) {
    if ($("#contentnotification").css("display") == "block") {
        $("#contentnotification").hide()
    } else {
        $("#contentnotification").show()
    }
}

function openPage(pPageName) {
	$(".button_backnavigation").show();
    $(".contentoverlay").hide()
    $("#chooseicecream").hide()
    $("#blackcontentoverlay").hide()
    $(".productselection_container").hide()
    $("#choosecake").hide()
    $("#chooseicecream").hide()
    currentMainPage = pPageName;
    currentSecoPage = "";
    $("#content").css("background", "#fff")
    $(".footer_button").removeClass("footer_active");
    $("#header_navigation").hide();
    $("#content").hide();
    $("#contentnotification").hide();
    $(".storelocatoriframe").attr("src", "")
    $(".header_buttonimagenormal").removeClass("cover");
    switch (pPageName) {
        case "Register":
            $("#header_navigation").hide();
            $("#content").hide();
            $("#content_main").hide();
            $("#contentoverlay").show();
            $(".page").hide();
            $(".page_register").show();
            openRegisterPage(1);
            break;
        case "AfterRegister":
            $("#header_navigation").hide();
            $("#content").hide();
            $("#content_main").hide();
            $("#contentoverlay").show();
            $(".page").hide();
            $(".page_register").show();
            openRegisterPage(8);
            break;
        case "RegisterUser":
            $("#header_navigation").hide();
            $("#content").hide();
            $("#content_main").hide();
            $("#contentoverlay").show();
            $(".page").hide();
            $(".page_registeruser").show();
            break;
        case "Home":
            $("#header_navigation").hide();
            $("#content").hide();
            $("#content_main").show();
            $(".homepagebig_slider ").hide();
            $(".page_main").show();
            $(".buttonimage_home").parent().addClass("footer_active");
            pageMainFunction();
            break;
        case "Shopping":
            $("#header_navigation").show();
            $("#content").show();
            $("#content_main").hide();
            $(".page").hide();
            $(".page_goshopping").show();
            currentMainPage = "Go Shopping"
            $("#content").css("background", "#f3f3f3")
            $(".buttonimage_shopping").parent().addClass("footer_active");
            displayShopCart();
            break;
        case "DailyReward":
            $("#header_navigation").show();
            $("#content").show();
            $("#content_main").hide();
            $(".page").hide();
            $(".page_dailyreward").show();
            currentMainPage = "Daily Reward"
            $("#content").css("background", "#FFF")
			$(".dailyreward_landing").show();
			$(".dailyreward_collected").hide();
            $(".buttonimage_dailyreward").parent().addClass("cover");
            break;
        case "Profile":
            $("#header_navigation").show();
            $("#content").show();
            $("#content_main").hide();
            $(".page").hide();
            $(".page_profile").show();
            currentMainPage = "MY ACCOUNT";
            $(".profileTop .userName").html("Hi, " + currentuser.firstname + " " + currentuser.lastname + "!")
            $(".profileInfo .profile_birthday").html(currentuser.birthday)
            $(".profileInfo .profile_contactno").html(currentuser.contactno)
            $(".profileInfo .profile_email").html(currentuser.email)
            $("#content").css("background", "#FFF")
            $(".buttonimage_profile").parent().addClass("cover");
            break;
        case "StoreLocator":
            $("#header_navigation").show();
            $("#content").show();
            $("#content_main").hide();
            $(".page").hide();
            $(".page_storelocator").show();
            currentMainPage = "Store Locator"
            $(".storelocatoriframe").attr("src", "googlemap.html")
            $("#content").css("background", "#FFF")
            $(".buttonimage_storelocator").parent().addClass("cover");
            break;
        case "Inventory":
            $("#header_navigation").show();
            $("#content").show();
            $("#content_main").hide();
            $(".page").hide();
            $(".page_myfreezer").show();
            currentMainPage = "My Freezer"
            $("#content").css("background", "#EBEBEB")
            $(".buttonimage_inventory").parent().addClass("footer_active");
            $(".page_myfreezer").html("");
            getUserInventory();
            break;
        case "Products":
            $("#header_navigation").show();
            $("#content").show();
            $("#content_main").hide();
            $(".page").hide();
            $(".product_container").hide();
            $(".productselection_container").hide();
            $(".page_products").show();
            $(".product_main_container").show()
            $(".productm").show();
            $(".buttonimage_product").parent().addClass("footer_active");
            break;
        case "WhatNews":
            $("#header_navigation").show();
            $("#content").show();
            $("#content_main").hide();
            $(".newsupdate_slider").hide();
            $(".page").hide();
            $(".page_whatnews").show();

            currentMainPage = "Whats News";
            $(".buttonimage_news").parent().addClass("footer_active");

            break;
    }
    TweenMax.from($("#content"), 0.35, {
        "top": "-100%",
        ease: Power1.easeInOut
    })
    updateHeaderNavigation();
}
var currentPaymentMethod;
var shopCart = [];
var currentIceCreamScoopNo = -1;

function selectScoop(pNo) {
    currentIceCreamScoopNo = pNo;
    $(".pServing .productscoop_tick").hide()
    $($(".pServing")[pNo]).find(".productscoop_tick").show()
}

function proceedPayment() {
    $.ajax({
        method: "POST",
        url: baselink+"phps/user_proceedpayment.php",
        data: {
            user_session: current_usersession,
            invoiceid: current_invoiceid,
            paymenttype: currentPaymentMethod
        }
    }).done(function(msg) {
        currentPaymentMethod;
        $("#header_navigation").show();
        $("#content").show();
        $("#content_main").hide();
        $(".page").hide();
        currentMainPage = "Go Shopping"
        $("#content").css("background", "#f3f3f3")
        $(".buttonimage_shopping").parent().addClass("footer_active");
        $(".page_afterpayment").show();
        currentSecoPage = "PAYMENT GATEWAY";
        updateHeaderNavigation();
		checkUserSession();
    });
}

function payBy(pId) {
    currentPaymentMethod = pId;
    switch (pId) {
        case 1:
            $("#header_navigation").show();
            $("#content").show();
            $("#content_main").hide();
            $(".page").hide();
            currentMainPage = "Go Shopping"
            $("#content").css("background", "#f3f3f3")
            $(".buttonimage_shopping").parent().addClass("footer_active");
            $(".page_paymentpoint").show();
            currentSecoPage = "PAYMENT GATEWAY";
            updateHeaderNavigation();
            $(".page_paymentpoint .pointcharge").html(parseFloat(pointCharged).toLocaleString())
            $(".page_paymentpoint .pointavaiable").html(parseFloat(pointAvaiable).toLocaleString())
            $(".page_paymentpoint .pointafter").html(parseFloat(pointRemain).toLocaleString())
            $(".page_paymentpoint .pointrefno").html("T"+current_invoiceid);
            break;
		 case 2:
		 case 3:
			$("#header_navigation").show();
            $("#content").show();
            $("#content_main").hide();
            $(".page").hide();
            currentMainPage = "Go Shopping"
            $("#content").css("background", "#f3f3f3")
            $(".buttonimage_shopping").parent().addClass("footer_active");
            $(".page_paymentpoint").show();
            currentSecoPage = "PAYMENT GATEWAY";
            updateHeaderNavigation();

			break;
    }
}

function openPaymentPage() {
    $("#header_navigation").show();
    $("#content").show();
    $("#content_main").hide();
    $(".page").hide();
    currentMainPage = "Go Shopping"
    $("#content").css("background", "#f3f3f3")
    $(".buttonimage_shopping").parent().addClass("footer_active");
    $(".page_payment").show();
    currentSecoPage = "PAYMENT GATEWAY";
    updateHeaderNavigation();
}

function checkShop() {
    $(".emptyCart").hide()
    $(".shopcart").hide()
    if (shopCart.length > 0) {
        $(".shopcart").show()
    } else {
        $(".emptyCart").show()
    }
}
var pointrewards;
function getUserPoints() {
    $.ajax({
        method: "POST",
        url: baselink+"phps/get_userpoints.php",
        data: {
            user_session: current_usersession
        }
    }).done(function(msg) {
        var obj = JSON.parse(msg);
        console.log(obj);
        if (obj.error_no) {
            openPage("Register");
        } else {
			var earned = obj.earn_points
			var expiry = obj.expired
			var redemption = obj.redemption
			var userpoints = obj.userpoints;
			pointrewards = obj.rewards;
			$(".pointtext .yourpoint ").html(userpoints+" ");
			$(".page_mypinkpoints").show();
            $(".page_mypinkpoints .pinkpoint_history_buttons").hide();
			
			var rewHtml='';
			for(var m =0;m<pointrewards.length;m++){
				rewHtml+= '<a href="javascript:openPinkPointReward('+m+');void(0);" class="pinkpoint_reward_container"><div class="pinkpoint_reward_image"><img src="'+pointrewards[m].pointsreward_smallimage+'"/></div><div class="pinkpoint_reward_description"><p class="reward_title">'+pointrewards[m].pointsreward_title+'</p><p class="reward_desc">'+pointrewards[m].pointsreward_subtitle+'</p></div><br class="clear"/></a>'
			}
			$(".pinkpoint_rewards").html(rewHtml);
			var expDateHtml =''
			var theWidth = (100-expiry.length*4)/expiry.length;
			for(var sd = 0; sd < expiry.length;sd++){
				var islastn=""
				if(sd+1 == expiry.length){
					islastn=" lastn"
				}
				expDateHtml += '<div class="pinkpoint_expiring_items'+islastn+'" style="width:'+theWidth+'%">'+expiry[sd].date_expired+'<span class="expiring_points">-'+expiry[sd].points+' pt</span></div>'
			
			}
			expDateHtml+='<br class="clear"}/>';
			$(".pinkpoint_expiring_container").html(expDateHtml);
			var currentSDDate="";
			var histDateHtml='<div class="pinkpoint_history_title">Points History</div><a class="history_plus"><img src="images/history_plus.png"/></a>';
			
			for(var sd = 0; sd < earned.length;sd++){
				var expand=""
				if(sd>2){
					expand=" isexpand";
				}
				if(currentSDDate != earned[sd].date_earned)
				{
					
					currentSDDate = earned[sd].date_earned
					histDateHtml += '<div class="pinkpoint_history_date'+expand+'">'+currentSDDate+'</div>'
				}
				histDateHtml+= '<div class="pinkpoint_history_date_content'+expand+'"><div class="pinkpoint_history_date_time">'+earned[sd].time_earned+'</div><div class="pinkpoint_history_date_title">'+earned[sd].userevents_text+'</div><div class="pinkpoint_history_date_points">'+earned[sd].points+' pt</div><br class="clear"/></div>'
			}
			$("#earned_history").html(histDateHtml);
			$("#earned_history .history_plus").click(function(){
				if($("#earned_history").hasClass("isopen")){
					$("#earned_history").removeClass("isopen")
					$("#earned_history .history_plus img").attr("src","images/history_plus.png")
				}else{
					$("#earned_history").addClass("isopen")
					$("#earned_history .history_plus img").attr("src","images/history_minus.png")
				}
			})
			var currentSDDate="";
			var histDateHtml='<div class="pinkpoint_history_title">Redemption History</div><a class="history_plus"><img src="images/history_plus.png"/></a>';
			for(var sd = 0; sd < redemption.length;sd++){
				var expand=""
				if(sd>1){
					expand=" isexpand";
				}
				histDateHtml+= '<div class="pinkpoint_history_date_content'+expand+'"><div class="pinkpoint_history_date_time">'+redemption[sd].date_earned+'</div><div class="pinkpoint_history_date_title">'+redemption[sd].userevents_text+'</div><div class="pinkpoint_history_date_points">'+redemption[sd].points+' pt</div><br class="clear"/></div>'
			}
			$("#redemption_history").html(histDateHtml);
			$("#redemption_history .history_plus").click(function(){
				if($("#redemption_history").hasClass("isopen")){
					$("#redemption_history").removeClass("isopen")
					$("#redemption_history .history_plus img").attr("src","images/history_plus.png")
				}else{
					$("#redemption_history").addClass("isopen")
					$("#redemption_history .history_plus img").attr("src","images/history_minus.png")
				}
			})
		}
	})
}


function checkOut() {
    $.ajax({
        method: "POST",
        url: baselink+"phps/user_addinvoices.php",
        data: {
            user_session: current_usersession,
            shopcart: JSON.stringify(shopCart)
        }
    }).done(function(msg) {
        var obj = JSON.parse(msg);
        shopCart = [];
        localStorage.shopCart = shopCart;
        localStorage.shopCart = shopCart;
        console.log(obj);
        if (obj.error_no) {
            openPage("Register");
        } else {
            current_invoiceid = obj.invoiceid;
            openPaymentPage();

        }
    });
}

function viewCake(pId) {

    var txtHtml = ""
    txtHtml += '<div class="vd_row"><div class="vd_title">Serving Size</div><div class="vd_detail">' + sizeText[shopCart[pId].cakeSizeCart] + '</div><br class="clear"/></div>';
    txtHtml += '<div class="vd_row"><div class="vd_title">Cake Design</div><div class="vd_detail">' + productsobj["products_cake"][shopCart[pId].cakeDesignCart].title + '</div><br class="clear"/></div>';
    txtHtml += '<div class="vd_row"><div class="vd_title">Ice Cream Flavour</div><div class="vd_detail">' + productsobj["products_icecream"][shopCart[pId].cakeIceCreamCart].title + '</div><br class="clear"/></div>';
    txtHtml += '<div class="vd_row"><div class="vd_title">Message</div><div class="vd_detail">' + shopCart[pId].cakeMessage + '</div><br class="clear"/></div>';
    txtHtml += '<div class="vd_row"><div class="vd_title">Pick Up Outlet</div><div class="vd_detail">' + shopCart[pId].cakeOutlet + '</div><br class="clear"/></div>';
    txtHtml += '<div class="vd_row"><div class="vd_title">Pick Up Date</div><div class="vd_detail">' + shopCart[pId].cakeDate + '</div><br class="clear"/></div>';
    txtHtml += '<div class="vd_row"><div class="vd_title">Pick Up Time</div><div class="vd_detail">' + shopCart[pId].cakeTime + '</div><br class="clear"/></div>';
    txtHtml += '<div class="vd_row"><div class="vd_title">Total Cost</div><div class="vd_detail vd_price">' + shopCart[pId].productprice + '</div><br class="clear"/></div>';
    $("#viewcakedetail .bcontent_content").html(txtHtml);
    $("#viewcakedetail .btn_edit").attr("href", "javascript:editCake(" + pId + ");void(0);");
    $(".blackcontentoverlay_content,.blackcontentoverlay_fcontent").hide();
    $("#viewcakedetail").show();
    $("#blackcontentoverlay").fadeIn();
}

function editCake(pId) {
    cakeEditId = pId;
    cakeSizeCart = shopCart[pId].cakeSizeCart;
    cakeDesignCart = shopCart[pId].cakeDesignCart;
    cakeIceCreamCart = shopCart[pId].cakeIceCreamCart;
    $(".cservesize .Shop_ChooseItem img").attr("src", "");
    if (cakeSizeCart == 0) {
        $(".cservesize a.Shop_ChooseItem img").attr("src", "images/size_6.png")
    } else if (cakeSizeCart == 1) {
        $(".cservesize a.Shop_ChooseItem img").attr("src", "images/size_9.png")
    } else if (cakeSizeCart == 2) {
        $(".cservesize a.Shop_ChooseItem img").attr("src", "images/size_special.png")
    }
    $(".cicf a.Shop_ChooseItem img").attr("src", "images/products/icecream/" + productsobj["products_icecream"][cakeIceCreamCart].productimg)
    $(".ccakedesign a.Shop_ChooseItem img").attr("src", "images/products/cakes/" + productsobj["products_cake"][cakeDesignCart].productimg)
    $("#choosecake .cmessageinput").val(shopCart[pId].cakeMessage)
    $("#choosecake .shopping_outlets").val(shopCart[pId].cakeOutlet)
    $("#choosecake #datepicker").val(shopCart[pId].cakeDate)
    $("#choosecake .pickup_time").val(shopCart[pId].cakeTime)
    var result = $.grep(productPrice, function(e) {
        return (e.cakedesign == cakeDesignCart + 1 && e.cakesize == cakeSizeCart + 1);
    });
    $(".ccakedesign a.Shop_ChooseItem span").html(productsobj["products_cake"][cakeDesignCart].title + "<br/>RM " + parseFloat(result[0].cakeprice).toFixed(2))
    $(".cicf .icecreamname").html(productsobj["products_icecream"][cakeIceCreamCart].title)
    $(".blackcontentoverlay_content,.blackcontentoverlay_fcontent").hide();
    $("#choosecake .bbutton_container a").html("Edit complete");
    $("#choosecake .bbutton_container a").attr("href", "javascript:editComplete(" + pId + ");void(0);");
    $("#choosecake").show();
    $("#blackcontentoverlay").fadeIn();
}



function editComplete(pId) {
    if (cakeSizeCart < 0) {
        alert("cakeSizeCart");
        return;
    }
    if (cakeDesignCart < 0) {
        alert("cakeDesignCart");
        return;
    }
    if (cakeIceCreamCart < 0) {
        alert("cakeIceCreamCart");
        return;
    }
    if ($("#choosecake .cmessageinput").val().length <= 0) {
        alert("cmessageinput");
        return;
    }
    if ($("#choosecake .shopping_outlets").val().length <= 0) {
        alert("shopping_outlets");
        return;
    }
    if ($("#choosecake #datepicker").val().length <= 0) {
        alert("datepicker");
        return;
    }
    if ($("#choosecake .pickup_time").val().length <= 0) {
        alert("pickup_time");
        return;
    }
    var result = $.grep(productPrice, function(e) {
        return (e.cakedesign == cakeDesignCart + 1 && e.cakesize == cakeSizeCart + 1);
    });

    shopCart[pId].productId = result[0].id;
    shopCart[pId].cakeOutlet = $("#choosecake .shopping_outlets").val();
    shopCart[pId].cakeDate = $("#choosecake #datepicker").val();
    shopCart[pId].cakeTime = $("#choosecake .pickup_time").val();
    shopCart[pId].cakeDesignCart = cakeDesignCart;
    shopCart[pId].cakeSizeCart = cakeSizeCart;
    shopCart[pId].cakeIceCreamCart = cakeIceCreamCart;
    shopCart[pId].cakeMessage = $("#choosecake .cmessageinput").val();;
    shopCart[pId].productname = productsobj["products_cake"][cakeDesignCart].title;
    if (result.length >= 1) {
        shopCart[pId].productprice = parseFloat(result[0].cakeprice).toFixed(2)
    }
    shopCart[pId].productquantity = 1;
    shopCart[pId].productimage = "images/products/cakes/" + productsobj["products_cake"][cakeDesignCart].productimg;
    shopCart[pId].iscake = 1;

    cakeSizeCart = 0;
    cakeDesignCart = 0;
    cakeIceCreamCart = 0;
    $("#choosecake .Shop_ChooseItem img").attr('src', 'images/Shop_ChooseItem.png')
    $("#choosecake .cmessageinput").val("")
    $("#choosecake .shopping_outlets").val("")
    $("#choosecake #datepicker").val("")
    $("#choosecake .pickup_time").val("")
    displayShopCart()
    closeShopCake();
}
var cakeEditId = -1;
var cakeSizeCart = -1;
var cakeDesignCart = -1;
var cakeIceCreamCart = -1;
var cakeMessage = -1;
var cakeOutlet = -1;
var cakeDate = -1;
var cakeTime = -1;

function cakeAddToCart() {
    if (cakeSizeCart < 0) {
        alert("cakeSizeCart");
        return;
    }
    if (cakeDesignCart < 0) {
        alert("cakeDesignCart");
        return;
    }
    if (cakeIceCreamCart < 0) {
        alert("cakeIceCreamCart");
        return;
    }
    if ($("#choosecake .cmessageinput").val().length <= 0) {
        alert("cmessageinput");
        return;
    }
    if ($("#choosecake .shopping_outlets").val().length <= 0) {
        alert("shopping_outlets");
        return;
    }
    if ($("#choosecake #datepicker").val().length <= 0) {
        alert("datepicker");
        return;
    }
    if ($("#choosecake .pickup_time").val().length <= 0) {
        alert("pickup_time");
        return;
    }
    var result = $.grep(productPrice, function(e) {
        return (e.cakedesign == cakeDesignCart + 1 && e.cakesize == cakeSizeCart + 1);
    });
    var ob = new Object()
    ob.productId = result[0].id;
    ob.cakeOutlet = $("#choosecake .shopping_outlets").val();
    ob.cakeDate = $("#choosecake #datepicker").val();
    ob.cakeTime = $("#choosecake .pickup_time").val();
    ob.cakeDesignCart = cakeDesignCart;
    ob.cakeSizeCart = cakeSizeCart;
    ob.cakeIceCreamCart = cakeIceCreamCart;
    ob.cakeMessage = $("#choosecake .cmessageinput").val();;
    ob.productname = productsobj["products_cake"][cakeDesignCart].title;
    if (result.length >= 1) {
        ob.productprice = parseFloat(result[0].cakeprice).toFixed(2)
    }
    ob.productquantity = 1;
    ob.productimage = "images/products/cakes/" + productsobj["products_cake"][cakeDesignCart].productimg;
    ob.iscake = 1;
    shopCart.push(ob)
    cakeSizeCart = 0;
    cakeDesignCart = 0;
    cakeIceCreamCart = 0;
    $("#choosecake .Shop_ChooseItem img").attr('src', 'images/Shop_ChooseItem.png')
    $("#choosecake .cmessageinput").val("")
    $("#choosecake .shopping_outlets").val("")
    $("#choosecake #datepicker").val("")
    $("#choosecake .pickup_time").val("")
    displayShopCart()
    closeShopCake();
}

function iceCreamAddToCart() {
    if (currentIceCreamScoopNo >= 0) {
        var ob = new Object();
        ob.productId = scoopObject[currentIceCreamScoopNo].id
        ob.productname = scoopObject[currentIceCreamScoopNo].scoop_type + " " + scoopObject[currentIceCreamScoopNo].scoop_name
        ob.productprice = scoopObject[currentIceCreamScoopNo].scoop_price
        ob.productquantity = 1;
        switch (scoopObject[currentIceCreamScoopNo].scoop_type) {
            case "Single":
                ob.productimage = "images/scoop_single.png";
                break;
            case "Double":
                ob.productimage = "images/scoop_double.png";
                break;
            case "Triple":
                ob.productimage = "images/scoop_triple.png";
                break;
        }
        ob.iscake = 0;
        shopCart.push(ob)
    }
    displayShopCart()
    closeShopCake();
}


function recountShopCart(pNo) {
    shopCart[pNo].productquantity = $($(".formcontentshop")[pNo]).find(".quantity").val();
    var totalPrice = 0;
    for (var m = 0; m < shopCart.length; m++) {
        var currentQPrice = parseInt(shopCart[m].productquantity) * parseFloat(shopCart[m].productprice)
        $($(".formcontentshop")[pNo]).find(".product_totalprice").html("RM " + currentQPrice.toFixed(2))
        totalPrice += currentQPrice;
    }
    $(".grandtotal").html("RM " + totalPrice.toFixed(2))
}

function deleteFromCart(pNo) {
    shopCart.splice(parseInt(pNo), 1);
    displayShopCart();
}

function displayShopCart() {
    var shopHtml = "";
    var totalPrice = 0;
    for (var m = 0; m < shopCart.length; m++) {
        var dt = productshopTemplate;
        dt = dt.replace("PRODUCT_ID", m);
        dt = dt.replace("PRODUCT_ID", m);
        dt = dt.replace("PRODUCT_ID", m);
        dt = dt.replace("PRODUCT_IMAGE", shopCart[m].productimage);
        dt = dt.replace("PRODUCT_PRICE", shopCart[m].productprice);
        dt = dt.replace("PRODUCT_NAME", shopCart[m].productname);
        dt = dt.replace("PRODUCT_QUANTITY", shopCart[m].productquantity);
        var currentQPrice = parseInt(shopCart[m].productquantity) * parseFloat(shopCart[m].productprice)
        dt = dt.replace("PRODUCT_TOTALPRICE", currentQPrice.toFixed(2));
        totalPrice += currentQPrice
        if (shopCart[m].iscake == 0) {
            dt = dt.replace("PRODUCT_ISCAKE", "isicecream");
        } else {
            dt = dt.replace("PRODUCT_ISCAKE", "");
        }
        shopHtml += dt;
    }

    $(".page_goshopping .shopdetail").html(shopHtml);
    $(".page_goshopping .grandtotal").html("RM " + totalPrice.toFixed(2))
    checkShop()
    localStorage.shopCart = JSON.stringify(shopCart);
}

function openProfilePage(pPageNo) {
    $(".page").hide();
    switch (pPageNo) {
        case "MyPinkPoints":
            currentSecoPage = "My Pink Points";
            
			getUserPoints()
            break;
        case "Faqs":
            currentSecoPage = "FAQs";
            $(".page_faq").show();
            break;
        case "Feedback":
            currentSecoPage = "FEEDBACK TO US";
            $(".page_feedback").show();
            break;
        case "Edit":
            currentSecoPage = "EDIT MY DETAILS";
            $(".page_edituser").show();
            $("#content").css("background", "#EAEBEB");
            $(".page_edituser .CreateAccount_Content input[name=firstname]").val(currentuser.firstname);
            $(".page_edituser .CreateAccount_Content input[name=lastname]").val(currentuser.lastname);
            $(".page_edituser .CreateAccount_Content input[name=gender]").val(currentuser.gender);
            $(".page_edituser .CreateAccount_Content select[name=bday_day]").val(currentuser.birthday.split("-")[2]);
            $(".page_edituser .CreateAccount_Content select[name=bday_month]").val(currentuser.birthday.split("-")[1]);
            $(".page_edituser .CreateAccount_Content select[name=bday_year]").val(currentuser.birthday.split("-")[0]);
            $(".page_edituser .CreateAccount_Content input[name=email]").val(currentuser.email);
            $(".page_edituser .CreateAccount_Content input[name=contactno]").val(currentuser.contactno);
            $(".edit_user input[name=cpwd]").val("")
            $(".edit_user input[name=newpwd]").val("")
            $(".edit_user input[name=newcpwd]").val("")
            $(".edit_user input[name=cpwd]").removeAttr("disabled");
            $(".edit_user input[name=newpwd]").removeAttr("disabled");
            $(".edit_user input[name=newcpwd]").removeAttr("disabled");
            if (currentuser_isfb == 1) {
                $(".edit_user input[name=cpwd]").attr("disabled", "disabled");
                $(".edit_user input[name=newpwd]").attr("disabled", "disabled");
                $(".edit_user input[name=newcpwd]").attr("disabled", "disabled");
            }
            break;
    }
    TweenMax.from($(".page_faq"), 0.35, {
        "margin-top": "-100%",
        ease: Power1.easeInOut
    })
    updateHeaderNavigation();
}

function openNewsPage(pPageNo) {
    $(".newsupdate_slider").show();
    newsupdateslider.slick("slickGoTo", pPageNo);
    currentSecoPage = $($(".newsupdate_clist")[pPageNo]).find(".newsupdate_c_dtext").text();
    updateHeaderNavigation();
}
var currrentProductSection
function openProductPage(pPageNo) {
    $(".product_main_container").hide();
    $(".product_container").show();
    $(".productselection_container").show();
    $(".productselection_container").css("bottom", "90px")
    $(".sky-carousel").hide();
	currrentProductSection=pPageNo;
    switch (pPageNo) {
        case "Cakes":
            $("#cakesproduct").show();
            $(".product_container_topimage").attr("src", "images/ProductMain_Top4.jpg");
            cakesproductcarousel.select(0, 0.2);
            $(".product_content h1").html(productsobj["products_cake"][0].title);
            $(".product_content p").html(productsobj["products_cake"][0].description);
            break;
        case "Beverages":
            $("#beverageproduct").show();
            $(".product_container_topimage").attr("src", "images/ProductMain_Top3.jpg");
            beverageproductcarousel.select(0, 0.2);
            $(".product_content h1").html(productsobj["products_beverages"][0].title);
            $(".product_content p").html(productsobj["products_beverages"][0].description);
            break;
        case "Flavours":
            $("#flavoursproduct").show();
            $(".product_container_topimage").attr("src", "images/ProductMain_Top1.jpg");
            flavoursproductcarousel.select(0, 0.2);
            $(".product_content h1").html(productsobj["products_icecream"][0].title);
            $(".product_content p").html(productsobj["products_icecream"][0].description);
            break;
        case "Sundaes":
            $("#sundaesproduct").show();
            $(".product_container_topimage").attr("src", "images/ProductMain_Top2.jpg");
            sundaesproductcarousel.select(0, 0.2);
            $(".product_content h1").html(productsobj["products_sundaes"][0].title);
            $(".product_content p").html(productsobj["products_sundaes"][0].description);
            break;
    }
    currentSecoPage = pPageNo;
    TweenMax.from($(".product_container"), 0.35, {
        "margin-top": "-100%",
        ease: Power1.easeInOut
    })
    TweenMax.from($(".productselection_container"), 0.35, {
        "margin-top": "-100%",
        ease: Power1.easeInOut,
        delay: 0.3
    })

    updateHeaderNavigation();
}

function openMainPage(pPageNo) {
    $(".homepagebig_slider").show();

    mainpageslider.slick("slickGoTo", pPageNo);
}

function updateHeaderNavigation() {
    console.log(currentMainPage + "_" + currentSecoPage)
    if (currentSecoPage.length > 0) {
        var ahreftext = "";
        switch (currentMainPage) {
            case "Whats News":
                ahreftext = 'javascript:openPage("WhatNews");void(0);';;
                break;
            case "Products":
                ahreftext = 'javascript:openPage("Products");void(0);';
                break;
            case "MY ACCOUNT":
                ahreftext = 'javascript:openPage("Profile");void(0);';
                break;
        }
        $(".naviation_text").html("<a href='" + ahreftext + "'>" + currentMainPage + '</a> <img src="images/Text_Navigation.png"/> ' + currentSecoPage)
    } else {
        $(".naviation_text").html(currentMainPage)
    }
}

function backToPinkPoint() {
    $(".page").hide()
    $(".page_mypinkpoints").show();
    $(".page_mypinkpoints .pinkpoint_history_buttons").hide();
}


function openBottomProduct(pCategory) {
    $(".productselection_container").show();
    $(".productselection_container").css("bottom", "0px")
    $(".sky-carousel").hide();
    switch (pCategory) {
        case "ServingSize":

            $("#sizeproduct").show();
            break;
        case "IceCreamFlavour":
            $("#flavoursproduct").show();
            break;
        case "CakeDesign":
            $("#cakesproduct").show();
            break;
    }

}

function pageMainFunction() {
    $.each($(".grid-item"), function(i, a) {
        if ($(a).children(".borderblued").length > 0) {
            $(a).children(".borderblued").width($(a).width() - 24);
            $(a).children(".borderblued").height($(a).height() - 24);
            $(a).children(".borderblued").children(".grid_item_in").width($(a).width() - 28);
            $(a).children(".borderblued").children(".grid_item_in").height($(a).height() - 28);
        } else if ($(a).children(".borderblue").length > 0) {
            $(a).children(".borderblue").width($(a).width() - 24);
            $(a).children(".borderblue").height($(a).height() - 14);
            $(a).children(".borderblue").children(".grid_item_in").width($(a).width() - 28);
            $(a).children(".borderblue").children(".grid_item_in").height($(a).height() - 28);
        } else {
            $(a).children(".grid_item_in").width($(a).width() - 4);
            $(a).children(".grid_item_in").height($(a).height() - 4);
        }
    });

}



function logOut() {
    current_usersession = "";
    localStorage.current_usersession = current_usersession;
    openPage("Register")
}

function loginUser() {
    var email = $(".login_user input[name=email]");
    var pwd = $(".login_user input[name=pwd]");
    if (!validateIsNotEmpty(email)) {
        return false;
    }
    if (!validateIsEmail(email)) {
        return false;
    }
    if (!validateIsNotEmpty(pwd)) {
        return false;
    }
    $.ajax({
        method: "POST",
        url: baselink+"phps/user_login.php",
        data: {
            email: email.val(),
            ppwd: pwd.val()
        }
    }).done(function(msg) {
        var obj = JSON.parse(msg);
        if (obj.error_no) {

        } else {
            current_usersession = obj.user_session;
            currentuser = JSON.parse(obj.userdata);
            localStorage.current_usersession = obj.user_session;
            checkUserSession();
        }
    });
}

function forgotPassword() {
    var email = $(".forgot_password input[name=email]");
    if (!validateIsNotEmpty(email)) {
        return false;
    }
    if (!validateIsEmail(email)) {
        return false;
    }
    $.ajax({
        method: "POST",
        url: baselink+"phps/user_forgotpassword.php",
        data: {
            email: email.val()
        }
    }).done(function(msg) {
        var obj = JSON.parse(msg);
        if (obj.error_no) {

        } else {
            openRegisterPage(7);
        }
    });
}
var productsobj = "";

function getProducts() {
    $.ajax({
        method: "POST",
        url: baselink+"phps/get_products.php"

    }).done(function(msg) {
        var obj = JSON.parse(msg);
        productsobj = new Object();
        productsobj["products_cake"] = JSON.parse(obj.products_cake);
        productsobj["products_icecream"] = JSON.parse(obj.products_icecream);
        productsobj["products_sundaes"] = JSON.parse(obj.products_sundaes);
        productsobj["products_beverages"] = JSON.parse(obj.products_beverages);
        console.log(productsobj);
        buildProductCake();
        buildProductBeverage();
        buildProductIceCream();
        buildProductSundaes();
        buildProductServeSize();
    });
}
var issharefb=false;
function checkUserSession() {
    //current_usersession="$2a$10$H2SBTGp8bKAodgnwdVAtnOQt92TCoMensI4S4/dPe.t0Ppf6QN5Da";
    $.ajax({
        method: "POST",
        url: baselink+"phps/user_check.php",
        data: {
            user_session: current_usersession
        }

    }).done(function(msg) {
        closeLoading();
        var obj = JSON.parse(msg);
        console.log(obj);
        if (obj.error_no) {
            openPage("Register");
        } else {
            current_usersession = obj.user_session;
            currentuser = obj.userdata;
            currentuserinventory = obj.userinventory;
            localStorage.current_usersession = current_usersession;
			console.log($(".toppoint_bg_pointext .toppoint_point"));
			$(".toppoint_bg_pointext .toppoint_point").html(parseFloat(currentuser.user_points).toLocaleString()+" ");
			if(!issharefb){
				openPage("Home");
			}else{
				issharefb=false;
			}
            //openPage("Profile");
        }

    });
}

function editUser() {
    var firstname = $(".edit_user input[name=firstname]");
    var lastname = $(".edit_user input[name=lastname]");
    var gender = $(".edit_user input[name=gender]");
    var bday_day = $(".edit_user select[name=bday_day]");
    var bday_month = $(".edit_user select[name=bday_month]");
    var bday_year = $(".edit_user select[name=bday_year]");
    var contactno = $(".edit_user input[name=contactno]");
    var email = $(".edit_user input[name=email]");
    var cpwd = $(".edit_user input[name=cpwd]");
    var newpwd = $(".edit_user input[name=newpwd]");
    var newcpwd = $(".edit_user input[name=newcpwd]");
    if (!validateIsNotEmpty(firstname)) {
        return false;
    }
    if (!validateIsNotEmpty(lastname)) {
        return false;
    }
    if (!validateIsNotEmpty(gender)) {
        return false;
    }
    if (!validateIsNotEmpty(bday_day)) {
        return false;
    }
    if (!validateIsNotEmpty(bday_month)) {
        return false;
    }
    if (!validateIsNotEmpty(bday_year)) {
        return false;
    }
    if (!validateIsNotEmpty(contactno)) {
        return false;
    }
    if (!validateIsNotEmpty(email)) {
        return false;
    }
    if (!validateIsEmail(email)) {
        return false;
    }
    if (validateIsNotEmpty(cpwd)) {
        if (!validateIsNotEmpty(newpwd)) {
            newpwd.focus();
            return false;
        }
        if (!validateIsNotEmpty(newcpwd)) {
            newpwd.focus();
            return false;
        }
        if (newpwd.val().length <= 7) {
            newpwd.focus();
            return false;
        }
        if (newpwd.val() != newcpwd.val()) {
            newpwd.focus();
            return false;
        }
    }


    $.ajax({
        method: "POST",
        url: baselink+"phps/user_edit.php",
        data: {
            user_session: current_usersession,
            firstname: firstname.val(),
            lastname: lastname.val(),
            gender: gender.val(),
            birthday: bday_year.val() + "-" + bday_month.val() + "-" + bday_day.val(),
            email: email.val(),
            contactno: contactno.val(),
            oppwd: cpwd.val(),
            ppwd: newpwd.val()
        }
    }).done(function(msg) {
        var obj = JSON.parse(msg);
        if (obj.error_no) {

        } else {
            currentuser = JSON.parse(obj.userdata);
        }
        $(".edit_user input[name=cpwd]").val("")
        $(".edit_user input[name=newpwd]").val("")
        $(".edit_user input[name=newcpwd]").val("")
        $("#header_navigation .button_backnavigation").focus();
    });
}

function registerUser() {
    var firstname = $(".register_user input[name=firstname]");
    var lastname = $(".register_user input[name=lastname]");
    var gender = $(".register_user input[name=gender]");
    var bday_day = $(".register_user select[name=bday_day]");
    var bday_month = $(".register_user select[name=bday_month]");
    var bday_year = $(".register_user select[name=bday_year]");
    var contactno = $(".register_user input[name=contactno]");
    var email = $(".register_user input[name=email]");
    var newpwd = $(".register_user input[name=newpwd]");
    var newcpwd = $(".register_user input[name=newcpwd]");
    var tc = $(".register_user input[name=tc]");
    if (!validateIsNotEmpty(firstname)) {
        return false;
    }
    if (!validateIsNotEmpty(lastname)) {
        return false;
    }
    if (!validateIsNotEmpty(gender)) {
        return false;
    }
    if (!validateIsNotEmpty(bday_day)) {
        return false;
    }
    if (!validateIsNotEmpty(bday_month)) {
        return false;
    }
    if (!validateIsNotEmpty(bday_year)) {
        return false;
    }
    if (!validateIsNotEmpty(contactno)) {
        return false;
    }
    if (!validateIsNotEmpty(email)) {
        return false;
    }
    if (!validateIsEmail(email)) {
        return false;
    }
    if (!validateIsNotEmpty(newpwd)) {
        return false;
    }
    if (!validateIsNotEmpty(newcpwd)) {
        return false;
    }
    if (!validateIsCheckboxChecked(tc)) {
        return false;
    }
    if (newpwd.val().length <= 7) {
        newpwd.focus();
        return false;
    }
    if (newpwd.val() != newcpwd.val()) {
        newpwd.focus();
        return false;
    }

    $.ajax({
        method: "POST",
        url: baselink+"phps/user_create.php",
        data: {
            firstname: firstname.val(),
            lastname: lastname.val(),
            gender: gender.val(),
            birthday: bday_year.val() + "-" + bday_month.val() + "-" + bday_day.val(),
            email: email.val(),
            contactno: contactno.val(),
            ppwd: newpwd.val()
        }
    }).done(function(msg) {
        var obj = JSON.parse(msg);
        if (obj.error_no) {

        } else {
            current_usersession = obj.user_session;
            currentuser = JSON.parse(obj.userdata);
            localStorage.current_usersession = obj.user_session;
            openPage("AfterRegister");
        }
    });
}


function handleDownloadEvent(e) {
    console.log(e);
}

function handleCacheEvent(e) {
    console.log(appCache.status)
    if (appCache.status == appCache.UNCACHED) {

    }
    if (appCache.status == window.applicationCache.UPDATEREADY) {
        appCache.swapCache();
        setTimeout(function() {
            $(".contentoverlay").fadeOut();
            openPage("Home");

        }, 1000);
    }
}

function handleCacheError(e) {
    alert('Error: Cache failed to update!');
};

var appCache = window.applicationCache;
if (appCache) {
    //appCache.update(); 
    window.addEventListener('load', function(e) {
        appCache.addEventListener('checking', handleCacheEvent, false);
        appCache.addEventListener('downloading', handleDownloadEvent, false);
        appCache.addEventListener('noupdate', handleCacheEvent, false);
        appCache.addEventListener('progress', handleCacheEvent, false);
        appCache.addEventListener('updateready', handleCacheEvent, false);
        appCache.addEventListener('cached', handleCacheEvent, false);
        appCache.addEventListener('error', handleCacheError, false);
        if (appCache.status == 1) {
            setTimeout(function() {
                $(".contentoverlay").fadeOut();
                openPage("Home");
            }, 1000);
        }
    }, false);
}

function facebookLogin() {
	if (!window.cordova) {
		var appId = prompt("1638823863039406", "");
		facebookConnectPlugin.browserInit(appId);
	}
	facebookConnectPlugin.login( ["email"], 
			function (response) { facebookCallMe() },
			function (response) { });
    /*FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            facebookCallMe()
        } else {
            FB.login(function(response) {
                facebookCallMe()
            }, {
                scope: 'email'
            });
        }
    });*/
}

function facebookCallMe() {
	facebookConnectPlugin.api("me?fields=id,name,first_name,last_name,email,gender", [],function(response) {
        $.ajax({
            method: "POST",
            url: baselink+"phps/user_loginfb.php",
            data: {
                fbuid: response.id,
                firstname: response.first_name,
                lastname: response.last_name,
                gender: response.gender,
                email: response.email
            }
        }).done(function(msg) {
            var obj = JSON.parse(msg);
            if (obj.error_no) {

            } else {
                current_usersession = obj.user_session;
                currentuser = JSON.parse(obj.userdata);
                localStorage.current_usersession = obj.user_session;
                checkUserSession();
                currentuser_isfb = 1;
            }

        });
    }, function (response) { }
	)
}

function openDaily(){
	$(".dailyreward_landing").hide();
	$(".dailyreward_collected").show();
}