/**
 * node.js version of the cookie.
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
import { set as setCookie, get as getCookie, getObject, setObject, defaultCookie } from './index.js';
var cookie = {

	set: setCookie,
	setObject: setObject,
	get: getCookie,
	getObject: getObject,
	defaultCookie: defaultCookie,

}

export default cookie;