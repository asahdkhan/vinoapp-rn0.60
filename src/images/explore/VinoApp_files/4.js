webpackJsonp([4],{

/***/ "./node_modules/axios/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("./node_modules/axios/lib/utils.js");
var settle = __webpack_require__("./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__("./node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__("./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__("./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__("./node_modules/axios/lib/core/createError.js");
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__("./node_modules/axios/lib/helpers/btoa.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("development" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__("./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("./node_modules/axios/lib/utils.js");
var bind = __webpack_require__("./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__("./node_modules/axios/lib/core/Axios.js");
var defaults = __webpack_require__("./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__("./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__("./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__("./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__("./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__("./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__("./node_modules/axios/lib/defaults.js");
var utils = __webpack_require__("./node_modules/axios/lib/utils.js");
var InterceptorManager = __webpack_require__("./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__("./node_modules/axios/lib/core/dispatchRequest.js");
var isAbsoluteURL = __webpack_require__("./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__("./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  config.method = config.method.toLowerCase();

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__("./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__("./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__("./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__("./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__("./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__("./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__("./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__("./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__("./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/btoa.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("./node_modules/axios/lib/utils.js");

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__("./node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__("./node_modules/axios/node_modules/is-buffer/index.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/axios/node_modules/is-buffer/index.js":
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-2!./node_modules/sass-loader/lib/loader.js??ref--1-3!./node_modules/less-loader/dist/cjs.js??ref--1-4!./src/components/GroupButton/GroupButton.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".group-button-component{margin-bottom:30px}.group-button-component h4{margin-bottom:5px}.group-button-component .ant-btn-group{display:-ms-flexbox;display:flex}.group-button-component .ant-btn-group .ant-btn{-ms-flex:1;flex:1}", "", {"version":3,"sources":["/Users/azularc/AZULARC DEV/PROJETCS/vinoapp.repos/web/src/components/GroupButton/src/components/GroupButton/GroupButton.scss"],"names":[],"mappings":"AAAA,wBACE,kBAAmB,CACpB,AACD,2BACE,iBAAkB,CACnB,AACD,uCACE,oBAAa,AAAb,YAAa,CACd,AACD,gDACE,WAAO,AAAP,MAAO,CACR","file":"GroupButton.scss","sourcesContent":[".group-button-component {\n  margin-bottom: 30px;\n}\n.group-button-component h4 {\n  margin-bottom: 5px;\n}\n.group-button-component .ant-btn-group {\n  display: flex;\n}\n.group-button-component .ant-btn-group .ant-btn {\n  flex: 1;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-2!./node_modules/sass-loader/lib/loader.js??ref--1-3!./node_modules/less-loader/dist/cjs.js??ref--1-4!./src/components/MultiSelector/MultiSelect.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".multi-select-component{margin-bottom:30px}.multi-select-component h4{margin-bottom:5px;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}.multi-select-component .switcher span{margin-right:5px;font-size:10px}.multi-select-component .ant-select:after{content:\"\";position:absolute;right:12px;top:10px;width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #34a06a}.multi-select-component .ant-select:hover:after{display:none}", "", {"version":3,"sources":["/Users/azularc/AZULARC DEV/PROJETCS/vinoapp.repos/web/src/components/MultiSelector/src/components/MultiSelector/MultiSelect.scss"],"names":[],"mappings":"AAAA,wBACE,kBAAmB,CACpB,AACD,2BACE,kBAAkB,AAClB,oBAAa,AAAb,aAAa,AACb,sBAA8B,AAA9B,6BAA8B,CAC/B,AACD,uCACE,iBAAiB,AACjB,cAAe,CAChB,AACD,0CACE,WAAW,AACX,kBAAkB,AAClB,WAAW,AACX,SAAS,AACT,QAAQ,AACR,SAAS,AACT,kCAAkC,AAClC,mCAAmC,AACnC,4BAA6B,CAC9B,AACD,gDACE,YAAa,CACd","file":"MultiSelect.scss","sourcesContent":[".multi-select-component {\n  margin-bottom: 30px;\n}\n.multi-select-component h4 {\n  margin-bottom: 5px;\n  display: flex;\n  justify-content: space-between;\n}\n.multi-select-component .switcher span {\n  margin-right: 5px;\n  font-size: 10px;\n}\n.multi-select-component .ant-select:after {\n  content: '';\n  position: absolute;\n  right: 12px;\n  top: 10px;\n  width: 0;\n  height: 0;\n  border-left: 5px solid transparent;\n  border-right: 5px solid transparent;\n  border-top: 5px solid #34a06a;\n}\n.multi-select-component .ant-select:hover:after {\n  display: none;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-2!./node_modules/sass-loader/lib/loader.js??ref--1-3!./node_modules/less-loader/dist/cjs.js??ref--1-4!./src/components/RangeSelector/RangeSelector.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".range-selector-component{margin-bottom:30px}.range-selector-component h4{margin-bottom:5px}.range-selector-component .ant-slider-rail{background-color:#ccc}", "", {"version":3,"sources":["/Users/azularc/AZULARC DEV/PROJETCS/vinoapp.repos/web/src/components/RangeSelector/src/components/RangeSelector/RangeSelector.scss"],"names":[],"mappings":"AAAA,0BACE,kBAAmB,CACpB,AACD,6BACE,iBAAkB,CACnB,AACD,2CACE,qBAAsB,CACvB","file":"RangeSelector.scss","sourcesContent":[".range-selector-component {\n  margin-bottom: 30px;\n}\n.range-selector-component h4 {\n  margin-bottom: 5px;\n}\n.range-selector-component .ant-slider-rail {\n  background-color: #CCC;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-2!./node_modules/sass-loader/lib/loader.js??ref--1-3!./node_modules/less-loader/dist/cjs.js??ref--1-4!./src/components/TagSelector/TagSelector.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".tag-selector-component{margin-bottom:30px}.tag-selector-component h4{margin-bottom:5px}.tag-selector-component .options{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.tag-selector-component .ant-btn{margin-right:10px;margin-bottom:10px;-ms-flex:1;flex:1;min-width:33%}", "", {"version":3,"sources":["/Users/azularc/AZULARC DEV/PROJETCS/vinoapp.repos/web/src/components/TagSelector/src/components/TagSelector/TagSelector.scss"],"names":[],"mappings":"AAAA,wBACE,kBAAmB,CACpB,AACD,2BACE,iBAAkB,CACnB,AACD,iCACE,oBAAa,AAAb,aAAa,AACb,mBAAe,AAAf,cAAe,CAChB,AACD,iCACE,kBAAkB,AAClB,mBAAmB,AACnB,WAAO,AAAP,OAAO,AACP,aAAc,CACf","file":"TagSelector.scss","sourcesContent":[".tag-selector-component {\n  margin-bottom: 30px;\n}\n.tag-selector-component h4 {\n  margin-bottom: 5px;\n}\n.tag-selector-component .options {\n  display: flex;\n  flex-wrap: wrap;\n}\n.tag-selector-component .ant-btn {\n  margin-right: 10px;\n  margin-bottom: 10px;\n  flex: 1;\n  min-width: 33%;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-2!./node_modules/sass-loader/lib/loader.js??ref--1-3!./node_modules/less-loader/dist/cjs.js??ref--1-4!./src/routes/Home/components/HomeView.scss":
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__("./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".home-view .section2,.home-view .section3,.home-view .section4,.home-view .section5,.regularSection{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;padding:30px;position:relative}@media screen and (min-width:768px){.home-view .section2,.home-view .section3,.home-view .section4,.home-view .section5,.regularSection{padding:30px 15%}}@media screen and (min-width:1024px){.home-view .section2,.home-view .section3,.home-view .section4,.home-view .section5,.regularSection{padding:10% 30px}}.home-view .section2 h2,.home-view .section3 h2,.home-view .section4 h2,.home-view .section5 h2,.regularSection h2{color:#6a104a;font-size:36px;line-height:38px;letter-spacing:-1px;text-align:center;margin-bottom:20px;text-transform:uppercase}@media screen and (min-width:1024px){.home-view .section2 h2,.home-view .section3 h2,.home-view .section4 h2,.home-view .section5 h2,.regularSection h2{font-size:60px;line-height:62px}}.home-view .section2 h3,.home-view .section3 h3,.home-view .section4 h3,.home-view .section5 h3,.regularSection h3{color:#666;font-size:20px;line-height:22px;margin-bottom:20px;font-weight:700;text-align:center}@media screen and (min-width:1024px){.home-view .section2 h3,.home-view .section3 h3,.home-view .section4 h3,.home-view .section5 h3,.regularSection h3{font-size:36px;line-height:38px}}.home-view .section2 p,.home-view .section3 p,.home-view .section4 p,.home-view .section5 p,.regularSection p{color:#666;font-size:15px;text-align:center}@media screen and (min-width:1024px){.home-view .section2 p,.home-view .section3 p,.home-view .section4 p,.home-view .section5 p,.regularSection p{max-width:1024px;font-size:18px;line-height:20px}}@media screen and (min-width:1024px){.home-view .section2 .items-wrapper,.home-view .section3 .items-wrapper,.home-view .section4 .items-wrapper,.home-view .section5 .items-wrapper,.regularSection .items-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:baseline;align-items:baseline}}.home-view .section2 .item-wrapper,.home-view .section3 .item-wrapper,.home-view .section4 .item-wrapper,.home-view .section5 .item-wrapper,.regularSection .item-wrapper{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;margin-bottom:10px}@media screen and (min-width:1024px){.home-view .section2 .item-wrapper,.home-view .section3 .item-wrapper,.home-view .section4 .item-wrapper,.home-view .section5 .item-wrapper,.regularSection .item-wrapper{margin:0 20px;width:33.3333%}}.home-view .section2 .item-wrapper .image,.home-view .section3 .item-wrapper .image,.home-view .section4 .item-wrapper .image,.home-view .section5 .item-wrapper .image,.regularSection .item-wrapper .image{margin:30px 0}.home-view .section2 .item-wrapper h4,.home-view .section3 .item-wrapper h4,.home-view .section4 .item-wrapper h4,.home-view .section5 .item-wrapper h4,.regularSection .item-wrapper h4{font-family:Montserrat,sans-serif;font-weight:700;font-size:15px;text-transform:uppercase;color:#6a104a;margin-bottom:10px;text-align:center}.home-view .section2 .item-wrapper p,.home-view .section3 .item-wrapper p,.home-view .section4 .item-wrapper p,.home-view .section5 .item-wrapper p,.regularSection .item-wrapper p{font-size:15px}.home-view .section2 a,.home-view .section2 button,.home-view .section3 a,.home-view .section3 button,.home-view .section4 a,.home-view .section4 button,.home-view .section5 a,.home-view .section5 button,.regularSection a,.regularSection button{background-color:#6a104a;color:#fff;font-size:12px;font-weight:700;text-transform:uppercase;padding:6px 12px;border-radius:30px;border:1px solid #6a104a;margin-top:5px;cursor:pointer;outline:none;transition:all .2s ease-in-out;text-align:center}@media screen and (min-width:1024px){.home-view .section2 a:hover,.home-view .section2 button:hover,.home-view .section3 a:hover,.home-view .section3 button:hover,.home-view .section4 a:hover,.home-view .section4 button:hover,.home-view .section5 a:hover,.home-view .section5 button:hover,.regularSection a:hover,.regularSection button:hover{color:#6a104a;background-color:transparent;border:1px solid #6a104a}}.home-view{background-color:#fff;margin-top:-40px}.home-view .top{width:100%;min-height:280px;padding:30px;margin-bottom:30px}.home-view .top .top-content{margin:auto;max-width:990px}.home-view .top h1{color:#fff;text-align:center}@media screen and (max-width:1024px){.home-view .top .gutter-row{width:33.33%}.home-view .top .gutter-row:last-child{width:100%;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}}@media screen and (max-width:680px){.home-view .top .gutter-row{width:100%;margin-bottom:30px}.home-view .top .gutter-row:last-child{margin-bottom:0;margin-top:-35px}.home-view .top .gutter-row:last-child .ant-btn{margin-top:0}.home-view .top .gutter-row .ant-input-search{max-width:100%}}.home-view .top .search-field{max-width:400px;margin:0 auto;display:block;height:48px}.home-view .top .switcher{display:none}.home-view .top .multi-select-component{margin-bottom:0}.home-view .top .ant-select{height:48px}.home-view .top .ant-select:after{top:22px}.home-view .top .ant-select .ant-select-selection,.home-view .top .ant-select .ant-select-selection .ant-select-selection__rendered{height:48px}.home-view .top .ant-select .ant-select-selection-selected-value{height:100%;display:-ms-flexbox!important;display:flex!important;-ms-flex-align:center;align-items:center}.home-view .top .ant-select .ant-select-search{height:36px}.home-view .top .ant-select ul{min-height:42px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.home-view .article-image{height:200px;background-size:cover;background-position:50%}.home-view .article-card{padding:10px 16px}.home-view .article-card h3{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:15px}.home-view .article-card p{font-size:13px;color:#999;display:block;display:-webkit-box;max-width:400px;height:39px;margin:5px auto 10px;line-height:1;-webkit-line-clamp:3;overflow:hidden;text-overflow:ellipsis;position:relative}.home-view .article-card p:after{content:\"...\";position:absolute;top:26px;right:6px}.home-view .banner-txt{padding-right:70px;color:#666}@media screen and (max-width:520px){.home-view .banner-txt{padding-right:0}}.home-view .banner-txt h1{font-size:50px;line-height:52px;margin-bottom:35px}@media screen and (max-width:520px){.home-view .banner-txt h1{font-size:36px;line-height:40px}}.home-view .banner-txt h3{font-size:30px;font-weight:700}.home-view .banner-txt p{margin:30px 0;font-size:15px;padding-right:30px}.home-view h1,.home-view h3,.home-view p{color:#fff}.home-view .section0{background:url(" + escape(__webpack_require__("./src/routes/Home/assets/background.jpg")) + ") no-repeat 50%;background-attachment:fixed;background-size:cover}.home-view .section0 .container{padding:0 30px}.home-view .section0 .container>div{display:-ms-flexbox;display:flex}.home-view .section0 .content{width:100%}@media screen and (min-width:768px){.home-view .section0 .content{width:50%}}.home-view .section0 .content .banner-txt{margin:30px 0}@media screen and (min-width:768px){.home-view .section0 .content .banner-txt{padding-right:0}}.home-view .section0 .image{display:none;line-height:0}@media screen and (min-width:768px){.home-view .section0 .image{display:block;width:50%}}.home-view .section1{background-color:#6a104a;padding:30px}@media screen and (min-width:1024px){.home-view .section1{padding:10% 30px}}@media screen and (min-width:1024px){.home-view .section1 .content-wrapper{display:-ms-flexbox;display:flex;max-width:1200px;margin:0 auto}}.home-view .section1 .left{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center}@media screen and (min-width:1024px){.home-view .section1 .left{margin-right:30px}}.home-view .section1 h2{font-size:36px;line-height:40px;letter-spacing:-1px;color:#fff;margin:20px 0;font-weight:600}@media screen and (min-width:768px){.home-view .section1 h2{font-size:60px;line-height:64px}}.home-view .section1 h3{font-family:Montserrat,sans-serif;font-size:18px;color:#fff;margin-top:10px;margin-bottom:10px;line-height:24px}.home-view .section1 .btn-link-wrapper{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}@media screen and (min-width:768px){.home-view .section1 .btn-link-wrapper{-ms-flex-direction:row;flex-direction:row}}.home-view .section1 .btn-link-wrapper .btn-link{display:block;width:223px;height:59px;background-repeat:no-repeat;background-position:50%;background-size:contain;transition:all .4s ease-in-out}@media screen and (min-width:768px){.home-view .section1 .btn-link-wrapper .btn-link{margin:0 20px}}.home-view .section1 .btn-link-wrapper .btn-link:hover{transform:scale(1.04)}.home-view .section1 ul{margin-top:40px}.home-view .section1 ul li{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;font-family:Montserrat,sans-serif;font-size:14px;line-height:20px;color:#fff;text-transform:uppercase;border-top:1px solid #823b6a;background:url(" + escape(__webpack_require__("./src/routes/Home/assets/check.svg")) + ") no-repeat 0;background-size:20px;padding:5px 0 5px 30px;min-height:40px}.home-view .section1 ul li:last-of-type{border-bottom:1px solid #823b6a}.home-view .section2.show .section2PopUp{opacity:1;left:0;pointer-events:auto}.home-view .section2 .section2PopUp{position:absolute;top:0;left:-100%;width:100%;height:100%;background-color:#fffcf4;color:#6a104a;padding:30px;opacity:0;pointer-events:none;transition:opacity .35s,left .35s;z-index:1}.home-view .section2 .section2PopUp .arrow{position:absolute;outline:none;border:none;width:20px;height:20px;background:url(" + escape(__webpack_require__("./src/routes/Home/assets/arrow.svg")) + ") no-repeat 50%;background-size:20px;cursor:pointer;top:10px;left:10px;padding:20px}@media screen and (min-width:768px){.home-view .section2 .section2PopUp .arrow{width:40px;height:40px;top:20px;left:20px;background-size:40px}}.home-view .section2 .section2PopUp h2{text-transform:none;font-size:24px;line-height:26px;font-weight:700;margin-bottom:20px}@media screen and (min-width:1024px){.home-view .section2 .section2PopUp h2{font-size:60px;line-height:62px}}.home-view .section2 .section2PopUp .article-wrapper{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;background-color:#fffcf4}@media screen and (min-width:768px){.home-view .section2 .section2PopUp .article-wrapper{-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap}}@media screen and (min-width:768px){.home-view .section2 .section2PopUp article{width:50%}}@media screen and (min-width:768px){.home-view .section2 .section2PopUp article:first-of-type{padding-right:15px}}@media screen and (min-width:768px){.home-view .section2 .section2PopUp article:nth-of-type(2){padding-left:15px}}@media screen and (min-width:768px){.home-view .section2 .section2PopUp article:last-of-type{width:100%}}.home-view .section2 .section2PopUp article h3{font-size:18px;color:#6a104a;text-transform:uppercase;font-weight:700;font-family:Montserrat,sans-serif;text-align:left;margin:10px 0 20px}.home-view .section2 .section2PopUp article h4{font-size:14px;color:#6a104a;text-transform:uppercase;font-weight:700;font-family:Montserrat,sans-serif;margin-bottom:10px}.home-view .section2 .section2PopUp article p{font-family:Montserrat,sans-serif;text-align:left;margin-bottom:20px}.home-view .section2 .section2PopUp article ul{margin-bottom:20px}.home-view .section2 .section2PopUp article ul li{color:#333}.home-view .section2 .section2PopUp article ul li.star{margin-bottom:10px}@media screen and (min-width:768px){.home-view .section2 .section2PopUp article ul li.star{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;margin-bottom:5px;white-space:nowrap}}.home-view .section2 .section2PopUp article ul li em{color:#6a104a;font-family:Montserrat,sans-serif;font-style:normal;margin-right:.5em}.home-view .section2 .section2PopUp article ul li i{display:inline-block;width:15px;height:15px;background:url(" + escape(__webpack_require__("./src/routes/Home/assets/star.svg")) + ") no-repeat 50%;background-size:15px}.home-view .section2 .section2PopUp article ul li .star-copy{display:block}@media screen and (min-width:768px){.home-view .section2 .section2PopUp article ul li .star-copy{display:inline-block}}.home-view .section2 .section2PopUp article ul li>div{display:inline-block}@media screen and (min-width:768px){.home-view .section2 .section2PopUp article ul li>div{min-width:85px}}.home-view .section2 .section2PopUp article .image{width:100%;height:auto;min-height:1px;margin-bottom:10px;max-width:400px}.home-view .section3{background-color:#fffcf4}.home-view .section3 .items-wrapper{margin-bottom:20px}@media screen and (min-width:1024px){.home-view .section3 .items-wrapper{margin-bottom:40px}}.home-view .section3 .item-wrapper .title-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;margin-right:auto;margin-bottom:10px}.home-view .section3 .item-wrapper i{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;background-color:#6a104a;color:#fff;border-radius:50%;width:50px;height:50px;min-width:50px;min-height:50px;font-family:GothamRounded-Book,sans-serif;font-size:28px;font-style:normal;font-weight:700;margin-right:10px}.home-view .section3 .item-wrapper h4{font-size:18px;line-height:20px;text-align:left;margin-bottom:0}@media screen and (min-width:1024px){.home-view .section3 .item-wrapper h4{font-size:24px;line-height:26px}}.home-view .section3 .item-wrapper p{text-align:left;padding-left:60px;margin-right:auto}.home-view .section3 a{padding:12px 20px}@media screen and (min-width:1024px){.home-view .section3 a{font-size:18px;line-height:20px}}.home-view .section4,.home-view .section5{background-color:#6a104a;padding:80px 30px}@media screen and (min-width:768px){.home-view .section4,.home-view .section5{padding:80px 15%}}.home-view .section4 h2,.home-view .section5 h2{color:#fff;text-transform:none}@media screen and (min-width:768px){.home-view .section4 h2,.home-view .section5 h2{font-size:60px;line-height:62px}}.home-view .section4 form,.home-view .section5 form{width:100%;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center}.home-view .section4 input,.home-view .section5 input{font-family:GothamRounded-Medium,sans-serif;font-size:18px;width:100%;max-width:650px;outline:none;border:none;border-bottom:1px solid #fff;padding:5px;background:transparent;color:#fff;text-align:center;margin-bottom:40px}@media screen and (min-width:768px){.home-view .section4 input,.home-view .section5 input{font-size:32px;padding:10px}}.home-view .section4 button,.home-view .section5 button{display:block;margin:0 auto;font-size:18px;line-height:18px;cursor:pointer;border-radius:30px;border:1px solid #fff;background-color:#fff;color:#6a104a;padding:12px 60px;transition:all .2s ease-in-out;font-family:Montserrat,sans-serif;font-weight:400}@media screen and (min-width:1024px){.home-view .section4 button:hover,.home-view .section5 button:hover{border:1px solid #fff;padding:12px 70px;color:#fff;background-color:transparent}}.home-view .section5{background-color:#111}.home-view .section5 input{font-family:Montserrat,sans-serif;height:46px;font-size:14px;background-color:#fff;text-align:left;border:none;border-radius:3px;margin-bottom:10px;padding:0 20px;color:#000}.home-view .section5 input:last-of-type{margin-bottom:30px}.home-view .section5 button{border:1px solid #6a104a;background-color:#6a104a;color:#fff}@media screen and (min-width:1024px){.home-view .section5 button:hover{border:1px solid #f7efdf;background-color:#f7efdf;color:#6a104a}}.home-view .embed-container{position:relative;padding-bottom:56.25%;overflow:hidden;max-width:100%;width:100%;height:auto}.home-view .embed-container embed,.home-view .embed-container iframe,.home-view .embed-container object{position:absolute;top:0;left:0;width:100%;height:100%}.home-view iframe{border:none}#fp-nav.right{right:10px}#fp-nav ul li a span,.fp-slidesNav ul li a span{background:#ecc897;box-shadow:0 1px 1px rgba(0,0,0,.3)}", "", {"version":3,"sources":["/Users/azularc/AZULARC DEV/PROJETCS/vinoapp.repos/web/src/routes/Home/components/src/routes/Home/components/HomeView.scss"],"names":[],"mappings":"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","file":"HomeView.scss","sourcesContent":[".regularSection {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 30px;\n  position: relative;\n}\n@media screen and (min-width: 768px) {\n  .regularSection {\n    padding: 30px 15%;\n  }\n}\n@media screen and (min-width: 1024px) {\n  .regularSection {\n    padding: 10% 30px;\n  }\n}\n.regularSection h2 {\n  color: #6a104a;\n  font-size: 36px;\n  line-height: 38px;\n  letter-spacing: -1px;\n  text-align: center;\n  margin-bottom: 20px;\n  text-transform: uppercase;\n}\n@media screen and (min-width: 1024px) {\n  .regularSection h2 {\n    font-size: 60px;\n    line-height: 62px;\n  }\n}\n.regularSection h3 {\n  color: #666;\n  font-size: 20px;\n  line-height: 22px;\n  margin-bottom: 20px;\n  font-weight: bold;\n  text-align: center;\n}\n@media screen and (min-width: 1024px) {\n  .regularSection h3 {\n    font-size: 36px;\n    line-height: 38px;\n  }\n}\n.regularSection p {\n  color: #666;\n  font-size: 15px;\n  text-align: center;\n}\n@media screen and (min-width: 1024px) {\n  .regularSection p {\n    max-width: 1024px;\n    font-size: 18px;\n    line-height: 20px;\n  }\n}\n@media screen and (min-width: 1024px) {\n  .regularSection .items-wrapper {\n    display: flex;\n    align-items: baseline;\n  }\n}\n.regularSection .item-wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin-bottom: 10px;\n}\n@media screen and (min-width: 1024px) {\n  .regularSection .item-wrapper {\n    margin: 0 20px;\n    width: 33.3333%;\n  }\n}\n.regularSection .item-wrapper .image {\n  margin: 30px 0;\n}\n.regularSection .item-wrapper h4 {\n  font-family: 'Montserrat', sans-serif;\n  font-weight: 700;\n  font-size: 15px;\n  text-transform: uppercase;\n  color: #6a104a;\n  margin-bottom: 10px;\n  text-align: center;\n}\n.regularSection .item-wrapper p {\n  font-size: 15px;\n}\n.regularSection button,\n.regularSection a {\n  background-color: #6a104a;\n  color: #fff;\n  font-size: 12px;\n  font-weight: bold;\n  text-transform: uppercase;\n  padding: 6px 12px;\n  border-radius: 30px;\n  border: 1px solid #6a104a;\n  margin-top: 5px;\n  cursor: pointer;\n  outline: none;\n  transition: all 0.2s ease-in-out;\n  text-align: center;\n}\n@media screen and (min-width: 1024px) {\n  .regularSection button:hover,\n  .regularSection a:hover {\n    color: #6a104a;\n    background-color: transparent;\n    border: 1px solid #6a104a;\n  }\n}\n.home-view {\n  background-color: #FFF;\n  margin-top: -40px;\n}\n.home-view .top {\n  width: 100%;\n  min-height: 280px;\n  padding: 30px;\n  margin-bottom: 30px;\n}\n.home-view .top .top-content {\n  margin: auto;\n  max-width: 990px;\n}\n.home-view .top h1 {\n  color: #FFF;\n  text-align: center;\n}\n@media screen and (max-width: 1024px) {\n  .home-view .top .gutter-row {\n    width: 33.33%;\n  }\n  .home-view .top .gutter-row:last-child {\n    width: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n}\n@media screen and (max-width: 680px) {\n  .home-view .top .gutter-row {\n    width: 100%;\n    margin-bottom: 30px;\n  }\n  .home-view .top .gutter-row:last-child {\n    margin-bottom: 0;\n    margin-top: -35px;\n  }\n  .home-view .top .gutter-row:last-child .ant-btn {\n    margin-top: 0;\n  }\n  .home-view .top .gutter-row .ant-input-search {\n    max-width: 100%;\n  }\n}\n.home-view .top .search-field {\n  max-width: 400px;\n  margin: 0 auto;\n  display: block;\n  height: 48px;\n}\n.home-view .top .switcher {\n  display: none;\n}\n.home-view .top .multi-select-component {\n  margin-bottom: 0;\n}\n.home-view .top .ant-select {\n  height: 48px;\n}\n.home-view .top .ant-select:after {\n  top: 22px;\n}\n.home-view .top .ant-select .ant-select-selection {\n  height: 48px;\n}\n.home-view .top .ant-select .ant-select-selection .ant-select-selection__rendered {\n  height: 48px;\n}\n.home-view .top .ant-select .ant-select-selection-selected-value {\n  height: 100%;\n  display: flex !important;\n  align-items: center;\n}\n.home-view .top .ant-select .ant-select-search {\n  height: 36px;\n}\n.home-view .top .ant-select ul {\n  min-height: 42px;\n  display: flex;\n  align-items: center;\n}\n.home-view .article-image {\n  height: 200px;\n  background-size: cover;\n  background-position: center center;\n}\n.home-view .article-card {\n  padding: 10px 16px;\n}\n.home-view .article-card h3 {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  font-size: 15px;\n}\n.home-view .article-card p {\n  font-size: 13px;\n  color: #999;\n  display: block;\n  /* Fallback for non-webkit */\n  display: -webkit-box;\n  max-width: 400px;\n  height: 39px;\n  /* Fallback for non-webkit */\n  margin: 5px auto 10px;\n  line-height: 1;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  position: relative;\n}\n.home-view .article-card p:after {\n  content: \"...\";\n  position: absolute;\n  top: 26px;\n  right: 6px;\n}\n.home-view .banner-txt {\n  padding-right: 70px;\n  color: #666;\n}\n@media screen and (max-width: 520px) {\n  .home-view .banner-txt {\n    padding-right: 0px;\n  }\n}\n.home-view .banner-txt h1 {\n  font-size: 50px;\n  line-height: 52px;\n  margin-bottom: 35px;\n}\n@media screen and (max-width: 520px) {\n  .home-view .banner-txt h1 {\n    font-size: 36px;\n    line-height: 40px;\n  }\n}\n.home-view .banner-txt h3 {\n  font-size: 30px;\n  font-weight: bold;\n}\n.home-view .banner-txt p {\n  margin: 30px 0;\n  font-size: 15px;\n  padding-right: 30px;\n}\n.home-view h1,\n.home-view h3,\n.home-view p {\n  color: #FFFFFF;\n}\n.home-view .section0 {\n  background: url('../assets/background.jpg') no-repeat center;\n  background-attachment: fixed;\n  background-size: cover;\n}\n.home-view .section0 .container {\n  padding: 0 30px;\n}\n.home-view .section0 .container > div {\n  display: flex;\n}\n.home-view .section0 .content {\n  width: 100%;\n}\n@media screen and (min-width: 768px) {\n  .home-view .section0 .content {\n    width: 50%;\n  }\n}\n.home-view .section0 .content .banner-txt {\n  margin: 30px 0;\n}\n@media screen and (min-width: 768px) {\n  .home-view .section0 .content .banner-txt {\n    padding-right: 0;\n  }\n}\n.home-view .section0 .image {\n  display: none;\n  line-height: 0;\n}\n@media screen and (min-width: 768px) {\n  .home-view .section0 .image {\n    display: block;\n    width: 50%;\n  }\n}\n.home-view .section1 {\n  background-color: #6a104a;\n  padding: 30px;\n}\n@media screen and (min-width: 1024px) {\n  .home-view .section1 {\n    padding: 10% 30px;\n  }\n}\n@media screen and (min-width: 1024px) {\n  .home-view .section1 .content-wrapper {\n    display: flex;\n    max-width: 1200px;\n    margin: 0 auto;\n  }\n}\n.home-view .section1 .left {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n@media screen and (min-width: 1024px) {\n  .home-view .section1 .left {\n    margin-right: 30px;\n  }\n}\n.home-view .section1 h2 {\n  font-size: 36px;\n  line-height: 40px;\n  letter-spacing: -1px;\n  color: #fff;\n  margin: 20px 0;\n  font-weight: 600;\n}\n@media screen and (min-width: 768px) {\n  .home-view .section1 h2 {\n    font-size: 60px;\n    line-height: 64px;\n  }\n}\n.home-view .section1 h3 {\n  font-family: 'Montserrat', sans-serif;\n  font-size: 18px;\n  color: #fff;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  line-height: 24px;\n}\n.home-view .section1 .btn-link-wrapper {\n  display: flex;\n  flex-direction: column;\n}\n@media screen and (min-width: 768px) {\n  .home-view .section1 .btn-link-wrapper {\n    flex-direction: row;\n  }\n}\n.home-view .section1 .btn-link-wrapper .btn-link {\n  display: block;\n  width: 223px;\n  height: 59px;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: contain;\n  transition: all 0.4s ease-in-out;\n}\n@media screen and (min-width: 768px) {\n  .home-view .section1 .btn-link-wrapper .btn-link {\n    margin: 0 20px;\n  }\n}\n.home-view .section1 .btn-link-wrapper .btn-link:hover {\n  transform: scale(1.04);\n}\n.home-view .section1 ul {\n  margin-top: 40px;\n}\n.home-view .section1 ul li {\n  display: flex;\n  align-items: center;\n  font-family: 'Montserrat', sans-serif;\n  font-size: 14px;\n  line-height: 20px;\n  color: #fff;\n  text-transform: uppercase;\n  border-top: 1px solid #823b6a;\n  background: url('../assets/check.svg') no-repeat left center;\n  background-size: 20px;\n  padding: 5px 0 5px 30px;\n  min-height: 40px;\n}\n.home-view .section1 ul li:last-of-type {\n  border-bottom: 1px solid #823b6a;\n}\n.home-view .section2 {\n  @extend .regularSection;\n}\n.home-view .section2.show .section2PopUp {\n  opacity: 1;\n  left: 0;\n  pointer-events: auto;\n}\n.home-view .section2 .section2PopUp {\n  position: absolute;\n  top: 0;\n  left: -100%;\n  width: 100%;\n  height: 100%;\n  background-color: #FFFCF4;\n  color: #6a104a;\n  padding: 30px;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 350ms, left 350ms;\n  z-index: 1;\n}\n.home-view .section2 .section2PopUp .arrow {\n  position: absolute;\n  outline: none;\n  border: none;\n  width: 20px;\n  height: 20px;\n  background: url('../assets/arrow.svg') no-repeat center;\n  background-size: 20px;\n  cursor: pointer;\n  top: 10px;\n  left: 10px;\n  padding: 20px;\n}\n@media screen and (min-width: 768px) {\n  .home-view .section2 .section2PopUp .arrow {\n    width: 40px;\n    height: 40px;\n    top: 20px;\n    left: 20px;\n    background-size: 40px;\n  }\n}\n.home-view .section2 .section2PopUp h2 {\n  text-transform: none;\n  font-size: 24px;\n  line-height: 26px;\n  font-weight: bold;\n  margin-bottom: 20px;\n}\n@media screen and (min-width: 1024px) {\n  .home-view .section2 .section2PopUp h2 {\n    font-size: 60px;\n    line-height: 62px;\n  }\n}\n.home-view .section2 .section2PopUp .article-wrapper {\n  display: flex;\n  flex-direction: column;\n  background-color: #FFFCF4;\n}\n@media screen and (min-width: 768px) {\n  .home-view .section2 .section2PopUp .article-wrapper {\n    flex-direction: row;\n    flex-wrap: wrap;\n  }\n}\n@media screen and (min-width: 768px) {\n  .home-view .section2 .section2PopUp article {\n    width: 50%;\n  }\n}\n@media screen and (min-width: 768px) {\n  .home-view .section2 .section2PopUp article:nth-of-type(1) {\n    padding-right: 15px;\n  }\n}\n@media screen and (min-width: 768px) {\n  .home-view .section2 .section2PopUp article:nth-of-type(2) {\n    padding-left: 15px;\n  }\n}\n@media screen and (min-width: 768px) {\n  .home-view .section2 .section2PopUp article:last-of-type {\n    width: 100%;\n  }\n}\n.home-view .section2 .section2PopUp article h3 {\n  font-size: 18px;\n  color: #6a104a;\n  text-transform: uppercase;\n  font-weight: 700;\n  font-family: 'Montserrat', sans-serif;\n  text-align: left;\n  margin: 10px 0 20px;\n}\n.home-view .section2 .section2PopUp article h4 {\n  font-size: 14px;\n  color: #6a104a;\n  text-transform: uppercase;\n  font-weight: 700;\n  font-family: 'Montserrat', sans-serif;\n  margin-bottom: 10px;\n}\n.home-view .section2 .section2PopUp article p {\n  font-family: 'Montserrat', sans-serif;\n  text-align: left;\n  margin-bottom: 20px;\n}\n.home-view .section2 .section2PopUp article ul {\n  margin-bottom: 20px;\n}\n.home-view .section2 .section2PopUp article ul li {\n  color: #333333;\n}\n.home-view .section2 .section2PopUp article ul li.star {\n  margin-bottom: 10px;\n}\n@media screen and (min-width: 768px) {\n  .home-view .section2 .section2PopUp article ul li.star {\n    display: flex;\n    align-items: center;\n    margin-bottom: 5px;\n    white-space: nowrap;\n  }\n}\n.home-view .section2 .section2PopUp article ul li em {\n  color: #6a104a;\n  font-family: 'Montserrat', sans-serif;\n  font-style: normal;\n  margin-right: 0.5em;\n}\n.home-view .section2 .section2PopUp article ul li i {\n  display: inline-block;\n  width: 15px;\n  height: 15px;\n  background: url('../assets/star.svg') no-repeat center;\n  background-size: 15px;\n}\n.home-view .section2 .section2PopUp article ul li .star-copy {\n  display: block;\n}\n@media screen and (min-width: 768px) {\n  .home-view .section2 .section2PopUp article ul li .star-copy {\n    display: inline-block;\n  }\n}\n.home-view .section2 .section2PopUp article ul li > div {\n  display: inline-block;\n}\n@media screen and (min-width: 768px) {\n  .home-view .section2 .section2PopUp article ul li > div {\n    min-width: 85px;\n  }\n}\n.home-view .section2 .section2PopUp article .image {\n  width: 100%;\n  height: auto;\n  min-height: 1px;\n  margin-bottom: 10px;\n  max-width: 400px;\n}\n.home-view .section3 {\n  @extend .regularSection;\n  background-color: #fffcf4;\n}\n.home-view .section3 .items-wrapper {\n  margin-bottom: 20px;\n}\n@media screen and (min-width: 1024px) {\n  .home-view .section3 .items-wrapper {\n    margin-bottom: 40px;\n  }\n}\n.home-view .section3 .item-wrapper .title-wrapper {\n  display: flex;\n  align-items: center;\n  margin-right: auto;\n  margin-bottom: 10px;\n}\n.home-view .section3 .item-wrapper i {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: #6a104a;\n  color: #fff;\n  border-radius: 50%;\n  width: 50px;\n  height: 50px;\n  min-width: 50px;\n  min-height: 50px;\n  font-family: GothamRounded-Book, sans-serif;\n  font-size: 28px;\n  font-style: normal;\n  font-weight: bold;\n  margin-right: 10px;\n}\n.home-view .section3 .item-wrapper h4 {\n  font-size: 18px;\n  line-height: 20px;\n  text-align: left;\n  margin-bottom: 0;\n}\n@media screen and (min-width: 1024px) {\n  .home-view .section3 .item-wrapper h4 {\n    font-size: 24px;\n    line-height: 26px;\n  }\n}\n.home-view .section3 .item-wrapper p {\n  text-align: left;\n  padding-left: 60px;\n  margin-right: auto;\n}\n.home-view .section3 a {\n  padding: 12px 20px;\n}\n@media screen and (min-width: 1024px) {\n  .home-view .section3 a {\n    font-size: 18px;\n    line-height: 20px;\n  }\n}\n.home-view .section4 {\n  @extend .regularSection;\n  background-color: #6a104a;\n  padding: 80px 30px;\n}\n@media screen and (min-width: 768px) {\n  .home-view .section4 {\n    padding: 80px 15%;\n  }\n}\n.home-view .section4 h2 {\n  color: #FFFFFF;\n  text-transform: none;\n}\n@media screen and (min-width: 768px) {\n  .home-view .section4 h2 {\n    font-size: 60px;\n    line-height: 62px;\n  }\n}\n.home-view .section4 form {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.home-view .section4 input {\n  font-family: GothamRounded-Medium, sans-serif;\n  font-size: 18px;\n  width: 100%;\n  max-width: 650px;\n  outline: none;\n  border: none;\n  border-bottom: 1px solid #FFFFFF;\n  padding: 5px;\n  background: transparent;\n  color: #fff;\n  text-align: center;\n  margin-bottom: 40px;\n}\n@media screen and (min-width: 768px) {\n  .home-view .section4 input {\n    font-size: 32px;\n    padding: 10px;\n  }\n}\n.home-view .section4 button {\n  display: block;\n  margin: 0 auto;\n  font-size: 18px;\n  line-height: 18px;\n  cursor: pointer;\n  border-radius: 30px;\n  border: 1px solid #FFFFFF;\n  background-color: #FFFFFF;\n  color: #6a104a;\n  padding: 12px 60px;\n  transition: all 0.2s ease-in-out;\n  font-family: 'Montserrat', sans-serif;\n  font-weight: normal;\n}\n@media screen and (min-width: 1024px) {\n  .home-view .section4 button:hover {\n    border: 1px solid #FFFFFF;\n    padding: 12px 70px;\n    color: #FFFFFF;\n    background-color: transparent;\n  }\n}\n.home-view .section5 {\n  @extend .section4;\n  background-color: #111111;\n}\n.home-view .section5 input {\n  font-family: 'Montserrat', sans-serif;\n  height: 46px;\n  font-size: 14px;\n  background-color: #FFFFFF;\n  text-align: left;\n  border: none;\n  border-radius: 3px;\n  margin-bottom: 10px;\n  padding: 0 20px;\n  color: #000000;\n}\n.home-view .section5 input:last-of-type {\n  margin-bottom: 30px;\n}\n.home-view .section5 button {\n  border: 1px solid #6a104a;\n  background-color: #6a104a;\n  color: #FFFFFF;\n}\n@media screen and (min-width: 1024px) {\n  .home-view .section5 button:hover {\n    border: 1px solid #f7efdf;\n    background-color: #f7efdf;\n    color: #6a104a;\n  }\n}\n.home-view .embed-container {\n  position: relative;\n  padding-bottom: 56.25%;\n  overflow: hidden;\n  max-width: 100%;\n  width: 100%;\n  height: auto;\n}\n.home-view .embed-container iframe,\n.home-view .embed-container object,\n.home-view .embed-container embed {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n.home-view iframe {\n  border: none;\n}\n#fp-nav.right {\n  right: 10px;\n}\n#fp-nav ul li a span,\n.fp-slidesNav ul li a span {\n  background: #ecc897;\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/url/escape.js":
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),

/***/ "./node_modules/react-helmet/lib/Helmet.js":
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.Helmet = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSideEffect = __webpack_require__("./node_modules/react-helmet/node_modules/react-side-effect/lib/index.js");

var _reactSideEffect2 = _interopRequireDefault(_reactSideEffect);

var _reactFastCompare = __webpack_require__("./node_modules/react-helmet/node_modules/react-fast-compare/index.js");

var _reactFastCompare2 = _interopRequireDefault(_reactFastCompare);

var _HelmetUtils = __webpack_require__("./node_modules/react-helmet/lib/HelmetUtils.js");

var _HelmetConstants = __webpack_require__("./node_modules/react-helmet/lib/HelmetConstants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Helmet = function Helmet(Component) {
    var _class, _temp;

    return _temp = _class = function (_React$Component) {
        _inherits(HelmetWrapper, _React$Component);

        function HelmetWrapper() {
            _classCallCheck(this, HelmetWrapper);

            return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
        }

        HelmetWrapper.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return !(0, _reactFastCompare2.default)(this.props, nextProps);
        };

        HelmetWrapper.prototype.mapNestedChildrenToProps = function mapNestedChildrenToProps(child, nestedChildren) {
            if (!nestedChildren) {
                return null;
            }

            switch (child.type) {
                case _HelmetConstants.TAG_NAMES.SCRIPT:
                case _HelmetConstants.TAG_NAMES.NOSCRIPT:
                    return {
                        innerHTML: nestedChildren
                    };

                case _HelmetConstants.TAG_NAMES.STYLE:
                    return {
                        cssText: nestedChildren
                    };
            }

            throw new Error("<" + child.type + " /> elements are self-closing and can not contain children. Refer to our API for more information.");
        };

        HelmetWrapper.prototype.flattenArrayTypeChildren = function flattenArrayTypeChildren(_ref) {
            var _extends2;

            var child = _ref.child,
                arrayTypeChildren = _ref.arrayTypeChildren,
                newChildProps = _ref.newChildProps,
                nestedChildren = _ref.nestedChildren;

            return _extends({}, arrayTypeChildren, (_extends2 = {}, _extends2[child.type] = [].concat(arrayTypeChildren[child.type] || [], [_extends({}, newChildProps, this.mapNestedChildrenToProps(child, nestedChildren))]), _extends2));
        };

        HelmetWrapper.prototype.mapObjectTypeChildren = function mapObjectTypeChildren(_ref2) {
            var _extends3, _extends4;

            var child = _ref2.child,
                newProps = _ref2.newProps,
                newChildProps = _ref2.newChildProps,
                nestedChildren = _ref2.nestedChildren;

            switch (child.type) {
                case _HelmetConstants.TAG_NAMES.TITLE:
                    return _extends({}, newProps, (_extends3 = {}, _extends3[child.type] = nestedChildren, _extends3.titleAttributes = _extends({}, newChildProps), _extends3));

                case _HelmetConstants.TAG_NAMES.BODY:
                    return _extends({}, newProps, {
                        bodyAttributes: _extends({}, newChildProps)
                    });

                case _HelmetConstants.TAG_NAMES.HTML:
                    return _extends({}, newProps, {
                        htmlAttributes: _extends({}, newChildProps)
                    });
            }

            return _extends({}, newProps, (_extends4 = {}, _extends4[child.type] = _extends({}, newChildProps), _extends4));
        };

        HelmetWrapper.prototype.mapArrayTypeChildrenToProps = function mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
            var newFlattenedProps = _extends({}, newProps);

            Object.keys(arrayTypeChildren).forEach(function (arrayChildName) {
                var _extends5;

                newFlattenedProps = _extends({}, newFlattenedProps, (_extends5 = {}, _extends5[arrayChildName] = arrayTypeChildren[arrayChildName], _extends5));
            });

            return newFlattenedProps;
        };

        HelmetWrapper.prototype.warnOnInvalidChildren = function warnOnInvalidChildren(child, nestedChildren) {
            if (true) {
                if (!_HelmetConstants.VALID_TAG_NAMES.some(function (name) {
                    return child.type === name;
                })) {
                    if (typeof child.type === "function") {
                        return (0, _HelmetUtils.warn)("You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.");
                    }

                    return (0, _HelmetUtils.warn)("Only elements types " + _HelmetConstants.VALID_TAG_NAMES.join(", ") + " are allowed. Helmet does not support rendering <" + child.type + "> elements. Refer to our API for more information.");
                }

                if (nestedChildren && typeof nestedChildren !== "string" && (!Array.isArray(nestedChildren) || nestedChildren.some(function (nestedChild) {
                    return typeof nestedChild !== "string";
                }))) {
                    throw new Error("Helmet expects a string as a child of <" + child.type + ">. Did you forget to wrap your children in braces? ( <" + child.type + ">{``}</" + child.type + "> ) Refer to our API for more information.");
                }
            }

            return true;
        };

        HelmetWrapper.prototype.mapChildrenToProps = function mapChildrenToProps(children, newProps) {
            var _this2 = this;

            var arrayTypeChildren = {};

            _react2.default.Children.forEach(children, function (child) {
                if (!child || !child.props) {
                    return;
                }

                var _child$props = child.props,
                    nestedChildren = _child$props.children,
                    childProps = _objectWithoutProperties(_child$props, ["children"]);

                var newChildProps = (0, _HelmetUtils.convertReactPropstoHtmlAttributes)(childProps);

                _this2.warnOnInvalidChildren(child, nestedChildren);

                switch (child.type) {
                    case _HelmetConstants.TAG_NAMES.LINK:
                    case _HelmetConstants.TAG_NAMES.META:
                    case _HelmetConstants.TAG_NAMES.NOSCRIPT:
                    case _HelmetConstants.TAG_NAMES.SCRIPT:
                    case _HelmetConstants.TAG_NAMES.STYLE:
                        arrayTypeChildren = _this2.flattenArrayTypeChildren({
                            child: child,
                            arrayTypeChildren: arrayTypeChildren,
                            newChildProps: newChildProps,
                            nestedChildren: nestedChildren
                        });
                        break;

                    default:
                        newProps = _this2.mapObjectTypeChildren({
                            child: child,
                            newProps: newProps,
                            newChildProps: newChildProps,
                            nestedChildren: nestedChildren
                        });
                        break;
                }
            });

            newProps = this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
            return newProps;
        };

        HelmetWrapper.prototype.render = function render() {
            var _props = this.props,
                children = _props.children,
                props = _objectWithoutProperties(_props, ["children"]);

            var newProps = _extends({}, props);

            if (children) {
                newProps = this.mapChildrenToProps(children, newProps);
            }

            return _react2.default.createElement(Component, newProps);
        };

        _createClass(HelmetWrapper, null, [{
            key: "canUseDOM",


            // Component.peek comes from react-side-effect:
            // For testing, you may use a static peek() method available on the returned component.
            // It lets you get the current state without resetting the mounted instance stack.
            // Don’t use it for anything other than testing.

            /**
             * @param {Object} base: {"target": "_blank", "href": "http://mysite.com/"}
             * @param {Object} bodyAttributes: {"className": "root"}
             * @param {String} defaultTitle: "Default Title"
             * @param {Boolean} defer: true
             * @param {Boolean} encodeSpecialCharacters: true
             * @param {Object} htmlAttributes: {"lang": "en", "amp": undefined}
             * @param {Array} link: [{"rel": "canonical", "href": "http://mysite.com/example"}]
             * @param {Array} meta: [{"name": "description", "content": "Test description"}]
             * @param {Array} noscript: [{"innerHTML": "<img src='http://mysite.com/js/test.js'"}]
             * @param {Function} onChangeClientState: "(newState) => console.log(newState)"
             * @param {Array} script: [{"type": "text/javascript", "src": "http://mysite.com/js/test.js"}]
             * @param {Array} style: [{"type": "text/css", "cssText": "div { display: block; color: blue; }"}]
             * @param {String} title: "Title"
             * @param {Object} titleAttributes: {"itemprop": "name"}
             * @param {String} titleTemplate: "MySite.com - %s"
             */
            set: function set(canUseDOM) {
                Component.canUseDOM = canUseDOM;
            }
        }]);

        return HelmetWrapper;
    }(_react2.default.Component), _class.propTypes = {
        base: _propTypes2.default.object,
        bodyAttributes: _propTypes2.default.object,
        children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
        defaultTitle: _propTypes2.default.string,
        defer: _propTypes2.default.bool,
        encodeSpecialCharacters: _propTypes2.default.bool,
        htmlAttributes: _propTypes2.default.object,
        link: _propTypes2.default.arrayOf(_propTypes2.default.object),
        meta: _propTypes2.default.arrayOf(_propTypes2.default.object),
        noscript: _propTypes2.default.arrayOf(_propTypes2.default.object),
        onChangeClientState: _propTypes2.default.func,
        script: _propTypes2.default.arrayOf(_propTypes2.default.object),
        style: _propTypes2.default.arrayOf(_propTypes2.default.object),
        title: _propTypes2.default.string,
        titleAttributes: _propTypes2.default.object,
        titleTemplate: _propTypes2.default.string
    }, _class.defaultProps = {
        defer: true,
        encodeSpecialCharacters: true
    }, _class.peek = Component.peek, _class.rewind = function () {
        var mappedState = Component.rewind();
        if (!mappedState) {
            // provide fallback if mappedState is undefined
            mappedState = (0, _HelmetUtils.mapStateOnServer)({
                baseTag: [],
                bodyAttributes: {},
                encodeSpecialCharacters: true,
                htmlAttributes: {},
                linkTags: [],
                metaTags: [],
                noscriptTags: [],
                scriptTags: [],
                styleTags: [],
                title: "",
                titleAttributes: {}
            });
        }

        return mappedState;
    }, _temp;
};

var NullComponent = function NullComponent() {
    return null;
};

var HelmetSideEffects = (0, _reactSideEffect2.default)(_HelmetUtils.reducePropsToState, _HelmetUtils.handleClientStateChange, _HelmetUtils.mapStateOnServer)(NullComponent);

var HelmetExport = Helmet(HelmetSideEffects);
HelmetExport.renderStatic = HelmetExport.rewind;

exports.Helmet = HelmetExport;
exports.default = HelmetExport;

/***/ }),

/***/ "./node_modules/react-helmet/lib/HelmetConstants.js":
/***/ (function(module, exports) {

exports.__esModule = true;
var ATTRIBUTE_NAMES = exports.ATTRIBUTE_NAMES = {
    BODY: "bodyAttributes",
    HTML: "htmlAttributes",
    TITLE: "titleAttributes"
};

var TAG_NAMES = exports.TAG_NAMES = {
    BASE: "base",
    BODY: "body",
    HEAD: "head",
    HTML: "html",
    LINK: "link",
    META: "meta",
    NOSCRIPT: "noscript",
    SCRIPT: "script",
    STYLE: "style",
    TITLE: "title"
};

var VALID_TAG_NAMES = exports.VALID_TAG_NAMES = Object.keys(TAG_NAMES).map(function (name) {
    return TAG_NAMES[name];
});

var TAG_PROPERTIES = exports.TAG_PROPERTIES = {
    CHARSET: "charset",
    CSS_TEXT: "cssText",
    HREF: "href",
    HTTPEQUIV: "http-equiv",
    INNER_HTML: "innerHTML",
    ITEM_PROP: "itemprop",
    NAME: "name",
    PROPERTY: "property",
    REL: "rel",
    SRC: "src"
};

var REACT_TAG_MAP = exports.REACT_TAG_MAP = {
    accesskey: "accessKey",
    charset: "charSet",
    class: "className",
    contenteditable: "contentEditable",
    contextmenu: "contextMenu",
    "http-equiv": "httpEquiv",
    itemprop: "itemProp",
    tabindex: "tabIndex"
};

var HELMET_PROPS = exports.HELMET_PROPS = {
    DEFAULT_TITLE: "defaultTitle",
    DEFER: "defer",
    ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
    ON_CHANGE_CLIENT_STATE: "onChangeClientState",
    TITLE_TEMPLATE: "titleTemplate"
};

var HTML_TAG_MAP = exports.HTML_TAG_MAP = Object.keys(REACT_TAG_MAP).reduce(function (obj, key) {
    obj[REACT_TAG_MAP[key]] = key;
    return obj;
}, {});

var SELF_CLOSING_TAGS = exports.SELF_CLOSING_TAGS = [TAG_NAMES.NOSCRIPT, TAG_NAMES.SCRIPT, TAG_NAMES.STYLE];

var HELMET_ATTRIBUTE = exports.HELMET_ATTRIBUTE = "data-react-helmet";

/***/ }),

/***/ "./node_modules/react-helmet/lib/HelmetUtils.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports.__esModule = true;
exports.warn = exports.requestAnimationFrame = exports.reducePropsToState = exports.mapStateOnServer = exports.handleClientStateChange = exports.convertReactPropstoHtmlAttributes = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _objectAssign = __webpack_require__("./node_modules/object-assign/index.js");

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _HelmetConstants = __webpack_require__("./node_modules/react-helmet/lib/HelmetConstants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var encodeSpecialCharacters = function encodeSpecialCharacters(str) {
    var encode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (encode === false) {
        return String(str);
    }

    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};

var getTitleFromPropsList = function getTitleFromPropsList(propsList) {
    var innermostTitle = getInnermostProperty(propsList, _HelmetConstants.TAG_NAMES.TITLE);
    var innermostTemplate = getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.TITLE_TEMPLATE);

    if (innermostTemplate && innermostTitle) {
        // use function arg to avoid need to escape $ characters
        return innermostTemplate.replace(/%s/g, function () {
            return innermostTitle;
        });
    }

    var innermostDefaultTitle = getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.DEFAULT_TITLE);

    return innermostTitle || innermostDefaultTitle || undefined;
};

var getOnChangeClientState = function getOnChangeClientState(propsList) {
    return getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || function () {};
};

var getAttributesFromPropsList = function getAttributesFromPropsList(tagType, propsList) {
    return propsList.filter(function (props) {
        return typeof props[tagType] !== "undefined";
    }).map(function (props) {
        return props[tagType];
    }).reduce(function (tagAttrs, current) {
        return _extends({}, tagAttrs, current);
    }, {});
};

var getBaseTagFromPropsList = function getBaseTagFromPropsList(primaryAttributes, propsList) {
    return propsList.filter(function (props) {
        return typeof props[_HelmetConstants.TAG_NAMES.BASE] !== "undefined";
    }).map(function (props) {
        return props[_HelmetConstants.TAG_NAMES.BASE];
    }).reverse().reduce(function (innermostBaseTag, tag) {
        if (!innermostBaseTag.length) {
            var keys = Object.keys(tag);

            for (var i = 0; i < keys.length; i++) {
                var attributeKey = keys[i];
                var lowerCaseAttributeKey = attributeKey.toLowerCase();

                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
                    return innermostBaseTag.concat(tag);
                }
            }
        }

        return innermostBaseTag;
    }, []);
};

var getTagsFromPropsList = function getTagsFromPropsList(tagName, primaryAttributes, propsList) {
    // Calculate list of tags, giving priority innermost component (end of the propslist)
    var approvedSeenTags = {};

    return propsList.filter(function (props) {
        if (Array.isArray(props[tagName])) {
            return true;
        }
        if (typeof props[tagName] !== "undefined") {
            warn("Helmet: " + tagName + " should be of type \"Array\". Instead found type \"" + _typeof(props[tagName]) + "\"");
        }
        return false;
    }).map(function (props) {
        return props[tagName];
    }).reverse().reduce(function (approvedTags, instanceTags) {
        var instanceSeenTags = {};

        instanceTags.filter(function (tag) {
            var primaryAttributeKey = void 0;
            var keys = Object.keys(tag);
            for (var i = 0; i < keys.length; i++) {
                var attributeKey = keys[i];
                var lowerCaseAttributeKey = attributeKey.toLowerCase();

                // Special rule with link tags, since rel and href are both primary tags, rel takes priority
                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === _HelmetConstants.TAG_PROPERTIES.REL && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === _HelmetConstants.TAG_PROPERTIES.REL && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
                    primaryAttributeKey = lowerCaseAttributeKey;
                }
                // Special case for innerHTML which doesn't work lowercased
                if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === _HelmetConstants.TAG_PROPERTIES.INNER_HTML || attributeKey === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT || attributeKey === _HelmetConstants.TAG_PROPERTIES.ITEM_PROP)) {
                    primaryAttributeKey = attributeKey;
                }
            }

            if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
                return false;
            }

            var value = tag[primaryAttributeKey].toLowerCase();

            if (!approvedSeenTags[primaryAttributeKey]) {
                approvedSeenTags[primaryAttributeKey] = {};
            }

            if (!instanceSeenTags[primaryAttributeKey]) {
                instanceSeenTags[primaryAttributeKey] = {};
            }

            if (!approvedSeenTags[primaryAttributeKey][value]) {
                instanceSeenTags[primaryAttributeKey][value] = true;
                return true;
            }

            return false;
        }).reverse().forEach(function (tag) {
            return approvedTags.push(tag);
        });

        // Update seen tags with tags from this instance
        var keys = Object.keys(instanceSeenTags);
        for (var i = 0; i < keys.length; i++) {
            var attributeKey = keys[i];
            var tagUnion = (0, _objectAssign2.default)({}, approvedSeenTags[attributeKey], instanceSeenTags[attributeKey]);

            approvedSeenTags[attributeKey] = tagUnion;
        }

        return approvedTags;
    }, []).reverse();
};

var getInnermostProperty = function getInnermostProperty(propsList, property) {
    for (var i = propsList.length - 1; i >= 0; i--) {
        var props = propsList[i];

        if (props.hasOwnProperty(property)) {
            return props[property];
        }
    }

    return null;
};

var reducePropsToState = function reducePropsToState(propsList) {
    return {
        baseTag: getBaseTagFromPropsList([_HelmetConstants.TAG_PROPERTIES.HREF], propsList),
        bodyAttributes: getAttributesFromPropsList(_HelmetConstants.ATTRIBUTE_NAMES.BODY, propsList),
        defer: getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.DEFER),
        encode: getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
        htmlAttributes: getAttributesFromPropsList(_HelmetConstants.ATTRIBUTE_NAMES.HTML, propsList),
        linkTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.LINK, [_HelmetConstants.TAG_PROPERTIES.REL, _HelmetConstants.TAG_PROPERTIES.HREF], propsList),
        metaTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.META, [_HelmetConstants.TAG_PROPERTIES.NAME, _HelmetConstants.TAG_PROPERTIES.CHARSET, _HelmetConstants.TAG_PROPERTIES.HTTPEQUIV, _HelmetConstants.TAG_PROPERTIES.PROPERTY, _HelmetConstants.TAG_PROPERTIES.ITEM_PROP], propsList),
        noscriptTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.NOSCRIPT, [_HelmetConstants.TAG_PROPERTIES.INNER_HTML], propsList),
        onChangeClientState: getOnChangeClientState(propsList),
        scriptTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.SCRIPT, [_HelmetConstants.TAG_PROPERTIES.SRC, _HelmetConstants.TAG_PROPERTIES.INNER_HTML], propsList),
        styleTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.STYLE, [_HelmetConstants.TAG_PROPERTIES.CSS_TEXT], propsList),
        title: getTitleFromPropsList(propsList),
        titleAttributes: getAttributesFromPropsList(_HelmetConstants.ATTRIBUTE_NAMES.TITLE, propsList)
    };
};

var rafPolyfill = function () {
    var clock = Date.now();

    return function (callback) {
        var currentTime = Date.now();

        if (currentTime - clock > 16) {
            clock = currentTime;
            callback(currentTime);
        } else {
            setTimeout(function () {
                rafPolyfill(callback);
            }, 0);
        }
    };
}();

var cafPolyfill = function cafPolyfill(id) {
    return clearTimeout(id);
};

var requestAnimationFrame = typeof window !== "undefined" ? window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || rafPolyfill : global.requestAnimationFrame || rafPolyfill;

var cancelAnimationFrame = typeof window !== "undefined" ? window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || cafPolyfill : global.cancelAnimationFrame || cafPolyfill;

var warn = function warn(msg) {
    return console && typeof console.warn === "function" && console.warn(msg);
};

var _helmetCallback = null;

var handleClientStateChange = function handleClientStateChange(newState) {
    if (_helmetCallback) {
        cancelAnimationFrame(_helmetCallback);
    }

    if (newState.defer) {
        _helmetCallback = requestAnimationFrame(function () {
            commitTagChanges(newState, function () {
                _helmetCallback = null;
            });
        });
    } else {
        commitTagChanges(newState);
        _helmetCallback = null;
    }
};

var commitTagChanges = function commitTagChanges(newState, cb) {
    var baseTag = newState.baseTag,
        bodyAttributes = newState.bodyAttributes,
        htmlAttributes = newState.htmlAttributes,
        linkTags = newState.linkTags,
        metaTags = newState.metaTags,
        noscriptTags = newState.noscriptTags,
        onChangeClientState = newState.onChangeClientState,
        scriptTags = newState.scriptTags,
        styleTags = newState.styleTags,
        title = newState.title,
        titleAttributes = newState.titleAttributes;

    updateAttributes(_HelmetConstants.TAG_NAMES.BODY, bodyAttributes);
    updateAttributes(_HelmetConstants.TAG_NAMES.HTML, htmlAttributes);

    updateTitle(title, titleAttributes);

    var tagUpdates = {
        baseTag: updateTags(_HelmetConstants.TAG_NAMES.BASE, baseTag),
        linkTags: updateTags(_HelmetConstants.TAG_NAMES.LINK, linkTags),
        metaTags: updateTags(_HelmetConstants.TAG_NAMES.META, metaTags),
        noscriptTags: updateTags(_HelmetConstants.TAG_NAMES.NOSCRIPT, noscriptTags),
        scriptTags: updateTags(_HelmetConstants.TAG_NAMES.SCRIPT, scriptTags),
        styleTags: updateTags(_HelmetConstants.TAG_NAMES.STYLE, styleTags)
    };

    var addedTags = {};
    var removedTags = {};

    Object.keys(tagUpdates).forEach(function (tagType) {
        var _tagUpdates$tagType = tagUpdates[tagType],
            newTags = _tagUpdates$tagType.newTags,
            oldTags = _tagUpdates$tagType.oldTags;


        if (newTags.length) {
            addedTags[tagType] = newTags;
        }
        if (oldTags.length) {
            removedTags[tagType] = tagUpdates[tagType].oldTags;
        }
    });

    cb && cb();

    onChangeClientState(newState, addedTags, removedTags);
};

var flattenArray = function flattenArray(possibleArray) {
    return Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
};

var updateTitle = function updateTitle(title, attributes) {
    if (typeof title !== "undefined" && document.title !== title) {
        document.title = flattenArray(title);
    }

    updateAttributes(_HelmetConstants.TAG_NAMES.TITLE, attributes);
};

var updateAttributes = function updateAttributes(tagName, attributes) {
    var elementTag = document.getElementsByTagName(tagName)[0];

    if (!elementTag) {
        return;
    }

    var helmetAttributeString = elementTag.getAttribute(_HelmetConstants.HELMET_ATTRIBUTE);
    var helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
    var attributesToRemove = [].concat(helmetAttributes);
    var attributeKeys = Object.keys(attributes);

    for (var i = 0; i < attributeKeys.length; i++) {
        var attribute = attributeKeys[i];
        var value = attributes[attribute] || "";

        if (elementTag.getAttribute(attribute) !== value) {
            elementTag.setAttribute(attribute, value);
        }

        if (helmetAttributes.indexOf(attribute) === -1) {
            helmetAttributes.push(attribute);
        }

        var indexToSave = attributesToRemove.indexOf(attribute);
        if (indexToSave !== -1) {
            attributesToRemove.splice(indexToSave, 1);
        }
    }

    for (var _i = attributesToRemove.length - 1; _i >= 0; _i--) {
        elementTag.removeAttribute(attributesToRemove[_i]);
    }

    if (helmetAttributes.length === attributesToRemove.length) {
        elementTag.removeAttribute(_HelmetConstants.HELMET_ATTRIBUTE);
    } else if (elementTag.getAttribute(_HelmetConstants.HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
        elementTag.setAttribute(_HelmetConstants.HELMET_ATTRIBUTE, attributeKeys.join(","));
    }
};

var updateTags = function updateTags(type, tags) {
    var headElement = document.head || document.querySelector(_HelmetConstants.TAG_NAMES.HEAD);
    var tagNodes = headElement.querySelectorAll(type + "[" + _HelmetConstants.HELMET_ATTRIBUTE + "]");
    var oldTags = Array.prototype.slice.call(tagNodes);
    var newTags = [];
    var indexToDelete = void 0;

    if (tags && tags.length) {
        tags.forEach(function (tag) {
            var newElement = document.createElement(type);

            for (var attribute in tag) {
                if (tag.hasOwnProperty(attribute)) {
                    if (attribute === _HelmetConstants.TAG_PROPERTIES.INNER_HTML) {
                        newElement.innerHTML = tag.innerHTML;
                    } else if (attribute === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT) {
                        if (newElement.styleSheet) {
                            newElement.styleSheet.cssText = tag.cssText;
                        } else {
                            newElement.appendChild(document.createTextNode(tag.cssText));
                        }
                    } else {
                        var value = typeof tag[attribute] === "undefined" ? "" : tag[attribute];
                        newElement.setAttribute(attribute, value);
                    }
                }
            }

            newElement.setAttribute(_HelmetConstants.HELMET_ATTRIBUTE, "true");

            // Remove a duplicate tag from domTagstoRemove, so it isn't cleared.
            if (oldTags.some(function (existingTag, index) {
                indexToDelete = index;
                return newElement.isEqualNode(existingTag);
            })) {
                oldTags.splice(indexToDelete, 1);
            } else {
                newTags.push(newElement);
            }
        });
    }

    oldTags.forEach(function (tag) {
        return tag.parentNode.removeChild(tag);
    });
    newTags.forEach(function (tag) {
        return headElement.appendChild(tag);
    });

    return {
        oldTags: oldTags,
        newTags: newTags
    };
};

var generateElementAttributesAsString = function generateElementAttributesAsString(attributes) {
    return Object.keys(attributes).reduce(function (str, key) {
        var attr = typeof attributes[key] !== "undefined" ? key + "=\"" + attributes[key] + "\"" : "" + key;
        return str ? str + " " + attr : attr;
    }, "");
};

var generateTitleAsString = function generateTitleAsString(type, title, attributes, encode) {
    var attributeString = generateElementAttributesAsString(attributes);
    var flattenedTitle = flattenArray(title);
    return attributeString ? "<" + type + " " + _HelmetConstants.HELMET_ATTRIBUTE + "=\"true\" " + attributeString + ">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">" : "<" + type + " " + _HelmetConstants.HELMET_ATTRIBUTE + "=\"true\">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">";
};

var generateTagsAsString = function generateTagsAsString(type, tags, encode) {
    return tags.reduce(function (str, tag) {
        var attributeHtml = Object.keys(tag).filter(function (attribute) {
            return !(attribute === _HelmetConstants.TAG_PROPERTIES.INNER_HTML || attribute === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT);
        }).reduce(function (string, attribute) {
            var attr = typeof tag[attribute] === "undefined" ? attribute : attribute + "=\"" + encodeSpecialCharacters(tag[attribute], encode) + "\"";
            return string ? string + " " + attr : attr;
        }, "");

        var tagContent = tag.innerHTML || tag.cssText || "";

        var isSelfClosing = _HelmetConstants.SELF_CLOSING_TAGS.indexOf(type) === -1;

        return str + "<" + type + " " + _HelmetConstants.HELMET_ATTRIBUTE + "=\"true\" " + attributeHtml + (isSelfClosing ? "/>" : ">" + tagContent + "</" + type + ">");
    }, "");
};

var convertElementAttributestoReactProps = function convertElementAttributestoReactProps(attributes) {
    var initProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Object.keys(attributes).reduce(function (obj, key) {
        obj[_HelmetConstants.REACT_TAG_MAP[key] || key] = attributes[key];
        return obj;
    }, initProps);
};

var convertReactPropstoHtmlAttributes = function convertReactPropstoHtmlAttributes(props) {
    var initAttributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Object.keys(props).reduce(function (obj, key) {
        obj[_HelmetConstants.HTML_TAG_MAP[key] || key] = props[key];
        return obj;
    }, initAttributes);
};

var generateTitleAsReactComponent = function generateTitleAsReactComponent(type, title, attributes) {
    var _initProps;

    // assigning into an array to define toString function on it
    var initProps = (_initProps = {
        key: title
    }, _initProps[_HelmetConstants.HELMET_ATTRIBUTE] = true, _initProps);
    var props = convertElementAttributestoReactProps(attributes, initProps);

    return [_react2.default.createElement(_HelmetConstants.TAG_NAMES.TITLE, props, title)];
};

var generateTagsAsReactComponent = function generateTagsAsReactComponent(type, tags) {
    return tags.map(function (tag, i) {
        var _mappedTag;

        var mappedTag = (_mappedTag = {
            key: i
        }, _mappedTag[_HelmetConstants.HELMET_ATTRIBUTE] = true, _mappedTag);

        Object.keys(tag).forEach(function (attribute) {
            var mappedAttribute = _HelmetConstants.REACT_TAG_MAP[attribute] || attribute;

            if (mappedAttribute === _HelmetConstants.TAG_PROPERTIES.INNER_HTML || mappedAttribute === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT) {
                var content = tag.innerHTML || tag.cssText;
                mappedTag.dangerouslySetInnerHTML = { __html: content };
            } else {
                mappedTag[mappedAttribute] = tag[attribute];
            }
        });

        return _react2.default.createElement(type, mappedTag);
    });
};

var getMethodsForTag = function getMethodsForTag(type, tags, encode) {
    switch (type) {
        case _HelmetConstants.TAG_NAMES.TITLE:
            return {
                toComponent: function toComponent() {
                    return generateTitleAsReactComponent(type, tags.title, tags.titleAttributes, encode);
                },
                toString: function toString() {
                    return generateTitleAsString(type, tags.title, tags.titleAttributes, encode);
                }
            };
        case _HelmetConstants.ATTRIBUTE_NAMES.BODY:
        case _HelmetConstants.ATTRIBUTE_NAMES.HTML:
            return {
                toComponent: function toComponent() {
                    return convertElementAttributestoReactProps(tags);
                },
                toString: function toString() {
                    return generateElementAttributesAsString(tags);
                }
            };
        default:
            return {
                toComponent: function toComponent() {
                    return generateTagsAsReactComponent(type, tags);
                },
                toString: function toString() {
                    return generateTagsAsString(type, tags, encode);
                }
            };
    }
};

var mapStateOnServer = function mapStateOnServer(_ref) {
    var baseTag = _ref.baseTag,
        bodyAttributes = _ref.bodyAttributes,
        encode = _ref.encode,
        htmlAttributes = _ref.htmlAttributes,
        linkTags = _ref.linkTags,
        metaTags = _ref.metaTags,
        noscriptTags = _ref.noscriptTags,
        scriptTags = _ref.scriptTags,
        styleTags = _ref.styleTags,
        _ref$title = _ref.title,
        title = _ref$title === undefined ? "" : _ref$title,
        titleAttributes = _ref.titleAttributes;
    return {
        base: getMethodsForTag(_HelmetConstants.TAG_NAMES.BASE, baseTag, encode),
        bodyAttributes: getMethodsForTag(_HelmetConstants.ATTRIBUTE_NAMES.BODY, bodyAttributes, encode),
        htmlAttributes: getMethodsForTag(_HelmetConstants.ATTRIBUTE_NAMES.HTML, htmlAttributes, encode),
        link: getMethodsForTag(_HelmetConstants.TAG_NAMES.LINK, linkTags, encode),
        meta: getMethodsForTag(_HelmetConstants.TAG_NAMES.META, metaTags, encode),
        noscript: getMethodsForTag(_HelmetConstants.TAG_NAMES.NOSCRIPT, noscriptTags, encode),
        script: getMethodsForTag(_HelmetConstants.TAG_NAMES.SCRIPT, scriptTags, encode),
        style: getMethodsForTag(_HelmetConstants.TAG_NAMES.STYLE, styleTags, encode),
        title: getMethodsForTag(_HelmetConstants.TAG_NAMES.TITLE, { title: title, titleAttributes: titleAttributes }, encode)
    };
};

exports.convertReactPropstoHtmlAttributes = convertReactPropstoHtmlAttributes;
exports.handleClientStateChange = handleClientStateChange;
exports.mapStateOnServer = mapStateOnServer;
exports.reducePropsToState = reducePropsToState;
exports.requestAnimationFrame = requestAnimationFrame;
exports.warn = warn;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/react-helmet/node_modules/react-fast-compare/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArray = Array.isArray;
var keyList = Object.keys;
var hasProp = Object.prototype.hasOwnProperty;
var hasElementType = typeof Element !== 'undefined';

function equal(a, b) {
  // fast-deep-equal index.js 2.0.1
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    var arrA = isArray(a)
      , arrB = isArray(b)
      , i
      , length
      , key;

    if (arrA && arrB) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }

    if (arrA != arrB) return false;

    var dateA = a instanceof Date
      , dateB = b instanceof Date;
    if (dateA != dateB) return false;
    if (dateA && dateB) return a.getTime() == b.getTime();

    var regexpA = a instanceof RegExp
      , regexpB = b instanceof RegExp;
    if (regexpA != regexpB) return false;
    if (regexpA && regexpB) return a.toString() == b.toString();

    var keys = keyList(a);
    length = keys.length;

    if (length !== keyList(b).length)
      return false;

    for (i = length; i-- !== 0;)
      if (!hasProp.call(b, keys[i])) return false;
    // end fast-deep-equal

    // start react-fast-compare
    // custom handling for DOM elements
    if (hasElementType && a instanceof Element && b instanceof Element)
      return a === b;

    // custom handling for React
    for (i = length; i-- !== 0;) {
      key = keys[i];
      if (key === '_owner' && a.$$typeof) {
        // React-specific: avoid traversing React elements' _owner.
        //  _owner contains circular references
        // and is not needed when comparing the actual elements (and not their owners)
        // .$$typeof and ._store on just reasonable markers of a react element
        continue;
      } else {
        // all other properties should be traversed as usual
        if (!equal(a[key], b[key])) return false;
      }
    }
    // end react-fast-compare

    // fast-deep-equal index.js 2.0.1
    return true;
  }

  return a !== a && b !== b;
}
// end fast-deep-equal

module.exports = function exportedEqual(a, b) {
  try {
    return equal(a, b);
  } catch (error) {
    if ((error.message && error.message.match(/stack|recursion/i)) || (error.number === -2146828260)) {
      // warn on circular references, don't crash
      // browsers give this different errors name and messages:
      // chrome/safari: "RangeError", "Maximum call stack size exceeded"
      // firefox: "InternalError", too much recursion"
      // edge: "Error", "Out of stack space"
      console.warn('Warning: react-fast-compare does not handle circular references.', error.name, error.message);
      return false;
    }
    // some other error. we should definitely know about these
    throw error;
  }
};


/***/ }),

/***/ "./node_modules/react-helmet/node_modules/react-side-effect/lib/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = __webpack_require__("./node_modules/react/react.js");
var React__default = _interopDefault(React);
var shallowEqual = _interopDefault(__webpack_require__("./node_modules/react-helmet/node_modules/shallowequal/index.js"));

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
function withSideEffect(reducePropsToState, handleStateChangeOnClient, mapStateOnServer) {
  if (typeof reducePropsToState !== 'function') {
    throw new Error('Expected reducePropsToState to be a function.');
  }

  if (typeof handleStateChangeOnClient !== 'function') {
    throw new Error('Expected handleStateChangeOnClient to be a function.');
  }

  if (typeof mapStateOnServer !== 'undefined' && typeof mapStateOnServer !== 'function') {
    throw new Error('Expected mapStateOnServer to either be undefined or a function.');
  }

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }

  return function wrap(WrappedComponent) {
    if (typeof WrappedComponent !== 'function') {
      throw new Error('Expected WrappedComponent to be a React component.');
    }

    var mountedInstances = [];
    var state;

    function emitChange() {
      state = reducePropsToState(mountedInstances.map(function (instance) {
        return instance.props;
      }));

      if (SideEffect.canUseDOM) {
        handleStateChangeOnClient(state);
      } else if (mapStateOnServer) {
        state = mapStateOnServer(state);
      }
    }

    var SideEffect =
    /*#__PURE__*/
    function (_Component) {
      _inheritsLoose(SideEffect, _Component);

      function SideEffect() {
        return _Component.apply(this, arguments) || this;
      }

      // Try to use displayName of wrapped component
      // Expose canUseDOM so tests can monkeypatch it
      SideEffect.peek = function peek() {
        return state;
      };

      SideEffect.rewind = function rewind() {
        if (SideEffect.canUseDOM) {
          throw new Error('You may only call rewind() on the server. Call peek() to read the current state.');
        }

        var recordedState = state;
        state = undefined;
        mountedInstances = [];
        return recordedState;
      };

      var _proto = SideEffect.prototype;

      _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        return !shallowEqual(nextProps, this.props);
      };

      _proto.componentWillMount = function componentWillMount() {
        mountedInstances.push(this);
        emitChange();
      };

      _proto.componentDidUpdate = function componentDidUpdate() {
        emitChange();
      };

      _proto.componentWillUnmount = function componentWillUnmount() {
        var index = mountedInstances.indexOf(this);
        mountedInstances.splice(index, 1);
        emitChange();
      };

      _proto.render = function render() {
        return React__default.createElement(WrappedComponent, this.props);
      };

      return SideEffect;
    }(React.Component);

    _defineProperty(SideEffect, "displayName", "SideEffect(" + getDisplayName(WrappedComponent) + ")");

    _defineProperty(SideEffect, "canUseDOM", canUseDOM);

    return SideEffect;
  };
}

module.exports = withSideEffect;


/***/ }),

