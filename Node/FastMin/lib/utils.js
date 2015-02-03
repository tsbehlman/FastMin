"use strict";

module.exports = {
	merge: function( target, source ) {
		if( target ) {
			for( let property in source ) {
				target[ property ] = source[ property ];
			}
		}
		return target;
	},
	contains: function( buffer, value ) {
		let i = buffer.length;
		while( i-- ) {
			if( buffer[ i ] === value ) {
				return true;
			}
		}
		return false;
	},
	sortedIndexOf: function( buffer, value, nearest ) {
		var min = 0,
			max = buffer.length,
			pivot = min + ( max - min + 1 ) * .5 |0,
			currentItem;
		while( max >= min ) {
			currentItem = buffer[ pivot ];
			if( currentItem === value ) {
				break;
			}
			else if( currentItem < value ) {
				min = pivot + 1;
			}
			else {
				max = pivot - 1;
			}
			pivot = min + ( max - min ) * .5 |0;
		}
		return ( max >= min && currentItem === value ) || nearest ? pivot : -1;
	},
	insertSorted: function( buffer, value ) {
		var index = buffer.sortedIndexOf( number, true );
		if( buffer[index] < number ) {
			index++;
		}
		buffer.copy( buffer, index, index + 1 );
		buffer[index] = number;
		return index;
	}
	/*function( buffer, value ) {
		let length = buffer.length;
		let c;
		for( let i = 0; i < length; i++ ) {
			c = buffer[i];
			if( buffer[ i ] === value ) {
				return true;
			}
			else if( c > value ) {
				return false;
			}
		}
		return false;
	}*/
};