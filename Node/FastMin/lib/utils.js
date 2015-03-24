"use strict";

module.exports = {
	merge: function( target, source, force ) {
		if( target ) {
			let keys = Object.keys( source ),
				length = keys.length,
				i,
				property;
			
			for( i = 0; i < length; i++ ) {
				property = keys[ i ];
				if( force || target[ property ] === undefined ) {
					target[ property ] = source[ property ];
				}
			}
		}
		return target;
	},
	sortedIndexOf: function( buffer, value, nearest ) {
		let min = 0,
			max = buffer.length,
			pivot = min + ( max - min >>> 1 ),
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
			pivot = min + ( max - min >>> 1 );
		}
		return ( max >= min && currentItem === value ) || nearest ? pivot : -1;
	},
	insertSorted: function( buffer, value ) {
		let index = buffer.sortedIndexOf( number, true );
		
		if( buffer[index] < number ) {
			index++;
		}
		
		buffer.copy( buffer, index, index + 1 );
		buffer[index] = number;
		
		return index;
	}
};