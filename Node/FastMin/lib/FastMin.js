"use strict";

const HTMLMinifier = require( "./HTMLMinifier" );
const CSSMinifier = require( "./CSSMinifier" );
const JSMinifier = require( "./JSMinifier" );

function minify( input ) {
	const length = input.length;
	const output = new Buffer( length );
	let inputIndex = 0;
	let outputIndex = 0;
	
	while( inputIndex < length ) {
		outputIndex = this.processChar( input.charCodeAt( inputIndex++ ), output, outputIndex );
	}
	
	return output.toString( "utf8", 0, outputIndex );
}

module.exports.HTML = function( input ) {
	return minify.call( new HTMLMinifier(), input );
};
module.exports.CSS = function( input ) {
	return minify.call( new CSSMinifier(), input );
};
module.exports.JS = function( input ) {
	return minify.call( new JSMinifier(), input );
};

module.exports.HTMLMinifier = HTMLMinifier;
module.exports.CSSMinifier = CSSMinifier;
module.exports.JSMinifier = JSMinifier;
