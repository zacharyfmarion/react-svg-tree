!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=6)}([function(e,t,r){"use strict";e.exports=r(1)},function(e,t,r){"use strict";
/** @license React v16.4.2
 * react.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=r(2),o=r(3),i=r(4),u=r(5),a="function"==typeof Symbol&&Symbol.for,l=a?Symbol.for("react.element"):60103,p=a?Symbol.for("react.portal"):60106,f=a?Symbol.for("react.fragment"):60107,c=a?Symbol.for("react.strict_mode"):60108,s=a?Symbol.for("react.profiler"):60114,d=a?Symbol.for("react.provider"):60109,h=a?Symbol.for("react.context"):60110,y=a?Symbol.for("react.async_mode"):60111,v=a?Symbol.for("react.forward_ref"):60112;a&&Symbol.for("react.timeout");var m="function"==typeof Symbol&&Symbol.iterator;function g(e){for(var t=arguments.length-1,r="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=0;n<t;n++)r+="&args[]="+encodeURIComponent(arguments[n+1]);o(!1,"Minified React error #"+e+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",r)}var b={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}};function S(e,t,r){this.props=e,this.context=t,this.refs=i,this.updater=r||b}function x(){}function w(e,t,r){this.props=e,this.context=t,this.refs=i,this.updater=r||b}S.prototype.isReactComponent={},S.prototype.setState=function(e,t){"object"!=typeof e&&"function"!=typeof e&&null!=e&&g("85"),this.updater.enqueueSetState(this,e,t,"setState")},S.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},x.prototype=S.prototype;var O=w.prototype=new x;O.constructor=w,n(O,S.prototype),O.isPureReactComponent=!0;var _={current:null},j=Object.prototype.hasOwnProperty,M={key:!0,ref:!0,__self:!0,__source:!0};function C(e,t,r){var n=void 0,o={},i=null,u=null;if(null!=t)for(n in void 0!==t.ref&&(u=t.ref),void 0!==t.key&&(i=""+t.key),t)j.call(t,n)&&!M.hasOwnProperty(n)&&(o[n]=t[n]);var a=arguments.length-2;if(1===a)o.children=r;else if(1<a){for(var p=Array(a),f=0;f<a;f++)p[f]=arguments[f+2];o.children=p}if(e&&e.defaultProps)for(n in a=e.defaultProps)void 0===o[n]&&(o[n]=a[n]);return{$$typeof:l,type:e,key:i,ref:u,props:o,_owner:_.current}}function P(e){return"object"==typeof e&&null!==e&&e.$$typeof===l}var N=/\/+/g,E=[];function k(e,t,r,n){if(E.length){var o=E.pop();return o.result=e,o.keyPrefix=t,o.func=r,o.context=n,o.count=0,o}return{result:e,keyPrefix:t,func:r,context:n,count:0}}function R(e){e.result=null,e.keyPrefix=null,e.func=null,e.context=null,e.count=0,10>E.length&&E.push(e)}function A(e,t,r,n){var o=typeof e;"undefined"!==o&&"boolean"!==o||(e=null);var i=!1;if(null===e)i=!0;else switch(o){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case l:case p:i=!0}}if(i)return r(n,e,""===t?"."+$(e,0):t),1;if(i=0,t=""===t?".":t+":",Array.isArray(e))for(var u=0;u<e.length;u++){var a=t+$(o=e[u],u);i+=A(o,a,r,n)}else if(null===e||void 0===e?a=null:a="function"==typeof(a=m&&e[m]||e["@@iterator"])?a:null,"function"==typeof a)for(e=a.call(e),u=0;!(o=e.next()).done;)i+=A(o=o.value,a=t+$(o,u++),r,n);else"object"===o&&g("31","[object Object]"===(r=""+e)?"object with keys {"+Object.keys(e).join(", ")+"}":r,"");return i}function $(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+(""+e).replace(/[=:]/g,function(e){return t[e]})}(e.key):t.toString(36)}function T(e,t){e.func.call(e.context,t,e.count++)}function L(e,t,r){var n=e.result,o=e.keyPrefix;e=e.func.call(e.context,t,e.count++),Array.isArray(e)?V(e,n,r,u.thatReturnsArgument):null!=e&&(P(e)&&(t=o+(!e.key||t&&t.key===e.key?"":(""+e.key).replace(N,"$&/")+"/")+r,e={$$typeof:l,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}),n.push(e))}function V(e,t,r,n,o){var i="";null!=r&&(i=(""+r).replace(N,"$&/")+"/"),t=k(t,i,n,o),null==e||A(e,"",L,t),R(t)}var z={Children:{map:function(e,t,r){if(null==e)return e;var n=[];return V(e,n,null,t,r),n},forEach:function(e,t,r){if(null==e)return e;t=k(null,null,t,r),null==e||A(e,"",T,t),R(t)},count:function(e){return null==e?0:A(e,"",u.thatReturnsNull,null)},toArray:function(e){var t=[];return V(e,t,null,u.thatReturnsArgument),t},only:function(e){return P(e)||g("143"),e}},createRef:function(){return{current:null}},Component:S,PureComponent:w,createContext:function(e,t){return void 0===t&&(t=null),(e={$$typeof:h,_calculateChangedBits:t,_defaultValue:e,_currentValue:e,_currentValue2:e,_changedBits:0,_changedBits2:0,Provider:null,Consumer:null}).Provider={$$typeof:d,_context:e},e.Consumer=e},forwardRef:function(e){return{$$typeof:v,render:e}},Fragment:f,StrictMode:c,unstable_AsyncMode:y,unstable_Profiler:s,createElement:C,cloneElement:function(e,t,r){(null===e||void 0===e)&&g("267",e);var o=void 0,i=n({},e.props),u=e.key,a=e.ref,p=e._owner;if(null!=t){void 0!==t.ref&&(a=t.ref,p=_.current),void 0!==t.key&&(u=""+t.key);var f=void 0;for(o in e.type&&e.type.defaultProps&&(f=e.type.defaultProps),t)j.call(t,o)&&!M.hasOwnProperty(o)&&(i[o]=void 0===t[o]&&void 0!==f?f[o]:t[o])}if(1===(o=arguments.length-2))i.children=r;else if(1<o){f=Array(o);for(var c=0;c<o;c++)f[c]=arguments[c+2];i.children=f}return{$$typeof:l,type:e.type,key:u,ref:a,props:i,_owner:p}},createFactory:function(e){var t=C.bind(null,e);return t.type=e,t},isValidElement:P,version:"16.4.2",__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentOwner:_,assign:n}},F={default:z},D=F&&z||F;e.exports=D.default?D.default:D},function(e,t,r){"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable;e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map(function(e){return t[e]}).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach(function(e){n[e]=e}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(e){return!1}}()?Object.assign:function(e,t){for(var r,u,a=function(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}(e),l=1;l<arguments.length;l++){for(var p in r=Object(arguments[l]))o.call(r,p)&&(a[p]=r[p]);if(n){u=n(r);for(var f=0;f<u.length;f++)i.call(r,u[f])&&(a[u[f]]=r[u[f]])}}return a}},function(e,t,r){"use strict";var n=function(e){};e.exports=function(e,t,r,o,i,u,a,l){if(n(t),!e){var p;if(void 0===t)p=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var f=[r,o,i,u,a,l],c=0;(p=new Error(t.replace(/%s/g,function(){return f[c++]}))).name="Invariant Violation"}throw p.framesToPop=1,p}}},function(e,t,r){"use strict";e.exports={}},function(e,t,r){"use strict";function n(e){return function(){return e}}var o=function(){};o.thatReturns=n,o.thatReturnsFalse=n(!1),o.thatReturnsTrue=n(!0),o.thatReturnsNull=n(null),o.thatReturnsThis=function(){return this},o.thatReturnsArgument=function(e){return e},e.exports=o},function(e,t,r){"use strict";r.r(t);var n=r(0),o=function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),i=function(){return(i=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},u=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&(r[n[o]]=e[n[o]])}return r},a=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.prototype.render=function(){var e=this.props,t=e.x,r=e.y,o=e.id,a=e.r,l=e.showLabel,p=e.className,f=e.children,c=u(e,["x","y","id","r","showLabel","className","children"]),s=n.Children.toArray(f)[0];return n.createElement("g",null,!s&&n.createElement("circle",i({cx:t,cy:r,r:a,className:p,fill:"rgb(15, 98, 189)"},c)),s&&n.cloneElement(s,i({x:(t||0)-s.props.width/2,y:(r||0)-s.props.height/2,className:p},c)),l&&n.createElement("text",{fill:"#fff",style:{fontSize:5},textAnchor:"middle",x:t,y:(r||0)+1.5},o))},t.defaultProps={r:5},t}(n.Component),l=function(){return(l=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function p(e,t,r){void 0===r&&(r=null);var n=e.get(t);return void 0===n?r:n}var f=function(){function e(e,t,r){this.vertexMap=e,this.nodeSizeMap=t,this.parentMap=this.createParentMap(),this.positionMap=new Map([r]),this.leftNeighborMap=new Map,this.prevNodeMap=new Map}return e.prototype.createParentMap=function(){var e=new Map;return this.vertexMap.forEach(function(t,r){t&&t.forEach(function(t){e.set(t,r)})}),e},e.prototype.hasNode=function(e){return void 0!==this.vertexMap.get(e)},e.prototype.isLeaf=function(e){return 0===p(this.vertexMap,e,[]).length},e.prototype.parent=function(e){return p(this.parentMap,e)},e.prototype.prelim=function(e){var t=this.positionMap.get(e);return t?t.prelim:0},e.prototype.xCoord=function(e){var t=this.positionMap.get(e);return t?t.x:0},e.prototype.yCoord=function(e){var t=this.positionMap.get(e);return t?t.y:0},e.prototype.getCoordinates=function(e){return[this.xCoord(e),this.yCoord(e)]},e.prototype.modifier=function(e){var t=this.positionMap.get(e);return t?t.mod:0},e.prototype.firstChild=function(e){var t=p(this.vertexMap,e,[]);return t.length>0?t[0]:null},e.prototype.prevNode=function(e){return p(this.prevNodeMap,e)},e.prototype.hasLeftSibling=function(e){return null!==this.leftSibling(e)},e.prototype.hasRightSibling=function(e){return null!==this.rightSibling(e)},e.prototype.leftSibling=function(e){var t=this.getSiblings(e),r=t.indexOf(e);return r>0?t[r-1]:null},e.prototype.leftSiblings=function(e){var t=this.getSiblings(e);return t.filter(function(r,n){return n<t.indexOf(e)})},e.prototype.rightSibling=function(e){var t=this.getSiblings(e),r=t.indexOf(e);return t.length-1>r?t[r+1]:null},e.prototype.leftNeighbor=function(e){return p(this.leftNeighborMap,e)},e.prototype.getSiblings=function(e){var t=p(this.parentMap,e);return p(this.vertexMap,t,[])},e.prototype.updatePositionValue=function(e,t){this.positionMap.set(e,l({x:0,y:0,prelim:0,mod:0},this.positionMap.get(e),t))},e.prototype.meanNodeSize=function(e){var t=this;if(!e||0===e.length)throw new Error("Cannot compute mean of input");return e.map(function(e){return p(t.nodeSizeMap,e,0)}).reduce(function(e,t){return e+t})/e.length},e}();function c(e,t,r){return!e.hasNode(t)||(function e(t,r,n,o){t.leftNeighborMap.set(r,t.prevNode(n));t.prevNodeMap.set(n,r);if(t.isLeaf(r)||n===o.maxDepth){var i=t.leftSibling(r);if(null!==i){var u=t.prelim(i)+o.siblingSeparation+t.meanNodeSize([i,r]);t.updatePositionValue(r,{prelim:u})}else t.updatePositionValue(r,{prelim:0})}else{var a=t.firstChild(r),l=a;for(e(t,a,n+1,o);t.hasRightSibling(l);)l=t.rightSibling(l),e(t,l,n+1,o);var p=(t.prelim(a)+t.prelim(l))/2,i=t.leftSibling(r);if(null!==i){var u=t.prelim(i)+o.siblingSeparation+t.meanNodeSize([i,r]),f=u-p;t.updatePositionValue(r,{prelim:u,mod:f}),function(e,t,r,n){var o=e.firstChild(t),i=e.leftNeighbor(o),u=1,a=n.maxDepth-r;for(;null!==o&&null!==i&&u<=a;){for(var l=0,p=0,f=o,c=i,d=0;d<u;d++)f=e.parent(f),c=e.parent(c),p+=e.modifier(f),l+=e.modifier(c);var h=e.prelim(i)+l+n.subtreeSeparation+e.meanNodeSize([o,i])-(e.prelim(o)+p);if(h>0){for(var y=t,v=0;null!==y&&y!==c;)v+=1,y=e.leftSibling(y);if(null===y)return;var m=h/v;for(y=t;y!==c;){var g=e.prelim(y)+h,b=e.modifier(y)+h;h-=m,e.updatePositionValue(y,{prelim:g,mod:b}),y=e.leftSibling(y)}}u+=1,o=e.isLeaf(o)?s(e,t,0,u):e.firstChild(o),i=e.leftNeighbor(o)}}(t,r,n,o)}else t.updatePositionValue(r,{prelim:p})}}(e,t,0,r),e.xTopAdjustment=e.xCoord(t)-e.prelim(t),e.yTopAdjustment=e.yCoord(t),function e(t,r,n,o,i){var u=!0;if(n<=i.maxDepth){var a=t.xTopAdjustment+t.prelim(r)+o,l=t.yTopAdjustment+n*i.levelSeparation;!function(e,t,r){return e>=0&&e<=r.width&&t>=0&&t<=r.height}(a,l,i)?u=!1:(t.updatePositionValue(r,{x:a,y:l}),t.isLeaf(r)||(u=e(t,t.firstChild(r),n+1,o+t.modifier(r),i)),u&&t.hasRightSibling(r)&&(u=e(t,t.rightSibling(r),n,o,i)))}return u}(e,t,0,0,r))}function s(e,t,r,n){if(r>=n)return t;for(var o=t;null===e.firstChild(o)&&e.hasRightSibling(o);)o=e.rightSibling(o);return s(e,o=e.firstChild(o),r+1,n)}var d=function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),h=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.renderTree=function(){var e=t.createTreeGraph();return e?t.props.vertices?t.renderFromVertexMap(e):t.renderFromChildNodes(e):null},t.renderFromVertexMap=function(e){var r=t.props,o=r.vertices,i=r.showLabels;if(!o)return null;var u=[];return o.forEach(function(r,o){var l=e.getCoordinates(o),p=l[0],f=l[1],c=n.createElement(a,{id:o,x:p,y:f,r:t.nodeSizeMap.get(o),showLabel:i,key:o||"0"});u.push(t.createChildConnections(e,o,r)),u.push(c)}),u},t.renderFromChildNodes=function(e){var r=n.Children.toArray(t.props.children),o=[];return n.Children.forEach(r,function(r){var i=e.getCoordinates(r.props.id),u=i[0],a=i[1],l=n.cloneElement(r,{x:u,y:a,r:t.nodeSizeMap.get(r.props.id),showLabel:t.props.showLabels,key:r.props.id});o.push(t.createChildConnections(e,r.props.id,r.props.childNodes||[])),o.push(l)}),o},t.createChildConnections=function(e,t,r){var o=[];return t?(r.forEach(function(r){var i=e.getCoordinates(t),u=i[0],a=i[1],l=e.getCoordinates(r),p=l[0],f=l[1];o.push(n.createElement("line",{x1:u,y1:a,x2:p,y2:f,stroke:"#000",strokeWidth:1,key:t+"-"+r}))}),o):[]},t.createTreeGraph=function(){var e=[t.props.rootId||0,{x:t.props.width/2,y:5,prelim:0,mod:0}],r=new f(t.vertexMap,t.nodeSizeMap,e);return c(r,e[0],{width:t.props.width,height:t.props.height,levelSeparation:t.props.levelSeparation,maxDepth:t.props.maxDepth,siblingSeparation:t.props.siblingSeparation,subtreeSeparation:t.props.subtreeSeparation})?r:null},t}return d(t,e),Object.defineProperty(t.prototype,"vertexMap",{get:function(){var e=this.props,t=e.vertices,r=e.children;if(t)return t;if(!r)throw new Error("Children must be passed in if no vertices prop is provided");return new Map(n.Children.toArray(r).map(function(e){return[e.props.id,e.props.childNodes||[]]}))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"nodeSizeMap",{get:function(){var e=this.props,t=e.vertices,r=e.nodeSize,o=e.children;if(t){var i=new Map;return t.forEach(function(e,t){i.set(t,r)}),i}if(!o)throw new Error("Children must be passed in if no vertices prop is provided");var u=n.Children.toArray(o);return new Map(u.map(function(e){return[e.props.id,e.props.r||5]}))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"nodeMap",{get:function(){var e=n.Children.toArray(this.props.children);return new Map(e.map(function(e){return[e.props.id,e]}))},enumerable:!0,configurable:!0}),t.prototype.render=function(){var e=this.props,t=e.width,r=e.height,o=e.className;return n.createElement("svg",{viewBox:"0 0 "+t+" "+r,className:o},this.renderTree())},t.defaultProps={width:200,height:100,rootId:0,nodeSize:5,levelSeparation:20,maxDepth:1/0,siblingSeparation:15,subtreeSeparation:15},t}(n.Component);r.d(t,"Tree",function(){return h}),r.d(t,"Node",function(){return a})}]);