/***/ "./node_modules/react-helmet/node_modules/shallowequal/index.js":
/***/ (function(module, exports) {

//

module.exports = function shallowEqual(objA, objB, compare, compareContext) {
  var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

  if (ret !== void 0) {
    return !!ret;
  }

  if (objA === objB) {
    return true;
  }

  if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  // Test for A's keys different from B.
  for (var idx = 0; idx < keysA.length; idx++) {
    var key = keysA[idx];

    if (!bHasOwnProperty(key)) {
      return false;
    }

    var valueA = objA[key];
    var valueB = objB[key];

    ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

    if (ret === false || (ret === void 0 && valueA !== valueB)) {
      return false;
    }
  }

  return true;
};


/***/ }),

/***/ "./src/components/GroupButton/GroupButton.scss":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-2!./node_modules/sass-loader/lib/loader.js??ref--1-3!./node_modules/less-loader/dist/cjs.js??ref--1-4!./src/components/GroupButton/GroupButton.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("./node_modules/style-loader/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("./node_modules/css-loader/index.js??ref--1-2!./node_modules/sass-loader/lib/loader.js??ref--1-3!./node_modules/less-loader/dist/cjs.js??ref--1-4!./src/components/GroupButton/GroupButton.scss", function() {
			var newContent = __webpack_require__("./node_modules/css-loader/index.js??ref--1-2!./node_modules/sass-loader/lib/loader.js??ref--1-3!./node_modules/less-loader/dist/cjs.js??ref--1-4!./src/components/GroupButton/GroupButton.scss");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/components/GroupButton/GroupButtonComponent.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__("./node_modules/react/react.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd__ = __webpack_require__("./node_modules/antd/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__GroupButton_scss__ = __webpack_require__("./src/components/GroupButton/GroupButton.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__GroupButton_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__GroupButton_scss__);






var ButtonGroup = __WEBPACK_IMPORTED_MODULE_5_antd__["c" /* Button */].Group;



var GroupButtonComponent = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(GroupButtonComponent, _React$Component);

  function GroupButtonComponent() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, GroupButtonComponent);

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (GroupButtonComponent.__proto__ || Object.getPrototypeOf(GroupButtonComponent)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(GroupButtonComponent, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          label = _props.label,
          options = _props.options,
          value = _props.value;


      return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        'div',
        { className: 'group-button-component' },
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          'h4',
          null,
          label
        ),
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          ButtonGroup,
          null,
          options.map(function (option) {
            return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_5_antd__["c" /* Button */],
              {
                key: option.value,
                type: option.value === value ? 'primary' : 'default',
                onClick: function onClick() {
                  _this2.props.onChange(option.value);
                }
              },
              option.label
            );
          })
        )
      );
    }
  }]);

  return GroupButtonComponent;
}(__WEBPACK_IMPORTED_MODULE_4_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (GroupButtonComponent);

/***/ }),

