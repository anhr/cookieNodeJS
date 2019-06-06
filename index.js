/**
 * node.js version of the cookie.
 * Cookies let you store user information in web pages.
 * @see {@link https://www.w3schools.com/js/js_cookies.asp}
 *
 * @author Andrej Hristoliubov https://anhr.github.io/AboutMe/
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

export { isEnabled, set, get, remove };

/**
 * Is the cookie enabled in your web browser?
 * @returns {boolean} true if cookie enabled
 * 
 * @example
	var isCookieEnabled = cookie.isEnabled('age', 25);
 */
function isEnabled() {

	return navigator.cookieEnabled;
	//Enable cookie
	//Chrome: Settings/Show advanced settings.../Privacy/Content settings.../Cookies/Allow local data to be set

}

/**
 * Set a cookie.
 * @param {string} name cookie name.
 * @param {any} value cookie value.
 * @param {Date} [cookie_date] expiry date (in UTC time). Optional.
 * @example
	cookie.set('age', 25);
 */
function set( name, value, cookie_date ) {

	if ( !isEnabled() ) {

		consoleCookieEnabled();
		return;

	}
	value = value.toString();
	//http://ruseller.com/lessons.php?rub=28&id=593
	if ( cookie_date === undefined ) {

		cookie_date = new Date();  // Curent date and time
		cookie_date.setTime( cookie_date.getTime() + 1000 * 60 * 60 * 24 * 365 );//expiry date is one year

	}
	document.cookie = name + "=" + value + ( ( typeof settings == 'undefined' ) ? '' : settings ) + "; expires=" + cookie_date.toGMTString();

}

/**
 * Get a cookie.
 * @param {string} name cookie name.
 * @param {any} [defaultValue] cookie default value. Optional.
 * @returns {string} cookie value or defaultValue if cookie was not found.
 * @example
	var age = cookie.get('age', 25);
 */
function get( name, defaultValue ) {

	if ( !isEnabled() ) {

		consoleCookieEnabled();
		return;

	}
	//http://ruseller.com/lessons.php?rub=28&id=593
	var results = document.cookie.match( '(^|;) ?' + name + '=([^;]*)(;|$)' );

	if ( results )
		return ( unescape( results[2] ) );
	if ( typeof defaultValue == 'undefined' )
		return '';
	return defaultValue;

}

/**
 * Remove cookie
 * @param {string} name cookie name.
 */
function remove( name ) {
	if ( !isEnabled() ) {

		consoleCookieEnabled();
		return;

	}
	//http://ruseller.com/lessons.php?rub=28&id=593
	var cookie_date = new Date();  // Текущая дата и время
	cookie_date.setTime( cookie_date.getTime() - 1 );
	document.cookie = name += "=; expires=" + cookie_date.toGMTString();
}

function consoleCookieEnabled() {

	console.error( 'navigator.cookieEnabled = ' + navigator.cookieEnabled );

}
