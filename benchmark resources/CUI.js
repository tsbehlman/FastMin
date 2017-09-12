/* Classical JavaScript Inheritance
 * By Douglas Crockford http://www.crockford.com/javascript/inheritance.html
 * Some changes to this script made by Trevor Behlman
 */
(function() {
	"use strict";
	function encapsulate( func, superClass ) {
		return function() {
			var currentSuperClass = this.super,
				returnValue;
			this.super = superClass;
			returnValue = func.apply( this, arguments );
			this.super = currentSuperClass;
			return returnValue;
		};
	}
	function Class() {

	}
	Class.prototype = {
		constructor: function() {

		},
		handleEvent: function( e ) {
			if( !this._C9Event[e.type] ) {
				return;
			}
			var events = this._C9Event[e.type].array,
				i = this._C9Event[e.type].length;
			while( i-- ) {
				if( events[i] && events[i].targetElement === e.currentTarget ) {
					events[i].callback.call( this, e );
				}
			}
		},
		_C9AddEvent: function( targetElement, eventName, callback ) {
			var outcome = {
				targetElement: targetElement,
				callback: callback
			}
			var outcomes = this._C9Event[eventName];
			if( !outcomes ) {
				outcomes = this._C9Event[eventName] = new C9List();
			}
			outcomes.add( outcome );
		},
		_C9RemoveEvent: function( targetElement, eventName, callback ) {
			this._C9Event[eventName].remove( this._C9Event[eventName].contains( {
				targetElement: targetElement,
				callback: callback
			} ) );
		},
		bind: function( targetElement, eventName, callback ) {
			if( targetElement instanceof Array ) {
				var i = targetElement.length;
				while( i-- ) {
					this.bind( targetElement[i], eventName, callback );
				}
			}
			else {
				if( eventName === "click" ) {
					var that = this;
					targetElement.bind( eventName, function( e ) {
						callback.call( that, e );
					} );
				}
				else {
					this._C9AddEvent( targetElement, eventName, callback );
					targetElement.bind( eventName, this );
				}
			}
		},
		unBind: function( targetElement, eventName, callback ) {
			if( targetElement instanceof Array ) {
				var i = targetElement.length;
				while( i-- ) {
					this.unBind( targetElement[i], eventName, callback );
				}
			}
			else {
				this._C9RemoveEvent( targetElement, eventName, callback );
				targetElement.unBind( eventName, this );
			}
		},
		addEventListener: function( eventName, callback ) {
			this._C9AddEvent( this, eventName, callback );
		},
		removeEventListener: function( eventName, callback ) {
			this._C9RemoveEvent( this, eventName, callback );
		},
		dispatchEvent: function( eventName, details ) {
			if( this._C9Event[eventName] ) {
				var that = this;
				if( !details ) {
					details = new Object();
				}
				details.type = eventName;
				details.currentTarget = this;
				this.handleEvent( details );
			}
		}
	};
	Class.extend = function( subClass, superAccess ) {
		var newClass = function() {
				if( arguments[0] !== Class ) {
					this._C9Event = new Object();
					this.constructor.apply( this, arguments );
				}
			},
			property;

		newClass.prototype = new this( Class );

		for( property in subClass ) {
			newClass.prototype[property] =
				subClass[property] instanceof Function && /\.super\./.test( subClass[property].toString() ) ?
					encapsulate( subClass[property], this.prototype ) :
					subClass[property];
		}

		//newClass.prototype.constructor = Class;
		newClass.extend = this.extend;

		return newClass;
	};
	window.Class = Class;
})();

		function assert( value, msg ) {
		return false;
	}
	function assertEqual( valueOne, valueTwo, msg ) {
		return false;
	}
	function bindNum( x, y, z ) {
	return y < x ? x : y > z ? z : y;
}
function isBetween( x, y, z ) {
	return y > x && y < z;
}
function isOutside( x, y, z ) {
	return y < x || y > z;
}
function C9CreateListSeparator( title ) {
	var sep = document.createElement("a");
	sep.className = "C9ListSeparator";
	sep.textContent = title;
	return sep;
}
function getFinger( e ) {
				return 0;
		}
function getTap( e, id ) {
				return e;
		}