/***/ "./src/components/GroupButton/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GroupButtonComponent__ = __webpack_require__("./src/components/GroupButton/GroupButtonComponent.js");



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__GroupButtonComponent__["a" /* default */]);

/***/ }),

/***/ "./src/components/MultiSelector/MultiSelect.scss":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-2!./node_modules/sass-loader/lib/loader.js??ref--1-3!./node_modules/less-loader/dist/cjs.js??ref--1-4!./src/components/MultiSelector/MultiSelect.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("./node_modules/style-loader/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("./node_modules/css-loader/index.js??ref--1-2!./node_modules/sass-loader/lib/loader.js??ref--1-3!./node_modules/less-loader/dist/cjs.js??ref--1-4!./src/components/MultiSelector/MultiSelect.scss", function() {
			var newContent = __webpack_require__("./node_modules/css-loader/index.js??ref--1-2!./node_modules/sass-loader/lib/loader.js??ref--1-3!./node_modules/less-loader/dist/cjs.js??ref--1-4!./src/components/MultiSelector/MultiSelect.scss");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/components/MultiSelector/MultiSelectComponent.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__("./node_modules/babel-runtime/helpers/defineProperty.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__("./node_modules/react/react.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_antd__ = __webpack_require__("./node_modules/antd/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__MultiSelect_scss__ = __webpack_require__("./src/components/MultiSelector/MultiSelect.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__MultiSelect_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__MultiSelect_scss__);







var Option = __WEBPACK_IMPORTED_MODULE_6_antd__["n" /* Select */].Option;



var MultiSelect = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(MultiSelect, _React$Component);

  function MultiSelect() {
    var _ref;

    var _temp, _this, _ret;

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, MultiSelect);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_ref = MultiSelect.__proto__ || Object.getPrototypeOf(MultiSelect)).call.apply(_ref, [this].concat(args))), _this), _this._onChangeSwitch = function (value) {
      if (value) {
        _this.props.onChangeType(1);
      } else {
        _this.props.onChangeType(0);
      }
    }, _temp), __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(_this, _ret);
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(MultiSelect, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          options = _props.options,
          label = _props.label,
          placeholder = _props.placeholder,
          onSelect = _props.onSelect,
          _onChange = _props.onChange,
          type = _props.type,
          value = _props.value,
          multiple = _props.multiple,
          lang = _props.lang;

      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'div',
        { className: 'multi-select-component' },
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'h4',
          null,
          label,
          multiple && __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            'div',
            { className: 'switcher' },
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              'span',
              null,
              lang === 'es' ? 'Todos' : 'All'
            ),
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_antd__["q" /* Switch */], { size: 'small', onChange: this._onChangeSwitch, checked: type == 1 })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_6_antd__["n" /* Select */],
          __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({
            mode: multiple ? 'multiple' : '',
            style: { width: '100%' },
            placeholder: placeholder,
            onChange: onSelect,
            value: value,
            allowClear: true,
            notFoundContent: 'Not found'
          }, 'onChange', function onChange(value) {
            _onChange(value);
          }),
          options.map(function (option, idx) {
            return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              Option,
              { key: option.value },
              option.label
            );
          })
        )
      );
    }
  }]);

  return MultiSelect;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

