
var f = module.exports = exports;

// --------------------------------------------------------

// 
// Returns the nth argument (zero-indexed) given to the function
// 
f.arg = function(n) {
	return function() {
		return arguments[n];
	};
};

// --------------------------------------------------------

// 
// Returns the first argument given to the function
// 
f.identity = f.first = function() {
	return f.arg(0);
};

// --------------------------------------------------------

// 
// Returns true every nth call to the function, and false every other time
// 
f.nth = function(n, offset) {
	var calls = offset || 0;
	return function() {
		return ! ((++calls) % n);
	};
};

// --------------------------------------------------------

// 
// Returns true on every even/odd call, and false on others
// 

f.odd = function() {
	return f.nth(2, 1);
};

f.even = function() {
	return f.nth(2, 2);
};

// --------------------------------------------------------

// 
// Returns a continually increasing value with each call
// 
f.iota = function(start, skip) {
	var num = start || 0;
	skip = skip || 1;

	return function() {
		var value = num;
		return (num += skip), value;
	};
};

// --------------------------------------------------------

// 
// Returns a new function that calls through to the given function, but negates the return value
// 
f.not = function(func) {
	return function() {
		return ! func.apply(this, arguments);
	};
};

// --------------------------------------------------------

// 
// Used for selecting a specific named property from objects
// 
f.prop = function(prop) {
	return function(obj) {
		return obj[prop];
	};
};

// --------------------------------------------------------

// 
// Filter and map an array in one call and one iteration using reduce
// 
f.filterMap = function(filter, map) {
	return function(mem, value, index, arr) {
		mem = mem || [ ];

		if (filter.call(this, value, index, arr)) {
			mem.push(map.call(this, value, index, arr));
		}

		return mem;
	};
};

// --------------------------------------------------------

// 
// Returns true for given objects where the given property has the given value
// 
f.where = function(prop, value) {
	return function(obj) {
		return obj[prop] === value;
	};
};
