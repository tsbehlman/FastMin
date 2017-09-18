"use strict";

const REGULAR =				0;
const SLASH =				1;
const LINE_COMMENT =			2;
const BLOCK_COMMENT =		3;
const STAR_IN_COMMENT =		4;
const SPACE_BEFORE_CHAR =	5;
const SPACE_AFTER_CHAR =		6;
const SEMICOLON =			7;
const SINGLE_QUOTES =		8;
const ESCAPE_SINGLE_QUOTES =	9;
const DOUBLE_QUOTES =		10;
const ESCAPE_DOUBLE_QUOTES =	11;

const SKIP_SPACE_CHARS = new Set( new Buffer( " !%&'\"()*+,-/:;<=>?[]^{|}~" ) );

function JSMinifier() {
	this.resetState();
}

JSMinifier.prototype.resetState = function() {
	this.state = SPACE_AFTER_CHAR;
	this.outCommentState = SPACE_AFTER_CHAR;
};

JSMinifier.prototype.processChar = function( c, output, outputIndex ) {
	switch( this.state ) {
	case SINGLE_QUOTES:
		if( c === 39 ) {							// 39 === "'"
			this.state = REGULAR;
		}
		else if( c === 92 ) {					// 92 === "\\"
			this.state = ESCAPE_SINGLE_QUOTES;
		}
		output[ outputIndex++ ] = c;
		break;
	case DOUBLE_QUOTES:
		if( c === 34 ) {							// 34 === '"'
			this.state = REGULAR;
		}
		else if( c === 92 ) {					// 92 === "\\"
			this.state = ESCAPE_DOUBLE_QUOTES;
		}
		output[ outputIndex++ ] = c;
		break;
	case ESCAPE_SINGLE_QUOTES:
		output[ outputIndex++ ] = c;
		this.state = SINGLE_QUOTES;
		break;
	case ESCAPE_DOUBLE_QUOTES:
		output[ outputIndex++ ] = c;
		this.state = DOUBLE_QUOTES;
		break;
	case SEMICOLON:
		if( c === 59 ) {							// 59 === ";"
			break;
		}
		else if( c !== 125 && c > 32 ) {			// 125 === "}" && 32 === " "
			output[ outputIndex++ ] = 59;		// 59 === ";"
		}
	case SPACE_BEFORE_CHAR:
		if( this.state === SPACE_BEFORE_CHAR && !SKIP_SPACE_CHARS.has( c ) < 0 ) {
			output[ outputIndex++ ] = 32;		// 32 === " "
		}
	case SPACE_AFTER_CHAR:
		if( c <= 32 ) {							// 32 === " "
			break;
		}
	case REGULAR:
		if( c === 59 ) {							// 59 === ";"
			this.state = SEMICOLON;
			break;
		}
		else if( c === 34 ) {					// 34 === '"'
			this.state = DOUBLE_QUOTES;
		}
		else if( c === 39 ) {					// 39 === "'"
			this.state = SINGLE_QUOTES;
		}
		else if( c <= 32 ) {						// 32 === " "
			this.state = SPACE_BEFORE_CHAR;
			break;
		}
		else if( c === 47 ) {					// 47 === "/"
			this.outCommentState = this.state;
			this.state = SLASH;
			break;
		}
		else if( SKIP_SPACE_CHARS.has( c ) ) {
			this.state = SPACE_AFTER_CHAR;
		}
		else {
			this.state = REGULAR;
		}
		output[ outputIndex++ ] = c;
		break;
	case SLASH:
		if( c === 42 ) {							// 42 === "*"
			this.state = BLOCK_COMMENT;
		}
		else if( c === 47 ) {					// 47 === "/"
			this.state = LINE_COMMENT;
		}
		else {
			output[ outputIndex++ ] = 47;		// 47 === "/"
			if( c !== 32 ) {						// 32 === " "
				output[ outputIndex++ ] = c;
			}
			this.state = this.outCommentState;
		}
		break;
	case BLOCK_COMMENT:
		if( c === 42 ) {							// 42 === "*"
			this.state = STAR_IN_COMMENT;
		}
		break;
	case STAR_IN_COMMENT:
		if( c === 47 ) {							// 47 === "/"
			this.state = this.outCommentState;
		}
		else if( c !== 42 ) {					// 42 === "*"
			this.state = BLOCK_COMMENT;
		}
		break;
	case LINE_COMMENT:
		if( c === 10 || c === 13 ) {				// 10 === "\n" && 13 === "\r"
			this.state = this.outCommentState;
		}
		break;
	}
	return outputIndex;
};

module.exports = JSMinifier;
