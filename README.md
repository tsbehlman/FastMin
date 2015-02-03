# Overview

A collection of speedy minifiers with linear space and time complexity for HTML, JavaScript, and CSS.  Two variants are provided: Node (via [io.js](http://github.com/iojs/io.js)) and PHP.

This library is inspired by Jonathan Walsh's [CSSFastMin](http://git.io/FX_L3w), of which my CSS minifier is a port with some added features to improve minification.

# Usage

### Node

The Node variant requires ES6 Harmony support, which is available by default in io.js.

~~~JavaScript
var FastMin = require( 'FastMin' );

var CSS = "body { font: bold 14px Helvetica }";

var minifiedCSS = FastMin.CSS( CSS );
~~~

FastMin also provides each minifier as a transform stream in the Node variant.  Both are available via the FastMin module, as described in the following example:

~~~JavaScript
var http = require( 'http' );
var fs = require( 'fs' );

http.createServer( function ( req, res ) {
  res.writeHead( 200, { 'Content-Type': 'text/html' } );
  
  var HTMLMinifier = new FastMin.stream.HTML();            // Minifier stream
  var HTMLStream = fs.createReadStream( 'index.html' );    // HTML file stream
  
  // Pipe the file through the minifier and then to the client
  HTMLStream.pipe( HTMLMinifier ).pipe( res );
} ).listen( 8888 );
~~~
### PHP

Each of these minifiers can be used as a callback function for PHP's output buffer, like so:

	<style>
		<? ob_start( 'CSSFastMin::minify' ); ?>   /* Begin minification */

		/* CSS */

		<? ob_end_flush() ?>                      /*  End minification  */
	</style>
