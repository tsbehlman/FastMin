<?
	abstract class JSFastMin {
		
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
		
		const SKIP_SPACE_CHARS = ' !%&"\'()*+,-/:;<=>?[]^{|}~';
		
		public static function minify( $input ) {
			$length = strlen( $input );
			$out = '';
			$charIndex = 0;
			$c;
			$state = self::SPACE_AFTER_CHAR;
			$outCommentState = self::SPACE_AFTER_CHAR;
			
			while( $charIndex < $length ) {
				$c = $input[$charIndex++];
				
				if( $state !== self::LINE_COMMENT && $c < ' ' ) {
					$c = ' ';
				}
		
				switch( $state ) {
				case self::SINGLE_QUOTES:
					if( $c === "'" ) {
						$state = self::REGULAR;
					}
					else if( $c === "\\" ) {
						$state = self::ESCAPE_SINGLE_QUOTES;
					}
					$out .= $c;
					continue;
				case self::DOUBLE_QUOTES:
					if( $c === '"' ) {
						$state = self::REGULAR;
					}
					else if( $c === "\\" ) {
						$state = self::ESCAPE_DOUBLE_QUOTES;
					}
					$out .= $c;
					continue;
				case self::ESCAPE_SINGLE_QUOTES:
					$out .= $c;
					$state = self::SINGLE_QUOTES;
					continue;
				case self::ESCAPE_DOUBLE_QUOTES:
					$out .= $c;
					$state = self::DOUBLE_QUOTES;
					continue;
				case self::SEMICOLON:
					if( $c === ';' ) {
						continue;
					}
					else if( $c !== '}' && $c !== ' ' ) {
						$out .= ';';
					}
				case self::SPACE_BEFORE_CHAR:
					if( $state === self::SPACE_BEFORE_CHAR && strpos( self::SKIP_SPACE_CHARS, $c ) === false ) {
						$out .= ' ';
					}
				case self::SPACE_AFTER_CHAR:
					if( $c === ' ' ) {
						continue;
					}
				case self::REGULAR:
					if( $c === ';' ) {
						$state = self::SEMICOLON;
						continue;
					}
					else if( $c === '"' ) {
						$state = self::DOUBLE_QUOTES;
					}
					else if( $c === "'" ) {
						$state = self::SINGLE_QUOTES;
					}
					else if( $c === ' ' ) {
						$state = self::SPACE_BEFORE_CHAR;
						continue;
					}
					else if( $c === '/' ) {
						$outCommentState = $state;
						$state = self::SLASH;
						continue;
					}
					else if( strpos( self::SKIP_SPACE_CHARS, $c ) !== false ) {
						$state = self::SPACE_AFTER_CHAR;
					}
					else {
						$state = self::REGULAR;
					}
					$out .= $c;
					continue;
				case self::SLASH:
					if( $c === '*' ) {
						$state = self::BLOCK_COMMENT;
					}
					else if( $c === '/' ) {
						$state = self::LINE_COMMENT;
					}
					else {
						$out .= '/';
						if( $c !== ' ' ) {
							$out .= $c;
						}
						$state = $outCommentState;
					}
					continue;
				case self::BLOCK_COMMENT:
					if( $c === '*' ) {
						$state = self::STAR_IN_COMMENT;
					}
					continue;
				case self::STAR_IN_COMMENT:
					if( $c === '/' ) {
						$state = $outCommentState;
					}
					else if( $c !== '*' ) {
						$state = self::BLOCK_COMMENT;
					}
					continue;
				case self::LINE_COMMENT:
					if( $c === "\n" || $c === "\r" ) {
						$state = $outCommentState;
					}
					continue;
				}
			}
		
			return $out;
		}
	}
?>