/*(function() {
	function nextItem( string, start ) {
		var i = start ? start : 0,
			length = string.length;
		while( i < length ) {
			if( string[i] === '.' || string[i] === '#' ) {
				break;
			}
			i++;
		}
		return i;
	}
	window.C9CreateElement = function( element, textContent, attributes ) {
		var i,
			id = ( i = element.indexOf( '#' ) + 1 ) ?
				element.substr( i, nextItem( element, i ) - i ) :
				'',
			tagName = element.substr( 0, nextItem( element ) ),
			className = '';
		while( i = element.indexOf( '.', i ) + 1 ) {
			var j;
			className += element.substr( i, ( j = nextItem( element, i ) ) - i ) + ' ';
			i = j;
		}
		element = document.createElement( tagName );
		if( id !== '' ) {
			element.id = id;
		}
		if( className !== '' ) {
			element.className = className;
		}
		if( textContent ) {
			element.textContent = textContent;
		}
		if( attributes ) {
			var attr;
			for( attr in attributes ) {
				element.setAttribute( attr, attributes[attr] );
			}
		}
		return element;
	}
})();*/
(function() {
	var elementString = '',
		i = 0;
	function nextItem() {
		var length = elementString.length;
		while( i < length ) {
			if( elementString[i] === '#' || elementString[i] === '.' ) {
				break;
			}
			i++;
		}
		return i;
	}
	window.C9CreateElement = function( newElement, textContent, attributes ) {
		elementString = newElement;
		var tagName = newElement.substr( i, -i + nextItem() ),
			id = newElement[i] === '#' ? newElement.substr( ++i, -i + nextItem() ) : '',
			className = '';
		while( i < newElement.length ) {
			className += newElement.substr( ++i, -i + nextItem() ) + ' ';
		}
		newElement = document.createElement( tagName );
		if( id !== '' ) {
			newElement.id = id;
		}
		if( className !== '' ) {
			newElement.className = className;
		}
		if( textContent ) {
			newElement.textContent = textContent;
		}
		if( attributes ) {
			var attr;
			for( attr in attributes ) {
				newElement.setAttribute( attr, attributes[attr] );
				}
			}
			i = 0;
		elementString = '';
			return newElement;
		}
	})();
	function setCSSRule(selector, property, value, stylesheet) {
		if(stylesheet === undefined) {
		var i = document.styleSheets.length,
				j;
			while(i--) {
				j = document.styleSheets[i].rules.length;
			while(j--) {
					if(document.styleSheets[i].rules[j].selectorText === selector) {
						document.styleSheets[i].rules[j].style[property] = value;
						return;
				}
				}
			}
			document.styleSheets[0].insertRule(selector+"{"+property+value+"}", 0);
	}
	else {
			var i = stylesheet.rules.length;
		while(j--) {
			if(stylesheet.rules[j].selectorText === selector) {
					stylesheet.rules[j].style[property] = value;
					return;
			}
			}
			stylesheet.insertRule(selector+"{"+property+value+"}", 0);
		}
	}
	function C9MergeObjects( target,source ) {
		if( source ) {
			var property;
			for( property in source ) {
				target[ property ] = source[ property ];
			}
		}
	return target;
	}
	function C9ObjectsEqual(target, source ) {
	if( source ) {
			if( source.constructor.name ==="Array" ) {
				if( target.constructor.name === "Array" && source.length === target.length ) {
					for( var i = 0; i < source.length; i++ ) {
						if( !source[i].equals( target[i] ) ) {
							return false;
						}
					}
					return true;
				}
				else {
					return false;
			}
			}
			var property;
			for( property in target ) {
				if( source[property] ) {
				if( ( source[property].constructor.name=== "Array" &&
						  target[property].constructor.name === "Array" &&
						  !source[property].equals( target[property] ) ) ||
						source[ property ] !== target[ property ] ) {
						return false;
					}
				}
			}
		return true;
		}
		return false;
	}
	function C9ObjectIsEmpty( object ) {
		for( var property in object ) {
			return false;
		}
		return true;
	}
	function matrix2DTo3D( m ) {
		return [ m[0], m[1], 0, 0, m[2], m[3], 0, 0, 0, 0, 1, 0, m[4], m[5], 0, 1 ];
	}
	function matricesAreEqual( matrixOne, matrixTwo ) {
		var splitOne = matrixOne.substr( matrixOne.indexOf( '(' ) + 1 ).split( ',' ),
			splitTwo = matrixTwo.substr( matrixTwo.indexOf( '(') + 1 ).split( ',' );
		if( splitOne.length === splitTwo.length ) {
			return matrixOne === matrixTwo;
		}
		else {
			splitOne = splitOne.toNum();
			splitTwo = splitTwo.toNum();
			if( splitOne.length === 6 ) {
			splitOne = matrix2DTo3D( splitOne );
			}
		else if( splitTwo.length === 6 ) {
				splitTwo =matrix2DTo3D(splitTwo );
			}
			else {
				throw new Error( "Invalid Matrix" );
			}
			for( vari = 0; i< 16; i++ ) {
			if( splitOne[i] !== splitTwo[i] ) {
				return false;
				}
			}
			return true;
		}
}
Object.prototype.merge = function( obj ) {
	if( obj ) {
		var property;
		for( property in obj ) {
			this[ property ] = obj[ property ];
			}
		}
		return this;
	};
	Object.prototype.clone = function() {
		return JSON.parse( JSON.stringify( this ) );
	}
	Object.prototype.equals = function( obj ) {
		if( obj ) {
			varproperty;
			for( propertyin this ) {
				if( obj[property] ) {
					if(( typeof this[property] === "Object" &&
					  typeof obj[property] === "Object" &&
						  !obj[property].equals( this[property] ) ) ||
						obj[ property ] !== this[ property ] ) {
						return false;
					}
				}
			}
			return true;
		}
		return false;
	};
	Object.prototype.isEmpty = function() {
	for( var property in this ) {
			return false;
		}
		return true;
	};
	function setCookie( name, value ) {
	var request = new XMLHttpRequest();
		request.open( "GET", ( './setCookie.php?name=' + name + '&value=' + value ).rawURLEncode() );
		request.send();
	}
	Element.prototype.C9InsertListWithSeparators = function( list, getTitle, sort, clone) {
		if( sort ) {
			list = list.sort( sort );
		}
		var title = "",
			tempTitle,
			that = this;
	list.forEach( function( item ) {
			tempTitle = getTitle( item );
			if(tempTitle !== title ) {
				that.appendChild( C9CreateListSeparator( tempTitle ) );
				title = tempTitle;
			}
			that.appendChild( clone ? item.cloneNode( true ) : item );
		} );
	};
	String.prototype.replaceIndex = function( start, replacement, finish ) {
		return this.substr( 0, start ) +replacement + this.substr( finish );
	};
	String.prototype.rawURLEncode = (function() {
		varURI = {
			' ' : '20',
			'	' : '20',
			'\s': '20',
			'\t' : '20',
			'\n' : '20',
			'\r' : '20',
			'!' : '21',
			'\\"' : '22',
		'\"' : '22',
		'"' : '22',
		'#' : '23',
		'%' : '25',
		'\\\'' : '27',
			'\'' : '27',
			'<' : '3C',
			'>' : '3E',
			'\\' : '5C',
			'^' : '5E',
			'_' : '5F',
			'`' : '60',
			'{' : '7B',
			'|' : '7C',
			'}' : '7D',
			'`' : '80',
			'‚' : '82',
			'ƒ' : '83',
			'„' : '84',
			'…' : '85',
			'†' : '86',
			'‡' : '87',
			'ˆ' : '88',
			'‰' : '89',
			'Š' : '8A',
			'‹' : '8B',
			'Œ' : '8C',
			'Ž' : '8E',
			'‘' : '91',
			'’' : '92',
			'“' : '93',
			'”' : '94',
			'•' : '95',
			'–' : '96',
			'—' : '97',
			'˜' : '98',
			'™' : '99',
			'š' : '9A',
			'›' : '9B',
			'œ' : '9C',
			'ž' : '9E',
			'Ÿ' : '9F',
			'¡' : 'A1',
			'¢' : 'A2',
			'£' : 'A3',
			'¤' : 'A4',
			'¥' : 'A5',
			'¦' : 'A6',
			'§' : 'A7',
			'¨' : 'A8',
			'©' : 'A9',
			'ª' : 'AA',
			'«' : 'AB',
			'¬' : 'AC',
			'®' : 'AE',
			'¯' : 'AF',
			'°' : 'B0',
			'±' : 'B1',
			'²' : 'B2',
			'³' : 'B3',
			'´' : 'B4',
			'µ' : 'B5',
			'¶' : 'B6',
			'·' : 'B7',
			'¸' : 'B8',
			'¹' : 'B9',
			'º' : 'BA',
			'»' : 'BB',
			'¼' : 'BC',
			'½' : 'BD',
			'¾' : 'BE',
			'¿' : 'BF',
			'À' : 'C0',
			'Á' : 'C1',
			'Â' : 'C2',
			'Ã' : 'C3',
			'Ä' : 'C4',
			'Å' : 'C5',
			'Æ' : 'C6',
			'Ç' : 'C7',
			'È' : 'C8',
			'É' : 'C9',
			'Ê' : 'CA',
			'Ë' : 'CB',
			'Ì' : 'CC',
			'Í' : 'CD',
			'Î' : 'CE',
			'Ï' : 'CF',
			'Ð' : 'D0',
			'Ñ' : 'D1',
			'Ò' : 'D2',
			'Ó' : 'D3',
			'Ô' : 'D4',
		'Õ' : 'D5',
		'Ö' : 'D6',
		'×' : 'D7',
		'Ø' : 'D8',
		'Ù' : 'D9',
		'Ú' : 'DA',
		'Û' : 'DB',
		'Ü' : 'DC',
		'Ý' : 'DD',
		'Þ' : 'DE',
		'ß' : 'DF',
		'à' : 'E0',
		'á' : 'E1',
		'â' : 'E2',
		'ã' : 'E3',
		'ä' : 'E4',
		'å' : 'E5',
		'æ' : 'E6',
		'ç' : 'E7',
		'è' : 'E8',
		'é' : 'E9',
		'ê' : 'EA',
			'ë' : 'EB',
			'ì' : 'EC',
			'í' : 'ED',
			'î' : 'EE',
			'ï' : 'EF',
			'ð' : 'F0',
			'ñ' : 'F1',
			'ò' : 'F2',
			'ó': 'F3',
			'ô' : 'F4',
			'õ' : 'F5',
			'ö' : 'F6',
			'÷' : 'F7',
			'ø' : 'F8',
			'ù' : 'F9',
			'ú' : 'FA',
			'û' :'FB',
			'ü' : 'FC',
			'ý' :'FD',
			'þ' : 'FE',
			'ÿ' : 'FF' };
		return function() {
			return this.replace( /\\'|\\"|[^\w-\.~:\/\?#\[\]@!$&'\(\)\*\+,;=]/g, function( str ) {
				return "%" + URI[str];
			} );
		};
	})();
	function getImageSize( img ) {
		var dim = new Array( 2 );

		if( img.naturalWidth === undefined ) {
			var tempImg = new Image();
			tempImg.src = img.src;
		dim[0] = tempImg.width;
			dim[1] =tempImg.height;
		}
		else {
			dim[0] = img.naturalWidth;
			dim[1] = img.naturalHeight;
		}
		return dim;
	}
	String.prototype.toNum = function() {
		var stringNum = /^[\s\w]*(.*)/.exec( this );// /.*?(-?\d+(\.\d+)?)/.exec( this);
	return stringNum ? parseFloat( stringNum[0] ) : 0;
	};
	String.prototype.trim = function() {
	varnewString = this.replace( /^\s+/, ""),
			i = newString.length - 1;
		do {
			if( /\S/.test( newString.charAt( i ) ) ) {
				newString = newString.substring( 0, i + 1 );
				break;
			}
		} while( i-- );
		return newString;
	};
	String.prototype.toMatrix = function() {
		if( this.length === 0 ) {
			return [ 0, 0, 0, 0 ];
		}
		var m = this.split(" ").toNum();
		return m.length === 1 ? [ m[0], m[0], m[0], m[0] ] :
			 m.length === 2 ? [ m[0], m[1], m[0], m[1] ] :
			   m.length === 3 ? [ m[0], m[1], m[2], m[1] ] :
			 m;
	};
	Function.prototype.bind = function( boundObject ) {
		var that = this;
		return function() {
			return that.apply( boundObject, arguments );
		}
	};
	Array.prototype.isEmpty = function() {
		var i = this.length - 1;
		if(i >= 0 ) {
			do {
				if( this[i] !== null && this[i] !== undefined ) {
					return false;
			}
			} while( i-- );
		}
	return true;
	};
	/*Array.prototype.mod = function( attr, func ) {
		var i = this.length;
		while( i-- ) {
			this[i][attr] = func( i );
		}
	};*/
	Array.prototype.filter = function( query ) {
		vari =0;
		if( this.length > 0 ) {
			do {
			if( !query( this[i] ) ){
					this.splice( i, 1);
				}
				else {
					i++;
			}
			} while( i< this.length );
	}
	return this;
	};
	Array.prototype.remove = function( element ) {
		var i = this.indexOf( element );
		if( i !== -1 ) {
			this.splice( i, 1 );
		}
		return this;
	};
	Array.prototype.toNum = function() {
		var i = this.length - 1;
		if( i >= 0 ) {
		do {
				this[i]= this[i].toNum();
			} while( i-- );
		}
		return this;
	};
	Array.prototype.forEach = HTMLCollection.prototype.forEach = NodeList.prototype.forEach= function( callback ) {
		var i = 0,
			length = this.length;
		if( length >= 8 ) {
			var j = 0,
				iterations = length / 8 >> 0,
			leftover = length % 8,
				exit = false;

			if( leftover > 0 ){
				do {
					if( callback( this[i], i++ ) === false ) {
						exit = true;
						break;
					}
				} while( ++j < leftover );
			}

			j = 0;

			if( !exit ) {
				do {
					if( callback( this[i], i++ ) === false ||
						callback( this[i], i++ ) === false ||
						callback( this[i], i++ ) === false ||
						callback( this[i], i++ ) === false ||
					callback( this[i], i++ ) ===false ||
						callback( this[i], i++ ) === false ||
						callback( this[i], i++ ) === false ||
						callback( this[i], i++ ) === false ) {
						break;
					}
				} while( ++j < iterations );
			}
		}
		else if( length > 0 ) {
			do {
				if( callback( this[i], i ) === false ) {
					break;
			}
		} while( ++i< length );
		}
		return this;
	};
	Array.prototype.fill = function( value, startIndex, endIndex ) {
		if( !startIndex ) {
			startIndex = 0;
		}
	if( !endIndex ){
			endIndex = this.length - 1;
		}
		while( startIndex <= endIndex ) {
			this[startIndex++] = value instanceof Function ? value( i ) : value;
		}

		return this;
	};
	Array.prototype.sortedIndexOf= function( number, nearest ) {
		var min = 0,
		max = this.length,
			pivot = min + ( max - min + 1 ) * .5 |0,
			currentItem;
		while( max >= min ) {
			currentItem = this[ pivot ];
			if( currentItem === number ) {
				break;
		}
			else if( currentItem < number ) {
			min = pivot + 1;
			}
			else {
				max = pivot - 1;
		}
			pivot = min + ( max - min ) * .5 |0;
		}
		return ( max >= min && currentItem === number ) || nearest ? pivot : -1;
	};
	Array.prototype.insertSorted = function( number ) {
		var index = this.sortedIndexOf( number,true );
		if( this[index] < number ) {
			index++;
		}
		this.splice( index, 0, number );
		return index;
	}
	Array.prototype.equals = function( array ) {
		if( !array || this.length!== array.length ) {
			return false;
		}
		var i = this.length - 1;
		if( i >= 0 ) {
		do {
				if( this[i] !== array[i] ) {
			return false;
			}
			} while( i-- );
		}
		return true;
	};
	Array.prototype.contains = HTMLCollection.prototype.contains = function( query ) {
		var i = this.length - 1;
	if( i > 0 ) {
			do {
				if( ( typeof query === "function" && query(this[i] ) ) || ( this[i] == query ) ) {
					return i;
			}
		} while( i-- );
		}
		return -1;
	};
	Array.prototype.min = function() {
		return Math.min.apply( Math, this );
	};
	Array.prototype.max = function() {
		return Math.max.apply( Math, this );
	};
	Element.prototype.insertAfter = function( newNode, referenceNode ) {
		this.insertBefore( newNode, referenceNode.nextSibling );
	};
	Element.prototype.insertFirst =function( newNode ) {
	if( this.firstChild ) {
			this.insertBefore( newNode, this.firstChild );
	}
		else{
			this.appendChild( newNode );
		}
		return newNode;
	};
	varappendChild = Element.prototype.appendChild;
	Element.prototype.appendChild = function( child ) {
	if( child instanceof Array ) {
		if( child.length ) {
			var i = 0;
			do {
				appendChild.call( this, child[i++] );
			} while( i < child.length );
		}
	}
	else {
		appendChild.call( this, child );
	}
	return child;
};
Element.prototype.appendChild2 = function( child ) {
	this.appendChild( child );
	return this;
};
Element.prototype.isChildOf = function( parent ) {
		var element= this;
		do {
			if( element === parent ) {
				return element;
			}
			element = element.parentNode;
		} while( element && element.tagName !== 'BODY' );
		return null;
	};
	Element.prototype.isChildOfTag = function( tagName ) {
		var element = this;
		do {
			if( element.tagName === tagName ) {
				return element;
		}
			element= element.parentNode;
		} while( element && element.tagName !== 'BODY' );
		return null;
	};
	Element.prototype.isChildOfClass =function( className ) {
		var element = this,
			indexOf = Array.prototype.indexOf;
		do {
			if( indexOf.call( element.classList, className ) !== -1 ) {
				returnelement;
			}
			element = element.parentNode;
		} while( element && element.tagName !== "BODY" );
		return null;
	};
	Element.prototype.isMemberOfClass = function( className ) {
		var indexOf = Array.prototype.indexOf;
		if(arguments[1] ) {
			var i = arguments.length - 1;
			do {
				if( indexOf.call( this.classList, arguments[i] )!== -1 ) {
					return true;
				}
			} while( i-- );
			return false;
		}
		else return indexOf.call( this.classList, className ) !== -1;
	};
	Element.prototype.addClass = function( className ) {
		/*if( this.className === '' ) {
		this.className = y;
	}
		this.className += ' ' + className;*/
		this.classList.add( className );
		return this;
	};
	Element.prototype.removeClass = function( className ) {
		/*if( this.className === '' ) {
			return;
		}
		var index = this.className.indexOf( className );
		if( index !== -1 ) {
		this.className = this.className.substr( 0, index - 1 ) + this.className.substr( index + className.length );
			return true;
		}*/
	this.classList.remove( className );
		return this;
	};
	Element.prototype.firstOfClass = function( className ){
		return this.getElementsByClassName( className )[0];
	};
	Node.prototype.firstOfTag = function( tagName) {
		return this.getElementsByTagName( tagName )[0];
	};
	/*
	Node.prototype.cssStyle = HTMLBodyElement.prototype.cssStyle = function( style, toNum ) {
		if ( typeof style === 'string' ) {
			style = window.getComputedStyle( this, null )[style];
			return toNum ? style.toNum() : style;
	}
		else {
			var cssText = this.style.cssText,
				properties = Object.keys( style ),
				i = properties.length - 1;
			if( !i ) {
				this.style[properties[0]] = style[properties[0]];
			cssText = this.style.cssText;
			}
			else {
				var j;
				do {
					if( ( j = cssText.indexOf( properties[i] + ':' ) ) === -1 ) {
						cssText += properties[i] + ":" + style[properties[i]] + ";";
					}
					else {
						cssText = cssText.replaceIndex( j, properties[i] + ":" + style[properties[i]] + ";", cssText.indexOf( ";", j ) + 1 );
					}
				} while( i-- );
				this.style.cssText = cssText;
			}
	}
		return this;
	};
	*/
	Node.prototype.cssStyle = HTMLBodyElement.prototype.cssStyle = function( style, toNum ) {
		if ( typeof style === 'string' ) {
			style = window.getComputedStyle( this, null )[style];
		return toNum ? style.toNum() : style;
		}
		else {
		this.style.merge(style );
		}
	return this;
	};
	Node.prototype.getMatrix = HTMLBodyElement.prototype.getMatrix = function( attribute ) {
		return window.getComputedStyle( this, null )[attribute].toMatrix();
	};
	Node.prototype.getTransformationData = function( style ) {
		if( style === undefined ) {
			style = this.cssStyle( "-webkit-transform" );
		}
		if( style === 'none') {
			return {
				x: 0,
				y: 0,
				z: 0,
				scaleX: 1,
				scaleY: 1,
				scaleZ: 1
			}
		}
		var is3D = style.search( "matrix3d" ) >= 0,
			matrix= style.slice( is3D ? 9 : 7, -1 ).split( "," ).toNum();
	return {
			x: matrix[ is3D ? 12 : 4 ],
			y: matrix[ is3D ? 13 : 5 ],
			z: is3D ? matrix[ 14 ] : 0,
			scaleX: matrix[ 0 ],
			scaleY: matrix[ is3D ? 5 : 3 ],
			scaleZ: is3D ? matrix[ 9 ] : 1
		}
	};
	Node.prototype.getTranslationCoordinates = function( style ) {
		if( style === undefined ) {
			style = this.cssStyle( "-webkit-transform" );
		}
		if( style === 'none' ) {
			return {
				x: 0,
				y: 0
			}
		}
		var matrix = style.split( "," ),
			translate = matrix.length <= 3;
		return{
			x: matrix[ translate ? 0 :4 ].toNum(),
			y: matrix[ translate ? 1 : 5 ].toNum()
		};
	};
	Node.prototype.hide = function() {
		this.style.display = "none";
	};
	Node.prototype.show = function() {
		this.style.display = "block";
	};
	HTMLCollection.prototype.makeStatic = NodeList.prototype.makeStatic = function() {
		var staticArray = new Array( this.length );
		this.forEach( function( item, i ) {
			staticArray[i] =item;
		} );
		return staticArray;
	};
	HTMLCollection.prototype.cssStyle = Array.prototype.cssStyle = function( style, toNum ) {
		var ret = new Array( this.length );
		this.forEach( function( element, i ) {
			ret[i] = element.cssStyle( style, toNum );
		} );
		return ret;
	};

	(function() {
		"usestrict";
		Node.prototype.bind =function( eventName, callback ) {
			var that = this;
			if( eventName ==="click" ) {
				this.addEventListener( "mousedown", function( e ) {
					onTapStart( e, that, callback );
				}, false );
			}
			else {
			this.addEventListener( eventName, callback, false );
			}
			return this;
		};
		Node.prototype.unBind = function( eventName, callback ) {
			var that = this;
			if( eventName === "click" ) {
			this._tapFinger = 0;
				this._tapStartX = 0;
				this._tapStartY = 0;
				this._tapStartT = 0;
				this.removeEventListener( "mousedown", function( e ) {
					onTapStart( e, that, callback );
				}, false );
			}
			else {
				this.removeEventListener( eventName, callback, false );
		}
		};
		NodeList.prototype.bind = HTMLCollection.prototype.bind= Array.prototype.bind = function( event, callback ) {
		var i = this.length - 1;
		if( i >= 0 ) {
			do {
				this[i].bind( event, callback );
			} while( i-- );
		}
		return this;
	};
	NodeList.prototype.unBind = HTMLCollection.prototype.unBind = Array.prototype.unBind = function( event, callback ) {
		var i = this.length - 1;
		if( i >= 0 ) {
			do {
				this[i].unBind( event, callback );
			} while( i-- );
		}
		return this;
	};
		function onTapStart( e, obj, callback ) {
			obj._tapFinger = getFinger( e );
			obj._tapStartX = e.pageX;
			obj._tapStartY = e.pageY;
			obj._tapStartT = e.timeStamp;
			obj.C9TapFunction = function( e ) {
				onTapEnd( e, obj, callback );
			};
			document.addEventListener( "mouseup", obj.C9TapFunction, false );
	}
		function onTapEnd( e, obj, callback ) {
			var touch = getTap( e, obj._tapFinger );
			if( touch ===null ) {
				return;
			}
			document.removeEventListener( "mouseup", obj.C9TapFunction, false );
			if( isBetween( -5, touch.pageX - obj._tapStartX, 5 ) && isBetween( -5,touch.pageY - obj._tapStartY, 5 ) && e.timeStamp - obj._tapStartT < 500 ) {
				e.preventDefault();
				if( typeof callback === "function" ) {
					callback( e, touch, obj );
				}
			else {
					callback.handleEvent( e, touch, obj );
				}
			}
			obj.C9TapFunction = null;
		}
	})();

	(function() {
		"use strict";
		window.C9List = Class.extend( {
			constructor: function() {
			this.array = new Array();
				this.empty = new Array();
				this.length = 0;
			},
			add: function( item ) {
				var i = this.empty.length ? this.empty.shift() : this.array.length;
				this.array[i] = item;
				this.length++;
				return i;
			},
		remove: function( i ) {
			if( i < 0 || i >= this.length || this.array[i] === null ) {
					return false;
			}

				this.array[i] = null;

				if( i < this.length - 1 ) {
				this.empty.insertSorted( i );
				}
				else if( i === this.length - 1 ) {
					do {
						if(this.empty[ this.empty.length - 1 ] === i ) {
							this.empty.pop();
						}
						this.array.pop();
					} while( i-- && ( this.array[i] === undefined || this.array[i] === null ) );
					this.length = i + 1;
				}
			return true;
			},
			get: function( i ) {
				return this.array[i];
			},
			set: function( i, item ) {
			if( i < 0 || i > this.length ) {
				return null;
			}
				returnthis.array[i] = item;
			},
			contains: function( query ) {
			var i = this.length;
				if( i > 0 ) {
					while( i-- ) {
						if( this.array[i] && ( ( typeof query === "function" && query( this.array[i] ) ) || ( this.array[i].equals( query ) ) ) ) {
							return i;
						}
					}
			}
				return -1;
			},
			forEach: function( callback ) {
				return this.array.forEach( callback );
			}
		} );
	})();

	(function() {
		"use strict";
		window.hasRequestFrame = true;
		var C9RequestAnimationFrame =
				window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.msRequestAnimationFrame,
			C9CancelRequestAnimationFrame =
				window.cancelAnimationFrame ||
				window.cancelRequestAnimationFrame ||
				window.mozCancelAnimationFrame ||
				window.mozCancelRequestAnimationFrame ||
			window.webkitCancelAnimationFrame ||
				window.webkitCancelRequestAnimationFrame ||
				window.msCancelAnimationFrame ||
				window.msCancelRequestAnimationFrame;
		window.timingFunctions = {
				easeInOut:function( x ) {
					return x - Math.sin( 6.283 * x ) / 6.283;
			},
				easeIn:function( x ) {
				return x * x;
				},
				easeOut:function( x ) {
					return 1 - ( x - 1 ) * ( x - 1 );
				},
				linear:function( x ) {
				return x;
				},
			};
		if( !C9RequestAnimationFrame || !C9CancelRequestAnimationFrame ) {
			C9RequestAnimationFrame = function( callback ){
				return window.setTimeout( callback, 16.666 );
			};
			C9CancelRequestAnimationFrame = function( id ) {
				return window.clearTimeout( id );
			};
			window.hasRequestFrame= false;
		}
		var frameRequests = new C9List();
		function animate() {
			var i = frameRequests.length,
				request;
			if( i-- ) {
				do {
					request = frameRequests.get( i )
				if( request !== undefined && request !== null ) {
						request();
				}
				} while( i-- );
				if( frameRequests.length ) {
					C9RequestAnimationFrame( animate );
				}
			}
		}
		window.C9RequestFrame = function( callback ) {
			var index = frameRequests.add( null );
			frameRequests.set( index, function() {
					callback();
					frameRequests.remove( index );
				});
			if( frameRequests.length === 1 ) {
			C9RequestAnimationFrame( animate );
			}
			return index;
		}
		window.C9CancelFrame = function( index ) {
			return frameRequests.remove( index );
		}
		Element.prototype.C9AnimateJS = function( duration, update, timingFunction, onFinish ) {
			var that = this,
			start = Date.now();
			timingFunction =!timingFunction ? timingFunctions.easeInOut : timingFunction;
			if( typeof this.C9AnimJS === "number" ) {
				frameRequests.remove( this.C9AnimJS );
			}
			this.C9AnimJS = frameRequests.add( function() {
				var t = Date.now() -start;
				if( t < duration ) {
					update( timingFunction( t /duration ) );
				}
				else {
					update( 1 );
					frameRequests.remove( that.C9AnimJS );
					that.C9AnimJS = null;
					onFinish && onFinish();
				}
			} );
			if( frameRequests.length === 1 ) {
				C9RequestAnimationFrame( animate );
			}
		};
		Element.prototype.C9CancelAnimationJS = function() {
			if( typeof this.C9AnimJS === "number" ){
				frameRequests.remove( this.C9AnimJS );
				this.C9AnimJS = null;
				return true;
			}
			return false;
		};
		Element.prototype.C9Animate = function( duration, style, timingFunction, onFinish, delay ) {
			var that = this,
				properties = Object.keys( style ),
			i =properties.length,
				str = "";
			if( typeof this.C9Anim === "function" ) {
				this.removeEventListener( "transitionend", this.C9Anim, false );
			}
			this.C9Anim = function() {
				that.removeEventListener( "transitionend", that.C9Anim, false );
			that.style.webkitTransitionDuration = "0ms";
			that.C9Anim = null;
			if( onFinish ) {
				onFinish();
			}
		};
		while( i-- ) {
			str += properties[i];
			if( i > 0 ) {
				str += ",";
			}
		}
		style[ "transition-property" ] = str;
		style[ "transition-duration" ] = duration + "ms";
		style[ "transition-timing-function" ] = timingFunction ? timingFunction : "ease-in-out";
		if( delay ) {
			setTimeout( function() {
				that.cssStyle( style );
				that.addEventListener( "transitionend", this.C9Anim, false );
				}, 0 );
			}
			else {
				this.cssStyle( style );
				this.addEventListener( "transitionend", this.C9Anim,false );
			}
		duration = null;
			timingFunction = null;
			delay = null;
			properties = null;
			str = null;
		i = null;
		};
		Element.prototype.C9IsAnimating = function() {
			var anim = typeof this.C9Anim;
			return anim === "function" || anim === "number";
		};
		Element.prototype.C9CancelAnimation = function(){
			if( typeof this.C9Anim === "function" ) {
				this.removeEventListener( "transitionend", this.C9Anim, false );
				this.style.webkitTransitionDuration = "0ms";
				this.C9Anim = null;
				return true;
		}
			else if( typeof this.C9AnimJS === "number" ) {
				frameRequests.remove( this.C9AnimJS );
				this.C9AnimJS = null;
				return true;
		}
			return false;
		};
		window.getEasingTime = function( x, maxT, symmetrical, reverse ) {
		if( ( symmetrical && x > 0.5 ) || reverse ) {
				x =1 - x;
			}
			return maxT * 0.5 * ( Math.sin( 2 * Math.PI * ( x / 2 - 0.25 ) ) + 1 );
		}
	})();

	function Vector3D( x, y, z ) {
		return {
			x: x ? x : 0,
			y: y ? y : 0,
			z: z ? z : 0
		};
	};
	window.C9AnimableElement = Class.extend( {
		constructor: function( element ) {
			this.element = element;
			this.properties = new Array();
			this.setAnimationDuration( 0 );
			this.bind( element, 'transitionend', this.stopAnimation );
	},
	setAnimationProperty: function( properties ) {
			this.animableProperties = properties.split( " " );
			this.element.style.webkitTransitionProperty = properties;
		},
		setAnimationDuration: function( duration ) {
			this.element.style.webkitTransitionDuration = duration;
		},
		setAnimationTimingFunction: function( timingFunction ) {
			this.element.style.webkitTransitionTimingFunction = timingFunction;
		},
	setAnimationDelay: function( delay ) {
			this.element.style.webkitTransitionDelay = delay;
		},
		stopAnimation: function() {
			var style = window.getComputedStyle( this.element, null );
			if( style["-webkit-transition-duration"].toNum() !== 0 ) {
				this.setAnimationDuration( "0ms" );
				for( var i = 0; i < this.animableProperties.length; i++ ) {
					this.element.style[ this.animableProperties[i] ] = style[ this.animableProperties[i] ];
				}
				this.dispatchEvent( "animationEnd", style );
			}
		}
	} );
	window.C9TransformableElement = C9AnimableElement.extend( {
		constructor: function( element, roundTranslations ) {
			this.roundTranslations = !!roundTranslations;

			this.position = Vector3D();
			this.scalar = Vector3D(1, 1, 1 );

			this.matrix = null;
			this.matrixString = null;

			this.useTransform = false;

			this.super.constructor.call( this, element, roundTranslations );
		},
		translate: function( x, y, z ) {
			this.position.x = x;
			this.position.y = y;
			this.position.z = z === null || z === undefined ? this.position.z : z;
		},
		scale: function( x, y, z ) {
		this.scalar.x = x;
			this.scalar.y = y === null || y === undefined ? x : y;
			this.scalar.z= z === null || z === undefined ? this.scalar.z : z;
		},
		applyTransformation: function() {
			this.matrixString = 
				"matrix3d(" + this.scalar.x + ", 0, 0, 0, 0, " + this.scalar.y + ", 0, 0, 0, 0, " + this.scalar.z + ", 0, " +
				( this.roundTranslations ? Math.round( this.position.x ) : this.position.x ) + ", " +
				(this.roundTranslations ? Math.round( this.position.y ) | 0 : this.position.y ) + ", " +
				( this.roundTranslations ? Math.round( this.position.z ) | 0 : this.position.z ) + ", 1)";

			if( this.useTransform ) {
				this.element.style.webkitTransform =
					"translate3d(" + this.position.x + "px," + this.position.y + "px," + this.position.z + "px)" +
					"scale3d(" + this.scalar.x + "," + this.scalar.y +"," + this.scalar.z + ")";
		}
			else {
				this.element.style.webkitTransform = this.matrixString;
			}
		},
		updateMatrixData: function( matrix ) {
		var transformValues = this.element.getTransformationData( matrix );

			this.position.x = transformValues.x;
			this.position.y = transformValues.y;
			this.position.z = transformValues.z;

			this.scalar.x = transformValues.scaleX;
			this.scalar.y = transformValues.scaleY;
			this.scalar.z = transformValues.scaleZ;

		this.matrixString = matrix;
		},
		stopAnimation: function() {
			var style = window.getComputedStyle( this.element, null );
			if( style["-webkit-transition-duration"].toNum() !== 0 ) {
				this.setAnimationDuration( "0ms" );

				for( var i = 0; i < this.animableProperties.length; i++ ) {

					if( this.animableProperties[i] === "-webkit-transform" ) {

						this.updateMatrixData( style["-webkit-transform"] );

					if( this.roundTranslations ) {
						this.applyTransformation();
						}
						else {
						this.element.style.webkitTransform = style["-webkit-transform"];
						}
					}
					else {
						this.element.style[ this.animableProperties[i] ] = style[ this.animableProperties[i] ];
				}
				}
				this.dispatchEvent( "animationEnd", style );
			}
		}
	} );

	window.C9TangibleElement = C9TransformableElement.extend( {
		constructor: function( target, transformTarget, roundTranslations ) {
			this._cleanUp();
			this.request = -1;
			this.bind( target, "mousedown", this._onStart );
			this.super.constructor.call( this, transformTarget? transformTarget : target, roundTranslations );
		},
		_onStart: function( e ) {
			if( this.onStart( e, e ) === false ) {
				return;
			}
		this.touchStartX = e.pageX;
		this.touchStartY = e.pageY;
		this.touchStartT = e.timeStamp;
		this.finger = getFinger( e );
		this.bind( document.body, "mousemove", this._onMove );
		this.bind( document.body, "mouseup", this._onEnd );
	},
	_onMove: function( e ) {
		var that = this,
			touch = getTap( e, this.finger );
		if( touch === null ) {
			return;
		}
		this.onMove( e, touch );
	},
	_onEnd: function( e ) {
		var touch = getTap( e, this.finger );
		if( touch === null ) {
			return;
		}
		this._closeEvent();
		if( this.onTap && isBetween( -5, touch.pageX - this.touchStartX, 5 ) && isBetween( -5, touch.pageY - this.touchStartY, 5 ) && e.timeStamp - this.touchStartT < 500 ) {
			this.onTap( e, touch );
			this.onEndCanceled( e, touch );
		}
		else {
			this.onEnd( e, touch );
		}
		this._cleanUp();
	},
	_closeEvent: function() {
		this.unBind( document.body, "mousemove", this._onMove );
		this.unBind( document.body, "mouseup", this._onEnd );
	},
	_cleanUp: function() {
		this.finger = 0;
		this.touchStartX = 0;
		this.touchStartY = 0;
		this.touchStartT = 0;
	},
	repaint: function( force ) {
		if( this.request !== -1 ) {
			if( force ) {
				C9CancelFrame( this.request );
			}
			else {
				return;
			}
		}

		this.request = C9RequestFrame( ( function() {
			this.applyTransformation();
			this.onRepaint();
		} ).bind( this ) );

		this.request = -1;
	},
	preventDefault: function() {
		this._closeEvent();
		this.dispatchEvent( "endCanceled" );
		this._cleanUp();
	}
} );
(function() {
	"use strict";
	window.C9TappableObject = Class.extend( {
		constructor: function( target ) {
			this._cleanUp();
			this.bind( target, "mousedown", this._onStart );
		},
		_onStart: function( e ) {
			this.onStart && this.onStart( e, e );
			this.dispatchEvent( "mousedown" );
			this._startX = e.pageX;
			this._startY = e.pageY;
			this._startT = e.timeStamp;
			this._target = e.currentTarget;
							this.bind( document, "mouseup", this._onEnd );
		},
		_onEnd: function( e ) {
			var touch = getTap( e, this.finger );
			if( touch === null ) {
				return;
			}
			e.preventDefault();
			this.unBind( document, "mouseup", this._onEnd );
			if( isBetween( -5, touch.pageX - this._startX, 5 ) && isBetween( -5, touch.pageY - this._startY, 5 ) && e.timeStamp - this._startT < 500 ) {
				this.onTap( e, touch, this._target );
			}
			this.onEnd && this.onEnd( e, touch );
		},
		_cleanUp: function() {
							this._startX = 0;
			this._startY = 0;
			this._startT = 0;
			this._target = null;
		}
	} );
	window.C9DraggableObject = Class.extend( {
		constructor: function( target, useRequestFrame ) {
			this._cleanUp();
			this.request = -1;
			this.bind( target, "mousedown", this._onStart );
		},
		_onStart: function( e ) {
			if( this.onStart( e, e ) === false ) {
				return;
			}
			this._startX = e.pageX;
			this._startY = e.pageY;
			this._startT = e.timeStamp;
							this.bind( document.body, "mousemove", this._onMove );
			this.bind( document.body, "mouseup", this._onEnd );
		},
		_onMove: function( e ) {
			//e.stopPropagation();
			var that = this,
				touch = getTap( e, this.finger );
			this.onMove( e, touch );
		},
		_onEnd: function( e ) {
			var touch = getTap( e, this.finger );
			if( touch === null ) {
				return;
			}
			this._closeEvent();
			if( this.onTap && isBetween( -5, touch.pageX - this._startX, 5 ) && isBetween( -5, touch.pageY - this._startY, 5 ) && e.timeStamp - this._startT < 500 ) {
				this.onTap( e, touch );
				this.onEndCanceled( e, touch );
			}
			else {
				this.onEnd( e, touch );
			}
			this._cleanUp();
		},
		_closeEvent: function() {
			this.unBind( document.body, "mousemove", this._onMove );
			this.unBind( document.body, "mouseup", this._onEnd );
		},
		_cleanUp: function() {
							this._startX = 0;
			this._startY = 0;
			this._startT = 0;
		},
		repaint: function() {
			if( this.request !== -1 ) {
				return;
			}
			this.request = C9RequestFrame( function() {
				this.onRepaint();
				this.request = -1;
			}.bind( this ) );
		},
		forceRepaint: function() {
			if( this.request !== -1 ) {
				C9CancelRequestFrame( this.request );
				this.request = -1;
			}
			this.onRepaint();
		},
		preventDefault: function() {
			this._closeEvent();
			this.dispatchEvent( "endCanceled" );
			this._cleanUp();
		}
	} );
	window.C9HTTPRequest = Class.extend( {
		constructor: function( url, onload, options ) {
			var that = this;
			this.option = {
				onTimeout: function() {},
				timeout: 5000,
				xml: false
			}.merge( options );
			this.url = url;
			this.onload = onload;
			this.send();
		},
		handleEvent: function() {
			this.onload && this.onload( this.option.xml ?
				this.request.responseXML :
				this.request.responseText );
			this.cancel();
		},
		send: function() {
			this.request = new XMLHttpRequest();
			this.request.addEventListener( "load", this, false );
			this.request.open( "GET", this.url.rawURLEncode(), true );
			this.request.timeout = this.option.timeout;
			this.request.ontimeout = this.option.onTimeout;
			this.request.send();
		},
		cancel: function() {
			this.request.removeEventListener( "load", this, false );
			this.request = null;
		}
	} );
	var C9AppWindow = Class.extend( {
		constructor: function( appName, appID ) {
			var that = this,
				appWindow = window.CUI.core.cache.firstOfClass( appName ).cloneNode( true ),
				appView = appWindow.getElementsByClassName( "C9AppView" ).makeStatic();
			this.appWindow = appWindow;
			this.appID = appID;
			document.body.insertBefore( appWindow, window.CUI.core.launcher.element );
			this.appView = new Array();
			appView.forEach( function( view ) {
				if( view.isMemberOfClass( "C9CarouselView" ) ) {
					that.appView.push( new C9CarouselView( view ) );
				}
				else {
					that.appView.push( new C9AppView( view ) );
				}
			} );
			this.currentAppView = 0;
		},
		postInit: function() {
			this._focusWindow( true );
		},
		_focusWindow: function( launching ) {
			var that = this;
			this.appWindow.cssStyle( {
				"display": "block",
				"-webkit-transform": "translate3d(" + ( launching ? window.innerWidth : -window.innerWidth ) + "px,0,0)"
			} );
			this.reflow();
			this.onFocus && this.onFocus();
			this.appWindow.C9Animate( 250, { "-webkit-transform": "translate3d(0px,0px,0px)" }, "ease-out", function() {
				window.CUI.core.homescreen.homescreen.style.display = 'none';
			}, true );
		},
		_blurWindow: function( quitting ) {
			var that = this;
			this.onBlur && this.onBlur();
			this.appWindow.C9Animate( 250, { "-webkit-transform": "translate3d(" + ( quitting ? window.innerWidth : -window.innerWidth ) + "px,0px,0px)" }, "ease-out", quitting ? function(){
				document.body.removeChild( that.appWindow );
			} : function() {
				that.appWindow.style.display = "none";
			} );
		},
		quit: function() {
			if( this.onQuit ) {
				this.onQuit();
			}
			this._blurWindow( true );
		},
		reflow: function() {
			this.appView[this.currentAppView].reflow && this.appView[this.currentAppView].reflow();
			this.dispatchEvent( "reflow" );
		}
	} );
	var C9AppView = Class.extend( {
		constructor: function( view ) {
			this.view = view;
			var bottomControlBar = view.firstOfClass( "C9ControlBar bottom" ),
				topControlBar = view.firstOfClass( "C9ControlBar top" );
			if( bottomControlBar ) {
				this.bottomControlBar = new C9BottomControlBar( bottomControlBar );
			}
			if( topControlBar ) {
				this.topControlBar = topControlBar;
			}
		}
	} );
	var C9CarouselView = C9TransformableElement.extend( {
		constructor: function( view ) {
			this.view = view;

			var that = this,
				bottomControlBar = view.firstOfClass( "C9ControlBar bottom" );
			if( bottomControlBar ) {
				this.bottomControlBar = new C9BottomControlBar( bottomControlBar );
			}
			this.topControlBar = view.firstOfClass( "C9ControlBar top" );

			this.tabButton = this.topControlBar.getElementsByTagName( "a" ).makeStatic();
			this.carousel = view.firstOfClass( "C9Carousel" );
			this.tab = this.carousel.getElementsByClassName( "C9CarouselPage" ).makeStatic();

			var activeIndicator = C9CreateElement( 'div.C9CarouselBarIndicator' );

			this.topControlBar.appendChild( activeIndicator );

			this.super.constructor.call( this, activeIndicator, true );

			this.setAnimationProperty( "-webkit-transform" );
			this.setAnimationTimingFunction( "cubic-bezier(.33,.66,.66,1)" );

			this.scroller = new CUI.PageScroller( this.carousel, this.tab, {
				scrollbarX: false
			} );

			this.barX = 0;
			this.barWidth = 1;

			this.reflow( true );

			this.scrollable = view.isMemberOfClass( "scrollable" );

			if( this.scrollable ) {
				this.tab.forEach( function( scroller, i ) {
					that.tab[i].scroller = new CUI.Scroller( that.tab[i], { scrollbarX: false } );
				} );
				this.bottomControlBar && this.bottomControlBar.setScroller( this.tab[0].scroller );
			}

			this.scroller.addEventListener( "scroll", function( e ) {
				this.stopAnimation();
				if( e.x !== this.scroller.maxX ) {
					var x = -e.x / window.innerWidth,
						lower = x |0,
						upper = x + 1 |0;
					x = x - lower;
					lower = this.getBarDimensions( lower );
					upper = this.getBarDimensions( upper );
					this.setBarDimensions( {
						width: ( 1 - x ) * lower.width + x * upper.width + .5 |0,
						left:  ( 1 - x ) * lower.left  + x * upper.left  + .5 |0
					} );
				}
				else {
					this.setBarDimensions( this.getBarDimensions( this.tabButton.length - 1 ) );
				}
			}.bind( this ) );
			this.scroller.addEventListener( "pageChange", function( e ) {
				that.setBarDimensions( that.getBarDimensions( e.newPage ) );
				if( e.oldPage !== e.newPage ) {
					if( that.scrollable && that.bottomControlBar ) {
						that.bottomControlBar.setScroller( that.tab[e.newPage].scroller );
					}
					that.onViewChange && that.onViewChange( e.oldPage, e.newPage );
				}
			} );
			this.scroller.addEventListener( "animation", function( e ) {
				that.setAnimationDuration( e.duration + 'ms' );
			} );
			this.scroller.addEventListener( "animationCanceled", function() {
				that.stopAnimation();
			} );

			this.tabButton.bind( "click", function( e, touch, target ) {
				that.onTabClick( e, touch, target );
			} );
		},
		onTabClick: function( e, touch, target ) {
			var i = this.tabButton.indexOf( target );
			if( i !== -1 ) {
				this.showTab( i );
			}
		},
		getBarDimensions: function( i ) {
			var width = this.tabButtonWidth[i];
			return {
				width: width * .75 + .5 |0,
				left: this.tabButtonLeft[i] + width * .125 + .5 |0
			};
		},
		setBarLeft: function( left ) {
			this.barX = ( left + .5 |0 ) + this.barWidth * .5 - .5;
		},
		setBarWidth: function( width ) {
			this.barWidth = width + .5 |0;
		},
		setBarDimensions: function( dim ) {
			this.barWidth = dim.width + .5 |0;
			this.barX = dim.left;
			this.translate( this.barX, 0 );
			this.scale( this.barWidth, 1 );
			this.applyTransformation();
		},
		showTab: function( tab ) {
			var oldTab = this.scroller.currentPage,
				newTab;
			this.stopAnimation();
			this.scroller.scrollToPage( tab, false );
			newTab = this.scroller.currentPage;
			this.setBarDimensions( this.getBarDimensions( newTab ) );
			if( newTab !== oldTab ) {
				this.scrollable && this.bottomControlBar && this.bottomControlBar.setScroller( this.tab[newTab].scroller );
				this.onViewChange && this.onViewChange( oldTab, newTab );
			}
		},
		reflow: function( firstTime ) {
			var that = this;
			this.carousel.style.width = ( this.tab.length * window.innerWidth ) + "px";
			this.tabButtonWidth = new Array( this.tab.length );
			this.tabButtonLeft = new Array( this.tab.length );
			if( !firstTime ) {
				this.scroller && this.scroller.reflow();
			}
			this.tab.forEach( function( tab, i ) {
				tab.style.width = window.innerWidth + "px";
				that.tabButtonWidth[i] = that.tabButton[i].offsetWidth;
				that.tabButtonLeft[i] = that.tabButton[i].offsetLeft;
				that.scrollable && !firstTime && tab.scroller.reflow();
			} );
			this.setBarDimensions( this.getBarDimensions( this.scroller.currentPage ) );
		}
	} );
	var C9BottomControlBar = C9TangibleElement.extend( {
		constructor: function( bar ) {
			this.grip = C9CreateElement( "div.grip" );
			bar.appendChild( this.grip );

			this.super.constructor.call( this, bar, bar, true );

			//this.setAnimationProperty( "-webkit-transform" );

			this.open = true;
			this.padding = 0;
			this.scroller = null;
			this.startY = 0;
			this.position.y = this.maxY;
			this.animating = false;

			this.reflow();
		},
		onStart: function( e, touch ) {
			if( touch.target.isChildOfTag( "BUTTON" ) ) {
				return false;
			}
			this.cancelAnimation();
			this.startY = touch.pageY - this.position.y;
		},
		onMove: function( e, touch ) {
			this.setPosition( touch.pageY - this.startY );
			this.repaint();
		},
		onEnd: function( e, touch ) {
			this.setVisibility( this.position.y < this.maxY / 2 );
		},
		onEndCanceled: function() {
			this.startY = 0;
		},
		setPosition: function( y ) {
			this.translate( 0, bindNum( 0, y, this.maxY ) );
		},
		onRepaint: function() {
			this.scroller && this.updateScroller( this.maxY - this.position.y );
		},
		setVisibility: function( open ) {
			var that = this,
				startPosition = this.position.y,
				endPosition = open ? 0 : this.maxY,
				duration = getEasingTime( this.position.y / this.maxY, 300, open === this.open, !open );

			//this.setAnimationTimingFunction( open === this.open ? "ease-out" : "ease-in-out" );
			//this.setAnimationDuration( duration + "ms" );
			this.animating = true;

			this.open = open;
			this.setPosition( endPosition );
			this.repaint( true );

			this.element.C9AnimateJS( duration, function( x ) {
				that.setPosition( x * ( endPosition - startPosition ) + startPosition );
				that.repaint( true );
			}, timingFunctions.linear );
		},
		setScroller: function( scroller ) {
			this.scroller = scroller;
			this.padding = this.scroller.options.marginY + scroller.element.parentNode.cssStyle( 'padding-bottom', true );
			this.updateScroller( this.maxY - this.position.y );
		},
		updateScroller: function( y ) {
			this.scroller.options.marginY = y + this.padding;
			this.scroller.recalculateHeight();
			this.scroller.repaint( true );
		},
		reflow: function() {
			this.maxY = this.element.cssStyle( "height", true );
			this.setPosition( this.open ? 0 : this.maxY );
			this.dispatchEvent( "reflow" );
			this.repaint( true );
		},
		cancelAnimation: function() {
			if( this.animating ) {
				this.animating = false;
				this.stopAnimation();
				this.scroller && this.scroller.element.C9CancelAnimationJS();
			}
		}
	} );
	var launcher = C9TangibleElement.extend( {
		constructor: function( launcher ) {
			this.grip = launcher.firstOfClass( "grip" );

			this.super.constructor.call( this, launcher );

			this.setAnimationProperty( "-webkit-transform" );
			this.setAnimationTimingFunction( "ease-out" );

			this.scroller = new CUI.Scroller( launcher.firstOfClass( "scroller" ) );

			this.open = true;
			this.animating = false;

			this.reflow( true );

			this.setVisibility( false );
		},
		onStart: function( e, touch ) {
			if( this.animating ) {
				this.cancelAnimation();
			}
			this.startX = touch.pageX - ( this.open ? 0 : this.maxX );
		},
		onMove: function( e, touch ) {
			this.setPosition( this.scroller.toleranceY ? 0 : touch.pageX - this.startX );
			this.repaint();
		},
		onEnd: function( e ) {
			this.setVisibility( this.position.x > this.maxX / 2 );
			this.startX = null;
		},
		onTap: function( e, touch, target ) {
			var appName = ( touch.target.tagName === 'IMG' ? touch.target.parentNode : touch.target ).getAttribute("data-appname"),
				currentApp = window.CUI.core.currentApp;
			if( appName !== null ) {
				if( currentApp !== null && appName.toLowerCase() === currentApp.appName.toLowerCase() ) {
					window.CUI.core.quit();
					this.grip.style.right = '-1.5em';
					this.grip.style.width = '1.5em';
				}
				else if( appName === "Home" ) {
					this.setVisibility( false );
					window.CUI.core.hide();
				}
				else {
					this.setVisibility( false );
					window.CUI.core.run( appName );
				}
			}
		},
		onEndCanceled: function( e ) {
			this.startX = null;
		},
		setVisibility: function( open ) {
			var app = window.CUI.core.currentApp,
				t = getEasingTime( this.position.x / this.maxX, 300, open === this.open, !open );
			this.open = open;

			this.animating = true;
			this.setAnimationDuration( t + 'ms' );

			if( app !== null ) {
				app.appWindow.style.webkitTransition = '-webkit-transform ' + t + 'ms ease-out';
				if( open ) {
					this.grip.style.right = ( -window.innerWidth ) + 'px';
					this.grip.style.width = window.innerWidth + 'px';
				}
				else {
					this.grip.style.right = '-1.5em';
					this.grip.style.width = '1.5em';
				}
			}

			this.setPosition( open ? 0 : this.maxX );
			this.repaint( true );
		},
		setPosition: function( x ) {
			this.translate( bindNum( this.maxX, x - .5 |0, 0 ), 0 );
		},
		onRepaint: function() {
			var app = window.CUI.core.currentApp;

			if( app !== null ) {
				app.appWindow.style.webkitTransform = "translate3d(" + ( this.position.x - this.maxX - .5 |0 ) + "px,0px,0px)";
			}
		},
		reflow: function( firstTime ) {
			this.maxX = -this.element.offsetWidth;
			this.setPosition( this.open ? 0 : this.maxX );
			this.repaint( true );
			if( !firstTime ) {
				this.scroller.reflow();
			}
		},
		cancelAnimation: function() {
			if( this.animating ) {
				var app = window.CUI.core.currentApp;
				this.stopAnimation();
				if( app ) {
					app.appWindow.style.webkitTransition = '';
				}
				this.animating = false;
			}
		}
	} );
	var homescreen = Class.extend( {
		constructor: function( homescreen ) {
			this.carousel = homescreen.firstOfClass( 'C9Carousel' );
			this.homescreen = homescreen;
			this.page = homescreen.getElementsByClassName( 'C9CarouselPage' ).makeStatic();
			this.appsContainer = document.getElementById( 'homescreenAppsContainer' );
			this.reflow( true );
			this.pageScroller = [
				new CUI.Scroller( this.page[0] ),
				new CUI.Scroller( this.page[1] ),
				new CUI.Scroller( this.page[2] )
			];
			this.scroller = new CUI.PageScroller( this.carousel, this.page );

			this.clock = new CUI.AnalogClock( document.getElementById( 'homescreenClock' ), 6, .03, '#fff', true );
			var that = this,
				time = document.getElementById( 'homescreenTime' ),
				weekday = document.getElementById( 'homescreenWeekday' ),
				date = document.getElementById( 'homescreenDate' ),
				d = new Date(),
				update = function( firstTime ) {
					var d = new Date(),
						hours = d.getHours(),
						minutes = d.getMinutes(),
						hourTheta,
						minuteTheta,
						shadowThetaX,
						shadowThetaY,
						amPm = hours < 12;

					if( firstTime || ( hours === 0 && minutes === 0 ) ) {
						weekday.textContent = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ][d.getDay()];
						date.textContent = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ][d.getMonth()] + ' ' + d.getDate();
					}

					hours = ( hours = hours % 12 ) === 0 ? 12 : hours;

					time.textContent = hours + ':' + ( minutes < 10 ? "0" : "" ) + minutes + ' ' + ( amPm ? "AM" : "PM" );

					hourTheta = hours * 30 + minutes * .5 - 89.5 |0;
					minuteTheta = minutes * 6 - 89.5 |0;

					that.clock.hourHand.style.webkitTransform = 'rotate3d(0,0,1,' + hourTheta + 'deg)'
					that.clock.minuteHand.style.webkitTransform = 'rotate3d(0,0,1,' + minuteTheta + 'deg)'
				};
			update( true );
			setTimeout( function() {
				update();
				setInterval( update, 60000 );
			}, 60000 - d.getSeconds() * 1000 - d.getMilliseconds() );
			d = null;

			this.request = new C9List();
			this.competedRequests = 0;
			this.lensApps = [ "Reader","Photos" ];

			this.loadLens();

			this.appsContainer.getElementsByClassName( 'C9AppIcon' ).bind( 'click', function( e, touch, target ) {
				window.CUI.core.run( target.getAttribute( "data-appname" ) );
			} );

			this.UIColor = 0;
			var that = this,
				colors = [
					'Orange',
					'Blue',
					'Light Blue',
					'Purple',
					'Red',
					'Green',
					'Graphite'
				],
				radio;
			colors.forEach( function( color, i ) {
				colors[i] = C9CreateElement( 'div.C9ListItem' ).appendChild2(
					C9CreateElement( 'strong', color ).appendChild2(
						C9CreateElement( 'div.C9RadioButton' )
					)
				);
			} );
			radio = new CUI.RadioButtons( colors, this.UIColor );
			this.UIColorsAlert = new CUI.Alert( this.homescreen, "Color Themes", colors, function( button ) {
				if( button === "Apply" ) {
					that.UIColor = radio.active;
					setCookie( 'UIColor', radio.active );
				}
			}, [ "Cancel", "Apply" ] );
			homescreen.firstOfClass( "UIColor" ).bind( "click", function() {
				that.UIColorsAlert.show();
			} );

			/*new CUI.Switch( homescreen.firstOfClass( "exposeFrameRequests" ), function( state ) {
				setCookie( 'exposeFrameRequests', state );
			}, false );*/

			/*this.loginAlert = new CUI.Alert( this.homescreen, "Login Information", [
				(function() {
					var input = C9CreateElement( "input.C9TextInput", "", { type: "text", placeholder: "Username" } );
					input.bind( "click", function() {
						input.focus();
												} );
					return input;
				})()
			], function( button ) {}, [ "Cancel", "Login" ] );

			homescreen.firstOfClass( "login" ).bind( "click", function() {
				that.loginAlert.show();
			} );*/

			new CUI.Switch( homescreen.firstOfClass( "runTests" ), function( state ) {
				setCookie( 'runTests', state );
			}, false );
		},
		loadLens: function() {
			var that = this;
			this.lensApps.forEach( function( appName, i ) {
				that.request.add( new C9HTTPRequest( 'app/' + appName + '/tiles.php?date=1 week ago&tiles=30', function( responseText ) {
					that.loadFeed( responseText, i );
				} ) );
			} );
		},
		loadFeed: function( responseText, i ) {
			this.request.remove(i);
			this.tiles = this.tiles ? this.tiles.concat( JSON.parse( responseText ) ) : JSON.parse( responseText );
			if( !this.request.length ) {
				//this.request = null;
				//this.loader.destroy();
				this.tiles = this.tiles.sort( function( a, b ) {
					return b.date - a.date;
				} );
				var scroller = this.pageScroller[0];
				this.feed = new CUI.TileView( document.getElementById( 'homescreenFeed' ), this.tiles );
				this.feed.addEventListener( "reflow", function() {
					scroller.reflow();
				} );
				this.pageScroller[0].reflow();
				this.tiles = null;
			}
		},
		reflow: function( firstTime ) {
			this.page.cssStyle( {
				'width': window.innerWidth + "px"
			} );
			this.carousel.style.width = ( this.page.length * window.innerWidth ) + "px";
			this.appsContainer.style.width = ( ( ( window.innerWidth / remSize - 1.2 ) * .2 |0 ) * 5 |0 ) + 'em';
			this.feed && this.feed.reflow();
			if( !firstTime ) {
				this.pageScroller.forEach( function( scroller ) {
					scroller.reflow();
				} );
				this.scroller.reflow();
			}
		}
	} );
			window.CUI = {
		core: {
			task: {},
			currentApp: null,
			apps: {},
			run: function( appName ) {
				var that = this,
					app = this.task[appName];
				if( app ) {
					if( app === this.currentApp ) {
						return;
					}
					else {
						app.appWindow.style.zIndex = 2;
						app._focusWindow();
					}
				}
				else {
					app = new this.apps[appName]();
					app.appName = appName;
					app.appIcon = this.launcher.element.insertFirst(
						C9CreateElement( 'div.C9AppIcon', appName, {
							'data-appname': appName
						} ).insertFirst(
							C9CreateElement( 'img', '', {
								'src': 'app/' + appName + '/icon.png',
								'alt': 'Icon for ' + appName + ' app'
							} ) ).parentNode );
					this.task[appName] = app;
				}

				if( this.currentApp !== null ) {
					this.currentApp.appWindow.style.zIndex = 1;
					this.currentApp._blurWindow( false );
				}
				this.currentApp = app;
			},
			showHomescreen: function() {
				this.homescreen.homescreen.style.display = 'block';
				if( this.homeNeedsReflow ) {
					this.homescreen.reflow();
					delete this.homeNeedsReflow;
				}
			},
			hide: function() {
				if( this.currentApp !== null ) {
					this.showHomescreen();
					this.currentApp._blurWindow();
					this.currentApp = null;
				}
			},
			quit: function() {
				if( this.currentApp !== null ) {
					this.showHomescreen();
					this.currentApp.quit();
					this.launcher.element.removeChild( this.currentApp.appIcon );
					this.task[this.currentApp.appName] = null;
					this.currentApp = null;
				}
			},
			load: function() {
				//alert("Chrome Desktop for Mac");

				document.body.style.backgroundImage = "url('./src/img/1.png')";

				window.remSize = document.body.cssStyle( "font-size", true );
				//alert(screen.width + 'x' + screen.height + ' @ ' + window.remSize);

				var ratio = window.innerWidth / window.innerHeight;
				document.body.style.backgroundSize = ratio > .6 ? "100% auto" : "auto 100%";
				this.cache = document.getElementById( "cache" );
				this.launcher = new launcher( document.getElementById( "launcher" ) );
				this.homescreen = new homescreen( document.getElementById( "homescreen" ) );
				this.load = null;
			},
			handleEvent: function( e ) {
				if( e.type === 'resize' ) {
					var ratio = window.innerWidth / window.innerHeight;
					document.body.style.backgroundSize = ratio > .6 ? "100% auto" : "auto 100%";
					this.feed && this.feed.reflow();
					if( this.currentApp === null ) {
						this.homescreen.reflow();
					}
					else {
						this.currentApp.reflow();
						this.homeNeedsReflow = true;
					}
					this.launcher.reflow();
				}
			}
		},
		tileWidth: (function() {
			var tileWidth;
								tileWidth = ( 600 - 10 * 3 ) / 2 |0;
							setCSSRule( '.C9Tile', 'width', tileWidth + 'px' );
			return tileWidth;
		})(),
		install: function( appName, appData ) {
			this.core.apps[ appName ] = C9AppWindow.extend( appData );
		},
		addModule: function( name, module ) {
			this[name] = module;
		}
	};
				document.addEventListener( "dragstart", function( e ) {e.preventDefault()}, false );
		document.addEventListener( "DOMMouseScroll", function( e ) {e.preventDefault();e.stopPropagation()}, false );
			window.addEventListener( "resize", window.CUI.core, false );
})();
(function() {
	"use strict";
	CUI.addModule( 'Scroller', C9TangibleElement.extend( {
		constructor: function( scroller, options ) {
			this.options = C9MergeObjects( {
				scrollbarX: true,
				scrollbarY: true,
				tolerance: 4,
				marginX: 0,
				marginY: 0
			}, options );

			this.super.constructor.call( this, scroller, scroller, true );

			this.setAnimationProperty( '-webkit-transform' );
			this.setAnimationTimingFunction( 'cubic-bezier(.33,.66,.66,1)' );
			if( this.options.scrollbarX ) {
				this.scrollbarX = new C9TransformableElement( scroller.appendChild( C9CreateElement( 'div.C9ScrollbarX' ) ), true );
				this.scrollbarX.setAnimationProperty( '-webkit-transform' );
				this.scrollbarX.setAnimationTimingFunction( 'cubic-bezier(.33,.66,.66,1)' );
			}
			if( this.options.scrollbarY ) {
				this.scrollbarY = new C9TransformableElement( scroller.appendChild( C9CreateElement( 'div.C9ScrollbarY' ) ), true );
				this.scrollbarY.setAnimationProperty( '-webkit-transform' );
				this.scrollbarY.setAnimationTimingFunction( 'cubic-bezier(.33,.66,.66,1)' );
			}

			var that = this;

			scroller.parentNode.cssStyle( {
				"overflow": "hidden"/*,
				"-webkit-transform": "translate3d(0,0,0)"*/
			} );

			this.animating = false;
			this.onEndCanceled();

			this.addEventListener( "endCanceled", this.onEndCanceled );

			this.reflow( true );
		},
		onStart: function( e, touch ) {
			this.stopAnimation();
			this.firstX = this.position.x;
			this.firstY = this.position.y;
			this.firstT = e.timeStamp;
			this.startX = touch.pageX - this.position.x;
			this.startY = touch.pageY - this.position.y;
		},
		onMove: function( e, touch ) {
			if( !this.tolerance( e, touch ) ) {
				return;
			}

			var currentTime = e.timeStamp;

			if( currentTime - this.firstT > 200 ) {
				var currentTime = e.timeStamp;
				this.firstT = currentTime;
				this.firstX = this.position.x;
				this.firstY = this.position.y;
			}

			this.scrollTo( this.toleranceX ? touch.pageX - this.startX : this.position.x, this.toleranceY ? touch.pageY - this.startY : this.position.y );
		},
		onEnd: function( e, touch ) {
			if( this.toleranceX || this.toleranceY ) {
				var duration = e.timeStamp - this.firstT,
					xDistance = touch.pageX - this.startX - this.firstX,
					yDistance = touch.pageY - this.startY - this.firstY,
					xVelocity = xDistance / duration,
					yVelocity = yDistance / duration;

				xDistance = Math.round( xVelocity * Math.abs( xVelocity ) * 1250 );
				yDistance = Math.round( yVelocity * Math.abs( yVelocity ) * 1250 );

				xDistance = bindNum( this.maxX - this.position.x, xDistance, -this.position.x );
				yDistance = bindNum( this.maxY - this.position.y, yDistance, -this.position.y );

				var maxSpeed = Math.max( Math.abs( xVelocity ), Math.abs( yVelocity ) );

				if( maxSpeed > 0.15 ) {
					var t = Math.abs( maxSpeed === Math.abs( xVelocity ) ? xDistance : yDistance ) / maxSpeed + .5 |0;

					if( t > 0.375 ) {
						this.scrollTo( this.position.x + xDistance, this.position.y + yDistance, true, t );
					}
				}
			}
			this.onEndCanceled();
		},
		onEndCanceled: function() {
			this.toleranceX = false;
			this.toleranceY = false;
			this.startX = null;
			this.startY = null;
			this.firstX = null;
			this.firstY = null;
			this.firstT = null;
		},
		tolerance: function( e, touch ) {
			var result = true;
			if( !this.toleranceX ) {
				if( Math.abs( touch.pageX - this.startX - this.position.x ) > this.options.tolerance ) {
					this.firstX = this.position.x;
					this.startX = touch.pageX - this.position.x;
					this.toleranceX = true;
				}
				else {
					result = false;
				}
			}
			else {
				result = true;
			}
			if( !this.toleranceY ) {
				if( Math.abs( touch.pageY - this.startY - this.position.y ) > this.options.tolerance ) {
					this.firstY = this.position.y;
					this.startY = touch.pageY - this.position.y;
					this.toleranceY = true;
				}
				else {
					result = false;
				}
			}
			else {
				result = true;
			}
			if( this.maxX === 0 && this.toleranceX && !this.toleranceY ) {
				this.toleranceX = false;
				this.preventDefault();
			}
			return result;
		},
		setPosition: function( x, y ) {
			if( x > 0 ) {
				this.startX += x;
				x = 0;
			}
			else if( x < this.maxX ) {
				this.startX += ( x - this.maxX );
				x = this.maxX;
			}
			else {
				x = x;
			}
			if( y > 0 ) {
				this.startY += y;
				y = 0;
			}
			else if( y < this.maxY ) {
				this.startY += ( y - this.maxY );
				y = this.maxY;
			}
			else {
				y = y;
			}
			this.translate( x, y );
			if( this.maxX && this.options.scrollbarX ) {
				this.scrollbarX.translate( -this.position.x * ( 1 + this.ratioX ), 0, 0 );
			}
			if( this.maxY && this.options.scrollbarY ) {
				this.scrollbarY.translate( 0, -this.position.y * ( 1 + this.ratioY ), 0 );
			}
		},
		scrollTo: function( x, y, animate, duration ) {
			this.setPosition( x, y );
			if( animate ) {
				this.animating = true;
				this.setAnimationDuration( duration + 'ms' );
				if( this.maxX && this.options.scrollbarX ) {
					this.scrollbarX.setAnimationDuration( duration + 'ms' );
				}
				if( this.maxY && this.options.scrollbarY ) {
					this.scrollbarY.setAnimationDuration( duration + 'ms' );
				}
				this.dispatchEvent( "animation", {
					x: this.position.x,
					y: this.position.y,
					duration: duration
				} );
			}
			else {
				this.dispatchEvent( "scroll", {
					x: this.position.x,
					y: this.position.y
				} );
			}
			this.repaint( animate );
		},
		onRepaint: function() {
			if( this.maxX && this.options.scrollbarX ) {
				this.scrollbarX.applyTransformation();
			}
			if( this.maxY && this.options.scrollbarY ) {
				this.scrollbarY.applyTransformation();
			}
		},
		stopAnimation: function() {
			if( this.animating ) {
				this.animating = false;
				var style = window.getComputedStyle( this.element, null );

				this.updateMatrixData( style["-webkit-transform"] );
				this.setPosition( this.position.x, this.position.y );
				this.setAnimationDuration( "0ms" );

				if( this.maxX && this.options.scrollbarX ) {
					this.scrollbarX.setAnimationDuration( "0ms" );
				}
				if( this.maxY && this.options.scrollbarY ) {
					this.scrollbarY.setAnimationDuration( "0ms" );
				}

				this.repaint( true );

				this.dispatchEvent( "animationEnd", style );
			}
		},
		setInnerHTML: function( innerHTML ) {
			if( this.options.scrollbarX ) {
				this.scrollbarX.element = this.scrollbarX.element.cloneNode( true );
			}
			if( this.options.scrollbarY ) {
				this.scrollbarY.element = this.scrollbarY.element.cloneNode( true );
			}
			this.element.innerHTML = innerHTML;
			this.options.scrollbarX && ( this.scrollbarX.element = this.element.appendChild( this.scrollbarX.element ) );
			this.options.scrollbarY && ( this.scrollbarY.element = this.element.appendChild( this.scrollbarY.element ) );
			this.reflow();
		},
		recalculateWidth: function() {
			var windowW = this.hardWindowW - this.padding[1] - this.border[1] - this.padding[3] - this.border[3],
				scrollerW = this.hardScrollerW + this.margin[1] + this.margin[3] + this.options.marginX;
			if( windowW - scrollerW < 0 ) {
				if( this.options.scrollbarX ) {
					this.ratioX = ( windowW - this.margin[3] - this.options.marginX - 6 ) / scrollerW;
					if( !this.maxX || this.maxX === undefined ) {
						this.scrollbarX.element.style.display = "block";
					}
					this.scrollbarXWidth = windowW * this.ratioX;
					this.scrollbarX.scale( this.scrollbarXWidth, 1 );
				}
				this.setPosition( ( this.maxX ? this.position.x / this.maxX : 0 ) * ( this.maxX = windowW - scrollerW ), this.position.y );
			}
			else {
				if( ( this.maxX || this.maxX === undefined ) && this.options.scrollbarX ) {
					this.ratioX = 1;
					this.scrollbarX.element.style.display = 'none';
				}
				this.maxX = 0;
				this.setPosition( 0, this.position.y );
			}
		},
		recalculateHeight: function() {
			var windowH = this.hardWindowH - this.padding[0] - this.border[0] - this.padding[2] - this.border[2],
				scrollerH = this.hardScrollerH + this.margin[0] + this.margin[2] + this.options.marginY;
			if( windowH - scrollerH < 0 ) {
				if( this.options.scrollbarY ) {
					this.ratioY = ( windowH - this.margin[2] - this.options.marginY - 6 ) / scrollerH;
					if( !this.maxY || this.maxY === undefined ) {
						this.scrollbarY.element.style.display = "block";
					}
					this.scrollbarYHeight = windowH * this.ratioY;
					this.scrollbarY.scale( 1, this.scrollbarYHeight );
				}
				this.setPosition( this.position.x, ( this.maxY ? this.position.y / this.maxY : 0 ) * ( this.maxY = windowH - scrollerH) );
			}
			else {
				if( ( this.maxY || this.maxY === undefined ) && this.options.scrollbarY ) {
					this.ratioY = 1;
					this.scrollbarY.element.style.display = 'none';
				}
				this.maxY = 0;
				this.setPosition( this.position.x, 0 );
			}
		},
		reflow: function( firstTime ) {
			this.stopAnimation();
			var changedX = false,
				changedY = false,
				scrollerStyle = window.getComputedStyle( this.element, null ),
				parentStyle = window.getComputedStyle( this.element.parentNode, null ),
				hardScrollerW = scrollerStyle['width'].toNum(),
				hardScrollerH = scrollerStyle['height'].toNum(),
				hardWindowW = parentStyle['width'].toNum(),
				hardWindowH = parentStyle['height'].toNum(),
				margin = scrollerStyle['margin'].toMatrix(),
				padding = parentStyle['padding'].toMatrix(),
				border = parentStyle['border-width'].toMatrix();

			if( hardScrollerW !== this.hardScrollerW ) {
				changedX = true;
				this.hardScrollerW = hardScrollerW;
			}
			if( hardWindowW !== this.hardWindowW ) {
				changedX = true;
				this.hardWindowW = hardWindowW;
			}

			if( hardScrollerH !== this.hardScrollerH ) {
				changedY = true;
				this.hardScrollerH = hardScrollerH;
			}
			if( hardWindowH !== this.hardWindowH ) {
				changedY = true;
				this.hardWindowH = hardWindowH;
			}

			if( !( margin.equals( this.margin ) && padding.equals( this.padding ) && border.equals( this.border ) ) ) {
				this.margin = margin;
				this.padding = padding;
				this.border = border;
				changedX = true;
				changedY = true;
			}

			if( changedX || changedY ) {
				if( changedX ) {
					this.recalculateWidth();
				}
				if( changedY ) {
					this.recalculateHeight();
				}

				this.dispatchEvent( "reflow" );

				this.repaint( true );
			}
		}
	} ) );
	CUI.addModule( 'PageScroller', CUI.Scroller.extend( {
		constructor: function( scroller, page, options ) {
			var that = this;
			this.numPages = page.length;
			this.currentPage = 0;

			this.addEventListener( "reflow", this.onReflow );

			this.super.constructor.call( this, scroller, C9MergeObjects( {
				scrollbarX: false,
				scrollbarY: false
			}, options ) );
		},
		onEnd: function( e, touch ) {
			if( this.toleranceX ) {
				var xVelocity = ( touch.pageX - this.startX - this.firstX ) / ( e.timeStamp - this.firstT ),
					xDistance = Math.round( xVelocity * Math.abs( xVelocity ) * 1250 ),
					newPage = Math.abs( bindNum( this.maxX, this.position.x + xDistance, 0 ) / this.hardWindowW );

				newPage = bindNum( this.currentPage - 1, newPage + .5 |0, this.currentPage + 1 );

				this.scrollToPage( newPage, true, Math.abs( ( -newPage * this.hardWindowW - this.position.x ) / xVelocity ) + .5 |0 );
			}
			this.onEndCanceled();
		},
		onTap: function() {

		},
		tolerance: function( e, touch ) {
			if( !this.toleranceX ) {
				var velX = ( this.firstX - touch.pageX + this.startX ) / ( e.timeStamp - this.firstT ),
					velY = ( this.firstY - touch.pageY + this.startY ) / ( e.timeStamp - this.firstT );
				if( Math.abs( velX ) > Math.abs( velY ) && Math.abs( touch.pageX - this.startX - this.position.x ) > 10 ) {
					this.firstX = this.position.x;
					this.startX = touch.pageX - this.position.x;
					this.toleranceX = true;
				}
				else {
					if( Math.abs( touch.pageY - this.startY - this.position.y ) > this.options.tolerance ) {
						this.preventDefault();
					}
					return false;
				}
			}
			return true;
		},
		scrollToPage: function( page, animate, duration ) {
			this.setPosition( -page * this.hardWindowW, 0 );

			if( animate ) {
				this.animating = true;
				this.setAnimationDuration( duration + 'ms' );
				this.dispatchEvent( "animation", {
					x: this.position.x,
					y: 0,
					oldPage: this.currentPage,
					newPage: page,
					duration: duration
				} );
			}
			this.dispatchEvent( "pageChange", {
				x: this.position.x,
				y: 0,
				oldPage: this.currentPage,
				newPage: page
			} );
			this.currentPage = page;
			this.repaint( animate );
		},
		onAnimationEnd: function() {
			this.animating = false;
		},
		onReflow: function() {
			this.scrollToPage( this.currentPage );
		}
	} ) );
	CUI.addModule( 'ProgressBar', C9TransformableElement.extend( {
		constructor: function( track, pos ) {
			this.vert = track.isMemberOfClass( 'vert' );
			this.startCap = track.appendChild( C9CreateElement( 'div.C9ProgressBarCapLeft' ) );
			this.element = track.appendChild( C9CreateElement( 'div.C9ProgressBar' ) );
			this.endCap = new C9TransformableElement( track.appendChild( C9CreateElement( 'div.C9ProgressBarCapRight' ) ) );
			this.pos = ( pos ? ( this.vert ? this.max - pos : pos ) : 0 ) + .5 |0;

			this.super.constructor.call( this, this.element );
		},
		setPosition: function( pos ) {
			this.pos = bindNum( 0, pos + .5 |0 , this.max );
		},
		updateProgress: function( pos ) {
			this.setPosition( pos );
			this.repaint();
		},
		repaint: function() {
			var capPos = this.pos + this.min;

			if( this.vert ) {
				this.scale( 1, this.pos );
				this.endCap.translate( 0, capPos );
			}
			else {
				this.scale( this.pos, 1 );
				this.endCap.translate( capPos, 0 );
			}
			this.applyTransformation();
			this.endCap.applyTransformation();
		},
		reflow: function() {
			this.min = this.startCap[this.vert?'offsetHeight':'offsetWidth'];
			var ratio,
				max = this.element.parentNode[this.vert?'offsetHeight':'offsetWidth'] - this.endCap.element[this.vert?'offsetHeight':'offsetWidth'] - this.min;
			if( this.max !== undefined ) {
				ratio = this.pos / this.max;
			}
			else {
				ratio = this.pos / max;
			}
			this.max = max;
			this.setPosition( ratio * max );
			this.repaint( true );
		}
	} ) );
	CUI.addModule( 'Switch', C9TangibleElement.extend( {
		constructor: function( checkbox, after, checked ) {
			var track = C9CreateElement( "div.C9Switch" ),
				that = this,
				knob = C9CreateElement( "div.C9SwitchKnob" );
			this.checkbox = checkbox;
			this.after = after;

			checkbox.style.display = "none";
			if( checked !== undefined ){
				checkbox.checked = checked;
			}

			track.appendChild( C9CreateElement( "span.on", "ON" ) );
			track.appendChild( C9CreateElement( "span.off", "OFF" ) );

			track.appendChild( knob );
			checkbox.parentNode.appendChild( track );

			this.super.constructor.call( this, track, knob );

			this.border = 0;
			this.animating = false;
			this.startX = 0;

			this.setAnimationProperty( "-webkit-transform" );
			this.setAnimationTimingFunction( "ease-out" );

			this.reflow();

			if( track.isChildOfTag( "LABEL" ) ) {
				track.parentNode.bind( "click", function( e ) {
					that.toggle();
				} );
			}
			this.updateBackground();

			this.addEventListener( "animationEnd", this.onAnimationEnd );
		},
		onStart: function( e, touch ) {
			e.stopPropagation();
			if( this.animating ) {
				this.stopAnimation();
			}
			this.startX = touch.pageX - this.position.x;
		},
		onMove: function( e, touch ) {
			this.setPosition( touch.pageX - this.startX );
			this.repaint();
		},
		onEnd: function( e, touch ) {
			this.setState( this.position.x > this.max / 2 );
		},
		onEndCanceled: function( e, touch ) {

		},
		onTap: function() {
			this.toggle();
		},
		setPosition: function( position ) {
			this.translate( bindNum( 0, position, this.max ), 0, 0 );
		},
		onRepaint: function() {
			if( ( this.on && this.position.x <= this.max / 2 ) || ( !this.on && this.position.x > this.max / 2 ) ) {
				this.on = !this.on;
				this.updateBackground();
			}
			if( this.position.x === 0 ) {
				this.updateBorders( false );
			}
			else if( this.position.x === this.max ) {
				this.updateBorders( true );
			}
			else {
				this.showBorders();
			}
		},
		setState: function( on ) {
			var that = this,
				duration = getEasingTime( this.position.x / this.max, 250, on === this.on, on );
			this.on = on;
			this.showBorders();
			this.updateBackground();
			this.animating = true;
			this.setAnimationDuration( duration + 'ms' );
			this.setPosition( on ? this.max : 0 );
			this.repaint( true );
			this.after( this.checkbox.checked = on );
		},
		toggle: function() {
			this.setState( !this.on );
		},
		updateBorders: function( on ) {
			on = !!on || this.on;
			if( on ) {
				this.element.style.borderRightColor = 'rgba(0,0,0,0)';
				this.border = 1;
			}
			else {
				this.element.style.borderLeftColor = 'rgba(0,0,0,0)';
				this.border = -1;
			}
		},
		showBorders: function() {
			if( this.border < 0 ) {
				this.element.style.borderLeftColor = 'rgba(0,0,0,.25)';
			}
			else if( this.border > 0 ) {
				this.element.style.borderRightColor = 'rgba(0,0,0,.25)';
			}
			this.border = 0;
		},
		updateBackground: function() {
			this.element.parentNode.style.backgroundColor = this.on ? "rgb(255,126,0)" : "#bbb";
		},
		onAnimationEnd: function() {
			this.animating = false;
		},
		reflow: function() {
			this.on = this.checkbox.checked;
			this.max = this.element.parentNode.offsetWidth - this.element.offsetWidth |0;
			this.setPosition( this.on ? this.max : 0 );
			this.repaint( true );
		}
	} ) );
	CUI.addModule( 'RadioButtons', C9TappableObject.extend( {
		constructor: function( buttons, active ) {
			var that = this;

			this.button = new Array( buttons.length );
			buttons.forEach( function( button, i ) {
				button.radioButton = that.button[i] = button.firstOfClass( 'C9RadioButton' );
			} );

			this.button[active].addClass( 'active' );
			this.active = active;

			this.super.constructor.call( this, buttons );
		},
		onTap: function( e, touch, target ) {
			var i = this.button.indexOf( target.radioButton );
			if( i !== this.active && i !== -1 ) {
				this.button[this.active].removeClass( 'active' );
				this.button[i].addClass( 'active' );
				this.active = i;
				this.onSelection && this.onSelection( i );
			}
		}
	} ) );
	CUI.addModule( 'AnalogClock', Class.extend( {
		constructor: function( clock, size, handSize, color ) {
			this.clock = clock;
			size = size === undefined ? 3: size;
			handSize = handSize === undefined ? .1 : handSize;
			color = color === undefined ? "#777" : color;
			clock.addClass( 'C9AnalogClock' );
			this.hourHand = C9CreateElement( "div.hour" );
			this.minuteHand = C9CreateElement( "div.minute" );
			this.minuteHand.style.top =
				this.minuteHand.style.left =
				this.hourHand.style.top =
				this.hourHand.style.left = ( .5 - handSize * 1.4 ) + 'em';
			clock.style.fontSize = size + 'em';
			clock.style.borderWidth =
				this.minuteHand.style.height =
				this.hourHand.style.height = handSize + 'em';
			this.minuteHand.style.webkitTransformOrigin =
				this.minuteHand.style.webkitBorderRadius =
				this.hourHand.style.webkitTransformOrigin =
				this.hourHand.style.webkitBorderRadius = ( handSize * .5 ) + 'em';
			clock.style.borderColor = this.minuteHand.style.backgroundColor = this.hourHand.style.backgroundColor = color;
			clock.appendChild( this.hourHand );
			clock.appendChild( this.minuteHand );
		}
	} ) );
	CUI.addModule( 'LoadingIndicator', Class.extend( {
		constructor: function( parent, size, color ) {
			this.parent = parent;
			this.loader = C9CreateElement( 'div.C9LoadingIndicator' );
			var leftDot = C9CreateElement( 'div.C9LoadingDot.left' ),
				topDot = C9CreateElement( 'div.C9LoadingDot.top' ),
				rightDot = C9CreateElement( 'div.C9LoadingDot.right' );
			if( size !== undefined ) {
				this.loader.style.fontSize = size + "em";
			}
			if( color !== undefined ) {
				leftDot.style.backgroundColor = color;
				topDot.style.backgroundColor = color;
				rightDot.style.backgroundColor = color;
			}
			this.loader.appendChild( leftDot );
			this.loader.appendChild( topDot );
			this.loader.appendChild( rightDot );
			this.parent.appendChild( this.loader );
		},
		create: function() {
			this.parent.appendChild( this.loader );

		},
		destroy: function() {
			this.parent.removeChild( this.loader );
		}
	} ) );
	CUI.addModule( 'TileView', Class.extend( {
		constructor: function( container, tiles ) {
			this.container = container;
			this.columns = new Array();
			this.tiles = new Array();
			this.tileWidth = ( this.container.cssStyle( "width" ).toNum() - 10 * 3 ) / 2 |0;
			if( tiles ) {
				this.addTiles( tiles, true );
			}
		},
		addTiles: function( tiles, firstTime ) {
			var that = this,
				fragment = document.createDocumentFragment();
			tiles.forEach( function( tile, i ) {
				var tileDiv = C9CreateElement( 'div.C9Tile' ),
					content,
					bar;
				if( tile.tileType === 'naked' ) {
					content = tileDiv = C9CreateElement( 'div.C9Tile.C9TileContent' );
					if( tile.image !== '' ) {
						tileDiv.setAttribute( 'data-title', tile.title );
					}
					else {
						content.innerHTML = tile.description;
					}
				}
				else {
					tileDiv = C9CreateElement( 'div.C9Tile' );

					var date = new Date( tile.date );
					date =
						[ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ][date.getMonth()] +
						' ' + date.getDate();

					content = C9CreateElement( 'div.C9TileContent' );
					if( tile.image === '' ) {
						content.style.maxHeight = '20em';
						content.innerHTML = tile.description;
					}

					bar = C9CreateElement( 'div.C9TileBar.simple', tile.title );
					if( tile.tileType === 'simple' ) {
						bar.appendChild( C9CreateElement( 'span.date', date ) );
					}
					else if( tile.tileType === 'complex' ) {
						content.appendChild(
							C9CreateElement( 'div.C9TileMeta' ).appendChild(
							 	C9CreateElement( 'span.source', tile.source ) ).parentNode.appendChild(
								C9CreateElement( 'span.date', date ) ).parentNode
							);
					}
					tileDiv.appendChild( content );
					tileDiv.appendChild( bar );
				}
				if( tile.image !== '' ) {
					var height = that.tileWidth * tile.imageHeight / tile.imageWidth + .5 | 0;
					content.cssStyle( {
						width: that.tileWidth + "px",
						height: height + "px",
						backgroundImage: "url(" + tile.image + ")",
						backgroundSize: that.tileWidth + "px " + height + "px"
					} );
					content.setAttribute( 'data-width', tile.imageWidth );
					content.setAttribute( 'data-height', tile.imageHeight );
					if( tile.tileType === 'naked' ) {
						content.height = height;
					}
				}
				tileDiv.setAttribute( "data-date", tile.date );

				tileDiv.style.width = that.tileWidth + "px";

				tileDiv.tileType = tiles[i].tileType;

				tiles[i] = tileDiv;

				fragment.appendChild( tileDiv );
			} );
			that = null;
			if( tiles[0].tileType === 'naked' ) {
				this.reflow( tiles, firstTime );
				this.container.appendChild( fragment );
			}
			else {
				this.container.appendChild( fragment );
				this.reflow( tiles, firstTime );
			}
		},
		reflow: function( tiles, firstTime ) {
			var that = this,
				containerWidth = this.container.cssStyle( "width" ).toNum(),
				numColumns = window.innerWidth > window.innerHeight ? 3 : 2,
				margin = ( containerWidth - ( numColumns * ( this.tileWidth + 10 ) - 10 ) ) / 2;

			if( !tiles || firstTime || numColumns !== this.columns.length ) {
				this.columns.length = numColumns;
				this.columns = this.columns.fill( 10, 0, numColumns - 1 );
			}

			if( tiles ) {
				if( tiles.length === 0 ) {
					return;
				}
				this.tiles = this.tiles.concat( tiles );
			}
			else {
				this.tiles = tiles = this.container.getElementsByClassName( "C9Tile" ).makeStatic();
			}

			var shortest,
				shortestIndex;
			tiles.forEach( function( tile ) {
				shortest = that.columns.min();
				shortestIndex = 0;
				do {
					if( that.columns[shortestIndex] === shortest ) {
						break;
					}
				} while( ++shortestIndex < numColumns - 1 );
				tile.style.left = ( shortestIndex * ( that.tileWidth + 10 ) + margin + .5 |0 ) + "px";
				tile.style.top = ( shortest + .5 |0 ) + "px";
				that.columns[shortestIndex] += ( tile.tileType === 'naked' ? tile.height : tile.offsetHeight ) + 10;
			} );

			this.container.style.height = this.columns.max() + "px";
			this.dispatchEvent( "reflow" );
			that = null;
		}
	} ) );
	CUI.addModule( 'Button', C9TappableObject.extend( {
		constructor: function( button, onTap ) {
			this.button = button;
			this.onTap = onTap ? onTap : function(){};

			this.super.constructor.call( this, button );
		},
		onStart: function() {
			this.button.addClass( "active" );
		},
		onEnd: function() {
			this.button.removeClass( "active" );
			this.active = null;
		}
	} ) );
	CUI.addModule( 'FoldableElement', Class.extend( {
		constructor: function( element, nextElement ) {
			this.nextElement = nextElement;
			this.maxHeight = element.offsetHeight;
			var containerHeight = element.parentNode.offsetHeight;
			nextElement.cssStyle( {
				position: "absolute",
				top: 0
			} );
			this.lower = new C9TransformableObject( element );
			this.lower.target.addClass( "C9FoldableLower" );
			this.upper = new C9TransformableObject( C9CreateElement( 'div.C9FoldableUpper' ) );
			this.upper.target.innerHTML = this.lower.target.innerHTML;
			this.upper.target.style.height = ( this.maxHeight / 2 + .5 |0 ) + "px";
			this.lower.target.parentNode.insertAfter( this.upper.target, this.lower.target );
			this.open = false;
			this.pos = 0;
			this.lower.target.parentNode.style.height = containerHeight + "px";
			//element.style.webkitTransform = "translate3d(0px,0px,0px)";
			this.translate( 0 );
		},
		fold: function() {
			var that = this,
				start = this.pos,
				end = ( this.open = !this.open ) ? 1 : 0;
				//getEasingTime( this.pos, 500, false, !this.open )
			this.upper.target.C9AnimateJS( 1000, function( x ) {
				that.translate( x * ( end - start ) + start );
			}, timingFunctions.easeOut );
		},
		translate: function( theta ) {
								this.upper.target.style.backgroundPosition = "0px " + ( this.maxHeight * timingFunctions.easeOut( theta ) * .5 ) + "px";
				this.lower.target.style.backgroundPosition = "0px " + ( this.maxHeight * timingFunctions.easeIn( 1 - theta ) * .5 ) + "px";
							this.pos = theta;
			theta = ( 1 - theta ) * 90;
			var height = this.maxHeight * Math.cos( theta * Math.PI / 180 );
			this.upper.target.parentNode.style.webkitTransformOrigin = "50% " + ( height / 2 ) + "px";
			this.upper.rotate( -theta, 0, 0 );
			this.lower.rotate( theta, 0, 0 );
			this.lower.translate( 0, height - this.maxHeight );
			this.upper.applyTransformation();
			this.lower.applyTransformation();
			//this.lower.style.webkitTransform = "";
			this.nextElement.style.webkitTransform = "translate3d(0px," + height + "px,0px)";
			//this.container.style.height = ( this.maxHeight * Math.cos( theta ) ) + 'px';
		}
	} ) );
	/*CUI.addModule( 'FoldableElement', Class.extend( {
		constructor: function( element ) {
			this.container = element;
			this.maxHeight = element.offsetHeight;
			var innerHTML = element.innerHTML;
			element.innerHTML = "";
			this.upper = C9CreateElement( 'div.C9FoldableUpper' );
			this.lower = C9CreateElement( 'div.C9FoldableLower' );
			this.upper.innerHTML = this.lower.innerHTML = innerHTML;
			this.upper.style.height = this.maxHeight/2;
			this.lower.style.height = this.maxHeight;
			element.appendChild( this.lower );
			element.appendChild( this.upper );
			this.open = false;
			this.pos = 0;
			element.style.webkitTransform = "translate3d(0px,0px,0px)";
			this.translate( 1 );
		},
		fold: function() {
			var that = this,
				start = this.pos,
				end = ( this.open = !this.open ) ? 0 : 1;
			C9AnimateJS( this.container, Math.abs( end - start ) * 600, function( x ) {
				that.translate( x * ( end - start ) + start );
			} );
		},
		translate: function( theta ) {
								this.upper.style.backgroundPosition = "0px " + ( this.maxHeight * easeOut( 1 - theta ) * .5 ) + "px";
				this.lower.style.backgroundPosition = "0px " + ( this.maxHeight * easeIn( theta ) * .5 ) + "px";
							this.pos = theta;
			theta *= Math.PI * .5;
			this.upper.style.webkitTransform = "rotate3d(1,0,0," + ( -theta ) + "rad)";
			this.lower.style.webkitTransform = "rotate3d(1,0,0," + ( theta ) + "rad)";
			//this.container.style.height = ( this.maxHeight * Math.cos( theta ) ) + 'px';
		}
	} ) );*/
	CUI.addModule( 'Alert', C9TappableObject.extend( {
		constructor: function( parent, title, content, callback, buttons ) {
			this.shadow = C9CreateElement( 'div.C9AlertShadow' );
			this.parent = parent;
			this.callback = callback;
			var alertBar = C9CreateElement( 'div.C9AlertBar' ),
				list = C9CreateElement( 'div.C9List' );

			this.shadow.style.display = "none";

			buttons.forEach( function( buttonName, i ) {
				alertBar.appendChild( C9CreateElement( 'button', buttonName ) );
			} );

			this.parent.appendChild(
				this.shadow.appendChild2(
					C9CreateElement( 'div.C9AlertWindow' ).appendChild2(
						list.appendChild2(
							content
						)
					).appendChild2(
						C9CreateElement( 'div.C9ListSeparator.C9AlertTitle', title )
					).appendChild2(
						alertBar
					)
				) );

			this.scroller = new CUI.Scroller( list );

			this.super.constructor.call( this, this.shadow );
		},
		onTap:function( e, touch, target ) {
			var button = touch.target.isChildOfTag( "BUTTON" );
			if( button ) {
				this.callback( button.textContent );
			}
			else if( touch.target !== this.shadow ) {
				return;
			}
			this.hide();
		},
		show:function() {
			this.shadow.style.display = "block";
			this.scroller.reflow();
			this.shadow.C9Animate( 250, { "-webkit-transform": "scale(1)", "opacity": 1 }, "ease-out" );
		},
		hide:function() {
			var that = this;
			this.shadow.C9Animate( 250, { "-webkit-transform": "scale(.75)", "opacity": 0 }, "ease-out", function() {
				that.shadow.style.display = "none";
			} );
		}
	} ) );
})();
window.CUI.install( "Photos", {
	constructor: function( id ) {
		this.super.constructor.call( this, "photos", id );

		var that = this,
			loader = new CUI.LoadingIndicator( this.appWindow.firstOfClass( "scroller" ) );

		this.request = new C9HTTPRequest( 'app/Photos/list.php', function( responseText ) {
			loader.destroy();
			that.list( responseText );
		} );

		this.addEventListener( "reflow", this.onReflow );

		this.open = null;

		this.bind( this.appWindow.firstOfClass( "scroller" ), "click", this.zoom );

		this.postInit();
	},
	zoom: function( e ) {
		if( this.open ) {
			var open = this.open;
			open.C9Animate( 500, {
				"-webkit-transform": "translate3d(0px,0px,0px)scale3d(1,1,1)"
			}, "ease-out", function() {
				open.style.zIndex = 1;
			} );
			//this.open.fold.fold();
			this.open = null;
		}
		else {
			var tile = e.target.isChildOfClass( "C9Tile" );
			if( !( tile || tile.tagName === "IMG" ) ) {
				return;
			}

			var style = window.getComputedStyle( tile, null ),
				imgWidth = tile.getAttribute( 'data-width' ).toNum(),
				imgHeight = tile.getAttribute( 'data-height' ).toNum(),
				imgRatio = imgHeight / imgWidth,
				newWidth,
				newHeight,
				newRatio,
				newX,
				newY;

			if( imgRatio > window.innerHeight / window.innerWidth ) {
				newHeight = Math.min( window.innerHeight * .85 + .5 |0, imgHeight );
				newWidth = newHeight / imgRatio + .5 |0;
			}
			else {
				newWidth = Math.min( window.innerWidth * .85 + .5 |0, imgWidth );
				newHeight = newWidth * imgRatio + .5 |0;
			}

			this.open = tile;

			newRatio = newWidth / this.tileView.tileWidth;

			newX = ( window.innerWidth - newWidth  ) * .5 - ( style.left.toNum() + this.scroller.position.x ) + .5 |0;
			newY = ( window.innerHeight - newHeight ) * .5 - ( style.top.toNum() + this.scroller.position.y ) + .5 |0;

			//newY = Math.max( window.innerHeight * .075, ( window.innerHeight - newHeight ) * .5 );

			newX /= newRatio;
			newY /= newRatio;

			tile.style.zIndex = 2;

			tile.C9Animate( 500, {
				"-webkit-transform": "translate3d(" + newX + "px," + newY + "px,0)scale3d(" + newRatio + "," + newRatio + ",1)"
			}, "ease-out", null, true );

			this.tileView.tileWidth;

			/*var newTile = C9CreateElement( 'div.C9Tile' ),
				content = C9CreateElement( 'img.C9TileContent' ),
				date = new Date( tile.getAttribute( 'data-date' ).toNum() ),
				bar = C9CreateElement( 'div.C9TileBar.simple', tile.getAttribute( 'data-title' ) ).appendChild(
					C9CreateElement( 'span.date', [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ][date.getMonth()] + ' ' + date.getDate() ) ).parentNode,
				style = window.getComputedStyle( tile, null ),
				imgWidth = tile.getAttribute( 'data-width' ).toNum(),
				imgHeight = tile.getAttribute( 'data-height' ).toNum(),
				imgRatio = imgHeight / imgWidth,
				newWidth,
				newHeight;
			if( imgRatio > window.innerHeight / window.innerWidth ) {
				content.height = newHeight = Math.min( window.innerHeight * .85 + .5 |0, imgHeight );
				content.width = newWidth = newHeight / imgRatio + .5 |0;
			}
			else {
				content.width = newWidth = Math.min( window.innerWidth * .85 + .5 |0, imgWidth );
				content.height = newHeight = newWidth * imgRatio + .5 |0;
			}
			var foldContainer = C9CreateElement( "div.C9FoldableElement" ),
				upperFold = foldContainer.appendChild( C9CreateElement( "div", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean facilisis luctus augue at malesuada. Pellentesque dignissim, lectus vitae tincidunt porta, libero nibh condimentum leo, vel dignissim lectus ligula eu ipsum. Morbi nec libero sapien. Ut ac dictum dolor. Proin porta nisl quis nisl hendrerit rutrum. Phasellus ac mauris at nunc interdum egestas eu lobortis urna.\
\
\n\nEtiam ut viverra turpis, in tincidunt turpis. Duis sit amet neque mauris. Integer ipsum orci, hendrerit in tempus vitae, consectetur varius ante. Duis sollicitudin erat nec nunc congue semper.\n\n" ) );
			foldContainer.style.maxHeight = "auto";
			this.open = {
				newTile: newTile,
				oldTile: tile,
				left: style.left.toNum(),
				top: style.top.toNum(),
				ratio: style.width.toNum() / newWidth,
				fold: null
			};
			newTile.cssStyle( {
				"width": newWidth + "px",
				"-webkit-transform-origin": "0px 0px",
				"-webkit-transform": "translate3d(" + this.open.left + "px," + this.open.top + "px,0)scale(" + this.open.ratio + ")"
			} );
			content.src = tile.src;
			this.scroller.element.appendChild( newTile.appendChild2( content ).appendChild2( foldContainer.appendChild2( bar ) ) );
			//this.open.newTile.style.height = ( newHeight = content.height + bar.offsetHeight + .5 |0 ) + "px";
			this.open.fold = new CUI.FoldableElement( upperFold, bar );
			newHeight = content.height + this.open.fold.maxHeight + bar.offsetHeight + .5 |0

			tile.style.opacity = 0;

			this.open.newTile.C9Animate( 500, {
				"-webkit-transform": "translate3d(" +
				( ( window.innerWidth - newWidth + 1 ) * .5 - this.scroller.position.x |0 ) + "px," +
				Math.max( globalEmSize, ( window.innerHeight - newHeight + 1 ) * .5 - this.scroller.position.y |0 ) + "px,0)scale(1)"
			}, "ease-out", null, true );
			this.open.fold.fold();*/
		}
	},
	list: function( responseText ) {
		this.request = null;
		this.tileView = new CUI.TileView( this.appWindow.firstOfClass( "scroller" ), JSON.parse( responseText ) );
		this.scroller = new CUI.Scroller( this.tileView.container );
	},
	onReflow: function() {
		this.tileView && this.tileView.reflow();
		this.scroller && this.scroller.reflow();
	},
	onQuit: function() {
		this.request && this.request.cancel();
	}
} );
window.CUI.install( "Music", {
	constructor: function( id ) {
		this.super.constructor.call( this, 'music', id );

		var that = this,
			page = this.appView[0].tab,
			bottomBar = this.appView[0].bottomControlBar;

		this.audio = new Audio();

		//this.appWindow.firstOfClass('prev').bind( "click", function() {that.prevSong();} );
		this.play = new CUI.Button( this.appWindow.firstOfClass( 'playPause' ), function() {
			that.playPause();
		} );
		this.playGlyph = this.play.button.firstOfClass( 'play' );
		this.pauseGlyph = this.play.button.firstOfClass( 'pause' );
		this.updatePlayPauseButton();
		//this.appWindow.firstOfClass('next').bind( "click", function() {that.nextSong();} );

		this.appView[0].tab.bind( "click", function( e, touch, target ) {
			target = touch.target.isChildOfClass( "C9ListItem" );
			if( target ) {
				var file = target.getAttribute( "data-file" );
				if( file ) {
					that.choose( target, file );
				}
			}
		} );

		bottomBar.grip.bind( "click", function( e ) {
			e.stopPropagation();
			bottomBar.preventDefault();
			bottomBar.setVisibility( !that.appView[0].bottomControlBar.open );
		} );

		bottomBar.grip.addClass( "C9ProgressTrack" );

		this.nowPlaying = C9CreateElement( "span.nowPlaying" );

		this.tracking = new CUI.ProgressBar( bottomBar.grip, 0 );

		bottomBar.grip.appendChild( this.nowPlaying );

		this.albumArt = this.appWindow.firstOfClass("albumArt");
		this.refreshArt( "noArt" );

		this.request = new C9HTTPRequest( 'app/Music/list.php', function( responseText ) { // ?r=true
			that.list( responseText );
		} );

		this.loader = new Array( page.length );
		this.scroller = new Array( page.length );

		page.forEach( function( p, i ) {
			that.scroller[i] = p.scroller;
			that.loader[i] = new CUI.LoadingIndicator( p );
		} );

		this.onReflow();

		this.addEventListener( "reflow", this.onReflow );

		this.updateNowPlaying( 'No Track Playing' );

		bottomBar.setVisibility( false );

		this.postInit();
	},
	list: function( responseText ) {
		this.request = null;
		var that = this,
			page = this.appView[0].tab,
			index = responseText.indexOf( '<div>', 5 );
		index = [ 0, index, responseText.indexOf( '<div>', index + 5 ), responseText.length ];
		page.forEach( function( p, i ) {
			that.loader[i].destroy();
			that.scroller[i].setInnerHTML( responseText.substr( index[i] + 5, index[i + 1] - index[i] - 11 ) );
		} );
	},
	choose: function( listItem, file ) {
		clearTimeout( this.timeout );
		var that = this,
			playing = !this.audio.paused;
		if( playing ) {
			this.audio.pause();
			this.stopTracking();
		}

		if( this.playing !== undefined ) {
			if( listItem === this.playing ) {
				return;
			}
			this.playing.removeClass( "active" );
			this.tracking.element.style.display = "none";
		}

		( this.audio.paused ? this.playGlyph : this.pauseGlyph ).style.display = "none";
		this.loader = new CUI.LoadingIndicator( this.play.button, 1.5, "#000" );
		this.tracking.updateProgress( 0 );
		this.playing = listItem;
		listItem.className = 'C9ListItem active';
		this.updateNowPlaying( /.*\s-\s/.exec( listItem.firstOfTag( "span" ).textContent )[0] + listItem.firstOfTag( "strong" ).textContent );
		this.refreshArt( /.*\s-\s(.*)/.exec( listItem.firstOfTag( "span" ).textContent )[1] );
		this.appView[0].bottomControlBar.setVisibility( true );
		this.audio.src = '../sharedData/songs/' + file.rawURLEncode();
		function timeout() {
			if( that.audio.readyState === 4 ) {
				that.tracking.element.style.display = "block";
				that.loader.destroy();
										that.audio.play();
					that.startTracking();
									that.updatePlayPauseButton();
				that.timeout = 0;
			}
			else {
				that.timeout = setTimeout( timeout, 250 );
			}
		}
		this.timeout = setTimeout( timeout, 250 );
	},
	playPause: function() {
		if( this.playing === undefined ) {
			return;
		}
		if( this.audio.paused ) {
			this.audio.play();
			this.startTracking();
		}
		else {
			this.audio.pause();
			this.stopTracking();
		}
		this.updatePlayPauseButton();
	},
	updatePlayPauseButton: function() {
		if( this.audio.paused ) {
			this.playGlyph.style.display = "block";
			this.pauseGlyph.style.display = "none";
		}
		else {
			this.pauseGlyph.style.display = "block";
			this.playGlyph.style.display = "none";
		}
	},
	prevSong: function() {
		if( this.playing === undefined ) {
			return;
		}
		if( this.playing === this.song.length - 1 || this.audio.currentTime > 10000 ) {
			this.audio.currentTime = 0;
		}
		this.choose( this.playing + 1 );
	},
	nextSong: function() {
		if( this.playing === undefined ) {
			return;
		}
		if( this.playing === 0 ) {
			this.playPause();
			this.tracking.updateProgress( 0 );
			delete this.playing;
			return;
		}
		this.choose( this.playing - 1 );
	},
	startTracking: function() {
		if( !( this.audio.paused || this.trackInterval ) ) {
			var that = this,
				update = function() {
					that.tracking.updateProgress( that.audio.currentTime / that.audio.duration * that.tracking.max );
				};
			update();
			this.trackInterval = setInterval( update, bindNum( 16, this.audio.duration / window.innerWidth * 1000 |0, 60000 ) );
		}
	},
	stopTracking: function() {
		window.clearInterval( this.trackInterval );
		this.trackInterval = null;
	},
	refreshArt: function( album ) {
		this.albumArt.src = "../sharedData/albumArt/" + album.rawURLEncode() + ".png";
	},
	updateNowPlaying: function( text ) {
		this.nowPlaying.textContent = text;
		this.refreshNowPlaying();
	},
	refreshNowPlaying: function() {
		var left = ( this.bottomBarWidth - this.nowPlaying.cssStyle("width").toNum() + 1 ) * 0.5 |0;
		this.nowPlaying.style.maxWidth = ( this.bottomBarWidth - 2 * remSize ) + "px";
		this.nowPlaying.style.left = left + "px";
	},
	onFocus: function() {
		this.startTracking();
	},
	onBlur: function() {
		this.stopTracking();
	},
	onReflow: function() {
		this.stopTracking();
		if( !this.audio.paused ) {
			this.startTracking();
		}
		if( window.innerWidth > window.innerHeight * 0.7 ) {
			this.bottomBarWidth = window.innerHeight * 0.7 +.5|0;
			this.appView[0].bottomControlBar.element.style.margin = "0px " + ( ( window.innerWidth - this.bottomBarWidth ) / 2 |0 ) + "px";
		}
		else {
			this.bottomBarWidth = window.innerWidth;
			this.appView[0].bottomControlBar.element.style.margin = "0px";
		}
		this.appView[0].bottomControlBar.element.style.width = ( this.bottomBarWidth ) + "px";
		//this.tracking.element.parentNode.style.width = ( this.bottomBarWidth ) + "px";
		this.albumArt.style.height = this.bottomBarWidth + "px";
		this.appView[0].bottomControlBar.element.style.height = ( this.bottomBarWidth - 2 * remSize ) + "px";
		this.refreshNowPlaying();
		this.tracking.reflow();
		this.appView[0].bottomControlBar.reflow();
	},
	onQuit: function() {
		this.request && this.request.cancel();
		this.audio.pause();
		clearTimeout( this.timeout );
	}
} );
window.CUI.install( "Videos", {
	constructor: function( id ) {
		this.super.constructor.call( this, 'videos', id );

		this.video = this.appWindow.getElementsByTagName('video')[0];

		this.video.src = "app/Videos/video.mp4";
		this.loadState = 0;

		this.onReflow();

		this.addEventListener( "reflow", this.onReflow );

		var that = this;

		function timeout() {
			if( that.loadState === 0 && that.video.readyState >= 1 ) {
				that.loadState = 1;
				that.onReflow();
			}
			if( that.video.readyState === 4 ) {
										that.video.play();
					//that.play.button.innerHTML = '<svg viewBox="0 0 24 24"><path d="M4 1v22h6v-22zm10 0v22h6v-22z"/></svg>';
									that.timeout = null;
			}
			else {
				that.timeout = setTimeout( timeout, 250 );
			}
		}

		this.timeout = setTimeout( timeout, 250 );

		/*this.bind( this.video, "loadedmetadata", function() {
			this.loadState = 1;
			this.video.play();
			this.onReflow();
		} );*/

		this.bind( this.appWindow, "click", this.playPause );

		this.postInit();
	},
	playPause: function() {
		if( this.loadState < 2 ) {
			return;
		}
		if( this.video.paused ) {
			this.video.play();
			//this.play.button.innerHTML = '<svg viewBox="0 0 24 24"><path d="M4 1v22h6v-22zm10 0v22h6v-22z"/></svg>';
		}
		else {
			this.video.pause();
			//this.play.button.innerHTML = '<svg viewBox="0 0 24 24"><path d="M2 0v24l21 -12Z"/></svg>';
		}
	},
	onReflow: function() {
		if( this.loadState === 1 ) {
			this.video.width = this.video.videoWidth;
			this.video.height = this.video.videoHeight;
			//this.video.style.display = 'block';
			this.loadState = 2;
		}
		if( this.loadState === 2 ) {
			var videoWidth = this.video.videoWidth,
				videoHeight = this.video.videoHeight,
				windowWidth = window.innerWidth,
				windowHeight = window.innerHeight,
				scale = ( videoWidth / videoHeight ) > ( windowWidth / windowHeight ) ? windowWidth / videoWidth : windowHeight / videoHeight;
			this.video.style.webkitTransform = "translate3d(" + ( ( windowWidth - videoWidth * scale ) / 2 + .5 |0 ) + "px," + ( ( windowHeight - videoHeight * scale ) / 2 + .5 |0 ) + "px,0px)scale(" + scale + ")";
		}
	},
	onQuit: function() {
		this.video.pause();
	}
} );
window.CUI.install( "Reader", {
	constructor: function( id ) {
		this.super.constructor.call( this, "reader", id );

		var that = this,
			page = this.appView[0].tab;

		this.scroller = new Array( page.length );
		this.tileView = new Array( page.length );
		this.loader = new Array( page.length );
		this.request = new Array( page.length );

		page.forEach( function( p, i ) {
			that.scroller[i] = p.scroller;
			that.loader[i] = new CUI.LoadingIndicator( p );
			that.request[i] = new C9HTTPRequest( 'app/Reader/list.php?feed=' + i, function( responseText ) {
				that.loader[i].destroy();
				that.list( responseText, i );
			} );
		} );

		this.onReflow();
		this.postInit();
	},
	list: function( responseText, i ) {
		var page = this.appView[0].tab[i],
			scroller = this.scroller[i];
		this.tileView[i] = new CUI.TileView( page, JSON.parse( responseText ) );
		scroller.reflow();
		this.tileView[i].addEventListener( "reflow", function() {
			scroller.reflow();
		} );
		this.request[i] = null;
		if( this.request.isEmpty() ) {
			this.request = null;
		}
	},
	onReflow: function() {
		this.tileView.forEach( function( view ) {
			view && view.reflow();
		} );
	},
	onQuit: function() {
		this.request && this.request.forEach( function( request ) {
			request && request.cancel();
		} );
	}
} );
window.CUI.install( "Mail", {
	constructor: function( id ) {
		this.super.constructor.call( this, "mail", id );

		this.scroller = new CUI.Scroller( this.appWindow.firstOfClass( 'scroller' ) );
		this.loader = new CUI.LoadingIndicator( this.scroller.element );

		this.appView[0].bottomControlBar.setScroller( this.scroller );

		this.composeButton = new CUI.Button( this.appWindow.firstOfClass( 'compose' ) );
		this.refreshButton = new CUI.Button( this.appWindow.firstOfClass( 'refresh' ) );

		this.fetch();

		this.postInit();
	},
	fetch: function(){
		var that = this;
		this.scroller.element.style.minHeight = ( window.innerHeight - this.appView[0].bottomControlBar.element.cssStyle( 'height', true ) ) + "px";
		this.request = new C9HTTPRequest( './app/Mail/test.php', function( responseText ) {
			that.update( responseText );
		} );
	},
	update: function( resonseText ){
		var that = this;
		this.request = null;
		this.loader.destroy();
		this.loader = null;
		this.scroller.element.style.minHeight = 0;
		this.scroller.setInnerHTML( resonseText );
		function refresh( e ) {
			that.refreshButton.onTap = function(){};
			that.refreshButton.button.innerHTML = "";
			that.loader = new CUI.LoadingIndicator( that.refreshButton.button, 1.5, "rgb(70,70,70)" );
			that.fetch();
		}
		this.refreshButton.button.innerHTML = '<svg viewBox="0 0 32 32"><path d="M.65 13a16 16 0 0 1 27 -8.26l3.5 -3.5v10.56h-10.56l3.5 -3.5a10.96 10.96 0 0 0 -18.4 4.7z"/><path d="M-31.15 -19a16 16 0 0 1 27 -8.26l3.5 -3.5v10.56h-10.56l3.5 -3.5a10.96 10.96 0 0 0 -18.4 4.7z" transform="rotate(180)"/></svg>';
		this.refreshButton.onTap = refresh;
	},
	onRefresh: function(){
		this.scroller.reflow();
	},
	onQuit: function() {
		this.request && this.request.cancel();
	}
} );
window.CUI.core.load();