// OSC.js
// get Object by his Id or his Name
function _O(objIdOrName) {
	if (Object.prototype.toString.call(objIdOrName) == '[object String]') {	// ===
		return document.getElementById(objIdOrName);
	} else {																	// [object Object]
		return objIdOrName;
	}
}

// get style of Object
function _S(objIdOrName) {
	return _O(objIdOrName).style;
}

// get array of all objects with class
function _C(className) {
  var elements = document.getElementByTagName('*'),     //
      objects = [];                                     //
  for (var i=0; i < elements.length; ++i) {
    if (elements[i].className == 'name') {
      objects.push(elements[i]); }
  }
  return objects;
}
