<?
	/*
	 * Port of CSSFastMin by Jonathan Walsh from Java to PHP by Trevor Behlman
	 * Additional changes to the original design also made.
	 * 
	 * Copyright 2010 Granule Inc.
	 * 
	 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
	 * use this file except in compliance with the License. You may obtain a copy of
	 * the License at
	 * 
	 * http://www.apache.org/licenses/LICENSE-2.0
	 * 
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
	 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
	 * License for the specific language governing permissions and limitations under
	 * the License.
	 */
	
	abstract class CSSFastMin {
		
		const REGULAR =				0;
		const SLASH =				1;
		const COMMENT =				2;
		const STAR_IN_COMMENT =		3;
		const SPACE_BEFORE_CHAR =	4;
		const SPACE_AFTER_CHAR =		5;
		const SEMICOLON =			6;
		const SINGLE_QUOTES =		7;
		const DOUBLE_QUOTES =		8;
		
		const SKIP_SPACE_BEFORE_CHARS =	'{},=~+>"]!)/';
		const SKIP_SPACE_AFTER_CHARS =	'{},=~+>"[!)(:';
		
		public static function minify( $inputStyleSheet ) {
			$length = strlen( $inputStyleSheet );
			$output = '';
			$charIndex = 0;
			$c;
			
			$state = self::SPACE_AFTER_CHAR;
			$outCommentState = self::SPACE_AFTER_CHAR;
			
			while( $charIndex < $length ) {
				$c = $inputStyleSheet[ $charIndex++ ];
	
				if( $c < ' ' ) {
					$c = ' ';
				}
	
				switch( $state ) {
				case self::SINGLE_QUOTES:
					if( $c === "'" ) {
						$state = self::REGULAR;
					}
					$output .= $c;
					continue;
				case self::DOUBLE_QUOTES:
					if( $c === '"' ) {
						$state = self::REGULAR;
					}
					$output .= $c;
					continue;
				case self::SEMICOLON:
					if( $c === ';' ) {
						continue;
					}
					else if( $c !== '}' && $c !== ' ' ) {
						$output .= ';';
					}
				case self::SPACE_BEFORE_CHAR:
					if( $state === self::SPACE_BEFORE_CHAR && strpos( self::SKIP_SPACE_BEFORE_CHARS, $c ) === false ) {
						$output .= ' ';
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
					else if( strpos( self::SKIP_SPACE_AFTER_CHARS, $c ) !== false ) {
						$state = self::SPACE_AFTER_CHAR;
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
					else {
						$state = self::REGULAR;
					}
					$output .= $c;
					continue;
				case self::SLASH:
					if( $c == '*' ) {
						$state = self::COMMENT;
					}
					else {
						$output .= '/' . $c;
						$state = $outCommentState;
					}
					continue;
				case self::COMMENT:
					if( $c == '*' ) {
						$state = self::STAR_IN_COMMENT;
					}
					continue;
				case self::STAR_IN_COMMENT:
					if( $c === '/' ) {
						$state = $outCommentState;
					}
					else if( $c !== '*' ) {
						$state = self::COMMENT;
					}
					continue;
				}
			}
	
			return $output;
		}
	}
?>