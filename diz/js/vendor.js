/*!
 * jQuery JavaScript Library v3.6.0
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2021-03-02T17:08Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var flat = arr.flat ? function( array ) {
	return arr.flat.call( array );
} : function( array ) {
	return arr.concat.apply( [], array );
};


var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

		// Support: Chrome <=57, Firefox <=52
		// In some browsers, typeof returns "function" for HTML <object> elements
		// (i.e., `typeof document.createElement( "object" ) === "function"`).
		// We don't want to classify *any* DOM node as a function.
		// Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
		// Plus for old WebKit, typeof returns "function" for HTML collections
		// (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
		return typeof obj === "function" && typeof obj.nodeType !== "number" &&
			typeof obj.item !== "function";
	};


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};


var document = window.document;



	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.6.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	even: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return ( i + 1 ) % 2;
		} ) );
	},

	odd: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return i % 2;
		} ) );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a provided context; falls back to the global one
	// if not specified.
	globalEval: function( code, options, doc ) {
		DOMEval( code, { nonce: options && options.nonce }, doc );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
						[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return flat( ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( _i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.6
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2021-02-16
 */
( function( window ) {
var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ( {} ).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	pushNative = arr.push,
	push = arr.push,
	slice = arr.slice,

	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[ i ] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|" +
		"ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
	identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
		"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +

		// "Attribute values must be CSS identifiers [capture 5]
		// or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
		whitespace + "*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +

		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" +
		whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace +
		"*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
			whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
			whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),

		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace +
			"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
			"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rhtml = /HTML$/i,
	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g" ),
	funescape = function( escape, nonHex ) {
		var high = "0x" + escape.slice( 1 ) - 0x10000;

		return nonHex ?

			// Strip the backslash prefix from a non-hex escape sequence
			nonHex :

			// Replace a hexadecimal escape sequence with the encoded Unicode code point
			// Support: IE <=11+
			// For values outside the Basic Multilingual Plane (BMP), manually construct a
			// surrogate pair
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" +
				ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		( arr = slice.call( preferredDoc.childNodes ) ),
		preferredDoc.childNodes
	);

	// Support: Android<4.0
	// Detect silently failing push.apply
	// eslint-disable-next-line no-unused-expressions
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			pushNative.apply( target, slice.call( els ) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;

			// Can't trust NodeList.length
			while ( ( target[ j++ ] = els[ i++ ] ) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {
		setDocument( context );
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && ( match = rquickExpr.exec( selector ) ) ) {

				// ID selector
				if ( ( m = match[ 1 ] ) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( ( elem = context.getElementById( m ) ) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && ( elem = newContext.getElementById( m ) ) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[ 2 ] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( ( m = match[ 3 ] ) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!nonnativeSelectorCache[ selector + " " ] &&
				( !rbuggyQSA || !rbuggyQSA.test( selector ) ) &&

				// Support: IE 8 only
				// Exclude object elements
				( nodeType !== 1 || context.nodeName.toLowerCase() !== "object" ) ) {

				newSelector = selector;
				newContext = context;

				// qSA considers elements outside a scoping root when evaluating child or
				// descendant combinators, which is not what we want.
				// In such cases, we work around the behavior by prefixing every selector in the
				// list with an ID selector referencing the scope context.
				// The technique has to be used as well when a leading combinator is used
				// as such selectors are not recognized by querySelectorAll.
				// Thanks to Andrew Dupont for this technique.
				if ( nodeType === 1 &&
					( rdescend.test( selector ) || rcombinators.test( selector ) ) ) {

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;

					// We can use :scope instead of the ID hack if the browser
					// supports it & if we're not changing the context.
					if ( newContext !== context || !support.scope ) {

						// Capture the context ID, setting it first if necessary
						if ( ( nid = context.getAttribute( "id" ) ) ) {
							nid = nid.replace( rcssescape, fcssescape );
						} else {
							context.setAttribute( "id", ( nid = expando ) );
						}
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[ i ] = ( nid ? "#" + nid : ":scope" ) + " " +
							toSelector( groups[ i ] );
					}
					newSelector = groups.join( "," );
				}

				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch ( qsaError ) {
					nonnativeSelectorCache( selector, true );
				} finally {
					if ( nid === expando ) {
						context.removeAttribute( "id" );
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {

		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {

			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return ( cache[ key + " " ] = value );
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement( "fieldset" );

	try {
		return !!fn( el );
	} catch ( e ) {
		return false;
	} finally {

		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}

		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split( "|" ),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[ i ] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( ( cur = cur.nextSibling ) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return ( name === "input" || name === "button" ) && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
					inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction( function( argument ) {
		argument = +argument;
		return markFunction( function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
					seed[ j ] = !( matches[ j ] = seed[ j ] );
				}
			}
		} );
	} );
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	var namespace = elem && elem.namespaceURI,
		docElem = elem && ( elem.ownerDocument || elem ).documentElement;

	// Support: IE <=8
	// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
	// https://bugs.jquery.com/ticket/4833
	return !rhtml.test( namespace || docElem && docElem.nodeName || "HTML" );
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( doc == document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9 - 11+, Edge 12 - 18+
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( preferredDoc != document &&
		( subWindow = document.defaultView ) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	// Support: IE 8 - 11+, Edge 12 - 18+, Chrome <=16 - 25 only, Firefox <=3.6 - 31 only,
	// Safari 4 - 5 only, Opera <=11.6 - 12.x only
	// IE/Edge & older browsers don't support the :scope pseudo-class.
	// Support: Safari 6.0 only
	// Safari 6.0 supports :scope but it's an alias of :root there.
	support.scope = assert( function( el ) {
		docElem.appendChild( el ).appendChild( document.createElement( "div" ) );
		return typeof el.querySelectorAll !== "undefined" &&
			!el.querySelectorAll( ":scope fieldset div" ).length;
	} );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert( function( el ) {
		el.className = "i";
		return !el.getAttribute( "className" );
	} );

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert( function( el ) {
		el.appendChild( document.createComment( "" ) );
		return !el.getElementsByTagName( "*" ).length;
	} );

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert( function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	} );

	// ID filter and find
	if ( support.getById ) {
		Expr.filter[ "ID" ] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute( "id" ) === attrId;
			};
		};
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter[ "ID" ] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode( "id" );
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode( "id" );
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( ( elem = elems[ i++ ] ) ) {
						node = elem.getAttributeNode( "id" );
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find[ "TAG" ] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,

				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( ( elem = results[ i++ ] ) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find[ "CLASS" ] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( ( support.qsa = rnative.test( document.querySelectorAll ) ) ) {

		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert( function( el ) {

			var input;

			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll( "[msallowcapture^='']" ).length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll( "[selected]" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push( "~=" );
			}

			// Support: IE 11+, Edge 15 - 18+
			// IE 11/Edge don't find elements on a `[name='']` query in some cases.
			// Adding a temporary attribute to the document before the selection works
			// around the issue.
			// Interestingly, IE 10 & older don't seem to have the issue.
			input = document.createElement( "input" );
			input.setAttribute( "name", "" );
			el.appendChild( input );
			if ( !el.querySelectorAll( "[name='']" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*name" + whitespace + "*=" +
					whitespace + "*(?:''|\"\")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll( ":checked" ).length ) {
				rbuggyQSA.push( ":checked" );
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push( ".#.+[+~]" );
			}

			// Support: Firefox <=3.6 - 5 only
			// Old Firefox doesn't throw on a badly-escaped identifier.
			el.querySelectorAll( "\\\f" );
			rbuggyQSA.push( "[\\r\\n\\f]" );
		} );

		assert( function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement( "input" );
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll( "[name=d]" ).length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll( ":enabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll( ":disabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: Opera 10 - 11 only
			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll( "*,:x" );
			rbuggyQSA.push( ",.*:" );
		} );
	}

	if ( ( support.matchesSelector = rnative.test( ( matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector ) ) ) ) {

		assert( function( el ) {

			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		} );
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join( "|" ) );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			) );
		} :
		function( a, b ) {
			if ( b ) {
				while ( ( b = b.parentNode ) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		compare = ( a.ownerDocument || a ) == ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			( !support.sortDetached && b.compareDocumentPosition( a ) === compare ) ) {

			// Choose the first element that is related to our preferred document
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( a == document || a.ownerDocument == preferredDoc &&
				contains( preferredDoc, a ) ) {
				return -1;
			}

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( b == document || b.ownerDocument == preferredDoc &&
				contains( preferredDoc, b ) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			return a == document ? -1 :
				b == document ? 1 :
				/* eslint-enable eqeqeq */
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( ( cur = cur.parentNode ) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( ( cur = cur.parentNode ) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[ i ] === bp[ i ] ) {
			i++;
		}

		return i ?

			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[ i ], bp[ i ] ) :

			// Otherwise nodes in our document sort first
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			ap[ i ] == preferredDoc ? -1 :
			bp[ i ] == preferredDoc ? 1 :
			/* eslint-enable eqeqeq */
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	setDocument( elem );

	if ( support.matchesSelector && documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||

				// As well, disconnected nodes are said to be in a document
				// fragment in IE 9
				elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch ( e ) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( context.ownerDocument || context ) != document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( elem.ownerDocument || elem ) != document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],

		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			( val = elem.getAttributeNode( name ) ) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return ( sel + "" ).replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( ( elem = results[ i++ ] ) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {

		// If no nodeType, this is expected to be an array
		while ( ( node = elem[ i++ ] ) ) {

			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {

		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {

			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}

	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[ 1 ] = match[ 1 ].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[ 3 ] = ( match[ 3 ] || match[ 4 ] ||
				match[ 5 ] || "" ).replace( runescape, funescape );

			if ( match[ 2 ] === "~=" ) {
				match[ 3 ] = " " + match[ 3 ] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {

			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[ 1 ] = match[ 1 ].toLowerCase();

			if ( match[ 1 ].slice( 0, 3 ) === "nth" ) {

				// nth-* requires argument
				if ( !match[ 3 ] ) {
					Sizzle.error( match[ 0 ] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[ 4 ] = +( match[ 4 ] ?
					match[ 5 ] + ( match[ 6 ] || 1 ) :
					2 * ( match[ 3 ] === "even" || match[ 3 ] === "odd" ) );
				match[ 5 ] = +( ( match[ 7 ] + match[ 8 ] ) || match[ 3 ] === "odd" );

				// other types prohibit arguments
			} else if ( match[ 3 ] ) {
				Sizzle.error( match[ 0 ] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[ 6 ] && match[ 2 ];

			if ( matchExpr[ "CHILD" ].test( match[ 0 ] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[ 3 ] ) {
				match[ 2 ] = match[ 4 ] || match[ 5 ] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&

				// Get excess from tokenize (recursively)
				( excess = tokenize( unquoted, true ) ) &&

				// advance to the next closing parenthesis
				( excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length ) ) {

				// excess is a negative index
				match[ 0 ] = match[ 0 ].slice( 0, excess );
				match[ 2 ] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() {
					return true;
				} :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				( pattern = new RegExp( "(^|" + whitespace +
					")" + className + "(" + whitespace + "|$)" ) ) && classCache(
						className, function( elem ) {
							return pattern.test(
								typeof elem.className === "string" && elem.className ||
								typeof elem.getAttribute !== "undefined" &&
									elem.getAttribute( "class" ) ||
								""
							);
				} );
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				/* eslint-disable max-len */

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
				/* eslint-enable max-len */

			};
		},

		"CHILD": function( type, what, _argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, _context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( ( node = node[ dir ] ) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}

								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || ( node[ expando ] = {} );

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								( outerCache[ node.uniqueID ] = {} );

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( ( node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								( diff = nodeIndex = 0 ) || start.pop() ) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {

							// Use previously-cached element index if available
							if ( useCache ) {

								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || ( node[ expando ] = {} );

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									( outerCache[ node.uniqueID ] = {} );

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {

								// Use the same loop as above to seek `elem` from the start
								while ( ( node = ++nodeIndex && node && node[ dir ] ||
									( diff = nodeIndex = 0 ) || start.pop() ) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] ||
												( node[ expando ] = {} );

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												( outerCache[ node.uniqueID ] = {} );

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {

			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction( function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[ i ] );
							seed[ idx ] = !( matches[ idx ] = matched[ i ] );
						}
					} ) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {

		// Potentially complex pseudos
		"not": markFunction( function( selector ) {

			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction( function( seed, matches, _context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( ( elem = unmatched[ i ] ) ) {
							seed[ i ] = !( matches[ i ] = elem );
						}
					}
				} ) :
				function( elem, _context, xml ) {
					input[ 0 ] = elem;
					matcher( input, null, xml, results );

					// Don't keep the element (issue #299)
					input[ 0 ] = null;
					return !results.pop();
				};
		} ),

		"has": markFunction( function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		} ),

		"contains": markFunction( function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1;
			};
		} ),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {

			// lang value must be a valid identifier
			if ( !ridentifier.test( lang || "" ) ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( ( elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute( "xml:lang" ) || elem.getAttribute( "lang" ) ) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( ( elem = elem.parentNode ) && elem.nodeType === 1 );
				return false;
			};
		} ),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement &&
				( !document.hasFocus || document.hasFocus() ) &&
				!!( elem.type || elem.href || ~elem.tabIndex );
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {

			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return ( nodeName === "input" && !!elem.checked ) ||
				( nodeName === "option" && !!elem.selected );
		},

		"selected": function( elem ) {

			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				// eslint-disable-next-line no-unused-expressions
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {

			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos[ "empty" ]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( ( attr = elem.getAttribute( "type" ) ) == null ||
					attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo( function() {
			return [ 0 ];
		} ),

		"last": createPositionalPseudo( function( _matchIndexes, length ) {
			return [ length - 1 ];
		} ),

		"eq": createPositionalPseudo( function( _matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		} ),

		"even": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"odd": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"lt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ?
				argument + length :
				argument > length ?
					length :
					argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"gt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} )
	}
};

Expr.pseudos[ "nth" ] = Expr.pseudos[ "eq" ];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || ( match = rcomma.exec( soFar ) ) ) {
			if ( match ) {

				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[ 0 ].length ) || soFar;
			}
			groups.push( ( tokens = [] ) );
		}

		matched = false;

		// Combinators
		if ( ( match = rcombinators.exec( soFar ) ) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,

				// Cast descendant combinators to space
				type: match[ 0 ].replace( rtrim, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( ( match = matchExpr[ type ].exec( soFar ) ) && ( !preFilters[ type ] ||
				( match = preFilters[ type ]( match ) ) ) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :

			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[ i ].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?

		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( ( elem = elem[ dir ] ) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || ( elem[ expando ] = {} );

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] ||
							( outerCache[ elem.uniqueID ] = {} );

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( ( oldCache = uniqueCache[ key ] ) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return ( newCache[ 2 ] = oldCache[ 2 ] );
						} else {

							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( ( newCache[ 2 ] = matcher( elem, context, xml ) ) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[ i ]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[ 0 ];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[ i ], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( ( elem = unmatched[ i ] ) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction( function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts(
				selector || "*",
				context.nodeType ? [ context ] : context,
				[]
			),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?

				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( ( elem = temp[ i ] ) ) {
					matcherOut[ postMap[ i ] ] = !( matcherIn[ postMap[ i ] ] = elem );
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {

					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( ( elem = matcherOut[ i ] ) ) {

							// Restore matcherIn since elem is not yet a final match
							temp.push( ( matcherIn[ i ] = elem ) );
						}
					}
					postFinder( null, ( matcherOut = [] ), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( ( elem = matcherOut[ i ] ) &&
						( temp = postFinder ? indexOf( seed, elem ) : preMap[ i ] ) > -1 ) {

						seed[ temp ] = !( results[ temp ] = elem );
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	} );
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[ 0 ].type ],
		implicitRelative = leadingRelative || Expr.relative[ " " ],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				( checkContext = context ).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );

			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( ( matcher = Expr.relative[ tokens[ i ].type ] ) ) {
			matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
		} else {
			matcher = Expr.filter[ tokens[ i ].type ].apply( null, tokens[ i ].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {

				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[ j ].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(

					// If the preceding token was a descendant combinator, insert an implicit any-element `*`
					tokens
						.slice( 0, i - 1 )
						.concat( { value: tokens[ i - 2 ].type === " " ? "*" : "" } )
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( ( tokens = tokens.slice( j ) ) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find[ "TAG" ]( "*", outermost ),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = ( dirruns += contextBackup == null ? 1 : Math.random() || 0.1 ),
				len = elems.length;

			if ( outermost ) {

				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				outermostContext = context == document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && ( elem = elems[ i ] ) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;

					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
					// two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( !context && elem.ownerDocument != document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( ( matcher = elementMatchers[ j++ ] ) ) {
						if ( matcher( elem, context || document, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {

					// They will have gone through all possible matchers
					if ( ( elem = !matcher && elem ) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( ( matcher = setMatchers[ j++ ] ) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {

					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !( unmatched[ i ] || setMatched[ i ] ) ) {
								setMatched[ i ] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {

		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[ i ] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache(
			selector,
			matcherFromGroupMatchers( elementMatchers, setMatchers )
		);

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( ( selector = compiled.selector || selector ) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[ 0 ] = match[ 0 ].slice( 0 );
		if ( tokens.length > 2 && ( token = tokens[ 0 ] ).type === "ID" &&
			context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[ 1 ].type ] ) {

			context = ( Expr.find[ "ID" ]( token.matches[ 0 ]
				.replace( runescape, funescape ), context ) || [] )[ 0 ];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr[ "needsContext" ].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[ i ];

			// Abort if we hit a combinator
			if ( Expr.relative[ ( type = token.type ) ] ) {
				break;
			}
			if ( ( find = Expr.find[ type ] ) ) {

				// Search, expanding context for leading sibling combinators
				if ( ( seed = find(
					token.matches[ 0 ].replace( runescape, funescape ),
					rsibling.test( tokens[ 0 ].type ) && testContext( context.parentNode ) ||
						context
				) ) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split( "" ).sort( sortOrder ).join( "" ) === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert( function( el ) {

	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement( "fieldset" ) ) & 1;
} );

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert( function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute( "href" ) === "#";
} ) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	} );
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert( function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
} ) ) {
	addHandle( "value", function( elem, _name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	} );
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert( function( el ) {
	return el.getAttribute( "disabled" ) == null;
} ) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
				( val = elem.getAttributeNode( name ) ) && val.specified ?
					val.value :
					null;
		}
	} );
}

return Sizzle;

} )( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

	return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

}
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, _i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, _i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, _i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( elem.contentDocument != null &&

			// Support: IE 11+
			// <object> elements with no `data` attribute has an object
			// `contentDocument` with a `null` prototype.
			getProto( elem.contentDocument ) ) {

			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( _i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the primary Deferred
			primary = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						primary.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, primary.done( updateFunc( i ) ).resolve, primary.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( primary.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return primary.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), primary.reject );
		}

		return primary.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, _key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( _all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached( elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// Support: IE <=9 only
	// IE <=9 replaces <option> tags with their contents when inserted outside of
	// the select element.
	div.innerHTML = "<option></option>";
	support.option = !!div.lastChild;
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: IE <=9 only
if ( !support.option ) {
	wrapMap.optgroup = wrapMap.option = [ 1, "<select multiple='multiple'>", "</select>" ];
}


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, attached, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 - 11+
// focus() and blur() are asynchronous, except when they are no-op.
// So expect focus to be synchronous when the element is already active,
// and blur to be synchronous when the element is not already active.
// (focus and blur are always synchronous in other supported browsers,
// this just defines when we can count on it).
function expectSync( elem, type ) {
	return ( elem === safeActiveElement() ) === ( type === "focus" );
}

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Only attach events to objects that accept data
		if ( !acceptData( elem ) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = Object.create( null );
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( nativeEvent ),

			handlers = (
				dataPriv.get( this, "events" ) || Object.create( null )
			)[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// If the event is namespaced, then each handler is only invoked if it is
				// specially universal or its namespaces are a superset of the event's.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
						return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
						return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", returnTrue );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, expectSync ) {

	// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
	if ( !expectSync ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var notAsync, result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				// Saved data should be false in such cases, but might be a leftover capture object
				// from an async native handler (gh-4350)
				if ( !saved.length ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					// Support: IE <=9 - 11+
					// focus() and blur() are asynchronous
					notAsync = expectSync( this, type );
					this[ type ]();
					result = dataPriv.get( this, type );
					if ( saved !== result || notAsync ) {
						dataPriv.set( this, type, false );
					} else {
						result = {};
					}
					if ( saved !== result ) {

						// Cancel the outer synthetic event
						event.stopImmediatePropagation();
						event.preventDefault();

						// Support: Chrome 86+
						// In Chrome, if an element having a focusout handler is blurred by
						// clicking outside of it, it invokes the handler synchronously. If
						// that handler calls `.remove()` on the element, the data is cleared,
						// leaving `result` undefined. We need to guard against this.
						return result && result.value;
					}

				// If this is an inner synthetic event for an event with a bubbling surrogate
				// (focus or blur), assume that the surrogate already propagated from triggering the
				// native event and prevent that from happening again here.
				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
				// less bad than duplication.
				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// If this is a native event triggered above, everything is now in order
			// Fire an inner synthetic event with the original arguments
			} else if ( saved.length ) {

				// ...and capture the result
				dataPriv.set( this, type, {
					value: jQuery.event.trigger(

						// Support: IE <=9 - 11+
						// Extend with the prototype to reset the above stopImmediatePropagation()
						jQuery.extend( saved[ 0 ], jQuery.Event.prototype ),
						saved.slice( 1 ),
						this
					)
				} );

				// Abort handling of the native event
				event.stopImmediatePropagation();
			}
		}
	} );
}

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	code: true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,
	which: true
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {
	jQuery.event.special[ type ] = {

		// Utilize native event if possible so blur/focus sequence is correct
		setup: function() {

			// Claim the first handler
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverageNative( this, type, expectSync );

			// Return false to allow normal processing in the caller
			return false;
		},
		trigger: function() {

			// Force setup before trigger
			leverageNative( this, type );

			// Return non-false to allow normal event-path propagation
			return true;
		},

		// Suppress native focus or blur as it's already being fired
		// in leverageNative.
		_default: function() {
			return true;
		},

		delegateType: delegateType
	};
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.get( src );
		events = pdataOld.events;

		if ( events ) {
			dataPriv.remove( dest, "handle events" );

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = flat( args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce: node.nonce || node.getAttribute( "nonce" )
								}, doc );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html;
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.call( elem );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		// Support: Chrome <=64
		// Don't get tricked when zoom affects offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableTrDimensionsVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		},

		// Support: IE 9 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Behavior in IE 9 is more subtle than in newer versions & it passes
		// some versions of this test; make sure not to make it pass there!
		//
		// Support: Firefox 70+
		// Only Firefox includes border widths
		// in computed dimensions. (gh-4529)
		reliableTrDimensions: function() {
			var table, tr, trChild, trStyle;
			if ( reliableTrDimensionsVal == null ) {
				table = document.createElement( "table" );
				tr = document.createElement( "tr" );
				trChild = document.createElement( "div" );

				table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
				tr.style.cssText = "border:1px solid";

				// Support: Chrome 86+
				// Height set through cssText does not get applied.
				// Computed height then comes back as 0.
				tr.style.height = "1px";
				trChild.style.height = "9px";

				// Support: Android 8 Chrome 86+
				// In our bodyBackground.html iframe,
				// display for all div elements is set to "inline",
				// which causes a problem only in Android 8 Chrome 86.
				// Ensuring the div is display: block
				// gets around this issue.
				trChild.style.display = "block";

				documentElement
					.appendChild( table )
					.appendChild( tr )
					.appendChild( trChild );

				trStyle = window.getComputedStyle( tr );
				reliableTrDimensionsVal = ( parseInt( trStyle.height, 10 ) +
					parseInt( trStyle.borderTopWidth, 10 ) +
					parseInt( trStyle.borderBottomWidth, 10 ) ) === tr.offsetHeight;

				documentElement.removeChild( table );
			}
			return reliableTrDimensionsVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber( _elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}


	// Support: IE 9 - 11 only
	// Use offsetWidth/offsetHeight for when box sizing is unreliable.
	// In those cases, the computed value can be trusted to be border-box.
	if ( ( !support.boxSizingReliable() && isBorderBox ||

		// Support: IE 10 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Interestingly, in some cases IE 9 doesn't suffer from this issue.
		!support.reliableTrDimensions() && nodeName( elem, "tr" ) ||

		// Fall back to offsetWidth/offsetHeight when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		val === "auto" ||

		// Support: Android <=4.1 - 4.3 only
		// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&

		// Make sure the element is visible & connected
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
		// retrieved value as a content box dimension.
		valueIsBorderBox = offsetProp in elem;
		if ( valueIsBorderBox ) {
			val = elem[ offsetProp ];
		}
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"gridArea": true,
		"gridColumn": true,
		"gridColumnEnd": true,
		"gridColumnStart": true,
		"gridRow": true,
		"gridRowEnd": true,
		"gridRowStart": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
			// "px" to a few hardcoded values.
			if ( type === "number" && !isCustomProp ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( _i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
					swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, dimension, extra );
					} ) :
					getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),

				// Only read styles.position if the test has a chance to fail
				// to avoid forcing a reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
				jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

				/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
					animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};

		doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( _i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || Object.create( null ) )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {

				// Handle: regular nodes (via `this.ownerDocument`), window
				// (via `this.document`) & document (via `this`).
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = { guid: Date.now() };

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, parserErrorElem;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {}

	parserErrorElem = xml && xml.getElementsByTagName( "parsererror" )[ 0 ];
	if ( !xml || parserErrorElem ) {
		jQuery.error( "Invalid XML: " + (
			parserErrorElem ?
				jQuery.map( parserErrorElem.childNodes, function( el ) {
					return el.textContent;
				} ).join( "\n" ) :
				data
		) );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} ).filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} ).map( function( _i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );

originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
										.concat( match[ 2 ] );
							}
						}
						match = responseHeaders[ key.toLowerCase() + " " ];
					}
					return match == null ? null : match.join( ", " );
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce.guid++ ) +
					uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Use a noop converter for missing script but not if jsonp
			if ( !isSuccess &&
				jQuery.inArray( "script", s.dataTypes ) > -1 &&
				jQuery.inArray( "json", s.dataTypes ) < 0 ) {
				s.converters[ "text script" ] = function() {};
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( _i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );

jQuery.ajaxPrefilter( function( s ) {
	var i;
	for ( i in s.headers ) {
		if ( i.toLowerCase() === "content-type" ) {
			s.contentType = s.headers[ i ] || "";
		}
	}
} );


jQuery._evalUrl = function( url, options, doc ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			jQuery.globalEval( response, options, doc );
		}
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain or forced-by-attrs requests
	if ( s.crossDomain || s.scriptAttrs ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "load error", callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce.guid++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( _i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( {
		padding: "inner" + name,
		content: type,
		"": "outer" + name
	}, function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( _i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );

jQuery.each(
	( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( _i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	}
);




// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};

jQuery.trim = function( text ) {
	return text == null ?
		"" :
		( text + "" ).replace( rtrim, "" );
};



// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === "undefined" ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

/*!
 * Select2 4.1.0-rc.0
 * https://select2.github.io
 *
 * Released under the MIT license
 * https://github.com/select2/select2/blob/master/LICENSE.md
 */
;(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = function (root, jQuery) {
      if (jQuery === undefined) {
        // require('jQuery') returns a factory that requires window to
        // build a jQuery instance, we normalize how we use modules
        // that require this pattern but the window provided is a noop
        // if it's defined (how jquery works)
        if (typeof window !== 'undefined') {
          jQuery = require('jquery');
        }
        else {
          jQuery = require('jquery')(root);
        }
      }
      factory(jQuery);
      return jQuery;
    };
  } else {
    // Browser globals
    factory(jQuery);
  }
} (function (jQuery) {
  // This is needed so we can catch the AMD loader configuration and use it
  // The inner file should be wrapped (by `banner.start.js`) in a function that
  // returns the AMD loader references.
  var S2 =(function () {
  // Restore the Select2 AMD loader so it can be used
  // Needed mostly in the language files, where the loader is not inserted
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) {
    var S2 = jQuery.fn.select2.amd;
  }
var S2;(function () { if (!S2 || !S2.requirejs) {
if (!S2) { S2 = {}; } else { require = S2; }
/**
 * @license almond 0.3.3 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, http://github.com/requirejs/almond/LICENSE
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice,
        jsSuffixRegExp = /\.js$/;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap, lastIndex,
            foundI, foundStarMap, starI, i, j, part, normalizedBaseParts,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name) {
            name = name.split('/');
            lastIndex = name.length - 1;

            // If wanting node ID compatibility, strip .js from end
            // of IDs. Have to do this here, and not in nameToUrl
            // because node allows either .js or non .js to map
            // to same file.
            if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
            }

            // Starts with a '.' so need the baseName
            if (name[0].charAt(0) === '.' && baseParts) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that 'directory' and not name of the baseName's
                //module. For instance, baseName of 'one/two/three', maps to
                //'one/two/three.js', but we want the directory, 'one/two' for
                //this normalization.
                normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                name = normalizedBaseParts.concat(name);
            }

            //start trimDots
            for (i = 0; i < name.length; i++) {
                part = name[i];
                if (part === '.') {
                    name.splice(i, 1);
                    i -= 1;
                } else if (part === '..') {
                    // If at the start, or previous value is still ..,
                    // keep them so that when converted to a path it may
                    // still work when converted to a path, even though
                    // as an ID it is less than ideal. In larger point
                    // releases, may be better to just kick out an error.
                    if (i === 0 || (i === 1 && name[2] === '..') || name[i - 1] === '..') {
                        continue;
                    } else if (i > 0) {
                        name.splice(i - 1, 2);
                        i -= 2;
                    }
                }
            }
            //end trimDots

            name = name.join('/');
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            var args = aps.call(arguments, 0);

            //If first arg is not require('string'), and there is only
            //one arg, it is the array form without a callback. Insert
            //a null so that the following concat is correct.
            if (typeof args[0] !== 'string' && args.length === 1) {
                args.push(null);
            }
            return req.apply(undef, args.concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    //Creates a parts array for a relName where first part is plugin ID,
    //second part is resource ID. Assumes relName has already been normalized.
    function makeRelParts(relName) {
        return relName ? splitPrefix(relName) : [];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relParts) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0],
            relResourceName = relParts[1];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relResourceName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relResourceName));
            } else {
                name = normalize(name, relResourceName);
            }
        } else {
            name = normalize(name, relResourceName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i, relParts,
            args = [],
            callbackType = typeof callback,
            usingExports;

        //Use name if no relName
        relName = relName || name;
        relParts = makeRelParts(relName);

        //Call the callback to define the module, if necessary.
        if (callbackType === 'undefined' || callbackType === 'function') {
            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relParts);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback ? callback.apply(defined[name], args) : undefined;

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, makeRelParts(callback)).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (config.deps) {
                req(config.deps, config.callback);
            }
            if (!callback) {
                return;
            }

            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 4);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        return req(cfg);
    };

    /**
     * Expose module registry for debugging and tooling
     */
    requirejs._defined = defined;

    define = function (name, deps, callback) {
        if (typeof name !== 'string') {
            throw new Error('See almond README: incorrect module build, no module name');
        }

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());

S2.requirejs = requirejs;S2.require = require;S2.define = define;
}
}());
S2.define("almond", function(){});

/* global jQuery:false, $:false */
S2.define('jquery',[],function () {
  var _$ = jQuery || $;

  if (_$ == null && console && console.error) {
    console.error(
      'Select2: An instance of jQuery or a jQuery-compatible library was not ' +
      'found. Make sure that you are including jQuery before Select2 on your ' +
      'web page.'
    );
  }

  return _$;
});

S2.define('select2/utils',[
  'jquery'
], function ($) {
  var Utils = {};

  Utils.Extend = function (ChildClass, SuperClass) {
    var __hasProp = {}.hasOwnProperty;

    function BaseConstructor () {
      this.constructor = ChildClass;
    }

    for (var key in SuperClass) {
      if (__hasProp.call(SuperClass, key)) {
        ChildClass[key] = SuperClass[key];
      }
    }

    BaseConstructor.prototype = SuperClass.prototype;
    ChildClass.prototype = new BaseConstructor();
    ChildClass.__super__ = SuperClass.prototype;

    return ChildClass;
  };

  function getMethods (theClass) {
    var proto = theClass.prototype;

    var methods = [];

    for (var methodName in proto) {
      var m = proto[methodName];

      if (typeof m !== 'function') {
        continue;
      }

      if (methodName === 'constructor') {
        continue;
      }

      methods.push(methodName);
    }

    return methods;
  }

  Utils.Decorate = function (SuperClass, DecoratorClass) {
    var decoratedMethods = getMethods(DecoratorClass);
    var superMethods = getMethods(SuperClass);

    function DecoratedClass () {
      var unshift = Array.prototype.unshift;

      var argCount = DecoratorClass.prototype.constructor.length;

      var calledConstructor = SuperClass.prototype.constructor;

      if (argCount > 0) {
        unshift.call(arguments, SuperClass.prototype.constructor);

        calledConstructor = DecoratorClass.prototype.constructor;
      }

      calledConstructor.apply(this, arguments);
    }

    DecoratorClass.displayName = SuperClass.displayName;

    function ctr () {
      this.constructor = DecoratedClass;
    }

    DecoratedClass.prototype = new ctr();

    for (var m = 0; m < superMethods.length; m++) {
      var superMethod = superMethods[m];

      DecoratedClass.prototype[superMethod] =
        SuperClass.prototype[superMethod];
    }

    var calledMethod = function (methodName) {
      // Stub out the original method if it's not decorating an actual method
      var originalMethod = function () {};

      if (methodName in DecoratedClass.prototype) {
        originalMethod = DecoratedClass.prototype[methodName];
      }

      var decoratedMethod = DecoratorClass.prototype[methodName];

      return function () {
        var unshift = Array.prototype.unshift;

        unshift.call(arguments, originalMethod);

        return decoratedMethod.apply(this, arguments);
      };
    };

    for (var d = 0; d < decoratedMethods.length; d++) {
      var decoratedMethod = decoratedMethods[d];

      DecoratedClass.prototype[decoratedMethod] = calledMethod(decoratedMethod);
    }

    return DecoratedClass;
  };

  var Observable = function () {
    this.listeners = {};
  };

  Observable.prototype.on = function (event, callback) {
    this.listeners = this.listeners || {};

    if (event in this.listeners) {
      this.listeners[event].push(callback);
    } else {
      this.listeners[event] = [callback];
    }
  };

  Observable.prototype.trigger = function (event) {
    var slice = Array.prototype.slice;
    var params = slice.call(arguments, 1);

    this.listeners = this.listeners || {};

    // Params should always come in as an array
    if (params == null) {
      params = [];
    }

    // If there are no arguments to the event, use a temporary object
    if (params.length === 0) {
      params.push({});
    }

    // Set the `_type` of the first object to the event
    params[0]._type = event;

    if (event in this.listeners) {
      this.invoke(this.listeners[event], slice.call(arguments, 1));
    }

    if ('*' in this.listeners) {
      this.invoke(this.listeners['*'], arguments);
    }
  };

  Observable.prototype.invoke = function (listeners, params) {
    for (var i = 0, len = listeners.length; i < len; i++) {
      listeners[i].apply(this, params);
    }
  };

  Utils.Observable = Observable;

  Utils.generateChars = function (length) {
    var chars = '';

    for (var i = 0; i < length; i++) {
      var randomChar = Math.floor(Math.random() * 36);
      chars += randomChar.toString(36);
    }

    return chars;
  };

  Utils.bind = function (func, context) {
    return function () {
      func.apply(context, arguments);
    };
  };

  Utils._convertData = function (data) {
    for (var originalKey in data) {
      var keys = originalKey.split('-');

      var dataLevel = data;

      if (keys.length === 1) {
        continue;
      }

      for (var k = 0; k < keys.length; k++) {
        var key = keys[k];

        // Lowercase the first letter
        // By default, dash-separated becomes camelCase
        key = key.substring(0, 1).toLowerCase() + key.substring(1);

        if (!(key in dataLevel)) {
          dataLevel[key] = {};
        }

        if (k == keys.length - 1) {
          dataLevel[key] = data[originalKey];
        }

        dataLevel = dataLevel[key];
      }

      delete data[originalKey];
    }

    return data;
  };

  Utils.hasScroll = function (index, el) {
    // Adapted from the function created by @ShadowScripter
    // and adapted by @BillBarry on the Stack Exchange Code Review website.
    // The original code can be found at
    // http://codereview.stackexchange.com/q/13338
    // and was designed to be used with the Sizzle selector engine.

    var $el = $(el);
    var overflowX = el.style.overflowX;
    var overflowY = el.style.overflowY;

    //Check both x and y declarations
    if (overflowX === overflowY &&
        (overflowY === 'hidden' || overflowY === 'visible')) {
      return false;
    }

    if (overflowX === 'scroll' || overflowY === 'scroll') {
      return true;
    }

    return ($el.innerHeight() < el.scrollHeight ||
      $el.innerWidth() < el.scrollWidth);
  };

  Utils.escapeMarkup = function (markup) {
    var replaceMap = {
      '\\': '&#92;',
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '\'': '&#39;',
      '/': '&#47;'
    };

    // Do not try to escape the markup if it's not a string
    if (typeof markup !== 'string') {
      return markup;
    }

    return String(markup).replace(/[&<>"'\/\\]/g, function (match) {
      return replaceMap[match];
    });
  };

  // Cache objects in Utils.__cache instead of $.data (see #4346)
  Utils.__cache = {};

  var id = 0;
  Utils.GetUniqueElementId = function (element) {
    // Get a unique element Id. If element has no id,
    // creates a new unique number, stores it in the id
    // attribute and returns the new id with a prefix.
    // If an id already exists, it simply returns it with a prefix.

    var select2Id = element.getAttribute('data-select2-id');

    if (select2Id != null) {
      return select2Id;
    }

    // If element has id, use it.
    if (element.id) {
      select2Id = 'select2-data-' + element.id;
    } else {
      select2Id = 'select2-data-' + (++id).toString() +
        '-' + Utils.generateChars(4);
    }

    element.setAttribute('data-select2-id', select2Id);

    return select2Id;
  };

  Utils.StoreData = function (element, name, value) {
    // Stores an item in the cache for a specified element.
    // name is the cache key.
    var id = Utils.GetUniqueElementId(element);
    if (!Utils.__cache[id]) {
      Utils.__cache[id] = {};
    }

    Utils.__cache[id][name] = value;
  };

  Utils.GetData = function (element, name) {
    // Retrieves a value from the cache by its key (name)
    // name is optional. If no name specified, return
    // all cache items for the specified element.
    // and for a specified element.
    var id = Utils.GetUniqueElementId(element);
    if (name) {
      if (Utils.__cache[id]) {
        if (Utils.__cache[id][name] != null) {
          return Utils.__cache[id][name];
        }
        return $(element).data(name); // Fallback to HTML5 data attribs.
      }
      return $(element).data(name); // Fallback to HTML5 data attribs.
    } else {
      return Utils.__cache[id];
    }
  };

  Utils.RemoveData = function (element) {
    // Removes all cached items for a specified element.
    var id = Utils.GetUniqueElementId(element);
    if (Utils.__cache[id] != null) {
      delete Utils.__cache[id];
    }

    element.removeAttribute('data-select2-id');
  };

  Utils.copyNonInternalCssClasses = function (dest, src) {
    var classes;

    var destinationClasses = dest.getAttribute('class').trim().split(/\s+/);

    destinationClasses = destinationClasses.filter(function (clazz) {
      // Save all Select2 classes
      return clazz.indexOf('select2-') === 0;
    });

    var sourceClasses = src.getAttribute('class').trim().split(/\s+/);

    sourceClasses = sourceClasses.filter(function (clazz) {
      // Only copy non-Select2 classes
      return clazz.indexOf('select2-') !== 0;
    });

    var replacements = destinationClasses.concat(sourceClasses);

    dest.setAttribute('class', replacements.join(' '));
  };

  return Utils;
});

S2.define('select2/results',[
  'jquery',
  './utils'
], function ($, Utils) {
  function Results ($element, options, dataAdapter) {
    this.$element = $element;
    this.data = dataAdapter;
    this.options = options;

    Results.__super__.constructor.call(this);
  }

  Utils.Extend(Results, Utils.Observable);

  Results.prototype.render = function () {
    var $results = $(
      '<ul class="select2-results__options" role="listbox"></ul>'
    );

    if (this.options.get('multiple')) {
      $results.attr('aria-multiselectable', 'true');
    }

    this.$results = $results;

    return $results;
  };

  Results.prototype.clear = function () {
    this.$results.empty();
  };

  Results.prototype.displayMessage = function (params) {
    var escapeMarkup = this.options.get('escapeMarkup');

    this.clear();
    this.hideLoading();

    var $message = $(
      '<li role="alert" aria-live="assertive"' +
      ' class="select2-results__option"></li>'
    );

    var message = this.options.get('translations').get(params.message);

    $message.append(
      escapeMarkup(
        message(params.args)
      )
    );

    $message[0].className += ' select2-results__message';

    this.$results.append($message);
  };

  Results.prototype.hideMessages = function () {
    this.$results.find('.select2-results__message').remove();
  };

  Results.prototype.append = function (data) {
    this.hideLoading();

    var $options = [];

    if (data.results == null || data.results.length === 0) {
      if (this.$results.children().length === 0) {
        this.trigger('results:message', {
          message: 'noResults'
        });
      }

      return;
    }

    data.results = this.sort(data.results);

    for (var d = 0; d < data.results.length; d++) {
      var item = data.results[d];

      var $option = this.option(item);

      $options.push($option);
    }

    this.$results.append($options);
  };

  Results.prototype.position = function ($results, $dropdown) {
    var $resultsContainer = $dropdown.find('.select2-results');
    $resultsContainer.append($results);
  };

  Results.prototype.sort = function (data) {
    var sorter = this.options.get('sorter');

    return sorter(data);
  };

  Results.prototype.highlightFirstItem = function () {
    var $options = this.$results
      .find('.select2-results__option--selectable');

    var $selected = $options.filter('.select2-results__option--selected');

    // Check if there are any selected options
    if ($selected.length > 0) {
      // If there are selected options, highlight the first
      $selected.first().trigger('mouseenter');
    } else {
      // If there are no selected options, highlight the first option
      // in the dropdown
      $options.first().trigger('mouseenter');
    }

    this.ensureHighlightVisible();
  };

  Results.prototype.setClasses = function () {
    var self = this;

    this.data.current(function (selected) {
      var selectedIds = selected.map(function (s) {
        return s.id.toString();
      });

      var $options = self.$results
        .find('.select2-results__option--selectable');

      $options.each(function () {
        var $option = $(this);

        var item = Utils.GetData(this, 'data');

        // id needs to be converted to a string when comparing
        var id = '' + item.id;

        if ((item.element != null && item.element.selected) ||
            (item.element == null && selectedIds.indexOf(id) > -1)) {
          this.classList.add('select2-results__option--selected');
          $option.attr('aria-selected', 'true');
        } else {
          this.classList.remove('select2-results__option--selected');
          $option.attr('aria-selected', 'false');
        }
      });

    });
  };

  Results.prototype.showLoading = function (params) {
    this.hideLoading();

    var loadingMore = this.options.get('translations').get('searching');

    var loading = {
      disabled: true,
      loading: true,
      text: loadingMore(params)
    };
    var $loading = this.option(loading);
    $loading.className += ' loading-results';

    this.$results.prepend($loading);
  };

  Results.prototype.hideLoading = function () {
    this.$results.find('.loading-results').remove();
  };

  Results.prototype.option = function (data) {
    var option = document.createElement('li');
    option.classList.add('select2-results__option');
    option.classList.add('select2-results__option--selectable');

    var attrs = {
      'role': 'option'
    };

    var matches = window.Element.prototype.matches ||
      window.Element.prototype.msMatchesSelector ||
      window.Element.prototype.webkitMatchesSelector;

    if ((data.element != null && matches.call(data.element, ':disabled')) ||
        (data.element == null && data.disabled)) {
      attrs['aria-disabled'] = 'true';

      option.classList.remove('select2-results__option--selectable');
      option.classList.add('select2-results__option--disabled');
    }

    if (data.id == null) {
      option.classList.remove('select2-results__option--selectable');
    }

    if (data._resultId != null) {
      option.id = data._resultId;
    }

    if (data.title) {
      option.title = data.title;
    }

    if (data.children) {
      attrs.role = 'group';
      attrs['aria-label'] = data.text;

      option.classList.remove('select2-results__option--selectable');
      option.classList.add('select2-results__option--group');
    }

    for (var attr in attrs) {
      var val = attrs[attr];

      option.setAttribute(attr, val);
    }

    if (data.children) {
      var $option = $(option);

      var label = document.createElement('strong');
      label.className = 'select2-results__group';

      this.template(data, label);

      var $children = [];

      for (var c = 0; c < data.children.length; c++) {
        var child = data.children[c];

        var $child = this.option(child);

        $children.push($child);
      }

      var $childrenContainer = $('<ul></ul>', {
        'class': 'select2-results__options select2-results__options--nested',
        'role': 'none'
      });

      $childrenContainer.append($children);

      $option.append(label);
      $option.append($childrenContainer);
    } else {
      this.template(data, option);
    }

    Utils.StoreData(option, 'data', data);

    return option;
  };

  Results.prototype.bind = function (container, $container) {
    var self = this;

    var id = container.id + '-results';

    this.$results.attr('id', id);

    container.on('results:all', function (params) {
      self.clear();
      self.append(params.data);

      if (container.isOpen()) {
        self.setClasses();
        self.highlightFirstItem();
      }
    });

    container.on('results:append', function (params) {
      self.append(params.data);

      if (container.isOpen()) {
        self.setClasses();
      }
    });

    container.on('query', function (params) {
      self.hideMessages();
      self.showLoading(params);
    });

    container.on('select', function () {
      if (!container.isOpen()) {
        return;
      }

      self.setClasses();

      if (self.options.get('scrollAfterSelect')) {
        self.highlightFirstItem();
      }
    });

    container.on('unselect', function () {
      if (!container.isOpen()) {
        return;
      }

      self.setClasses();

      if (self.options.get('scrollAfterSelect')) {
        self.highlightFirstItem();
      }
    });

    container.on('open', function () {
      // When the dropdown is open, aria-expended="true"
      self.$results.attr('aria-expanded', 'true');
      self.$results.attr('aria-hidden', 'false');

      self.setClasses();
      self.ensureHighlightVisible();
    });

    container.on('close', function () {
      // When the dropdown is closed, aria-expended="false"
      self.$results.attr('aria-expanded', 'false');
      self.$results.attr('aria-hidden', 'true');
      self.$results.removeAttr('aria-activedescendant');
    });

    container.on('results:toggle', function () {
      var $highlighted = self.getHighlightedResults();

      if ($highlighted.length === 0) {
        return;
      }

      $highlighted.trigger('mouseup');
    });

    container.on('results:select', function () {
      var $highlighted = self.getHighlightedResults();

      if ($highlighted.length === 0) {
        return;
      }

      var data = Utils.GetData($highlighted[0], 'data');

      if ($highlighted.hasClass('select2-results__option--selected')) {
        self.trigger('close', {});
      } else {
        self.trigger('select', {
          data: data
        });
      }
    });

    container.on('results:previous', function () {
      var $highlighted = self.getHighlightedResults();

      var $options = self.$results.find('.select2-results__option--selectable');

      var currentIndex = $options.index($highlighted);

      // If we are already at the top, don't move further
      // If no options, currentIndex will be -1
      if (currentIndex <= 0) {
        return;
      }

      var nextIndex = currentIndex - 1;

      // If none are highlighted, highlight the first
      if ($highlighted.length === 0) {
        nextIndex = 0;
      }

      var $next = $options.eq(nextIndex);

      $next.trigger('mouseenter');

      var currentOffset = self.$results.offset().top;
      var nextTop = $next.offset().top;
      var nextOffset = self.$results.scrollTop() + (nextTop - currentOffset);

      if (nextIndex === 0) {
        self.$results.scrollTop(0);
      } else if (nextTop - currentOffset < 0) {
        self.$results.scrollTop(nextOffset);
      }
    });

    container.on('results:next', function () {
      var $highlighted = self.getHighlightedResults();

      var $options = self.$results.find('.select2-results__option--selectable');

      var currentIndex = $options.index($highlighted);

      var nextIndex = currentIndex + 1;

      // If we are at the last option, stay there
      if (nextIndex >= $options.length) {
        return;
      }

      var $next = $options.eq(nextIndex);

      $next.trigger('mouseenter');

      var currentOffset = self.$results.offset().top +
        self.$results.outerHeight(false);
      var nextBottom = $next.offset().top + $next.outerHeight(false);
      var nextOffset = self.$results.scrollTop() + nextBottom - currentOffset;

      if (nextIndex === 0) {
        self.$results.scrollTop(0);
      } else if (nextBottom > currentOffset) {
        self.$results.scrollTop(nextOffset);
      }
    });

    container.on('results:focus', function (params) {
      params.element[0].classList.add('select2-results__option--highlighted');
      params.element[0].setAttribute('aria-selected', 'true');
    });

    container.on('results:message', function (params) {
      self.displayMessage(params);
    });

    if ($.fn.mousewheel) {
      this.$results.on('mousewheel', function (e) {
        var top = self.$results.scrollTop();

        var bottom = self.$results.get(0).scrollHeight - top + e.deltaY;

        var isAtTop = e.deltaY > 0 && top - e.deltaY <= 0;
        var isAtBottom = e.deltaY < 0 && bottom <= self.$results.height();

        if (isAtTop) {
          self.$results.scrollTop(0);

          e.preventDefault();
          e.stopPropagation();
        } else if (isAtBottom) {
          self.$results.scrollTop(
            self.$results.get(0).scrollHeight - self.$results.height()
          );

          e.preventDefault();
          e.stopPropagation();
        }
      });
    }

    this.$results.on('mouseup', '.select2-results__option--selectable',
      function (evt) {
      var $this = $(this);

      var data = Utils.GetData(this, 'data');

      if ($this.hasClass('select2-results__option--selected')) {
        if (self.options.get('multiple')) {
          self.trigger('unselect', {
            originalEvent: evt,
            data: data
          });
        } else {
          self.trigger('close', {});
        }

        return;
      }

      self.trigger('select', {
        originalEvent: evt,
        data: data
      });
    });

    this.$results.on('mouseenter', '.select2-results__option--selectable',
      function (evt) {
      var data = Utils.GetData(this, 'data');

      self.getHighlightedResults()
          .removeClass('select2-results__option--highlighted')
          .attr('aria-selected', 'false');

      self.trigger('results:focus', {
        data: data,
        element: $(this)
      });
    });
  };

  Results.prototype.getHighlightedResults = function () {
    var $highlighted = this.$results
    .find('.select2-results__option--highlighted');

    return $highlighted;
  };

  Results.prototype.destroy = function () {
    this.$results.remove();
  };

  Results.prototype.ensureHighlightVisible = function () {
    var $highlighted = this.getHighlightedResults();

    if ($highlighted.length === 0) {
      return;
    }

    var $options = this.$results.find('.select2-results__option--selectable');

    var currentIndex = $options.index($highlighted);

    var currentOffset = this.$results.offset().top;
    var nextTop = $highlighted.offset().top;
    var nextOffset = this.$results.scrollTop() + (nextTop - currentOffset);

    var offsetDelta = nextTop - currentOffset;
    nextOffset -= $highlighted.outerHeight(false) * 2;

    if (currentIndex <= 2) {
      this.$results.scrollTop(0);
    } else if (offsetDelta > this.$results.outerHeight() || offsetDelta < 0) {
      this.$results.scrollTop(nextOffset);
    }
  };

  Results.prototype.template = function (result, container) {
    var template = this.options.get('templateResult');
    var escapeMarkup = this.options.get('escapeMarkup');

    var content = template(result, container);

    if (content == null) {
      container.style.display = 'none';
    } else if (typeof content === 'string') {
      container.innerHTML = escapeMarkup(content);
    } else {
      $(container).append(content);
    }
  };

  return Results;
});

S2.define('select2/keys',[

], function () {
  var KEYS = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    ESC: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    DELETE: 46
  };

  return KEYS;
});

S2.define('select2/selection/base',[
  'jquery',
  '../utils',
  '../keys'
], function ($, Utils, KEYS) {
  function BaseSelection ($element, options) {
    this.$element = $element;
    this.options = options;

    BaseSelection.__super__.constructor.call(this);
  }

  Utils.Extend(BaseSelection, Utils.Observable);

  BaseSelection.prototype.render = function () {
    var $selection = $(
      '<span class="select2-selection" role="combobox" ' +
      ' aria-haspopup="true" aria-expanded="false">' +
      '</span>'
    );

    this._tabindex = 0;

    if (Utils.GetData(this.$element[0], 'old-tabindex') != null) {
      this._tabindex = Utils.GetData(this.$element[0], 'old-tabindex');
    } else if (this.$element.attr('tabindex') != null) {
      this._tabindex = this.$element.attr('tabindex');
    }

    $selection.attr('title', this.$element.attr('title'));
    $selection.attr('tabindex', this._tabindex);
    $selection.attr('aria-disabled', 'false');

    this.$selection = $selection;

    return $selection;
  };

  BaseSelection.prototype.bind = function (container, $container) {
    var self = this;

    var resultsId = container.id + '-results';

    this.container = container;

    this.$selection.on('focus', function (evt) {
      self.trigger('focus', evt);
    });

    this.$selection.on('blur', function (evt) {
      self._handleBlur(evt);
    });

    this.$selection.on('keydown', function (evt) {
      self.trigger('keypress', evt);

      if (evt.which === KEYS.SPACE) {
        evt.preventDefault();
      }
    });

    container.on('results:focus', function (params) {
      self.$selection.attr('aria-activedescendant', params.data._resultId);
    });

    container.on('selection:update', function (params) {
      self.update(params.data);
    });

    container.on('open', function () {
      // When the dropdown is open, aria-expanded="true"
      self.$selection.attr('aria-expanded', 'true');
      self.$selection.attr('aria-owns', resultsId);

      self._attachCloseHandler(container);
    });

    container.on('close', function () {
      // When the dropdown is closed, aria-expanded="false"
      self.$selection.attr('aria-expanded', 'false');
      self.$selection.removeAttr('aria-activedescendant');
      self.$selection.removeAttr('aria-owns');

      self.$selection.trigger('focus');

      self._detachCloseHandler(container);
    });

    container.on('enable', function () {
      self.$selection.attr('tabindex', self._tabindex);
      self.$selection.attr('aria-disabled', 'false');
    });

    container.on('disable', function () {
      self.$selection.attr('tabindex', '-1');
      self.$selection.attr('aria-disabled', 'true');
    });
  };

  BaseSelection.prototype._handleBlur = function (evt) {
    var self = this;

    // This needs to be delayed as the active element is the body when the tab
    // key is pressed, possibly along with others.
    window.setTimeout(function () {
      // Don't trigger `blur` if the focus is still in the selection
      if (
        (document.activeElement == self.$selection[0]) ||
        ($.contains(self.$selection[0], document.activeElement))
      ) {
        return;
      }

      self.trigger('blur', evt);
    }, 1);
  };

  BaseSelection.prototype._attachCloseHandler = function (container) {

    $(document.body).on('mousedown.select2.' + container.id, function (e) {
      var $target = $(e.target);

      var $select = $target.closest('.select2');

      var $all = $('.select2.select2-container--open');

      $all.each(function () {
        if (this == $select[0]) {
          return;
        }

        var $element = Utils.GetData(this, 'element');

        $element.select2('close');
      });
    });
  };

  BaseSelection.prototype._detachCloseHandler = function (container) {
    $(document.body).off('mousedown.select2.' + container.id);
  };

  BaseSelection.prototype.position = function ($selection, $container) {
    var $selectionContainer = $container.find('.selection');
    $selectionContainer.append($selection);
  };

  BaseSelection.prototype.destroy = function () {
    this._detachCloseHandler(this.container);
  };

  BaseSelection.prototype.update = function (data) {
    throw new Error('The `update` method must be defined in child classes.');
  };

  /**
   * Helper method to abstract the "enabled" (not "disabled") state of this
   * object.
   *
   * @return {true} if the instance is not disabled.
   * @return {false} if the instance is disabled.
   */
  BaseSelection.prototype.isEnabled = function () {
    return !this.isDisabled();
  };

  /**
   * Helper method to abstract the "disabled" state of this object.
   *
   * @return {true} if the disabled option is true.
   * @return {false} if the disabled option is false.
   */
  BaseSelection.prototype.isDisabled = function () {
    return this.options.get('disabled');
  };

  return BaseSelection;
});

S2.define('select2/selection/single',[
  'jquery',
  './base',
  '../utils',
  '../keys'
], function ($, BaseSelection, Utils, KEYS) {
  function SingleSelection () {
    SingleSelection.__super__.constructor.apply(this, arguments);
  }

  Utils.Extend(SingleSelection, BaseSelection);

  SingleSelection.prototype.render = function () {
    var $selection = SingleSelection.__super__.render.call(this);

    $selection[0].classList.add('select2-selection--single');

    $selection.html(
      '<span class="select2-selection__rendered"></span>' +
      '<span class="select2-selection__arrow" role="presentation">' +
        '<b role="presentation"></b>' +
      '</span>'
    );

    return $selection;
  };

  SingleSelection.prototype.bind = function (container, $container) {
    var self = this;

    SingleSelection.__super__.bind.apply(this, arguments);

    var id = container.id + '-container';

    this.$selection.find('.select2-selection__rendered')
      .attr('id', id)
      .attr('role', 'textbox')
      .attr('aria-readonly', 'true');
    this.$selection.attr('aria-labelledby', id);
    this.$selection.attr('aria-controls', id);

    this.$selection.on('mousedown', function (evt) {
      // Only respond to left clicks
      if (evt.which !== 1) {
        return;
      }

      self.trigger('toggle', {
        originalEvent: evt
      });
    });

    this.$selection.on('focus', function (evt) {
      // User focuses on the container
    });

    this.$selection.on('blur', function (evt) {
      // User exits the container
    });

    container.on('focus', function (evt) {
      if (!container.isOpen()) {
        self.$selection.trigger('focus');
      }
    });
  };

  SingleSelection.prototype.clear = function () {
    var $rendered = this.$selection.find('.select2-selection__rendered');
    $rendered.empty();
    $rendered.removeAttr('title'); // clear tooltip on empty
  };

  SingleSelection.prototype.display = function (data, container) {
    var template = this.options.get('templateSelection');
    var escapeMarkup = this.options.get('escapeMarkup');

    return escapeMarkup(template(data, container));
  };

  SingleSelection.prototype.selectionContainer = function () {
    return $('<span></span>');
  };

  SingleSelection.prototype.update = function (data) {
    if (data.length === 0) {
      this.clear();
      return;
    }

    var selection = data[0];

    var $rendered = this.$selection.find('.select2-selection__rendered');
    var formatted = this.display(selection, $rendered);

    $rendered.empty().append(formatted);

    var title = selection.title || selection.text;

    if (title) {
      $rendered.attr('title', title);
    } else {
      $rendered.removeAttr('title');
    }
  };

  return SingleSelection;
});

S2.define('select2/selection/multiple',[
  'jquery',
  './base',
  '../utils'
], function ($, BaseSelection, Utils) {
  function MultipleSelection ($element, options) {
    MultipleSelection.__super__.constructor.apply(this, arguments);
  }

  Utils.Extend(MultipleSelection, BaseSelection);

  MultipleSelection.prototype.render = function () {
    var $selection = MultipleSelection.__super__.render.call(this);

    $selection[0].classList.add('select2-selection--multiple');

    $selection.html(
      '<ul class="select2-selection__rendered"></ul>'
    );

    return $selection;
  };

  MultipleSelection.prototype.bind = function (container, $container) {
    var self = this;

    MultipleSelection.__super__.bind.apply(this, arguments);

    var id = container.id + '-container';
    this.$selection.find('.select2-selection__rendered').attr('id', id);

    this.$selection.on('click', function (evt) {
      self.trigger('toggle', {
        originalEvent: evt
      });
    });

    this.$selection.on(
      'click',
      '.select2-selection__choice__remove',
      function (evt) {
        // Ignore the event if it is disabled
        if (self.isDisabled()) {
          return;
        }

        var $remove = $(this);
        var $selection = $remove.parent();

        var data = Utils.GetData($selection[0], 'data');

        self.trigger('unselect', {
          originalEvent: evt,
          data: data
        });
      }
    );

    this.$selection.on(
      'keydown',
      '.select2-selection__choice__remove',
      function (evt) {
        // Ignore the event if it is disabled
        if (self.isDisabled()) {
          return;
        }

        evt.stopPropagation();
      }
    );
  };

  MultipleSelection.prototype.clear = function () {
    var $rendered = this.$selection.find('.select2-selection__rendered');
    $rendered.empty();
    $rendered.removeAttr('title');
  };

  MultipleSelection.prototype.display = function (data, container) {
    var template = this.options.get('templateSelection');
    var escapeMarkup = this.options.get('escapeMarkup');

    return escapeMarkup(template(data, container));
  };

  MultipleSelection.prototype.selectionContainer = function () {
    var $container = $(
      '<li class="select2-selection__choice">' +
        '<button type="button" class="select2-selection__choice__remove" ' +
        'tabindex="-1">' +
          '<span aria-hidden="true">&times;</span>' +
        '</button>' +
        '<span class="select2-selection__choice__display"></span>' +
      '</li>'
    );

    return $container;
  };

  MultipleSelection.prototype.update = function (data) {
    this.clear();

    if (data.length === 0) {
      return;
    }

    var $selections = [];

    var selectionIdPrefix = this.$selection.find('.select2-selection__rendered')
      .attr('id') + '-choice-';

    for (var d = 0; d < data.length; d++) {
      var selection = data[d];

      var $selection = this.selectionContainer();
      var formatted = this.display(selection, $selection);

      var selectionId = selectionIdPrefix + Utils.generateChars(4) + '-';

      if (selection.id) {
        selectionId += selection.id;
      } else {
        selectionId += Utils.generateChars(4);
      }

      $selection.find('.select2-selection__choice__display')
        .append(formatted)
        .attr('id', selectionId);

      var title = selection.title || selection.text;

      if (title) {
        $selection.attr('title', title);
      }

      var removeItem = this.options.get('translations').get('removeItem');

      var $remove = $selection.find('.select2-selection__choice__remove');

      $remove.attr('title', removeItem());
      $remove.attr('aria-label', removeItem());
      $remove.attr('aria-describedby', selectionId);

      Utils.StoreData($selection[0], 'data', selection);

      $selections.push($selection);
    }

    var $rendered = this.$selection.find('.select2-selection__rendered');

    $rendered.append($selections);
  };

  return MultipleSelection;
});

S2.define('select2/selection/placeholder',[

], function () {
  function Placeholder (decorated, $element, options) {
    this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

    decorated.call(this, $element, options);
  }

  Placeholder.prototype.normalizePlaceholder = function (_, placeholder) {
    if (typeof placeholder === 'string') {
      placeholder = {
        id: '',
        text: placeholder
      };
    }

    return placeholder;
  };

  Placeholder.prototype.createPlaceholder = function (decorated, placeholder) {
    var $placeholder = this.selectionContainer();

    $placeholder.html(this.display(placeholder));
    $placeholder[0].classList.add('select2-selection__placeholder');
    $placeholder[0].classList.remove('select2-selection__choice');

    var placeholderTitle = placeholder.title ||
      placeholder.text ||
      $placeholder.text();

    this.$selection.find('.select2-selection__rendered').attr(
      'title',
      placeholderTitle
    );

    return $placeholder;
  };

  Placeholder.prototype.update = function (decorated, data) {
    var singlePlaceholder = (
      data.length == 1 && data[0].id != this.placeholder.id
    );
    var multipleSelections = data.length > 1;

    if (multipleSelections || singlePlaceholder) {
      return decorated.call(this, data);
    }

    this.clear();

    var $placeholder = this.createPlaceholder(this.placeholder);

    this.$selection.find('.select2-selection__rendered').append($placeholder);
  };

  return Placeholder;
});

S2.define('select2/selection/allowClear',[
  'jquery',
  '../keys',
  '../utils'
], function ($, KEYS, Utils) {
  function AllowClear () { }

  AllowClear.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    if (this.placeholder == null) {
      if (this.options.get('debug') && window.console && console.error) {
        console.error(
          'Select2: The `allowClear` option should be used in combination ' +
          'with the `placeholder` option.'
        );
      }
    }

    this.$selection.on('mousedown', '.select2-selection__clear',
      function (evt) {
        self._handleClear(evt);
    });

    container.on('keypress', function (evt) {
      self._handleKeyboardClear(evt, container);
    });
  };

  AllowClear.prototype._handleClear = function (_, evt) {
    // Ignore the event if it is disabled
    if (this.isDisabled()) {
      return;
    }

    var $clear = this.$selection.find('.select2-selection__clear');

    // Ignore the event if nothing has been selected
    if ($clear.length === 0) {
      return;
    }

    evt.stopPropagation();

    var data = Utils.GetData($clear[0], 'data');

    var previousVal = this.$element.val();
    this.$element.val(this.placeholder.id);

    var unselectData = {
      data: data
    };
    this.trigger('clear', unselectData);
    if (unselectData.prevented) {
      this.$element.val(previousVal);
      return;
    }

    for (var d = 0; d < data.length; d++) {
      unselectData = {
        data: data[d]
      };

      // Trigger the `unselect` event, so people can prevent it from being
      // cleared.
      this.trigger('unselect', unselectData);

      // If the event was prevented, don't clear it out.
      if (unselectData.prevented) {
        this.$element.val(previousVal);
        return;
      }
    }

    this.$element.trigger('input').trigger('change');

    this.trigger('toggle', {});
  };

  AllowClear.prototype._handleKeyboardClear = function (_, evt, container) {
    if (container.isOpen()) {
      return;
    }

    if (evt.which == KEYS.DELETE || evt.which == KEYS.BACKSPACE) {
      this._handleClear(evt);
    }
  };

  AllowClear.prototype.update = function (decorated, data) {
    decorated.call(this, data);

    this.$selection.find('.select2-selection__clear').remove();
    this.$selection[0].classList.remove('select2-selection--clearable');

    if (this.$selection.find('.select2-selection__placeholder').length > 0 ||
        data.length === 0) {
      return;
    }

    var selectionId = this.$selection.find('.select2-selection__rendered')
      .attr('id');

    var removeAll = this.options.get('translations').get('removeAllItems');

    var $remove = $(
      '<button type="button" class="select2-selection__clear" tabindex="-1">' +
        '<span aria-hidden="true">&times;</span>' +
      '</button>'
    );
    $remove.attr('title', removeAll());
    $remove.attr('aria-label', removeAll());
    $remove.attr('aria-describedby', selectionId);
    Utils.StoreData($remove[0], 'data', data);

    this.$selection.prepend($remove);
    this.$selection[0].classList.add('select2-selection--clearable');
  };

  return AllowClear;
});

S2.define('select2/selection/search',[
  'jquery',
  '../utils',
  '../keys'
], function ($, Utils, KEYS) {
  function Search (decorated, $element, options) {
    decorated.call(this, $element, options);
  }

  Search.prototype.render = function (decorated) {
    var searchLabel = this.options.get('translations').get('search');
    var $search = $(
      '<span class="select2-search select2-search--inline">' +
        '<textarea class="select2-search__field"'+
        ' type="search" tabindex="-1"' +
        ' autocorrect="off" autocapitalize="none"' +
        ' spellcheck="false" role="searchbox" aria-autocomplete="list" >' +
        '</textarea>' +
      '</span>'
    );

    this.$searchContainer = $search;
    this.$search = $search.find('textarea');

    this.$search.prop('autocomplete', this.options.get('autocomplete'));
    this.$search.attr('aria-label', searchLabel());

    var $rendered = decorated.call(this);

    this._transferTabIndex();
    $rendered.append(this.$searchContainer);

    return $rendered;
  };

  Search.prototype.bind = function (decorated, container, $container) {
    var self = this;

    var resultsId = container.id + '-results';
    var selectionId = container.id + '-container';

    decorated.call(this, container, $container);

    self.$search.attr('aria-describedby', selectionId);

    container.on('open', function () {
      self.$search.attr('aria-controls', resultsId);
      self.$search.trigger('focus');
    });

    container.on('close', function () {
      self.$search.val('');
      self.resizeSearch();
      self.$search.removeAttr('aria-controls');
      self.$search.removeAttr('aria-activedescendant');
      self.$search.trigger('focus');
    });

    container.on('enable', function () {
      self.$search.prop('disabled', false);

      self._transferTabIndex();
    });

    container.on('disable', function () {
      self.$search.prop('disabled', true);
    });

    container.on('focus', function (evt) {
      self.$search.trigger('focus');
    });

    container.on('results:focus', function (params) {
      if (params.data._resultId) {
        self.$search.attr('aria-activedescendant', params.data._resultId);
      } else {
        self.$search.removeAttr('aria-activedescendant');
      }
    });

    this.$selection.on('focusin', '.select2-search--inline', function (evt) {
      self.trigger('focus', evt);
    });

    this.$selection.on('focusout', '.select2-search--inline', function (evt) {
      self._handleBlur(evt);
    });

    this.$selection.on('keydown', '.select2-search--inline', function (evt) {
      evt.stopPropagation();

      self.trigger('keypress', evt);

      self._keyUpPrevented = evt.isDefaultPrevented();

      var key = evt.which;

      if (key === KEYS.BACKSPACE && self.$search.val() === '') {
        var $previousChoice = self.$selection
          .find('.select2-selection__choice').last();

        if ($previousChoice.length > 0) {
          var item = Utils.GetData($previousChoice[0], 'data');

          self.searchRemoveChoice(item);

          evt.preventDefault();
        }
      }
    });

    this.$selection.on('click', '.select2-search--inline', function (evt) {
      if (self.$search.val()) {
        evt.stopPropagation();
      }
    });

    // Try to detect the IE version should the `documentMode` property that
    // is stored on the document. This is only implemented in IE and is
    // slightly cleaner than doing a user agent check.
    // This property is not available in Edge, but Edge also doesn't have
    // this bug.
    var msie = document.documentMode;
    var disableInputEvents = msie && msie <= 11;

    // Workaround for browsers which do not support the `input` event
    // This will prevent double-triggering of events for browsers which support
    // both the `keyup` and `input` events.
    this.$selection.on(
      'input.searchcheck',
      '.select2-search--inline',
      function (evt) {
        // IE will trigger the `input` event when a placeholder is used on a
        // search box. To get around this issue, we are forced to ignore all
        // `input` events in IE and keep using `keyup`.
        if (disableInputEvents) {
          self.$selection.off('input.search input.searchcheck');
          return;
        }

        // Unbind the duplicated `keyup` event
        self.$selection.off('keyup.search');
      }
    );

    this.$selection.on(
      'keyup.search input.search',
      '.select2-search--inline',
      function (evt) {
        // IE will trigger the `input` event when a placeholder is used on a
        // search box. To get around this issue, we are forced to ignore all
        // `input` events in IE and keep using `keyup`.
        if (disableInputEvents && evt.type === 'input') {
          self.$selection.off('input.search input.searchcheck');
          return;
        }

        var key = evt.which;

        // We can freely ignore events from modifier keys
        if (key == KEYS.SHIFT || key == KEYS.CTRL || key == KEYS.ALT) {
          return;
        }

        // Tabbing will be handled during the `keydown` phase
        if (key == KEYS.TAB) {
          return;
        }

        self.handleSearch(evt);
      }
    );
  };

  /**
   * This method will transfer the tabindex attribute from the rendered
   * selection to the search box. This allows for the search box to be used as
   * the primary focus instead of the selection container.
   *
   * @private
   */
  Search.prototype._transferTabIndex = function (decorated) {
    this.$search.attr('tabindex', this.$selection.attr('tabindex'));
    this.$selection.attr('tabindex', '-1');
  };

  Search.prototype.createPlaceholder = function (decorated, placeholder) {
    this.$search.attr('placeholder', placeholder.text);
  };

  Search.prototype.update = function (decorated, data) {
    var searchHadFocus = this.$search[0] == document.activeElement;

    this.$search.attr('placeholder', '');

    decorated.call(this, data);

    this.resizeSearch();
    if (searchHadFocus) {
      this.$search.trigger('focus');
    }
  };

  Search.prototype.handleSearch = function () {
    this.resizeSearch();

    if (!this._keyUpPrevented) {
      var input = this.$search.val();

      this.trigger('query', {
        term: input
      });
    }

    this._keyUpPrevented = false;
  };

  Search.prototype.searchRemoveChoice = function (decorated, item) {
    this.trigger('unselect', {
      data: item
    });

    this.$search.val(item.text);
    this.handleSearch();
  };

  Search.prototype.resizeSearch = function () {
    this.$search.css('width', '25px');

    var width = '100%';

    if (this.$search.attr('placeholder') === '') {
      var minimumWidth = this.$search.val().length + 1;

      width = (minimumWidth * 0.75) + 'em';
    }

    this.$search.css('width', width);
  };

  return Search;
});

S2.define('select2/selection/selectionCss',[
  '../utils'
], function (Utils) {
  function SelectionCSS () { }

  SelectionCSS.prototype.render = function (decorated) {
    var $selection = decorated.call(this);

    var selectionCssClass = this.options.get('selectionCssClass') || '';

    if (selectionCssClass.indexOf(':all:') !== -1) {
      selectionCssClass = selectionCssClass.replace(':all:', '');

      Utils.copyNonInternalCssClasses($selection[0], this.$element[0]);
    }

    $selection.addClass(selectionCssClass);

    return $selection;
  };

  return SelectionCSS;
});

S2.define('select2/selection/eventRelay',[
  'jquery'
], function ($) {
  function EventRelay () { }

  EventRelay.prototype.bind = function (decorated, container, $container) {
    var self = this;
    var relayEvents = [
      'open', 'opening',
      'close', 'closing',
      'select', 'selecting',
      'unselect', 'unselecting',
      'clear', 'clearing'
    ];

    var preventableEvents = [
      'opening', 'closing', 'selecting', 'unselecting', 'clearing'
    ];

    decorated.call(this, container, $container);

    container.on('*', function (name, params) {
      // Ignore events that should not be relayed
      if (relayEvents.indexOf(name) === -1) {
        return;
      }

      // The parameters should always be an object
      params = params || {};

      // Generate the jQuery event for the Select2 event
      var evt = $.Event('select2:' + name, {
        params: params
      });

      self.$element.trigger(evt);

      // Only handle preventable events if it was one
      if (preventableEvents.indexOf(name) === -1) {
        return;
      }

      params.prevented = evt.isDefaultPrevented();
    });
  };

  return EventRelay;
});

S2.define('select2/translation',[
  'jquery',
  'require'
], function ($, require) {
  function Translation (dict) {
    this.dict = dict || {};
  }

  Translation.prototype.all = function () {
    return this.dict;
  };

  Translation.prototype.get = function (key) {
    return this.dict[key];
  };

  Translation.prototype.extend = function (translation) {
    this.dict = $.extend({}, translation.all(), this.dict);
  };

  // Static functions

  Translation._cache = {};

  Translation.loadPath = function (path) {
    if (!(path in Translation._cache)) {
      var translations = require(path);

      Translation._cache[path] = translations;
    }

    return new Translation(Translation._cache[path]);
  };

  return Translation;
});

S2.define('select2/diacritics',[

], function () {
  var diacritics = {
    '\u24B6': 'A',
    '\uFF21': 'A',
    '\u00C0': 'A',
    '\u00C1': 'A',
    '\u00C2': 'A',
    '\u1EA6': 'A',
    '\u1EA4': 'A',
    '\u1EAA': 'A',
    '\u1EA8': 'A',
    '\u00C3': 'A',
    '\u0100': 'A',
    '\u0102': 'A',
    '\u1EB0': 'A',
    '\u1EAE': 'A',
    '\u1EB4': 'A',
    '\u1EB2': 'A',
    '\u0226': 'A',
    '\u01E0': 'A',
    '\u00C4': 'A',
    '\u01DE': 'A',
    '\u1EA2': 'A',
    '\u00C5': 'A',
    '\u01FA': 'A',
    '\u01CD': 'A',
    '\u0200': 'A',
    '\u0202': 'A',
    '\u1EA0': 'A',
    '\u1EAC': 'A',
    '\u1EB6': 'A',
    '\u1E00': 'A',
    '\u0104': 'A',
    '\u023A': 'A',
    '\u2C6F': 'A',
    '\uA732': 'AA',
    '\u00C6': 'AE',
    '\u01FC': 'AE',
    '\u01E2': 'AE',
    '\uA734': 'AO',
    '\uA736': 'AU',
    '\uA738': 'AV',
    '\uA73A': 'AV',
    '\uA73C': 'AY',
    '\u24B7': 'B',
    '\uFF22': 'B',
    '\u1E02': 'B',
    '\u1E04': 'B',
    '\u1E06': 'B',
    '\u0243': 'B',
    '\u0182': 'B',
    '\u0181': 'B',
    '\u24B8': 'C',
    '\uFF23': 'C',
    '\u0106': 'C',
    '\u0108': 'C',
    '\u010A': 'C',
    '\u010C': 'C',
    '\u00C7': 'C',
    '\u1E08': 'C',
    '\u0187': 'C',
    '\u023B': 'C',
    '\uA73E': 'C',
    '\u24B9': 'D',
    '\uFF24': 'D',
    '\u1E0A': 'D',
    '\u010E': 'D',
    '\u1E0C': 'D',
    '\u1E10': 'D',
    '\u1E12': 'D',
    '\u1E0E': 'D',
    '\u0110': 'D',
    '\u018B': 'D',
    '\u018A': 'D',
    '\u0189': 'D',
    '\uA779': 'D',
    '\u01F1': 'DZ',
    '\u01C4': 'DZ',
    '\u01F2': 'Dz',
    '\u01C5': 'Dz',
    '\u24BA': 'E',
    '\uFF25': 'E',
    '\u00C8': 'E',
    '\u00C9': 'E',
    '\u00CA': 'E',
    '\u1EC0': 'E',
    '\u1EBE': 'E',
    '\u1EC4': 'E',
    '\u1EC2': 'E',
    '\u1EBC': 'E',
    '\u0112': 'E',
    '\u1E14': 'E',
    '\u1E16': 'E',
    '\u0114': 'E',
    '\u0116': 'E',
    '\u00CB': 'E',
    '\u1EBA': 'E',
    '\u011A': 'E',
    '\u0204': 'E',
    '\u0206': 'E',
    '\u1EB8': 'E',
    '\u1EC6': 'E',
    '\u0228': 'E',
    '\u1E1C': 'E',
    '\u0118': 'E',
    '\u1E18': 'E',
    '\u1E1A': 'E',
    '\u0190': 'E',
    '\u018E': 'E',
    '\u24BB': 'F',
    '\uFF26': 'F',
    '\u1E1E': 'F',
    '\u0191': 'F',
    '\uA77B': 'F',
    '\u24BC': 'G',
    '\uFF27': 'G',
    '\u01F4': 'G',
    '\u011C': 'G',
    '\u1E20': 'G',
    '\u011E': 'G',
    '\u0120': 'G',
    '\u01E6': 'G',
    '\u0122': 'G',
    '\u01E4': 'G',
    '\u0193': 'G',
    '\uA7A0': 'G',
    '\uA77D': 'G',
    '\uA77E': 'G',
    '\u24BD': 'H',
    '\uFF28': 'H',
    '\u0124': 'H',
    '\u1E22': 'H',
    '\u1E26': 'H',
    '\u021E': 'H',
    '\u1E24': 'H',
    '\u1E28': 'H',
    '\u1E2A': 'H',
    '\u0126': 'H',
    '\u2C67': 'H',
    '\u2C75': 'H',
    '\uA78D': 'H',
    '\u24BE': 'I',
    '\uFF29': 'I',
    '\u00CC': 'I',
    '\u00CD': 'I',
    '\u00CE': 'I',
    '\u0128': 'I',
    '\u012A': 'I',
    '\u012C': 'I',
    '\u0130': 'I',
    '\u00CF': 'I',
    '\u1E2E': 'I',
    '\u1EC8': 'I',
    '\u01CF': 'I',
    '\u0208': 'I',
    '\u020A': 'I',
    '\u1ECA': 'I',
    '\u012E': 'I',
    '\u1E2C': 'I',
    '\u0197': 'I',
    '\u24BF': 'J',
    '\uFF2A': 'J',
    '\u0134': 'J',
    '\u0248': 'J',
    '\u24C0': 'K',
    '\uFF2B': 'K',
    '\u1E30': 'K',
    '\u01E8': 'K',
    '\u1E32': 'K',
    '\u0136': 'K',
    '\u1E34': 'K',
    '\u0198': 'K',
    '\u2C69': 'K',
    '\uA740': 'K',
    '\uA742': 'K',
    '\uA744': 'K',
    '\uA7A2': 'K',
    '\u24C1': 'L',
    '\uFF2C': 'L',
    '\u013F': 'L',
    '\u0139': 'L',
    '\u013D': 'L',
    '\u1E36': 'L',
    '\u1E38': 'L',
    '\u013B': 'L',
    '\u1E3C': 'L',
    '\u1E3A': 'L',
    '\u0141': 'L',
    '\u023D': 'L',
    '\u2C62': 'L',
    '\u2C60': 'L',
    '\uA748': 'L',
    '\uA746': 'L',
    '\uA780': 'L',
    '\u01C7': 'LJ',
    '\u01C8': 'Lj',
    '\u24C2': 'M',
    '\uFF2D': 'M',
    '\u1E3E': 'M',
    '\u1E40': 'M',
    '\u1E42': 'M',
    '\u2C6E': 'M',
    '\u019C': 'M',
    '\u24C3': 'N',
    '\uFF2E': 'N',
    '\u01F8': 'N',
    '\u0143': 'N',
    '\u00D1': 'N',
    '\u1E44': 'N',
    '\u0147': 'N',
    '\u1E46': 'N',
    '\u0145': 'N',
    '\u1E4A': 'N',
    '\u1E48': 'N',
    '\u0220': 'N',
    '\u019D': 'N',
    '\uA790': 'N',
    '\uA7A4': 'N',
    '\u01CA': 'NJ',
    '\u01CB': 'Nj',
    '\u24C4': 'O',
    '\uFF2F': 'O',
    '\u00D2': 'O',
    '\u00D3': 'O',
    '\u00D4': 'O',
    '\u1ED2': 'O',
    '\u1ED0': 'O',
    '\u1ED6': 'O',
    '\u1ED4': 'O',
    '\u00D5': 'O',
    '\u1E4C': 'O',
    '\u022C': 'O',
    '\u1E4E': 'O',
    '\u014C': 'O',
    '\u1E50': 'O',
    '\u1E52': 'O',
    '\u014E': 'O',
    '\u022E': 'O',
    '\u0230': 'O',
    '\u00D6': 'O',
    '\u022A': 'O',
    '\u1ECE': 'O',
    '\u0150': 'O',
    '\u01D1': 'O',
    '\u020C': 'O',
    '\u020E': 'O',
    '\u01A0': 'O',
    '\u1EDC': 'O',
    '\u1EDA': 'O',
    '\u1EE0': 'O',
    '\u1EDE': 'O',
    '\u1EE2': 'O',
    '\u1ECC': 'O',
    '\u1ED8': 'O',
    '\u01EA': 'O',
    '\u01EC': 'O',
    '\u00D8': 'O',
    '\u01FE': 'O',
    '\u0186': 'O',
    '\u019F': 'O',
    '\uA74A': 'O',
    '\uA74C': 'O',
    '\u0152': 'OE',
    '\u01A2': 'OI',
    '\uA74E': 'OO',
    '\u0222': 'OU',
    '\u24C5': 'P',
    '\uFF30': 'P',
    '\u1E54': 'P',
    '\u1E56': 'P',
    '\u01A4': 'P',
    '\u2C63': 'P',
    '\uA750': 'P',
    '\uA752': 'P',
    '\uA754': 'P',
    '\u24C6': 'Q',
    '\uFF31': 'Q',
    '\uA756': 'Q',
    '\uA758': 'Q',
    '\u024A': 'Q',
    '\u24C7': 'R',
    '\uFF32': 'R',
    '\u0154': 'R',
    '\u1E58': 'R',
    '\u0158': 'R',
    '\u0210': 'R',
    '\u0212': 'R',
    '\u1E5A': 'R',
    '\u1E5C': 'R',
    '\u0156': 'R',
    '\u1E5E': 'R',
    '\u024C': 'R',
    '\u2C64': 'R',
    '\uA75A': 'R',
    '\uA7A6': 'R',
    '\uA782': 'R',
    '\u24C8': 'S',
    '\uFF33': 'S',
    '\u1E9E': 'S',
    '\u015A': 'S',
    '\u1E64': 'S',
    '\u015C': 'S',
    '\u1E60': 'S',
    '\u0160': 'S',
    '\u1E66': 'S',
    '\u1E62': 'S',
    '\u1E68': 'S',
    '\u0218': 'S',
    '\u015E': 'S',
    '\u2C7E': 'S',
    '\uA7A8': 'S',
    '\uA784': 'S',
    '\u24C9': 'T',
    '\uFF34': 'T',
    '\u1E6A': 'T',
    '\u0164': 'T',
    '\u1E6C': 'T',
    '\u021A': 'T',
    '\u0162': 'T',
    '\u1E70': 'T',
    '\u1E6E': 'T',
    '\u0166': 'T',
    '\u01AC': 'T',
    '\u01AE': 'T',
    '\u023E': 'T',
    '\uA786': 'T',
    '\uA728': 'TZ',
    '\u24CA': 'U',
    '\uFF35': 'U',
    '\u00D9': 'U',
    '\u00DA': 'U',
    '\u00DB': 'U',
    '\u0168': 'U',
    '\u1E78': 'U',
    '\u016A': 'U',
    '\u1E7A': 'U',
    '\u016C': 'U',
    '\u00DC': 'U',
    '\u01DB': 'U',
    '\u01D7': 'U',
    '\u01D5': 'U',
    '\u01D9': 'U',
    '\u1EE6': 'U',
    '\u016E': 'U',
    '\u0170': 'U',
    '\u01D3': 'U',
    '\u0214': 'U',
    '\u0216': 'U',
    '\u01AF': 'U',
    '\u1EEA': 'U',
    '\u1EE8': 'U',
    '\u1EEE': 'U',
    '\u1EEC': 'U',
    '\u1EF0': 'U',
    '\u1EE4': 'U',
    '\u1E72': 'U',
    '\u0172': 'U',
    '\u1E76': 'U',
    '\u1E74': 'U',
    '\u0244': 'U',
    '\u24CB': 'V',
    '\uFF36': 'V',
    '\u1E7C': 'V',
    '\u1E7E': 'V',
    '\u01B2': 'V',
    '\uA75E': 'V',
    '\u0245': 'V',
    '\uA760': 'VY',
    '\u24CC': 'W',
    '\uFF37': 'W',
    '\u1E80': 'W',
    '\u1E82': 'W',
    '\u0174': 'W',
    '\u1E86': 'W',
    '\u1E84': 'W',
    '\u1E88': 'W',
    '\u2C72': 'W',
    '\u24CD': 'X',
    '\uFF38': 'X',
    '\u1E8A': 'X',
    '\u1E8C': 'X',
    '\u24CE': 'Y',
    '\uFF39': 'Y',
    '\u1EF2': 'Y',
    '\u00DD': 'Y',
    '\u0176': 'Y',
    '\u1EF8': 'Y',
    '\u0232': 'Y',
    '\u1E8E': 'Y',
    '\u0178': 'Y',
    '\u1EF6': 'Y',
    '\u1EF4': 'Y',
    '\u01B3': 'Y',
    '\u024E': 'Y',
    '\u1EFE': 'Y',
    '\u24CF': 'Z',
    '\uFF3A': 'Z',
    '\u0179': 'Z',
    '\u1E90': 'Z',
    '\u017B': 'Z',
    '\u017D': 'Z',
    '\u1E92': 'Z',
    '\u1E94': 'Z',
    '\u01B5': 'Z',
    '\u0224': 'Z',
    '\u2C7F': 'Z',
    '\u2C6B': 'Z',
    '\uA762': 'Z',
    '\u24D0': 'a',
    '\uFF41': 'a',
    '\u1E9A': 'a',
    '\u00E0': 'a',
    '\u00E1': 'a',
    '\u00E2': 'a',
    '\u1EA7': 'a',
    '\u1EA5': 'a',
    '\u1EAB': 'a',
    '\u1EA9': 'a',
    '\u00E3': 'a',
    '\u0101': 'a',
    '\u0103': 'a',
    '\u1EB1': 'a',
    '\u1EAF': 'a',
    '\u1EB5': 'a',
    '\u1EB3': 'a',
    '\u0227': 'a',
    '\u01E1': 'a',
    '\u00E4': 'a',
    '\u01DF': 'a',
    '\u1EA3': 'a',
    '\u00E5': 'a',
    '\u01FB': 'a',
    '\u01CE': 'a',
    '\u0201': 'a',
    '\u0203': 'a',
    '\u1EA1': 'a',
    '\u1EAD': 'a',
    '\u1EB7': 'a',
    '\u1E01': 'a',
    '\u0105': 'a',
    '\u2C65': 'a',
    '\u0250': 'a',
    '\uA733': 'aa',
    '\u00E6': 'ae',
    '\u01FD': 'ae',
    '\u01E3': 'ae',
    '\uA735': 'ao',
    '\uA737': 'au',
    '\uA739': 'av',
    '\uA73B': 'av',
    '\uA73D': 'ay',
    '\u24D1': 'b',
    '\uFF42': 'b',
    '\u1E03': 'b',
    '\u1E05': 'b',
    '\u1E07': 'b',
    '\u0180': 'b',
    '\u0183': 'b',
    '\u0253': 'b',
    '\u24D2': 'c',
    '\uFF43': 'c',
    '\u0107': 'c',
    '\u0109': 'c',
    '\u010B': 'c',
    '\u010D': 'c',
    '\u00E7': 'c',
    '\u1E09': 'c',
    '\u0188': 'c',
    '\u023C': 'c',
    '\uA73F': 'c',
    '\u2184': 'c',
    '\u24D3': 'd',
    '\uFF44': 'd',
    '\u1E0B': 'd',
    '\u010F': 'd',
    '\u1E0D': 'd',
    '\u1E11': 'd',
    '\u1E13': 'd',
    '\u1E0F': 'd',
    '\u0111': 'd',
    '\u018C': 'd',
    '\u0256': 'd',
    '\u0257': 'd',
    '\uA77A': 'd',
    '\u01F3': 'dz',
    '\u01C6': 'dz',
    '\u24D4': 'e',
    '\uFF45': 'e',
    '\u00E8': 'e',
    '\u00E9': 'e',
    '\u00EA': 'e',
    '\u1EC1': 'e',
    '\u1EBF': 'e',
    '\u1EC5': 'e',
    '\u1EC3': 'e',
    '\u1EBD': 'e',
    '\u0113': 'e',
    '\u1E15': 'e',
    '\u1E17': 'e',
    '\u0115': 'e',
    '\u0117': 'e',
    '\u00EB': 'e',
    '\u1EBB': 'e',
    '\u011B': 'e',
    '\u0205': 'e',
    '\u0207': 'e',
    '\u1EB9': 'e',
    '\u1EC7': 'e',
    '\u0229': 'e',
    '\u1E1D': 'e',
    '\u0119': 'e',
    '\u1E19': 'e',
    '\u1E1B': 'e',
    '\u0247': 'e',
    '\u025B': 'e',
    '\u01DD': 'e',
    '\u24D5': 'f',
    '\uFF46': 'f',
    '\u1E1F': 'f',
    '\u0192': 'f',
    '\uA77C': 'f',
    '\u24D6': 'g',
    '\uFF47': 'g',
    '\u01F5': 'g',
    '\u011D': 'g',
    '\u1E21': 'g',
    '\u011F': 'g',
    '\u0121': 'g',
    '\u01E7': 'g',
    '\u0123': 'g',
    '\u01E5': 'g',
    '\u0260': 'g',
    '\uA7A1': 'g',
    '\u1D79': 'g',
    '\uA77F': 'g',
    '\u24D7': 'h',
    '\uFF48': 'h',
    '\u0125': 'h',
    '\u1E23': 'h',
    '\u1E27': 'h',
    '\u021F': 'h',
    '\u1E25': 'h',
    '\u1E29': 'h',
    '\u1E2B': 'h',
    '\u1E96': 'h',
    '\u0127': 'h',
    '\u2C68': 'h',
    '\u2C76': 'h',
    '\u0265': 'h',
    '\u0195': 'hv',
    '\u24D8': 'i',
    '\uFF49': 'i',
    '\u00EC': 'i',
    '\u00ED': 'i',
    '\u00EE': 'i',
    '\u0129': 'i',
    '\u012B': 'i',
    '\u012D': 'i',
    '\u00EF': 'i',
    '\u1E2F': 'i',
    '\u1EC9': 'i',
    '\u01D0': 'i',
    '\u0209': 'i',
    '\u020B': 'i',
    '\u1ECB': 'i',
    '\u012F': 'i',
    '\u1E2D': 'i',
    '\u0268': 'i',
    '\u0131': 'i',
    '\u24D9': 'j',
    '\uFF4A': 'j',
    '\u0135': 'j',
    '\u01F0': 'j',
    '\u0249': 'j',
    '\u24DA': 'k',
    '\uFF4B': 'k',
    '\u1E31': 'k',
    '\u01E9': 'k',
    '\u1E33': 'k',
    '\u0137': 'k',
    '\u1E35': 'k',
    '\u0199': 'k',
    '\u2C6A': 'k',
    '\uA741': 'k',
    '\uA743': 'k',
    '\uA745': 'k',
    '\uA7A3': 'k',
    '\u24DB': 'l',
    '\uFF4C': 'l',
    '\u0140': 'l',
    '\u013A': 'l',
    '\u013E': 'l',
    '\u1E37': 'l',
    '\u1E39': 'l',
    '\u013C': 'l',
    '\u1E3D': 'l',
    '\u1E3B': 'l',
    '\u017F': 'l',
    '\u0142': 'l',
    '\u019A': 'l',
    '\u026B': 'l',
    '\u2C61': 'l',
    '\uA749': 'l',
    '\uA781': 'l',
    '\uA747': 'l',
    '\u01C9': 'lj',
    '\u24DC': 'm',
    '\uFF4D': 'm',
    '\u1E3F': 'm',
    '\u1E41': 'm',
    '\u1E43': 'm',
    '\u0271': 'm',
    '\u026F': 'm',
    '\u24DD': 'n',
    '\uFF4E': 'n',
    '\u01F9': 'n',
    '\u0144': 'n',
    '\u00F1': 'n',
    '\u1E45': 'n',
    '\u0148': 'n',
    '\u1E47': 'n',
    '\u0146': 'n',
    '\u1E4B': 'n',
    '\u1E49': 'n',
    '\u019E': 'n',
    '\u0272': 'n',
    '\u0149': 'n',
    '\uA791': 'n',
    '\uA7A5': 'n',
    '\u01CC': 'nj',
    '\u24DE': 'o',
    '\uFF4F': 'o',
    '\u00F2': 'o',
    '\u00F3': 'o',
    '\u00F4': 'o',
    '\u1ED3': 'o',
    '\u1ED1': 'o',
    '\u1ED7': 'o',
    '\u1ED5': 'o',
    '\u00F5': 'o',
    '\u1E4D': 'o',
    '\u022D': 'o',
    '\u1E4F': 'o',
    '\u014D': 'o',
    '\u1E51': 'o',
    '\u1E53': 'o',
    '\u014F': 'o',
    '\u022F': 'o',
    '\u0231': 'o',
    '\u00F6': 'o',
    '\u022B': 'o',
    '\u1ECF': 'o',
    '\u0151': 'o',
    '\u01D2': 'o',
    '\u020D': 'o',
    '\u020F': 'o',
    '\u01A1': 'o',
    '\u1EDD': 'o',
    '\u1EDB': 'o',
    '\u1EE1': 'o',
    '\u1EDF': 'o',
    '\u1EE3': 'o',
    '\u1ECD': 'o',
    '\u1ED9': 'o',
    '\u01EB': 'o',
    '\u01ED': 'o',
    '\u00F8': 'o',
    '\u01FF': 'o',
    '\u0254': 'o',
    '\uA74B': 'o',
    '\uA74D': 'o',
    '\u0275': 'o',
    '\u0153': 'oe',
    '\u01A3': 'oi',
    '\u0223': 'ou',
    '\uA74F': 'oo',
    '\u24DF': 'p',
    '\uFF50': 'p',
    '\u1E55': 'p',
    '\u1E57': 'p',
    '\u01A5': 'p',
    '\u1D7D': 'p',
    '\uA751': 'p',
    '\uA753': 'p',
    '\uA755': 'p',
    '\u24E0': 'q',
    '\uFF51': 'q',
    '\u024B': 'q',
    '\uA757': 'q',
    '\uA759': 'q',
    '\u24E1': 'r',
    '\uFF52': 'r',
    '\u0155': 'r',
    '\u1E59': 'r',
    '\u0159': 'r',
    '\u0211': 'r',
    '\u0213': 'r',
    '\u1E5B': 'r',
    '\u1E5D': 'r',
    '\u0157': 'r',
    '\u1E5F': 'r',
    '\u024D': 'r',
    '\u027D': 'r',
    '\uA75B': 'r',
    '\uA7A7': 'r',
    '\uA783': 'r',
    '\u24E2': 's',
    '\uFF53': 's',
    '\u00DF': 's',
    '\u015B': 's',
    '\u1E65': 's',
    '\u015D': 's',
    '\u1E61': 's',
    '\u0161': 's',
    '\u1E67': 's',
    '\u1E63': 's',
    '\u1E69': 's',
    '\u0219': 's',
    '\u015F': 's',
    '\u023F': 's',
    '\uA7A9': 's',
    '\uA785': 's',
    '\u1E9B': 's',
    '\u24E3': 't',
    '\uFF54': 't',
    '\u1E6B': 't',
    '\u1E97': 't',
    '\u0165': 't',
    '\u1E6D': 't',
    '\u021B': 't',
    '\u0163': 't',
    '\u1E71': 't',
    '\u1E6F': 't',
    '\u0167': 't',
    '\u01AD': 't',
    '\u0288': 't',
    '\u2C66': 't',
    '\uA787': 't',
    '\uA729': 'tz',
    '\u24E4': 'u',
    '\uFF55': 'u',
    '\u00F9': 'u',
    '\u00FA': 'u',
    '\u00FB': 'u',
    '\u0169': 'u',
    '\u1E79': 'u',
    '\u016B': 'u',
    '\u1E7B': 'u',
    '\u016D': 'u',
    '\u00FC': 'u',
    '\u01DC': 'u',
    '\u01D8': 'u',
    '\u01D6': 'u',
    '\u01DA': 'u',
    '\u1EE7': 'u',
    '\u016F': 'u',
    '\u0171': 'u',
    '\u01D4': 'u',
    '\u0215': 'u',
    '\u0217': 'u',
    '\u01B0': 'u',
    '\u1EEB': 'u',
    '\u1EE9': 'u',
    '\u1EEF': 'u',
    '\u1EED': 'u',
    '\u1EF1': 'u',
    '\u1EE5': 'u',
    '\u1E73': 'u',
    '\u0173': 'u',
    '\u1E77': 'u',
    '\u1E75': 'u',
    '\u0289': 'u',
    '\u24E5': 'v',
    '\uFF56': 'v',
    '\u1E7D': 'v',
    '\u1E7F': 'v',
    '\u028B': 'v',
    '\uA75F': 'v',
    '\u028C': 'v',
    '\uA761': 'vy',
    '\u24E6': 'w',
    '\uFF57': 'w',
    '\u1E81': 'w',
    '\u1E83': 'w',
    '\u0175': 'w',
    '\u1E87': 'w',
    '\u1E85': 'w',
    '\u1E98': 'w',
    '\u1E89': 'w',
    '\u2C73': 'w',
    '\u24E7': 'x',
    '\uFF58': 'x',
    '\u1E8B': 'x',
    '\u1E8D': 'x',
    '\u24E8': 'y',
    '\uFF59': 'y',
    '\u1EF3': 'y',
    '\u00FD': 'y',
    '\u0177': 'y',
    '\u1EF9': 'y',
    '\u0233': 'y',
    '\u1E8F': 'y',
    '\u00FF': 'y',
    '\u1EF7': 'y',
    '\u1E99': 'y',
    '\u1EF5': 'y',
    '\u01B4': 'y',
    '\u024F': 'y',
    '\u1EFF': 'y',
    '\u24E9': 'z',
    '\uFF5A': 'z',
    '\u017A': 'z',
    '\u1E91': 'z',
    '\u017C': 'z',
    '\u017E': 'z',
    '\u1E93': 'z',
    '\u1E95': 'z',
    '\u01B6': 'z',
    '\u0225': 'z',
    '\u0240': 'z',
    '\u2C6C': 'z',
    '\uA763': 'z',
    '\u0386': '\u0391',
    '\u0388': '\u0395',
    '\u0389': '\u0397',
    '\u038A': '\u0399',
    '\u03AA': '\u0399',
    '\u038C': '\u039F',
    '\u038E': '\u03A5',
    '\u03AB': '\u03A5',
    '\u038F': '\u03A9',
    '\u03AC': '\u03B1',
    '\u03AD': '\u03B5',
    '\u03AE': '\u03B7',
    '\u03AF': '\u03B9',
    '\u03CA': '\u03B9',
    '\u0390': '\u03B9',
    '\u03CC': '\u03BF',
    '\u03CD': '\u03C5',
    '\u03CB': '\u03C5',
    '\u03B0': '\u03C5',
    '\u03CE': '\u03C9',
    '\u03C2': '\u03C3',
    '\u2019': '\''
  };

  return diacritics;
});

S2.define('select2/data/base',[
  '../utils'
], function (Utils) {
  function BaseAdapter ($element, options) {
    BaseAdapter.__super__.constructor.call(this);
  }

  Utils.Extend(BaseAdapter, Utils.Observable);

  BaseAdapter.prototype.current = function (callback) {
    throw new Error('The `current` method must be defined in child classes.');
  };

  BaseAdapter.prototype.query = function (params, callback) {
    throw new Error('The `query` method must be defined in child classes.');
  };

  BaseAdapter.prototype.bind = function (container, $container) {
    // Can be implemented in subclasses
  };

  BaseAdapter.prototype.destroy = function () {
    // Can be implemented in subclasses
  };

  BaseAdapter.prototype.generateResultId = function (container, data) {
    var id = container.id + '-result-';

    id += Utils.generateChars(4);

    if (data.id != null) {
      id += '-' + data.id.toString();
    } else {
      id += '-' + Utils.generateChars(4);
    }
    return id;
  };

  return BaseAdapter;
});

S2.define('select2/data/select',[
  './base',
  '../utils',
  'jquery'
], function (BaseAdapter, Utils, $) {
  function SelectAdapter ($element, options) {
    this.$element = $element;
    this.options = options;

    SelectAdapter.__super__.constructor.call(this);
  }

  Utils.Extend(SelectAdapter, BaseAdapter);

  SelectAdapter.prototype.current = function (callback) {
    var self = this;

    var data = Array.prototype.map.call(
      this.$element[0].querySelectorAll(':checked'),
      function (selectedElement) {
        return self.item($(selectedElement));
      }
    );

    callback(data);
  };

  SelectAdapter.prototype.select = function (data) {
    var self = this;

    data.selected = true;

    // If data.element is a DOM node, use it instead
    if (
      data.element != null && data.element.tagName.toLowerCase() === 'option'
    ) {
      data.element.selected = true;

      this.$element.trigger('input').trigger('change');

      return;
    }

    if (this.$element.prop('multiple')) {
      this.current(function (currentData) {
        var val = [];

        data = [data];
        data.push.apply(data, currentData);

        for (var d = 0; d < data.length; d++) {
          var id = data[d].id;

          if (val.indexOf(id) === -1) {
            val.push(id);
          }
        }

        self.$element.val(val);
        self.$element.trigger('input').trigger('change');
      });
    } else {
      var val = data.id;

      this.$element.val(val);
      this.$element.trigger('input').trigger('change');
    }
  };

  SelectAdapter.prototype.unselect = function (data) {
    var self = this;

    if (!this.$element.prop('multiple')) {
      return;
    }

    data.selected = false;

    if (
      data.element != null &&
      data.element.tagName.toLowerCase() === 'option'
    ) {
      data.element.selected = false;

      this.$element.trigger('input').trigger('change');

      return;
    }

    this.current(function (currentData) {
      var val = [];

      for (var d = 0; d < currentData.length; d++) {
        var id = currentData[d].id;

        if (id !== data.id && val.indexOf(id) === -1) {
          val.push(id);
        }
      }

      self.$element.val(val);

      self.$element.trigger('input').trigger('change');
    });
  };

  SelectAdapter.prototype.bind = function (container, $container) {
    var self = this;

    this.container = container;

    container.on('select', function (params) {
      self.select(params.data);
    });

    container.on('unselect', function (params) {
      self.unselect(params.data);
    });
  };

  SelectAdapter.prototype.destroy = function () {
    // Remove anything added to child elements
    this.$element.find('*').each(function () {
      // Remove any custom data set by Select2
      Utils.RemoveData(this);
    });
  };

  SelectAdapter.prototype.query = function (params, callback) {
    var data = [];
    var self = this;

    var $options = this.$element.children();

    $options.each(function () {
      if (
        this.tagName.toLowerCase() !== 'option' &&
        this.tagName.toLowerCase() !== 'optgroup'
      ) {
        return;
      }

      var $option = $(this);

      var option = self.item($option);

      var matches = self.matches(params, option);

      if (matches !== null) {
        data.push(matches);
      }
    });

    callback({
      results: data
    });
  };

  SelectAdapter.prototype.addOptions = function ($options) {
    this.$element.append($options);
  };

  SelectAdapter.prototype.option = function (data) {
    var option;

    if (data.children) {
      option = document.createElement('optgroup');
      option.label = data.text;
    } else {
      option = document.createElement('option');

      if (option.textContent !== undefined) {
        option.textContent = data.text;
      } else {
        option.innerText = data.text;
      }
    }

    if (data.id !== undefined) {
      option.value = data.id;
    }

    if (data.disabled) {
      option.disabled = true;
    }

    if (data.selected) {
      option.selected = true;
    }

    if (data.title) {
      option.title = data.title;
    }

    var normalizedData = this._normalizeItem(data);
    normalizedData.element = option;

    // Override the option's data with the combined data
    Utils.StoreData(option, 'data', normalizedData);

    return $(option);
  };

  SelectAdapter.prototype.item = function ($option) {
    var data = {};

    data = Utils.GetData($option[0], 'data');

    if (data != null) {
      return data;
    }

    var option = $option[0];

    if (option.tagName.toLowerCase() === 'option') {
      data = {
        id: $option.val(),
        text: $option.text(),
        disabled: $option.prop('disabled'),
        selected: $option.prop('selected'),
        title: $option.prop('title')
      };
    } else if (option.tagName.toLowerCase() === 'optgroup') {
      data = {
        text: $option.prop('label'),
        children: [],
        title: $option.prop('title')
      };

      var $children = $option.children('option');
      var children = [];

      for (var c = 0; c < $children.length; c++) {
        var $child = $($children[c]);

        var child = this.item($child);

        children.push(child);
      }

      data.children = children;
    }

    data = this._normalizeItem(data);
    data.element = $option[0];

    Utils.StoreData($option[0], 'data', data);

    return data;
  };

  SelectAdapter.prototype._normalizeItem = function (item) {
    if (item !== Object(item)) {
      item = {
        id: item,
        text: item
      };
    }

    item = $.extend({}, {
      text: ''
    }, item);

    var defaults = {
      selected: false,
      disabled: false
    };

    if (item.id != null) {
      item.id = item.id.toString();
    }

    if (item.text != null) {
      item.text = item.text.toString();
    }

    if (item._resultId == null && item.id && this.container != null) {
      item._resultId = this.generateResultId(this.container, item);
    }

    return $.extend({}, defaults, item);
  };

  SelectAdapter.prototype.matches = function (params, data) {
    var matcher = this.options.get('matcher');

    return matcher(params, data);
  };

  return SelectAdapter;
});

S2.define('select2/data/array',[
  './select',
  '../utils',
  'jquery'
], function (SelectAdapter, Utils, $) {
  function ArrayAdapter ($element, options) {
    this._dataToConvert = options.get('data') || [];

    ArrayAdapter.__super__.constructor.call(this, $element, options);
  }

  Utils.Extend(ArrayAdapter, SelectAdapter);

  ArrayAdapter.prototype.bind = function (container, $container) {
    ArrayAdapter.__super__.bind.call(this, container, $container);

    this.addOptions(this.convertToOptions(this._dataToConvert));
  };

  ArrayAdapter.prototype.select = function (data) {
    var $option = this.$element.find('option').filter(function (i, elm) {
      return elm.value == data.id.toString();
    });

    if ($option.length === 0) {
      $option = this.option(data);

      this.addOptions($option);
    }

    ArrayAdapter.__super__.select.call(this, data);
  };

  ArrayAdapter.prototype.convertToOptions = function (data) {
    var self = this;

    var $existing = this.$element.find('option');
    var existingIds = $existing.map(function () {
      return self.item($(this)).id;
    }).get();

    var $options = [];

    // Filter out all items except for the one passed in the argument
    function onlyItem (item) {
      return function () {
        return $(this).val() == item.id;
      };
    }

    for (var d = 0; d < data.length; d++) {
      var item = this._normalizeItem(data[d]);

      // Skip items which were pre-loaded, only merge the data
      if (existingIds.indexOf(item.id) >= 0) {
        var $existingOption = $existing.filter(onlyItem(item));

        var existingData = this.item($existingOption);
        var newData = $.extend(true, {}, item, existingData);

        var $newOption = this.option(newData);

        $existingOption.replaceWith($newOption);

        continue;
      }

      var $option = this.option(item);

      if (item.children) {
        var $children = this.convertToOptions(item.children);

        $option.append($children);
      }

      $options.push($option);
    }

    return $options;
  };

  return ArrayAdapter;
});

S2.define('select2/data/ajax',[
  './array',
  '../utils',
  'jquery'
], function (ArrayAdapter, Utils, $) {
  function AjaxAdapter ($element, options) {
    this.ajaxOptions = this._applyDefaults(options.get('ajax'));

    if (this.ajaxOptions.processResults != null) {
      this.processResults = this.ajaxOptions.processResults;
    }

    AjaxAdapter.__super__.constructor.call(this, $element, options);
  }

  Utils.Extend(AjaxAdapter, ArrayAdapter);

  AjaxAdapter.prototype._applyDefaults = function (options) {
    var defaults = {
      data: function (params) {
        return $.extend({}, params, {
          q: params.term
        });
      },
      transport: function (params, success, failure) {
        var $request = $.ajax(params);

        $request.then(success);
        $request.fail(failure);

        return $request;
      }
    };

    return $.extend({}, defaults, options, true);
  };

  AjaxAdapter.prototype.processResults = function (results) {
    return results;
  };

  AjaxAdapter.prototype.query = function (params, callback) {
    var matches = [];
    var self = this;

    if (this._request != null) {
      // JSONP requests cannot always be aborted
      if (typeof this._request.abort === 'function') {
        this._request.abort();
      }

      this._request = null;
    }

    var options = $.extend({
      type: 'GET'
    }, this.ajaxOptions);

    if (typeof options.url === 'function') {
      options.url = options.url.call(this.$element, params);
    }

    if (typeof options.data === 'function') {
      options.data = options.data.call(this.$element, params);
    }

    function request () {
      var $request = options.transport(options, function (data) {
        var results = self.processResults(data, params);

        if (self.options.get('debug') && window.console && console.error) {
          // Check to make sure that the response included a `results` key.
          if (!results || !results.results || !Array.isArray(results.results)) {
            console.error(
              'Select2: The AJAX results did not return an array in the ' +
              '`results` key of the response.'
            );
          }
        }

        callback(results);
      }, function () {
        // Attempt to detect if a request was aborted
        // Only works if the transport exposes a status property
        if ('status' in $request &&
            ($request.status === 0 || $request.status === '0')) {
          return;
        }

        self.trigger('results:message', {
          message: 'errorLoading'
        });
      });

      self._request = $request;
    }

    if (this.ajaxOptions.delay && params.term != null) {
      if (this._queryTimeout) {
        window.clearTimeout(this._queryTimeout);
      }

      this._queryTimeout = window.setTimeout(request, this.ajaxOptions.delay);
    } else {
      request();
    }
  };

  return AjaxAdapter;
});

S2.define('select2/data/tags',[
  'jquery'
], function ($) {
  function Tags (decorated, $element, options) {
    var tags = options.get('tags');

    var createTag = options.get('createTag');

    if (createTag !== undefined) {
      this.createTag = createTag;
    }

    var insertTag = options.get('insertTag');

    if (insertTag !== undefined) {
        this.insertTag = insertTag;
    }

    decorated.call(this, $element, options);

    if (Array.isArray(tags)) {
      for (var t = 0; t < tags.length; t++) {
        var tag = tags[t];
        var item = this._normalizeItem(tag);

        var $option = this.option(item);

        this.$element.append($option);
      }
    }
  }

  Tags.prototype.query = function (decorated, params, callback) {
    var self = this;

    this._removeOldTags();

    if (params.term == null || params.page != null) {
      decorated.call(this, params, callback);
      return;
    }

    function wrapper (obj, child) {
      var data = obj.results;

      for (var i = 0; i < data.length; i++) {
        var option = data[i];

        var checkChildren = (
          option.children != null &&
          !wrapper({
            results: option.children
          }, true)
        );

        var optionText = (option.text || '').toUpperCase();
        var paramsTerm = (params.term || '').toUpperCase();

        var checkText = optionText === paramsTerm;

        if (checkText || checkChildren) {
          if (child) {
            return false;
          }

          obj.data = data;
          callback(obj);

          return;
        }
      }

      if (child) {
        return true;
      }

      var tag = self.createTag(params);

      if (tag != null) {
        var $option = self.option(tag);
        $option.attr('data-select2-tag', 'true');

        self.addOptions([$option]);

        self.insertTag(data, tag);
      }

      obj.results = data;

      callback(obj);
    }

    decorated.call(this, params, wrapper);
  };

  Tags.prototype.createTag = function (decorated, params) {
    if (params.term == null) {
      return null;
    }

    var term = params.term.trim();

    if (term === '') {
      return null;
    }

    return {
      id: term,
      text: term
    };
  };

  Tags.prototype.insertTag = function (_, data, tag) {
    data.unshift(tag);
  };

  Tags.prototype._removeOldTags = function (_) {
    var $options = this.$element.find('option[data-select2-tag]');

    $options.each(function () {
      if (this.selected) {
        return;
      }

      $(this).remove();
    });
  };

  return Tags;
});

S2.define('select2/data/tokenizer',[
  'jquery'
], function ($) {
  function Tokenizer (decorated, $element, options) {
    var tokenizer = options.get('tokenizer');

    if (tokenizer !== undefined) {
      this.tokenizer = tokenizer;
    }

    decorated.call(this, $element, options);
  }

  Tokenizer.prototype.bind = function (decorated, container, $container) {
    decorated.call(this, container, $container);

    this.$search =  container.dropdown.$search || container.selection.$search ||
      $container.find('.select2-search__field');
  };

  Tokenizer.prototype.query = function (decorated, params, callback) {
    var self = this;

    function createAndSelect (data) {
      // Normalize the data object so we can use it for checks
      var item = self._normalizeItem(data);

      // Check if the data object already exists as a tag
      // Select it if it doesn't
      var $existingOptions = self.$element.find('option').filter(function () {
        return $(this).val() === item.id;
      });

      // If an existing option wasn't found for it, create the option
      if (!$existingOptions.length) {
        var $option = self.option(item);
        $option.attr('data-select2-tag', true);

        self._removeOldTags();
        self.addOptions([$option]);
      }

      // Select the item, now that we know there is an option for it
      select(item);
    }

    function select (data) {
      self.trigger('select', {
        data: data
      });
    }

    params.term = params.term || '';

    var tokenData = this.tokenizer(params, this.options, createAndSelect);

    if (tokenData.term !== params.term) {
      // Replace the search term if we have the search box
      if (this.$search.length) {
        this.$search.val(tokenData.term);
        this.$search.trigger('focus');
      }

      params.term = tokenData.term;
    }

    decorated.call(this, params, callback);
  };

  Tokenizer.prototype.tokenizer = function (_, params, options, callback) {
    var separators = options.get('tokenSeparators') || [];
    var term = params.term;
    var i = 0;

    var createTag = this.createTag || function (params) {
      return {
        id: params.term,
        text: params.term
      };
    };

    while (i < term.length) {
      var termChar = term[i];

      if (separators.indexOf(termChar) === -1) {
        i++;

        continue;
      }

      var part = term.substr(0, i);
      var partParams = $.extend({}, params, {
        term: part
      });

      var data = createTag(partParams);

      if (data == null) {
        i++;
        continue;
      }

      callback(data);

      // Reset the term to not include the tokenized portion
      term = term.substr(i + 1) || '';
      i = 0;
    }

    return {
      term: term
    };
  };

  return Tokenizer;
});

S2.define('select2/data/minimumInputLength',[

], function () {
  function MinimumInputLength (decorated, $e, options) {
    this.minimumInputLength = options.get('minimumInputLength');

    decorated.call(this, $e, options);
  }

  MinimumInputLength.prototype.query = function (decorated, params, callback) {
    params.term = params.term || '';

    if (params.term.length < this.minimumInputLength) {
      this.trigger('results:message', {
        message: 'inputTooShort',
        args: {
          minimum: this.minimumInputLength,
          input: params.term,
          params: params
        }
      });

      return;
    }

    decorated.call(this, params, callback);
  };

  return MinimumInputLength;
});

S2.define('select2/data/maximumInputLength',[

], function () {
  function MaximumInputLength (decorated, $e, options) {
    this.maximumInputLength = options.get('maximumInputLength');

    decorated.call(this, $e, options);
  }

  MaximumInputLength.prototype.query = function (decorated, params, callback) {
    params.term = params.term || '';

    if (this.maximumInputLength > 0 &&
        params.term.length > this.maximumInputLength) {
      this.trigger('results:message', {
        message: 'inputTooLong',
        args: {
          maximum: this.maximumInputLength,
          input: params.term,
          params: params
        }
      });

      return;
    }

    decorated.call(this, params, callback);
  };

  return MaximumInputLength;
});

S2.define('select2/data/maximumSelectionLength',[

], function (){
  function MaximumSelectionLength (decorated, $e, options) {
    this.maximumSelectionLength = options.get('maximumSelectionLength');

    decorated.call(this, $e, options);
  }

  MaximumSelectionLength.prototype.bind =
    function (decorated, container, $container) {
      var self = this;

      decorated.call(this, container, $container);

      container.on('select', function () {
        self._checkIfMaximumSelected();
      });
  };

  MaximumSelectionLength.prototype.query =
    function (decorated, params, callback) {
      var self = this;

      this._checkIfMaximumSelected(function () {
        decorated.call(self, params, callback);
      });
  };

  MaximumSelectionLength.prototype._checkIfMaximumSelected =
    function (_, successCallback) {
      var self = this;

      this.current(function (currentData) {
        var count = currentData != null ? currentData.length : 0;
        if (self.maximumSelectionLength > 0 &&
          count >= self.maximumSelectionLength) {
          self.trigger('results:message', {
            message: 'maximumSelected',
            args: {
              maximum: self.maximumSelectionLength
            }
          });
          return;
        }

        if (successCallback) {
          successCallback();
        }
      });
  };

  return MaximumSelectionLength;
});

S2.define('select2/dropdown',[
  'jquery',
  './utils'
], function ($, Utils) {
  function Dropdown ($element, options) {
    this.$element = $element;
    this.options = options;

    Dropdown.__super__.constructor.call(this);
  }

  Utils.Extend(Dropdown, Utils.Observable);

  Dropdown.prototype.render = function () {
    var $dropdown = $(
      '<span class="select2-dropdown">' +
        '<span class="select2-results"></span>' +
      '</span>'
    );

    $dropdown.attr('dir', this.options.get('dir'));

    this.$dropdown = $dropdown;

    return $dropdown;
  };

  Dropdown.prototype.bind = function () {
    // Should be implemented in subclasses
  };

  Dropdown.prototype.position = function ($dropdown, $container) {
    // Should be implemented in subclasses
  };

  Dropdown.prototype.destroy = function () {
    // Remove the dropdown from the DOM
    this.$dropdown.remove();
  };

  return Dropdown;
});

S2.define('select2/dropdown/search',[
  'jquery'
], function ($) {
  function Search () { }

  Search.prototype.render = function (decorated) {
    var $rendered = decorated.call(this);
    var searchLabel = this.options.get('translations').get('search');

    var $search = $(
      '<span class="select2-search select2-search--dropdown">' +
        '<input class="select2-search__field" type="search" tabindex="-1"' +
        ' autocorrect="off" autocapitalize="none"' +
        ' spellcheck="false" role="searchbox" aria-autocomplete="list" />' +
      '</span>'
    );

    this.$searchContainer = $search;
    this.$search = $search.find('input');

    this.$search.prop('autocomplete', this.options.get('autocomplete'));
    this.$search.attr('aria-label', searchLabel());

    $rendered.prepend($search);

    return $rendered;
  };

  Search.prototype.bind = function (decorated, container, $container) {
    var self = this;

    var resultsId = container.id + '-results';

    decorated.call(this, container, $container);

    this.$search.on('keydown', function (evt) {
      self.trigger('keypress', evt);

      self._keyUpPrevented = evt.isDefaultPrevented();
    });

    // Workaround for browsers which do not support the `input` event
    // This will prevent double-triggering of events for browsers which support
    // both the `keyup` and `input` events.
    this.$search.on('input', function (evt) {
      // Unbind the duplicated `keyup` event
      $(this).off('keyup');
    });

    this.$search.on('keyup input', function (evt) {
      self.handleSearch(evt);
    });

    container.on('open', function () {
      self.$search.attr('tabindex', 0);
      self.$search.attr('aria-controls', resultsId);

      self.$search.trigger('focus');

      window.setTimeout(function () {
        self.$search.trigger('focus');
      }, 0);
    });

    container.on('close', function () {
      self.$search.attr('tabindex', -1);
      self.$search.removeAttr('aria-controls');
      self.$search.removeAttr('aria-activedescendant');

      self.$search.val('');
      self.$search.trigger('blur');
    });

    container.on('focus', function () {
      if (!container.isOpen()) {
        self.$search.trigger('focus');
      }
    });

    container.on('results:all', function (params) {
      if (params.query.term == null || params.query.term === '') {
        var showSearch = self.showSearch(params);

        if (showSearch) {
          self.$searchContainer[0].classList.remove('select2-search--hide');
        } else {
          self.$searchContainer[0].classList.add('select2-search--hide');
        }
      }
    });

    container.on('results:focus', function (params) {
      if (params.data._resultId) {
        self.$search.attr('aria-activedescendant', params.data._resultId);
      } else {
        self.$search.removeAttr('aria-activedescendant');
      }
    });
  };

  Search.prototype.handleSearch = function (evt) {
    if (!this._keyUpPrevented) {
      var input = this.$search.val();

      this.trigger('query', {
        term: input
      });
    }

    this._keyUpPrevented = false;
  };

  Search.prototype.showSearch = function (_, params) {
    return true;
  };

  return Search;
});

S2.define('select2/dropdown/hidePlaceholder',[

], function () {
  function HidePlaceholder (decorated, $element, options, dataAdapter) {
    this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

    decorated.call(this, $element, options, dataAdapter);
  }

  HidePlaceholder.prototype.append = function (decorated, data) {
    data.results = this.removePlaceholder(data.results);

    decorated.call(this, data);
  };

  HidePlaceholder.prototype.normalizePlaceholder = function (_, placeholder) {
    if (typeof placeholder === 'string') {
      placeholder = {
        id: '',
        text: placeholder
      };
    }

    return placeholder;
  };

  HidePlaceholder.prototype.removePlaceholder = function (_, data) {
    var modifiedData = data.slice(0);

    for (var d = data.length - 1; d >= 0; d--) {
      var item = data[d];

      if (this.placeholder.id === item.id) {
        modifiedData.splice(d, 1);
      }
    }

    return modifiedData;
  };

  return HidePlaceholder;
});

S2.define('select2/dropdown/infiniteScroll',[
  'jquery'
], function ($) {
  function InfiniteScroll (decorated, $element, options, dataAdapter) {
    this.lastParams = {};

    decorated.call(this, $element, options, dataAdapter);

    this.$loadingMore = this.createLoadingMore();
    this.loading = false;
  }

  InfiniteScroll.prototype.append = function (decorated, data) {
    this.$loadingMore.remove();
    this.loading = false;

    decorated.call(this, data);

    if (this.showLoadingMore(data)) {
      this.$results.append(this.$loadingMore);
      this.loadMoreIfNeeded();
    }
  };

  InfiniteScroll.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    container.on('query', function (params) {
      self.lastParams = params;
      self.loading = true;
    });

    container.on('query:append', function (params) {
      self.lastParams = params;
      self.loading = true;
    });

    this.$results.on('scroll', this.loadMoreIfNeeded.bind(this));
  };

  InfiniteScroll.prototype.loadMoreIfNeeded = function () {
    var isLoadMoreVisible = $.contains(
      document.documentElement,
      this.$loadingMore[0]
    );

    if (this.loading || !isLoadMoreVisible) {
      return;
    }

    var currentOffset = this.$results.offset().top +
      this.$results.outerHeight(false);
    var loadingMoreOffset = this.$loadingMore.offset().top +
      this.$loadingMore.outerHeight(false);

    if (currentOffset + 50 >= loadingMoreOffset) {
      this.loadMore();
    }
  };

  InfiniteScroll.prototype.loadMore = function () {
    this.loading = true;

    var params = $.extend({}, {page: 1}, this.lastParams);

    params.page++;

    this.trigger('query:append', params);
  };

  InfiniteScroll.prototype.showLoadingMore = function (_, data) {
    return data.pagination && data.pagination.more;
  };

  InfiniteScroll.prototype.createLoadingMore = function () {
    var $option = $(
      '<li ' +
      'class="select2-results__option select2-results__option--load-more"' +
      'role="option" aria-disabled="true"></li>'
    );

    var message = this.options.get('translations').get('loadingMore');

    $option.html(message(this.lastParams));

    return $option;
  };

  return InfiniteScroll;
});

S2.define('select2/dropdown/attachBody',[
  'jquery',
  '../utils'
], function ($, Utils) {
  function AttachBody (decorated, $element, options) {
    this.$dropdownParent = $(options.get('dropdownParent') || document.body);

    decorated.call(this, $element, options);
  }

  AttachBody.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    container.on('open', function () {
      self._showDropdown();
      self._attachPositioningHandler(container);

      // Must bind after the results handlers to ensure correct sizing
      self._bindContainerResultHandlers(container);
    });

    container.on('close', function () {
      self._hideDropdown();
      self._detachPositioningHandler(container);
    });

    this.$dropdownContainer.on('mousedown', function (evt) {
      evt.stopPropagation();
    });
  };

  AttachBody.prototype.destroy = function (decorated) {
    decorated.call(this);

    this.$dropdownContainer.remove();
  };

  AttachBody.prototype.position = function (decorated, $dropdown, $container) {
    // Clone all of the container classes
    $dropdown.attr('class', $container.attr('class'));

    $dropdown[0].classList.remove('select2');
    $dropdown[0].classList.add('select2-container--open');

    $dropdown.css({
      position: 'absolute',
      top: -999999
    });

    this.$container = $container;
  };

  AttachBody.prototype.render = function (decorated) {
    var $container = $('<span></span>');

    var $dropdown = decorated.call(this);
    $container.append($dropdown);

    this.$dropdownContainer = $container;

    return $container;
  };

  AttachBody.prototype._hideDropdown = function (decorated) {
    this.$dropdownContainer.detach();
  };

  AttachBody.prototype._bindContainerResultHandlers =
      function (decorated, container) {

    // These should only be bound once
    if (this._containerResultsHandlersBound) {
      return;
    }

    var self = this;

    container.on('results:all', function () {
      self._positionDropdown();
      self._resizeDropdown();
    });

    container.on('results:append', function () {
      self._positionDropdown();
      self._resizeDropdown();
    });

    container.on('results:message', function () {
      self._positionDropdown();
      self._resizeDropdown();
    });

    container.on('select', function () {
      self._positionDropdown();
      self._resizeDropdown();
    });

    container.on('unselect', function () {
      self._positionDropdown();
      self._resizeDropdown();
    });

    this._containerResultsHandlersBound = true;
  };

  AttachBody.prototype._attachPositioningHandler =
      function (decorated, container) {
    var self = this;

    var scrollEvent = 'scroll.select2.' + container.id;
    var resizeEvent = 'resize.select2.' + container.id;
    var orientationEvent = 'orientationchange.select2.' + container.id;

    var $watchers = this.$container.parents().filter(Utils.hasScroll);
    $watchers.each(function () {
      Utils.StoreData(this, 'select2-scroll-position', {
        x: $(this).scrollLeft(),
        y: $(this).scrollTop()
      });
    });

    $watchers.on(scrollEvent, function (ev) {
      var position = Utils.GetData(this, 'select2-scroll-position');
      $(this).scrollTop(position.y);
    });

    $(window).on(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent,
      function (e) {
      self._positionDropdown();
      self._resizeDropdown();
    });
  };

  AttachBody.prototype._detachPositioningHandler =
      function (decorated, container) {
    var scrollEvent = 'scroll.select2.' + container.id;
    var resizeEvent = 'resize.select2.' + container.id;
    var orientationEvent = 'orientationchange.select2.' + container.id;

    var $watchers = this.$container.parents().filter(Utils.hasScroll);
    $watchers.off(scrollEvent);

    $(window).off(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent);
  };

  AttachBody.prototype._positionDropdown = function () {
    var $window = $(window);

    var isCurrentlyAbove = this.$dropdown[0].classList
      .contains('select2-dropdown--above');
    var isCurrentlyBelow = this.$dropdown[0].classList
      .contains('select2-dropdown--below');

    var newDirection = null;

    var offset = this.$container.offset();

    offset.bottom = offset.top + this.$container.outerHeight(false);

    var container = {
      height: this.$container.outerHeight(false)
    };

    container.top = offset.top;
    container.bottom = offset.top + container.height;

    var dropdown = {
      height: this.$dropdown.outerHeight(false)
    };

    var viewport = {
      top: $window.scrollTop(),
      bottom: $window.scrollTop() + $window.height()
    };

    var enoughRoomAbove = viewport.top < (offset.top - dropdown.height);
    var enoughRoomBelow = viewport.bottom > (offset.bottom + dropdown.height);

    var css = {
      left: offset.left,
      top: container.bottom
    };

    // Determine what the parent element is to use for calculating the offset
    var $offsetParent = this.$dropdownParent;

    // For statically positioned elements, we need to get the element
    // that is determining the offset
    if ($offsetParent.css('position') === 'static') {
      $offsetParent = $offsetParent.offsetParent();
    }

    var parentOffset = {
      top: 0,
      left: 0
    };

    if (
      $.contains(document.body, $offsetParent[0]) ||
      $offsetParent[0].isConnected
      ) {
      parentOffset = $offsetParent.offset();
    }

    css.top -= parentOffset.top;
    css.left -= parentOffset.left;

    if (!isCurrentlyAbove && !isCurrentlyBelow) {
      newDirection = 'below';
    }

    if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
      newDirection = 'above';
    } else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
      newDirection = 'below';
    }

    if (newDirection == 'above' ||
      (isCurrentlyAbove && newDirection !== 'below')) {
      css.top = container.top - parentOffset.top - dropdown.height;
    }

    if (newDirection != null) {
      this.$dropdown[0].classList.remove('select2-dropdown--below');
      this.$dropdown[0].classList.remove('select2-dropdown--above');
      this.$dropdown[0].classList.add('select2-dropdown--' + newDirection);

      this.$container[0].classList.remove('select2-container--below');
      this.$container[0].classList.remove('select2-container--above');
      this.$container[0].classList.add('select2-container--' + newDirection);
    }

    this.$dropdownContainer.css(css);
  };

  AttachBody.prototype._resizeDropdown = function () {
    var css = {
      width: this.$container.outerWidth(false) + 'px'
    };

    if (this.options.get('dropdownAutoWidth')) {
      css.minWidth = css.width;
      css.position = 'relative';
      css.width = 'auto';
    }

    this.$dropdown.css(css);
  };

  AttachBody.prototype._showDropdown = function (decorated) {
    this.$dropdownContainer.appendTo(this.$dropdownParent);

    this._positionDropdown();
    this._resizeDropdown();
  };

  return AttachBody;
});

S2.define('select2/dropdown/minimumResultsForSearch',[

], function () {
  function countResults (data) {
    var count = 0;

    for (var d = 0; d < data.length; d++) {
      var item = data[d];

      if (item.children) {
        count += countResults(item.children);
      } else {
        count++;
      }
    }

    return count;
  }

  function MinimumResultsForSearch (decorated, $element, options, dataAdapter) {
    this.minimumResultsForSearch = options.get('minimumResultsForSearch');

    if (this.minimumResultsForSearch < 0) {
      this.minimumResultsForSearch = Infinity;
    }

    decorated.call(this, $element, options, dataAdapter);
  }

  MinimumResultsForSearch.prototype.showSearch = function (decorated, params) {
    if (countResults(params.data.results) < this.minimumResultsForSearch) {
      return false;
    }

    return decorated.call(this, params);
  };

  return MinimumResultsForSearch;
});

S2.define('select2/dropdown/selectOnClose',[
  '../utils'
], function (Utils) {
  function SelectOnClose () { }

  SelectOnClose.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    container.on('close', function (params) {
      self._handleSelectOnClose(params);
    });
  };

  SelectOnClose.prototype._handleSelectOnClose = function (_, params) {
    if (params && params.originalSelect2Event != null) {
      var event = params.originalSelect2Event;

      // Don't select an item if the close event was triggered from a select or
      // unselect event
      if (event._type === 'select' || event._type === 'unselect') {
        return;
      }
    }

    var $highlightedResults = this.getHighlightedResults();

    // Only select highlighted results
    if ($highlightedResults.length < 1) {
      return;
    }

    var data = Utils.GetData($highlightedResults[0], 'data');

    // Don't re-select already selected resulte
    if (
      (data.element != null && data.element.selected) ||
      (data.element == null && data.selected)
    ) {
      return;
    }

    this.trigger('select', {
        data: data
    });
  };

  return SelectOnClose;
});

S2.define('select2/dropdown/closeOnSelect',[

], function () {
  function CloseOnSelect () { }

  CloseOnSelect.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    container.on('select', function (evt) {
      self._selectTriggered(evt);
    });

    container.on('unselect', function (evt) {
      self._selectTriggered(evt);
    });
  };

  CloseOnSelect.prototype._selectTriggered = function (_, evt) {
    var originalEvent = evt.originalEvent;

    // Don't close if the control key is being held
    if (originalEvent && (originalEvent.ctrlKey || originalEvent.metaKey)) {
      return;
    }

    this.trigger('close', {
      originalEvent: originalEvent,
      originalSelect2Event: evt
    });
  };

  return CloseOnSelect;
});

S2.define('select2/dropdown/dropdownCss',[
  '../utils'
], function (Utils) {
  function DropdownCSS () { }

  DropdownCSS.prototype.render = function (decorated) {
    var $dropdown = decorated.call(this);

    var dropdownCssClass = this.options.get('dropdownCssClass') || '';

    if (dropdownCssClass.indexOf(':all:') !== -1) {
      dropdownCssClass = dropdownCssClass.replace(':all:', '');

      Utils.copyNonInternalCssClasses($dropdown[0], this.$element[0]);
    }

    $dropdown.addClass(dropdownCssClass);

    return $dropdown;
  };

  return DropdownCSS;
});

S2.define('select2/dropdown/tagsSearchHighlight',[
  '../utils'
], function (Utils) {
  function TagsSearchHighlight () { }

  TagsSearchHighlight.prototype.highlightFirstItem = function (decorated) {
    var $options = this.$results
    .find(
      '.select2-results__option--selectable' +
      ':not(.select2-results__option--selected)'
    );

    if ($options.length > 0) {
      var $firstOption = $options.first();
      var data = Utils.GetData($firstOption[0], 'data');
      var firstElement = data.element;

      if (firstElement && firstElement.getAttribute) {
        if (firstElement.getAttribute('data-select2-tag') === 'true') {
          $firstOption.trigger('mouseenter');

          return;
        }
      }
    }

    decorated.call(this);
  };

  return TagsSearchHighlight;
});

S2.define('select2/i18n/en',[],function () {
  // English
  return {
    errorLoading: function () {
      return 'The results could not be loaded.';
    },
    inputTooLong: function (args) {
      var overChars = args.input.length - args.maximum;

      var message = 'Please delete ' + overChars + ' character';

      if (overChars != 1) {
        message += 's';
      }

      return message;
    },
    inputTooShort: function (args) {
      var remainingChars = args.minimum - args.input.length;

      var message = 'Please enter ' + remainingChars + ' or more characters';

      return message;
    },
    loadingMore: function () {
      return 'Loading more results…';
    },
    maximumSelected: function (args) {
      var message = 'You can only select ' + args.maximum + ' item';

      if (args.maximum != 1) {
        message += 's';
      }

      return message;
    },
    noResults: function () {
      return 'No results found';
    },
    searching: function () {
      return 'Searching…';
    },
    removeAllItems: function () {
      return 'Remove all items';
    },
    removeItem: function () {
      return 'Remove item';
    },
    search: function() {
      return 'Search';
    }
  };
});

S2.define('select2/defaults',[
  'jquery',

  './results',

  './selection/single',
  './selection/multiple',
  './selection/placeholder',
  './selection/allowClear',
  './selection/search',
  './selection/selectionCss',
  './selection/eventRelay',

  './utils',
  './translation',
  './diacritics',

  './data/select',
  './data/array',
  './data/ajax',
  './data/tags',
  './data/tokenizer',
  './data/minimumInputLength',
  './data/maximumInputLength',
  './data/maximumSelectionLength',

  './dropdown',
  './dropdown/search',
  './dropdown/hidePlaceholder',
  './dropdown/infiniteScroll',
  './dropdown/attachBody',
  './dropdown/minimumResultsForSearch',
  './dropdown/selectOnClose',
  './dropdown/closeOnSelect',
  './dropdown/dropdownCss',
  './dropdown/tagsSearchHighlight',

  './i18n/en'
], function ($,

             ResultsList,

             SingleSelection, MultipleSelection, Placeholder, AllowClear,
             SelectionSearch, SelectionCSS, EventRelay,

             Utils, Translation, DIACRITICS,

             SelectData, ArrayData, AjaxData, Tags, Tokenizer,
             MinimumInputLength, MaximumInputLength, MaximumSelectionLength,

             Dropdown, DropdownSearch, HidePlaceholder, InfiniteScroll,
             AttachBody, MinimumResultsForSearch, SelectOnClose, CloseOnSelect,
             DropdownCSS, TagsSearchHighlight,

             EnglishTranslation) {
  function Defaults () {
    this.reset();
  }

  Defaults.prototype.apply = function (options) {
    options = $.extend(true, {}, this.defaults, options);

    if (options.dataAdapter == null) {
      if (options.ajax != null) {
        options.dataAdapter = AjaxData;
      } else if (options.data != null) {
        options.dataAdapter = ArrayData;
      } else {
        options.dataAdapter = SelectData;
      }

      if (options.minimumInputLength > 0) {
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          MinimumInputLength
        );
      }

      if (options.maximumInputLength > 0) {
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          MaximumInputLength
        );
      }

      if (options.maximumSelectionLength > 0) {
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          MaximumSelectionLength
        );
      }

      if (options.tags) {
        options.dataAdapter = Utils.Decorate(options.dataAdapter, Tags);
      }

      if (options.tokenSeparators != null || options.tokenizer != null) {
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          Tokenizer
        );
      }
    }

    if (options.resultsAdapter == null) {
      options.resultsAdapter = ResultsList;

      if (options.ajax != null) {
        options.resultsAdapter = Utils.Decorate(
          options.resultsAdapter,
          InfiniteScroll
        );
      }

      if (options.placeholder != null) {
        options.resultsAdapter = Utils.Decorate(
          options.resultsAdapter,
          HidePlaceholder
        );
      }

      if (options.selectOnClose) {
        options.resultsAdapter = Utils.Decorate(
          options.resultsAdapter,
          SelectOnClose
        );
      }

      if (options.tags) {
        options.resultsAdapter = Utils.Decorate(
          options.resultsAdapter,
          TagsSearchHighlight
        );
      }
    }

    if (options.dropdownAdapter == null) {
      if (options.multiple) {
        options.dropdownAdapter = Dropdown;
      } else {
        var SearchableDropdown = Utils.Decorate(Dropdown, DropdownSearch);

        options.dropdownAdapter = SearchableDropdown;
      }

      if (options.minimumResultsForSearch !== 0) {
        options.dropdownAdapter = Utils.Decorate(
          options.dropdownAdapter,
          MinimumResultsForSearch
        );
      }

      if (options.closeOnSelect) {
        options.dropdownAdapter = Utils.Decorate(
          options.dropdownAdapter,
          CloseOnSelect
        );
      }

      if (options.dropdownCssClass != null) {
        options.dropdownAdapter = Utils.Decorate(
          options.dropdownAdapter,
          DropdownCSS
        );
      }

      options.dropdownAdapter = Utils.Decorate(
        options.dropdownAdapter,
        AttachBody
      );
    }

    if (options.selectionAdapter == null) {
      if (options.multiple) {
        options.selectionAdapter = MultipleSelection;
      } else {
        options.selectionAdapter = SingleSelection;
      }

      // Add the placeholder mixin if a placeholder was specified
      if (options.placeholder != null) {
        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          Placeholder
        );
      }

      if (options.allowClear) {
        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          AllowClear
        );
      }

      if (options.multiple) {
        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          SelectionSearch
        );
      }

      if (options.selectionCssClass != null) {
        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          SelectionCSS
        );
      }

      options.selectionAdapter = Utils.Decorate(
        options.selectionAdapter,
        EventRelay
      );
    }

    // If the defaults were not previously applied from an element, it is
    // possible for the language option to have not been resolved
    options.language = this._resolveLanguage(options.language);

    // Always fall back to English since it will always be complete
    options.language.push('en');

    var uniqueLanguages = [];

    for (var l = 0; l < options.language.length; l++) {
      var language = options.language[l];

      if (uniqueLanguages.indexOf(language) === -1) {
        uniqueLanguages.push(language);
      }
    }

    options.language = uniqueLanguages;

    options.translations = this._processTranslations(
      options.language,
      options.debug
    );

    return options;
  };

  Defaults.prototype.reset = function () {
    function stripDiacritics (text) {
      // Used 'uni range + named function' from http://jsperf.com/diacritics/18
      function match(a) {
        return DIACRITICS[a] || a;
      }

      return text.replace(/[^\u0000-\u007E]/g, match);
    }

    function matcher (params, data) {
      // Always return the object if there is nothing to compare
      if (params.term == null || params.term.trim() === '') {
        return data;
      }

      // Do a recursive check for options with children
      if (data.children && data.children.length > 0) {
        // Clone the data object if there are children
        // This is required as we modify the object to remove any non-matches
        var match = $.extend(true, {}, data);

        // Check each child of the option
        for (var c = data.children.length - 1; c >= 0; c--) {
          var child = data.children[c];

          var matches = matcher(params, child);

          // If there wasn't a match, remove the object in the array
          if (matches == null) {
            match.children.splice(c, 1);
          }
        }

        // If any children matched, return the new object
        if (match.children.length > 0) {
          return match;
        }

        // If there were no matching children, check just the plain object
        return matcher(params, match);
      }

      var original = stripDiacritics(data.text).toUpperCase();
      var term = stripDiacritics(params.term).toUpperCase();

      // Check if the text contains the term
      if (original.indexOf(term) > -1) {
        return data;
      }

      // If it doesn't contain the term, don't return anything
      return null;
    }

    this.defaults = {
      amdLanguageBase: './i18n/',
      autocomplete: 'off',
      closeOnSelect: true,
      debug: false,
      dropdownAutoWidth: false,
      escapeMarkup: Utils.escapeMarkup,
      language: {},
      matcher: matcher,
      minimumInputLength: 0,
      maximumInputLength: 0,
      maximumSelectionLength: 0,
      minimumResultsForSearch: 0,
      selectOnClose: false,
      scrollAfterSelect: false,
      sorter: function (data) {
        return data;
      },
      templateResult: function (result) {
        return result.text;
      },
      templateSelection: function (selection) {
        return selection.text;
      },
      theme: 'default',
      width: 'resolve'
    };
  };

  Defaults.prototype.applyFromElement = function (options, $element) {
    var optionLanguage = options.language;
    var defaultLanguage = this.defaults.language;
    var elementLanguage = $element.prop('lang');
    var parentLanguage = $element.closest('[lang]').prop('lang');

    var languages = Array.prototype.concat.call(
      this._resolveLanguage(elementLanguage),
      this._resolveLanguage(optionLanguage),
      this._resolveLanguage(defaultLanguage),
      this._resolveLanguage(parentLanguage)
    );

    options.language = languages;

    return options;
  };

  Defaults.prototype._resolveLanguage = function (language) {
    if (!language) {
      return [];
    }

    if ($.isEmptyObject(language)) {
      return [];
    }

    if ($.isPlainObject(language)) {
      return [language];
    }

    var languages;

    if (!Array.isArray(language)) {
      languages = [language];
    } else {
      languages = language;
    }

    var resolvedLanguages = [];

    for (var l = 0; l < languages.length; l++) {
      resolvedLanguages.push(languages[l]);

      if (typeof languages[l] === 'string' && languages[l].indexOf('-') > 0) {
        // Extract the region information if it is included
        var languageParts = languages[l].split('-');
        var baseLanguage = languageParts[0];

        resolvedLanguages.push(baseLanguage);
      }
    }

    return resolvedLanguages;
  };

  Defaults.prototype._processTranslations = function (languages, debug) {
    var translations = new Translation();

    for (var l = 0; l < languages.length; l++) {
      var languageData = new Translation();

      var language = languages[l];

      if (typeof language === 'string') {
        try {
          // Try to load it with the original name
          languageData = Translation.loadPath(language);
        } catch (e) {
          try {
            // If we couldn't load it, check if it wasn't the full path
            language = this.defaults.amdLanguageBase + language;
            languageData = Translation.loadPath(language);
          } catch (ex) {
            // The translation could not be loaded at all. Sometimes this is
            // because of a configuration problem, other times this can be
            // because of how Select2 helps load all possible translation files
            if (debug && window.console && console.warn) {
              console.warn(
                'Select2: The language file for "' + language + '" could ' +
                'not be automatically loaded. A fallback will be used instead.'
              );
            }
          }
        }
      } else if ($.isPlainObject(language)) {
        languageData = new Translation(language);
      } else {
        languageData = language;
      }

      translations.extend(languageData);
    }

    return translations;
  };

  Defaults.prototype.set = function (key, value) {
    var camelKey = $.camelCase(key);

    var data = {};
    data[camelKey] = value;

    var convertedData = Utils._convertData(data);

    $.extend(true, this.defaults, convertedData);
  };

  var defaults = new Defaults();

  return defaults;
});

S2.define('select2/options',[
  'jquery',
  './defaults',
  './utils'
], function ($, Defaults, Utils) {
  function Options (options, $element) {
    this.options = options;

    if ($element != null) {
      this.fromElement($element);
    }

    if ($element != null) {
      this.options = Defaults.applyFromElement(this.options, $element);
    }

    this.options = Defaults.apply(this.options);
  }

  Options.prototype.fromElement = function ($e) {
    var excludedData = ['select2'];

    if (this.options.multiple == null) {
      this.options.multiple = $e.prop('multiple');
    }

    if (this.options.disabled == null) {
      this.options.disabled = $e.prop('disabled');
    }

    if (this.options.autocomplete == null && $e.prop('autocomplete')) {
      this.options.autocomplete = $e.prop('autocomplete');
    }

    if (this.options.dir == null) {
      if ($e.prop('dir')) {
        this.options.dir = $e.prop('dir');
      } else if ($e.closest('[dir]').prop('dir')) {
        this.options.dir = $e.closest('[dir]').prop('dir');
      } else {
        this.options.dir = 'ltr';
      }
    }

    $e.prop('disabled', this.options.disabled);
    $e.prop('multiple', this.options.multiple);

    if (Utils.GetData($e[0], 'select2Tags')) {
      if (this.options.debug && window.console && console.warn) {
        console.warn(
          'Select2: The `data-select2-tags` attribute has been changed to ' +
          'use the `data-data` and `data-tags="true"` attributes and will be ' +
          'removed in future versions of Select2.'
        );
      }

      Utils.StoreData($e[0], 'data', Utils.GetData($e[0], 'select2Tags'));
      Utils.StoreData($e[0], 'tags', true);
    }

    if (Utils.GetData($e[0], 'ajaxUrl')) {
      if (this.options.debug && window.console && console.warn) {
        console.warn(
          'Select2: The `data-ajax-url` attribute has been changed to ' +
          '`data-ajax--url` and support for the old attribute will be removed' +
          ' in future versions of Select2.'
        );
      }

      $e.attr('ajax--url', Utils.GetData($e[0], 'ajaxUrl'));
      Utils.StoreData($e[0], 'ajax-Url', Utils.GetData($e[0], 'ajaxUrl'));
    }

    var dataset = {};

    function upperCaseLetter(_, letter) {
      return letter.toUpperCase();
    }

    // Pre-load all of the attributes which are prefixed with `data-`
    for (var attr = 0; attr < $e[0].attributes.length; attr++) {
      var attributeName = $e[0].attributes[attr].name;
      var prefix = 'data-';

      if (attributeName.substr(0, prefix.length) == prefix) {
        // Get the contents of the attribute after `data-`
        var dataName = attributeName.substring(prefix.length);

        // Get the data contents from the consistent source
        // This is more than likely the jQuery data helper
        var dataValue = Utils.GetData($e[0], dataName);

        // camelCase the attribute name to match the spec
        var camelDataName = dataName.replace(/-([a-z])/g, upperCaseLetter);

        // Store the data attribute contents into the dataset since
        dataset[camelDataName] = dataValue;
      }
    }

    // Prefer the element's `dataset` attribute if it exists
    // jQuery 1.x does not correctly handle data attributes with multiple dashes
    if ($.fn.jquery && $.fn.jquery.substr(0, 2) == '1.' && $e[0].dataset) {
      dataset = $.extend(true, {}, $e[0].dataset, dataset);
    }

    // Prefer our internal data cache if it exists
    var data = $.extend(true, {}, Utils.GetData($e[0]), dataset);

    data = Utils._convertData(data);

    for (var key in data) {
      if (excludedData.indexOf(key) > -1) {
        continue;
      }

      if ($.isPlainObject(this.options[key])) {
        $.extend(this.options[key], data[key]);
      } else {
        this.options[key] = data[key];
      }
    }

    return this;
  };

  Options.prototype.get = function (key) {
    return this.options[key];
  };

  Options.prototype.set = function (key, val) {
    this.options[key] = val;
  };

  return Options;
});

S2.define('select2/core',[
  'jquery',
  './options',
  './utils',
  './keys'
], function ($, Options, Utils, KEYS) {
  var Select2 = function ($element, options) {
    if (Utils.GetData($element[0], 'select2') != null) {
      Utils.GetData($element[0], 'select2').destroy();
    }

    this.$element = $element;

    this.id = this._generateId($element);

    options = options || {};

    this.options = new Options(options, $element);

    Select2.__super__.constructor.call(this);

    // Set up the tabindex

    var tabindex = $element.attr('tabindex') || 0;
    Utils.StoreData($element[0], 'old-tabindex', tabindex);
    $element.attr('tabindex', '-1');

    // Set up containers and adapters

    var DataAdapter = this.options.get('dataAdapter');
    this.dataAdapter = new DataAdapter($element, this.options);

    var $container = this.render();

    this._placeContainer($container);

    var SelectionAdapter = this.options.get('selectionAdapter');
    this.selection = new SelectionAdapter($element, this.options);
    this.$selection = this.selection.render();

    this.selection.position(this.$selection, $container);

    var DropdownAdapter = this.options.get('dropdownAdapter');
    this.dropdown = new DropdownAdapter($element, this.options);
    this.$dropdown = this.dropdown.render();

    this.dropdown.position(this.$dropdown, $container);

    var ResultsAdapter = this.options.get('resultsAdapter');
    this.results = new ResultsAdapter($element, this.options, this.dataAdapter);
    this.$results = this.results.render();

    this.results.position(this.$results, this.$dropdown);

    // Bind events

    var self = this;

    // Bind the container to all of the adapters
    this._bindAdapters();

    // Register any DOM event handlers
    this._registerDomEvents();

    // Register any internal event handlers
    this._registerDataEvents();
    this._registerSelectionEvents();
    this._registerDropdownEvents();
    this._registerResultsEvents();
    this._registerEvents();

    // Set the initial state
    this.dataAdapter.current(function (initialData) {
      self.trigger('selection:update', {
        data: initialData
      });
    });

    // Hide the original select
    $element[0].classList.add('select2-hidden-accessible');
    $element.attr('aria-hidden', 'true');

    // Synchronize any monitored attributes
    this._syncAttributes();

    Utils.StoreData($element[0], 'select2', this);

    // Ensure backwards compatibility with $element.data('select2').
    $element.data('select2', this);
  };

  Utils.Extend(Select2, Utils.Observable);

  Select2.prototype._generateId = function ($element) {
    var id = '';

    if ($element.attr('id') != null) {
      id = $element.attr('id');
    } else if ($element.attr('name') != null) {
      id = $element.attr('name') + '-' + Utils.generateChars(2);
    } else {
      id = Utils.generateChars(4);
    }

    id = id.replace(/(:|\.|\[|\]|,)/g, '');
    id = 'select2-' + id;

    return id;
  };

  Select2.prototype._placeContainer = function ($container) {
    $container.insertAfter(this.$element);

    var width = this._resolveWidth(this.$element, this.options.get('width'));

    if (width != null) {
      $container.css('width', width);
    }
  };

  Select2.prototype._resolveWidth = function ($element, method) {
    var WIDTH = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;

    if (method == 'resolve') {
      var styleWidth = this._resolveWidth($element, 'style');

      if (styleWidth != null) {
        return styleWidth;
      }

      return this._resolveWidth($element, 'element');
    }

    if (method == 'element') {
      var elementWidth = $element.outerWidth(false);

      if (elementWidth <= 0) {
        return 'auto';
      }

      return elementWidth + 'px';
    }

    if (method == 'style') {
      var style = $element.attr('style');

      if (typeof(style) !== 'string') {
        return null;
      }

      var attrs = style.split(';');

      for (var i = 0, l = attrs.length; i < l; i = i + 1) {
        var attr = attrs[i].replace(/\s/g, '');
        var matches = attr.match(WIDTH);

        if (matches !== null && matches.length >= 1) {
          return matches[1];
        }
      }

      return null;
    }

    if (method == 'computedstyle') {
      var computedStyle = window.getComputedStyle($element[0]);

      return computedStyle.width;
    }

    return method;
  };

  Select2.prototype._bindAdapters = function () {
    this.dataAdapter.bind(this, this.$container);
    this.selection.bind(this, this.$container);

    this.dropdown.bind(this, this.$container);
    this.results.bind(this, this.$container);
  };

  Select2.prototype._registerDomEvents = function () {
    var self = this;

    this.$element.on('change.select2', function () {
      self.dataAdapter.current(function (data) {
        self.trigger('selection:update', {
          data: data
        });
      });
    });

    this.$element.on('focus.select2', function (evt) {
      self.trigger('focus', evt);
    });

    this._syncA = Utils.bind(this._syncAttributes, this);
    this._syncS = Utils.bind(this._syncSubtree, this);

    this._observer = new window.MutationObserver(function (mutations) {
      self._syncA();
      self._syncS(mutations);
    });
    this._observer.observe(this.$element[0], {
      attributes: true,
      childList: true,
      subtree: false
    });
  };

  Select2.prototype._registerDataEvents = function () {
    var self = this;

    this.dataAdapter.on('*', function (name, params) {
      self.trigger(name, params);
    });
  };

  Select2.prototype._registerSelectionEvents = function () {
    var self = this;
    var nonRelayEvents = ['toggle', 'focus'];

    this.selection.on('toggle', function () {
      self.toggleDropdown();
    });

    this.selection.on('focus', function (params) {
      self.focus(params);
    });

    this.selection.on('*', function (name, params) {
      if (nonRelayEvents.indexOf(name) !== -1) {
        return;
      }

      self.trigger(name, params);
    });
  };

  Select2.prototype._registerDropdownEvents = function () {
    var self = this;

    this.dropdown.on('*', function (name, params) {
      self.trigger(name, params);
    });
  };

  Select2.prototype._registerResultsEvents = function () {
    var self = this;

    this.results.on('*', function (name, params) {
      self.trigger(name, params);
    });
  };

  Select2.prototype._registerEvents = function () {
    var self = this;

    this.on('open', function () {
      self.$container[0].classList.add('select2-container--open');
    });

    this.on('close', function () {
      self.$container[0].classList.remove('select2-container--open');
    });

    this.on('enable', function () {
      self.$container[0].classList.remove('select2-container--disabled');
    });

    this.on('disable', function () {
      self.$container[0].classList.add('select2-container--disabled');
    });

    this.on('blur', function () {
      self.$container[0].classList.remove('select2-container--focus');
    });

    this.on('query', function (params) {
      if (!self.isOpen()) {
        self.trigger('open', {});
      }

      this.dataAdapter.query(params, function (data) {
        self.trigger('results:all', {
          data: data,
          query: params
        });
      });
    });

    this.on('query:append', function (params) {
      this.dataAdapter.query(params, function (data) {
        self.trigger('results:append', {
          data: data,
          query: params
        });
      });
    });

    this.on('keypress', function (evt) {
      var key = evt.which;

      if (self.isOpen()) {
        if (key === KEYS.ESC || (key === KEYS.UP && evt.altKey)) {
          self.close(evt);

          evt.preventDefault();
        } else if (key === KEYS.ENTER || key === KEYS.TAB) {
          self.trigger('results:select', {});

          evt.preventDefault();
        } else if ((key === KEYS.SPACE && evt.ctrlKey)) {
          self.trigger('results:toggle', {});

          evt.preventDefault();
        } else if (key === KEYS.UP) {
          self.trigger('results:previous', {});

          evt.preventDefault();
        } else if (key === KEYS.DOWN) {
          self.trigger('results:next', {});

          evt.preventDefault();
        }
      } else {
        if (key === KEYS.ENTER || key === KEYS.SPACE ||
            (key === KEYS.DOWN && evt.altKey)) {
          self.open();

          evt.preventDefault();
        }
      }
    });
  };

  Select2.prototype._syncAttributes = function () {
    this.options.set('disabled', this.$element.prop('disabled'));

    if (this.isDisabled()) {
      if (this.isOpen()) {
        this.close();
      }

      this.trigger('disable', {});
    } else {
      this.trigger('enable', {});
    }
  };

  Select2.prototype._isChangeMutation = function (mutations) {
    var self = this;

    if (mutations.addedNodes && mutations.addedNodes.length > 0) {
      for (var n = 0; n < mutations.addedNodes.length; n++) {
        var node = mutations.addedNodes[n];

        if (node.selected) {
          return true;
        }
      }
    } else if (mutations.removedNodes && mutations.removedNodes.length > 0) {
      return true;
    } else if (Array.isArray(mutations)) {
      return mutations.some(function (mutation) {
        return self._isChangeMutation(mutation);
      });
    }

    return false;
  };

  Select2.prototype._syncSubtree = function (mutations) {
    var changed = this._isChangeMutation(mutations);
    var self = this;

    // Only re-pull the data if we think there is a change
    if (changed) {
      this.dataAdapter.current(function (currentData) {
        self.trigger('selection:update', {
          data: currentData
        });
      });
    }
  };

  /**
   * Override the trigger method to automatically trigger pre-events when
   * there are events that can be prevented.
   */
  Select2.prototype.trigger = function (name, args) {
    var actualTrigger = Select2.__super__.trigger;
    var preTriggerMap = {
      'open': 'opening',
      'close': 'closing',
      'select': 'selecting',
      'unselect': 'unselecting',
      'clear': 'clearing'
    };

    if (args === undefined) {
      args = {};
    }

    if (name in preTriggerMap) {
      var preTriggerName = preTriggerMap[name];
      var preTriggerArgs = {
        prevented: false,
        name: name,
        args: args
      };

      actualTrigger.call(this, preTriggerName, preTriggerArgs);

      if (preTriggerArgs.prevented) {
        args.prevented = true;

        return;
      }
    }

    actualTrigger.call(this, name, args);
  };

  Select2.prototype.toggleDropdown = function () {
    if (this.isDisabled()) {
      return;
    }

    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  };

  Select2.prototype.open = function () {
    if (this.isOpen()) {
      return;
    }

    if (this.isDisabled()) {
      return;
    }

    this.trigger('query', {});
  };

  Select2.prototype.close = function (evt) {
    if (!this.isOpen()) {
      return;
    }

    this.trigger('close', { originalEvent : evt });
  };

  /**
   * Helper method to abstract the "enabled" (not "disabled") state of this
   * object.
   *
   * @return {true} if the instance is not disabled.
   * @return {false} if the instance is disabled.
   */
  Select2.prototype.isEnabled = function () {
    return !this.isDisabled();
  };

  /**
   * Helper method to abstract the "disabled" state of this object.
   *
   * @return {true} if the disabled option is true.
   * @return {false} if the disabled option is false.
   */
  Select2.prototype.isDisabled = function () {
    return this.options.get('disabled');
  };

  Select2.prototype.isOpen = function () {
    return this.$container[0].classList.contains('select2-container--open');
  };

  Select2.prototype.hasFocus = function () {
    return this.$container[0].classList.contains('select2-container--focus');
  };

  Select2.prototype.focus = function (data) {
    // No need to re-trigger focus events if we are already focused
    if (this.hasFocus()) {
      return;
    }

    this.$container[0].classList.add('select2-container--focus');
    this.trigger('focus', {});
  };

  Select2.prototype.enable = function (args) {
    if (this.options.get('debug') && window.console && console.warn) {
      console.warn(
        'Select2: The `select2("enable")` method has been deprecated and will' +
        ' be removed in later Select2 versions. Use $element.prop("disabled")' +
        ' instead.'
      );
    }

    if (args == null || args.length === 0) {
      args = [true];
    }

    var disabled = !args[0];

    this.$element.prop('disabled', disabled);
  };

  Select2.prototype.data = function () {
    if (this.options.get('debug') &&
        arguments.length > 0 && window.console && console.warn) {
      console.warn(
        'Select2: Data can no longer be set using `select2("data")`. You ' +
        'should consider setting the value instead using `$element.val()`.'
      );
    }

    var data = [];

    this.dataAdapter.current(function (currentData) {
      data = currentData;
    });

    return data;
  };

  Select2.prototype.val = function (args) {
    if (this.options.get('debug') && window.console && console.warn) {
      console.warn(
        'Select2: The `select2("val")` method has been deprecated and will be' +
        ' removed in later Select2 versions. Use $element.val() instead.'
      );
    }

    if (args == null || args.length === 0) {
      return this.$element.val();
    }

    var newVal = args[0];

    if (Array.isArray(newVal)) {
      newVal = newVal.map(function (obj) {
        return obj.toString();
      });
    }

    this.$element.val(newVal).trigger('input').trigger('change');
  };

  Select2.prototype.destroy = function () {
    Utils.RemoveData(this.$container[0]);
    this.$container.remove();

    this._observer.disconnect();
    this._observer = null;

    this._syncA = null;
    this._syncS = null;

    this.$element.off('.select2');
    this.$element.attr('tabindex',
    Utils.GetData(this.$element[0], 'old-tabindex'));

    this.$element[0].classList.remove('select2-hidden-accessible');
    this.$element.attr('aria-hidden', 'false');
    Utils.RemoveData(this.$element[0]);
    this.$element.removeData('select2');

    this.dataAdapter.destroy();
    this.selection.destroy();
    this.dropdown.destroy();
    this.results.destroy();

    this.dataAdapter = null;
    this.selection = null;
    this.dropdown = null;
    this.results = null;
  };

  Select2.prototype.render = function () {
    var $container = $(
      '<span class="select2 select2-container">' +
        '<span class="selection"></span>' +
        '<span class="dropdown-wrapper" aria-hidden="true"></span>' +
      '</span>'
    );

    $container.attr('dir', this.options.get('dir'));

    this.$container = $container;

    this.$container[0].classList
      .add('select2-container--' + this.options.get('theme'));

    Utils.StoreData($container[0], 'element', this.$element);

    return $container;
  };

  return Select2;
});

S2.define('jquery-mousewheel',[
  'jquery'
], function ($) {
  // Used to shim jQuery.mousewheel for non-full builds.
  return $;
});

S2.define('jquery.select2',[
  'jquery',
  'jquery-mousewheel',

  './select2/core',
  './select2/defaults',
  './select2/utils'
], function ($, _, Select2, Defaults, Utils) {
  if ($.fn.select2 == null) {
    // All methods that should return the element
    var thisMethods = ['open', 'close', 'destroy'];

    $.fn.select2 = function (options) {
      options = options || {};

      if (typeof options === 'object') {
        this.each(function () {
          var instanceOptions = $.extend(true, {}, options);

          var instance = new Select2($(this), instanceOptions);
        });

        return this;
      } else if (typeof options === 'string') {
        var ret;
        var args = Array.prototype.slice.call(arguments, 1);

        this.each(function () {
          var instance = Utils.GetData(this, 'select2');

          if (instance == null && window.console && console.error) {
            console.error(
              'The select2(\'' + options + '\') method was called on an ' +
              'element that is not using Select2.'
            );
          }

          ret = instance[options].apply(instance, args);
        });

        // Check if we should be returning `this`
        if (thisMethods.indexOf(options) > -1) {
          return this;
        }

        return ret;
      } else {
        throw new Error('Invalid arguments for Select2: ' + options);
      }
    };
  }

  if ($.fn.select2.defaults == null) {
    $.fn.select2.defaults = Defaults;
  }

  return Select2;
});

  // Return the AMD loader configuration so it can be used outside of this file
  return {
    define: S2.define,
    require: S2.require
  };
}());

  // Autoload the jQuery bindings
  // We know that all of the modules exist above this, so we're safe
  var select2 = S2.require('jquery.select2');

  // Hold the AMD module references on the jQuery function that was just loaded
  // This allows Select2 to use the internal loader outside of this file, such
  // as in the language files.
  jQuery.fn.select2.amd = S2;

  // Return the Select2 instance for anyone who is importing it.
  return select2;
}));

/*
 * pagination.js 2.1.5
 * A jQuery plugin to provide simple yet fully customisable pagination.
 * https://github.com/superRaytin/paginationjs
 *
 * Homepage: http://pagination.js.org
 *
 * Copyright 2014-2100, superRaytin
 * Released under the MIT license.
 */

(function(global, $) {

  if (typeof $ === 'undefined') {
    throwError('Pagination requires jQuery.');
  }

  var pluginName = 'pagination';

  var pluginHookMethod = 'addHook';

  var eventPrefix = '__pagination-';

  // Conflict, use backup
  if ($.fn.pagination) {
    pluginName = 'pagination2';
  }

  $.fn[pluginName] = function(options) {

    if (typeof options === 'undefined') {
      return this;
    }

    var container = $(this);

    var attributes = $.extend({}, $.fn[pluginName].defaults, options);

    var pagination = {

      initialize: function() {
        var self = this;

        // Cache attributes of current instance
        if (!container.data('pagination')) {
          container.data('pagination', {});
        }

        if (self.callHook('beforeInit') === false) return;

        // Pagination has been initialized, destroy it
        if (container.data('pagination').initialized) {
          $('.paginationjs', container).remove();
        }

        // Whether to disable Pagination at the initialization
        self.disabled = !!attributes.disabled;

        // Model will be passed to the callback function
        var model = self.model = {
          pageRange: attributes.pageRange,
          pageSize: attributes.pageSize
        };

        // dataSource`s type is unknown, parse it to find true data
        self.parseDataSource(attributes.dataSource, function(dataSource) {

          // Currently in asynchronous mode
          self.isAsync = Helpers.isString(dataSource);
          if (Helpers.isArray(dataSource)) {
            model.totalNumber = attributes.totalNumber = dataSource.length;
          }

          // Currently in asynchronous mode and a totalNumberLocator is specified
          self.isDynamicTotalNumber = self.isAsync && attributes.totalNumberLocator;

          var el = self.render(true);

          // Add extra className to the pagination element
            if (attributes.className) {
            el.addClass(attributes.className);
          }

          model.el = el;

          // Append/prepend pagination element to the container
          container[attributes.position === 'bottom' ? 'append' : 'prepend'](el);

          // Bind events
          self.observer();

          // Pagination is currently initialized
          container.data('pagination').initialized = true;

          // Will be invoked after initialized
          self.callHook('afterInit', el);
        });
      },

      render: function(isBoot) {
        var self = this;
        var model = self.model;
        var el = model.el || $('<div class="paginationjs"></div>');
        var isForced = isBoot !== true;

        self.callHook('beforeRender', isForced);

        var currentPage = model.pageNumber || attributes.pageNumber;
        var pageRange = attributes.pageRange || 0;
        var totalPage = self.getTotalPage();

        var rangeStart = currentPage - pageRange;
        var rangeEnd = currentPage + pageRange;

        if (rangeEnd > totalPage) {
          rangeEnd = totalPage;
          rangeStart = totalPage - pageRange * 2;
          rangeStart = rangeStart < 1 ? 1 : rangeStart;
        }

        if (rangeStart <= 1) {
          rangeStart = 1;
          rangeEnd = Math.min(pageRange * 2 + 1, totalPage);
        }

        el.html(self.generateHTML({
          currentPage: currentPage,
          pageRange: pageRange,
          rangeStart: rangeStart,
          rangeEnd: rangeEnd
        }));

        // There is only one page
        if (attributes.hideWhenLessThanOnePage) {
          el[totalPage <= 1 ? 'hide' : 'show']();
        }

        self.callHook('afterRender', isForced);

        return el;
      },

      // Generate HTML of the pages
      generatePageNumbersHTML: function(args) {
        var self = this;
        var currentPage = args.currentPage;
        var totalPage = self.getTotalPage();
        var rangeStart = args.rangeStart;
        var rangeEnd = args.rangeEnd;
        var html = '';
        var i;

        var pageLink = attributes.pageLink;
        var ellipsisText = attributes.ellipsisText;

        var classPrefix = attributes.classPrefix;
        var activeClassName = attributes.activeClassName;
        var disableClassName = attributes.disableClassName;

        // Disable page range, display all the pages
        if (attributes.pageRange === null) {
          for (i = 1; i <= totalPage; i++) {
            if (i == currentPage) {
              html += '<li class="' + classPrefix + '-page J-paginationjs-page ' + activeClassName + '" data-num="' + i + '"><a>' + i + '<\/a><\/li>';
            } else {
              html += '<li class="' + classPrefix + '-page J-paginationjs-page" data-num="' + i + '"><a href="' + pageLink + '">' + i + '<\/a><\/li>';
            }
          }
          return html;
        }

        if (rangeStart <= 3) {
          for (i = 1; i < rangeStart; i++) {
            if (i == currentPage) {
              html += '<li class="' + classPrefix + '-page J-paginationjs-page ' + activeClassName + '" data-num="' + i + '"><a>' + i + '<\/a><\/li>';
            } else {
              html += '<li class="' + classPrefix + '-page J-paginationjs-page" data-num="' + i + '"><a href="' + pageLink + '">' + i + '<\/a><\/li>';
            }
          }
        } else {
          if (attributes.showFirstOnEllipsisShow) {
            html += '<li class="' + classPrefix + '-page ' + classPrefix + '-first J-paginationjs-page" data-num="1"><a href="' + pageLink + '">1<\/a><\/li>';
          }
          html += '<li class="' + classPrefix + '-ellipsis ' + disableClassName + '"><a>' + ellipsisText + '<\/a><\/li>';
        }

        for (i = rangeStart; i <= rangeEnd; i++) {
          if (i == currentPage) {
            html += '<li class="' + classPrefix + '-page J-paginationjs-page ' + activeClassName + '" data-num="' + i + '"><a>' + i + '<\/a><\/li>';
          } else {
            html += '<li class="' + classPrefix + '-page J-paginationjs-page" data-num="' + i + '"><a href="' + pageLink + '">' + i + '<\/a><\/li>';
          }
        }

        if (rangeEnd >= totalPage - 2) {
          for (i = rangeEnd + 1; i <= totalPage; i++) {
            html += '<li class="' + classPrefix + '-page J-paginationjs-page" data-num="' + i + '"><a href="' + pageLink + '">' + i + '<\/a><\/li>';
          }
        } else {
          html += '<li class="' + classPrefix + '-ellipsis ' + disableClassName + '"><a>' + ellipsisText + '<\/a><\/li>';

          if (attributes.showLastOnEllipsisShow) {
            html += '<li class="' + classPrefix + '-page ' + classPrefix + '-last J-paginationjs-page" data-num="' + totalPage + '"><a href="' + pageLink + '">' + totalPage + '<\/a><\/li>';
          }
        }

        return html;
      },

      // Generate HTML content from the template
      generateHTML: function(args) {
        var self = this;
        var currentPage = args.currentPage;
        var totalPage = self.getTotalPage();

        var totalNumber = self.getTotalNumber();

        var showPrevious = attributes.showPrevious;
        var showNext = attributes.showNext;
        var showPageNumbers = attributes.showPageNumbers;
        var showNavigator = attributes.showNavigator;
        var showGoInput = attributes.showGoInput;
        var showGoButton = attributes.showGoButton;

        var pageLink = attributes.pageLink;
        var prevText = attributes.prevText;
        var nextText = attributes.nextText;
        var goButtonText = attributes.goButtonText;

        var classPrefix = attributes.classPrefix;
        var disableClassName = attributes.disableClassName;
        var ulClassName = attributes.ulClassName;

        var html = '';
        var goInput = '<input type="text" class="J-paginationjs-go-pagenumber">';
        var goButton = '<input type="button" class="J-paginationjs-go-button" value="' + goButtonText + '">';
        var formattedString;

        var formatNavigator = $.isFunction(attributes.formatNavigator) ? attributes.formatNavigator(currentPage, totalPage, totalNumber) : attributes.formatNavigator;
        var formatGoInput = $.isFunction(attributes.formatGoInput) ? attributes.formatGoInput(goInput, currentPage, totalPage, totalNumber) : attributes.formatGoInput;
        var formatGoButton = $.isFunction(attributes.formatGoButton) ? attributes.formatGoButton(goButton, currentPage, totalPage, totalNumber) : attributes.formatGoButton;

        var autoHidePrevious = $.isFunction(attributes.autoHidePrevious) ? attributes.autoHidePrevious() : attributes.autoHidePrevious;
        var autoHideNext = $.isFunction(attributes.autoHideNext) ? attributes.autoHideNext() : attributes.autoHideNext;

        var header = $.isFunction(attributes.header) ? attributes.header(currentPage, totalPage, totalNumber) : attributes.header;
        var footer = $.isFunction(attributes.footer) ? attributes.footer(currentPage, totalPage, totalNumber) : attributes.footer;

        // Whether to display header
        if (header) {
          formattedString = self.replaceVariables(header, {
            currentPage: currentPage,
            totalPage: totalPage,
            totalNumber: totalNumber
          });
          html += formattedString;
        }

        if (showPrevious || showPageNumbers || showNext) {
          html += '<div class="paginationjs-pages">';

          if (ulClassName) {
            html += '<ul class="' + ulClassName + '">';
          } else {
            html += '<ul>';
          }

          // Whether to display the Previous button
          if (showPrevious) {
            if (currentPage <= 1) {
              if (!autoHidePrevious) {
                html += '<li class="' + classPrefix + '-prev ' + disableClassName + '"><a>' + prevText + '<\/a><\/li>';
              }
            } else {
              html += '<li class="' + classPrefix + '-prev J-paginationjs-previous" data-num="' + (currentPage - 1) + '" title="Previous page"><a href="' + pageLink + '">' + prevText + '<\/a><\/li>';
            }
          }

          // Whether to display the pages
          if (showPageNumbers) {
            html += self.generatePageNumbersHTML(args);
          }

          // Whether to display the Next button
          if (showNext) {
            if (currentPage >= totalPage) {
              if (!autoHideNext) {
                html += '<li class="' + classPrefix + '-next ' + disableClassName + '"><a>' + nextText + '<\/a><\/li>';
              }
            } else {
              html += '<li class="' + classPrefix + '-next J-paginationjs-next" data-num="' + (currentPage + 1) + '" title="Next page"><a href="' + pageLink + '">' + nextText + '<\/a><\/li>';
            }
          }
          html += '<\/ul><\/div>';
        }

        // Whether to display the navigator
        if (showNavigator) {
          if (formatNavigator) {
            formattedString = self.replaceVariables(formatNavigator, {
              currentPage: currentPage,
              totalPage: totalPage,
              totalNumber: totalNumber
            });
            html += '<div class="' + classPrefix + '-nav J-paginationjs-nav">' + formattedString + '<\/div>';
          }
        }

        // Whether to display the Go input
        if (showGoInput) {
          if (formatGoInput) {
            formattedString = self.replaceVariables(formatGoInput, {
              currentPage: currentPage,
              totalPage: totalPage,
              totalNumber: totalNumber,
              input: goInput
            });
            html += '<div class="' + classPrefix + '-go-input">' + formattedString + '</div>';
          }
        }

        // Whether to display the Go button
        if (showGoButton) {
          if (formatGoButton) {
            formattedString = self.replaceVariables(formatGoButton, {
              currentPage: currentPage,
              totalPage: totalPage,
              totalNumber: totalNumber,
              button: goButton
            });
            html += '<div class="' + classPrefix + '-go-button">' + formattedString + '</div>';
          }
        }

        // Whether to display footer
        if (footer) {
          formattedString = self.replaceVariables(footer, {
            currentPage: currentPage,
            totalPage: totalPage,
            totalNumber: totalNumber
          });
          html += formattedString;
        }

        return html;
      },

      // Find totalNumber from the remote response
      // Only available in asynchronous mode
      findTotalNumberFromRemoteResponse: function(response) {
        var self = this;
        self.model.totalNumber = attributes.totalNumberLocator(response);
      },

      // Go to the specified page
      go: function(number, callback) {
        var self = this;
        var model = self.model;

        if (self.disabled) return;

        var pageNumber = number;
        pageNumber = parseInt(pageNumber);

        // Page number is out of bounds
        if (!pageNumber || pageNumber < 1) return;

        var pageSize = attributes.pageSize;
        var totalNumber = self.getTotalNumber();
        var totalPage = self.getTotalPage();

        // Page number is out of bounds
        if (totalNumber > 0) {
          if (pageNumber > totalPage) return;
        }

        // Pick data fragment in synchronous mode
        if (!self.isAsync) {
          render(self.getDataFragment(pageNumber));
          return;
        }

        var postData = {};
        var alias = attributes.alias || {};
        postData[alias.pageSize ? alias.pageSize : 'pageSize'] = pageSize;
        postData[alias.pageNumber ? alias.pageNumber : 'pageNumber'] = pageNumber;

        var ajaxParams = $.isFunction(attributes.ajax) ? attributes.ajax() : attributes.ajax;
        var formatAjaxParams = {
          type: 'get',
          cache: false,
          data: {},
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          dataType: 'json',
          async: true
        };

        $.extend(true, formatAjaxParams, ajaxParams);
        $.extend(formatAjaxParams.data, postData);

        formatAjaxParams.url = attributes.dataSource;
        formatAjaxParams.success = function(response) {
          if (self.isDynamicTotalNumber) {
            self.findTotalNumberFromRemoteResponse(response);
          } else {
            self.model.totalNumber = attributes.totalNumber;
          }

          var finalData = self.filterDataByLocator(response);
          render(finalData);
        };
        formatAjaxParams.error = function(jqXHR, textStatus, errorThrown) {
          attributes.formatAjaxError && attributes.formatAjaxError(jqXHR, textStatus, errorThrown);
          self.enable();
        };

        self.disable();

        $.ajax(formatAjaxParams);

        function render(data) {
          // Will be invoked before paging
          if (self.callHook('beforePaging', pageNumber) === false) return false;

          // Pagination direction
          model.direction = typeof model.pageNumber === 'undefined' ? 0 : (pageNumber > model.pageNumber ? 1 : -1);

          model.pageNumber = pageNumber;

          self.render();

          if (self.disabled && self.isAsync) {
            // enable pagination
            self.enable();
          }

          // cache model data
          container.data('pagination').model = model;

          // format result data before callback invoked
          if (attributes.formatResult) {
            var cloneData = $.extend(true, [], data);
            if (!Helpers.isArray(data = attributes.formatResult(cloneData))) {
              data = cloneData;
            }
          }

          container.data('pagination').currentPageData = data;

          // invoke callback
          self.doCallback(data, callback);

          self.callHook('afterPaging', pageNumber);

          // pageNumber now is the first page
          if (pageNumber == 1) {
            self.callHook('afterIsFirstPage');
          }

          // pageNumber now is the last page
          if (pageNumber == self.getTotalPage()) {
            self.callHook('afterIsLastPage');
          }
        }
      },

      doCallback: function(data, customCallback) {
        var self = this;
        var model = self.model;

        if ($.isFunction(customCallback)) {
          customCallback(data, model);
        } else if ($.isFunction(attributes.callback)) {
          attributes.callback(data, model);
        }
      },

      destroy: function() {
        // Before destroy
        if (this.callHook('beforeDestroy') === false) return;

        this.model.el.remove();
        container.off();

        // Remove style element
        $('#paginationjs-style').remove();

        // After destroyed
        this.callHook('afterDestroy');
      },

      previous: function(callback) {
        this.go(this.model.pageNumber - 1, callback);
      },

      next: function(callback) {
        this.go(this.model.pageNumber + 1, callback);
      },

      disable: function() {
        var self = this;
        var source = self.isAsync ? 'async' : 'sync';

        // Before disabled
        if (self.callHook('beforeDisable', source) === false) return;

        self.disabled = true;
        self.model.disabled = true;

        // After disabled
        self.callHook('afterDisable', source);
      },

      enable: function() {
        var self = this;
        var source = self.isAsync ? 'async' : 'sync';

        // Before enabled
        if (self.callHook('beforeEnable', source) === false) return;

        self.disabled = false;
        self.model.disabled = false;

        // After enabled
        self.callHook('afterEnable', source);
      },

      refresh: function(callback) {
        this.go(this.model.pageNumber, callback);
      },

      show: function() {
        var self = this;

        if (self.model.el.is(':visible')) return;

        self.model.el.show();
      },

      hide: function() {
        var self = this;

        if (!self.model.el.is(':visible')) return;

        self.model.el.hide();
      },

      // Parse variables in the template
      replaceVariables: function(template, variables) {
        var formattedString;

        for (var key in variables) {
          var value = variables[key];
          var regexp = new RegExp('<%=\\s*' + key + '\\s*%>', 'img');

          formattedString = (formattedString || template).replace(regexp, value);
        }

        return formattedString;
      },

      // Get data fragment
      getDataFragment: function(number) {
        var pageSize = attributes.pageSize;
        var dataSource = attributes.dataSource;
        var totalNumber = this.getTotalNumber();

        var start = pageSize * (number - 1) + 1;
        var end = Math.min(number * pageSize, totalNumber);

        return dataSource.slice(start - 1, end);
      },

      // Get total number
      getTotalNumber: function() {
        return this.model.totalNumber || attributes.totalNumber || 0;
      },

      // Get total page
      getTotalPage: function() {
        return Math.ceil(this.getTotalNumber() / attributes.pageSize);
      },

      // Get locator
      getLocator: function(locator) {
        var result;

        if (typeof locator === 'string') {
          result = locator;
        } else if ($.isFunction(locator)) {
          result = locator();
        } else {
          throwError('"locator" is incorrect. (String | Function)');
        }

        return result;
      },

      // Filter data by "locator"
      filterDataByLocator: function(dataSource) {
        var locator = this.getLocator(attributes.locator);
        var filteredData;

        // Datasource is an Object, use "locator" to locate the true data
        if (Helpers.isObject(dataSource)) {
          try {
            $.each(locator.split('.'), function(index, item) {
              filteredData = (filteredData ? filteredData : dataSource)[item];
            });
          }
          catch (e) {
          }

          if (!filteredData) {
            throwError('dataSource.' + locator + ' is undefined.');
          } else if (!Helpers.isArray(filteredData)) {
            throwError('dataSource.' + locator + ' must be an Array.');
          }
        }

        return filteredData || dataSource;
      },

      // Parse dataSource
      parseDataSource: function(dataSource, callback) {
        var self = this;

        if (Helpers.isObject(dataSource)) {
          callback(attributes.dataSource = self.filterDataByLocator(dataSource));
        } else if (Helpers.isArray(dataSource)) {
          callback(attributes.dataSource = dataSource);
        } else if ($.isFunction(dataSource)) {
          attributes.dataSource(function(data) {
            if (!Helpers.isArray(data)) {
              throwError('The parameter of "done" Function should be an Array.');
            }
            self.parseDataSource.call(self, data, callback);
          });
        } else if (typeof dataSource === 'string') {
          if (/^https?|file:/.test(dataSource)) {
            attributes.ajaxDataType = 'jsonp';
          }
          callback(dataSource);
        } else {
          throwError('Unexpected type of "dataSource".');
        }
      },

      callHook: function(hook) {
        var paginationData = container.data('pagination');
        var result;

        var args = Array.prototype.slice.apply(arguments);
        args.shift();

        if (attributes[hook] && $.isFunction(attributes[hook])) {
          if (attributes[hook].apply(global, args) === false) {
            result = false;
          }
        }

        if (paginationData.hooks && paginationData.hooks[hook]) {
          $.each(paginationData.hooks[hook], function(index, item) {
            if (item.apply(global, args) === false) {
              result = false;
            }
          });
        }

        return result !== false;
      },

      observer: function() {
        var self = this;
        var el = self.model.el;

        // Go to specified page number
        container.on(eventPrefix + 'go', function(event, pageNumber, done) {
          pageNumber = parseInt($.trim(pageNumber));

          if (!pageNumber) return;

          if (!$.isNumeric(pageNumber)) {
            throwError('"pageNumber" is incorrect. (Number)');
          }

          self.go(pageNumber, done);
        });

        // Page number button click
        el.delegate('.J-paginationjs-page', 'click', function(event) {
          var current = $(event.currentTarget);
          var pageNumber = $.trim(current.attr('data-num'));

          if (!pageNumber || current.hasClass(attributes.disableClassName) || current.hasClass(attributes.activeClassName)) return;

          // Before page button clicked
          if (self.callHook('beforePageOnClick', event, pageNumber) === false) return false;

          self.go(pageNumber);

          // After page button clicked
          self.callHook('afterPageOnClick', event, pageNumber);

          if (!attributes.pageLink) return false;
        });

        // Previous button click
        el.delegate('.J-paginationjs-previous', 'click', function(event) {
          var current = $(event.currentTarget);
          var pageNumber = $.trim(current.attr('data-num'));

          if (!pageNumber || current.hasClass(attributes.disableClassName)) return;

          // Before previous clicked
          if (self.callHook('beforePreviousOnClick', event, pageNumber) === false) return false;

          self.go(pageNumber);

          // After previous clicked
          self.callHook('afterPreviousOnClick', event, pageNumber);

          if (!attributes.pageLink) return false;
        });

        // Next button click
        el.delegate('.J-paginationjs-next', 'click', function(event) {
          var current = $(event.currentTarget);
          var pageNumber = $.trim(current.attr('data-num'));

          if (!pageNumber || current.hasClass(attributes.disableClassName)) return;

          // Before next clicked
          if (self.callHook('beforeNextOnClick', event, pageNumber) === false) return false;

          self.go(pageNumber);

          // After next clicked
          self.callHook('afterNextOnClick', event, pageNumber);

          if (!attributes.pageLink) return false;
        });

        // Go button click
        el.delegate('.J-paginationjs-go-button', 'click', function(event) {
          var pageNumber = $('.J-paginationjs-go-pagenumber', el).val();

          // Before Go button clicked
          if (self.callHook('beforeGoButtonOnClick', event, pageNumber) === false) return false;

          container.trigger(eventPrefix + 'go', pageNumber);

          // After Go button clicked
          self.callHook('afterGoButtonOnClick', event, pageNumber);
        });

        // go input enter
        el.delegate('.J-paginationjs-go-pagenumber', 'keyup', function(event) {
          if (event.which === 13) {
            var pageNumber = $(event.currentTarget).val();

            // Before Go input enter
            if (self.callHook('beforeGoInputOnEnter', event, pageNumber) === false) return false;

            container.trigger(eventPrefix + 'go', pageNumber);

            // Regains focus
            $('.J-paginationjs-go-pagenumber', el).focus();

            // After Go input enter
            self.callHook('afterGoInputOnEnter', event, pageNumber);
          }
        });

        // Previous page
        container.on(eventPrefix + 'previous', function(event, done) {
          self.previous(done);
        });

        // Next page
        container.on(eventPrefix + 'next', function(event, done) {
          self.next(done);
        });

        // Disable
        container.on(eventPrefix + 'disable', function() {
          self.disable();
        });

        // Enable
        container.on(eventPrefix + 'enable', function() {
          self.enable();
        });

        // Refresh
        container.on(eventPrefix + 'refresh', function(event, done) {
          self.refresh(done);
        });

        // Show
        container.on(eventPrefix + 'show', function() {
          self.show();
        });

        // Hide
        container.on(eventPrefix + 'hide', function() {
          self.hide();
        });

        // Destroy
        container.on(eventPrefix + 'destroy', function() {
          self.destroy();
        });

        // Whether to load the default page
        var validTotalPage = Math.max(self.getTotalPage(), 1)
        var defaultPageNumber = attributes.pageNumber;
        // Default pageNumber should be 1 when totalNumber is dynamic
        if (self.isDynamicTotalNumber) {
          defaultPageNumber = 1;
        }
        if (attributes.triggerPagingOnInit) {
          container.trigger(eventPrefix + 'go', Math.min(defaultPageNumber, validTotalPage));
        }
      }
    };

    // Pagination has been initialized
    if (container.data('pagination') && container.data('pagination').initialized === true) {
      // Handle events
      if ($.isNumeric(options)) {
        // eg: container.pagination(5)
        container.trigger.call(this, eventPrefix + 'go', options, arguments[1]);
        return this;
      } else if (typeof options === 'string') {
        var args = Array.prototype.slice.apply(arguments);
        args[0] = eventPrefix + args[0];

        switch (options) {
          case 'previous':
          case 'next':
          case 'go':
          case 'disable':
          case 'enable':
          case 'refresh':
          case 'show':
          case 'hide':
          case 'destroy':
            container.trigger.apply(this, args);
            break;
          // Get selected page number
          case 'getSelectedPageNum':
            if (container.data('pagination').model) {
              return container.data('pagination').model.pageNumber;
            } else {
              return container.data('pagination').attributes.pageNumber;
            }
          // Get total page
          case 'getTotalPage':
            return Math.ceil(container.data('pagination').model.totalNumber / container.data('pagination').model.pageSize);
          // Get data of selected page
          case 'getSelectedPageData':
            return container.data('pagination').currentPageData;
          // Whether pagination has been disabled
          case 'isDisabled':
            return container.data('pagination').model.disabled === true;
          default:
            throwError('Unknown action: ' + options);
        }
        return this;
      } else {
        // Uninstall the old instance before initializing a new one
        uninstallPlugin(container);
      }
    } else {
      if (!Helpers.isObject(options)) throwError('Illegal options');
    }

    // Check parameters
    parameterChecker(attributes);

    pagination.initialize();

    return this;
  };

  // Instance defaults
  $.fn[pluginName].defaults = {

    // Data source
    // Array | String | Function | Object
    //dataSource: '',

    // String | Function
    //locator: 'data',

    // Find totalNumber from remote response, the totalNumber will be ignored when totalNumberLocator is specified
    // Function
    //totalNumberLocator: function() {},

    // Total entries
    totalNumber: 0,

    // Default page
    pageNumber: 1,

    // entries of per page
    pageSize: 10,

    // Page range (pages on both sides of the current page)
    pageRange: 2,

    // Whether to display the 'Previous' button
    showPrevious: true,

    // Whether to display the 'Next' button
    showNext: true,

    // Whether to display the page buttons
    showPageNumbers: true,

    showNavigator: false,

    // Whether to display the 'Go' input
    showGoInput: false,

    // Whether to display the 'Go' button
    showGoButton: false,

    // Page link
    pageLink: '',

    // 'Previous' text
    prevText: '&laquo;',

    // 'Next' text
    nextText: '&raquo;',

    // Ellipsis text
    ellipsisText: '...',

    // 'Go' button text
    goButtonText: 'Go',

    // Additional className for Pagination element
    //className: '',

    classPrefix: 'paginationjs',

    // Default active class
    activeClassName: 'active',

    // Default disable class
    disableClassName: 'disabled',

    //ulClassName: '',

    // Whether to insert inline style
    inlineStyle: true,

    formatNavigator: '<%= currentPage %> / <%= totalPage %>',

    formatGoInput: '<%= input %>',

    formatGoButton: '<%= button %>',

    // Pagination element's position in the container
    position: 'bottom',

    // Auto hide previous button when current page is the first page
    autoHidePrevious: false,

    // Auto hide next button when current page is the last page
    autoHideNext: false,

    //header: '',

    //footer: '',

    // Aliases for custom pagination parameters
    //alias: {},

    // Whether to trigger pagination at initialization
    triggerPagingOnInit: true,

    // Whether to hide pagination when less than one page
    hideWhenLessThanOnePage: false,

    showFirstOnEllipsisShow: true,

    showLastOnEllipsisShow: true,

    // Pagination callback
    callback: function() {}
  };

  // Hook register
  $.fn[pluginHookMethod] = function(hook, callback) {
    if (arguments.length < 2) {
      throwError('Missing argument.');
    }

    if (!$.isFunction(callback)) {
      throwError('callback must be a function.');
    }

    var container = $(this);
    var paginationData = container.data('pagination');

    if (!paginationData) {
      container.data('pagination', {});
      paginationData = container.data('pagination');
    }

    !paginationData.hooks && (paginationData.hooks = {});

    //paginationData.hooks[hook] = callback;
    paginationData.hooks[hook] = paginationData.hooks[hook] || [];
    paginationData.hooks[hook].push(callback);

  };

  // Static method
  $[pluginName] = function(selector, options) {
    if (arguments.length < 2) {
      throwError('Requires two parameters.');
    }

    var container;

    // 'selector' is a jQuery object
    if (typeof selector !== 'string' && selector instanceof jQuery) {
      container = selector;
    } else {
      container = $(selector);
    }

    if (!container.length) return;

    container.pagination(options);

    return container;
  };

  // ============================================================
  // helpers
  // ============================================================

  var Helpers = {};

  // Throw error
  function throwError(content) {
    throw new Error('Pagination: ' + content);
  }

  // Check parameters
  function parameterChecker(args) {
    if (!args.dataSource) {
      throwError('"dataSource" is required.');
    }

    if (typeof args.dataSource === 'string') {
      if (args.totalNumberLocator === undefined) {
        if (args.totalNumber === undefined) {
          throwError('"totalNumber" is required.');
        } else if (!$.isNumeric(args.totalNumber)) {
          throwError('"totalNumber" is incorrect. (Number)');
        }
      } else {
        if (!$.isFunction(args.totalNumberLocator)) {
          throwError('"totalNumberLocator" should be a Function.');
        }
      }
    } else if (Helpers.isObject(args.dataSource)) {
      if (typeof args.locator === 'undefined') {
        throwError('"dataSource" is an Object, please specify "locator".');
      } else if (typeof args.locator !== 'string' && !$.isFunction(args.locator)) {
        throwError('' + args.locator + ' is incorrect. (String | Function)');
      }
    }

    if (args.formatResult !== undefined && !$.isFunction(args.formatResult)) {
      throwError('"formatResult" should be a Function.');
    }
  }

  // uninstall plugin
  function uninstallPlugin(target) {
    var events = ['go', 'previous', 'next', 'disable', 'enable', 'refresh', 'show', 'hide', 'destroy'];

    // off events of old instance
    $.each(events, function(index, value) {
      target.off(eventPrefix + value);
    });

    // reset pagination data
    target.data('pagination', {});

    // remove old
    $('.paginationjs', target).remove();
  }

  // Object type detection
  function getObjectType(object, tmp) {
    return ( (tmp = typeof(object)) == "object" ? object == null && "null" || Object.prototype.toString.call(object).slice(8, -1) : tmp ).toLowerCase();
  }

  $.each(['Object', 'Array', 'String'], function(index, name) {
    Helpers['is' + name] = function(object) {
      return getObjectType(object) === name.toLowerCase();
    };
  });

  /*
   * export via AMD or CommonJS
   * */
  if (typeof define === 'function' && define.amd) {
    define(function() {
      return $;
    });
  }

})(this, window.jQuery);

! function(e, t) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.moment = t()
}(this, function() {
  "use strict";
  var e, i;

  function f() {
      return e.apply(null, arguments)
  }

  function o(e) {
      return e instanceof Array || "[object Array]" === Object.prototype.toString.call(e)
  }

  function u(e) {
      return null != e && "[object Object]" === Object.prototype.toString.call(e)
  }

  function m(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
  }

  function l(e) {
      if (Object.getOwnPropertyNames) return 0 === Object.getOwnPropertyNames(e).length;
      for (var t in e)
          if (m(e, t)) return;
      return 1
  }

  function r(e) {
      return void 0 === e
  }

  function h(e) {
      return "number" == typeof e || "[object Number]" === Object.prototype.toString.call(e)
  }

  function a(e) {
      return e instanceof Date || "[object Date]" === Object.prototype.toString.call(e)
  }

  function d(e, t) {
      for (var n = [], s = 0; s < e.length; ++s) n.push(t(e[s], s));
      return n
  }

  function c(e, t) {
      for (var n in t) m(t, n) && (e[n] = t[n]);
      return m(t, "toString") && (e.toString = t.toString), m(t, "valueOf") && (e.valueOf = t.valueOf), e
  }

  function _(e, t, n, s) {
      return xt(e, t, n, s, !0).utc()
  }

  function y(e) {
      return null == e._pf && (e._pf = {
          empty: !1,
          unusedTokens: [],
          unusedInput: [],
          overflow: -2,
          charsLeftOver: 0,
          nullInput: !1,
          invalidEra: null,
          invalidMonth: null,
          invalidFormat: !1,
          userInvalidated: !1,
          iso: !1,
          parsedDateParts: [],
          era: null,
          meridiem: null,
          rfc2822: !1,
          weekdayMismatch: !1
      }), e._pf
  }

  function g(e) {
      if (null == e._isValid) {
          var t = y(e),
              n = i.call(t.parsedDateParts, function(e) {
                  return null != e
              }),
              s = !isNaN(e._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidEra && !t.invalidMonth && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && n);
          if (e._strict && (s = s && 0 === t.charsLeftOver && 0 === t.unusedTokens.length && void 0 === t.bigHour), null != Object.isFrozen && Object.isFrozen(e)) return s;
          e._isValid = s
      }
      return e._isValid
  }

  function w(e) {
      var t = _(NaN);
      return null != e ? c(y(t), e) : y(t).userInvalidated = !0, t
  }
  i = Array.prototype.some ? Array.prototype.some : function(e) {
      for (var t = Object(this), n = t.length >>> 0, s = 0; s < n; s++)
          if (s in t && e.call(this, t[s], s, t)) return !0;
      return !1
  };
  var p = f.momentProperties = [],
      t = !1;

  function v(e, t) {
      var n, s, i;
      if (r(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), r(t._i) || (e._i = t._i), r(t._f) || (e._f = t._f), r(t._l) || (e._l = t._l), r(t._strict) || (e._strict = t._strict), r(t._tzm) || (e._tzm = t._tzm), r(t._isUTC) || (e._isUTC = t._isUTC), r(t._offset) || (e._offset = t._offset), r(t._pf) || (e._pf = y(t)), r(t._locale) || (e._locale = t._locale), 0 < p.length)
          for (n = 0; n < p.length; n++) r(i = t[s = p[n]]) || (e[s] = i);
      return e
  }

  function k(e) {
      v(this, e), this._d = new Date(null != e._d ? e._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), !1 === t && (t = !0, f.updateOffset(this), t = !1)
  }

  function M(e) {
      return e instanceof k || null != e && null != e._isAMomentObject
  }

  function D(e) {
      !1 === f.suppressDeprecationWarnings && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e)
  }

  function n(i, r) {
      var a = !0;
      return c(function() {
          if (null != f.deprecationHandler && f.deprecationHandler(null, i), a) {
              for (var e, t, n = [], s = 0; s < arguments.length; s++) {
                  if (e = "", "object" == typeof arguments[s]) {
                      for (t in e += "\n[" + s + "] ", arguments[0]) m(arguments[0], t) && (e += t + ": " + arguments[0][t] + ", ");
                      e = e.slice(0, -2)
                  } else e = arguments[s];
                  n.push(e)
              }
              D(i + "\nArguments: " + Array.prototype.slice.call(n).join("") + "\n" + (new Error).stack), a = !1
          }
          return r.apply(this, arguments)
      }, r)
  }
  var s, S = {};

  function Y(e, t) {
      null != f.deprecationHandler && f.deprecationHandler(e, t), S[e] || (D(t), S[e] = !0)
  }

  function O(e) {
      return "undefined" != typeof Function && e instanceof Function || "[object Function]" === Object.prototype.toString.call(e)
  }

  function b(e, t) {
      var n, s = c({}, e);
      for (n in t) m(t, n) && (u(e[n]) && u(t[n]) ? (s[n] = {}, c(s[n], e[n]), c(s[n], t[n])) : null != t[n] ? s[n] = t[n] : delete s[n]);
      for (n in e) m(e, n) && !m(t, n) && u(e[n]) && (s[n] = c({}, s[n]));
      return s
  }

  function x(e) {
      null != e && this.set(e)
  }
  f.suppressDeprecationWarnings = !1, f.deprecationHandler = null, s = Object.keys ? Object.keys : function(e) {
      var t, n = [];
      for (t in e) m(e, t) && n.push(t);
      return n
  };

  function T(e, t, n) {
      var s = "" + Math.abs(e),
          i = t - s.length;
      return (0 <= e ? n ? "+" : "" : "-") + Math.pow(10, Math.max(0, i)).toString().substr(1) + s
  }
  var N = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
      P = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
      R = {},
      W = {};

  function C(e, t, n, s) {
      var i = "string" == typeof s ? function() {
          return this[s]()
      } : s;
      e && (W[e] = i), t && (W[t[0]] = function() {
          return T(i.apply(this, arguments), t[1], t[2])
      }), n && (W[n] = function() {
          return this.localeData().ordinal(i.apply(this, arguments), e)
      })
  }

  function U(e, t) {
      return e.isValid() ? (t = H(t, e.localeData()), R[t] = R[t] || function(s) {
          for (var e, i = s.match(N), t = 0, r = i.length; t < r; t++) W[i[t]] ? i[t] = W[i[t]] : i[t] = (e = i[t]).match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "");
          return function(e) {
              for (var t = "", n = 0; n < r; n++) t += O(i[n]) ? i[n].call(e, s) : i[n];
              return t
          }
      }(t), R[t](e)) : e.localeData().invalidDate()
  }

  function H(e, t) {
      var n = 5;

      function s(e) {
          return t.longDateFormat(e) || e
      }
      for (P.lastIndex = 0; 0 <= n && P.test(e);) e = e.replace(P, s), P.lastIndex = 0, --n;
      return e
  }
  var F = {};

  function L(e, t) {
      var n = e.toLowerCase();
      F[n] = F[n + "s"] = F[t] = e
  }

  function V(e) {
      return "string" == typeof e ? F[e] || F[e.toLowerCase()] : void 0
  }

  function G(e) {
      var t, n, s = {};
      for (n in e) m(e, n) && (t = V(n)) && (s[t] = e[n]);
      return s
  }
  var E = {};

  function A(e, t) {
      E[e] = t
  }

  function j(e) {
      return e % 4 == 0 && e % 100 != 0 || e % 400 == 0
  }

  function I(e) {
      return e < 0 ? Math.ceil(e) || 0 : Math.floor(e)
  }

  function Z(e) {
      var t = +e,
          n = 0;
      return 0 != t && isFinite(t) && (n = I(t)), n
  }

  function z(t, n) {
      return function(e) {
          return null != e ? (q(this, t, e), f.updateOffset(this, n), this) : $(this, t)
      }
  }

  function $(e, t) {
      return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN
  }

  function q(e, t, n) {
      e.isValid() && !isNaN(n) && ("FullYear" === t && j(e.year()) && 1 === e.month() && 29 === e.date() ? (n = Z(n), e._d["set" + (e._isUTC ? "UTC" : "") + t](n, e.month(), xe(n, e.month()))) : e._d["set" + (e._isUTC ? "UTC" : "") + t](n))
  }
  var B, J = /\d/,
      Q = /\d\d/,
      X = /\d{3}/,
      K = /\d{4}/,
      ee = /[+-]?\d{6}/,
      te = /\d\d?/,
      ne = /\d\d\d\d?/,
      se = /\d\d\d\d\d\d?/,
      ie = /\d{1,3}/,
      re = /\d{1,4}/,
      ae = /[+-]?\d{1,6}/,
      oe = /\d+/,
      ue = /[+-]?\d+/,
      le = /Z|[+-]\d\d:?\d\d/gi,
      he = /Z|[+-]\d\d(?::?\d\d)?/gi,
      de = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;

  function ce(e, n, s) {
      B[e] = O(n) ? n : function(e, t) {
          return e && s ? s : n
      }
  }

  function fe(e, t) {
      return m(B, e) ? B[e](t._strict, t._locale) : new RegExp(me(e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(e, t, n, s, i) {
          return t || n || s || i
      })))
  }

  function me(e) {
      return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
  }
  B = {};
  var _e = {};

  function ye(e, n) {
      var t, s = n;
      for ("string" == typeof e && (e = [e]), h(n) && (s = function(e, t) {
              t[n] = Z(e)
          }), t = 0; t < e.length; t++) _e[e[t]] = s
  }

  function ge(e, i) {
      ye(e, function(e, t, n, s) {
          n._w = n._w || {}, i(e, n._w, n, s)
      })
  }
  var we, pe = 0,
      ve = 1,
      ke = 2,
      Me = 3,
      De = 4,
      Se = 5,
      Ye = 6,
      Oe = 7,
      be = 8;

  function xe(e, t) {
      if (isNaN(e) || isNaN(t)) return NaN;
      var n, s = (t % (n = 12) + n) % n;
      return e += (t - s) / 12, 1 == s ? j(e) ? 29 : 28 : 31 - s % 7 % 2
  }
  we = Array.prototype.indexOf ? Array.prototype.indexOf : function(e) {
      for (var t = 0; t < this.length; ++t)
          if (this[t] === e) return t;
      return -1
  }, C("M", ["MM", 2], "Mo", function() {
      return this.month() + 1
  }), C("MMM", 0, 0, function(e) {
      return this.localeData().monthsShort(this, e)
  }), C("MMMM", 0, 0, function(e) {
      return this.localeData().months(this, e)
  }), L("month", "M"), A("month", 8), ce("M", te), ce("MM", te, Q), ce("MMM", function(e, t) {
      return t.monthsShortRegex(e)
  }), ce("MMMM", function(e, t) {
      return t.monthsRegex(e)
  }), ye(["M", "MM"], function(e, t) {
      t[ve] = Z(e) - 1
  }), ye(["MMM", "MMMM"], function(e, t, n, s) {
      var i = n._locale.monthsParse(e, s, n._strict);
      null != i ? t[ve] = i : y(n).invalidMonth = e
  });
  var Te = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
      Ne = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
      Pe = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
      Re = de,
      We = de;

  function Ce(e, t) {
      var n;
      if (!e.isValid()) return e;
      if ("string" == typeof t)
          if (/^\d+$/.test(t)) t = Z(t);
          else if (!h(t = e.localeData().monthsParse(t))) return e;
      return n = Math.min(e.date(), xe(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n), e
  }

  function Ue(e) {
      return null != e ? (Ce(this, e), f.updateOffset(this, !0), this) : $(this, "Month")
  }

  function He() {
      function e(e, t) {
          return t.length - e.length
      }
      for (var t, n = [], s = [], i = [], r = 0; r < 12; r++) t = _([2e3, r]), n.push(this.monthsShort(t, "")), s.push(this.months(t, "")), i.push(this.months(t, "")), i.push(this.monthsShort(t, ""));
      for (n.sort(e), s.sort(e), i.sort(e), r = 0; r < 12; r++) n[r] = me(n[r]), s[r] = me(s[r]);
      for (r = 0; r < 24; r++) i[r] = me(i[r]);
      this._monthsRegex = new RegExp("^(" + i.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + s.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + n.join("|") + ")", "i")
  }

  function Fe(e) {
      return j(e) ? 366 : 365
  }
  C("Y", 0, 0, function() {
      var e = this.year();
      return e <= 9999 ? T(e, 4) : "+" + e
  }), C(0, ["YY", 2], 0, function() {
      return this.year() % 100
  }), C(0, ["YYYY", 4], 0, "year"), C(0, ["YYYYY", 5], 0, "year"), C(0, ["YYYYYY", 6, !0], 0, "year"), L("year", "y"), A("year", 1), ce("Y", ue), ce("YY", te, Q), ce("YYYY", re, K), ce("YYYYY", ae, ee), ce("YYYYYY", ae, ee), ye(["YYYYY", "YYYYYY"], pe), ye("YYYY", function(e, t) {
      t[pe] = 2 === e.length ? f.parseTwoDigitYear(e) : Z(e)
  }), ye("YY", function(e, t) {
      t[pe] = f.parseTwoDigitYear(e)
  }), ye("Y", function(e, t) {
      t[pe] = parseInt(e, 10)
  }), f.parseTwoDigitYear = function(e) {
      return Z(e) + (68 < Z(e) ? 1900 : 2e3)
  };
  var Le = z("FullYear", !0);

  function Ve(e) {
      var t, n;
      return e < 100 && 0 <= e ? ((n = Array.prototype.slice.call(arguments))[0] = e + 400, t = new Date(Date.UTC.apply(null, n)), isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e)) : t = new Date(Date.UTC.apply(null, arguments)), t
  }

  function Ge(e, t, n) {
      var s = 7 + t - n;
      return s - (7 + Ve(e, 0, s).getUTCDay() - t) % 7 - 1
  }

  function Ee(e, t, n, s, i) {
      var r, a = 1 + 7 * (t - 1) + (7 + n - s) % 7 + Ge(e, s, i),
          o = a <= 0 ? Fe(r = e - 1) + a : a > Fe(e) ? (r = e + 1, a - Fe(e)) : (r = e, a);
      return {
          year: r,
          dayOfYear: o
      }
  }

  function Ae(e, t, n) {
      var s, i, r = Ge(e.year(), t, n),
          a = Math.floor((e.dayOfYear() - r - 1) / 7) + 1;
      return a < 1 ? s = a + je(i = e.year() - 1, t, n) : a > je(e.year(), t, n) ? (s = a - je(e.year(), t, n), i = e.year() + 1) : (i = e.year(), s = a), {
          week: s,
          year: i
      }
  }

  function je(e, t, n) {
      var s = Ge(e, t, n),
          i = Ge(e + 1, t, n);
      return (Fe(e) - s + i) / 7
  }
  C("w", ["ww", 2], "wo", "week"), C("W", ["WW", 2], "Wo", "isoWeek"), L("week", "w"), L("isoWeek", "W"), A("week", 5), A("isoWeek", 5), ce("w", te), ce("ww", te, Q), ce("W", te), ce("WW", te, Q), ge(["w", "ww", "W", "WW"], function(e, t, n, s) {
      t[s.substr(0, 1)] = Z(e)
  });

  function Ie(e, t) {
      return e.slice(t, 7).concat(e.slice(0, t))
  }
  C("d", 0, "do", "day"), C("dd", 0, 0, function(e) {
      return this.localeData().weekdaysMin(this, e)
  }), C("ddd", 0, 0, function(e) {
      return this.localeData().weekdaysShort(this, e)
  }), C("dddd", 0, 0, function(e) {
      return this.localeData().weekdays(this, e)
  }), C("e", 0, 0, "weekday"), C("E", 0, 0, "isoWeekday"), L("day", "d"), L("weekday", "e"), L("isoWeekday", "E"), A("day", 11), A("weekday", 11), A("isoWeekday", 11), ce("d", te), ce("e", te), ce("E", te), ce("dd", function(e, t) {
      return t.weekdaysMinRegex(e)
  }), ce("ddd", function(e, t) {
      return t.weekdaysShortRegex(e)
  }), ce("dddd", function(e, t) {
      return t.weekdaysRegex(e)
  }), ge(["dd", "ddd", "dddd"], function(e, t, n, s) {
      var i = n._locale.weekdaysParse(e, s, n._strict);
      null != i ? t.d = i : y(n).invalidWeekday = e
  }), ge(["d", "e", "E"], function(e, t, n, s) {
      t[s] = Z(e)
  });
  var Ze = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
      ze = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
      $e = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
      qe = de,
      Be = de,
      Je = de;

  function Qe() {
      function e(e, t) {
          return t.length - e.length
      }
      for (var t, n, s, i, r = [], a = [], o = [], u = [], l = 0; l < 7; l++) t = _([2e3, 1]).day(l), n = me(this.weekdaysMin(t, "")), s = me(this.weekdaysShort(t, "")), i = me(this.weekdays(t, "")), r.push(n), a.push(s), o.push(i), u.push(n), u.push(s), u.push(i);
      r.sort(e), a.sort(e), o.sort(e), u.sort(e), this._weekdaysRegex = new RegExp("^(" + u.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + o.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + a.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + r.join("|") + ")", "i")
  }

  function Xe() {
      return this.hours() % 12 || 12
  }

  function Ke(e, t) {
      C(e, 0, 0, function() {
          return this.localeData().meridiem(this.hours(), this.minutes(), t)
      })
  }

  function et(e, t) {
      return t._meridiemParse
  }
  C("H", ["HH", 2], 0, "hour"), C("h", ["hh", 2], 0, Xe), C("k", ["kk", 2], 0, function() {
      return this.hours() || 24
  }), C("hmm", 0, 0, function() {
      return "" + Xe.apply(this) + T(this.minutes(), 2)
  }), C("hmmss", 0, 0, function() {
      return "" + Xe.apply(this) + T(this.minutes(), 2) + T(this.seconds(), 2)
  }), C("Hmm", 0, 0, function() {
      return "" + this.hours() + T(this.minutes(), 2)
  }), C("Hmmss", 0, 0, function() {
      return "" + this.hours() + T(this.minutes(), 2) + T(this.seconds(), 2)
  }), Ke("a", !0), Ke("A", !1), L("hour", "h"), A("hour", 13), ce("a", et), ce("A", et), ce("H", te), ce("h", te), ce("k", te), ce("HH", te, Q), ce("hh", te, Q), ce("kk", te, Q), ce("hmm", ne), ce("hmmss", se), ce("Hmm", ne), ce("Hmmss", se), ye(["H", "HH"], Me), ye(["k", "kk"], function(e, t, n) {
      var s = Z(e);
      t[Me] = 24 === s ? 0 : s
  }), ye(["a", "A"], function(e, t, n) {
      n._isPm = n._locale.isPM(e), n._meridiem = e
  }), ye(["h", "hh"], function(e, t, n) {
      t[Me] = Z(e), y(n).bigHour = !0
  }), ye("hmm", function(e, t, n) {
      var s = e.length - 2;
      t[Me] = Z(e.substr(0, s)), t[De] = Z(e.substr(s)), y(n).bigHour = !0
  }), ye("hmmss", function(e, t, n) {
      var s = e.length - 4,
          i = e.length - 2;
      t[Me] = Z(e.substr(0, s)), t[De] = Z(e.substr(s, 2)), t[Se] = Z(e.substr(i)), y(n).bigHour = !0
  }), ye("Hmm", function(e, t, n) {
      var s = e.length - 2;
      t[Me] = Z(e.substr(0, s)), t[De] = Z(e.substr(s))
  }), ye("Hmmss", function(e, t, n) {
      var s = e.length - 4,
          i = e.length - 2;
      t[Me] = Z(e.substr(0, s)), t[De] = Z(e.substr(s, 2)), t[Se] = Z(e.substr(i))
  });
  var tt = z("Hours", !0);
  var nt, st = {
          calendar: {
              sameDay: "[Today at] LT",
              nextDay: "[Tomorrow at] LT",
              nextWeek: "dddd [at] LT",
              lastDay: "[Yesterday at] LT",
              lastWeek: "[Last] dddd [at] LT",
              sameElse: "L"
          },
          longDateFormat: {
              LTS: "h:mm:ss A",
              LT: "h:mm A",
              L: "MM/DD/YYYY",
              LL: "MMMM D, YYYY",
              LLL: "MMMM D, YYYY h:mm A",
              LLLL: "dddd, MMMM D, YYYY h:mm A"
          },
          invalidDate: "Invalid date",
          ordinal: "%d",
          dayOfMonthOrdinalParse: /\d{1,2}/,
          relativeTime: {
              future: "in %s",
              past: "%s ago",
              s: "a few seconds",
              ss: "%d seconds",
              m: "a minute",
              mm: "%d minutes",
              h: "an hour",
              hh: "%d hours",
              d: "a day",
              dd: "%d days",
              w: "a week",
              ww: "%d weeks",
              M: "a month",
              MM: "%d months",
              y: "a year",
              yy: "%d years"
          },
          months: Te,
          monthsShort: Ne,
          week: {
              dow: 0,
              doy: 6
          },
          weekdays: Ze,
          weekdaysMin: $e,
          weekdaysShort: ze,
          meridiemParse: /[ap]\.?m?\.?/i
      },
      it = {},
      rt = {};

  function at(e) {
      return e ? e.toLowerCase().replace("_", "-") : e
  }

  function ot(e) {
      for (var t, n, s, i, r = 0; r < e.length;) {
          for (t = (i = at(e[r]).split("-")).length, n = (n = at(e[r + 1])) ? n.split("-") : null; 0 < t;) {
              if (s = ut(i.slice(0, t).join("-"))) return s;
              if (n && n.length >= t && function(e, t) {
                      for (var n = Math.min(e.length, t.length), s = 0; s < n; s += 1)
                          if (e[s] !== t[s]) return s;
                      return n
                  }(i, n) >= t - 1) break;
              t--
          }
          r++
      }
      return nt
  }

  function ut(t) {
      var e;
      if (void 0 === it[t] && "undefined" != typeof module && module && module.exports) try {
          e = nt._abbr, require("./locale/" + t), lt(e)
      } catch (e) {
          it[t] = null
      }
      return it[t]
  }

  function lt(e, t) {
      var n;
      return e && ((n = r(t) ? dt(e) : ht(e, t)) ? nt = n : "undefined" != typeof console && console.warn && console.warn("Locale " + e + " not found. Did you forget to load it?")), nt._abbr
  }

  function ht(e, t) {
      if (null === t) return delete it[e], null;
      var n, s = st;
      if (t.abbr = e, null != it[e]) Y("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), s = it[e]._config;
      else if (null != t.parentLocale)
          if (null != it[t.parentLocale]) s = it[t.parentLocale]._config;
          else {
              if (null == (n = ut(t.parentLocale))) return rt[t.parentLocale] || (rt[t.parentLocale] = []), rt[t.parentLocale].push({
                  name: e,
                  config: t
              }), null;
              s = n._config
          }
      return it[e] = new x(b(s, t)), rt[e] && rt[e].forEach(function(e) {
          ht(e.name, e.config)
      }), lt(e), it[e]
  }

  function dt(e) {
      var t;
      if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e) return nt;
      if (!o(e)) {
          if (t = ut(e)) return t;
          e = [e]
      }
      return ot(e)
  }

  function ct(e) {
      var t, n = e._a;
      return n && -2 === y(e).overflow && (t = n[ve] < 0 || 11 < n[ve] ? ve : n[ke] < 1 || n[ke] > xe(n[pe], n[ve]) ? ke : n[Me] < 0 || 24 < n[Me] || 24 === n[Me] && (0 !== n[De] || 0 !== n[Se] || 0 !== n[Ye]) ? Me : n[De] < 0 || 59 < n[De] ? De : n[Se] < 0 || 59 < n[Se] ? Se : n[Ye] < 0 || 999 < n[Ye] ? Ye : -1, y(e)._overflowDayOfYear && (t < pe || ke < t) && (t = ke), y(e)._overflowWeeks && -1 === t && (t = Oe), y(e)._overflowWeekday && -1 === t && (t = be), y(e).overflow = t), e
  }
  var ft = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
      mt = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
      _t = /Z|[+-]\d\d(?::?\d\d)?/,
      yt = [
          ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
          ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
          ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
          ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
          ["YYYY-DDD", /\d{4}-\d{3}/],
          ["YYYY-MM", /\d{4}-\d\d/, !1],
          ["YYYYYYMMDD", /[+-]\d{10}/],
          ["YYYYMMDD", /\d{8}/],
          ["GGGG[W]WWE", /\d{4}W\d{3}/],
          ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
          ["YYYYDDD", /\d{7}/],
          ["YYYYMM", /\d{6}/, !1],
          ["YYYY", /\d{4}/, !1]
      ],
      gt = [
          ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
          ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
          ["HH:mm:ss", /\d\d:\d\d:\d\d/],
          ["HH:mm", /\d\d:\d\d/],
          ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
          ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
          ["HHmmss", /\d\d\d\d\d\d/],
          ["HHmm", /\d\d\d\d/],
          ["HH", /\d\d/]
      ],
      wt = /^\/?Date\((-?\d+)/i,
      pt = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
      vt = {
          UT: 0,
          GMT: 0,
          EDT: -240,
          EST: -300,
          CDT: -300,
          CST: -360,
          MDT: -360,
          MST: -420,
          PDT: -420,
          PST: -480
      };

  function kt(e) {
      var t, n, s, i, r, a, o = e._i,
          u = ft.exec(o) || mt.exec(o);
      if (u) {
          for (y(e).iso = !0, t = 0, n = yt.length; t < n; t++)
              if (yt[t][1].exec(u[1])) {
                  i = yt[t][0], s = !1 !== yt[t][2];
                  break
              }
          if (null == i) return void(e._isValid = !1);
          if (u[3]) {
              for (t = 0, n = gt.length; t < n; t++)
                  if (gt[t][1].exec(u[3])) {
                      r = (u[2] || " ") + gt[t][0];
                      break
                  }
              if (null == r) return void(e._isValid = !1)
          }
          if (!s && null != r) return void(e._isValid = !1);
          if (u[4]) {
              if (!_t.exec(u[4])) return void(e._isValid = !1);
              a = "Z"
          }
          e._f = i + (r || "") + (a || ""), Ot(e)
      } else e._isValid = !1
  }

  function Mt(e, t, n, s, i, r) {
      var a = [function(e) {
          var t = parseInt(e, 10); {
              if (t <= 49) return 2e3 + t;
              if (t <= 999) return 1900 + t
          }
          return t
      }(e), Ne.indexOf(t), parseInt(n, 10), parseInt(s, 10), parseInt(i, 10)];
      return r && a.push(parseInt(r, 10)), a
  }

  function Dt(e) {
      var t, n, s, i, r = pt.exec(e._i.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, ""));
      if (r) {
          if (t = Mt(r[4], r[3], r[2], r[5], r[6], r[7]), n = r[1], s = t, i = e, n && ze.indexOf(n) !== new Date(s[0], s[1], s[2]).getDay() && (y(i).weekdayMismatch = !0, !void(i._isValid = !1))) return;
          e._a = t, e._tzm = function(e, t, n) {
              if (e) return vt[e];
              if (t) return 0;
              var s = parseInt(n, 10),
                  i = s % 100;
              return 60 * ((s - i) / 100) + i
          }(r[8], r[9], r[10]), e._d = Ve.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), y(e).rfc2822 = !0
      } else e._isValid = !1
  }

  function St(e, t, n) {
      return null != e ? e : null != t ? t : n
  }

  function Yt(e) {
      var t, n, s, i, r, a, o, u = [];
      if (!e._d) {
          for (a = e, o = new Date(f.now()), s = a._useUTC ? [o.getUTCFullYear(), o.getUTCMonth(), o.getUTCDate()] : [o.getFullYear(), o.getMonth(), o.getDate()], e._w && null == e._a[ke] && null == e._a[ve] && function(e) {
                  var t, n, s, i, r, a, o, u, l;
                  null != (t = e._w).GG || null != t.W || null != t.E ? (r = 1, a = 4, n = St(t.GG, e._a[pe], Ae(Tt(), 1, 4).year), s = St(t.W, 1), ((i = St(t.E, 1)) < 1 || 7 < i) && (u = !0)) : (r = e._locale._week.dow, a = e._locale._week.doy, l = Ae(Tt(), r, a), n = St(t.gg, e._a[pe], l.year), s = St(t.w, l.week), null != t.d ? ((i = t.d) < 0 || 6 < i) && (u = !0) : null != t.e ? (i = t.e + r, (t.e < 0 || 6 < t.e) && (u = !0)) : i = r);
                  s < 1 || s > je(n, r, a) ? y(e)._overflowWeeks = !0 : null != u ? y(e)._overflowWeekday = !0 : (o = Ee(n, s, i, r, a), e._a[pe] = o.year, e._dayOfYear = o.dayOfYear)
              }(e), null != e._dayOfYear && (r = St(e._a[pe], s[pe]), (e._dayOfYear > Fe(r) || 0 === e._dayOfYear) && (y(e)._overflowDayOfYear = !0), n = Ve(r, 0, e._dayOfYear), e._a[ve] = n.getUTCMonth(), e._a[ke] = n.getUTCDate()), t = 0; t < 3 && null == e._a[t]; ++t) e._a[t] = u[t] = s[t];
          for (; t < 7; t++) e._a[t] = u[t] = null == e._a[t] ? 2 === t ? 1 : 0 : e._a[t];
          24 === e._a[Me] && 0 === e._a[De] && 0 === e._a[Se] && 0 === e._a[Ye] && (e._nextDay = !0, e._a[Me] = 0), e._d = (e._useUTC ? Ve : function(e, t, n, s, i, r, a) {
              var o;
              return e < 100 && 0 <= e ? (o = new Date(e + 400, t, n, s, i, r, a), isFinite(o.getFullYear()) && o.setFullYear(e)) : o = new Date(e, t, n, s, i, r, a), o
          }).apply(null, u), i = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[Me] = 24), e._w && void 0 !== e._w.d && e._w.d !== i && (y(e).weekdayMismatch = !0)
      }
  }

  function Ot(e) {
      if (e._f !== f.ISO_8601)
          if (e._f !== f.RFC_2822) {
              e._a = [], y(e).empty = !0;
              for (var t, n, s, i, r, a, o, u = "" + e._i, l = u.length, h = 0, d = H(e._f, e._locale).match(N) || [], c = 0; c < d.length; c++) n = d[c], (t = (u.match(fe(n, e)) || [])[0]) && (0 < (s = u.substr(0, u.indexOf(t))).length && y(e).unusedInput.push(s), u = u.slice(u.indexOf(t) + t.length), h += t.length), W[n] ? (t ? y(e).empty = !1 : y(e).unusedTokens.push(n), r = n, o = e, null != (a = t) && m(_e, r) && _e[r](a, o._a, o, r)) : e._strict && !t && y(e).unusedTokens.push(n);
              y(e).charsLeftOver = l - h, 0 < u.length && y(e).unusedInput.push(u), e._a[Me] <= 12 && !0 === y(e).bigHour && 0 < e._a[Me] && (y(e).bigHour = void 0), y(e).parsedDateParts = e._a.slice(0), y(e).meridiem = e._meridiem, e._a[Me] = function(e, t, n) {
                  var s;
                  if (null == n) return t;
                  return null != e.meridiemHour ? e.meridiemHour(t, n) : (null != e.isPM && ((s = e.isPM(n)) && t < 12 && (t += 12), s || 12 !== t || (t = 0)), t)
              }(e._locale, e._a[Me], e._meridiem), null !== (i = y(e).era) && (e._a[pe] = e._locale.erasConvertYear(i, e._a[pe])), Yt(e), ct(e)
          } else Dt(e);
      else kt(e)
  }

  function bt(e) {
      var t, n, s = e._i,
          i = e._f;
      return e._locale = e._locale || dt(e._l), null === s || void 0 === i && "" === s ? w({
          nullInput: !0
      }) : ("string" == typeof s && (e._i = s = e._locale.preparse(s)), M(s) ? new k(ct(s)) : (a(s) ? e._d = s : o(i) ? function(e) {
          var t, n, s, i, r, a, o = !1;
          if (0 === e._f.length) return y(e).invalidFormat = !0, e._d = new Date(NaN);
          for (i = 0; i < e._f.length; i++) r = 0, a = !1, t = v({}, e), null != e._useUTC && (t._useUTC = e._useUTC), t._f = e._f[i], Ot(t), g(t) && (a = !0), r += y(t).charsLeftOver, r += 10 * y(t).unusedTokens.length, y(t).score = r, o ? r < s && (s = r, n = t) : (null == s || r < s || a) && (s = r, n = t, a && (o = !0));
          c(e, n || t)
      }(e) : i ? Ot(e) : r(n = (t = e)._i) ? t._d = new Date(f.now()) : a(n) ? t._d = new Date(n.valueOf()) : "string" == typeof n ? function(e) {
          var t = wt.exec(e._i);
          null === t ? (kt(e), !1 === e._isValid && (delete e._isValid, Dt(e), !1 === e._isValid && (delete e._isValid, e._strict ? e._isValid = !1 : f.createFromInputFallback(e)))) : e._d = new Date(+t[1])
      }(t) : o(n) ? (t._a = d(n.slice(0), function(e) {
          return parseInt(e, 10)
      }), Yt(t)) : u(n) ? function(e) {
          var t, n;
          e._d || (n = void 0 === (t = G(e._i)).day ? t.date : t.day, e._a = d([t.year, t.month, n, t.hour, t.minute, t.second, t.millisecond], function(e) {
              return e && parseInt(e, 10)
          }), Yt(e))
      }(t) : h(n) ? t._d = new Date(n) : f.createFromInputFallback(t), g(e) || (e._d = null), e))
  }

  function xt(e, t, n, s, i) {
      var r, a = {};
      return !0 !== t && !1 !== t || (s = t, t = void 0), !0 !== n && !1 !== n || (s = n, n = void 0), (u(e) && l(e) || o(e) && 0 === e.length) && (e = void 0), a._isAMomentObject = !0, a._useUTC = a._isUTC = i, a._l = n, a._i = e, a._f = t, a._strict = s, (r = new k(ct(bt(a))))._nextDay && (r.add(1, "d"), r._nextDay = void 0), r
  }

  function Tt(e, t, n, s) {
      return xt(e, t, n, s, !1)
  }
  f.createFromInputFallback = n("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(e) {
      e._d = new Date(e._i + (e._useUTC ? " UTC" : ""))
  }), f.ISO_8601 = function() {}, f.RFC_2822 = function() {};
  var Nt = n("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
          var e = Tt.apply(null, arguments);
          return this.isValid() && e.isValid() ? e < this ? this : e : w()
      }),
      Pt = n("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
          var e = Tt.apply(null, arguments);
          return this.isValid() && e.isValid() ? this < e ? this : e : w()
      });

  function Rt(e, t) {
      var n, s;
      if (1 === t.length && o(t[0]) && (t = t[0]), !t.length) return Tt();
      for (n = t[0], s = 1; s < t.length; ++s) t[s].isValid() && !t[s][e](n) || (n = t[s]);
      return n
  }
  var Wt = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];

  function Ct(e) {
      var t = G(e),
          n = t.year || 0,
          s = t.quarter || 0,
          i = t.month || 0,
          r = t.week || t.isoWeek || 0,
          a = t.day || 0,
          o = t.hour || 0,
          u = t.minute || 0,
          l = t.second || 0,
          h = t.millisecond || 0;
      this._isValid = function(e) {
          var t, n, s = !1;
          for (t in e)
              if (m(e, t) && (-1 === we.call(Wt, t) || null != e[t] && isNaN(e[t]))) return !1;
          for (n = 0; n < Wt.length; ++n)
              if (e[Wt[n]]) {
                  if (s) return !1;
                  parseFloat(e[Wt[n]]) !== Z(e[Wt[n]]) && (s = !0)
              }
          return !0
      }(t), this._milliseconds = +h + 1e3 * l + 6e4 * u + 1e3 * o * 60 * 60, this._days = +a + 7 * r, this._months = +i + 3 * s + 12 * n, this._data = {}, this._locale = dt(), this._bubble()
  }

  function Ut(e) {
      return e instanceof Ct
  }

  function Ht(e) {
      return e < 0 ? -1 * Math.round(-1 * e) : Math.round(e)
  }

  function Ft(e, n) {
      C(e, 0, 0, function() {
          var e = this.utcOffset(),
              t = "+";
          return e < 0 && (e = -e, t = "-"), t + T(~~(e / 60), 2) + n + T(~~e % 60, 2)
      })
  }
  Ft("Z", ":"), Ft("ZZ", ""), ce("Z", he), ce("ZZ", he), ye(["Z", "ZZ"], function(e, t, n) {
      n._useUTC = !0, n._tzm = Vt(he, e)
  });
  var Lt = /([\+\-]|\d\d)/gi;

  function Vt(e, t) {
      var n, s, i = (t || "").match(e);
      return null === i ? null : 0 === (s = 60 * (n = ((i[i.length - 1] || []) + "").match(Lt) || ["-", 0, 0])[1] + Z(n[2])) ? 0 : "+" === n[0] ? s : -s
  }

  function Gt(e, t) {
      var n, s;
      return t._isUTC ? (n = t.clone(), s = (M(e) || a(e) ? e.valueOf() : Tt(e).valueOf()) - n.valueOf(), n._d.setTime(n._d.valueOf() + s), f.updateOffset(n, !1), n) : Tt(e).local()
  }

  function Et(e) {
      return -Math.round(e._d.getTimezoneOffset())
  }

  function At() {
      return !!this.isValid() && (this._isUTC && 0 === this._offset)
  }
  f.updateOffset = function() {};
  var jt = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
      It = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

  function Zt(e, t) {
      var n, s, i, r = e,
          a = null;
      return Ut(e) ? r = {
          ms: e._milliseconds,
          d: e._days,
          M: e._months
      } : h(e) || !isNaN(+e) ? (r = {}, t ? r[t] = +e : r.milliseconds = +e) : (a = jt.exec(e)) ? (n = "-" === a[1] ? -1 : 1, r = {
          y: 0,
          d: Z(a[ke]) * n,
          h: Z(a[Me]) * n,
          m: Z(a[De]) * n,
          s: Z(a[Se]) * n,
          ms: Z(Ht(1e3 * a[Ye])) * n
      }) : (a = It.exec(e)) ? (n = "-" === a[1] ? -1 : 1, r = {
          y: zt(a[2], n),
          M: zt(a[3], n),
          w: zt(a[4], n),
          d: zt(a[5], n),
          h: zt(a[6], n),
          m: zt(a[7], n),
          s: zt(a[8], n)
      }) : null == r ? r = {} : "object" == typeof r && ("from" in r || "to" in r) && (i = function(e, t) {
          var n;
          if (!e.isValid() || !t.isValid()) return {
              milliseconds: 0,
              months: 0
          };
          t = Gt(t, e), e.isBefore(t) ? n = $t(e, t) : ((n = $t(t, e)).milliseconds = -n.milliseconds, n.months = -n.months);
          return n
      }(Tt(r.from), Tt(r.to)), (r = {}).ms = i.milliseconds, r.M = i.months), s = new Ct(r), Ut(e) && m(e, "_locale") && (s._locale = e._locale), Ut(e) && m(e, "_isValid") && (s._isValid = e._isValid), s
  }

  function zt(e, t) {
      var n = e && parseFloat(e.replace(",", "."));
      return (isNaN(n) ? 0 : n) * t
  }

  function $t(e, t) {
      var n = {};
      return n.months = t.month() - e.month() + 12 * (t.year() - e.year()), e.clone().add(n.months, "M").isAfter(t) && --n.months, n.milliseconds = t - e.clone().add(n.months, "M"), n
  }

  function qt(s, i) {
      return function(e, t) {
          var n;
          return null === t || isNaN(+t) || (Y(i, "moment()." + i + "(period, number) is deprecated. Please use moment()." + i + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), n = e, e = t, t = n), Bt(this, Zt(e, t), s), this
      }
  }

  function Bt(e, t, n, s) {
      var i = t._milliseconds,
          r = Ht(t._days),
          a = Ht(t._months);
      e.isValid() && (s = null == s || s, a && Ce(e, $(e, "Month") + a * n), r && q(e, "Date", $(e, "Date") + r * n), i && e._d.setTime(e._d.valueOf() + i * n), s && f.updateOffset(e, r || a))
  }
  Zt.fn = Ct.prototype, Zt.invalid = function() {
      return Zt(NaN)
  };
  var Jt = qt(1, "add"),
      Qt = qt(-1, "subtract");

  function Xt(e) {
      return "string" == typeof e || e instanceof String
  }

  function Kt(e) {
      return M(e) || a(e) || Xt(e) || h(e) || function(t) {
          var e = o(t),
              n = !1;
          e && (n = 0 === t.filter(function(e) {
              return !h(e) && Xt(t)
          }).length);
          return e && n
      }(e) || function(e) {
          var t, n, s = u(e) && !l(e),
              i = !1,
              r = ["years", "year", "y", "months", "month", "M", "days", "day", "d", "dates", "date", "D", "hours", "hour", "h", "minutes", "minute", "m", "seconds", "second", "s", "milliseconds", "millisecond", "ms"];
          for (t = 0; t < r.length; t += 1) n = r[t], i = i || m(e, n);
          return s && i
      }(e) || null == e
  }

  function en(e, t) {
      if (e.date() < t.date()) return -en(t, e);
      var n = 12 * (t.year() - e.year()) + (t.month() - e.month()),
          s = e.clone().add(n, "months"),
          i = t - s < 0 ? (t - s) / (s - e.clone().add(n - 1, "months")) : (t - s) / (e.clone().add(1 + n, "months") - s);
      return -(n + i) || 0
  }

  function tn(e) {
      var t;
      return void 0 === e ? this._locale._abbr : (null != (t = dt(e)) && (this._locale = t), this)
  }
  f.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", f.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
  var nn = n("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(e) {
      return void 0 === e ? this.localeData() : this.locale(e)
  });

  function sn() {
      return this._locale
  }
  var rn = 126227808e5;

  function an(e, t) {
      return (e % t + t) % t
  }

  function on(e, t, n) {
      return e < 100 && 0 <= e ? new Date(e + 400, t, n) - rn : new Date(e, t, n).valueOf()
  }

  function un(e, t, n) {
      return e < 100 && 0 <= e ? Date.UTC(e + 400, t, n) - rn : Date.UTC(e, t, n)
  }

  function ln(e, t) {
      return t.erasAbbrRegex(e)
  }

  function hn() {
      for (var e = [], t = [], n = [], s = [], i = this.eras(), r = 0, a = i.length; r < a; ++r) t.push(me(i[r].name)), e.push(me(i[r].abbr)), n.push(me(i[r].narrow)), s.push(me(i[r].name)), s.push(me(i[r].abbr)), s.push(me(i[r].narrow));
      this._erasRegex = new RegExp("^(" + s.join("|") + ")", "i"), this._erasNameRegex = new RegExp("^(" + t.join("|") + ")", "i"), this._erasAbbrRegex = new RegExp("^(" + e.join("|") + ")", "i"), this._erasNarrowRegex = new RegExp("^(" + n.join("|") + ")", "i")
  }

  function dn(e, t) {
      C(0, [e, e.length], 0, t)
  }

  function cn(e, t, n, s, i) {
      var r;
      return null == e ? Ae(this, s, i).year : ((r = je(e, s, i)) < t && (t = r), function(e, t, n, s, i) {
          var r = Ee(e, t, n, s, i),
              a = Ve(r.year, 0, r.dayOfYear);
          return this.year(a.getUTCFullYear()), this.month(a.getUTCMonth()), this.date(a.getUTCDate()), this
      }.call(this, e, t, n, s, i))
  }
  C("N", 0, 0, "eraAbbr"), C("NN", 0, 0, "eraAbbr"), C("NNN", 0, 0, "eraAbbr"), C("NNNN", 0, 0, "eraName"), C("NNNNN", 0, 0, "eraNarrow"), C("y", ["y", 1], "yo", "eraYear"), C("y", ["yy", 2], 0, "eraYear"), C("y", ["yyy", 3], 0, "eraYear"), C("y", ["yyyy", 4], 0, "eraYear"), ce("N", ln), ce("NN", ln), ce("NNN", ln), ce("NNNN", function(e, t) {
      return t.erasNameRegex(e)
  }), ce("NNNNN", function(e, t) {
      return t.erasNarrowRegex(e)
  }), ye(["N", "NN", "NNN", "NNNN", "NNNNN"], function(e, t, n, s) {
      var i = n._locale.erasParse(e, s, n._strict);
      i ? y(n).era = i : y(n).invalidEra = e
  }), ce("y", oe), ce("yy", oe), ce("yyy", oe), ce("yyyy", oe), ce("yo", function(e, t) {
      return t._eraYearOrdinalRegex || oe
  }), ye(["y", "yy", "yyy", "yyyy"], pe), ye(["yo"], function(e, t, n, s) {
      var i;
      n._locale._eraYearOrdinalRegex && (i = e.match(n._locale._eraYearOrdinalRegex)), n._locale.eraYearOrdinalParse ? t[pe] = n._locale.eraYearOrdinalParse(e, i) : t[pe] = parseInt(e, 10)
  }), C(0, ["gg", 2], 0, function() {
      return this.weekYear() % 100
  }), C(0, ["GG", 2], 0, function() {
      return this.isoWeekYear() % 100
  }), dn("gggg", "weekYear"), dn("ggggg", "weekYear"), dn("GGGG", "isoWeekYear"), dn("GGGGG", "isoWeekYear"), L("weekYear", "gg"), L("isoWeekYear", "GG"), A("weekYear", 1), A("isoWeekYear", 1), ce("G", ue), ce("g", ue), ce("GG", te, Q), ce("gg", te, Q), ce("GGGG", re, K), ce("gggg", re, K), ce("GGGGG", ae, ee), ce("ggggg", ae, ee), ge(["gggg", "ggggg", "GGGG", "GGGGG"], function(e, t, n, s) {
      t[s.substr(0, 2)] = Z(e)
  }), ge(["gg", "GG"], function(e, t, n, s) {
      t[s] = f.parseTwoDigitYear(e)
  }), C("Q", 0, "Qo", "quarter"), L("quarter", "Q"), A("quarter", 7), ce("Q", J), ye("Q", function(e, t) {
      t[ve] = 3 * (Z(e) - 1)
  }), C("D", ["DD", 2], "Do", "date"), L("date", "D"), A("date", 9), ce("D", te), ce("DD", te, Q), ce("Do", function(e, t) {
      return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient
  }), ye(["D", "DD"], ke), ye("Do", function(e, t) {
      t[ke] = Z(e.match(te)[0])
  });
  var fn = z("Date", !0);
  C("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), L("dayOfYear", "DDD"), A("dayOfYear", 4), ce("DDD", ie), ce("DDDD", X), ye(["DDD", "DDDD"], function(e, t, n) {
      n._dayOfYear = Z(e)
  }), C("m", ["mm", 2], 0, "minute"), L("minute", "m"), A("minute", 14), ce("m", te), ce("mm", te, Q), ye(["m", "mm"], De);
  var mn = z("Minutes", !1);
  C("s", ["ss", 2], 0, "second"), L("second", "s"), A("second", 15), ce("s", te), ce("ss", te, Q), ye(["s", "ss"], Se);
  var _n, yn, gn = z("Seconds", !1);
  for (C("S", 0, 0, function() {
          return ~~(this.millisecond() / 100)
      }), C(0, ["SS", 2], 0, function() {
          return ~~(this.millisecond() / 10)
      }), C(0, ["SSS", 3], 0, "millisecond"), C(0, ["SSSS", 4], 0, function() {
          return 10 * this.millisecond()
      }), C(0, ["SSSSS", 5], 0, function() {
          return 100 * this.millisecond()
      }), C(0, ["SSSSSS", 6], 0, function() {
          return 1e3 * this.millisecond()
      }), C(0, ["SSSSSSS", 7], 0, function() {
          return 1e4 * this.millisecond()
      }), C(0, ["SSSSSSSS", 8], 0, function() {
          return 1e5 * this.millisecond()
      }), C(0, ["SSSSSSSSS", 9], 0, function() {
          return 1e6 * this.millisecond()
      }), L("millisecond", "ms"), A("millisecond", 16), ce("S", ie, J), ce("SS", ie, Q), ce("SSS", ie, X), _n = "SSSS"; _n.length <= 9; _n += "S") ce(_n, oe);

  function wn(e, t) {
      t[Ye] = Z(1e3 * ("0." + e))
  }
  for (_n = "S"; _n.length <= 9; _n += "S") ye(_n, wn);
  yn = z("Milliseconds", !1), C("z", 0, 0, "zoneAbbr"), C("zz", 0, 0, "zoneName");
  var pn = k.prototype;

  function vn(e) {
      return e
  }
  pn.add = Jt, pn.calendar = function(e, t) {
      1 === arguments.length && (arguments[0] ? Kt(arguments[0]) ? (e = arguments[0], t = void 0) : function(e) {
          for (var t = u(e) && !l(e), n = !1, s = ["sameDay", "nextDay", "lastDay", "nextWeek", "lastWeek", "sameElse"], i = 0; i < s.length; i += 1) n = n || m(e, s[i]);
          return t && n
      }(arguments[0]) && (t = arguments[0], e = void 0) : t = e = void 0);
      var n = e || Tt(),
          s = Gt(n, this).startOf("day"),
          i = f.calendarFormat(this, s) || "sameElse",
          r = t && (O(t[i]) ? t[i].call(this, n) : t[i]);
      return this.format(r || this.localeData().calendar(i, this, Tt(n)))
  }, pn.clone = function() {
      return new k(this)
  }, pn.diff = function(e, t, n) {
      var s, i, r;
      if (!this.isValid()) return NaN;
      if (!(s = Gt(e, this)).isValid()) return NaN;
      switch (i = 6e4 * (s.utcOffset() - this.utcOffset()), t = V(t)) {
          case "year":
              r = en(this, s) / 12;
              break;
          case "month":
              r = en(this, s);
              break;
          case "quarter":
              r = en(this, s) / 3;
              break;
          case "second":
              r = (this - s) / 1e3;
              break;
          case "minute":
              r = (this - s) / 6e4;
              break;
          case "hour":
              r = (this - s) / 36e5;
              break;
          case "day":
              r = (this - s - i) / 864e5;
              break;
          case "week":
              r = (this - s - i) / 6048e5;
              break;
          default:
              r = this - s
      }
      return n ? r : I(r)
  }, pn.endOf = function(e) {
      var t, n;
      if (void 0 === (e = V(e)) || "millisecond" === e || !this.isValid()) return this;
      switch (n = this._isUTC ? un : on, e) {
          case "year":
              t = n(this.year() + 1, 0, 1) - 1;
              break;
          case "quarter":
              t = n(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
              break;
          case "month":
              t = n(this.year(), this.month() + 1, 1) - 1;
              break;
          case "week":
              t = n(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
              break;
          case "isoWeek":
              t = n(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
              break;
          case "day":
          case "date":
              t = n(this.year(), this.month(), this.date() + 1) - 1;
              break;
          case "hour":
              t = this._d.valueOf(), t += 36e5 - an(t + (this._isUTC ? 0 : 6e4 * this.utcOffset()), 36e5) - 1;
              break;
          case "minute":
              t = this._d.valueOf(), t += 6e4 - an(t, 6e4) - 1;
              break;
          case "second":
              t = this._d.valueOf(), t += 1e3 - an(t, 1e3) - 1;
              break
      }
      return this._d.setTime(t), f.updateOffset(this, !0), this
  }, pn.format = function(e) {
      e = e || (this.isUtc() ? f.defaultFormatUtc : f.defaultFormat);
      var t = U(this, e);
      return this.localeData().postformat(t)
  }, pn.from = function(e, t) {
      return this.isValid() && (M(e) && e.isValid() || Tt(e).isValid()) ? Zt({
          to: this,
          from: e
      }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
  }, pn.fromNow = function(e) {
      return this.from(Tt(), e)
  }, pn.to = function(e, t) {
      return this.isValid() && (M(e) && e.isValid() || Tt(e).isValid()) ? Zt({
          from: this,
          to: e
      }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
  }, pn.toNow = function(e) {
      return this.to(Tt(), e)
  }, pn.get = function(e) {
      return O(this[e = V(e)]) ? this[e]() : this
  }, pn.invalidAt = function() {
      return y(this).overflow
  }, pn.isAfter = function(e, t) {
      var n = M(e) ? e : Tt(e);
      return !(!this.isValid() || !n.isValid()) && ("millisecond" === (t = V(t) || "millisecond") ? this.valueOf() > n.valueOf() : n.valueOf() < this.clone().startOf(t).valueOf())
  }, pn.isBefore = function(e, t) {
      var n = M(e) ? e : Tt(e);
      return !(!this.isValid() || !n.isValid()) && ("millisecond" === (t = V(t) || "millisecond") ? this.valueOf() < n.valueOf() : this.clone().endOf(t).valueOf() < n.valueOf())
  }, pn.isBetween = function(e, t, n, s) {
      var i = M(e) ? e : Tt(e),
          r = M(t) ? t : Tt(t);
      return !!(this.isValid() && i.isValid() && r.isValid()) && (("(" === (s = s || "()")[0] ? this.isAfter(i, n) : !this.isBefore(i, n)) && (")" === s[1] ? this.isBefore(r, n) : !this.isAfter(r, n)))
  }, pn.isSame = function(e, t) {
      var n, s = M(e) ? e : Tt(e);
      return !(!this.isValid() || !s.isValid()) && ("millisecond" === (t = V(t) || "millisecond") ? this.valueOf() === s.valueOf() : (n = s.valueOf(), this.clone().startOf(t).valueOf() <= n && n <= this.clone().endOf(t).valueOf()))
  }, pn.isSameOrAfter = function(e, t) {
      return this.isSame(e, t) || this.isAfter(e, t)
  }, pn.isSameOrBefore = function(e, t) {
      return this.isSame(e, t) || this.isBefore(e, t)
  }, pn.isValid = function() {
      return g(this)
  }, pn.lang = nn, pn.locale = tn, pn.localeData = sn, pn.max = Pt, pn.min = Nt, pn.parsingFlags = function() {
      return c({}, y(this))
  }, pn.set = function(e, t) {
      if ("object" == typeof e)
          for (var n = function(e) {
                  var t, n = [];
                  for (t in e) m(e, t) && n.push({
                      unit: t,
                      priority: E[t]
                  });
                  return n.sort(function(e, t) {
                      return e.priority - t.priority
                  }), n
              }(e = G(e)), s = 0; s < n.length; s++) this[n[s].unit](e[n[s].unit]);
      else if (O(this[e = V(e)])) return this[e](t);
      return this
  }, pn.startOf = function(e) {
      var t, n;
      if (void 0 === (e = V(e)) || "millisecond" === e || !this.isValid()) return this;
      switch (n = this._isUTC ? un : on, e) {
          case "year":
              t = n(this.year(), 0, 1);
              break;
          case "quarter":
              t = n(this.year(), this.month() - this.month() % 3, 1);
              break;
          case "month":
              t = n(this.year(), this.month(), 1);
              break;
          case "week":
              t = n(this.year(), this.month(), this.date() - this.weekday());
              break;
          case "isoWeek":
              t = n(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
              break;
          case "day":
          case "date":
              t = n(this.year(), this.month(), this.date());
              break;
          case "hour":
              t = this._d.valueOf(), t -= an(t + (this._isUTC ? 0 : 6e4 * this.utcOffset()), 36e5);
              break;
          case "minute":
              t = this._d.valueOf(), t -= an(t, 6e4);
              break;
          case "second":
              t = this._d.valueOf(), t -= an(t, 1e3);
              break
      }
      return this._d.setTime(t), f.updateOffset(this, !0), this
  }, pn.subtract = Qt, pn.toArray = function() {
      var e = this;
      return [e.year(), e.month(), e.date(), e.hour(), e.minute(), e.second(), e.millisecond()]
  }, pn.toObject = function() {
      var e = this;
      return {
          years: e.year(),
          months: e.month(),
          date: e.date(),
          hours: e.hours(),
          minutes: e.minutes(),
          seconds: e.seconds(),
          milliseconds: e.milliseconds()
      }
  }, pn.toDate = function() {
      return new Date(this.valueOf())
  }, pn.toISOString = function(e) {
      if (!this.isValid()) return null;
      var t = !0 !== e,
          n = t ? this.clone().utc() : this;
      return n.year() < 0 || 9999 < n.year() ? U(n, t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ") : O(Date.prototype.toISOString) ? t ? this.toDate().toISOString() : new Date(this.valueOf() + 60 * this.utcOffset() * 1e3).toISOString().replace("Z", U(n, "Z")) : U(n, t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ")
  }, pn.inspect = function() {
      if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
      var e, t, n, s = "moment",
          i = "";
      return this.isLocal() || (s = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", i = "Z"), e = "[" + s + '("]', t = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", n = i + '[")]', this.format(e + t + "-MM-DD[T]HH:mm:ss.SSS" + n)
  }, "undefined" != typeof Symbol && null != Symbol.for && (pn[Symbol.for("nodejs.util.inspect.custom")] = function() {
      return "Moment<" + this.format() + ">"
  }), pn.toJSON = function() {
      return this.isValid() ? this.toISOString() : null
  }, pn.toString = function() {
      return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
  }, pn.unix = function() {
      return Math.floor(this.valueOf() / 1e3)
  }, pn.valueOf = function() {
      return this._d.valueOf() - 6e4 * (this._offset || 0)
  }, pn.creationData = function() {
      return {
          input: this._i,
          format: this._f,
          locale: this._locale,
          isUTC: this._isUTC,
          strict: this._strict
      }
  }, pn.eraName = function() {
      for (var e, t = this.localeData().eras(), n = 0, s = t.length; n < s; ++n) {
          if (e = this.clone().startOf("day").valueOf(), t[n].since <= e && e <= t[n].until) return t[n].name;
          if (t[n].until <= e && e <= t[n].since) return t[n].name
      }
      return ""
  }, pn.eraNarrow = function() {
      for (var e, t = this.localeData().eras(), n = 0, s = t.length; n < s; ++n) {
          if (e = this.clone().startOf("day").valueOf(), t[n].since <= e && e <= t[n].until) return t[n].narrow;
          if (t[n].until <= e && e <= t[n].since) return t[n].narrow
      }
      return ""
  }, pn.eraAbbr = function() {
      for (var e, t = this.localeData().eras(), n = 0, s = t.length; n < s; ++n) {
          if (e = this.clone().startOf("day").valueOf(), t[n].since <= e && e <= t[n].until) return t[n].abbr;
          if (t[n].until <= e && e <= t[n].since) return t[n].abbr
      }
      return ""
  }, pn.eraYear = function() {
      for (var e, t, n = this.localeData().eras(), s = 0, i = n.length; s < i; ++s)
          if (e = n[s].since <= n[s].until ? 1 : -1, t = this.clone().startOf("day").valueOf(), n[s].since <= t && t <= n[s].until || n[s].until <= t && t <= n[s].since) return (this.year() - f(n[s].since).year()) * e + n[s].offset;
      return this.year()
  }, pn.year = Le, pn.isLeapYear = function() {
      return j(this.year())
  }, pn.weekYear = function(e) {
      return cn.call(this, e, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
  }, pn.isoWeekYear = function(e) {
      return cn.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4)
  }, pn.quarter = pn.quarters = function(e) {
      return null == e ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3)
  }, pn.month = Ue, pn.daysInMonth = function() {
      return xe(this.year(), this.month())
  }, pn.week = pn.weeks = function(e) {
      var t = this.localeData().week(this);
      return null == e ? t : this.add(7 * (e - t), "d")
  }, pn.isoWeek = pn.isoWeeks = function(e) {
      var t = Ae(this, 1, 4).week;
      return null == e ? t : this.add(7 * (e - t), "d")
  }, pn.weeksInYear = function() {
      var e = this.localeData()._week;
      return je(this.year(), e.dow, e.doy)
  }, pn.weeksInWeekYear = function() {
      var e = this.localeData()._week;
      return je(this.weekYear(), e.dow, e.doy)
  }, pn.isoWeeksInYear = function() {
      return je(this.year(), 1, 4)
  }, pn.isoWeeksInISOWeekYear = function() {
      return je(this.isoWeekYear(), 1, 4)
  }, pn.date = fn, pn.day = pn.days = function(e) {
      if (!this.isValid()) return null != e ? this : NaN;
      var t, n, s = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
      return null != e ? (t = e, n = this.localeData(), e = "string" != typeof t ? t : isNaN(t) ? "number" == typeof(t = n.weekdaysParse(t)) ? t : null : parseInt(t, 10), this.add(e - s, "d")) : s
  }, pn.weekday = function(e) {
      if (!this.isValid()) return null != e ? this : NaN;
      var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
      return null == e ? t : this.add(e - t, "d")
  }, pn.isoWeekday = function(e) {
      if (!this.isValid()) return null != e ? this : NaN;
      if (null == e) return this.day() || 7;
      var t, n, s = (t = e, n = this.localeData(), "string" == typeof t ? n.weekdaysParse(t) % 7 || 7 : isNaN(t) ? null : t);
      return this.day(this.day() % 7 ? s : s - 7)
  }, pn.dayOfYear = function(e) {
      var t = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
      return null == e ? t : this.add(e - t, "d")
  }, pn.hour = pn.hours = tt, pn.minute = pn.minutes = mn, pn.second = pn.seconds = gn, pn.millisecond = pn.milliseconds = yn, pn.utcOffset = function(e, t, n) {
      var s, i = this._offset || 0;
      if (!this.isValid()) return null != e ? this : NaN;
      if (null == e) return this._isUTC ? i : Et(this);
      if ("string" == typeof e) {
          if (null === (e = Vt(he, e))) return this
      } else Math.abs(e) < 16 && !n && (e *= 60);
      return !this._isUTC && t && (s = Et(this)), this._offset = e, this._isUTC = !0, null != s && this.add(s, "m"), i !== e && (!t || this._changeInProgress ? Bt(this, Zt(e - i, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, f.updateOffset(this, !0), this._changeInProgress = null)), this
  }, pn.utc = function(e) {
      return this.utcOffset(0, e)
  }, pn.local = function(e) {
      return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(Et(this), "m")), this
  }, pn.parseZone = function() {
      var e;
      return null != this._tzm ? this.utcOffset(this._tzm, !1, !0) : "string" == typeof this._i && (null != (e = Vt(le, this._i)) ? this.utcOffset(e) : this.utcOffset(0, !0)), this
  }, pn.hasAlignedHourOffset = function(e) {
      return !!this.isValid() && (e = e ? Tt(e).utcOffset() : 0, (this.utcOffset() - e) % 60 == 0)
  }, pn.isDST = function() {
      return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
  }, pn.isLocal = function() {
      return !!this.isValid() && !this._isUTC
  }, pn.isUtcOffset = function() {
      return !!this.isValid() && this._isUTC
  }, pn.isUtc = At, pn.isUTC = At, pn.zoneAbbr = function() {
      return this._isUTC ? "UTC" : ""
  }, pn.zoneName = function() {
      return this._isUTC ? "Coordinated Universal Time" : ""
  }, pn.dates = n("dates accessor is deprecated. Use date instead.", fn), pn.months = n("months accessor is deprecated. Use month instead", Ue), pn.years = n("years accessor is deprecated. Use year instead", Le), pn.zone = n("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", function(e, t) {
      return null != e ? ("string" != typeof e && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset()
  }), pn.isDSTShifted = n("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", function() {
      if (!r(this._isDSTShifted)) return this._isDSTShifted;
      var e, t = {};
      return v(t, this), (t = bt(t))._a ? (e = (t._isUTC ? _ : Tt)(t._a), this._isDSTShifted = this.isValid() && 0 < function(e, t, n) {
          for (var s = Math.min(e.length, t.length), i = Math.abs(e.length - t.length), r = 0, a = 0; a < s; a++)(n && e[a] !== t[a] || !n && Z(e[a]) !== Z(t[a])) && r++;
          return r + i
      }(t._a, e.toArray())) : this._isDSTShifted = !1, this._isDSTShifted
  });
  var kn = x.prototype;

  function Mn(e, t, n, s) {
      var i = dt(),
          r = _().set(s, t);
      return i[n](r, e)
  }

  function Dn(e, t, n) {
      if (h(e) && (t = e, e = void 0), e = e || "", null != t) return Mn(e, t, n, "month");
      for (var s = [], i = 0; i < 12; i++) s[i] = Mn(e, i, n, "month");
      return s
  }

  function Sn(e, t, n, s) {
      t = ("boolean" == typeof e ? h(t) && (n = t, t = void 0) : (t = e, e = !1, h(n = t) && (n = t, t = void 0)), t || "");
      var i, r = dt(),
          a = e ? r._week.dow : 0,
          o = [];
      if (null != n) return Mn(t, (n + a) % 7, s, "day");
      for (i = 0; i < 7; i++) o[i] = Mn(t, (i + a) % 7, s, "day");
      return o
  }
  kn.calendar = function(e, t, n) {
      var s = this._calendar[e] || this._calendar.sameElse;
      return O(s) ? s.call(t, n) : s
  }, kn.longDateFormat = function(e) {
      var t = this._longDateFormat[e],
          n = this._longDateFormat[e.toUpperCase()];
      return t || !n ? t : (this._longDateFormat[e] = n.match(N).map(function(e) {
          return "MMMM" === e || "MM" === e || "DD" === e || "dddd" === e ? e.slice(1) : e
      }).join(""), this._longDateFormat[e])
  }, kn.invalidDate = function() {
      return this._invalidDate
  }, kn.ordinal = function(e) {
      return this._ordinal.replace("%d", e)
  }, kn.preparse = vn, kn.postformat = vn, kn.relativeTime = function(e, t, n, s) {
      var i = this._relativeTime[n];
      return O(i) ? i(e, t, n, s) : i.replace(/%d/i, e)
  }, kn.pastFuture = function(e, t) {
      var n = this._relativeTime[0 < e ? "future" : "past"];
      return O(n) ? n(t) : n.replace(/%s/i, t)
  }, kn.set = function(e) {
      var t, n;
      for (n in e) m(e, n) && (O(t = e[n]) ? this[n] = t : this["_" + n] = t);
      this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source)
  }, kn.eras = function(e, t) {
      for (var n, s = this._eras || dt("en")._eras, i = 0, r = s.length; i < r; ++i) {
          switch (typeof s[i].since) {
              case "string":
                  n = f(s[i].since).startOf("day"), s[i].since = n.valueOf();
                  break
          }
          switch (typeof s[i].until) {
              case "undefined":
                  s[i].until = 1 / 0;
                  break;
              case "string":
                  n = f(s[i].until).startOf("day").valueOf(), s[i].until = n.valueOf();
                  break
          }
      }
      return s
  }, kn.erasParse = function(e, t, n) {
      var s, i, r, a, o, u = this.eras();
      for (e = e.toUpperCase(), s = 0, i = u.length; s < i; ++s)
          if (r = u[s].name.toUpperCase(), a = u[s].abbr.toUpperCase(), o = u[s].narrow.toUpperCase(), n) switch (t) {
              case "N":
              case "NN":
              case "NNN":
                  if (a === e) return u[s];
                  break;
              case "NNNN":
                  if (r === e) return u[s];
                  break;
              case "NNNNN":
                  if (o === e) return u[s];
                  break
          } else if (0 <= [r, a, o].indexOf(e)) return u[s]
  }, kn.erasConvertYear = function(e, t) {
      var n = e.since <= e.until ? 1 : -1;
      return void 0 === t ? f(e.since).year() : f(e.since).year() + (t - e.offset) * n
  }, kn.erasAbbrRegex = function(e) {
      return m(this, "_erasAbbrRegex") || hn.call(this), e ? this._erasAbbrRegex : this._erasRegex
  }, kn.erasNameRegex = function(e) {
      return m(this, "_erasNameRegex") || hn.call(this), e ? this._erasNameRegex : this._erasRegex
  }, kn.erasNarrowRegex = function(e) {
      return m(this, "_erasNarrowRegex") || hn.call(this), e ? this._erasNarrowRegex : this._erasRegex
  }, kn.months = function(e, t) {
      return e ? o(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || Pe).test(t) ? "format" : "standalone"][e.month()] : o(this._months) ? this._months : this._months.standalone
  }, kn.monthsShort = function(e, t) {
      return e ? o(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[Pe.test(t) ? "format" : "standalone"][e.month()] : o(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone
  }, kn.monthsParse = function(e, t, n) {
      var s, i, r;
      if (this._monthsParseExact) return function(e, t, n) {
          var s, i, r, a = e.toLocaleLowerCase();
          if (!this._monthsParse)
              for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], s = 0; s < 12; ++s) r = _([2e3, s]), this._shortMonthsParse[s] = this.monthsShort(r, "").toLocaleLowerCase(), this._longMonthsParse[s] = this.months(r, "").toLocaleLowerCase();
          return n ? "MMM" === t ? -1 !== (i = we.call(this._shortMonthsParse, a)) ? i : null : -1 !== (i = we.call(this._longMonthsParse, a)) ? i : null : "MMM" === t ? -1 !== (i = we.call(this._shortMonthsParse, a)) || -1 !== (i = we.call(this._longMonthsParse, a)) ? i : null : -1 !== (i = we.call(this._longMonthsParse, a)) || -1 !== (i = we.call(this._shortMonthsParse, a)) ? i : null
      }.call(this, e, t, n);
      for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), s = 0; s < 12; s++) {
          if (i = _([2e3, s]), n && !this._longMonthsParse[s] && (this._longMonthsParse[s] = new RegExp("^" + this.months(i, "").replace(".", "") + "$", "i"), this._shortMonthsParse[s] = new RegExp("^" + this.monthsShort(i, "").replace(".", "") + "$", "i")), n || this._monthsParse[s] || (r = "^" + this.months(i, "") + "|^" + this.monthsShort(i, ""), this._monthsParse[s] = new RegExp(r.replace(".", ""), "i")), n && "MMMM" === t && this._longMonthsParse[s].test(e)) return s;
          if (n && "MMM" === t && this._shortMonthsParse[s].test(e)) return s;
          if (!n && this._monthsParse[s].test(e)) return s
      }
  }, kn.monthsRegex = function(e) {
      return this._monthsParseExact ? (m(this, "_monthsRegex") || He.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (m(this, "_monthsRegex") || (this._monthsRegex = We), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex)
  }, kn.monthsShortRegex = function(e) {
      return this._monthsParseExact ? (m(this, "_monthsRegex") || He.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (m(this, "_monthsShortRegex") || (this._monthsShortRegex = Re), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex)
  }, kn.week = function(e) {
      return Ae(e, this._week.dow, this._week.doy).week
  }, kn.firstDayOfYear = function() {
      return this._week.doy
  }, kn.firstDayOfWeek = function() {
      return this._week.dow
  }, kn.weekdays = function(e, t) {
      var n = o(this._weekdays) ? this._weekdays : this._weekdays[e && !0 !== e && this._weekdays.isFormat.test(t) ? "format" : "standalone"];
      return !0 === e ? Ie(n, this._week.dow) : e ? n[e.day()] : n
  }, kn.weekdaysMin = function(e) {
      return !0 === e ? Ie(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin
  }, kn.weekdaysShort = function(e) {
      return !0 === e ? Ie(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort
  }, kn.weekdaysParse = function(e, t, n) {
      var s, i, r;
      if (this._weekdaysParseExact) return function(e, t, n) {
          var s, i, r, a = e.toLocaleLowerCase();
          if (!this._weekdaysParse)
              for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], s = 0; s < 7; ++s) r = _([2e3, 1]).day(s), this._minWeekdaysParse[s] = this.weekdaysMin(r, "").toLocaleLowerCase(), this._shortWeekdaysParse[s] = this.weekdaysShort(r, "").toLocaleLowerCase(), this._weekdaysParse[s] = this.weekdays(r, "").toLocaleLowerCase();
          return n ? "dddd" === t ? -1 !== (i = we.call(this._weekdaysParse, a)) ? i : null : "ddd" === t ? -1 !== (i = we.call(this._shortWeekdaysParse, a)) ? i : null : -1 !== (i = we.call(this._minWeekdaysParse, a)) ? i : null : "dddd" === t ? -1 !== (i = we.call(this._weekdaysParse, a)) || -1 !== (i = we.call(this._shortWeekdaysParse, a)) || -1 !== (i = we.call(this._minWeekdaysParse, a)) ? i : null : "ddd" === t ? -1 !== (i = we.call(this._shortWeekdaysParse, a)) || -1 !== (i = we.call(this._weekdaysParse, a)) || -1 !== (i = we.call(this._minWeekdaysParse, a)) ? i : null : -1 !== (i = we.call(this._minWeekdaysParse, a)) || -1 !== (i = we.call(this._weekdaysParse, a)) || -1 !== (i = we.call(this._shortWeekdaysParse, a)) ? i : null
      }.call(this, e, t, n);
      for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), s = 0; s < 7; s++) {
          if (i = _([2e3, 1]).day(s), n && !this._fullWeekdaysParse[s] && (this._fullWeekdaysParse[s] = new RegExp("^" + this.weekdays(i, "").replace(".", "\\.?") + "$", "i"), this._shortWeekdaysParse[s] = new RegExp("^" + this.weekdaysShort(i, "").replace(".", "\\.?") + "$", "i"), this._minWeekdaysParse[s] = new RegExp("^" + this.weekdaysMin(i, "").replace(".", "\\.?") + "$", "i")), this._weekdaysParse[s] || (r = "^" + this.weekdays(i, "") + "|^" + this.weekdaysShort(i, "") + "|^" + this.weekdaysMin(i, ""), this._weekdaysParse[s] = new RegExp(r.replace(".", ""), "i")), n && "dddd" === t && this._fullWeekdaysParse[s].test(e)) return s;
          if (n && "ddd" === t && this._shortWeekdaysParse[s].test(e)) return s;
          if (n && "dd" === t && this._minWeekdaysParse[s].test(e)) return s;
          if (!n && this._weekdaysParse[s].test(e)) return s
      }
  }, kn.weekdaysRegex = function(e) {
      return this._weekdaysParseExact ? (m(this, "_weekdaysRegex") || Qe.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (m(this, "_weekdaysRegex") || (this._weekdaysRegex = qe), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex)
  }, kn.weekdaysShortRegex = function(e) {
      return this._weekdaysParseExact ? (m(this, "_weekdaysRegex") || Qe.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (m(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Be), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
  }, kn.weekdaysMinRegex = function(e) {
      return this._weekdaysParseExact ? (m(this, "_weekdaysRegex") || Qe.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (m(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Je), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
  }, kn.isPM = function(e) {
      return "p" === (e + "").toLowerCase().charAt(0)
  }, kn.meridiem = function(e, t, n) {
      return 11 < e ? n ? "pm" : "PM" : n ? "am" : "AM"
  }, lt("en", {
      eras: [{
          since: "0001-01-01",
          until: 1 / 0,
          offset: 1,
          name: "Anno Domini",
          narrow: "AD",
          abbr: "AD"
      }, {
          since: "0000-12-31",
          until: -1 / 0,
          offset: 1,
          name: "Before Christ",
          narrow: "BC",
          abbr: "BC"
      }],
      dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
      ordinal: function(e) {
          var t = e % 10;
          return e + (1 === Z(e % 100 / 10) ? "th" : 1 == t ? "st" : 2 == t ? "nd" : 3 == t ? "rd" : "th")
      }
  }), f.lang = n("moment.lang is deprecated. Use moment.locale instead.", lt), f.langData = n("moment.langData is deprecated. Use moment.localeData instead.", dt);
  var Yn = Math.abs;

  function On(e, t, n, s) {
      var i = Zt(t, n);
      return e._milliseconds += s * i._milliseconds, e._days += s * i._days, e._months += s * i._months, e._bubble()
  }

  function bn(e) {
      return e < 0 ? Math.floor(e) : Math.ceil(e)
  }

  function xn(e) {
      return 4800 * e / 146097
  }

  function Tn(e) {
      return 146097 * e / 4800
  }

  function Nn(e) {
      return function() {
          return this.as(e)
      }
  }
  var Pn = Nn("ms"),
      Rn = Nn("s"),
      Wn = Nn("m"),
      Cn = Nn("h"),
      Un = Nn("d"),
      Hn = Nn("w"),
      Fn = Nn("M"),
      Ln = Nn("Q"),
      Vn = Nn("y");

  function Gn(e) {
      return function() {
          return this.isValid() ? this._data[e] : NaN
      }
  }
  var En = Gn("milliseconds"),
      An = Gn("seconds"),
      jn = Gn("minutes"),
      In = Gn("hours"),
      Zn = Gn("days"),
      zn = Gn("months"),
      $n = Gn("years");
  var qn = Math.round,
      Bn = {
          ss: 44,
          s: 45,
          m: 45,
          h: 22,
          d: 26,
          w: null,
          M: 11
      };

  function Jn(e, t, n, s) {
      var i = Zt(e).abs(),
          r = qn(i.as("s")),
          a = qn(i.as("m")),
          o = qn(i.as("h")),
          u = qn(i.as("d")),
          l = qn(i.as("M")),
          h = qn(i.as("w")),
          d = qn(i.as("y")),
          c = (r <= n.ss ? ["s", r] : r < n.s && ["ss", r]) || a <= 1 && ["m"] || a < n.m && ["mm", a] || o <= 1 && ["h"] || o < n.h && ["hh", o] || u <= 1 && ["d"] || u < n.d && ["dd", u];
      return null != n.w && (c = c || h <= 1 && ["w"] || h < n.w && ["ww", h]), (c = c || l <= 1 && ["M"] || l < n.M && ["MM", l] || d <= 1 && ["y"] || ["yy", d])[2] = t, c[3] = 0 < +e, c[4] = s,
          function(e, t, n, s, i) {
              return i.relativeTime(t || 1, !!n, e, s)
          }.apply(null, c)
  }
  var Qn = Math.abs;

  function Xn(e) {
      return (0 < e) - (e < 0) || +e
  }

  function Kn() {
      if (!this.isValid()) return this.localeData().invalidDate();
      var e, t, n, s, i, r, a, o, u = Qn(this._milliseconds) / 1e3,
          l = Qn(this._days),
          h = Qn(this._months),
          d = this.asSeconds();
      return d ? (e = I(u / 60), t = I(e / 60), u %= 60, e %= 60, n = I(h / 12), h %= 12, s = u ? u.toFixed(3).replace(/\.?0+$/, "") : "", i = d < 0 ? "-" : "", r = Xn(this._months) !== Xn(d) ? "-" : "", a = Xn(this._days) !== Xn(d) ? "-" : "", o = Xn(this._milliseconds) !== Xn(d) ? "-" : "", i + "P" + (n ? r + n + "Y" : "") + (h ? r + h + "M" : "") + (l ? a + l + "D" : "") + (t || e || u ? "T" : "") + (t ? o + t + "H" : "") + (e ? o + e + "M" : "") + (u ? o + s + "S" : "")) : "P0D"
  }
  var es = Ct.prototype;
  return es.isValid = function() {
      return this._isValid
  }, es.abs = function() {
      var e = this._data;
      return this._milliseconds = Yn(this._milliseconds), this._days = Yn(this._days), this._months = Yn(this._months), e.milliseconds = Yn(e.milliseconds), e.seconds = Yn(e.seconds), e.minutes = Yn(e.minutes), e.hours = Yn(e.hours), e.months = Yn(e.months), e.years = Yn(e.years), this
  }, es.add = function(e, t) {
      return On(this, e, t, 1)
  }, es.subtract = function(e, t) {
      return On(this, e, t, -1)
  }, es.as = function(e) {
      if (!this.isValid()) return NaN;
      var t, n, s = this._milliseconds;
      if ("month" === (e = V(e)) || "quarter" === e || "year" === e) switch (t = this._days + s / 864e5, n = this._months + xn(t), e) {
          case "month":
              return n;
          case "quarter":
              return n / 3;
          case "year":
              return n / 12
      } else switch (t = this._days + Math.round(Tn(this._months)), e) {
          case "week":
              return t / 7 + s / 6048e5;
          case "day":
              return t + s / 864e5;
          case "hour":
              return 24 * t + s / 36e5;
          case "minute":
              return 1440 * t + s / 6e4;
          case "second":
              return 86400 * t + s / 1e3;
          case "millisecond":
              return Math.floor(864e5 * t) + s;
          default:
              throw new Error("Unknown unit " + e)
      }
  }, es.asMilliseconds = Pn, es.asSeconds = Rn, es.asMinutes = Wn, es.asHours = Cn, es.asDays = Un, es.asWeeks = Hn, es.asMonths = Fn, es.asQuarters = Ln, es.asYears = Vn, es.valueOf = function() {
      return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * Z(this._months / 12) : NaN
  }, es._bubble = function() {
      var e, t, n, s, i, r = this._milliseconds,
          a = this._days,
          o = this._months,
          u = this._data;
      return 0 <= r && 0 <= a && 0 <= o || r <= 0 && a <= 0 && o <= 0 || (r += 864e5 * bn(Tn(o) + a), o = a = 0), u.milliseconds = r % 1e3, e = I(r / 1e3), u.seconds = e % 60, t = I(e / 60), u.minutes = t % 60, n = I(t / 60), u.hours = n % 24, a += I(n / 24), o += i = I(xn(a)), a -= bn(Tn(i)), s = I(o / 12), o %= 12, u.days = a, u.months = o, u.years = s, this
  }, es.clone = function() {
      return Zt(this)
  }, es.get = function(e) {
      return e = V(e), this.isValid() ? this[e + "s"]() : NaN
  }, es.milliseconds = En, es.seconds = An, es.minutes = jn, es.hours = In, es.days = Zn, es.weeks = function() {
      return I(this.days() / 7)
  }, es.months = zn, es.years = $n, es.humanize = function(e, t) {
      if (!this.isValid()) return this.localeData().invalidDate();
      var n, s, i = !1,
          r = Bn;
      return "object" == typeof e && (t = e, e = !1), "boolean" == typeof e && (i = e), "object" == typeof t && (r = Object.assign({}, Bn, t), null != t.s && null == t.ss && (r.ss = t.s - 1)), n = this.localeData(), s = Jn(this, !i, r, n), i && (s = n.pastFuture(+this, s)), n.postformat(s)
  }, es.toISOString = Kn, es.toString = Kn, es.toJSON = Kn, es.locale = tn, es.localeData = sn, es.toIsoString = n("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Kn), es.lang = nn, C("X", 0, 0, "unix"), C("x", 0, 0, "valueOf"), ce("x", ue), ce("X", /[+-]?\d+(\.\d{1,3})?/), ye("X", function(e, t, n) {
      n._d = new Date(1e3 * parseFloat(e))
  }), ye("x", function(e, t, n) {
      n._d = new Date(Z(e))
  }), f.version = "2.29.1", e = Tt, f.fn = pn, f.min = function() {
      return Rt("isBefore", [].slice.call(arguments, 0))
  }, f.max = function() {
      return Rt("isAfter", [].slice.call(arguments, 0))
  }, f.now = function() {
      return Date.now ? Date.now() : +new Date
  }, f.utc = _, f.unix = function(e) {
      return Tt(1e3 * e)
  }, f.months = function(e, t) {
      return Dn(e, t, "months")
  }, f.isDate = a, f.locale = lt, f.invalid = w, f.duration = Zt, f.isMoment = M, f.weekdays = function(e, t, n) {
      return Sn(e, t, n, "weekdays")
  }, f.parseZone = function() {
      return Tt.apply(null, arguments).parseZone()
  }, f.localeData = dt, f.isDuration = Ut, f.monthsShort = function(e, t) {
      return Dn(e, t, "monthsShort")
  }, f.weekdaysMin = function(e, t, n) {
      return Sn(e, t, n, "weekdaysMin")
  }, f.defineLocale = ht, f.updateLocale = function(e, t) {
      var n, s, i;
      return null != t ? (i = st, null != it[e] && null != it[e].parentLocale ? it[e].set(b(it[e]._config, t)) : (null != (s = ut(e)) && (i = s._config), t = b(i, t), null == s && (t.abbr = e), (n = new x(t)).parentLocale = it[e], it[e] = n), lt(e)) : null != it[e] && (null != it[e].parentLocale ? (it[e] = it[e].parentLocale, e === lt() && lt(e)) : null != it[e] && delete it[e]), it[e]
  }, f.locales = function() {
      return s(it)
  }, f.weekdaysShort = function(e, t, n) {
      return Sn(e, t, n, "weekdaysShort")
  }, f.normalizeUnits = V, f.relativeTimeRounding = function(e) {
      return void 0 === e ? qn : "function" == typeof e && (qn = e, !0)
  }, f.relativeTimeThreshold = function(e, t) {
      return void 0 !== Bn[e] && (void 0 === t ? Bn[e] : (Bn[e] = t, "s" === e && (Bn.ss = t - 1), !0))
  }, f.calendarFormat = function(e, t) {
      var n = e.diff(t, "days", !0);
      return n < -6 ? "sameElse" : n < -1 ? "lastWeek" : n < 0 ? "lastDay" : n < 1 ? "sameDay" : n < 2 ? "nextDay" : n < 7 ? "nextWeek" : "sameElse"
  }, f.prototype = pn, f.HTML5_FMT = {
      DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
      DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
      DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
      DATE: "YYYY-MM-DD",
      TIME: "HH:mm",
      TIME_SECONDS: "HH:mm:ss",
      TIME_MS: "HH:mm:ss.SSS",
      WEEK: "GGGG-[W]WW",
      MONTH: "YYYY-MM"
  }, f
});
//# sourceMappingURL=moment.min.js.map

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
/* MIT license */

module.exports = {
  rgb2hsl: rgb2hsl,
  rgb2hsv: rgb2hsv,
  rgb2hwb: rgb2hwb,
  rgb2cmyk: rgb2cmyk,
  rgb2keyword: rgb2keyword,
  rgb2xyz: rgb2xyz,
  rgb2lab: rgb2lab,
  rgb2lch: rgb2lch,

  hsl2rgb: hsl2rgb,
  hsl2hsv: hsl2hsv,
  hsl2hwb: hsl2hwb,
  hsl2cmyk: hsl2cmyk,
  hsl2keyword: hsl2keyword,

  hsv2rgb: hsv2rgb,
  hsv2hsl: hsv2hsl,
  hsv2hwb: hsv2hwb,
  hsv2cmyk: hsv2cmyk,
  hsv2keyword: hsv2keyword,

  hwb2rgb: hwb2rgb,
  hwb2hsl: hwb2hsl,
  hwb2hsv: hwb2hsv,
  hwb2cmyk: hwb2cmyk,
  hwb2keyword: hwb2keyword,

  cmyk2rgb: cmyk2rgb,
  cmyk2hsl: cmyk2hsl,
  cmyk2hsv: cmyk2hsv,
  cmyk2hwb: cmyk2hwb,
  cmyk2keyword: cmyk2keyword,

  keyword2rgb: keyword2rgb,
  keyword2hsl: keyword2hsl,
  keyword2hsv: keyword2hsv,
  keyword2hwb: keyword2hwb,
  keyword2cmyk: keyword2cmyk,
  keyword2lab: keyword2lab,
  keyword2xyz: keyword2xyz,

  xyz2rgb: xyz2rgb,
  xyz2lab: xyz2lab,
  xyz2lch: xyz2lch,

  lab2xyz: lab2xyz,
  lab2rgb: lab2rgb,
  lab2lch: lab2lch,

  lch2lab: lch2lab,
  lch2xyz: lch2xyz,
  lch2rgb: lch2rgb
}


function rgb2hsl(rgb) {
  var r = rgb[0]/255,
      g = rgb[1]/255,
      b = rgb[2]/255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      delta = max - min,
      h, s, l;

  if (max == min)
    h = 0;
  else if (r == max)
    h = (g - b) / delta;
  else if (g == max)
    h = 2 + (b - r) / delta;
  else if (b == max)
    h = 4 + (r - g)/ delta;

  h = Math.min(h * 60, 360);

  if (h < 0)
    h += 360;

  l = (min + max) / 2;

  if (max == min)
    s = 0;
  else if (l <= 0.5)
    s = delta / (max + min);
  else
    s = delta / (2 - max - min);

  return [h, s * 100, l * 100];
}

function rgb2hsv(rgb) {
  var r = rgb[0],
      g = rgb[1],
      b = rgb[2],
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      delta = max - min,
      h, s, v;

  if (max == 0)
    s = 0;
  else
    s = (delta/max * 1000)/10;

  if (max == min)
    h = 0;
  else if (r == max)
    h = (g - b) / delta;
  else if (g == max)
    h = 2 + (b - r) / delta;
  else if (b == max)
    h = 4 + (r - g) / delta;

  h = Math.min(h * 60, 360);

  if (h < 0)
    h += 360;

  v = ((max / 255) * 1000) / 10;

  return [h, s, v];
}

function rgb2hwb(rgb) {
  var r = rgb[0],
      g = rgb[1],
      b = rgb[2],
      h = rgb2hsl(rgb)[0],
      w = 1/255 * Math.min(r, Math.min(g, b)),
      b = 1 - 1/255 * Math.max(r, Math.max(g, b));

  return [h, w * 100, b * 100];
}

function rgb2cmyk(rgb) {
  var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255,
      c, m, y, k;

  k = Math.min(1 - r, 1 - g, 1 - b);
  c = (1 - r - k) / (1 - k) || 0;
  m = (1 - g - k) / (1 - k) || 0;
  y = (1 - b - k) / (1 - k) || 0;
  return [c * 100, m * 100, y * 100, k * 100];
}

function rgb2keyword(rgb) {
  return reverseKeywords[JSON.stringify(rgb)];
}

function rgb2xyz(rgb) {
  var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255;

  // assume sRGB
  r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
  g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
  b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

  var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
  var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
  var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

  return [x * 100, y *100, z * 100];
}

function rgb2lab(rgb) {
  var xyz = rgb2xyz(rgb),
        x = xyz[0],
        y = xyz[1],
        z = xyz[2],
        l, a, b;

  x /= 95.047;
  y /= 100;
  z /= 108.883;

  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);

  l = (116 * y) - 16;
  a = 500 * (x - y);
  b = 200 * (y - z);

  return [l, a, b];
}

function rgb2lch(args) {
  return lab2lch(rgb2lab(args));
}

function hsl2rgb(hsl) {
  var h = hsl[0] / 360,
      s = hsl[1] / 100,
      l = hsl[2] / 100,
      t1, t2, t3, rgb, val;

  if (s == 0) {
    val = l * 255;
    return [val, val, val];
  }

  if (l < 0.5)
    t2 = l * (1 + s);
  else
    t2 = l + s - l * s;
  t1 = 2 * l - t2;

  rgb = [0, 0, 0];
  for (var i = 0; i < 3; i++) {
    t3 = h + 1 / 3 * - (i - 1);
    t3 < 0 && t3++;
    t3 > 1 && t3--;

    if (6 * t3 < 1)
      val = t1 + (t2 - t1) * 6 * t3;
    else if (2 * t3 < 1)
      val = t2;
    else if (3 * t3 < 2)
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
    else
      val = t1;

    rgb[i] = val * 255;
  }

  return rgb;
}

function hsl2hsv(hsl) {
  var h = hsl[0],
      s = hsl[1] / 100,
      l = hsl[2] / 100,
      sv, v;

  if(l === 0) {
      // no need to do calc on black
      // also avoids divide by 0 error
      return [0, 0, 0];
  }

  l *= 2;
  s *= (l <= 1) ? l : 2 - l;
  v = (l + s) / 2;
  sv = (2 * s) / (l + s);
  return [h, sv * 100, v * 100];
}

function hsl2hwb(args) {
  return rgb2hwb(hsl2rgb(args));
}

function hsl2cmyk(args) {
  return rgb2cmyk(hsl2rgb(args));
}

function hsl2keyword(args) {
  return rgb2keyword(hsl2rgb(args));
}


function hsv2rgb(hsv) {
  var h = hsv[0] / 60,
      s = hsv[1] / 100,
      v = hsv[2] / 100,
      hi = Math.floor(h) % 6;

  var f = h - Math.floor(h),
      p = 255 * v * (1 - s),
      q = 255 * v * (1 - (s * f)),
      t = 255 * v * (1 - (s * (1 - f))),
      v = 255 * v;

  switch(hi) {
    case 0:
      return [v, t, p];
    case 1:
      return [q, v, p];
    case 2:
      return [p, v, t];
    case 3:
      return [p, q, v];
    case 4:
      return [t, p, v];
    case 5:
      return [v, p, q];
  }
}

function hsv2hsl(hsv) {
  var h = hsv[0],
      s = hsv[1] / 100,
      v = hsv[2] / 100,
      sl, l;

  l = (2 - s) * v;
  sl = s * v;
  sl /= (l <= 1) ? l : 2 - l;
  sl = sl || 0;
  l /= 2;
  return [h, sl * 100, l * 100];
}

function hsv2hwb(args) {
  return rgb2hwb(hsv2rgb(args))
}

function hsv2cmyk(args) {
  return rgb2cmyk(hsv2rgb(args));
}

function hsv2keyword(args) {
  return rgb2keyword(hsv2rgb(args));
}

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
function hwb2rgb(hwb) {
  var h = hwb[0] / 360,
      wh = hwb[1] / 100,
      bl = hwb[2] / 100,
      ratio = wh + bl,
      i, v, f, n;

  // wh + bl cant be > 1
  if (ratio > 1) {
    wh /= ratio;
    bl /= ratio;
  }

  i = Math.floor(6 * h);
  v = 1 - bl;
  f = 6 * h - i;
  if ((i & 0x01) != 0) {
    f = 1 - f;
  }
  n = wh + f * (v - wh);  // linear interpolation

  switch (i) {
    default:
    case 6:
    case 0: r = v; g = n; b = wh; break;
    case 1: r = n; g = v; b = wh; break;
    case 2: r = wh; g = v; b = n; break;
    case 3: r = wh; g = n; b = v; break;
    case 4: r = n; g = wh; b = v; break;
    case 5: r = v; g = wh; b = n; break;
  }

  return [r * 255, g * 255, b * 255];
}

function hwb2hsl(args) {
  return rgb2hsl(hwb2rgb(args));
}

function hwb2hsv(args) {
  return rgb2hsv(hwb2rgb(args));
}

function hwb2cmyk(args) {
  return rgb2cmyk(hwb2rgb(args));
}

function hwb2keyword(args) {
  return rgb2keyword(hwb2rgb(args));
}

function cmyk2rgb(cmyk) {
  var c = cmyk[0] / 100,
      m = cmyk[1] / 100,
      y = cmyk[2] / 100,
      k = cmyk[3] / 100,
      r, g, b;

  r = 1 - Math.min(1, c * (1 - k) + k);
  g = 1 - Math.min(1, m * (1 - k) + k);
  b = 1 - Math.min(1, y * (1 - k) + k);
  return [r * 255, g * 255, b * 255];
}

function cmyk2hsl(args) {
  return rgb2hsl(cmyk2rgb(args));
}

function cmyk2hsv(args) {
  return rgb2hsv(cmyk2rgb(args));
}

function cmyk2hwb(args) {
  return rgb2hwb(cmyk2rgb(args));
}

function cmyk2keyword(args) {
  return rgb2keyword(cmyk2rgb(args));
}


function xyz2rgb(xyz) {
  var x = xyz[0] / 100,
      y = xyz[1] / 100,
      z = xyz[2] / 100,
      r, g, b;

  r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
  g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
  b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

  // assume sRGB
  r = r > 0.0031308 ? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
    : r = (r * 12.92);

  g = g > 0.0031308 ? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
    : g = (g * 12.92);

  b = b > 0.0031308 ? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
    : b = (b * 12.92);

  r = Math.min(Math.max(0, r), 1);
  g = Math.min(Math.max(0, g), 1);
  b = Math.min(Math.max(0, b), 1);

  return [r * 255, g * 255, b * 255];
}

function xyz2lab(xyz) {
  var x = xyz[0],
      y = xyz[1],
      z = xyz[2],
      l, a, b;

  x /= 95.047;
  y /= 100;
  z /= 108.883;

  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);

  l = (116 * y) - 16;
  a = 500 * (x - y);
  b = 200 * (y - z);

  return [l, a, b];
}

function xyz2lch(args) {
  return lab2lch(xyz2lab(args));
}

function lab2xyz(lab) {
  var l = lab[0],
      a = lab[1],
      b = lab[2],
      x, y, z, y2;

  if (l <= 8) {
    y = (l * 100) / 903.3;
    y2 = (7.787 * (y / 100)) + (16 / 116);
  } else {
    y = 100 * Math.pow((l + 16) / 116, 3);
    y2 = Math.pow(y / 100, 1/3);
  }

  x = x / 95.047 <= 0.008856 ? x = (95.047 * ((a / 500) + y2 - (16 / 116))) / 7.787 : 95.047 * Math.pow((a / 500) + y2, 3);

  z = z / 108.883 <= 0.008859 ? z = (108.883 * (y2 - (b / 200) - (16 / 116))) / 7.787 : 108.883 * Math.pow(y2 - (b / 200), 3);

  return [x, y, z];
}

function lab2lch(lab) {
  var l = lab[0],
      a = lab[1],
      b = lab[2],
      hr, h, c;

  hr = Math.atan2(b, a);
  h = hr * 360 / 2 / Math.PI;
  if (h < 0) {
    h += 360;
  }
  c = Math.sqrt(a * a + b * b);
  return [l, c, h];
}

function lab2rgb(args) {
  return xyz2rgb(lab2xyz(args));
}

function lch2lab(lch) {
  var l = lch[0],
      c = lch[1],
      h = lch[2],
      a, b, hr;

  hr = h / 360 * 2 * Math.PI;
  a = c * Math.cos(hr);
  b = c * Math.sin(hr);
  return [l, a, b];
}

function lch2xyz(args) {
  return lab2xyz(lch2lab(args));
}

function lch2rgb(args) {
  return lab2rgb(lch2lab(args));
}

function keyword2rgb(keyword) {
  return cssKeywords[keyword];
}

function keyword2hsl(args) {
  return rgb2hsl(keyword2rgb(args));
}

function keyword2hsv(args) {
  return rgb2hsv(keyword2rgb(args));
}

function keyword2hwb(args) {
  return rgb2hwb(keyword2rgb(args));
}

function keyword2cmyk(args) {
  return rgb2cmyk(keyword2rgb(args));
}

function keyword2lab(args) {
  return rgb2lab(keyword2rgb(args));
}

function keyword2xyz(args) {
  return rgb2xyz(keyword2rgb(args));
}

var cssKeywords = {
  aliceblue:  [240,248,255],
  antiquewhite: [250,235,215],
  aqua: [0,255,255],
  aquamarine: [127,255,212],
  azure:  [240,255,255],
  beige:  [245,245,220],
  bisque: [255,228,196],
  black:  [0,0,0],
  blanchedalmond: [255,235,205],
  blue: [0,0,255],
  blueviolet: [138,43,226],
  brown:  [165,42,42],
  burlywood:  [222,184,135],
  cadetblue:  [95,158,160],
  chartreuse: [127,255,0],
  chocolate:  [210,105,30],
  coral:  [255,127,80],
  cornflowerblue: [100,149,237],
  cornsilk: [255,248,220],
  crimson:  [220,20,60],
  cyan: [0,255,255],
  darkblue: [0,0,139],
  darkcyan: [0,139,139],
  darkgoldenrod:  [184,134,11],
  darkgray: [169,169,169],
  darkgreen:  [0,100,0],
  darkgrey: [169,169,169],
  darkkhaki:  [189,183,107],
  darkmagenta:  [139,0,139],
  darkolivegreen: [85,107,47],
  darkorange: [255,140,0],
  darkorchid: [153,50,204],
  darkred:  [139,0,0],
  darksalmon: [233,150,122],
  darkseagreen: [143,188,143],
  darkslateblue:  [72,61,139],
  darkslategray:  [47,79,79],
  darkslategrey:  [47,79,79],
  darkturquoise:  [0,206,209],
  darkviolet: [148,0,211],
  deeppink: [255,20,147],
  deepskyblue:  [0,191,255],
  dimgray:  [105,105,105],
  dimgrey:  [105,105,105],
  dodgerblue: [30,144,255],
  firebrick:  [178,34,34],
  floralwhite:  [255,250,240],
  forestgreen:  [34,139,34],
  fuchsia:  [255,0,255],
  gainsboro:  [220,220,220],
  ghostwhite: [248,248,255],
  gold: [255,215,0],
  goldenrod:  [218,165,32],
  gray: [128,128,128],
  green:  [0,128,0],
  greenyellow:  [173,255,47],
  grey: [128,128,128],
  honeydew: [240,255,240],
  hotpink:  [255,105,180],
  indianred:  [205,92,92],
  indigo: [75,0,130],
  ivory:  [255,255,240],
  khaki:  [240,230,140],
  lavender: [230,230,250],
  lavenderblush:  [255,240,245],
  lawngreen:  [124,252,0],
  lemonchiffon: [255,250,205],
  lightblue:  [173,216,230],
  lightcoral: [240,128,128],
  lightcyan:  [224,255,255],
  lightgoldenrodyellow: [250,250,210],
  lightgray:  [211,211,211],
  lightgreen: [144,238,144],
  lightgrey:  [211,211,211],
  lightpink:  [255,182,193],
  lightsalmon:  [255,160,122],
  lightseagreen:  [32,178,170],
  lightskyblue: [135,206,250],
  lightslategray: [119,136,153],
  lightslategrey: [119,136,153],
  lightsteelblue: [176,196,222],
  lightyellow:  [255,255,224],
  lime: [0,255,0],
  limegreen:  [50,205,50],
  linen:  [250,240,230],
  magenta:  [255,0,255],
  maroon: [128,0,0],
  mediumaquamarine: [102,205,170],
  mediumblue: [0,0,205],
  mediumorchid: [186,85,211],
  mediumpurple: [147,112,219],
  mediumseagreen: [60,179,113],
  mediumslateblue:  [123,104,238],
  mediumspringgreen:  [0,250,154],
  mediumturquoise:  [72,209,204],
  mediumvioletred:  [199,21,133],
  midnightblue: [25,25,112],
  mintcream:  [245,255,250],
  mistyrose:  [255,228,225],
  moccasin: [255,228,181],
  navajowhite:  [255,222,173],
  navy: [0,0,128],
  oldlace:  [253,245,230],
  olive:  [128,128,0],
  olivedrab:  [107,142,35],
  orange: [255,165,0],
  orangered:  [255,69,0],
  orchid: [218,112,214],
  palegoldenrod:  [238,232,170],
  palegreen:  [152,251,152],
  paleturquoise:  [175,238,238],
  palevioletred:  [219,112,147],
  papayawhip: [255,239,213],
  peachpuff:  [255,218,185],
  peru: [205,133,63],
  pink: [255,192,203],
  plum: [221,160,221],
  powderblue: [176,224,230],
  purple: [128,0,128],
  rebeccapurple: [102, 51, 153],
  red:  [255,0,0],
  rosybrown:  [188,143,143],
  royalblue:  [65,105,225],
  saddlebrown:  [139,69,19],
  salmon: [250,128,114],
  sandybrown: [244,164,96],
  seagreen: [46,139,87],
  seashell: [255,245,238],
  sienna: [160,82,45],
  silver: [192,192,192],
  skyblue:  [135,206,235],
  slateblue:  [106,90,205],
  slategray:  [112,128,144],
  slategrey:  [112,128,144],
  snow: [255,250,250],
  springgreen:  [0,255,127],
  steelblue:  [70,130,180],
  tan:  [210,180,140],
  teal: [0,128,128],
  thistle:  [216,191,216],
  tomato: [255,99,71],
  turquoise:  [64,224,208],
  violet: [238,130,238],
  wheat:  [245,222,179],
  white:  [255,255,255],
  whitesmoke: [245,245,245],
  yellow: [255,255,0],
  yellowgreen:  [154,205,50]
};

var reverseKeywords = {};
for (var key in cssKeywords) {
  reverseKeywords[JSON.stringify(cssKeywords[key])] = key;
}

},{}],3:[function(require,module,exports){
var conversions = require("./conversions");

var convert = function() {
   return new Converter();
}

for (var func in conversions) {
  // export Raw versions
  convert[func + "Raw"] =  (function(func) {
    // accept array or plain args
    return function(arg) {
      if (typeof arg == "number")
        arg = Array.prototype.slice.call(arguments);
      return conversions[func](arg);
    }
  })(func);

  var pair = /(\w+)2(\w+)/.exec(func),
      from = pair[1],
      to = pair[2];

  // export rgb2hsl and ["rgb"]["hsl"]
  convert[from] = convert[from] || {};

  convert[from][to] = convert[func] = (function(func) { 
    return function(arg) {
      if (typeof arg == "number")
        arg = Array.prototype.slice.call(arguments);
      
      var val = conversions[func](arg);
      if (typeof val == "string" || val === undefined)
        return val; // keyword

      for (var i = 0; i < val.length; i++)
        val[i] = Math.round(val[i]);
      return val;
    }
  })(func);
}


/* Converter does lazy conversion and caching */
var Converter = function() {
   this.convs = {};
};

/* Either get the values for a space or
  set the values for a space, depending on args */
Converter.prototype.routeSpace = function(space, args) {
   var values = args[0];
   if (values === undefined) {
      // color.rgb()
      return this.getValues(space);
   }
   // color.rgb(10, 10, 10)
   if (typeof values == "number") {
      values = Array.prototype.slice.call(args);        
   }

   return this.setValues(space, values);
};
  
/* Set the values for a space, invalidating cache */
Converter.prototype.setValues = function(space, values) {
   this.space = space;
   this.convs = {};
   this.convs[space] = values;
   return this;
};

/* Get the values for a space. If there's already
  a conversion for the space, fetch it, otherwise
  compute it */
Converter.prototype.getValues = function(space) {
   var vals = this.convs[space];
   if (!vals) {
      var fspace = this.space,
          from = this.convs[fspace];
      vals = convert[fspace][space](from);

      this.convs[space] = vals;
   }
  return vals;
};

["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function(space) {
   Converter.prototype[space] = function(vals) {
      return this.routeSpace(space, arguments);
   }
});

module.exports = convert;
},{"./conversions":2}],4:[function(require,module,exports){
/* MIT license */
var colorNames = require('color-name');

module.exports = {
   getRgba: getRgba,
   getHsla: getHsla,
   getRgb: getRgb,
   getHsl: getHsl,
   getHwb: getHwb,
   getAlpha: getAlpha,

   hexString: hexString,
   rgbString: rgbString,
   rgbaString: rgbaString,
   percentString: percentString,
   percentaString: percentaString,
   hslString: hslString,
   hslaString: hslaString,
   hwbString: hwbString,
   keyword: keyword
}

function getRgba(string) {
   if (!string) {
      return;
   }
   var abbr =  /^#([a-fA-F0-9]{3})$/,
       hex =  /^#([a-fA-F0-9]{6})$/,
       rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
       per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
       keyword = /(\w+)/;

   var rgb = [0, 0, 0],
       a = 1,
       match = string.match(abbr);
   if (match) {
      match = match[1];
      for (var i = 0; i < rgb.length; i++) {
         rgb[i] = parseInt(match[i] + match[i], 16);
      }
   }
   else if (match = string.match(hex)) {
      match = match[1];
      for (var i = 0; i < rgb.length; i++) {
         rgb[i] = parseInt(match.slice(i * 2, i * 2 + 2), 16);
      }
   }
   else if (match = string.match(rgba)) {
      for (var i = 0; i < rgb.length; i++) {
         rgb[i] = parseInt(match[i + 1]);
      }
      a = parseFloat(match[4]);
   }
   else if (match = string.match(per)) {
      for (var i = 0; i < rgb.length; i++) {
         rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
      }
      a = parseFloat(match[4]);
   }
   else if (match = string.match(keyword)) {
      if (match[1] == "transparent") {
         return [0, 0, 0, 0];
      }
      rgb = colorNames[match[1]];
      if (!rgb) {
         return;
      }
   }

   for (var i = 0; i < rgb.length; i++) {
      rgb[i] = scale(rgb[i], 0, 255);
   }
   if (!a && a != 0) {
      a = 1;
   }
   else {
      a = scale(a, 0, 1);
   }
   rgb[3] = a;
   return rgb;
}

function getHsla(string) {
   if (!string) {
      return;
   }
   var hsl = /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
   var match = string.match(hsl);
   if (match) {
      var alpha = parseFloat(match[4]);
      var h = scale(parseInt(match[1]), 0, 360),
          s = scale(parseFloat(match[2]), 0, 100),
          l = scale(parseFloat(match[3]), 0, 100),
          a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
      return [h, s, l, a];
   }
}

function getHwb(string) {
   if (!string) {
      return;
   }
   var hwb = /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
   var match = string.match(hwb);
   if (match) {
    var alpha = parseFloat(match[4]);
      var h = scale(parseInt(match[1]), 0, 360),
          w = scale(parseFloat(match[2]), 0, 100),
          b = scale(parseFloat(match[3]), 0, 100),
          a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
      return [h, w, b, a];
   }
}

function getRgb(string) {
   var rgba = getRgba(string);
   return rgba && rgba.slice(0, 3);
}

function getHsl(string) {
  var hsla = getHsla(string);
  return hsla && hsla.slice(0, 3);
}

function getAlpha(string) {
   var vals = getRgba(string);
   if (vals) {
      return vals[3];
   }
   else if (vals = getHsla(string)) {
      return vals[3];
   }
   else if (vals = getHwb(string)) {
      return vals[3];
   }
}

// generators
function hexString(rgb) {
   return "#" + hexDouble(rgb[0]) + hexDouble(rgb[1])
              + hexDouble(rgb[2]);
}

function rgbString(rgba, alpha) {
   if (alpha < 1 || (rgba[3] && rgba[3] < 1)) {
      return rgbaString(rgba, alpha);
   }
   return "rgb(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ")";
}

function rgbaString(rgba, alpha) {
   if (alpha === undefined) {
      alpha = (rgba[3] !== undefined ? rgba[3] : 1);
   }
   return "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2]
           + ", " + alpha + ")";
}

function percentString(rgba, alpha) {
   if (alpha < 1 || (rgba[3] && rgba[3] < 1)) {
      return percentaString(rgba, alpha);
   }
   var r = Math.round(rgba[0]/255 * 100),
       g = Math.round(rgba[1]/255 * 100),
       b = Math.round(rgba[2]/255 * 100);

   return "rgb(" + r + "%, " + g + "%, " + b + "%)";
}

function percentaString(rgba, alpha) {
   var r = Math.round(rgba[0]/255 * 100),
       g = Math.round(rgba[1]/255 * 100),
       b = Math.round(rgba[2]/255 * 100);
   return "rgba(" + r + "%, " + g + "%, " + b + "%, " + (alpha || rgba[3] || 1) + ")";
}

function hslString(hsla, alpha) {
   if (alpha < 1 || (hsla[3] && hsla[3] < 1)) {
      return hslaString(hsla, alpha);
   }
   return "hsl(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%)";
}

function hslaString(hsla, alpha) {
   if (alpha === undefined) {
      alpha = (hsla[3] !== undefined ? hsla[3] : 1);
   }
   return "hsla(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%, "
           + alpha + ")";
}

// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
// (hwb have alpha optional & 1 is default value)
function hwbString(hwb, alpha) {
   if (alpha === undefined) {
      alpha = (hwb[3] !== undefined ? hwb[3] : 1);
   }
   return "hwb(" + hwb[0] + ", " + hwb[1] + "%, " + hwb[2] + "%"
           + (alpha !== undefined && alpha !== 1 ? ", " + alpha : "") + ")";
}

function keyword(rgb) {
  return reverseNames[rgb.slice(0, 3)];
}

// helpers
function scale(num, min, max) {
   return Math.min(Math.max(min, num), max);
}

function hexDouble(num) {
  var str = num.toString(16).toUpperCase();
  return (str.length < 2) ? "0" + str : str;
}


//create a list of reverse color names
var reverseNames = {};
for (var name in colorNames) {
   reverseNames[colorNames[name]] = name;
}

},{"color-name":6}],5:[function(require,module,exports){
/* MIT license */

var convert = require("color-convert"),
  string = require("color-string");

var Color = function(obj) {
  if (obj instanceof Color) return obj;
  if (!(this instanceof Color)) return new Color(obj);

  this.values = {
    rgb: [0, 0, 0],
    hsl: [0, 0, 0],
    hsv: [0, 0, 0],
    hwb: [0, 0, 0],
    cmyk: [0, 0, 0, 0],
    alpha: 1
  }

  // parse Color() argument
  if (typeof obj == "string") {
    var vals = string.getRgba(obj);
    if (vals) {
      this.setValues("rgb", vals);
    } else if (vals = string.getHsla(obj)) {
      this.setValues("hsl", vals);
    } else if (vals = string.getHwb(obj)) {
      this.setValues("hwb", vals);
    } else {
      throw new Error("Unable to parse color from string \"" + obj + "\"");
    }
  } else if (typeof obj == "object") {
    var vals = obj;
    if (vals["r"] !== undefined || vals["red"] !== undefined) {
      this.setValues("rgb", vals)
    } else if (vals["l"] !== undefined || vals["lightness"] !== undefined) {
      this.setValues("hsl", vals)
    } else if (vals["v"] !== undefined || vals["value"] !== undefined) {
      this.setValues("hsv", vals)
    } else if (vals["w"] !== undefined || vals["whiteness"] !== undefined) {
      this.setValues("hwb", vals)
    } else if (vals["c"] !== undefined || vals["cyan"] !== undefined) {
      this.setValues("cmyk", vals)
    } else {
      throw new Error("Unable to parse color from object " + JSON.stringify(obj));
    }
  }
}

Color.prototype = {
  rgb: function(vals) {
    return this.setSpace("rgb", arguments);
  },
  hsl: function(vals) {
    return this.setSpace("hsl", arguments);
  },
  hsv: function(vals) {
    return this.setSpace("hsv", arguments);
  },
  hwb: function(vals) {
    return this.setSpace("hwb", arguments);
  },
  cmyk: function(vals) {
    return this.setSpace("cmyk", arguments);
  },

  rgbArray: function() {
    return this.values.rgb;
  },
  hslArray: function() {
    return this.values.hsl;
  },
  hsvArray: function() {
    return this.values.hsv;
  },
  hwbArray: function() {
    if (this.values.alpha !== 1) {
      return this.values.hwb.concat([this.values.alpha])
    }
    return this.values.hwb;
  },
  cmykArray: function() {
    return this.values.cmyk;
  },
  rgbaArray: function() {
    var rgb = this.values.rgb;
    return rgb.concat([this.values.alpha]);
  },
  hslaArray: function() {
    var hsl = this.values.hsl;
    return hsl.concat([this.values.alpha]);
  },
  alpha: function(val) {
    if (val === undefined) {
      return this.values.alpha;
    }
    this.setValues("alpha", val);
    return this;
  },

  red: function(val) {
    return this.setChannel("rgb", 0, val);
  },
  green: function(val) {
    return this.setChannel("rgb", 1, val);
  },
  blue: function(val) {
    return this.setChannel("rgb", 2, val);
  },
  hue: function(val) {
    return this.setChannel("hsl", 0, val);
  },
  saturation: function(val) {
    return this.setChannel("hsl", 1, val);
  },
  lightness: function(val) {
    return this.setChannel("hsl", 2, val);
  },
  saturationv: function(val) {
    return this.setChannel("hsv", 1, val);
  },
  whiteness: function(val) {
    return this.setChannel("hwb", 1, val);
  },
  blackness: function(val) {
    return this.setChannel("hwb", 2, val);
  },
  value: function(val) {
    return this.setChannel("hsv", 2, val);
  },
  cyan: function(val) {
    return this.setChannel("cmyk", 0, val);
  },
  magenta: function(val) {
    return this.setChannel("cmyk", 1, val);
  },
  yellow: function(val) {
    return this.setChannel("cmyk", 2, val);
  },
  black: function(val) {
    return this.setChannel("cmyk", 3, val);
  },

  hexString: function() {
    return string.hexString(this.values.rgb);
  },
  rgbString: function() {
    return string.rgbString(this.values.rgb, this.values.alpha);
  },
  rgbaString: function() {
    return string.rgbaString(this.values.rgb, this.values.alpha);
  },
  percentString: function() {
    return string.percentString(this.values.rgb, this.values.alpha);
  },
  hslString: function() {
    return string.hslString(this.values.hsl, this.values.alpha);
  },
  hslaString: function() {
    return string.hslaString(this.values.hsl, this.values.alpha);
  },
  hwbString: function() {
    return string.hwbString(this.values.hwb, this.values.alpha);
  },
  keyword: function() {
    return string.keyword(this.values.rgb, this.values.alpha);
  },

  rgbNumber: function() {
    return (this.values.rgb[0] << 16) | (this.values.rgb[1] << 8) | this.values.rgb[2];
  },

  luminosity: function() {
    // http://www.w3.org/TR/WCAG20/#relativeluminancedef
    var rgb = this.values.rgb;
    var lum = [];
    for (var i = 0; i < rgb.length; i++) {
      var chan = rgb[i] / 255;
      lum[i] = (chan <= 0.03928) ? chan / 12.92 : Math.pow(((chan + 0.055) / 1.055), 2.4)
    }
    return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
  },

  contrast: function(color2) {
    // http://www.w3.org/TR/WCAG20/#contrast-ratiodef
    var lum1 = this.luminosity();
    var lum2 = color2.luminosity();
    if (lum1 > lum2) {
      return (lum1 + 0.05) / (lum2 + 0.05)
    };
    return (lum2 + 0.05) / (lum1 + 0.05);
  },

  level: function(color2) {
    var contrastRatio = this.contrast(color2);
    return (contrastRatio >= 7.1) ? 'AAA' : (contrastRatio >= 4.5) ? 'AA' : '';
  },

  dark: function() {
    // YIQ equation from http://24ways.org/2010/calculating-color-contrast
    var rgb = this.values.rgb,
      yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
    return yiq < 128;
  },

  light: function() {
    return !this.dark();
  },

  negate: function() {
    var rgb = []
    for (var i = 0; i < 3; i++) {
      rgb[i] = 255 - this.values.rgb[i];
    }
    this.setValues("rgb", rgb);
    return this;
  },

  lighten: function(ratio) {
    this.values.hsl[2] += this.values.hsl[2] * ratio;
    this.setValues("hsl", this.values.hsl);
    return this;
  },

  darken: function(ratio) {
    this.values.hsl[2] -= this.values.hsl[2] * ratio;
    this.setValues("hsl", this.values.hsl);
    return this;
  },

  saturate: function(ratio) {
    this.values.hsl[1] += this.values.hsl[1] * ratio;
    this.setValues("hsl", this.values.hsl);
    return this;
  },

  desaturate: function(ratio) {
    this.values.hsl[1] -= this.values.hsl[1] * ratio;
    this.setValues("hsl", this.values.hsl);
    return this;
  },

  whiten: function(ratio) {
    this.values.hwb[1] += this.values.hwb[1] * ratio;
    this.setValues("hwb", this.values.hwb);
    return this;
  },

  blacken: function(ratio) {
    this.values.hwb[2] += this.values.hwb[2] * ratio;
    this.setValues("hwb", this.values.hwb);
    return this;
  },

  greyscale: function() {
    var rgb = this.values.rgb;
    // http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
    var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
    this.setValues("rgb", [val, val, val]);
    return this;
  },

  clearer: function(ratio) {
    this.setValues("alpha", this.values.alpha - (this.values.alpha * ratio));
    return this;
  },

  opaquer: function(ratio) {
    this.setValues("alpha", this.values.alpha + (this.values.alpha * ratio));
    return this;
  },

  rotate: function(degrees) {
    var hue = this.values.hsl[0];
    hue = (hue + degrees) % 360;
    hue = hue < 0 ? 360 + hue : hue;
    this.values.hsl[0] = hue;
    this.setValues("hsl", this.values.hsl);
    return this;
  },

  mix: function(color2, weight) {
    weight = 1 - (weight == null ? 0.5 : weight);

    // algorithm from Sass's mix(). Ratio of first color in mix is
    // determined by the alphas of both colors and the weight
    var t1 = weight * 2 - 1,
      d = this.alpha() - color2.alpha();

    var weight1 = (((t1 * d == -1) ? t1 : (t1 + d) / (1 + t1 * d)) + 1) / 2;
    var weight2 = 1 - weight1;

    var rgb = this.rgbArray();
    var rgb2 = color2.rgbArray();

    for (var i = 0; i < rgb.length; i++) {
      rgb[i] = rgb[i] * weight1 + rgb2[i] * weight2;
    }
    this.setValues("rgb", rgb);

    var alpha = this.alpha() * weight + color2.alpha() * (1 - weight);
    this.setValues("alpha", alpha);

    return this;
  },

  toJSON: function() {
    return this.rgb();
  },

  clone: function() {
    return new Color(this.rgb());
  }
}


Color.prototype.getValues = function(space) {
  var vals = {};
  for (var i = 0; i < space.length; i++) {
    vals[space.charAt(i)] = this.values[space][i];
  }
  if (this.values.alpha != 1) {
    vals["a"] = this.values.alpha;
  }
  // {r: 255, g: 255, b: 255, a: 0.4}
  return vals;
}

Color.prototype.setValues = function(space, vals) {
  var spaces = {
    "rgb": ["red", "green", "blue"],
    "hsl": ["hue", "saturation", "lightness"],
    "hsv": ["hue", "saturation", "value"],
    "hwb": ["hue", "whiteness", "blackness"],
    "cmyk": ["cyan", "magenta", "yellow", "black"]
  };

  var maxes = {
    "rgb": [255, 255, 255],
    "hsl": [360, 100, 100],
    "hsv": [360, 100, 100],
    "hwb": [360, 100, 100],
    "cmyk": [100, 100, 100, 100]
  };

  var alpha = 1;
  if (space == "alpha") {
    alpha = vals;
  } else if (vals.length) {
    // [10, 10, 10]
    this.values[space] = vals.slice(0, space.length);
    alpha = vals[space.length];
  } else if (vals[space.charAt(0)] !== undefined) {
    // {r: 10, g: 10, b: 10}
    for (var i = 0; i < space.length; i++) {
      this.values[space][i] = vals[space.charAt(i)];
    }
    alpha = vals.a;
  } else if (vals[spaces[space][0]] !== undefined) {
    // {red: 10, green: 10, blue: 10}
    var chans = spaces[space];
    for (var i = 0; i < space.length; i++) {
      this.values[space][i] = vals[chans[i]];
    }
    alpha = vals.alpha;
  }
  this.values.alpha = Math.max(0, Math.min(1, (alpha !== undefined ? alpha : this.values.alpha)));
  if (space == "alpha") {
    return;
  }

  // cap values of the space prior converting all values
  for (var i = 0; i < space.length; i++) {
    var capped = Math.max(0, Math.min(maxes[space][i], this.values[space][i]));
    this.values[space][i] = Math.round(capped);
  }

  // convert to all the other color spaces
  for (var sname in spaces) {
    if (sname != space) {
      this.values[sname] = convert[space][sname](this.values[space])
    }

    // cap values
    for (var i = 0; i < sname.length; i++) {
      var capped = Math.max(0, Math.min(maxes[sname][i], this.values[sname][i]));
      this.values[sname][i] = Math.round(capped);
    }
  }
  return true;
}

Color.prototype.setSpace = function(space, args) {
  var vals = args[0];
  if (vals === undefined) {
    // color.rgb()
    return this.getValues(space);
  }
  // color.rgb(10, 10, 10)
  if (typeof vals == "number") {
    vals = Array.prototype.slice.call(args);
  }
  this.setValues(space, vals);
  return this;
}

Color.prototype.setChannel = function(space, index, val) {
  if (val === undefined) {
    // color.red()
    return this.values[space][index];
  }
  // color.red(100)
  this.values[space][index] = val;
  this.setValues(space, this.values[space]);
  return this;
}

window.Color = module.exports = Color

},{"color-convert":3,"color-string":4}],6:[function(require,module,exports){
module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};
},{}],7:[function(require,module,exports){
/*!
 * Chart.js
 * http://chartjs.org/
 * Version: 2.0.0
 *
 * Copyright 2015 Nick Downie
 * Released under the MIT license
 * https://github.com/nnnick/Chart.js/blob/master/LICENSE.md
 */


var Chart = require('./core/core.js')();

require('./core/core.helpers')(Chart);
require('./core/core.element')(Chart);
require('./core/core.animation')(Chart);
require('./core/core.controller')(Chart);
require('./core/core.datasetController')(Chart);
require('./core/core.layoutService')(Chart);
require('./core/core.legend')(Chart);
require('./core/core.scale')(Chart);
require('./core/core.scaleService')(Chart);
require('./core/core.title')(Chart);
require('./core/core.tooltip')(Chart);

require('./controllers/controller.bar')(Chart);
require('./controllers/controller.bubble')(Chart);
require('./controllers/controller.doughnut')(Chart);
require('./controllers/controller.line')(Chart);
require('./controllers/controller.polarArea')(Chart);
require('./controllers/controller.radar')(Chart);

require('./scales/scale.category')(Chart);
require('./scales/scale.linear')(Chart);
require('./scales/scale.logarithmic')(Chart);
require('./scales/scale.radialLinear')(Chart);
require('./scales/scale.time')(Chart);

require('./elements/element.arc')(Chart);
require('./elements/element.line')(Chart);
require('./elements/element.point')(Chart);
require('./elements/element.rectangle')(Chart);

require('./charts/Chart.Bar')(Chart);
require('./charts/Chart.Bubble')(Chart);
require('./charts/Chart.Doughnut')(Chart);
require('./charts/Chart.Line')(Chart);
require('./charts/Chart.PolarArea')(Chart);
require('./charts/Chart.Radar')(Chart);
require('./charts/Chart.Scatter')(Chart);

window.Chart = module.exports = Chart;

},{"./charts/Chart.Bar":8,"./charts/Chart.Bubble":9,"./charts/Chart.Doughnut":10,"./charts/Chart.Line":11,"./charts/Chart.PolarArea":12,"./charts/Chart.Radar":13,"./charts/Chart.Scatter":14,"./controllers/controller.bar":15,"./controllers/controller.bubble":16,"./controllers/controller.doughnut":17,"./controllers/controller.line":18,"./controllers/controller.polarArea":19,"./controllers/controller.radar":20,"./core/core.animation":21,"./core/core.controller":22,"./core/core.datasetController":23,"./core/core.element":24,"./core/core.helpers":25,"./core/core.js":26,"./core/core.layoutService":27,"./core/core.legend":28,"./core/core.scale":29,"./core/core.scaleService":30,"./core/core.title":31,"./core/core.tooltip":32,"./elements/element.arc":33,"./elements/element.line":34,"./elements/element.point":35,"./elements/element.rectangle":36,"./scales/scale.category":37,"./scales/scale.linear":38,"./scales/scale.logarithmic":39,"./scales/scale.radialLinear":40,"./scales/scale.time":41}],8:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	Chart.Bar = function(context, config) {
		config.type = 'bar';

		return new Chart(context, config);
	};

};
},{}],9:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	Chart.Bubble = function(context, config) {
		config.type = 'bubble';
		return new Chart(context, config);
	};

};
},{}],10:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	Chart.Doughnut = function(context, config) {
		config.type = 'doughnut';

		return new Chart(context, config);
	};

};
},{}],11:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	Chart.Line = function(context, config) {
		config.type = 'line';

		return new Chart(context, config);
	};

};
},{}],12:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	Chart.PolarArea = function(context, config) {
		config.type = 'polarArea';

		return new Chart(context, config);
	};

};
},{}],13:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	var defaultConfig = {
		aspectRatio: 1
	};

	Chart.Radar = function(context, config) {
		config.options = helpers.configMerge(defaultConfig, config.options);
		config.type = 'radar';

		return new Chart(context, config);
	};

};

},{}],14:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var defaultConfig = {
		hover: {
			mode: 'single'
		},

		scales: {
			xAxes: [{
				type: "linear", // scatter should not use a category axis
				position: "bottom",
				id: "x-axis-1" // need an ID so datasets can reference the scale
			}],
			yAxes: [{
				type: "linear",
				position: "left",
				id: "y-axis-1"
			}]
		},

		tooltips: {
			callbacks: {
				title: function(tooltipItems, data) {
					// Title doesn't make sense for scatter since we format the data as a point
					return '';
				},
				label: function(tooltipItem, data) {
					return '(' + tooltipItem.xLabel + ', ' + tooltipItem.yLabel + ')';
				}
			}
		}
	};

	// Register the default config for this type
	Chart.defaults.scatter = defaultConfig;

	// Scatter charts use line controllers
	Chart.controllers.scatter = Chart.controllers.line;

	Chart.Scatter = function(context, config) {
		config.type = 'scatter';
		return new Chart(context, config);
	};

};
},{}],15:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	Chart.defaults.bar = {
		hover: {
			mode: "label"
		},

		scales: {
			xAxes: [{
				type: "category",

				// Specific to Bar Controller
				categoryPercentage: 0.8,
				barPercentage: 0.9,

				// grid line settings
				gridLines: {
					offsetGridLines: true
				}
			}],
			yAxes: [{
				type: "linear"
			}]
		}
	};

	Chart.controllers.bar = Chart.DatasetController.extend({
		initialize: function(chart, datasetIndex) {
			Chart.DatasetController.prototype.initialize.call(this, chart, datasetIndex);

			// Use this to indicate that this is a bar dataset.
			this.getDataset().bar = true;
		},
		// Get the number of datasets that display bars. We use this to correctly calculate the bar width
		getBarCount: function getBarCount() {
			var barCount = 0;
			helpers.each(this.chart.data.datasets, function(dataset) {
				if (helpers.isDatasetVisible(dataset) && dataset.bar) {
					++barCount;
				}
			});
			return barCount;
		},

		addElements: function() {
			this.getDataset().metaData = this.getDataset().metaData || [];
			helpers.each(this.getDataset().data, function(value, index) {
				this.getDataset().metaData[index] = this.getDataset().metaData[index] || new Chart.elements.Rectangle({
					_chart: this.chart.chart,
					_datasetIndex: this.index,
					_index: index
				});
			}, this);
		},
		addElementAndReset: function(index) {
			this.getDataset().metaData = this.getDataset().metaData || [];
			var rectangle = new Chart.elements.Rectangle({
				_chart: this.chart.chart,
				_datasetIndex: this.index,
				_index: index
			});

			var numBars = this.getBarCount();

			this.updateElement(rectangle, index, true, numBars);
			this.getDataset().metaData.splice(index, 0, rectangle);
		},

		update: function update(reset) {
			var numBars = this.getBarCount();

			helpers.each(this.getDataset().metaData, function(rectangle, index) {
				this.updateElement(rectangle, index, reset, numBars);
			}, this);
		},

		updateElement: function updateElement(rectangle, index, reset, numBars) {

			var xScale = this.getScaleForId(this.getDataset().xAxisID);
			var yScale = this.getScaleForId(this.getDataset().yAxisID);

			var yScalePoint;

			if (yScale.min < 0 && yScale.max < 0) {
				// all less than 0. use the top
				yScalePoint = yScale.getPixelForValue(yScale.max);
			} else if (yScale.min > 0 && yScale.max > 0) {
				yScalePoint = yScale.getPixelForValue(yScale.min);
			} else {
				yScalePoint = yScale.getPixelForValue(0);
			}

			helpers.extend(rectangle, {
				// Utility
				_chart: this.chart.chart,
				_xScale: xScale,
				_yScale: yScale,
				_datasetIndex: this.index,
				_index: index,


				// Desired view properties
				_model: {
					x: this.calculateBarX(index, this.index),
					y: reset ? yScalePoint : this.calculateBarY(index, this.index),

					// Tooltip
					label: this.chart.data.labels[index],
					datasetLabel: this.getDataset().label,

					// Appearance
					base: reset ? yScalePoint : this.calculateBarBase(this.index, index),
					width: this.calculateBarWidth(numBars),
					backgroundColor: rectangle.custom && rectangle.custom.backgroundColor ? rectangle.custom.backgroundColor : helpers.getValueAtIndexOrDefault(this.getDataset().backgroundColor, index, this.chart.options.elements.rectangle.backgroundColor),
					borderSkipped: rectangle.custom && rectangle.custom.borderSkipped ? rectangle.custom.borderSkipped : this.chart.options.elements.rectangle.borderSkipped,
					borderColor: rectangle.custom && rectangle.custom.borderColor ? rectangle.custom.borderColor : helpers.getValueAtIndexOrDefault(this.getDataset().borderColor, index, this.chart.options.elements.rectangle.borderColor),
					borderWidth: rectangle.custom && rectangle.custom.borderWidth ? rectangle.custom.borderWidth : helpers.getValueAtIndexOrDefault(this.getDataset().borderWidth, index, this.chart.options.elements.rectangle.borderWidth)
				}
			});
			rectangle.pivot();
		},

		calculateBarBase: function(datasetIndex, index) {

			var xScale = this.getScaleForId(this.getDataset().xAxisID);
			var yScale = this.getScaleForId(this.getDataset().yAxisID);

			var base = 0;

			if (yScale.options.stacked) {

				var value = this.chart.data.datasets[datasetIndex].data[index];

				if (value < 0) {
					for (var i = 0; i < datasetIndex; i++) {
						var negDS = this.chart.data.datasets[i];
						if (helpers.isDatasetVisible(negDS) && negDS.yAxisID === yScale.id && negDS.bar) {
							base += negDS.data[index] < 0 ? negDS.data[index] : 0;
						}
					}
				} else {
					for (var j = 0; j < datasetIndex; j++) {
						var posDS = this.chart.data.datasets[j];
						if (helpers.isDatasetVisible(posDS) && posDS.yAxisID === yScale.id && posDS.bar) {
							base += posDS.data[index] > 0 ? posDS.data[index] : 0;
						}
					}
				}

				return yScale.getPixelForValue(base);
			}

			base = yScale.getPixelForValue(yScale.min);

			if (yScale.beginAtZero || ((yScale.min <= 0 && yScale.max >= 0) || (yScale.min >= 0 && yScale.max <= 0))) {
				base = yScale.getPixelForValue(0, 0);
				//base += yScale.options.gridLines.lineWidth;
			} else if (yScale.min < 0 && yScale.max < 0) {
				// All values are negative. Use the top as the base
				base = yScale.getPixelForValue(yScale.max);
			}

			return base;

		},

		getRuler: function() {

			var xScale = this.getScaleForId(this.getDataset().xAxisID);
			var yScale = this.getScaleForId(this.getDataset().yAxisID);
			var datasetCount = this.getBarCount();

			var tickWidth = (function() {
				var min = xScale.getPixelForTick(1) - xScale.getPixelForTick(0);
				for (var i = 2; i < this.getDataset().data.length; i++) {
					min = Math.min(xScale.getPixelForTick(i) - xScale.getPixelForTick(i - 1), min);
				}
				return min;
			}).call(this);
			var categoryWidth = tickWidth * xScale.options.categoryPercentage;
			var categorySpacing = (tickWidth - (tickWidth * xScale.options.categoryPercentage)) / 2;
			var fullBarWidth = categoryWidth / datasetCount;
			var barWidth = fullBarWidth * xScale.options.barPercentage;
			var barSpacing = fullBarWidth - (fullBarWidth * xScale.options.barPercentage);

			return {
				datasetCount: datasetCount,
				tickWidth: tickWidth,
				categoryWidth: categoryWidth,
				categorySpacing: categorySpacing,
				fullBarWidth: fullBarWidth,
				barWidth: barWidth,
				barSpacing: barSpacing
			};
		},

		calculateBarWidth: function() {
			var xScale = this.getScaleForId(this.getDataset().xAxisID);
			var ruler = this.getRuler();
			return xScale.options.stacked ? ruler.categoryWidth : ruler.barWidth;
		},

		// Get bar index from the given dataset index accounting for the fact that not all bars are visible
		getBarIndex: function(datasetIndex) {
			var barIndex = 0;

			for (var j = 0; j < datasetIndex; ++j) {
				if (helpers.isDatasetVisible(this.chart.data.datasets[j]) && this.chart.data.datasets[j].bar) {
					++barIndex;
				}
			}

			return barIndex;
		},

		calculateBarX: function(index, datasetIndex) {

			var yScale = this.getScaleForId(this.getDataset().yAxisID);
			var xScale = this.getScaleForId(this.getDataset().xAxisID);
			var barIndex = this.getBarIndex(datasetIndex);

			var ruler = this.getRuler();
			var leftTick = xScale.getPixelForValue(null, index, datasetIndex, this.chart.isCombo);
			leftTick -= this.chart.isCombo ? (ruler.tickWidth / 2) : 0;

			if (xScale.options.stacked) {
				return leftTick + (ruler.categoryWidth / 2) + ruler.categorySpacing;
			}

			return leftTick +
				(ruler.barWidth / 2) +
				ruler.categorySpacing +
				(ruler.barWidth * barIndex) +
				(ruler.barSpacing / 2) +
				(ruler.barSpacing * barIndex);
		},

		calculateBarY: function(index, datasetIndex) {

			var xScale = this.getScaleForId(this.getDataset().xAxisID);
			var yScale = this.getScaleForId(this.getDataset().yAxisID);

			var value = this.getDataset().data[index];

			if (yScale.options.stacked) {

				var sumPos = 0,
					sumNeg = 0;

				for (var i = 0; i < datasetIndex; i++) {
					var ds = this.chart.data.datasets[i];
					if (helpers.isDatasetVisible(ds) && ds.bar && ds.yAxisID === yScale.id) {
						if (ds.data[index] < 0) {
							sumNeg += ds.data[index] || 0;
						} else {
							sumPos += ds.data[index] || 0;
						}
					}
				}

				if (value < 0) {
					return yScale.getPixelForValue(sumNeg + value);
				} else {
					return yScale.getPixelForValue(sumPos + value);
				}

				return yScale.getPixelForValue(value);
			}

			return yScale.getPixelForValue(value);
		},

		draw: function(ease) {
			var easingDecimal = ease || 1;
			helpers.each(this.getDataset().metaData, function(rectangle, index) {
				var d = this.getDataset().data[index];
				if (d !== null && d !== undefined && !isNaN(d)) {
					rectangle.transition(easingDecimal).draw();
				}
			}, this);
		},

		setHoverStyle: function(rectangle) {
			var dataset = this.chart.data.datasets[rectangle._datasetIndex];
			var index = rectangle._index;

			rectangle._model.backgroundColor = rectangle.custom && rectangle.custom.hoverBackgroundColor ? rectangle.custom.hoverBackgroundColor : helpers.getValueAtIndexOrDefault(dataset.hoverBackgroundColor, index, helpers.color(rectangle._model.backgroundColor).saturate(0.5).darken(0.1).rgbString());
			rectangle._model.borderColor = rectangle.custom && rectangle.custom.hoverBorderColor ? rectangle.custom.hoverBorderColor : helpers.getValueAtIndexOrDefault(dataset.hoverBorderColor, index, helpers.color(rectangle._model.borderColor).saturate(0.5).darken(0.1).rgbString());
			rectangle._model.borderWidth = rectangle.custom && rectangle.custom.hoverBorderWidth ? rectangle.custom.hoverBorderWidth : helpers.getValueAtIndexOrDefault(dataset.hoverBorderWidth, index, rectangle._model.borderWidth);
		},

		removeHoverStyle: function(rectangle) {
			var dataset = this.chart.data.datasets[rectangle._datasetIndex];
			var index = rectangle._index;

			rectangle._model.backgroundColor = rectangle.custom && rectangle.custom.backgroundColor ? rectangle.custom.backgroundColor : helpers.getValueAtIndexOrDefault(this.getDataset().backgroundColor, index, this.chart.options.elements.rectangle.backgroundColor);
			rectangle._model.borderColor = rectangle.custom && rectangle.custom.borderColor ? rectangle.custom.borderColor : helpers.getValueAtIndexOrDefault(this.getDataset().borderColor, index, this.chart.options.elements.rectangle.borderColor);
			rectangle._model.borderWidth = rectangle.custom && rectangle.custom.borderWidth ? rectangle.custom.borderWidth : helpers.getValueAtIndexOrDefault(this.getDataset().borderWidth, index, this.chart.options.elements.rectangle.borderWidth);
		}

	});
};

},{}],16:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	Chart.defaults.bubble = {
		hover: {
			mode: "single"
		},

		scales: {
			xAxes: [{
				type: "linear", // bubble should probably use a linear scale by default
				position: "bottom",
				id: "x-axis-0" // need an ID so datasets can reference the scale
			}],
			yAxes: [{
				type: "linear",
				position: "left",
				id: "y-axis-0"
			}]
		},

		tooltips: {
			callbacks: {
				title: function(tooltipItems, data) {
					// Title doesn't make sense for scatter since we format the data as a point
					return '';
				},
				label: function(tooltipItem, data) {
					var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
					var dataPoint = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
					return datasetLabel + ': (' + dataPoint.x + ', ' + dataPoint.y + ', ' + dataPoint.r + ')';
				}
			}
		}
	};


	Chart.controllers.bubble = Chart.DatasetController.extend({
		addElements: function() {

			this.getDataset().metaData = this.getDataset().metaData || [];

			helpers.each(this.getDataset().data, function(value, index) {
				this.getDataset().metaData[index] = this.getDataset().metaData[index] || new Chart.elements.Point({
					_chart: this.chart.chart,
					_datasetIndex: this.index,
					_index: index
				});
			}, this);
		},
		addElementAndReset: function(index) {
			this.getDataset().metaData = this.getDataset().metaData || [];
			var point = new Chart.elements.Point({
				_chart: this.chart.chart,
				_datasetIndex: this.index,
				_index: index
			});

			// Reset the point
			this.updateElement(point, index, true);

			// Add to the points array
			this.getDataset().metaData.splice(index, 0, point);
		},

		update: function update(reset) {
			var points = this.getDataset().metaData;

			var yScale = this.getScaleForId(this.getDataset().yAxisID);
			var xScale = this.getScaleForId(this.getDataset().xAxisID);
			var scaleBase;

			if (yScale.min < 0 && yScale.max < 0) {
				scaleBase = yScale.getPixelForValue(yScale.max);
			} else if (yScale.min > 0 && yScale.max > 0) {
				scaleBase = yScale.getPixelForValue(yScale.min);
			} else {
				scaleBase = yScale.getPixelForValue(0);
			}

			// Update Points
			helpers.each(points, function(point, index) {
				this.updateElement(point, index, reset);
			}, this);

		},

		updateElement: function(point, index, reset) {
			var yScale = this.getScaleForId(this.getDataset().yAxisID);
			var xScale = this.getScaleForId(this.getDataset().xAxisID);
			var scaleBase;

			if (yScale.min < 0 && yScale.max < 0) {
				scaleBase = yScale.getPixelForValue(yScale.max);
			} else if (yScale.min > 0 && yScale.max > 0) {
				scaleBase = yScale.getPixelForValue(yScale.min);
			} else {
				scaleBase = yScale.getPixelForValue(0);
			}

			helpers.extend(point, {
				// Utility
				_chart: this.chart.chart,
				_xScale: xScale,
				_yScale: yScale,
				_datasetIndex: this.index,
				_index: index,

				// Desired view properties
				_model: {
					x: reset ? xScale.getPixelForDecimal(0.5) : xScale.getPixelForValue(this.getDataset().data[index], index, this.index, this.chart.isCombo),
					y: reset ? scaleBase : yScale.getPixelForValue(this.getDataset().data[index], index, this.index),
					// Appearance
					radius: reset ? 0 : point.custom && point.custom.radius ? point.custom.radius : this.getRadius(this.getDataset().data[index]),
					backgroundColor: point.custom && point.custom.backgroundColor ? point.custom.backgroundColor : helpers.getValueAtIndexOrDefault(this.getDataset().backgroundColor, index, this.chart.options.elements.point.backgroundColor),
					borderColor: point.custom && point.custom.borderColor ? point.custom.borderColor : helpers.getValueAtIndexOrDefault(this.getDataset().borderColor, index, this.chart.options.elements.point.borderColor),
					borderWidth: point.custom && point.custom.borderWidth ? point.custom.borderWidth : helpers.getValueAtIndexOrDefault(this.getDataset().borderWidth, index, this.chart.options.elements.point.borderWidth),

					// Tooltip
					hitRadius: point.custom && point.custom.hitRadius ? point.custom.hitRadius : helpers.getValueAtIndexOrDefault(this.getDataset().hitRadius, index, this.chart.options.elements.point.hitRadius)
				}
			});

			point._model.skip = point.custom && point.custom.skip ? point.custom.skip : (isNaN(point._model.x) || isNaN(point._model.y));

			point.pivot();
		},

		getRadius: function(value) {
			return value.r || this.chart.options.elements.point.radius;
		},

		draw: function(ease) {
			var easingDecimal = ease || 1;

			// Transition and Draw the Points
			helpers.each(this.getDataset().metaData, function(point, index) {
				point.transition(easingDecimal);
				point.draw();
			});

		},

		setHoverStyle: function(point) {
			// Point
			var dataset = this.chart.data.datasets[point._datasetIndex];
			var index = point._index;

			point._model.radius = point.custom && point.custom.hoverRadius ? point.custom.hoverRadius : (helpers.getValueAtIndexOrDefault(dataset.hoverRadius, index, this.chart.options.elements.point.hoverRadius)) + this.getRadius(this.getDataset().data[point._index]);
			point._model.backgroundColor = point.custom && point.custom.hoverBackgroundColor ? point.custom.hoverBackgroundColor : helpers.getValueAtIndexOrDefault(dataset.hoverBackgroundColor, index, helpers.color(point._model.backgroundColor).saturate(0.5).darken(0.1).rgbString());
			point._model.borderColor = point.custom && point.custom.hoverBorderColor ? point.custom.hoverBorderColor : helpers.getValueAtIndexOrDefault(dataset.hoverBorderColor, index, helpers.color(point._model.borderColor).saturate(0.5).darken(0.1).rgbString());
			point._model.borderWidth = point.custom && point.custom.hoverBorderWidth ? point.custom.hoverBorderWidth : helpers.getValueAtIndexOrDefault(dataset.hoverBorderWidth, index, point._model.borderWidth);
		},

		removeHoverStyle: function(point) {
			var dataset = this.chart.data.datasets[point._datasetIndex];
			var index = point._index;

			point._model.radius = point.custom && point.custom.radius ? point.custom.radius : this.getRadius(this.getDataset().data[point._index]);
			point._model.backgroundColor = point.custom && point.custom.backgroundColor ? point.custom.backgroundColor : helpers.getValueAtIndexOrDefault(this.getDataset().backgroundColor, index, this.chart.options.elements.point.backgroundColor);
			point._model.borderColor = point.custom && point.custom.borderColor ? point.custom.borderColor : helpers.getValueAtIndexOrDefault(this.getDataset().borderColor, index, this.chart.options.elements.point.borderColor);
			point._model.borderWidth = point.custom && point.custom.borderWidth ? point.custom.borderWidth : helpers.getValueAtIndexOrDefault(this.getDataset().borderWidth, index, this.chart.options.elements.point.borderWidth);
		}
	});
};
},{}],17:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	Chart.defaults.doughnut = {
		animation: {
			//Boolean - Whether we animate the rotation of the Doughnut
			animateRotate: true,
			//Boolean - Whether we animate scaling the Doughnut from the centre
			animateScale: false
		},
		aspectRatio: 1,
		hover: {
			mode: 'single'
		},
		legendCallback: function(chart) {
			var text = [];
			text.push('<ul class="' + chart.id + '-legend">');

			if (chart.data.datasets.length) {
				for (var i = 0; i < chart.data.datasets[0].data.length; ++i) {
					text.push('<li><span style="background-color:' + chart.data.datasets[0].backgroundColor[i] + '">');
					if (chart.data.labels[i]) {
						text.push(chart.data.labels[i]);
					}
					text.push('</span></li>');
				}
			}

			text.push('</ul>');
			return text.join("");
		},
		legend: {
			labels: {
				generateLabels: function(data) {
					if (data.labels.length && data.datasets.length) {
						return data.labels.map(function(label, i) {
							return {
								text: label,
								fillStyle: data.datasets[0].backgroundColor[i],
								hidden: isNaN(data.datasets[0].data[i]),

								// Extra data used for toggling the correct item
								index: i
							};
						});
					} else {
						return [];
					}
				}
			},
			onClick: function(e, legendItem) {
				helpers.each(this.chart.data.datasets, function(dataset) {
					dataset.metaHiddenData = dataset.metaHiddenData || [];
					var idx = legendItem.index;

					if (!isNaN(dataset.data[idx])) {
						dataset.metaHiddenData[idx] = dataset.data[idx];
						dataset.data[idx] = NaN;
					} else if (!isNaN(dataset.metaHiddenData[idx])) {
						dataset.data[idx] = dataset.metaHiddenData[idx];
					}
				});

				this.chart.update();
			}
		},

		//The percentage of the chart that we cut out of the middle.
		cutoutPercentage: 50,

		// Need to override these to give a nice default
		tooltips: {
			callbacks: {
				title: function() {
					return '';
				},
				label: function(tooltipItem, data) {
					return data.labels[tooltipItem.index] + ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
				}
			}
		}
	};

	Chart.defaults.pie = helpers.clone(Chart.defaults.doughnut);
	helpers.extend(Chart.defaults.pie, {
		cutoutPercentage: 0
	});


	Chart.controllers.doughnut = Chart.controllers.pie = Chart.DatasetController.extend({
		linkScales: function() {
			// no scales for doughnut
		},

		addElements: function() {
			this.getDataset().metaData = this.getDataset().metaData || [];
			helpers.each(this.getDataset().data, function(value, index) {
				this.getDataset().metaData[index] = this.getDataset().metaData[index] || new Chart.elements.Arc({
					_chart: this.chart.chart,
					_datasetIndex: this.index,
					_index: index
				});
			}, this);
		},
		addElementAndReset: function(index, colorForNewElement) {
			this.getDataset().metaData = this.getDataset().metaData || [];
			var arc = new Chart.elements.Arc({
				_chart: this.chart.chart,
				_datasetIndex: this.index,
				_index: index
			});

			if (colorForNewElement && helpers.isArray(this.getDataset().backgroundColor)) {
				this.getDataset().backgroundColor.splice(index, 0, colorForNewElement);
			}

			// Reset the point
			this.updateElement(arc, index, true);

			// Add to the points array
			this.getDataset().metaData.splice(index, 0, arc);
		},

		getVisibleDatasetCount: function getVisibleDatasetCount() {
			return helpers.where(this.chart.data.datasets, function(ds) {
				return helpers.isDatasetVisible(ds);
			}).length;
		},

		// Get index of the dataset in relation to the visible datasets. This allows determining the inner and outer radius correctly
		getRingIndex: function getRingIndex(datasetIndex) {
			var ringIndex = 0;

			for (var j = 0; j < datasetIndex; ++j) {
				if (helpers.isDatasetVisible(this.chart.data.datasets[j])) {
					++ringIndex;
				}
			}

			return ringIndex;
		},

		update: function update(reset) {
			var minSize = Math.min(this.chart.chartArea.right - this.chart.chartArea.left, this.chart.chartArea.bottom - this.chart.chartArea.top);

			this.chart.outerRadius = Math.max((minSize / 2) - this.chart.options.elements.arc.borderWidth / 2, 0);
			this.chart.innerRadius = Math.max(this.chart.options.cutoutPercentage ? (this.chart.outerRadius / 100) * (this.chart.options.cutoutPercentage) : 1, 0);
			this.chart.radiusLength = (this.chart.outerRadius - this.chart.innerRadius) / this.getVisibleDatasetCount();

			this.getDataset().total = 0;
			helpers.each(this.getDataset().data, function(value) {
				if (!isNaN(value)) {
					this.getDataset().total += Math.abs(value);
				}
			}, this);

			this.outerRadius = this.chart.outerRadius - (this.chart.radiusLength * this.getRingIndex(this.index));
			this.innerRadius = this.outerRadius - this.chart.radiusLength;

			helpers.each(this.getDataset().metaData, function(arc, index) {
				this.updateElement(arc, index, reset);
			}, this);
		},
		updateElement: function(arc, index, reset) {
			var centerX = (this.chart.chartArea.left + this.chart.chartArea.right) / 2;
			var centerY = (this.chart.chartArea.top + this.chart.chartArea.bottom) / 2;
			var startAngle = Math.PI * -0.5; // non reset case handled later
			var endAngle = Math.PI * -0.5; // non reset case handled later
			var circumference = reset && this.chart.options.animation.animateRotate ? 0 : this.calculateCircumference(this.getDataset().data[index]);
			var innerRadius = reset && this.chart.options.animation.animateScale ? 0 : this.innerRadius;
			var outerRadius = reset && this.chart.options.animation.animateScale ? 0 : this.outerRadius;

			helpers.extend(arc, {
				// Utility
				_chart: this.chart.chart,
				_datasetIndex: this.index,
				_index: index,

				// Desired view properties
				_model: {
					x: centerX,
					y: centerY,
					startAngle: startAngle,
					endAngle: endAngle,
					circumference: circumference,
					outerRadius: outerRadius,
					innerRadius: innerRadius,

					backgroundColor: arc.custom && arc.custom.backgroundColor ? arc.custom.backgroundColor : helpers.getValueAtIndexOrDefault(this.getDataset().backgroundColor, index, this.chart.options.elements.arc.backgroundColor),
					hoverBackgroundColor: arc.custom && arc.custom.hoverBackgroundColor ? arc.custom.hoverBackgroundColor : helpers.getValueAtIndexOrDefault(this.getDataset().hoverBackgroundColor, index, this.chart.options.elements.arc.hoverBackgroundColor),
					borderWidth: arc.custom && arc.custom.borderWidth ? arc.custom.borderWidth : helpers.getValueAtIndexOrDefault(this.getDataset().borderWidth, index, this.chart.options.elements.arc.borderWidth),
					borderColor: arc.custom && arc.custom.borderColor ? arc.custom.borderColor : helpers.getValueAtIndexOrDefault(this.getDataset().borderColor, index, this.chart.options.elements.arc.borderColor),

					label: helpers.getValueAtIndexOrDefault(this.getDataset().label, index, this.chart.data.labels[index])
				}
			});

			// Set correct angles if not resetting
			if (!reset) {

				if (index === 0) {
					arc._model.startAngle = Math.PI * -0.5; // use - PI / 2 instead of 3PI / 2 to make animations better. It means that we never deal with overflow during the transition function
				} else {
					arc._model.startAngle = this.getDataset().metaData[index - 1]._model.endAngle;
				}

				arc._model.endAngle = arc._model.startAngle + arc._model.circumference;
			}

			arc.pivot();
		},

		draw: function(ease) {
			var easingDecimal = ease || 1;
			helpers.each(this.getDataset().metaData, function(arc, index) {
				arc.transition(easingDecimal).draw();
			});
		},

		setHoverStyle: function(arc) {
			var dataset = this.chart.data.datasets[arc._datasetIndex];
			var index = arc._index;

			arc._model.backgroundColor = arc.custom && arc.custom.hoverBackgroundColor ? arc.custom.hoverBackgroundColor : helpers.getValueAtIndexOrDefault(dataset.hoverBackgroundColor, index, helpers.color(arc._model.backgroundColor).saturate(0.5).darken(0.1).rgbString());
			arc._model.borderColor = arc.custom && arc.custom.hoverBorderColor ? arc.custom.hoverBorderColor : helpers.getValueAtIndexOrDefault(dataset.hoverBorderColor, index, helpers.color(arc._model.borderColor).saturate(0.5).darken(0.1).rgbString());
			arc._model.borderWidth = arc.custom && arc.custom.hoverBorderWidth ? arc.custom.hoverBorderWidth : helpers.getValueAtIndexOrDefault(dataset.hoverBorderWidth, index, arc._model.borderWidth);
		},

		removeHoverStyle: function(arc) {
			var dataset = this.chart.data.datasets[arc._datasetIndex];
			var index = arc._index;

			arc._model.backgroundColor = arc.custom && arc.custom.backgroundColor ? arc.custom.backgroundColor : helpers.getValueAtIndexOrDefault(this.getDataset().backgroundColor, index, this.chart.options.elements.arc.backgroundColor);
			arc._model.borderColor = arc.custom && arc.custom.borderColor ? arc.custom.borderColor : helpers.getValueAtIndexOrDefault(this.getDataset().borderColor, index, this.chart.options.elements.arc.borderColor);
			arc._model.borderWidth = arc.custom && arc.custom.borderWidth ? arc.custom.borderWidth : helpers.getValueAtIndexOrDefault(this.getDataset().borderWidth, index, this.chart.options.elements.arc.borderWidth);
		},

		calculateCircumference: function(value) {
			if (this.getDataset().total > 0 && !isNaN(value)) {
				return (Math.PI * 1.999999) * (value / this.getDataset().total);
			} else {
				return 0;
			}
		}
	});
};
},{}],18:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	Chart.defaults.line = {
		showLines: true,

		hover: {
			mode: "label"
		},

		scales: {
			xAxes: [{
				type: "category",
				id: 'x-axis-0'
			}],
			yAxes: [{
				type: "linear",
				id: 'y-axis-0'
			}]
		}
	};


	Chart.controllers.line = Chart.DatasetController.extend({
		addElements: function() {

			this.getDataset().metaData = this.getDataset().metaData || [];

			this.getDataset().metaDataset = this.getDataset().metaDataset || new Chart.elements.Line({
				_chart: this.chart.chart,
				_datasetIndex: this.index,
				_points: this.getDataset().metaData
			});

			helpers.each(this.getDataset().data, function(value, index) {
				this.getDataset().metaData[index] = this.getDataset().metaData[index] || new Chart.elements.Point({
					_chart: this.chart.chart,
					_datasetIndex: this.index,
					_index: index
				});
			}, this);
		},
		addElementAndReset: function(index) {
			this.getDataset().metaData = this.getDataset().metaData || [];
			var point = new Chart.elements.Point({
				_chart: this.chart.chart,
				_datasetIndex: this.index,
				_index: index
			});

			// Reset the point
			this.updateElement(point, index, true);

			// Add to the points array
			this.getDataset().metaData.splice(index, 0, point);

			// Make sure bezier control points are updated
			if (this.chart.options.showLines && this.chart.options.elements.line.tension !== 0)
				this.updateBezierControlPoints();
		},

		update: function update(reset) {
			var line = this.getDataset().metaDataset;
			var points = this.getDataset().metaData;

			var yScale = this.getScaleForId(this.getDataset().yAxisID);
			var xScale = this.getScaleForId(this.getDataset().xAxisID);
			var scaleBase;

			if (yScale.min < 0 && yScale.max < 0) {
				scaleBase = yScale.getPixelForValue(yScale.max);
			} else if (yScale.min > 0 && yScale.max > 0) {
				scaleBase = yScale.getPixelForValue(yScale.min);
			} else {
				scaleBase = yScale.getPixelForValue(0);
			}

			// Update Line
			if (this.chart.options.showLines) {
				// Utility
				line._scale = yScale;
				line._datasetIndex = this.index;
				// Data
				line._children = points;
				// Model
				line._model = {
					// Appearance
					tension: line.custom && line.custom.tension ? line.custom.tension : helpers.getValueOrDefault(this.getDataset().tension, this.chart.options.elements.line.tension),
					backgroundColor: line.custom && line.custom.backgroundColor ? line.custom.backgroundColor : (this.getDataset().backgroundColor || this.chart.options.elements.line.backgroundColor),
					borderWidth: line.custom && line.custom.borderWidth ? line.custom.borderWidth : (this.getDataset().borderWidth || this.chart.options.elements.line.borderWidth),
					borderColor: line.custom && line.custom.borderColor ? line.custom.borderColor : (this.getDataset().borderColor || this.chart.options.elements.line.borderColor),
					borderCapStyle: line.custom && line.custom.borderCapStyle ? line.custom.borderCapStyle : (this.getDataset().borderCapStyle || this.chart.options.elements.line.borderCapStyle),
					borderDash: line.custom && line.custom.borderDash ? line.custom.borderDash : (this.getDataset().borderDash || this.chart.options.elements.line.borderDash),
					borderDashOffset: line.custom && line.custom.borderDashOffset ? line.custom.borderDashOffset : (this.getDataset().borderDashOffset || this.chart.options.elements.line.borderDashOffset),
					borderJoinStyle: line.custom && line.custom.borderJoinStyle ? line.custom.borderJoinStyle : (this.getDataset().borderJoinStyle || this.chart.options.elements.line.borderJoinStyle),
					fill: line.custom && line.custom.fill ? line.custom.fill : (this.getDataset().fill !== undefined ? this.getDataset().fill : this.chart.options.elements.line.fill),
					// Scale
					scaleTop: yScale.top,
					scaleBottom: yScale.bottom,
					scaleZero: scaleBase
				};
				line.pivot();
			}

			// Update Points
			helpers.each(points, function(point, index) {
				this.updateElement(point, index, reset);
			}, this);

			if (this.chart.options.showLines && this.chart.options.elements.line.tension !== 0)
				this.updateBezierControlPoints();
		},

		getPointBackgroundColor: function(point, index) {
			var backgroundColor = this.chart.options.elements.point.backgroundColor;
			var dataset = this.getDataset();

			if (point.custom && point.custom.backgroundColor) {
				backgroundColor = point.custom.backgroundColor;
			} else if (dataset.pointBackgroundColor) {
				backgroundColor = helpers.getValueAtIndexOrDefault(dataset.pointBackgroundColor, index, backgroundColor);
			} else if (dataset.backgroundColor) {
				backgroundColor = dataset.backgroundColor;
			}

			return backgroundColor;
		},
		getPointBorderColor: function(point, index) {
			var borderColor = this.chart.options.elements.point.borderColor;
			var dataset = this.getDataset();

			if (point.custom && point.custom.borderColor) {
				borderColor = point.custom.borderColor;
			} else if (dataset.pointBorderColor) {
				borderColor = helpers.getValueAtIndexOrDefault(this.getDataset().pointBorderColor, index, borderColor);
			} else if (dataset.borderColor) {
				borderColor = dataset.borderColor;
			}

			return borderColor;
		},
		getPointBorderWidth: function(point, index) {
			var borderWidth = this.chart.options.elements.point.borderWidth;
			var dataset = this.getDataset();

			if (point.custom && point.custom.borderWidth !== undefined) {
				borderWidth = point.custom.borderWidth;
			} else if (dataset.pointBorderWidth !== undefined) {
				borderWidth = helpers.getValueAtIndexOrDefault(dataset.pointBorderWidth, index, borderWidth);
			} else if (dataset.borderWidth !== undefined) {
				borderWidth = dataset.borderWidth;
			}

			return borderWidth;
		},

		updateElement: function(point, index, reset) {
			var yScale = this.getScaleForId(this.getDataset().yAxisID);
			var xScale = this.getScaleForId(this.getDataset().xAxisID);
			var scaleBase;

			if (yScale.min < 0 && yScale.max < 0) {
				scaleBase = yScale.getPixelForValue(yScale.max);
			} else if (yScale.min > 0 && yScale.max > 0) {
				scaleBase = yScale.getPixelForValue(yScale.min);
			} else {
				scaleBase = yScale.getPixelForValue(0);
			}

			// Utility
			point._chart = this.chart.chart;
			point._xScale = xScale;
			point._yScale = yScale;
			point._datasetIndex = this.index;
			point._index = index;

			// Desired view properties
			point._model = {
				x: xScale.getPixelForValue(this.getDataset().data[index], index, this.index, this.chart.isCombo),
				y: reset ? scaleBase : this.calculatePointY(this.getDataset().data[index], index, this.index, this.chart.isCombo),
				// Appearance
				tension: point.custom && point.custom.tension ? point.custom.tension : helpers.getValueOrDefault(this.getDataset().tension, this.chart.options.elements.line.tension),
				radius: point.custom && point.custom.radius ? point.custom.radius : helpers.getValueAtIndexOrDefault(this.getDataset().radius, index, this.chart.options.elements.point.radius),
				pointStyle: point.custom && point.custom.pointStyle ? point.custom.pointStyle : helpers.getValueAtIndexOrDefault(this.getDataset().pointStyle, index, this.chart.options.elements.point.pointStyle),
				backgroundColor: this.getPointBackgroundColor(point, index),
				borderColor: this.getPointBorderColor(point, index),
				borderWidth: this.getPointBorderWidth(point, index),
				// Tooltip
				hitRadius: point.custom && point.custom.hitRadius ? point.custom.hitRadius : helpers.getValueAtIndexOrDefault(this.getDataset().hitRadius, index, this.chart.options.elements.point.hitRadius)
			};

			point._model.skip = point.custom && point.custom.skip ? point.custom.skip : (isNaN(point._model.x) || isNaN(point._model.y));
		},

		calculatePointY: function(value, index, datasetIndex, isCombo) {

			var xScale = this.getScaleForId(this.getDataset().xAxisID);
			var yScale = this.getScaleForId(this.getDataset().yAxisID);

			if (yScale.options.stacked) {

				var sumPos = 0,
					sumNeg = 0;

				for (var i = 0; i < datasetIndex; i++) {
					var ds = this.chart.data.datasets[i];
					if (ds.type === 'line' && helpers.isDatasetVisible(ds)) {
						if (ds.data[index] < 0) {
							sumNeg += ds.data[index] || 0;
						} else {
							sumPos += ds.data[index] || 0;
						}
					}
				}

				if (value < 0) {
					return yScale.getPixelForValue(sumNeg + value);
				} else {
					return yScale.getPixelForValue(sumPos + value);
				}
			}

			return yScale.getPixelForValue(value);
		},

		updateBezierControlPoints: function() {
			// Update bezier control points
			helpers.each(this.getDataset().metaData, function(point, index) {
				var controlPoints = helpers.splineCurve(
					helpers.previousItem(this.getDataset().metaData, index)._model,
					point._model,
					helpers.nextItem(this.getDataset().metaData, index)._model,
					point._model.tension
				);

				// Prevent the bezier going outside of the bounds of the graph
				point._model.controlPointPreviousX = Math.max(Math.min(controlPoints.previous.x, this.chart.chartArea.right), this.chart.chartArea.left);
				point._model.controlPointPreviousY = Math.max(Math.min(controlPoints.previous.y, this.chart.chartArea.bottom), this.chart.chartArea.top);

				point._model.controlPointNextX = Math.max(Math.min(controlPoints.next.x, this.chart.chartArea.right), this.chart.chartArea.left);
				point._model.controlPointNextY = Math.max(Math.min(controlPoints.next.y, this.chart.chartArea.bottom), this.chart.chartArea.top);

				// Now pivot the point for animation
				point.pivot();
			}, this);
		},

		draw: function(ease) {
			var easingDecimal = ease || 1;

			// Transition Point Locations
			helpers.each(this.getDataset().metaData, function(point) {
				point.transition(easingDecimal);
			});

			// Transition and Draw the line
			if (this.chart.options.showLines)
				this.getDataset().metaDataset.transition(easingDecimal).draw();

			// Draw the points
			helpers.each(this.getDataset().metaData, function(point) {
				point.draw();
			});
		},

		setHoverStyle: function(point) {
			// Point
			var dataset = this.chart.data.datasets[point._datasetIndex];
			var index = point._index;

			point._model.radius = point.custom && point.custom.hoverRadius ? point.custom.hoverRadius : helpers.getValueAtIndexOrDefault(dataset.pointHoverRadius, index, this.chart.options.elements.point.hoverRadius);
			point._model.backgroundColor = point.custom && point.custom.hoverBackgroundColor ? point.custom.hoverBackgroundColor : helpers.getValueAtIndexOrDefault(dataset.pointHoverBackgroundColor, index, helpers.color(point._model.backgroundColor).saturate(0.5).darken(0.1).rgbString());
			point._model.borderColor = point.custom && point.custom.hoverBorderColor ? point.custom.hoverBorderColor : helpers.getValueAtIndexOrDefault(dataset.pointHoverBorderColor, index, helpers.color(point._model.borderColor).saturate(0.5).darken(0.1).rgbString());
			point._model.borderWidth = point.custom && point.custom.hoverBorderWidth ? point.custom.hoverBorderWidth : helpers.getValueAtIndexOrDefault(dataset.pointHoverBorderWidth, index, point._model.borderWidth);
		},

		removeHoverStyle: function(point) {
			var dataset = this.chart.data.datasets[point._datasetIndex];
			var index = point._index;

			point._model.radius = point.custom && point.custom.radius ? point.custom.radius : helpers.getValueAtIndexOrDefault(this.getDataset().radius, index, this.chart.options.elements.point.radius);
			point._model.backgroundColor = this.getPointBackgroundColor(point, index);
			point._model.borderColor = this.getPointBorderColor(point, index);
			point._model.borderWidth = this.getPointBorderWidth(point, index);
		}
	});
};

},{}],19:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	Chart.defaults.polarArea = {

		scale: {
			type: "radialLinear",
			lineArc: true // so that lines are circular
		},

		//Boolean - Whether to animate the rotation of the chart
		animateRotate: true,
		animateScale: true,

		aspectRatio: 1,
		legendCallback: function(chart) {
			var text = [];
			text.push('<ul class="' + chart.id + '-legend">');

			if (chart.data.datasets.length) {
				for (var i = 0; i < chart.data.datasets[0].data.length; ++i) {
					text.push('<li><span style="background-color:' + chart.data.datasets[0].backgroundColor[i] + '">');
					if (chart.data.labels[i]) {
						text.push(chart.data.labels[i]);
					}
					text.push('</span></li>');
				}
			}

			text.push('</ul>');
			return text.join("");
		},
		legend: {
			labels: {
				generateLabels: function(data) {
					if (data.labels.length && data.datasets.length) {
						return data.labels.map(function(label, i) {
							return {
								text: label,
								fillStyle: data.datasets[0].backgroundColor[i],
								hidden: isNaN(data.datasets[0].data[i]),

								// Extra data used for toggling the correct item
								index: i
							};
						});
					} else {
						return [];
					}
				}
			},
			onClick: function(e, legendItem) {
				helpers.each(this.chart.data.datasets, function(dataset) {
					dataset.metaHiddenData = dataset.metaHiddenData || [];
					var idx = legendItem.index;

					if (!isNaN(dataset.data[idx])) {
						dataset.metaHiddenData[idx] = dataset.data[idx];
						dataset.data[idx] = NaN;
					} else if (!isNaN(dataset.metaHiddenData[idx])) {
						dataset.data[idx] = dataset.metaHiddenData[idx];
					}
				});

				this.chart.update();
			}
		},

		// Need to override these to give a nice default
		tooltips: {
			callbacks: {
				title: function() {
					return '';
				},
				label: function(tooltipItem, data) {
					return data.labels[tooltipItem.index] + ': ' + tooltipItem.yLabel;
				}
			}
		}
	};

	Chart.controllers.polarArea = Chart.DatasetController.extend({
		linkScales: function() {
			// no scales for doughnut
		},
		addElements: function() {
			this.getDataset().metaData = this.getDataset().metaData || [];
			helpers.each(this.getDataset().data, function(value, index) {
				this.getDataset().metaData[index] = this.getDataset().metaData[index] || new Chart.elements.Arc({
					_chart: this.chart.chart,
					_datasetIndex: this.index,
					_index: index
				});
			}, this);
		},
		addElementAndReset: function(index) {
			this.getDataset().metaData = this.getDataset().metaData || [];
			var arc = new Chart.elements.Arc({
				_chart: this.chart.chart,
				_datasetIndex: this.index,
				_index: index
			});

			// Reset the point
			this.updateElement(arc, index, true);

			// Add to the points array
			this.getDataset().metaData.splice(index, 0, arc);
		},
		getVisibleDatasetCount: function getVisibleDatasetCount() {
			return helpers.where(this.chart.data.datasets, function(ds) {
				return helpers.isDatasetVisible(ds);
			}).length;
		},

		update: function update(reset) {
			var minSize = Math.min(this.chart.chartArea.right - this.chart.chartArea.left, this.chart.chartArea.bottom - this.chart.chartArea.top);
			this.chart.outerRadius = Math.max((minSize - this.chart.options.elements.arc.borderWidth / 2) / 2, 0);
			this.chart.innerRadius = Math.max(this.chart.options.cutoutPercentage ? (this.chart.outerRadius / 100) * (this.chart.options.cutoutPercentage) : 1, 0);
			this.chart.radiusLength = (this.chart.outerRadius - this.chart.innerRadius) / this.getVisibleDatasetCount();

			this.getDataset().total = 0;
			helpers.each(this.getDataset().data, function(value) {
				this.getDataset().total += Math.abs(value);
			}, this);

			this.outerRadius = this.chart.outerRadius - (this.chart.radiusLength * this.index);
			this.innerRadius = this.outerRadius - this.chart.radiusLength;

			helpers.each(this.getDataset().metaData, function(arc, index) {
				this.updateElement(arc, index, reset);
			}, this);
		},

		updateElement: function(arc, index, reset) {
			var circumference = this.calculateCircumference(this.getDataset().data[index]);
			var centerX = (this.chart.chartArea.left + this.chart.chartArea.right) / 2;
			var centerY = (this.chart.chartArea.top + this.chart.chartArea.bottom) / 2;

			// If there is NaN data before us, we need to calculate the starting angle correctly.
			// We could be way more efficient here, but its unlikely that the polar area chart will have a lot of data
			var notNullIndex = 0;
			for (var i = 0; i < index; ++i) {
				if (!isNaN(this.getDataset().data[i])) {
					++notNullIndex;
				}
			}

			var startAngle = (-0.5 * Math.PI) + (circumference * notNullIndex);
			var endAngle = startAngle + circumference;

			var resetModel = {
				x: centerX,
				y: centerY,
				innerRadius: 0,
				outerRadius: this.chart.options.animateScale ? 0 : this.chart.scale.getDistanceFromCenterForValue(this.getDataset().data[index]),
				startAngle: this.chart.options.animateRotate ? Math.PI * -0.5 : startAngle,
				endAngle: this.chart.options.animateRotate ? Math.PI * -0.5 : endAngle,

				backgroundColor: arc.custom && arc.custom.backgroundColor ? arc.custom.backgroundColor : helpers.getValueAtIndexOrDefault(this.getDataset().backgroundColor, index, this.chart.options.elements.arc.backgroundColor),
				borderWidth: arc.custom && arc.custom.borderWidth ? arc.custom.borderWidth : helpers.getValueAtIndexOrDefault(this.getDataset().borderWidth, index, this.chart.options.elements.arc.borderWidth),
				borderColor: arc.custom && arc.custom.borderColor ? arc.custom.borderColor : helpers.getValueAtIndexOrDefault(this.getDataset().borderColor, index, this.chart.options.elements.arc.borderColor),

				label: helpers.getValueAtIndexOrDefault(this.chart.data.labels, index, this.chart.data.labels[index])
			};

			helpers.extend(arc, {
				// Utility
				_chart: this.chart.chart,
				_datasetIndex: this.index,
				_index: index,
				_scale: this.chart.scale,

				// Desired view properties
				_model: reset ? resetModel : {
					x: centerX,
					y: centerY,
					innerRadius: 0,
					outerRadius: this.chart.scale.getDistanceFromCenterForValue(this.getDataset().data[index]),
					startAngle: startAngle,
					endAngle: endAngle,

					backgroundColor: arc.custom && arc.custom.backgroundColor ? arc.custom.backgroundColor : helpers.getValueAtIndexOrDefault(this.getDataset().backgroundColor, index, this.chart.options.elements.arc.backgroundColor),
					borderWidth: arc.custom && arc.custom.borderWidth ? arc.custom.borderWidth : helpers.getValueAtIndexOrDefault(this.getDataset().borderWidth, index, this.chart.options.elements.arc.borderWidth),
					borderColor: arc.custom && arc.custom.borderColor ? arc.custom.borderColor : helpers.getValueAtIndexOrDefault(this.getDataset().borderColor, index, this.chart.options.elements.arc.borderColor),

					label: helpers.getValueAtIndexOrDefault(this.chart.data.labels, index, this.chart.data.labels[index])
				}
			});

			arc.pivot();
		},

		draw: function(ease) {
			var easingDecimal = ease || 1;
			helpers.each(this.getDataset().metaData, function(arc, index) {
				arc.transition(easingDecimal).draw();
			});
		},

		setHoverStyle: function(arc) {
			var dataset = this.chart.data.datasets[arc._datasetIndex];
			var index = arc._index;

			arc._model.backgroundColor = arc.custom && arc.custom.hoverBackgroundColor ? arc.custom.hoverBackgroundColor : helpers.getValueAtIndexOrDefault(dataset.hoverBackgroundColor, index, helpers.color(arc._model.backgroundColor).saturate(0.5).darken(0.1).rgbString());
			arc._model.borderColor = arc.custom && arc.custom.hoverBorderColor ? arc.custom.hoverBorderColor : helpers.getValueAtIndexOrDefault(dataset.hoverBorderColor, index, helpers.color(arc._model.borderColor).saturate(0.5).darken(0.1).rgbString());
			arc._model.borderWidth = arc.custom && arc.custom.hoverBorderWidth ? arc.custom.hoverBorderWidth : helpers.getValueAtIndexOrDefault(dataset.hoverBorderWidth, index, arc._model.borderWidth);
		},

		removeHoverStyle: function(arc) {
			var dataset = this.chart.data.datasets[arc._datasetIndex];
			var index = arc._index;

			arc._model.backgroundColor = arc.custom && arc.custom.backgroundColor ? arc.custom.backgroundColor : helpers.getValueAtIndexOrDefault(this.getDataset().backgroundColor, index, this.chart.options.elements.arc.backgroundColor);
			arc._model.borderColor = arc.custom && arc.custom.borderColor ? arc.custom.borderColor : helpers.getValueAtIndexOrDefault(this.getDataset().borderColor, index, this.chart.options.elements.arc.borderColor);
			arc._model.borderWidth = arc.custom && arc.custom.borderWidth ? arc.custom.borderWidth : helpers.getValueAtIndexOrDefault(this.getDataset().borderWidth, index, this.chart.options.elements.arc.borderWidth);
		},

		calculateCircumference: function(value) {
			if (isNaN(value)) {
				return 0;
			} else {
				// Count the number of NaN values
				var numNaN = helpers.where(this.getDataset().data, function(data) {
					return isNaN(data);
				}).length;

				return (2 * Math.PI) / (this.getDataset().data.length - numNaN);
			}
		}
	});

};
},{}],20:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;


	Chart.defaults.radar = {
		scale: {
			type: "radialLinear"
		},
		elements: {
			line: {
				tension: 0 // no bezier in radar
			}
		}
	};

	Chart.controllers.radar = Chart.DatasetController.extend({
		linkScales: function() {
			// No need. Single scale only
		},

		addElements: function() {

			this.getDataset().metaData = this.getDataset().metaData || [];

			this.getDataset().metaDataset = this.getDataset().metaDataset || new Chart.elements.Line({
				_chart: this.chart.chart,
				_datasetIndex: this.index,
				_points: this.getDataset().metaData,
				_loop: true
			});

			helpers.each(this.getDataset().data, function(value, index) {
				this.getDataset().metaData[index] = this.getDataset().metaData[index] || new Chart.elements.Point({
					_chart: this.chart.chart,
					_datasetIndex: this.index,
					_index: index,
					_model: {
						x: 0, //xScale.getPixelForValue(null, index, true),
						y: 0 //this.chartArea.bottom,
					}
				});
			}, this);
		},
		addElementAndReset: function(index) {
			this.getDataset().metaData = this.getDataset().metaData || [];
			var point = new Chart.elements.Point({
				_chart: this.chart.chart,
				_datasetIndex: this.index,
				_index: index
			});

			// Reset the point
			this.updateElement(point, index, true);

			// Add to the points array
			this.getDataset().metaData.splice(index, 0, point);

			// Make sure bezier control points are updated
			this.updateBezierControlPoints();
		},

		update: function update(reset) {

			var line = this.getDataset().metaDataset;
			var points = this.getDataset().metaData;

			var scale = this.chart.scale;
			var scaleBase;

			if (scale.min < 0 && scale.max < 0) {
				scaleBase = scale.getPointPositionForValue(0, scale.max);
			} else if (scale.min > 0 && scale.max > 0) {
				scaleBase = scale.getPointPositionForValue(0, scale.min);
			} else {
				scaleBase = scale.getPointPositionForValue(0, 0);
			}

			helpers.extend(this.getDataset().metaDataset, {
				// Utility
				_datasetIndex: this.index,
				// Data
				_children: this.getDataset().metaData,
				// Model
				_model: {
					// Appearance
					tension: line.custom && line.custom.tension ? line.custom.tension : helpers.getValueOrDefault(this.getDataset().tension, this.chart.options.elements.line.tension),
					backgroundColor: line.custom && line.custom.backgroundColor ? line.custom.backgroundColor : (this.getDataset().backgroundColor || this.chart.options.elements.line.backgroundColor),
					borderWidth: line.custom && line.custom.borderWidth ? line.custom.borderWidth : (this.getDataset().borderWidth || this.chart.options.elements.line.borderWidth),
					borderColor: line.custom && line.custom.borderColor ? line.custom.borderColor : (this.getDataset().borderColor || this.chart.options.elements.line.borderColor),
					fill: line.custom && line.custom.fill ? line.custom.fill : (this.getDataset().fill !== undefined ? this.getDataset().fill : this.chart.options.elements.line.fill),
					borderCapStyle: line.custom && line.custom.borderCapStyle ? line.custom.borderCapStyle : (this.getDataset().borderCapStyle || this.chart.options.elements.line.borderCapStyle),
					borderDash: line.custom && line.custom.borderDash ? line.custom.borderDash : (this.getDataset().borderDash || this.chart.options.elements.line.borderDash),
					borderDashOffset: line.custom && line.custom.borderDashOffset ? line.custom.borderDashOffset : (this.getDataset().borderDashOffset || this.chart.options.elements.line.borderDashOffset),
					borderJoinStyle: line.custom && line.custom.borderJoinStyle ? line.custom.borderJoinStyle : (this.getDataset().borderJoinStyle || this.chart.options.elements.line.borderJoinStyle),

					// Scale
					scaleTop: scale.top,
					scaleBottom: scale.bottom,
					scaleZero: scaleBase
				}
			});

			this.getDataset().metaDataset.pivot();

			// Update Points
			helpers.each(points, function(point, index) {
				this.updateElement(point, index, reset);
			}, this);


			// Update bezier control points
			this.updateBezierControlPoints();
		},
		updateElement: function(point, index, reset) {
			var pointPosition = this.chart.scale.getPointPositionForValue(index, this.getDataset().data[index]);

			helpers.extend(point, {
				// Utility
				_datasetIndex: this.index,
				_index: index,
				_scale: this.chart.scale,

				// Desired view properties
				_model: {
					x: reset ? this.chart.scale.xCenter : pointPosition.x, // value not used in dataset scale, but we want a consistent API between scales
					y: reset ? this.chart.scale.yCenter : pointPosition.y,

					// Appearance
					tension: point.custom && point.custom.tension ? point.custom.tension : helpers.getValueOrDefault(this.getDataset().tension, this.chart.options.elements.line.tension),
					radius: point.custom && point.custom.radius ? point.custom.radius : helpers.getValueAtIndexOrDefault(this.getDataset().pointRadius, index, this.chart.options.elements.point.radius),
					backgroundColor: point.custom && point.custom.backgroundColor ? point.custom.backgroundColor : helpers.getValueAtIndexOrDefault(this.getDataset().pointBackgroundColor, index, this.chart.options.elements.point.backgroundColor),
					borderColor: point.custom && point.custom.borderColor ? point.custom.borderColor : helpers.getValueAtIndexOrDefault(this.getDataset().pointBorderColor, index, this.chart.options.elements.point.borderColor),
					borderWidth: point.custom && point.custom.borderWidth ? point.custom.borderWidth : helpers.getValueAtIndexOrDefault(this.getDataset().pointBorderWidth, index, this.chart.options.elements.point.borderWidth),
					pointStyle: point.custom && point.custom.pointStyle ? point.custom.pointStyle : helpers.getValueAtIndexOrDefault(this.getDataset().pointStyle, index, this.chart.options.elements.point.pointStyle),

					// Tooltip
					hitRadius: point.custom && point.custom.hitRadius ? point.custom.hitRadius : helpers.getValueAtIndexOrDefault(this.getDataset().hitRadius, index, this.chart.options.elements.point.hitRadius)
				}
			});

			point._model.skip = point.custom && point.custom.skip ? point.custom.skip : (isNaN(point._model.x) || isNaN(point._model.y));
		},
		updateBezierControlPoints: function() {
			helpers.each(this.getDataset().metaData, function(point, index) {
				var controlPoints = helpers.splineCurve(
					helpers.previousItem(this.getDataset().metaData, index, true)._model,
					point._model,
					helpers.nextItem(this.getDataset().metaData, index, true)._model,
					point._model.tension
				);

				// Prevent the bezier going outside of the bounds of the graph
				point._model.controlPointPreviousX = Math.max(Math.min(controlPoints.previous.x, this.chart.chartArea.right), this.chart.chartArea.left);
				point._model.controlPointPreviousY = Math.max(Math.min(controlPoints.previous.y, this.chart.chartArea.bottom), this.chart.chartArea.top);

				point._model.controlPointNextX = Math.max(Math.min(controlPoints.next.x, this.chart.chartArea.right), this.chart.chartArea.left);
				point._model.controlPointNextY = Math.max(Math.min(controlPoints.next.y, this.chart.chartArea.bottom), this.chart.chartArea.top);

				// Now pivot the point for animation
				point.pivot();
			}, this);
		},

		draw: function(ease) {
			var easingDecimal = ease || 1;

			// Transition Point Locations
			helpers.each(this.getDataset().metaData, function(point, index) {
				point.transition(easingDecimal);
			});

			// Transition and Draw the line
			this.getDataset().metaDataset.transition(easingDecimal).draw();

			// Draw the points
			helpers.each(this.getDataset().metaData, function(point) {
				point.draw();
			});
		},

		setHoverStyle: function(point) {
			// Point
			var dataset = this.chart.data.datasets[point._datasetIndex];
			var index = point._index;

			point._model.radius = point.custom && point.custom.hoverRadius ? point.custom.hoverRadius : helpers.getValueAtIndexOrDefault(dataset.pointHoverRadius, index, this.chart.options.elements.point.hoverRadius);
			point._model.backgroundColor = point.custom && point.custom.hoverBackgroundColor ? point.custom.hoverBackgroundColor : helpers.getValueAtIndexOrDefault(dataset.pointHoverBackgroundColor, index, helpers.color(point._model.backgroundColor).saturate(0.5).darken(0.1).rgbString());
			point._model.borderColor = point.custom && point.custom.hoverBorderColor ? point.custom.hoverBorderColor : helpers.getValueAtIndexOrDefault(dataset.pointHoverBorderColor, index, helpers.color(point._model.borderColor).saturate(0.5).darken(0.1).rgbString());
			point._model.borderWidth = point.custom && point.custom.hoverBorderWidth ? point.custom.hoverBorderWidth : helpers.getValueAtIndexOrDefault(dataset.pointHoverBorderWidth, index, point._model.borderWidth);
		},

		removeHoverStyle: function(point) {
			var dataset = this.chart.data.datasets[point._datasetIndex];
			var index = point._index;

			point._model.radius = point.custom && point.custom.radius ? point.custom.radius : helpers.getValueAtIndexOrDefault(this.getDataset().radius, index, this.chart.options.elements.point.radius);
			point._model.backgroundColor = point.custom && point.custom.backgroundColor ? point.custom.backgroundColor : helpers.getValueAtIndexOrDefault(this.getDataset().pointBackgroundColor, index, this.chart.options.elements.point.backgroundColor);
			point._model.borderColor = point.custom && point.custom.borderColor ? point.custom.borderColor : helpers.getValueAtIndexOrDefault(this.getDataset().pointBorderColor, index, this.chart.options.elements.point.borderColor);
			point._model.borderWidth = point.custom && point.custom.borderWidth ? point.custom.borderWidth : helpers.getValueAtIndexOrDefault(this.getDataset().pointBorderWidth, index, this.chart.options.elements.point.borderWidth);
		}
	});
};
},{}],21:[function(require,module,exports){
/*global window: false */
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	Chart.defaults.global.animation = {
		duration: 1000,
		easing: "easeOutQuart",
		onProgress: helpers.noop,
		onComplete: helpers.noop
	};

	Chart.Animation = Chart.Element.extend({
		currentStep: null, // the current animation step
		numSteps: 60, // default number of steps
		easing: "", // the easing to use for this animation
		render: null, // render function used by the animation service

		onAnimationProgress: null, // user specified callback to fire on each step of the animation
		onAnimationComplete: null // user specified callback to fire when the animation finishes
	});

	Chart.animationService = {
		frameDuration: 17,
		animations: [],
		dropFrames: 0,
		addAnimation: function(chartInstance, animationObject, duration, lazy) {

			if (!lazy) {
				chartInstance.animating = true;
			}

			for (var index = 0; index < this.animations.length; ++index) {
				if (this.animations[index].chartInstance === chartInstance) {
					// replacing an in progress animation
					this.animations[index].animationObject = animationObject;
					return;
				}
			}

			this.animations.push({
				chartInstance: chartInstance,
				animationObject: animationObject
			});

			// If there are no animations queued, manually kickstart a digest, for lack of a better word
			if (this.animations.length === 1) {
				helpers.requestAnimFrame.call(window, this.digestWrapper);
			}
		},
		// Cancel the animation for a given chart instance
		cancelAnimation: function(chartInstance) {
			var index = helpers.findIndex(this.animations, function(animationWrapper) {
				return animationWrapper.chartInstance === chartInstance;
			});

			if (index !== -1) {
				this.animations.splice(index, 1);
				chartInstance.animating = false;
			}
		},
		// calls startDigest with the proper context
		digestWrapper: function() {
			Chart.animationService.startDigest.call(Chart.animationService);
		},
		startDigest: function() {

			var startTime = Date.now();
			var framesToDrop = 0;

			if (this.dropFrames > 1) {
				framesToDrop = Math.floor(this.dropFrames);
				this.dropFrames = this.dropFrames % 1;
			}

			var i = 0;
			while (i < this.animations.length) {
				if (this.animations[i].animationObject.currentStep === null) {
					this.animations[i].animationObject.currentStep = 0;
				}

				this.animations[i].animationObject.currentStep += 1 + framesToDrop;

				if (this.animations[i].animationObject.currentStep > this.animations[i].animationObject.numSteps) {
					this.animations[i].animationObject.currentStep = this.animations[i].animationObject.numSteps;
				}

				this.animations[i].animationObject.render(this.animations[i].chartInstance, this.animations[i].animationObject);
				if (this.animations[i].animationObject.onAnimationProgress && this.animations[i].animationObject.onAnimationProgress.call) {
					this.animations[i].animationObject.onAnimationProgress.call(this.animations[i].chartInstance, this.animations[i]);
				}

				if (this.animations[i].animationObject.currentStep === this.animations[i].animationObject.numSteps) {
					if (this.animations[i].animationObject.onAnimationComplete && this.animations[i].animationObject.onAnimationComplete.call) {
						this.animations[i].animationObject.onAnimationComplete.call(this.animations[i].chartInstance, this.animations[i]);
					}

					// executed the last frame. Remove the animation.
					this.animations[i].chartInstance.animating = false;

					this.animations.splice(i, 1);
				} else {
					++i;
				}
			}

			var endTime = Date.now();
			var dropFrames = (endTime - startTime) / this.frameDuration;

			this.dropFrames += dropFrames;

			// Do we have more stuff to animate?
			if (this.animations.length > 0) {
				helpers.requestAnimFrame.call(window, this.digestWrapper);
			}
		}
	};
};
},{}],22:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;
	//Create a dictionary of chart types, to allow for extension of existing types
	Chart.types = {};

	//Store a reference to each instance - allowing us to globally resize chart instances on window resize.
	//Destroy method on the chart will remove the instance of the chart from this reference.
	Chart.instances = {};

	// Controllers available for dataset visualization eg. bar, line, slice, etc.
	Chart.controllers = {};

	// The main controller of a chart
	Chart.Controller = function(instance) {

		this.chart = instance;
		this.config = instance.config;
		this.options = this.config.options = helpers.configMerge(Chart.defaults.global, Chart.defaults[this.config.type], this.config.options || {});
		this.id = helpers.uid();

		Object.defineProperty(this, 'data', {
			get: function() {
				return this.config.data;
			}
		});

		//Add the chart instance to the global namespace
		Chart.instances[this.id] = this;

		if (this.options.responsive) {
			// Silent resize before chart draws
			this.resize(true);
		}

		this.initialize();

		return this;
	};

	helpers.extend(Chart.Controller.prototype, {

		initialize: function initialize() {

			// TODO
			// If BeforeInit(this) doesn't return false, proceed

			this.bindEvents();

			// Make sure controllers are built first so that each dataset is bound to an axis before the scales
			// are built
			this.ensureScalesHaveIDs();
			this.buildOrUpdateControllers();
			this.buildScales();
			this.buildSurroundingItems();
			this.updateLayout();
			this.resetElements();
			this.initToolTip();
			this.update();

			// TODO
			// If AfterInit(this) doesn't return false, proceed

			return this;
		},

		clear: function clear() {
			helpers.clear(this.chart);
			return this;
		},

		stop: function stop() {
			// Stops any current animation loop occuring
			Chart.animationService.cancelAnimation(this);
			return this;
		},

		resize: function resize(silent) {
			var canvas = this.chart.canvas;
			var newWidth = helpers.getMaximumWidth(this.chart.canvas);
			var newHeight = (this.options.maintainAspectRatio && isNaN(this.chart.aspectRatio) === false && isFinite(this.chart.aspectRatio) && this.chart.aspectRatio !== 0) ? newWidth / this.chart.aspectRatio : helpers.getMaximumHeight(this.chart.canvas);

			var sizeChanged = this.chart.width !== newWidth || this.chart.height !== newHeight;

			if (!sizeChanged)
				return this;

			canvas.width = this.chart.width = newWidth;
			canvas.height = this.chart.height = newHeight;

			helpers.retinaScale(this.chart);

			if (!silent) {
				this.stop();
				this.update(this.options.responsiveAnimationDuration);
			}

			return this;
		},
		ensureScalesHaveIDs: function ensureScalesHaveIDs() {
			var defaultXAxisID = 'x-axis-';
			var defaultYAxisID = 'y-axis-';

			if (this.options.scales) {
				if (this.options.scales.xAxes && this.options.scales.xAxes.length) {
					helpers.each(this.options.scales.xAxes, function(xAxisOptions, index) {
						xAxisOptions.id = xAxisOptions.id || (defaultXAxisID + index);
					});
				}

				if (this.options.scales.yAxes && this.options.scales.yAxes.length) {
					// Build the y axes
					helpers.each(this.options.scales.yAxes, function(yAxisOptions, index) {
						yAxisOptions.id = yAxisOptions.id || (defaultYAxisID + index);
					});
				}
			}
		},
		buildScales: function buildScales() {
			// Map of scale ID to scale object so we can lookup later
			this.scales = {};

			// Build the x axes
			if (this.options.scales) {
				if (this.options.scales.xAxes && this.options.scales.xAxes.length) {
					helpers.each(this.options.scales.xAxes, function(xAxisOptions, index) {
						var xType = helpers.getValueOrDefault(xAxisOptions.type, 'category');
						var ScaleClass = Chart.scaleService.getScaleConstructor(xType);
						if (ScaleClass) {
							var scale = new ScaleClass({
								ctx: this.chart.ctx,
								options: xAxisOptions,
								chart: this,
								id: xAxisOptions.id
							});

							this.scales[scale.id] = scale;
						}
					}, this);
				}

				if (this.options.scales.yAxes && this.options.scales.yAxes.length) {
					// Build the y axes
					helpers.each(this.options.scales.yAxes, function(yAxisOptions, index) {
						var yType = helpers.getValueOrDefault(yAxisOptions.type, 'linear');
						var ScaleClass = Chart.scaleService.getScaleConstructor(yType);
						if (ScaleClass) {
							var scale = new ScaleClass({
								ctx: this.chart.ctx,
								options: yAxisOptions,
								chart: this,
								id: yAxisOptions.id
							});

							this.scales[scale.id] = scale;
						}
					}, this);
				}
			}
			if (this.options.scale) {
				// Build radial axes
				var ScaleClass = Chart.scaleService.getScaleConstructor(this.options.scale.type);
				if (ScaleClass) {
					var scale = new ScaleClass({
						ctx: this.chart.ctx,
						options: this.options.scale,
						chart: this
					});

					this.scale = scale;

					this.scales.radialScale = scale;
				}
			}

			Chart.scaleService.addScalesToLayout(this);
		},

		buildSurroundingItems: function() {
			if (this.options.title) {
				this.titleBlock = new Chart.Title({
					ctx: this.chart.ctx,
					options: this.options.title,
					chart: this
				});

				Chart.layoutService.addBox(this, this.titleBlock);
			}

			if (this.options.legend) {
				this.legend = new Chart.Legend({
					ctx: this.chart.ctx,
					options: this.options.legend,
					chart: this
				});

				Chart.layoutService.addBox(this, this.legend);
			}
		},

		updateLayout: function() {
			Chart.layoutService.update(this, this.chart.width, this.chart.height);
		},

		buildOrUpdateControllers: function buildOrUpdateControllers() {
			var types = [];
			var newControllers = [];

			helpers.each(this.data.datasets, function(dataset, datasetIndex) {
				if (!dataset.type) {
					dataset.type = this.config.type;
				}

				var type = dataset.type;
				types.push(type);

				if (dataset.controller) {
					dataset.controller.updateIndex(datasetIndex);
				} else {
					dataset.controller = new Chart.controllers[type](this, datasetIndex);
					newControllers.push(dataset.controller);
				}
			}, this);

			if (types.length > 1) {
				for (var i = 1; i < types.length; i++) {
					if (types[i] !== types[i - 1]) {
						this.isCombo = true;
						break;
					}
				}
			}

			return newControllers;
		},

		resetElements: function resetElements() {
			helpers.each(this.data.datasets, function(dataset, datasetIndex) {
				dataset.controller.reset();
			});
		},

		update: function update(animationDuration, lazy) {
			// In case the entire data object changed
			this.tooltip._data = this.data;

			// Make sure dataset controllers are updated and new controllers are reset
			var newControllers = this.buildOrUpdateControllers();

			Chart.layoutService.update(this, this.chart.width, this.chart.height);

			// Can only reset the new controllers after the scales have been updated
			helpers.each(newControllers, function(controller) {
				controller.reset();
			});

			// Make sure all dataset controllers have correct meta data counts
			helpers.each(this.data.datasets, function(dataset, datasetIndex) {
				dataset.controller.buildOrUpdateElements();
			});

			// This will loop through any data and do the appropriate element update for the type
			helpers.each(this.data.datasets, function(dataset, datasetIndex) {
				dataset.controller.update();
			});
			this.render(animationDuration, lazy);
		},

		render: function render(duration, lazy) {

			if (this.options.animation && ((typeof duration !== 'undefined' && duration !== 0) || (typeof duration === 'undefined' && this.options.animation.duration !== 0))) {
				var animation = new Chart.Animation();
				animation.numSteps = (duration || this.options.animation.duration) / 16.66; //60 fps
				animation.easing = this.options.animation.easing;

				// render function
				animation.render = function(chartInstance, animationObject) {
					var easingFunction = helpers.easingEffects[animationObject.easing];
					var stepDecimal = animationObject.currentStep / animationObject.numSteps;
					var easeDecimal = easingFunction(stepDecimal);

					chartInstance.draw(easeDecimal, stepDecimal, animationObject.currentStep);
				};

				// user events
				animation.onAnimationProgress = this.options.animation.onProgress;
				animation.onAnimationComplete = this.options.animation.onComplete;

				Chart.animationService.addAnimation(this, animation, duration, lazy);
			} else {
				this.draw();
				if (this.options.animation && this.options.animation.onComplete && this.options.animation.onComplete.call) {
					this.options.animation.onComplete.call(this);
				}
			}
			return this;
		},

		draw: function(ease) {
			var easingDecimal = ease || 1;
			this.clear();

			// Draw all the scales
			helpers.each(this.boxes, function(box) {
				box.draw(this.chartArea);
			}, this);
			if (this.scale) {
				this.scale.draw();
			}

			// Clip out the chart area so that anything outside does not draw. This is necessary for zoom and pan to function
			this.chart.ctx.save();
			this.chart.ctx.beginPath();
			this.chart.ctx.rect(this.chartArea.left, this.chartArea.top, this.chartArea.right - this.chartArea.left, this.chartArea.bottom - this.chartArea.top);
			this.chart.ctx.clip();

			// Draw each dataset via its respective controller (reversed to support proper line stacking)
			helpers.each(this.data.datasets, function(dataset, datasetIndex) {
				if (helpers.isDatasetVisible(dataset)) {
					dataset.controller.draw(ease);
				}
			}, null, true);

			// Restore from the clipping operation
			this.chart.ctx.restore();

			// Finally draw the tooltip
			this.tooltip.transition(easingDecimal).draw();
		},

		// Get the single element that was clicked on
		// @return : An object containing the dataset index and element index of the matching element. Also contains the rectangle that was draw
		getElementAtEvent: function(e) {

			var eventPosition = helpers.getRelativePosition(e, this.chart);
			var elementsArray = [];

			helpers.each(this.data.datasets, function(dataset, datasetIndex) {
				if (helpers.isDatasetVisible(dataset)) {
					helpers.each(dataset.metaData, function(element, index) {
						if (element.inRange(eventPosition.x, eventPosition.y)) {
							elementsArray.push(element);
							return elementsArray;
						}
					});
				}
			});

			return elementsArray;
		},

		getElementsAtEvent: function(e) {
			var eventPosition = helpers.getRelativePosition(e, this.chart);
			var elementsArray = [];

			var found = (function() {
				if (this.data.datasets) {
					for (var i = 0; i < this.data.datasets.length; i++) {
						if (helpers.isDatasetVisible(this.data.datasets[i])) {
							for (var j = 0; j < this.data.datasets[i].metaData.length; j++) {
								if (this.data.datasets[i].metaData[j].inRange(eventPosition.x, eventPosition.y)) {
									return this.data.datasets[i].metaData[j];
								}
							}
						}
					}
				}
			}).call(this);

			if (!found) {
				return elementsArray;
			}

			helpers.each(this.data.datasets, function(dataset, dsIndex) {
				if (helpers.isDatasetVisible(dataset)) {
					elementsArray.push(dataset.metaData[found._index]);
				}
			});

			return elementsArray;
		},

		getDatasetAtEvent: function(e) {
			var elementsArray = this.getElementAtEvent(e);

			if (elementsArray.length > 0) {
				elementsArray = this.data.datasets[elementsArray[0]._datasetIndex].metaData;
			}

			return elementsArray;
		},

		generateLegend: function generateLegend() {
			return this.options.legendCallback(this);
		},

		destroy: function destroy() {
			this.clear();
			helpers.unbindEvents(this, this.events);
			helpers.removeResizeListener(this.chart.canvas.parentNode);

			// Reset canvas height/width attributes
			var canvas = this.chart.canvas;
			canvas.width = this.chart.width;
			canvas.height = this.chart.height;

			// if we scaled the canvas in response to a devicePixelRatio !== 1, we need to undo that transform here
			if (this.chart.originalDevicePixelRatio !== undefined) {
				this.chart.ctx.scale(1 / this.chart.originalDevicePixelRatio, 1 / this.chart.originalDevicePixelRatio);
			}

			// Reset to the old style since it may have been changed by the device pixel ratio changes
			canvas.style.width = this.chart.originalCanvasStyleWidth;
			canvas.style.height = this.chart.originalCanvasStyleHeight;

			delete Chart.instances[this.id];
		},

		toBase64Image: function toBase64Image() {
			return this.chart.canvas.toDataURL.apply(this.chart.canvas, arguments);
		},

		initToolTip: function initToolTip() {
			this.tooltip = new Chart.Tooltip({
				_chart: this.chart,
				_chartInstance: this,
				_data: this.data,
				_options: this.options
			}, this);
		},

		bindEvents: function bindEvents() {
			helpers.bindEvents(this, this.options.events, function(evt) {
				this.eventHandler(evt);
			});
		},
		eventHandler: function eventHandler(e) {
			this.lastActive = this.lastActive || [];
			this.lastTooltipActive = this.lastTooltipActive || [];

			// Find Active Elements for hover and tooltips
			if (e.type === 'mouseout') {
				this.active = [];
				this.tooltipActive = [];
			} else {

				var _this = this;
				var getItemsForMode = function(mode) {
					switch (mode) {
						case 'single':
							return _this.getElementAtEvent(e);
						case 'label':
							return _this.getElementsAtEvent(e);
						case 'dataset':
							return _this.getDatasetAtEvent(e);
						default:
							return e;
					}
				};

				this.active = getItemsForMode(this.options.hover.mode);
				this.tooltipActive = getItemsForMode(this.options.tooltips.mode);
			}

			// On Hover hook
			if (this.options.hover.onHover) {
				this.options.hover.onHover.call(this, this.active);
			}

			if (e.type === 'mouseup' || e.type === 'click') {
				if (this.options.onClick) {
					this.options.onClick.call(this, e, this.active);
				}

				if (this.legend && this.legend.handleEvent) {
					this.legend.handleEvent(e);
				}
			}

			var dataset;
			var index;

			// Remove styling for last active (even if it may still be active)
			if (this.lastActive.length) {
				switch (this.options.hover.mode) {
					case 'single':
						this.data.datasets[this.lastActive[0]._datasetIndex].controller.removeHoverStyle(this.lastActive[0], this.lastActive[0]._datasetIndex, this.lastActive[0]._index);
						break;
					case 'label':
					case 'dataset':
						for (var i = 0; i < this.lastActive.length; i++) {
							if (this.lastActive[i])
								this.data.datasets[this.lastActive[i]._datasetIndex].controller.removeHoverStyle(this.lastActive[i], this.lastActive[i]._datasetIndex, this.lastActive[i]._index);
						}
						break;
					default:
						// Don't change anything
				}
			}

			// Built in hover styling
			if (this.active.length && this.options.hover.mode) {
				switch (this.options.hover.mode) {
					case 'single':
						this.data.datasets[this.active[0]._datasetIndex].controller.setHoverStyle(this.active[0]);
						break;
					case 'label':
					case 'dataset':
						for (var j = 0; j < this.active.length; j++) {
							if (this.active[j])
								this.data.datasets[this.active[j]._datasetIndex].controller.setHoverStyle(this.active[j]);
						}
						break;
					default:
						// Don't change anything
				}
			}


			// Built in Tooltips
			if (this.options.tooltips.enabled || this.options.tooltips.custom) {

				// The usual updates
				this.tooltip.initialize();
				this.tooltip._active = this.tooltipActive;
				this.tooltip.update();
			}

			// Hover animations
			this.tooltip.pivot();

			if (!this.animating) {
				var changed;

				helpers.each(this.active, function(element, index) {
					if (element !== this.lastActive[index]) {
						changed = true;
					}
				}, this);

				helpers.each(this.tooltipActive, function(element, index) {
					if (element !== this.lastTooltipActive[index]) {
						changed = true;
					}
				}, this);

				// If entering, leaving, or changing elements, animate the change via pivot
				if ((this.lastActive.length !== this.active.length) ||
					(this.lastTooltipActive.length !== this.tooltipActive.length) ||
					changed) {

					this.stop();

					if (this.options.tooltips.enabled || this.options.tooltips.custom) {
						this.tooltip.update(true);
					}

					// We only need to render at this point. Updating will cause scales to be recomputed generating flicker & using more
					// memory than necessary.
					this.render(this.options.hover.animationDuration, true);
				}
			}

			// Remember Last Actives
			this.lastActive = this.active;
			this.lastTooltipActive = this.tooltipActive;
			return this;
		}
	});
};

},{}],23:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	// Base class for all dataset controllers (line, bar, etc)
	Chart.DatasetController = function(chart, datasetIndex) {
		this.initialize.call(this, chart, datasetIndex);
	};

	helpers.extend(Chart.DatasetController.prototype, {
		initialize: function(chart, datasetIndex) {
			this.chart = chart;
			this.index = datasetIndex;
			this.linkScales();
			this.addElements();
		},
		updateIndex: function(datasetIndex) {
			this.index = datasetIndex;
		},

		linkScales: function() {
			if (!this.getDataset().xAxisID) {
				this.getDataset().xAxisID = this.chart.options.scales.xAxes[0].id;
			}

			if (!this.getDataset().yAxisID) {
				this.getDataset().yAxisID = this.chart.options.scales.yAxes[0].id;
			}
		},

		getDataset: function() {
			return this.chart.data.datasets[this.index];
		},

		getScaleForId: function(scaleID) {
			return this.chart.scales[scaleID];
		},

		reset: function() {
			this.update(true);
		},

		buildOrUpdateElements: function buildOrUpdateElements() {
			// Handle the number of data points changing
			var numData = this.getDataset().data.length;
			var numMetaData = this.getDataset().metaData.length;

			// Make sure that we handle number of datapoints changing
			if (numData < numMetaData) {
				// Remove excess bars for data points that have been removed
				this.getDataset().metaData.splice(numData, numMetaData - numData);
			} else if (numData > numMetaData) {
				// Add new elements
				for (var index = numMetaData; index < numData; ++index) {
					this.addElementAndReset(index);
				}
			}
		},

		// Controllers should implement the following
		addElements: helpers.noop,
		addElementAndReset: helpers.noop,
		draw: helpers.noop,
		removeHoverStyle: helpers.noop,
		setHoverStyle: helpers.noop,
		update: helpers.noop
	});

	Chart.DatasetController.extend = helpers.inherits;

};
},{}],24:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

  var helpers = Chart.helpers;

  Chart.elements = {};

  Chart.Element = function(configuration) {
    helpers.extend(this, configuration);
    this.initialize.apply(this, arguments);
  };
  helpers.extend(Chart.Element.prototype, {
    initialize: function() {},
    pivot: function() {
      if (!this._view) {
        this._view = helpers.clone(this._model);
      }
      this._start = helpers.clone(this._view);
      return this;
    },
    transition: function(ease) {
      if (!this._view) {
        this._view = helpers.clone(this._model);
      }

      // No animation -> No Transition
      if (ease === 1) {
        this._view = this._model;
        this._start = null;
        return this;
      }

      if (!this._start) {
        this.pivot();
      }

      helpers.each(this._model, function(value, key) {

        if (key[0] === '_' || !this._model.hasOwnProperty(key)) {
          // Only non-underscored properties
        }

        // Init if doesn't exist
        else if (!this._view.hasOwnProperty(key)) {
          if (typeof value === 'number' && !isNaN(this._view[key])) {
            this._view[key] = value * ease;
          } else {
            this._view[key] = value;
          }
        }

        // No unnecessary computations
        else if (value === this._view[key]) {
          // It's the same! Woohoo!
        }

        // Color transitions if possible
        else if (typeof value === 'string') {
          try {
            var color = helpers.color(this._start[key]).mix(helpers.color(this._model[key]), ease);
            this._view[key] = color.rgbString();
          } catch (err) {
            this._view[key] = value;
          }
        }
        // Number transitions
        else if (typeof value === 'number') {
          var startVal = this._start[key] !== undefined && isNaN(this._start[key]) === false ? this._start[key] : 0;
          this._view[key] = ((this._model[key] - startVal) * ease) + startVal;
        }
        // Everything else
        else {
          this._view[key] = value;
        }
      }, this);

      return this;
    },
    tooltipPosition: function() {
      return {
        x: this._model.x,
        y: this._model.y
      };
    },
    hasValue: function() {
      return helpers.isNumber(this._model.x) && helpers.isNumber(this._model.y);
    }
  });

  Chart.Element.extend = helpers.inherits;

};

},{}],25:[function(require,module,exports){
/*global window: false */
/*global document: false */
"use strict";

var color = require('chartjs-color');

module.exports = function(Chart) {

	//Global Chart helpers object for utility methods and classes
	var helpers = Chart.helpers = {};

	//-- Basic js utility methods
	helpers.each = function(loopable, callback, self, reverse) {
		// Check to see if null or undefined firstly.
		var i, len;
		if (helpers.isArray(loopable)) {
			len = loopable.length;
			if (reverse) {
				for (i = len - 1; i >= 0; i--) {
					callback.call(self, loopable[i], i);
				}
			} else {
				for (i = 0; i < len; i++) {
					callback.call(self, loopable[i], i);
				}
			}
		} else if (typeof loopable === 'object') {
			var keys = Object.keys(loopable);
			len = keys.length;
			for (i = 0; i < len; i++) {
				callback.call(self, loopable[keys[i]], keys[i]);
			}
		}
	};
	helpers.clone = function(obj) {
		var objClone = {};
		helpers.each(obj, function(value, key) {
			if (obj.hasOwnProperty(key)) {
				if (helpers.isArray(value)) {
					objClone[key] = value.slice(0);
				} else if (typeof value === 'object' && value !== null) {
					objClone[key] = helpers.clone(value);
				} else {
					objClone[key] = value;
				}
			}
		});
		return objClone;
	};
	helpers.extend = function(base) {
		var len = arguments.length;
		var additionalArgs = [];
		for (var i = 1; i < len; i++) {
			additionalArgs.push(arguments[i]);
		}
		helpers.each(additionalArgs, function(extensionObject) {
			helpers.each(extensionObject, function(value, key) {
				if (extensionObject.hasOwnProperty(key)) {
					base[key] = value;
				}
			});
		});
		return base;
	};
	// Need a special merge function to chart configs since they are now grouped
	helpers.configMerge = function(_base) {
		var base = helpers.clone(_base);
		helpers.each(Array.prototype.slice.call(arguments, 1), function(extension) {
			helpers.each(extension, function(value, key) {
				if (extension.hasOwnProperty(key)) {
					if (key === 'scales') {
						// Scale config merging is complex. Add out own function here for that
						base[key] = helpers.scaleMerge(base.hasOwnProperty(key) ? base[key] : {}, value);

					} else if (key === 'scale') {
						// Used in polar area & radar charts since there is only one scale
						base[key] = helpers.configMerge(base.hasOwnProperty(key) ? base[key] : {}, Chart.scaleService.getScaleDefaults(value.type), value);
					} else if (base.hasOwnProperty(key) && helpers.isArray(base[key]) && helpers.isArray(value)) {
						// In this case we have an array of objects replacing another array. Rather than doing a strict replace,
						// merge. This allows easy scale option merging
						var baseArray = base[key];

						helpers.each(value, function(valueObj, index) {

							if (index < baseArray.length) {
								if (typeof baseArray[index] === 'object' && baseArray[index] !== null && typeof valueObj === 'object' && valueObj !== null) {
									// Two objects are coming together. Do a merge of them.
									baseArray[index] = helpers.configMerge(baseArray[index], valueObj);
								} else {
									// Just overwrite in this case since there is nothing to merge
									baseArray[index] = valueObj;
								}
							} else {
								baseArray.push(valueObj); // nothing to merge
							}
						});

					} else if (base.hasOwnProperty(key) && typeof base[key] === "object" && base[key] !== null && typeof value === "object") {
						// If we are overwriting an object with an object, do a merge of the properties.
						base[key] = helpers.configMerge(base[key], value);

					} else {
						// can just overwrite the value in this case
						base[key] = value;
					}
				}
			});
		});

		return base;
	};
	helpers.extendDeep = function(_base) {
		return _extendDeep.apply(this, arguments);

		function _extendDeep(dst) {
			helpers.each(arguments, function(obj) {
				if (obj !== dst) {
					helpers.each(obj, function(value, key) {
						if (dst[key] && dst[key].constructor && dst[key].constructor === Object) {
							_extendDeep(dst[key], value);
						} else {
							dst[key] = value;
						}
					});
				}
			});
			return dst;
		}
	};
	helpers.scaleMerge = function(_base, extension) {
		var base = helpers.clone(_base);

		helpers.each(extension, function(value, key) {
			if (extension.hasOwnProperty(key)) {
				if (key === 'xAxes' || key === 'yAxes') {
					// These properties are arrays of items
					if (base.hasOwnProperty(key)) {
						helpers.each(value, function(valueObj, index) {
							var axisType = helpers.getValueOrDefault(valueObj.type, key === 'xAxes' ? 'category' : 'linear');
							var axisDefaults = Chart.scaleService.getScaleDefaults(axisType);
							if (index >= base[key].length || !base[key][index].type) {
								base[key].push(helpers.configMerge(axisDefaults, valueObj));
							} else if (valueObj.type && valueObj.type !== base[key][index].type) {
								// Type changed. Bring in the new defaults before we bring in valueObj so that valueObj can override the correct scale defaults
								base[key][index] = helpers.configMerge(base[key][index], axisDefaults, valueObj);
							} else {
								// Type is the same
								base[key][index] = helpers.configMerge(base[key][index], valueObj);
							}
						});
					} else {
						base[key] = [];
						helpers.each(value, function(valueObj) {
							var axisType = helpers.getValueOrDefault(valueObj.type, key === 'xAxes' ? 'category' : 'linear');
							base[key].push(helpers.configMerge(Chart.scaleService.getScaleDefaults(axisType), valueObj));
						});
					}
				} else if (base.hasOwnProperty(key) && typeof base[key] === "object" && base[key] !== null && typeof value === "object") {
					// If we are overwriting an object with an object, do a merge of the properties.
					base[key] = helpers.configMerge(base[key], value);

				} else {
					// can just overwrite the value in this case
					base[key] = value;
				}
			}
		});

		return base;
	};
	helpers.getValueAtIndexOrDefault = function(value, index, defaultValue) {
		if (value === undefined || value === null) {
			return defaultValue;
		}

		if (helpers.isArray(value)) {
			return index < value.length ? value[index] : defaultValue;
		}

		return value;
	};
	helpers.getValueOrDefault = function(value, defaultValue) {
		return value === undefined ? defaultValue : value;
	};
	helpers.indexOf = function(arrayToSearch, item) {
		if (Array.prototype.indexOf) {
			return arrayToSearch.indexOf(item);
		} else {
			for (var i = 0; i < arrayToSearch.length; i++) {
				if (arrayToSearch[i] === item)
					return i;
			}
			return -1;
		}
	};
	helpers.where = function(collection, filterCallback) {
		var filtered = [];

		helpers.each(collection, function(item) {
			if (filterCallback(item)) {
				filtered.push(item);
			}
		});

		return filtered;
	};
	helpers.findIndex = function(arrayToSearch, callback, thisArg) {
		var index = -1;
		if (Array.prototype.findIndex) {
			index = arrayToSearch.findIndex(callback, thisArg);
		} else {
			for (var i = 0; i < arrayToSearch.length; ++i) {
				thisArg = thisArg !== undefined ? thisArg : arrayToSearch;

				if (callback.call(thisArg, arrayToSearch[i], i, arrayToSearch)) {
					index = i;
					break;
				}
			}
		}

		return index;
	};
	helpers.findNextWhere = function(arrayToSearch, filterCallback, startIndex) {
		// Default to start of the array
		if (startIndex === undefined || startIndex === null) {
			startIndex = -1;
		}
		for (var i = startIndex + 1; i < arrayToSearch.length; i++) {
			var currentItem = arrayToSearch[i];
			if (filterCallback(currentItem)) {
				return currentItem;
			}
		}
	};
	helpers.findPreviousWhere = function(arrayToSearch, filterCallback, startIndex) {
		// Default to end of the array
		if (startIndex === undefined || startIndex === null) {
			startIndex = arrayToSearch.length;
		}
		for (var i = startIndex - 1; i >= 0; i--) {
			var currentItem = arrayToSearch[i];
			if (filterCallback(currentItem)) {
				return currentItem;
			}
		}
	};
	helpers.inherits = function(extensions) {
		//Basic javascript inheritance based on the model created in Backbone.js
		var parent = this;
		var ChartElement = (extensions && extensions.hasOwnProperty("constructor")) ? extensions.constructor : function() {
			return parent.apply(this, arguments);
		};

		var Surrogate = function() {
			this.constructor = ChartElement;
		};
		Surrogate.prototype = parent.prototype;
		ChartElement.prototype = new Surrogate();

		ChartElement.extend = helpers.inherits;

		if (extensions) {
			helpers.extend(ChartElement.prototype, extensions);
		}

		ChartElement.__super__ = parent.prototype;

		return ChartElement;
	};
	helpers.noop = function() {};
	helpers.uid = (function() {
		var id = 0;
		return function() {
			return "chart-" + id++;
		};
	})();
	helpers.warn = function(str) {
		//Method for warning of errors
		if (console && typeof console.warn === "function") {
			console.warn(str);
		}
	};
	//-- Math methods
	helpers.isNumber = function(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	};
	helpers.almostEquals = function(x, y, epsilon) {
		return Math.abs(x - y) < epsilon;
	};
	helpers.max = function(array) {
		return array.reduce(function(max, value) {
			if (!isNaN(value)) {
				return Math.max(max, value);
			} else {
				return max;
			}
		}, Number.NEGATIVE_INFINITY);
	};
	helpers.min = function(array) {
		return array.reduce(function(min, value) {
			if (!isNaN(value)) {
				return Math.min(min, value);
			} else {
				return min;
			}
		}, Number.POSITIVE_INFINITY);
	};
	helpers.sign = function(x) {
		if (Math.sign) {
			return Math.sign(x);
		} else {
			x = +x; // convert to a number
			if (x === 0 || isNaN(x)) {
				return x;
			}
			return x > 0 ? 1 : -1;
		}
	};
	helpers.log10 = function(x) {
		if (Math.log10) {
			return Math.log10(x);
		} else {
			return Math.log(x) / Math.LN10;
		}
	};
	helpers.toRadians = function(degrees) {
		return degrees * (Math.PI / 180);
	};
	helpers.toDegrees = function(radians) {
		return radians * (180 / Math.PI);
	};
	// Gets the angle from vertical upright to the point about a centre.
	helpers.getAngleFromPoint = function(centrePoint, anglePoint) {
		var distanceFromXCenter = anglePoint.x - centrePoint.x,
			distanceFromYCenter = anglePoint.y - centrePoint.y,
			radialDistanceFromCenter = Math.sqrt(distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);

		var angle = Math.atan2(distanceFromYCenter, distanceFromXCenter);

		if (angle < (-0.5 * Math.PI)) {
			angle += 2.0 * Math.PI; // make sure the returned angle is in the range of (-PI/2, 3PI/2]
		}

		return {
			angle: angle,
			distance: radialDistanceFromCenter
		};
	};
	helpers.aliasPixel = function(pixelWidth) {
		return (pixelWidth % 2 === 0) ? 0 : 0.5;
	};
	helpers.splineCurve = function(firstPoint, middlePoint, afterPoint, t) {
		//Props to Rob Spencer at scaled innovation for his post on splining between points
		//http://scaledinnovation.com/analytics/splines/aboutSplines.html

		// This function must also respect "skipped" points

		var previous = firstPoint.skip ? middlePoint : firstPoint,
			current = middlePoint,
			next = afterPoint.skip ? middlePoint : afterPoint;

		var d01 = Math.sqrt(Math.pow(current.x - previous.x, 2) + Math.pow(current.y - previous.y, 2));
		var d12 = Math.sqrt(Math.pow(next.x - current.x, 2) + Math.pow(next.y - current.y, 2));

		var s01 = d01 / (d01 + d12);
		var s12 = d12 / (d01 + d12);

		// If all points are the same, s01 & s02 will be inf
		s01 = isNaN(s01) ? 0 : s01;
		s12 = isNaN(s12) ? 0 : s12;

		var fa = t * s01; // scaling factor for triangle Ta
		var fb = t * s12;

		return {
			previous: {
				x: current.x - fa * (next.x - previous.x),
				y: current.y - fa * (next.y - previous.y)
			},
			next: {
				x: current.x + fb * (next.x - previous.x),
				y: current.y + fb * (next.y - previous.y)
			}
		};
	};
	helpers.nextItem = function(collection, index, loop) {
		if (loop) {
			return index >= collection.length - 1 ? collection[0] : collection[index + 1];
		}

		return index >= collection.length - 1 ? collection[collection.length - 1] : collection[index + 1];
	};
	helpers.previousItem = function(collection, index, loop) {
		if (loop) {
			return index <= 0 ? collection[collection.length - 1] : collection[index - 1];
		}
		return index <= 0 ? collection[0] : collection[index - 1];
	};
	// Implementation of the nice number algorithm used in determining where axis labels will go
	helpers.niceNum = function(range, round) {
		var exponent = Math.floor(helpers.log10(range));
		var fraction = range / Math.pow(10, exponent);
		var niceFraction;

		if (round) {
			if (fraction < 1.5) {
				niceFraction = 1;
			} else if (fraction < 3) {
				niceFraction = 2;
			} else if (fraction < 7) {
				niceFraction = 5;
			} else {
				niceFraction = 10;
			}
		} else {
			if (fraction <= 1.0) {
				niceFraction = 1;
			} else if (fraction <= 2) {
				niceFraction = 2;
			} else if (fraction <= 5) {
				niceFraction = 5;
			} else {
				niceFraction = 10;
			}
		}

		return niceFraction * Math.pow(10, exponent);
	};
	//Easing functions adapted from Robert Penner's easing equations
	//http://www.robertpenner.com/easing/
	var easingEffects = helpers.easingEffects = {
		linear: function(t) {
			return t;
		},
		easeInQuad: function(t) {
			return t * t;
		},
		easeOutQuad: function(t) {
			return -1 * t * (t - 2);
		},
		easeInOutQuad: function(t) {
			if ((t /= 1 / 2) < 1) {
				return 1 / 2 * t * t;
			}
			return -1 / 2 * ((--t) * (t - 2) - 1);
		},
		easeInCubic: function(t) {
			return t * t * t;
		},
		easeOutCubic: function(t) {
			return 1 * ((t = t / 1 - 1) * t * t + 1);
		},
		easeInOutCubic: function(t) {
			if ((t /= 1 / 2) < 1) {
				return 1 / 2 * t * t * t;
			}
			return 1 / 2 * ((t -= 2) * t * t + 2);
		},
		easeInQuart: function(t) {
			return t * t * t * t;
		},
		easeOutQuart: function(t) {
			return -1 * ((t = t / 1 - 1) * t * t * t - 1);
		},
		easeInOutQuart: function(t) {
			if ((t /= 1 / 2) < 1) {
				return 1 / 2 * t * t * t * t;
			}
			return -1 / 2 * ((t -= 2) * t * t * t - 2);
		},
		easeInQuint: function(t) {
			return 1 * (t /= 1) * t * t * t * t;
		},
		easeOutQuint: function(t) {
			return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
		},
		easeInOutQuint: function(t) {
			if ((t /= 1 / 2) < 1) {
				return 1 / 2 * t * t * t * t * t;
			}
			return 1 / 2 * ((t -= 2) * t * t * t * t + 2);
		},
		easeInSine: function(t) {
			return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1;
		},
		easeOutSine: function(t) {
			return 1 * Math.sin(t / 1 * (Math.PI / 2));
		},
		easeInOutSine: function(t) {
			return -1 / 2 * (Math.cos(Math.PI * t / 1) - 1);
		},
		easeInExpo: function(t) {
			return (t === 0) ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
		},
		easeOutExpo: function(t) {
			return (t === 1) ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1);
		},
		easeInOutExpo: function(t) {
			if (t === 0) {
				return 0;
			}
			if (t === 1) {
				return 1;
			}
			if ((t /= 1 / 2) < 1) {
				return 1 / 2 * Math.pow(2, 10 * (t - 1));
			}
			return 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
		},
		easeInCirc: function(t) {
			if (t >= 1) {
				return t;
			}
			return -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
		},
		easeOutCirc: function(t) {
			return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t);
		},
		easeInOutCirc: function(t) {
			if ((t /= 1 / 2) < 1) {
				return -1 / 2 * (Math.sqrt(1 - t * t) - 1);
			}
			return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
		},
		easeInElastic: function(t) {
			var s = 1.70158;
			var p = 0;
			var a = 1;
			if (t === 0) {
				return 0;
			}
			if ((t /= 1) === 1) {
				return 1;
			}
			if (!p) {
				p = 1 * 0.3;
			}
			if (a < Math.abs(1)) {
				a = 1;
				s = p / 4;
			} else {
				s = p / (2 * Math.PI) * Math.asin(1 / a);
			}
			return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
		},
		easeOutElastic: function(t) {
			var s = 1.70158;
			var p = 0;
			var a = 1;
			if (t === 0) {
				return 0;
			}
			if ((t /= 1) === 1) {
				return 1;
			}
			if (!p) {
				p = 1 * 0.3;
			}
			if (a < Math.abs(1)) {
				a = 1;
				s = p / 4;
			} else {
				s = p / (2 * Math.PI) * Math.asin(1 / a);
			}
			return a * Math.pow(2, -10 * t) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) + 1;
		},
		easeInOutElastic: function(t) {
			var s = 1.70158;
			var p = 0;
			var a = 1;
			if (t === 0) {
				return 0;
			}
			if ((t /= 1 / 2) === 2) {
				return 1;
			}
			if (!p) {
				p = 1 * (0.3 * 1.5);
			}
			if (a < Math.abs(1)) {
				a = 1;
				s = p / 4;
			} else {
				s = p / (2 * Math.PI) * Math.asin(1 / a);
			}
			if (t < 1) {
				return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
			}
			return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) * 0.5 + 1;
		},
		easeInBack: function(t) {
			var s = 1.70158;
			return 1 * (t /= 1) * t * ((s + 1) * t - s);
		},
		easeOutBack: function(t) {
			var s = 1.70158;
			return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
		},
		easeInOutBack: function(t) {
			var s = 1.70158;
			if ((t /= 1 / 2) < 1) {
				return 1 / 2 * (t * t * (((s *= (1.525)) + 1) * t - s));
			}
			return 1 / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
		},
		easeInBounce: function(t) {
			return 1 - easingEffects.easeOutBounce(1 - t);
		},
		easeOutBounce: function(t) {
			if ((t /= 1) < (1 / 2.75)) {
				return 1 * (7.5625 * t * t);
			} else if (t < (2 / 2.75)) {
				return 1 * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75);
			} else if (t < (2.5 / 2.75)) {
				return 1 * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375);
			} else {
				return 1 * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375);
			}
		},
		easeInOutBounce: function(t) {
			if (t < 1 / 2) {
				return easingEffects.easeInBounce(t * 2) * 0.5;
			}
			return easingEffects.easeOutBounce(t * 2 - 1) * 0.5 + 1 * 0.5;
		}
	};
	//Request animation polyfill - http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
	helpers.requestAnimFrame = (function() {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(callback) {
				return window.setTimeout(callback, 1000 / 60);
			};
	})();
	helpers.cancelAnimFrame = (function() {
		return window.cancelAnimationFrame ||
			window.webkitCancelAnimationFrame ||
			window.mozCancelAnimationFrame ||
			window.oCancelAnimationFrame ||
			window.msCancelAnimationFrame ||
			function(callback) {
				return window.clearTimeout(callback, 1000 / 60);
			};
	})();
	//-- DOM methods
	helpers.getRelativePosition = function(evt, chart) {
		var mouseX, mouseY;
		var e = evt.originalEvent || evt,
			canvas = evt.currentTarget || evt.srcElement,
			boundingRect = canvas.getBoundingClientRect();

		if (e.touches && e.touches.length > 0) {
			mouseX = e.touches[0].clientX;
			mouseY = e.touches[0].clientY;

		} else {
			mouseX = e.clientX;
			mouseY = e.clientY;
		}

		// Scale mouse coordinates into canvas coordinates
		// by following the pattern laid out by 'jerryj' in the comments of
		// http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
		var paddingLeft = parseFloat(helpers.getStyle(canvas, 'padding-left'));
		var paddingTop = parseFloat(helpers.getStyle(canvas, 'padding-top'));
		var paddingRight = parseFloat(helpers.getStyle(canvas, 'padding-right'));
		var paddingBottom = parseFloat(helpers.getStyle(canvas, 'padding-bottom'));
		var width = boundingRect.right - boundingRect.left - paddingLeft - paddingRight;
		var height = boundingRect.bottom - boundingRect.top - paddingTop - paddingBottom;

		// We divide by the current device pixel ratio, because the canvas is scaled up by that amount in each direction. However
		// the backend model is in unscaled coordinates. Since we are going to deal with our model coordinates, we go back here
		mouseX = Math.round((mouseX - boundingRect.left - paddingLeft) / (width) * canvas.width / chart.currentDevicePixelRatio);
		mouseY = Math.round((mouseY - boundingRect.top - paddingTop) / (height) * canvas.height / chart.currentDevicePixelRatio);

		return {
			x: mouseX,
			y: mouseY
		};

	};
	helpers.addEvent = function(node, eventType, method) {
		if (node.addEventListener) {
			node.addEventListener(eventType, method);
		} else if (node.attachEvent) {
			node.attachEvent("on" + eventType, method);
		} else {
			node["on" + eventType] = method;
		}
	};
	helpers.removeEvent = function(node, eventType, handler) {
		if (node.removeEventListener) {
			node.removeEventListener(eventType, handler, false);
		} else if (node.detachEvent) {
			node.detachEvent("on" + eventType, handler);
		} else {
			node["on" + eventType] = helpers.noop;
		}
	};
	helpers.bindEvents = function(chartInstance, arrayOfEvents, handler) {
		// Create the events object if it's not already present
		if (!chartInstance.events)
			chartInstance.events = {};

		helpers.each(arrayOfEvents, function(eventName) {
			chartInstance.events[eventName] = function() {
				handler.apply(chartInstance, arguments);
			};
			helpers.addEvent(chartInstance.chart.canvas, eventName, chartInstance.events[eventName]);
		});
	};
	helpers.unbindEvents = function(chartInstance, arrayOfEvents) {
		helpers.each(arrayOfEvents, function(handler, eventName) {
			helpers.removeEvent(chartInstance.chart.canvas, eventName, handler);
		});
	};

	// Private helper function to convert max-width/max-height values that may be percentages into a number
	function parseMaxStyle(styleValue, node, parentProperty) {
		var valueInPixels;
		if (typeof(styleValue) === 'string') {
			valueInPixels = parseInt(styleValue, 10);

			if (styleValue.indexOf('%') != -1) {
				// percentage * size in dimension
				valueInPixels = valueInPixels / 100 * node.parentNode[parentProperty];
			}
		} else {
			valueInPixels = styleValue;
		}

		return valueInPixels;
	}

	// Private helper to get a constraint dimension
	// @param domNode : the node to check the constraint on
	// @param maxStyle : the style that defines the maximum for the direction we are using (max-width / max-height)
	// @param percentageProperty : property of parent to use when calculating width as a percentage
	function getConstraintDimension(domNode, maxStyle, percentageProperty) {
		var constrainedDimension;
		var constrainedNode = document.defaultView.getComputedStyle(domNode)[maxStyle];
		var constrainedContainer = document.defaultView.getComputedStyle(domNode.parentNode)[maxStyle];
		var hasCNode = constrainedNode !== null && constrainedNode !== "none";
		var hasCContainer = constrainedContainer !== null && constrainedContainer !== "none";

		if (hasCNode || hasCContainer) {
			constrainedDimension = Math.min((hasCNode ? parseMaxStyle(constrainedNode, domNode, percentageProperty) : Number.POSITIVE_INFINITY), (hasCContainer ? parseMaxStyle(constrainedContainer, domNode.parentNode, percentageProperty) : Number.POSITIVE_INFINITY));
		}
		return constrainedDimension;
	}
	// returns Number or undefined if no constraint
	helpers.getConstraintWidth = function(domNode) {
		return getConstraintDimension(domNode, 'max-width', 'clientWidth');
	};
	// returns Number or undefined if no constraint
	helpers.getConstraintHeight = function(domNode) {
		return getConstraintDimension(domNode, 'max-height', 'clientHeight');
	};
	helpers.getMaximumWidth = function(domNode) {
		var container = domNode.parentNode;
		var padding = parseInt(helpers.getStyle(container, 'padding-left')) + parseInt(helpers.getStyle(container, 'padding-right'));

		var w = container.clientWidth - padding;
		var cw = helpers.getConstraintWidth(domNode);
		if (cw !== undefined) {
			w = Math.min(w, cw);
		}

		return w;
	};
	helpers.getMaximumHeight = function(domNode) {
		var container = domNode.parentNode;
		var padding = parseInt(helpers.getStyle(container, 'padding-top')) + parseInt(helpers.getStyle(container, 'padding-bottom'));

		var h = container.clientHeight - padding;
		var ch = helpers.getConstraintHeight(domNode);
		if (ch !== undefined) {
			h = Math.min(h, ch);
		}

		return h;
	};
	helpers.getStyle = function(el, property) {
		return el.currentStyle ?
			el.currentStyle[property] :
			document.defaultView.getComputedStyle(el, null).getPropertyValue(property);
	};
	helpers.retinaScale = function(chart) {
		var ctx = chart.ctx;
		var width = chart.canvas.width;
		var height = chart.canvas.height;
		var pixelRatio = chart.currentDevicePixelRatio = window.devicePixelRatio || 1;

		if (pixelRatio !== 1) {
			ctx.canvas.height = height * pixelRatio;
			ctx.canvas.width = width * pixelRatio;
			ctx.scale(pixelRatio, pixelRatio);

			// Store the device pixel ratio so that we can go backwards in `destroy`.
			// The devicePixelRatio changes with zoom, so there are no guarantees that it is the same
			// when destroy is called
			chart.originalDevicePixelRatio = chart.originalDevicePixelRatio || pixelRatio;
		}

		ctx.canvas.style.width = width + 'px';
		ctx.canvas.style.height = height + 'px';
	};
	//-- Canvas methods
	helpers.clear = function(chart) {
		chart.ctx.clearRect(0, 0, chart.width, chart.height);
	};
	helpers.fontString = function(pixelSize, fontStyle, fontFamily) {
		return fontStyle + " " + pixelSize + "px " + fontFamily;
	};
	helpers.longestText = function(ctx, font, arrayOfStrings, cache) {
		cache = cache || {};
		cache.data = cache.data || {};
		cache.garbageCollect = cache.garbageCollect || [];

		if (cache.font !== font) {
			cache.data = {};
			cache.garbageCollect = [];
			cache.font = font;
		}

		ctx.font = font;
		var longest = 0;
		helpers.each(arrayOfStrings, function(string) {
			var textWidth = cache.data[string];
			if (!textWidth) {
				textWidth = cache.data[string] = ctx.measureText(string).width;
				cache.garbageCollect.push(string);
			}
			if (textWidth > longest)
				longest = textWidth;
		});

		var gcLen = cache.garbageCollect.length / 2;
		if (gcLen > arrayOfStrings.length) {
			for (var i = 0; i < gcLen; i++) {
				delete cache.data[cache.garbageCollect[i]];
			}
			cache.garbageCollect.splice(0, gcLen);
		}

		return longest;
	};
	helpers.drawRoundedRectangle = function(ctx, x, y, width, height, radius) {
		ctx.beginPath();
		ctx.moveTo(x + radius, y);
		ctx.lineTo(x + width - radius, y);
		ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
		ctx.lineTo(x + width, y + height - radius);
		ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
		ctx.lineTo(x + radius, y + height);
		ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
		ctx.lineTo(x, y + radius);
		ctx.quadraticCurveTo(x, y, x + radius, y);
		ctx.closePath();
	};
	helpers.color = function(c) {
		if (!color) {
			console.log('Color.js not found!');
			return c;
		}
		return color(c);
	};
	helpers.addResizeListener = function(node, callback) {
		// Hide an iframe before the node
		var hiddenIframe = document.createElement('iframe');
		var hiddenIframeClass = 'chartjs-hidden-iframe';

		if (hiddenIframe.classlist) {
			// can use classlist
			hiddenIframe.classlist.add(hiddenIframeClass);
		} else {
			hiddenIframe.setAttribute('class', hiddenIframeClass);
		}

		// Set the style
		hiddenIframe.style.width = '100%';
		hiddenIframe.style.display = 'block';
		hiddenIframe.style.border = 0;
		hiddenIframe.style.height = 0;
		hiddenIframe.style.margin = 0;
		hiddenIframe.style.position = 'absolute';
		hiddenIframe.style.left = 0;
		hiddenIframe.style.right = 0;
		hiddenIframe.style.top = 0;
		hiddenIframe.style.bottom = 0;

		// Insert the iframe so that contentWindow is available
		node.insertBefore(hiddenIframe, node.firstChild);

		(hiddenIframe.contentWindow || hiddenIframe).onresize = function() {
			if (callback) {
				callback();
			}
		};
	};
	helpers.removeResizeListener = function(node) {
		var hiddenIframe = node.querySelector('.chartjs-hidden-iframe');

		// Remove the resize detect iframe
		if (hiddenIframe) {
			hiddenIframe.parentNode.removeChild(hiddenIframe);
		}
	};
	helpers.isArray = function(obj) {
		if (!Array.isArray) {
			return Object.prototype.toString.call(obj) === '[object Array]';
		}
		return Array.isArray(obj);
	};
	helpers.pushAllIfDefined = function(element, array) {
		if (typeof element === "undefined") {
			return;
		}

		if (helpers.isArray(element)) {
			array.push.apply(array, element);
		} else {
			array.push(element);
		}
	};
	helpers.isDatasetVisible = function(dataset) {
		return !dataset.hidden;
	};
	helpers.callCallback = function(fn, args, _tArg) {
		if (fn && typeof fn.call === 'function') {
			fn.apply(_tArg, args);
		}
	};

};
},{"chartjs-color":5}],26:[function(require,module,exports){
"use strict";

module.exports = function() {

	//Occupy the global variable of Chart, and create a simple base class
	var Chart = function(context, config) {
		this.config = config;

		// Support a jQuery'd canvas element
		if (context.length && context[0].getContext) {
			context = context[0];
		}

		// Support a canvas domnode
		if (context.getContext) {
			context = context.getContext("2d");
		}

		this.ctx = context;
		this.canvas = context.canvas;

		// Figure out what the size of the chart will be.
		// If the canvas has a specified width and height, we use those else
		// we look to see if the canvas node has a CSS width and height.
		// If there is still no height, fill the parent container
		this.width = context.canvas.width || parseInt(Chart.helpers.getStyle(context.canvas, 'width')) || Chart.helpers.getMaximumWidth(context.canvas);
		this.height = context.canvas.height || parseInt(Chart.helpers.getStyle(context.canvas, 'height')) || Chart.helpers.getMaximumHeight(context.canvas);

		this.aspectRatio = this.width / this.height;

		if (isNaN(this.aspectRatio) || isFinite(this.aspectRatio) === false) {
			// If the canvas has no size, try and figure out what the aspect ratio will be.
			// Some charts prefer square canvases (pie, radar, etc). If that is specified, use that
			// else use the canvas default ratio of 2
			this.aspectRatio = config.aspectRatio !== undefined ? config.aspectRatio : 2;
		}

		// Store the original style of the element so we can set it back
		this.originalCanvasStyleWidth = context.canvas.style.width;
		this.originalCanvasStyleHeight = context.canvas.style.height;

		// High pixel density displays - multiply the size of the canvas height/width by the device pixel ratio, then scale.
		Chart.helpers.retinaScale(this);

		if (config) {
			this.controller = new Chart.Controller(this);
		}

		// Always bind this so that if the responsive state changes we still work
		var _this = this;
		Chart.helpers.addResizeListener(context.canvas.parentNode, function() {
			if (_this.controller && _this.controller.config.options.responsive) {
				_this.controller.resize();
			}
		});

		return this.controller ? this.controller : this;

	};

	//Globally expose the defaults to allow for user updating/changing
	Chart.defaults = {
		global: {
			responsive: true,
			responsiveAnimationDuration: 0,
			maintainAspectRatio: true,
			events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
			hover: {
				onHover: null,
				mode: 'single',
				animationDuration: 400
			},
			onClick: null,
			defaultColor: 'rgba(0,0,0,0.1)',
			defaultFontColor: '#666',
			defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
			defaultFontSize: 12,
			defaultFontStyle: 'normal',
			showLines: true,

			// Element defaults defined in element extensions
			elements: {},

			// Legend callback string
			legendCallback: function(chart) {
				var text = [];
				text.push('<ul class="' + chart.id + '-legend">');
				for (var i = 0; i < chart.data.datasets.length; i++) {
					text.push('<li><span style="background-color:' + chart.data.datasets[i].backgroundColor + '">');
					if (chart.data.datasets[i].label) {
						text.push(chart.data.datasets[i].label);
					}
					text.push('</span></li>');
				}
				text.push('</ul>');

				return text.join("");
			}
		}
	};

	return Chart;

};
},{}],27:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	// The layout service is very self explanatory.  It's responsible for the layout within a chart.
	// Scales, Legends and Plugins all rely on the layout service and can easily register to be placed anywhere they need
	// It is this service's responsibility of carrying out that layout.
	Chart.layoutService = {
		defaults: {},

		// Register a box to a chartInstance. A box is simply a reference to an object that requires layout. eg. Scales, Legend, Plugins.
		addBox: function(chartInstance, box) {
			if (!chartInstance.boxes) {
				chartInstance.boxes = [];
			}
			chartInstance.boxes.push(box);
		},

		removeBox: function(chartInstance, box) {
			if (!chartInstance.boxes) {
				return;
			}
			chartInstance.boxes.splice(chartInstance.boxes.indexOf(box), 1);
		},

		// The most important function
		update: function(chartInstance, width, height) {

			if (!chartInstance) {
				return;
			}

			var xPadding = 0;
			var yPadding = 0;

			var leftBoxes = helpers.where(chartInstance.boxes, function(box) {
				return box.options.position === "left";
			});
			var rightBoxes = helpers.where(chartInstance.boxes, function(box) {
				return box.options.position === "right";
			});
			var topBoxes = helpers.where(chartInstance.boxes, function(box) {
				return box.options.position === "top";
			});
			var bottomBoxes = helpers.where(chartInstance.boxes, function(box) {
				return box.options.position === "bottom";
			});

			// Boxes that overlay the chartarea such as the radialLinear scale
			var chartAreaBoxes = helpers.where(chartInstance.boxes, function(box) {
				return box.options.position === "chartArea";
			});

			function fullWidthSorter(a, b) {

			}

			// Ensure that full width boxes are at the very top / bottom
			topBoxes.sort(function(a, b) {
				return (b.options.fullWidth ? 1 : 0) - (a.options.fullWidth ? 1 : 0);
			});
			bottomBoxes.sort(function(a, b) {
				return (a.options.fullWidth ? 1 : 0) - (b.options.fullWidth ? 1 : 0);
			});

			// Essentially we now have any number of boxes on each of the 4 sides.
			// Our canvas looks like the following.
			// The areas L1 and L2 are the left axes. R1 is the right axis, T1 is the top axis and
			// B1 is the bottom axis
			// There are also 4 quadrant-like locations (left to right instead of clockwise) reserved for chart overlays
			// These locations are single-box locations only, when trying to register a chartArea location that is already taken,
			// an error will be thrown.
			//
			// |----------------------------------------------------|
			// |                  T1 (Full Width)                   |
			// |----------------------------------------------------|
			// |    |    |                 T2                  |    |
			// |    |----|-------------------------------------|----|
			// |    |    | C1 |                           | C2 |    |
			// |    |    |----|                           |----|    |
			// |    |    |                                     |    |
			// | L1 | L2 |           ChartArea (C0)            | R1 |
			// |    |    |                                     |    |
			// |    |    |----|                           |----|    |
			// |    |    | C3 |                           | C4 |    |
			// |    |----|-------------------------------------|----|
			// |    |    |                 B1                  |    |
			// |----------------------------------------------------|
			// |                  B2 (Full Width)                   |
			// |----------------------------------------------------|
			//
			// What we do to find the best sizing, we do the following
			// 1. Determine the minimum size of the chart area.
			// 2. Split the remaining width equally between each vertical axis
			// 3. Split the remaining height equally between each horizontal axis
			// 4. Give each layout the maximum size it can be. The layout will return it's minimum size
			// 5. Adjust the sizes of each axis based on it's minimum reported size.
			// 6. Refit each axis
			// 7. Position each axis in the final location
			// 8. Tell the chart the final location of the chart area
			// 9. Tell any axes that overlay the chart area the positions of the chart area

			// Step 1
			var chartWidth = width - (2 * xPadding);
			var chartHeight = height - (2 * yPadding);
			var chartAreaWidth = chartWidth / 2; // min 50%
			var chartAreaHeight = chartHeight / 2; // min 50%

			// Step 2
			var verticalBoxWidth = (width - chartAreaWidth) / (leftBoxes.length + rightBoxes.length);

			// Step 3
			var horizontalBoxHeight = (height - chartAreaHeight) / (topBoxes.length + bottomBoxes.length);

			// Step 4
			var maxChartAreaWidth = chartWidth;
			var maxChartAreaHeight = chartHeight;
			var minBoxSizes = [];

			helpers.each(leftBoxes.concat(rightBoxes, topBoxes, bottomBoxes), getMinimumBoxSize);

			function getMinimumBoxSize(box) {
				var minSize;
				var isHorizontal = box.isHorizontal();

				if (isHorizontal) {
					minSize = box.update(box.options.fullWidth ? chartWidth : maxChartAreaWidth, horizontalBoxHeight);
					maxChartAreaHeight -= minSize.height;
				} else {
					minSize = box.update(verticalBoxWidth, chartAreaHeight);
					maxChartAreaWidth -= minSize.width;
				}

				minBoxSizes.push({
					horizontal: isHorizontal,
					minSize: minSize,
					box: box
				});
			}

			// At this point, maxChartAreaHeight and maxChartAreaWidth are the size the chart area could
			// be if the axes are drawn at their minimum sizes.

			// Steps 5 & 6
			var totalLeftBoxesWidth = xPadding;
			var totalRightBoxesWidth = xPadding;
			var totalTopBoxesHeight = yPadding;
			var totalBottomBoxesHeight = yPadding;

			// Update, and calculate the left and right margins for the horizontal boxes
			helpers.each(leftBoxes.concat(rightBoxes), fitBox);

			helpers.each(leftBoxes, function(box) {
				totalLeftBoxesWidth += box.width;
			});

			helpers.each(rightBoxes, function(box) {
				totalRightBoxesWidth += box.width;
			});

			// Set the Left and Right margins for the horizontal boxes
			helpers.each(topBoxes.concat(bottomBoxes), fitBox);

			// Function to fit a box
			function fitBox(box) {
				var minBoxSize = helpers.findNextWhere(minBoxSizes, function(minBoxSize) {
					return minBoxSize.box === box;
				});

				if (minBoxSize) {
					if (box.isHorizontal()) {
						var scaleMargin = {
							left: totalLeftBoxesWidth,
							right: totalRightBoxesWidth,
							top: 0,
							bottom: 0
						};

						// Don't use min size here because of label rotation. When the labels are rotated, their rotation highly depends
						// on the margin. Sometimes they need to increase in size slightly
						box.update(box.options.fullWidth ? chartWidth : maxChartAreaWidth, chartHeight / 2, scaleMargin);
					} else {
						box.update(minBoxSize.minSize.width, maxChartAreaHeight);
					}
				}
			}

			// Figure out how much margin is on the top and bottom of the vertical boxes
			helpers.each(topBoxes, function(box) {
				totalTopBoxesHeight += box.height;
			});

			helpers.each(bottomBoxes, function(box) {
				totalBottomBoxesHeight += box.height;
			});

			// Let the left layout know the final margin
			helpers.each(leftBoxes.concat(rightBoxes), finalFitVerticalBox);

			function finalFitVerticalBox(box) {
				var minBoxSize = helpers.findNextWhere(minBoxSizes, function(minBoxSize) {
					return minBoxSize.box === box;
				});

				var scaleMargin = {
					left: 0,
					right: 0,
					top: totalTopBoxesHeight,
					bottom: totalBottomBoxesHeight
				};

				if (minBoxSize) {
					box.update(minBoxSize.minSize.width, maxChartAreaHeight, scaleMargin);
				}
			}

			// Recalculate because the size of each layout might have changed slightly due to the margins (label rotation for instance)
			totalLeftBoxesWidth = xPadding;
			totalRightBoxesWidth = xPadding;
			totalTopBoxesHeight = yPadding;
			totalBottomBoxesHeight = yPadding;

			helpers.each(leftBoxes, function(box) {
				totalLeftBoxesWidth += box.width;
			});

			helpers.each(rightBoxes, function(box) {
				totalRightBoxesWidth += box.width;
			});

			helpers.each(topBoxes, function(box) {
				totalTopBoxesHeight += box.height;
			});
			helpers.each(bottomBoxes, function(box) {
				totalBottomBoxesHeight += box.height;
			});

			// Figure out if our chart area changed. This would occur if the dataset layout label rotation
			// changed due to the application of the margins in step 6. Since we can only get bigger, this is safe to do
			// without calling `fit` again
			var newMaxChartAreaHeight = height - totalTopBoxesHeight - totalBottomBoxesHeight;
			var newMaxChartAreaWidth = width - totalLeftBoxesWidth - totalRightBoxesWidth;

			if (newMaxChartAreaWidth !== maxChartAreaWidth || newMaxChartAreaHeight !== maxChartAreaHeight) {
				helpers.each(leftBoxes, function(box) {
					box.height = newMaxChartAreaHeight;
				});

				helpers.each(rightBoxes, function(box) {
					box.height = newMaxChartAreaHeight;
				});

				helpers.each(topBoxes, function(box) {
					box.width = newMaxChartAreaWidth;
				});

				helpers.each(bottomBoxes, function(box) {
					box.width = newMaxChartAreaWidth;
				});

				maxChartAreaHeight = newMaxChartAreaHeight;
				maxChartAreaWidth = newMaxChartAreaWidth;
			}

			// Step 7 - Position the boxes
			var left = xPadding;
			var top = yPadding;
			var right = 0;
			var bottom = 0;

			helpers.each(leftBoxes.concat(topBoxes), placeBox);

			// Account for chart width and height
			left += maxChartAreaWidth;
			top += maxChartAreaHeight;

			helpers.each(rightBoxes, placeBox);
			helpers.each(bottomBoxes, placeBox);

			function placeBox(box) {
				if (box.isHorizontal()) {
					box.left = box.options.fullWidth ? xPadding : totalLeftBoxesWidth;
					box.right = box.options.fullWidth ? width - xPadding : totalLeftBoxesWidth + maxChartAreaWidth;
					box.top = top;
					box.bottom = top + box.height;

					// Move to next point
					top = box.bottom;

				} else {

					box.left = left;
					box.right = left + box.width;
					box.top = totalTopBoxesHeight;
					box.bottom = totalTopBoxesHeight + maxChartAreaHeight;

					// Move to next point
					left = box.right;
				}
			}

			// Step 8
			chartInstance.chartArea = {
				left: totalLeftBoxesWidth,
				top: totalTopBoxesHeight,
				right: totalLeftBoxesWidth + maxChartAreaWidth,
				bottom: totalTopBoxesHeight + maxChartAreaHeight
			};

			// Step 9
			helpers.each(chartAreaBoxes, function(box) {
				box.left = chartInstance.chartArea.left;
				box.top = chartInstance.chartArea.top;
				box.right = chartInstance.chartArea.right;
				box.bottom = chartInstance.chartArea.bottom;

				box.update(maxChartAreaWidth, maxChartAreaHeight);
			});
		}
	};
};

},{}],28:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	Chart.defaults.global.legend = {

		display: true,
		position: 'top',
		fullWidth: true, // marks that this box should take the full width of the canvas (pushing down other boxes)
		reverse: false,

		// a callback that will handle
		onClick: function(e, legendItem) {
			var dataset = this.chart.data.datasets[legendItem.datasetIndex];
			dataset.hidden = !dataset.hidden;

			// We hid a dataset ... rerender the chart
			this.chart.update();
		},

		labels: {
			boxWidth: 40,
			padding: 10,
			// Generates labels shown in the legend
			// Valid properties to return:
			// text : text to display
			// fillStyle : fill of coloured box
			// strokeStyle: stroke of coloured box
			// hidden : if this legend item refers to a hidden item
			// lineCap : cap style for line
			// lineDash
			// lineDashOffset :
			// lineJoin :
			// lineWidth :
			generateLabels: function(data) {
				return helpers.isArray(data.datasets) ? data.datasets.map(function(dataset, i) {
					return {
						text: dataset.label,
						fillStyle: dataset.backgroundColor,
						hidden: dataset.hidden,
						lineCap: dataset.borderCapStyle,
						lineDash: dataset.borderDash,
						lineDashOffset: dataset.borderDashOffset,
						lineJoin: dataset.borderJoinStyle,
						lineWidth: dataset.borderWidth,
						strokeStyle: dataset.borderColor,

						// Below is extra data used for toggling the datasets
						datasetIndex: i
					};
				}, this) : [];
			}
		}
	};

	Chart.Legend = Chart.Element.extend({

		initialize: function(config) {
			helpers.extend(this, config);

			// Contains hit boxes for each dataset (in dataset order)
			this.legendHitBoxes = [];

			// Are we in doughnut mode which has a different data type
			this.doughnutMode = false;
		},

		// These methods are ordered by lifecyle. Utilities then follow.
		// Any function defined here is inherited by all legend types.
		// Any function can be extended by the legend type

		beforeUpdate: helpers.noop,
		update: function(maxWidth, maxHeight, margins) {

			// Update Lifecycle - Probably don't want to ever extend or overwrite this function ;)
			this.beforeUpdate();

			// Absorb the master measurements
			this.maxWidth = maxWidth;
			this.maxHeight = maxHeight;
			this.margins = margins;

			// Dimensions
			this.beforeSetDimensions();
			this.setDimensions();
			this.afterSetDimensions();
			// Labels
			this.beforeBuildLabels();
			this.buildLabels();
			this.afterBuildLabels();

			// Fit
			this.beforeFit();
			this.fit();
			this.afterFit();
			//
			this.afterUpdate();

			return this.minSize;

		},
		afterUpdate: helpers.noop,

		//

		beforeSetDimensions: helpers.noop,
		setDimensions: function() {
			// Set the unconstrained dimension before label rotation
			if (this.isHorizontal()) {
				// Reset position before calculating rotation
				this.width = this.maxWidth;
				this.left = 0;
				this.right = this.width;
			} else {
				this.height = this.maxHeight;

				// Reset position before calculating rotation
				this.top = 0;
				this.bottom = this.height;
			}

			// Reset padding
			this.paddingLeft = 0;
			this.paddingTop = 0;
			this.paddingRight = 0;
			this.paddingBottom = 0;

			// Reset minSize
			this.minSize = {
				width: 0,
				height: 0
			};
		},
		afterSetDimensions: helpers.noop,

		//

		beforeBuildLabels: helpers.noop,
		buildLabels: function() {
			this.legendItems = this.options.labels.generateLabels.call(this, this.chart.data);
			if(this.options.reverse){
				this.legendItems.reverse();
			}
		},
		afterBuildLabels: helpers.noop,

		//

		beforeFit: helpers.noop,
		fit: function() {

			var ctx = this.ctx;
			var fontSize = helpers.getValueOrDefault(this.options.labels.fontSize, Chart.defaults.global.defaultFontSize);
			var fontStyle = helpers.getValueOrDefault(this.options.labels.fontStyle, Chart.defaults.global.defaultFontStyle);
			var fontFamily = helpers.getValueOrDefault(this.options.labels.fontFamily, Chart.defaults.global.defaultFontFamily);
			var labelFont = helpers.fontString(fontSize, fontStyle, fontFamily);

			// Reset hit boxes
			this.legendHitBoxes = [];

			// Width
			if (this.isHorizontal()) {
				this.minSize.width = this.maxWidth; // fill all the width
			} else {
				this.minSize.width = this.options.display ? 10 : 0;
			}

			// height
			if (this.isHorizontal()) {
				this.minSize.height = this.options.display ? 10 : 0;
			} else {
				this.minSize.height = this.maxHeight; // fill all the height
			}

			// Increase sizes here
			if (this.options.display) {
				if (this.isHorizontal()) {
					// Labels

					// Width of each line of legend boxes. Labels wrap onto multiple lines when there are too many to fit on one
					this.lineWidths = [0];
					var totalHeight = this.legendItems.length ? fontSize + (this.options.labels.padding) : 0;

					ctx.textAlign = "left";
					ctx.textBaseline = 'top';
					ctx.font = labelFont;

					helpers.each(this.legendItems, function(legendItem, i) {
						var width = this.options.labels.boxWidth + (fontSize / 2) + ctx.measureText(legendItem.text).width;
						if (this.lineWidths[this.lineWidths.length - 1] + width + this.options.labels.padding >= this.width) {
							totalHeight += fontSize + (this.options.labels.padding);
							this.lineWidths[this.lineWidths.length] = this.left;
						}

						// Store the hitbox width and height here. Final position will be updated in `draw`
						this.legendHitBoxes[i] = {
							left: 0,
							top: 0,
							width: width,
							height: fontSize
						};

						this.lineWidths[this.lineWidths.length - 1] += width + this.options.labels.padding;
					}, this);

					this.minSize.height += totalHeight;

				} else {
					// TODO vertical
				}
			}

			this.width = this.minSize.width;
			this.height = this.minSize.height;

		},
		afterFit: helpers.noop,

		// Shared Methods
		isHorizontal: function() {
			return this.options.position === "top" || this.options.position === "bottom";
		},

		// Actualy draw the legend on the canvas
		draw: function() {
			if (this.options.display) {
				var ctx = this.ctx;
				var cursor = {
					x: this.left + ((this.width - this.lineWidths[0]) / 2),
					y: this.top + this.options.labels.padding,
					line: 0
				};

				var fontColor = helpers.getValueOrDefault(this.options.labels.fontColor, Chart.defaults.global.defaultFontColor);
				var fontSize = helpers.getValueOrDefault(this.options.labels.fontSize, Chart.defaults.global.defaultFontSize);
				var fontStyle = helpers.getValueOrDefault(this.options.labels.fontStyle, Chart.defaults.global.defaultFontStyle);
				var fontFamily = helpers.getValueOrDefault(this.options.labels.fontFamily, Chart.defaults.global.defaultFontFamily);
				var labelFont = helpers.fontString(fontSize, fontStyle, fontFamily);

				// Horizontal
				if (this.isHorizontal()) {
					// Labels
					ctx.textAlign = "left";
					ctx.textBaseline = 'top';
					ctx.lineWidth = 0.5;
					ctx.strokeStyle = fontColor; // for strikethrough effect
					ctx.fillStyle = fontColor; // render in correct colour
					ctx.font = labelFont;

					helpers.each(this.legendItems, function(legendItem, i) {
						var textWidth = ctx.measureText(legendItem.text).width;
						var width = this.options.labels.boxWidth + (fontSize / 2) + textWidth;

						if (cursor.x + width >= this.width) {
							cursor.y += fontSize + (this.options.labels.padding);
							cursor.line++;
							cursor.x = this.left + ((this.width - this.lineWidths[cursor.line]) / 2);
						}

						// Set the ctx for the box
						ctx.save();

						var itemOrDefault = function(item, defaulVal) {
							return item !== undefined ? item : defaulVal;
						};

						ctx.fillStyle = itemOrDefault(legendItem.fillStyle, Chart.defaults.global.defaultColor);
						ctx.lineCap = itemOrDefault(legendItem.lineCap, Chart.defaults.global.elements.line.borderCapStyle);
						ctx.lineDashOffset = itemOrDefault(legendItem.lineDashOffset, Chart.defaults.global.elements.line.borderDashOffset);
						ctx.lineJoin = itemOrDefault(legendItem.lineJoin, Chart.defaults.global.elements.line.borderJoinStyle);
						ctx.lineWidth = itemOrDefault(legendItem.lineWidth, Chart.defaults.global.elements.line.borderWidth);
						ctx.strokeStyle = itemOrDefault(legendItem.strokeStyle, Chart.defaults.global.defaultColor);

						if (ctx.setLineDash) {
							// IE 9 and 10 do not support line dash
							ctx.setLineDash(itemOrDefault(legendItem.lineDash, Chart.defaults.global.elements.line.borderDash));
						}

						// Draw the box
						ctx.strokeRect(cursor.x, cursor.y, this.options.labels.boxWidth, fontSize);
						ctx.fillRect(cursor.x, cursor.y, this.options.labels.boxWidth, fontSize);

						ctx.restore();

						this.legendHitBoxes[i].left = cursor.x;
						this.legendHitBoxes[i].top = cursor.y;

						// Fill the actual label
						ctx.fillText(legendItem.text, this.options.labels.boxWidth + (fontSize / 2) + cursor.x, cursor.y);

						if (legendItem.hidden) {
							// Strikethrough the text if hidden
							ctx.beginPath();
							ctx.lineWidth = 2;
							ctx.moveTo(this.options.labels.boxWidth + (fontSize / 2) + cursor.x, cursor.y + (fontSize / 2));
							ctx.lineTo(this.options.labels.boxWidth + (fontSize / 2) + cursor.x + textWidth, cursor.y + (fontSize / 2));
							ctx.stroke();
						}

						cursor.x += width + (this.options.labels.padding);
					}, this);
				} else {

				}
			}
		},

		// Handle an event
		handleEvent: function(e) {
			var position = helpers.getRelativePosition(e, this.chart.chart);

			if (position.x >= this.left && position.x <= this.right && position.y >= this.top && position.y <= this.bottom) {
				// See if we are touching one of the dataset boxes
				for (var i = 0; i < this.legendHitBoxes.length; ++i) {
					var hitBox = this.legendHitBoxes[i];

					if (position.x >= hitBox.left && position.x <= hitBox.left + hitBox.width && position.y >= hitBox.top && position.y <= hitBox.top + hitBox.height) {
						// Touching an element
						if (this.options.onClick) {
							this.options.onClick.call(this, e, this.legendItems[i]);
						}
						break;
					}
				}
			}
		}
	});

};

},{}],29:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	Chart.defaults.scale = {
		display: true,

		// grid line settings
		gridLines: {
			display: true,
			color: "rgba(0, 0, 0, 0.1)",
			lineWidth: 1,
			drawOnChartArea: true,
			drawTicks: true,
			zeroLineWidth: 1,
			zeroLineColor: "rgba(0,0,0,0.25)",
			offsetGridLines: false
		},

		// scale label
		scaleLabel: {
			// actual label
			labelString: '',

			// display property
			display: false
		},

		// label settings
		ticks: {
			beginAtZero: false,
			maxRotation: 90,
			mirror: false,
			padding: 10,
			reverse: false,
			display: true,
			autoSkip: true,
			autoSkipPadding: 20,
			callback: function(value) {
				return '' + value;
			}
		}
	};

	Chart.Scale = Chart.Element.extend({

		// These methods are ordered by lifecyle. Utilities then follow.
		// Any function defined here is inherited by all scale types.
		// Any function can be extended by the scale type

		beforeUpdate: function() {
			helpers.callCallback(this.options.beforeUpdate, [this]);
		},
		update: function(maxWidth, maxHeight, margins) {

			// Update Lifecycle - Probably don't want to ever extend or overwrite this function ;)
			this.beforeUpdate();

			// Absorb the master measurements
			this.maxWidth = maxWidth;
			this.maxHeight = maxHeight;
			this.margins = helpers.extend({
				left: 0,
				right: 0,
				top: 0,
				bottom: 0
			}, margins);

			// Dimensions
			this.beforeSetDimensions();
			this.setDimensions();
			this.afterSetDimensions();

			// Data min/max
			this.beforeDataLimits();
			this.determineDataLimits();
			this.afterDataLimits();

			// Ticks
			this.beforeBuildTicks();
			this.buildTicks();
			this.afterBuildTicks();

			this.beforeTickToLabelConversion();
			this.convertTicksToLabels();
			this.afterTickToLabelConversion();

			// Tick Rotation
			this.beforeCalculateTickRotation();
			this.calculateTickRotation();
			this.afterCalculateTickRotation();
			// Fit
			this.beforeFit();
			this.fit();
			this.afterFit();
			//
			this.afterUpdate();

			return this.minSize;

		},
		afterUpdate: function() {
			helpers.callCallback(this.options.afterUpdate, [this]);
		},

		//

		beforeSetDimensions: function() {
			helpers.callCallback(this.options.beforeSetDimensions, [this]);
		},
		setDimensions: function() {
			// Set the unconstrained dimension before label rotation
			if (this.isHorizontal()) {
				// Reset position before calculating rotation
				this.width = this.maxWidth;
				this.left = 0;
				this.right = this.width;
			} else {
				this.height = this.maxHeight;

				// Reset position before calculating rotation
				this.top = 0;
				this.bottom = this.height;
			}

			// Reset padding
			this.paddingLeft = 0;
			this.paddingTop = 0;
			this.paddingRight = 0;
			this.paddingBottom = 0;
		},
		afterSetDimensions: function() {
			helpers.callCallback(this.options.afterSetDimensions, [this]);
		},

		// Data limits
		beforeDataLimits: function() {
			helpers.callCallback(this.options.beforeDataLimits, [this]);
		},
		determineDataLimits: helpers.noop,
		afterDataLimits: function() {
			helpers.callCallback(this.options.afterDataLimits, [this]);
		},

		//
		beforeBuildTicks: function() {
			helpers.callCallback(this.options.beforeBuildTicks, [this]);
		},
		buildTicks: helpers.noop,
		afterBuildTicks: function() {
			helpers.callCallback(this.options.afterBuildTicks, [this]);
		},

		beforeTickToLabelConversion: function() {
			helpers.callCallback(this.options.beforeTickToLabelConversion, [this]);
		},
		convertTicksToLabels: function() {
			// Convert ticks to strings
			this.ticks = this.ticks.map(function(numericalTick, index, ticks) {
					if (this.options.ticks.userCallback) {
						return this.options.ticks.userCallback(numericalTick, index, ticks);
					}
					return this.options.ticks.callback(numericalTick, index, ticks);
				},
				this);
		},
		afterTickToLabelConversion: function() {
			helpers.callCallback(this.options.afterTickToLabelConversion, [this]);
		},

		//

		beforeCalculateTickRotation: function() {
			helpers.callCallback(this.options.beforeCalculateTickRotation, [this]);
		},
		calculateTickRotation: function() {
			//Get the width of each grid by calculating the difference
			//between x offsets between 0 and 1.
			var tickFontSize = helpers.getValueOrDefault(this.options.ticks.fontSize, Chart.defaults.global.defaultFontSize);
			var tickFontStyle = helpers.getValueOrDefault(this.options.ticks.fontStyle, Chart.defaults.global.defaultFontStyle);
			var tickFontFamily = helpers.getValueOrDefault(this.options.ticks.fontFamily, Chart.defaults.global.defaultFontFamily);
			var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);
			this.ctx.font = tickLabelFont;

			var firstWidth = this.ctx.measureText(this.ticks[0]).width;
			var lastWidth = this.ctx.measureText(this.ticks[this.ticks.length - 1]).width;
			var firstRotated;

			this.labelRotation = 0;
			this.paddingRight = 0;
			this.paddingLeft = 0;

			if (this.options.display) {
				if (this.isHorizontal()) {
					this.paddingRight = lastWidth / 2 + 3;
					this.paddingLeft = firstWidth / 2 + 3;

					if (!this.longestTextCache) {
						this.longestTextCache = {};
					}
					var originalLabelWidth = helpers.longestText(this.ctx, tickLabelFont, this.ticks, this.longestTextCache);
					var labelWidth = originalLabelWidth;
					var cosRotation;
					var sinRotation;

					// Allow 3 pixels x2 padding either side for label readability
					// only the index matters for a dataset scale, but we want a consistent interface between scales
					var tickWidth = this.getPixelForTick(1) - this.getPixelForTick(0) - 6;

					//Max label rotation can be set or default to 90 - also act as a loop counter
					while (labelWidth > tickWidth && this.labelRotation < this.options.ticks.maxRotation) {
						cosRotation = Math.cos(helpers.toRadians(this.labelRotation));
						sinRotation = Math.sin(helpers.toRadians(this.labelRotation));

						firstRotated = cosRotation * firstWidth;

						// We're right aligning the text now.
						if (firstRotated + tickFontSize / 2 > this.yLabelWidth) {
							this.paddingLeft = firstRotated + tickFontSize / 2;
						}

						this.paddingRight = tickFontSize / 2;

						if (sinRotation * originalLabelWidth > this.maxHeight) {
							// go back one step
							this.labelRotation--;
							break;
						}

						this.labelRotation++;
						labelWidth = cosRotation * originalLabelWidth;
					}
				}
			}

			if (this.margins) {
				this.paddingLeft = Math.max(this.paddingLeft - this.margins.left, 0);
				this.paddingRight = Math.max(this.paddingRight - this.margins.right, 0);
			}
		},
		afterCalculateTickRotation: function() {
			helpers.callCallback(this.options.afterCalculateTickRotation, [this]);
		},

		//

		beforeFit: function() {
			helpers.callCallback(this.options.beforeFit, [this]);
		},
		fit: function() {

			this.minSize = {
				width: 0,
				height: 0
			};

			var tickFontSize = helpers.getValueOrDefault(this.options.ticks.fontSize, Chart.defaults.global.defaultFontSize);
			var tickFontStyle = helpers.getValueOrDefault(this.options.ticks.fontStyle, Chart.defaults.global.defaultFontStyle);
			var tickFontFamily = helpers.getValueOrDefault(this.options.ticks.fontFamily, Chart.defaults.global.defaultFontFamily);
			var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);

			var scaleLabelFontSize = helpers.getValueOrDefault(this.options.scaleLabel.fontSize, Chart.defaults.global.defaultFontSize);
			var scaleLabelFontStyle = helpers.getValueOrDefault(this.options.scaleLabel.fontStyle, Chart.defaults.global.defaultFontStyle);
			var scaleLabelFontFamily = helpers.getValueOrDefault(this.options.scaleLabel.fontFamily, Chart.defaults.global.defaultFontFamily);
			var scaleLabelFont = helpers.fontString(scaleLabelFontSize, scaleLabelFontStyle, scaleLabelFontFamily);

			// Width
			if (this.isHorizontal()) {
				// subtract the margins to line up with the chartArea if we are a full width scale
				this.minSize.width = this.isFullWidth() ? this.maxWidth - this.margins.left - this.margins.right : this.maxWidth;
			} else {
				this.minSize.width = this.options.gridLines.display && this.options.display ? 10 : 0;
			}

			// height
			if (this.isHorizontal()) {
				this.minSize.height = this.options.gridLines.display && this.options.display ? 10 : 0;
			} else {
				this.minSize.height = this.maxHeight; // fill all the height
			}

			// Are we showing a title for the scale?
			if (this.options.scaleLabel.display) {
				if (this.isHorizontal()) {
					this.minSize.height += (scaleLabelFontSize * 1.5);
				} else {
					this.minSize.width += (scaleLabelFontSize * 1.5);
				}
			}

			if (this.options.ticks.display && this.options.display) {
				// Don't bother fitting the ticks if we are not showing them
				if (!this.longestTextCache) {
					this.longestTextCache = {};
				}

				var largestTextWidth = helpers.longestText(this.ctx, tickLabelFont, this.ticks, this.longestTextCache);

				if (this.isHorizontal()) {
					// A horizontal axis is more constrained by the height.
					this.longestLabelWidth = largestTextWidth;

					// TODO - improve this calculation
					var labelHeight = (Math.sin(helpers.toRadians(this.labelRotation)) * this.longestLabelWidth) + 1.5 * tickFontSize;

					this.minSize.height = Math.min(this.maxHeight, this.minSize.height + labelHeight);
					this.ctx.font = tickLabelFont;

					var firstLabelWidth = this.ctx.measureText(this.ticks[0]).width;
					var lastLabelWidth = this.ctx.measureText(this.ticks[this.ticks.length - 1]).width;

					// Ensure that our ticks are always inside the canvas. When rotated, ticks are right aligned which means that the right padding is dominated
					// by the font height
					var cosRotation = Math.cos(helpers.toRadians(this.labelRotation));
					var sinRotation = Math.sin(helpers.toRadians(this.labelRotation));
					this.paddingLeft = this.labelRotation !== 0 ? (cosRotation * firstLabelWidth) + 3 : firstLabelWidth / 2 + 3; // add 3 px to move away from canvas edges
					this.paddingRight = this.labelRotation !== 0 ? (sinRotation * (tickFontSize / 2)) + 3 : lastLabelWidth / 2 + 3; // when rotated
				} else {
					// A vertical axis is more constrained by the width. Labels are the dominant factor here, so get that length first
					var maxLabelWidth = this.maxWidth - this.minSize.width;

					// Account for padding
					if (!this.options.ticks.mirror) {
						largestTextWidth += this.options.ticks.padding;
					}

					if (largestTextWidth < maxLabelWidth) {
						// We don't need all the room
						this.minSize.width += largestTextWidth;
					} else {
						// Expand to max size
						this.minSize.width = this.maxWidth;
					}

					this.paddingTop = tickFontSize / 2;
					this.paddingBottom = tickFontSize / 2;
				}
			}

			if (this.margins) {
				this.paddingLeft = Math.max(this.paddingLeft - this.margins.left, 0);
				this.paddingTop = Math.max(this.paddingTop - this.margins.top, 0);
				this.paddingRight = Math.max(this.paddingRight - this.margins.right, 0);
				this.paddingBottom = Math.max(this.paddingBottom - this.margins.bottom, 0);
			}

			this.width = this.minSize.width;
			this.height = this.minSize.height;

		},
		afterFit: function() {
			helpers.callCallback(this.options.afterFit, [this]);
		},

		// Shared Methods
		isHorizontal: function() {
			return this.options.position === "top" || this.options.position === "bottom";
		},
		isFullWidth: function() {
			return (this.options.fullWidth);
		},

		// Get the correct value. NaN bad inputs, If the value type is object get the x or y based on whether we are horizontal or not
		getRightValue: function getRightValue(rawValue) {
			// Null and undefined values first
			if (rawValue === null || typeof(rawValue) === 'undefined') {
				return NaN;
			}
			// isNaN(object) returns true, so make sure NaN is checking for a number
			if (typeof(rawValue) === 'number' && isNaN(rawValue)) {
				return NaN;
			}
			// If it is in fact an object, dive in one more level
			if (typeof(rawValue) === "object") {
				if (rawValue instanceof Date) {
					return rawValue;
				} else {
					return getRightValue(this.isHorizontal() ? rawValue.x : rawValue.y);
				}
			}

			// Value is good, return it
			return rawValue;
		},

		// Used to get the value to display in the tooltip for the data at the given index
		// function getLabelForIndex(index, datasetIndex)
		getLabelForIndex: helpers.noop,

		// Used to get data value locations.  Value can either be an index or a numerical value
		getPixelForValue: helpers.noop,

		// Used for tick location, should
		getPixelForTick: function(index, includeOffset) {
			if (this.isHorizontal()) {
				var innerWidth = this.width - (this.paddingLeft + this.paddingRight);
				var tickWidth = innerWidth / Math.max((this.ticks.length - ((this.options.gridLines.offsetGridLines) ? 0 : 1)), 1);
				var pixel = (tickWidth * index) + this.paddingLeft;

				if (includeOffset) {
					pixel += tickWidth / 2;
				}

				var finalVal = this.left + Math.round(pixel);
				finalVal += this.isFullWidth() ? this.margins.left : 0;
				return finalVal;
			} else {
				var innerHeight = this.height - (this.paddingTop + this.paddingBottom);
				return this.top + (index * (innerHeight / (this.ticks.length - 1)));
			}
		},

		// Utility for getting the pixel location of a percentage of scale
		getPixelForDecimal: function(decimal /*, includeOffset*/ ) {
			if (this.isHorizontal()) {
				var innerWidth = this.width - (this.paddingLeft + this.paddingRight);
				var valueOffset = (innerWidth * decimal) + this.paddingLeft;

				var finalVal = this.left + Math.round(valueOffset);
				finalVal += this.isFullWidth() ? this.margins.left : 0;
				return finalVal;
			} else {
				return this.top + (decimal * this.height);
			}
		},

		// Actualy draw the scale on the canvas
		// @param {rectangle} chartArea : the area of the chart to draw full grid lines on
		draw: function(chartArea) {
			if (this.options.display) {

				var setContextLineSettings;
				var isRotated = this.labelRotation !== 0;
				var skipRatio;
				var scaleLabelX;
				var scaleLabelY;
				var useAutoskipper = this.options.ticks.autoSkip;


				// figure out the maximum number of gridlines to show
				var maxTicks;

				if (this.options.ticks.maxTicksLimit) {
					maxTicks = this.options.ticks.maxTicksLimit;
				}

				var tickFontColor = helpers.getValueOrDefault(this.options.ticks.fontColor, Chart.defaults.global.defaultFontColor);
				var tickFontSize = helpers.getValueOrDefault(this.options.ticks.fontSize, Chart.defaults.global.defaultFontSize);
				var tickFontStyle = helpers.getValueOrDefault(this.options.ticks.fontStyle, Chart.defaults.global.defaultFontStyle);
				var tickFontFamily = helpers.getValueOrDefault(this.options.ticks.fontFamily, Chart.defaults.global.defaultFontFamily);
				var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);

				var scaleLabelFontColor = helpers.getValueOrDefault(this.options.scaleLabel.fontColor, Chart.defaults.global.defaultFontColor);
				var scaleLabelFontSize = helpers.getValueOrDefault(this.options.scaleLabel.fontSize, Chart.defaults.global.defaultFontSize);
				var scaleLabelFontStyle = helpers.getValueOrDefault(this.options.scaleLabel.fontStyle, Chart.defaults.global.defaultFontStyle);
				var scaleLabelFontFamily = helpers.getValueOrDefault(this.options.scaleLabel.fontFamily, Chart.defaults.global.defaultFontFamily);
				var scaleLabelFont = helpers.fontString(scaleLabelFontSize, scaleLabelFontStyle, scaleLabelFontFamily);

				var cosRotation = Math.cos(helpers.toRadians(this.labelRotation));
				var sinRotation = Math.sin(helpers.toRadians(this.labelRotation));
				var longestRotatedLabel = this.longestLabelWidth * cosRotation;
				var rotatedLabelHeight = tickFontSize * sinRotation;

				// Make sure we draw text in the correct color and font
				this.ctx.fillStyle = tickFontColor;

				if (this.isHorizontal()) {
					setContextLineSettings = true;
					var yTickStart = this.options.position === "bottom" ? this.top : this.bottom - 10;
					var yTickEnd = this.options.position === "bottom" ? this.top + 10 : this.bottom;
					skipRatio = false;

					if (((longestRotatedLabel / 2) + this.options.ticks.autoSkipPadding) * this.ticks.length > (this.width - (this.paddingLeft + this.paddingRight))) {
						skipRatio = 1 + Math.floor((((longestRotatedLabel / 2) + this.options.ticks.autoSkipPadding) * this.ticks.length) / (this.width - (this.paddingLeft + this.paddingRight)));
					}

					// if they defined a max number of ticks,
					// increase skipRatio until that number is met
					if (maxTicks && this.ticks.length > maxTicks) {
						while (!skipRatio || this.ticks.length / (skipRatio || 1) > maxTicks) {
							if (!skipRatio) {
								skipRatio = 1;
							}
							skipRatio += 1;
						}
					}

					if (!useAutoskipper) {
						skipRatio = false;
					}

					helpers.each(this.ticks, function(label, index) {
						// Blank ticks
						var isLastTick = this.ticks.length === index + 1;

						// Since we always show the last tick,we need may need to hide the last shown one before
						var shouldSkip = (skipRatio > 1 && index % skipRatio > 0) || (index % skipRatio === 0 && index + skipRatio > this.ticks.length);
						if (shouldSkip && !isLastTick || (label === undefined || label === null)) {
							return;
						}
						var xLineValue = this.getPixelForTick(index); // xvalues for grid lines
						var xLabelValue = this.getPixelForTick(index, this.options.gridLines.offsetGridLines); // x values for ticks (need to consider offsetLabel option)

						if (this.options.gridLines.display) {
							if (index === (typeof this.zeroLineIndex !== 'undefined' ? this.zeroLineIndex : 0)) {
								// Draw the first index specially
								this.ctx.lineWidth = this.options.gridLines.zeroLineWidth;
								this.ctx.strokeStyle = this.options.gridLines.zeroLineColor;
								setContextLineSettings = true; // reset next time
							} else if (setContextLineSettings) {
								this.ctx.lineWidth = this.options.gridLines.lineWidth;
								this.ctx.strokeStyle = this.options.gridLines.color;
								setContextLineSettings = false;
							}

							xLineValue += helpers.aliasPixel(this.ctx.lineWidth);

							// Draw the label area
							this.ctx.beginPath();

							if (this.options.gridLines.drawTicks) {
								this.ctx.moveTo(xLineValue, yTickStart);
								this.ctx.lineTo(xLineValue, yTickEnd);
							}

							// Draw the chart area
							if (this.options.gridLines.drawOnChartArea) {
								this.ctx.moveTo(xLineValue, chartArea.top);
								this.ctx.lineTo(xLineValue, chartArea.bottom);
							}

							// Need to stroke in the loop because we are potentially changing line widths & colours
							this.ctx.stroke();
						}

						if (this.options.ticks.display) {
							this.ctx.save();
							this.ctx.translate(xLabelValue, (isRotated) ? this.top + 12 : this.options.position === "top" ? this.bottom - 10 : this.top + 10);
							this.ctx.rotate(helpers.toRadians(this.labelRotation) * -1);
							this.ctx.font = tickLabelFont;
							this.ctx.textAlign = (isRotated) ? "right" : "center";
							this.ctx.textBaseline = (isRotated) ? "middle" : this.options.position === "top" ? "bottom" : "top";
							this.ctx.fillText(label, 0, 0);
							this.ctx.restore();
						}
					}, this);

					if (this.options.scaleLabel.display) {
						// Draw the scale label
						this.ctx.textAlign = "center";
						this.ctx.textBaseline = 'middle';
						this.ctx.fillStyle = scaleLabelFontColor; // render in correct colour
						this.ctx.font = scaleLabelFont;

						scaleLabelX = this.left + ((this.right - this.left) / 2); // midpoint of the width
						scaleLabelY = this.options.position === 'bottom' ? this.bottom - (scaleLabelFontSize / 2) : this.top + (scaleLabelFontSize / 2);

						this.ctx.fillText(this.options.scaleLabel.labelString, scaleLabelX, scaleLabelY);
					}

				} else {
					setContextLineSettings = true;
					var xTickStart = this.options.position === "right" ? this.left : this.right - 5;
					var xTickEnd = this.options.position === "right" ? this.left + 5 : this.right;

					helpers.each(this.ticks, function(label, index) {
						// If the callback returned a null or undefined value, do not draw this line
						if (label === undefined || label === null) {
							return;
						}

						var yLineValue = this.getPixelForTick(index); // xvalues for grid lines

						if (this.options.gridLines.display) {
							if (index === (typeof this.zeroLineIndex !== 'undefined' ? this.zeroLineIndex : 0)) {
								// Draw the first index specially
								this.ctx.lineWidth = this.options.gridLines.zeroLineWidth;
								this.ctx.strokeStyle = this.options.gridLines.zeroLineColor;
								setContextLineSettings = true; // reset next time
							} else if (setContextLineSettings) {
								this.ctx.lineWidth = this.options.gridLines.lineWidth;
								this.ctx.strokeStyle = this.options.gridLines.color;
								setContextLineSettings = false;
							}

							yLineValue += helpers.aliasPixel(this.ctx.lineWidth);

							// Draw the label area
							this.ctx.beginPath();

							if (this.options.gridLines.drawTicks) {
								this.ctx.moveTo(xTickStart, yLineValue);
								this.ctx.lineTo(xTickEnd, yLineValue);
							}

							// Draw the chart area
							if (this.options.gridLines.drawOnChartArea) {
								this.ctx.moveTo(chartArea.left, yLineValue);
								this.ctx.lineTo(chartArea.right, yLineValue);
							}

							// Need to stroke in the loop because we are potentially changing line widths & colours
							this.ctx.stroke();
						}

						if (this.options.ticks.display) {
							var xLabelValue;
							var yLabelValue = this.getPixelForTick(index, this.options.gridLines.offsetGridLines); // x values for ticks (need to consider offsetLabel option)

							this.ctx.save();

							if (this.options.position === "left") {
								if (this.options.ticks.mirror) {
									xLabelValue = this.right + this.options.ticks.padding;
									this.ctx.textAlign = "left";
								} else {
									xLabelValue = this.right - this.options.ticks.padding;
									this.ctx.textAlign = "right";
								}
							} else {
								// right side
								if (this.options.ticks.mirror) {
									xLabelValue = this.left - this.options.ticks.padding;
									this.ctx.textAlign = "right";
								} else {
									xLabelValue = this.left + this.options.ticks.padding;
									this.ctx.textAlign = "left";
								}
							}

							this.ctx.translate(xLabelValue, yLabelValue);
							this.ctx.rotate(helpers.toRadians(this.labelRotation) * -1);
							this.ctx.font = tickLabelFont;
							this.ctx.textBaseline = "middle";
							this.ctx.fillText(label, 0, 0);
							this.ctx.restore();
						}
					}, this);

					if (this.options.scaleLabel.display) {
						// Draw the scale label
						scaleLabelX = this.options.position === 'left' ? this.left + (scaleLabelFontSize / 2) : this.right - (scaleLabelFontSize / 2);
						scaleLabelY = this.top + ((this.bottom - this.top) / 2);
						var rotation = this.options.position === 'left' ? -0.5 * Math.PI : 0.5 * Math.PI;

						this.ctx.save();
						this.ctx.translate(scaleLabelX, scaleLabelY);
						this.ctx.rotate(rotation);
						this.ctx.textAlign = "center";
						this.ctx.fillStyle =scaleLabelFontColor; // render in correct colour
						this.ctx.font = scaleLabelFont;
						this.ctx.textBaseline = 'middle';
						this.ctx.fillText(this.options.scaleLabel.labelString, 0, 0);
						this.ctx.restore();
					}
				}

				// Draw the line at the edge of the axis
				this.ctx.lineWidth = this.options.gridLines.lineWidth;
				this.ctx.strokeStyle = this.options.gridLines.color;
				var x1 = this.left,
					x2 = this.right,
					y1 = this.top,
					y2 = this.bottom;

				if (this.isHorizontal()) {
					y1 = y2 = this.options.position === 'top' ? this.bottom : this.top;
					y1 += helpers.aliasPixel(this.ctx.lineWidth);
					y2 += helpers.aliasPixel(this.ctx.lineWidth);
				} else {
					x1 = x2 = this.options.position === 'left' ? this.right : this.left;
					x1 += helpers.aliasPixel(this.ctx.lineWidth);
					x2 += helpers.aliasPixel(this.ctx.lineWidth);
				}

				this.ctx.beginPath();
				this.ctx.moveTo(x1, y1);
				this.ctx.lineTo(x2, y2);
				this.ctx.stroke();
			}
		}
	});
};
},{}],30:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	Chart.scaleService = {
		// Scale registration object. Extensions can register new scale types (such as log or DB scales) and then
		// use the new chart options to grab the correct scale
		constructors: {},
		// Use a registration function so that we can move to an ES6 map when we no longer need to support
		// old browsers

		// Scale config defaults
		defaults: {},
		registerScaleType: function(type, scaleConstructor, defaults) {
			this.constructors[type] = scaleConstructor;
			this.defaults[type] = helpers.clone(defaults);
		},
		getScaleConstructor: function(type) {
			return this.constructors.hasOwnProperty(type) ? this.constructors[type] : undefined;
		},
		getScaleDefaults: function(type) {
			// Return the scale defaults merged with the global settings so that we always use the latest ones
			return this.defaults.hasOwnProperty(type) ? helpers.scaleMerge(Chart.defaults.scale, this.defaults[type]) : {};
		},
		addScalesToLayout: function(chartInstance) {
			// Adds each scale to the chart.boxes array to be sized accordingly
			helpers.each(chartInstance.scales, function(scale) {
				Chart.layoutService.addBox(chartInstance, scale);
			});
		}
	};
};
},{}],31:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	Chart.defaults.global.title = {
		display: false,
		position: 'top',
		fullWidth: true, // marks that this box should take the full width of the canvas (pushing down other boxes)

		fontStyle: 'bold',
		padding: 10,

		// actual title
		text: ''
	};

	Chart.Title = Chart.Element.extend({

		initialize: function(config) {
			helpers.extend(this, config);
			this.options = helpers.configMerge(Chart.defaults.global.title, config.options);

			// Contains hit boxes for each dataset (in dataset order)
			this.legendHitBoxes = [];
		},

		// These methods are ordered by lifecyle. Utilities then follow.

		beforeUpdate: helpers.noop,
		update: function(maxWidth, maxHeight, margins) {

			// Update Lifecycle - Probably don't want to ever extend or overwrite this function ;)
			this.beforeUpdate();

			// Absorb the master measurements
			this.maxWidth = maxWidth;
			this.maxHeight = maxHeight;
			this.margins = margins;

			// Dimensions
			this.beforeSetDimensions();
			this.setDimensions();
			this.afterSetDimensions();
			// Labels
			this.beforeBuildLabels();
			this.buildLabels();
			this.afterBuildLabels();

			// Fit
			this.beforeFit();
			this.fit();
			this.afterFit();
			//
			this.afterUpdate();

			return this.minSize;

		},
		afterUpdate: helpers.noop,

		//

		beforeSetDimensions: helpers.noop,
		setDimensions: function() {
			// Set the unconstrained dimension before label rotation
			if (this.isHorizontal()) {
				// Reset position before calculating rotation
				this.width = this.maxWidth;
				this.left = 0;
				this.right = this.width;
			} else {
				this.height = this.maxHeight;

				// Reset position before calculating rotation
				this.top = 0;
				this.bottom = this.height;
			}

			// Reset padding
			this.paddingLeft = 0;
			this.paddingTop = 0;
			this.paddingRight = 0;
			this.paddingBottom = 0;

			// Reset minSize
			this.minSize = {
				width: 0,
				height: 0
			};
		},
		afterSetDimensions: helpers.noop,

		//

		beforeBuildLabels: helpers.noop,
		buildLabels: helpers.noop,
		afterBuildLabels: helpers.noop,

		//

		beforeFit: helpers.noop,
		fit: function() {

			var ctx = this.ctx;
			var fontSize = helpers.getValueOrDefault(this.options.fontSize, Chart.defaults.global.defaultFontSize);
			var fontStyle = helpers.getValueOrDefault(this.options.fontStyle, Chart.defaults.global.defaultFontStyle);
			var fontFamily = helpers.getValueOrDefault(this.options.fontFamily, Chart.defaults.global.defaultFontFamily);
			var titleFont = helpers.fontString(fontSize, fontStyle, fontFamily);

			// Width
			if (this.isHorizontal()) {
				this.minSize.width = this.maxWidth; // fill all the width
			} else {
				this.minSize.width = 0;
			}

			// height
			if (this.isHorizontal()) {
				this.minSize.height = 0;
			} else {
				this.minSize.height = this.maxHeight; // fill all the height
			}

			// Increase sizes here
			if (this.isHorizontal()) {

				// Title
				if (this.options.display) {
					this.minSize.height += fontSize + (this.options.padding * 2);
				}
			} else {
				if (this.options.display) {
					this.minSize.width += fontSize + (this.options.padding * 2);
				}
			}

			this.width = this.minSize.width;
			this.height = this.minSize.height;

		},
		afterFit: helpers.noop,

		// Shared Methods
		isHorizontal: function() {
			return this.options.position === "top" || this.options.position === "bottom";
		},

		// Actualy draw the title block on the canvas
		draw: function() {
			if (this.options.display) {
				var ctx = this.ctx;
				var titleX, titleY;

				var fontColor = helpers.getValueOrDefault(this.options.fontColor, Chart.defaults.global.defaultFontColor);
				var fontSize = helpers.getValueOrDefault(this.options.fontSize, Chart.defaults.global.defaultFontSize);
				var fontStyle = helpers.getValueOrDefault(this.options.fontStyle, Chart.defaults.global.defaultFontStyle);
				var fontFamily = helpers.getValueOrDefault(this.options.fontFamily, Chart.defaults.global.defaultFontFamily);
				var titleFont = helpers.fontString(fontSize, fontStyle, fontFamily);

				ctx.fillStyle = fontColor; // render in correct colour
				ctx.font = titleFont;

				// Horizontal
				if (this.isHorizontal()) {
					// Title
					ctx.textAlign = "center";
					ctx.textBaseline = 'middle';

					titleX = this.left + ((this.right - this.left) / 2); // midpoint of the width
					titleY = this.top + ((this.bottom - this.top) / 2); // midpoint of the height

					ctx.fillText(this.options.text, titleX, titleY);
				} else {

					// Title
					titleX = this.options.position === 'left' ? this.left + (fontSize / 2) : this.right - (fontSize / 2);
					titleY = this.top + ((this.bottom - this.top) / 2);
					var rotation = this.options.position === 'left' ? -0.5 * Math.PI : 0.5 * Math.PI;

					ctx.save();
					ctx.translate(titleX, titleY);
					ctx.rotate(rotation);
					ctx.textAlign = "center";
					ctx.textBaseline = 'middle';
					ctx.fillText(this.options.text, 0, 0);
					ctx.restore();
				}
			}
		}
	});
};
},{}],32:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	Chart.defaults.global.tooltips = {
		enabled: true,
		custom: null,
		mode: 'single',
		backgroundColor: "rgba(0,0,0,0.8)",
		titleFontStyle: "bold",
		titleSpacing: 2,
		titleMarginBottom: 6,
		titleColor: "#fff",
		titleAlign: "left",
		bodySpacing: 2,
		bodyColor: "#fff",
		bodyAlign: "left",
		footerFontStyle: "bold",
		footerSpacing: 2,
		footerMarginTop: 6,
		footerColor: "#fff",
		footerAlign: "left",
		yPadding: 6,
		xPadding: 6,
		yAlign : 'center',
		xAlign : 'center',
		caretSize: 5,
		cornerRadius: 6,
		multiKeyBackground: '#fff',
		callbacks: {
			// Args are: (tooltipItems, data)
			beforeTitle: helpers.noop,
			title: function(tooltipItems, data) {
				// Pick first xLabel for now
				var title = '';

				if (tooltipItems.length > 0) {
					if (tooltipItems[0].xLabel) {
						title = tooltipItems[0].xLabel;
					} else if (data.labels.length > 0 && tooltipItems[0].index < data.labels.length) {
						title = data.labels[tooltipItems[0].index];
					}
				}

				return title;
			},
			afterTitle: helpers.noop,

			// Args are: (tooltipItems, data)
			beforeBody: helpers.noop,

			// Args are: (tooltipItem, data)
			beforeLabel: helpers.noop,
			label: function(tooltipItem, data) {
				var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
				return datasetLabel + ': ' + tooltipItem.yLabel;
			},
			afterLabel: helpers.noop,

			// Args are: (tooltipItems, data)
			afterBody: helpers.noop,

			// Args are: (tooltipItems, data)
			beforeFooter: helpers.noop,
			footer: helpers.noop,
			afterFooter: helpers.noop
		}
	};

	// Helper to push or concat based on if the 2nd parameter is an array or not
	function pushOrConcat(base, toPush) {
		if (toPush) {
			if (helpers.isArray(toPush)) {
				base = base.concat(toPush);
			} else {
				base.push(toPush);
			}
		}

		return base;
	}

	Chart.Tooltip = Chart.Element.extend({
		initialize: function() {
			var options = this._options;
			helpers.extend(this, {
				_model: {
					// Positioning
					xPadding: options.tooltips.xPadding,
					yPadding: options.tooltips.yPadding,
					xAlign : options.tooltips.yAlign,
					yAlign : options.tooltips.xAlign,

					// Body
					bodyColor: options.tooltips.bodyColor,
					_bodyFontFamily: helpers.getValueOrDefault(options.tooltips.bodyFontFamily, Chart.defaults.global.defaultFontFamily),
					_bodyFontStyle: helpers.getValueOrDefault(options.tooltips.bodyFontStyle, Chart.defaults.global.defaultFontStyle),
					_bodyAlign: options.tooltips.bodyAlign,
					bodyFontSize: helpers.getValueOrDefault(options.tooltips.bodyFontSize, Chart.defaults.global.defaultFontSize),
					bodySpacing: options.tooltips.bodySpacing,

					// Title
					titleColor: options.tooltips.titleColor,
					_titleFontFamily: helpers.getValueOrDefault(options.tooltips.titleFontFamily, Chart.defaults.global.defaultFontFamily),
					_titleFontStyle: helpers.getValueOrDefault(options.tooltips.titleFontStyle, Chart.defaults.global.defaultFontStyle),
					titleFontSize: helpers.getValueOrDefault(options.tooltips.titleFontSize, Chart.defaults.global.defaultFontSize),
					_titleAlign: options.tooltips.titleAlign,
					titleSpacing: options.tooltips.titleSpacing,
					titleMarginBottom: options.tooltips.titleMarginBottom,

					// Footer
					footerColor: options.tooltips.footerColor,
					_footerFontFamily: helpers.getValueOrDefault(options.tooltips.footerFontFamily, Chart.defaults.global.defaultFontFamily),
					_footerFontStyle: helpers.getValueOrDefault(options.tooltips.footerFontStyle, Chart.defaults.global.defaultFontStyle),
					footerFontSize: helpers.getValueOrDefault(options.tooltips.footerFontSize, Chart.defaults.global.defaultFontSize),
					_footerAlign: options.tooltips.footerAlign,
					footerSpacing: options.tooltips.footerSpacing,
					footerMarginTop: options.tooltips.footerMarginTop,

					// Appearance
					caretSize: options.tooltips.caretSize,
					cornerRadius: options.tooltips.cornerRadius,
					backgroundColor: options.tooltips.backgroundColor,
					opacity: 0,
					legendColorBackground: options.tooltips.multiKeyBackground
				}
			});
		},

		// Get the title
		// Args are: (tooltipItem, data)
		getTitle: function() {
			var beforeTitle = this._options.tooltips.callbacks.beforeTitle.apply(this, arguments),
				title = this._options.tooltips.callbacks.title.apply(this, arguments),
				afterTitle = this._options.tooltips.callbacks.afterTitle.apply(this, arguments);

			var lines = [];
			lines = pushOrConcat(lines, beforeTitle);
			lines = pushOrConcat(lines, title);
			lines = pushOrConcat(lines, afterTitle);

			return lines;
		},

		// Args are: (tooltipItem, data)
		getBeforeBody: function() {
			var lines = this._options.tooltips.callbacks.beforeBody.apply(this, arguments);
			return helpers.isArray(lines) ? lines : lines !== undefined ? [lines] : [];
		},

		// Args are: (tooltipItem, data)
		getBody: function(tooltipItems, data) {
			var lines = [];

			helpers.each(tooltipItems, function(bodyItem) {
				helpers.pushAllIfDefined(this._options.tooltips.callbacks.beforeLabel.call(this, bodyItem, data), lines);
				helpers.pushAllIfDefined(this._options.tooltips.callbacks.label.call(this, bodyItem, data), lines);
				helpers.pushAllIfDefined(this._options.tooltips.callbacks.afterLabel.call(this, bodyItem, data), lines);
			}, this);

			return lines;
		},

		// Args are: (tooltipItem, data)
		getAfterBody: function() {
			var lines = this._options.tooltips.callbacks.afterBody.apply(this, arguments);
			return helpers.isArray(lines) ? lines : lines !== undefined ? [lines] : [];
		},

		// Get the footer and beforeFooter and afterFooter lines
		// Args are: (tooltipItem, data)
		getFooter: function() {
			var beforeFooter = this._options.tooltips.callbacks.beforeFooter.apply(this, arguments);
			var footer = this._options.tooltips.callbacks.footer.apply(this, arguments);
			var afterFooter = this._options.tooltips.callbacks.afterFooter.apply(this, arguments);

			var lines = [];
			lines = pushOrConcat(lines, beforeFooter);
			lines = pushOrConcat(lines, footer);
			lines = pushOrConcat(lines, afterFooter);

			return lines;
		},

		getAveragePosition: function(elements) {

			if (!elements.length) {
				return false;
			}

			var xPositions = [];
			var yPositions = [];

			helpers.each(elements, function(el) {
				if (el) {
					var pos = el.tooltipPosition();
					xPositions.push(pos.x);
					yPositions.push(pos.y);
				}
			});

			var x = 0,
				y = 0;
			for (var i = 0; i < xPositions.length; i++) {
				x += xPositions[i];
				y += yPositions[i];
			}

			return {
				x: Math.round(x / xPositions.length),
				y: Math.round(y / xPositions.length)
			};

		},

		update: function(changed) {
			if (this._active.length) {
				this._model.opacity = 1;

				var element = this._active[0],
					labelColors = [],
					tooltipPosition;

				var tooltipItems = [];

				if (this._options.tooltips.mode === 'single') {
					var yScale = element._yScale || element._scale; // handle radar || polarArea charts
					tooltipItems.push({
						xLabel: element._xScale ? element._xScale.getLabelForIndex(element._index, element._datasetIndex) : '',
						yLabel: yScale ? yScale.getLabelForIndex(element._index, element._datasetIndex) : '',
						index: element._index,
						datasetIndex: element._datasetIndex
					});
					tooltipPosition = this.getAveragePosition(this._active);
				} else {
					helpers.each(this._data.datasets, function(dataset, datasetIndex) {
						if (!helpers.isDatasetVisible(dataset)) {
							return;
						}
						var currentElement = dataset.metaData[element._index];
						if (currentElement) {
							var yScale = element._yScale || element._scale; // handle radar || polarArea charts

							tooltipItems.push({
								xLabel: currentElement._xScale ? currentElement._xScale.getLabelForIndex(currentElement._index, currentElement._datasetIndex) : '',
								yLabel: yScale ? yScale.getLabelForIndex(currentElement._index, currentElement._datasetIndex) : '',
								index: element._index,
								datasetIndex: datasetIndex
							});
						}
					}, null, element._yScale.options.stacked);

					helpers.each(this._active, function(active) {
						if (active) {
							labelColors.push({
								borderColor: active._view.borderColor,
								backgroundColor: active._view.backgroundColor
							});
						}
					}, null, element._yScale.options.stacked);

					tooltipPosition = this.getAveragePosition(this._active);
					tooltipPosition.y = this._active[0]._yScale.getPixelForDecimal(0.5);
				}

				// Build the Text Lines
				helpers.extend(this._model, {
					title: this.getTitle(tooltipItems, this._data),
					beforeBody: this.getBeforeBody(tooltipItems, this._data),
					body: this.getBody(tooltipItems, this._data),
					afterBody: this.getAfterBody(tooltipItems, this._data),
					footer: this.getFooter(tooltipItems, this._data)
				});

				helpers.extend(this._model, {
					x: Math.round(tooltipPosition.x),
					y: Math.round(tooltipPosition.y),
					caretPadding: helpers.getValueOrDefault(tooltipPosition.padding, 2),
					labelColors: labelColors
				});

				// We need to determine alignment of
				var tooltipSize = this.getTooltipSize(this._model);
				this.determineAlignment(tooltipSize); // Smart Tooltip placement to stay on the canvas

				helpers.extend(this._model, this.getBackgroundPoint(this._model, tooltipSize));
			} else {
				this._model.opacity = 0;
			}

			if (changed && this._options.tooltips.custom) {
				this._options.tooltips.custom.call(this, this._model);
			}

			return this;
		},
		getTooltipSize: function getTooltipSize(vm) {
			var ctx = this._chart.ctx;

			var size = {
				height: vm.yPadding * 2, // Tooltip Padding
				width: 0
			};
			var combinedBodyLength = vm.body.length + vm.beforeBody.length + vm.afterBody.length;

			size.height += vm.title.length * vm.titleFontSize; // Title Lines
			size.height += (vm.title.length - 1) * vm.titleSpacing; // Title Line Spacing
			size.height += vm.title.length ? vm.titleMarginBottom : 0; // Title's bottom Margin
			size.height += combinedBodyLength * vm.bodyFontSize; // Body Lines
			size.height += combinedBodyLength ? (combinedBodyLength - 1) * vm.bodySpacing : 0; // Body Line Spacing
			size.height += vm.footer.length ? vm.footerMarginTop : 0; // Footer Margin
			size.height += vm.footer.length * (vm.footerFontSize); // Footer Lines
			size.height += vm.footer.length ? (vm.footer.length - 1) * vm.footerSpacing : 0; // Footer Line Spacing

			// Width
			ctx.font = helpers.fontString(vm.titleFontSize, vm._titleFontStyle, vm._titleFontFamily);
			helpers.each(vm.title, function(line) {
				size.width = Math.max(size.width, ctx.measureText(line).width);
			});

			ctx.font = helpers.fontString(vm.bodyFontSize, vm._bodyFontStyle, vm._bodyFontFamily);
			helpers.each(vm.beforeBody.concat(vm.afterBody), function(line) {
				size.width = Math.max(size.width, ctx.measureText(line).width);
			});
			helpers.each(vm.body, function(line) {
				size.width = Math.max(size.width, ctx.measureText(line).width + (this._options.tooltips.mode !== 'single' ? (vm.bodyFontSize + 2) : 0));
			}, this);

			ctx.font = helpers.fontString(vm.footerFontSize, vm._footerFontStyle, vm._footerFontFamily);
			helpers.each(vm.footer, function(line) {
				size.width = Math.max(size.width, ctx.measureText(line).width);
			});
			size.width += 2 * vm.xPadding;

			return size;
		},
		determineAlignment: function determineAlignment(size) {
			if (this._model.y < size.height) {
				this._model.yAlign = 'top';
			} else if (this._model.y > (this._chart.height - size.height)) {
				this._model.yAlign = 'bottom';
			}

			var lf, rf; // functions to determine left, right alignment
			var olf, orf; // functions to determine if left/right alignment causes tooltip to go outside chart
			var yf; // function to get the y alignment if the tooltip goes outside of the left or right edges
			var _this = this;
			var midX = (this._chartInstance.chartArea.left + this._chartInstance.chartArea.right) / 2;
			var midY = (this._chartInstance.chartArea.top + this._chartInstance.chartArea.bottom) / 2;

			if (this._model.yAlign === 'center') {
				lf = function(x) {
					return x <= midX;
				};
				rf = function(x) {
					return x > midX;
				};
			} else {
				lf = function(x) {
					return x <= (size.width / 2);
				};
				rf = function(x) {
					return x >= (_this._chart.width - (size.width / 2));
				};
			}

			olf = function(x) {
				return x + size.width > _this._chart.width;
			};
			orf = function(x) {
				return x - size.width < 0;
			};
			yf = function(y) {
				return y <= midY ? 'top' : 'bottom';
			};

			if (lf(this._model.x)) {
				this._model.xAlign = 'left';

				// Is tooltip too wide and goes over the right side of the chart.?
				if (olf(this._model.x)) {
					this._model.xAlign = 'center';
					this._model.yAlign = yf(this._model.y);
				}
			} else if (rf(this._model.x)) {
				this._model.xAlign = 'right';

				// Is tooltip too wide and goes outside left edge of canvas?
				if (orf(this._model.x)) {
					this._model.xAlign = 'center';
					this._model.yAlign = yf(this._model.y);
				}
			}
		},
		getBackgroundPoint: function getBackgroundPoint(vm, size) {
			// Background Position
			var pt = {
				x: vm.x,
				y: vm.y
			};

			if (vm.xAlign === 'right') {
				pt.x -= size.width;
			} else if (vm.xAlign === 'center') {
				pt.x -= (size.width / 2);
			}

			if (vm.yAlign === 'top') {
				pt.y += vm.caretPadding + vm.caretSize;
			} else if (vm.yAlign === 'bottom') {
				pt.y -= size.height + vm.caretPadding + vm.caretSize;
			} else {
				pt.y -= (size.height / 2);
			}

			if (vm.yAlign === 'center') {
				if (vm.xAlign === 'left') {
					pt.x += vm.caretPadding + vm.caretSize;
				} else if (vm.xAlign === 'right') {
					pt.x -= vm.caretPadding + vm.caretSize;
				}
			} else {
				if (vm.xAlign === 'left') {
					pt.x -= vm.cornerRadius + vm.caretPadding;
				} else if (vm.xAlign === 'right') {
					pt.x += vm.cornerRadius + vm.caretPadding;
				}
			}

			return pt;
		},
		drawCaret: function drawCaret(tooltipPoint, size, opacity, caretPadding) {
			var vm = this._view;
			var ctx = this._chart.ctx;
			var x1, x2, x3;
			var y1, y2, y3;

			if (vm.yAlign === 'center') {
				// Left or right side
				if (vm.xAlign === 'left') {
					x1 = tooltipPoint.x;
					x2 = x1 - vm.caretSize;
					x3 = x1;
				} else {
					x1 = tooltipPoint.x + size.width;
					x2 = x1 + vm.caretSize;
					x3 = x1;
				}

				y2 = tooltipPoint.y + (size.height / 2);
				y1 = y2 - vm.caretSize;
				y3 = y2 + vm.caretSize;
			} else {
				if (vm.xAlign === 'left') {
					x1 = tooltipPoint.x + vm.cornerRadius;
					x2 = x1 + vm.caretSize;
					x3 = x2 + vm.caretSize;
				} else if (vm.xAlign === 'right') {
					x1 = tooltipPoint.x + size.width - vm.cornerRadius;
					x2 = x1 - vm.caretSize;
					x3 = x2 - vm.caretSize;
				} else {
					x2 = tooltipPoint.x + (size.width / 2);
					x1 = x2 - vm.caretSize;
					x3 = x2 + vm.caretSize;
				}

				if (vm.yAlign === 'top') {
					y1 = tooltipPoint.y;
					y2 = y1 - vm.caretSize;
					y3 = y1;
				} else {
					y1 = tooltipPoint.y + size.height;
					y2 = y1 + vm.caretSize;
					y3 = y1;
				}
			}

			var bgColor = helpers.color(vm.backgroundColor);
			ctx.fillStyle = bgColor.alpha(opacity * bgColor.alpha()).rgbString();
			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.lineTo(x3, y3);
			ctx.closePath();
			ctx.fill();
		},
		drawTitle: function drawTitle(pt, vm, ctx, opacity) {
			if (vm.title.length) {
				ctx.textAlign = vm._titleAlign;
				ctx.textBaseline = "top";
				
				var titleColor = helpers.color(vm.titleColor);
				ctx.fillStyle = titleColor.alpha(opacity * titleColor.alpha()).rgbString();
				ctx.font = helpers.fontString(vm.titleFontSize, vm._titleFontStyle, vm._titleFontFamily);

				helpers.each(vm.title, function(title, i) {
					ctx.fillText(title, pt.x, pt.y);
					pt.y += vm.titleFontSize + vm.titleSpacing; // Line Height and spacing

					if (i + 1 === vm.title.length) {
						pt.y += vm.titleMarginBottom - vm.titleSpacing; // If Last, add margin, remove spacing
					}
				});
			}
		},
		drawBody: function drawBody(pt, vm, ctx, opacity) {
			ctx.textAlign = vm._bodyAlign;
			ctx.textBaseline = "top";

			var bodyColor = helpers.color(vm.bodyColor);
			ctx.fillStyle = bodyColor.alpha(opacity * bodyColor.alpha()).rgbString();
			ctx.font = helpers.fontString(vm.bodyFontSize, vm._bodyFontStyle, vm._bodyFontFamily);

			// Before Body
			helpers.each(vm.beforeBody, function(beforeBody) {
				ctx.fillText(beforeBody, pt.x, pt.y);
				pt.y += vm.bodyFontSize + vm.bodySpacing;
			});

			helpers.each(vm.body, function(body, i) {
				// Draw Legend-like boxes if needed
				if (this._options.tooltips.mode !== 'single') {
					// Fill a white rect so that colours merge nicely if the opacity is < 1
					ctx.fillStyle = helpers.color(vm.legendColorBackground).alpha(opacity).rgbaString();
					ctx.fillRect(pt.x, pt.y, vm.bodyFontSize, vm.bodyFontSize);

					// Border
					ctx.strokeStyle = helpers.color(vm.labelColors[i].borderColor).alpha(opacity).rgbaString();
					ctx.strokeRect(pt.x, pt.y, vm.bodyFontSize, vm.bodyFontSize);

					// Inner square
					ctx.fillStyle = helpers.color(vm.labelColors[i].backgroundColor).alpha(opacity).rgbaString();
					ctx.fillRect(pt.x + 1, pt.y + 1, vm.bodyFontSize - 2, vm.bodyFontSize - 2);

					ctx.fillStyle = helpers.color(vm.bodyColor).alpha(opacity).rgbaString(); // Return fill style for text
				}

				// Body Line
				ctx.fillText(body, pt.x + (this._options.tooltips.mode !== 'single' ? (vm.bodyFontSize + 2) : 0), pt.y);

				pt.y += vm.bodyFontSize + vm.bodySpacing;
			}, this);

			// After Body
			helpers.each(vm.afterBody, function(afterBody) {
				ctx.fillText(afterBody, pt.x, pt.y);
				pt.y += vm.bodyFontSize;
			});

			pt.y -= vm.bodySpacing; // Remove last body spacing
		},
		drawFooter: function drawFooter(pt, vm, ctx, opacity) {
			if (vm.footer.length) {
				pt.y += vm.footerMarginTop;

				ctx.textAlign = vm._footerAlign;
				ctx.textBaseline = "top";
				
				var footerColor = helpers.color(vm.footerColor);
				ctx.fillStyle = footerColor.alpha(opacity * footerColor.alpha()).rgbString();
				ctx.font = helpers.fontString(vm.footerFontSize, vm._footerFontStyle, vm._footerFontFamily);

				helpers.each(vm.footer, function(footer) {
					ctx.fillText(footer, pt.x, pt.y);
					pt.y += vm.footerFontSize + vm.footerSpacing;
				});
			}
		},
		draw: function draw() {
			var ctx = this._chart.ctx;
			var vm = this._view;

			if (vm.opacity === 0) {
				return;
			}

			var caretPadding = vm.caretPadding;
			var tooltipSize = this.getTooltipSize(vm);
			var pt = {
				x: vm.x,
				y: vm.y
			};

			// IE11/Edge does not like very small opacities, so snap to 0
			var opacity = Math.abs(vm.opacity < 1e-3) ? 0 : vm.opacity;

			if (this._options.tooltips.enabled) {
				// Draw Background
				var bgColor = helpers.color(vm.backgroundColor);
				ctx.fillStyle = bgColor.alpha(opacity * bgColor.alpha()).rgbString();
				helpers.drawRoundedRectangle(ctx, pt.x, pt.y, tooltipSize.width, tooltipSize.height, vm.cornerRadius);
				ctx.fill();

				// Draw Caret
				this.drawCaret(pt, tooltipSize, opacity, caretPadding);

				// Draw Title, Body, and Footer
				pt.x += vm.xPadding;
				pt.y += vm.yPadding;

				// Titles
				this.drawTitle(pt, vm, ctx, opacity);

				// Body
				this.drawBody(pt, vm, ctx, opacity);

				// Footer
				this.drawFooter(pt, vm, ctx, opacity);
			}
		}
	});
};

},{}],33:[function(require,module,exports){
"use strict";

module.exports = function(Chart, moment) {

  var helpers = Chart.helpers;

  Chart.defaults.global.elements.arc = {
    backgroundColor: Chart.defaults.global.defaultColor,
    borderColor: "#fff",
    borderWidth: 2
  };

  Chart.elements.Arc = Chart.Element.extend({
    inLabelRange: function(mouseX) {
      var vm = this._view;

      if (vm) {
        return (Math.pow(mouseX - vm.x, 2) < Math.pow(vm.radius + vm.hoverRadius, 2));
      } else {
        return false;
      }
    },
    inRange: function(chartX, chartY) {

      var vm = this._view;

      if (vm) {
        var pointRelativePosition = helpers.getAngleFromPoint(vm, {
          x: chartX,
          y: chartY
        });

        // Put into the range of (-PI/2, 3PI/2]
        var startAngle = vm.startAngle < (-0.5 * Math.PI) ? vm.startAngle + (2.0 * Math.PI) : vm.startAngle > (1.5 * Math.PI) ? vm.startAngle - (2.0 * Math.PI) : vm.startAngle;
        var endAngle = vm.endAngle < (-0.5 * Math.PI) ? vm.endAngle + (2.0 * Math.PI) : vm.endAngle > (1.5 * Math.PI) ? vm.endAngle - (2.0 * Math.PI) : vm.endAngle;

        //Check if within the range of the open/close angle
        var betweenAngles = (pointRelativePosition.angle >= startAngle && pointRelativePosition.angle <= endAngle),
          withinRadius = (pointRelativePosition.distance >= vm.innerRadius && pointRelativePosition.distance <= vm.outerRadius);

        return (betweenAngles && withinRadius);
      } else {
        return false;
      }
    },
    tooltipPosition: function() {
      var vm = this._view;

      var centreAngle = vm.startAngle + ((vm.endAngle - vm.startAngle) / 2),
        rangeFromCentre = (vm.outerRadius - vm.innerRadius) / 2 + vm.innerRadius;
      return {
        x: vm.x + (Math.cos(centreAngle) * rangeFromCentre),
        y: vm.y + (Math.sin(centreAngle) * rangeFromCentre)
      };
    },
    draw: function() {

      var ctx = this._chart.ctx;
      var vm = this._view;

      ctx.beginPath();

      ctx.arc(vm.x, vm.y, vm.outerRadius, vm.startAngle, vm.endAngle);

      ctx.arc(vm.x, vm.y, vm.innerRadius, vm.endAngle, vm.startAngle, true);

      ctx.closePath();
      ctx.strokeStyle = vm.borderColor;
      ctx.lineWidth = vm.borderWidth;

      ctx.fillStyle = vm.backgroundColor;

      ctx.fill();
      ctx.lineJoin = 'bevel';

      if (vm.borderWidth) {
        ctx.stroke();
      }
    }
  });
};

},{}],34:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	Chart.defaults.global.elements.line = {
		tension: 0.4,
		backgroundColor: Chart.defaults.global.defaultColor,
		borderWidth: 3,
		borderColor: Chart.defaults.global.defaultColor,
		borderCapStyle: 'butt',
		borderDash: [],
		borderDashOffset: 0.0,
		borderJoinStyle: 'miter',
		fill: true // do we fill in the area between the line and its base axis
	};

	Chart.elements.Line = Chart.Element.extend({
		lineToNextPoint: function(previousPoint, point, nextPoint, skipHandler, previousSkipHandler) {
			var ctx = this._chart.ctx;

			if (point._view.skip) {
				skipHandler.call(this, previousPoint, point, nextPoint);
			} else if (previousPoint._view.skip) {
				previousSkipHandler.call(this, previousPoint, point, nextPoint);
			} else if (point._view.tension === 0) {
				ctx.lineTo(point._view.x, point._view.y);
			} else {
				// Line between points
				ctx.bezierCurveTo(
					previousPoint._view.controlPointNextX,
					previousPoint._view.controlPointNextY,
					point._view.controlPointPreviousX,
					point._view.controlPointPreviousY,
					point._view.x,
					point._view.y
				);
			}
		},

		draw: function() {
			var _this = this;

			var vm = this._view;
			var ctx = this._chart.ctx;
			var first = this._children[0];
			var last = this._children[this._children.length - 1];

			function loopBackToStart(drawLineToCenter) {
				if (!first._view.skip && !last._view.skip) {
					// Draw a bezier line from last to first
					ctx.bezierCurveTo(
						last._view.controlPointNextX,
						last._view.controlPointNextY,
						first._view.controlPointPreviousX,
						first._view.controlPointPreviousY,
						first._view.x,
						first._view.y
					);
				} else if (drawLineToCenter) {
					// Go to center
					ctx.lineTo(_this._view.scaleZero.x, _this._view.scaleZero.y);
				}
			}

			ctx.save();

			// If we had points and want to fill this line, do so.
			if (this._children.length > 0 && vm.fill) {
				// Draw the background first (so the border is always on top)
				ctx.beginPath();

				helpers.each(this._children, function(point, index) {
					var previous = helpers.previousItem(this._children, index);
					var next = helpers.nextItem(this._children, index);

					// First point moves to it's starting position no matter what
					if (index === 0) {
						if (this._loop) {
							ctx.moveTo(vm.scaleZero.x, vm.scaleZero.y);
						} else {
							ctx.moveTo(point._view.x, vm.scaleZero);
						}

						if (point._view.skip) {
							if (!this._loop) {
								ctx.moveTo(next._view.x, this._view.scaleZero);
							}
						} else {
							ctx.lineTo(point._view.x, point._view.y);
						}
					} else {
						this.lineToNextPoint(previous, point, next, function(previousPoint, point, nextPoint) {
							if (this._loop) {
								// Go to center
								ctx.lineTo(this._view.scaleZero.x, this._view.scaleZero.y);
							} else {
								ctx.lineTo(previousPoint._view.x, this._view.scaleZero);
								ctx.moveTo(nextPoint._view.x, this._view.scaleZero);
							}
						}, function(previousPoint, point) {
							// If we skipped the last point, draw a line to ourselves so that the fill is nice
							ctx.lineTo(point._view.x, point._view.y);
						});
					}
				}, this);

				// For radial scales, loop back around to the first point
				if (this._loop) {
					loopBackToStart(true);
				} else {
					//Round off the line by going to the base of the chart, back to the start, then fill.
					ctx.lineTo(this._children[this._children.length - 1]._view.x, vm.scaleZero);
					ctx.lineTo(this._children[0]._view.x, vm.scaleZero);
				}

				ctx.fillStyle = vm.backgroundColor || Chart.defaults.global.defaultColor;
				ctx.closePath();
				ctx.fill();
			}

			// Now draw the line between all the points with any borders
			ctx.lineCap = vm.borderCapStyle || Chart.defaults.global.elements.line.borderCapStyle;

			// IE 9 and 10 do not support line dash
			if (ctx.setLineDash) {
				ctx.setLineDash(vm.borderDash || Chart.defaults.global.elements.line.borderDash);
			}

			ctx.lineDashOffset = vm.borderDashOffset || Chart.defaults.global.elements.line.borderDashOffset;
			ctx.lineJoin = vm.borderJoinStyle || Chart.defaults.global.elements.line.borderJoinStyle;
			ctx.lineWidth = vm.borderWidth || Chart.defaults.global.elements.line.borderWidth;
			ctx.strokeStyle = vm.borderColor || Chart.defaults.global.defaultColor;
			ctx.beginPath();

			helpers.each(this._children, function(point, index) {
				var previous = helpers.previousItem(this._children, index);
				var next = helpers.nextItem(this._children, index);

				if (index === 0) {
					ctx.moveTo(point._view.x, point._view.y);
				} else {
					this.lineToNextPoint(previous, point, next, function(previousPoint, point, nextPoint) {
						ctx.moveTo(nextPoint._view.x, nextPoint._view.y);
					}, function(previousPoint, point) {
						// If we skipped the last point, move up to our point preventing a line from being drawn
						ctx.moveTo(point._view.x, point._view.y);
					});
				}
			}, this);

			if (this._loop && this._children.length > 0) {
				loopBackToStart();
			}

			ctx.stroke();
			ctx.restore();
		}
	});
};
},{}],35:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	Chart.defaults.global.elements.point = {
		radius: 3,
		pointStyle: 'circle',
		backgroundColor: Chart.defaults.global.defaultColor,
		borderWidth: 1,
		borderColor: Chart.defaults.global.defaultColor,
		// Hover
		hitRadius: 1,
		hoverRadius: 4,
		hoverBorderWidth: 1
	};


	Chart.elements.Point = Chart.Element.extend({
		inRange: function(mouseX, mouseY) {
			var vm = this._view;

			if (vm) {
				var hoverRange = vm.hitRadius + vm.radius;
				return ((Math.pow(mouseX - vm.x, 2) + Math.pow(mouseY - vm.y, 2)) < Math.pow(hoverRange, 2));
			} else {
				return false;
			}
		},
		inLabelRange: function(mouseX) {
			var vm = this._view;

			if (vm) {
				return (Math.pow(mouseX - vm.x, 2) < Math.pow(vm.radius + vm.hitRadius, 2));
			} else {
				return false;
			}
		},
		tooltipPosition: function() {
			var vm = this._view;
			return {
				x: vm.x,
				y: vm.y,
				padding: vm.radius + vm.borderWidth
			};
		},
		draw: function() {

			var vm = this._view;
			var ctx = this._chart.ctx;


			if (vm.skip) {
				return;
			}

			if (typeof vm.pointStyle === 'object' && ((vm.pointStyle.toString() === '[object HTMLImageElement]') || (vm.pointStyle.toString() === '[object HTMLCanvasElement]'))) {
				ctx.drawImage(vm.pointStyle, vm.x - vm.pointStyle.width / 2, vm.y - vm.pointStyle.height / 2);
				return;
			}

			if (!isNaN(vm.radius) && vm.radius > 0) {

				ctx.strokeStyle = vm.borderColor || Chart.defaults.global.defaultColor;
				ctx.lineWidth = helpers.getValueOrDefault(vm.borderWidth, Chart.defaults.global.elements.point.borderWidth);

				ctx.fillStyle = vm.backgroundColor || Chart.defaults.global.defaultColor;

				var radius = vm.radius;

				var xOffset;
				var yOffset;

				switch (vm.pointStyle) {
					// Default includes circle
					default: ctx.beginPath();
					ctx.arc(vm.x, vm.y, radius, 0, Math.PI * 2);
					ctx.closePath();
					ctx.fill();
					break;
					case 'triangle':
							ctx.beginPath();
						var edgeLength = 3 * radius / Math.sqrt(3);
						var height = edgeLength * Math.sqrt(3) / 2;
						ctx.moveTo(vm.x - edgeLength / 2, vm.y + height / 3);
						ctx.lineTo(vm.x + edgeLength / 2, vm.y + height / 3);
						ctx.lineTo(vm.x, vm.y - 2 * height / 3);
						ctx.closePath();
						ctx.fill();
						break;
					case 'rect':
							ctx.fillRect(vm.x - 1 / Math.SQRT2 * radius, vm.y - 1 / Math.SQRT2 * radius, 2 / Math.SQRT2 * radius, 2 / Math.SQRT2 * radius);
						ctx.strokeRect(vm.x - 1 / Math.SQRT2 * radius, vm.y - 1 / Math.SQRT2 * radius, 2 / Math.SQRT2 * radius, 2 / Math.SQRT2 * radius);
						break;
					case 'rectRot':
							ctx.translate(vm.x, vm.y);
						ctx.rotate(Math.PI / 4);
						ctx.fillRect(-1 / Math.SQRT2 * radius, -1 / Math.SQRT2 * radius, 2 / Math.SQRT2 * radius, 2 / Math.SQRT2 * radius);
						ctx.strokeRect(-1 / Math.SQRT2 * radius, -1 / Math.SQRT2 * radius, 2 / Math.SQRT2 * radius, 2 / Math.SQRT2 * radius);
						ctx.setTransform(1, 0, 0, 1, 0, 0);
						break;
					case 'cross':
							ctx.beginPath();
						ctx.moveTo(vm.x, vm.y + radius);
						ctx.lineTo(vm.x, vm.y - radius);
						ctx.moveTo(vm.x - radius, vm.y);
						ctx.lineTo(vm.x + radius, vm.y);
						ctx.closePath();
						break;
					case 'crossRot':
							ctx.beginPath();
						xOffset = Math.cos(Math.PI / 4) * radius;
						yOffset = Math.sin(Math.PI / 4) * radius;
						ctx.moveTo(vm.x - xOffset, vm.y - yOffset);
						ctx.lineTo(vm.x + xOffset, vm.y + yOffset);
						ctx.moveTo(vm.x - xOffset, vm.y + yOffset);
						ctx.lineTo(vm.x + xOffset, vm.y - yOffset);
						ctx.closePath();
						break;
					case 'star':
							ctx.beginPath();
						ctx.moveTo(vm.x, vm.y + radius);
						ctx.lineTo(vm.x, vm.y - radius);
						ctx.moveTo(vm.x - radius, vm.y);
						ctx.lineTo(vm.x + radius, vm.y);
						xOffset = Math.cos(Math.PI / 4) * radius;
						yOffset = Math.sin(Math.PI / 4) * radius;
						ctx.moveTo(vm.x - xOffset, vm.y - yOffset);
						ctx.lineTo(vm.x + xOffset, vm.y + yOffset);
						ctx.moveTo(vm.x - xOffset, vm.y + yOffset);
						ctx.lineTo(vm.x + xOffset, vm.y - yOffset);
						ctx.closePath();
						break;
					case 'line':
							ctx.beginPath();
						ctx.moveTo(vm.x - radius, vm.y);
						ctx.lineTo(vm.x + radius, vm.y);
						ctx.closePath();
						break;
					case 'dash':
							ctx.beginPath();
						ctx.moveTo(vm.x, vm.y);
						ctx.lineTo(vm.x + radius, vm.y);
						ctx.closePath();
						break;
				}

				ctx.stroke();
			}
		}
	});
};
},{}],36:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	Chart.defaults.global.elements.rectangle = {
		backgroundColor: Chart.defaults.global.defaultColor,
		borderWidth: 0,
		borderColor: Chart.defaults.global.defaultColor,
		borderSkipped: 'bottom'
	};

	Chart.elements.Rectangle = Chart.Element.extend({
		draw: function() {

			var ctx = this._chart.ctx;
			var vm = this._view;

			var halfWidth = vm.width / 2,
				leftX = vm.x - halfWidth,
				rightX = vm.x + halfWidth,
				top = vm.base - (vm.base - vm.y),
				halfStroke = vm.borderWidth / 2;

			// Canvas doesn't allow us to stroke inside the width so we can
			// adjust the sizes to fit if we're setting a stroke on the line
			if (vm.borderWidth) {
				leftX += halfStroke;
				rightX -= halfStroke;
				top += halfStroke;
			}

			ctx.beginPath();

			ctx.fillStyle = vm.backgroundColor;
			ctx.strokeStyle = vm.borderColor;
			ctx.lineWidth = vm.borderWidth;

			// Corner points, from bottom-left to bottom-right clockwise
			// | 1 2 |
			// | 0 3 |
			var corners = [
				[leftX, vm.base],
				[leftX, top],
				[rightX, top],
				[rightX, vm.base]
			];

			// Find first (starting) corner with fallback to 'bottom' 
			var borders = ['bottom', 'left', 'top', 'right'];
			var startCorner = borders.indexOf(vm.borderSkipped, 0);
			if (startCorner === -1)
				startCorner = 0;

			function cornerAt(index) {
				return corners[(startCorner + index) % 4];
			}

			// Draw rectangle from 'startCorner'
			ctx.moveTo.apply(ctx, cornerAt(0));
			for (var i = 1; i < 4; i++)
				ctx.lineTo.apply(ctx, cornerAt(i));

			ctx.fill();
			if (vm.borderWidth) {
				ctx.stroke();
			}
		},
		height: function() {
			var vm = this._view;
			return vm.base - vm.y;
		},
		inRange: function(mouseX, mouseY) {
			var vm = this._view;
			var inRange = false;

			if (vm) {
				if (vm.y < vm.base) {
					inRange = (mouseX >= vm.x - vm.width / 2 && mouseX <= vm.x + vm.width / 2) && (mouseY >= vm.y && mouseY <= vm.base);
				} else {
					inRange = (mouseX >= vm.x - vm.width / 2 && mouseX <= vm.x + vm.width / 2) && (mouseY >= vm.base && mouseY <= vm.y);
				}
			}

			return inRange;
		},
		inLabelRange: function(mouseX) {
			var vm = this._view;

			if (vm) {
				return (mouseX >= vm.x - vm.width / 2 && mouseX <= vm.x + vm.width / 2);
			} else {
				return false;
			}
		},
		tooltipPosition: function() {
			var vm = this._view;
			return {
				x: vm.x,
				y: vm.y
			};
		}
	});

};
},{}],37:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;
	// Default config for a category scale
	var defaultConfig = {
		position: "bottom"
	};

	var DatasetScale = Chart.Scale.extend({
		buildTicks: function(index) {
			this.startIndex = 0;
			this.endIndex = this.chart.data.labels.length;
			var findIndex;

			if (this.options.ticks.min !== undefined) {
				// user specified min value
				findIndex = helpers.indexOf(this.chart.data.labels, this.options.ticks.min);
				this.startIndex = findIndex !== -1 ? findIndex : this.startIndex;
			}

			if (this.options.ticks.max !== undefined) {
				// user specified max value
				findIndex = helpers.indexOf(this.chart.data.labels, this.options.ticks.max);
				this.endIndex = findIndex !== -1 ? findIndex : this.endIndex;
			}

			// If we are viewing some subset of labels, slice the original array
			this.ticks = (this.startIndex === 0 && this.endIndex === this.chart.data.labels.length) ? this.chart.data.labels : this.chart.data.labels.slice(this.startIndex, this.endIndex + 1);
		},

		getLabelForIndex: function(index, datasetIndex) {
			return this.ticks[index];
		},

		// Used to get data value locations.  Value can either be an index or a numerical value
		getPixelForValue: function(value, index, datasetIndex, includeOffset) {
			// 1 is added because we need the length but we have the indexes
			var offsetAmt = Math.max((this.ticks.length - ((this.options.gridLines.offsetGridLines) ? 0 : 1)), 1);

			if (this.isHorizontal()) {
				var innerWidth = this.width - (this.paddingLeft + this.paddingRight);
				var valueWidth = innerWidth / offsetAmt;
				var widthOffset = (valueWidth * (index - this.startIndex)) + this.paddingLeft;

				if (this.options.gridLines.offsetGridLines && includeOffset) {
					widthOffset += (valueWidth / 2);
				}

				return this.left + Math.round(widthOffset);
			} else {
				var innerHeight = this.height - (this.paddingTop + this.paddingBottom);
				var valueHeight = innerHeight / offsetAmt;
				var heightOffset = (valueHeight * (index - this.startIndex)) + this.paddingTop;

				if (this.options.gridLines.offsetGridLines && includeOffset) {
					heightOffset += (valueHeight / 2);
				}

				return this.top + Math.round(heightOffset);
			}
		},
		getPixelForTick: function(index, includeOffset) {
			return this.getPixelForValue(this.ticks[index], index + this.startIndex, null, includeOffset);
		}
	});

	Chart.scaleService.registerScaleType("category", DatasetScale, defaultConfig);

};
},{}],38:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	var defaultConfig = {
		position: "left",
		ticks: {
			callback: function(tickValue, index, ticks) {
				var delta = ticks[1] - ticks[0];

				// If we have a number like 2.5 as the delta, figure out how many decimal places we need
				if (Math.abs(delta) > 1) {
					if (tickValue !== Math.floor(tickValue)) {
						// not an integer
						delta = tickValue - Math.floor(tickValue);
					}
				}

				var logDelta = helpers.log10(Math.abs(delta));
				var tickString = '';

				if (tickValue !== 0) {
					var numDecimal = -1 * Math.floor(logDelta);
					numDecimal = Math.max(Math.min(numDecimal, 20), 0); // toFixed has a max of 20 decimal places
					tickString = tickValue.toFixed(numDecimal);
				} else {
					tickString = '0'; // never show decimal places for 0
				}

				return tickString;
			}
		}
	};

	var LinearScale = Chart.Scale.extend({
		determineDataLimits: function() {
			// First Calculate the range
			this.min = null;
			this.max = null;

			if (this.options.stacked) {
				var valuesPerType = {};
				var hasPositiveValues = false;
				var hasNegativeValues = false;

				helpers.each(this.chart.data.datasets, function(dataset) {
					if (valuesPerType[dataset.type] === undefined) {
						valuesPerType[dataset.type] = {
							positiveValues: [],
							negativeValues: []
						};
					}

					// Store these per type
					var positiveValues = valuesPerType[dataset.type].positiveValues;
					var negativeValues = valuesPerType[dataset.type].negativeValues;

					if (helpers.isDatasetVisible(dataset) && (this.isHorizontal() ? dataset.xAxisID === this.id : dataset.yAxisID === this.id)) {
						helpers.each(dataset.data, function(rawValue, index) {

							var value = +this.getRightValue(rawValue);
							if (isNaN(value)) {
								return;
							}

							positiveValues[index] = positiveValues[index] || 0;
							negativeValues[index] = negativeValues[index] || 0;

							if (this.options.relativePoints) {
								positiveValues[index] = 100;
							} else {
								if (value < 0) {
									hasNegativeValues = true;
									negativeValues[index] += value;
								} else {
									hasPositiveValues = true;
									positiveValues[index] += value;
								}
							}
						}, this);
					}
				}, this);

				helpers.each(valuesPerType, function(valuesForType) {
					var values = valuesForType.positiveValues.concat(valuesForType.negativeValues);
					var minVal = helpers.min(values);
					var maxVal = helpers.max(values);
					this.min = this.min === null ? minVal : Math.min(this.min, minVal);
					this.max = this.max === null ? maxVal : Math.max(this.max, maxVal);
				}, this);

			} else {
				helpers.each(this.chart.data.datasets, function(dataset) {
					if (helpers.isDatasetVisible(dataset) && (this.isHorizontal() ? dataset.xAxisID === this.id : dataset.yAxisID === this.id)) {
						helpers.each(dataset.data, function(rawValue, index) {
							var value = +this.getRightValue(rawValue);
							if (isNaN(value)) {
								return;
							}

							if (this.min === null) {
								this.min = value;
							} else if (value < this.min) {
								this.min = value;
							}

							if (this.max === null) {
								this.max = value;
							} else if (value > this.max) {
								this.max = value;
							}
						}, this);
					}
				}, this);
			}

			// If we are forcing it to begin at 0, but 0 will already be rendered on the chart,
			// do nothing since that would make the chart weird. If the user really wants a weird chart
			// axis, they can manually override it
			if (this.options.ticks.beginAtZero) {
				var minSign = helpers.sign(this.min);
				var maxSign = helpers.sign(this.max);

				if (minSign < 0 && maxSign < 0) {
					// move the top up to 0
					this.max = 0;
				} else if (minSign > 0 && maxSign > 0) {
					// move the botttom down to 0
					this.min = 0;
				}
			}

			if (this.options.ticks.min !== undefined) {
				this.min = this.options.ticks.min;
			} else if (this.options.ticks.suggestedMin !== undefined) {
				this.min = Math.min(this.min, this.options.ticks.suggestedMin);
			}

			if (this.options.ticks.max !== undefined) {
				this.max = this.options.ticks.max;
			} else if (this.options.ticks.suggestedMax !== undefined) {
				this.max = Math.max(this.max, this.options.ticks.suggestedMax);
			}

			if (this.min === this.max) {
				this.min--;
				this.max++;
			}
		},
		buildTicks: function() {

			// Then calulate the ticks
			this.ticks = [];

			// Figure out what the max number of ticks we can support it is based on the size of
			// the axis area. For now, we say that the minimum tick spacing in pixels must be 50
			// We also limit the maximum number of ticks to 11 which gives a nice 10 squares on
			// the graph

			var maxTicks;

			if (this.isHorizontal()) {
				maxTicks = Math.min(this.options.ticks.maxTicksLimit ? this.options.ticks.maxTicksLimit : 11, Math.ceil(this.width / 50));
			} else {
				// The factor of 2 used to scale the font size has been experimentally determined.
				var tickFontSize = helpers.getValueOrDefault(this.options.ticks.fontSize, Chart.defaults.global.defaultFontSize);
				maxTicks = Math.min(this.options.ticks.maxTicksLimit ? this.options.ticks.maxTicksLimit : 11, Math.ceil(this.height / (2 * tickFontSize)));
			}

			// Make sure we always have at least 2 ticks
			maxTicks = Math.max(2, maxTicks);

			// To get a "nice" value for the tick spacing, we will use the appropriately named
			// "nice number" algorithm. See http://stackoverflow.com/questions/8506881/nice-label-algorithm-for-charts-with-minimum-ticks
			// for details.

			var spacing;
			var fixedStepSizeSet = (this.options.ticks.fixedStepSize && this.options.ticks.fixedStepSize > 0) || (this.options.ticks.stepSize && this.options.ticks.stepSize > 0);
			if (fixedStepSizeSet) {
				spacing = helpers.getValueOrDefault(this.options.ticks.fixedStepSize, this.options.ticks.stepSize);
			} else {
				var niceRange = helpers.niceNum(this.max - this.min, false);
				spacing = helpers.niceNum(niceRange / (maxTicks - 1), true);
			}
			var niceMin = Math.floor(this.min / spacing) * spacing;
			var niceMax = Math.ceil(this.max / spacing) * spacing;
			var numSpaces = (niceMax - niceMin) / spacing;

			// If very close to our rounded value, use it.
			if (helpers.almostEquals(numSpaces, Math.round(numSpaces), spacing / 1000)) {
				numSpaces = Math.round(numSpaces);
			} else {
				numSpaces = Math.ceil(numSpaces);
			}

			// Put the values into the ticks array
			this.ticks.push(this.options.ticks.min !== undefined ? this.options.ticks.min : niceMin);
			for (var j = 1; j < numSpaces; ++j) {
				this.ticks.push(niceMin + (j * spacing));
			}
			this.ticks.push(this.options.ticks.max !== undefined ? this.options.ticks.max : niceMax);

			if (this.options.position === "left" || this.options.position === "right") {
				// We are in a vertical orientation. The top value is the highest. So reverse the array
				this.ticks.reverse();
			}

			// At this point, we need to update our max and min given the tick values since we have expanded the
			// range of the scale
			this.max = helpers.max(this.ticks);
			this.min = helpers.min(this.ticks);

			if (this.options.ticks.reverse) {
				this.ticks.reverse();

				this.start = this.max;
				this.end = this.min;
			} else {
				this.start = this.min;
				this.end = this.max;
			}
		},
		getLabelForIndex: function(index, datasetIndex) {
			return +this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
		},
		convertTicksToLabels: function() {
			this.ticksAsNumbers = this.ticks.slice();
			this.zeroLineIndex = this.ticks.indexOf(0);

			Chart.Scale.prototype.convertTicksToLabels.call(this);
		},
		// Utils
		getPixelForValue: function(value, index, datasetIndex, includeOffset) {
			// This must be called after fit has been run so that
			//      this.left, this.top, this.right, and this.bottom have been defined
			var rightValue = +this.getRightValue(value);
			var pixel;
			var range = this.end - this.start;

			if (this.isHorizontal()) {
				var innerWidth = this.width - (this.paddingLeft + this.paddingRight);
				pixel = this.left + (innerWidth / range * (rightValue - this.start));
				return Math.round(pixel + this.paddingLeft);
			} else {
				var innerHeight = this.height - (this.paddingTop + this.paddingBottom);
				pixel = (this.bottom - this.paddingBottom) - (innerHeight / range * (rightValue - this.start));
				return Math.round(pixel);
			}
		},
		getPixelForTick: function(index, includeOffset) {
			return this.getPixelForValue(this.ticksAsNumbers[index], null, null, includeOffset);
		}
	});
	Chart.scaleService.registerScaleType("linear", LinearScale, defaultConfig);

};
},{}],39:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	var defaultConfig = {
		position: "left",

		// label settings
		ticks: {
			callback: function(value, index, arr) {
				var remain = value / (Math.pow(10, Math.floor(Chart.helpers.log10(value))));

				if (remain === 1 || remain === 2 || remain === 5 || index === 0 || index === arr.length - 1) {
					return value.toExponential();
				} else {
					return '';
				}
			}
		}
	};

	var LogarithmicScale = Chart.Scale.extend({
		determineDataLimits: function() {
			// Calculate Range
			this.min = null;
			this.max = null;

			if (this.options.stacked) {
				var valuesPerType = {};

				helpers.each(this.chart.data.datasets, function(dataset) {
					if (helpers.isDatasetVisible(dataset) && (this.isHorizontal() ? dataset.xAxisID === this.id : dataset.yAxisID === this.id)) {
						if (valuesPerType[dataset.type] === undefined) {
							valuesPerType[dataset.type] = [];
						}

						helpers.each(dataset.data, function(rawValue, index) {
							var values = valuesPerType[dataset.type];
							var value = +this.getRightValue(rawValue);
							if (isNaN(value)) {
								return;
							}

							values[index] = values[index] || 0;

							if (this.options.relativePoints) {
								values[index] = 100;
							} else {
								// Don't need to split positive and negative since the log scale can't handle a 0 crossing
								values[index] += value;
							}
						}, this);
					}
				}, this);

				helpers.each(valuesPerType, function(valuesForType) {
					var minVal = helpers.min(valuesForType);
					var maxVal = helpers.max(valuesForType);
					this.min = this.min === null ? minVal : Math.min(this.min, minVal);
					this.max = this.max === null ? maxVal : Math.max(this.max, maxVal);
				}, this);

			} else {
				helpers.each(this.chart.data.datasets, function(dataset) {
					if (helpers.isDatasetVisible(dataset) && (this.isHorizontal() ? dataset.xAxisID === this.id : dataset.yAxisID === this.id)) {
						helpers.each(dataset.data, function(rawValue, index) {
							var value = +this.getRightValue(rawValue);
							if (isNaN(value)) {
								return;
							}

							if (this.min === null) {
								this.min = value;
							} else if (value < this.min) {
								this.min = value;
							}

							if (this.max === null) {
								this.max = value;
							} else if (value > this.max) {
								this.max = value;
							}
						}, this);
					}
				}, this);
			}

			this.min = this.options.ticks.min !== undefined ? this.options.ticks.min : this.min;
			this.max = this.options.ticks.max !== undefined ? this.options.ticks.max : this.max;

			if (this.min === this.max) {
				if (this.min !== 0 && this.min !== null) {
					this.min = Math.pow(10, Math.floor(helpers.log10(this.min)) - 1);
					this.max = Math.pow(10, Math.floor(helpers.log10(this.max)) + 1);
				} else {
					this.min = 1;
					this.max = 10;
				}
			}
		},
		buildTicks: function() {
			// Reset the ticks array. Later on, we will draw a grid line at these positions
			// The array simply contains the numerical value of the spots where ticks will be
			this.ticks = [];

			// Figure out what the max number of ticks we can support it is based on the size of
			// the axis area. For now, we say that the minimum tick spacing in pixels must be 50
			// We also limit the maximum number of ticks to 11 which gives a nice 10 squares on
			// the graph

			var tickVal = this.options.ticks.min !== undefined ? this.options.ticks.min : Math.pow(10, Math.floor(helpers.log10(this.min)));

			while (tickVal < this.max) {
				this.ticks.push(tickVal);

				var exp = Math.floor(helpers.log10(tickVal));
				var significand = Math.floor(tickVal / Math.pow(10, exp)) + 1;

				if (significand === 10) {
					significand = 1;
					++exp;
				}

				tickVal = significand * Math.pow(10, exp);
			}

			var lastTick = this.options.ticks.max !== undefined ? this.options.ticks.max : tickVal;
			this.ticks.push(lastTick);

			if (this.options.position === "left" || this.options.position === "right") {
				// We are in a vertical orientation. The top value is the highest. So reverse the array
				this.ticks.reverse();
			}

			// At this point, we need to update our max and min given the tick values since we have expanded the
			// range of the scale
			this.max = helpers.max(this.ticks);
			this.min = helpers.min(this.ticks);

			if (this.options.ticks.reverse) {
				this.ticks.reverse();

				this.start = this.max;
				this.end = this.min;
			} else {
				this.start = this.min;
				this.end = this.max;
			}
		},
		convertTicksToLabels: function() {
			this.tickValues = this.ticks.slice();

			Chart.Scale.prototype.convertTicksToLabels.call(this);
		},
		// Get the correct tooltip label
		getLabelForIndex: function(index, datasetIndex) {
			return +this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
		},
		getPixelForTick: function(index, includeOffset) {
			return this.getPixelForValue(this.tickValues[index], null, null, includeOffset);
		},
		getPixelForValue: function(value, index, datasetIndex, includeOffset) {
			var pixel;

			var newVal = +this.getRightValue(value);
			var range = helpers.log10(this.end) - helpers.log10(this.start);

			if (this.isHorizontal()) {

				if (newVal === 0) {
					pixel = this.left + this.paddingLeft;
				} else {
					var innerWidth = this.width - (this.paddingLeft + this.paddingRight);
					pixel = this.left + (innerWidth / range * (helpers.log10(newVal) - helpers.log10(this.start)));
					pixel += this.paddingLeft;
				}
			} else {
				// Bottom - top since pixels increase downard on a screen
				if (newVal === 0) {
					pixel = this.top + this.paddingTop;
				} else {
					var innerHeight = this.height - (this.paddingTop + this.paddingBottom);
					pixel = (this.bottom - this.paddingBottom) - (innerHeight / range * (helpers.log10(newVal) - helpers.log10(this.start)));
				}
			}

			return pixel;
		}

	});
	Chart.scaleService.registerScaleType("logarithmic", LogarithmicScale, defaultConfig);

};
},{}],40:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	var defaultConfig = {
		display: true,

		//Boolean - Whether to animate scaling the chart from the centre
		animate: true,
		lineArc: false,
		position: "chartArea",

		angleLines: {
			display: true,
			color: "rgba(0, 0, 0, 0.1)",
			lineWidth: 1
		},

		// label settings
		ticks: {
			//Boolean - Show a backdrop to the scale label
			showLabelBackdrop: true,

			//String - The colour of the label backdrop
			backdropColor: "rgba(255,255,255,0.75)",

			//Number - The backdrop padding above & below the label in pixels
			backdropPaddingY: 2,

			//Number - The backdrop padding to the side of the label in pixels
			backdropPaddingX: 2
		},

		pointLabels: {
			//Number - Point label font size in pixels
			fontSize: 10,

			//Function - Used to convert point labels
			callback: function(label) {
				return label;
			}
		}
	};

	var LinearRadialScale = Chart.Scale.extend({
		getValueCount: function() {
			return this.chart.data.labels.length;
		},
		setDimensions: function() {
			// Set the unconstrained dimension before label rotation
			this.width = this.maxWidth;
			this.height = this.maxHeight;
			this.xCenter = Math.round(this.width / 2);
			this.yCenter = Math.round(this.height / 2);

			var minSize = helpers.min([this.height, this.width]);
			var tickFontSize = helpers.getValueOrDefault(this.options.ticks.fontSize, Chart.defaults.global.defaultFontSize);
			this.drawingArea = (this.options.display) ? (minSize / 2) - (tickFontSize / 2 + this.options.ticks.backdropPaddingY) : (minSize / 2);
		},
		determineDataLimits: function() {
			this.min = null;
			this.max = null;

			helpers.each(this.chart.data.datasets, function(dataset) {
				if (helpers.isDatasetVisible(dataset)) {
					helpers.each(dataset.data, function(rawValue, index) {
						var value = +this.getRightValue(rawValue);
						if (isNaN(value)) {
							return;
						}

						if (this.min === null) {
							this.min = value;
						} else if (value < this.min) {
							this.min = value;
						}

						if (this.max === null) {
							this.max = value;
						} else if (value > this.max) {
							this.max = value;
						}
					}, this);
				}
			}, this);

			// If we are forcing it to begin at 0, but 0 will already be rendered on the chart,
			// do nothing since that would make the chart weird. If the user really wants a weird chart
			// axis, they can manually override it
			if (this.options.ticks.beginAtZero) {
				var minSign = helpers.sign(this.min);
				var maxSign = helpers.sign(this.max);

				if (minSign < 0 && maxSign < 0) {
					// move the top up to 0
					this.max = 0;
				} else if (minSign > 0 && maxSign > 0) {
					// move the botttom down to 0
					this.min = 0;
				}
			}

			if (this.options.ticks.min !== undefined) {
				this.min = this.options.ticks.min;
			} else if (this.options.ticks.suggestedMin !== undefined) {
				this.min = Math.min(this.min, this.options.ticks.suggestedMin);
			}

			if (this.options.ticks.max !== undefined) {
				this.max = this.options.ticks.max;
			} else if (this.options.ticks.suggestedMax !== undefined) {
				this.max = Math.max(this.max, this.options.ticks.suggestedMax);
			}

			if (this.min === this.max) {
				this.min--;
				this.max++;
			}
		},
		buildTicks: function() {


			this.ticks = [];

			// Figure out what the max number of ticks we can support it is based on the size of
			// the axis area. For now, we say that the minimum tick spacing in pixels must be 50
			// We also limit the maximum number of ticks to 11 which gives a nice 10 squares on
			// the graph
			var tickFontSize = helpers.getValueOrDefault(this.options.ticks.fontSize, Chart.defaults.global.defaultFontSize);
			var maxTicks = Math.min(this.options.ticks.maxTicksLimit ? this.options.ticks.maxTicksLimit : 11, Math.ceil(this.drawingArea / (1.5 * tickFontSize)));
			maxTicks = Math.max(2, maxTicks); // Make sure we always have at least 2 ticks

			// To get a "nice" value for the tick spacing, we will use the appropriately named
			// "nice number" algorithm. See http://stackoverflow.com/questions/8506881/nice-label-algorithm-for-charts-with-minimum-ticks
			// for details.

			var niceRange = helpers.niceNum(this.max - this.min, false);
			var spacing = helpers.niceNum(niceRange / (maxTicks - 1), true);
			var niceMin = Math.floor(this.min / spacing) * spacing;
			var niceMax = Math.ceil(this.max / spacing) * spacing;

			var numSpaces = Math.ceil((niceMax - niceMin) / spacing);

			// Put the values into the ticks array
			this.ticks.push(this.options.ticks.min !== undefined ? this.options.ticks.min : niceMin);
			for (var j = 1; j < numSpaces; ++j) {
				this.ticks.push(niceMin + (j * spacing));
			}
			this.ticks.push(this.options.ticks.max !== undefined ? this.options.ticks.max : niceMax);

			// At this point, we need to update our max and min given the tick values since we have expanded the
			// range of the scale
			this.max = helpers.max(this.ticks);
			this.min = helpers.min(this.ticks);

			if (this.options.ticks.reverse) {
				this.ticks.reverse();

				this.start = this.max;
				this.end = this.min;
			} else {
				this.start = this.min;
				this.end = this.max;
			}

			this.zeroLineIndex = this.ticks.indexOf(0);
		},
		convertTicksToLabels: function() {
			Chart.Scale.prototype.convertTicksToLabels.call(this);

			// Point labels
			this.pointLabels = this.chart.data.labels.map(this.options.pointLabels.callback, this);
		},
		getLabelForIndex: function(index, datasetIndex) {
			return +this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
		},
		fit: function() {
			/*
			 * Right, this is really confusing and there is a lot of maths going on here
			 * The gist of the problem is here: https://gist.github.com/nnnick/696cc9c55f4b0beb8fe9
			 *
			 * Reaction: https://dl.dropboxusercontent.com/u/34601363/toomuchscience.gif
			 *
			 * Solution:
			 *
			 * We assume the radius of the polygon is half the size of the canvas at first
			 * at each index we check if the text overlaps.
			 *
			 * Where it does, we store that angle and that index.
			 *
			 * After finding the largest index and angle we calculate how much we need to remove
			 * from the shape radius to move the point inwards by that x.
			 *
			 * We average the left and right distances to get the maximum shape radius that can fit in the box
			 * along with labels.
			 *
			 * Once we have that, we can find the centre point for the chart, by taking the x text protrusion
			 * on each side, removing that from the size, halving it and adding the left x protrusion width.
			 *
			 * This will mean we have a shape fitted to the canvas, as large as it can be with the labels
			 * and position it in the most space efficient manner
			 *
			 * https://dl.dropboxusercontent.com/u/34601363/yeahscience.gif
			 */

			var pointLabelFontSize = helpers.getValueOrDefault(this.options.pointLabels.fontSize, Chart.defaults.global.defaultFontSize);
			var pointLabeFontStyle = helpers.getValueOrDefault(this.options.pointLabels.fontStyle, Chart.defaults.global.defaultFontStyle);
			var pointLabeFontFamily = helpers.getValueOrDefault(this.options.pointLabels.fontFamily, Chart.defaults.global.defaultFontFamily);
			var pointLabeFont = helpers.fontString(pointLabelFontSize, pointLabeFontStyle, pointLabeFontFamily);

			// Get maximum radius of the polygon. Either half the height (minus the text width) or half the width.
			// Use this to calculate the offset + change. - Make sure L/R protrusion is at least 0 to stop issues with centre points
			var largestPossibleRadius = helpers.min([(this.height / 2 - pointLabelFontSize - 5), this.width / 2]),
				pointPosition,
				i,
				textWidth,
				halfTextWidth,
				furthestRight = this.width,
				furthestRightIndex,
				furthestRightAngle,
				furthestLeft = 0,
				furthestLeftIndex,
				furthestLeftAngle,
				xProtrusionLeft,
				xProtrusionRight,
				radiusReductionRight,
				radiusReductionLeft,
				maxWidthRadius;
			this.ctx.font = pointLabeFont;

			for (i = 0; i < this.getValueCount(); i++) {
				// 5px to space the text slightly out - similar to what we do in the draw function.
				pointPosition = this.getPointPosition(i, largestPossibleRadius);
				textWidth = this.ctx.measureText(this.pointLabels[i] ? this.pointLabels[i] : '').width + 5;
				if (i === 0 || i === this.getValueCount() / 2) {
					// If we're at index zero, or exactly the middle, we're at exactly the top/bottom
					// of the radar chart, so text will be aligned centrally, so we'll half it and compare
					// w/left and right text sizes
					halfTextWidth = textWidth / 2;
					if (pointPosition.x + halfTextWidth > furthestRight) {
						furthestRight = pointPosition.x + halfTextWidth;
						furthestRightIndex = i;
					}
					if (pointPosition.x - halfTextWidth < furthestLeft) {
						furthestLeft = pointPosition.x - halfTextWidth;
						furthestLeftIndex = i;
					}
				} else if (i < this.getValueCount() / 2) {
					// Less than half the values means we'll left align the text
					if (pointPosition.x + textWidth > furthestRight) {
						furthestRight = pointPosition.x + textWidth;
						furthestRightIndex = i;
					}
				} else if (i > this.getValueCount() / 2) {
					// More than half the values means we'll right align the text
					if (pointPosition.x - textWidth < furthestLeft) {
						furthestLeft = pointPosition.x - textWidth;
						furthestLeftIndex = i;
					}
				}
			}

			xProtrusionLeft = furthestLeft;
			xProtrusionRight = Math.ceil(furthestRight - this.width);

			furthestRightAngle = this.getIndexAngle(furthestRightIndex);
			furthestLeftAngle = this.getIndexAngle(furthestLeftIndex);

			radiusReductionRight = xProtrusionRight / Math.sin(furthestRightAngle + Math.PI / 2);
			radiusReductionLeft = xProtrusionLeft / Math.sin(furthestLeftAngle + Math.PI / 2);

			// Ensure we actually need to reduce the size of the chart
			radiusReductionRight = (helpers.isNumber(radiusReductionRight)) ? radiusReductionRight : 0;
			radiusReductionLeft = (helpers.isNumber(radiusReductionLeft)) ? radiusReductionLeft : 0;

			this.drawingArea = Math.round(largestPossibleRadius - (radiusReductionLeft + radiusReductionRight) / 2);
			this.setCenterPoint(radiusReductionLeft, radiusReductionRight);
		},
		setCenterPoint: function(leftMovement, rightMovement) {

			var maxRight = this.width - rightMovement - this.drawingArea,
				maxLeft = leftMovement + this.drawingArea;

			this.xCenter = Math.round(((maxLeft + maxRight) / 2) + this.left);
			// Always vertically in the centre as the text height doesn't change
			this.yCenter = Math.round((this.height / 2) + this.top);
		},

		getIndexAngle: function(index) {
			var angleMultiplier = (Math.PI * 2) / this.getValueCount();
			// Start from the top instead of right, so remove a quarter of the circle

			return index * angleMultiplier - (Math.PI / 2);
		},
		getDistanceFromCenterForValue: function(value) {
			if (value === null) {
				return 0; // null always in center
			}

			// Take into account half font size + the yPadding of the top value
			var scalingFactor = this.drawingArea / (this.max - this.min);
			if (this.options.reverse) {
				return (this.max - value) * scalingFactor;
			} else {
				return (value - this.min) * scalingFactor;
			}
		},
		getPointPosition: function(index, distanceFromCenter) {
			var thisAngle = this.getIndexAngle(index);
			return {
				x: Math.round(Math.cos(thisAngle) * distanceFromCenter) + this.xCenter,
				y: Math.round(Math.sin(thisAngle) * distanceFromCenter) + this.yCenter
			};
		},
		getPointPositionForValue: function(index, value) {
			return this.getPointPosition(index, this.getDistanceFromCenterForValue(value));
		},
		draw: function() {
			if (this.options.display) {
				var ctx = this.ctx;
				helpers.each(this.ticks, function(label, index) {
					// Don't draw a centre value (if it is minimum)
					if (index > 0 || this.options.reverse) {
						var yCenterOffset = this.getDistanceFromCenterForValue(this.ticks[index]);
						var yHeight = this.yCenter - yCenterOffset;

						// Draw circular lines around the scale
						if (this.options.gridLines.display) {
							ctx.strokeStyle = this.options.gridLines.color;
							ctx.lineWidth = this.options.gridLines.lineWidth;

							if (this.options.lineArc) {
								// Draw circular arcs between the points
								ctx.beginPath();
								ctx.arc(this.xCenter, this.yCenter, yCenterOffset, 0, Math.PI * 2);
								ctx.closePath();
								ctx.stroke();
							} else {
								// Draw straight lines connecting each index
								ctx.beginPath();
								for (var i = 0; i < this.getValueCount(); i++) {
									var pointPosition = this.getPointPosition(i, this.getDistanceFromCenterForValue(this.ticks[index]));
									if (i === 0) {
										ctx.moveTo(pointPosition.x, pointPosition.y);
									} else {
										ctx.lineTo(pointPosition.x, pointPosition.y);
									}
								}
								ctx.closePath();
								ctx.stroke();
							}
						}

						if (this.options.ticks.display) {
							var tickFontColor = helpers.getValueOrDefault(this.options.ticks.fontColor, Chart.defaults.global.defaultFontColor);
							var tickFontSize = helpers.getValueOrDefault(this.options.ticks.fontSize, Chart.defaults.global.defaultFontSize);
							var tickFontStyle = helpers.getValueOrDefault(this.options.ticks.fontStyle, Chart.defaults.global.defaultFontStyle);
							var tickFontFamily = helpers.getValueOrDefault(this.options.ticks.fontFamily, Chart.defaults.global.defaultFontFamily);
							var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);
							ctx.font = tickLabelFont;

							if (this.options.ticks.showLabelBackdrop) {
								var labelWidth = ctx.measureText(label).width;
								ctx.fillStyle = this.options.ticks.backdropColor;
								ctx.fillRect(
									this.xCenter - labelWidth / 2 - this.options.ticks.backdropPaddingX,
									yHeight - tickFontSize / 2 - this.options.ticks.backdropPaddingY,
									labelWidth + this.options.ticks.backdropPaddingX * 2,
									tickFontSize + this.options.ticks.backdropPaddingY * 2
								);
							}

							ctx.textAlign = 'center';
							ctx.textBaseline = "middle";
							ctx.fillStyle = tickFontColor;
							ctx.fillText(label, this.xCenter, yHeight);
						}
					}
				}, this);

				if (!this.options.lineArc) {
					ctx.lineWidth = this.options.angleLines.lineWidth;
					ctx.strokeStyle = this.options.angleLines.color;

					for (var i = this.getValueCount() - 1; i >= 0; i--) {
						if (this.options.angleLines.display) {
							var outerPosition = this.getPointPosition(i, this.getDistanceFromCenterForValue(this.options.reverse ? this.min : this.max));
							ctx.beginPath();
							ctx.moveTo(this.xCenter, this.yCenter);
							ctx.lineTo(outerPosition.x, outerPosition.y);
							ctx.stroke();
							ctx.closePath();
						}
						// Extra 3px out for some label spacing
						var pointLabelPosition = this.getPointPosition(i, this.getDistanceFromCenterForValue(this.options.reverse ? this.min : this.max) + 5);
						
						var pointLabelFontColor = helpers.getValueOrDefault(this.options.pointLabels.fontColor, Chart.defaults.global.defaultFontColor);
						var pointLabelFontSize = helpers.getValueOrDefault(this.options.pointLabels.fontSize, Chart.defaults.global.defaultFontSize);
						var pointLabeFontStyle = helpers.getValueOrDefault(this.options.pointLabels.fontStyle, Chart.defaults.global.defaultFontStyle);
						var pointLabeFontFamily = helpers.getValueOrDefault(this.options.pointLabels.fontFamily, Chart.defaults.global.defaultFontFamily);
						var pointLabeFont = helpers.fontString(pointLabelFontSize, pointLabeFontStyle, pointLabeFontFamily);

						ctx.font = pointLabeFont;
						ctx.fillStyle = pointLabelFontColor;

						var labelsCount = this.pointLabels.length,
							halfLabelsCount = this.pointLabels.length / 2,
							quarterLabelsCount = halfLabelsCount / 2,
							upperHalf = (i < quarterLabelsCount || i > labelsCount - quarterLabelsCount),
							exactQuarter = (i === quarterLabelsCount || i === labelsCount - quarterLabelsCount);
						if (i === 0) {
							ctx.textAlign = 'center';
						} else if (i === halfLabelsCount) {
							ctx.textAlign = 'center';
						} else if (i < halfLabelsCount) {
							ctx.textAlign = 'left';
						} else {
							ctx.textAlign = 'right';
						}

						// Set the correct text baseline based on outer positioning
						if (exactQuarter) {
							ctx.textBaseline = 'middle';
						} else if (upperHalf) {
							ctx.textBaseline = 'bottom';
						} else {
							ctx.textBaseline = 'top';
						}

						ctx.fillText(this.pointLabels[i] ? this.pointLabels[i] : '', pointLabelPosition.x, pointLabelPosition.y);
					}
				}
			}
		}
	});
	Chart.scaleService.registerScaleType("radialLinear", LinearRadialScale, defaultConfig);

};
},{}],41:[function(require,module,exports){
/*global window: false */
"use strict";

var moment = require('moment');
moment = typeof(moment) === 'function' ? moment : window.moment;

module.exports = function(Chart) {

	var helpers = Chart.helpers;
	var time = {
		units: [{
			name: 'millisecond',
			steps: [1, 2, 5, 10, 20, 50, 100, 250, 500]
		}, {
			name: 'second',
			steps: [1, 2, 5, 10, 30]
		}, {
			name: 'minute',
			steps: [1, 2, 5, 10, 30]
		}, {
			name: 'hour',
			steps: [1, 2, 3, 6, 12]
		}, {
			name: 'day',
			steps: [1, 2, 5]
		}, {
			name: 'week',
			maxStep: 4
		}, {
			name: 'month',
			maxStep: 3
		}, {
			name: 'quarter',
			maxStep: 4
		}, {
			name: 'year',
			maxStep: false
		}]
	};

	var defaultConfig = {
		position: "bottom",

		time: {
			parser: false, // false == a pattern string from http://momentjs.com/docs/#/parsing/string-format/ or a custom callback that converts its argument to a moment
			format: false, // DEPRECATED false == date objects, moment object, callback or a pattern string from http://momentjs.com/docs/#/parsing/string-format/
			unit: false, // false == automatic or override with week, month, year, etc.
			round: false, // none, or override with week, month, year, etc.
			displayFormat: false, // DEPRECATED

			// defaults to unit's corresponding unitFormat below or override using pattern string from http://momentjs.com/docs/#/displaying/format/
			displayFormats: {
				'millisecond': 'h:mm:ss.SSS a', // 11:20:01.123 AM,
				'second': 'h:mm:ss a', // 11:20:01 AM
				'minute': 'h:mm:ss a', // 11:20:01 AM
				'hour': 'MMM D, hA', // Sept 4, 5PM
				'day': 'll', // Sep 4 2015
				'week': 'll', // Week 46, or maybe "[W]WW - YYYY" ?
				'month': 'MMM YYYY', // Sept 2015
				'quarter': '[Q]Q - YYYY', // Q3
				'year': 'YYYY' // 2015
			}
		},
		ticks: {
			autoSkip: false,
		}
	};

	var TimeScale = Chart.Scale.extend({
		initialize: function() {
			if (!moment) {
				throw new Error('Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com');
			}

			Chart.Scale.prototype.initialize.call(this);
		},
		getLabelMoment: function(datasetIndex, index) {
			return this.labelMoments[datasetIndex][index];
		},
		determineDataLimits: function() {
			this.labelMoments = [];

			// Only parse these once. If the dataset does not have data as x,y pairs, we will use
			// these
			var scaleLabelMoments = [];
			if (this.chart.data.labels && this.chart.data.labels.length > 0) {
				helpers.each(this.chart.data.labels, function(label, index) {
					var labelMoment = this.parseTime(label);
					if (this.options.time.round) {
						labelMoment.startOf(this.options.time.round);
					}
					scaleLabelMoments.push(labelMoment);
				}, this);

				this.firstTick = moment.min.call(this, scaleLabelMoments);
				this.lastTick = moment.max.call(this, scaleLabelMoments);
			} else {
				this.firstTick = null;
				this.lastTick = null;
			}

			helpers.each(this.chart.data.datasets, function(dataset, datasetIndex) {
				var momentsForDataset = [];

				if (typeof dataset.data[0] === 'object') {
					helpers.each(dataset.data, function(value, index) {
						var labelMoment = this.parseTime(this.getRightValue(value));
						if (this.options.time.round) {
							labelMoment.startOf(this.options.time.round);
						}
						momentsForDataset.push(labelMoment);

						// May have gone outside the scale ranges, make sure we keep the first and last ticks updated
						this.firstTick = this.firstTick !== null ? moment.min(this.firstTick, labelMoment) : labelMoment;
						this.lastTick = this.lastTick !== null ? moment.max(this.lastTick, labelMoment) : labelMoment;
					}, this);
				} else {
					// We have no labels. Use the ones from the scale
					momentsForDataset = scaleLabelMoments;
				}

				this.labelMoments.push(momentsForDataset);
			}, this);

			// Set these after we've done all the data
			if (this.options.time.min) {
				this.firstTick = this.parseTime(this.options.time.min);
			}

			if (this.options.time.max) {
				this.lastTick = this.parseTime(this.options.time.max);
			}

			// We will modify these, so clone for later
			this.firstTick = (this.firstTick || moment()).clone();
			this.lastTick = (this.lastTick || moment()).clone();
		},
		buildTicks: function(index) {

			this.ticks = [];
			this.unitScale = 1; // How much we scale the unit by, ie 2 means 2x unit per step
			this.scaleSizeInUnits = 0; // How large the scale is in the base unit (seconds, minutes, etc)

			// Set unit override if applicable
			if (this.options.time.unit) {
				this.tickUnit = this.options.time.unit || 'day';
				this.displayFormat = this.options.time.displayFormats[this.tickUnit];
				this.scaleSizeInUnits = this.lastTick.diff(this.firstTick, this.tickUnit, true);
				this.unitScale = helpers.getValueOrDefault(this.options.time.unitStepSize, 1);
			} else {
				// Determine the smallest needed unit of the time
				var tickFontSize = helpers.getValueOrDefault(this.options.ticks.fontSize, Chart.defaults.global.defaultFontSize);
				var innerWidth = this.isHorizontal() ? this.width - (this.paddingLeft + this.paddingRight) : this.height - (this.paddingTop + this.paddingBottom);
				
				// Crude approximation of what the label length might be
				var tempFirstLabel = this.tickFormatFunction(this.firstTick, 0, []);
				var tickLabelWidth = tempFirstLabel.length * tickFontSize;
				var cosRotation = Math.cos(helpers.toRadians(this.options.ticks.maxRotation));
				var sinRotation = Math.sin(helpers.toRadians(this.options.ticks.maxRotation));
				tickLabelWidth = (tickLabelWidth * cosRotation) + (tickFontSize * sinRotation);
				var labelCapacity = innerWidth / (tickLabelWidth + 10);

				// Start as small as possible
				this.tickUnit = 'millisecond';
				this.scaleSizeInUnits = this.lastTick.diff(this.firstTick, this.tickUnit, true);
				this.displayFormat = this.options.time.displayFormats[this.tickUnit];

				var unitDefinitionIndex = 0;
				var unitDefinition = time.units[unitDefinitionIndex];

				// While we aren't ideal and we don't have units left
				while (unitDefinitionIndex < time.units.length) {
					// Can we scale this unit. If `false` we can scale infinitely
					this.unitScale = 1;

					if (helpers.isArray(unitDefinition.steps) && Math.ceil(this.scaleSizeInUnits / labelCapacity) < helpers.max(unitDefinition.steps)) {
						// Use one of the prefedined steps
						for (var idx = 0; idx < unitDefinition.steps.length; ++idx) {
							if (unitDefinition.steps[idx] > Math.ceil(this.scaleSizeInUnits / labelCapacity)) {
								this.unitScale = helpers.getValueOrDefault(this.options.time.unitStepSize, unitDefinition.steps[idx]);
								break;
							}
						}

						break;
					} else if ((unitDefinition.maxStep === false) || (Math.ceil(this.scaleSizeInUnits / labelCapacity) < unitDefinition.maxStep)) {
						// We have a max step. Scale this unit
						this.unitScale = helpers.getValueOrDefault(this.options.time.unitStepSize, Math.ceil(this.scaleSizeInUnits / labelCapacity));
						break;
					} else {
						// Move to the next unit up
						++unitDefinitionIndex;
						unitDefinition = time.units[unitDefinitionIndex];

						this.tickUnit = unitDefinition.name;
						this.scaleSizeInUnits = this.lastTick.diff(this.firstTick, this.tickUnit, true);
						this.displayFormat = this.options.time.displayFormats[unitDefinition.name];
					}
				}
			}

			var roundedStart;

			// Only round the first tick if we have no hard minimum
			if (!this.options.time.min) {
				this.firstTick.startOf(this.tickUnit);
				roundedStart = this.firstTick;
			} else {
				roundedStart = this.firstTick.clone().startOf(this.tickUnit);
			}

			// Only round the last tick if we have no hard maximum
			if (!this.options.time.max) {
				this.lastTick.endOf(this.tickUnit);
			}

			this.smallestLabelSeparation = this.width;

			helpers.each(this.chart.data.datasets, function(dataset, datasetIndex) {
				for (var i = 1; i < this.labelMoments[datasetIndex].length; i++) {
					this.smallestLabelSeparation = Math.min(this.smallestLabelSeparation, this.labelMoments[datasetIndex][i].diff(this.labelMoments[datasetIndex][i - 1], this.tickUnit, true));
				}
			}, this);

			// Tick displayFormat override
			if (this.options.time.displayFormat) {
				this.displayFormat = this.options.time.displayFormat;
			}

			// first tick. will have been rounded correctly if options.time.min is not specified
			this.ticks.push(this.firstTick.clone());

			// For every unit in between the first and last moment, create a moment and add it to the ticks tick
			for (var i = 1; i < this.scaleSizeInUnits; ++i) {
				var newTick = roundedStart.clone().add(i, this.tickUnit);

				// Are we greater than the max time
				if (this.options.time.max && newTick.diff(this.lastTick, this.tickUnit, true) >= 0) {
					break;
				}

				if (i % this.unitScale === 0) {
					this.ticks.push(newTick);
				}
			}

			// Always show the right tick
			if (this.ticks[this.ticks.length - 1].diff(this.lastTick, this.tickUnit) !== 0 || this.scaleSizeInUnits === 0) {
			// this is a weird case. If the <max> option is the same as the end option, we can't just diff the times because the tick was created from the roundedStart
			// but the last tick was not rounded.
				if (this.options.time.max) {
					this.ticks.push(this.lastTick.clone());
					this.scaleSizeInUnits = this.lastTick.diff(this.ticks[0], this.tickUnit, true);
				} else {
					this.scaleSizeInUnits = Math.ceil(this.scaleSizeInUnits / this.unitScale) * this.unitScale;
					this.ticks.push(this.firstTick.clone().add(this.scaleSizeInUnits, this.tickUnit));
					this.lastTick = this.ticks[this.ticks.length - 1].clone();
				}
			}
		},
		// Get tooltip label
		getLabelForIndex: function(index, datasetIndex) {
			var label = this.chart.data.labels && index < this.chart.data.labels.length ? this.chart.data.labels[index] : '';

			if (typeof this.chart.data.datasets[datasetIndex].data[0] === 'object') {
				label = this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
			}

			// Format nicely
			if (this.options.time.tooltipFormat) {
				label = this.parseTime(label).format(this.options.time.tooltipFormat);
			}

			return label;
		},
		// Function to format an individual tick mark
		tickFormatFunction: function tickFormatFunction(tick, index, ticks) {
			var formattedTick = tick.format(this.displayFormat);

			if (this.options.ticks.userCallback) {
				return this.options.ticks.userCallback(formattedTick, index, ticks);
			} else {
				return formattedTick;
			}
		},
		convertTicksToLabels: function() {
			this.ticks = this.ticks.map(this.tickFormatFunction, this);
		},
		getPixelForValue: function(value, index, datasetIndex, includeOffset) {
			var labelMoment = this.getLabelMoment(datasetIndex, index);

			if (labelMoment) {
				var offset = labelMoment.diff(this.firstTick, this.tickUnit, true);

				var decimal = offset / this.scaleSizeInUnits;

				if (this.isHorizontal()) {
					var innerWidth = this.width - (this.paddingLeft + this.paddingRight);
					var valueWidth = innerWidth / Math.max(this.ticks.length - 1, 1);
					var valueOffset = (innerWidth * decimal) + this.paddingLeft;

					return this.left + Math.round(valueOffset);
				} else {
					var innerHeight = this.height - (this.paddingTop + this.paddingBottom);
					var valueHeight = innerHeight / Math.max(this.ticks.length - 1, 1);
					var heightOffset = (innerHeight * decimal) + this.paddingTop;

					return this.top + Math.round(heightOffset);
				}
			}
		},
		parseTime: function(label) {
			if (typeof this.options.time.parser === 'string') {
				return moment(label, this.options.time.parser);
			}
			if (typeof this.options.time.parser === 'function') {
				return this.options.time.parser(label);
			}
			// Date objects
			if (typeof label.getMonth === 'function' || typeof label === 'number') {
				return moment(label);
			}
			// Moment support
			if (label.isValid && label.isValid()) {
				return label;
			}
			// Custom parsing (return an instance of moment)
			if (typeof this.options.time.format !== 'string' && this.options.time.format.call) {
				console.warn("options.time.format is deprecated and replaced by options.time.parser. See http://nnnick.github.io/Chart.js/docs-v2/#scales-time-scale");
				return this.options.time.format(label);
			}
			// Moment format parsing
			return moment(label, this.options.time.format);
		}
	});
	Chart.scaleService.registerScaleType("time", TimeScale, defaultConfig);

};
},{"moment":1}]},{},[7]);

/*!
 * Datepicker for Bootstrap v1.9.0 (https://github.com/uxsolutions/bootstrap-datepicker)
 *
 * Licensed under the Apache License v2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 */

! function(a) {
  "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery)
}(function(a, b) {
  function c() {
      return new Date(Date.UTC.apply(Date, arguments))
  }

  function d() {
      var a = new Date;
      return c(a.getFullYear(), a.getMonth(), a.getDate())
  }

  function e(a, b) {
      return a.getUTCFullYear() === b.getUTCFullYear() && a.getUTCMonth() === b.getUTCMonth() && a.getUTCDate() === b.getUTCDate()
  }

  function f(c, d) {
      return function() {
          return d !== b && a.fn.datepicker.deprecated(d), this[c].apply(this, arguments)
      }
  }

  function g(a) {
      return a && !isNaN(a.getTime())
  }

  function h(b, c) {
      function d(a, b) {
          return b.toLowerCase()
      }
      var e, f = a(b).data(),
          g = {},
          h = new RegExp("^" + c.toLowerCase() + "([A-Z])");
      c = new RegExp("^" + c.toLowerCase());
      for (var i in f) c.test(i) && (e = i.replace(h, d), g[e] = f[i]);
      return g
  }

  function i(b) {
      var c = {};
      if (q[b] || (b = b.split("-")[0], q[b])) {
          var d = q[b];
          return a.each(p, function(a, b) {
              b in d && (c[b] = d[b])
          }), c
      }
  }
  var j = function() {
          var b = {
              get: function(a) {
                  return this.slice(a)[0]
              },
              contains: function(a) {
                  for (var b = a && a.valueOf(), c = 0, d = this.length; c < d; c++)
                      if (0 <= this[c].valueOf() - b && this[c].valueOf() - b < 864e5) return c;
                  return -1
              },
              remove: function(a) {
                  this.splice(a, 1)
              },
              replace: function(b) {
                  b && (a.isArray(b) || (b = [b]), this.clear(), this.push.apply(this, b))
              },
              clear: function() {
                  this.length = 0
              },
              copy: function() {
                  var a = new j;
                  return a.replace(this), a
              }
          };
          return function() {
              var c = [];
              return c.push.apply(c, arguments), a.extend(c, b), c
          }
      }(),
      k = function(b, c) {
          a.data(b, "datepicker", this), this._events = [], this._secondaryEvents = [], this._process_options(c), this.dates = new j, this.viewDate = this.o.defaultViewDate, this.focusDate = null, this.element = a(b), this.isInput = this.element.is("input"), this.inputField = this.isInput ? this.element : this.element.find("input"), this.component = !!this.element.hasClass("date") && this.element.find(".add-on, .input-group-addon, .input-group-append, .input-group-prepend, .btn"), this.component && 0 === this.component.length && (this.component = !1), this.isInline = !this.component && this.element.is("div"), this.picker = a(r.template), this._check_template(this.o.templates.leftArrow) && this.picker.find(".prev").html(this.o.templates.leftArrow), this._check_template(this.o.templates.rightArrow) && this.picker.find(".next").html(this.o.templates.rightArrow), this._buildEvents(), this._attachEvents(), this.isInline ? this.picker.addClass("datepicker-inline").appendTo(this.element) : this.picker.addClass("datepicker-dropdown dropdown-menu"), this.o.rtl && this.picker.addClass("datepicker-rtl"), this.o.calendarWeeks && this.picker.find(".datepicker-days .datepicker-switch, thead .datepicker-title, tfoot .today, tfoot .clear").attr("colspan", function(a, b) {
              return Number(b) + 1
          }), this._process_options({
              startDate: this._o.startDate,
              endDate: this._o.endDate,
              daysOfWeekDisabled: this.o.daysOfWeekDisabled,
              daysOfWeekHighlighted: this.o.daysOfWeekHighlighted,
              datesDisabled: this.o.datesDisabled
          }), this._allow_update = !1, this.setViewMode(this.o.startView), this._allow_update = !0, this.fillDow(), this.fillMonths(), this.update(), this.isInline && this.show()
      };
  k.prototype = {
      constructor: k,
      _resolveViewName: function(b) {
          return a.each(r.viewModes, function(c, d) {
              if (b === c || -1 !== a.inArray(b, d.names)) return b = c, !1
          }), b
      },
      _resolveDaysOfWeek: function(b) {
          return a.isArray(b) || (b = b.split(/[,\s]*/)), a.map(b, Number)
      },
      _check_template: function(c) {
          try {
              if (c === b || "" === c) return !1;
              if ((c.match(/[<>]/g) || []).length <= 0) return !0;
              return a(c).length > 0
          } catch (a) {
              return !1
          }
      },
      _process_options: function(b) {
          this._o = a.extend({}, this._o, b);
          var e = this.o = a.extend({}, this._o),
              f = e.language;
          q[f] || (f = f.split("-")[0], q[f] || (f = o.language)), e.language = f, e.startView = this._resolveViewName(e.startView), e.minViewMode = this._resolveViewName(e.minViewMode), e.maxViewMode = this._resolveViewName(e.maxViewMode), e.startView = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, e.startView)), !0 !== e.multidate && (e.multidate = Number(e.multidate) || !1, !1 !== e.multidate && (e.multidate = Math.max(0, e.multidate))), e.multidateSeparator = String(e.multidateSeparator), e.weekStart %= 7, e.weekEnd = (e.weekStart + 6) % 7;
          var g = r.parseFormat(e.format);
          e.startDate !== -1 / 0 && (e.startDate ? e.startDate instanceof Date ? e.startDate = this._local_to_utc(this._zero_time(e.startDate)) : e.startDate = r.parseDate(e.startDate, g, e.language, e.assumeNearbyYear) : e.startDate = -1 / 0), e.endDate !== 1 / 0 && (e.endDate ? e.endDate instanceof Date ? e.endDate = this._local_to_utc(this._zero_time(e.endDate)) : e.endDate = r.parseDate(e.endDate, g, e.language, e.assumeNearbyYear) : e.endDate = 1 / 0), e.daysOfWeekDisabled = this._resolveDaysOfWeek(e.daysOfWeekDisabled || []), e.daysOfWeekHighlighted = this._resolveDaysOfWeek(e.daysOfWeekHighlighted || []), e.datesDisabled = e.datesDisabled || [], a.isArray(e.datesDisabled) || (e.datesDisabled = e.datesDisabled.split(",")), e.datesDisabled = a.map(e.datesDisabled, function(a) {
              return r.parseDate(a, g, e.language, e.assumeNearbyYear)
          });
          var h = String(e.orientation).toLowerCase().split(/\s+/g),
              i = e.orientation.toLowerCase();
          if (h = a.grep(h, function(a) {
                  return /^auto|left|right|top|bottom$/.test(a)
              }), e.orientation = {
                  x: "auto",
                  y: "auto"
              }, i && "auto" !== i)
              if (1 === h.length) switch (h[0]) {
                  case "top":
                  case "bottom":
                      e.orientation.y = h[0];
                      break;
                  case "left":
                  case "right":
                      e.orientation.x = h[0]
              } else i = a.grep(h, function(a) {
                  return /^left|right$/.test(a)
              }), e.orientation.x = i[0] || "auto", i = a.grep(h, function(a) {
                  return /^top|bottom$/.test(a)
              }), e.orientation.y = i[0] || "auto";
              else;
          if (e.defaultViewDate instanceof Date || "string" == typeof e.defaultViewDate) e.defaultViewDate = r.parseDate(e.defaultViewDate, g, e.language, e.assumeNearbyYear);
          else if (e.defaultViewDate) {
              var j = e.defaultViewDate.year || (new Date).getFullYear(),
                  k = e.defaultViewDate.month || 0,
                  l = e.defaultViewDate.day || 1;
              e.defaultViewDate = c(j, k, l)
          } else e.defaultViewDate = d()
      },
      _applyEvents: function(a) {
          for (var c, d, e, f = 0; f < a.length; f++) c = a[f][0], 2 === a[f].length ? (d = b, e = a[f][1]) : 3 === a[f].length && (d = a[f][1], e = a[f][2]), c.on(e, d)
      },
      _unapplyEvents: function(a) {
          for (var c, d, e, f = 0; f < a.length; f++) c = a[f][0], 2 === a[f].length ? (e = b, d = a[f][1]) : 3 === a[f].length && (e = a[f][1], d = a[f][2]), c.off(d, e)
      },
      _buildEvents: function() {
          var b = {
              keyup: a.proxy(function(b) {
                  -1 === a.inArray(b.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) && this.update()
              }, this),
              keydown: a.proxy(this.keydown, this),
              paste: a.proxy(this.paste, this)
          };
          !0 === this.o.showOnFocus && (b.focus = a.proxy(this.show, this)), this.isInput ? this._events = [
              [this.element, b]
          ] : this.component && this.inputField.length ? this._events = [
              [this.inputField, b],
              [this.component, {
                  click: a.proxy(this.show, this)
              }]
          ] : this._events = [
              [this.element, {
                  click: a.proxy(this.show, this),
                  keydown: a.proxy(this.keydown, this)
              }]
          ], this._events.push([this.element, "*", {
              blur: a.proxy(function(a) {
                  this._focused_from = a.target
              }, this)
          }], [this.element, {
              blur: a.proxy(function(a) {
                  this._focused_from = a.target
              }, this)
          }]), this.o.immediateUpdates && this._events.push([this.element, {
              "changeYear changeMonth": a.proxy(function(a) {
                  this.update(a.date)
              }, this)
          }]), this._secondaryEvents = [
              [this.picker, {
                  click: a.proxy(this.click, this)
              }],
              [this.picker, ".prev, .next", {
                  click: a.proxy(this.navArrowsClick, this)
              }],
              [this.picker, ".day:not(.disabled)", {
                  click: a.proxy(this.dayCellClick, this)
              }],
              [a(window), {
                  resize: a.proxy(this.place, this)
              }],
              [a(document), {
                  "mousedown touchstart": a.proxy(function(a) {
                      this.element.is(a.target) || this.element.find(a.target).length || this.picker.is(a.target) || this.picker.find(a.target).length || this.isInline || this.hide()
                  }, this)
              }]
          ]
      },
      _attachEvents: function() {
          this._detachEvents(), this._applyEvents(this._events)
      },
      _detachEvents: function() {
          this._unapplyEvents(this._events)
      },
      _attachSecondaryEvents: function() {
          this._detachSecondaryEvents(), this._applyEvents(this._secondaryEvents)
      },
      _detachSecondaryEvents: function() {
          this._unapplyEvents(this._secondaryEvents)
      },
      _trigger: function(b, c) {
          var d = c || this.dates.get(-1),
              e = this._utc_to_local(d);
          this.element.trigger({
              type: b,
              date: e,
              viewMode: this.viewMode,
              dates: a.map(this.dates, this._utc_to_local),
              format: a.proxy(function(a, b) {
                  0 === arguments.length ? (a = this.dates.length - 1, b = this.o.format) : "string" == typeof a && (b = a, a = this.dates.length - 1), b = b || this.o.format;
                  var c = this.dates.get(a);
                  return r.formatDate(c, b, this.o.language)
              }, this)
          })
      },
      show: function() {
          if (!(this.inputField.is(":disabled") || this.inputField.prop("readonly") && !1 === this.o.enableOnReadonly)) return this.isInline || this.picker.appendTo(this.o.container), this.place(), this.picker.show(), this._attachSecondaryEvents(), this._trigger("show"), (window.navigator.msMaxTouchPoints || "ontouchstart" in document) && this.o.disableTouchKeyboard && a(this.element).blur(), this
      },
      hide: function() {
          return this.isInline || !this.picker.is(":visible") ? this : (this.focusDate = null, this.picker.hide().detach(), this._detachSecondaryEvents(), this.setViewMode(this.o.startView), this.o.forceParse && this.inputField.val() && this.setValue(), this._trigger("hide"), this)
      },
      destroy: function() {
          return this.hide(), this._detachEvents(), this._detachSecondaryEvents(), this.picker.remove(), delete this.element.data().datepicker, this.isInput || delete this.element.data().date, this
      },
      paste: function(b) {
          var c;
          if (b.originalEvent.clipboardData && b.originalEvent.clipboardData.types && -1 !== a.inArray("text/plain", b.originalEvent.clipboardData.types)) c = b.originalEvent.clipboardData.getData("text/plain");
          else {
              if (!window.clipboardData) return;
              c = window.clipboardData.getData("Text")
          }
          this.setDate(c), this.update(), b.preventDefault()
      },
      _utc_to_local: function(a) {
          if (!a) return a;
          var b = new Date(a.getTime() + 6e4 * a.getTimezoneOffset());
          return b.getTimezoneOffset() !== a.getTimezoneOffset() && (b = new Date(a.getTime() + 6e4 * b.getTimezoneOffset())), b
      },
      _local_to_utc: function(a) {
          return a && new Date(a.getTime() - 6e4 * a.getTimezoneOffset())
      },
      _zero_time: function(a) {
          return a && new Date(a.getFullYear(), a.getMonth(), a.getDate())
      },
      _zero_utc_time: function(a) {
          return a && c(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate())
      },
      getDates: function() {
          return a.map(this.dates, this._utc_to_local)
      },
      getUTCDates: function() {
          return a.map(this.dates, function(a) {
              return new Date(a)
          })
      },
      getDate: function() {
          return this._utc_to_local(this.getUTCDate())
      },
      getUTCDate: function() {
          var a = this.dates.get(-1);
          return a !== b ? new Date(a) : null
      },
      clearDates: function() {
          this.inputField.val(""), this.update(), this._trigger("changeDate"), this.o.autoclose && this.hide()
      },
      setDates: function() {
          var b = a.isArray(arguments[0]) ? arguments[0] : arguments;
          return this.update.apply(this, b), this._trigger("changeDate"), this.setValue(), this
      },
      setUTCDates: function() {
          var b = a.isArray(arguments[0]) ? arguments[0] : arguments;
          return this.setDates.apply(this, a.map(b, this._utc_to_local)), this
      },
      setDate: f("setDates"),
      setUTCDate: f("setUTCDates"),
      remove: f("destroy", "Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead"),
      setValue: function() {
          var a = this.getFormattedDate();
          return this.inputField.val(a), this
      },
      getFormattedDate: function(c) {
          c === b && (c = this.o.format);
          var d = this.o.language;
          return a.map(this.dates, function(a) {
              return r.formatDate(a, c, d)
          }).join(this.o.multidateSeparator)
      },
      getStartDate: function() {
          return this.o.startDate
      },
      setStartDate: function(a) {
          return this._process_options({
              startDate: a
          }), this.update(), this.updateNavArrows(), this
      },
      getEndDate: function() {
          return this.o.endDate
      },
      setEndDate: function(a) {
          return this._process_options({
              endDate: a
          }), this.update(), this.updateNavArrows(), this
      },
      setDaysOfWeekDisabled: function(a) {
          return this._process_options({
              daysOfWeekDisabled: a
          }), this.update(), this
      },
      setDaysOfWeekHighlighted: function(a) {
          return this._process_options({
              daysOfWeekHighlighted: a
          }), this.update(), this
      },
      setDatesDisabled: function(a) {
          return this._process_options({
              datesDisabled: a
          }), this.update(), this
      },
      place: function() {
          if (this.isInline) return this;
          var b = this.picker.outerWidth(),
              c = this.picker.outerHeight(),
              d = a(this.o.container),
              e = d.width(),
              f = "body" === this.o.container ? a(document).scrollTop() : d.scrollTop(),
              g = d.offset(),
              h = [0];
          this.element.parents().each(function() {
              var b = a(this).css("z-index");
              "auto" !== b && 0 !== Number(b) && h.push(Number(b))
          });
          var i = Math.max.apply(Math, h) + this.o.zIndexOffset,
              j = this.component ? this.component.parent().offset() : this.element.offset(),
              k = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!1),
              l = this.component ? this.component.outerWidth(!0) : this.element.outerWidth(!1),
              m = j.left - g.left,
              n = j.top - g.top;
          "body" !== this.o.container && (n += f), this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"), "auto" !== this.o.orientation.x ? (this.picker.addClass("datepicker-orient-" + this.o.orientation.x), "right" === this.o.orientation.x && (m -= b - l)) : j.left < 0 ? (this.picker.addClass("datepicker-orient-left"), m -= j.left - 10) : m + b > e ? (this.picker.addClass("datepicker-orient-right"), m += l - b) : this.o.rtl ? this.picker.addClass("datepicker-orient-right") : this.picker.addClass("datepicker-orient-left");
          var o, p = this.o.orientation.y;
          if ("auto" === p && (o = -f + n - c, p = o < 0 ? "bottom" : "top"), this.picker.addClass("datepicker-orient-" + p), "top" === p ? n -= c + parseInt(this.picker.css("padding-top")) : n += k, this.o.rtl) {
              var q = e - (m + l);
              this.picker.css({
                  top: n,
                  right: q,
                  zIndex: i
              })
          } else this.picker.css({
              top: n,
              left: m,
              zIndex: i
          });
          return this
      },
      _allow_update: !0,
      update: function() {
          if (!this._allow_update) return this;
          var b = this.dates.copy(),
              c = [],
              d = !1;
          return arguments.length ? (a.each(arguments, a.proxy(function(a, b) {
              b instanceof Date && (b = this._local_to_utc(b)), c.push(b)
          }, this)), d = !0) : (c = this.isInput ? this.element.val() : this.element.data("date") || this.inputField.val(), c = c && this.o.multidate ? c.split(this.o.multidateSeparator) : [c], delete this.element.data().date), c = a.map(c, a.proxy(function(a) {
              return r.parseDate(a, this.o.format, this.o.language, this.o.assumeNearbyYear)
          }, this)), c = a.grep(c, a.proxy(function(a) {
              return !this.dateWithinRange(a) || !a
          }, this), !0), this.dates.replace(c), this.o.updateViewDate && (this.dates.length ? this.viewDate = new Date(this.dates.get(-1)) : this.viewDate < this.o.startDate ? this.viewDate = new Date(this.o.startDate) : this.viewDate > this.o.endDate ? this.viewDate = new Date(this.o.endDate) : this.viewDate = this.o.defaultViewDate), d ? (this.setValue(), this.element.change()) : this.dates.length && String(b) !== String(this.dates) && d && (this._trigger("changeDate"), this.element.change()), !this.dates.length && b.length && (this._trigger("clearDate"), this.element.change()), this.fill(), this
      },
      fillDow: function() {
          if (this.o.showWeekDays) {
              var b = this.o.weekStart,
                  c = "<tr>";
              for (this.o.calendarWeeks && (c += '<th class="cw">&#160;</th>'); b < this.o.weekStart + 7;) c += '<th class="dow', -1 !== a.inArray(b, this.o.daysOfWeekDisabled) && (c += " disabled"), c += '">' + q[this.o.language].daysMin[b++ % 7] + "</th>";
              c += "</tr>", this.picker.find(".datepicker-days thead").append(c)
          }
      },
      fillMonths: function() {
          for (var a, b = this._utc_to_local(this.viewDate), c = "", d = 0; d < 12; d++) a = b && b.getMonth() === d ? " focused" : "", c += '<span class="month' + a + '">' + q[this.o.language].monthsShort[d] + "</span>";
          this.picker.find(".datepicker-months td").html(c)
      },
      setRange: function(b) {
          b && b.length ? this.range = a.map(b, function(a) {
              return a.valueOf()
          }) : delete this.range, this.fill()
      },
      getClassNames: function(b) {
          var c = [],
              f = this.viewDate.getUTCFullYear(),
              g = this.viewDate.getUTCMonth(),
              h = d();
          return b.getUTCFullYear() < f || b.getUTCFullYear() === f && b.getUTCMonth() < g ? c.push("old") : (b.getUTCFullYear() > f || b.getUTCFullYear() === f && b.getUTCMonth() > g) && c.push("new"), this.focusDate && b.valueOf() === this.focusDate.valueOf() && c.push("focused"), this.o.todayHighlight && e(b, h) && c.push("today"), -1 !== this.dates.contains(b) && c.push("active"), this.dateWithinRange(b) || c.push("disabled"), this.dateIsDisabled(b) && c.push("disabled", "disabled-date"), -1 !== a.inArray(b.getUTCDay(), this.o.daysOfWeekHighlighted) && c.push("highlighted"), this.range && (b > this.range[0] && b < this.range[this.range.length - 1] && c.push("range"), -1 !== a.inArray(b.valueOf(), this.range) && c.push("selected"), b.valueOf() === this.range[0] && c.push("range-start"), b.valueOf() === this.range[this.range.length - 1] && c.push("range-end")), c
      },
      _fill_yearsView: function(c, d, e, f, g, h, i) {
          for (var j, k, l, m = "", n = e / 10, o = this.picker.find(c), p = Math.floor(f / e) * e, q = p + 9 * n, r = Math.floor(this.viewDate.getFullYear() / n) * n, s = a.map(this.dates, function(a) {
                  return Math.floor(a.getUTCFullYear() / n) * n
              }), t = p - n; t <= q + n; t += n) j = [d], k = null, t === p - n ? j.push("old") : t === q + n && j.push("new"), -1 !== a.inArray(t, s) && j.push("active"), (t < g || t > h) && j.push("disabled"), t === r && j.push("focused"), i !== a.noop && (l = i(new Date(t, 0, 1)), l === b ? l = {} : "boolean" == typeof l ? l = {
              enabled: l
          } : "string" == typeof l && (l = {
              classes: l
          }), !1 === l.enabled && j.push("disabled"), l.classes && (j = j.concat(l.classes.split(/\s+/))), l.tooltip && (k = l.tooltip)), m += '<span class="' + j.join(" ") + '"' + (k ? ' title="' + k + '"' : "") + ">" + t + "</span>";
          o.find(".datepicker-switch").text(p + "-" + q), o.find("td").html(m)
      },
      fill: function() {
          var e, f, g = new Date(this.viewDate),
              h = g.getUTCFullYear(),
              i = g.getUTCMonth(),
              j = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCFullYear() : -1 / 0,
              k = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCMonth() : -1 / 0,
              l = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCFullYear() : 1 / 0,
              m = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCMonth() : 1 / 0,
              n = q[this.o.language].today || q.en.today || "",
              o = q[this.o.language].clear || q.en.clear || "",
              p = q[this.o.language].titleFormat || q.en.titleFormat,
              s = d(),
              t = (!0 === this.o.todayBtn || "linked" === this.o.todayBtn) && s >= this.o.startDate && s <= this.o.endDate && !this.weekOfDateIsDisabled(s);
          if (!isNaN(h) && !isNaN(i)) {
              this.picker.find(".datepicker-days .datepicker-switch").text(r.formatDate(g, p, this.o.language)), this.picker.find("tfoot .today").text(n).css("display", t ? "table-cell" : "none"), this.picker.find("tfoot .clear").text(o).css("display", !0 === this.o.clearBtn ? "table-cell" : "none"), this.picker.find("thead .datepicker-title").text(this.o.title).css("display", "string" == typeof this.o.title && "" !== this.o.title ? "table-cell" : "none"), this.updateNavArrows(), this.fillMonths();
              var u = c(h, i, 0),
                  v = u.getUTCDate();
              u.setUTCDate(v - (u.getUTCDay() - this.o.weekStart + 7) % 7);
              var w = new Date(u);
              u.getUTCFullYear() < 100 && w.setUTCFullYear(u.getUTCFullYear()), w.setUTCDate(w.getUTCDate() + 42), w = w.valueOf();
              for (var x, y, z = []; u.valueOf() < w;) {
                  if ((x = u.getUTCDay()) === this.o.weekStart && (z.push("<tr>"), this.o.calendarWeeks)) {
                      var A = new Date(+u + (this.o.weekStart - x - 7) % 7 * 864e5),
                          B = new Date(Number(A) + (11 - A.getUTCDay()) % 7 * 864e5),
                          C = new Date(Number(C = c(B.getUTCFullYear(), 0, 1)) + (11 - C.getUTCDay()) % 7 * 864e5),
                          D = (B - C) / 864e5 / 7 + 1;
                      z.push('<td class="cw">' + D + "</td>")
                  }
                  y = this.getClassNames(u), y.push("day");
                  var E = u.getUTCDate();
                  this.o.beforeShowDay !== a.noop && (f = this.o.beforeShowDay(this._utc_to_local(u)), f === b ? f = {} : "boolean" == typeof f ? f = {
                      enabled: f
                  } : "string" == typeof f && (f = {
                      classes: f
                  }), !1 === f.enabled && y.push("disabled"), f.classes && (y = y.concat(f.classes.split(/\s+/))), f.tooltip && (e = f.tooltip), f.content && (E = f.content)), y = a.isFunction(a.uniqueSort) ? a.uniqueSort(y) : a.unique(y), z.push('<td class="' + y.join(" ") + '"' + (e ? ' title="' + e + '"' : "") + ' data-date="' + u.getTime().toString() + '">' + E + "</td>"), e = null, x === this.o.weekEnd && z.push("</tr>"), u.setUTCDate(u.getUTCDate() + 1)
              }
              this.picker.find(".datepicker-days tbody").html(z.join(""));
              var F = q[this.o.language].monthsTitle || q.en.monthsTitle || "Months",
                  G = this.picker.find(".datepicker-months").find(".datepicker-switch").text(this.o.maxViewMode < 2 ? F : h).end().find("tbody span").removeClass("active");
              if (a.each(this.dates, function(a, b) {
                      b.getUTCFullYear() === h && G.eq(b.getUTCMonth()).addClass("active")
                  }), (h < j || h > l) && G.addClass("disabled"), h === j && G.slice(0, k).addClass("disabled"), h === l && G.slice(m + 1).addClass("disabled"), this.o.beforeShowMonth !== a.noop) {
                  var H = this;
                  a.each(G, function(c, d) {
                      var e = new Date(h, c, 1),
                          f = H.o.beforeShowMonth(e);
                      f === b ? f = {} : "boolean" == typeof f ? f = {
                          enabled: f
                      } : "string" == typeof f && (f = {
                          classes: f
                      }), !1 !== f.enabled || a(d).hasClass("disabled") || a(d).addClass("disabled"), f.classes && a(d).addClass(f.classes), f.tooltip && a(d).prop("title", f.tooltip)
                  })
              }
              this._fill_yearsView(".datepicker-years", "year", 10, h, j, l, this.o.beforeShowYear), this._fill_yearsView(".datepicker-decades", "decade", 100, h, j, l, this.o.beforeShowDecade), this._fill_yearsView(".datepicker-centuries", "century", 1e3, h, j, l, this.o.beforeShowCentury)
          }
      },
      updateNavArrows: function() {
          if (this._allow_update) {
              var a, b, c = new Date(this.viewDate),
                  d = c.getUTCFullYear(),
                  e = c.getUTCMonth(),
                  f = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCFullYear() : -1 / 0,
                  g = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCMonth() : -1 / 0,
                  h = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCFullYear() : 1 / 0,
                  i = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCMonth() : 1 / 0,
                  j = 1;
              switch (this.viewMode) {
                  case 4:
                      j *= 10;
                  case 3:
                      j *= 10;
                  case 2:
                      j *= 10;
                  case 1:
                      a = Math.floor(d / j) * j <= f, b = Math.floor(d / j) * j + j > h;
                      break;
                  case 0:
                      a = d <= f && e <= g, b = d >= h && e >= i
              }
              this.picker.find(".prev").toggleClass("disabled", a), this.picker.find(".next").toggleClass("disabled", b)
          }
      },
      click: function(b) {
          b.preventDefault(), b.stopPropagation();
          var e, f, g, h;
          e = a(b.target), e.hasClass("datepicker-switch") && this.viewMode !== this.o.maxViewMode && this.setViewMode(this.viewMode + 1), e.hasClass("today") && !e.hasClass("day") && (this.setViewMode(0), this._setDate(d(), "linked" === this.o.todayBtn ? null : "view")), e.hasClass("clear") && this.clearDates(), e.hasClass("disabled") || (e.hasClass("month") || e.hasClass("year") || e.hasClass("decade") || e.hasClass("century")) && (this.viewDate.setUTCDate(1), f = 1, 1 === this.viewMode ? (h = e.parent().find("span").index(e), g = this.viewDate.getUTCFullYear(), this.viewDate.setUTCMonth(h)) : (h = 0, g = Number(e.text()), this.viewDate.setUTCFullYear(g)), this._trigger(r.viewModes[this.viewMode - 1].e, this.viewDate), this.viewMode === this.o.minViewMode ? this._setDate(c(g, h, f)) : (this.setViewMode(this.viewMode - 1), this.fill())), this.picker.is(":visible") && this._focused_from && this._focused_from.focus(), delete this._focused_from
      },
      dayCellClick: function(b) {
          var c = a(b.currentTarget),
              d = c.data("date"),
              e = new Date(d);
          this.o.updateViewDate && (e.getUTCFullYear() !== this.viewDate.getUTCFullYear() && this._trigger("changeYear", this.viewDate), e.getUTCMonth() !== this.viewDate.getUTCMonth() && this._trigger("changeMonth", this.viewDate)), this._setDate(e)
      },
      navArrowsClick: function(b) {
          var c = a(b.currentTarget),
              d = c.hasClass("prev") ? -1 : 1;
          0 !== this.viewMode && (d *= 12 * r.viewModes[this.viewMode].navStep), this.viewDate = this.moveMonth(this.viewDate, d), this._trigger(r.viewModes[this.viewMode].e, this.viewDate), this.fill()
      },
      _toggle_multidate: function(a) {
          var b = this.dates.contains(a);
          if (a || this.dates.clear(), -1 !== b ? (!0 === this.o.multidate || this.o.multidate > 1 || this.o.toggleActive) && this.dates.remove(b) : !1 === this.o.multidate ? (this.dates.clear(), this.dates.push(a)) : this.dates.push(a), "number" == typeof this.o.multidate)
              for (; this.dates.length > this.o.multidate;) this.dates.remove(0)
      },
      _setDate: function(a, b) {
          b && "date" !== b || this._toggle_multidate(a && new Date(a)), (!b && this.o.updateViewDate || "view" === b) && (this.viewDate = a && new Date(a)), this.fill(), this.setValue(), b && "view" === b || this._trigger("changeDate"), this.inputField.trigger("change"), !this.o.autoclose || b && "date" !== b || this.hide()
      },
      moveDay: function(a, b) {
          var c = new Date(a);
          return c.setUTCDate(a.getUTCDate() + b), c
      },
      moveWeek: function(a, b) {
          return this.moveDay(a, 7 * b)
      },
      moveMonth: function(a, b) {
          if (!g(a)) return this.o.defaultViewDate;
          if (!b) return a;
          var c, d, e = new Date(a.valueOf()),
              f = e.getUTCDate(),
              h = e.getUTCMonth(),
              i = Math.abs(b);
          if (b = b > 0 ? 1 : -1, 1 === i) d = -1 === b ? function() {
              return e.getUTCMonth() === h
          } : function() {
              return e.getUTCMonth() !== c
          }, c = h + b, e.setUTCMonth(c), c = (c + 12) % 12;
          else {
              for (var j = 0; j < i; j++) e = this.moveMonth(e, b);
              c = e.getUTCMonth(), e.setUTCDate(f), d = function() {
                  return c !== e.getUTCMonth()
              }
          }
          for (; d();) e.setUTCDate(--f), e.setUTCMonth(c);
          return e
      },
      moveYear: function(a, b) {
          return this.moveMonth(a, 12 * b)
      },
      moveAvailableDate: function(a, b, c) {
          do {
              if (a = this[c](a, b), !this.dateWithinRange(a)) return !1;
              c = "moveDay"
          } while (this.dateIsDisabled(a));
          return a
      },
      weekOfDateIsDisabled: function(b) {
          return -1 !== a.inArray(b.getUTCDay(), this.o.daysOfWeekDisabled)
      },
      dateIsDisabled: function(b) {
          return this.weekOfDateIsDisabled(b) || a.grep(this.o.datesDisabled, function(a) {
              return e(b, a)
          }).length > 0
      },
      dateWithinRange: function(a) {
          return a >= this.o.startDate && a <= this.o.endDate
      },
      keydown: function(a) {
          if (!this.picker.is(":visible")) return void(40 !== a.keyCode && 27 !== a.keyCode || (this.show(), a.stopPropagation()));
          var b, c, d = !1,
              e = this.focusDate || this.viewDate;
          switch (a.keyCode) {
              case 27:
                  this.focusDate ? (this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill()) : this.hide(), a.preventDefault(), a.stopPropagation();
                  break;
              case 37:
              case 38:
              case 39:
              case 40:
                  if (!this.o.keyboardNavigation || 7 === this.o.daysOfWeekDisabled.length) break;
                  b = 37 === a.keyCode || 38 === a.keyCode ? -1 : 1, 0 === this.viewMode ? a.ctrlKey ? (c = this.moveAvailableDate(e, b, "moveYear")) && this._trigger("changeYear", this.viewDate) : a.shiftKey ? (c = this.moveAvailableDate(e, b, "moveMonth")) && this._trigger("changeMonth", this.viewDate) : 37 === a.keyCode || 39 === a.keyCode ? c = this.moveAvailableDate(e, b, "moveDay") : this.weekOfDateIsDisabled(e) || (c = this.moveAvailableDate(e, b, "moveWeek")) : 1 === this.viewMode ? (38 !== a.keyCode && 40 !== a.keyCode || (b *= 4), c = this.moveAvailableDate(e, b, "moveMonth")) : 2 === this.viewMode && (38 !== a.keyCode && 40 !== a.keyCode || (b *= 4), c = this.moveAvailableDate(e, b, "moveYear")), c && (this.focusDate = this.viewDate = c, this.setValue(), this.fill(), a.preventDefault());
                  break;
              case 13:
                  if (!this.o.forceParse) break;
                  e = this.focusDate || this.dates.get(-1) || this.viewDate, this.o.keyboardNavigation && (this._toggle_multidate(e), d = !0), this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.setValue(), this.fill(), this.picker.is(":visible") && (a.preventDefault(), a.stopPropagation(), this.o.autoclose && this.hide());
                  break;
              case 9:
                  this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill(), this.hide()
          }
          d && (this.dates.length ? this._trigger("changeDate") : this._trigger("clearDate"), this.inputField.trigger("change"))
      },
      setViewMode: function(a) {
          this.viewMode = a, this.picker.children("div").hide().filter(".datepicker-" + r.viewModes[this.viewMode].clsName).show(), this.updateNavArrows(), this._trigger("changeViewMode", new Date(this.viewDate))
      }
  };
  var l = function(b, c) {
      a.data(b, "datepicker", this), this.element = a(b), this.inputs = a.map(c.inputs, function(a) {
          return a.jquery ? a[0] : a
      }), delete c.inputs, this.keepEmptyValues = c.keepEmptyValues, delete c.keepEmptyValues, n.call(a(this.inputs), c).on("changeDate", a.proxy(this.dateUpdated, this)), this.pickers = a.map(this.inputs, function(b) {
          return a.data(b, "datepicker")
      }), this.updateDates()
  };
  l.prototype = {
      updateDates: function() {
          this.dates = a.map(this.pickers, function(a) {
              return a.getUTCDate()
          }), this.updateRanges()
      },
      updateRanges: function() {
          var b = a.map(this.dates, function(a) {
              return a.valueOf()
          });
          a.each(this.pickers, function(a, c) {
              c.setRange(b)
          })
      },
      clearDates: function() {
          a.each(this.pickers, function(a, b) {
              b.clearDates()
          })
      },
      dateUpdated: function(c) {
          if (!this.updating) {
              this.updating = !0;
              var d = a.data(c.target, "datepicker");
              if (d !== b) {
                  var e = d.getUTCDate(),
                      f = this.keepEmptyValues,
                      g = a.inArray(c.target, this.inputs),
                      h = g - 1,
                      i = g + 1,
                      j = this.inputs.length;
                  if (-1 !== g) {
                      if (a.each(this.pickers, function(a, b) {
                              b.getUTCDate() || b !== d && f || b.setUTCDate(e)
                          }), e < this.dates[h])
                          for (; h >= 0 && e < this.dates[h];) this.pickers[h--].setUTCDate(e);
                      else if (e > this.dates[i])
                          for (; i < j && e > this.dates[i];) this.pickers[i++].setUTCDate(e);
                      this.updateDates(), delete this.updating
                  }
              }
          }
      },
      destroy: function() {
          a.map(this.pickers, function(a) {
              a.destroy()
          }), a(this.inputs).off("changeDate", this.dateUpdated), delete this.element.data().datepicker
      },
      remove: f("destroy", "Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead")
  };
  var m = a.fn.datepicker,
      n = function(c) {
          var d = Array.apply(null, arguments);
          d.shift();
          var e;
          if (this.each(function() {
                  var b = a(this),
                      f = b.data("datepicker"),
                      g = "object" == typeof c && c;
                  if (!f) {
                      var j = h(this, "date"),
                          m = a.extend({}, o, j, g),
                          n = i(m.language),
                          p = a.extend({}, o, n, j, g);
                      b.hasClass("input-daterange") || p.inputs ? (a.extend(p, {
                          inputs: p.inputs || b.find("input").toArray()
                      }), f = new l(this, p)) : f = new k(this, p), b.data("datepicker", f)
                  }
                  "string" == typeof c && "function" == typeof f[c] && (e = f[c].apply(f, d))
              }), e === b || e instanceof k || e instanceof l) return this;
          if (this.length > 1) throw new Error("Using only allowed for the collection of a single element (" + c + " function)");
          return e
      };
  a.fn.datepicker = n;
  var o = a.fn.datepicker.defaults = {
          assumeNearbyYear: !1,
          autoclose: !1,
          beforeShowDay: a.noop,
          beforeShowMonth: a.noop,
          beforeShowYear: a.noop,
          beforeShowDecade: a.noop,
          beforeShowCentury: a.noop,
          calendarWeeks: !1,
          clearBtn: !1,
          toggleActive: !1,
          daysOfWeekDisabled: [],
          daysOfWeekHighlighted: [],
          datesDisabled: [],
          endDate: 1 / 0,
          forceParse: !0,
          format: "mm/dd/yyyy",
          keepEmptyValues: !1,
          keyboardNavigation: !0,
          language: "en",
          minViewMode: 0,
          maxViewMode: 4,
          multidate: !1,
          multidateSeparator: ",",
          orientation: "auto",
          rtl: !1,
          startDate: -1 / 0,
          startView: 0,
          todayBtn: !1,
          todayHighlight: !1,
          updateViewDate: !0,
          weekStart: 0,
          disableTouchKeyboard: !1,
          enableOnReadonly: !0,
          showOnFocus: !0,
          zIndexOffset: 10,
          container: "body",
          immediateUpdates: !1,
          title: "",
          templates: {
              leftArrow: "&#x00AB;",
              rightArrow: "&#x00BB;"
          },
          showWeekDays: !0
      },
      p = a.fn.datepicker.locale_opts = ["format", "rtl", "weekStart"];
  a.fn.datepicker.Constructor = k;
  var q = a.fn.datepicker.dates = {
          en: {
              days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
              daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
              months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
              monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              today: "Today",
              clear: "Clear",
              titleFormat: "MM yyyy"
          }
      },
      r = {
          viewModes: [{
              names: ["days", "month"],
              clsName: "days",
              e: "changeMonth"
          }, {
              names: ["months", "year"],
              clsName: "months",
              e: "changeYear",
              navStep: 1
          }, {
              names: ["years", "decade"],
              clsName: "years",
              e: "changeDecade",
              navStep: 10
          }, {
              names: ["decades", "century"],
              clsName: "decades",
              e: "changeCentury",
              navStep: 100
          }, {
              names: ["centuries", "millennium"],
              clsName: "centuries",
              e: "changeMillennium",
              navStep: 1e3
          }],
          validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
          nonpunctuation: /[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,
          parseFormat: function(a) {
              if ("function" == typeof a.toValue && "function" == typeof a.toDisplay) return a;
              var b = a.replace(this.validParts, "\0").split("\0"),
                  c = a.match(this.validParts);
              if (!b || !b.length || !c || 0 === c.length) throw new Error("Invalid date format.");
              return {
                  separators: b,
                  parts: c
              }
          },
          parseDate: function(c, e, f, g) {
              function h(a, b) {
                  return !0 === b && (b = 10), a < 100 && (a += 2e3) > (new Date).getFullYear() + b && (a -= 100), a
              }

              function i() {
                  var a = this.slice(0, j[n].length),
                      b = j[n].slice(0, a.length);
                  return a.toLowerCase() === b.toLowerCase()
              }
              if (!c) return b;
              if (c instanceof Date) return c;
              if ("string" == typeof e && (e = r.parseFormat(e)), e.toValue) return e.toValue(c, e, f);
              var j, l, m, n, o, p = {
                      d: "moveDay",
                      m: "moveMonth",
                      w: "moveWeek",
                      y: "moveYear"
                  },
                  s = {
                      yesterday: "-1d",
                      today: "+0d",
                      tomorrow: "+1d"
                  };
              if (c in s && (c = s[c]), /^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/i.test(c)) {
                  for (j = c.match(/([\-+]\d+)([dmwy])/gi), c = new Date, n = 0; n < j.length; n++) l = j[n].match(/([\-+]\d+)([dmwy])/i), m = Number(l[1]), o = p[l[2].toLowerCase()], c = k.prototype[o](c, m);
                  return k.prototype._zero_utc_time(c)
              }
              j = c && c.match(this.nonpunctuation) || [];
              var t, u, v = {},
                  w = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"],
                  x = {
                      yyyy: function(a, b) {
                          return a.setUTCFullYear(g ? h(b, g) : b)
                      },
                      m: function(a, b) {
                          if (isNaN(a)) return a;
                          for (b -= 1; b < 0;) b += 12;
                          for (b %= 12, a.setUTCMonth(b); a.getUTCMonth() !== b;) a.setUTCDate(a.getUTCDate() - 1);
                          return a
                      },
                      d: function(a, b) {
                          return a.setUTCDate(b)
                      }
                  };
              x.yy = x.yyyy, x.M = x.MM = x.mm = x.m, x.dd = x.d, c = d();
              var y = e.parts.slice();
              if (j.length !== y.length && (y = a(y).filter(function(b, c) {
                      return -1 !== a.inArray(c, w)
                  }).toArray()), j.length === y.length) {
                  var z;
                  for (n = 0, z = y.length; n < z; n++) {
                      if (t = parseInt(j[n], 10), l = y[n], isNaN(t)) switch (l) {
                          case "MM":
                              u = a(q[f].months).filter(i), t = a.inArray(u[0], q[f].months) + 1;
                              break;
                          case "M":
                              u = a(q[f].monthsShort).filter(i), t = a.inArray(u[0], q[f].monthsShort) + 1
                      }
                      v[l] = t
                  }
                  var A, B;
                  for (n = 0; n < w.length; n++)(B = w[n]) in v && !isNaN(v[B]) && (A = new Date(c), x[B](A, v[B]), isNaN(A) || (c = A))
              }
              return c
          },
          formatDate: function(b, c, d) {
              if (!b) return "";
              if ("string" == typeof c && (c = r.parseFormat(c)), c.toDisplay) return c.toDisplay(b, c, d);
              var e = {
                  d: b.getUTCDate(),
                  D: q[d].daysShort[b.getUTCDay()],
                  DD: q[d].days[b.getUTCDay()],
                  m: b.getUTCMonth() + 1,
                  M: q[d].monthsShort[b.getUTCMonth()],
                  MM: q[d].months[b.getUTCMonth()],
                  yy: b.getUTCFullYear().toString().substring(2),
                  yyyy: b.getUTCFullYear()
              };
              e.dd = (e.d < 10 ? "0" : "") + e.d, e.mm = (e.m < 10 ? "0" : "") + e.m, b = [];
              for (var f = a.extend([], c.separators), g = 0, h = c.parts.length; g <= h; g++) f.length && b.push(f.shift()), b.push(e[c.parts[g]]);
              return b.join("")
          },
          headTemplate: '<thead><tr><th colspan="7" class="datepicker-title"></th></tr><tr><th class="prev">' + o.templates.leftArrow + '</th><th colspan="5" class="datepicker-switch"></th><th class="next">' + o.templates.rightArrow + "</th></tr></thead>",
          contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
          footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
      };
  r.template = '<div class="datepicker"><div class="datepicker-days"><table class="table-condensed">' + r.headTemplate + "<tbody></tbody>" + r.footTemplate + '</table></div><div class="datepicker-months"><table class="table-condensed">' + r.headTemplate + r.contTemplate + r.footTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + r.headTemplate + r.contTemplate + r.footTemplate + '</table></div><div class="datepicker-decades"><table class="table-condensed">' + r.headTemplate + r.contTemplate + r.footTemplate + '</table></div><div class="datepicker-centuries"><table class="table-condensed">' + r.headTemplate + r.contTemplate + r.footTemplate + "</table></div></div>", a.fn.datepicker.DPGlobal = r, a.fn.datepicker.noConflict = function() {
      return a.fn.datepicker = m, this
  }, a.fn.datepicker.version = "1.9.0", a.fn.datepicker.deprecated = function(a) {
      var b = window.console;
      b && b.warn && b.warn("DEPRECATED: " + a)
  }, a(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', function(b) {
      var c = a(this);
      c.data("datepicker") || (b.preventDefault(), n.call(c, "show"))
  }), a(function() {
      n.call(a('[data-provide="datepicker-inline"]'))
  })
});

/**
* @version: 3.1
* @author: Dan Grossman http://www.dangrossman.info/
* @copyright: Copyright (c) 2012-2019 Dan Grossman. All rights reserved.
* @license: Licensed under the MIT license. See http://www.opensource.org/licenses/mit-license.php
* @website: http://www.daterangepicker.com/
*/
// Following the UMD template https://github.com/umdjs/umd/blob/master/templates/returnExportsGlobal.js
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
      // AMD. Make globaly available as well
      define(['moment', 'jquery'], function (moment, jquery) {
          if (!jquery.fn) jquery.fn = {}; // webpack server rendering
          if (typeof moment !== 'function' && moment.hasOwnProperty('default')) moment = moment['default']
          return factory(moment, jquery);
      });
  } else if (typeof module === 'object' && module.exports) {
      // Node / Browserify
      //isomorphic issue
      var jQuery = (typeof window != 'undefined') ? window.jQuery : undefined;
      if (!jQuery) {
          jQuery = require('jquery');
          if (!jQuery.fn) jQuery.fn = {};
      }
      var moment = (typeof window != 'undefined' && typeof window.moment != 'undefined') ? window.moment : require('moment');
      module.exports = factory(moment, jQuery);
  } else {
      // Browser globals
      root.daterangepicker = factory(root.moment, root.jQuery);
  }
}(this, function(moment, $) {
  var DateRangePicker = function(element, options, cb) {

      //default settings for options
      this.parentEl = 'body';
      this.element = $(element);
      this.startDate = moment().startOf('day');
      this.endDate = moment().endOf('day');
      this.minDate = false;
      this.maxDate = false;
      this.maxSpan = false;
      this.autoApply = false;
      this.singleDatePicker = false;
      this.showDropdowns = false;
      this.minYear = moment().subtract(100, 'year').format('YYYY');
      this.maxYear = moment().add(100, 'year').format('YYYY');
      this.showWeekNumbers = false;
      this.showISOWeekNumbers = false;
      this.showCustomRangeLabel = true;
      this.timePicker = false;
      this.timePicker24Hour = false;
      this.timePickerIncrement = 1;
      this.timePickerSeconds = false;
      this.linkedCalendars = true;
      this.autoUpdateInput = true;
      this.alwaysShowCalendars = false;
      this.ranges = {};

      this.opens = 'right';
      if (this.element.hasClass('pull-right'))
          this.opens = 'left';

      this.drops = 'down';
      if (this.element.hasClass('dropup'))
          this.drops = 'up';

      this.buttonClasses = 'btn btn-sm';
      this.applyButtonClasses = 'btn-primary';
      this.cancelButtonClasses = 'btn-default';

      this.locale = {
          direction: 'ltr',
          format: moment.localeData().longDateFormat('L'),
          separator: ' - ',
          applyLabel: 'Apply',
          cancelLabel: 'Cancel',
          weekLabel: 'W',
          customRangeLabel: 'Custom Range',
          daysOfWeek: moment.weekdaysMin(),
          monthNames: moment.monthsShort(),
          firstDay: moment.localeData().firstDayOfWeek()
      };

      this.callback = function() { };

      //some state information
      this.isShowing = false;
      this.leftCalendar = {};
      this.rightCalendar = {};

      //custom options from user
      if (typeof options !== 'object' || options === null)
          options = {};

      //allow setting options with data attributes
      //data-api options will be overwritten with custom javascript options
      options = $.extend(this.element.data(), options);

      //html template for the picker UI
      if (typeof options.template !== 'string' && !(options.template instanceof $))
          options.template =
          '<div class="daterangepicker">' +
              '<div class="ranges"></div>' +
              '<div class="drp-calendar left">' +
                  '<div class="calendar-table"></div>' +
                  '<div class="calendar-time"></div>' +
              '</div>' +
              '<div class="drp-calendar right">' +
                  '<div class="calendar-table"></div>' +
                  '<div class="calendar-time"></div>' +
              '</div>' +
              '<div class="drp-buttons">' +
                  '<span class="drp-selected"></span>' +
                  '<button class="cancelBtn" type="button"></button>' +
                  '<button class="applyBtn" disabled="disabled" type="button"></button> ' +
              '</div>' +
          '</div>';

      this.parentEl = (options.parentEl && $(options.parentEl).length) ? $(options.parentEl) : $(this.parentEl);
      this.container = $(options.template).appendTo(this.parentEl);

      //
      // handle all the possible options overriding defaults
      //

      if (typeof options.locale === 'object') {

          if (typeof options.locale.direction === 'string')
              this.locale.direction = options.locale.direction;

          if (typeof options.locale.format === 'string')
              this.locale.format = options.locale.format;

          if (typeof options.locale.separator === 'string')
              this.locale.separator = options.locale.separator;

          if (typeof options.locale.daysOfWeek === 'object')
              this.locale.daysOfWeek = options.locale.daysOfWeek.slice();

          if (typeof options.locale.monthNames === 'object')
            this.locale.monthNames = options.locale.monthNames.slice();

          if (typeof options.locale.firstDay === 'number')
            this.locale.firstDay = options.locale.firstDay;

          if (typeof options.locale.applyLabel === 'string')
            this.locale.applyLabel = options.locale.applyLabel;

          if (typeof options.locale.cancelLabel === 'string')
            this.locale.cancelLabel = options.locale.cancelLabel;

          if (typeof options.locale.weekLabel === 'string')
            this.locale.weekLabel = options.locale.weekLabel;

          if (typeof options.locale.customRangeLabel === 'string'){
              //Support unicode chars in the custom range name.
              var elem = document.createElement('textarea');
              elem.innerHTML = options.locale.customRangeLabel;
              var rangeHtml = elem.value;
              this.locale.customRangeLabel = rangeHtml;
          }
      }
      this.container.addClass(this.locale.direction);

      if (typeof options.startDate === 'string')
          this.startDate = moment(options.startDate, this.locale.format);

      if (typeof options.endDate === 'string')
          this.endDate = moment(options.endDate, this.locale.format);

      if (typeof options.minDate === 'string')
          this.minDate = moment(options.minDate, this.locale.format);

      if (typeof options.maxDate === 'string')
          this.maxDate = moment(options.maxDate, this.locale.format);

      if (typeof options.startDate === 'object')
          this.startDate = moment(options.startDate);

      if (typeof options.endDate === 'object')
          this.endDate = moment(options.endDate);

      if (typeof options.minDate === 'object')
          this.minDate = moment(options.minDate);

      if (typeof options.maxDate === 'object')
          this.maxDate = moment(options.maxDate);

      // sanity check for bad options
      if (this.minDate && this.startDate.isBefore(this.minDate))
          this.startDate = this.minDate.clone();

      // sanity check for bad options
      if (this.maxDate && this.endDate.isAfter(this.maxDate))
          this.endDate = this.maxDate.clone();

      if (typeof options.applyButtonClasses === 'string')
          this.applyButtonClasses = options.applyButtonClasses;

      if (typeof options.applyClass === 'string') //backwards compat
          this.applyButtonClasses = options.applyClass;

      if (typeof options.cancelButtonClasses === 'string')
          this.cancelButtonClasses = options.cancelButtonClasses;

      if (typeof options.cancelClass === 'string') //backwards compat
          this.cancelButtonClasses = options.cancelClass;

      if (typeof options.maxSpan === 'object')
          this.maxSpan = options.maxSpan;

      if (typeof options.dateLimit === 'object') //backwards compat
          this.maxSpan = options.dateLimit;

      if (typeof options.opens === 'string')
          this.opens = options.opens;

      if (typeof options.drops === 'string')
          this.drops = options.drops;

      if (typeof options.showWeekNumbers === 'boolean')
          this.showWeekNumbers = options.showWeekNumbers;

      if (typeof options.showISOWeekNumbers === 'boolean')
          this.showISOWeekNumbers = options.showISOWeekNumbers;

      if (typeof options.buttonClasses === 'string')
          this.buttonClasses = options.buttonClasses;

      if (typeof options.buttonClasses === 'object')
          this.buttonClasses = options.buttonClasses.join(' ');

      if (typeof options.showDropdowns === 'boolean')
          this.showDropdowns = options.showDropdowns;

      if (typeof options.minYear === 'number')
          this.minYear = options.minYear;

      if (typeof options.maxYear === 'number')
          this.maxYear = options.maxYear;

      if (typeof options.showCustomRangeLabel === 'boolean')
          this.showCustomRangeLabel = options.showCustomRangeLabel;

      if (typeof options.singleDatePicker === 'boolean') {
          this.singleDatePicker = options.singleDatePicker;
          if (this.singleDatePicker)
              this.endDate = this.startDate.clone();
      }

      if (typeof options.timePicker === 'boolean')
          this.timePicker = options.timePicker;

      if (typeof options.timePickerSeconds === 'boolean')
          this.timePickerSeconds = options.timePickerSeconds;

      if (typeof options.timePickerIncrement === 'number')
          this.timePickerIncrement = options.timePickerIncrement;

      if (typeof options.timePicker24Hour === 'boolean')
          this.timePicker24Hour = options.timePicker24Hour;

      if (typeof options.autoApply === 'boolean')
          this.autoApply = options.autoApply;

      if (typeof options.autoUpdateInput === 'boolean')
          this.autoUpdateInput = options.autoUpdateInput;

      if (typeof options.linkedCalendars === 'boolean')
          this.linkedCalendars = options.linkedCalendars;

      if (typeof options.isInvalidDate === 'function')
          this.isInvalidDate = options.isInvalidDate;

      if (typeof options.isCustomDate === 'function')
          this.isCustomDate = options.isCustomDate;

      if (typeof options.alwaysShowCalendars === 'boolean')
          this.alwaysShowCalendars = options.alwaysShowCalendars;

      // update day names order to firstDay
      if (this.locale.firstDay != 0) {
          var iterator = this.locale.firstDay;
          while (iterator > 0) {
              this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift());
              iterator--;
          }
      }

      var start, end, range;

      //if no start/end dates set, check if an input element contains initial values
      if (typeof options.startDate === 'undefined' && typeof options.endDate === 'undefined') {
          if ($(this.element).is(':text')) {
              var val = $(this.element).val(),
                  split = val.split(this.locale.separator);

              start = end = null;

              if (split.length == 2) {
                  start = moment(split[0], this.locale.format);
                  end = moment(split[1], this.locale.format);
              } else if (this.singleDatePicker && val !== "") {
                  start = moment(val, this.locale.format);
                  end = moment(val, this.locale.format);
              }
              if (start !== null && end !== null) {
                  this.setStartDate(start);
                  this.setEndDate(end);
              }
          }
      }

      if (typeof options.ranges === 'object') {
          for (range in options.ranges) {

              if (typeof options.ranges[range][0] === 'string')
                  start = moment(options.ranges[range][0], this.locale.format);
              else
                  start = moment(options.ranges[range][0]);

              if (typeof options.ranges[range][1] === 'string')
                  end = moment(options.ranges[range][1], this.locale.format);
              else
                  end = moment(options.ranges[range][1]);

              // If the start or end date exceed those allowed by the minDate or maxSpan
              // options, shorten the range to the allowable period.
              if (this.minDate && start.isBefore(this.minDate))
                  start = this.minDate.clone();

              var maxDate = this.maxDate;
              if (this.maxSpan && maxDate && start.clone().add(this.maxSpan).isAfter(maxDate))
                  maxDate = start.clone().add(this.maxSpan);
              if (maxDate && end.isAfter(maxDate))
                  end = maxDate.clone();

              // If the end of the range is before the minimum or the start of the range is
              // after the maximum, don't display this range option at all.
              if ((this.minDate && end.isBefore(this.minDate, this.timepicker ? 'minute' : 'day'))
                || (maxDate && start.isAfter(maxDate, this.timepicker ? 'minute' : 'day')))
                  continue;

              //Support unicode chars in the range names.
              var elem = document.createElement('textarea');
              elem.innerHTML = range;
              var rangeHtml = elem.value;

              this.ranges[rangeHtml] = [start, end];
          }

          var list = '<ul>';
          for (range in this.ranges) {
              list += '<li data-range-key="' + range + '">' + range + '</li>';
          }
          if (this.showCustomRangeLabel) {
              list += '<li data-range-key="' + this.locale.customRangeLabel + '">' + this.locale.customRangeLabel + '</li>';
          }
          list += '</ul>';
          this.container.find('.ranges').prepend(list);
      }

      if (typeof cb === 'function') {
          this.callback = cb;
      }

      if (!this.timePicker) {
          this.startDate = this.startDate.startOf('day');
          this.endDate = this.endDate.endOf('day');
          this.container.find('.calendar-time').hide();
      }

      //can't be used together for now
      if (this.timePicker && this.autoApply)
          this.autoApply = false;

      if (this.autoApply) {
          this.container.addClass('auto-apply');
      }

      if (typeof options.ranges === 'object')
          this.container.addClass('show-ranges');

      if (this.singleDatePicker) {
          this.container.addClass('single');
          this.container.find('.drp-calendar.left').addClass('single');
          this.container.find('.drp-calendar.left').show();
          this.container.find('.drp-calendar.right').hide();
          if (!this.timePicker && this.autoApply) {
              this.container.addClass('auto-apply');
          }
      }

      if ((typeof options.ranges === 'undefined' && !this.singleDatePicker) || this.alwaysShowCalendars) {
          this.container.addClass('show-calendar');
      }

      this.container.addClass('opens' + this.opens);

      //apply CSS classes and labels to buttons
      this.container.find('.applyBtn, .cancelBtn').addClass(this.buttonClasses);
      if (this.applyButtonClasses.length)
          this.container.find('.applyBtn').addClass(this.applyButtonClasses);
      if (this.cancelButtonClasses.length)
          this.container.find('.cancelBtn').addClass(this.cancelButtonClasses);
      this.container.find('.applyBtn').html(this.locale.applyLabel);
      this.container.find('.cancelBtn').html(this.locale.cancelLabel);

      //
      // event listeners
      //

      this.container.find('.drp-calendar')
          .on('click.daterangepicker', '.prev', $.proxy(this.clickPrev, this))
          .on('click.daterangepicker', '.next', $.proxy(this.clickNext, this))
          .on('mousedown.daterangepicker', 'td.available', $.proxy(this.clickDate, this))
          .on('mouseenter.daterangepicker', 'td.available', $.proxy(this.hoverDate, this))
          .on('change.daterangepicker', 'select.yearselect', $.proxy(this.monthOrYearChanged, this))
          .on('change.daterangepicker', 'select.monthselect', $.proxy(this.monthOrYearChanged, this))
          .on('change.daterangepicker', 'select.hourselect,select.minuteselect,select.secondselect,select.ampmselect', $.proxy(this.timeChanged, this));

      this.container.find('.ranges')
          .on('click.daterangepicker', 'li', $.proxy(this.clickRange, this));

      this.container.find('.drp-buttons')
          .on('click.daterangepicker', 'button.applyBtn', $.proxy(this.clickApply, this))
          .on('click.daterangepicker', 'button.cancelBtn', $.proxy(this.clickCancel, this));

      if (this.element.is('input') || this.element.is('button')) {
          this.element.on({
              'click.daterangepicker': $.proxy(this.show, this),
              'focus.daterangepicker': $.proxy(this.show, this),
              'keyup.daterangepicker': $.proxy(this.elementChanged, this),
              'keydown.daterangepicker': $.proxy(this.keydown, this) //IE 11 compatibility
          });
      } else {
          this.element.on('click.daterangepicker', $.proxy(this.toggle, this));
          this.element.on('keydown.daterangepicker', $.proxy(this.toggle, this));
      }

      //
      // if attached to a text input, set the initial value
      //

      this.updateElement();

  };

  DateRangePicker.prototype = {

      constructor: DateRangePicker,

      setStartDate: function(startDate) {
          if (typeof startDate === 'string')
              this.startDate = moment(startDate, this.locale.format);

          if (typeof startDate === 'object')
              this.startDate = moment(startDate);

          if (!this.timePicker)
              this.startDate = this.startDate.startOf('day');

          if (this.timePicker && this.timePickerIncrement)
              this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);

          if (this.minDate && this.startDate.isBefore(this.minDate)) {
              this.startDate = this.minDate.clone();
              if (this.timePicker && this.timePickerIncrement)
                  this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
          }

          if (this.maxDate && this.startDate.isAfter(this.maxDate)) {
              this.startDate = this.maxDate.clone();
              if (this.timePicker && this.timePickerIncrement)
                  this.startDate.minute(Math.floor(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
          }

          if (!this.isShowing)
              this.updateElement();

          this.updateMonthsInView();
      },

      setEndDate: function(endDate) {
          if (typeof endDate === 'string')
              this.endDate = moment(endDate, this.locale.format);

          if (typeof endDate === 'object')
              this.endDate = moment(endDate);

          if (!this.timePicker)
              this.endDate = this.endDate.endOf('day');

          if (this.timePicker && this.timePickerIncrement)
              this.endDate.minute(Math.round(this.endDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);

          if (this.endDate.isBefore(this.startDate))
              this.endDate = this.startDate.clone();

          if (this.maxDate && this.endDate.isAfter(this.maxDate))
              this.endDate = this.maxDate.clone();

          if (this.maxSpan && this.startDate.clone().add(this.maxSpan).isBefore(this.endDate))
              this.endDate = this.startDate.clone().add(this.maxSpan);

          this.previousRightTime = this.endDate.clone();

          this.container.find('.drp-selected').html(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));

          if (!this.isShowing)
              this.updateElement();

          this.updateMonthsInView();
      },

      isInvalidDate: function() {
          return false;
      },

      isCustomDate: function() {
          return false;
      },

      updateView: function() {
          if (this.timePicker) {
              this.renderTimePicker('left');
              this.renderTimePicker('right');
              if (!this.endDate) {
                  this.container.find('.right .calendar-time select').prop('disabled', true).addClass('disabled');
              } else {
                  this.container.find('.right .calendar-time select').prop('disabled', false).removeClass('disabled');
              }
          }
          if (this.endDate)
              this.container.find('.drp-selected').html(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
          this.updateMonthsInView();
          this.updateCalendars();
          this.updateFormInputs();
      },

      updateMonthsInView: function() {
          if (this.endDate) {

              //if both dates are visible already, do nothing
              if (!this.singleDatePicker && this.leftCalendar.month && this.rightCalendar.month &&
                  (this.startDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.startDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))
                  &&
                  (this.endDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.endDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))
                  ) {
                  return;
              }

              this.leftCalendar.month = this.startDate.clone().date(2);
              if (!this.linkedCalendars && (this.endDate.month() != this.startDate.month() || this.endDate.year() != this.startDate.year())) {
                  this.rightCalendar.month = this.endDate.clone().date(2);
              } else {
                  this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
              }

          } else {
              if (this.leftCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM') && this.rightCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM')) {
                  this.leftCalendar.month = this.startDate.clone().date(2);
                  this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
              }
          }
          if (this.maxDate && this.linkedCalendars && !this.singleDatePicker && this.rightCalendar.month > this.maxDate) {
            this.rightCalendar.month = this.maxDate.clone().date(2);
            this.leftCalendar.month = this.maxDate.clone().date(2).subtract(1, 'month');
          }
      },

      updateCalendars: function() {

          if (this.timePicker) {
              var hour, minute, second;
              if (this.endDate) {
                  hour = parseInt(this.container.find('.left .hourselect').val(), 10);
                  minute = parseInt(this.container.find('.left .minuteselect').val(), 10);
                  if (isNaN(minute)) {
                      minute = parseInt(this.container.find('.left .minuteselect option:last').val(), 10);
                  }
                  second = this.timePickerSeconds ? parseInt(this.container.find('.left .secondselect').val(), 10) : 0;
                  if (!this.timePicker24Hour) {
                      var ampm = this.container.find('.left .ampmselect').val();
                      if (ampm === 'PM' && hour < 12)
                          hour += 12;
                      if (ampm === 'AM' && hour === 12)
                          hour = 0;
                  }
              } else {
                  hour = parseInt(this.container.find('.right .hourselect').val(), 10);
                  minute = parseInt(this.container.find('.right .minuteselect').val(), 10);
                  if (isNaN(minute)) {
                      minute = parseInt(this.container.find('.right .minuteselect option:last').val(), 10);
                  }
                  second = this.timePickerSeconds ? parseInt(this.container.find('.right .secondselect').val(), 10) : 0;
                  if (!this.timePicker24Hour) {
                      var ampm = this.container.find('.right .ampmselect').val();
                      if (ampm === 'PM' && hour < 12)
                          hour += 12;
                      if (ampm === 'AM' && hour === 12)
                          hour = 0;
                  }
              }
              this.leftCalendar.month.hour(hour).minute(minute).second(second);
              this.rightCalendar.month.hour(hour).minute(minute).second(second);
          }

          this.renderCalendar('left');
          this.renderCalendar('right');

          //highlight any predefined range matching the current start and end dates
          this.container.find('.ranges li').removeClass('active');
          if (this.endDate == null) return;

          this.calculateChosenLabel();
      },

      renderCalendar: function(side) {

          //
          // Build the matrix of dates that will populate the calendar
          //

          var calendar = side == 'left' ? this.leftCalendar : this.rightCalendar;
          var month = calendar.month.month();
          var year = calendar.month.year();
          var hour = calendar.month.hour();
          var minute = calendar.month.minute();
          var second = calendar.month.second();
          var daysInMonth = moment([year, month]).daysInMonth();
          var firstDay = moment([year, month, 1]);
          var lastDay = moment([year, month, daysInMonth]);
          var lastMonth = moment(firstDay).subtract(1, 'month').month();
          var lastYear = moment(firstDay).subtract(1, 'month').year();
          var daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();
          var dayOfWeek = firstDay.day();

          //initialize a 6 rows x 7 columns array for the calendar
          var calendar = [];
          calendar.firstDay = firstDay;
          calendar.lastDay = lastDay;

          for (var i = 0; i < 6; i++) {
              calendar[i] = [];
          }

          //populate the calendar with date objects
          var startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
          if (startDay > daysInLastMonth)
              startDay -= 7;

          if (dayOfWeek == this.locale.firstDay)
              startDay = daysInLastMonth - 6;

          var curDate = moment([lastYear, lastMonth, startDay, 12, minute, second]);

          var col, row;
          for (var i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = moment(curDate).add(24, 'hour')) {
              if (i > 0 && col % 7 === 0) {
                  col = 0;
                  row++;
              }
              calendar[row][col] = curDate.clone().hour(hour).minute(minute).second(second);
              curDate.hour(12);

              if (this.minDate && calendar[row][col].format('YYYY-MM-DD') == this.minDate.format('YYYY-MM-DD') && calendar[row][col].isBefore(this.minDate) && side == 'left') {
                  calendar[row][col] = this.minDate.clone();
              }

              if (this.maxDate && calendar[row][col].format('YYYY-MM-DD') == this.maxDate.format('YYYY-MM-DD') && calendar[row][col].isAfter(this.maxDate) && side == 'right') {
                  calendar[row][col] = this.maxDate.clone();
              }

          }

          //make the calendar object available to hoverDate/clickDate
          if (side == 'left') {
              this.leftCalendar.calendar = calendar;
          } else {
              this.rightCalendar.calendar = calendar;
          }

          //
          // Display the calendar
          //

          var minDate = side == 'left' ? this.minDate : this.startDate;
          var maxDate = this.maxDate;
          var selected = side == 'left' ? this.startDate : this.endDate;
          var arrow = this.locale.direction == 'ltr' ? {left: 'chevron-left', right: 'chevron-right'} : {left: 'chevron-right', right: 'chevron-left'};

          var html = '<table class="table-condensed">';
          html += '<thead>';
          html += '<tr>';

          // add empty cell for week number
          if (this.showWeekNumbers || this.showISOWeekNumbers)
              html += '<th></th>';

          if ((!minDate || minDate.isBefore(calendar.firstDay)) && (!this.linkedCalendars || side == 'left')) {
              html += '<th class="prev available"><span></span></th>';
          } else {
              html += '<th></th>';
          }

          var dateHtml = this.locale.monthNames[calendar[1][1].month()] + calendar[1][1].format(" YYYY");

          if (this.showDropdowns) {
              var currentMonth = calendar[1][1].month();
              var currentYear = calendar[1][1].year();
              var maxYear = (maxDate && maxDate.year()) || (this.maxYear);
              var minYear = (minDate && minDate.year()) || (this.minYear);
              var inMinYear = currentYear == minYear;
              var inMaxYear = currentYear == maxYear;

              var monthHtml = '<select class="monthselect">';
              for (var m = 0; m < 12; m++) {
                  if ((!inMinYear || (minDate && m >= minDate.month())) && (!inMaxYear || (maxDate && m <= maxDate.month()))) {
                      monthHtml += "<option value='" + m + "'" +
                          (m === currentMonth ? " selected='selected'" : "") +
                          ">" + this.locale.monthNames[m] + "</option>";
                  } else {
                      monthHtml += "<option value='" + m + "'" +
                          (m === currentMonth ? " selected='selected'" : "") +
                          " disabled='disabled'>" + this.locale.monthNames[m] + "</option>";
                  }
              }
              monthHtml += "</select>";

              var yearHtml = '<select class="yearselect">';
              for (var y = minYear; y <= maxYear; y++) {
                  yearHtml += '<option value="' + y + '"' +
                      (y === currentYear ? ' selected="selected"' : '') +
                      '>' + y + '</option>';
              }
              yearHtml += '</select>';

              dateHtml = monthHtml + yearHtml;
          }

          html += '<th colspan="5" class="month">' + dateHtml + '</th>';
          if ((!maxDate || maxDate.isAfter(calendar.lastDay)) && (!this.linkedCalendars || side == 'right' || this.singleDatePicker)) {
              html += '<th class="next available"><span></span></th>';
          } else {
              html += '<th></th>';
          }

          html += '</tr>';
          html += '<tr>';

          // add week number label
          if (this.showWeekNumbers || this.showISOWeekNumbers)
              html += '<th class="week">' + this.locale.weekLabel + '</th>';

          $.each(this.locale.daysOfWeek, function(index, dayOfWeek) {
              html += '<th>' + dayOfWeek + '</th>';
          });

          html += '</tr>';
          html += '</thead>';
          html += '<tbody>';

          //adjust maxDate to reflect the maxSpan setting in order to
          //grey out end dates beyond the maxSpan
          if (this.endDate == null && this.maxSpan) {
              var maxLimit = this.startDate.clone().add(this.maxSpan).endOf('day');
              if (!maxDate || maxLimit.isBefore(maxDate)) {
                  maxDate = maxLimit;
              }
          }

          for (var row = 0; row < 6; row++) {
              html += '<tr>';

              // add week number
              if (this.showWeekNumbers)
                  html += '<td class="week">' + calendar[row][0].week() + '</td>';
              else if (this.showISOWeekNumbers)
                  html += '<td class="week">' + calendar[row][0].isoWeek() + '</td>';

              for (var col = 0; col < 7; col++) {

                  var classes = [];

                  //highlight today's date
                  if (calendar[row][col].isSame(new Date(), "day"))
                      classes.push('today');

                  //highlight weekends
                  if (calendar[row][col].isoWeekday() > 5)
                      classes.push('weekend');

                  //grey out the dates in other months displayed at beginning and end of this calendar
                  if (calendar[row][col].month() != calendar[1][1].month())
                      classes.push('off', 'ends');

                  //don't allow selection of dates before the minimum date
                  if (this.minDate && calendar[row][col].isBefore(this.minDate, 'day'))
                      classes.push('off', 'disabled');

                  //don't allow selection of dates after the maximum date
                  if (maxDate && calendar[row][col].isAfter(maxDate, 'day'))
                      classes.push('off', 'disabled');

                  //don't allow selection of date if a custom function decides it's invalid
                  if (this.isInvalidDate(calendar[row][col]))
                      classes.push('off', 'disabled');

                  //highlight the currently selected start date
                  if (calendar[row][col].format('YYYY-MM-DD') == this.startDate.format('YYYY-MM-DD'))
                      classes.push('active', 'start-date');

                  //highlight the currently selected end date
                  if (this.endDate != null && calendar[row][col].format('YYYY-MM-DD') == this.endDate.format('YYYY-MM-DD'))
                      classes.push('active', 'end-date');

                  //highlight dates in-between the selected dates
                  if (this.endDate != null && calendar[row][col] > this.startDate && calendar[row][col] < this.endDate)
                      classes.push('in-range');

                  //apply custom classes for this date
                  var isCustom = this.isCustomDate(calendar[row][col]);
                  if (isCustom !== false) {
                      if (typeof isCustom === 'string')
                          classes.push(isCustom);
                      else
                          Array.prototype.push.apply(classes, isCustom);
                  }

                  var cname = '', disabled = false;
                  for (var i = 0; i < classes.length; i++) {
                      cname += classes[i] + ' ';
                      if (classes[i] == 'disabled')
                          disabled = true;
                  }
                  if (!disabled)
                      cname += 'available';

                  html += '<td class="' + cname.replace(/^\s+|\s+$/g, '') + '" data-title="' + 'r' + row + 'c' + col + '">' + calendar[row][col].date() + '</td>';

              }
              html += '</tr>';
          }

          html += '</tbody>';
          html += '</table>';

          this.container.find('.drp-calendar.' + side + ' .calendar-table').html(html);

      },

      renderTimePicker: function(side) {

          // Don't bother updating the time picker if it's currently disabled
          // because an end date hasn't been clicked yet
          if (side == 'right' && !this.endDate) return;

          var html, selected, minDate, maxDate = this.maxDate;

          if (this.maxSpan && (!this.maxDate || this.startDate.clone().add(this.maxSpan).isBefore(this.maxDate)))
              maxDate = this.startDate.clone().add(this.maxSpan);

          if (side == 'left') {
              selected = this.startDate.clone();
              minDate = this.minDate;
          } else if (side == 'right') {
              selected = this.endDate.clone();
              minDate = this.startDate;

              //Preserve the time already selected
              var timeSelector = this.container.find('.drp-calendar.right .calendar-time');
              if (timeSelector.html() != '') {

                  selected.hour(!isNaN(selected.hour()) ? selected.hour() : timeSelector.find('.hourselect option:selected').val());
                  selected.minute(!isNaN(selected.minute()) ? selected.minute() : timeSelector.find('.minuteselect option:selected').val());
                  selected.second(!isNaN(selected.second()) ? selected.second() : timeSelector.find('.secondselect option:selected').val());

                  if (!this.timePicker24Hour) {
                      var ampm = timeSelector.find('.ampmselect option:selected').val();
                      if (ampm === 'PM' && selected.hour() < 12)
                          selected.hour(selected.hour() + 12);
                      if (ampm === 'AM' && selected.hour() === 12)
                          selected.hour(0);
                  }

              }

              if (selected.isBefore(this.startDate))
                  selected = this.startDate.clone();

              if (maxDate && selected.isAfter(maxDate))
                  selected = maxDate.clone();

          }

          //
          // hours
          //

          html = '<select class="hourselect">';

          var start = this.timePicker24Hour ? 0 : 1;
          var end = this.timePicker24Hour ? 23 : 12;

          for (var i = start; i <= end; i++) {
              var i_in_24 = i;
              if (!this.timePicker24Hour)
                  i_in_24 = selected.hour() >= 12 ? (i == 12 ? 12 : i + 12) : (i == 12 ? 0 : i);

              var time = selected.clone().hour(i_in_24);
              var disabled = false;
              if (minDate && time.minute(59).isBefore(minDate))
                  disabled = true;
              if (maxDate && time.minute(0).isAfter(maxDate))
                  disabled = true;

              if (i_in_24 == selected.hour() && !disabled) {
                  html += '<option value="' + i + '" selected="selected">' + i + '</option>';
              } else if (disabled) {
                  html += '<option value="' + i + '" disabled="disabled" class="disabled">' + i + '</option>';
              } else {
                  html += '<option value="' + i + '">' + i + '</option>';
              }
          }

          html += '</select> ';

          //
          // minutes
          //

          html += ': <select class="minuteselect">';

          for (var i = 0; i < 60; i += this.timePickerIncrement) {
              var padded = i < 10 ? '0' + i : i;
              var time = selected.clone().minute(i);

              var disabled = false;
              if (minDate && time.second(59).isBefore(minDate))
                  disabled = true;
              if (maxDate && time.second(0).isAfter(maxDate))
                  disabled = true;

              if (selected.minute() == i && !disabled) {
                  html += '<option value="' + i + '" selected="selected">' + padded + '</option>';
              } else if (disabled) {
                  html += '<option value="' + i + '" disabled="disabled" class="disabled">' + padded + '</option>';
              } else {
                  html += '<option value="' + i + '">' + padded + '</option>';
              }
          }

          html += '</select> ';

          //
          // seconds
          //

          if (this.timePickerSeconds) {
              html += ': <select class="secondselect">';

              for (var i = 0; i < 60; i++) {
                  var padded = i < 10 ? '0' + i : i;
                  var time = selected.clone().second(i);

                  var disabled = false;
                  if (minDate && time.isBefore(minDate))
                      disabled = true;
                  if (maxDate && time.isAfter(maxDate))
                      disabled = true;

                  if (selected.second() == i && !disabled) {
                      html += '<option value="' + i + '" selected="selected">' + padded + '</option>';
                  } else if (disabled) {
                      html += '<option value="' + i + '" disabled="disabled" class="disabled">' + padded + '</option>';
                  } else {
                      html += '<option value="' + i + '">' + padded + '</option>';
                  }
              }

              html += '</select> ';
          }

          //
          // AM/PM
          //

          if (!this.timePicker24Hour) {
              html += '<select class="ampmselect">';

              var am_html = '';
              var pm_html = '';

              if (minDate && selected.clone().hour(12).minute(0).second(0).isBefore(minDate))
                  am_html = ' disabled="disabled" class="disabled"';

              if (maxDate && selected.clone().hour(0).minute(0).second(0).isAfter(maxDate))
                  pm_html = ' disabled="disabled" class="disabled"';

              if (selected.hour() >= 12) {
                  html += '<option value="AM"' + am_html + '>AM</option><option value="PM" selected="selected"' + pm_html + '>PM</option>';
              } else {
                  html += '<option value="AM" selected="selected"' + am_html + '>AM</option><option value="PM"' + pm_html + '>PM</option>';
              }

              html += '</select>';
          }

          this.container.find('.drp-calendar.' + side + ' .calendar-time').html(html);

      },

      updateFormInputs: function() {

          if (this.singleDatePicker || (this.endDate && (this.startDate.isBefore(this.endDate) || this.startDate.isSame(this.endDate)))) {
              this.container.find('button.applyBtn').prop('disabled', false);
          } else {
              this.container.find('button.applyBtn').prop('disabled', true);
          }

      },

      move: function() {
          var parentOffset = { top: 0, left: 0 },
              containerTop,
              drops = this.drops;

          var parentRightEdge = $(window).width();
          if (!this.parentEl.is('body')) {
              parentOffset = {
                  top: this.parentEl.offset().top - this.parentEl.scrollTop(),
                  left: this.parentEl.offset().left - this.parentEl.scrollLeft()
              };
              parentRightEdge = this.parentEl[0].clientWidth + this.parentEl.offset().left;
          }

          switch (drops) {
          case 'auto':
              containerTop = this.element.offset().top + this.element.outerHeight() - parentOffset.top;
              if (containerTop + this.container.outerHeight() >= this.parentEl[0].scrollHeight) {
                  containerTop = this.element.offset().top - this.container.outerHeight() - parentOffset.top;
                  drops = 'up';
              }
              break;
          case 'up':
              containerTop = this.element.offset().top - this.container.outerHeight() - parentOffset.top;
              break;
          default:
              containerTop = this.element.offset().top + this.element.outerHeight() - parentOffset.top;
              break;
          }

          // Force the container to it's actual width
          this.container.css({
            top: 0,
            left: 0,
            right: 'auto'
          });
          var containerWidth = this.container.outerWidth();

          this.container.toggleClass('drop-up', drops == 'up');

          if (this.opens == 'left') {
              var containerRight = parentRightEdge - this.element.offset().left - this.element.outerWidth();
              if (containerWidth + containerRight > $(window).width()) {
                  this.container.css({
                      top: containerTop,
                      right: 'auto',
                      left: 9
                  });
              } else {
                  this.container.css({
                      top: containerTop,
                      right: containerRight,
                      left: 'auto'
                  });
              }
          } else if (this.opens == 'center') {
              var containerLeft = this.element.offset().left - parentOffset.left + this.element.outerWidth() / 2
                                      - containerWidth / 2;
              if (containerLeft < 0) {
                  this.container.css({
                      top: containerTop,
                      right: 'auto',
                      left: 9
                  });
              } else if (containerLeft + containerWidth > $(window).width()) {
                  this.container.css({
                      top: containerTop,
                      left: 'auto',
                      right: 0
                  });
              } else {
                  this.container.css({
                      top: containerTop,
                      left: containerLeft,
                      right: 'auto'
                  });
              }
          } else {
              var containerLeft = this.element.offset().left - parentOffset.left;
              if (containerLeft + containerWidth > $(window).width()) {
                  this.container.css({
                      top: containerTop,
                      left: 'auto',
                      right: 0
                  });
              } else {
                  this.container.css({
                      top: containerTop,
                      left: containerLeft,
                      right: 'auto'
                  });
              }
          }
      },

      show: function(e) {
          if (this.isShowing) return;

          // Create a click proxy that is private to this instance of datepicker, for unbinding
          this._outsideClickProxy = $.proxy(function(e) { this.outsideClick(e); }, this);

          // Bind global datepicker mousedown for hiding and
          $(document)
            .on('mousedown.daterangepicker', this._outsideClickProxy)
            // also support mobile devices
            .on('touchend.daterangepicker', this._outsideClickProxy)
            // also explicitly play nice with Bootstrap dropdowns, which stopPropagation when clicking them
            .on('click.daterangepicker', '[data-toggle=dropdown]', this._outsideClickProxy)
            // and also close when focus changes to outside the picker (eg. tabbing between controls)
            .on('focusin.daterangepicker', this._outsideClickProxy);

          // Reposition the picker if the window is resized while it's open
          $(window).on('resize.daterangepicker', $.proxy(function(e) { this.move(e); }, this));

          this.oldStartDate = this.startDate.clone();
          this.oldEndDate = this.endDate.clone();
          this.previousRightTime = this.endDate.clone();

          this.updateView();
          this.container.show();
          this.move();
          this.element.trigger('show.daterangepicker', this);
          this.isShowing = true;
      },

      hide: function(e) {
          if (!this.isShowing) return;

          //incomplete date selection, revert to last values
          if (!this.endDate) {
              this.startDate = this.oldStartDate.clone();
              this.endDate = this.oldEndDate.clone();
          }

          //if a new date range was selected, invoke the user callback function
          if (!this.startDate.isSame(this.oldStartDate) || !this.endDate.isSame(this.oldEndDate))
              this.callback(this.startDate.clone(), this.endDate.clone(), this.chosenLabel);

          //if picker is attached to a text input, update it
          this.updateElement();

          $(document).off('.daterangepicker');
          $(window).off('.daterangepicker');
          this.container.hide();
          this.element.trigger('hide.daterangepicker', this);
          this.isShowing = false;
      },

      toggle: function(e) {
          if (this.isShowing) {
              this.hide();
          } else {
              this.show();
          }
      },

      outsideClick: function(e) {
          var target = $(e.target);
          // if the page is clicked anywhere except within the daterangerpicker/button
          // itself then call this.hide()
          if (
              // ie modal dialog fix
              e.type == "focusin" ||
              target.closest(this.element).length ||
              target.closest(this.container).length ||
              target.closest('.calendar-table').length
              ) return;
          this.hide();
          this.element.trigger('outsideClick.daterangepicker', this);
      },

      showCalendars: function() {
          this.container.addClass('show-calendar');
          this.move();
          this.element.trigger('showCalendar.daterangepicker', this);
      },

      hideCalendars: function() {
          this.container.removeClass('show-calendar');
          this.element.trigger('hideCalendar.daterangepicker', this);
      },

      clickRange: function(e) {
          var label = e.target.getAttribute('data-range-key');
          this.chosenLabel = label;
          if (label == this.locale.customRangeLabel) {
              this.showCalendars();
          } else {
              var dates = this.ranges[label];
              this.startDate = dates[0];
              this.endDate = dates[1];

              if (!this.timePicker) {
                  this.startDate.startOf('day');
                  this.endDate.endOf('day');
              }

              if (!this.alwaysShowCalendars)
                  this.hideCalendars();
              this.clickApply();
          }
      },

      clickPrev: function(e) {
          var cal = $(e.target).parents('.drp-calendar');
          if (cal.hasClass('left')) {
              this.leftCalendar.month.subtract(1, 'month');
              if (this.linkedCalendars)
                  this.rightCalendar.month.subtract(1, 'month');
          } else {
              this.rightCalendar.month.subtract(1, 'month');
          }
          this.updateCalendars();
      },

      clickNext: function(e) {
          var cal = $(e.target).parents('.drp-calendar');
          if (cal.hasClass('left')) {
              this.leftCalendar.month.add(1, 'month');
          } else {
              this.rightCalendar.month.add(1, 'month');
              if (this.linkedCalendars)
                  this.leftCalendar.month.add(1, 'month');
          }
          this.updateCalendars();
      },

      hoverDate: function(e) {

          //ignore dates that can't be selected
          if (!$(e.target).hasClass('available')) return;

          var title = $(e.target).attr('data-title');
          var row = title.substr(1, 1);
          var col = title.substr(3, 1);
          var cal = $(e.target).parents('.drp-calendar');
          var date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];

          //highlight the dates between the start date and the date being hovered as a potential end date
          var leftCalendar = this.leftCalendar;
          var rightCalendar = this.rightCalendar;
          var startDate = this.startDate;
          if (!this.endDate) {
              this.container.find('.drp-calendar tbody td').each(function(index, el) {

                  //skip week numbers, only look at dates
                  if ($(el).hasClass('week')) return;

                  var title = $(el).attr('data-title');
                  var row = title.substr(1, 1);
                  var col = title.substr(3, 1);
                  var cal = $(el).parents('.drp-calendar');
                  var dt = cal.hasClass('left') ? leftCalendar.calendar[row][col] : rightCalendar.calendar[row][col];

                  if ((dt.isAfter(startDate) && dt.isBefore(date)) || dt.isSame(date, 'day')) {
                      $(el).addClass('in-range');
                  } else {
                      $(el).removeClass('in-range');
                  }

              });
          }

      },

      clickDate: function(e) {

          if (!$(e.target).hasClass('available')) return;

          var title = $(e.target).attr('data-title');
          var row = title.substr(1, 1);
          var col = title.substr(3, 1);
          var cal = $(e.target).parents('.drp-calendar');
          var date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];

          //
          // this function needs to do a few things:
          // * alternate between selecting a start and end date for the range,
          // * if the time picker is enabled, apply the hour/minute/second from the select boxes to the clicked date
          // * if autoapply is enabled, and an end date was chosen, apply the selection
          // * if single date picker mode, and time picker isn't enabled, apply the selection immediately
          // * if one of the inputs above the calendars was focused, cancel that manual input
          //

          if (this.endDate || date.isBefore(this.startDate, 'day')) { //picking start
              if (this.timePicker) {
                  var hour = parseInt(this.container.find('.left .hourselect').val(), 10);
                  if (!this.timePicker24Hour) {
                      var ampm = this.container.find('.left .ampmselect').val();
                      if (ampm === 'PM' && hour < 12)
                          hour += 12;
                      if (ampm === 'AM' && hour === 12)
                          hour = 0;
                  }
                  var minute = parseInt(this.container.find('.left .minuteselect').val(), 10);
                  if (isNaN(minute)) {
                      minute = parseInt(this.container.find('.left .minuteselect option:last').val(), 10);
                  }
                  var second = this.timePickerSeconds ? parseInt(this.container.find('.left .secondselect').val(), 10) : 0;
                  date = date.clone().hour(hour).minute(minute).second(second);
              }
              this.endDate = null;
              this.setStartDate(date.clone());
          } else if (!this.endDate && date.isBefore(this.startDate)) {
              //special case: clicking the same date for start/end,
              //but the time of the end date is before the start date
              this.setEndDate(this.startDate.clone());
          } else { // picking end
              if (this.timePicker) {
                  var hour = parseInt(this.container.find('.right .hourselect').val(), 10);
                  if (!this.timePicker24Hour) {
                      var ampm = this.container.find('.right .ampmselect').val();
                      if (ampm === 'PM' && hour < 12)
                          hour += 12;
                      if (ampm === 'AM' && hour === 12)
                          hour = 0;
                  }
                  var minute = parseInt(this.container.find('.right .minuteselect').val(), 10);
                  if (isNaN(minute)) {
                      minute = parseInt(this.container.find('.right .minuteselect option:last').val(), 10);
                  }
                  var second = this.timePickerSeconds ? parseInt(this.container.find('.right .secondselect').val(), 10) : 0;
                  date = date.clone().hour(hour).minute(minute).second(second);
              }
              this.setEndDate(date.clone());
              if (this.autoApply) {
                this.calculateChosenLabel();
                this.clickApply();
              }
          }

          if (this.singleDatePicker) {
              this.setEndDate(this.startDate);
              if (!this.timePicker && this.autoApply)
                  this.clickApply();
          }

          this.updateView();

          //This is to cancel the blur event handler if the mouse was in one of the inputs
          e.stopPropagation();

      },

      calculateChosenLabel: function () {
          var customRange = true;
          var i = 0;
          for (var range in this.ranges) {
            if (this.timePicker) {
                  var format = this.timePickerSeconds ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD HH:mm";
                  //ignore times when comparing dates if time picker seconds is not enabled
                  if (this.startDate.format(format) == this.ranges[range][0].format(format) && this.endDate.format(format) == this.ranges[range][1].format(format)) {
                      customRange = false;
                      this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')').addClass('active').attr('data-range-key');
                      break;
                  }
              } else {
                  //ignore times when comparing dates if time picker is not enabled
                  if (this.startDate.format('YYYY-MM-DD') == this.ranges[range][0].format('YYYY-MM-DD') && this.endDate.format('YYYY-MM-DD') == this.ranges[range][1].format('YYYY-MM-DD')) {
                      customRange = false;
                      this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')').addClass('active').attr('data-range-key');
                      break;
                  }
              }
              i++;
          }
          if (customRange) {
              if (this.showCustomRangeLabel) {
                  this.chosenLabel = this.container.find('.ranges li:last').addClass('active').attr('data-range-key');
              } else {
                  this.chosenLabel = null;
              }
              this.showCalendars();
          }
      },

      clickApply: function(e) {
          this.hide();
          this.element.trigger('apply.daterangepicker', this);
      },

      clickCancel: function(e) {
          this.startDate = this.oldStartDate;
          this.endDate = this.oldEndDate;
          this.hide();
          this.element.trigger('cancel.daterangepicker', this);
      },

      monthOrYearChanged: function(e) {
          var isLeft = $(e.target).closest('.drp-calendar').hasClass('left'),
              leftOrRight = isLeft ? 'left' : 'right',
              cal = this.container.find('.drp-calendar.'+leftOrRight);

          // Month must be Number for new moment versions
          var month = parseInt(cal.find('.monthselect').val(), 10);
          var year = cal.find('.yearselect').val();

          if (!isLeft) {
              if (year < this.startDate.year() || (year == this.startDate.year() && month < this.startDate.month())) {
                  month = this.startDate.month();
                  year = this.startDate.year();
              }
          }

          if (this.minDate) {
              if (year < this.minDate.year() || (year == this.minDate.year() && month < this.minDate.month())) {
                  month = this.minDate.month();
                  year = this.minDate.year();
              }
          }

          if (this.maxDate) {
              if (year > this.maxDate.year() || (year == this.maxDate.year() && month > this.maxDate.month())) {
                  month = this.maxDate.month();
                  year = this.maxDate.year();
              }
          }

          if (isLeft) {
              this.leftCalendar.month.month(month).year(year);
              if (this.linkedCalendars)
                  this.rightCalendar.month = this.leftCalendar.month.clone().add(1, 'month');
          } else {
              this.rightCalendar.month.month(month).year(year);
              if (this.linkedCalendars)
                  this.leftCalendar.month = this.rightCalendar.month.clone().subtract(1, 'month');
          }
          this.updateCalendars();
      },

      timeChanged: function(e) {

          var cal = $(e.target).closest('.drp-calendar'),
              isLeft = cal.hasClass('left');

          var hour = parseInt(cal.find('.hourselect').val(), 10);
          var minute = parseInt(cal.find('.minuteselect').val(), 10);
          if (isNaN(minute)) {
              minute = parseInt(cal.find('.minuteselect option:last').val(), 10);
          }
          var second = this.timePickerSeconds ? parseInt(cal.find('.secondselect').val(), 10) : 0;

          if (!this.timePicker24Hour) {
              var ampm = cal.find('.ampmselect').val();
              if (ampm === 'PM' && hour < 12)
                  hour += 12;
              if (ampm === 'AM' && hour === 12)
                  hour = 0;
          }

          if (isLeft) {
              var start = this.startDate.clone();
              start.hour(hour);
              start.minute(minute);
              start.second(second);
              this.setStartDate(start);
              if (this.singleDatePicker) {
                  this.endDate = this.startDate.clone();
              } else if (this.endDate && this.endDate.format('YYYY-MM-DD') == start.format('YYYY-MM-DD') && this.endDate.isBefore(start)) {
                  this.setEndDate(start.clone());
              }
          } else if (this.endDate) {
              var end = this.endDate.clone();
              end.hour(hour);
              end.minute(minute);
              end.second(second);
              this.setEndDate(end);
          }

          //update the calendars so all clickable dates reflect the new time component
          this.updateCalendars();

          //update the form inputs above the calendars with the new time
          this.updateFormInputs();

          //re-render the time pickers because changing one selection can affect what's enabled in another
          this.renderTimePicker('left');
          this.renderTimePicker('right');

      },

      elementChanged: function() {
          if (!this.element.is('input')) return;
          if (!this.element.val().length) return;

          var dateString = this.element.val().split(this.locale.separator),
              start = null,
              end = null;

          if (dateString.length === 2) {
              start = moment(dateString[0], this.locale.format);
              end = moment(dateString[1], this.locale.format);
          }

          if (this.singleDatePicker || start === null || end === null) {
              start = moment(this.element.val(), this.locale.format);
              end = start;
          }

          if (!start.isValid() || !end.isValid()) return;

          this.setStartDate(start);
          this.setEndDate(end);
          this.updateView();
      },

      keydown: function(e) {
          //hide on tab or enter
          if ((e.keyCode === 9) || (e.keyCode === 13)) {
              this.hide();
          }

          //hide on esc and prevent propagation
          if (e.keyCode === 27) {
              e.preventDefault();
              e.stopPropagation();

              this.hide();
          }
      },

      updateElement: function() {
          if (this.element.is('input') && this.autoUpdateInput) {
              var newValue = this.startDate.format(this.locale.format);
              if (!this.singleDatePicker) {
                  newValue += this.locale.separator + this.endDate.format(this.locale.format);
              }
              if (newValue !== this.element.val()) {
                  this.element.val(newValue).trigger('change');
              }
          }
      },

      remove: function() {
          this.container.remove();
          this.element.off('.daterangepicker');
          this.element.removeData();
      }

  };

  $.fn.daterangepicker = function(options, callback) {
      var implementOptions = $.extend(true, {}, $.fn.daterangepicker.defaultOptions, options);
      this.each(function() {
          var el = $(this);
          if (el.data('daterangepicker'))
              el.data('daterangepicker').remove();
          el.data('daterangepicker', new DateRangePicker(el, implementOptions, callback));
      });
      return this;
  };

  return DateRangePicker;

}));