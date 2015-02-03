"use strict";

const HTMLMinifier = require( './HTMLMinifier' );
const CSSMinifier = require( './CSSMinifier' );
const JSMinifier = require( './JSMinifier' );

function minify( input ) {
	const length = input.length;
	const output = new Buffer( length );
	let inputIndex = 0;
	let outputIndex = 0;
	
	this.initialize();
	
	while( inputIndex < length ) {
		outputIndex = this.processChar( input.charCodeAt( inputIndex++ ), output, outputIndex );
	}
	
	return output.toString( 'utf8', 0, outputIndex );
}

module.exports.HTML = function( input ) {
	return minify.call( HTMLMinifier, input );
};
module.exports.CSS = function( input ) {
	return minify.call( CSSMinifier, input );
};
module.exports.JS = function( input ) {
	return minify.call( JSMinifier, input );
};