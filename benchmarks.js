"use strict";

const fs = require( 'fs' );
const Suite = require( 'benchmark' ).Suite;
const prettysize = require( 'prettysize' );

const FastMin = require( './lib/FastMin' );
const FastMinStream = require( './lib/FastMinStream' );

const suite = new Suite();

const html = fs.readFileSync( './benchmark resources/CUI.html' ).toString();
const css = fs.readFileSync( './benchmark resources/CUI.css' ).toString();
const js = fs.readFileSync( './benchmark resources/CUI.js' ).toString();
const json = fs.readFileSync( './benchmark resources/sftruncated.json' ).toString();

const stats = {
	"FastMin#HTML": html.length,
	"FastMin#CSS": css.length,
	"FastMin#JS": js.length,
	"FastMin#JSON": json.length
};

stats["FastMinStream#HTML"] = stats["FastMin#HTML"];

suite
.add( 'FastMin#HTML', function() {
	FastMin.HTML( html );
} )
.add( 'FastMinStream#HTML', function() {
	var stream = new FastMinStream.HTML();
	stream.write( html );
	stream.end();
} )
.add( 'FastMin#CSS', function() {
	FastMin.CSS( css );
} )
.add( 'FastMin#JS', function() {
	FastMin.JS( js );
} )
.add( 'FastMin#JSON', function() {
	FastMin.JSON( json );
} )

.on( 'cycle', function( event ) {
	const inputSize = stats[ event.target.name ];
	console.log( String( event.target ) );
	console.log( "File minified at a rate of " + prettysize( event.target.hz * inputSize >>> 0 ) + " scanned per second" );
} )

.run( { 'async': false } );