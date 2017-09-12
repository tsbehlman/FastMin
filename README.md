# Overview

A collection of speedy minifiers for HTML, JavaScript, and CSS.

This library is inspired by Jonathan Walsh's [CSSFastMin](http://git.io/FX_L3w), of which my CSS minifier is a port with some modifications of my own.

# Usage

### Node

~~~JavaScript
const FastMin = require( 'FastMin' );

const CSS = "body { font: bold 14px Helvetica; }";

let minifiedCSS = FastMin.CSS( CSS );
~~~

FastMin also provides each minifier as a transform stream.  Both are available via the FastMin module:

~~~JavaScript
const http = require( 'http' );
const fs = require( 'fs' );

http.createServer( function ( req, res ) {
  res.writeHead( 200, { 'Content-Type': 'text/html' } );
  
  const HTMLMinifier = new FastMin.stream.HTML();            // Minifier stream
  const HTMLStream = fs.createReadStream( 'index.html' );    // HTML file stream
  
  // Pipe the file through the minifier and then to the client
  HTMLStream.pipe( HTMLMinifier ).pipe( res );
} ).listen( 8888 );
~~~