MultiSelect.defaultProps = {
  multiple: true,
  lang: 'en'
};

/* harmony default export */ __webpack_exports__["a"] = (MultiSelect);

/***/ }),

/***/ "./src/components/MultiSelector/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MultiSelectComponent__ = __webpack_require__("./src/components/MultiSelector/MultiSelectComponent.js");



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__MultiSelectComponent__["a" /* default */]);

/***/ }),

/***/ "./src/components/RangeSelector/RangeSelector.scss":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-2!./node_modules/sass-loader/lib/loader.js??ref--1-3!./node_modules/less-loader/dist/cjs.js??ref--1-4!./src/components/RangeSelector/RangeSelector.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("./node_modules/style-loader/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("./node_modules/css-loader/index.js??ref--1-2!./node_modules/sass-loader/lib/loader.js??ref--1-3!./node_modules/less-loader/dist/cjs.js??ref--1-4!./src/components/RangeSelector/RangeSelector.scss", function() {
			var newContent = __webpack_require__("./node_modules/css-loader/index.js??ref--1-2!./node_modules/sass-loader/lib/loader.js??ref--1-3!./node_modules/less-loader/dist/cjs.js??ref--1-4!./src/components/RangeSelector/RangeSelector.scss");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/components/RangeSelector/RangeSelectorComponent.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__("./node_modules/react/react.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd__ = __webpack_require__("./node_modules/antd/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__RangeSelector_scss__ = __webpack_require__("./src/components/RangeSelector/RangeSelector.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__RangeSelector_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__RangeSelector_scss__);









var RangeSelectorComponent = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(RangeSelectorComponent, _React$Component);

  function RangeSelectorComponent() {
    var _ref;

    var _temp, _this, _ret;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, RangeSelectorComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_ref = RangeSelectorComponent.__proto__ || Object.getPrototypeOf(RangeSelectorComponent)).call.apply(_ref, [this].concat(args))), _this), _this._onChange = function (value) {
      _this.props.onChange(value);
    }, _temp), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(_this, _ret);
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(RangeSelectorComponent, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          label = _props.label,
          min = _props.min,
          max = _props.max,
          _props$step = _props.step,
          step = _props$step === undefined ? 1 : _props$step,
          value = _props.value;

      return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        'div',
        { className: 'range-selector-component' },
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          'h4',
          null,
          label
        ),
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_antd__["o" /* Slider */], {
          range: true,
          step: step,
          min: min,
          max: max,
          defaultValue: value,
          value: value,
          onChange: this._onChange
        })
      );
    }
  }]);

  return RangeSelectorComponent;
}(__WEBPACK_IMPORTED_MODULE_4_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (RangeSelectorComponent);

/***/ }),

