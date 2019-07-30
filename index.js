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

export { isEnabled, set, setObject, get, getObject, remove, defaultCookie };

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
	if ( document.cookie === '' )
		console.error( 'document.cookie is empty' );

}

/**
 * sets an object into cookie.
 * @param {string} name cookie name.
 * @param {any} object an object for saving into cookie
 */
function setObject( name, object ) {

	set( name, JSON.stringify( object ) );
/*
	var object = {};
//		options = this.options;
	Object.keys( options.optionsDefault ).forEach( function ( key ) {

		object[key] = options[key];

	} );
	if ( options.cookieObject === undefined )
		options.cookieObject = this;
	options.cookieObject.set( name, JSON.stringify( object ) );
*/

};

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
 * gets an object from cookie.
 * @param {string} name name of the object
 * @param {Object} optionsDefault returns this default object if named object is not exists in the cookie.
 * @returns an object
 */
/*
function getObject( name, objectDefault ) {

	return JSON.parse( get( name, JSON.stringify( objectDefault ) ) );

};
*/
/**
 * gets an object from cookie.
 * @param {string} name name of the object
 * @param {any} options load an object from cookie into options
 * @param {Object} optionsDefault copy to options this default object if named object is not exists in the cookie.
 */
function getObject( name, options, optionsDefault ) {

	if ( options.optionsDefault === undefined )
		options.optionsDefault = optionsDefault;
	new defaultCookie().getObject( name, options, JSON.parse( options.cookie.get( name, JSON.stringify( optionsDefault ) ) ) );
/*
	if ( !optionsDefault )
		return;//object's settings is not saving

	if ( options.cookieObject === undefined )
		options.cookieObject = options.cookie;

	options.cookieObject.options = options;
	var cookieObject = JSON.parse( options.cookieObject.get( name, JSON.stringify( options.optionsDefault ) ) );
//	var cookieObject = options.cookieObject.getObject( name, optionsDefault );
	Object.keys( options.optionsDefault ).forEach( function ( key ) {

		if ( cookieObject[key] === undefined )
			return;
		if ( typeof options.optionsDefault[key] === "object" )
			Object.keys( options.optionsDefault[key] ).forEach( function ( key2 ) {

				if ( options[key] === undefined ) options[key] = cookieObject[key];
				if ( cookieObject[key][key2] !== undefined ) {

					if ( typeof cookieObject[key][key2] === "object" )
						Object.keys( cookieObject[key][key2] ).forEach( function ( key3 ) {

							if ( options[key][key2] === undefined ) options[key][key2] = cookieObject[key][key2];
							if ( cookieObject[key][key2][key3] !== undefined )
								options[key][key2][key3] = cookieObject[key][key2][key3];

						} );
					else {

						options[key][key2] = cookieObject[key][key2];
						if ( options.commonOptions !== undefined )
							options.commonOptions[key][key2] = cookieObject[key][key2];

					}

				}

			} );
		else {

			options[key] = cookieObject[key];
			if ( options.commonOptions !== undefined )
				options.commonOptions[key] = cookieObject[key];

		}

	} );
*/
};

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

//Default cookie is not saving settings
function defaultCookie( name ) {

	this.get = function ( defaultValue ) {

		// Default cookie is not loading settings
		return defaultValue;

	};

	this.set = function () {

		// Default cookie is not saving settings

	};

	this.getObject = function ( name, options, optionsDefault ) {

		// Default cookie is not loading objects
//		return optionsDefault;
		if ( !optionsDefault )
			return;//object's settings is not saving

		if ( options.optionsDefault === undefined )
			options.optionsDefault = optionsDefault;

		if ( options.cookieObject === undefined )
			options.cookieObject = options.cookie;

		options.cookieObject.options = options;
//		var cookieObject = JSON.parse( options.cookieObject.get( name, JSON.stringify( options.optionsDefault ) ) );
		var cookieObject = optionsDefault;
		Object.keys( options.optionsDefault ).forEach( function ( key ) {

			if ( cookieObject[key] === undefined )
				return;
			if ( typeof options.optionsDefault[key] === "object" )
				Object.keys( options.optionsDefault[key] ).forEach( function ( key2 ) {

					if ( options[key] === undefined ) options[key] = cookieObject[key];
					if ( cookieObject[key][key2] !== undefined ) {

						if ( typeof cookieObject[key][key2] === "object" )
							Object.keys( cookieObject[key][key2] ).forEach( function ( key3 ) {

								if ( options[key][key2] === undefined ) options[key][key2] = cookieObject[key][key2];
								if ( cookieObject[key][key2][key3] !== undefined )
									options[key][key2][key3] = cookieObject[key][key2][key3];

							} );
						else {

							options[key][key2] = cookieObject[key][key2];
							if ( options.commonOptions !== undefined )
								options.commonOptions[key][key2] = cookieObject[key][key2];

						}

					}

				} );
			else {

				options[key] = cookieObject[key];
				if ( options.commonOptions !== undefined )
					options.commonOptions[key] = cookieObject[key];

			}

		} );

	};

	this.setObject = function () {

		// Default cookie is not saving object's settings

	};

	this.isTrue = function ( defaultValue ) {

		return defaultValue;

	};

};
