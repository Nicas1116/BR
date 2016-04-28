function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d.toFixed(1);
}
var mapobjects, mapobjects_outlets, searchText="", stateSearch="", currentposition;
$(document).ready(function() {});

function searchLocationByState() {
	var results = [];
	for (i = 0; i < mapobjects_outlets.length; i++) {
		if ((mapobjects_outlets[i].outlets_state == stateSearch)) {
				results.push(i)
			}
	}
	return results;
}
function searchLocation() {
	var results = [];
	var Character = searchText.toLowerCase();
	if(stateSearch.length>0){
		
		for (i = 0; i < mapobjects_outlets.length; i++) {
			if (mapobjects_outlets[i].outlets_name.toLowerCase().indexOf(Character) != -1 && (mapobjects_outlets[i].outlets_state == stateSearch)) {
				results.push(i)
			}
		}
	}else{
		for (i = 0; i < mapobjects_outlets.length; i++) {
			if (mapobjects_outlets[i].outlets_name.toLowerCase().indexOf(Character) != -1) {
				results.push(i)
			}
		}
	}
    return results;
}

function buildContent(theContent) {
    var contentHtml = "";
    for (var ms = 0; ms < theContent.length; ms++) {
        console.log(mapobjects_outlets[theContent[ms]])
        if (ms == theContent.length - 1) {
            contentHtml += "<div id='result" + theContent[ms] + "' class='searchResultContent'><h1>" + mapobjects_outlets[theContent[ms]].outlets_name + "</h1><p><span>" + calculateDistance(currentposition.lat, currentposition.lng, mapobjects_outlets[theContent[ms]].outlets_lat, mapobjects_outlets[theContent[ms]].outlets_lan) + "KM</span>" + mapobjects_outlets[theContent[ms]].outlets_address.substring(0, 50) + "...</p></div>";
        } else {
            contentHtml += "<div id='result" + theContent[ms] + "' class='searchResultContent borderbotom'><h1>" + mapobjects_outlets[theContent[ms]].outlets_name + "</h1><p><span>" + calculateDistance(currentposition.lat, currentposition.lng, mapobjects_outlets[theContent[ms]].outlets_lat, mapobjects_outlets[theContent[ms]].outlets_lan) + "KM</span>" + mapobjects_outlets[theContent[ms]].outlets_address.substring(0, 50) + "...</p></div>";
        }
    }
    $(".searchresultobx").html(contentHtml);
    $(".searchResultContent").click(function() {
        var sId = parseInt($(this).attr("id").replace("result", ""));
        google.maps.event.trigger(mapobjects_outlets[sId].marker, 'click');
		$("#searchresult").hide();
    });
}

