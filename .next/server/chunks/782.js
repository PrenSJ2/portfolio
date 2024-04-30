"use strict";exports.id=782,exports.ids=[782],exports.modules={4252:(e,t)=>{/**
 * @remix-run/cloudflare v2.7.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */Object.defineProperty(t,"__esModule",{value:!0});let r=new TextEncoder,n=async(e,t)=>{let n=await a(t,["sign"]),o=r.encode(e);return e+"."+btoa(String.fromCharCode(...new Uint8Array(await crypto.subtle.sign("HMAC",n,o)))).replace(/=+$/,"")},o=async(e,t)=>{let n=e.lastIndexOf("."),o=e.slice(0,n),i=e.slice(n+1),s=await a(t,["verify"]),l=r.encode(o),u=function(e){let t=new Uint8Array(e.length);for(let r=0;r<e.length;r++)t[r]=e.charCodeAt(r);return t}(atob(i));return!!await crypto.subtle.verify("HMAC",s,u,l)&&o};async function a(e,t){return await crypto.subtle.importKey("raw",r.encode(e),{name:"HMAC",hash:"SHA-256"},!1,t)}t.sign=n,t.unsign=o},8277:(e,t,r)=>{/**
 * @remix-run/cloudflare v2.7.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */Object.defineProperty(t,"__esModule",{value:!0});var n=r(405),o=r(4252);let a=n.createCookieFactory({sign:o.sign,unsign:o.unsign}),i=n.createCookieSessionStorageFactory(a),s=n.createSessionStorageFactory(a),l=n.createMemorySessionStorageFactory(s);t.createCookie=a,t.createCookieSessionStorage=i,t.createMemorySessionStorage=l,t.createSessionStorage=s},5782:(e,t,r)=>{var n=r(3142),o=r(8277),a=r(405);n.createWorkersKVSessionStorage,o.createCookie,o.createCookieSessionStorage,o.createMemorySessionStorage,o.createSessionStorage,Object.defineProperty(t,"AV",{enumerable:!0,get:function(){return a.json}})},3142:(e,t,r)=>{/**
 * @remix-run/cloudflare v2.7.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */Object.defineProperty(t,"__esModule",{value:!0});var n=r(8277);t.createWorkersKVSessionStorage=function({cookie:e,kv:t}){return n.createSessionStorage({cookie:e,async createData(e,r){for(;;){let n=new Uint8Array(8);crypto.getRandomValues(n);let o=[...n].map(e=>e.toString(16).padStart(2,"0")).join("");if(!await t.get(o,"json"))return await t.put(o,JSON.stringify(e),{expiration:r?Math.round(r.getTime()/1e3):void 0}),o}},async readData(e){let r=await t.get(e);return r?JSON.parse(r):null},async updateData(e,r,n){await t.put(e,JSON.stringify(r),{expiration:n?Math.round(n.getTime()/1e3):void 0})},async deleteData(e){await t.delete(e)}})}},405:(e,t,r)=>{r.r(t),r.d(t,{MaxPartSizeExceededError:()=>eg,broadcastDevReady:()=>Y,createCookieFactory:()=>i,createCookieSessionStorageFactory:()=>ep,createMemorySessionStorageFactory:()=>em,createRequestHandler:()=>en,createSession:()=>ed,createSessionStorageFactory:()=>ef,defer:()=>H,isCookie:()=>s,isSession:()=>ec,json:()=>M,logDevReady:()=>Z,redirect:()=>U,redirectDocument:()=>q,unstable_composeUploadHandlers:()=>C,unstable_createMemoryUploadHandler:()=>ey,unstable_parseMultipartFormData:()=>E,unstable_setDevServerHooks:()=>ee});var n=r(3183);/**
 * @remix-run/server-runtime v2.7.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let o={};function a(e,t){e||o[t]||(o[t]=!0,console.warn(t))}/**
 * @remix-run/server-runtime v2.7.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let i=({sign:e,unsign:t})=>(r,o={})=>{let{secrets:i=[],...s}={path:"/",sameSite:"lax",...o};return a(!s.expires,`The "${r}" cookie has an "expires" property set. This will cause the expires value to not be updated when the session is committed. Instead, you should set the expires value when serializing the cookie. You can use \`commitSession(session, { expires })\` if using a session storage object, or \`cookie.serialize("value", { expires })\` if you're using the cookie directly.`),{get name(){return r},get isSigned(){return i.length>0},get expires(){return void 0!==s.maxAge?new Date(Date.now()+1e3*s.maxAge):s.expires},async parse(e,o){if(!e)return null;let a=(0,n.Q)(e,{...s,...o});return r in a?""===a[r]?"":await u(t,a[r],i):null},serialize:async(t,o)=>(0,n.q)(r,""===t?"":await l(e,t,i),{...s,...o})}},s=e=>null!=e&&"string"==typeof e.name&&"boolean"==typeof e.isSigned&&"function"==typeof e.parse&&"function"==typeof e.serialize;async function l(e,t,r){let n=btoa(function(e){let t,r,n=e.toString(),o="",a=0;for(;a<n.length;){if("%"===(t=n.charAt(a++))){if("u"===n.charAt(a)){if(r=n.slice(a+1,a+5),/^[\da-f]{4}$/i.exec(r)){o+=String.fromCharCode(parseInt(r,16)),a+=5;continue}}else if(r=n.slice(a,a+2),/^[\da-f]{2}$/i.exec(r)){o+=String.fromCharCode(parseInt(r,16)),a+=2;continue}}o+=t}return o}(encodeURIComponent(JSON.stringify(t))));return r.length>0&&(n=await e(n,r[0])),n}async function u(e,t,r){if(r.length>0){for(let n of r){let r=await e(t,n);if(!1!==r)return d(r)}return null}return d(t)}function d(e){try{return JSON.parse(decodeURIComponent(function(e){let t,r,n=e.toString(),o="",a=0;for(;a<n.length;)t=n.charAt(a++),/[\w*+\-./@]/.exec(t)?o+=t:(r=t.charCodeAt(0))<256?o+="%"+c(r,2):o+="%u"+c(r,4).toUpperCase();return o}(atob(e))))}catch(e){return{}}}function c(e,t){let r=e.toString(16);for(;r.length<t;)r="0"+r;return r}function f(e){let t=unescape(encodeURIComponent(e));return Uint8Array.from(t,(e,r)=>t.charCodeAt(r))}function h(e){return decodeURIComponent(escape(String.fromCharCode.apply(null,e)))}function p(...e){let t=new Uint8Array(e.reduce((e,t)=>e+t.length,0)),r=0;for(let n of e)t.set(n,r),r+=n.length;return t}function m(e){return e instanceof Uint8Array?t=>e[t]:e}function g(e,t,r,n,o){let a=m(e),i=m(r);for(let e=0;e<o;++e)if(a(t+e)!==i(n+e))return!1;return!0}let y=Symbol("Match");class w{constructor(e){this._lookbehind=new Uint8Array,"string"==typeof e?this._needle=e=f(e):this._needle=e,this._lastChar=e[e.length-1],this._occ=function(e){let t=Array(256).fill(e.length);if(e.length>1)for(let r=0;r<e.length-1;r++)t[e[r]]=e.length-1-r;return t}(e)}feed(e){let t,r=0,n=[];for(;r!==e.length;)[r,...t]=this._feed(e,r),n.push(...t);return n}end(){let e=this._lookbehind;return this._lookbehind=new Uint8Array,e}_feed(e,t){let r=[],n=-this._lookbehind.length;if(n<0){for(;n<0&&n<=e.length-this._needle.length;){let t=this._charAt(e,n+this._needle.length-1);if(t===this._lastChar&&this._memcmp(e,n,this._needle.length-1))return n>-this._lookbehind.length&&r.push(this._lookbehind.slice(0,this._lookbehind.length+n)),r.push(y),this._lookbehind=new Uint8Array,[n+this._needle.length,...r];n+=this._occ[t]}if(n<0)for(;n<0&&!this._memcmp(e,n,e.length-n);)n++;if(n>=0)r.push(this._lookbehind),this._lookbehind=new Uint8Array;else{let t=this._lookbehind.length+n;return t>0&&(r.push(this._lookbehind.slice(0,t)),this._lookbehind=this._lookbehind.slice(t)),this._lookbehind=Uint8Array.from(Array(this._lookbehind.length+e.length),(t,r)=>this._charAt(e,r-this._lookbehind.length)),[e.length,...r]}}for(n+=t;n<=e.length-this._needle.length;){let o=e[n+this._needle.length-1];if(o===this._lastChar&&e[n]===this._needle[0]&&g(this._needle,0,e,n,this._needle.length-1))return n>t&&r.push(e.slice(t,n)),r.push(y),[n+this._needle.length,...r];n+=this._occ[o]}if(n<e.length){for(;n<e.length&&(e[n]!==this._needle[0]||!g(e,n,this._needle,0,e.length-n));)++n;n<e.length&&(this._lookbehind=e.slice(n))}return n>0&&r.push(e.slice(t,n<e.length?n:e.length)),[e.length,...r]}_charAt(e,t){return t<0?this._lookbehind[this._lookbehind.length+t]:e[t]}_memcmp(e,t,r){return g(this._charAt.bind(this,e),t,this._needle,0,r)}}class v{constructor(e,t){this._readableStream=t,this._search=new w(e)}async *[Symbol.asyncIterator](){let e=this._readableStream.getReader();try{for(;;){let t=await e.read();if(t.done)break;yield*this._search.feed(t.value)}let t=this._search.end();t.length&&(yield t)}finally{e.releaseLock()}}}Symbol("End of Queue"),Symbol.asyncIterator;let b=Function.prototype.apply.bind(p,void 0),S=f("--"),x=f("\r\n");async function _(e,t){let r=!0,n=!1,o=[[]],a=new w(x);for(;;){let i;let s=await e.next();if(s.done)throw Error("malformed multipart-form data: unexpected end of stream");if(r&&s.value!==y&&function(e,t){if(e.length!==t.length)return!1;for(let r=0;r<e.length;r++)if(e[r]!==t[r])return!1;return!0}(s.value.slice(0,2),S))return[void 0,new Uint8Array];if(s.value!==y)i=s.value;else if(n)throw Error("malformed multipart-form data: unexpected boundary");else i=t;if(!i.length)continue;r&&(r=!1);let l=a.feed(i);for(let[e,t]of l.entries()){let r=t===y;if(r||t.length){if(n&&r)return l.push(a.end()),[o.filter(e=>e.length).map(b).map(h),p(...l.slice(e+1).map(e=>e===y?x:e))];(n=r)?o.push([]):o[o.length-1].push(t)}}}}async function*k(e,t){let r=p(S,f(t)),n=new v(r,e)[Symbol.asyncIterator]();for(;;){let e=await n.next();if(e.done)return;if(e.value===y)break}let o=new w(x);for(;;){let[e,t]=await _(n,r);if(!e)return;async function a(){let e=await n.next();if(e.done)throw Error("malformed multipart-form data: unexpected end of stream");return e}let l=!1;function i(e){let t=[];for(let r of o.feed(e))l&&t.push(x),(l=r===y)||t.push(r);return p(...t)}let u=!1;async function s(){let e;let t=await a();if(t.value!==y)e=t.value;else{if(l)return u=!0,{value:o.end()};e=x}return{value:i(e)}}let d=[{value:i(t)}];for(yield{...function(e){let t;let r=[],n=!1;for(;void 0!==(t=e.shift());){let e=t.indexOf(":");if(-1===e)throw Error("malformed multipart-form header: missing colon");let o=t.slice(0,e).trim().toLowerCase(),a=t.slice(e+1).trim();switch(o){case"content-disposition":n=!0,r.push(...Object.entries(function(e){let t=e.split(";").map(e=>e.trim());if("form-data"!==t.shift())throw Error('malformed content-disposition header: missing "form-data" in `'+JSON.stringify(t)+"`");let r={};for(let n of t){let t=n.split("=",2);if(2!==t.length)throw Error("malformed content-disposition header: key-value pair not found - "+n+" in `"+e+"`");let[o,a]=t;if('"'===a[0]&&'"'===a[a.length-1])r[o]=a.slice(1,-1).replace(/\\"/g,'"');else if('"'!==a[0]&&'"'!==a[a.length-1])r[o]=a;else if('"'===a[0]&&'"'!==a[a.length-1]||'"'!==a[0]&&'"'===a[a.length-1])throw Error("malformed content-disposition header: mismatched quotations in `"+e+"`")}if(!r.name)throw Error("malformed content-disposition header: missing field name in `"+e+"`");return r}(a)));break;case"content-type":r.push(["contentType",a])}}if(!n)throw Error("malformed multipart-form header: missing content-disposition");return Object.fromEntries(r)}(e),data:{[Symbol.asyncIterator](){return this},async next(){for(;;){let e=d.shift();if(!e)break;if(e.value.length>0)return e}for(;;){if(u)return{done:u,value:void 0};let e=await s();if(e.value.length>0)return e}}}};!u;)d.push(await s())}}/**
 * @remix-run/server-runtime v2.7.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function C(...e){return async t=>{for(let r of e){let e=await r(t);if(null!=e)return e}}}async function E(e,t){let[r,n]=(e.headers.get("Content-Type")||"").split(/\s*;\s*boundary=/);if(!e.body||!n||"multipart/form-data"!==r)throw TypeError("Could not parse content as FormData.");let o=new FormData;for await(let r of k(e.body,n)){if(r.done)break;"string"==typeof r.filename&&(r.filename=r.filename.split(/[/\\]/).pop());let e=await t(r);null!=e&&o.append(r.name,e)}return o}var R=r(3317);/**
 * @remix-run/server-runtime v2.7.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let A=function(e){return e.Development="development",e.Production="production",e.Test="test",e}({});/**
 * @remix-run/server-runtime v2.7.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function D(e,t){if(e instanceof Error&&t!==A.Development){let e=Error("Unexpected Server Error");return e.stack=void 0,e}return e}function O(e,t){return Object.entries(e).reduce((e,[r,n])=>Object.assign(e,{[r]:D(n,t)}),{})}function T(e,t){let r=D(e,t);return{message:r.message,stack:r.stack}}function j(e,t){if(!e)return null;let r=Object.entries(e),n={};for(let[e,o]of r)if((0,R.WK)(o))n[e]={...o,__type:"RouteErrorResponse"};else if(o instanceof Error){let r=D(o,t);n[e]={message:r.message,stack:r.stack,__type:"Error",..."Error"!==r.name?{__subType:r.name}:{}}}else n[e]=o;return n}/**
 * @remix-run/server-runtime v2.7.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let M=(e,t={})=>(0,R.AV)(e,t),H=(e,t={})=>(0,R.PQ)(e,t),U=(e,t=302)=>(0,R.uX)(e,t),q=(e,t=302)=>(0,R.fZ)(e,t);function I(e){return null!=e&&"number"==typeof e.status&&"string"==typeof e.statusText&&"object"==typeof e.headers&&void 0!==e.body}let P=new Set([301,302,303,307,308]);function L(e,t,r,n,o){"_error"in n?e.enqueue(t.encode("error:"+JSON.stringify({[r]:n._error instanceof Error?T(n._error,o):n._error})+"\n\n")):e.enqueue(t.encode("data:"+JSON.stringify({[r]:n._data??null})+"\n\n"))}var $=r(2338);function N(e,t){let r=e.get("Set-Cookie");r&&(0,$.splitCookiesString)(r).forEach(e=>{t.append("Set-Cookie",e)})}/**
 * @remix-run/server-runtime v2.7.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function F(e,t){if(!1===e||null==e)throw console.error("The following error is a bug in Remix; please open an issue! https://github.com/remix-run/remix/issues/new"),Error(t)}/**
 * @remix-run/server-runtime v2.7.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */async function V({loadContext:e,action:t,params:r,request:n,routeId:o}){let a=await t({request:J(z(n)),context:e,params:r});if(void 0===a)throw Error(`You defined an action for route "${o}" but didn't return anything from your \`action\` function. Please return a value or \`null\`.`);return I(a)?a:M(a)}async function X({loadContext:e,loader:t,params:r,request:n,routeId:o}){var a;let i=await t({request:J(z(n)),context:e,params:r});if(void 0===i)throw Error(`You defined a loader for route "${o}" but didn't return anything from your \`loader\` function. Please return a value or \`null\`.`);return i&&"object"==typeof i&&"object"==typeof i.data&&"function"==typeof i.subscribe&&"function"==typeof i.cancel&&"function"==typeof i.resolveData?i.init&&(a=i.init.status||200,P.has(a))?U(new Headers(i.init.headers).get("Location"),i.init):i:I(i)?i:M(i)}function z(e){let t=new URL(e.url),r=t.searchParams.getAll("index");t.searchParams.delete("index");let n=[];for(let e of r)e&&n.push(e);for(let e of n)t.searchParams.append("index",e);let o={method:e.method,body:e.body,headers:e.headers,signal:e.signal};return o.body&&(o.duplex="half"),new Request(t.href,o)}function J(e){let t=new URL(e.url);t.searchParams.delete("_data");let r={method:e.method,body:e.body,headers:e.headers,signal:e.signal};return r.body&&(r.duplex="half"),new Request(t.href,r)}/**
 * @remix-run/server-runtime v2.7.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function K(e){let t={};return Object.values(e).forEach(e=>{let r=e.parentId||"";t[r]||(t[r]=[]),t[r].push(e)}),t}/**
 * @remix-run/server-runtime v2.7.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let W={"&":"\\u0026",">":"\\u003e","<":"\\u003c","\u2028":"\\u2028","\u2029":"\\u2029"},B=/[&><\u2028\u2029]/g;/**
 * @remix-run/server-runtime v2.7.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Q(e){return JSON.stringify(e).replace(B,e=>W[e])}/**
 * @remix-run/server-runtime v2.7.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */async function Y(e,t){if(!(t??=process.env.REMIX_DEV_ORIGIN))throw Error("Dev server origin not set");let r=new URL(t);r.pathname="ping";let n=await fetch(r.href,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({buildHash:e.assets.version})}).catch(e=>{throw console.error(`Could not reach Remix dev server at ${r}`),e});if(!n.ok)throw console.error(`Could not reach Remix dev server at ${r} (${n.status})`),Error(await n.text())}function Z(e){console.log(`[REMIX DEV] ${e.assets.version} ready`)}let G="__remix_devServerHooks";function ee(e){globalThis[G]=e}function et(){return globalThis[G]}/**
 * @remix-run/server-runtime v2.7.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function er(e,t){var r,n;let o=function e(t,r="",n=K(t)){return(n[r]||[]).map(r=>({...r,children:e(t,r.id,n)}))}(e.routes),a=function e(t,r,n="",o=K(t)){return(o[n]||[]).map(n=>{let a={hasErrorBoundary:"root"===n.id||null!=n.module.ErrorBoundary,id:n.id,path:n.path,loader:n.module.loader?e=>X({request:e.request,params:e.params,loadContext:e.context,loader:n.module.loader,routeId:n.id}):void 0,action:n.module.action?e=>V({request:e.request,params:e.params,loadContext:e.context,action:n.module.action,routeId:n.id}):void 0,handle:n.module.handle};return n.index?{index:!0,...a}:{caseSensitive:n.caseSensitive,children:e(t,r,n.id,o),...a}})}(e.routes,e.future),i=t===A.Development||t===A.Production||t===A.Test?t:A.Production,s=(0,R.ui)(a,{basename:e.basename,future:{v7_relativeSplatPath:(null===(r=e.future)||void 0===r?void 0:r.v3_relativeSplatPath)===!0,v7_throwAbortReason:(null===(n=e.future)||void 0===n?void 0:n.v3_throwAbortReason)===!0}}),l=e.entry.module.handleError||((e,{request:t})=>{i===A.Test||t.signal.aborted||console.error((0,R.WK)(e)&&e.error?e.error:e)});return{routes:o,dataRoutes:a,serverMode:i,staticHandler:s,errorHandler:l}}let en=(e,t)=>{let r,n,o,a,i;return async function(s,l={}){var u,d,c,f,h,p;let m,g;if(r="function"==typeof e?await e():e,t??=r.mode,"function"==typeof e){let e=er(r,t);n=e.routes,o=e.serverMode,a=e.staticHandler,i=e.errorHandler}else if(!n||!o||!a||!i){let e=er(r,t);n=e.routes,o=e.serverMode,a=e.staticHandler,i=e.errorHandler}let y=new URL(s.url),w=(f=n,h=y.pathname,p=r.basename,(g=(0,R.fp)(f,h,p))?g.map(e=>({params:e.params,pathname:e.pathname,route:e.route})):null),v=e=>{if(t===A.Development){var r,n;null===(r=et())||void 0===r||null===(n=r.processRequestError)||void 0===n||n.call(r,e)}i(e,{context:l,params:w&&w.length>0?w[0].params:{},request:s})};if(y.searchParams.has("_data")){let e=y.searchParams.get("_data");m=await eo(o,r,a,e,s,l,v),r.entry.module.handleDataRequest&&(m=await r.entry.module.handleDataRequest(m,{context:l,params:(null==w?void 0:null===(u=w.find(t=>t.route.id==e))||void 0===u?void 0:u.params)||{},request:s}))}else if(w&&null==w[w.length-1].route.module.default&&null==w[w.length-1].route.module.ErrorBoundary)m=await ei(o,a,w.slice(-1)[0].route.id,s,l,v);else{let e=t===A.Development?await (null===(d=et())||void 0===d?void 0:null===(c=d.getCriticalCss)||void 0===c?void 0:c.call(d,r,y.pathname)):void 0;m=await ea(o,r,a,s,l,v,e)}return"HEAD"===s.method?new Response(null,{headers:m.headers,status:m.status,statusText:m.statusText}):m}};async function eo(e,t,r,n,o,a,i){try{var s,l;let i=await r.queryRoute(o,{routeId:n,requestContext:a});if(s=i.status,P.has(s)){let e=new Headers(i.headers),r=e.get("Location");return e.set("X-Remix-Redirect",t.basename&&(0,R.Zn)(r,t.basename)||r),e.set("X-Remix-Status",i.status),e.delete("Location"),null!==i.headers.get("Set-Cookie")&&e.set("X-Remix-Revalidate","yes"),new Response(null,{status:204,headers:e})}if(R.DK in i){let t,r=i[R.DK],n=(l=o.signal,t=new TextEncoder,new ReadableStream({async start(n){let o={},a=[];for(let[e,t]of Object.entries(r.data))null!=t&&"function"==typeof t.then&&!0===t._tracked?(o[e]=`__deferred_promise:${e}`,(void 0!==t._data||void 0!==t._error)&&a.push(e)):o[e]=t;for(let i of(n.enqueue(t.encode(JSON.stringify(o)+"\n\n")),a))L(n,t,i,r.data[i],e);let i=r.subscribe((o,a)=>{a&&L(n,t,a,r.data[a],e)});await r.resolveData(l),i(),n.close()}})),a=r.init||{},s=new Headers(a.headers);return s.set("Content-Type","text/remix-deferred"),s.set("X-Remix-Response","yes"),a.headers=s,new Response(n,a)}return i.headers.set("X-Remix-Response","yes"),i}catch(r){if(I(r))return r.headers.set("X-Remix-Catch","yes"),r;if((0,R.WK)(r))return r&&i(r),es(r,e);let t=r instanceof Error||r instanceof DOMException?r:Error("Unexpected Server Error");return i(t),(0,R.AV)(T(t,e),{status:500,headers:{"X-Remix-Error":"yes"}})}}async function ea(e,t,r,n,o,a,i){var s;let l;try{l=await r.query(n,{requestContext:o})}catch(e){return a(e),new Response(null,{status:500})}if(I(l))return l;l.errors&&(Object.values(l.errors).forEach(e=>{(!(0,R.WK)(e)||e.error)&&a(e)}),l.errors=O(l.errors,e));let u=/**
 * @remix-run/server-runtime v2.7.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function(e,t){let r,n=t.errors?t.matches.findIndex(e=>t.errors[e.route.id]):-1,o=n>=0?t.matches.slice(0,n+1):t.matches;if(n>=0){let{actionHeaders:e,actionData:o,loaderHeaders:a,loaderData:i}=t;t.matches.slice(n).some(t=>{let n=t.route.id;return e[n]&&(!o||void 0===o[n])?r=e[n]:a[n]&&void 0===i[n]&&(r=a[n]),null!=r})}return o.reduce((n,a,i)=>{let{id:s}=a.route,l=e.routes[s].module,u=t.loaderHeaders[s]||new Headers,d=t.actionHeaders[s]||new Headers,c=void 0!=r&&i===o.length-1,f=c&&r!==u&&r!==d;if(null==l.headers){let e=new Headers(n);return f&&N(r,e),N(d,e),N(u,e),e}let h=new Headers(l.headers?"function"==typeof l.headers?l.headers({loaderHeaders:u,parentHeaders:n,actionHeaders:d,errorHeaders:c?r:void 0}):l.headers:void 0);return f&&N(r,h),N(d,h),N(u,h),N(n,h),h},new Headers)}(t,l),d={manifest:t.assets,routeModules:Object.keys(s=t.routes).reduce((e,t)=>(e[t]=s[t].module,e),{}),staticHandlerContext:l,criticalCss:i,serverHandoffString:Q({url:l.location.pathname,basename:t.basename,criticalCss:i,state:{loaderData:l.loaderData,actionData:l.actionData,errors:j(l.errors,e)},future:t.future,isSpaMode:t.isSpaMode}),future:t.future,isSpaMode:t.isSpaMode,serializeError:t=>T(t,e)},c=t.entry.module.default;try{return await c(n,l.statusCode,u,d,o)}catch(s){a(s);let i=s;if(I(s)){let e;try{let t=s.headers.get("Content-Type");e=t&&/\bapplication\/json\b/.test(t)?null==s.body?null:await s.json():await s.text(),i=new R.OF(s.status,s.statusText,e)}catch(e){}}(l=(0,R.cd)(r.dataRoutes,l,i)).errors&&(l.errors=O(l.errors,e)),d={...d,staticHandlerContext:l,serverHandoffString:Q({url:l.location.pathname,basename:t.basename,state:{loaderData:l.loaderData,actionData:l.actionData,errors:j(l.errors,e)},future:t.future,isSpaMode:t.isSpaMode})};try{return await c(n,l.statusCode,u,d,o)}catch(t){return a(t),el(t,e)}}}async function ei(e,t,r,n,o,a){try{let e=await t.queryRoute(n,{routeId:r,requestContext:o});return F(!(R.DK in e),`You cannot return a \`defer()\` response from a Resource Route.  Did you forget to export a default UI component from the "${r}" route?`),F(I(e),"Expected a Response to be returned from queryRoute"),e}catch(t){if(I(t))return t.headers.set("X-Remix-Catch","yes"),t;if((0,R.WK)(t))return t&&a(t),es(t,e);return a(t),el(t,e)}}function es(e,t){return(0,R.AV)(T(e.error||Error("Unexpected Server Error"),t),{status:e.status,statusText:e.statusText,headers:{"X-Remix-Error":"yes"}})}function el(e,t){let r="Unexpected Server Error";return t!==A.Production&&(r+=`

${String(e)}`),new Response(r,{status:500,headers:{"Content-Type":"text/plain"}})}/**
 * @remix-run/server-runtime v2.7.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function eu(e){return`__flash_${e}__`}let ed=(e={},t="")=>{let r=new Map(Object.entries(e));return{get id(){return t},get data(){return Object.fromEntries(r)},has:e=>r.has(e)||r.has(eu(e)),get(e){if(r.has(e))return r.get(e);let t=eu(e);if(r.has(t)){let e=r.get(t);return r.delete(t),e}},set(e,t){r.set(e,t)},flash(e,t){r.set(eu(e),t)},unset(e){r.delete(e)}}},ec=e=>null!=e&&"string"==typeof e.id&&void 0!==e.data&&"function"==typeof e.has&&"function"==typeof e.get&&"function"==typeof e.set&&"function"==typeof e.flash&&"function"==typeof e.unset,ef=e=>({cookie:t,createData:r,readData:n,updateData:o,deleteData:a})=>{let i=s(t)?t:e((null==t?void 0:t.name)||"__session",t);return eh(i),{async getSession(e,t){let r=e&&await i.parse(e,t);return ed(r&&await n(r)||{},r||"")},async commitSession(e,t){let{id:n,data:a}=e,s=(null==t?void 0:t.maxAge)!=null?new Date(Date.now()+1e3*t.maxAge):(null==t?void 0:t.expires)!=null?t.expires:i.expires;return n?await o(n,a,s):n=await r(a,s),i.serialize(n,t)},destroySession:async(e,t)=>(await a(e.id),i.serialize("",{...t,maxAge:void 0,expires:new Date(0)}))}};function eh(e){a(e.isSigned,`The "${e.name}" cookie is not signed, but session cookies should be signed to prevent tampering on the client before they are sent back to the server. See https://remix.run/utils/cookies#signing-cookies for more information.`)}/**
 * @remix-run/server-runtime v2.7.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let ep=e=>({cookie:t}={})=>{let r=s(t)?t:e((null==t?void 0:t.name)||"__session",t);return eh(r),{getSession:async(e,t)=>ed(e&&await r.parse(e,t)||{}),async commitSession(e,t){let n=await r.serialize(e.data,t);if(n.length>4096)throw Error("Cookie length will exceed browser maximum. Length: "+n.length);return n},destroySession:async(e,t)=>r.serialize("",{...t,maxAge:void 0,expires:new Date(0)})}},em=e=>({cookie:t}={})=>{let r=new Map;return e({cookie:t,async createData(e,t){let n=Math.random().toString(36).substring(2,10);return r.set(n,{data:e,expires:t}),n},async readData(e){if(r.has(e)){let{data:t,expires:n}=r.get(e);if(!n||n>new Date)return t;n&&r.delete(e)}return null},async updateData(e,t,n){r.set(e,{data:t,expires:n})},async deleteData(e){r.delete(e)}})};/**
 * @remix-run/server-runtime v2.7.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */class eg extends Error{constructor(e,t){super(`Field "${e}" exceeded upload size of ${t} bytes.`),this.field=e,this.maxBytes=t}}/**
 * @remix-run/server-runtime v2.7.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function ey({filter:e,maxPartSize:t=3e6}={}){return async({filename:r,contentType:n,name:o,data:a})=>{if(e&&!await e({filename:r,contentType:n,name:o}))return;let i=0,s=[];for await(let e of a){if((i+=e.byteLength)>t)throw new eg(o,t);s.push(e)}return"string"==typeof r?new File(s,r,{type:n}):await new Blob(s,{type:n}).text()}}/**
 * @remix-run/server-runtime v2.7.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */},3183:(e,t)=>{/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */t.Q=function(e,t){if("string"!=typeof e)throw TypeError("argument str must be a string");for(var r={},n=(t||{}).decode||o,a=0;a<e.length;){var i=e.indexOf("=",a);if(-1===i)break;var s=e.indexOf(";",a);if(-1===s)s=e.length;else if(s<i){a=e.lastIndexOf(";",i-1)+1;continue}var l=e.slice(a,i).trim();if(void 0===r[l]){var u=e.slice(i+1,s).trim();34===u.charCodeAt(0)&&(u=u.slice(1,-1)),r[l]=function(e,t){try{return t(e)}catch(t){return e}}(u,n)}a=s+1}return r},t.q=function(e,t,o){var i=o||{},s=i.encode||a;if("function"!=typeof s)throw TypeError("option encode is invalid");if(!n.test(e))throw TypeError("argument name is invalid");var l=s(t);if(l&&!n.test(l))throw TypeError("argument val is invalid");var u=e+"="+l;if(null!=i.maxAge){var d=i.maxAge-0;if(isNaN(d)||!isFinite(d))throw TypeError("option maxAge is invalid");u+="; Max-Age="+Math.floor(d)}if(i.domain){if(!n.test(i.domain))throw TypeError("option domain is invalid");u+="; Domain="+i.domain}if(i.path){if(!n.test(i.path))throw TypeError("option path is invalid");u+="; Path="+i.path}if(i.expires){var c=i.expires;if("[object Date]"!==r.call(c)&&!(c instanceof Date)||isNaN(c.valueOf()))throw TypeError("option expires is invalid");u+="; Expires="+c.toUTCString()}if(i.httpOnly&&(u+="; HttpOnly"),i.secure&&(u+="; Secure"),i.partitioned&&(u+="; Partitioned"),i.priority)switch("string"==typeof i.priority?i.priority.toLowerCase():i.priority){case"low":u+="; Priority=Low";break;case"medium":u+="; Priority=Medium";break;case"high":u+="; Priority=High";break;default:throw TypeError("option priority is invalid")}if(i.sameSite)switch("string"==typeof i.sameSite?i.sameSite.toLowerCase():i.sameSite){case!0:case"strict":u+="; SameSite=Strict";break;case"lax":u+="; SameSite=Lax";break;case"none":u+="; SameSite=None";break;default:throw TypeError("option sameSite is invalid")}return u};var r=Object.prototype.toString,n=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function o(e){return -1!==e.indexOf("%")?decodeURIComponent(e):e}function a(e){return encodeURIComponent(e)}},2338:e=>{var t={decodeValues:!0,map:!1,silent:!1};function r(e){return"string"==typeof e&&!!e.trim()}function n(e,n){var o,a,i,s,l=e.split(";").filter(r),u=(o=l.shift(),a="",i="",(s=o.split("=")).length>1?(a=s.shift(),i=s.join("=")):i=o,{name:a,value:i}),d=u.name,c=u.value;n=n?Object.assign({},t,n):t;try{c=n.decodeValues?decodeURIComponent(c):c}catch(e){console.error("set-cookie-parser encountered an error while decoding a cookie with value '"+c+"'. Set options.decodeValues to false to disable this feature.",e)}var f={name:d,value:c};return l.forEach(function(e){var t=e.split("="),r=t.shift().trimLeft().toLowerCase(),n=t.join("=");"expires"===r?f.expires=new Date(n):"max-age"===r?f.maxAge=parseInt(n,10):"secure"===r?f.secure=!0:"httponly"===r?f.httpOnly=!0:"samesite"===r?f.sameSite=n:f[r]=n}),f}function o(e,o){if(o=o?Object.assign({},t,o):t,!e)return o.map?{}:[];if(e.headers){if("function"==typeof e.headers.getSetCookie)e=e.headers.getSetCookie();else if(e.headers["set-cookie"])e=e.headers["set-cookie"];else{var a=e.headers[Object.keys(e.headers).find(function(e){return"set-cookie"===e.toLowerCase()})];a||!e.headers.cookie||o.silent||console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."),e=a}}return(Array.isArray(e)||(e=[e]),(o=o?Object.assign({},t,o):t).map)?e.filter(r).reduce(function(e,t){var r=n(t,o);return e[r.name]=r,e},{}):e.filter(r).map(function(e){return n(e,o)})}e.exports=o,e.exports.parse=o,e.exports.parseString=n,e.exports.splitCookiesString=function(e){if(Array.isArray(e))return e;if("string"!=typeof e)return[];var t,r,n,o,a,i=[],s=0;function l(){for(;s<e.length&&/\s/.test(e.charAt(s));)s+=1;return s<e.length}for(;s<e.length;){for(t=s,a=!1;l();)if(","===(r=e.charAt(s))){for(n=s,s+=1,l(),o=s;s<e.length&&"="!==(r=e.charAt(s))&&";"!==r&&","!==r;)s+=1;s<e.length&&"="===e.charAt(s)?(a=!0,s=o,i.push(e.substring(t,n)),t=s):s=n+1}else s+=1;(!a||s>=e.length)&&i.push(e.substring(t,e.length))}return i}}};