/***/ "./src/components/RangeSelector/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RangeSelectorComponent__ = __webpack_require__("./src/components/RangeSelector/RangeSelectorComponent.js");



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__RangeSelectorComponent__["a" /* default */]);

/***/ }),

/***/ "./src/components/TagSelector/TagSelector.scss":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-2!./node_modules/sass-loader/lib/loader.js??ref--1-3!./node_modules/less-loader/dist/cjs.js??ref--1-4!./src/components/TagSelector/TagSelector.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("./node_modules/style-loader/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("./node_modules/css-loader/index.js??ref--1-2!./node_modules/sass-loader/lib/loader.js??ref--1-3!./node_modules/less-loader/dist/cjs.js??ref--1-4!./src/components/TagSelector/TagSelector.scss", function() {
			var newContent = __webpack_require__("./node_modules/css-loader/index.js??ref--1-2!./node_modules/sass-loader/lib/loader.js??ref--1-3!./node_modules/less-loader/dist/cjs.js??ref--1-4!./src/components/TagSelector/TagSelector.scss");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/components/TagSelector/TagSelectorComponent.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__("./node_modules/react/react.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd__ = __webpack_require__("./node_modules/antd/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__TagSelector_scss__ = __webpack_require__("./src/components/TagSelector/TagSelector.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__TagSelector_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__TagSelector_scss__);









var TagSelectorComponent = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(TagSelectorComponent, _React$Component);

  function TagSelectorComponent() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, TagSelectorComponent);

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (TagSelectorComponent.__proto__ || Object.getPrototypeOf(TagSelectorComponent)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(TagSelectorComponent, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          options = _props.options,
          value = _props.value,
          label = _props.label;

      return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        'div',
        { className: 'tag-selector-component' },
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          'h4',
          null,
          label
        ),
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          'div',
          { className: 'options' },
          options.map(function (option) {
            return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_5_antd__["c" /* Button */],
              {
                key: option.value,
                type: value.indexOf(option.value) > -1 ? 'primary' : 'default',
                onClick: function onClick() {
                  _this2.props.onChange(option.value);
                }
              },
              option.label
            );
          })
        )
      );
    }
  }]);

  return TagSelectorComponent;
}(__WEBPACK_IMPORTED_MODULE_4_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (TagSelectorComponent);

/***/ }),