function init() {
    $.ajax({
        method: "POST",
        url: baselink+"phps/get_stores.php"
    }).done(function(msg) {
        mapobjects = JSON.parse(msg);
        mapobjects_outlets = mapobjects.outlets;
        mapobjects_states = mapobjects.states;
        for (var i = 0; i < mapobjects_states.length; i++) {
            var theStates = mapobjects_states[i].outlets_state;
            $(".stateselector").append("<option value='" + theStates + "'>" + theStates + "</option>")
        }
        initMap()
        $(".stateselector").change(function() {
			$("#searchresult").show();
			searchText = $(".searchtxt").val();
            stateSearch = $(".stateselector").val();
			if (searchText.length > 0) {
                $(".Map_TopSearchClear").show();
                var theContent = searchLocation();
              
                buildContent(theContent);
            } else {
                $(".Map_TopSearchClear").hide();
				if(stateSearch.length>0){
					buildContent(searchLocationByState());
				}else{
					$("#searchresult").hide();
				}
            }
        })

        $(".searchtxt").keyup(function() {
			$("#searchresult").show();
            searchText = $(".searchtxt").val();
			stateSearch = $(".stateselector").val();
            if (searchText.length > 0) {
                $(".Map_TopSearchClear").show();
                buildContent(searchLocation());
            } else {
                $(".Map_TopSearchClear").hide();
				if(stateSearch.length>0){
					buildContent(searchLocationByState());
				}else{
					$("#searchresult").hide();
				}
            }

        })
        $(".Map_TopSearchClear").click(function() {
            $(".searchtxt").val("");
            $(".Map_TopSearchClear").hide();
			if(stateSearch.length>0){
				buildContent(searchLocationByState());
			}else{
				$("#searchresult").hide();
			}
        });
    });
}
var map;
var infowindow;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 3.1173813343048096,
            lng: 99.8518
        },
        disableDefaultUI: true,
        zoom: 7
    });
	currentposition = {
			 lat: 3.1173813343048096,
            lng: 99.8518
		};
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            currentposition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
        })
    }
    map.panTo({
        lat: 6.30643,
        lng: 99.8518
    });
    for (var m = 0; m < mapobjects_outlets.length; m++) {
        var marker = new google.maps.Marker({
            position: {
                lat: parseFloat(mapobjects_outlets[m].outlets_lat),
                lng: parseFloat(mapobjects_outlets[m].outlets_lan)
            },
            map: map,
            icon: 'images/mapmarker.png',
            customInfo: m.toString()
        });
        mapobjects_outlets[m].marker = marker;
        marker.addListener('click', function(e) {
            var tno = parseInt(this["customInfo"]);
            var contentString = '<div id="infocontent"><div class="titlebox">Baskin Robbins ' + mapobjects_outlets[tno].outlets_name + '</div><p class="taddress">' + mapobjects_outlets[tno].outlets_address + '</p><p class="tphoneno">' + mapobjects_outlets[tno].outlets_contactno + '</p><p class="topenhour">' + mapobjects_outlets[tno].outlets_openhours + '</p><div class="googlebutton_container"><a href="tel:'+mapobjects_outlets[tno].outlets_contactno+'" target="_top" class="googlebutton"><img src="images/googlebutton_phone.png"/>Call</a><a href="#TEST"  class="googlebutton"><img src="images/googlebutton_arrow.png"/>Go</a><a href="#TEST" class="googlebutton"><img src="images/googlebutton_share.png"/>Share</a></div></div>';
            infowindow.setContent(contentString)
            infowindow.open(map, this);
            map.setZoom(13);
            map.panTo(this.position)
            console.log(this.label);
            setTimeout(function() {
                map.panBy(-30, 330);
            }, 500);
        });
    }
    var contentString = '<div id="infocontent"><div class="titlebox">Baskin Robbins Sri Petaling</div><p class="taddress">No. 46, Ground & 1st Floor, Jalan Radin Tengah, Bandar Baru Seri Petaling, 57000 Kuala Lumpur </p><p class="tphoneno">03 - 9054 5991</p><p class="topenhour">Mon - Fri : 10am - 11pm<br/>Sat & Sun, School Holiday & Public Holiday : 10am - 12am	</p><div class="googlebutton_container"><a href="http://www.google.com" target="_top" class="googlebutton"><img src="images/googlebutton_phone.png"/>Call</a><a href="#TEST"  class="googlebutton"><img src="images/googlebutton_arrow.png"/>Go</a><a href="#TEST" class="googlebutton"><img src="images/googlebutton_share.png"/>Share</a></div></div>';
    infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    google.maps.event.addListener(infowindow, 'domready', function() {
        console.log("INFOWINDOW")
        var iwOuter = $('.gm-style-iw');
        var iwBackground = iwOuter.prev();
        var iwPointer = iwOuter.prev();
        iwBackground.children(':nth-child(2)').css({
            'display': 'none'
        });
        iwBackground.children(':nth-child(4)').css({
            'display': 'none'
        });
        iwBackground.children(':nth-child(3)').children(':nth-child(1)').children(':nth-child(1)').css("background", "#E583B5")
        iwBackground.children(':nth-child(3)').children(':nth-child(2)').children(':nth-child(1)').css("background", "#E583B5")
        iwBackground.children(':nth-child(3)').children(':nth-child(1)').children(':nth-child(1)').css("box-shadow", "")
        iwBackground.children(':nth-child(3)').children(':nth-child(2)').children(':nth-child(1)').css("box-shadow", "")
        iwBackground.children(':nth-child(3)').addClass("rotateThatArrow");
        iwBackground.children(':nth-child(1)').css({
            "display": "none"
        });
        var iwCloseBtn = iwOuter.next();
        iwCloseBtn.addClass("googleCloseButton");
        console.log(iwPointer);
		iwCloseBtn.click(function(){
			infowindow.close();
		});
        iwOuter.parent().parent().css({
            top: iwOuter.height() + 110
        });

    });
}