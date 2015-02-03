<?
	abstract class HTMLFastMin {
		
		const REGULAR = 0;
		const SPACE =   1;
		const QUOTES =  2;
		
		public static function minify( $input ) {
			$length = strlen( $input );
			$out = '';
			$charIndex = 0;
			$c;
			$state = self::SPACE;
			while( $charIndex < $length ) {
				$c = $input[ $charIndex++ ];
		
				if( $c < ' ' ) {
					$c = ' ';
				}
		
				switch( $state ) {
				case self::QUOTES:
					if( $c === '"' ) {
						$state = self::SPACE;
					}
					$out .= $c;
					continue;
				case self::SPACE:
					if( $c === ' ' ) {
						continue;
					}
				case self::REGULAR:
					if( $c === ' ' ) {
						$state = self::SPACE;
					}
					else if( $c === '"' ) {
						$state = self::QUOTES;
					}
					else {
						$state = self::REGULAR;
					}
					$out .= $c;
					continue;
				}
			}
		
			return $out;
		}
	}
?>