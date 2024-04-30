"use strict";exports.id=317,exports.ids=[317],exports.modules={3317:(e,t,r)=>{var a,n;/**
 * @remix-run/router v1.15.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function o(){return(o=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e}).apply(this,arguments)}r.d(t,{AV:()=>x,DK:()=>B,Ep:()=>u,J0:()=>i,LX:()=>m,OF:()=>A,PQ:()=>L,RQ:()=>R,WK:()=>U,X3:()=>D,Zn:()=>y,cP:()=>d,cd:()=>k,cm:()=>b,fZ:()=>O,fp:()=>c,pC:()=>w,uX:()=>E,ui:()=>I}),function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"}(a||(a={}));function i(e,t){if(!1===e||null==e)throw Error(t)}function s(e,t){if(!e){"undefined"!=typeof console&&console.warn(t);try{throw Error(t)}catch(e){}}}function l(e,t,r,a){return void 0===r&&(r=null),o({pathname:"string"==typeof e?e:e.pathname,search:"",hash:""},"string"==typeof t?d(t):t,{state:r,key:t&&t.key||a||Math.random().toString(36).substr(2,8)})}function u(e){let{pathname:t="/",search:r="",hash:a=""}=e;return r&&"?"!==r&&(t+="?"===r.charAt(0)?r:"?"+r),a&&"#"!==a&&(t+="#"===a.charAt(0)?a:"#"+a),t}function d(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substr(r),e=e.substr(0,r));let a=e.indexOf("?");a>=0&&(t.search=e.substr(a),e=e.substr(0,a)),e&&(t.pathname=e)}return t}!function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"}(n||(n={}));let h=new Set(["lazy","caseSensitive","path","id","index","children"]);function c(e,t,r){void 0===r&&(r="/");let a=y(("string"==typeof t?d(t):t).pathname||"/",r);if(null==a)return null;let n=function e(t,r,a,n){void 0===r&&(r=[]),void 0===a&&(a=[]),void 0===n&&(n="");let o=(t,o,s)=>{let l={relativePath:void 0===s?t.path||"":s,caseSensitive:!0===t.caseSensitive,childrenIndex:o,route:t};l.relativePath.startsWith("/")&&(i(l.relativePath.startsWith(n),'Absolute route path "'+l.relativePath+'" nested under path "'+n+'" is not valid. An absolute child route path must start with the combined path of all its parent routes.'),l.relativePath=l.relativePath.slice(n.length));let u=R([n,l.relativePath]),d=a.concat(l);if(t.children&&t.children.length>0&&(i(!0!==t.index,'Index routes must not have child routes. Please remove all child routes from route path "'+u+'".'),e(t.children,r,d,u)),null!=t.path||t.index){var h;let e,a;r.push({path:u,score:(h=t.index,a=(e=u.split("/")).length,e.some(f)&&(a+=-2),h&&(a+=2),e.filter(e=>!f(e)).reduce((e,t)=>e+(p.test(t)?3:""===t?1:10),a)),routesMeta:d})}};return t.forEach((e,t)=>{var r;if(""!==e.path&&null!=(r=e.path)&&r.includes("?"))for(let r of function e(t){let r=t.split("/");if(0===r.length)return[];let[a,...n]=r,o=a.endsWith("?"),i=a.replace(/\?$/,"");if(0===n.length)return o?[i,""]:[i];let s=e(n.join("/")),l=[];return l.push(...s.map(e=>""===e?i:[i,e].join("/"))),o&&l.push(...s),l.map(e=>t.startsWith("/")&&""===e?"/":e)}(e.path))o(e,t,r);else o(e,t)}),r}(e);(function(e){e.sort((e,t)=>{var r,a;return e.score!==t.score?t.score-e.score:(r=e.routesMeta.map(e=>e.childrenIndex),a=t.routesMeta.map(e=>e.childrenIndex),r.length===a.length&&r.slice(0,-1).every((e,t)=>e===a[t])?r[r.length-1]-a[a.length-1]:0)})})(n);let o=null;for(let e=0;null==o&&e<n.length;++e){let t=function(e){try{return e.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(t){return s(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent encoding ('+t+")."),e}}(a);o=function(e,t){let{routesMeta:r}=e,a={},n="/",o=[];for(let e=0;e<r.length;++e){let i=r[e],s=e===r.length-1,l="/"===n?t:t.slice(n.length)||"/",u=m({path:i.relativePath,caseSensitive:i.caseSensitive,end:s},l);if(!u)return null;Object.assign(a,u.params);let d=i.route;o.push({params:a,pathname:R([n,u.pathname]),pathnameBase:P(R([n,u.pathnameBase])),route:d}),"/"!==u.pathnameBase&&(n=R([n,u.pathnameBase]))}return o}(n[e],t)}return o}let p=/^:[\w-]+$/,f=e=>"*"===e;function m(e,t){var r,a,n;let o,i;"string"==typeof e&&(e={path:e,caseSensitive:!1,end:!0});let[l,u]=(r=e.path,a=e.caseSensitive,n=e.end,void 0===a&&(a=!1),void 0===n&&(n=!0),s("*"===r||!r.endsWith("*")||r.endsWith("/*"),'Route path "'+r+'" will be treated as if it were "'+r.replace(/\*$/,"/*")+'" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "'+r.replace(/\*$/,"/*")+'".'),o=[],i="^"+r.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(e,t,r)=>(o.push({paramName:t,isOptional:null!=r}),r?"/?([^\\/]+)?":"/([^\\/]+)")),r.endsWith("*")?(o.push({paramName:"*"}),i+="*"===r||"/*"===r?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?i+="\\/*$":""!==r&&"/"!==r&&(i+="(?:(?=\\/|$))"),[new RegExp(i,a?void 0:"i"),o]),d=t.match(l);if(!d)return null;let h=d[0],c=h.replace(/(.)\/+$/,"$1"),p=d.slice(1);return{params:u.reduce((e,t,r)=>{let{paramName:a,isOptional:n}=t;if("*"===a){let e=p[r]||"";c=h.slice(0,h.length-e.length).replace(/(.)\/+$/,"$1")}let o=p[r];return n&&!o?e[a]=void 0:e[a]=(o||"").replace(/%2F/g,"/"),e},{}),pathname:h,pathnameBase:c,pattern:e}}function y(e,t){if("/"===t)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,a=e.charAt(r);return a&&"/"!==a?null:e.slice(r)||"/"}function v(e,t,r,a){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t)+"` field ["+JSON.stringify(a)+"].  Please separate it out to the `to."+r+'` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.'}function g(e){return e.filter((e,t)=>0===t||e.route.path&&e.route.path.length>0)}function b(e,t){let r=g(e);return t?r.map((t,r)=>r===e.length-1?t.pathname:t.pathnameBase):r.map(e=>e.pathnameBase)}function w(e,t,r,a){let n,s;void 0===a&&(a=!1),"string"==typeof e?n=d(e):(i(!(n=o({},e)).pathname||!n.pathname.includes("?"),v("?","pathname","search",n)),i(!n.pathname||!n.pathname.includes("#"),v("#","pathname","hash",n)),i(!n.search||!n.search.includes("#"),v("#","search","hash",n)));let l=""===e||""===n.pathname,u=l?"/":n.pathname;if(null==u)s=r;else{let e=t.length-1;if(!a&&u.startsWith("..")){let t=u.split("/");for(;".."===t[0];)t.shift(),e-=1;n.pathname=t.join("/")}s=e>=0?t[e]:"/"}let h=function(e,t){let r;void 0===t&&(t="/");let{pathname:a,search:n="",hash:o=""}="string"==typeof e?d(e):e;return{pathname:a?a.startsWith("/")?a:(r=t.replace(/\/+$/,"").split("/"),a.split("/").forEach(e=>{".."===e?r.length>1&&r.pop():"."!==e&&r.push(e)}),r.length>1?r.join("/"):"/"):t,search:S(n),hash:j(o)}}(n,s),c=u&&"/"!==u&&u.endsWith("/"),p=(l||"."===u)&&r.endsWith("/");return!h.pathname.endsWith("/")&&(c||p)&&(h.pathname+="/"),h}let R=e=>e.join("/").replace(/\/\/+/g,"/"),P=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),S=e=>e&&"?"!==e?e.startsWith("?")?e:"?"+e:"",j=e=>e&&"#"!==e?e.startsWith("#")?e:"#"+e:"",x=function(e,t){void 0===t&&(t={});let r="number"==typeof t?{status:t}:t,a=new Headers(r.headers);return a.has("Content-Type")||a.set("Content-Type","application/json; charset=utf-8"),new Response(JSON.stringify(e),o({},r,{headers:a}))};class D extends Error{}class C{constructor(e,t){let r;this.pendingKeysSet=new Set,this.subscribers=new Set,this.deferredKeys=[],i(e&&"object"==typeof e&&!Array.isArray(e),"defer() only accepts plain objects"),this.abortPromise=new Promise((e,t)=>r=t),this.controller=new AbortController;let a=()=>r(new D("Deferred data aborted"));this.unlistenAbortSignal=()=>this.controller.signal.removeEventListener("abort",a),this.controller.signal.addEventListener("abort",a),this.data=Object.entries(e).reduce((e,t)=>{let[r,a]=t;return Object.assign(e,{[r]:this.trackPromise(r,a)})},{}),this.done&&this.unlistenAbortSignal(),this.init=t}trackPromise(e,t){if(!(t instanceof Promise))return t;this.deferredKeys.push(e),this.pendingKeysSet.add(e);let r=Promise.race([t,this.abortPromise]).then(t=>this.onSettle(r,e,void 0,t),t=>this.onSettle(r,e,t));return r.catch(()=>{}),Object.defineProperty(r,"_tracked",{get:()=>!0}),r}onSettle(e,t,r,a){if(this.controller.signal.aborted&&r instanceof D)return this.unlistenAbortSignal(),Object.defineProperty(e,"_error",{get:()=>r}),Promise.reject(r);if(this.pendingKeysSet.delete(t),this.done&&this.unlistenAbortSignal(),void 0===r&&void 0===a){let r=Error('Deferred data for key "'+t+'" resolved/rejected with `undefined`, you must resolve/reject with a value or `null`.');return Object.defineProperty(e,"_error",{get:()=>r}),this.emit(!1,t),Promise.reject(r)}return void 0===a?(Object.defineProperty(e,"_error",{get:()=>r}),this.emit(!1,t),Promise.reject(r)):(Object.defineProperty(e,"_data",{get:()=>a}),this.emit(!1,t),a)}emit(e,t){this.subscribers.forEach(r=>r(e,t))}subscribe(e){return this.subscribers.add(e),()=>this.subscribers.delete(e)}cancel(){this.controller.abort(),this.pendingKeysSet.forEach((e,t)=>this.pendingKeysSet.delete(t)),this.emit(!0)}async resolveData(e){let t=!1;if(!this.done){let r=()=>this.cancel();e.addEventListener("abort",r),t=await new Promise(t=>{this.subscribe(a=>{e.removeEventListener("abort",r),(a||this.done)&&t(a)})})}return t}get done(){return 0===this.pendingKeysSet.size}get unwrappedData(){return i(null!==this.data&&this.done,"Can only unwrap data on initialized and settled deferreds"),Object.entries(this.data).reduce((e,t)=>{let[r,a]=t;return Object.assign(e,{[r]:function(e){if(!(e instanceof Promise&&!0===e._tracked))return e;if(e._error)throw e._error;return e._data}(a)})},{})}get pendingKeys(){return Array.from(this.pendingKeysSet)}}let L=function(e,t){return void 0===t&&(t={}),new C(e,"number"==typeof t?{status:t}:t)},E=function(e,t){void 0===t&&(t=302);let r=t;"number"==typeof r?r={status:r}:void 0===r.status&&(r.status=302);let a=new Headers(r.headers);return a.set("Location",e),new Response(null,o({},r,{headers:a}))},O=(e,t)=>{let r=E(e,t);return r.headers.set("X-Remix-Reload-Document","true"),r};class A{constructor(e,t,r,a){void 0===a&&(a=!1),this.status=e,this.statusText=t||"",this.internal=a,r instanceof Error?(this.data=r.toString(),this.error=r):this.data=r}}function U(e){return null!=e&&"number"==typeof e.status&&"string"==typeof e.statusText&&"boolean"==typeof e.internal&&"data"in e}let q=["post","put","patch","delete"],_=new Set(q),W=new Set(["get",...q]),H=new Set([301,302,303,307,308]),$=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,z=e=>({hasErrorBoundary:!!e.hasErrorBoundary}),B=Symbol("deferred");function I(e,t){let r;i(e.length>0,"You must provide a non-empty routes array to createStaticHandler");let a={},s=(t?t.basename:null)||"/";if(null!=t&&t.mapRouteProperties)r=t.mapRouteProperties;else if(null!=t&&t.detectErrorBoundary){let e=t.detectErrorBoundary;r=t=>({hasErrorBoundary:e(t)})}else r=z;let d=o({v7_relativeSplatPath:!1,v7_throwAbortReason:!1},t?t.future:null),h=function e(t,r,a,n){return void 0===a&&(a=[]),void 0===n&&(n={}),t.map((t,s)=>{let l=[...a,s],u="string"==typeof t.id?t.id:l.join("-");if(i(!0!==t.index||!t.children,"Cannot specify children on an index route"),i(!n[u],'Found a route id collision on id "'+u+"\".  Route id's must be globally unique within Data Router usages"),!0===t.index){let e=o({},t,r(t),{id:u});return n[u]=e,e}{let a=o({},t,r(t),{id:u,children:void 0});return n[u]=a,t.children&&(a.children=e(t.children,r,l,n)),a}})}(e,r,void 0,a);async function p(e,t){let{requestContext:r}=void 0===t?{}:t,a=new URL(e.url),n=e.method,i=l("",u(a),null,"default"),d=c(h,i,s);if(V(n)||"HEAD"===n){if(!d){let e=M(404,{pathname:i.pathname}),{matches:t,route:r}=X(h);return{basename:s,location:i,matches:t,loaderData:{},actionData:null,errors:{[r.id]:e},statusCode:e.status,loaderHeaders:{},actionHeaders:{},activeDeferreds:null}}}else{let e=M(405,{method:n}),{matches:t,route:r}=X(h);return{basename:s,location:i,matches:t,loaderData:{},actionData:null,errors:{[r.id]:e},statusCode:e.status,loaderHeaders:{},actionHeaders:{},activeDeferreds:null}}let p=await m(e,i,d,r);return Z(p)?p:o({location:i,basename:s},p)}async function f(e,t){let{routeId:r,requestContext:a}=void 0===t?{}:t,n=new URL(e.url),o=e.method,i=l("",u(n),null,"default"),d=c(h,i,s);if(V(o)||"HEAD"===o||"OPTIONS"===o){if(!d)throw M(404,{pathname:i.pathname})}else throw M(405,{method:o});let p=r?d.find(e=>e.route.id===r):ee(d,i);if(r&&!p)throw M(403,{pathname:i.pathname,routeId:r});if(!p)throw M(404,{pathname:i.pathname});let f=await m(e,i,d,a,p);if(Z(f))return f;let y=f.errors?Object.values(f.errors)[0]:void 0;if(void 0!==y)throw y;if(f.actionData)return Object.values(f.actionData)[0];if(f.loaderData){var v;let e=Object.values(f.loaderData)[0];return null!=(v=f.activeDeferreds)&&v[p.route.id]&&(e[B]=f.activeDeferreds[p.route.id]),e}}async function m(e,t,r,a,s){i(e.signal,"query()/queryRoute() requests must contain an AbortController signal");try{if(function(e){return _.has(e.toLowerCase())}(e.method.toLowerCase()))return await y(e,r,s||ee(r,t),a,null!=s);let n=await v(e,r,a,s);return Z(n)?n:o({},n,{actionData:null,actionHeaders:{}})}catch(e){if(e&&Z(e.response)&&(e.type===n.data||e.type===n.error)){if(e.type===n.error)throw e.response;return e.response}if(function(e){if(!Z(e))return!1;let t=e.status,r=e.headers.get("Location");return t>=300&&t<=399&&null!=r}(e))return e;throw e}}async function y(e,t,i,l,u){let h;if(i.route.action||i.route.lazy)h=await N("action",e,i,t,a,r,s,d.v7_relativeSplatPath,{isStaticRequest:!0,isRouteRequest:u,requestContext:l}),e.signal.aborted&&K(e,u,d);else{let t=M(405,{method:e.method,pathname:new URL(e.url).pathname,routeId:i.route.id});if(u)throw t;h={type:n.error,error:t}}if(Q(h))throw new Response(null,{status:h.status,headers:{Location:h.location}});if(Y(h)){let e=M(400,{type:"defer-action"});if(u)throw e;h={type:n.error,error:e}}if(u){if(J(h))throw h.error;return{matches:[i],loaderData:{},actionData:{[i.route.id]:h.data},errors:null,statusCode:200,loaderHeaders:{},actionHeaders:{},activeDeferreds:null}}if(J(h)){let r=F(t,i.route.id),a=await v(e,t,l,void 0,{[r.route.id]:h.error});return o({},a,{statusCode:U(h.error)?h.error.status:500,actionData:null,actionHeaders:o({},h.headers?{[i.route.id]:h.headers}:{})})}let c=new Request(e.url,{headers:e.headers,redirect:e.redirect,signal:e.signal}),p=await v(c,t,l);return o({},p,h.statusCode?{statusCode:h.statusCode}:{},{actionData:{[i.route.id]:h.data},actionHeaders:o({},h.headers?{[i.route.id]:h.headers}:{})})}async function v(e,t,n,l,u){let h=null!=l;if(h&&!(null!=l&&l.route.loader)&&!(null!=l&&l.route.lazy))throw M(400,{method:e.method,pathname:new URL(e.url).pathname,routeId:null==l?void 0:l.route.id});let c=(l?[l]:function(e,t){let r=e;if(t){let a=e.findIndex(e=>e.route.id===t);a>=0&&(r=e.slice(0,a))}return r}(t,Object.keys(u||{})[0])).filter(e=>e.route.loader||e.route.lazy);if(0===c.length)return{matches:t,loaderData:t.reduce((e,t)=>Object.assign(e,{[t.route.id]:null}),{}),errors:u||null,statusCode:200,loaderHeaders:{},activeDeferreds:null};let p=await Promise.all([...c.map(o=>N("loader",e,o,t,a,r,s,d.v7_relativeSplatPath,{isStaticRequest:!0,isRouteRequest:h,requestContext:n}))]);e.signal.aborted&&K(e,h,d);let f=new Map,m=function(e,t,r,a,n){let o,s={},l=null,u=!1,d={};return r.forEach((r,h)=>{let c=t[h].route.id;if(i(!Q(r),"Cannot handle redirect results in processLoaderData"),J(r)){let t=F(e,c),n=r.error;a&&(n=Object.values(a)[0],a=void 0),null==(l=l||{})[t.route.id]&&(l[t.route.id]=n),s[c]=void 0,u||(u=!0,o=U(r.error)?r.error.status:500),r.headers&&(d[c]=r.headers)}else Y(r)?(n.set(c,r.deferredData),s[c]=r.deferredData.data):s[c]=r.data,null==r.statusCode||200===r.statusCode||u||(o=r.statusCode),r.headers&&(d[c]=r.headers)}),a&&(l=a,s[Object.keys(a)[0]]=void 0),{loaderData:s,errors:l,statusCode:o||200,loaderHeaders:d}}(t,c,p,u,f),y=new Set(c.map(e=>e.route.id));return t.forEach(e=>{y.has(e.route.id)||(m.loaderData[e.route.id]=null)}),o({},m,{matches:t,activeDeferreds:f.size>0?Object.fromEntries(f.entries()):null})}return{dataRoutes:h,query:p,queryRoute:f}}function k(e,t,r){return o({},t,{statusCode:U(r)?r.status:500,errors:{[t._deepestRenderedBoundaryId||e[0].id]:r}})}function K(e,t,r){if(r.v7_throwAbortReason&&void 0!==e.signal.reason)throw e.signal.reason;throw Error((t?"queryRoute":"query")+"() call aborted: "+e.method+" "+e.url)}async function T(e,t,r){if(!e.lazy)return;let a=await e.lazy();if(!e.lazy)return;let n=r[e.id];i(n,"No route found in manifest");let l={};for(let e in a){let t=void 0!==n[e]&&"hasErrorBoundary"!==e;s(!t,'Route "'+n.id+'" has a static property "'+e+'" defined but its lazy function is also returning a value for this property. The lazy route property "'+e+'" will be ignored.'),t||h.has(e)||(l[e]=a[e])}Object.assign(n,l),Object.assign(n,o({},t(n),{lazy:void 0}))}async function N(e,t,r,a,o,s,l,d,h){var c,p,f;let m,v,g;void 0===h&&(h={});let P=e=>{let a;let n=new Promise((e,t)=>a=t);return g=()=>a(),t.signal.addEventListener("abort",g),Promise.race([e({request:t,params:r.params,context:h.requestContext}),n])};try{let a=r.route[e];if(r.route.lazy){if(a){let e;let t=await Promise.all([P(a).catch(t=>{e=t}),T(r.route,s,o)]);if(e)throw e;v=t[0]}else if(await T(r.route,s,o),a=r.route[e])v=await P(a);else{if("action"!==e)return{type:n.data,data:void 0};let a=new URL(t.url),o=a.pathname+a.search;throw M(405,{method:t.method,pathname:o,routeId:r.route.id})}}else if(a)v=await P(a);else{let e=new URL(t.url),r=e.pathname+e.search;throw M(404,{pathname:r})}i(void 0!==v,"You defined "+("action"===e?"an action":"a loader")+" for route "+('"'+r.route.id)+"\" but didn't return anything from your `"+e+"` function. Please return a value or `null`.")}catch(e){m=n.error,v=e}finally{g&&t.signal.removeEventListener("abort",g)}if(Z(v)){let e,o=v.status;if(H.has(o)){let e=v.headers.get("Location");if(i(e,"Redirects returned/thrown from loaders/actions must have a Location header"),$.test(e)){if(!h.isStaticRequest){let r=new URL(t.url),a=new URL(e.startsWith("//")?r.protocol+e:e),n=null!=y(a.pathname,l);a.origin===r.origin&&n&&(e=a.pathname+a.search+a.hash)}}else e=function(e,t,r,a,n,o,i,s){let l;l=t[t.length-1];let d=w(n||".",b(t,o),y(e.pathname,r)||e.pathname,!1);return null==n&&(d.search=e.search,d.hash=e.hash),(null==n||""===n||"."===n)&&l&&l.route.index&&!G(d.search)&&(d.search=d.search?d.search.replace(/^\?/,"?index&"):"?index"),a&&"/"!==r&&(d.pathname="/"===d.pathname?r:R([r,d.pathname])),u(d)}(new URL(t.url),a.slice(0,a.indexOf(r)+1),l,!0,e,d);if(h.isStaticRequest)throw v.headers.set("Location",e),v;return{type:n.redirect,status:o,location:e,revalidate:null!==v.headers.get("X-Remix-Revalidate"),reloadDocument:null!==v.headers.get("X-Remix-Reload-Document")}}if(h.isRouteRequest)throw{type:m===n.error?n.error:n.data,response:v};try{let t=v.headers.get("Content-Type");e=t&&/\bapplication\/json\b/.test(t)?null==v.body?null:await v.json():await v.text()}catch(e){return{type:n.error,error:e}}return m===n.error?{type:m,error:new A(o,v.statusText,e),headers:v.headers}:{type:n.data,data:e,statusCode:v.status,headers:v.headers}}return m===n.error?{type:m,error:v}:(c=v)&&"object"==typeof c&&"object"==typeof c.data&&"function"==typeof c.subscribe&&"function"==typeof c.cancel&&"function"==typeof c.resolveData?{type:n.deferred,deferredData:v,statusCode:null==(p=v.init)?void 0:p.status,headers:(null==(f=v.init)?void 0:f.headers)&&new Headers(v.init.headers)}:{type:n.data,data:v}}function F(e,t){return(t?e.slice(0,e.findIndex(e=>e.route.id===t)+1):[...e]).reverse().find(e=>!0===e.route.hasErrorBoundary)||e[0]}function X(e){let t=1===e.length?e[0]:e.find(e=>e.index||!e.path||"/"===e.path)||{id:"__shim-error-route__"};return{matches:[{params:{},pathname:"",pathnameBase:"",route:t}],route:t}}function M(e,t){let{pathname:r,routeId:a,method:n,type:o}=void 0===t?{}:t,i="Unknown Server Error",s="Unknown @remix-run/router error";return 400===e?(i="Bad Request",n&&r&&a?s="You made a "+n+' request to "'+r+'" but did not provide a `loader` for route "'+a+'", so there is no way to handle the request.':"defer-action"===o?s="defer() is not supported in actions":"invalid-body"===o&&(s="Unable to encode submission body")):403===e?(i="Forbidden",s='Route "'+a+'" does not match URL "'+r+'"'):404===e?(i="Not Found",s='No route matches URL "'+r+'"'):405===e&&(i="Method Not Allowed",n&&r&&a?s="You made a "+n.toUpperCase()+' request to "'+r+'" but did not provide an `action` for route "'+a+'", so there is no way to handle the request.':n&&(s='Invalid request method "'+n.toUpperCase()+'"')),new A(e||500,i,Error(s),!0)}function Y(e){return e.type===n.deferred}function J(e){return e.type===n.error}function Q(e){return(e&&e.type)===n.redirect}function Z(e){return null!=e&&"number"==typeof e.status&&"string"==typeof e.statusText&&"object"==typeof e.headers&&void 0!==e.body}function V(e){return W.has(e.toLowerCase())}function G(e){return new URLSearchParams(e).getAll("index").some(e=>""===e)}function ee(e,t){let r="string"==typeof t?d(t).search:t.search;if(e[e.length-1].route.index&&G(r||""))return e[e.length-1];let a=g(e);return a[a.length-1]}}};