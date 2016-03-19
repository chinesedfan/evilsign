var lngInput = $('.lng-input'), latInput = $('.lat-input'),
    hostInput = $('.host-input'),
	tokenInput = $('.token-input');
var signButton = $('.sign-button');
var outputArea = $('.output-section');

var KEY_LNG = 'evillng',
	KEY_LAT = 'evillat',
    KEY_HOST = 'evilhost',
	KEY_TOKEN = 'eviltoken';

$(function() {
	if (window.localStorage) {
		loadLocalStorage();
	} else {
		loadCookies();
	}

	outputArea.on('load', function(e) {
		enableButton();
	});
	$('.J_sign-button').on('click', function(e) {
		disableButton();
		sendEvilSign();
	});
});

function loadCookies() {
	var result = {};
    document.cookie.split(";").forEach(function(p) {
        var c = p.trim().split("=");
        var name = c[0];
        var value = c[1];
        result[name] = value;
    });

    loadData(result);
}
function loadLocalStorage() {
	loadData(window.localStorage);
}
function loadData(data) {
	lngInput.val(data[KEY_LNG] || '');
    latInput.val(data[KEY_LAT] || '');
    tokenInput.val(data[KEY_TOKEN] || '');
    hostInput.val(data[KEY_HOST] || '');
}

function saveCookies(lng, lat, token) {
	addCookie(KEY_LNG, lng);
	addCookie(KEY_LAT, lat);
	addCookie(KEY_TOKEN, token);
}
function addCookie(key, value, expStr) {
    if (!expStr) {
        var exp = new Date();
        exp.setTime(exp.getTime() + 365*24*60*60*1000);
        expStr = exp.toGMTString();
    }
	document.cookie = key + '=' + value + ';expires=' + expStr;
}
function saveLocalStorage(lng, lat, token) {
	localStorage[KEY_LNG] = lng;
	localStorage[KEY_LAT] = lat;
	localStorage[KEY_TOKEN] = token;
}

function enableButton() {
	signButton.removeClass('sending').text('Sign');	
}
function disableButton() {
	signButton.addClass('sending').text('Sending...');	
}

function getHost() {
    var host = hostInput.val();
    addCookie(KEY_HOST, host);
    if (window.localStorage) {
        localStorage[KEY_HOST] = host;
    }
    return host;
}
function getData() {
	var data = {
		longitude: parseFloat(lngInput.val()),
		latitude: parseFloat(latInput.val()),
		uuid: tokenInput.val()
	};

	saveCookies(data.longitude, data.latitude, data.uuid);
	if (window.localStorage) {
		saveLocalStorage(data.longitude, data.latitude, data.uuid);
	}

	data.longitude += Math.random() * 0.002 - 0.001;
	data.latitude += Math.random() * 0.002 - 0.001;
	data.longitude = data.longitude.toFixed(6);
	data.latitude = data.latitude.toFixed(6);

	return data;
}
function sendEvilSign() {
	var url = getHost() + '?' + $.param(getData());
	outputArea.attr('src', url);
}
