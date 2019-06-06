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

exports.isEnabled = isEnabled;
exports.set = set;
exports.get = get;
exports.remove = remove;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=cookie.js.map
