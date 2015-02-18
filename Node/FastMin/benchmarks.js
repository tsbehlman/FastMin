"use strict";

const fs = require( 'fs' );
const Suite = require( 'benchmark' ).Suite;
const prettysize = require( 'prettysize' );

const FastMin = require( './lib/FastMin' );

const suite = new Suite();

const html = fs.readFileSync( './benchmark resources/CUI.html' ).toString();
const css = fs.readFileSync( './benchmark resources/CUI.css' ).toString();
const js = fs.readFileSync( './benchmark resources/CUI.js' ).toString();

const stats = {
	"FastMin#HTML": {
		inputLength: html.length,
		difference: html.length - FastMin.HTML( html ).length
	},
	"FastMin#CSS": {
		inputLength: css.length,
		difference: css.length - FastMin.CSS( css ).length
	},
	"FastMin#JS": {
		inputLength: js.length,
		difference: js.length - FastMin.JS( js ).length
	},
};

suite
.add( 'FastMin#HTML', function() {
	FastMin.HTML( html );
} )
.add( 'FastMin#CSS', function() {
	FastMin.CSS( css );
} )
.add( 'FastMin#JS', function() {
	FastMin.JS( js );
} )

.on( 'cycle', function( event ) {
	const results = stats[ event.target.name ];
	console.log( String( event.target ) );
	console.log( "removed " + ( results.difference / results.inputLength * 100 ).toFixed( 1 ) + "% at a rate of " + prettysize( event.target.hz * results.difference >>> 0 ) + " per second" );
} )

.run( { 'async': true } );