/***/ "./src/components/TagSelector/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TagSelectorComponent__ = __webpack_require__("./src/components/TagSelector/TagSelectorComponent.js");



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__TagSelectorComponent__["a" /* default */]);

/***/ }),

/***/ "./src/constants/varieties.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VARIETIES_LABELS; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__("./node_modules/babel-runtime/helpers/defineProperty.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);


var _VARIETIES_LABELS;

/* harmony default export */ __webpack_exports__["b"] = ([{ label: 'Malbec', value: 'malbec' }, { label: 'Cabernet Sauvignon', value: 'cabernet_sauvignon' }, { label: 'Merlot', value: 'merlot' }, { label: 'Syrah', value: 'syrah' }, { label: 'Cabernet Franc', value: 'cabernet_franc' }, { label: 'Pinot Noir', value: 'pinot_noir' }, { label: 'Bonarda', value: 'bonarda' }, { label: 'Carmenere', value: 'carmenere' }, { label: 'Petit Verdot', value: 'petit_verdot' }, { label: 'Tannat', value: 'tannat' }, { label: 'Tempranillo', value: 'tempranillo' }, { label: 'Sangiovese', value: 'sangiovese' }, { label: 'Nebbiolo', value: 'nebbiolo' }, { label: 'Carignan', value: 'carignan' }, { label: 'Aglianico', value: 'aglianico' }, { label: 'Graciana', value: 'graciana' }, { label: 'Caladoc', value: 'caladoc' }, { label: 'Marselan', value: 'marselan' }, { label: 'Grenache', value: 'grenache' }, { label: 'Ancellotta', value: 'ancellotta' }, { label: 'Barbera', value: 'barbera' }, { label: 'Chardonnay', value: 'chardonnay' }, { label: 'Sauvignon Blanc', value: 'sauvignon_blanc' }, { label: 'Torrontes', value: 'torrontes' }, { label: 'Pinot Gris', value: 'pinot_gris' }, { label: 'Viognier', value: 'viognier' }, { label: 'Semillón', value: 'semillon' }, { label: 'Chenin Blanc', value: 'chenin_blanc' }, { label: 'Riesling', value: 'riesling' }, { label: 'Tocai', value: 'tocai' }, { label: 'Albariño', value: 'albariño' }, { label: 'Marsanne', value: 'marsanne' }, { label: 'Gewurztraminer', value: 'gewurstraminer' }, { label: 'Petit Manseng', value: 'petit_manseng' }, { label: 'Fiano', value: 'fiano' }, { label: 'Canarí', value: 'canari' }, { label: 'Pinot Grigio', value: 'pinot_grigio' }, { label: 'Malvasía', value: 'malvasia' }]);

var VARIETIES_LABELS = (_VARIETIES_LABELS = {
  'malbec': 'Malbec',
  'cabernet_sauvignon': 'Cabernet Sauvignon',
  'merlot': 'Merlot',
  'syrah': 'Syrah',
  'cabernet_franc': 'Cabernet Franc',
  'pinot_noir': 'Pinot Noir',
  'bonarda': 'Bonarda',
  'carmenere': 'Carmenere',
  'petit_verdot': 'Petit Verdot',
  'tannat': 'Tannat',
  'tempranillo': 'Tempranillo',
  'sangiovese': 'Sangiovese',
  'nebbiolo': 'Nebbiolo',
  'carignan': 'Carignan',
  'aglianico': 'Aglianico',
  'graciana': 'Graciana',
  'caladoc': 'Caladoc',
  'marselan': 'Marselan',
  'grenache': 'Grenache',
  'ancellotta': 'Ancellotta',
  'barbera': 'Barbera',
  'chardonnay': 'Chardonnay',
  'sauvignon_blanc': 'Sauvignon Blanc',
  'torrontes': 'Torrontes',
  'pinot_gris': 'Pinot Gris',
  'viognier': 'Viognier',
  'semillon': 'Semillón',
  'chenin_blanc': 'Chenin Blanc',
  'riesling': 'Riesling',
  'tocai': 'Tocai',
  'albariño': 'Albariño',
  'marsanne': 'Marsanne',
  'gewurstraminer': 'Gewurztraminer',
  'petit_manseng': 'Petit Manseng',
  'fiano': 'Fiano'
}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_VARIETIES_LABELS, 'pinot_gris', 'Pinot Gris'), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_VARIETIES_LABELS, 'canari', 'Canarí'), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_VARIETIES_LABELS, 'pinot_grigio', 'Pinot Grigio'), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_VARIETIES_LABELS, 'malvasia', 'Malvasía'), _VARIETIES_LABELS);

/***/ }),

