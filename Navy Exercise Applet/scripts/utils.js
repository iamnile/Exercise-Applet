/**
 * Created by daniel on 1/24/14.
 */

var utils = {};

utils.isEmpty = function(check){
	if(typeof check == 'undefined'){
		return true;
	}
	if(check == null){
		return true;
	}
	if(check.trim() == ''){
		return true;
	}
	return false;
};

utils.toFloat = function(value){
	if(isNaN(parseFloat(value))){
		return 0;
	}
	return parseFloat(value);
};

utils.pad = function(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

utils.c = function(obj){
	return JSON.parse(JSON.stringify(obj));
};

utils.objCount = function(obj){
	var count = 0;
	for(var key in obj){
		count++;
	}
	return count;
};

// This function sorts objects by key
utils.sortObjByKeys = function(obj, reverse){
	if(typeof reverse == undefined || reverse == null){
		reverse = false;
	}

	// Setup Arrays
	var sortedKeys = new Array();
	var sortedObj = {};

	// Separate keys and sort them
	for (var i in obj){
		sortedKeys.push(i);
	}

	sortedKeys.sort()
	if(reverse){
		sortedKeys.reverse();
	}

	// Reconstruct sorted obj based on keys
	for (var i in sortedKeys){
		sortedObj[sortedKeys[i]] = obj[sortedKeys[i]];
	}
	return sortedObj;
};

var urlParams;
(window.onpopstate = function () {
	var match,
		pl     = /\+/g,  // Regex for replacing addition symbol with a space
		search = /([^&=]+)=?([^&]*)/g,
		decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
		query  = window.location.search.substring(1);

	urlParams = {};
	while (match = search.exec(query))
		urlParams[decode(match[1])] = decode(match[2]);
})();