/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__complete_ly_1_0_1_min__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__complete_ly_1_0_1_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__complete_ly_1_0_1_min__);




/***/ }),
/* 1 */
/***/ (function(module, exports) {

function completely(c,f){f=f||{};f.fontSize=f.fontSize||"16px";f.fontFamily=f.fontFamily||"sans-serif";f.promptInnerHTML=f.promptInnerHTML||"";f.color=f.color||"#333";f.hintColor=f.hintColor||"#aaa";f.backgroundColor=f.backgroundColor||"#fff";f.dropDownBorderColor=f.dropDownBorderColor||"#aaa";f.dropDownZIndex=f.dropDownZIndex||"100";f.dropDownOnHoverBackgroundColor=f.dropDownOnHoverBackgroundColor||"#ddd";var l=document.createElement("input");l.type="text";l.spellcheck=false;l.style.fontSize=f.fontSize;l.style.fontFamily=f.fontFamily;l.style.color=f.color;l.style.backgroundColor=f.backgroundColor;l.style.width="100%";l.style.outline="0";l.style.border="0";l.style.margin="0";l.style.padding="0";var k=l.cloneNode();k.disabled="";k.style.position="absolute";k.style.top="0";k.style.left="0";k.style.borderColor="transparent";k.style.boxShadow="none";k.style.color=f.hintColor;l.style.backgroundColor="transparent";l.style.verticalAlign="top";l.style.position="relative";var b=document.createElement("div");b.style.position="relative";b.style.outline="0";b.style.border="0";b.style.margin="0";b.style.padding="0";var e=document.createElement("div");e.style.position="absolute";e.style.outline="0";e.style.margin="0";e.style.padding="0";e.style.border="0";e.style.fontSize=f.fontSize;e.style.fontFamily=f.fontFamily;e.style.color=f.color;e.style.backgroundColor=f.backgroundColor;e.style.top="0";e.style.left="0";e.style.overflow="hidden";e.innerHTML=f.promptInnerHTML;e.style.background="transparent";if(document.body===undefined){throw"document.body is undefined. The library was wired up incorrectly."}document.body.appendChild(e);var p=e.getBoundingClientRect().right;b.appendChild(e);e.style.visibility="visible";e.style.left="-"+p+"px";b.style.marginLeft=p+"px";b.appendChild(k);b.appendChild(l);var j=document.createElement("div");j.style.position="absolute";j.style.visibility="hidden";j.style.outline="0";j.style.margin="0";j.style.padding="0";j.style.textAlign="left";j.style.fontSize=f.fontSize;j.style.fontFamily=f.fontFamily;j.style.backgroundColor=f.backgroundColor;j.style.zIndex=f.dropDownZIndex;j.style.cursor="default";j.style.borderStyle="solid";j.style.borderWidth="1px";j.style.borderColor=f.dropDownBorderColor;j.style.overflowX="hidden";j.style.whiteSpace="pre";j.style.overflowY="scroll";var q=function(u){var v=[];var s=0;var y=-1;var t=function(){this.style.outline="1px solid #ddd"};var r=function(){this.style.outline="0"};var x=function(){w.o3();w.o1(this.__hint)};var w={o3:function(){u.style.visibility="hidden"},refresh:function(B,G){u.style.visibility="hidden";s=0;u.innerHTML="";var F=(window.innerHeight||document.documentElement.clientHeight);var D=u.parentNode.getBoundingClientRect();var A=D.top-6;var C=F-D.bottom-6;v=[];for(var z=0;z<G.length;z++){if(G[z].indexOf(B)!==0){continue}var E=document.createElement("div");E.style.color=f.color;E.onmouseover=t;E.onmouseout=r;E.onmousedown=x;E.__hint=G[z];E.innerHTML=B+"<b>"+G[z].substring(B.length)+"</b>";v.push(E);u.appendChild(E)}if(v.length===0){return}if(v.length===1&&B===v[0].__hint){return}if(v.length<2){return}w.o0(0);if(A>C*3){u.style.maxHeight=A+"px";u.style.top="";u.style.bottom="100%"}else{u.style.top="100%";u.style.bottom="";u.style.maxHeight=C+"px"}u.style.visibility="visible"},o0:function(z){if(y!=-1&&v[y]){v[y].style.backgroundColor=f.backgroundColor}v[z].style.backgroundColor=f.dropDownOnHoverBackgroundColor;y=z},o2:function(z){if(u.style.visibility==="hidden"){return""}if(s+z===-1||s+z===v.length){return v[s].__hint}s+=z;w.o0(s);return v[s].__hint},o1:function(){}};return w};var d=q(j);d.o1=function(r){l.value=k.value=m+r;i.onChange(l.value);n=l.value;setTimeout(function(){l.focus()},0)};b.appendChild(j);c.appendChild(b);var o;var m;function h(r){if(o===undefined){o=document.createElement("span");o.style.visibility="hidden";o.style.position="fixed";o.style.outline="0";o.style.margin="0";o.style.padding="0";o.style.border="0";o.style.left="0";o.style.whiteSpace="pre";o.style.fontSize=f.fontSize;o.style.fontFamily=f.fontFamily;o.style.fontWeight="normal";document.body.appendChild(o)}o.innerHTML=String(r).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return o.getBoundingClientRect().right}var i={onArrowDown:function(){},onArrowUp:function(){},onEnter:function(){},onTab:function(){},onChange:function(){i.repaint()},startFrom:0,options:[],wrapper:b,input:l,hint:k,dropDown:j,prompt:e,setText:function(r){k.value=r;l.value=r},getText:function(){return l.value},o3DropDown:function(){d.o3()},repaint:function(){var x=l.value;var w=i.startFrom;var s=i.options;var r=s.length;var v=x.substring(w);m=x.substring(0,w);k.value="";for(var u=0;u<r;u++){var t=s[u];if(t.indexOf(v)===0){k.value=m+t;break}}j.style.left=h(m)+"px";d.refresh(v,i.options)}};var n;var g=function(r,t){n=r.value;var s=function(){var u=r.value;if(n!==u){n=u;t(u)}};if(r.addEventListener){r.addEventListener("input",s,false);r.addEventListener("keyup",s,false);r.addEventListener("change",s,false)}else{r.attachEvent("oninput",s);r.attachEvent("onkeyup",s);r.attachEvent("onchange",s)}};g(l,function(r){i.onChange(r)});var a=function(u){u=u||window.event;var t=u.keyCode;if(t==33){return}if(t==34){return}if(t==27){d.o3();k.value=l.value;l.focus();return}if(t==39||t==35||t==9){if(t==9){u.preventDefault();u.stopPropagation();if(k.value.length==0){i.onTab()}}if(k.value.length>0){d.o3();l.value=k.value;var v=n!=l.value;n=l.value;if(v){i.onChange(l.value)}}return}if(t==13){if(k.value.length==0){i.onEnter()}else{var s=(j.style.visibility=="hidden");d.o3();if(s){k.value=l.value;l.focus();i.onEnter();return}l.value=k.value;var v=n!=l.value;n=l.value;if(v){i.onChange(l.value)}}return}if(t==40){var r=d.o2(+1);if(r==""){i.onArrowDown()}k.value=m+r;return}if(t==38){var r=d.o2(-1);if(r==""){i.onArrowUp()}k.value=m+r;u.preventDefault();u.stopPropagation();return}k.value=""};if(l.addEventListener){l.addEventListener("keydown",a,false)}else{l.attachEvent("onkeydown",a)}return i};

/***/ })
/******/ ]);