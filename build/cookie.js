/**
 * node.js version of the cookie.
 * Cookies let you store user information in web pages.
 *
 * @author Andrej Hristoliubov https://anhr.github.io/AboutMe/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.cookie = {})));
}(this, (function (exports) { 'use strict';

function isEnabled() {
	return navigator.cookieEnabled;
}
function set(name, value, cookie_date) {
	if (!isEnabled()) {
		consoleCookieEnabled();
		return;
	}
	value = value.toString();
	if (cookie_date === undefined) {
		cookie_date = new Date();
		cookie_date.setTime(cookie_date.getTime() + 1000 * 60 * 60 * 24 * 365);
	}
	document.cookie = name + "=" + value + (typeof settings == 'undefined' ? '' : settings) + "; expires=" + cookie_date.toGMTString();
	if (document.cookie === '') console.error('document.cookie is empty');
}
function setObject(name, object) {
	set(name, JSON.stringify(object));
}
function get(name, defaultValue) {
	if (!isEnabled()) {
		consoleCookieEnabled();
		return;
	}
	var results = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	if (results) return unescape(results[2]);
	if (typeof defaultValue == 'undefined') return '';
	return defaultValue;
}
function getObject(name, options, optionsDefault) {
	if (options.optionsDefault === undefined) options.optionsDefault = optionsDefault;
	new defaultCookie().getObject(name, options, JSON.parse(options.cookie.get(name, JSON.stringify(optionsDefault))));
}
function remove(name) {
	if (!isEnabled()) {
		consoleCookieEnabled();
		return;
	}
	var cookie_date = new Date();
	cookie_date.setTime(cookie_date.getTime() - 1);
	document.cookie = name += "=; expires=" + cookie_date.toGMTString();
}
function consoleCookieEnabled() {
	console.error('navigator.cookieEnabled = ' + navigator.cookieEnabled);
}
function defaultCookie(name) {
	this.get = function (defaultValue) {
		return defaultValue;
	};
	this.set = function () {
	};
	this.getObject = function (name, options, optionsDefault) {
		if (!optionsDefault) return;
		if (options.optionsDefault === undefined) options.optionsDefault = optionsDefault;
		if (options.cookieObject === undefined) options.cookieObject = options.cookie;
		options.cookieObject.options = options;
		var cookieObject = optionsDefault;
		Object.keys(options.optionsDefault).forEach(function (key) {
			if (cookieObject[key] === undefined) return;
			if (typeof options.optionsDefault[key] === "object") Object.keys(options.optionsDefault[key]).forEach(function (key2) {
				if (options[key] === undefined) options[key] = cookieObject[key];
				if (cookieObject[key][key2] !== undefined) {
					if (typeof cookieObject[key][key2] === "object") Object.keys(cookieObject[key][key2]).forEach(function (key3) {
						if (options[key][key2] === undefined) options[key][key2] = cookieObject[key][key2];
						if (cookieObject[key][key2][key3] !== undefined) options[key][key2][key3] = cookieObject[key][key2][key3];
					});else {
						options[key][key2] = cookieObject[key][key2];
						if (options.commonOptions !== undefined) options.commonOptions[key][key2] = cookieObject[key][key2];
					}
				}
			});else {
				options[key] = cookieObject[key];
				if (options.commonOptions !== undefined) options.commonOptions[key] = cookieObject[key];
			}
		});
	};
	this.setObject = function () {
	};
	this.isTrue = function (defaultValue) {
		return defaultValue;
	};
}

exports.isEnabled = isEnabled;
exports.set = set;
exports.setObject = setObject;
exports.get = get;
exports.getObject = getObject;
exports.remove = remove;
exports.defaultCookie = defaultCookie;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=cookie.js.map