/***/ "./src/routes/Home/assets/Duck.jpg":
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAKAAA/+4ADkFkb2JlAGTAAAAAAf/bAEMADAgICAkIDAkJDBELCgsRFQ8MDA8VGBMTFRMTGBcSFBQUFBIXFxscHhwbFyQkJyckJDUzMzM1Ozs7Ozs7Ozs7O//bAEMBDQsLDQ4NEA4OEBQODw4UFBARERAUHRQUFRQUHSUaFxcXFxolICMeHh4jICgoJSUoKDIyMDIyOzs7Ozs7Ozs7O//AABEIARgBEAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APVaKKKACiiigAooooAKKKKACiiigAooooAKKKKACiqdxqMUZ2x/O3r2FUpLueX7zHHoOBXJXx1GldX5pLpH/MuNKUvI1ZLiGIfO4Ht1NZ9xqjk4iG1f7x61WpCARivNxGaVZ+7T/dry3+82jRit9RxnlflnJ/GkWRweGII96TaAoHek6CvPlWq813N+tzVRj2RZh1OWI4k/eL+v51ft7uGfhDhv7p61iOpPtSb3UhkOCOhFdeGzWtBqNT95D/yb7yJ0IvbRnR0VXsroXMIY/wCsHDj3qxX0EZKUVKLupK6ZytNOzCiiiqEFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFACMyqpZjgDkk1k3moNKSkXyx+vc0zUL4zP5UZ/dL39TVQV5GOx7bdKk9NpSXXyR0UqX2pfJDxUiio1qVeleYldmzFxSU6mE1M426ggpDQc4yASPYE00MG6GspQkrXTV9roaAmmGnmmkVFhixTPDIJIzgj9a3LW6S5j3rwRwy+hrnyKktbl7aYOvToy+or0suxzpSVOb/dy/8AJX3M6tLmV18R0VFNR1kQOhyrDINOr6I4wooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArO1W88tPIQ/M4+Y+g/+vV6WRYo2kb7qjJrmppmmlaRvvMcmuLMMR7Klyx+Kei9OppRhzS12QA05ajFSrXg9TrJFqQGoxThVrRCY7NCvDGktzP8A6mBS7++O34001T1ssPD+pbPvLD5n4IwY/oK6MBGE8XTjU+G7/AzqtqnJx3schqHxU1u11V0gitzZxnAg2nOPTzAev4V3ui6ppvibS01C2Gxj8si8b45B1U+teBTOWkZicliSfxrv/g9fSJqd7YZ/dTQiYD/ajYLn8mr6KcYVFKMopxfRnFFyjZ3dzvZI3icxv1Hf1HrUZrS1CMGMSd0OD9DWeRXy2PwvsKzjH4X70fQ9ClPmjfr1IzTDUhFMIrj6mhbsNWtbaeDT55Csl1vaDI+XKEAru9TurbrzvxlDL/ZKX0OfM0+VZSR18t/kf8jtNdX4U1xNa0iO4LZnjwk/+8B978a+twclUwtKcekeWXqtDgqXjVkn11Rs0UUVsSFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBla3c7UW3Xq3zN9B0rHB5qbUZ/Ou5HByAdq/QcVAtfO5hWc68tdI+6vkdlGNoLz1JFqZaiWplFc0S2PApwFCinVrayJGmm4UhkkG6N1KOp6FWGGH5U4001j7SUJqcXaUHdMdrqz6njviXwvfaJqDx+W0tm5JtrgAlWXsrEdGHQiu5+FPhy6tBPrF3G0JmTyrdXG0lSQzPg9uOK6tJHQ5U49uo/EVaTUJAPmQMfY4r3sPm1Ccfffs521TV18rHLLDyT01RYviBbsP72APzrNIqWe4eYgtgAdFHSsbU9bhtMxxYkm7jsPrXm4+usRWXslzRirX7nVhqFSXuxV5M0JZI40LyMFUdSeKpDVNPdtqzDP0OP5VzVzf3V22Z3LDsvRR+FMVuaxWFTXvPXyPUhl6Uffk+b+7sdeBBMjRyASwSqUlXqGRhtYfkaw/BdnfeHvFFxo0wZ7S4jaS2nwdrxr8yPnpnsfeoba9ki+65Wtq18SSQw7HXzlXkbR8w/KvWy29CEqcpxcJarXZ9Tz8Zl9S6lBc1jsKZLNFCu+V1jUfxMQB+tctceNXki2WcGybHzPIQVUevFcxf38945aaVp37ux4/4CvaumpiIxV17xOHyutUf7z91H739x6MmtaS77FvIS3pvFXAQwBByD0IryHHatbRfEF7pUqgMZbUn95CTxj1X0NZ08Xd2nHlv1R0Vsmai3SnzSX2ZK1/RnpNFRW1xDdQJcQNvilAZWHoalrrPHaadno0FFFFABRRRQAUUUUAFFFFABRRRQAVHcSeVBJJ/dUn8hUlU9XfZp8vvgfmRUzlyxlLsm/uGldpHNE805TURbmlDV8rUbcm33PQS0sWUNTKaqK9TJJShITRbU8UZFRB80u6tJTVibDyaTNNzSg1hIY4UjMFBZjgDkk0yWVIkMjnaq8k1zmqapJckopKxdl7n61tRoSqbaRW76G1DDyqystF1ZY1TXiQ0NocL0aXuf8AdrC+Zzk/nTmU43NSB+3Su+FGMFbY9ijShSjaC9WAXFOFKBupCQpwDknsKHCW/cu44YHJ6U5n4wx2Ke3fHrUUj+Vww3S9k6hfdvf2qH5mJZjljySaqNNJ3kuaXbovUXLfVksku4bEG2MdF9T6tUdGKQmtWm9WO66BQCaTNJmpsO52XgXUmPnadIeAPNhz27OP5GuvrzfwpKYtdtSP4yyH6Mpr0ivRw8nKmr9ND5zNKahiW19tKXz6hRRRWpwhRRRQAUUUUAFFFFABRRRQAVn65n+z3I7MufzrQqrqcZk0+dR12lh/wH5v6VFRc1OaXWLX4Djo16nIk0BqYx5pA1fMTjqz0UTB6lSSqoanK9Q4jLqy1KHzVFXqVJKzd0KxbBzTiwUZPAHWoFlAGScAdTVee7EiHyzlR0x3NdOCwssRO20Y/Exxg5PyKOr34J254H3F/qaw2kJbcTzVi5huZJiSpJNN/s+5PVcfU4r1ZUpaQpwahHb/ADPYoxp04JXRAzk96buxUzW6x/62VEHcA7j+Qpn2m2i/1EfmuP8AlpJ0/Baj2Tv77UfXV/ca866a+n+Y6OKV13nEcXeRuB/9eka4jjBFvkt3nbr/AMBHaq8s8kzbpWLnsOw+gphJNVdL4f8AwJ7/AC7Ak3v939bjt4HTr3NIXPrTc0mamxY7e3rSiQ96ZRTE0iTdmlBqLJBqVFJpW6ES0NnwrE0uuWuP4WLn6KpNelVyXgfSmjEmoyjAYeXDnuM/M36Yrra9KjBxgk/U+dzKqqmIdtoJR+YUUUVocQUUUUAFFFFABRRRQAUUUUAFIyhlKnoRg/jS0UAcPdRGGd4j1Riv5VXzW34ktfLuVuFHyzDB/wB5f/rVhtXgYqlyVpLzv8md9KXNBMcGpQ1R5pQa5nE0JQ1SB6r7qUNUOIx19I/2OYIeSprmFuriP7jsv0JrpmwylT0PBrm7uB7acp0HVT7V14J2vFaPc7MHNJSg+uo06ncngzt+dRNdM335Cfxp/mbv9YqyfUc/mKTZak8xlT7EH+ddzd9236nWvJr8iMSKenNOy3pTwsA+6SPqP/r0AJ2NQ9OhrFeaGjNOC+tPAoxU3NEhu0UbRTttGKVxjNgppUjpUuKMU+YVkOsbK6vpxBbRNK/UhRnA9TXY6R4KYMsuoEKo58pTlj9T2rmdJvbvT7rz7R/LfHzf3WA52sPSvSNI1SHVLNbiP5W4Eiehrtwqg1e15eZ5GaVcRTso2VN6cy+K/mXI40iRY41CogwqjgACnUUV1HhBRRRQAUUUUAFFFFABRVeTULONtrSrkdhz/KnRXdtMcRyqx9M8/lUqcW7KSb7XHZ72JqKKKoQUUUUAVNTsxeWbwj7/AN6M/wC0On59K4lwVJBGCOCD616DXKeI7HyLr7Qg/dz8n2fv+fWvPzKjzQVVLWOkvQ6MNOz5X129THzRmkNJmvJOxIdmlzTc0uaVh2HZqrqFp9pjyv8ArF+7/hVgGlpxbi010HFuLut0cywKkqwwR1FIDW5d6fHcfOvyyevr9ayZbeSFtsgwa7qddTXn2O+lUjNdpdiLNFO20uKq5skNB/Cnhj60baNtJ2KTkupKjRn72V9xz+nFTCNcfI8cmezfK364/nVULTgrUJpdCuZ9yR0KnlNv45FMwPSlAf0qe2sru6bZBC8jHsoJpfE7R69BupGKvJpEAJxgcCuz8CJMUuZSCIPlRT6sMk/kKraX4JnkZZNRbyo+piU5c/U9BXY29vDbQrBAgjiQYVR0ruw1CcHzS002PIzLH0p03Sp++29ZdFbsSUUUV1HjBRRRQAUUUUAFYmp6mZCYYDiMcMw/iP8AhVrWLwwxCFDiSXqfRf8A69YJrzMxxbh+6g7Nr3n+hvRp3957dBGJpu4ig03FePzNO51W0L1tq13BgB96j+F+R/jWpba3bS4WX903qeV/OuewacqntXbQx9aGjfOu0jKdGD8mdgrKwDKQQehHIpa5m1muLc5SQqO69QfwqxLqV1J1faPReK9FZhS5btNPsYOjK+jTNx5I0GXYL9Tis/VZLG5spIWkG7G5CAThh0rLMjE5JyfU1HKSVPvWFXMVKLioKzVve1LjRs077GMwIpuDVqSA5pnkmvL5kdiZBg0YNWBCaUQmjnQ7lfmlqx5BoNuaXOguQ02SKOVdsi7hU/kEUeUaXMujGpW2MuXSFPMT49m/xqq+nXSfwhvoa3dlBStY4ia8/U3jiqi3d/U577LODzG35U4W8ndG/I1usKSr+svsafW5fyoyEtyT9xvyrodF8MLeqJpg0cPrxlj/ALIqBcccV1uiTxyWEaKfmj+Vl/HNdWAcatVqdtFdRfU5MXi6ih7nu3e4lt4f0i2A2WyOw/ikG8/+PVfRERdqKFUdlGB+lOor11GMVaKS9Dy5TlLWUnL1dwooopkhRRRQAUUUUAFIzBVLMcBRkn2FLWdrdx5Vp5YPzTHb/wABHJqKk1CEpvaKuNK7SXUx7m4a5uHmPRj8o9AOlRGhelKRXzM5yqSlKW8ndndFJJJdBm2gLTqWhRXUdwCinDjpSUU722JFpRSAU4Cp5mOwtGKXFGKlyYDDEppvkCpwKXFSO5CIFp3kr6VLiloTFci8lfSkMQqfFG2hyYXKzQj0qNoaubaQpWbv3KUjPaE1G0RrRMYpjRCkpSRakZjRGm+W1aLQg1GYatVWWpFNVIPNW7aeWBw8bFGHcUeXQFxVwrNSTi7NdhStJao3bTW0cBbkbT/fHT8RWmjpIoZGDKehHNciKmguJoW3RMVPt0P4V62HzOSsqq5l/MtzkqYZbw08jqqKzLTWY3wlwNjf3x90/X0rSBBGQcg9CK9SnVhUjzQakjllFxdmrC0UUVYgooooAK5vWbjzr5kBysI2D69WroJ5RDC8rdEUt+VcluLMXblmOSfc15+Z1LUlBfbevojahG8r9h4p4XNNWpFNeSopHQ2MKGjaalBFGaTS7hcjANOCE08GlBqNAGiM04RmnZpc0m12DUb5dG2nZpahyV7DGUtFFOwAKWkFOosAopaQClosIKKKKloY0imkU+kqGh3IytNKVLikIqbDuQFKaUqwRTStFiuYg20YqUrSEVabQXGYq3ZahNanafni7of6VWxSYrpo4mdKScXZkTgpKzOngninjEkZyp/MfWpK5q1upbWTenQ/eXsRXQwTxzxCWM5B/MH0Ne/hcVGvHtJfEv1RxVKbg/IkooorpIM3XZvLstg6ysF/AfMf5Vz68VqeIZd1xFF2RdxHux/+tWRvrxswnetb+RJfPc6aC931Jg1O31X8ylEgrz3I2sWN9KGquHp6tUthYnBpwNQhqeDUgSinCmA08Cq5RDsUUtIamUdQEooop2ABS0UtOwC0UlGaGAtJRmioYwoopaloBKTFOoxRyBcYRSEVJikIp8oXI8U0ipCKTFKw7kZWm4qTFIRQFyPFW9NuzbzgMf3T8MPT0NVsU010YavOlUjJdP6sTOKkrM6qiqel3Hn2wDHLx/Kf6Vcr6aE1OKktpK5xNWbXY5XVpfM1GY/3TtH/AAEYqmSDT7l91xK/dnY/qahzXz+Kk5VJvvJnZTVor0Hjb6UoxUeaXNcupZJxSg1HmnA0hkgNPVqiBpwNK4icNUqNVZWqRGp81hNFjNBNM3Um6mpCsPzS5qPdS7qdwH5ozTN1G6lzBYfmjNMzRmk5DsPzRmm5pc1IDs04UylzVJCH0UgNKDWiQgpDS0hpNANpDSmkrNoY0ikNOptSMQ0w0800imhlvR5vLuth+7IMfiORW7XMROY5kkH8LA/rXTV9BllTmocr+w/wZyV1aV+5xMmdzfU1HVi6Ty7iaM/wuw/I1XNeZiI2nLybOiD0XoGaUGkoFczLHClBpKKQx4NPBqIGnA0gJQaepqEGng1EgJ93FNL0zdSZouFiUPTg1Q5pQ1FxWJd1G6o80uam4x+6lzUefWlBouIkBp2ajBp1UgY4GnA0wGlqkIeDSg0zNLmq5hWH5pM03NFDYWFzSE0maKljDNJQTSZpALTTTqQ00gGEV0sB3QRt6qp/Subro7Xi2i/3F/kK9rKtqn/bpz4joc3rcJi1ByOkgDj8eD+orOJ9RXReIrbfAlwo5iO1v91v/r1z7DvWeOpuNSTS0l7xdF3ivLQZkUUuBRgV5716GwUCiipaYxc0oNNpakBwPNSA1EKeDxSaAcTzRmmZoBpWAkzSg0wGnCpsA/NLmmUoNJoB2aXNNzS0rAPBpwNRinCncCQGlzTBS5p3EPzRmm0tO4C0uabS0XAKTNFBoQCE03vSmkqkA4GlNIBSE00tRCqCzBR1Y4H410qqFUKOigD8qwtLi828Un7sfzH+n61v17uWQtScv5n+COau/eS7DJokmieJxlXBU/jXHXMD207wSfeQ4z6jsa7SsvXNONzF9oiGZohyB1ZfT8K3xVH2kLr4ok0p8rt0ZzVFICCOKWvGlCzOoSiijms2igooxSgVm0MUUE0oFNPWpAWlptLRYBwNOBplOFKwD80tNFLU2AUGlpKUUmgHA04GmUopWAkpaYDTqAHZoBpuaXNADqWm5ozTFYdSUmaM0XAKKTNIWppgOJpjNSM1XdJsTcSedIP3KHgf3m/+tXRh6Mqs1GPXfyXcmUlFNs0dJtjDb73GHl+Y+w7Cr1FFfSQgoRUVtFWOJtttvqFFFFUIxNW8P+e7XNiwjnPLxN9xz6/7JrnZZHt5fIu42gl/uvxn3U9D+Fd7UN1Z2t5EYbqJZoz/AAuM/l6Vy18HCpqnyS/BmsKzjo9V+JxQdT0OacMVo3vgsDL6XctCevkzZdPwb7w/WsS7s9e0/JurN3jH/LWD96uP+A/MPxFedVwVaG0eZd0dMalOXW3roW+KXisqHV7eQ7Q4DDqp4I/CrS3SN0Oa5JQmtGrGli0TSVCJlPenhwai1hWH0tNBpwxSYCinCminCkwFFOpoNLmlYBwpabml3UhjgaXNMzS5pWAdmnA0zdSbqXoKxLmjNR7qTfSaY7E26jdUW+kLUWYWJSwpN9RFwOpxT4obic/uYnk9wDj8zxWkKU5O0U5eiuJ2W+gFqaWrRg0K7k5mZYR6D5m/wrTttKs7chgvmOP435P4DpXdRy2tLWS9mv72/wBxlKvBbe8/IyLHS57pg8gMcHUseCf90V0McaRIscY2oowAKdRXr4fDQoRtHd7ye7OadRzev3BRRRW5AUUUUAFFFFABRRRQBUvNJ0y+H+mWsU5P8ToC3/fXWsifwLoUmTAJrU/9MpDj/vmTeKKKifs/t8v/AG8XHn+zf5FKTwJcpza6m3ss0Qb9UZf5VAfCniKL7sltOPZnQ/qpH60UVx1fqP2rf9um0fb/APDjDpHiKP71lv8AdJEb+bA037PqyffsJx9E3f8AoOaKK45/UentPlY1XtevL+Im66X79tOv1icf+y0huCOqOPqjD+Yoornl9X+zz/gWubrYb9sQHByPqDSi9iP8VFFZv2X94Yv2yL+8KUXSHoc/Siip/d/3hjxMT0Vj9FJ/pUiCd/uwyH6I3+FFFNex68/ysJ38iUWt833baX/vgj+dSLpuqP0t2H+8VH8zRRWsfqX2va/LlJftOnL+JMuiam3VET6v/wDEg1Mnh68P35o1+gLf4UUV0U/7N68//b1//bTOXt+nL8v+CTp4cT/lpcMfZVC/z3VYTQdPX7weT/eY/wDsuKKK7af9n/Y9n/29/wDbGUvrHXm+X/ALMVhZw/6uFFPrgE/masUUV2R5be5a393Yxd763+YUUUVQgooooAKKKKAP/9k="

/***/ }),

/***/ "./src/routes/Home/assets/arrow.svg":
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjNmExMDRhIiBkPSJNMCAxMmMwIDYuNjI3IDUuMzczIDEyIDEyIDEyczEyLTUuMzczIDEyLTEyLTUuMzczLTEyLTEyLTEyLTEyIDUuMzczLTEyIDEyem03LjU4IDBsNS45ODgtNS45OTUgMS40MTQgMS40MTYtNC41NzQgNC41NzkgNC41NzQgNC41OS0xLjQxNCAxLjQxNi01Ljk4OC02LjAwNnoiLz48L3N2Zz4K"

/***/ }),

/***/ "./src/routes/Home/assets/background.jpg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "4a9886cb93d6eeecee64ebad97cf0659.jpg";

/***/ }),

/***/ "./src/routes/Home/assets/check.svg":
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMjQgMjQiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHBhdGggZmlsbD0iI0JEMjY4NSIgZD0iTTEyLDBDNS40LDAsMCw1LjQsMCwxMnM1LjQsMTIsMTIsMTJzMTItNS40LDEyLTEyUzE4LjYsMCwxMiwweiBNMTAuOCwxNy4zbC00LjUtNC40bDEuOS0xLjlsMi42LDIuNQoJbDUuNi01LjhsMS45LDEuOUwxMC44LDE3LjN6Ii8+Cjxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHBvaW50cz0iOC4xLDExLjEgMTAuOCwxMy42IDE2LjQsNy44IDE4LjIsOS42IDEwLjgsMTcuMyA2LjIsMTIuOSAiLz4KPC9zdmc+Cg=="

/***/ }),

/***/ "./src/routes/Home/assets/star.svg":
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZjVkNTQxIiBkPSJNMTIgLjU4N2wzLjY2OCA3LjU2OCA4LjMzMiAxLjE1MS02LjA2NCA1LjgyOCAxLjQ4IDguMjc5LTcuNDE2LTMuOTY3LTcuNDE3IDMuOTY3IDEuNDgxLTguMjc5LTYuMDY0LTUuODI4IDguMzMyLTEuMTUxeiIvPjwvc3ZnPgo="

/***/ }),

