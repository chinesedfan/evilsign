var lngInput = $('.lng-input'), latInput = $('.lat-input'),
	tokenInput = $('.token-input');
var signButton = $('.sign-button');
var outputArea = $('.output-section');

var MAGIC_WORD = '';

$(function() {
	loadCookies();
	$('.J_sign-button').on('click', sendEvilSign);
});

function loadCookies() {
	var result = {};
    document.cookie.split(";").forEach(function(p) {
        var c = p.trim().split("=");
        var name = c[0];
        var value = c[1];
        result[name] = value;
    });

    lngInput.val(result['evillng'] || '');
    latInput.val(result['evillat'] || '');
    tokenInput.val(result['eviltoken'] || '');
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

function getData() {
	var data = {
		longitude: parseFloat(lngInput.val()),
		latitude: parseFloat(latInput.val()),
		uuid: tokenInput.val()
	};

	document.cookie = 'evillng=' + data.longitude;
	document.cookie = 'evillat=' + data.latitude;
	document.cookie = 'eviltoken=' + data.uuid;

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
