/*
 * Port of CSSFastMin by Jonathan Walsh from Java to JavaScript by Trevor Behlman
 * Additional changes to the original design also made.
 * 
 * Copyright 2010 Granule Inc.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

"use strict";

const utils = require( "./utils" );

const REGULAR =				0;
const SLASH =				1;
const COMMENT =				2;
const STAR_IN_COMMENT =		3;
const SPACE_BEFORE_CHAR =	4;
const SPACE_AFTER_CHAR =		5;
const SEMICOLON =			6;
const SINGLE_QUOTES =		7;
const DOUBLE_QUOTES =		8;

// The following are buffers of character codes created by converting a sorted
// string into a buffer.  This allows for speedy lookups later on.
const SKIP_SPACE_BEFORE_CHARS =	new Buffer( "\t\n\r !\"$%')*+,-/:;=>]^{|}~" );
const SKIP_SPACE_AFTER_CHARS =	new Buffer( "!\"'()*+,:;=>[]{}~" );

function CSSMinifier() {
	this.resetState();
}

CSSMinifier.prototype.resetState = function() {
	this.state = SPACE_AFTER_CHAR;
	this.outCommentState = SPACE_AFTER_CHAR;
};

CSSMinifier.prototype.processChar = function( c, output, outputIndex ) {
	switch( this.state ) {
	case SINGLE_QUOTES:
		if( c === 39 ) {						// 39 === "'"
			this.state = REGULAR;
		}
		output[ outputIndex++ ] = c;
		break;
	case DOUBLE_QUOTES:
		if( c === 34 ) {						// 34 === '"'
			this.state = REGULAR;
		}
		output[ outputIndex++ ] = c;
		break;
	case SEMICOLON:
		if( c === 59 ) { 					// 59 === ";"
			break;
		}
		else if( c !== 125 && c > 32 ) {		// 125 === "}" && 32 === " "
			output[ outputIndex++ ] = 59;	// 59 === ";"
		}
	case SPACE_BEFORE_CHAR:
		if( this.state === SPACE_BEFORE_CHAR && utils.sortedIndexOf( SKIP_SPACE_BEFORE_CHARS, c ) < 0 ) {
			output[ outputIndex++ ] = 32;	// 32 === " "
		}
	case SPACE_AFTER_CHAR:
		if( c <= 32 ) {						// 32 === " "
			break;
		}
	case REGULAR:
		if( c === 59 ) {	 					// 59 === ";"
			this.state = SEMICOLON;
			break;
		}
		else if( c === 39 ) {				// 39 === "'"
			this.state = SINGLE_QUOTES;
		}
		else if( c === 34 ) {				// 34 === '"'
			this.state = DOUBLE_QUOTES;
		}
		else if( utils.sortedIndexOf( SKIP_SPACE_AFTER_CHARS, c ) >= 0 ) {
			this.state = SPACE_AFTER_CHAR;
		}
		else if( c <= 32 ) {					// 32 === " "
			this.state = SPACE_BEFORE_CHAR;
			break;
		}
		else if( c === 47 ) {				// 47 === "/"
			this.outCommentState = this.state;
			this.state = SLASH;
			break;
		}
		else {
			this.state = REGULAR;
		}
		output[ outputIndex++ ] = c;
		break;
	case SLASH:
		if( c === 42 ) {						// 42 === "*"
			this.state = COMMENT;
		}
		else {
			output[ outputIndex++ ] = 47;	// 47 === "/"
			output[ outputIndex++ ] = c;
			this.state = this.outCommentState;
		}
		break;
	case COMMENT:
		if( c === 42 ) {						// 42 === "*"
			this.state = STAR_IN_COMMENT;
		}
		break;
	case STAR_IN_COMMENT:
		if( c === 47 ) {						// 47 === "/"
			this.state = this.outCommentState;
		}
		else if( c !== 42 ) {				// 42 === "*"
			this.state = COMMENT;
		}
		break;
	}

	return outputIndex;
};

module.exports = CSSMinifier;