/***/ "./src/routes/Home/components/HomeView.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__("./node_modules/react/react.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_intl__ = __webpack_require__("./node_modules/react-intl/lib/index.es.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_antd__ = __webpack_require__("./node_modules/antd/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_config__ = __webpack_require__("./src/config/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_helmet__ = __webpack_require__("./node_modules/react-helmet/lib/Helmet.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_components_TagSelector__ = __webpack_require__("./src/components/TagSelector/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_components_MultiSelector__ = __webpack_require__("./src/components/MultiSelector/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_components_RangeSelector__ = __webpack_require__("./src/components/RangeSelector/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_components_GroupButton__ = __webpack_require__("./src/components/GroupButton/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_classnames__ = __webpack_require__("./node_modules/classnames/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_react_anchor_link_smooth_scroll__ = __webpack_require__("./node_modules/react-anchor-link-smooth-scroll/lib/anchor-link.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_react_anchor_link_smooth_scroll___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_react_anchor_link_smooth_scroll__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__assets_Duck_jpg__ = __webpack_require__("./src/routes/Home/assets/Duck.jpg");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__assets_Duck_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15__assets_Duck_jpg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_constants_varieties__ = __webpack_require__("./src/constants/varieties.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__HomeView_scss__ = __webpack_require__("./src/routes/Home/components/HomeView.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__HomeView_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17__HomeView_scss__);


















var WINE_TYPE = [{ label: 'Red', value: 'red' }, { label: 'White', value: 'white' }, { label: 'Rose', value: 'rose' }, { label: 'Dessert', value: 'dessert' }, { label: 'Sparkling', value: 'sparkling' }];



var HomeView = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(HomeView, _React$Component);

  function HomeView(props) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, HomeView);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (HomeView.__proto__ || Object.getPrototypeOf(HomeView)).call(this, props));

    _this._onChangeFilter = function (name, value) {
      var filters = _this.state.filters;
      filters[name] = value;
      _this.setState({ filters: filters });
    };

    _this._onChangeQuery = function (evt) {
      _this.setState({ query: evt.currentTarget.value });
    };

    _this._search = function (evt) {
      _this.props.router.push({
        pathname: '/wines',
        state: {
          filters: _this.state.filters,
          query: _this.state.query
        }
      });
    };

    _this.state = {
      filters: {
        varieties: [],
        type: []
      },
      query: '',
      popupVisible: false
    };
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(HomeView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.resetFilters();
      // this.props.getArticles()
    }
  }, {
    key: 'getStarts',
    value: function getStarts(items) {
      return items.map(function (item, index) {
        var stars = [];

        for (var i = 0; i < item.stars; i++) {
          stars.push('<i></i>');
        }

        return '<li class="star" key=' + index + '><div>' + stars.join('') + '</div><span class="star-copy">' + item.copy + '</span></li>';
      }).join('');
    }
  }, {
    key: 'showPopup',
    value: function showPopup(event) {
      event.preventDefault();

      this.setState({ popupVisible: true });
    }
  }, {
    key: 'closePopup',
    value: function closePopup(event) {
      event.preventDefault();

      this.setState({ popupVisible: false });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          loading = _props.loading,
          articles = _props.articles,
          intl = _props.intl;
      var formatMessage = intl.formatMessage,
          messages = intl.messages;


      return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        'section',
        { className: 'home-view' },
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_8_react_helmet__["Helmet"],
          null,
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            'title',
            null,
            'VinoApp'
          ),
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('link', { rel: 'canonical', href: 'http://web.vinoapp.co' })
        ),
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          'div',
          { id: 'fullpage' },
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            'div',
            { className: 'section section0', id: 'home' },
            __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
              'div',
              { className: 'top' },
              __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                'div',
                { className: 'top-content' },
                __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                  'h1',
                  null,
                  messages.home.search.title
                ),
                __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('br', null),
                __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                  __WEBPACK_IMPORTED_MODULE_6_antd__["d" /* Card */],
                  { className: 'search-container' },
                  __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_6_antd__["m" /* Row */],
                    { gutter: 30 },
                    __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                      __WEBPACK_IMPORTED_MODULE_6_antd__["e" /* Col */],
                      { className: 'gutter-row', span: 7 },
                      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                        'h4',
                        { style: { marginBottom: '5px' } },
                        messages.home.search.wineName
                      ),
                      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_antd__["h" /* Input */].Search, {
                        className: 'search-field',
                        placeholder: messages.home.search.wineNamePlaceholder,
                        size: 'large',
                        value: this.state.query,
                        onChange: function onChange(value) {
                          _this2._onChangeQuery(value);
                        },
                        onKeyDown: function onKeyDown(evt) {
                          if (evt.keyCode === 13) {
                            _this2._search();
                          }
                        }
                      })
                    ),
                    __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                      __WEBPACK_IMPORTED_MODULE_6_antd__["e" /* Col */],
                      { className: 'gutter-row', span: 7 },
                      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10_components_MultiSelector__["a" /* default */], {
                        label: messages.home.search.wineType,
                        placeholder: messages.home.search.wineType,
                        options: WINE_TYPE,
                        value: this.state.filters.type,
                        multiple: false,
                        onChange: function onChange(value) {
                          _this2._onChangeFilter('type', value);
                        } })
                    ),
                    __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                      __WEBPACK_IMPORTED_MODULE_6_antd__["e" /* Col */],
                      { className: 'gutter-row', span: 7 },
                      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10_components_MultiSelector__["a" /* default */], {
                        label: messages.home.search.varietal,
                        placeholder: messages.home.search.varietalPlaceholder,
                        options: __WEBPACK_IMPORTED_MODULE_16_constants_varieties__["b" /* default */],
                        value: this.state.filters.varieties,
                        onChange: function onChange(value) {
                          _this2._onChangeFilter('varieties', value);
                        } })
                    ),
                    __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                      __WEBPACK_IMPORTED_MODULE_6_antd__["e" /* Col */],
                      { className: 'gutter-row btn-col', span: 3 },
                      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_6_antd__["c" /* Button */],
                        {
                          onClick: this._search,
                          style: { height: '48px', marginTop: '23px' },
                          type: 'primary' },
                        messages.home.search.button
                      )
                    )
                  )
                )
              )
            ),
            __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
              'div',
              { className: 'container' },
              __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_6_antd__["m" /* Row */],
                { gutter: 30 },
                __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                  __WEBPACK_IMPORTED_MODULE_6_antd__["e" /* Col */],
                  { className: 'col content' },
                  __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                    'div',
                    { className: 'banner-txt', style: { minHeight: 200 } },
                    __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('h1', { dangerouslySetInnerHTML: { __html: messages.home.title } }),
                    __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                      'p',
                      null,
                      messages.home.text1
                    ),
                    __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                      'p',
                      null,
                      messages.home.text2
                    ),
                    __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                      'h3',
                      null,
                      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                        'p',
                        null,
                        messages.home.callToAction
                      )
                    ),
                    __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                      'div',
                      { className: 'flex', style: { paddingTop: 15 } },
                      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                        'a',
                        {
                          href: 'https://play.google.com/store/apps/details?id=com.vinoapp&hl=es&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1',
                          target: '_blank', style: { marginRight: 15 } },
                        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('img', { alt: 'Disponible en Google Play', src: 'google-play-badge.png', width: '135' })
                      ),
                      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                        'a',
                        { href: 'https://itunes.apple.com/ar/app/vinoapp/id1175959523?mt=8', target: '_blank' },
                        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('img', { className: 'img-responsive', alt: 'Disponible en App Store', src: 'ios-badge.svg', width: '100%' })
                      )
                    )
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                  __WEBPACK_IMPORTED_MODULE_6_antd__["e" /* Col */],
                  { className: 'col image' },
                  __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('img', { src: 'home-smartphone-hand.png' })
                )
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            'div',
            { className: 'section section1', id: 'theApp' },
            __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
              'div',
              { className: 'content-wrapper' },
              __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                'div',
                { className: 'left' },
                __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                  'div',
                  { className: 'embed-container' },
                  __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('iframe', { src: 'https://player.vimeo.com/video/155154174?title=0&byline=0&portrait=0', frameBorder: '0', webkitAllowFullScreen: true, mozallowfullscreen: true, allowFullScreen: true })
                ),
                __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                  'div',
                  { className: 'btn-link-wrapper' },
                  __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_14_react_anchor_link_smooth_scroll___default.a, { className: 'btn-link', offset: '50', href: '#home', style: { backgroundImage: 'url(' + messages.home.section1.btn1 + ')' } }),
                  __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_14_react_anchor_link_smooth_scroll___default.a, { className: 'btn-link', offset: '50', href: '#how', style: { backgroundImage: 'url(' + messages.home.section1.btn2 + ')' } })
                )
              ),
              __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                'div',
                { className: 'right' },
                __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                  'h2',
                  null,
                  messages.home.section1.title
                ),
                __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                  'h3',
                  null,
                  messages.home.section1.copy
                ),
                __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                  'ul',
                  null,
                  messages.home.section1.items.map(function (item, index) {
                    return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                      'li',
                      { key: index },
                      item
                    );
                  })
                )
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_13_classnames___default()('section', 'section2', { 'show': this.state.popupVisible }), id: 'wineries' },
            __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
              'h2',
              null,
              messages.home.section2.title
            ),
            __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
              'h3',
              null,
              messages.home.section2.subtitle
            ),
            __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
              'p',
              null,
              messages.home.section2.copy
            ),
            __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
              'div',
              { className: 'items-wrapper' },
              messages.home.section2.items.map(function (item, index) {
                return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                  'div',
                  { className: 'item-wrapper', key: index },
                  __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('img', { className: 'image', src: item.image, alt: '' }),
                  __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                    'h4',
                    null,
                    item.title
                  ),
                  __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                    'p',
                    null,
                    item.copy
                  )
                );
              })
            ),
            __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
              'div',
              { className: 'section2PopUp' },
              __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('button', { onClick: function onClick(e) {
                  return _this2.closePopup(e);
                }, className: 'arrow' }),
              __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                'h2',
                null,
                messages.home.section2.popup.title
              ),
              __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                'div',
                { className: 'article-wrapper' },
                __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                  'article',
                  null,
                  __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                    'h3',
                    null,
                    messages.home.section2.popup.sommeliers.title
                  ),
                  __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                    'h4',
                    null,
                    messages.home.section2.popup.sommeliers.subtitle
                  ),
                  __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                    'p',
                    null,
                    messages.home.section2.popup.sommeliers.copy
                  ),
                  __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                    'h4',
                    null,
                    messages.home.section2.popup.scaleSommeliers.title
                  ),
                  __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                    'ul',
                    null,
                    messages.home.section2.popup.scaleSommeliers.items.map(function (item, index) {
                      return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                        'li',
                        { key: index },
                        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                          'span',
                          null,
                          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                            'em',
                            null,
                            item.title
                          )
                        ),
                        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                          'span',
                          null,
                          item.copy
                        )
                      );
                    })
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                  'article',
                  null,
                  __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                    'h3',
                    null,
                    messages.home.section2.popup.users.title
                  ),
                  __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                    'h4',
                    null,
                    messages.home.section2.popup.users.subtitle
                  ),
                  __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                    'p',
                    null,
                    messages.home.section2.popup.users.copy
                  ),
                  __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('img', { className: 'image', src: messages.home.section2.popup.users.image, alt: '' }),
                  __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                    'h4',
                    null,
                    messages.home.section2.popup.scaleUsers.title
                  ),
                  __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                    'p',
                    null,
                    messages.home.section2.popup.scaleUsers.copy
                  ),
                  __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('ul', { dangerouslySetInnerHTML: { __html: this.getStarts(messages.home.section2.popup.scaleUsers.items) } })
                ),
                __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                  'article',
                  null,
                  __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                    'h3',
                    null,
                    messages.home.section2.popup.stickers.title
                  ),
                  __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                    'p',
                    null,
                    messages.home.section2.popup.stickers.copy
                  ),
                  __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('img', { className: 'image', src: messages.home.section2.popup.stickers.image, alt: '' })
                )
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            'div',
            { className: 'section section3', id: 'how' },
            __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
              'h2',
              null,
              messages.home.section3.title
            ),
            __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
              'h3',
              null,
              messages.home.section3.subtitle
            ),
            __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
              'div',
              { className: 'items-wrapper' },
              messages.home.section3.items.map(function (item, index) {
                return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                  'div',
                  { className: 'item-wrapper', key: index },
                  __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('img', { className: 'image', src: item.image, alt: '' }),
                  __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                    'div',
                    { className: 'title-wrapper' },
                    __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                      'i',
                      null,
                      index + 1
                    ),
                    __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('h4', { dangerouslySetInnerHTML: { __html: item.title } })
                  ),
                  __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                    'p',
                    null,
                    item.copy
                  )
                );
              })
            ),
            __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
              'a',
              { href: messages.home.section3.cta.href, target: '_blank' },
              messages.home.section3.cta.copy
            )
          ),
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            'div',
            { className: 'section section4', id: 'suscribe' },
            __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
              'h2',
              null,
              messages.home.section4.title
            ),
            __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
              'form',
              null,
              __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('input', { type: 'email', id: 'email', name: 'email', autoComplete: 'off', maxLength: '255', required: true, placeholder: messages.home.section4.placeholder }),
              __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                'button',
                null,
                messages.home.section4.cta
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            'div',
            { className: 'section section5', id: 'contact' },
            __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
              'h2',
              null,
              messages.home.section5.title
            ),
            __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
              'form',
              null,
              __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('input', { type: 'text', id: 'name', name: 'name', autoComplete: 'off', maxLength: '255', required: true, placeholder: messages.home.section5.placeholder1 }),
              __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('input', { type: 'email', id: 'email', name: 'email', autoComplete: 'off', maxLength: '255', required: true, placeholder: messages.home.section5.placeholder2 }),
              __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('input', { type: 'text', id: 'message', name: 'message', autoComplete: 'off', maxLength: '1000', required: true, placeholder: messages.home.section5.placeholder3 }),
              __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
                'button',
                null,
                messages.home.section5.cta
              )
            )
          )
        )
      );
    }
  }]);

  return HomeView;
}(__WEBPACK_IMPORTED_MODULE_4_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_5_react_intl__["c" /* injectIntl */])(HomeView));

/***/ }),

/***/ "./src/routes/Home/components/HomeView.scss":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-2!./node_modules/sass-loader/lib/loader.js??ref--1-3!./node_modules/less-loader/dist/cjs.js??ref--1-4!./src/routes/Home/components/HomeView.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("./node_modules/style-loader/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("./node_modules/css-loader/index.js??ref--1-2!./node_modules/sass-loader/lib/loader.js??ref--1-3!./node_modules/less-loader/dist/cjs.js??ref--1-4!./src/routes/Home/components/HomeView.scss", function() {
			var newContent = __webpack_require__("./node_modules/css-loader/index.js??ref--1-2!./node_modules/sass-loader/lib/loader.js??ref--1-3!./node_modules/less-loader/dist/cjs.js??ref--1-4!./src/routes/Home/components/HomeView.scss");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/routes/Home/containers/HomeContainer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__("./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_HomeView__ = __webpack_require__("./src/routes/Home/modules/HomeView.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_HomeView__ = __webpack_require__("./src/routes/Home/components/HomeView.js");






var mapDispatchToProps = __WEBPACK_IMPORTED_MODULE_1__modules_HomeView__["actions"];

var mapStateToProps = function mapStateToProps(_ref) {
  var articles = _ref.articles;
  return {
    loading: articles.loading,
    articles: articles.data
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_2__components_HomeView__["a" /* default */]));

/***/ }),

/***/ "./src/routes/Home/modules/HomeView.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_ARTICLES", function() { return GET_ARTICLES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_ARTICLES_SUCCESS", function() { return GET_ARTICLES_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_ARTICLES_ERROR", function() { return GET_ARTICLES_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOAD_SEARCH", function() { return LOAD_SEARCH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RESET_FILTERS", function() { return RESET_FILTERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actions", function() { return actions; });
/* harmony export (immutable) */ __webpack_exports__["default"] = homeReducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__("./node_modules/babel-runtime/helpers/defineProperty.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_sources_ArticleSource__ = __webpack_require__("./src/sources/ArticleSource.js");


var _ACTION_HANDLERS;



// ------------------------------------
// Constants
// ------------------------------------
var GET_ARTICLES = 'GET_ARTICLES';
var GET_ARTICLES_SUCCESS = 'GET_ARTICLES_SUCCESS';
var GET_ARTICLES_ERROR = 'GET_ARTICLES_ERROR';
var LOAD_SEARCH = 'LOAD_SEARCH';
var RESET_FILTERS = 'RESET_FILTERS';

// ------------------------------------
// Actions
// ------------------------------------
var actions = {
  getArticles: function getArticles() {
    return function (dispatch) {
      dispatch({
        type: GET_ARTICLES,
        objectType: 'articles'
      });

      __WEBPACK_IMPORTED_MODULE_1_sources_ArticleSource__["a" /* default */].getAll().then(function (response) {
        dispatch({
          type: GET_ARTICLES_SUCCESS,
          data: response.data.data,
          objectType: 'articles'
        });
      });
      // .catch( error => {
      //   console.log(error);
      //   console.log(error.response);
      // });
    };
  },

  loadSearch: function loadSearch(query, filters) {
    return {
      type: LOAD_SEARCH,
      query: query,
      filters: filters
    };
  },

  resetFilters: function resetFilters() {
    return function (dispatch) {
      dispatch({
        type: RESET_FILTERS
      });
    };
  }

  // ------------------------------------
  // Action Handlers
  // ------------------------------------
};var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_ACTION_HANDLERS, GET_ARTICLES, function (state, action) {
  return Object.assign({}, state, {
    loading: true,
    data: {}
  });
}), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_ACTION_HANDLERS, GET_ARTICLES_SUCCESS, function (state, action) {
  return Object.assign({}, state, {
    loading: false,
    data: action.data
  });
}), _ACTION_HANDLERS);

// ------------------------------------
// Reducer
// ------------------------------------
var initialState = {
  loading: true,
  data: []
};

function homeReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

/***/ }),

/***/ "./src/sources/ArticleSource.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_utils_ApiUtils__ = __webpack_require__("./src/utils/ApiUtils.js");


var TYPE_MAPS = {
  winery: 'wineries',
  wine: 'wines',
  vintage: 'vintages',
  article: 'articles'
};

/* harmony default export */ __webpack_exports__["a"] = ({
  /*
  * Get the object detail.
  * @param {String} type
  * @param {String} id
  * @return {Object} axios promise
  */
  getDetail: function getDetail(type, id) {
    return __WEBPACK_IMPORTED_MODULE_0_utils_ApiUtils__["a" /* default */].get(TYPE_MAPS[type] + '/' + id + '?populate=wineMaker,vintages,wine,state,city,wines,zone,subZone,likes,badges,favoriteOff,wishlistOff,wishlist,userRates');
  },


  /*
  * Get all comments of an object of type and id given.
  * @param {String} type
  * @param {String} id
  * @return {Object} axios promise
  */
  getComments: function getComments(type, id) {
    return __WEBPACK_IMPORTED_MODULE_0_utils_ApiUtils__["a" /* default */].get('comments?objectId=' + id + '&objectType=' + type + '&populate=createdBy,likes&sort=createdAt%20DESC');
  },


  /*
  * Get all object of a type
  * @param {String} type (singular)
  * @return {Object} axios promise
  */
  getAll: function getAll() {
    return __WEBPACK_IMPORTED_MODULE_0_utils_ApiUtils__["a" /* default */].get('articles/?published=true');
  }
});

/***/ }),

/***/ "./src/utils/ApiUtils.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_config__ = __webpack_require__("./src/config/index.js");




var API_URL = __WEBPACK_IMPORTED_MODULE_0_config__["a" /* default */].API_URL;

var axios = __webpack_require__("./node_modules/axios/index.js").create({
  baseURL: API_URL,
  headers: {
    Authorization: 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpZCI6IjU4MzU3ZGI5MjNiYzM2OTc0YmYzODVlMSIsImlhdCI6MTUwMTMwNTc0MiwiZXhwIjoxNTAxMzkyMTQyfQ.Pcu--nb9FgXFV3NA8BORsunmBoAAsxzU8eba9_0rZNlTrjGANtrmvfkodllJv8GwxrjKVYywhxteaiDJHxAEFA'
  }
});

/* harmony default export */ __webpack_exports__["a"] = (axios);

/***/ })

});
//# sourceMappingURL=4.js.map