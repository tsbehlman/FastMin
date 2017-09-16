const FastMin = require( "../index.js" );
const Utils = require( "./MinifierSpecUtils" );

const SPACE = " \t\n\r\n";

function verify( style, expectedStyle ) {
	expectedStyle = expectedStyle || style;
	Utils.verifyWrapper( FastMin.CSS, style, expectedStyle );
	Utils.verifyDirectInvocation( FastMin.CSSMinifier, style, expectedStyle );
	Utils.verifyStream( FastMin.stream.CSS, style, expectedStyle );

	// verify no additional changes
	Utils.verifyWrapper( FastMin.CSS, expectedStyle, expectedStyle );
}

describe( "CSSFastMin", () => {
	it( "should be exposed on the FastMin module", () => {
		expect( FastMin.CSSMinifier ).toBeDefined();
		expect( FastMin.stream.CSS ).toBeDefined();
		expect( FastMin.CSS ).toBeDefined();
	} );
	
	it( `should strip whitespace from simple rule`, () => {
		verify( `${SPACE}a${SPACE},${SPACE}
			[${SPACE}href${SPACE}]${SPACE},
			${SPACE}:hover${SPACE},
			${SPACE}.big${SPACE},
			${SPACE}#side${SPACE}{
			${SPACE}color${SPACE}:${SPACE}#07a${SPACE};${SPACE}padding:0
			}${SPACE}`,
			"a,[href],:hover,.big,#side{color:#07a;padding:0}" );
	} );
	
	it( "should strip whitespace from media queries", () => {
		verify( `${SPACE}@media${SPACE}screen${SPACE}and${SPACE}
			(${SPACE}max-width${SPACE}:${SPACE}400px${SPACE})${SPACE},
			${SPACE}print{${SPACE}a{color:#07a}${SPACE}}`,
			"@media screen and (max-width:400px),print{a{color:#07a}}" );
	} );
	
	for( const operator of [ " ", "+", "~", ">" ] ) {
		it( `should strip whitespace from "${operator}" operator`, () => {
			verify( `a${SPACE}${operator}${SPACE}i{color:#07a}`, `a${operator}i{color:#07a}` );
		} );
	}
	
	for( const operator of [ "=", "~=", "|=", "^=", "$=", "*=" ] ) {
		it( `should strip whitespace from "${operator}" attribute operator`, () => {
			verify( `[href${SPACE}${operator}${SPACE}"test"],
				[href${SPACE}${operator}${SPACE}"test" i]{color:#07a}`,
				`[href${operator}"test"],[href${operator}"test" i]{color:#07a}` );
		} );
	}
	
	it( "should strip extraneous semicolons", () => {
		verify( "a{padding:0;;;color:#07a;}", "a{padding:0;color:#07a}" );
	} );
	
	it( "should not strip significant whitespace", () => {
		verify( `a{border:${SPACE}1${SPACE}%${SPACE}solid${SPACE}#000${SPACE};background-image:${SPACE}url(${SPACE}""${SPACE})}`, "a{border:1% solid #000;background-image:url(\"\")}" );
	} );
	
	it( "should not strip characters in double quotes", () => {
		verify( "a{background-image:url(\" \t;; !  $ % ' ( ) * + , - / : ; = > [ ] ^ { | } ~ \")}" );
	} );
	
	it( "should not strip characters in single quotes", () => {
		verify( "a{background-image:url(' \t;; !  $ % \" ( ) * + , - / : ; = > [ ] ^ { | } ~ ')}" );
	} );
	
	it( "should strip comments", () => {
		verify( `a{}/*asd*/p{}/**${SPACE}*${SPACE}/h1{}"asd"/${SPACE}*//**/b{}`, "a{}p{}b{}" );
	} );
} );