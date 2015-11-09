var lngInput = $('.lng-input'), latInput = $('.lat-input'),
	tokenInput = $('.token-input');
var signButton = $('.sign-button');
var outputArea = $('.output-section');

var KEY_LNG = 'evillng',
	KEY_LAT = 'evillat',
	KEY_TOKEN = 'eviltoken';
var MAGIC_WORD = '';

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
}

function saveCookies(lng, lat, token) {
	var exp = new Date(), expStr;
	exp.setTime(exp.getTime() + 365*24*60*60*1000);
	expStr = exp.toGMTString();

	addCookie(KEY_LNG, lng, expStr);
	addCookie(KEY_LAT, lat, expStr);
	addCookie(KEY_TOKEN, token, expStr);
}
function addCookie(key, value, exp) {
	document.cookie = key + '=' + value + ';expires=' + exp;
}
function saveLocalStorage(lng, lat, token) {
	localStorage[KEY_LNG] = lng;
	localStorage[KEY_LAT] = lat;
	localStorage[KEY_TOKEN] = token;
}

function encode(str){
	var arr = [];
	for (var i = 0; i < str.length; i++) {
		arr.push('x' + str.charCodeAt(i).toString(16));
	}
	return arr.join('');
}
function decode(str){
	var arr = str.split('x'), res = [];
	for (var i = 0; i < arr.length; i++) {
		res.push(String.fromCharCode(parseInt(arr[i], 16)));
	}
	return res.join('');
}

function enableButton() {
	signButton.removeClass('sending').text('Sign');	
}
function disableButton() {
	signButton.addClass('sending').text('Sending...');	
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
	var url = decode(MAGIC_WORD) + '?' + $.param(getData());
	outputArea.attr('src', url);
}
