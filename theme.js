window.theme = window.theme || {};
window.slate = window.slate || {};


window.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

function pad(num, size) {
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  
  return vars;
}

function getUrlParam(parameter, defaultvalue){
  var urlparameter = defaultvalue;
  if(window.location.href.indexOf(parameter) > -1){
    urlparameter = getUrlVars()[parameter];
  }

  return urlparameter;
}

var getFilenameFromUrl = function(url) {
  var filename = url.substring(url.lastIndexOf('/') + 1);

  // "your-image_150x.jpg?v=110101010" => "your-image_150x.jpg"  
  filename = filename.substr(0, filename.indexOf('?'));

  // "your-image_150x.jpg" => "your-image.jpg"
  filename = filename.replace(/_\d+x\./, '.');

  return filename;
};

String.prototype.htmlEntities = function() {
  return this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};

String.prototype.handleize = function() {
  return this.toLowerCase().replace(/[^a-z\d]+/g, '-').replace('-wide-x-', 'x').replace('-deep', '');
};

function calcPrintoutPdfUrl(sku) {
  if ( !sku || typeof sku !== 'string') {
    return false;
  }

  return theme.settings.examplePdfPath.replace(/(\d+)\/files\/[^.]+.pdf/, "$1/files/" + sku +".pdf")

  /*
  // e.g. https://media.benchmademodern.com/uploads/printout/CPT/Stand-Alone/LB/CPT-S70-LB.pdf
  let url = 'https://media.benchmademodern.com/uploads/printout';

  let parts = sku.split("-", 3),
      prefix = parts[0],
      middle = parts[1],
      suffix = parts[2],
      level1 = prefix,
      sectional_suffixes = ['AA', 'LA', 'RA'],
      // @todo: FS, QS, QP (Sofa Beds)
      level2 = (sectional_suffixes.includes(suffix) ? 'Sectional' : 'Stand-Alone'),
      level3 = (middle === 'OTO' ? middle : suffix);

  url += '/' + level1 + '/' + level2 + '/' + level3 + '/' + sku + '.pdf';
 
  return url;
  */
}

function calcDimension() {
  // NOTE: this copies hidden product property field to form's hidden field. It should happen only after calcPropertySize() has been called.
  let msg = 'Size: ' + $('#properties_size').val();

  const $propOrientation = $('.product-box .prop-orientation');
  if ($propOrientation.length > 0) {
    let propName = $propOrientation.data('propName');
    msg += ', ' + propName + ': ' + $propOrientation.val();
  }

  return msg;
}

/** 
* Returns the price in cents to have upper integer value when converted to USD
* 1895 cents => 1900 cents
* 1805 => returns 1900
*/
/*
function ceilCents(value) {
  return Math.ceil(value/100)*100;
}
*/

/* ================ VENDORS ================ */
/* Simple jQuery Equal Heights @version 1.5.1. Copyright (c) 2013 Matt Banks. Dual licensed under the MIT and GPL licenses. */
!function(a){a.fn.equalHeights=function(){var b=0,c=a(this);return c.each(function(){var c=a(this).innerHeight();c>b&&(b=c)}),c.css("height",b)},a("[data-equal]").each(function(){var b=a(this),c=b.data("equal");b.find(c).equalHeights()})}(jQuery);

/*!
 * enquire.js v2.1.2 - Awesome Media Queries in JavaScript
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/enquire.js
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */
!function(a,b,c){var d=window.matchMedia;"undefined"!=typeof module&&module.exports?module.exports=c(d):"function"==typeof define&&define.amd?define(function(){return b[a]=c(d)}):b[a]=c(d)}("enquire",this,function(a){"use strict";function b(a,b){var c,d=0,e=a.length;for(d;e>d&&(c=b(a[d],d),c!==!1);d++);}function c(a){return"[object Array]"===Object.prototype.toString.apply(a)}function d(a){return"function"==typeof a}function e(a){this.options=a,!a.deferSetup&&this.setup()}function f(b,c){this.query=b,this.isUnconditional=c,this.handlers=[],this.mql=a(b);var d=this;this.listener=function(a){d.mql=a,d.assess()},this.mql.addListener(this.listener)}function g(){if(!a)throw new Error("matchMedia not present, legacy browsers require a polyfill");this.queries={},this.browserIsIncapable=!a("only all").matches}return e.prototype={setup:function(){this.options.setup&&this.options.setup(),this.initialised=!0},on:function(){!this.initialised&&this.setup(),this.options.match&&this.options.match()},off:function(){this.options.unmatch&&this.options.unmatch()},destroy:function(){this.options.destroy?this.options.destroy():this.off()},equals:function(a){return this.options===a||this.options.match===a}},f.prototype={addHandler:function(a){var b=new e(a);this.handlers.push(b),this.matches()&&b.on()},removeHandler:function(a){var c=this.handlers;b(c,function(b,d){return b.equals(a)?(b.destroy(),!c.splice(d,1)):void 0})},matches:function(){return this.mql.matches||this.isUnconditional},clear:function(){b(this.handlers,function(a){a.destroy()}),this.mql.removeListener(this.listener),this.handlers.length=0},assess:function(){var a=this.matches()?"on":"off";b(this.handlers,function(b){b[a]()})}},g.prototype={register:function(a,e,g){var h=this.queries,i=g&&this.browserIsIncapable;return h[a]||(h[a]=new f(a,i)),d(e)&&(e={match:e}),c(e)||(e=[e]),b(e,function(b){d(b)&&(b={match:b}),h[a].addHandler(b)}),this},unregister:function(a,b){var c=this.queries[a];return c&&(b?c.removeHandler(b):(c.clear(),delete this.queries[a])),this}},new g});

/*! Magnific Popup - v1.0.0 - 2015-03-30
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2015 Dmitry Semenov; */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):window.jQuery||window.Zepto)}(function(a){var b,c,d,e,f,g,h="Close",i="BeforeClose",j="AfterClose",k="BeforeAppend",l="MarkupParse",m="Open",n="Change",o="mfp",p="."+o,q="mfp-ready",r="mfp-removing",s="mfp-prevent-close",t=function(){},u=!!window.jQuery,v=a(window),w=function(a,c){b.ev.on(o+a+p,c)},x=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},y=function(c,d){b.ev.triggerHandler(o+c,d),b.st.callbacks&&(c=c.charAt(0).toLowerCase()+c.slice(1),b.st.callbacks[c]&&b.st.callbacks[c].apply(b,a.isArray(d)?d:[d]))},z=function(c){return c===g&&b.currTemplate.closeBtn||(b.currTemplate.closeBtn=a(b.st.closeMarkup.replace("%title%",b.st.tClose)),g=c),b.currTemplate.closeBtn},A=function(){a.magnificPopup.instance||(b=new t,b.init(),a.magnificPopup.instance=b)},B=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(void 0!==a.transition)return!0;for(;b.length;)if(b.pop()+"Transition"in a)return!0;return!1};t.prototype={constructor:t,init:function(){var c=navigator.appVersion;b.isIE7=-1!==c.indexOf("MSIE 7."),b.isIE8=-1!==c.indexOf("MSIE 8."),b.isLowIE=b.isIE7||b.isIE8,b.isAndroid=/android/gi.test(c),b.isIOS=/iphone|ipad|ipod/gi.test(c),b.supportsTransition=B(),b.probablyMobile=b.isAndroid||b.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),d=a(document),b.popupsCache={}},open:function(c){var e;if(c.isObj===!1){b.items=c.items.toArray(),b.index=0;var g,h=c.items;for(e=0;e<h.length;e++)if(g=h[e],g.parsed&&(g=g.el[0]),g===c.el[0]){b.index=e;break}}else b.items=a.isArray(c.items)?c.items:[c.items],b.index=c.index||0;if(b.isOpen)return void b.updateItemHTML();b.types=[],f="",b.ev=c.mainEl&&c.mainEl.length?c.mainEl.eq(0):d,c.key?(b.popupsCache[c.key]||(b.popupsCache[c.key]={}),b.currTemplate=b.popupsCache[c.key]):b.currTemplate={},b.st=a.extend(!0,{},a.magnificPopup.defaults,c),b.fixedContentPos="auto"===b.st.fixedContentPos?!b.probablyMobile:b.st.fixedContentPos,b.st.modal&&(b.st.closeOnContentClick=!1,b.st.closeOnBgClick=!1,b.st.showCloseBtn=!1,b.st.enableEscapeKey=!1),b.bgOverlay||(b.bgOverlay=x("bg").on("click"+p,function(){b.close()}),b.wrap=x("wrap").attr("tabindex",-1).on("click"+p,function(a){b._checkIfClose(a.target)&&b.close()}),b.container=x("container",b.wrap)),b.contentContainer=x("content"),b.st.preloader&&(b.preloader=x("preloader",b.container,b.st.tLoading));var i=a.magnificPopup.modules;for(e=0;e<i.length;e++){var j=i[e];j=j.charAt(0).toUpperCase()+j.slice(1),b["init"+j].call(b)}y("BeforeOpen"),b.st.showCloseBtn&&(b.st.closeBtnInside?(w(l,function(a,b,c,d){c.close_replaceWith=z(d.type)}),f+=" mfp-close-btn-in"):b.wrap.append(z())),b.st.alignTop&&(f+=" mfp-align-top"),b.wrap.css(b.fixedContentPos?{overflow:b.st.overflowY,overflowX:"hidden",overflowY:b.st.overflowY}:{top:v.scrollTop(),position:"absolute"}),(b.st.fixedBgPos===!1||"auto"===b.st.fixedBgPos&&!b.fixedContentPos)&&b.bgOverlay.css({height:d.height(),position:"absolute"}),b.st.enableEscapeKey&&d.on("keyup"+p,function(a){27===a.keyCode&&b.close()}),v.on("resize"+p,function(){b.updateSize()}),b.st.closeOnContentClick||(f+=" mfp-auto-cursor"),f&&b.wrap.addClass(f);var k=b.wH=v.height(),n={};if(b.fixedContentPos&&b._hasScrollBar(k)){var o=b._getScrollbarSize();o&&(n.marginRight=o)}b.fixedContentPos&&(b.isIE7?a("body, html").css("overflow","hidden"):n.overflow="hidden");var r=b.st.mainClass;return b.isIE7&&(r+=" mfp-ie7"),r&&b._addClassToMFP(r),b.updateItemHTML(),y("BuildControls"),a("html").css(n),b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo||a(document.body)),b._lastFocusedEl=document.activeElement,setTimeout(function(){b.content?(b._addClassToMFP(q),b._setFocus()):b.bgOverlay.addClass(q),d.on("focusin"+p,b._onFocusIn)},16),b.isOpen=!0,b.updateSize(k),y(m),c},close:function(){b.isOpen&&(y(i),b.isOpen=!1,b.st.removalDelay&&!b.isLowIE&&b.supportsTransition?(b._addClassToMFP(r),setTimeout(function(){b._close()},b.st.removalDelay)):b._close())},_close:function(){y(h);var c=r+" "+q+" ";if(b.bgOverlay.detach(),b.wrap.detach(),b.container.empty(),b.st.mainClass&&(c+=b.st.mainClass+" "),b._removeClassFromMFP(c),b.fixedContentPos){var e={marginRight:""};b.isIE7?a("body, html").css("overflow",""):e.overflow="",a("html").css(e)}d.off("keyup"+p+" focusin"+p),b.ev.off(p),b.wrap.attr("class","mfp-wrap").removeAttr("style"),b.bgOverlay.attr("class","mfp-bg"),b.container.attr("class","mfp-container"),!b.st.showCloseBtn||b.st.closeBtnInside&&b.currTemplate[b.currItem.type]!==!0||b.currTemplate.closeBtn&&b.currTemplate.closeBtn.detach(),b._lastFocusedEl&&a(b._lastFocusedEl).focus(),b.currItem=null,b.content=null,b.currTemplate=null,b.prevHeight=0,y(j)},updateSize:function(a){if(b.isIOS){var c=document.documentElement.clientWidth/window.innerWidth,d=window.innerHeight*c;b.wrap.css("height",d),b.wH=d}else b.wH=a||v.height();b.fixedContentPos||b.wrap.css("height",b.wH),y("Resize")},updateItemHTML:function(){var c=b.items[b.index];b.contentContainer.detach(),b.content&&b.content.detach(),c.parsed||(c=b.parseEl(b.index));var d=c.type;if(y("BeforeChange",[b.currItem?b.currItem.type:"",d]),b.currItem=c,!b.currTemplate[d]){var f=b.st[d]?b.st[d].markup:!1;y("FirstMarkupParse",f),b.currTemplate[d]=f?a(f):!0}e&&e!==c.type&&b.container.removeClass("mfp-"+e+"-holder");var g=b["get"+d.charAt(0).toUpperCase()+d.slice(1)](c,b.currTemplate[d]);b.appendContent(g,d),c.preloaded=!0,y(n,c),e=c.type,b.container.prepend(b.contentContainer),y("AfterChange")},appendContent:function(a,c){b.content=a,a?b.st.showCloseBtn&&b.st.closeBtnInside&&b.currTemplate[c]===!0?b.content.find(".mfp-close").length||b.content.append(z()):b.content=a:b.content="",y(k),b.container.addClass("mfp-"+c+"-holder"),b.contentContainer.append(b.content)},parseEl:function(c){var d,e=b.items[c];if(e.tagName?e={el:a(e)}:(d=e.type,e={data:e,src:e.src}),e.el){for(var f=b.types,g=0;g<f.length;g++)if(e.el.hasClass("mfp-"+f[g])){d=f[g];break}e.src=e.el.attr("data-mfp-src"),e.src||(e.src=e.el.attr("href"))}return e.type=d||b.st.type||"inline",e.index=c,e.parsed=!0,b.items[c]=e,y("ElementParse",e),b.items[c]},addGroup:function(a,c){var d=function(d){d.mfpEl=this,b._openClick(d,a,c)};c||(c={});var e="click.magnificPopup";c.mainEl=a,c.items?(c.isObj=!0,a.off(e).on(e,d)):(c.isObj=!1,c.delegate?a.off(e).on(e,c.delegate,d):(c.items=a,a.off(e).on(e,d)))},_openClick:function(c,d,e){var f=void 0!==e.midClick?e.midClick:a.magnificPopup.defaults.midClick;if(f||2!==c.which&&!c.ctrlKey&&!c.metaKey){var g=void 0!==e.disableOn?e.disableOn:a.magnificPopup.defaults.disableOn;if(g)if(a.isFunction(g)){if(!g.call(b))return!0}else if(v.width()<g)return!0;c.type&&(c.preventDefault(),b.isOpen&&c.stopPropagation()),e.el=a(c.mfpEl),e.delegate&&(e.items=d.find(e.delegate)),b.open(e)}},updateStatus:function(a,d){if(b.preloader){c!==a&&b.container.removeClass("mfp-s-"+c),d||"loading"!==a||(d=b.st.tLoading);var e={status:a,text:d};y("UpdateStatus",e),a=e.status,d=e.text,b.preloader.html(d),b.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),b.container.addClass("mfp-s-"+a),c=a}},_checkIfClose:function(c){if(!a(c).hasClass(s)){var d=b.st.closeOnContentClick,e=b.st.closeOnBgClick;if(d&&e)return!0;if(!b.content||a(c).hasClass("mfp-close")||b.preloader&&c===b.preloader[0])return!0;if(c===b.content[0]||a.contains(b.content[0],c)){if(d)return!0}else if(e&&a.contains(document,c))return!0;return!1}},_addClassToMFP:function(a){b.bgOverlay.addClass(a),b.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),b.wrap.removeClass(a)},_hasScrollBar:function(a){return(b.isIE7?d.height():document.body.scrollHeight)>(a||v.height())},_setFocus:function(){(b.st.focus?b.content.find(b.st.focus).eq(0):b.wrap).focus()},_onFocusIn:function(c){return c.target===b.wrap[0]||a.contains(b.wrap[0],c.target)?void 0:(b._setFocus(),!1)},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),y(l,[b,c,d]),a.each(c,function(a,c){if(void 0===c||c===!1)return!0;if(e=a.split("_"),e.length>1){var d=b.find(p+"-"+e[0]);if(d.length>0){var f=e[1];"replaceWith"===f?d[0]!==c[0]&&d.replaceWith(c):"img"===f?d.is("img")?d.attr("src",c):d.replaceWith('<img src="'+c+'" class="'+d.attr("class")+'" />'):d.attr(e[1],c)}}else b.find(p+"-"+a).html(c)})},_getScrollbarSize:function(){if(void 0===b.scrollbarSize){var a=document.createElement("div");a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),b.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return b.scrollbarSize}},a.magnificPopup={instance:null,proto:t.prototype,modules:[],open:function(b,c){return A(),b=b?a.extend(!0,{},b):{},b.isObj=!0,b.index=c||0,this.instance.open(b)},close:function(){return a.magnificPopup.instance&&a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&times;</button>',tClose:"Close (Esc)",tLoading:"Loading..."}},a.fn.magnificPopup=function(c){A();var d=a(this);if("string"==typeof c)if("open"===c){var e,f=u?d.data("magnificPopup"):d[0].magnificPopup,g=parseInt(arguments[1],10)||0;f.items?e=f.items[g]:(e=d,f.delegate&&(e=e.find(f.delegate)),e=e.eq(g)),b._openClick({mfpEl:e},d,f)}else b.isOpen&&b[c].apply(b,Array.prototype.slice.call(arguments,1));else c=a.extend(!0,{},c),u?d.data("magnificPopup",c):d[0].magnificPopup=c,b.addGroup(d,c);return d};var C,D,E,F="inline",G=function(){E&&(D.after(E.addClass(C)).detach(),E=null)};a.magnificPopup.registerModule(F,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){b.types.push(F),w(h+"."+F,function(){G()})},getInline:function(c,d){if(G(),c.src){var e=b.st.inline,f=a(c.src);if(f.length){var g=f[0].parentNode;g&&g.tagName&&(D||(C=e.hiddenClass,D=x(C),C="mfp-"+C),E=f.after(D).detach().removeClass(C)),b.updateStatus("ready")}else b.updateStatus("error",e.tNotFound),f=a("<div>");return c.inlineElement=f,f}return b.updateStatus("ready"),b._parseMarkup(d,{},c),d}}});var H,I="ajax",J=function(){H&&a(document.body).removeClass(H)},K=function(){J(),b.req&&b.req.abort()};a.magnificPopup.registerModule(I,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){b.types.push(I),H=b.st.ajax.cursor,w(h+"."+I,K),w("BeforeChange."+I,K)},getAjax:function(c){H&&a(document.body).addClass(H),b.updateStatus("loading");var d=a.extend({url:c.src,success:function(d,e,f){var g={data:d,xhr:f};y("ParseAjax",g),b.appendContent(a(g.data),I),c.finished=!0,J(),b._setFocus(),setTimeout(function(){b.wrap.addClass(q)},16),b.updateStatus("ready"),y("AjaxContentAdded")},error:function(){J(),c.finished=c.loadError=!0,b.updateStatus("error",b.st.ajax.tError.replace("%url%",c.src))}},b.st.ajax.settings);return b.req=a.ajax(d),""}}});var L,M=function(c){if(c.data&&void 0!==c.data.title)return c.data.title;var d=b.st.image.titleSrc;if(d){if(a.isFunction(d))return d.call(b,c);if(c.el)return c.el.attr(d)||""}return""};a.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var c=b.st.image,d=".image";b.types.push("image"),w(m+d,function(){"image"===b.currItem.type&&c.cursor&&a(document.body).addClass(c.cursor)}),w(h+d,function(){c.cursor&&a(document.body).removeClass(c.cursor),v.off("resize"+p)}),w("Resize"+d,b.resizeImage),b.isLowIE&&w("AfterChange",b.resizeImage)},resizeImage:function(){var a=b.currItem;if(a&&a.img&&b.st.image.verticalFit){var c=0;b.isLowIE&&(c=parseInt(a.img.css("padding-top"),10)+parseInt(a.img.css("padding-bottom"),10)),a.img.css("max-height",b.wH-c)}},_onImageHasSize:function(a){a.img&&(a.hasSize=!0,L&&clearInterval(L),a.isCheckingImgSize=!1,y("ImageHasSize",a),a.imgHidden&&(b.content&&b.content.removeClass("mfp-loading"),a.imgHidden=!1))},findImageSize:function(a){var c=0,d=a.img[0],e=function(f){L&&clearInterval(L),L=setInterval(function(){return d.naturalWidth>0?void b._onImageHasSize(a):(c>200&&clearInterval(L),c++,void(3===c?e(10):40===c?e(50):100===c&&e(500)))},f)};e(1)},getImage:function(c,d){var e=0,f=function(){c&&(c.img[0].complete?(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("ready")),c.hasSize=!0,c.loaded=!0,y("ImageLoadComplete")):(e++,200>e?setTimeout(f,100):g()))},g=function(){c&&(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("error",h.tError.replace("%url%",c.src))),c.hasSize=!0,c.loaded=!0,c.loadError=!0)},h=b.st.image,i=d.find(".mfp-img");if(i.length){var j=document.createElement("img");j.className="mfp-img",c.el&&c.el.find("img").length&&(j.alt=c.el.find("img").attr("alt")),c.img=a(j).on("load.mfploader",f).on("error.mfploader",g),j.src=c.src,i.is("img")&&(c.img=c.img.clone()),j=c.img[0],j.naturalWidth>0?c.hasSize=!0:j.width||(c.hasSize=!1)}return b._parseMarkup(d,{title:M(c),img_replaceWith:c.img},c),b.resizeImage(),c.hasSize?(L&&clearInterval(L),c.loadError?(d.addClass("mfp-loading"),b.updateStatus("error",h.tError.replace("%url%",c.src))):(d.removeClass("mfp-loading"),b.updateStatus("ready")),d):(b.updateStatus("loading"),c.loading=!0,c.hasSize||(c.imgHidden=!0,d.addClass("mfp-loading"),b.findImageSize(c)),d)}}});var N,O=function(){return void 0===N&&(N=void 0!==document.createElement("p").style.MozTransform),N};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a,c=b.st.zoom,d=".zoom";if(c.enabled&&b.supportsTransition){var e,f,g=c.duration,j=function(a){var b=a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+c.duration/1e3+"s "+c.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,b.css(e),b},k=function(){b.content.css("visibility","visible")};w("BuildControls"+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.content.css("visibility","hidden"),a=b._getItemToZoom(),!a)return void k();f=j(a),f.css(b._getOffset()),b.wrap.append(f),e=setTimeout(function(){f.css(b._getOffset(!0)),e=setTimeout(function(){k(),setTimeout(function(){f.remove(),a=f=null,y("ZoomAnimationEnded")},16)},g)},16)}}),w(i+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.st.removalDelay=g,!a){if(a=b._getItemToZoom(),!a)return;f=j(a)}f.css(b._getOffset(!0)),b.wrap.append(f),b.content.css("visibility","hidden"),setTimeout(function(){f.css(b._getOffset())},16)}}),w(h+d,function(){b._allowZoom()&&(k(),f&&f.remove(),a=null)})}},_allowZoom:function(){return"image"===b.currItem.type},_getItemToZoom:function(){return b.currItem.hasSize?b.currItem.img:!1},_getOffset:function(c){var d;d=c?b.currItem.img:b.st.zoom.opener(b.currItem.el||b.currItem);var e=d.offset(),f=parseInt(d.css("padding-top"),10),g=parseInt(d.css("padding-bottom"),10);e.top-=a(window).scrollTop()-f;var h={width:d.width(),height:(u?d.innerHeight():d[0].offsetHeight)-g-f};return O()?h["-moz-transform"]=h.transform="translate("+e.left+"px,"+e.top+"px)":(h.left=e.left,h.top=e.top),h}}});var P="iframe",Q="//about:blank",R=function(a){if(b.currTemplate[P]){var c=b.currTemplate[P].find("iframe");c.length&&(a||(c[0].src=Q),b.isIE8&&c.css("display",a?"block":"none"))}};a.magnificPopup.registerModule(P,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){b.types.push(P),w("BeforeChange",function(a,b,c){b!==c&&(b===P?R():c===P&&R(!0))}),w(h+"."+P,function(){R()})},getIframe:function(c,d){var e=c.src,f=b.st.iframe;a.each(f.patterns,function(){return e.indexOf(this.index)>-1?(this.id&&(e="string"==typeof this.id?e.substr(e.lastIndexOf(this.id)+this.id.length,e.length):this.id.call(this,e)),e=this.src.replace("%id%",e),!1):void 0});var g={};return f.srcAction&&(g[f.srcAction]=e),b._parseMarkup(d,g,c),b.updateStatus("ready"),d}}});var S=function(a){var c=b.items.length;return a>c-1?a-c:0>a?c+a:a},T=function(a,b,c){return a.replace(/%curr%/gi,b+1).replace(/%total%/gi,c)};a.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var c=b.st.gallery,e=".mfp-gallery",g=Boolean(a.fn.mfpFastClick);return b.direction=!0,c&&c.enabled?(f+=" mfp-gallery",w(m+e,function(){c.navigateByImgClick&&b.wrap.on("click"+e,".mfp-img",function(){return b.items.length>1?(b.next(),!1):void 0}),d.on("keydown"+e,function(a){37===a.keyCode?b.prev():39===a.keyCode&&b.next()})}),w("UpdateStatus"+e,function(a,c){c.text&&(c.text=T(c.text,b.currItem.index,b.items.length))}),w(l+e,function(a,d,e,f){var g=b.items.length;e.counter=g>1?T(c.tCounter,f.index,g):""}),w("BuildControls"+e,function(){if(b.items.length>1&&c.arrows&&!b.arrowLeft){var d=c.arrowMarkup,e=b.arrowLeft=a(d.replace(/%title%/gi,c.tPrev).replace(/%dir%/gi,"left")).addClass(s),f=b.arrowRight=a(d.replace(/%title%/gi,c.tNext).replace(/%dir%/gi,"right")).addClass(s),h=g?"mfpFastClick":"click";e[h](function(){b.prev()}),f[h](function(){b.next()}),b.isIE7&&(x("b",e[0],!1,!0),x("a",e[0],!1,!0),x("b",f[0],!1,!0),x("a",f[0],!1,!0)),b.container.append(e.add(f))}}),w(n+e,function(){b._preloadTimeout&&clearTimeout(b._preloadTimeout),b._preloadTimeout=setTimeout(function(){b.preloadNearbyImages(),b._preloadTimeout=null},16)}),void w(h+e,function(){d.off(e),b.wrap.off("click"+e),b.arrowLeft&&g&&b.arrowLeft.add(b.arrowRight).destroyMfpFastClick(),b.arrowRight=b.arrowLeft=null})):!1},next:function(){b.direction=!0,b.index=S(b.index+1),b.updateItemHTML()},prev:function(){b.direction=!1,b.index=S(b.index-1),b.updateItemHTML()},goTo:function(a){b.direction=a>=b.index,b.index=a,b.updateItemHTML()},preloadNearbyImages:function(){var a,c=b.st.gallery.preload,d=Math.min(c[0],b.items.length),e=Math.min(c[1],b.items.length);for(a=1;a<=(b.direction?e:d);a++)b._preloadItem(b.index+a);for(a=1;a<=(b.direction?d:e);a++)b._preloadItem(b.index-a)},_preloadItem:function(c){if(c=S(c),!b.items[c].preloaded){var d=b.items[c];d.parsed||(d=b.parseEl(c)),y("LazyLoad",d),"image"===d.type&&(d.img=a('<img class="mfp-img" />').on("load.mfploader",function(){d.hasSize=!0}).on("error.mfploader",function(){d.hasSize=!0,d.loadError=!0,y("LazyLoadError",d)}).attr("src",d.src)),d.preloaded=!0}}}});var U="retina";a.magnificPopup.registerModule(U,{options:{replaceSrc:function(a){return a.src.replace(/\.\w+$/,function(a){return"@2x"+a})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var a=b.st.retina,c=a.ratio;c=isNaN(c)?c():c,c>1&&(w("ImageHasSize."+U,function(a,b){b.img.css({"max-width":b.img[0].naturalWidth/c,width:"100%"})}),w("ElementParse."+U,function(b,d){d.src=a.replaceSrc(d,c)}))}}}}),function(){var b=1e3,c="ontouchstart"in window,d=function(){v.off("touchmove"+f+" touchend"+f)},e="mfpFastClick",f="."+e;a.fn.mfpFastClick=function(e){return a(this).each(function(){var g,h=a(this);if(c){var i,j,k,l,m,n;h.on("touchstart"+f,function(a){l=!1,n=1,m=a.originalEvent?a.originalEvent.touches[0]:a.touches[0],j=m.clientX,k=m.clientY,v.on("touchmove"+f,function(a){m=a.originalEvent?a.originalEvent.touches:a.touches,n=m.length,m=m[0],(Math.abs(m.clientX-j)>10||Math.abs(m.clientY-k)>10)&&(l=!0,d())}).on("touchend"+f,function(a){d(),l||n>1||(g=!0,a.preventDefault(),clearTimeout(i),i=setTimeout(function(){g=!1},b),e())})})}h.on("click"+f,function(){g||e()})})},a.fn.destroyMfpFastClick=function(){a(this).off("touchstart"+f+" click"+f),c&&v.off("touchmove"+f+" touchend"+f)}}(),A()});

/*!
    Zoom 1.7.21
    license: MIT
    http://www.jacklmoore.com/zoom
*/
(function(o){var t={url:!1,callback:!1,target:!1,duration:120,on:"mouseover",touch:!0,onZoomIn:!1,onZoomOut:!1,magnify:1};o.zoom=function(t,n,e,i){var u,c,a,r,m,l,s,f=o(t),h=f.css("position"),d=o(n);return t.style.position=/(absolute|fixed)/.test(h)?h:"relative",t.style.overflow="hidden",e.style.width=e.style.height="",o(e).addClass("zoomImg").css({position:"absolute",top:0,left:0,opacity:0,width:e.width*i,height:e.height*i,border:"none",maxWidth:"none",maxHeight:"none"}).appendTo(t),{init:function(){c=f.outerWidth(),u=f.outerHeight(),n===t?(r=c,a=u):(r=d.outerWidth(),a=d.outerHeight()),m=(e.width-c)/r,l=(e.height-u)/a,s=d.offset()},move:function(o){var t=o.pageX-s.left,n=o.pageY-s.top;n=Math.max(Math.min(n,a),0),t=Math.max(Math.min(t,r),0),e.style.left=t*-m+"px",e.style.top=n*-l+"px"}}},o.fn.zoom=function(n){return this.each(function(){var e=o.extend({},t,n||{}),i=e.target&&o(e.target)[0]||this,u=this,c=o(u),a=document.createElement("img"),r=o(a),m="mousemove.zoom",l=!1,s=!1;if(!e.url){var f=u.querySelector("img");if(f&&(e.url=f.getAttribute("data-src")||f.currentSrc||f.src),!e.url)return}c.one("zoom.destroy",function(o,t){c.off(".zoom"),i.style.position=o,i.style.overflow=t,a.onload=null,r.remove()}.bind(this,i.style.position,i.style.overflow)),a.onload=function(){function t(t){f.init(),f.move(t),r.stop().fadeTo(o.support.opacity?e.duration:0,1,o.isFunction(e.onZoomIn)?e.onZoomIn.call(a):!1)}function n(){r.stop().fadeTo(e.duration,0,o.isFunction(e.onZoomOut)?e.onZoomOut.call(a):!1)}var f=o.zoom(i,u,a,e.magnify);"grab"===e.on?c.on("mousedown.zoom",function(e){1===e.which&&(o(document).one("mouseup.zoom",function(){n(),o(document).off(m,f.move)}),t(e),o(document).on(m,f.move),e.preventDefault())}):"click"===e.on?c.on("click.zoom",function(e){return l?void 0:(l=!0,t(e),o(document).on(m,f.move),o(document).one("click.zoom",function(){n(),l=!1,o(document).off(m,f.move)}),!1)}):"toggle"===e.on?c.on("click.zoom",function(o){l?n():t(o),l=!l}):"mouseover"===e.on&&(f.init(),c.on("mouseenter.zoom",t).on("mouseleave.zoom",n).on(m,f.move)),e.touch&&c.on("touchstart.zoom",function(o){o.preventDefault(),s?(s=!1,n()):(s=!0,t(o.originalEvent.touches[0]||o.originalEvent.changedTouches[0]))}).on("touchmove.zoom",function(o){o.preventDefault(),f.move(o.originalEvent.touches[0]||o.originalEvent.changedTouches[0])}).on("touchend.zoom",function(o){o.preventDefault(),s&&(s=!1,n())}),o.isFunction(e.callback)&&e.callback.call(a)},a.setAttribute("role","presentation"),a.alt="",a.src=e.url})},o.fn.zoom.defaults=t})(window.jQuery);

/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.3.15
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */

!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,g,e=this;if(e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(a,b){return'<button type="button" data-role="none">'+(b+1)+"</button>"},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",onBeforeChange:null,onAfterChange:null,onInit:null,onReInit:null,onSetPosition:null,pauseOnHover:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rtl:!1,slide:"div",slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,variableWidth:!1,vertical:!1,waitForAnimate:!0},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.paused=!1,e.positionProp=null,e.respondTo=null,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.windowWidth=0,e.windowTimer=null,e.options=a.extend({},e.defaults,d),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,f=e.options.responsive||null,f&&f.length>-1){e.respondTo=e.options.respondTo||"window";for(g in f)f.hasOwnProperty(g)&&(e.breakpoints.push(f[g].breakpoint),e.breakpointSettings[f[g].breakpoint]=f[g].settings);e.breakpoints.sort(function(a,b){return b-a})}e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.init(),e.checkResponsive()}var b=0;return c}(),b.prototype.addSlide=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateSlide=function(b,c){var d={},e=this;if(1===e.options.slidesToShow&&e.options.adaptiveHeight===!0&&e.options.vertical===!1){var f=e.$slides.eq(e.currentSlide).outerHeight(!0);e.$list.animate({height:f},e.options.speed)}e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}}):(e.applyTransition(),d[e.animType]=e.options.vertical===!1?"translate3d("+b+"px, 0px, 0px)":"translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.asNavFor=function(b){var c=this,d=null!=c.options.asNavFor?a(c.options.asNavFor).getSlick():null;null!=d&&d.slideHandler(b,!0)},b.prototype.applyTransition=function(a){var b=this,c={};c[b.transitionType]=b.options.fade===!1?b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:"opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer),a.slideCount>a.options.slidesToShow&&a.paused!==!0&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this;a.options.infinite===!1?1===a.direction?(a.currentSlide+1===a.slideCount-1&&(a.direction=0),a.slideHandler(a.currentSlide+a.options.slidesToScroll)):(0===a.currentSlide-1&&(a.direction=1),a.slideHandler(a.currentSlide-a.options.slidesToScroll)):a.slideHandler(a.currentSlide+a.options.slidesToScroll)},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow=a(b.options.prevArrow),b.$nextArrow=a(b.options.nextArrow),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.appendTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled"))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(d='<ul class="'+b.options.dotsClass+'">',c=0;c<=b.getDotCount();c+=1)d+="<li>"+b.options.customPaging.call(this,b,c)+"</li>";d+="</ul>",b.$dots=a(d).appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active")}},b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("index",b)}),b.$slidesCache=b.$slides,b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),b.options.centerMode===!0&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.options.accessibility===!0&&b.$list.prop("tabIndex",0),b.setSlideClasses("number"==typeof this.currentSlide?this.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.checkResponsive=function(){var c,d,e,b=this,f=b.$slider.width(),g=window.innerWidth||a(window).width();if("window"===b.respondTo?e=g:"slider"===b.respondTo?e=f:"min"===b.respondTo&&(e=Math.min(g,f)),b.originalSettings.responsive&&b.originalSettings.responsive.length>-1&&null!==b.originalSettings.responsive){d=null;for(c in b.breakpoints)b.breakpoints.hasOwnProperty(c)&&e<b.breakpoints[c]&&(d=b.breakpoints[c]);null!==d?null!==b.activeBreakpoint?d!==b.activeBreakpoint&&(b.activeBreakpoint=d,b.options=a.extend({},b.originalSettings,b.breakpointSettings[d]),b.refresh()):(b.activeBreakpoint=d,b.options=a.extend({},b.originalSettings,b.breakpointSettings[d]),b.refresh()):null!==b.activeBreakpoint&&(b.activeBreakpoint=null,b.options=b.originalSettings,b.refresh())}},b.prototype.changeSlide=function(b,c){var f,g,h,i,j,d=this,e=a(b.target);switch(e.is("a")&&b.preventDefault(),h=0!==d.slideCount%d.options.slidesToScroll,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var k=0===b.data.index?0:b.data.index||a(b.target).parent().index()*d.options.slidesToScroll;if(i=d.getNavigableIndexes(),j=0,i[k]&&i[k]===k)if(k>i[i.length-1])k=i[i.length-1];else for(var l in i){if(k<i[l]){k=j;break}j=i[l]}d.slideHandler(k,!1,c);default:return}},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(){var b=this;b.autoPlayClear(),b.touchObject={},a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&"object"!=typeof b.options.prevArrow&&b.$prevArrow.remove(),b.$nextArrow&&"object"!=typeof b.options.nextArrow&&b.$nextArrow.remove(),b.$slides.parent().hasClass("slick-track")&&b.$slides.unwrap().unwrap(),b.$slides.removeClass("slick-slide slick-active slick-center slick-visible").removeAttr("index").css({position:"",left:"",top:"",zIndex:"",opacity:"",width:""}),b.$slider.removeClass("slick-slider"),b.$slider.removeClass("slick-initialized"),b.$list.off(".slick"),a(window).off(".slick-"+b.instanceUid),a(document).off(".slick-"+b.instanceUid)},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b,c){var d=this;d.cssTransitions===!1?(d.$slides.eq(b).css({zIndex:1e3}),d.$slides.eq(b).animate({opacity:1},d.options.speed,d.options.easing,c),d.$slides.eq(a).animate({opacity:0},d.options.speed,d.options.easing)):(d.applyTransition(b),d.applyTransition(a),d.$slides.eq(b).css({opacity:1,zIndex:1e3}),d.$slides.eq(a).css({opacity:0}),c&&setTimeout(function(){d.disableTransition(b),d.disableTransition(a),c.call()},d.options.speed))},b.prototype.filterSlides=function(a){var b=this;null!==a&&(b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.getCurrent=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)d=Math.ceil(a.slideCount/a.options.slidesToScroll);else for(;b<a.slideCount;)++d,b=c+a.options.slidesToShow,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d-1},b.prototype.getLeft=function(a){var c,d,g,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=-1*b.slideWidth*b.options.slidesToShow,e=-1*d*b.options.slidesToShow),0!==b.slideCount%b.options.slidesToScroll&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=-1*(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth,e=-1*(b.options.slidesToShow-(a-b.slideCount))*d):(b.slideOffset=-1*b.slideCount%b.options.slidesToScroll*b.slideWidth,e=-1*b.slideCount%b.options.slidesToScroll*d))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?-1*a*b.slideWidth+b.slideOffset:-1*a*d+e,b.options.variableWidth===!0&&(g=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=g[0]?-1*g[0].offsetLeft:0,b.options.centerMode===!0&&(g=b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=g[0]?-1*g[0].offsetLeft:0,c+=(b.$list.width()-g.outerWidth())/2)),c},b.prototype.getNavigableIndexes=function(){for(var a=this,b=0,c=0,d=[];b<a.slideCount;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d},b.prototype.getSlideCount=function(){var c,b=this;if(b.options.swipeToSlide===!0){var d=null;return b.$slideTrack.find(".slick-slide").each(function(c,e){return e.offsetLeft+a(e).outerWidth()/2>-1*b.swipeLeft?(d=e,!1):void 0}),c=Math.abs(a(d).attr("index")-b.currentSlide)}return b.options.slidesToScroll},b.prototype.init=function(){var b=this;a(b.$slider).hasClass("slick-initialized")||(a(b.$slider).addClass("slick-initialized"),b.buildOut(),b.setProps(),b.startLoad(),b.loadSlider(),b.initializeEvents(),b.updateArrows(),b.updateDots()),null!==b.options.onInit&&b.options.onInit.call(this,b)},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&b.options.autoplay===!0&&a("li",b.$dots).on("mouseenter.slick",function(){b.paused=!0,b.autoPlayClear()}).on("mouseleave.slick",function(){b.paused=!1,b.autoPlay()})},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler),b.options.pauseOnHover===!0&&b.options.autoplay===!0&&(b.$list.on("mouseenter.slick",function(){b.paused=!0,b.autoPlayClear()}),b.$list.on("mouseleave.slick",function(){b.paused=!1,b.autoPlay()})),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.options.slide,b.$slideTrack).on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,function(){b.checkResponsive(),b.setPosition()}),a(window).on("resize.slick.slick-"+b.instanceUid,function(){a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.setPosition()},50))}),a("*[draggable!=true]",b.$slideTrack).on("dragstart",function(a){a.preventDefault()}),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show(),a.options.autoplay===!0&&a.autoPlay()},b.prototype.keyHandler=function(a){var b=this;37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:"previous"}}):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:"next"}})},b.prototype.lazyLoad=function(){function g(b){a("img[data-lazy]",b).each(function(){var b=a(this),c=a(this).attr("data-lazy");b.load(function(){b.animate({opacity:1},200)}).css({opacity:0}).attr("src",c).removeAttr("data-lazy").removeClass("slick-loading")})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=e+b.options.slidesToShow,b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.postSlide=function(a){var b=this;null!==b.options.onAfterChange&&b.options.onAfterChange.call(this,b,a),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay===!0&&b.paused===!1&&b.autoPlay()},b.prototype.progressiveLazyLoad=function(){var c,d,b=this;c=a("img[data-lazy]",b.$slider).length,c>0&&(d=a("img[data-lazy]",b.$slider).first(),d.attr("src",d.attr("data-lazy")).removeClass("slick-loading").load(function(){d.removeAttr("data-lazy"),b.progressiveLazyLoad()}).error(function(){d.removeAttr("data-lazy"),b.progressiveLazyLoad()}))},b.prototype.refresh=function(){var b=this,c=b.currentSlide;b.destroy(),a.extend(b,b.initials),b.init(),b.changeSlide({data:{message:"index",index:c}},!0)},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.options.focusOnSelect===!0&&a(b.options.slide,b.$slideTrack).on("click.slick",b.selectHandler),b.setSlideClasses(0),b.setPosition(),null!==b.options.onReInit&&b.options.onReInit.call(this,b)},b.prototype.removeSlide=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,d.reinit(),void 0)},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?a+"px":"0px",e="top"==b.positionProp?a+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var b=this;if(b.options.vertical===!1?b.options.centerMode===!0&&b.$list.css({padding:"0px "+b.options.centerPadding}):(b.$list.height(b.$slides.first().outerHeight(!0)*b.options.slidesToShow),b.options.centerMode===!0&&b.$list.css({padding:b.options.centerPadding+" 0px"})),b.listWidth=b.$list.width(),b.listHeight=b.$list.height(),b.options.vertical===!1&&b.options.variableWidth===!1)b.slideWidth=Math.ceil(b.listWidth/b.options.slidesToShow),b.$slideTrack.width(Math.ceil(b.slideWidth*b.$slideTrack.children(".slick-slide").length));else if(b.options.variableWidth===!0){var c=0;b.slideWidth=Math.ceil(b.listWidth/b.options.slidesToShow),b.$slideTrack.children(".slick-slide").each(function(){c+=Math.ceil(a(this).outerWidth(!0))}),b.$slideTrack.width(Math.ceil(c)+1)}else b.slideWidth=Math.ceil(b.listWidth),b.$slideTrack.height(Math.ceil(b.$slides.first().outerHeight(!0)*b.$slideTrack.children(".slick-slide").length));var d=b.$slides.first().outerWidth(!0)-b.$slides.first().width();b.options.variableWidth===!1&&b.$slideTrack.children(".slick-slide").width(b.slideWidth-d)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=-1*b.slideWidth*d,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:800,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:800,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:900,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),null!==a.options.onSetPosition&&a.options.onSetPosition.call(this,a)},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;b.$slider.find(".slick-slide").removeClass("slick-active").removeClass("slick-center"),d=b.$slider.find(".slick-slide"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active"):(e=b.options.slidesToShow+a,d.slice(e-c+1,e+c+2).addClass("slick-active")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active"):d.length<=b.options.slidesToShow?d.addClass("slick-active"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.selectHandler=function(b){var c=this,d=parseInt(a(b.target).parents(".slick-slide").attr("index"));return d||(d=0),c.slideCount<=c.options.slidesToShow?(c.$slider.find(".slick-slide").removeClass("slick-active"),c.$slides.eq(d).addClass("slick-active"),c.options.centerMode===!0&&(c.$slider.find(".slick-slide").removeClass("slick-center"),c.$slides.eq(d).addClass("slick-center")),c.asNavFor(d),void 0):(c.slideHandler(d),void 0)},b.prototype.slideHandler=function(a,b,c){var d,e,f,g,i=null,j=this;return b=b||!1,j.animating===!0&&j.options.waitForAnimate===!0||j.options.fade===!0&&j.currentSlide===a||j.slideCount<=j.options.slidesToShow?void 0:(b===!1&&j.asNavFor(a),d=a,i=j.getLeft(d),g=j.getLeft(j.currentSlide),j.currentLeft=null===j.swipeLeft?g:j.swipeLeft,j.options.infinite===!1&&j.options.centerMode===!1&&(0>a||a>j.getDotCount()*j.options.slidesToScroll)?(j.options.fade===!1&&(d=j.currentSlide,c!==!0?j.animateSlide(g,function(){j.postSlide(d)}):j.postSlide(d)),void 0):j.options.infinite===!1&&j.options.centerMode===!0&&(0>a||a>j.slideCount-j.options.slidesToScroll)?(j.options.fade===!1&&(d=j.currentSlide,c!==!0?j.animateSlide(g,function(){j.postSlide(d)}):j.postSlide(d)),void 0):(j.options.autoplay===!0&&clearInterval(j.autoPlayTimer),e=0>d?0!==j.slideCount%j.options.slidesToScroll?j.slideCount-j.slideCount%j.options.slidesToScroll:j.slideCount+d:d>=j.slideCount?0!==j.slideCount%j.options.slidesToScroll?0:d-j.slideCount:d,j.animating=!0,null!==j.options.onBeforeChange&&a!==j.currentSlide&&j.options.onBeforeChange.call(this,j,j.currentSlide,e),f=j.currentSlide,j.currentSlide=e,j.setSlideClasses(j.currentSlide),j.updateDots(),j.updateArrows(),j.options.fade===!0?(c!==!0?j.fadeSlide(f,e,function(){j.postSlide(e)}):j.postSlide(e),void 0):(c!==!0?j.animateSlide(i,function(){j.postSlide(e)}):j.postSlide(e),void 0)))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":"vertical"},b.prototype.swipeEnd=function(){var b=this;if(b.dragging=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.swipeLength>=b.touchObject.minSwipe)switch(b.swipeDirection()){case"left":b.slideHandler(b.currentSlide+b.getSlideCount()),b.currentDirection=0,b.touchObject={};break;case"right":b.slideHandler(b.currentSlide-b.getSlideCount()),b.currentDirection=1,b.touchObject={}}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var c,d,e,f,b=this;return f=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||f&&1!==f.length?!1:(c=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==f?f[0].pageX:a.clientX,b.touchObject.curY=void 0!==f?f[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),d=b.swipeDirection(),"vertical"!==d?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),e=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),b.swipeLeft=b.options.vertical===!1?c+b.touchObject.swipeLength*e:c+b.touchObject.swipeLength*(b.$list.height()/b.listWidth)*e,b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):(b.setCSS(b.swipeLeft),void 0)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return 1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,b.dragging=!0,void 0)},b.prototype.unfilterSlides=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&"object"!=typeof b.options.prevArrow&&b.$prevArrow.remove(),b.$nextArrow&&"object"!=typeof b.options.nextArrow&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible").css("width","")},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.options.infinite!==!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.removeClass("slick-disabled"),a.$nextArrow.removeClass("slick-disabled"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled"),a.$nextArrow.removeClass("slick-disabled")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled"),a.$prevArrow.removeClass("slick-disabled")):a.currentSlide>a.slideCount-a.options.slidesToShow+b&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled"),a.$prevArrow.removeClass("slick-disabled")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active"))},a.fn.slick=function(a){var c=this;return c.each(function(c,d){d.slick=new b(d,a)})},a.fn.slickAdd=function(a,b,c){var d=this;return d.each(function(d,e){e.slick.addSlide(a,b,c)})},a.fn.slickCurrentSlide=function(){var a=this;return a.get(0).slick.getCurrent()},a.fn.slickFilter=function(a){var b=this;return b.each(function(b,c){c.slick.filterSlides(a)})},a.fn.slickGoTo=function(a,b){var c=this;return c.each(function(c,d){d.slick.changeSlide({data:{message:"index",index:parseInt(a)}},b)})},a.fn.slickNext=function(){var a=this;return a.each(function(a,b){b.slick.changeSlide({data:{message:"next"}})})},a.fn.slickPause=function(){var a=this;return a.each(function(a,b){b.slick.autoPlayClear(),b.slick.paused=!0})},a.fn.slickPlay=function(){var a=this;return a.each(function(a,b){b.slick.paused=!1,b.slick.autoPlay()})},a.fn.slickPrev=function(){var a=this;return a.each(function(a,b){b.slick.changeSlide({data:{message:"previous"}})})},a.fn.slickRemove=function(a,b){var c=this;return c.each(function(c,d){d.slick.removeSlide(a,b)})},a.fn.slickRemoveAll=function(){var a=this;return a.each(function(a,b){b.slick.removeSlide(null,null,!0)})},a.fn.slickGetOption=function(a){var b=this;return b.get(0).slick.options[a]},a.fn.slickSetOption=function(a,b,c){var d=this;return d.each(function(d,e){e.slick.options[a]=b,c===!0&&(e.slick.unload(),e.slick.reinit())})},a.fn.slickUnfilter=function(){var a=this;return a.each(function(a,b){b.slick.unfilterSlides()})},a.fn.unslick=function(){var a=this;return a.each(function(a,b){b.slick&&b.slick.destroy()})},a.fn.getSlick=function(){var a=null,b=this;return b.each(function(b,c){a=c.slick}),a}});
/* Jonathan Snook - MIT License - https://github.com/snookca/prepareTransition */
!(function(a){a.fn.prepareTransition=function(){return this.each(function(){var b=a(this);b.one("TransitionEnd webkitTransitionEnd transitionend oTransitionEnd",function(){b.removeClass("is-transitioning")});var c=["transition-duration","-moz-transition-duration","-webkit-transition-duration","-o-transition-duration"];var d=0;a.each(c,function(a,c){d=parseFloat(b.css(c))||d});if(d!=0){b.addClass("is-transitioning");b[0].offsetWidth}})}})(jQuery);

/* replaceUrlParam - http://stackoverflow.com/questions/7171099/how-to-replace-url-parameter-with-javascript-jquery */
function replaceUrlParam(e,r,a){var n=new RegExp("("+r+"=).*?(&|$)"),c=e;return c=e.search(n)>=0?e.replace(n,"$1"+a+"$2"):c+(c.indexOf("?")>0?"&":"?")+r+"="+a};

/**
 * @license
 * lodash 4.5.1 (Custom Build) lodash.com/license | Underscore.js 1.8.3 underscorejs.org/LICENSE
 * Build: `lodash core -o ./dist/lodash.core.js`
 */
;(function(){function n(n,t){for(var r=-1,e=t.length,u=n.length;++r<e;)n[u+r]=t[r];return n}function t(n,t,r){for(var e=-1,u=n.length;++e<u;){var o=n[e],i=t(o);if(null!=i&&(c===an?i===i:r(i,c)))var c=i,f=o}return f}function r(n,t,r){var e;return r(n,function(n,r,u){return t(n,r,u)?(e=n,false):void 0}),e}function e(n,t,r,e,u){return u(n,function(n,u,o){r=e?(e=false,n):t(r,n,u,o)}),r}function u(n,t){return O(t,function(t){return n[t]})}function o(n){return n&&n.Object===Object?n:null}function i(n){return vn[n];
}function c(n){var t=false;if(null!=n&&typeof n.toString!="function")try{t=!!(n+"")}catch(r){}return t}function f(n,t){return n=typeof n=="number"||hn.test(n)?+n:-1,n>-1&&0==n%1&&(null==t?9007199254740991:t)>n}function a(n){if(Y(n)&&!Pn(n)){if(n instanceof l)return n;if(En.call(n,"__wrapped__")){var t=new l(n.__wrapped__,n.__chain__);return t.__actions__=N(n.__actions__),t}}return new l(n)}function l(n,t){this.__wrapped__=n,this.__actions__=[],this.__chain__=!!t}function p(n,t,r,e){var u;return(u=n===an)||(u=xn[r],
u=(n===u||n!==n&&u!==u)&&!En.call(e,r)),u?t:n}function s(n){return X(n)?Fn(n):{}}function h(n,t,r){if(typeof n!="function")throw new TypeError("Expected a function");return setTimeout(function(){n.apply(an,r)},t)}function v(n,t){var r=true;return $n(n,function(n,e,u){return r=!!t(n,e,u)}),r}function y(n,t){var r=[];return $n(n,function(n,e,u){t(n,e,u)&&r.push(n)}),r}function _(t,r,e,u){u||(u=[]);for(var o=-1,i=t.length;++o<i;){var c=t[o];r>0&&Y(c)&&L(c)&&(e||Pn(c)||K(c))?r>1?_(c,r-1,e,u):n(u,c):e||(u[u.length]=c);
}return u}function g(n,t){return n&&qn(n,t,en)}function b(n,t){return y(t,function(t){return Q(n[t])})}function j(n,t,r,e,u){return n===t?true:null==n||null==t||!X(n)&&!Y(t)?n!==n&&t!==t:m(n,t,j,r,e,u)}function m(n,t,r,e,u,o){var i=Pn(n),f=Pn(t),a="[object Array]",l="[object Array]";i||(a=kn.call(n),"[object Arguments]"==a&&(a="[object Object]")),f||(l=kn.call(t),"[object Arguments]"==l&&(l="[object Object]"));var p="[object Object]"==a&&!c(n),f="[object Object]"==l&&!c(t);return!(l=a==l)||i||p?2&u||(a=p&&En.call(n,"__wrapped__"),
f=f&&En.call(t,"__wrapped__"),!a&&!f)?l?(o||(o=[]),(a=J(o,function(t){return t[0]===n}))&&a[1]?a[1]==t:(o.push([n,t]),t=(i?I:q)(n,t,r,e,u,o),o.pop(),t)):false:r(a?n.value():n,f?t.value():t,e,u,o):$(n,t,a)}function d(n){var t=typeof n;return"function"==t?n:null==n?cn:("object"==t?x:A)(n)}function w(n){n=null==n?n:Object(n);var t,r=[];for(t in n)r.push(t);return r}function O(n,t){var r=-1,e=L(n)?Array(n.length):[];return $n(n,function(n,u,o){e[++r]=t(n,u,o)}),e}function x(n){var t=en(n);return function(r){
var e=t.length;if(null==r)return!e;for(r=Object(r);e--;){var u=t[e];if(!(u in r&&j(n[u],r[u],an,3)))return false}return true}}function E(n,t){return n=Object(n),P(t,function(t,r){return r in n&&(t[r]=n[r]),t},{})}function A(n){return function(t){return null==t?an:t[n]}}function k(n,t,r){var e=-1,u=n.length;for(0>t&&(t=-t>u?0:u+t),r=r>u?u:r,0>r&&(r+=u),u=t>r?0:r-t>>>0,t>>>=0,r=Array(u);++e<u;)r[e]=n[e+t];return r}function N(n){return k(n,0,n.length)}function S(n,t){var r;return $n(n,function(n,e,u){return r=t(n,e,u),
!r}),!!r}function T(t,r){return P(r,function(t,r){return r.func.apply(r.thisArg,n([t],r.args))},t)}function F(n,t,r,e){r||(r={});for(var u=-1,o=t.length;++u<o;){var i=t[u],c=e?e(r[i],n[i],i,r,n):n[i],f=r,a=f[i];En.call(f,i)&&(a===c||a!==a&&c!==c)&&(c!==an||i in f)||(f[i]=c)}return r}function R(n){return V(function(t,r){var e=-1,u=r.length,o=u>1?r[u-1]:an,o=typeof o=="function"?(u--,o):an;for(t=Object(t);++e<u;){var i=r[e];i&&n(t,i,e,o)}return t})}function B(n){return function(){var t=arguments,r=s(n.prototype),t=n.apply(r,t);
return X(t)?t:r}}function D(n,t,r){function e(){for(var o=-1,i=arguments.length,c=-1,f=r.length,a=Array(f+i),l=this&&this!==wn&&this instanceof e?u:n;++c<f;)a[c]=r[c];for(;i--;)a[c++]=arguments[++o];return l.apply(t,a)}if(typeof n!="function")throw new TypeError("Expected a function");var u=B(n);return e}function I(n,t,r,e,u,o){var i=-1,c=1&u,f=n.length,a=t.length;if(f!=a&&!(2&u&&a>f))return false;for(a=true;++i<f;){var l=n[i],p=t[i];if(void 0!==an){a=false;break}if(c){if(!S(t,function(n){return l===n||r(l,n,e,u,o);
})){a=false;break}}else if(l!==p&&!r(l,p,e,u,o)){a=false;break}}return a}function $(n,t,r){switch(r){case"[object Boolean]":case"[object Date]":return+n==+t;case"[object Error]":return n.name==t.name&&n.message==t.message;case"[object Number]":return n!=+n?t!=+t:n==+t;case"[object RegExp]":case"[object String]":return n==t+""}return false}function q(n,t,r,e,u,o){var i=2&u,c=en(n),f=c.length,a=en(t).length;if(f!=a&&!i)return false;for(var l=f;l--;){var p=c[l];if(!(i?p in t:En.call(t,p)))return false}for(a=true;++l<f;){
var p=c[l],s=n[p],h=t[p];if(void 0!==an||s!==h&&!r(s,h,e,u,o)){a=false;break}i||(i="constructor"==p)}return a&&!i&&(r=n.constructor,e=t.constructor,r!=e&&"constructor"in n&&"constructor"in t&&!(typeof r=="function"&&r instanceof r&&typeof e=="function"&&e instanceof e)&&(a=false)),a}function z(n){var t=n?n.length:an;if(W(t)&&(Pn(n)||nn(n)||K(n))){n=String;for(var r=-1,e=Array(t);++r<t;)e[r]=n(r);t=e}else t=null;return t}function C(n){var t=n&&n.constructor,t=Q(t)&&t.prototype||xn;return n===t}function G(n){
return n?n[0]:an}function J(n,t){return r(n,d(t),$n)}function M(n,t){return $n(n,typeof t=="function"?t:cn)}function P(n,t,r){return e(n,d(t),r,3>arguments.length,$n)}function U(n,t){var r;if(typeof t!="function")throw new TypeError("Expected a function");return n=Un(n),function(){return 0<--n&&(r=t.apply(this,arguments)),1>=n&&(t=an),r}}function V(n){var t;if(typeof n!="function")throw new TypeError("Expected a function");return t=In(t===an?n.length-1:Un(t),0),function(){for(var r=arguments,e=-1,u=In(r.length-t,0),o=Array(u);++e<u;)o[e]=r[t+e];
for(u=Array(t+1),e=-1;++e<t;)u[e]=r[e];return u[t]=o,n.apply(this,u)}}function H(n,t){return n>t}function K(n){return Y(n)&&L(n)&&En.call(n,"callee")&&(!Rn.call(n,"callee")||"[object Arguments]"==kn.call(n))}function L(n){return null!=n&&!(typeof n=="function"&&Q(n))&&W(zn(n))}function Q(n){return n=X(n)?kn.call(n):"","[object Function]"==n||"[object GeneratorFunction]"==n}function W(n){return typeof n=="number"&&n>-1&&0==n%1&&9007199254740991>=n}function X(n){var t=typeof n;return!!n&&("object"==t||"function"==t);
}function Y(n){return!!n&&typeof n=="object"}function Z(n){return typeof n=="number"||Y(n)&&"[object Number]"==kn.call(n)}function nn(n){return typeof n=="string"||!Pn(n)&&Y(n)&&"[object String]"==kn.call(n)}function tn(n,t){return t>n}function rn(n){return typeof n=="string"?n:null==n?"":n+""}function en(n){var t=C(n);if(!t&&!L(n))return Dn(Object(n));var r,e=z(n),u=!!e,e=e||[],o=e.length;for(r in n)!En.call(n,r)||u&&("length"==r||f(r,o))||t&&"constructor"==r||e.push(r);return e}function un(n){for(var t=-1,r=C(n),e=w(n),u=e.length,o=z(n),i=!!o,o=o||[],c=o.length;++t<u;){
var a=e[t];i&&("length"==a||f(a,c))||"constructor"==a&&(r||!En.call(n,a))||o.push(a)}return o}function on(n){return n?u(n,en(n)):[]}function cn(n){return n}function fn(t,r,e){var u=en(r),o=b(r,u);null!=e||X(r)&&(o.length||!u.length)||(e=r,r=t,t=this,o=b(r,en(r)));var i=X(e)&&"chain"in e?e.chain:true,c=Q(t);return $n(o,function(e){var u=r[e];t[e]=u,c&&(t.prototype[e]=function(){var r=this.__chain__;if(i||r){var e=t(this.__wrapped__);return(e.__actions__=N(this.__actions__)).push({func:u,args:arguments,
thisArg:t}),e.__chain__=r,e}return u.apply(t,n([this.value()],arguments))})}),t}var an,ln=1/0,pn=/[&<>"'`]/g,sn=RegExp(pn.source),hn=/^(?:0|[1-9]\d*)$/,vn={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#96;"},yn={"function":true,object:true},_n=yn[typeof exports]&&exports&&!exports.nodeType?exports:an,gn=yn[typeof module]&&module&&!module.nodeType?module:an,bn=gn&&gn.exports===_n?_n:an,jn=o(yn[typeof self]&&self),mn=o(yn[typeof window]&&window),dn=o(yn[typeof this]&&this),wn=o(_n&&gn&&typeof global=="object"&&global)||mn!==(dn&&dn.window)&&mn||jn||dn||Function("return this")(),On=Array.prototype,xn=Object.prototype,En=xn.hasOwnProperty,An=0,kn=xn.toString,Nn=wn._,Sn=wn.Reflect,Tn=Sn?Sn.f:an,Fn=Object.create,Rn=xn.propertyIsEnumerable,Bn=wn.isFinite,Dn=Object.keys,In=Math.max,$n=function(n,t){
return function(r,e){if(null==r)return r;if(!L(r))return n(r,e);for(var u=r.length,o=t?u:-1,i=Object(r);(t?o--:++o<u)&&false!==e(i[o],o,i););return r}}(g),qn=function(n){return function(t,r,e){var u=-1,o=Object(t);e=e(t);for(var i=e.length;i--;){var c=e[n?i:++u];if(false===r(o[c],c,o))break}return t}}();Tn&&!Rn.call({valueOf:1},"valueOf")&&(w=function(n){n=Tn(n);for(var t,r=[];!(t=n.next()).done;)r.push(t.value);return r});var zn=A("length"),Cn=V(function(t,r){return Pn(t)||(t=null==t?[]:[Object(t)]),_(r,1),
n(N(t),on)}),Gn=V(function(n,t,r){return D(n,t,r)}),Jn=V(function(n,t){return h(n,1,t)}),Mn=V(function(n,t,r){return h(n,Vn(t)||0,r)}),Pn=Array.isArray,Un=Number,Vn=Number,Hn=R(function(n,t){F(t,en(t),n)}),Kn=R(function(n,t){F(t,un(t),n)}),Ln=R(function(n,t,r,e){F(t,un(t),n,e)}),Qn=V(function(n){return n.push(an,p),Ln.apply(an,n)}),Wn=V(function(n,t){return null==n?{}:E(n,_(t,1))}),Xn=d;l.prototype=s(a.prototype),l.prototype.constructor=l,a.assignIn=Kn,a.before=U,a.bind=Gn,a.chain=function(n){return n=a(n),
n.__chain__=true,n},a.compact=function(n){return y(n,Boolean)},a.concat=Cn,a.create=function(n,t){var r=s(n);return t?Hn(r,t):r},a.defaults=Qn,a.defer=Jn,a.delay=Mn,a.filter=function(n,t){return y(n,d(t))},a.flatten=function(n){return n&&n.length?_(n,1):[]},a.flattenDeep=function(n){return n&&n.length?_(n,ln):[]},a.iteratee=Xn,a.keys=en,a.map=function(n,t){return O(n,d(t))},a.matches=function(n){return x(Hn({},n))},a.mixin=fn,a.negate=function(n){if(typeof n!="function")throw new TypeError("Expected a function");
return function(){return!n.apply(this,arguments)}},a.once=function(n){return U(2,n)},a.pick=Wn,a.slice=function(n,t,r){var e=n?n.length:0;return r=r===an?e:+r,e?k(n,null==t?0:+t,r):[]},a.sortBy=function(n,t){var r=0;return t=d(t),O(O(n,function(n,e,u){return{c:n,b:r++,a:t(n,e,u)}}).sort(function(n,t){var r;n:{r=n.a;var e=t.a;if(r!==e){var u=null===r,o=r===an,i=r===r,c=null===e,f=e===an,a=e===e;if(r>e&&!c||!i||u&&!f&&a||o&&a){r=1;break n}if(e>r&&!u||!a||c&&!o&&i||f&&i){r=-1;break n}}r=0}return r||n.b-t.b;
}),A("c"))},a.tap=function(n,t){return t(n),n},a.thru=function(n,t){return t(n)},a.toArray=function(n){return L(n)?n.length?N(n):[]:on(n)},a.values=on,a.extend=Kn,fn(a,a),a.clone=function(n){return X(n)?Pn(n)?N(n):F(n,en(n)):n},a.escape=function(n){return(n=rn(n))&&sn.test(n)?n.replace(pn,i):n},a.every=function(n,t,r){return t=r?an:t,v(n,d(t))},a.find=J,a.forEach=M,a.has=function(n,t){return null!=n&&En.call(n,t)},a.head=G,a.identity=cn,a.indexOf=function(n,t,r){var e=n?n.length:0;r=typeof r=="number"?0>r?In(e+r,0):r:0,
r=(r||0)-1;for(var u=t===t;++r<e;){var o=n[r];if(u?o===t:o!==o)return r}return-1},a.isArguments=K,a.isArray=Pn,a.isBoolean=function(n){return true===n||false===n||Y(n)&&"[object Boolean]"==kn.call(n)},a.isDate=function(n){return Y(n)&&"[object Date]"==kn.call(n)},a.isEmpty=function(n){if(L(n)&&(Pn(n)||nn(n)||Q(n.splice)||K(n)))return!n.length;for(var t in n)if(En.call(n,t))return false;return true},a.isEqual=function(n,t){return j(n,t)},a.isFinite=function(n){return typeof n=="number"&&Bn(n)},a.isFunction=Q,a.isNaN=function(n){
return Z(n)&&n!=+n},a.isNull=function(n){return null===n},a.isNumber=Z,a.isObject=X,a.isRegExp=function(n){return X(n)&&"[object RegExp]"==kn.call(n)},a.isString=nn,a.isUndefined=function(n){return n===an},a.last=function(n){var t=n?n.length:0;return t?n[t-1]:an},a.max=function(n){return n&&n.length?t(n,cn,H):an},a.min=function(n){return n&&n.length?t(n,cn,tn):an},a.noConflict=function(){return wn._===this&&(wn._=Nn),this},a.noop=function(){},a.reduce=P,a.result=function(n,t,r){return t=null==n?an:n[t],
t===an&&(t=r),Q(t)?t.call(n):t},a.size=function(n){return null==n?0:(n=L(n)?n:en(n),n.length)},a.some=function(n,t,r){return t=r?an:t,S(n,d(t))},a.uniqueId=function(n){var t=++An;return rn(n)+t},a.each=M,a.first=G,fn(a,function(){var n={};return g(a,function(t,r){En.call(a.prototype,r)||(n[r]=t)}),n}(),{chain:false}),a.VERSION="4.5.1",$n("pop join replace reverse split push shift sort splice unshift".split(" "),function(n){var t=(/^(?:replace|split)$/.test(n)?String.prototype:On)[n],r=/^(?:push|sort|unshift)$/.test(n)?"tap":"thru",e=/^(?:pop|join|replace|shift)$/.test(n);
a.prototype[n]=function(){var n=arguments;return e&&!this.__chain__?t.apply(this.value(),n):this[r](function(r){return t.apply(r,n)})}}),a.prototype.toJSON=a.prototype.valueOf=a.prototype.value=function(){return T(this.__wrapped__,this.__actions__)},(mn||jn||{})._=a,typeof define=="function"&&typeof define.amd=="object"&&define.amd? define(function(){return a}):_n&&gn?(bn&&((gn.exports=a)._=a),_n._=a):wn._=a}).call(this);
/*
 * Debounce function
 * based on unminified version from http://davidwalsh.name/javascript-debounce-function
 */
theme.debounce = function(n,t,u){var e;return function(){var a=this,r=arguments,i=function(){e=null,u||n.apply(a,r)},o=u&&!e;clearTimeout(e),e=setTimeout(i,t),o&&n.apply(a,r)}};


/* ================ SLATE ================ */
window.theme = window.theme || {};

theme.Sections = function Sections() {
  this.constructors = {};
  this.instances = [];

  $(document)
    .on('shopify:section:load', this._onSectionLoad.bind(this))
    .on('shopify:section:unload', this._onSectionUnload.bind(this))
    .on('shopify:section:select', this._onSelect.bind(this))
    .on('shopify:section:deselect', this._onDeselect.bind(this))
    .on('shopify:block:select', this._onBlockSelect.bind(this))
    .on('shopify:block:deselect', this._onBlockDeselect.bind(this));
};

theme.Sections.prototype = _.assignIn({}, theme.Sections.prototype, {
  _createInstance: function(container, constructor) {
    var $container = $(container);
    var id = $container.attr('data-section-id');
    var type = $container.attr('data-section-type');

    constructor = constructor || this.constructors[type];

    if (_.isUndefined(constructor)) {
      return;
    }

    var instance = _.assignIn(new constructor(container), {
      id: id,
      type: type,
      container: container
    });

    this.instances.push(instance);
  },

  _onSectionLoad: function(evt) {
    var container = $('[data-section-id]', evt.target)[0];
    if (container) {
      this._createInstance(container);
    }
  },

  _onSectionUnload: function(evt) {
    this.instances = _.filter(this.instances, function(instance) {
      var isEventInstance = instance.id === evt.originalEvent.detail.sectionId;

      if (isEventInstance) {
        if (_.isFunction(instance.onUnload)) {
          instance.onUnload(evt);
        }
      }

      return !isEventInstance;
    });
  },

  _onSelect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.originalEvent.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onSelect)) {
      instance.onSelect(evt);
    }
  },

  _onDeselect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.originalEvent.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onDeselect)) {
      instance.onDeselect(evt);
    }
  },

  _onBlockSelect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.originalEvent.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onBlockSelect)) {
      instance.onBlockSelect(evt);
    }
  },

  _onBlockDeselect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.originalEvent.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onBlockDeselect)) {
      instance.onBlockDeselect(evt);
    }
  },

  register: function(type, constructor) {
    this.constructors[type] = constructor;

    $('[data-section-type=' + type + ']').each(
      function(index, container) {
        this._createInstance(container, constructor);
      }.bind(this)
    );
  }
});

/**
 * Currency Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help with currency formatting
 *
 * Current contents
 * - formatMoney - Takes an amount in cents and returns it as a formatted dollar value.
 *
 * Alternatives
 * - Accounting.js - http://openexchangerates.github.io/accounting.js/
 *
 */

theme.Currency = (function() {
  var moneyFormat = '$';

  function formatMoney(cents, format) {
    if (typeof cents === 'string') {
      cents = cents.replace('.', '');
    }
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = format || moneyFormat;

    function formatWithDelimiters(number, precision, thousands, decimal) {
      thousands = thousands || ',';
      decimal = decimal || '.';

      if (isNaN(number) || number === null) {
        return 0;
      }

      number = (number / 100.0).toFixed(precision);

      var parts = number.split('.');
      var dollarsAmount = parts[0].replace(
        /(\d)(?=(\d\d\d)+(?!\d))/g,
        '$1' + thousands
      );
      var centsAmount = parts[1] ? decimal + parts[1] : '';

      return dollarsAmount + centsAmount;
    }

    switch (formatString.match(placeholderRegex)[1]) {
      case 'amount':
        value = formatWithDelimiters(cents, 2);
        break;
      case 'amount_no_decimals':
        value = formatWithDelimiters(cents, 0);
        break;
      case 'amount_with_comma_separator':
        value = formatWithDelimiters(cents, 2, '.', ',');
        break;
      case 'amount_no_decimals_with_comma_separator':
        value = formatWithDelimiters(cents, 0, '.', ',');
        break;
      case 'amount_no_decimals_with_space_separator':
        value = formatWithDelimiters(cents, 0, ' ');
        break;
      case 'amount_with_apostrophe_separator':
        value = formatWithDelimiters(cents, 2, "'");
        break;
    }

    return formatString.replace(placeholderRegex, value);
  }

  return {
    formatMoney: formatMoney
  };
})();

/**
 * Image Helper Functions
 * -----------------------------------------------------------------------------
 * A collection of functions that help with basic image operations.
 *
 */

theme.Images = (function() {
  /**
   * Preloads an image in memory and uses the browsers cache to store it until needed.
   *
   * @param {Array} images - A list of image urls
   * @param {String} size - A shopify image size attribute
   */

  function preload(images, size) {
    if (typeof images === 'string') {
      images = [images];
    }

    for (var i = 0; i < images.length; i++) {
      var image = images[i];
      this.loadImage(this.getSizedImageUrl(image, size));
    }
  }

  /**
   * Loads and caches an image in the browsers cache.
   * @param {string} path - An image url
   */
  function loadImage(path) {
    new Image().src = path;
  }

  /**
   * Swaps the src of an image for another OR returns the imageURL to the callback function
   * @param image
   * @param element
   * @param callback
   */
  function switchImage(image, element, callback) {
    var size = this.imageSize(element.src);
    var imageUrl = this.getSizedImageUrl(image.src, size);

    if (callback) {
      callback(imageUrl, image, element); // eslint-disable-line callback-return
    } else {
      element.src = imageUrl;
    }
  }

  /**
   * +++ Useful
   * Find the Shopify image attribute size
   *
   * @param {string} src
   * @returns {null}
   */
  function imageSize(src) {
    var match = src.match(
      /.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[.@]/
    );

    if (match !== null) {
      return match[1];
    } else {
      return null;
    }
  }

  /**
   * +++ Useful
   * Adds a Shopify size attribute to a URL
   *
   * @param src
   * @param size
   * @returns {*}
   */
  function getSizedImageUrl(src, size) {
    if (typeof size === 'undefined' || size === null) {
      return src;
    }

    if (size === 'master') {
      return this.removeProtocol(src);
    }

    var match = src.match(
      /\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i
    );

    if (match !== null) {
      var prefix = src.split(match[0]);
      var suffix = match[0];

      return this.removeProtocol(prefix[0] + '_' + size + suffix);
    }

    return null;
  }

  function removeProtocol(path) {
    return path.replace(/http(s)?:/, '');
  }

  return {
    preload: preload,
    loadImage: loadImage,
    switchImage: switchImage,
    imageSize: imageSize,
    getSizedImageUrl: getSizedImageUrl,
    removeProtocol: removeProtocol
  };
})();

/**
 * Variant Selection scripts
 * ------------------------------------------------------------------------------
 *
 * Handles change events from the variant inputs in any `cart/add` forms that may
 * exist.  Also updates the master select and triggers updates when the variants
 * price or image changes.
 *
 * @namespace variants
 */

slate.Variants = (function() {
  /**
   * Variant constructor
   *
   * @param {object} options - Settings from `product.js`
   */
  function Variants(options) {
    this.$container = options.$container;
    this.product = options.product;
    this.singleOptionSelector = options.singleOptionSelector;
    this.originalSelectorId = options.originalSelectorId;
    this.enableHistoryState = options.enableHistoryState;
    this.currentVariant = this._getVariantFromOptions();

    $(this.singleOptionSelector, this.$container).on(
      'change input',
      this._onSelectChange.bind(this)
    );
  }

  Variants.prototype = _.assignIn({}, Variants.prototype, {
    /**
     * Get the currently selected options from add-to-cart form. Works with all
     * form input elements.
     *
     * @return {array} options - Values of currently selected variants
     */
    _getCurrentOptions: function() {
      var currentOptions = _.map(
        $(this.singleOptionSelector, this.$container),
        function(element) {
          var $element = $(element);
          var type = $element.attr('type');
          var currentOption = {};

          if (type === 'radio' || type === 'checkbox') {
            if ($element[0].checked) {
              currentOption.value = $element.val();
              currentOption.index = $element.data('index');

              return currentOption;
            } else {
              return false;
            }
          } else {
            currentOption.value = $element.val();
            currentOption.index = $element.data('index');

            return currentOption;
          }
        }
      );

      // remove any unchecked input values if using radio buttons or checkboxes
      currentOptions = _.compact(currentOptions);

      return currentOptions;
    },

    /**
     * Find variant based on selected values.
     *
     * @param  {array} selectedValues - Values of variant inputs
     * @return {object || undefined} found - Variant object from product.variants
     */
    _getVariantFromOptions: function() {
      var selectedValues = this._getCurrentOptions();
      var variants = this.product.variants;

      var found = _.find(variants, function(variant) {
        return selectedValues.every(function(values) {
          return _.isEqual(variant[values.index], values.value);
        });
      });

      return found;
    },

    /**
     * Event handler for when a variant input changes.
     */
    _onSelectChange: function(e) {

      this.tags = window.productTags;

      if (this.tags.includes("Flat")) {
        isFlat = true;
      } else {
        isFlat = false;
      }

      var $element = $(e.target);
      if ($element.hasClass('size-range')) {
        this.$container.trigger({
          type: 'rangeInput',
          target: e.target
        });
      }

      if (!isFlat) {
        var variant = this._getVariantFromOptions();

        this.$container.trigger({
          type: 'variantChange',
          variant: variant
        });
  
        if (!variant) {
          return;
        }
  
        this._updateMasterSelect(variant);
        this._updateImages(variant);
        this._updatePrice(variant);
        this._updateSKU(variant);
        this.currentVariant = variant;
  
        if (this.enableHistoryState) {
          this._updateHistoryState(variant);
        }
      }
    },

    /**
     * Trigger event when variant image changes
     *
     * @param  {object} variant - Currently selected variant
     * @return {event}  variantImageChange
     */
    _updateImages: function(variant) {
      var variantImage = variant.featured_image || {};
      var currentVariantImage = this.currentVariant ? (this.currentVariant.featured_image || {}) : {};

      if (
        !variant.featured_image ||
        variantImage.src === currentVariantImage.src
      ) {
        return;
      }

      this.$container.trigger({
        type: 'variantImageChange',
        variant: variant
      });
    },

    /**
     * Trigger event when variant price changes.
     *
     * @param  {object} variant - Currently selected variant
     * @return {event} variantPriceChange
     */
    _updatePrice: function(variant) {
      if (
        this.currentVariant &&
        variant.price === this.currentVariant.price &&
        variant.compare_at_price === this.currentVariant.compare_at_price
      ) {
        return;
      }

      this.$container.trigger({
        type: 'variantPriceChange',
        variant: variant
      });
    },

    /**
     * Trigger event when variant SKU changes.
     *
     * @param  {object} variant - Currently selected variant
     * @return {event} variantSKUChange
     */
    _updateSKU: function(variant) {
      if (this.currentVariant && variant.sku === this.currentVariant.sku) {
        return;
      }

      this.$container.trigger({
        type: 'variantSKUChange',
        variant: variant
      });
    },

    /**
     * Update history state for product deeplinking
     *
     * @param  {variant} variant - Currently selected variant
     * @return {k}         [description]
     */
    _updateHistoryState: function(variant) {
      if (!history.replaceState || !variant) {
        return;
      }

      var newurl =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname +
        '?variant=' +
        variant.id;

      var view = getUrlParam('view', '');
      if (view) {
        newurl += '&view=' + view;
      }
      
      window.history.replaceState({ path: newurl }, '', newurl);
    },

    /**
     * Update hidden master select of variant change
     *
     * @param  {variant} variant - Currently selected variant
     */
    _updateMasterSelect: function(variant) {
      $(this.originalSelectorId, this.$container).val(variant.id);
    }
  });

  return Variants;
})();


/* ================ MODULES ================ */
/*!
handlebars v1.3.0

Copyright (C) 2011 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
var Handlebars=function(){var e=function(){"use strict";function t(e){this.string=e}var e;t.prototype.toString=function(){return""+this.string};e=t;return e}();var t=function(e){"use strict";function o(e){return r[e]||"&"}function u(e,t){for(var n in t){if(Object.prototype.hasOwnProperty.call(t,n)){e[n]=t[n]}}}function c(e){if(e instanceof n){return e.toString()}else if(!e&&e!==0){return""}e=""+e;if(!s.test(e)){return e}return e.replace(i,o)}function h(e){if(!e&&e!==0){return true}else if(l(e)&&e.length===0){return true}else{return false}}var t={};var n=e;var r={"&":"&","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"};var i=/[&<>"'`]/g;var s=/[&<>"'`]/;t.extend=u;var a=Object.prototype.toString;t.toString=a;var f=function(e){return typeof e==="function"};if(f(/x/)){f=function(e){return typeof e==="function"&&a.call(e)==="[object Function]"}}var f;t.isFunction=f;var l=Array.isArray||function(e){return e&&typeof e==="object"?a.call(e)==="[object Array]":false};t.isArray=l;t.escapeExpression=c;t.isEmpty=h;return t}(e);var n=function(){"use strict";function n(e,n){var r;if(n&&n.firstLine){r=n.firstLine;e+=" - "+r+":"+n.firstColumn}var i=Error.prototype.constructor.call(this,e);for(var s=0;s<t.length;s++){this[t[s]]=i[t[s]]}if(r){this.lineNumber=r;this.column=n.firstColumn}}var e;var t=["description","fileName","lineNumber","message","name","number","stack"];n.prototype=new Error;e=n;return e}();var r=function(e,t){"use strict";function h(e,t){this.helpers=e||{};this.partials=t||{};p(this)}function p(e){e.registerHelper("helperMissing",function(e){if(arguments.length===2){return undefined}else{throw new i("Missing helper: '"+e+"'")}});e.registerHelper("blockHelperMissing",function(t,n){var r=n.inverse||function(){},i=n.fn;if(f(t)){t=t.call(this)}if(t===true){return i(this)}else if(t===false||t==null){return r(this)}else if(a(t)){if(t.length>0){return e.helpers.each(t,n)}else{return r(this)}}else{return i(t)}});e.registerHelper("each",function(e,t){var n=t.fn,r=t.inverse;var i=0,s="",o;if(f(e)){e=e.call(this)}if(t.data){o=m(t.data)}if(e&&typeof e==="object"){if(a(e)){for(var u=e.length;i<u;i++){if(o){o.index=i;o.first=i===0;o.last=i===e.length-1}s=s+n(e[i],{data:o})}}else{for(var l in e){if(e.hasOwnProperty(l)){if(o){o.key=l;o.index=i;o.first=i===0}s=s+n(e[l],{data:o});i++}}}}if(i===0){s=r(this)}return s});e.registerHelper("if",function(e,t){if(f(e)){e=e.call(this)}if(!t.hash.includeZero&&!e||r.isEmpty(e)){return t.inverse(this)}else{return t.fn(this)}});e.registerHelper("unless",function(t,n){return e.helpers["if"].call(this,t,{fn:n.inverse,inverse:n.fn,hash:n.hash})});e.registerHelper("with",function(e,t){if(f(e)){e=e.call(this)}if(!r.isEmpty(e))return t.fn(e)});e.registerHelper("log",function(t,n){var r=n.data&&n.data.level!=null?parseInt(n.data.level,10):1;e.log(r,t)})}function v(e,t){d.log(e,t)}var n={};var r=e;var i=t;var s="1.3.0";n.VERSION=s;var o=4;n.COMPILER_REVISION=o;var u={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:">= 1.0.0"};n.REVISION_CHANGES=u;var a=r.isArray,f=r.isFunction,l=r.toString,c="[object Object]";n.HandlebarsEnvironment=h;h.prototype={constructor:h,logger:d,log:v,registerHelper:function(e,t,n){if(l.call(e)===c){if(n||t){throw new i("Arg not supported with multiple helpers")}r.extend(this.helpers,e)}else{if(n){t.not=n}this.helpers[e]=t}},registerPartial:function(e,t){if(l.call(e)===c){r.extend(this.partials,e)}else{this.partials[e]=t}}};var d={methodMap:{0:"debug",1:"info",2:"warn",3:"error"},DEBUG:0,INFO:1,WARN:2,ERROR:3,level:3,log:function(e,t){if(d.level<=e){var n=d.methodMap[e];if(typeof console!=="undefined"&&console[n]){console[n].call(console,t)}}}};n.logger=d;n.log=v;var m=function(e){var t={};r.extend(t,e);return t};n.createFrame=m;return n}(t,n);var i=function(e,t,n){"use strict";function a(e){var t=e&&e[0]||1,n=o;if(t!==n){if(t<n){var r=u[n],i=u[t];throw new s("Template was precompiled with an older version of Handlebars than the current runtime. "+"Please update your precompiler to a newer version ("+r+") or downgrade your runtime to an older version ("+i+").")}else{throw new s("Template was precompiled with a newer version of Handlebars than the current runtime. "+"Please update your runtime to a newer version ("+e[1]+").")}}}function f(e,t){if(!t){throw new s("No environment passed to template")}var n=function(e,n,r,i,o,u){var a=t.VM.invokePartial.apply(this,arguments);if(a!=null){return a}if(t.compile){var f={helpers:i,partials:o,data:u};o[n]=t.compile(e,{data:u!==undefined},t);return o[n](r,f)}else{throw new s("The partial "+n+" could not be compiled when running in runtime-only mode")}};var r={escapeExpression:i.escapeExpression,invokePartial:n,programs:[],program:function(e,t,n){var r=this.programs[e];if(n){r=c(e,t,n)}else if(!r){r=this.programs[e]=c(e,t)}return r},merge:function(e,t){var n=e||t;if(e&&t&&e!==t){n={};i.extend(n,t);i.extend(n,e)}return n},programWithDepth:t.VM.programWithDepth,noop:t.VM.noop,compilerInfo:null};return function(n,i){i=i||{};var s=i.partial?i:t,o,u;if(!i.partial){o=i.helpers;u=i.partials}var a=e.call(r,s,n,o,u,i.data);if(!i.partial){t.VM.checkRevision(r.compilerInfo)}return a}}function l(e,t,n){var r=Array.prototype.slice.call(arguments,3);var i=function(e,i){i=i||{};return t.apply(this,[e,i.data||n].concat(r))};i.program=e;i.depth=r.length;return i}function c(e,t,n){var r=function(e,r){r=r||{};return t(e,r.data||n)};r.program=e;r.depth=0;return r}function h(e,t,n,r,i,o){var u={partial:true,helpers:r,partials:i,data:o};if(e===undefined){throw new s("The partial "+t+" could not be found")}else if(e instanceof Function){return e(n,u)}}function p(){return""}var r={};var i=e;var s=t;var o=n.COMPILER_REVISION;var u=n.REVISION_CHANGES;r.checkRevision=a;r.template=f;r.programWithDepth=l;r.program=c;r.invokePartial=h;r.noop=p;return r}(t,n,r);var s=function(e,t,n,r,i){"use strict";var s;var o=e;var u=t;var a=n;var f=r;var l=i;var c=function(){var e=new o.HandlebarsEnvironment;f.extend(e,o);e.SafeString=u;e.Exception=a;e.Utils=f;e.VM=l;e.template=function(t){return l.template(t,e)};return e};var h=c();h.create=c;s=h;return s}(r,e,n,t,i);var o=function(e){"use strict";function r(e){e=e||{};this.firstLine=e.first_line;this.firstColumn=e.first_column;this.lastColumn=e.last_column;this.lastLine=e.last_line}var t;var n=e;var i={ProgramNode:function(e,t,n,s){var o,u;if(arguments.length===3){s=n;n=null}else if(arguments.length===2){s=t;t=null}r.call(this,s);this.type="program";this.statements=e;this.strip={};if(n){u=n[0];if(u){o={first_line:u.firstLine,last_line:u.lastLine,last_column:u.lastColumn,first_column:u.firstColumn};this.inverse=new i.ProgramNode(n,t,o)}else{this.inverse=new i.ProgramNode(n,t)}this.strip.right=t.left}else if(t){this.strip.left=t.right}},MustacheNode:function(e,t,n,s,o){r.call(this,o);this.type="mustache";this.strip=s;if(n!=null&&n.charAt){var u=n.charAt(3)||n.charAt(2);this.escaped=u!=="{"&&u!=="&"}else{this.escaped=!!n}if(e instanceof i.SexprNode){this.sexpr=e}else{this.sexpr=new i.SexprNode(e,t)}this.sexpr.isRoot=true;this.id=this.sexpr.id;this.params=this.sexpr.params;this.hash=this.sexpr.hash;this.eligibleHelper=this.sexpr.eligibleHelper;this.isHelper=this.sexpr.isHelper},SexprNode:function(e,t,n){r.call(this,n);this.type="sexpr";this.hash=t;var i=this.id=e[0];var s=this.params=e.slice(1);var o=this.eligibleHelper=i.isSimple;this.isHelper=o&&(s.length||t)},PartialNode:function(e,t,n,i){r.call(this,i);this.type="partial";this.partialName=e;this.context=t;this.strip=n},BlockNode:function(e,t,i,s,o){r.call(this,o);if(e.sexpr.id.original!==s.path.original){throw new n(e.sexpr.id.original+" doesn't match "+s.path.original,this)}this.type="block";this.mustache=e;this.program=t;this.inverse=i;this.strip={left:e.strip.left,right:s.strip.right};(t||i).strip.left=e.strip.right;(i||t).strip.right=s.strip.left;if(i&&!t){this.isInverse=true}},ContentNode:function(e,t){r.call(this,t);this.type="content";this.string=e},HashNode:function(e,t){r.call(this,t);this.type="hash";this.pairs=e},IdNode:function(e,t){r.call(this,t);this.type="ID";var i="",s=[],o=0;for(var u=0,a=e.length;u<a;u++){var f=e[u].part;i+=(e[u].separator||"")+f;if(f===".."||f==="."||f==="this"){if(s.length>0){throw new n("Invalid path: "+i,this)}else if(f===".."){o++}else{this.isScoped=true}}else{s.push(f)}}this.original=i;this.parts=s;this.string=s.join(".");this.depth=o;this.isSimple=e.length===1&&!this.isScoped&&o===0;this.stringModeValue=this.string},PartialNameNode:function(e,t){r.call(this,t);this.type="PARTIAL_NAME";this.name=e.original},DataNode:function(e,t){r.call(this,t);this.type="DATA";this.id=e},StringNode:function(e,t){r.call(this,t);this.type="STRING";this.original=this.string=this.stringModeValue=e},IntegerNode:function(e,t){r.call(this,t);this.type="INTEGER";this.original=this.integer=e;this.stringModeValue=Number(e)},BooleanNode:function(e,t){r.call(this,t);this.type="BOOLEAN";this.bool=e;this.stringModeValue=e==="true"},CommentNode:function(e,t){r.call(this,t);this.type="comment";this.comment=e}};t=i;return t}(n);var u=function(){"use strict";var e;var t=function(){function t(e,t){return{left:e.charAt(2)==="~",right:t.charAt(0)==="~"||t.charAt(1)==="~"}}function r(){this.yy={}}var e={trace:function(){},yy:{},symbols_:{error:2,root:3,statements:4,EOF:5,program:6,simpleInverse:7,statement:8,openInverse:9,closeBlock:10,openBlock:11,mustache:12,partial:13,CONTENT:14,COMMENT:15,OPEN_BLOCK:16,sexpr:17,CLOSE:18,OPEN_INVERSE:19,OPEN_ENDBLOCK:20,path:21,OPEN:22,OPEN_UNESCAPED:23,CLOSE_UNESCAPED:24,OPEN_PARTIAL:25,partialName:26,partial_option0:27,sexpr_repetition0:28,sexpr_option0:29,dataName:30,param:31,STRING:32,INTEGER:33,BOOLEAN:34,OPEN_SEXPR:35,CLOSE_SEXPR:36,hash:37,hash_repetition_plus0:38,hashSegment:39,ID:40,EQUALS:41,DATA:42,pathSegments:43,SEP:44,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",14:"CONTENT",15:"COMMENT",16:"OPEN_BLOCK",18:"CLOSE",19:"OPEN_INVERSE",20:"OPEN_ENDBLOCK",22:"OPEN",23:"OPEN_UNESCAPED",24:"CLOSE_UNESCAPED",25:"OPEN_PARTIAL",32:"STRING",33:"INTEGER",34:"BOOLEAN",35:"OPEN_SEXPR",36:"CLOSE_SEXPR",40:"ID",41:"EQUALS",42:"DATA",44:"SEP"},productions_:[0,[3,2],[3,1],[6,2],[6,3],[6,2],[6,1],[6,1],[6,0],[4,1],[4,2],[8,3],[8,3],[8,1],[8,1],[8,1],[8,1],[11,3],[9,3],[10,3],[12,3],[12,3],[13,4],[7,2],[17,3],[17,1],[31,1],[31,1],[31,1],[31,1],[31,1],[31,3],[37,1],[39,3],[26,1],[26,1],[26,1],[30,2],[21,1],[43,3],[43,1],[27,0],[27,1],[28,0],[28,2],[29,0],[29,1],[38,1],[38,2]],performAction:function(n,r,i,s,o,u,a){var f=u.length-1;switch(o){case 1:return new s.ProgramNode(u[f-1],this._$);break;case 2:return new s.ProgramNode([],this._$);break;case 3:this.$=new s.ProgramNode([],u[f-1],u[f],this._$);break;case 4:this.$=new s.ProgramNode(u[f-2],u[f-1],u[f],this._$);break;case 5:this.$=new s.ProgramNode(u[f-1],u[f],[],this._$);break;case 6:this.$=new s.ProgramNode(u[f],this._$);break;case 7:this.$=new s.ProgramNode([],this._$);break;case 8:this.$=new s.ProgramNode([],this._$);break;case 9:this.$=[u[f]];break;case 10:u[f-1].push(u[f]);this.$=u[f-1];break;case 11:this.$=new s.BlockNode(u[f-2],u[f-1].inverse,u[f-1],u[f],this._$);break;case 12:this.$=new s.BlockNode(u[f-2],u[f-1],u[f-1].inverse,u[f],this._$);break;case 13:this.$=u[f];break;case 14:this.$=u[f];break;case 15:this.$=new s.ContentNode(u[f],this._$);break;case 16:this.$=new s.CommentNode(u[f],this._$);break;case 17:this.$=new s.MustacheNode(u[f-1],null,u[f-2],t(u[f-2],u[f]),this._$);break;case 18:this.$=new s.MustacheNode(u[f-1],null,u[f-2],t(u[f-2],u[f]),this._$);break;case 19:this.$={path:u[f-1],strip:t(u[f-2],u[f])};break;case 20:this.$=new s.MustacheNode(u[f-1],null,u[f-2],t(u[f-2],u[f]),this._$);break;case 21:this.$=new s.MustacheNode(u[f-1],null,u[f-2],t(u[f-2],u[f]),this._$);break;case 22:this.$=new s.PartialNode(u[f-2],u[f-1],t(u[f-3],u[f]),this._$);break;case 23:this.$=t(u[f-1],u[f]);break;case 24:this.$=new s.SexprNode([u[f-2]].concat(u[f-1]),u[f],this._$);break;case 25:this.$=new s.SexprNode([u[f]],null,this._$);break;case 26:this.$=u[f];break;case 27:this.$=new s.StringNode(u[f],this._$);break;case 28:this.$=new s.IntegerNode(u[f],this._$);break;case 29:this.$=new s.BooleanNode(u[f],this._$);break;case 30:this.$=u[f];break;case 31:u[f-1].isHelper=true;this.$=u[f-1];break;case 32:this.$=new s.HashNode(u[f],this._$);break;case 33:this.$=[u[f-2],u[f]];break;case 34:this.$=new s.PartialNameNode(u[f],this._$);break;case 35:this.$=new s.PartialNameNode(new s.StringNode(u[f],this._$),this._$);break;case 36:this.$=new s.PartialNameNode(new s.IntegerNode(u[f],this._$));break;case 37:this.$=new s.DataNode(u[f],this._$);break;case 38:this.$=new s.IdNode(u[f],this._$);break;case 39:u[f-2].push({part:u[f],separator:u[f-1]});this.$=u[f-2];break;case 40:this.$=[{part:u[f]}];break;case 43:this.$=[];break;case 44:u[f-1].push(u[f]);break;case 47:this.$=[u[f]];break;case 48:u[f-1].push(u[f]);break}},table:[{3:1,4:2,5:[1,3],8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],25:[1,15]},{1:[3]},{5:[1,16],8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],25:[1,15]},{1:[2,2]},{5:[2,9],14:[2,9],15:[2,9],16:[2,9],19:[2,9],20:[2,9],22:[2,9],23:[2,9],25:[2,9]},{4:20,6:18,7:19,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,21],20:[2,8],22:[1,13],23:[1,14],25:[1,15]},{4:20,6:22,7:19,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,21],20:[2,8],22:[1,13],23:[1,14],25:[1,15]},{5:[2,13],14:[2,13],15:[2,13],16:[2,13],19:[2,13],20:[2,13],22:[2,13],23:[2,13],25:[2,13]},{5:[2,14],14:[2,14],15:[2,14],16:[2,14],19:[2,14],20:[2,14],22:[2,14],23:[2,14],25:[2,14]},{5:[2,15],14:[2,15],15:[2,15],16:[2,15],19:[2,15],20:[2,15],22:[2,15],23:[2,15],25:[2,15]},{5:[2,16],14:[2,16],15:[2,16],16:[2,16],19:[2,16],20:[2,16],22:[2,16],23:[2,16],25:[2,16]},{17:23,21:24,30:25,40:[1,28],42:[1,27],43:26},{17:29,21:24,30:25,40:[1,28],42:[1,27],43:26},{17:30,21:24,30:25,40:[1,28],42:[1,27],43:26},{17:31,21:24,30:25,40:[1,28],42:[1,27],43:26},{21:33,26:32,32:[1,34],33:[1,35],40:[1,28],43:26},{1:[2,1]},{5:[2,10],14:[2,10],15:[2,10],16:[2,10],19:[2,10],20:[2,10],22:[2,10],23:[2,10],25:[2,10]},{10:36,20:[1,37]},{4:38,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,7],22:[1,13],23:[1,14],25:[1,15]},{7:39,8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,21],20:[2,6],22:[1,13],23:[1,14],25:[1,15]},{17:23,18:[1,40],21:24,30:25,40:[1,28],42:[1,27],43:26},{10:41,20:[1,37]},{18:[1,42]},{18:[2,43],24:[2,43],28:43,32:[2,43],33:[2,43],34:[2,43],35:[2,43],36:[2,43],40:[2,43],42:[2,43]},{18:[2,25],24:[2,25],36:[2,25]},{18:[2,38],24:[2,38],32:[2,38],33:[2,38],34:[2,38],35:[2,38],36:[2,38],40:[2,38],42:[2,38],44:[1,44]},{21:45,40:[1,28],43:26},{18:[2,40],24:[2,40],32:[2,40],33:[2,40],34:[2,40],35:[2,40],36:[2,40],40:[2,40],42:[2,40],44:[2,40]},{18:[1,46]},{18:[1,47]},{24:[1,48]},{18:[2,41],21:50,27:49,40:[1,28],43:26},{18:[2,34],40:[2,34]},{18:[2,35],40:[2,35]},{18:[2,36],40:[2,36]},{5:[2,11],14:[2,11],15:[2,11],16:[2,11],19:[2,11],20:[2,11],22:[2,11],23:[2,11],25:[2,11]},{21:51,40:[1,28],43:26},{8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,3],22:[1,13],23:[1,14],25:[1,15]},{4:52,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,5],22:[1,13],23:[1,14],25:[1,15]},{14:[2,23],15:[2,23],16:[2,23],19:[2,23],20:[2,23],22:[2,23],23:[2,23],25:[2,23]},{5:[2,12],14:[2,12],15:[2,12],16:[2,12],19:[2,12],20:[2,12],22:[2,12],23:[2,12],25:[2,12]},{14:[2,18],15:[2,18],16:[2,18],19:[2,18],20:[2,18],22:[2,18],23:[2,18],25:[2,18]},{18:[2,45],21:56,24:[2,45],29:53,30:60,31:54,32:[1,57],33:[1,58],34:[1,59],35:[1,61],36:[2,45],37:55,38:62,39:63,40:[1,64],42:[1,27],43:26},{40:[1,65]},{18:[2,37],24:[2,37],32:[2,37],33:[2,37],34:[2,37],35:[2,37],36:[2,37],40:[2,37],42:[2,37]},{14:[2,17],15:[2,17],16:[2,17],19:[2,17],20:[2,17],22:[2,17],23:[2,17],25:[2,17]},{5:[2,20],14:[2,20],15:[2,20],16:[2,20],19:[2,20],20:[2,20],22:[2,20],23:[2,20],25:[2,20]},{5:[2,21],14:[2,21],15:[2,21],16:[2,21],19:[2,21],20:[2,21],22:[2,21],23:[2,21],25:[2,21]},{18:[1,66]},{18:[2,42]},{18:[1,67]},{8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,4],22:[1,13],23:[1,14],25:[1,15]},{18:[2,24],24:[2,24],36:[2,24]},{18:[2,44],24:[2,44],32:[2,44],33:[2,44],34:[2,44],35:[2,44],36:[2,44],40:[2,44],42:[2,44]},{18:[2,46],24:[2,46],36:[2,46]},{18:[2,26],24:[2,26],32:[2,26],33:[2,26],34:[2,26],35:[2,26],36:[2,26],40:[2,26],42:[2,26]},{18:[2,27],24:[2,27],32:[2,27],33:[2,27],34:[2,27],35:[2,27],36:[2,27],40:[2,27],42:[2,27]},{18:[2,28],24:[2,28],32:[2,28],33:[2,28],34:[2,28],35:[2,28],36:[2,28],40:[2,28],42:[2,28]},{18:[2,29],24:[2,29],32:[2,29],33:[2,29],34:[2,29],35:[2,29],36:[2,29],40:[2,29],42:[2,29]},{18:[2,30],24:[2,30],32:[2,30],33:[2,30],34:[2,30],35:[2,30],36:[2,30],40:[2,30],42:[2,30]},{17:68,21:24,30:25,40:[1,28],42:[1,27],43:26},{18:[2,32],24:[2,32],36:[2,32],39:69,40:[1,70]},{18:[2,47],24:[2,47],36:[2,47],40:[2,47]},{18:[2,40],24:[2,40],32:[2,40],33:[2,40],34:[2,40],35:[2,40],36:[2,40],40:[2,40],41:[1,71],42:[2,40],44:[2,40]},{18:[2,39],24:[2,39],32:[2,39],33:[2,39],34:[2,39],35:[2,39],36:[2,39],40:[2,39],42:[2,39],44:[2,39]},{5:[2,22],14:[2,22],15:[2,22],16:[2,22],19:[2,22],20:[2,22],22:[2,22],23:[2,22],25:[2,22]},{5:[2,19],14:[2,19],15:[2,19],16:[2,19],19:[2,19],20:[2,19],22:[2,19],23:[2,19],25:[2,19]},{36:[1,72]},{18:[2,48],24:[2,48],36:[2,48],40:[2,48]},{41:[1,71]},{21:56,30:60,31:73,32:[1,57],33:[1,58],34:[1,59],35:[1,61],40:[1,28],42:[1,27],43:26},{18:[2,31],24:[2,31],32:[2,31],33:[2,31],34:[2,31],35:[2,31],36:[2,31],40:[2,31],42:[2,31]},{18:[2,33],24:[2,33],36:[2,33],40:[2,33]}],defaultActions:{3:[2,2],16:[2,1],50:[2,42]},parseError:function(t,n){throw new Error(t)},parse:function(t){function v(e){r.length=r.length-2*e;i.length=i.length-e;s.length=s.length-e}function m(){var e;e=n.lexer.lex()||1;if(typeof e!=="number"){e=n.symbols_[e]||e}return e}var n=this,r=[0],i=[null],s=[],o=this.table,u="",a=0,f=0,l=0,c=2,h=1;this.lexer.setInput(t);this.lexer.yy=this.yy;this.yy.lexer=this.lexer;this.yy.parser=this;if(typeof this.lexer.yylloc=="undefined")this.lexer.yylloc={};var p=this.lexer.yylloc;s.push(p);var d=this.lexer.options&&this.lexer.options.ranges;if(typeof this.yy.parseError==="function")this.parseError=this.yy.parseError;var g,y,b,w,E,S,x={},T,N,C,k;while(true){b=r[r.length-1];if(this.defaultActions[b]){w=this.defaultActions[b]}else{if(g===null||typeof g=="undefined"){g=m()}w=o[b]&&o[b][g]}if(typeof w==="undefined"||!w.length||!w[0]){var L="";if(!l){k=[];for(T in o[b])if(this.terminals_[T]&&T>2){k.push("'"+this.terminals_[T]+"'")}if(this.lexer.showPosition){L="Parse error on line "+(a+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+k.join(", ")+", got '"+(this.terminals_[g]||g)+"'"}else{L="Parse error on line "+(a+1)+": Unexpected "+(g==1?"end of input":"'"+(this.terminals_[g]||g)+"'")}this.parseError(L,{text:this.lexer.match,token:this.terminals_[g]||g,line:this.lexer.yylineno,loc:p,expected:k})}}if(w[0]instanceof Array&&w.length>1){throw new Error("Parse Error: multiple actions possible at state: "+b+", token: "+g)}switch(w[0]){case 1:r.push(g);i.push(this.lexer.yytext);s.push(this.lexer.yylloc);r.push(w[1]);g=null;if(!y){f=this.lexer.yyleng;u=this.lexer.yytext;a=this.lexer.yylineno;p=this.lexer.yylloc;if(l>0)l--}else{g=y;y=null}break;case 2:N=this.productions_[w[1]][1];x.$=i[i.length-N];x._$={first_line:s[s.length-(N||1)].first_line,last_line:s[s.length-1].last_line,first_column:s[s.length-(N||1)].first_column,last_column:s[s.length-1].last_column};if(d){x._$.range=[s[s.length-(N||1)].range[0],s[s.length-1].range[1]]}S=this.performAction.call(x,u,f,a,this.yy,w[1],i,s);if(typeof S!=="undefined"){return S}if(N){r=r.slice(0,-1*N*2);i=i.slice(0,-1*N);s=s.slice(0,-1*N)}r.push(this.productions_[w[1]][0]);i.push(x.$);s.push(x._$);C=o[r[r.length-2]][r[r.length-1]];r.push(C);break;case 3:return true}}return true}};var n=function(){var e={EOF:1,parseError:function(t,n){if(this.yy.parser){this.yy.parser.parseError(t,n)}else{throw new Error(t)}},setInput:function(e){this._input=e;this._more=this._less=this.done=false;this.yylineno=this.yyleng=0;this.yytext=this.matched=this.match="";this.conditionStack=["INITIAL"];this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0};if(this.options.ranges)this.yylloc.range=[0,0];this.offset=0;return this},input:function(){var e=this._input[0];this.yytext+=e;this.yyleng++;this.offset++;this.match+=e;this.matched+=e;var t=e.match(/(?:\r\n?|\n).*/g);if(t){this.yylineno++;this.yylloc.last_line++}else{this.yylloc.last_column++}if(this.options.ranges)this.yylloc.range[1]++;this._input=this._input.slice(1);return e},unput:function(e){var t=e.length;var n=e.split(/(?:\r\n?|\n)/g);this._input=e+this._input;this.yytext=this.yytext.substr(0,this.yytext.length-t-1);this.offset-=t;var r=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1);this.matched=this.matched.substr(0,this.matched.length-1);if(n.length-1)this.yylineno-=n.length-1;var i=this.yylloc.range;this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:n?(n.length===r.length?this.yylloc.first_column:0)+r[r.length-n.length].length-n[0].length:this.yylloc.first_column-t};if(this.options.ranges){this.yylloc.range=[i[0],i[0]+this.yyleng-t]}return this},more:function(){this._more=true;return this},less:function(e){this.unput(this.match.slice(e))},pastInput:function(){var e=this.matched.substr(0,this.matched.length-this.match.length);return(e.length>20?"...":"")+e.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var e=this.match;if(e.length<20){e+=this._input.substr(0,20-e.length)}return(e.substr(0,20)+(e.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var e=this.pastInput();var t=(new Array(e.length+1)).join("-");return e+this.upcomingInput()+"\n"+t+"^"},next:function(){if(this.done){return this.EOF}if(!this._input)this.done=true;var e,t,n,r,i,s;if(!this._more){this.yytext="";this.match=""}var o=this._currentRules();for(var u=0;u<o.length;u++){n=this._input.match(this.rules[o[u]]);if(n&&(!t||n[0].length>t[0].length)){t=n;r=u;if(!this.options.flex)break}}if(t){s=t[0].match(/(?:\r\n?|\n).*/g);if(s)this.yylineno+=s.length;this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:s?s[s.length-1].length-s[s.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+t[0].length};this.yytext+=t[0];this.match+=t[0];this.matches=t;this.yyleng=this.yytext.length;if(this.options.ranges){this.yylloc.range=[this.offset,this.offset+=this.yyleng]}this._more=false;this._input=this._input.slice(t[0].length);this.matched+=t[0];e=this.performAction.call(this,this.yy,this,o[r],this.conditionStack[this.conditionStack.length-1]);if(this.done&&this._input)this.done=false;if(e)return e;else return}if(this._input===""){return this.EOF}else{return this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})}},lex:function(){var t=this.next();if(typeof t!=="undefined"){return t}else{return this.lex()}},begin:function(t){this.conditionStack.push(t)},popState:function(){return this.conditionStack.pop()},_currentRules:function(){return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules},topState:function(){return this.conditionStack[this.conditionStack.length-2]},pushState:function(t){this.begin(t)}};e.options={};e.performAction=function(t,n,r,i){function s(e,t){return n.yytext=n.yytext.substr(e,n.yyleng-t)}var o=i;switch(r){case 0:if(n.yytext.slice(-2)==="\\\\"){s(0,1);this.begin("mu")}else if(n.yytext.slice(-1)==="\\"){s(0,1);this.begin("emu")}else{this.begin("mu")}if(n.yytext)return 14;break;case 1:return 14;break;case 2:this.popState();return 14;break;case 3:s(0,4);this.popState();return 15;break;case 4:return 35;break;case 5:return 36;break;case 6:return 25;break;case 7:return 16;break;case 8:return 20;break;case 9:return 19;break;case 10:return 19;break;case 11:return 23;break;case 12:return 22;break;case 13:this.popState();this.begin("com");break;case 14:s(3,5);this.popState();return 15;break;case 15:return 22;break;case 16:return 41;break;case 17:return 40;break;case 18:return 40;break;case 19:return 44;break;case 20:break;case 21:this.popState();return 24;break;case 22:this.popState();return 18;break;case 23:n.yytext=s(1,2).replace(/\\"/g,'"');return 32;break;case 24:n.yytext=s(1,2).replace(/\\'/g,"'");return 32;break;case 25:return 42;break;case 26:return 34;break;case 27:return 34;break;case 28:return 33;break;case 29:return 40;break;case 30:n.yytext=s(1,2);return 40;break;case 31:return"INVALID";break;case 32:return 5;break}};e.rules=[/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,/^(?:[\s\S]*?--\}\})/,/^(?:\()/,/^(?:\))/,/^(?:\{\{(~)?>)/,/^(?:\{\{(~)?#)/,/^(?:\{\{(~)?\/)/,/^(?:\{\{(~)?\^)/,/^(?:\{\{(~)?\s*else\b)/,/^(?:\{\{(~)?\{)/,/^(?:\{\{(~)?&)/,/^(?:\{\{!--)/,/^(?:\{\{![\s\S]*?\}\})/,/^(?:\{\{(~)?)/,/^(?:=)/,/^(?:\.\.)/,/^(?:\.(?=([=~}\s\/.)])))/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}(~)?\}\})/,/^(?:(~)?\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@)/,/^(?:true(?=([~}\s)])))/,/^(?:false(?=([~}\s)])))/,/^(?:-?[0-9]+(?=([~}\s)])))/,/^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)]))))/,/^(?:\[[^\]]*\])/,/^(?:.)/,/^(?:$)/];e.conditions={mu:{rules:[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32],inclusive:false},emu:{rules:[2],inclusive:false},com:{rules:[3],inclusive:false},INITIAL:{rules:[0,1,32],inclusive:true}};return e}();e.lexer=n;r.prototype=e;e.Parser=r;return new r}();e=t;return e}();var a=function(e,t){"use strict";function s(e){if(e.constructor===i.ProgramNode){return e}r.yy=i;return r.parse(e)}var n={};var r=e;var i=t;n.parser=r;n.parse=s;return n}(u,o);var f=function(e){"use strict";function r(){}function i(e,t,r){if(e==null||typeof e!=="string"&&e.constructor!==r.AST.ProgramNode){throw new n("You must pass a string or Handlebars AST to Handlebars.precompile. You passed "+e)}t=t||{};if(!("data"in t)){t.data=true}var i=r.parse(e);var s=(new r.Compiler).compile(i,t);return(new r.JavaScriptCompiler).compile(s,t)}function s(e,t,r){function s(){var n=r.parse(e);var i=(new r.Compiler).compile(n,t);var s=(new r.JavaScriptCompiler).compile(i,t,undefined,true);return r.template(s)}if(e==null||typeof e!=="string"&&e.constructor!==r.AST.ProgramNode){throw new n("You must pass a string or Handlebars AST to Handlebars.compile. You passed "+e)}t=t||{};if(!("data"in t)){t.data=true}var i;return function(e,t){if(!i){i=s()}return i.call(this,e,t)}}var t={};var n=e;t.Compiler=r;r.prototype={compiler:r,disassemble:function(){var e=this.opcodes,t,n=[],r,i;for(var s=0,o=e.length;s<o;s++){t=e[s];if(t.opcode==="DECLARE"){n.push("DECLARE "+t.name+"="+t.value)}else{r=[];for(var u=0;u<t.args.length;u++){i=t.args[u];if(typeof i==="string"){i='"'+i.replace("\n","\\n")+'"'}r.push(i)}n.push(t.opcode+" "+r.join(" "))}}return n.join("\n")},equals:function(e){var t=this.opcodes.length;if(e.opcodes.length!==t){return false}for(var n=0;n<t;n++){var r=this.opcodes[n],i=e.opcodes[n];if(r.opcode!==i.opcode||r.args.length!==i.args.length){return false}for(var s=0;s<r.args.length;s++){if(r.args[s]!==i.args[s]){return false}}}t=this.children.length;if(e.children.length!==t){return false}for(n=0;n<t;n++){if(!this.children[n].equals(e.children[n])){return false}}return true},guid:0,compile:function(e,t){this.opcodes=[];this.children=[];this.depths={list:[]};this.options=t;var n=this.options.knownHelpers;this.options.knownHelpers={helperMissing:true,blockHelperMissing:true,each:true,"if":true,unless:true,"with":true,log:true};if(n){for(var r in n){this.options.knownHelpers[r]=n[r]}}return this.accept(e)},accept:function(e){var t=e.strip||{},n;if(t.left){this.opcode("strip")}n=this[e.type](e);if(t.right){this.opcode("strip")}return n},program:function(e){var t=e.statements;for(var n=0,r=t.length;n<r;n++){this.accept(t[n])}this.isSimple=r===1;this.depths.list=this.depths.list.sort(function(e,t){return e-t});return this},compileProgram:function(e){var t=(new this.compiler).compile(e,this.options);var n=this.guid++,r;this.usePartial=this.usePartial||t.usePartial;this.children[n]=t;for(var i=0,s=t.depths.list.length;i<s;i++){r=t.depths.list[i];if(r<2){continue}else{this.addDepth(r-1)}}return n},block:function(e){var t=e.mustache,n=e.program,r=e.inverse;if(n){n=this.compileProgram(n)}if(r){r=this.compileProgram(r)}var i=t.sexpr;var s=this.classifySexpr(i);if(s==="helper"){this.helperSexpr(i,n,r)}else if(s==="simple"){this.simpleSexpr(i);this.opcode("pushProgram",n);this.opcode("pushProgram",r);this.opcode("emptyHash");this.opcode("blockValue")}else{this.ambiguousSexpr(i,n,r);this.opcode("pushProgram",n);this.opcode("pushProgram",r);this.opcode("emptyHash");this.opcode("ambiguousBlockValue")}this.opcode("append")},hash:function(e){var t=e.pairs,n,r;this.opcode("pushHash");for(var i=0,s=t.length;i<s;i++){n=t[i];r=n[1];if(this.options.stringParams){if(r.depth){this.addDepth(r.depth)}this.opcode("getContext",r.depth||0);this.opcode("pushStringParam",r.stringModeValue,r.type);if(r.type==="sexpr"){this.sexpr(r)}}else{this.accept(r)}this.opcode("assignToHash",n[0])}this.opcode("popHash")},partial:function(e){var t=e.partialName;this.usePartial=true;if(e.context){this.ID(e.context)}else{this.opcode("push","depth0")}this.opcode("invokePartial",t.name);this.opcode("append")},content:function(e){this.opcode("appendContent",e.string)},mustache:function(e){this.sexpr(e.sexpr);if(e.escaped&&!this.options.noEscape){this.opcode("appendEscaped")}else{this.opcode("append")}},ambiguousSexpr:function(e,t,n){var r=e.id,i=r.parts[0],s=t!=null||n!=null;this.opcode("getContext",r.depth);this.opcode("pushProgram",t);this.opcode("pushProgram",n);this.opcode("invokeAmbiguous",i,s)},simpleSexpr:function(e){var t=e.id;if(t.type==="DATA"){this.DATA(t)}else if(t.parts.length){this.ID(t)}else{this.addDepth(t.depth);this.opcode("getContext",t.depth);this.opcode("pushContext")}this.opcode("resolvePossibleLambda")},helperSexpr:function(e,t,r){var i=this.setupFullMustacheParams(e,t,r),s=e.id.parts[0];if(this.options.knownHelpers[s]){this.opcode("invokeKnownHelper",i.length,s)}else if(this.options.knownHelpersOnly){throw new n("You specified knownHelpersOnly, but used the unknown helper "+s,e)}else{this.opcode("invokeHelper",i.length,s,e.isRoot)}},sexpr:function(e){var t=this.classifySexpr(e);if(t==="simple"){this.simpleSexpr(e)}else if(t==="helper"){this.helperSexpr(e)}else{this.ambiguousSexpr(e)}},ID:function(e){this.addDepth(e.depth);this.opcode("getContext",e.depth);var t=e.parts[0];if(!t){this.opcode("pushContext")}else{this.opcode("lookupOnContext",e.parts[0])}for(var n=1,r=e.parts.length;n<r;n++){this.opcode("lookup",e.parts[n])}},DATA:function(e){this.options.data=true;if(e.id.isScoped||e.id.depth){throw new n("Scoped data references are not supported: "+e.original,e)}this.opcode("lookupData");var t=e.id.parts;for(var r=0,i=t.length;r<i;r++){this.opcode("lookup",t[r])}},STRING:function(e){this.opcode("pushString",e.string)},INTEGER:function(e){this.opcode("pushLiteral",e.integer)},BOOLEAN:function(e){this.opcode("pushLiteral",e.bool)},comment:function(){},opcode:function(e){this.opcodes.push({opcode:e,args:[].slice.call(arguments,1)})},declare:function(e,t){this.opcodes.push({opcode:"DECLARE",name:e,value:t})},addDepth:function(e){if(e===0){return}if(!this.depths[e]){this.depths[e]=true;this.depths.list.push(e)}},classifySexpr:function(e){var t=e.isHelper;var n=e.eligibleHelper;var r=this.options;if(n&&!t){var i=e.id.parts[0];if(r.knownHelpers[i]){t=true}else if(r.knownHelpersOnly){n=false}}if(t){return"helper"}else if(n){return"ambiguous"}else{return"simple"}},pushParams:function(e){var t=e.length,n;while(t--){n=e[t];if(this.options.stringParams){if(n.depth){this.addDepth(n.depth)}this.opcode("getContext",n.depth||0);this.opcode("pushStringParam",n.stringModeValue,n.type);if(n.type==="sexpr"){this.sexpr(n)}}else{this[n.type](n)}}},setupFullMustacheParams:function(e,t,n){var r=e.params;this.pushParams(r);this.opcode("pushProgram",t);this.opcode("pushProgram",n);if(e.hash){this.hash(e.hash)}else{this.opcode("emptyHash")}return r}};t.precompile=i;t.compile=s;return t}(n);var l=function(e,t){"use strict";function u(e){this.value=e}function a(){}var n;var r=e.COMPILER_REVISION;var i=e.REVISION_CHANGES;var s=e.log;var o=t;a.prototype={nameLookup:function(e,t){var n,r;if(e.indexOf("depth")===0){n=true}if(/^[0-9]+$/.test(t)){r=e+"["+t+"]"}else if(a.isValidJavaScriptVariableName(t)){r=e+"."+t}else{r=e+"['"+t+"']"}if(n){return"("+e+" && "+r+")"}else{return r}},compilerInfo:function(){var e=r,t=i[e];return"this.compilerInfo = ["+e+",'"+t+"'];\n"},appendToBuffer:function(e){if(this.environment.isSimple){return"return "+e+";"}else{return{appendToBuffer:true,content:e,toString:function(){return"buffer += "+e+";"}}}},initializeBuffer:function(){return this.quotedString("")},namespace:"Handlebars",compile:function(e,t,n,r){this.environment=e;this.options=t||{};s("debug",this.environment.disassemble()+"\n\n");this.name=this.environment.name;this.isChild=!!n;this.context=n||{programs:[],environments:[],aliases:{}};this.preamble();this.stackSlot=0;this.stackVars=[];this.registers={list:[]};this.hashes=[];this.compileStack=[];this.inlineStack=[];this.compileChildren(e,t);var i=e.opcodes,u;this.i=0;for(var a=i.length;this.i<a;this.i++){u=i[this.i];if(u.opcode==="DECLARE"){this[u.name]=u.value}else{this[u.opcode].apply(this,u.args)}if(u.opcode!==this.stripNext){this.stripNext=false}}this.pushSource("");if(this.stackSlot||this.inlineStack.length||this.compileStack.length){throw new o("Compile completed with content left on stack")}return this.createFunctionContext(r)},preamble:function(){var e=[];if(!this.isChild){var t=this.namespace;var n="helpers = this.merge(helpers, "+t+".helpers);";if(this.environment.usePartial){n=n+" partials = this.merge(partials, "+t+".partials);"}if(this.options.data){n=n+" data = data || {};"}e.push(n)}else{e.push("")}if(!this.environment.isSimple){e.push(", buffer = "+this.initializeBuffer())}else{e.push("")}this.lastContext=0;this.source=e},createFunctionContext:function(e){var t=this.stackVars.concat(this.registers.list);if(t.length>0){this.source[1]=this.source[1]+", "+t.join(", ")}if(!this.isChild){for(var n in this.context.aliases){if(this.context.aliases.hasOwnProperty(n)){this.source[1]=this.source[1]+", "+n+"="+this.context.aliases[n]}}}if(this.source[1]){this.source[1]="var "+this.source[1].substring(2)+";"}if(!this.isChild){this.source[1]+="\n"+this.context.programs.join("\n")+"\n"}if(!this.environment.isSimple){this.pushSource("return buffer;")}var r=this.isChild?["depth0","data"]:["Handlebars","depth0","helpers","partials","data"];for(var i=0,o=this.environment.depths.list.length;i<o;i++){r.push("depth"+this.environment.depths.list[i])}var u=this.mergeSource();if(!this.isChild){u=this.compilerInfo()+u}if(e){r.push(u);return Function.apply(this,r)}else{var a="function "+(this.name||"")+"("+r.join(",")+") {\n  "+u+"}";s("debug",a+"\n\n");return a}},mergeSource:function(){var e="",t;for(var n=0,r=this.source.length;n<r;n++){var i=this.source[n];if(i.appendToBuffer){if(t){t=t+"\n    + "+i.content}else{t=i.content}}else{if(t){e+="buffer += "+t+";\n  ";t=undefined}e+=i+"\n  "}}return e},blockValue:function(){this.context.aliases.blockHelperMissing="helpers.blockHelperMissing";var e=["depth0"];this.setupParams(0,e);this.replaceStack(function(t){e.splice(1,0,t);return"blockHelperMissing.call("+e.join(", ")+")"})},ambiguousBlockValue:function(){this.context.aliases.blockHelperMissing="helpers.blockHelperMissing";var e=["depth0"];this.setupParams(0,e);var t=this.topStack();e.splice(1,0,t);this.pushSource("if (!"+this.lastHelper+") { "+t+" = blockHelperMissing.call("+e.join(", ")+"); }")},appendContent:function(e){if(this.pendingContent){e=this.pendingContent+e}if(this.stripNext){e=e.replace(/^\s+/,"")}this.pendingContent=e},strip:function(){if(this.pendingContent){this.pendingContent=this.pendingContent.replace(/\s+$/,"")}this.stripNext="strip"},append:function(){this.flushInline();var e=this.popStack();this.pushSource("if("+e+" || "+e+" === 0) { "+this.appendToBuffer(e)+" }");if(this.environment.isSimple){this.pushSource("else { "+this.appendToBuffer("''")+" }")}},appendEscaped:function(){this.context.aliases.escapeExpression="this.escapeExpression";this.pushSource(this.appendToBuffer("escapeExpression("+this.popStack()+")"))},getContext:function(e){if(this.lastContext!==e){this.lastContext=e}},lookupOnContext:function(e){this.push(this.nameLookup("depth"+this.lastContext,e,"context"))},pushContext:function(){this.pushStackLiteral("depth"+this.lastContext)},resolvePossibleLambda:function(){this.context.aliases.functionType='"function"';this.replaceStack(function(e){return"typeof "+e+" === functionType ? "+e+".apply(depth0) : "+e})},lookup:function(e){this.replaceStack(function(t){return t+" == null || "+t+" === false ? "+t+" : "+this.nameLookup(t,e,"context")})},lookupData:function(){this.pushStackLiteral("data")},pushStringParam:function(e,t){this.pushStackLiteral("depth"+this.lastContext);this.pushString(t);if(t!=="sexpr"){if(typeof e==="string"){this.pushString(e)}else{this.pushStackLiteral(e)}}},emptyHash:function(){this.pushStackLiteral("{}");if(this.options.stringParams){this.push("{}");this.push("{}")}},pushHash:function(){if(this.hash){this.hashes.push(this.hash)}this.hash={values:[],types:[],contexts:[]}},popHash:function(){var e=this.hash;this.hash=this.hashes.pop();if(this.options.stringParams){this.push("{"+e.contexts.join(",")+"}");this.push("{"+e.types.join(",")+"}")}this.push("{\n    "+e.values.join(",\n    ")+"\n  }")},pushString:function(e){this.pushStackLiteral(this.quotedString(e))},push:function(e){this.inlineStack.push(e);return e},pushLiteral:function(e){this.pushStackLiteral(e)},pushProgram:function(e){if(e!=null){this.pushStackLiteral(this.programExpression(e))}else{this.pushStackLiteral(null)}},invokeHelper:function(e,t,n){this.context.aliases.helperMissing="helpers.helperMissing";this.useRegister("helper");var r=this.lastHelper=this.setupHelper(e,t,true);var i=this.nameLookup("depth"+this.lastContext,t,"context");var s="helper = "+r.name+" || "+i;if(r.paramsInit){s+=","+r.paramsInit}this.push("("+s+",helper "+"? helper.call("+r.callParams+") "+": helperMissing.call("+r.helperMissingParams+"))");if(!n){this.flushInline()}},invokeKnownHelper:function(e,t){var n=this.setupHelper(e,t);this.push(n.name+".call("+n.callParams+")")},invokeAmbiguous:function(e,t){this.context.aliases.functionType='"function"';this.useRegister("helper");this.emptyHash();var n=this.setupHelper(0,e,t);var r=this.lastHelper=this.nameLookup("helpers",e,"helper");var i=this.nameLookup("depth"+this.lastContext,e,"context");var s=this.nextStack();if(n.paramsInit){this.pushSource(n.paramsInit)}this.pushSource("if (helper = "+r+") { "+s+" = helper.call("+n.callParams+"); }");this.pushSource("else { helper = "+i+"; "+s+" = typeof helper === functionType ? helper.call("+n.callParams+") : helper; }")},invokePartial:function(e){var t=[this.nameLookup("partials",e,"partial"),"'"+e+"'",this.popStack(),"helpers","partials"];if(this.options.data){t.push("data")}this.context.aliases.self="this";this.push("self.invokePartial("+t.join(", ")+")")},assignToHash:function(e){var t=this.popStack(),n,r;if(this.options.stringParams){r=this.popStack();n=this.popStack()}var i=this.hash;if(n){i.contexts.push("'"+e+"': "+n)}if(r){i.types.push("'"+e+"': "+r)}i.values.push("'"+e+"': ("+t+")")},compiler:a,compileChildren:function(e,t){var n=e.children,r,i;for(var s=0,o=n.length;s<o;s++){r=n[s];i=new this.compiler;var u=this.matchExistingProgram(r);if(u==null){this.context.programs.push("");u=this.context.programs.length;r.index=u;r.name="program"+u;this.context.programs[u]=i.compile(r,t,this.context);this.context.environments[u]=r}else{r.index=u;r.name="program"+u}}},matchExistingProgram:function(e){for(var t=0,n=this.context.environments.length;t<n;t++){var r=this.context.environments[t];if(r&&r.equals(e)){return t}}},programExpression:function(e){this.context.aliases.self="this";if(e==null){return"self.noop"}var t=this.environment.children[e],n=t.depths.list,r;var i=[t.index,t.name,"data"];for(var s=0,o=n.length;s<o;s++){r=n[s];if(r===1){i.push("depth0")}else{i.push("depth"+(r-1))}}return(n.length===0?"self.program(":"self.programWithDepth(")+i.join(", ")+")"},register:function(e,t){this.useRegister(e);this.pushSource(e+" = "+t+";")},useRegister:function(e){if(!this.registers[e]){this.registers[e]=true;this.registers.list.push(e)}},pushStackLiteral:function(e){return this.push(new u(e))},pushSource:function(e){if(this.pendingContent){this.source.push(this.appendToBuffer(this.quotedString(this.pendingContent)));this.pendingContent=undefined}if(e){this.source.push(e)}},pushStack:function(e){this.flushInline();var t=this.incrStack();if(e){this.pushSource(t+" = "+e+";")}this.compileStack.push(t);return t},replaceStack:function(e){var t="",n=this.isInline(),r,i,s;if(n){var o=this.popStack(true);if(o instanceof u){r=o.value;s=true}else{i=!this.stackSlot;var a=!i?this.topStackName():this.incrStack();t="("+this.push(a)+" = "+o+"),";r=this.topStack()}}else{r=this.topStack()}var f=e.call(this,r);if(n){if(!s){this.popStack()}if(i){this.stackSlot--}this.push("("+t+f+")")}else{if(!/^stack/.test(r)){r=this.nextStack()}this.pushSource(r+" = ("+t+f+");")}return r},nextStack:function(){return this.pushStack()},incrStack:function(){this.stackSlot++;if(this.stackSlot>this.stackVars.length){this.stackVars.push("stack"+this.stackSlot)}return this.topStackName()},topStackName:function(){return"stack"+this.stackSlot},flushInline:function(){var e=this.inlineStack;if(e.length){this.inlineStack=[];for(var t=0,n=e.length;t<n;t++){var r=e[t];if(r instanceof u){this.compileStack.push(r)}else{this.pushStack(r)}}}},isInline:function(){return this.inlineStack.length},popStack:function(e){var t=this.isInline(),n=(t?this.inlineStack:this.compileStack).pop();if(!e&&n instanceof u){return n.value}else{if(!t){if(!this.stackSlot){throw new o("Invalid stack pop")}this.stackSlot--}return n}},topStack:function(e){var t=this.isInline()?this.inlineStack:this.compileStack,n=t[t.length-1];if(!e&&n instanceof u){return n.value}else{return n}},quotedString:function(e){return'"'+e.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")+'"'},setupHelper:function(e,t,n){var r=[],i=this.setupParams(e,r,n);var s=this.nameLookup("helpers",t,"helper");return{params:r,paramsInit:i,name:s,callParams:["depth0"].concat(r).join(", "),helperMissingParams:n&&["depth0",this.quotedString(t)].concat(r).join(", ")}},setupOptions:function(e,t){var n=[],r=[],i=[],s,o,u;n.push("hash:"+this.popStack());if(this.options.stringParams){n.push("hashTypes:"+this.popStack());n.push("hashContexts:"+this.popStack())}o=this.popStack();u=this.popStack();if(u||o){if(!u){this.context.aliases.self="this";u="self.noop"}if(!o){this.context.aliases.self="this";o="self.noop"}n.push("inverse:"+o);n.push("fn:"+u)}for(var a=0;a<e;a++){s=this.popStack();t.push(s);if(this.options.stringParams){i.push(this.popStack());r.push(this.popStack())}}if(this.options.stringParams){n.push("contexts:["+r.join(",")+"]");n.push("types:["+i.join(",")+"]")}if(this.options.data){n.push("data:data")}return n},setupParams:function(e,t,n){var r="{"+this.setupOptions(e,t).join(",")+"}";if(n){this.useRegister("options");t.push("options");return"options="+r}else{t.push(r);return""}}};var f=("break else new var"+" case finally return void"+" catch for switch while"+" continue function this with"+" default if throw"+" delete in try"+" do instanceof typeof"+" abstract enum int short"+" boolean export interface static"+" byte extends long super"+" char final native synchronized"+" class float package throws"+" const goto private transient"+" debugger implements protected volatile"+" double import public let yield").split(" ");var l=a.RESERVED_WORDS={};for(var c=0,h=f.length;c<h;c++){l[f[c]]=true}a.isValidJavaScriptVariableName=function(e){if(!a.RESERVED_WORDS[e]&&/^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(e)){return true}return false};n=a;return n}(r,n);var c=function(e,t,n,r,i){"use strict";var s;var o=e;var u=t;var a=n.parser;var f=n.parse;var l=r.Compiler;var c=r.compile;var h=r.precompile;var p=i;var d=o.create;var v=function(){var e=d();e.compile=function(t,n){return c(t,n,e)};e.precompile=function(t,n){return h(t,n,e)};e.AST=u;e.Compiler=l;e.JavaScriptCompiler=p;e.Parser=a;e.parse=f;return e};o=v();o.create=v;s=o;return s}(s,o,a,f,l);return c}();


/*****************  Handlebars Helpers ********************/
(function(){"use strict";function a(a){var b,c,d,e,f=Array.prototype.slice.call(arguments,1);for(b=0,c=f.length;c>b;b+=1)if(d=f[b])for(e in d)p.call(d,e)&&(a[e]=d[e]);return a}function b(a,b,c){this.locales=a,this.formats=b,this.pluralFn=c}function c(a){this.id=a}function d(a,b,c,d,e){this.id=a,this.useOrdinal=b,this.offset=c,this.options=d,this.pluralFn=e}function e(a,b,c,d){this.id=a,this.offset=b,this.numberFormat=c,this.string=d}function f(a,b){this.id=a,this.options=b}function g(a,b,c){var d="string"==typeof a?g.__parse(a):a;if(!d||"messageFormatPattern"!==d.type)throw new TypeError("A message must be provided as a String or AST.");c=this._mergeFormats(g.formats,c),r(this,"_locale",{value:this._resolveLocale(b)});var e=this._findPluralRuleFunction(this._locale),f=this._compilePattern(d,b,c,e),h=this;this.format=function(a){return h._format(f,a)}}function h(a){return 400*a/146097}function i(a,b){b=b||{},G(a)&&(a=a.concat()),D(this,"_locale",{value:this._resolveLocale(a)}),D(this,"_options",{value:{style:this._resolveStyle(b.style),units:this._isValidUnits(b.units)&&b.units}}),D(this,"_locales",{value:a}),D(this,"_fields",{value:this._findFields(this._locale)}),D(this,"_messages",{value:E(null)});var c=this;this.format=function(a,b){return c._format(a,b)}}function j(a){var b=R(null);return function(){var c=Array.prototype.slice.call(arguments),d=k(c),e=d&&b[d];return e||(e=new(N.apply(a,[null].concat(c))),d&&(b[d]=e)),e}}function k(a){if("undefined"!=typeof JSON){var b,c,d,e=[];for(b=0,c=a.length;c>b;b+=1)d=a[b],e.push(d&&"object"==typeof d?l(d):d);return JSON.stringify(e)}}function l(a){var b,c,d,e,f=[],g=[];for(b in a)a.hasOwnProperty(b)&&g.push(b);var h=g.sort();for(c=0,d=h.length;d>c;c+=1)b=h[c],e={},e[b]=a[b],f[c]=e;return f}function m(a){var b,c,d,e,f=Array.prototype.slice.call(arguments,1);for(b=0,c=f.length;c>b;b+=1)if(d=f[b])for(e in d)d.hasOwnProperty(e)&&(a[e]=d[e]);return a}function n(a){function b(a,b){return function(){return"undefined"!=typeof console&&"function"==typeof console.warn&&console.warn("+a+ is deprecated, use: +b.name+"),b.apply(this,arguments)}}function c(a){if(!a.fn)throw new Error(" must be invoked as a block helper");var b=p(a.data),c=m({},b.intl,a.hash);return b.intl=c,a.fn(this,{data:b})}function d(a,b){var c,d,e,f=b.data&&b.data.intl,g=a.split(".");try{for(e=0,d=g.length;d>e;e++)c=f=f[g[e]]}finally{if(void 0===c)throw new ReferenceError("Could not find Intl object: "+a)}return c}function e(a,b,c){a=new Date(a),k(a,"A date or timestamp must be provided to "),c||(c=b,b=null);var d=c.data.intl&&c.data.intl.locales,e=n("date",b,c);return U(d,e).format(a)}function f(a,b,c){a=new Date(a),k(a,"A date or timestamp must be provided to "),c||(c=b,b=null);var d=c.data.intl&&c.data.intl.locales,e=n("time",b,c);return U(d,e).format(a)}function g(a,b,c){a=new Date(a),k(a,"A date or timestamp must be provided to "),c||(c=b,b=null);var d=c.data.intl&&c.data.intl.locales,e=n("relative",b,c),f=c.hash.now;return delete e.now,W(d,e).format(a,{now:f})}function h(a,b,c){l(a,"A number must be provided to "),c||(c=b,b=null);var d=c.data.intl&&c.data.intl.locales,e=n("number",b,c);return T(d,e).format(a)}function i(a,b){b||(b=a,a=null);var c=b.hash;if(!a&&"string"!=typeof a&&!c.intlName)throw new ReferenceError(" must be provided a message or intlName");var e=b.data.intl||{},f=e.locales,g=e.formats;return!a&&c.intlName&&(a=d(c.intlName,b)),"function"==typeof a?a(c):("string"==typeof a&&(a=V(a,f,g)),a.format(c))}function j(){var a,b,c=[].slice.call(arguments).pop(),d=c.hash;for(a in d)d.hasOwnProperty(a)&&(b=d[a],"string"==typeof b&&(d[a]=q(b)));return new o(String(i.apply(this,arguments)))}function k(a,b){if(!isFinite(a))throw new TypeError(b)}function l(a,b){if("number"!=typeof a)throw new TypeError(b)}function n(a,b,c){var e,f=c.hash;return b?("string"==typeof b&&(e=d("formats."+a+"."+b,c)),e=m({},e,f)):e=f,e}var o=a.SafeString,p=a.createFrame,q=a.Utils.escapeExpression,r={intl:c,intlGet:d,formatDate:e,formatTime:f,formatRelative:g,formatNumber:h,formatMessage:i,formatHTMLMessage:j,intlDate:b("intlDate",e),intlTime:b("intlTime",f),intlNumber:b("intlNumber",h),intlMessage:b("intlMessage",i),intlHTMLMessage:b("intlHTMLMessage",j)};for(var s in r)r.hasOwnProperty(s)&&a.registerHelper(s,r[s])}function o(a){x.__addLocaleData(a),M.__addLocaleData(a)}var p=Object.prototype.hasOwnProperty,q=function(){try{return!!Object.defineProperty({},"a",{})}catch(a){return!1}}(),r=(!q&&!Object.prototype.__defineGetter__,q?Object.defineProperty:function(a,b,c){"get"in c&&a.__defineGetter__?a.__defineGetter__(b,c.get):(!p.call(a,b)||"value"in c)&&(a[b]=c.value)}),s=Object.create||function(a,b){function c(){}var d,e;c.prototype=a,d=new c;for(e in b)p.call(b,e)&&r(d,e,b[e]);return d},t=b;b.prototype.compile=function(a){return this.pluralStack=[],this.currentPlural=null,this.pluralNumberFormat=null,this.compileMessage(a)},b.prototype.compileMessage=function(a){if(!a||"messageFormatPattern"!==a.type)throw new Error('Message AST is not of type: "messageFormatPattern"');var b,c,d,e=a.elements,f=[];for(b=0,c=e.length;c>b;b+=1)switch(d=e[b],d.type){case"messageTextElement":f.push(this.compileMessageText(d));break;case"argumentElement":f.push(this.compileArgument(d));break;default:throw new Error("Message element does not have a valid type")}return f},b.prototype.compileMessageText=function(a){return this.currentPlural&&/(^|[^\\])#/g.test(a.value)?(this.pluralNumberFormat||(this.pluralNumberFormat=new Intl.NumberFormat(this.locales)),new e(this.currentPlural.id,this.currentPlural.format.offset,this.pluralNumberFormat,a.value)):a.value.replace(/\\#/g,"#")},b.prototype.compileArgument=function(a){var b=a.format;if(!b)return new c(a.id);var e,g=this.formats,h=this.locales,i=this.pluralFn;switch(b.type){case"numberFormat":return e=g.number[b.style],{id:a.id,format:new Intl.NumberFormat(h,e).format};case"dateFormat":return e=g.date[b.style],{id:a.id,format:new Intl.DateTimeFormat(h,e).format};case"timeFormat":return e=g.time[b.style],{id:a.id,format:new Intl.DateTimeFormat(h,e).format};case"pluralFormat":return e=this.compileOptions(a),new d(a.id,b.ordinal,b.offset,e,i);case"selectFormat":return e=this.compileOptions(a),new f(a.id,e);default:throw new Error("Message element does not have a valid format type")}},b.prototype.compileOptions=function(a){var b=a.format,c=b.options,d={};this.pluralStack.push(this.currentPlural),this.currentPlural="pluralFormat"===b.type?a:null;var e,f,g;for(e=0,f=c.length;f>e;e+=1)g=c[e],d[g.selector]=this.compileMessage(g.value);return this.currentPlural=this.pluralStack.pop(),d},c.prototype.format=function(a){return a?"string"==typeof a?a:String(a):""},d.prototype.getOption=function(a){var b=this.options,c=b["="+a]||b[this.pluralFn(a-this.offset,this.useOrdinal)];return c||b.other},e.prototype.format=function(a){var b=this.numberFormat.format(a-this.offset);return this.string.replace(/(^|[^\\])#/g,"$1"+b).replace(/\\#/g,"#")},f.prototype.getOption=function(a){var b=this.options;return b[a]||b.other};var u=function(){function a(a,b){function c(){this.constructor=a}c.prototype=b.prototype,a.prototype=new c}function b(a,b,c,d,e,f){this.message=a,this.expected=b,this.found=c,this.offset=d,this.line=e,this.column=f,this.name="SyntaxError"}function c(a){function c(b){function c(b,c,d){var e,f;for(e=c;d>e;e++)f=a.charAt(e),"\n"===f?(b.seenCR||b.line++,b.column=1,b.seenCR=!1):"\r"===f||"\u2028"===f||"\u2029"===f?(b.line++,b.column=1,b.seenCR=!0):(b.column++,b.seenCR=!1)}return Ua!==b&&(Ua>b&&(Ua=0,Va={line:1,column:1,seenCR:!1}),c(Va,Ua,b),Ua=b),Va}function d(a){Wa>Sa||(Sa>Wa&&(Wa=Sa,Xa=[]),Xa.push(a))}function e(d,e,f){function g(a){var b=1;for(a.sort(function(a,b){return a.description<b.description?-1:a.description>b.description?1:0});b<a.length;)a[b-1]===a[b]?a.splice(b,1):b++}function h(a,b){function c(a){function b(a){return a.charCodeAt(0).toString(16).toUpperCase()}return a.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\x08/g,"\\b").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\f/g,"\\f").replace(/\r/g,"\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g,function(a){return"\\x0"+b(a)}).replace(/[\x10-\x1F\x80-\xFF]/g,function(a){return"\\x"+b(a)}).replace(/[\u0180-\u0FFF]/g,function(a){return"\\u0"+b(a)}).replace(/[\u1080-\uFFFF]/g,function(a){return"\\u"+b(a)})}var d,e,f,g=new Array(a.length);for(f=0;f<a.length;f++)g[f]=a[f].description;return d=a.length>1?g.slice(0,-1).join(", ")+" or "+g[a.length-1]:g[0],e=b?'"'+c(b)+'"':"end of input","Expected "+d+" but "+e+" found."}var i=c(f),j=f<a.length?a.charAt(f):null;return null!==e&&g(e),new b(null!==d?d:h(e,j),e,j,f,i.line,i.column)}function f(){var a;return a=g()}function g(){var a,b,c;for(a=Sa,b=[],c=h();c!==E;)b.push(c),c=h();return b!==E&&(Ta=a,b=H(b)),a=b}function h(){var a;return a=j(),a===E&&(a=l()),a}function i(){var b,c,d,e,f,g;if(b=Sa,c=[],d=Sa,e=w(),e!==E?(f=B(),f!==E?(g=w(),g!==E?(e=[e,f,g],d=e):(Sa=d,d=I)):(Sa=d,d=I)):(Sa=d,d=I),d!==E)for(;d!==E;)c.push(d),d=Sa,e=w(),e!==E?(f=B(),f!==E?(g=w(),g!==E?(e=[e,f,g],d=e):(Sa=d,d=I)):(Sa=d,d=I)):(Sa=d,d=I);else c=I;return c!==E&&(Ta=b,c=J(c)),b=c,b===E&&(b=Sa,c=v(),c!==E&&(c=a.substring(b,Sa)),b=c),b}function j(){var a,b;return a=Sa,b=i(),b!==E&&(Ta=a,b=K(b)),a=b}function k(){var b,c,e;if(b=z(),b===E){if(b=Sa,c=[],L.test(a.charAt(Sa))?(e=a.charAt(Sa),Sa++):(e=E,0===Ya&&d(M)),e!==E)for(;e!==E;)c.push(e),L.test(a.charAt(Sa))?(e=a.charAt(Sa),Sa++):(e=E,0===Ya&&d(M));else c=I;c!==E&&(c=a.substring(b,Sa)),b=c}return b}function l(){var b,c,e,f,g,h,i,j,l;return b=Sa,123===a.charCodeAt(Sa)?(c=N,Sa++):(c=E,0===Ya&&d(O)),c!==E?(e=w(),e!==E?(f=k(),f!==E?(g=w(),g!==E?(h=Sa,44===a.charCodeAt(Sa)?(i=Q,Sa++):(i=E,0===Ya&&d(R)),i!==E?(j=w(),j!==E?(l=m(),l!==E?(i=[i,j,l],h=i):(Sa=h,h=I)):(Sa=h,h=I)):(Sa=h,h=I),h===E&&(h=P),h!==E?(i=w(),i!==E?(125===a.charCodeAt(Sa)?(j=S,Sa++):(j=E,0===Ya&&d(T)),j!==E?(Ta=b,c=U(f,h),b=c):(Sa=b,b=I)):(Sa=b,b=I)):(Sa=b,b=I)):(Sa=b,b=I)):(Sa=b,b=I)):(Sa=b,b=I)):(Sa=b,b=I),b}function m(){var a;return a=n(),a===E&&(a=o(),a===E&&(a=p(),a===E&&(a=q()))),a}function n(){var b,c,e,f,g,h,i;return b=Sa,a.substr(Sa,6)===V?(c=V,Sa+=6):(c=E,0===Ya&&d(W)),c===E&&(a.substr(Sa,4)===X?(c=X,Sa+=4):(c=E,0===Ya&&d(Y)),c===E&&(a.substr(Sa,4)===Z?(c=Z,Sa+=4):(c=E,0===Ya&&d($)))),c!==E?(e=w(),e!==E?(f=Sa,44===a.charCodeAt(Sa)?(g=Q,Sa++):(g=E,0===Ya&&d(R)),g!==E?(h=w(),h!==E?(i=B(),i!==E?(g=[g,h,i],f=g):(Sa=f,f=I)):(Sa=f,f=I)):(Sa=f,f=I),f===E&&(f=P),f!==E?(Ta=b,c=_(c,f),b=c):(Sa=b,b=I)):(Sa=b,b=I)):(Sa=b,b=I),b}function o(){var b,c,e,f,g,h;return b=Sa,a.substr(Sa,6)===aa?(c=aa,Sa+=6):(c=E,0===Ya&&d(ba)),c!==E?(e=w(),e!==E?(44===a.charCodeAt(Sa)?(f=Q,Sa++):(f=E,0===Ya&&d(R)),f!==E?(g=w(),g!==E?(h=u(),h!==E?(Ta=b,c=ca(h),b=c):(Sa=b,b=I)):(Sa=b,b=I)):(Sa=b,b=I)):(Sa=b,b=I)):(Sa=b,b=I),b}function p(){var b,c,e,f,g,h;return b=Sa,a.substr(Sa,13)===da?(c=da,Sa+=13):(c=E,0===Ya&&d(ea)),c!==E?(e=w(),e!==E?(44===a.charCodeAt(Sa)?(f=Q,Sa++):(f=E,0===Ya&&d(R)),f!==E?(g=w(),g!==E?(h=u(),h!==E?(Ta=b,c=fa(h),b=c):(Sa=b,b=I)):(Sa=b,b=I)):(Sa=b,b=I)):(Sa=b,b=I)):(Sa=b,b=I),b}function q(){var b,c,e,f,g,h,i;if(b=Sa,a.substr(Sa,6)===ga?(c=ga,Sa+=6):(c=E,0===Ya&&d(ha)),c!==E)if(e=w(),e!==E)if(44===a.charCodeAt(Sa)?(f=Q,Sa++):(f=E,0===Ya&&d(R)),f!==E)if(g=w(),g!==E){if(h=[],i=s(),i!==E)for(;i!==E;)h.push(i),i=s();else h=I;h!==E?(Ta=b,c=ia(h),b=c):(Sa=b,b=I)}else Sa=b,b=I;else Sa=b,b=I;else Sa=b,b=I;else Sa=b,b=I;return b}function r(){var b,c,e,f;return b=Sa,c=Sa,61===a.charCodeAt(Sa)?(e=ja,Sa++):(e=E,0===Ya&&d(ka)),e!==E?(f=z(),f!==E?(e=[e,f],c=e):(Sa=c,c=I)):(Sa=c,c=I),c!==E&&(c=a.substring(b,Sa)),b=c,b===E&&(b=B()),b}function s(){var b,c,e,f,h,i,j,k,l;return b=Sa,c=w(),c!==E?(e=r(),e!==E?(f=w(),f!==E?(123===a.charCodeAt(Sa)?(h=N,Sa++):(h=E,0===Ya&&d(O)),h!==E?(i=w(),i!==E?(j=g(),j!==E?(k=w(),k!==E?(125===a.charCodeAt(Sa)?(l=S,Sa++):(l=E,0===Ya&&d(T)),l!==E?(Ta=b,c=la(e,j),b=c):(Sa=b,b=I)):(Sa=b,b=I)):(Sa=b,b=I)):(Sa=b,b=I)):(Sa=b,b=I)):(Sa=b,b=I)):(Sa=b,b=I)):(Sa=b,b=I),b}function t(){var b,c,e,f;return b=Sa,a.substr(Sa,7)===ma?(c=ma,Sa+=7):(c=E,0===Ya&&d(na)),c!==E?(e=w(),e!==E?(f=z(),f!==E?(Ta=b,c=oa(f),b=c):(Sa=b,b=I)):(Sa=b,b=I)):(Sa=b,b=I),b}function u(){var a,b,c,d,e;if(a=Sa,b=t(),b===E&&(b=P),b!==E)if(c=w(),c!==E){if(d=[],e=s(),e!==E)for(;e!==E;)d.push(e),e=s();else d=I;d!==E?(Ta=a,b=pa(b,d),a=b):(Sa=a,a=I)}else Sa=a,a=I;else Sa=a,a=I;return a}function v(){var b,c;if(Ya++,b=[],ra.test(a.charAt(Sa))?(c=a.charAt(Sa),Sa++):(c=E,0===Ya&&d(sa)),c!==E)for(;c!==E;)b.push(c),ra.test(a.charAt(Sa))?(c=a.charAt(Sa),Sa++):(c=E,0===Ya&&d(sa));else b=I;return Ya--,b===E&&(c=E,0===Ya&&d(qa)),b}function w(){var b,c,e;for(Ya++,b=Sa,c=[],e=v();e!==E;)c.push(e),e=v();return c!==E&&(c=a.substring(b,Sa)),b=c,Ya--,b===E&&(c=E,0===Ya&&d(ta)),b}function x(){var b;return ua.test(a.charAt(Sa))?(b=a.charAt(Sa),Sa++):(b=E,0===Ya&&d(va)),b}function y(){var b;return wa.test(a.charAt(Sa))?(b=a.charAt(Sa),Sa++):(b=E,0===Ya&&d(xa)),b}function z(){var b,c,e,f,g,h;if(b=Sa,48===a.charCodeAt(Sa)?(c=ya,Sa++):(c=E,0===Ya&&d(za)),c===E){if(c=Sa,e=Sa,Aa.test(a.charAt(Sa))?(f=a.charAt(Sa),Sa++):(f=E,0===Ya&&d(Ba)),f!==E){for(g=[],h=x();h!==E;)g.push(h),h=x();g!==E?(f=[f,g],e=f):(Sa=e,e=I)}else Sa=e,e=I;e!==E&&(e=a.substring(c,Sa)),c=e}return c!==E&&(Ta=b,c=Ca(c)),b=c}function A(){var b,c,e,f,g,h,i,j;return Da.test(a.charAt(Sa))?(b=a.charAt(Sa),Sa++):(b=E,0===Ya&&d(Ea)),b===E&&(b=Sa,a.substr(Sa,2)===Fa?(c=Fa,Sa+=2):(c=E,0===Ya&&d(Ga)),c!==E&&(Ta=b,c=Ha()),b=c,b===E&&(b=Sa,a.substr(Sa,2)===Ia?(c=Ia,Sa+=2):(c=E,0===Ya&&d(Ja)),c!==E&&(Ta=b,c=Ka()),b=c,b===E&&(b=Sa,a.substr(Sa,2)===La?(c=La,Sa+=2):(c=E,0===Ya&&d(Ma)),c!==E&&(Ta=b,c=Na()),b=c,b===E&&(b=Sa,a.substr(Sa,2)===Oa?(c=Oa,Sa+=2):(c=E,0===Ya&&d(Pa)),c!==E?(e=Sa,f=Sa,g=y(),g!==E?(h=y(),h!==E?(i=y(),i!==E?(j=y(),j!==E?(g=[g,h,i,j],f=g):(Sa=f,f=I)):(Sa=f,f=I)):(Sa=f,f=I)):(Sa=f,f=I),f!==E&&(f=a.substring(e,Sa)),e=f,e!==E?(Ta=b,c=Qa(e),b=c):(Sa=b,b=I)):(Sa=b,b=I))))),b}function B(){var a,b,c;if(a=Sa,b=[],c=A(),c!==E)for(;c!==E;)b.push(c),c=A();else b=I;return b!==E&&(Ta=a,b=Ra(b)),a=b}var C,D=arguments.length>1?arguments[1]:{},E={},F={start:f},G=f,H=function(a){return{type:"messageFormatPattern",elements:a}},I=E,J=function(a){var b,c,d,e,f,g="";for(b=0,d=a.length;d>b;b+=1)for(e=a[b],c=0,f=e.length;f>c;c+=1)g+=e[c];return g},K=function(a){return{type:"messageTextElement",value:a}},L=/^[^ \t\n\r,.+={}#]/,M={type:"class",value:"[^ \\t\\n\\r,.+={}#]",description:"[^ \\t\\n\\r,.+={}#]"},N="{",O={type:"literal",value:"{",description:'"{"'},P=null,Q=",",R={type:"literal",value:",",description:'","'},S="}",T={type:"literal",value:"}",description:'"}"'},U=function(a,b){return{type:"argumentElement",id:a,format:b&&b[2]}},V="number",W={type:"literal",value:"number",description:'"number"'},X="date",Y={type:"literal",value:"date",description:'"date"'},Z="time",$={type:"literal",value:"time",description:'"time"'},_=function(a,b){return{type:a+"Format",style:b&&b[2]}},aa="plural",ba={type:"literal",value:"plural",description:'"plural"'},ca=function(a){return{type:a.type,ordinal:!1,offset:a.offset||0,options:a.options}},da="selectordinal",ea={type:"literal",value:"selectordinal",description:'"selectordinal"'},fa=function(a){return{type:a.type,ordinal:!0,offset:a.offset||0,options:a.options}},ga="select",ha={type:"literal",value:"select",description:'"select"'},ia=function(a){return{type:"selectFormat",options:a}},ja="=",ka={type:"literal",value:"=",description:'"="'},la=function(a,b){return{type:"optionalFormatPattern",selector:a,value:b}},ma="offset:",na={type:"literal",value:"offset:",description:'"offset:"'},oa=function(a){return a},pa=function(a,b){return{type:"pluralFormat",offset:a,options:b}},qa={type:"other",description:"whitespace"},ra=/^[ \t\n\r]/,sa={type:"class",value:"[ \\t\\n\\r]",description:"[ \\t\\n\\r]"},ta={type:"other",description:"optionalWhitespace"},ua=/^[0-9]/,va={type:"class",value:"[0-9]",description:"[0-9]"},wa=/^[0-9a-f]/i,xa={type:"class",value:"[0-9a-f]i",description:"[0-9a-f]i"},ya="0",za={type:"literal",value:"0",description:'"0"'},Aa=/^[1-9]/,Ba={type:"class",value:"[1-9]",description:"[1-9]"},Ca=function(a){return parseInt(a,10)},Da=/^[^{}\\\0-\x1F \t\n\r]/,Ea={type:"class",value:"[^{}\\\\\\0-\\x1F \\t\\n\\r]",description:"[^{}\\\\\\0-\\x1F \\t\\n\\r]"},Fa="\\#",Ga={type:"literal",value:"\\#",description:'"\\\\#"'},Ha=function(){return"\\#"},Ia="\\{",Ja={type:"literal",value:"\\{",description:'"\\\\{"'},Ka=function(){return"{"},La="\\}",Ma={type:"literal",value:"\\}",description:'"\\\\}"'},Na=function(){return"}"},Oa="\\u",Pa={type:"literal",value:"\\u",description:'"\\\\u"'},Qa=function(a){return String.fromCharCode(parseInt(a,16))},Ra=function(a){return a.join("")},Sa=0,Ta=0,Ua=0,Va={line:1,column:1,seenCR:!1},Wa=0,Xa=[],Ya=0;if("startRule"in D){if(!(D.startRule in F))throw new Error("Can't start parsing from rule \""+D.startRule+'".');G=F[D.startRule]}if(C=G(),C!==E&&Sa===a.length)return C;throw C!==E&&Sa<a.length&&d({type:"end",description:"end of input"}),e(null,Xa,Wa)}return a(b,Error),{SyntaxError:b,parse:c}}(),v=g;r(g,"formats",{enumerable:!0,value:{number:{currency:{style:"currency"},percent:{style:"percent"}},date:{"short":{month:"numeric",day:"numeric",year:"2-digit"},medium:{month:"short",day:"numeric",year:"numeric"},"long":{month:"long",day:"numeric",year:"numeric"},full:{weekday:"long",month:"long",day:"numeric",year:"numeric"}},time:{"short":{hour:"numeric",minute:"numeric"},medium:{hour:"numeric",minute:"numeric",second:"numeric"},"long":{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"},full:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"}}}}),r(g,"__localeData__",{value:s(null)}),r(g,"__addLocaleData",{value:function(a){if(!a||!a.locale)throw new Error("Locale data provided to IntlMessageFormat is missing a `locale` property");g.__localeData__[a.locale.toLowerCase()]=a}}),r(g,"__parse",{value:u.parse}),r(g,"defaultLocale",{enumerable:!0,writable:!0,value:void 0}),g.prototype.resolvedOptions=function(){return{locale:this._locale}},g.prototype._compilePattern=function(a,b,c,d){var e=new t(b,c,d);return e.compile(a)},g.prototype._findPluralRuleFunction=function(a){for(var b=g.__localeData__,c=b[a.toLowerCase()];c;){if(c.pluralRuleFunction)return c.pluralRuleFunction;c=c.parentLocale&&b[c.parentLocale.toLowerCase()]}throw new Error("Locale data added to IntlMessageFormat is missing a `pluralRuleFunction` for :"+a)},g.prototype._format=function(a,b){var c,d,e,f,g,h="";for(c=0,d=a.length;d>c;c+=1)if(e=a[c],"string"!=typeof e){if(f=e.id,!b||!p.call(b,f))throw new Error("A value must be provided for: "+f);g=b[f],h+=e.options?this._format(e.getOption(g),b):e.format(g)}else h+=e;return h},g.prototype._mergeFormats=function(b,c){var d,e,f={};for(d in b)p.call(b,d)&&(f[d]=e=s(b[d]),c&&p.call(c,d)&&a(e,c[d]));return f},g.prototype._resolveLocale=function(a){"string"==typeof a&&(a=[a]),a=(a||[]).concat(g.defaultLocale);var b,c,d,e,f=g.__localeData__;for(b=0,c=a.length;c>b;b+=1)for(d=a[b].toLowerCase().split("-");d.length;){if(e=f[d.join("-")])return e.locale;d.pop()}var h=a.pop();throw new Error("No locale data has been added to IntlMessageFormat for: "+a.join(", ")+", or the default locale: "+h)};var w={locale:"en",pluralRuleFunction:function(a,b){var c=String(a).split("."),d=!c[1],e=Number(c[0])==a,f=e&&c[0].slice(-1),g=e&&c[0].slice(-2);return b?1==f&&11!=g?"one":2==f&&12!=g?"two":3==f&&13!=g?"few":"other":1==a&&d?"one":"other"}};v.__addLocaleData(w),v.defaultLocale="en";var x=v,y=Math.round,z=function(a,b){a=+a,b=+b;var c=y(b-a),d=y(c/1e3),e=y(d/60),f=y(e/60),g=y(f/24),i=y(g/7),j=h(g),k=y(12*j),l=y(j);return{millisecond:c,second:d,minute:e,hour:f,day:g,week:i,month:k,year:l}},A=Object.prototype.hasOwnProperty,B=Object.prototype.toString,C=function(){try{return!!Object.defineProperty({},"a",{})}catch(a){return!1}}(),D=(!C&&!Object.prototype.__defineGetter__,C?Object.defineProperty:function(a,b,c){"get"in c&&a.__defineGetter__?a.__defineGetter__(b,c.get):(!A.call(a,b)||"value"in c)&&(a[b]=c.value)}),E=Object.create||function(a,b){function c(){}var d,e;c.prototype=a,d=new c;for(e in b)A.call(b,e)&&D(d,e,b[e]);return d},F=Array.prototype.indexOf||function(a,b){var c=this;if(!c.length)return-1;for(var d=b||0,e=c.length;e>d;d++)if(c[d]===a)return d;return-1},G=Array.isArray||function(a){return"[object Array]"===B.call(a)},H=Date.now||function(){return(new Date).getTime()},I=i,J=["second","minute","hour","day","month","year"],K=["best fit","numeric"];D(i,"__localeData__",{value:E(null)}),D(i,"__addLocaleData",{value:function(a){if(!a||!a.locale)throw new Error("Locale data provided to IntlRelativeFormat is missing a `locale` property value");i.__localeData__[a.locale.toLowerCase()]=a,x.__addLocaleData(a)}}),D(i,"defaultLocale",{enumerable:!0,writable:!0,value:void 0}),D(i,"thresholds",{enumerable:!0,value:{second:45,minute:45,hour:22,day:26,month:11}}),i.prototype.resolvedOptions=function(){return{locale:this._locale,style:this._options.style,units:this._options.units}},i.prototype._compileMessage=function(a){var b,c=this._locales,d=(this._locale,this._fields[a]),e=d.relativeTime,f="",g="";for(b in e.future)e.future.hasOwnProperty(b)&&(f+=" "+b+" {"+e.future[b].replace("{0}","#")+"}");for(b in e.past)e.past.hasOwnProperty(b)&&(g+=" "+b+" {"+e.past[b].replace("{0}","#")+"}");var h="{when, select, future 0past 0}";return new x(h,c)},i.prototype._getMessage=function(a){var b=this._messages;return b[a]||(b[a]=this._compileMessage(a)),b[a]},i.prototype._getRelativeUnits=function(a,b){var c=this._fields[b];return c.relative?c.relative[a]:void 0},i.prototype._findFields=function(a){for(var b=i.__localeData__,c=b[a.toLowerCase()];c;){if(c.fields)return c.fields;c=c.parentLocale&&b[c.parentLocale.toLowerCase()]}throw new Error("Locale data added to IntlRelativeFormat is missing `fields` for :"+a)},i.prototype._format=function(a,b){var c=b&&void 0!==b.now?b.now:H();if(void 0===a&&(a=c),!isFinite(c))throw new RangeError("The `now` option provided to IntlRelativeFormat#format() is not in valid range.");if(!isFinite(a))throw new RangeError("The date value provided to IntlRelativeFormat#format() is not in valid range.");var d=z(c,a),e=this._options.units||this._selectUnits(d),f=d[e];if("numeric"!==this._options.style){var g=this._getRelativeUnits(f,e);if(g)return g}return this._getMessage(e).format({0:Math.abs(f),when:0>f?"past":"future"})},i.prototype._isValidUnits=function(a){if(!a||F.call(J,a)>=0)return!0;if("string"==typeof a){var b=/s$/.test(a)&&a.substr(0,a.length-1);if(b&&F.call(J,b)>=0)throw new Error('"'+a+'" is not a valid IntlRelativeFormat `units` value, did you mean: '+b)}throw new Error('"'+a+'" is not a valid IntlRelativeFormat `units` value, it must be one of: "'+J.join('", "')+'"')},i.prototype._resolveLocale=function(a){"string"==typeof a&&(a=[a]),a=(a||[]).concat(i.defaultLocale);var b,c,d,e,f=i.__localeData__;for(b=0,c=a.length;c>b;b+=1)for(d=a[b].toLowerCase().split("-");d.length;){if(e=f[d.join("-")])return e.locale;d.pop()}var g=a.pop();throw new Error("No locale data has been added to IntlRelativeFormat for: "+a.join(", ")+", or the default locale: "+g)},i.prototype._resolveStyle=function(a){if(!a)return K[0];if(F.call(K,a)>=0)return a;throw new Error('"'+a+'" is not a valid IntlRelativeFormat `style` value, it must be one of: "'+K.join('", "')+'"')},i.prototype._selectUnits=function(a){var b,c,d;for(b=0,c=J.length;c>b&&(d=J[b],!(Math.abs(a[d])<i.thresholds[d]));b+=1);return d};var L={locale:"en",pluralRuleFunction:function(a,b){var c=String(a).split("."),d=!c[1],e=Number(c[0])==a,f=e&&c[0].slice(-1),g=e&&c[0].slice(-2);return b?1==f&&11!=g?"one":2==f&&12!=g?"two":3==f&&13!=g?"few":"other":1==a&&d?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{one:"in {0} year",other:"in {0} years"},past:{one:"{0} year ago",other:"{0} years ago"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{one:"in {0} month",other:"in {0} months"},past:{one:"{0} month ago",other:"{0} months ago"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{one:"in {0} day",other:"in {0} days"},past:{one:"{0} day ago",other:"{0} days ago"}}},hour:{displayName:"Hour",relativeTime:{future:{one:"in {0} hour",other:"in {0} hours"},past:{one:"{0} hour ago",other:"{0} hours ago"}}},minute:{displayName:"Minute",relativeTime:{future:{one:"in {0} minute",other:"in {0} minutes"},past:{one:"{0} minute ago",other:"{0} minutes ago"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{one:"in {0} second",other:"in {0} seconds"},past:{one:"{0} second ago",other:"{0} seconds ago"}}}}};I.__addLocaleData(L),I.defaultLocale="en";var M=I,N=Function.prototype.bind||function(a){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var b=Array.prototype.slice.call(arguments,1),c=this,d=function(){},e=function(){return c.apply(this instanceof d?this:a,b.concat(Array.prototype.slice.call(arguments)))};return this.prototype&&(d.prototype=this.prototype),e.prototype=new d,e},O=Object.prototype.hasOwnProperty,P=function(){try{return!!Object.defineProperty({},"a",{})}catch(a){return!1}}(),Q=(!P&&!Object.prototype.__defineGetter__,P?Object.defineProperty:function(a,b,c){"get"in c&&a.__defineGetter__?a.__defineGetter__(b,c.get):(!O.call(a,b)||"value"in c)&&(a[b]=c.value)}),R=Object.create||function(a,b){function c(){}var d,e;c.prototype=a,d=new c;for(e in b)O.call(b,e)&&Q(d,e,b[e]);return d},S=j,T=S(Intl.NumberFormat),U=S(Intl.DateTimeFormat),V=S(x),W=S(M),X={locale:"en",pluralRuleFunction:function(a,b){var c=String(a).split("."),d=!c[1],e=Number(c[0])==a,f=e&&c[0].slice(-1),g=e&&c[0].slice(-2);return b?1==f&&11!=g?"one":2==f&&12!=g?"two":3==f&&13!=g?"few":"other":1==a&&d?"one":"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{one:"in {0} year",other:"in {0} years"},past:{one:"{0} year ago",other:"{0} years ago"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{one:"in {0} month",other:"in {0} months"},past:{one:"{0} month ago",other:"{0} months ago"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{one:"in {0} day",other:"in {0} days"},past:{one:"{0} day ago",other:"{0} days ago"}}},hour:{displayName:"Hour",relativeTime:{future:{one:"in {0} hour",other:"in {0} hours"},past:{one:"{0} hour ago",other:"{0} hours ago"}}},minute:{displayName:"Minute",relativeTime:{future:{one:"in {0} minute",other:"in {0} minutes"},past:{one:"{0} minute ago",other:"{0} minutes ago"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{one:"in {0} second",other:"in {0} seconds"},past:{one:"{0} second ago",other:"{0} seconds ago"}}}}};o(X);var Y={registerWith:n,__addLocaleData:o};this.HandlebarsIntl=Y}).call(this);

HandlebarsIntl.registerWith(window.Handlebars);

window.Handlebars.registerHelper('select', function( value, options ){
    var $el = $('<select />').html( options.fn(this) );
    $el.find('[value="' + value + '"]').attr({'selected':'selected'});
    return $el.html();
});


/*============================================================================
  Money Format
  - Shopify.format money is defined in option_selection.js.
    If that file is not included, it is redefined here.
==============================================================================*/
window.timber = window.timber || {};

timber.initCache = function() {
  timber.cache = {
    // General
    $html: $('html'),
    $body: $('body'),
    $window: $(window),

    // Navigation
    $navigation: $('#AccessibleNav'),

    // Product Page
    $optionSelector: $('.single-option-selector'),

    // Customer Pages
    $recoverPasswordLink: $('#RecoverPassword'),
    $hideRecoverPasswordLink: $('#HideRecoverPasswordLink'),
    $recoverPasswordForm: $('#RecoverPasswordForm'),
    $customerLoginForm: $('#CustomerLoginForm'),
    $passwordResetSuccess: $('#ResetSuccess')
  };
};

timber.init = function() {
  timber.initCache();
  timber.accessibleNav();
  timber.drawersInit();
  timber.responsiveVideos();
  timber.loginForms();
};

timber.accessibleNav = function() {
  var classes = {
    active: 'nav-hover',
    focus: 'nav-focus',
    outside: 'nav-outside',
    hasDropdown: 'site-nav--has-dropdown',
    link: 'site-nav__link'
  };
  var selectors = {
    active: '.' + classes.active,
    hasDropdown: '.' + classes.hasDropdown,
    dropdown: '[data-meganav-dropdown]',
    link: 'a',
    nextLink: '> a',
    parentLink: '[data-meganav-type="parent"]',
    childLink: '[data-meganav-type="child"]'
  };

  var $nav = timber.cache.$navigation,
    $allLinks = $nav.find(selectors.link),
    $parents = $nav.find(selectors.hasDropdown),
    $childLinks = $nav.find(selectors.childLink),
    $topLevel = $parents.find(selectors.nextLink),
    $dropdowns = $nav.find(selectors.dropdown),
    $subMenuLinks = $dropdowns.find(selectors.link);

  // Mouseenter
  $parents.on('mouseenter touchstart', function(evt) {
    var $el = $(this);
    var evtType = evt.type;
    var $dropdowns = $nav.find(selectors.active);

    if (!$el.hasClass(classes.active)) {
      // force stop the click from happening
      evt.preventDefault();
      evt.stopImmediatePropagation();
    }

    // Make sure we close any opened same level dropdown before opening a new one
    if (evtType === 'touchstart' && $dropdowns.length > 0) {
      hideDropdown($el);
    }

    showDropdown($el);
  });

  $childLinks.on('touchstart', function(evt) {
    evt.stopImmediatePropagation();
  });

  $parents.on('mouseleave', function() {
    hideDropdown($(this));
  });

  $allLinks.on('focus', function() {
    handleFocus($(this));
  });

  $allLinks.on('blur', function() {
    removeFocus($topLevel);
  });

  // accessibleNav private methods
  function handleFocus($el) {
    var $newFocus = null,
      $previousItem = $el.parent().prev();

    // Always put tabindex -1 on previous element just in case the user is going backward.
    // In that case, we want to focus on the previous parent and not the previous parent childs

    $allLinks.attr('tabindex', '');

    if ($previousItem.hasClass(classes.hasDropdown)) {
      $previousItem.find(selectors.dropdown + ' a').attr('tabindex', -1);
    }

    $newFocus = $el.parents(selectors.hasDropdown).find('> a');
    addFocus($newFocus);
  }

  function showDropdown($el) {
    var $toplevel = $el.find(selectors.nextLink);

    $toplevel.attr('aria-expanded', true);

    $el.addClass(classes.active);

    setTimeout(function() {
      timber.cache.$body.on('touchstart.MegaNav', function() {
        hideDropdowns();
      });
    }, 250);
  }

  function hideDropdown($el) {
    var $dropdowns = $el.parent().find(selectors.active);
    var $parentLink = $dropdowns.find(selectors.nextLink);

    $parentLink.attr('aria-expanded', false);

    $dropdowns.removeClass(classes.active);

    timber.cache.$body.off('touchstart.MegaNav');
  }

  function hideDropdowns() {
    var $dropdowns = $nav.find(selectors.active);
    $.each($dropdowns, function() {
      hideDropdown($(this));
    });
  }

  function addFocus($el) {
    $el.addClass(classes.focus);

    if ($el.attr('aria-expanded') !== undefined) {
      $el.attr('aria-expanded', true);
    }
  }

  function removeFocus($el) {
    $el.removeClass(classes.focus);

    $subMenuLinks.attr('tabindex', -1);

    if ($el.attr('aria-expanded') !== undefined) {
      $el.attr('aria-expanded', false);
    }
  }

  // Check if dropdown is outside of viewport
  function handleDropdownOffset($dropdowns) {
    var viewportSize = $(window).width();
    $dropdowns.removeClass(classes.outside);

    $.each($dropdowns, function() {
      var $dropdown = $(this);
      var dropdownOffset = $dropdown.offset().left + $dropdown.width();
      if (dropdownOffset > viewportSize) {
        $dropdown.addClass(classes.outside);
      }
    });
  }

  timber.cache.$window.load(function() {
    handleDropdownOffset($dropdowns);
  });

  timber.cache.$window.resize(function() {
    afterResize(function() {
      handleDropdownOffset($dropdowns);
    }, 250);
  });
};

timber.drawersInit = function() {
  timber.LeftDrawer = new timber.Drawers('NavDrawer', 'left');
  if (theme.settings.cartType === 'drawer') {
    timber.RightDrawer = new timber.Drawers('CartDrawer', 'right', {
      onDrawerOpen: ajaxCart.load
    });
  }
};

timber.getHash = function() {
  return window.location.hash;
};

timber.responsiveVideos = function() {
  var $iframeVideo = $(
    'iframe[src*="youtube.com/embed"], iframe[src*="player.vimeo"]'
  );
  var $iframeReset = $iframeVideo.add('iframe#admin_bar_iframe');

  $iframeVideo.each(function() {
    // Add wrapper to make video responsive
    if (!$(this).parents('.video-wrapper').length) {
      $(this).wrap('<div class="video-wrapper"></div>');
    }
  });

  $iframeReset.each(function() {
    // Re-set the src attribute on each iframe after page load
    // for Chrome's 'incorrect iFrame content on 'back'' bug.
    // https://code.google.com/p/chromium/issues/detail?id=395791
    // Need to specifically target video and admin bar
    this.src = this.src;
  });
};

timber.loginForms = function() {
  function showRecoverPasswordForm() {
    timber.cache.$recoverPasswordForm.show();
    timber.cache.$customerLoginForm.hide();
  }

  function hideRecoverPasswordForm() {
    timber.cache.$recoverPasswordForm.hide();
    timber.cache.$customerLoginForm.show();
  }

  timber.cache.$recoverPasswordLink.on('click', function(evt) {
    evt.preventDefault();
    showRecoverPasswordForm();
  });

  timber.cache.$hideRecoverPasswordLink.on('click', function(evt) {
    evt.preventDefault();
    hideRecoverPasswordForm();
  });

  // Allow deep linking to recover password form
  if (timber.getHash() === '#recover') {
    showRecoverPasswordForm();
  }
};

timber.resetPasswordSuccess = function() {
  timber.cache.$passwordResetSuccess.show();
};

/*============================================================================
  Drawer modules
  - Docs http://shopify.github.io/Timber/#drawers
==============================================================================*/
timber.Drawers = (function() {
  var Drawer = function(id, position, options) {
    var defaults = {
      close: '.js-drawer-close',
      open: '.js-drawer-open-button-' + position,
      openButtonLeftClass: 'js-drawer-open-button-left',
      drawerLeftClass: 'drawer--left',
      drawerRightClass: 'drawer--right',
      openClass: 'js-drawer-open',
      dirOpenClass: 'js-drawer-open-' + position
    };

    this.nodes = {
      $parent: $('body, html'),
      $page: $('#PageContainer'),
      $moved: $('.page-container')
    };

    this.config = $.extend(defaults, options);
    this.position = position;

    this.$drawer = $('#' + id);

    if (!this.$drawer.length) {
      return false;
    }

    this.drawerIsOpen = false;
    this.init();
  };

  Drawer.prototype.init = function() {
    var $openBtn = $(this.config.open);

    // Add aria controls
    $openBtn.attr('aria-expanded', 'false');

    $openBtn.on('click', $.proxy(this.open, this));
    this.$drawer.find(this.config.close).on('click', $.proxy(this.close, this));
  };

  Drawer.prototype.open = function(evt) {
    // Keep track if drawer was opened from a click, or called by another function
    var externalCall = false;

    // Other drawers that might be open (will be closed later)
    var $otherDrawers = $('.drawer').not(this.$drawer);

    // don't open an opened drawer
    if (this.drawerIsOpen) {
      if (evt) {
        evt.preventDefault();
      }
      return;
    }

    // Close other drawers if they are open
    var self = this;
    $otherDrawers.each(function() {
      if (!$(this).hasClass(self.config.openClass)) {
        return;
      }

      if ($(this).hasClass(self.config.drawerLeftClass)) {
        timber.LeftDrawer.close();
      }

      if ($(this).hasClass(self.config.drawerRightClass)) {
        timber.RightDrawer.close();
      }
    });

    // Prevent following href if link is clicked
    if (evt) {
      evt.preventDefault();
    } else {
      externalCall = true;
    }

    // Without this, the drawer opens, the click event bubbles up to $nodes.page
    // which closes the drawer.
    if (evt && evt.stopPropagation) {
      evt.stopPropagation();
      // save the source of the click, we'll focus to this on close
      this.$activeSource = $(evt.currentTarget);
    }

    if (this.drawerIsOpen && !externalCall) {
      return this.close();
    }

    // Add is-transitioning class to moved elements on open so drawer can have
    // transition for close animation
    this.nodes.$moved.addClass('is-transitioning');
    this.$drawer.prepareTransition();

    this.nodes.$parent.addClass(
      this.config.openClass + ' ' + this.config.dirOpenClass
    );
    this.$drawer.addClass(this.config.openClass);

    this.drawerIsOpen = true;

    // Set focus on drawer
    Drawer.prototype.trapFocus({
      $container: this.$drawer,
      namespace: 'drawer_focus'
    });

    // Run function when drawer opens if set
    if (
      this.config.onDrawerOpen &&
      typeof this.config.onDrawerOpen === 'function'
    ) {
      if (!externalCall) {
        this.config.onDrawerOpen();
      }
    }

    if (this.$activeSource && this.$activeSource.attr('aria-expanded')) {
      this.$activeSource.attr('aria-expanded', 'true');
    }

    this.bindEvents();
  };

  Drawer.prototype.close = function(evt) {
    // don't close a closed drawer
    if (!this.drawerIsOpen) {
      return;
    }

    if (evt.keyCode !== 27) {
      evt.preventDefault();
    }
    // deselect any focused form elements
    $(document.activeElement).trigger('blur');

    // Ensure closing transition is applied to moved elements, like the nav
    this.nodes.$moved.prepareTransition({ disableExisting: true });
    this.$drawer.prepareTransition({ disableExisting: true });

    this.nodes.$parent.removeClass(
      this.config.dirOpenClass + ' ' + this.config.openClass
    );
    this.$drawer.removeClass(this.config.openClass);

    this.drawerIsOpen = false;

    // Remove focus on drawer
    Drawer.prototype.removeTrapFocus({
      $container: this.$drawer,
      namespace: 'drawer_focus'
    });

    if (this.$activeSource && this.$activeSource.attr('aria-expanded')) {
      this.$activeSource.attr('aria-expanded', 'false');
    }

    this.unbindEvents();
  };

  /**
   * Traps the focus in a particular container
   *
  * @param {object} options - Options to be used
  * @param {jQuery} options.$container - Container to trap focus within
  * @param {jQuery} options.$elementToFocus - Element to be focused when focus leaves container
  * @param {string} options.namespace - Namespace used for new focus event handler
  */
  Drawer.prototype.trapFocus = function(options) {
    var eventName = options.namespace
      ? 'focusin.' + options.namespace
      : 'focusin';

    if (!options.$elementToFocus) {
      options.$elementToFocus = options.$container;
      options.$container.attr('tabindex', '-1');
    }

    options.$elementToFocus.focus();

    $(document).on(eventName, function(evt) {
      if (
        options.$container[0] !== evt.target &&
        !options.$container.has(evt.target).length
      ) {
        options.$container.focus();
      }
    });
  };

  /**
   * Removes the trap of focus in a particular container
   *
   * @param {object} options - Options to be used
   * @param {jQuery} options.$container - Container to trap focus within
   * @param {string} options.namespace - Namespace used for new focus event handler
   */
  Drawer.prototype.removeTrapFocus = function(options) {
    var eventName = options.namespace
      ? 'focusin.' + options.namespace
      : 'focusin';

    if (options.$container && options.$container.length) {
      options.$container.removeAttr('tabindex');
    }

    $(document).off(eventName);
  };

  Drawer.prototype.bindEvents = function() {
    // Lock scrolling on mobile
    this.nodes.$page.on('touchmove.drawer', function() {
      return false;
    });

    this.$drawer.on('click.drawer', function(event) {
      if ($(this).hasClass('drawer--left')) {
        event.stopPropagation();
      }
    });

    $('.page-container, .drawer__header-container').on(
      'click.drawer',
      this.close.bind(this)
    );

    // Pressing escape closes drawer
    this.nodes.$parent.on(
      'keyup.drawer',
      $.proxy(function(evt) {
        // The hamburger 'open' button changes to a 'close' button when the drawer
        // is open. Clicking on it will close the drawer.
        if (this.$activeSource !== undefined) {
          this.$activeSource.on(
            'click.drawer',
            $.proxy(function() {
              if (
                !this.$activeSource.hasClass(this.config.openButtonLeftClass)
              ) {
                return;
              }
              this.close();
            }, this)
          );
        }
        if (evt.keyCode === 27) {
          this.close(evt);
        }
      }, this)
    );
  };

  Drawer.prototype.unbindEvents = function() {
    if (this.$activeSource !== undefined) {
      this.$activeSource.off('.drawer');
    }
    this.nodes.$page.off('.drawer');
    this.nodes.$parent.off('.drawer');
  };

  return Drawer;
})();

// Initialize Timber's JS on docready
$(timber.init);

/*
 * Shopify JS for customizing Slick.js
 *   http://kenwheeler.github.io/slick/
 *   Untouched JS in assets/slick.min.js
 */

var slickTheme = (function(module, $) {
  'use strict';

  // Public functions
  var init, onInit, beforeChange, afterChange;

  // Private variables
  var settings,
    $slider,
    $allSlides,
    $activeSlide,
    $pagination,
    scrolled,
    $heroText,
    $heroImage;
  var currentActiveSlide = 0;

  // Private functions
  var cacheObjects,
    setParallax,
    calculateParallax,
    keyboardNavigation,
    togglePause,
    showMobileText,
    applySlideColor,
    slideshowA11ySetup;

  /*============================================================================
   Initialise the plugin and define global options
  ==============================================================================*/
  cacheObjects = function() {
    slickTheme.cache = {
      $html: $('html'),
      $window: $(window),
      $hero: $('#Hero'),
      $heroImage: $('.hero__image'),
      $headerWrapper: $('.header-wrapper'),
      $pauseButton: $('.hero__pause'),
      $textWrapperMobile: $('.hero__adapt-text-wrap')
    };

    slickTheme.vars = {
      slides: '.slick-slide',
      activeSlide: '.slick-active',
      slideImage: '.hero__image',
      slickList: '.slick-list',
      textContent: '.hero__text-content',
      pagination: '[data-slide-pagination]',
      hiddenClass: 'hero__slide--hidden',
      heroHeaderClass: 'hero__header',
      pausedClass: 'is-paused',
      loadSlideA11yString: slickTheme.cache.$hero.data('slide-nav-a11y'),
      activeSlideA11yString: slickTheme.cache.$hero.data(
        'slide-nav-active-a11y'
      )
    };
  };

  init = function(options) {
    cacheObjects();

    // Default settings
    settings = {
      // User options
      $element: null,
      parallax: false,

      // Private settings
      isTouch: Modernizr.touch ? true : false,

      // Slick options
      accessibility: true,
      arrows: false,
      dots: true,
      focusOnChange: true,
      adaptiveHeight: true
    };

    // Override defaults with arguments
    $.extend(settings, options);

    /*
     * Init slick slider
     *   - Add any additional option changes here
     *   - https://github.com/kenwheeler/slick/#options
     */
    settings.$element.slick({
      accessibility: settings.accessibility,
      arrows: settings.arrows,
      dots: settings.dots,
      slide: '.hero__slide',
      /* eslint-disable shopify/jquery-dollar-sign-reference */
      prevArrow: $('.slick-prev'),
      nextArrow: $('.slick-next'),
      appendDots: $('.hero__dots-wrapper'),
      /* eslint-enable shopify/jquery-dollar-sign-reference */
      adaptiveHeight: false,
      draggable: false,
      fade: true,
      focusOnChange: settings.focusOnChange,
      autoplay: slickTheme.cache.$hero.data('autoplay'),
      autoplaySpeed: slickTheme.cache.$hero.data('autoplayspeed'),
      onInit: this.onInit,
      onBeforeChange: this.beforeChange,
      onAfterChange: this.afterChange,
      customPaging: function(slick, index) {
        var labelString =
          index === 0
            ? slickTheme.vars.activeSlideA11yString
            : slickTheme.vars.loadSlideA11yString;
        return (
          '<a href="#Hero" aria-label="' +
          labelString.replace('[slide_number]', index + 1) +
          '" data-slide-number="' +
          index +
          '" data-slide-pagination aria-controls="SlickSlide' +
          (index + 1) +
          '"></a>'
        );
      }
    });
  };

  onInit = function(obj) {
    $slider = obj.$slider;
    $allSlides = $slider.find(slickTheme.vars.slides);
    $activeSlide = $slider.find(
      slickTheme.vars.slides + slickTheme.vars.activeSlide
    );
    $pagination = $slider.find(slickTheme.vars.pagination);

    if (!settings.isTouch) {
      $allSlides.addClass(slickTheme.vars.hiddenClass);
      $activeSlide.removeClass(slickTheme.vars.hiddenClass);
    }

    if (settings.autoplay) {
      slickTheme.cache.$pauseButton.on('click', togglePause);

      $(document).scroll(
        theme.debounce(
          function() {
            if (this.$slider.outerHeight() < window.pageYOffset) {
              settings.$element.slickPause();
            } else if (
              !slickTheme.cache.$pauseButton.hasClass(
                slickTheme.vars.pausedClass
              )
            ) {
              settings.$element.slickPlay();
            }
          }.bind(this),
          250
        )
      );
    }

    // Prevent default slick behaviour of autoplaying on mouseleave
    slickTheme.cache.$hero
      .find(slickTheme.vars.slickList)
      .off('mouseleave.slick');

    if (settings.adaptHeight) {
      showMobileText(0);
    }

    slideshowA11ySetup();

    if (settings.parallax && Modernizr.csstransforms3d) {
      setParallax();
    }
  };

  beforeChange = function(evt, currentSlide, nextSlide) {
    if (!settings.isTouch) {
      $allSlides.removeClass(slickTheme.vars.hiddenClass);
    }

    if (settings.adaptHeight) {
      showMobileText(nextSlide);
    }

    applySlideColor(nextSlide, currentSlide);

    $pagination.each(function(index) {
      var labelString =
        index === nextSlide
          ? slickTheme.vars.activeSlideA11yString
          : slickTheme.vars.loadSlideA11yString;

      labelString = labelString.replace('[slide_number]', index + 1);
      $(this).attr('aria-label', labelString);
    });

    // Set upcoming slide as index
    currentActiveSlide = nextSlide;

    // Set new active slide to proper parallax position
    if (settings.parallax && Modernizr.csstransforms3d) {
      calculateParallax(currentActiveSlide);
    }
  };

  afterChange = function() {
    if (settings.isTouch) {
      return;
    }

    $activeSlide = $slider.find(
      slickTheme.vars.slides + slickTheme.vars.activeSlide
    );
    $allSlides.addClass(slickTheme.vars.hiddenClass).attr('aria-hidden', true);
    $activeSlide
      .removeClass(slickTheme.vars.hiddenClass)
      .attr('aria-hidden', false);
  };

  setParallax = function() {
    $heroText = $(slickTheme.vars.textContent);
    $heroImage = $(slickTheme.vars.slideImage);

    slickTheme.cache.$window.on('scroll', function() {
      calculateParallax(currentActiveSlide);
    });
  };

  calculateParallax = function(currentSlide) {
    scrolled = slickTheme.cache.$window.scrollTop();

    $($heroText[currentSlide]).css({
      transform: 'translate3d(0, ' + scrolled / 8 + 'px, 0)'
    });

    $($heroImage[currentSlide]).css({
      transform: 'translate3d(0, ' + scrolled / 8 + 'px, 0)'
    });
  };

  keyboardNavigation = function(evt) {
    if (evt.keyCode === 37) {
      settings.$element.slickPrev();
    }
    if (evt.keyCode === 39) {
      settings.$element.slickNext();
    }
  };

  togglePause = function() {
    var $pauseButton = $(this);
    var isPaused = $pauseButton.hasClass(slickTheme.vars.pausedClass);

    $pauseButton
      .toggleClass(slickTheme.vars.pausedClass, !isPaused)
      .attr(
        'aria-label',
        isPaused
          ? $pauseButton.data('label-pause')
          : $pauseButton.data('label-play')
      );

    if (settings.autoplay) {
      if (isPaused) {
        settings.$element.slickPlay();
      } else {
        settings.$element.slickPause();
      }
    }
  };

  showMobileText = function(slideIndex) {
    var $allTextContent = slickTheme.cache.$textWrapperMobile.find(
      slickTheme.vars.textContent
    );
    var $currentTextContent = slickTheme.cache.$textWrapperMobile.find(
      '[data-index="' + slideIndex + '"]'
    );
    if (!$currentTextContent.length && $allSlides.length === 1) {
      slickTheme.cache.$textWrapperMobile.hide();
    } else {
      slickTheme.cache.$textWrapperMobile.show();
    }
    $allTextContent.hide();
    $currentTextContent.show();
  };

  applySlideColor = function(nextSlideIndex, previousSlideIndex) {
    var prefixClassName = 'hero--color-';

    theme.cache.$siteHeader
      .removeClass(prefixClassName + previousSlideIndex)
      .addClass(prefixClassName + nextSlideIndex);
    $slider
      .removeClass(prefixClassName + previousSlideIndex)
      .addClass(prefixClassName + nextSlideIndex);
  };

  slideshowA11ySetup = function() {
    var $list = slickTheme.cache.$hero.find(slickTheme.vars.slickList);

    // When an element in the slider is focused
    // pause slideshow and set aria-live.
    slickTheme.cache.$hero
      .on('focusin mouseenter', function(evt) {
        if (
          !slickTheme.cache.$hero.has(evt.target).length ||
          $list.attr('aria-live') === 'polite'
        ) {
          return;
        }

        $list.attr('aria-live', 'polite');
        if (settings.autoplay) {
          settings.$element.slickPause();
        }
      })
      .on('focusout mouseleave', function(evt) {
        if (slickTheme.cache.$hero.has(evt.relatedTarget).length) {
          return;
        }

        $list.removeAttr('aria-live');
        if (settings.autoplay) {
          // Only resume playing if the user hasn't paused using the pause
          // button
          if (
            !slickTheme.cache.$pauseButton.hasClass(slickTheme.vars.pausedClass)
          ) {
            settings.$element.slickPlay();
          }
        }
      })
      .on('keyup', keyboardNavigation.bind(this));

    $list.removeAttr('tabindex');

    $allSlides.each(function(index) {
      $(this)
        .attr('id', 'SlickSlide' + (index + 1))
        .attr('aria-hidden', true);
    });

    $activeSlide.attr('aria-hidden', false);

    if ($allSlides.length > 1) {
      $pagination.each(function() {
        $(this).on('click keyup', function(evt) {
          if (evt.type === 'keyup' && evt.which !== 13) return;

          evt.preventDefault();

          if (evt.type === 'keyup') {
            slickTheme.cache.$hero.focus();
          }
        });
      });
    }
  };

  module = {
    init: init,
    onInit: onInit,
    beforeChange: beforeChange,
    afterChange: afterChange
  };

  return module;
})(slickTheme || {}, jQuery);


/* ================ Sections ================ */
theme.Product = (function() {
  function Product(container) {
    this.tags = window.productTags;

    if (this.tags.includes("Flat")) {
      isFlat = true;
    } else {
      isFlat = false;
    }

    this.variables = window.variables;
    delete window.variables;
    $("#script_variables").remove();

    if (this.variables.productType === 'Rug' || this.variables.productType === 'Lighting' || this.variables.productType === 'Side Table' || this.variables.productType === 'Coffee Table') {
      return this.constructPlain(container);
    } else if (this.variables.productType === 'ReadyMade') {
      return this.constructReadyMade(container);
    } else {
      return this.constructSofa(container);
    }
  }

  Product.prototype = _.assignIn({}, Product.prototype, {
    constructPlain: function(container) {
      var self = this;
      
      // Detect variables
      this.productType = 'plain';
      this.set('isSectional', true);
      this.set('isUshaped', true);

      this.settings = {
        productPageLoad: false,
        preloadImage: false,
        enableHistoryState: true,
        namespace: '.productSection',
        productImageCount: $('#productThumbs').data('imageCount'),
      };

      this.selectors = {
        productImageWrapper: '.product-single__photo-wrapper',
        productImages: '.product-single__photos',
        productImagePhoto: '.product-single__photo',
        productImagePhotoFlexWrapper: '.product-single__photo--flex-wrapper',
        productThumbnail: '.product-single__thumbnail',
        productImagePhotoContainer: '.product-single__photo--container',
        productFullDetails: '.product-single__full-details',
        productForm: '.add-to-cart__form',
        addToCart: '.btn--add-to-cart',
        addToCartText: '.btn__text',
        priceContainer: '[data-price-container]',
        productPrice: '#ProductPrice',
        SKU: '.variant-sku',
        priceA11y: '#PriceA11y',
        comparePrice: '#ComparePrice',
        comparePriceA11y: '#ComparePriceA11y',
        comparePriceWrapper: '.product-single__price--wrapper',
        quantityElements: '.js-quantity-selector, label + .js-qty',
        originalSelectorId: '#ProductSelect',
        singleOptionSelector: '.single-option-selector__radio',
        radioWrapper: '.radio-wrapper',
        meta: '.product-single__meta',
        productWrapper: '.product-single',
        shopifyPaymentButton: '.shopify-payment-button',
        unitPrice: '[data-unit-price]',
        unitPriceBaseUnit: '[data-unit-price-base-unit]'
      };

      this.classes = {
        priceContainerUnitAvailable: 'price-container--unit-available'
      };

      var $container = (this.$container = $(container));
      var sectionId = $container.attr('data-section-id');

      if (!$('#ProductJson-' + sectionId).html()) {
        return;
      }

      this.productSingleObject = JSON.parse(
        document.getElementById('ProductJson-' + sectionId).innerHTML
      );
      this.zoomType = $container.data('image-zoom-type');

      this.detectResourceVersion();
      this.createImageCarousel();
      this.stringOverrides();
      this.initProductVariant();
      this.initStickyProductMeta();

      if (this.zoomType) {
        setTimeout(function() {
         self.productImageZoom();
        }, 3000);
      }

      if (theme.settings.cartType === 'drawer') {
        ajaxCart.init({
          formSelector: '#AddToCartForm--' + sectionId,
          cartContainer: '#CartContainer',
          addToCartSelector: '#AddToCart--' + sectionId,
          enableQtySelectors: true,
          moneyFormat: theme.strings.moneyFormat
        });
      }

      // Init load, resize events of Window
      var $window = $(window);

      $window
        .on('load' + this.settings.namespace, theme.initStickyProductMeta)
        .on(
          'resize' + this.settings.namespace,
          theme.debounce(this.initStickyProductMeta, 150).bind(this)
        );

      $(".lds-css").remove();
    },

    constructReadyMade: function(container) {
      var self = this;
      
      // Detect variables
      this.set('isSectional', false);
      this.set('isUshaped', false);

      this.selectedFabric = true;
      this.selectedLeg = true;
      
      this.settings = {
        productPageLoad: false,
        preloadImage: false,
        enableHistoryState: true,
        namespace: '.productSection',
        productImageCount: $('#productThumbs').data('imageCount'),
      };

      this.selectors = {
        productImageWrapper: '.product-single__photo-wrapper',
        productImages: '.product-single__photos',
        productImagePhoto: '.product-single__photo',
        productImagePhotoFlexWrapper: '.product-single__photo--flex-wrapper',
        productThumbnail: '.product-single__thumbnail',
        productImagePhotoContainer: '.product-single__photo--container',
        productFullDetails: '.product-single__full-details',
        productForm: '.add-to-cart__form',
        addToCart: '.btn--add-to-cart',
        addToCartText: '.btn__text',
        priceContainer: '[data-price-container]',
        productPrice: '#ProductPrice',
        SKU: '.variant-sku',
        priceA11y: '#PriceA11y',
        comparePrice: '#ComparePrice',
        comparePriceA11y: '#ComparePriceA11y',
        comparePriceWrapper: '.product-single__price--wrapper',
        quantityElements: '.js-quantity-selector, label + .js-qty',
        originalSelectorId: '#ProductSelect',
        singleOptionSelector: '.single-option-selector__radio',
        radioWrapper: '.radio-wrapper',
        meta: '.product-single__meta',
        productWrapper: '.product-single',
        shopifyPaymentButton: '.shopify-payment-button',
        unitPrice: '[data-unit-price]',
        unitPriceBaseUnit: '[data-unit-price-base-unit]'
      };

      this.classes = {
        priceContainerUnitAvailable: 'price-container--unit-available'
      };

      var $container = (this.$container = $(container));
      var sectionId = $container.attr('data-section-id');

      if (!$('#ProductJson-' + sectionId).html()) {
        return;
      }

      this.productSingleObject = JSON.parse(
        document.getElementById('ProductJson-' + sectionId).innerHTML
      );
      this.zoomType = $container.data('image-zoom-type');

      this.detectResourceVersion();
      this.createImageCarousel();
      this.stringOverrides();
      this.initProductVariant();
      this.initProductBoxReadyMade();

      if (this.zoomType) {
        setTimeout(function() {
         self.productImageZoom();
        }, 3000);
      }

      if (theme.settings.cartType === 'drawer') {
        ajaxCart.init({
          formSelector: '#AddToCartForm--' + sectionId,
          cartContainer: '#CartContainer',
          addToCartSelector: '#AddToCart--' + sectionId,
          enableQtySelectors: true,
          moneyFormat: theme.strings.moneyFormat
        });
      }

      // Init load, resize events of Window
      var $window = $(window);

      $window
        .on('load' + this.settings.namespace, theme.initStickyProductMeta)
        .on(
          'resize' + this.settings.namespace,
          theme.debounce(this.initStickyProductMeta, 150).bind(this)
        );

      $(".lds-css").remove();
    },

    constructSofa: function(container) {
      // Detect variables
      this.productType = 'sofa';

      // Init events
      var self = this;

      var $window = $(window);

      if (window.productType == 'Sectional'){
        cushionDpoSelector = '#select_1011';
      } else {  
        cushionDpoSelector = '#select_1007';
      }

      this.settings = {
        productPageLoad: false,
        preloadImage: false,
        enableHistoryState: true,
        namespace: '.productSection',
        legDpoSelector: '#select_1001',
        fabricDpoSelector: '#select_1003',
        cushionDpoSelector: cushionDpoSelector,
        fabricDpoValues: {
          decideLater: 10010,
          standard: 10011,
          performance: 10011,
          velvet: 10012,
          leather: 10013
        },
        productImageCount: $('#productThumbs').data('imageCount'),
      };

      this.selectors = {
        productImageWrapper: '.product-single__photo-wrapper',
        productImages: '.product-single__photos',
        productImagePhoto: '.product-single__photo',
        productImagePhotoFlexWrapper: '.product-single__photo--flex-wrapper',
        productThumbnail: '.product-single__thumbnail',
        productImagePhotoContainer: '.product-single__photo--container',
        productFullDetails: '.product-single__full-details',
        productForm: '.add-to-cart__form',
        addToCart: '.btn--add-to-cart',
        addToCartText: '.btn__text',
        priceContainer: '[data-price-container]',
        productPrice: '#ProductPrice',
        SKU: '.variant-sku',
        priceA11y: '#PriceA11y',
        comparePrice: '#ComparePrice',
        comparePriceA11y: '#ComparePriceA11y',
        comparePriceWrapper: '.product-single__price--wrapper',
        quantityElements: '.js-quantity-selector, label + .js-qty',
        originalSelectorId: '#ProductSelect',
        //singleOptionSelector: '.single-option-selector__radio',
        singleOptionSelector: '.single-option-selector__radio, .size-range',
        radioWrapper: '.radio-wrapper',
        meta: '.product-single__meta',
        productWrapper: '.product-single',
        shopifyPaymentButton: '.shopify-payment-button',
        unitPrice: '[data-unit-price]',
        unitPriceBaseUnit: '[data-unit-price-base-unit]'
      };

      this.classes = {
        priceContainerUnitAvailable: 'price-container--unit-available'
      };

      var $container = (this.$container = $(container));
      var sectionId = $container.attr('data-section-id');

      if (!$('#ProductJson-' + sectionId).html()) {
        return;
      }

      this.productSingleObject = JSON.parse(
        document.getElementById('ProductJson-' + sectionId).innerHTML
      );
      this.zoomType = $container.data('image-zoom-type');

      // Option box object
      this.$productBox = null;
      this.$sofaBox = null;
      this.$cardAnimation = null;
      this.$ranges = null;
      this.$spanDepth = null;
      this.filesRootUri = 'https://cdn.shopify.com/s/files/1/0250/3304/8148/files/' ;
      this.defaultImageUrl = 'https://cdn.shopify.com/s/files/1/0250/3304/8148/products/SKINNY_FAT_SOFA_BED_FRONT_45_1.RGB_color_.RGB_color_400x.jpg?v=1571129301';
      this.isAnimate = false;
      
      // Custom Options / Animation URL format
      this.animationUrlFormat = null;

      // Custom Options / Animation image
      this.$customAnimationImage = $(".product-sofa-box .card-animation .block-variant-img").children('img');

      // Drawing image URL format
      this.frameUrlFormat = null;

      // Drawing image
      this.$drawingImage = $(".product-sofa-box .card-drawing .block-variant-img").children('img');

      this.numFrames = 2;
      this.resourceVersion = '';

      this.rangeValues = {
        // Sectional
        'short-side': false,
        'long-side': false,

        // Sofa wwith Bumper
        'bumper-side': false,
        'sofa-side': false,

        'width': false,
        'depth': false,
        'length': false,

        // @to deprecate
        'sofa': false,
        'bumper': false,

        // @to deprecate
        'size': false,
        'size-left': false,
        'size-right': false
      };

      this.selectedFabric = false;
      this.selectedLeg = false;
      this.isDpoLoaded = false;
      this.hasCopiedCustomFields = false;
      this.dpoFabricCategoryId = this.settings.fabricDpoValues.performance;

      this.$sofaRanges = {};
      this.sofaAnimationTimer = {};
      this.sofaGuideIntervals = {};
      this.sofaGuideIndexes = {};
      this.isFirstLoadingFabrics = true;

      //this.initBreakpoints();
      this.detectResourceVersion();
      this.createImageCarousel();
      this.stringOverrides();
      this.initProductVariant();
      this.initStickyProductMeta();
      this.productThumbnailSwitch();
      this.initProductBox();

      if (this.is('printout')) {
        this.initPrintoutForm();
      }

      if (this.zoomType) {
        setTimeout(function() {
         self.productImageZoom();
        }, 3000);
      }

      if (theme.settings.cartType === 'drawer') {
        ajaxCart.init({
          formSelector: '#AddToCartForm--' + sectionId,
          cartContainer: '#CartContainer',
          addToCartSelector: '#AddToCart--' + sectionId,
          enableQtySelectors: true,
          moneyFormat: theme.strings.moneyFormat
        });
      }

      $window
        .on('load' + this.settings.namespace, theme.initStickyProductMeta)
        .on(
          'resize' + this.settings.namespace,
          theme.debounce(this.initStickyProductMeta, 150).bind(this)
        );

      $(".lds-css").remove();

      //this.initSwatchesPopup();
    },

    is: function(key) {
      switch (key) {
        case 'printout':
          return theme.cache.$printoutForm.length > 0;

        case 'sectional':
          return this.variables.isSectional;

        case 'ushaped':
          return this.variables.isUshaped;

        case 'extraDepth':
          return this.variables.isExtraDepth;

        case 'desk':
          return this.variables.isDesk;

        default:
          return (this.variables.subType === key);
      }

      return false;
    },

    set: function(key, value) {
      this.variables[key] = value;
    },

    initProductVariant: function() {
      var options = {
        $container: this.$container,
        enableHistoryState:
          this.$container.data('enable-history-state') || false,
        singleOptionSelector: this.selectors.singleOptionSelector,
        originalSelectorId: this.selectors.originalSelectorId,
        product: this.productSingleObject
      };

      this.variants = new slate.Variants(options);
      this.$container.on(
        'rangeInput' + this.settings.namespace,
        this.onRangeInput.bind(this)
      );

      this.$container.on(
        'variantChange' + this.settings.namespace,
        this.productPage.bind(this)
      );
      this.$container.on(
        'variantImageChange' + this.settings.namespace,
        this.showVariantImage.bind(this)
      );
    },

    detectResourceVersion: function() {
      var matches = /(\d+)$/.exec(this.variables.lastFileUrl);
      if (!matches) {
        return false;
      }

      this.resourceVersion = '?v=' + matches[1];
    },

    getCustomAnimationUrl: function(variant) {
      var self = this;
 
      var url = self.animationUrlFormat;
      if (!url) {
        console.error('[getCustomAnimationUrl] Animation URL format is empty.');
        return false;
      }

      url = url.replace('[option1]', variant.option1.handleize());

      if (url.indexOf('_400x') === -1) {
        url = url.replace('.png', '_400x.png');
      }

      return self.filesRootUri + url + '?' + self.resourceVersion;
    },

    getDrawingUrl: function(values, variant) {
      var self = this;
 
      var frameUrl = self.frameUrlFormat;
      if (!frameUrl) {
        console.error('[getDrawingUrl] Frame URL format is empty.');
        return false;
      }

      if (this.is('custom')) {
        if (!variant) {
          console.error('[getDrawingUrl] Variant is empty.');
          return false;
        }

        frameUrl = frameUrl.replace('[option1]', variant.option1.handleize());

      } else {
        if (typeof values === 'undefined') {
          return self.defaultImageUrl;
        }

        for (var key in values) {
          frameUrl = frameUrl.replace('[' + key + ']', values[key]);
        }

        var ori = false;
        if (this.is('with-bumper')) {
          ori = $('input[name="bumper_orientation"]:checked').val();
          frameUrl = frameUrl.replace('[bumper_ori]', ori);

        } else if (this.is('with-chaise')) {
          ori = $('input[name="chaise_orientation"]:checked').val();
          frameUrl = frameUrl.replace('[chaise_ori]', ori);

        } else if (this.is('chaise')) {
          ori = $('input[name="chaise_facing"]:checked').val();
          frameUrl = frameUrl.replace('[chaise_facing]', ori);
        
        } else if (this.is('sectional')) {
          ori = $('input[name="longside_orientation"]:checked').val();
          frameUrl = frameUrl.replace('[longside_ori]', ori);

        } else if (this.is('desk')) {
          const drawer = ($('input[name="drawer"]:checked').val() === 'With Drawer') ? 'with-drawer' : 'no-drawer';
          frameUrl = frameUrl.replace('[drawer]', drawer);
        }
      }

      if (frameUrl.indexOf('_400x') === -1) {
        frameUrl = frameUrl.replace('.png', '_400x.png');
      }

      return self.filesRootUri + frameUrl + self.resourceVersion;
    },

    getAnimatedFrameUrl: function(imageUrlFormat, size) {
      var self = this;

      if (!imageUrlFormat) {
        return self.defaultImageUrl;
      }

      let filename = '';

      if (typeof size === 'object') {
        if (this.is('ushaped')) {
          if (this.is('with-chaise')) {
            // Double Chaise Sectional
            filename = imageUrlFormat.replace('[middle-width]', size.middle_width * 100)
                                     .replace('[chaise-width]', size.chaise_width * 100)
                                     .replace('[chaise-length]', size.chaise_length * 100);
          } else {
            // U-Shaped Sectional or U-Shaped Bumper Sectional
            filename = imageUrlFormat.replace('[middle-width]', size.middle_width * 100)
                                     .replace('[right-left-side]', size.right_left_side * 100);
          }

          // Orientation (L or R)
          filename = filename.replace('[ori]', size.orientation === 'left' ? 'L' : 'R');

        } else {
          // Chaise or Sofa With Chaise
          if (this.is('chaise')) {
            filename = imageUrlFormat.replace('[width]', size.width * 100)
                                     .replace('[length]', size.length * 100);

          } else if (this.is('with-chaise')) {
            filename = imageUrlFormat.replace('[sofa]', size.sofa * 100)
                                     .replace('[chaise-width]', size.chaise_width * 100)
                                     .replace('[chaise-length]', size.chaise_length * 100);
          } else {
            return false;
          }
        }

      } else {
        // 65 => 06500, 66.25 => 06625, 67.5 => 06750, ...
        filename = imageUrlFormat.replace('[%05d]', pad(size * 100, 5)).replace('[inch]', size * 100);
      }

      filename = filename.replace('.png', '_400x.png');

      return self.filesRootUri + filename + self.resourceVersion;
    },

    animateSofaSize: function(currentValue, newValue, options) {
      var self = this;

      var defaults = {
        key: false,
        orientation: false,
        imageUrlFormat: false,
        $rangeImage: false,
        animationSteps: false,
        forceRender: false
      };

      options = $.extend({}, defaults, options);

      if (typeof currentValue != 'number') {
        currentValue = parseFloat(currentValue);
      }

      if (typeof newValue != 'number') {
        newValue = parseFloat(newValue);
      }

      if (typeof options.animationSteps != 'number') {
        options.animationSteps = parseFloat(options.animationSteps);
      }

      if (!options.animationSteps && !options.forceRender) {
        return;
      }

      currentValue = currentValue + options.animationSteps;

      if (options.animationSteps > 0) {
        if (currentValue > newValue) {
          return;
        }
      } else {
        if (currentValue < newValue) {
          return;
        }
      }

      let size = {},
          frameInterval = 150;

      if (self.is('ushaped')) {
        let overall_width = null;
        if (options.key === 'overall-width') {
          overall_width = currentValue;
        } else {
          overall_width = $('input[data-range="overall-width"]').val();
        }

        if (self.is('with-chaise')) {
          // Double Chaise Sectional
          switch (options.key) {
            case 'chaise-width':
              size.chaise_width = currentValue;
              size.chaise_length = $('input[data-range="chaise-length"]').val();
              break;

            case 'chaise-length':
              size.chaise_width = $('input[data-range="chaise-width"]').val();
              size.chaise_length = currentValue;
              break;

            default:                
              size.chaise_width = $('input[data-range="chaise-width"]').val();
              size.chaise_length = $('input[data-range="chaise-length"]').val();
          }

          size.middle_width = overall_width - size.chaise_width *2;

        } else {
          // U-Shaped Sectional or U-Shaped Bumper Sectional
          if (options.key === 'right-left-side') {
            size.right_left_side = currentValue;
          } else {
            size.right_left_side = $('input[data-range="right-left-side"]').val();
          }

          size.middle_width = overall_width - this.variables.depth1 *2;
        }

      } else if (self.is('chaise')) {
        switch (options.key) {
          case 'width':
            size.width = currentValue;
            size.length = $('input[data-range="length"]').val();
            break;

          case 'length':
            size.width = $('input[data-range="width"]').val();
            size.length = currentValue;
            break;

          default:
            return false;
        }

      } else if (self.is('with-chaise')) {
        switch (options.key) {
          case 'chaise-width':
            size.chaise_width = currentValue;
            size.chaise_length = $('input[data-range="chaise-length"]').val();
            break;

          case 'chaise-length':
            size.chaise_width = $('input[data-range="chaise-width"]').val();
            size.chaise_length = currentValue;
            break;

          case 'sofa':            
            let chaise_width = $('input[data-range="chaise-width"]').val(),
                chaise_width_max = parseInt($('input[data-range="chaise-width"]').attr('max'));
                chaise_width_step = parseInt($('input[data-range="chaise-width"]').attr('step'));
            size = currentValue;
            if (chaise_width == chaise_width_max) {
              size -= chaise_width_step;
            }
            break;

          default:
            return false;
        }

      } else {
        size = currentValue;
      }

      

      if (self.is('ushaped')) {
        size.orientation = 'left';
        self.$blockVariantImgs['left'][0].src = self.getAnimatedFrameUrl(options.imageUrlFormat, size);

        size.orientation = 'right';
        self.$blockVariantImgs['right'][0].src = self.getAnimatedFrameUrl(options.imageUrlFormat, size);

        if(options.key == 'sofa' || options.key == 'long-side' || options.key == 'overall-width') {
          window.productImgUrls['imgUrl1'] = self.getAnimatedFrameUrl(options.imageUrlFormat, size)
        } else if(options.key == 'right-left-side' || options.key == 'chaise-width' || options.key == 'chaise-length' || options.key == 'bumper') {
          window.productImgUrls['imgUrl2'] = self.getAnimatedFrameUrl(options.imageUrlFormat, size)
        }
      } else {
        options.$rangeImage[0].src = self.getAnimatedFrameUrl(options.imageUrlFormat, size);

        if(options.key == 'sofa' || options.key == 'long-side' || options.key == 'overall-width') {
          window.productImgUrls['imgUrl1'] = self.getAnimatedFrameUrl(options.imageUrlFormat, size)
        } else if(options.key == 'right-left-side' || options.key == 'chaise-width' || options.key == 'chaise-length' || options.key == 'bumper') {
          window.productImgUrls['imgUrl2'] = self.getAnimatedFrameUrl(options.imageUrlFormat, size)
        }

      }

      if (options.animationSteps != 0) {
        self.sofaAnimationTimer[options.key] = setTimeout(function() {
          self.animateSofaSize(currentValue, newValue, options);
        }, frameInterval);
      }
    },

    initPrintoutForm: function() {
      var self = this;

      var $btnVisibleSubmit = theme.cache.$printoutForm.find('button[data-custom-submit]');
      var $btnHiddenSubmit = theme.cache.$printoutForm.find('button[type="submit"]');

      theme.cache.$printoutForm.on('click', '[data-custom-submit]', function(e) {
        e.preventDefault();
        e.stopPropagation();

        theme.cache.$printoutForm[0].removeAttribute('onsubmit');

        if ($btnVisibleSubmit.hasClass('btn--loading')) {
          return;
        }

        $btnHiddenSubmit.click();
      });

      theme.cache.$printoutForm.on('submit', function() {        
        $btnVisibleSubmit.addClass('btn--loading');

        let url = theme.variables.googleScriptUrl,
            data = theme.cache.$printoutForm.find('.elements-wrapper').find('input, textarea, select').fieldSerialize();

        $.ajax({
          url: url, 
          type: "POST",
          data: data, 

          success: function() {
            location.href = location.pathname + '?view=printout&contact_posted=true';
          },

          error: function(response) {
            console.log(response);
            $btnVisibleSubmit.removeClass('btn--loading');
          }
        });

        return false;
      });
    },

    initProductBoxReadyMade: function() {
      var self = this;

      self.$productBox = $('.product-box');
      self.$sofaBox = self.$productBox.find('.product-sofa-box');
      self.$cardAnimation = self.$sofaBox.find('.card-animation');
      self.isAnimate = self.$sofaBox.hasClass('is-animate');

      // Drawing image format
      self.frameUrlFormat = $('#frame_image_url_format', self.$sofaBox).val();

      // Custom Options
      self.animationUrlFormat = $('#animation_url_format', self.$sofaBox).val();

      // Fabric Name options
      self.lastLoadedFabricCollection = false;
      self.loadingFabrics = {};
      self.stopTriggerFabric = false;

      // Size tabs
      self.initSizeTabs();

      // Animation | Drawing - switch between
      self.onSwitchExpand();

      // Accordion
      self.initAccordionReadyMade();

      // Init twentytwenty image comparison
      self.initFabricZoom();

      // Fabric / more info
      self.onFabricInfo();

      // Pick a fabric from the list
      self.initFabricReadyMade();
    },

    initProductBox: function() {
      var self = this;

      self.$productBox = $('.product-box');
      self.$sofaBox = self.$productBox.find('.product-sofa-box');
      self.$cardAnimation = self.$sofaBox.find('.card-animation');
      self.$ranges = self.$sofaBox.find('.product-ranges');
      self.$spanDepth = self.$sofaBox.find('.sofa-size--depth');
      self.isAnimate = self.$sofaBox.hasClass('is-animate');

      // Drawing image format
      self.frameUrlFormat = $('#frame_image_url_format', self.$sofaBox).val();

      // Custom Options
      self.animationUrlFormat = $('#animation_url_format', self.$sofaBox).val();

      // Get current slider values
      self.$sofaBox.find('.size-range').each(function() {
        var key = $(this).data('range');
        self.rangeValues[key] = this.value;
      });

      // Fabric Name options
      self.lastLoadedFabricCollection = false;
      self.loadingFabrics = {};
      self.stopTriggerFabric = false;

      // When Dynamic Product Options has been initialized, we need to copy Size value from variant options to custom options
      self.onDpoEvents();

      // Size tabs
      self.initSizeTabs();

      // Animation | Drawing - switch between
      self.onSwitchExpand();

      // Depth
      self.onChooseDepth();

      // Orientation (LEFT | RIGHT)
      self.onChooseOrientation();

      // Size slider
      self.initSizeSlider();

      // Accordion
      self.initAccordion();

      // Init twentytwenty image comparison
      self.initFabricZoom();

      // Fabric / more info
      self.onFabricInfo();

      // Corner On Left / Corner On Right popup image
      if (self.is('sectional')) {
        self.onCornerInfo();
      }

      // Load Fabrics collection
      self.onChooseFabricCategory();

      // Load current active collection
      self.defaultFabricCategory = $('input[name="default_fabric_cat_key"]').val();
      self.loadFirstFabricCategory();

      // Pick a fabric from the list
      self.onChooseFabric();

      // Pick Color later
      self.onChooseDecideColorLater();

      self.onChooseCushion();

      self.onChooseLeg();

      // Preload sofa animation images
      self.onPreloadSofaImages();

      // If DPO was loaded too fast to copy custom fields into DPO container, then manually copy here
      if (window.dpoEventAttached && !self.hasCopiedCustomFields) {
        self.copyVariantCustomFields(self.variants.currentVariant);
      }
    },

    enableAddToCartButton: function() {

      if (window.productTags.indexOf('No Fabric') > -1) {
        $(this.selectors.addToCart).removeClass('btn--disabled');
        return;
      }

      if (this.selectedFabric && this.selectedLeg && (this.is('custom') || this.isDpoLoaded)) {
        $(this.selectors.addToCart).removeClass('btn--disabled');
      }     
    },

    onPreloadSofaImages: function() {
      var self = this;

      if (!self.isAnimate || this.is('custom')) {
        return;
      }

      self.startedLoadingAnimations = false;

      $(window).one('scroll', function() {
        self.preloadSofaImages();
      });

      self.$sofaBox.one('mouseenter', function() {
        self.preloadSofaImages();
      });
    },

    preloadSofaImages: function() {
      var self = this;

      if (self.startedLoadingAnimations) {
        return;
      }

      self.startedLoadingAnimations = true;

      let sizeObject = {};

      if (self.is('ushaped')) {
        if (self.is('with-chaise')) {
          // Double Chaise Sectional
          // Middle = 65 - 70
          let $overall = $('input[data-range="overall-width"]'),
              min_middle = 65,
              max_middle = 70,
              step_middle = parseInt($overall.attr('step')) / 2;

          // Chaise
          let $chaiseWidth = $('input[data-range="chaise-width"]'),
              $chaiseLength = $('input[data-range="chaise-length"]');
            
          let chaseWidth = {
            min: parseInt($chaiseWidth.attr('min')),
            max: parseInt($chaiseWidth.attr('max')),
            step: parseInt($chaiseWidth.attr('step')) / 2
          };

          let chaiseLength = {
            min: parseInt($chaiseLength.attr('min')),
            max: parseInt($chaiseLength.attr('max')),
            step: parseInt($chaiseLength.attr('step')) / 2
          };

          for (let mi = min_middle; mi <= max_middle; mi += step_middle) {
            for (let wi = chaseWidth.min; wi <= chaseWidth.max; wi += chaseWidth.step) {
              for (let li = chaiseLength.min; li <= chaiseLength.max; li += chaiseLength.step) {
                // Left
                sizeObject = {
                  middle_width: mi,
                  chaise_width: wi,
                  chaise_length: li,
                  orientation: 'left'
                };

                new Image().src = self.getAnimatedFrameUrl(self.imageUrlFormatUshaped, sizeObject);

                // Right
                sizeObject.orientation = 'right';

                new Image().src = self.getAnimatedFrameUrl(self.imageUrlFormatUshaped, sizeObject);
              }
            }
          }
        } else {
          // U-Shaped Sectional or U-Shaped Bumper Sectional
          let $overall = $('input[data-range="overall-width"]'),
              min_overall = parseInt($overall.attr('min')),
              max_overall = parseInt($overall.attr('max')),
              step_overall = parseInt($overall.attr('step')) / 2;

          let $side = $('input[data-range="right-left-side"]'),
              min_side = parseInt($side.attr('min')),
              max_side = parseInt($side.attr('max')),
              step_side = parseInt($side.attr('step')) / 2;
              
          for (let inch_o = min_overall; inch_o <= max_overall; inch_o += step_overall) {
            for (let inch_s = min_side; inch_s <= max_side; inch_s += step_side) {
              // Left
              sizeObject = {
                middle_width: inch_o - this.variables.depth1 * 2,
                right_left_side: inch_s,
                orientation: 'left'
              };

              new Image().src = self.getAnimatedFrameUrl(self.imageUrlFormatUshaped, sizeObject);

              // Right
              sizeObject.orientation = 'right';
              new Image().src = self.getAnimatedFrameUrl(self.imageUrlFormatUshaped, sizeObject);
            }
          }
        }

      } else {
        if (self.is('chaise')) {
          let $width = $('input[data-range="width"]'),
              $length = $('input[data-range="length"]');
            
          let width = {
            min: parseInt($width.attr('min')),
            max: parseInt($width.attr('max')),
            step: parseInt($width.attr('step')) / 2
          };

          let length = {
            min: parseInt($length.attr('min')),
            max: parseInt($length.attr('max')),
            step: parseInt($length.attr('step')) / 2
          };

          for (let wi = width.min; wi <= width.max; wi += width.step) {
            for (let li = length.min; li <= length.max; li += length.step) {
              new Image().src = self.getAnimatedFrameUrl(self.imageUrlFormats.width, {
                width: wi,
                length: li
              });
            }
          }

        } else if (self.is('with-chaise')) {
          // Sofa
          let $sofa = $('input[data-range="sofa"]'),
              min = parseInt($sofa.attr('min')),
              max = parseInt($sofa.attr('max')),
              step = parseInt($sofa.attr('step')) / 2;

          for (let inch = min; inch <= max; inch += step) {
            new Image().src = self.getAnimatedFrameUrl(self.imageUrlFormats.sofa, inch);
          }

          // Chaise
          let $chaiseWidth = $('input[data-range="chaise-width"]'),
              $chaiseLength = $('input[data-range="chaise-length"]');
            
          let chaseWidth = {
            min: parseInt($chaiseWidth.attr('min')),
            max: parseInt($chaiseWidth.attr('max')),
            step: parseInt($chaiseWidth.attr('step')) / 2
          };

          let chaiseLength = {
            min: parseInt($chaiseLength.attr('min')),
            max: parseInt($chaiseLength.attr('max')),
            step: parseInt($chaiseLength.attr('step')) / 2
          };

          for (let wi = chaseWidth.min; wi <= chaseWidth.max; wi += chaseWidth.step) {
            for (let li = chaiseLength.min; li <= chaiseLength.max; li += chaiseLength.step) {
              new Image().src = self.getAnimatedFrameUrl(self.imageUrlFormats['chaise-width'], {
                chaise_width: wi,
                chaise_length: li
              });
            }
          }

        } else {
          self.$sofaBox.find('input[type="range"]').each(function() {
            let rangeName = $(this).data('range'),
                min = parseInt($(this).attr('min')),
                max = parseInt($(this).attr('max')),
                step = parseInt($(this).attr('step')) / 2;

            for (let inch = min; inch <= max; inch += step) {
              new Image().src = self.getAnimatedFrameUrl(self.imageUrlFormats[rangeName], inch);
            }
          });
        }
      }
    },

    onDpoEvents: function() {
      var self = this;

      if (isFlat) {
        return
      }

      $(window).on('dpo_initialized', function() {
        // Copy the product custom fields to DPO fields
        self.copyVariantCustomFields(self.variants.currentVariant);

        //self.startGuideAnimation();
        self.isDpoLoaded = true;
        self.enableAddToCartButton();

      }).on('dpoPriceUpdate', function(e, returnObj) {
        // Render Compare At price again
        if (theme.settings.discountPercent > 0 && !theme.settings.noDiscount) {
          var compareAtPrice = returnObj.current_prices.price * 100;
          var salePrice = returnObj.current_prices.price * (100 - theme.settings.discountPercent);

          var moneyFormat = theme.strings.moneyFormat;
          $(self.selectors.comparePrice).html(theme.Currency.formatMoney(compareAtPrice, moneyFormat));

          $(self.selectors.productPrice).html(theme.Currency.formatMoney(salePrice, moneyFormat));

          self.changeAffirmPrice(salePrice);
        } else {  
          $(self.selectors.comparePrice).parent().hide();

          if (window.productTags.indexOf('No Fabric') > -1) {
            var salePrice = returnObj.current_prices.price * 100;
            self.changeAffirmPrice(salePrice);
          }
        }

      }).one('dpoPriceUpdate', function() {
        $(self.selectors.priceContainer, self.$container).removeClass(
          'visibility-hidden'

        ).prev('.row-pulse').remove();
      });

    },

    initSizeTabs: function() {
      var self = this;

      self.$sofaBox.find('.tab-nav').on('click', '.tab-item .btn', function() {
        var key = $(this).data('key');

        $('.tab-pane').removeClass('active');
        $('.tab-pane--' + key).addClass('active');

        var $parent = $(this).parent();
        $parent.addClass('active').siblings().removeClass('active');
      });
    },

    onSwitchExpand: function() {
      let self = this;

      self.$sofaBox.filter('.is-animate').find('#chk_drawing_mode').change(function() {
        // animation | drawing
        let type = self.$productBox.attr('data-expand');
        if (this.checked) {
          type = 'drawing';
        } else {
          type = 'animation';
        }
        self.$productBox.attr('data-expand', type);
      });
    },

    onChooseDepth: function() {
      var self = this;

      self.$sofaBox.on('change', 'input[name="depth"]', function() {
        $('body').toggleClass('product-extra-deep', this.value === 'extra');

        //self.$sofaBox.find('.depth-image').children('img').attr('src', $(this).data('src'));
        self.$spanDepth.toggleClass('hide', this.value !== 'extra');

        if (self.is('extraDepth')) {
          var widthOffset = self.variables.extraDeepOffset;

          if (this.value !== 'extra') {
            widthOffset = -widthOffset;
          }

          if (self.is('with-chaise')) {
            // Adjust the width range for "Extra Deep" Sofa With Chaise
            let $range = $('.size-range.chaise-width');
            const currentVal = parseInt($range.val());
            var wMin = parseInt($range.attr('min'));
            var wMax = parseInt($range.attr('max'));
            var wVal = currentVal + widthOffset;

            $range.attr('min', wMin + widthOffset);
            $range.attr('max', wMax + widthOffset);
            $range.val(wVal);

            // Update the label in the size box heading
            self.$sofaBox.find('.sofa-size--chaise-width .sofa-size-v').html(wVal);

            $range.rangeslider('update', true);

            self.changeSofaSize($range[0], true);

            // Adjust "Overall Width"
            var overall_key = '';
            var overall_offset = 0;

            if (self.is('ushaped')) {
              overall_key = 'overall-width';
            } else {
              overall_key = 'sofa';
            }

            if (typeof self.variables['extraDeepOverallOffset'] !== 'undefined') {
              overall_offset = self.variables['extraDeepOverallOffset'];
            }

            $range = $('.size-range.' + overall_key);
            wMin = parseInt($range.attr('min'));
            wMax = parseInt($range.attr('max'));

            if (this.value !== 'extra') {
              overall_offset = -overall_offset;
            }
          
            $range.attr('min', wMin + overall_offset);
            $range.attr('max', wMax + overall_offset);
            $range.val(currentVal + overall_offset);

            // Update the label in the size box heading
            self.$sofaBox.find('.sofa-size--' + overall_key +' .sofa-size-v').html(wVal);

            $range.rangeslider('update', true);

            self.changeSofaSize($range[0], true);

          } else if (self.is('ushaped')) {
            // U-Shaped Sectional | U-Shaped Sectional With Bumper

            // Adjust overall width
            let overall_key = 'overall-width';
            let $range = $('.size-range.' + overall_key);
            const currentVal = parseInt($range.val());
            const wMin = parseInt($range.attr('min'));
            const wMax = parseInt($range.attr('max'));

            $range.attr('min', wMin + widthOffset);
            $range.attr('max', wMax + widthOffset);
            $range.val(currentVal + widthOffset);

            self.$sofaBox.find('.sofa-size--' + overall_key +' .sofa-size-v').html(wVal);

            $range.rangeslider('update', true);
            self.changeSofaSize($range[0], true);
          }
        }

        self.calcPropertySize();

        self.copyVariantCustomFields(self.variants.currentVariant);
      });
    },

    updateCustomAnimationImage: function(variant) {
      // Replace URL
      var self = this;
      if (variant.featured_image) {
        var src = variant.featured_image.src;
      }
      else {
        var src = self.getCustomAnimationUrl(variant);
      }
      self.$customAnimationImage[0].src = src;

      let filename = src.substr(src.lastIndexOf('/') + 1);
      filename = filename.split('.')[0];

      self.$customAnimationImage[0].alt = filename;
    },

    updateDrawingImage: function(variant) {
      // Replace URL
      var self = this;

      var values = {};
      self.$sofaBox.find('input[type="range"]').each(function(e) {
        var key = $(this).data('range');
        if (!key) {
          return true;
        }
        
        values[key] = this.value;
      });

      let src = self.getDrawingUrl(values, variant);
      self.$drawingImage[0].src = src;

      let filename = src.substr(src.lastIndexOf('/') + 1);
      filename = filename.split('.')[0];

      self.$drawingImage[0].alt = filename;
    },

    changeSofaSize: function(elem, forceRender) {
      var self = this;

      var $range = $(elem);
      var key = $range.data('range');
      var oldValue = parseFloat(self.rangeValues[key]);
      var newValue = parseFloat(elem.value);

      var forceRender = forceRender || false;
      if (newValue == oldValue && forceRender == false) {
        return;
      }

      self.$sofaBox.find('.sofa-size--' + key).find('.sofa-size-v').html(newValue);

      if (self.isAnimate) {
        if (self.is('custom')) {
          // Simply update animation expand/contract image
          self.updateCustomAnimationImage();

        } else {
          // Animation
          if (self.sofaAnimationTimer[key]) {
            clearTimeout(self.sofaAnimationTimer[key]);
          }

          var animationSteps = parseFloat((newValue - oldValue) / self.numFrames);

          if (self.is('ushaped')) {
            // Left side
            self.animateSofaSize(oldValue, newValue, {
              key: key,
              imageUrlFormat: self.imageUrlFormatUshaped,
              animationSteps: animationSteps,
              forceRender: forceRender
            });

          } else {
            self.animateSofaSize(oldValue, newValue, {
              key: key,
              imageUrlFormat: self.imageUrlFormats[key],
              $rangeImage: self.$blockVariantImgs[key],
              animationSteps: animationSteps,
              forceRender: forceRender
            });            
          }
        }
      }

      // Update line drawing expand/contract images
      if (self.is('extraDepth') && $('input[name="depth"]:checked').val() === 'extra') {
        // Skip updating Drawing image
      } else {
        // Update drawing image
        self.updateDrawingImage();
      }

      // Save current value to the old value
      self.rangeValues[key] = newValue;

      // Update variant custom fields
/*      for (var key in self.variables.variants) {
        var selector = '#' + self.variables.product[key].dpoId;
        $(selector).val(self.variables.product[key].value);
      }
*/
      // Update dpo option
      //var dpoElemSelector = '#' + $(elem).data('dpoId');
      //$(dpoElemSelector).val(newValue).trigger('change');
    },

    calcPropertySize: function() {      
      let property_size = '';
      const isExtraDepth = this.is('extraDepth');

      if (this.is('custom')) {
        property_size = $("#ProductSelect").find('option:checked').data('title');

      } else {
        property_size = this.$sofaBox.find('input[type="range"]').map(function() {  
          return this.value + '"';
        }).get().join(' x ');
      }

      // Depth
      if (isExtraDepth) {
        if ( $('input[name="depth"]:checked').val() === 'extra' ) {
          property_size += ", Extra Deep " + this.variables.depth2 + '"';
        } else {
          property_size += ", Standard " + this.variables.depth1 + '"';
        }
      }

      $('#properties_size').val(property_size);
    },

    initSizeSlider: function() {
      var self = this;
      var $ranges = self.$sofaBox.find('input[type="range"]');

      window.productImgUrls = {};

      self.$blockVariantImgs = {};

      if (self.is('ushaped')) {
        self.imageUrlFormatUshaped = $('#image_url_format').val();

        self.$blockVariantImgs['left'] = self.$sofaBox.find('.side-left').find('.block-variant-img').children('img');
        self.$blockVariantImgs['right'] = self.$sofaBox.find('.side-right').find('.block-variant-img').children('img');

      } else {
        self.imageUrlFormats = {};

        $ranges.each(function() {
          let key = $(this).data('range');

          self.imageUrlFormats[key] = $('#image_url_format--' + key).val();
          self.$blockVariantImgs[key] = self.$sofaBox.find('.side-' + key).find('.block-variant-img').children('img');

          if(key == 'sofa' || key == 'long-side' || key == 'overall-width') {
            window.productImgUrls['imgUrl1'] = self.$sofaBox.find('.side-' + key).find('.block-variant-img').children('img').attr('src');
          } else if(key == 'right-left-side' || key == 'chaise-width' || key == 'chaise-length' || key == 'bumper') {
            window.productImgUrls['imgUrl2'] = self.$sofaBox.find('.side-' + key).find('.block-variant-img').children('img').attr('src');
          }
        })
      }

      $ranges.one('input', function() {
        if (!self.is('printout') && !self.lastLoadedFabricCollection && !isFlat) {
          self.loadFabrics(self.defaultFabricCategory);
        }

      }).rangeslider({
        polyfill: false
      });

      self.calcPropertySize();
    },

    onChooseOrientation: function() {
      var self = this;

      self.$sofaBox.find('.orientation-option').change(function() {
        self.updateDrawingImage();

        if (this.name !== 'drawer') {
          const isFlip = $(this).attr('data-flip');
          self.$cardAnimation.toggleClass('flip-horz', isFlip === 'true');

          if (!self.is('with-chaise')) {
            self.$ranges.toggleClass('flip-horz-range', isFlip === 'true');
          }
        }

        // Adjust Custom Properties field for orientation
        $(this).closest('.block-orientation-options').find('.prop-orientation').val($(this).data('prop'));

        // Adjust SKUs
        self.copyVariantCustomFields(self.variants.currentVariant);
      });
    },

    onRangeInput: function(e) {
      var self = this,
          element = e.target,
          $this = $(element),
          rangeName = $this.data('range'),
          prevValue = $this.data('prev'),
          currentValue = element.value;

      if (prevValue == currentValue) {
        return true;
      }

      // 95 - 130 vs 90 - 125 (Shift range by 5 based on Chaise Width (37 vs 42))
      if (self.is('with-chaise') && rangeName == 'chaise-width') {
        var min = parseInt($this.attr('min'));
        var max = parseInt($this.attr('max'));

        if (self.is('ushaped')) {
          var $rangeSofa = $('.size-range.overall-width');
          var sofaValue = parseInt($rangeSofa.val());
          var sofaMin = parseInt($rangeSofa.attr('min'));
          var sofaMax = parseInt($rangeSofa.attr('max'));
          var sofaStep = parseInt($rangeSofa.attr('step'));

          if (currentValue == min) {
            $rangeSofa.attr('min', sofaMin - sofaStep * 2);
            $rangeSofa.attr('max', sofaMax - sofaStep * 2);
            
            if (sofaValue == sofaMax) {
              $rangeSofa.val(sofaMax - sofaStep * 2);
              $('.sofa-size--overall-width .sofa-size-v').html(sofaMax - sofaStep * 2);
            } 

          } else if (currentValue == max) {
            $rangeSofa.attr('min', sofaMin + sofaStep * 2);
            $rangeSofa.attr('max', sofaMax + sofaStep * 2);

            if (sofaValue == sofaMin) {
              $rangeSofa.val(sofaMin + sofaStep * 2);
              $('.sofa-size--overall-width .sofa-size-v').html(sofaMin + sofaStep * 2);
            }
          }

        } else {
          var $rangeSofa = $('.size-range.sofa');
          var sofaValue = parseInt($rangeSofa.val());
          var sofaMin = parseInt($rangeSofa.attr('min'));
          var sofaMax = parseInt($rangeSofa.attr('max'));
          var sofaStep = parseInt($rangeSofa.attr('step'));

          if (currentValue == min) {
            $rangeSofa.attr('min', sofaMin - sofaStep);
            $rangeSofa.attr('max', sofaMax - sofaStep);
            
            if (sofaValue == sofaMax) {
              $rangeSofa.val(sofaMax - sofaStep);
              $('.sofa-size--sofa .sofa-size-v').html(sofaMax - sofaStep);
            } 

          } else if (currentValue == max) {
            $rangeSofa.attr('min', sofaMin + sofaStep);
            $rangeSofa.attr('max', sofaMax + sofaStep);

            if (sofaValue == sofaMin) {
              $rangeSofa.val(sofaMin + sofaStep);
              $('.sofa-size--sofa .sofa-size-v').html(sofaMin + sofaStep);
            }
          }
        }

        $rangeSofa.rangeslider('update', true);

        self.changeSofaSize($rangeSofa[0], true);
      }

      self.changeSofaSize(element);

      // Get size property as single value
      self.calcPropertySize();

      $this.data('prev', currentValue);
    },

    startGuideAnimation: function() {
      var self = this;

      // Keep initial values of Range sliders to the scope
      var ticks = {};
      
      self.numFrames = 1;

      for (var key in this.rangeValues) {
        var $range = $('input[data-range="' + key + '"]');
        if ($range.length == 0) {
          continue;
        }

        ticks[key] = [];

        var current_value = parseInt($range.val());

        this.$sofaRanges[key] = $range;
        this.rangeValues[key] = current_value;

        var min = parseInt($range.attr('min'));
        var max = parseInt($range.attr('max'));
        var step = parseInt($range.attr('step'));

        for(var i = current_value; i <= max; i+=step) {
          ticks[key].push(i);
        }

        for(i = max - step; i >= min; i-=step) {
          ticks[key].push(i);
        }

        if (min != current_value) {
          for(i = min + step; i <= current_value; i+=step) {
            ticks[key].push(i);
          }
        }

        (function(key) {
          self.sofaGuideIndexes[key] = 0;
          self.sofaGuideIntervals[key] = setInterval(function() {
            if (ticks[key].length <= self.sofaGuideIndexes[key]) {
              clearInterval(self.sofaGuideIntervals[key]);
              self.sofaGuideIntervals[key] = null;

              var isStillRunning = false;
              for (var k in self.sofaGuideIntervals) {
                if (self.sofaGuideIntervals[k]) {
                  isStillRunning = true;
                }
              }

              if (!isStillRunning) {
                self.numFrames = 2;
              }

              return;
            }

            $range = self.$sofaRanges[key];

            $range.val(ticks[key][self.sofaGuideIndexes[key]]).trigger('change');
            self.changeSofaSize($range[0]);

            self.sofaGuideIndexes[key]++;
          }, 500);
        })(key);
      }
    },

    initAccordion: function() {
      var self = this,
          $accordion = self.$sofaBox.find(".accordion");

      $accordion.on('click', '.panel-toggle', function() {
        let $this = $(this);
        let $parentLi = $this.parent('li');
        if ($parentLi.hasClass('active')) {
          $parentLi.removeClass('active');
          $this.next('div').slideUp();
          return false;
        }

        // Slide up previous active panel
        $accordion.find('.active').removeClass('active').children('div').slideUp();

        // Slide down current panel
        let accordionName = $parentLi.data('name');
        let $activeLi = $parentLi.addClass('active');

        $activeLi.children('div').slideDown(function() {
          if (accordionName === 'fabric') {
            $(window).trigger('resize.twentytwenty');
          }

          if (accordionName != 'size') {
            //let yOffset = window.innerWidth < 768 ? 0 : -10; 
            let yOffset = 1;

            // Scroll to the top
            $('html, body').animate({
              scrollTop: $activeLi.offset().top + yOffset
            }, 250);
          }
        });

        if (accordionName === 'fabric') {
          if (self.lastLoadedFabricCollection == false) {
            self.loadFabrics(self.defaultFabricCategory);
          }

          self.selectedFabric = true;
        } else if (accordionName === 'leg') {
          self.selectedLeg = true;
        }

        self.enableAddToCartButton();

        return false;
      });
    },

    initAccordionReadyMade: function() {
      var self = this,
          $accordion = self.$sofaBox.find(".accordion");

      $accordion.on('click', '.panel-toggle', function() {
        let $this = $(this);
        let $parentLi = $this.parent('li');
        if ($parentLi.hasClass('active')) {
          $parentLi.removeClass('active');
          $this.next('div').slideUp();
          return false;
        }

        // Slide down current panel
        let accordionName = $parentLi.data('name');
        let $activeLi = $parentLi.addClass('active');

        $activeLi.children('div').slideDown(function() {
          if (accordionName === 'fabric') {
            $(window).trigger('resize.twentytwenty');
          }
        });

        self.enableAddToCartButton();

        return false;
      });
    },

    initFabricZoom: function() {
      $('.row-fabric-compare').twentytwenty({
        no_overlay: true
      });
    },

    onFabricInfo: function() {
      this.$sofaBox.find('.fabric-popup-trigger').magnificPopup({
        type: 'inline',
        preloader: false,
        // Delay in milliseconds before popup is removed
        removalDelay: 300,
        mainClass: 'mfp-fade mfp-fabric'
      });

      this.$sofaBox.find('.decide-later-info').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-decide-later',
      });
    },

    onCornerInfo: function() {
      var self = this;

      const cornerImageWidth = 240;

      this.$sofaBox.find('.popup-corner-info').magnificPopup({
        type: 'inline',
        closeOnContentClick: true,
        removalDelay: 300,
        mainClass: 'mfp-fade mfp-fabric mfp-corner-info',
        callbacks: {
          open: function() {
            self.resizeCornerInfoBlocks();

            var $anchor = $(this._lastFocusedEl),
                orientation = $anchor.data('orientation'),
                $frm = $($anchor.attr('href')),
                src = $anchor.data("src").replace("_1x1.", "_" + parseInt(cornerImageWidth * window.devicePixelRatio) + "x.");

            $frm.find('img').attr('src', src);
          }
        }
      });

      $(window).on('scroll resize', function() {
        self.resizeCornerInfoBlocks();
      });
    },

    resizeCornerInfoBlocks: function() {
      $('.popup-block--corner-info').each(function() {
        var $this = $(this),
            $anchor = $($this.data('trigger')),
            orientation = $anchor.data('orientation'),
            top = $anchor.offset().top - $(window).scrollTop(),
            right = window.innerWidth - $anchor.offset().left - 30 - (orientation === 'left' ? 10 : 0);

        var popupHeight = $this.height();
        if (top + popupHeight > window.innerHeight - 30) {
          top -= popupHeight + 80;
        }

        $(this).css({
          right: right + 'px',
          top: top + 'px'
        });
      });      
    },

    onChooseFabricCategory: function() {
      var self = this;
      $("#sel_fabric_cat").change(function() {
        self.loadFabrics(this.value);
      });
    },

    loadFirstFabricCategory: function() {
      var self = this;
      self.$sofaBox.find('.step-fabric').one('mouseenter', function() {
        // console.log('1. queryString\n', window.location.search);
        if (isFlat) {
          // console.log('isFlat\n', true);
          // Select product options based on URL parameters
          var queryString = window.location.search;
          var urlParams = new URLSearchParams(queryString);
          var fabricCategory = urlParams.get('fabric-category');
          var fabricCategoryHandle = '';

          const maps = {
            'Patterned': 'fabric-patterned',
            'Performance': 'fabric-performance',
            'Leather': 'fabric-leather',
            'Velvet': 'fabric-velvet',
            'Decide Later': 'decide-later'
          };

          if (typeof maps[fabricCategory] !== 'undefined') {
            fabricCategoryHandle = maps[fabricCategory];
          
            self.loadFabrics(fabricCategoryHandle);
          }

        } else {
          self.loadFabrics(self.defaultFabricCategory);
        }
      });
    },

    getFabricCategoryDpoValue: function(tagsCombined) {
      var self = this;

      if (tagsCombined.includes('Fabric: Velvet')) {
        return self.settings.fabricDpoValues.velvet;
      } else if (tagsCombined.includes('Fabric: Leather')) {
        return self.settings.fabricDpoValues.leather;
      }

      // Default value
      return self.settings.fabricDpoValues.standard;
    },

    loadFabrics: function(collection_key) {
      var self = this;

      // if (isFlat){
      //   return
      // }

      if (typeof self.loadingFabrics[collection_key] !== 'undefined' && self.loadingFabrics[collection_key]) {
        return;
      }

      self.loadingFabrics[collection_key] = true;

      var $panel = $(".panel-fabric--" + collection_key);

      self.lastLoadedFabricCollection = collection_key;

      if ($panel.hasClass('loaded')) {
        // Just show the panel
        $panel.siblings().addClass('hide');
        $panel.removeClass('hide');

        if (!isFlat) { 
          $panel.find('.sofa-card--active').first().trigger('click');
        }

        self.loadingFabrics[collection_key] = false;

      } else {
        // Not loaded yet, load collection products
        var url = '/collections/' + collection_key + '?view=metafields',
            thumbUrl, zoomSmallUrl, zoomBigUrl,
            collection = null,
            imagesToPreload = null,
            fabricCategoryDpoValue = null,
            html = '';

        jQuery.ajax({
          url: url,
          type: 'GET',
          success: function(response) {
            collection = JSON.parse(response);

            html = '';
            if (collection.products.length > 0) {
              imagesToPreload = [];

              // Standard by default (no upsell percent)
              fabricCategoryDpoValue = self.settings.fabricDpoValues.standard;

              let htmlFabricNames = '';

              for (let pi = 0; pi < collection.products.length; pi++) {
                let product = collection.products[pi];

                // If there is no image for this fabric, skip to the next one
                if (product.images.length == 0) {
                  continue;
                }

                thumbUrl = theme.Images.getSizedImageUrl(product.images[0], '160x');
                zoomSmallUrl = theme.Images.getSizedImageUrl(product.images[0], '400x240_crop_center');

                if (typeof product.images[1] !== 'undefined') {
                  zoomBigUrl = theme.Images.getSizedImageUrl(product.images[1], '600x360_crop_center');
                } else {
                  zoomBigUrl = theme.Images.getSizedImageUrl(product.images[0], '600x360_crop_center');
                }

                //imagesToPreload.push(zoomSmallUrl);
                //imagesToPreload.push(zoomBigUrl);

                fabricCategoryDpoValue = self.getFabricCategoryDpoValue(product.tags.join(','));

                html += '<div';
                if (product.category_desc) {
                    html += ' data-description="' + product.category_desc.htmlEntities() + '"';
                }

                if (product.category) {
                  if (typeof product.category.fabric_content !== 'undefined') {
                    html += ' data-content="' + product.category.fabric_content + '"';
                  }

                  if (typeof product.category.fabric_cleaning_code !== 'undefined') {
                    html += ' data-cleaning-code="' + product.category.fabric_cleaning_code + '"';
                  }

                  if (typeof product.category.fabric_rub_count !== 'undefined') {
                    html += ' data-rub-count="' + product.category.fabric_rub_count + '"';
                  }

                  if (typeof product.category.fabric_best_for !== 'undefined') {
                    html += ' data-best-for="' + product.category.fabric_best_for + '"';
                  }

                  // Type: Leather only
                  if (product.tags.indexOf('Fabric: Leather') > -1) {
                    html += ' data-is-leather="1"';

                    if (typeof product.category.fabric_type !== 'undefined') {
                      html += ' data-type="' + product.category.fabric_type + '"';
                    }

                    // Finish: Leather only
                    if (typeof product.category.fabric_finish !== 'undefined') {
                      html += ' data-finish="' + product.category.fabric_finish + '"';
                    }
                  } else {
                    html += ' data-is-leather="0"';                    
                  }
                }

                html += ' data-fabric-handle="' + product.handle + '"';
                html += ' data-fabric-dpo-value="' + fabricCategoryDpoValue + '"';
                html += ' data-tags="' + product.tags + '"';
                html +=' class="sofa-card sofa-card--fabric fabric-slot--backup">';
                html += '<div class="sofa-card--thumb">';
                html +=   '<img data-zoom-big="' + zoomBigUrl +'" data-zoom-small="' + zoomSmallUrl + '" src="' + thumbUrl + '" alt="' + product.title + '">';
                html += '</div>';
                html += '<div class="sofa-card--name">';
                html +=   product.title;
                html += '</div>';
                html += '</div>';

                htmlFabricNames += '<option value="' + product.handle + '">' + product.title + '</option>';
              }

              $panel.find('.sofa-card--list').html(html);
              $panel.find('.sofa-card').first().trigger('click');
              
              /*
              // Preload
              var delayTime = 0;
              if (self.isFirstLoadingFabrics) {
                self.isFirstLoadingFabrics = false;
                delayTime = 8000;
              }

              setTimeout(function() {
                theme.Images.preload(imagesToPreload);
              }, delayTime);
              */
            }

            $panel.siblings().addClass('hide');
            $panel.addClass('loaded').removeClass('hide');

            if (window.isAccentChair) {
              $('.step-fabric .panel-heading').trigger('click');
              $(window).trigger('resize.twentytwenty');
            }

            self.loadingFabrics[collection_key] = false;
          },

          error: function() {
            console.error(arguments);
            self.loadingFabrics[collection_key] = false;
          }
        });
      }

    },

    setProperty: function(property, value) {
      if (property === 'fabric') {
        $('#properties_fabrics').val(value);
      }
    },

    onChooseFabric: function() {
      var self = this;

      self.$fabricThumb = self.$sofaBox.find('.step-fabric .preview-fabric').children('img');
      self.$fabricCompareZoom = self.$sofaBox.find('.step-fabric .fabric-zoom');
      self.$fabricCompareNormal = self.$sofaBox.find('.step-fabric .fabric-normal');

      self.$sofaBox.on('click', '.sofa-card--fabric', function() {
        var $slot = $(this);
        $slot.addClass('sofa-card--active').siblings().removeClass('sofa-card--active');

        var $img = $slot.find('img');
        var fabricName = $img.attr('alt');
        var src = $img.attr('src');

        // Thumbnail
        self.$fabricThumb.attr('src', src);
        self.$fabricThumb.attr('alt', fabricName);

        // Compare box
        self.$fabricCompareNormal.attr({
          'src': $img.attr('data-zoom-small')
        });
        self.$fabricCompareZoom.attr({
          'src': $img.attr('data-zoom-big')
        });

        // Show current selected Fabric Name
        $(".comp-selected-fabric .fabric-name").html(fabricName);

        var fabricDescription = $slot.data('description');
        if (fabricDescription == '') {
           fabricDescription = $('#frm_fabric_info .lorem-ipsum').html();
        }
        
        var $frmInfo = $("#frm_fabric_info");
        $frmInfo.find('h3').html(fabricName).end()
          .find('.description').html(fabricDescription).end()
          .find('.dd-content').html($slot.data('content') || '');

        if ($slot.data('isLeather')) {
          $frmInfo.attr('data-type', 'leather')
            .find('.dd-type').html($slot.data('type') || '').end()
            .find('.dd-finish').html($slot.data('finish') || '').end();
        } else {
          $frmInfo.attr('data-type', 'fabric')
            .find('.dd-rub-count').html($slot.data('rub-count') || '').end()
            .find('.dd-cleaning-code').html($slot.data('cleaning-code') || '').end()
            .find('.dd-best-for').html($slot.data('best-for') || '');
        }

        // Value to be added to the cart
        self.setProperty('fabric', fabricName);

        if (isFlat) {
          return
        }

        // Choose Fabric Category DPO value
        self.dpoFabricCategoryId = $slot.data('fabricDpoValue');
        $(self.settings.fabricDpoSelector).val(self.dpoFabricCategoryId).trigger('change');

        setTimeout(function() {
          $(window).trigger('resize.twentytwenty');
        }, 300);
      });
    },

    initFabricReadyMade: function() {
      var self = this;

      self.$fabricThumb = self.$sofaBox.find('.step-fabric .preview-fabric').children('img');
      self.$fabricCompareZoom = self.$sofaBox.find('.step-fabric .fabric-zoom');
      self.$fabricCompareNormal = self.$sofaBox.find('.step-fabric .fabric-normal');

      var $slot = self.$sofaBox.find('.sofa-card--active');
      var $img = $slot.find('img');
      var fabricName = $img.attr('alt');
      var src = $img.attr('src');

      // Thumbnail
      self.$fabricThumb.attr('src', src);
      self.$fabricThumb.attr('alt', fabricName);

      // Compare box
      self.$fabricCompareNormal.attr({
        'src': $img.attr('data-zoom-small')
      });
      self.$fabricCompareZoom.attr({
        'src': $img.attr('data-zoom-big')
      });

      // Show current selected Fabric Name
      $(".comp-selected-fabric .fabric-name").html(fabricName);

      var fabricDescription = $slot.data('description');
      if (fabricDescription == '') {
         fabricDescription = $('#frm_fabric_info .lorem-ipsum').html();
      }
      
      var $frmInfo = $("#frm_fabric_info");
      $frmInfo.find('h3').html(fabricName).end()
        .find('.description').html(fabricDescription).end()
        .find('.dd-content').html($slot.data('content') || '');

      if ($slot.data('isLeather')) {
        $frmInfo.attr('data-type', 'leather')
          .find('.dd-type').html($slot.data('type') || '').end()
          .find('.dd-finish').html($slot.data('finish') || '').end();
      } else {
        $frmInfo.attr('data-type', 'fabric')
          .find('.dd-rub-count').html($slot.data('rub-count') || '').end()
          .find('.dd-cleaning-code').html($slot.data('cleaning-code') || '').end()
          .find('.dd-best-for').html($slot.data('best-for') || '');
      }

      // Value to be added to the cart
      self.setProperty('fabric', fabricName);

      setTimeout(function() {
        $(window).trigger('resize.twentytwenty');
      }, 300);

      // When you click another fabric, redirect to that product
      self.$sofaBox.on('click', '.sofa-card--fabric', function() {
        let $slot = $(this);
        if ($slot.hasClass('sofa-card--active')) {
          return false;
        }

        // Replace last word in the URL and redirect there
        //     /products/readymade-skinny-fat-sectional-mouse-90 
        //  => /products/readymade-skinny-fat-sectional-shark-90
        const productSuffix = $slot.data('productSuffix');
        const url = location.pathname.split('-');
        url[url.length - 2] = productSuffix;
        location.href = url.join('-');
      });

      self.$sofaBox.on('change', '[name="option1"]', function(e) {
        e.preventDefault();
        e.stopPropagation();

        let $option = $(this);

        // Replace last word in the URL and redirect there
        //     /products/readymade-skinny-fat-sectional-mouse-90 
        //  => /products/readymade-skinny-fat-sectional-mouse-95
        const productSuffix = $option.data('inch');
        const url = location.pathname.split('-');
        url[url.length - 1] = productSuffix;
        location.href = url.join('-');

        return false;
      });
    },

    onChooseDecideColorLater: function() {
      var self = this;

      self.$sofaBox.on('change', 'input[name="pick_color_later"]', function() {
        var $fabricsDpo = $(self.settings.fabricDpoSelector);
        
        if (this.checked) {
          // Hide Fabric elements
          $('.fabrics-enabled-only', self.$sofaBox).each(function() {
            if ($(this).hasClass('animation-fade')) {
              $(this).fadeOut();
            } else {
              $(this).slideUp();
            }
          });

          // Clear fabrics info
          var $fabrics = self.$sofaBox.find('#properties_fabrics');
          $fabrics.data('prev', $fabrics.val()).val('N/A').trigger('change');

          self.dpoFabricCategoryId = self.settings.fabricDpoValues.decideLater;
          $fabricsDpo.data('prev', $fabricsDpo.val());

        } else {
          // Show Fabric elements
          $('.fabrics-enabled-only', self.$sofaBox).each(function() {
            if ($(this).hasClass('animation-fade')) {
              $(this).fadeIn();
            } else {
              $(this).slideDown();
            }
          });

          $('#properties_fabrics').val($('#properties_fabrics').data('prev')).trigger('change');

          self.dpoFabricCategoryId = $fabricsDpo.data('prev');
        }

        $fabricsDpo.val(self.dpoFabricCategoryId).trigger('change');
      });
    },

    onChooseCushion: function() {
      var self = this;

      $('.cushion-label').click(function() {
        var dpoId = $(this).data('dpoId');
        $(self.settings.cushionDpoSelector).val(dpoId).trigger('change');
      }); 
    },

    onChooseLeg: function() {
      var self = this;

      self.$sofaBox.find('.sofa-leg-options .sofa-card').click(function() {
        var activeClass = 'sofa-card--active';
        $(this).addClass(activeClass).siblings().removeClass(activeClass);

        var dpoId = $(this).data('dpoId');
        $(self.settings.legDpoSelector).val(dpoId).trigger('change');
      });
    },

    initBreakpoints: function() {
      var self = this;
      var $container = self.$container;
      self.zoomType = $container.data('image-zoom-type');

      enquire.register(theme.variables.mediaQuerySmall, {
        match: function() {
          self.createImageCarousel();
          if (self.zoomType) {
            if ($(self.selectors.productImagePhoto).length) {
              // remove event handlers for product zoom on mobile
              $(self.selectors.productImagePhoto).off();
              $(self.selectors.productImagePhoto).trigger('zoom.destroy');
            }
          }
        },
        unmatch: function() {
          self.destroyImageCarousel();
          self.reorderImages();
          if (self.zoomType) {
            // reinit product zoom
            self.productImageZoom();
          }
        }
      });
    },

    copyVariantCustomFieldsUshaped: function(variant) {
      var self = this,
          variantId = variant ? variant.id : false;

      // Collection prefix
      // e.g. SFS: Skinny Fat (Standard),  SFE: Skinny Fat (Extra Depth)
      var extraDepthMapPrefixMap = {
        'SFS-': 'SFE-',
        'CPW-': 'CWE-',
        'CPT-': 'CTE-'
      };

      // Depth Option (standard | extra)
      var depthOption = 'standard';
      if (self.is('extraDepth')) {
        depthOption = $('input[name="depth"]:checked').val();
      }

      // Orientation option
      var fixSku = function(sku) {
        if (!sku) {
          console.error('Invalid sku for priceIndex = ' + priceIndex);
          return 'Invalid SKU';
        }

        if (depthOption === 'extra') {
          for(var old in extraDepthMapPrefixMap) {
            sku = sku.replace(old, extraDepthMapPrefixMap[old]);
          }
        }

        return sku;
      };

      // Copy product custom field (Discount Percent)
      var selector = '#' + self.variables.product.upsellPercent.dpoId;
      $(selector).val(self.variables.product.upsellPercent.value);

      // Copy variant values (price, cac, overheadPercent) from variants => dpo fields
      self.$sofaBox.find('.size-range').each(function() {
        var rangeKey = $(this).data('range');
        if (rangeKey === 'chaise-length') {
          return true;
        }

        var priceIndex = $(this).data('priceIndex');
        if (priceIndex < 1) {
          return true;
        }

        /**
        * priceIndex = 1 or 2
        * this.value = 65, 70, 75, ...
        *
        * U-Shaped Sectional:         1 = Overall (sku2), 2 = Side Length (sku1, sku3)
        * U-Shaped Bumper Sectional:  1 = Overall (sku2), 2 = Side Length (sku1, sku3)
        * Double Chaise Sectional:    1 = Overall (sku2), 2,3 = Chaise Width x Chaise Length (sku1, sku3)
        */

        var frameSize = this.value;
        var currentDepth = depthOption === 'extra' ? self.variables.depth2 : self.variables.depth1;

        if (priceIndex == 2) {
          // Overall width
          if (self.is('with-chaise')) {
            frameSize -= $('.chaise-width').val() * 2;
          } else {
            //frameSize -= currentDepth * 2;
            frameSize -= self.variables.depth1 * 2;
          }
        } else if (priceIndex == 1) {
          // Right/Left side
          if (self.is('with-chaise')) {
            // frameSize = "37 / 63" (e.g.)
            frameSize += ' / ' + $('.chaise-length').val();
          }
        }

        var variant = self.variables.variants[priceIndex][frameSize];
        if (typeof variant === 'undefined') {
          console.error('Variant is not found: priceIndex = ' + priceIndex + ', frameSize = ' + frameSize);
          return true;
        }

        for (var key in variant) {
          if (key === 'v') {
            continue;
          }
          
          var selector = '#' + variant[key].dpoId;
          $(selector).val(variant[key].value);
        }

        var sku = fixSku(variant.v.sku); 
        $('#prop_sku' + priceIndex).val(sku);

        if (priceIndex === 1) {
          // Copy sku to #prop_sku3 with opposite orientation
          // For example, if sku1 is SFS-Q80-LA, then sku3 = SFS-Q80-RA
          $('#prop_sku3').val(sku.replace('-LA', '-RA'));
        }
      });

      // Copy Depth option    
      if (self.is('extraDepth')) {
        var $selectedDepthOption = self.$sofaBox.find('input[name="depth"]:checked');
        var dpoElemSelector = '#' + $selectedDepthOption.data('dpoId');
        var dpoOptionId = $selectedDepthOption.data('dpoOptionId');
        $(dpoElemSelector).val(dpoOptionId);
      }

      // Copy fabric category
      $(self.settings.fabricDpoSelector).val(self.dpoFabricCategoryId);

      // Copy leg option
      var dpoId = self.$sofaBox.find('.sofa-leg-options .sofa-card--active').data('dpoId');
      if (window.productTags.includes('Hide Leg')) {
        dpoId = '';
        self.selectedLeg = true;
      }

      $(self.settings.legDpoSelector).val(dpoId).trigger('change');

      if (self.is('printout')) {
        // Fill frame codes and printout PDF urls
        // sku1, sku2, sku3
        let sku1 = $('#prop_sku1').val(),
            sku2 = $('#prop_sku2').val(),
            sku3 = $('#prop_sku2').val();

        $("#ct_sku1").val(sku1);
        $("#ct_sku2").val(sku2);
        $("#ct_sku3").val(sku3);

        // PDF url
        $("#ct_sku1_pdf").val(calcPrintoutPdfUrl(sku1));
        $("#ct_sku2_pdf").val(calcPrintoutPdfUrl(sku2));
        $("#ct_sku3_pdf").val(calcPrintoutPdfUrl(sku3));

        // Fill Prinout Form's Message field with the selected choices
        $('.frm-request-printout #ct_dimension').val(calcDimension());
      }

      self.hasCopiedCustomFields = true;
    },

    copyVariantCustomFields: function(variant) {
      if (this.is('ushaped')) {
        return this.copyVariantCustomFieldsUshaped(variant);
      }

      var self = this,
          variantId = variant ? variant.id : false;

      // Collection prefix
      // e.g. SFS: Skinny Fat (Standard),  SFE: Skinny Fat (Extra Depth)
      var extraDepthMapPrefixMap = {
        'SFS-': 'SFE-',
        'CPW-': 'CWE-',
        'CPT-': 'CTE-'
      };

      // Depth Option (standard | extra)
      var depthOption = 'standard';
      if (self.is('extraDepth')) {
        depthOption = $('input[name="depth"]:checked').val();
      }

      // Orientation option
      var fixSku = function(sku, priceIndex) {
        if (!sku) {
          console.error('Invalid sku for priceIndex = ' + priceIndex);
          return 'Invalid SKU';
        }

        if (depthOption === 'extra') {
          for(var old in extraDepthMapPrefixMap) {
            sku = sku.replace(old, extraDepthMapPrefixMap[old]);
          }
        }

        var ori = '';
        var oriOpp = ''; // Opposite of LA | RA (or LB | RB)
        if (self.is('sectional')) {
          if (self.is('with-bumper')) {
            // Sectional With Bumper
            ori = $('input[name="bumper_orientation"]:checked').val();
            ori = ori.replace('B', 'A');
            oriOpp = (ori === 'LA' ? 'RA' : 'LA');

            // When ori == 'RB'
            if (priceIndex == 1) {
              // SIT-S88-RA (One Arm)
              sku = sku.replace(/-(LA|RA)$/, '-' + ori);
            } else if (priceIndex == 2) {
              // SIT-B70-LA (Bumper)
              sku = sku.replace(/-(LA|RA)$/, '-' + oriOpp);
            }

          } else if (self.is('with-chaise')) {
            // Sofa With Chaise
            ori = $('input[name="chaise_orientation"]:checked').val();
            oriOpp = (ori === 'LA' ? 'RA' : 'LA');
            sku = sku.replace(/-(LA|RA)$/, '-' + ori);

            // When ori == 'LA"
            if (priceIndex == 1) {
              // SIT-S88-RA (One Arm)
              sku = sku.replace(/-(LA|RA)$/, '-' + ori);
            } else if (priceIndex == 2) {
              // SIT-QX0-LA (Chaise)
              sku = sku.replace(/-(LA|RA)$/, '-' + oriOpp);
            }

          } else {
            // Sectional
            ori = $('input[name="longside_orientation"]:checked').val();
            oriOpp = (ori === 'LA' ? 'RA' : 'LA');

            // When ori == 'LA"
            if (priceIndex == 1) {
              // SIT-S88-RA (One Arm)
              sku = sku.replace(/-(LA|RA)$/, '-' + oriOpp);
            } else if (priceIndex == 2) {
              // SIT-QX0-LA (Corner Return)
              sku = sku.replace(/-(LA|RA)$/, '-' + ori);
            }
          }

        } else {
          if (self.is('chaise')) {
            // Chaise (Standalone)
            ori = $('input[name="chaise_facing"]:checked').val();
            sku = sku.replace(/-(LA|RA)$/, '-' + ori);

          } else if (self.is('with-bumper')) {
            // Sofa with Bumper (Standalone)
            ori = $('input[name="bumper_orientation"]:checked').val();
            sku = sku.replace(/-(LB|RB)$/, '-' + ori);            
          }
        }

        return sku;
      };

      // Copy product custom field (Discount Percent)
      var selector = '#' + self.variables.product.upsellPercent.dpoId;
      $(selector).val(self.variables.product.upsellPercent.value);

      if (self.is('sectional')) {
        // Copy variant values (price, cac, overheadPercent) from variants => dpo fields
        self.$sofaBox.find('.size-range').each(function() {
          var rangeKey = $(this).data('range');
          if (rangeKey === 'chaise-length') {
            return true;
          }

          var priceIndex = $(this).data('priceIndex');
          if (priceIndex < 1) {
            return true;
          }

          // priceIndex = 1 or 2
          // this.value = 65, 70, 75, ...
          var frameSize = this.value;
          if (priceIndex == 1) {
            if (self.is('with-chaise')) {
              frameSize -= $('.chaise-width').val();
            } else {
              var currentDepth = depthOption === 'extra' ? self.variables.depth2 : self.variables.depth1;
              frameSize -= currentDepth;
            }
          } else if (priceIndex == 2) {
            if (self.is('with-chaise')) {
              // frameSize = "37 / 63" (e.g.)
              frameSize += ' / ' + $('.chaise-length').val();
            }
          }

          var variant = self.variables.variants[priceIndex][frameSize];
          if (typeof variant === 'undefined') {
            console.error('Variant is not found: priceIndex = ' + priceIndex + ', frameSize = ' + frameSize);
            return true;
          }

          for (var key in variant) {
            if (key === 'v') {
              continue;
            }
            
            var selector = '#' + variant[key].dpoId;
            $(selector).val(variant[key].value);
          }

          var sku = fixSku(variant.v.sku, priceIndex); 
          $('#prop_sku' + priceIndex).val(sku);
        });

      } else {
        var variant = self.variables.variants[variantId];

        if (typeof variant !== 'undefined') {
          for (var key in variant) {
            var selector = '#' + variant[key].dpoId;
            $(selector).val(variant[key].value);
          }

          var sku = fixSku(variant.v.sku);
          $('#prop_sku').val(sku);
        }
      }

      // Copy Depth option    
      if (self.is('extraDepth')) {
        var $selectedDepthOption = self.$sofaBox.find('input[name="depth"]:checked');
        var dpoElemSelector = '#' + $selectedDepthOption.data('dpoId');
        var dpoOptionId = $selectedDepthOption.data('dpoOptionId');
        $(dpoElemSelector).val(dpoOptionId);
      }

      // Copy fabric category
      $(self.settings.fabricDpoSelector).val(self.dpoFabricCategoryId);

      // Copy leg option
      var dpoId = self.$sofaBox.find('.sofa-leg-options .sofa-card--active').data('dpoId');
      if (window.productTags.includes('Hide Leg')) {
        dpoId = '';
        self.selectedLeg = true;
      }

      $(self.settings.legDpoSelector).val(dpoId).trigger('change');

      if (self.is('printout')) {
        // Fill frame codes and printout PDF urls
        if (self.is('sectional')) {
          // sku1, sku2
          let sku1 = $('#prop_sku1').val(),
              sku2 = $('#prop_sku2').val();

          $("#ct_sku1").val(sku1);
          $("#ct_sku2").val(sku2);

          // PDF url
          $("#ct_sku1_pdf").val(calcPrintoutPdfUrl(sku1));
          $("#ct_sku2_pdf").val(calcPrintoutPdfUrl(sku2));
        }

        // Fill Prinout Form's Message field with the selected choices
        let msg = '';

        // NOTE: this copies hidden product property field to form's hidden field. It should happen only after calcPropertySize() has been called.
        msg += 'Size: ' + $('#properties_size').val();

        if (theme.cache.$propOrientation.length > 0) {
          let propName = theme.cache.$propOrientation.data('propName');
          msg += ', ' + propName + ': ' + theme.cache.$propOrientation.val();
        }

        theme.cache.$printoutDimension.val(msg);
      }

      self.hasCopiedCustomFields = true;
    },

    stringOverrides: function() {
      // Override defaults in theme.strings with potential
      // template overrides

      theme.productStrings = theme.productStrings || {};
      $.extend(theme.strings, theme.productStrings);
    },

    resizeElements: function() {
      $(
        this.selectors.productGridImages,
        this.$container
      ).imagesLoaded(function() {
        $(this.selectors.productGridImages, this.$container)
          .css('height', 'auto')
          .equalHeights();
      });
    },

    showVariantImage: function(evt) {
      var variant = evt.variant;
      var $newImage = $(
        '.product-single__photo[data-image-id="' +
          variant.featured_image.id +
          '"]'
      );

      var imageIndex;

      if (variant && variant.featured_image) {
        this.setActiveThumbnail(variant.featured_image.id);
      }

      if (theme.variables.bpSmall) {
        // Switch carousel slide, unless it's the first photo on load
        imageIndex = $newImage.closest('.slick-slide').attr('index');
        // Navigate to slide unless it's the first photo on load
        // If there is no index, slider is not initalized.
        if (_.isUndefined(imageIndex)) {
          return;
        }

        if (imageIndex !== 0 || theme.variables.productPageLoad) {
          $(this.selectors.productImages, this.$container).slickGoTo(
            imageIndex
          );
        }
        // Switch image variant on thumbnail layout for desktop view;
        // When a image variant is updated on mobile view, update the
        // desktop view also.
        if (!this.$container.data('scroll-to-image')) {
          this.switchImage(variant.featured_image.id);
        }
      } else {
        if (this.$container.data('scroll-to-image')) {
          imageIndex = $newImage.closest('.slick-slide').index();
          // Scroll to/reorder image unless it's the first photo on load
          if (imageIndex !== 0 || theme.variables.productPageLoad) {
            if (theme.variables.productPageSticky) {
              // Scroll to variant image
              $('html, body').animate(
                {
                  scrollTop: $newImage.offset().top
                },
                250
              );
            } else {
              // Move selected variant image to top, preventing scrolling
              var currentScroll = $(document).scrollTop();
              $newImage
                .closest(
                  $(
                    this.selectors.productImagePhotoFlexWrapper,
                    this.$container
                  )
                )
                .prependTo($(this.selectors.productImages, this.$container));
              $(document).scrollTop(currentScroll);
            }
          }
        } else {
          // Thumbnail layout
          // Move selected variant image to top
          $newImage
            .closest(
              $(this.selectors.productImagePhotoFlexWrapper, this.$container)
            )
            .prependTo($(this.selectors.productImages, this.$container));
          // Switch image variant for thumnail layout
          this.switchImage(variant.featured_image.id);
        }
      }

      if (!theme.variables.productPageLoad) {
        theme.variables.productPageLoad = true;
      }
    },

    switchImage: function(imageId) {
      /*$(this.selectors.productImagePhotoContainer, this.$container).addClass(
        'hide'
      );
      $(this.selectors.productImagePhotoContainer, this.$container)
        .filter('#ProductImageWrapper-' + imageId)
        .removeClass('hide');*/
    },

    reorderImages: function() {
      /*if (this.$container.data('scroll-to-image')) return;
      var $newImage = $(
        this.selectors.productImagePhotoContainer,
        this.$container
      ).not('.hide');
      $newImage
        .closest(
          $(this.selectors.productImagePhotoFlexWrapper, this.$container)
        )
        .prependTo($(this.selectors.productImages, this.$container));*/
    },

    productThumbnailSwitch: function() {
      /*var self = this;
      var $productThumbnails = $('#ProductThumbs', this.$container).find(
        this.selectors.productThumbnail
      );

      if ($productThumbnails.length) {
        // Switch the main image with one of the thumbnails
        // Note: this does not change the variant selected, just the image
        $productThumbnails.on('click', function(evt) {
          evt.preventDefault();
          var newImageId = $(this).attr('data-image-id');
          var $newImage = $(
            '.product-single__photo[data-image-id="' + newImageId + '"]'
          );

          self.switchImage(newImageId);
          self.setActiveThumbnail(newImageId);

          // Thumbnail layout
          // Move selected featured image to top
          $newImage
            .closest(
              $(self.selectors.productImagePhotoFlexWrapper, self.$container)
            )
            .prependTo($(self.selectors.productImages, self.$container));
        });
      }*/
    },

    setActiveThumbnail: function(imageId) {
      /*var $productThumbnails = $('#ProductThumbs', this.$container).find(
        this.selectors.productThumbnail
      );

      if ($productThumbnails.length) {
        var activeClass = 'active-thumb';
        var $thumbnail = $(
          this.selectors.productThumbnail + "[data-image-id='" + imageId + "']",
          this.$container
        );

        $productThumbnails.removeClass(activeClass);
        $thumbnail.addClass(activeClass);
      }*/
    },

    productImageZoom: function() {
      /*
      if (
        !$(this.selectors.productImagePhoto, this.$container).length ||
        theme.variables.bpSmall
      ) {
        return;
      }

      $(this.selectors.productImagePhoto, this.$container).magnificPopup({
        type: 'image',
        mainClass: 'mfp-fade',
        closeOnBgClick: true,
        closeBtnInside: false,
        closeOnContentClick: true,
        tClose: theme.strings.zoomClose,
        removalDelay: 500,
        gallery: {
          enabled: true,
          navigateByImgClick: false,
          arrowMarkup:
            '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"><span class="mfp-chevron mfp-chevron-%dir%"></span></button>',
          tPrev: theme.strings.zoomPrev,
          tNext: theme.strings.zoomNext
        }
      });
      */

      if ($('.product-thumbnail__images .product-single__image').length == 0) {
        return;
      }

      var $activeImage = $('.product-thumbnail__images .product-single__image');
      var initZoom = function() {
        var zoomUrl = $(this).attr('data-zoom');
        var $parent = $(this).parent();
        $parent.zoom({
          url: zoomUrl
        });
      };

      $activeImage.each(function() {
        initZoom.apply(this);
      });
    },

    createImageCarousel: function() {
      var self = this;
      
      $('#productPreview').slick({
        arrows: false,
        dots: false,
        draggable: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.product-thumb--nav'
      });

      $('.product-thumb--nav').slick({
        arrows: true,
        dots: false,
        asNavFor: '#productPreview',
        centerMode: true,
        focusOnSelect: true,
        slidesToShow: 3,
        slidesToScroll: 1/*,
        responsive: [
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          }
        ]*/
      });
    },

    /* price: in USD */
    changeAffirmPrice: function(price) {
      $('.affirm-as-low-as').attr('data-amount', price);
      $('.affirm-product-modal').attr('data-amount', price);
      $('#affirmProductModal').attr('data-amount', price);
      $('#affirmLearnMore').attr('data-amount', price);

      try {
        affirm.ui.refresh();
      } catch (ex1) {
        console.log('affirm ui refresh error, theme.js');
      }
    },

    productPageForPrintout: function(evt) {
      let self = this;

      if (this.is('sectional')) {
        this.copyVariantCustomFields(false);
      } else {
        // Fill frame codes and printout PDF urls
        // sku1, sku2, sku3
        let sku1 = $('#prop_sku').val();
        
        $("#ct_sku1").val(sku1);
        // PDF url
        $("#ct_sku1_pdf").val(calcPrintoutPdfUrl(sku1));
      }

      var variant = evt.variant;

      if (variant) {
        // Copy variant custom fields to DPO fields
        this.copyVariantCustomFields(variant);

        // Custom Options (SF Sofa Bed, Ottoman)
        if (this.is('custom') && variant.option1) {
          if (self.isAnimate) {
            this.updateCustomAnimationImage(variant);
          }
          this.updateDrawingImage(variant);
        }

        // Select a valid variant if available
        if (variant.available) {
          // Update the full details link
          var $link = $(this.selectors.productFullDetails, this.$container);
          if ($link.length) {
            $link.attr(
              'href',
              this.updateUrlParameter($link.attr('href'), 'variant', variant.id)
            );
          }
        }
      }

      if (this.is('custom')) {
        this.calcPropertySize();
      }
    },

    productPage: function(evt) {
      if (this.is('printout')) {
        return this.productPageForPrintout(evt);
      }

      if (this.productType === 'plain') {
        return this.productPagePlain(evt);
      }

      var self = this;
      var moneyFormat = theme.strings.moneyFormat;
      var variant = evt.variant;
      var translations = theme.strings;

      // Copy variant custom fields to DPO fields
      if (self.is('sectional')) {
        this.copyVariantCustomFields(false);

        if (window.dpoLoaded && typeof window.dpoOptions !== 'undefined') {
          var dpoElm = jQuery('#itoris_dynamicproductoptions')[0];

          if (dpoElm) {
            if (dpoElm.dpoProductInitialPrices) {
              dpoElm.dpoProductInitialPrices.currentPrice = 0;
            }

            if (typeof window.dpoOptions != 'undefined') {
              window.dpoOptions.updatePrice();
            }
          }
        }

        return;
      }

      if (variant) {
        // Display variant image on featured product
        if (!$('body').hasClass('template-product')) {
          if (variant.featured_image) {
            var $newImage = $(
              this.selectors.productImageWrapper +
                '[data-image-id="' +
                variant.featured_image.id +
                '"]',
              this.$container
            );
            var $otherImages = $(
              this.selectors.productImageWrapper +
                ':not([data-image-id="' +
                variant.featured_image.id +
                '"])',
              this.$container
            );

            $newImage.removeClass('hide');
            $otherImages.addClass('hide');
          }
        }

        // Copy variant custom fields to DPO fields
        this.copyVariantCustomFields(variant);

        $(this.selectors.priceContainer, this.$container).removeClass(
          'visibility-hidden ' + this.classes.priceContainerUnitAvailable
        );

        $(this.selectors.comparePriceWrapper, this.$container).attr(
          'aria-hidden',
          'false'
        );
        $(this.selectors.comparePriceA11y, this.$container).attr(
          'aria-hidden',
          'false'
        );
        $(this.selectors.productPrice, this.$container).attr(
          'aria-hidden',
          'false'
        );
        $(this.selectors.priceA11y, this.$container).attr(
          'aria-hidden',
          'false'
        );

        // Custom Options (SF Sofa Bed, Ottoman)
        if (this.is('custom') && variant.option1) {
          if (self.isAnimate) {
            this.updateCustomAnimationImage(variant);
          }
          this.updateDrawingImage(variant);
        }


        // Select a valid variant if available
        if (!isFlat){
          if (variant.available) {
            // Available, enable the submit button, change text, show quantity elements
            $(this.selectors.addToCart, this.$container)
              .removeClass('disabled')
              .prop('disabled', false);
            $(this.selectors.addToCartText, this.$container).html(
              translations.addToCart
            );
            $(this.selectors.quantityElements, this.$container).show();
            $(this.selectors.shopifyPaymentButton, this.$container).show();
  
            // Update the full details link
            var $link = $(this.selectors.productFullDetails, this.$container);
            if ($link.length) {
              $link.attr(
                'href',
                this.updateUrlParameter($link.attr('href'), 'variant', variant.id)
              );
            }
          } else {
            // Sold out, disable the submit button, change text, hide quantity elements
            $(this.selectors.addToCart, this.$container)
              .addClass('disabled')
              .prop('disabled', true);
            $(this.selectors.addToCartText, this.$container).html(
              translations.soldOut
            );
            $(this.selectors.quantityElements, this.$container).hide();
            $(this.selectors.shopifyPaymentButton, this.$container).hide();
          }
          if (window.dpoLoaded && typeof window.dpoOptions !== 'undefined') {
            var dpoElm = jQuery('#itoris_dynamicproductoptions')[0];
  
            if (dpoElm) {
              if (dpoElm.dpoProductInitialPrices) {
                dpoElm.dpoProductInitialPrices.currentPrice = variant.price/100;
              }
  
              if (typeof window.dpoOptions != 'undefined') {
                window.dpoOptions.updatePrice();
              }
            }
          } else {
            var changedPrice = 0;
            if (theme.settings.discountPercent > 0) {
              var compareAtPrice = variant.price; // in cents
              var salePrice = variant.price * (100 - theme.settings.discountPercent) / 100; 
  
              // in cents
              changedPrice = salePrice;
  
              var moneyFormat = theme.strings.moneyFormat;
              $(this.selectors.comparePrice).html(theme.Currency.formatMoney(compareAtPrice, moneyFormat));
  
              $(this.selectors.productPrice).html(theme.Currency.formatMoney(salePrice, moneyFormat));
  
            } else {
              changedPrice = variant.price;
  
              $(this.selectors.productPrice, this.$container)
                .html(theme.Currency.formatMoney(variant.price, moneyFormat));
            }
  
            this.changeAffirmPrice(changedPrice);
          }
  
          if (variant.unit_price) {
            var $unitPrice = $(this.selectors.unitPrice, this.$container);
            var $unitPriceBaseUnit = $(
              this.selectors.unitPriceBaseUnit,
              this.$container
            );
  
            $unitPrice.html(
              theme.Currency.formatMoney(variant.unit_price, moneyFormat)
            );
            $unitPriceBaseUnit.html(this.getBaseUnit(variant));
  
            $(this.selectors.priceContainer, this.$container).addClass(
              this.classes.priceContainerUnitAvailable
            );
          }
  
          // Also Show SKU
          $(this.selectors.SKU).html(variant.sku);
        } else {
          // The variant doesn't exist, disable submit button.
          // This may be an error or notice that a specific variant is not available.
          // To only show available variants, implement linked product options:
          //   - http://docs.shopify.com/manual/configuration/store-customization/advanced-navigation/linked-product-options
          $(this.selectors.addToCart, this.$container)
            .addClass('disabled')
            .prop('disabled', true);
          $(this.selectors.addToCartText, this.$container).html(
            translations.unavailable
          );
          $(this.selectors.quantityElements, this.$container).hide();
          $(this.selectors.shopifyPaymentButton, this.$container).hide();
  
          $(this.selectors.priceContainer, this.$container).addClass(
            'visibility-hidden'
          );
  
          $(this.selectors.productPrice, this.$container).attr(
            'aria-hidden',
            'true'
          );
          $(this.selectors.priceA11y, this.$container).attr(
            'aria-hidden',
            'true'
          );
          $(this.selectors.comparePriceWrapper, this.$container).attr(
            'aria-hidden',
            'true'
          );
          $(this.selectors.comparePriceA11y, this.$container).attr(
            'aria-hidden',
            'true'
          );
        }
      }

      if (this.is('custom')) {
        this.calcPropertySize();
      }
    },

    productPagePlain: function(evt) {
      var moneyFormat = theme.strings.moneyFormat;
      var variant = evt.variant;
      var translations = theme.strings;

      var compareAtPrice = variant.price;
      var price = variant.price;

      if (theme.settings.discountPercent > 0) {
        price = compareAtPrice * (100 - theme.settings.discountPercent) / 100; 
      }

      if (variant) {
        // Display variant image on featured product
        if (!$('body').hasClass('template-product')) {
          if (variant.featured_image) {
            var $newImage = $(
              this.selectors.productImageWrapper +
                '[data-image-id="' +
                variant.featured_image.id +
                '"]',
              this.$container
            );
            var $otherImages = $(
              this.selectors.productImageWrapper +
                ':not([data-image-id="' +
                variant.featured_image.id +
                '"])',
              this.$container
            );

            $newImage.removeClass('hide');
            $otherImages.addClass('hide');
          }
        }

        $(this.selectors.priceContainer, this.$container).removeClass(
          'visibility-hidden'
        );
        $(this.selectors.productPrice, this.$container).attr(
          'aria-hidden',
          'false'
        );
        $(this.selectors.priceA11y, this.$container).attr(
          'aria-hidden',
          'false'
        );

        // Select a valid variant if available
        if (variant.available) {
          // Available, enable the submit button, change text, show quantity elements
          $(this.selectors.addToCart, this.$container)
            .removeClass('disabled')
            .prop('disabled', false);
          $(this.selectors.addToCartText, this.$container).html(
            translations.addToCart
          );
          $(this.selectors.quantityElements, this.$container).show();
          $(this.selectors.shopifyPaymentButton, this.$container).show();

          // Update the full details link
          var $link = $(this.selectors.productFullDetails, this.$container);
          if ($link.length) {
            $link.attr(
              'href',
              this.updateUrlParameter($link.attr('href'), 'variant', variant.id)
            );
          }

          // Featured image
          if (variant.featured_image && variant.featured_image.src) {
            var featured_image_filename = getFilenameFromUrl(variant.featured_image.src);

            $('.product-thumb--nav .slick-slide').not('.slick-cloned').each(function() {
              var $img = $(this).find('.product-single__thumb');
              var filename = getFilenameFromUrl($img[0].src);

              if (featured_image_filename === filename) {
                $img.parent().trigger('click');
                return false;
              }
            });
          }
        } else {
          // Sold out, disable the submit button, change text, hide quantity elements
          $(this.selectors.addToCart, this.$container)
            .addClass('disabled')
            .prop('disabled', true);
          $(this.selectors.addToCartText, this.$container).html(
            translations.soldOut
          );
          $(this.selectors.quantityElements, this.$container).hide();
          $(this.selectors.shopifyPaymentButton, this.$container).hide();
        }

        $(this.selectors.productPrice, this.$container)
          .html(theme.Currency.formatMoney(price, moneyFormat))
          .show();

        // Also update and show the product's compare price if necessary
        if (compareAtPrice > price) {
          $(this.selectors.comparePrice, this.$container).html(
            theme.Currency.formatMoney(compareAtPrice, moneyFormat)
          );
          $(this.selectors.comparePriceWrapper, this.$container).removeClass(
            'hide'
          );
          $(this.selectors.productPrice, this.$container).addClass('on-sale');
          $(this.selectors.comparePriceWrapper, this.$container).attr(
            'aria-hidden',
            'false'
          );
          $(this.selectors.comparePriceA11y, this.$container).attr(
            'aria-hidden',
            'false'
          );
        } else {
          $(this.selectors.comparePriceWrapper, this.$container)
            .addClass('hide')
            .attr('aria-hidden', 'true');
          $(this.selectors.productPrice, this.$container).removeClass(
            'on-sale'
          );
          $(this.selectors.comparePrice, this.$container).html('');
          $(this.selectors.comparePriceA11y, this.$container).attr(
            'aria-hidden',
            'true'
          );
        }

        // Also Show SKU
        $(this.selectors.SKU).html(variant.sku);
      } else {
        // The variant doesn't exist, disable submit button.
        // This may be an error or notice that a specific variant is not available.
        // To only show available variants, implement linked product options:
        //   - http://docs.shopify.com/manual/configuration/store-customization/advanced-navigation/linked-product-options
        $(this.selectors.addToCart, this.$container)
          .addClass('disabled')
          .prop('disabled', true);
        $(this.selectors.addToCartText, this.$container).html(
          translations.unavailable
        );
        $(this.selectors.quantityElements, this.$container).hide();
        $(this.selectors.shopifyPaymentButton, this.$container).hide();

        $(this.selectors.priceContainer, this.$container).addClass(
          'visibility-hidden'
        );
        $(this.selectors.productPrice, this.$container).attr(
          'aria-hidden',
          'true'
        );
        $(this.selectors.priceA11y, this.$container).attr(
          'aria-hidden',
          'true'
        );
        $(this.selectors.comparePriceWrapper, this.$container).attr(
          'aria-hidden',
          'true'
        );
        $(this.selectors.comparePriceA11y, this.$container).attr(
          'aria-hidden',
          'true'
        );
      }

      this.changeAffirmPrice(price);
    },

    updateUrlParameter: function(url, key, value) {
      var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
      var separator = url.indexOf('?') === -1 ? '?' : '&';

      if (url.match(re)) {
        return url.replace(re, '$1' + key + '=' + value + '$2');
      } else {
        return url + separator + key + '=' + value;
      }
    },

    initStickyProductMeta: function() {
      return;
    },

    onUnload: function() {
      this.$container.off(this.settings.namespace);
      this.destroyImageCarousel();
    },

    getBaseUnit: function(variant) {
      return variant.unit_price_measurement.reference_value === 1
        ? variant.unit_price_measurement.reference_unit
        : variant.unit_price_measurement.reference_value +
            variant.unit_price_measurement.reference_unit;
    }
    /*,

    initSwatchesPopup: function() {
      if (theme.cookiesEnabled) {
        if (document.cookie.indexOf('benchmade_swatches_popup') != -1) {
          // Already displayed once
          return false;
        }
      } else {
        return false;
      }

      var $trigger = $('.swatches-popup-trigger');
      $trigger.magnificPopup({ 
        mainClass: 'mfp-fade mfp-swatches-popup',
        type: 'inline',
        fixedContentPos: false,
        overflowY: 'auto',
        enableEscapeKey: false,
        closeOnBgClick: false,
        callbacks: {
          beforeOpen: function() {
            this.contentContainer.addClass('animated fadeInUp');

            document.cookie = "benchmade_swatches_popup=1; path=/";
          }
        }
      });

      // Show popup 30 seconds after user visited the page
      if (window.isMobile) {
        theme.cache.$window.on('scroll', function() {
          var scrolled = theme.cache.$window.scrollTop();
          if (scrolled == 0) {
            if (document.cookie.indexOf('benchmade_swatches_popup') != -1) {
              return;
            }

            $trigger.click();
          }
        });
      } else {
        $(window).on('mouseleave', function(e) {
          if (e.clientY > 0) {
            return;
          }

          if (document.cookie.indexOf('benchmade_swatches_popup') != -1) {
            return;
          }

          $trigger.click();
        });
      }
    }
    */
  });

  return Product;
})();

theme.Collection = (function() {
  function Collection(container) {
    this.selectors = {
      productGridImages: '.grid-uniform .grid-product__image-wrapper',
      $productGridRows: $('.collage-grid__row'),
      productGridPhotosLarge: '.grid__item--large .grid-product__image-link',
      $collectionImage: $('.collection-hero__image'),
      filterDropdowns: '.filter-dropdown',
      filterSelect: '.filter-dropdown__select',
      filterLabel: '.filter-dropdown__label',
      sortDropdown: '#sortBy',
      viewMode: '.collection-view-mode .view-mode'
    };

    var $container = (this.$container = $(container));
    this.gridType = $container.data('grid-type');

    this.selectors.$collectionImage.addClass('is-init');

    // Enable parallax effect if 3d transforms are supported
    if (!Modernizr.csstransforms3d) {
      return;
    }

    theme.cache.$window.on('scroll', function() {
      var scrolled = theme.cache.$window.scrollTop();
      theme.cache.$collectionImage.css({
        transform: 'translate3d(0, ' + scrolled / 4.5 + 'px, 0)'
      });
    });

    this.init();
  }

  Collection.prototype = _.assignIn({}, Collection.prototype, {
    init: function() {
      this.cacheSelectors();
      this.setQueryParams();

      this.cache.$sortDropdown.on('change', this.sortCollection.bind(this));

      if (this.gridType === 'collage') {
        this.initCollageGrid();
      } else if (this.gridType === 'grid') {
        theme.equalHeights.call(this);
      }

      this.initViewMode();
      this.checkSortBy();
    },

    checkSortBy: function() {
      if (typeof Shopify.queryParams.sort_by !== 'undefined') {
        $('html, body').animate({
          scrollTop: $("#CollectionSection").offset().top
        });
      }
    },

    initViewMode: function() {
      var self = this;
      
      this.cache.$body.addClass('collection-view-mode-grid');

      this.cache.$viewMode.click(function() {
        var mode = $(this).data('mode');
        if (mode == 'grid') {
            self.cache.$body.removeClass('collection-view-mode-list').addClass('collection-view-mode-grid');
        } else {
            self.cache.$body.removeClass('collection-view-mode-grid').addClass('collection-view-mode-list');
        }

        $(this).addClass('active').siblings().removeClass('active');
      });
    },

    updateFilterLabel: function(evt, element) {
      var $select = evt ? $(evt.target) : $(element);
      var $label = $select
        .prev('.filter-dropdown__label')
        .find('.filter-dropdown__label--active');
      var selectedVariant = $select.find('option:selected').text();

      $label.html(' ' + selectedVariant);
      this.cache.$filterDropdowns.addClass('loaded');
    },

    cacheSelectors: function() {
      this.cache = {
        $html: $('html'),
        $body: $('body'),
        $window: $(window),
        $productGridImages: $(this.selectors.productGridImages),
        $productGridRows: $(this.selectors.productGridRows),
        $productGridPhotosLarge: $(this.selectors.productGridPhotosLarge),
        $filterDropdowns: $(this.selectors.filterDropdowns),
        $filterSelect: $(this.selectors.filterSelect),
        $filterLabel: $(this.selectors.filterLabel),
        $sortDropdown: $(this.selectors.sortDropdown),
        $viewMode: $(this.selectors.viewMode)
      };
    },

    setQueryParams: function() {
      //don't execute if sort dropdown is not present.
      if (!this.cache.$sortDropdown.length) {
        return;
      }

      Shopify.queryParams = this.parseQueryString();
    },

    parseQueryString: function() {
      if (!location.search.length) {
        return {};
      }

      var params = {};

      for (
        var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&');
        i < aCouples.length;
        i++
      ) {
        aKeyValue = aCouples[i].split('=');
        if (aKeyValue.length > 1) {
          params[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(
            aKeyValue[1]
          );
        }
      }
      return params;
    },

    initCollageGrid: function() {
      if (!this.cache.$productGridRows.length) {
        return;
      }

      this.collageGridHeights();

      theme.cache.$window.on(
        'resize',
        theme.debounce(this.collageGridHeights, 500)
      );
    },

    collageGridHeights: function() {
      if (theme.variables.bpSmall || !this.cache.$productGridRows.length) {
        return;
      }

      // calculate image heights for each row of grid images
      for (var i = this.cache.$productGridRows.length - 1; i >= 0; i--) {
        var $currentRow = $(this.cache.$productGridRows[i]);
        var $smallImages = $currentRow.find(
          '.grid__item--small .grid-product__image-wrapper'
        );
        var $largeImageWrapper = $currentRow.find(
          '.grid__item--large .grid-product__image-wrapper'
        );
        var $largeImage = $largeImageWrapper.find('.grid-product__image-link');

        // calculate the bottom edge of the small image
        var smallImageOffset =
          $smallImages[1].offsetTop + $smallImages[1].offsetHeight;

        // calculate the bottom edge of the large image for the row
        var largeImageOffset =
          $largeImageWrapper[0].offsetTop + $largeImageWrapper[0].offsetHeight;

        var largeImageHeight = 0;

        // Depending on which image is lower, increase or decrease the large
        // image size
        if (smallImageOffset > largeImageOffset) {
          largeImageHeight =
            $largeImage.height() + (smallImageOffset - largeImageOffset);
        } else {
          largeImageHeight =
            $largeImage.height() - (largeImageOffset - smallImageOffset);
        }

        $largeImage.css('height', largeImageHeight);
      }
    },

    clearCollageGridHeights: function() {
      if (!this.cache.$productGridRows.length) {
        return;
      }

      this.cache.$productGridPhotosLarge.removeAttr('style');
    },

    collectionSorting: function() {
      if (!this.cache.$tagList.length) {
        return;
      }

      this.cache.$tagList.on('change', function() {
        window.location.href = $(this).val();
      });
    },

    sortCollection: function() {
      if (!this.cache.$sortDropdown.length) {
        return;
      }

      if (Shopify.queryParams.page) {
        delete Shopify.queryParams.page;
      }
      Shopify.queryParams.sort_by = this.cache.$sortDropdown.val();
      location.search = jQuery.param(Shopify.queryParams);
    }
  });

  return Collection;
})();


theme.CollectionList = (function() {
  function CollectionList(container) {
    this.init();
  }

  CollectionList.prototype = _.assignIn({}, CollectionList.prototype, {
    init: function() {
      $('map').imageMapResize();
      
      $(".collection-products").slick({
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: false,
        centerMode: true,
        focusOnSelect: true,
        slidesToShow: 7,
        slidesToScroll: 3,
        responsive: [
          {
            breakpoint: 1600,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 520,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1
            }
          }
        ]
      });
    }
  });

  return CollectionList;
})();

theme.HeaderSection = (function() {
  function Header(container) {
    timber.drawersInit();
    theme.initCache();
    theme.fitNav();
    theme.resizeLogo();
    theme.searchModal();

    var $container = (this.$container = $(container));
    this.template = $container.attr('data-template');

    // ajaxCart.init will run from Product.prototype when on the product page
    if (
      theme.settings.cartType === 'drawer' &&
      this.template.indexOf('product') === -1
    ) {
      ajaxCart.init({
        formSelector: '.add-to-cart__form',
        cartContainer: '#CartContainer',
        addToCartSelector: '.add-to-cart',
        enableQtySelectors: true,
        moneyFormat: theme.strings.moneyFormat
      });
    }

    theme.cache.$window.on('load', theme.resizeLogo);
    theme.cache.$window.on('resize', theme.debounce(theme.resizeLogo, 150));

    // Check for header absolute position
    if ($('#Hero').hasClass('hero')) {
      $('.header-wrapper').addClass('hero__header');
    } else {
      $('.header-wrapper').removeClass('hero__header');
    }

    this.initSideBarDropDowns();
  }

  Header.prototype = _.assignIn({}, Header.prototype, {
    onSelect: function() {
      this.handleDrawerOpenInEditor(event);
    },

    onDeselect: function() {
      timber.LeftDrawer.close(event);
    },

    handleDrawerOpenInEditor: function(event) {
      if (
        theme.cache.$siteNav.hasClass('site-nav--compress') ||
        theme.variables.bpSmall
      ) {
        setTimeout(function() {
          timber.LeftDrawer.drawerIsOpen = false;
          timber.LeftDrawer.open();
        }, 500);
      } else if (!theme.cache.$siteNav.hasClass('site-nav--compress')) {
        timber.LeftDrawer.drawerIsOpen = true;
        timber.LeftDrawer.close(event);
      }
    },

    initSideBarDropDowns: function() {
      var $toggleBtns = $('.mobile-nav__toggle-btn');
      // Setup aria attributes
      $toggleBtns.attr('aria-expanded', 'false');

      $toggleBtns.each(function() {
        var $button = $(this);
        $button.attr('aria-controls', $button.attr('data-aria-controls'));
      });

      $toggleBtns.on('click', function() {
        var $button = $(this);
        var currentlyExpanded = $button.attr('aria-expanded');
        var toggleState = false;
        // Updated aria-expanded value based on state pre-click
        if (currentlyExpanded === 'true') {
          $button.attr('aria-expanded', 'false');
        } else {
          $button.attr('aria-expanded', 'true');
          toggleState = true;
        }

        // Toggle that expands/collapses sublist
        $button
          .closest('.mobile-nav__has-sublist')
          .toggleClass('mobile-nav--expanded', toggleState)
          .next()
          .slideToggle();
      });
    }
  });

  return Header;
})();

theme.FeaturedContentSection = (function() {
  function FeaturedContent() {
    theme.styleTextLinks();
  }

  return FeaturedContent;
})();

theme.NewsletterSection = (function() {
  function Newsletter() {
    theme.styleTextLinks();
  }

  return Newsletter;
})();

theme.SlideshowSection = (function() {
  function SlideshowSection() {
    theme.initCache();

    var $slideshow = (this.$slideshow = $('#Hero'));
    var autoplay = (this.autoplay = $slideshow.data('autoplay'));

    slickTheme.init({
      $element: $slideshow,
      parallax: $slideshow.data('parallax'),
      autoplay: autoplay,
      autoplaySpeed: $slideshow.data('autoplayspeed'),
      adaptHeight: $slideshow.data('adapt'),
      arrows: true
    });

    // remove header absolute display if slideshow is empty
    if (!$slideshow.hasClass('hero')) {
      $('.header-wrapper').removeClass(slickTheme.vars.heroHeaderClass);
    }

    if (Shopify.designMode) {
      // Fix the slideshow height in the iOS theme editor
      enquire.register(theme.variables.mediaQuerySmall, {
        match: function() {
          $slideshow.css('height', $(window.parent.document).height());
        },
        unmatch: function() {
          $slideshow.removeAttr('height');
        }
      });
    }
  }

  return SlideshowSection;
})();

theme.SlideshowSection.prototype = _.assignIn(
  {},
  theme.SlideshowSection.prototype,
  {
    onUnload: function() {
      this.$slideshow.unslick();
    },

    onBlockSelect: function(evt) {
      var $slide = $('.slide--' + evt.detail.blockId);
      var slideIndex = $slide.attr('index');

      // Go to selected slide, pause autoplay
      this.$slideshow.slickGoTo(slideIndex);
      if (this.autoplay) {
        this.$slideshow.slickPause();
      }
    },

    onBlockDeselect: function() {
      if (
        this.autoplay &&
        !slickTheme.cache.$pauseButton.hasClass(slickTheme.vars.pausedClass)
      ) {
        this.$slideshow.slickPlay();
      }
    }
  }
);

theme.PasswordHeader = (function() {
  function PasswordHeader() {
    this.init();
  }

  PasswordHeader.prototype = _.assignIn({}, PasswordHeader.prototype, {
    init: function() {
      $('.js-toggle-login-modal').magnificPopup({
        type: 'inline',
        mainClass: 'mfp-fade',
        closeOnBgClick: false,
        closeBtnInside: false,
        closeOnContentClick: false,
        tClose: password.strings.pageClose,
        removalDelay: 500,
        callbacks: {
          open: function() {
            window.setTimeout(function() {
              document.getElementById('password').focus();
            }, 50);
          },
          close: function() {
            window.setTimeout(function() {
              document.getElementById('email').focus();
            }, 50);
          }
        }
      });
      if ($('.storefront-password-form .errors').size()) {
        $('.js-toggle-login-modal').click();
      }
    }
  });

  return PasswordHeader;
})();

theme.PasswordContent = (function() {
  function PasswordContent() {
    theme.styleTextLinks();
  }

  return PasswordContent;
})();

theme.ProductRecommendations = (function() {
  function ProductRecommendations(container) {
    this.$container = $(container);

    var self = this;
    var productId = this.$container.data('productId');
    var recommendationsSectionUrl =
      '/recommendations/products?&section_id=product-recommendations&product_id=' +
      productId +
      '&limit=4';

    $.get(recommendationsSectionUrl).then(function(section) {
      var recommendationsMarkup = $(section).html();
      if (recommendationsMarkup.trim() !== '') {
        self.$container.html(recommendationsMarkup);
      }
    });
  }

  return ProductRecommendations;
})();

theme.Maps = (function() {
  var config = {
    zoom: 14
  };
  var apiStatus = null;
  var mapsToLoad = [];

  var errors = {
    addressNoResults: theme.strings.addressNoResults,
    addressQueryLimit: theme.strings.addressQueryLimit,
    addressError: theme.strings.addressError,
    authError: theme.strings.authError
  };

  var selectors = {
    section: '[data-section-type="map"]',
    map: '[data-map]',
    mapOverlay: '[data-map-overlay]'
  };

  var classes = {
    mapError: 'map-section--load-error',
    errorMsg: 'map-section__error errors text-center'
  };

  // Global function called by Google on auth errors.
  // Show an auto error message on all map instances.
  // eslint-disable-next-line camelcase, no-unused-vars
  window.gm_authFailure = function() {
    if (!Shopify.designMode) return;

    if (Shopify.designMode) {
      $(selectors.section).addClass(classes.mapError);
      $(selectors.map).remove();
      $(selectors.mapOverlay).after(
        '<div class="' +
          classes.errorMsg +
          '">' +
          theme.strings.authError +
          '</div>'
      );
    }
  };

  function Map(container) {
    this.$container = $(container);
    this.$map = this.$container.find(selectors.map);
    this.key = this.$map.data('api-key');

    if (typeof this.key !== 'string' || this.key === '') {
      return;
    }

    if (apiStatus === 'loaded') {
      var self = this;

      // Check if the script has previously been loaded with this key
      var $script = $('script[src*="' + this.key + '&"]');
      if ($script.length === 0) {
        $.getScript(
          'https://maps.googleapis.com/maps/api/js?key=' + this.key
        ).then(function() {
          apiStatus = 'loaded';
          self.createMap();
        });
      } else {
        this.createMap();
      }
    } else {
      mapsToLoad.push(this);

      if (apiStatus !== 'loading') {
        apiStatus = 'loading';
        if (typeof window.google === 'undefined') {
          $.getScript(
            'https://maps.googleapis.com/maps/api/js?key=' + this.key
          ).then(function() {
            apiStatus = 'loaded';
            initAllMaps();
          });
        }
      }
    }
  }

  function initAllMaps() {
    // API has loaded, load all Map instances in queue
    $.each(mapsToLoad, function(index, instance) {
      instance.createMap();
    });
  }

  function geolocate($map) {
    var deferred = $.Deferred();
    var geocoder = new google.maps.Geocoder();
    var address = $map.data('address-setting');

    geocoder.geocode({ address: address }, function(results, status) {
      if (status !== google.maps.GeocoderStatus.OK) {
        deferred.reject(status);
      }

      deferred.resolve(results);
    });

    return deferred;
  }

  Map.prototype = _.assignIn({}, Map.prototype, {
    createMap: function() {
      var $map = this.$map;

      return geolocate($map)
        .then(
          function(results) {
            var mapOptions = {
              zoom: config.zoom,
              center: results[0].geometry.location,
              draggable: false,
              clickableIcons: false,
              scrollwheel: false,
              disableDoubleClickZoom: true,
              disableDefaultUI: true
            };

            var map = (this.map = new google.maps.Map($map[0], mapOptions));
            var center = (this.center = map.getCenter());

            //eslint-disable-next-line no-unused-vars
            var marker = new google.maps.Marker({
              map: map,
              position: map.getCenter()
            });

            google.maps.event.addDomListener(window, 'resize', function() {
              google.maps.event.trigger(map, 'resize');
              map.setCenter(center);
              $map.removeAttr('style');
            });
          }.bind(this)
        )
        .fail(function() {
          var errorMessage;

          switch (status) {
            case 'ZERO_RESULTS':
              errorMessage = errors.addressNoResults;
              break;
            case 'OVER_QUERY_LIMIT':
              errorMessage = errors.addressQueryLimit;
              break;
            case 'REQUEST_DENIED':
              errorMessage = errors.authError;
              break;
            default:
              errorMessage = errors.addressError;
              break;
          }

          // Show errors only to merchant in the editor.
          if (Shopify.designMode) {
            $map
              .parent()
              .addClass(classes.mapError)
              .html(
                '<div class="' +
                  classes.errorMsg +
                  '">' +
                  errorMessage +
                  '</div>'
              );
          }
        });
    },

    onUnload: function() {
      if (this.$map.length === 0) {
        return;
      }
      google.maps.event.clearListeners(this.map, 'resize');
    }
  });

  return Map;
})();

theme.Search = (function() {
  function Search() {
    theme.equalHeights();
  }

  return Search;
})();


theme.variables = {
  productPageLoad     : false,
  productPageSticky   : true,

  // Breakpoints from src/stylesheets/global/variables.scss.liquid
  mediaQuerySmall     : 'screen and (max-width: 590px)',
  mediaQueryMedium    : 'screen and (min-width: 591px) and (max-width: 768px)',
  mediaQueryMediumUp  : 'screen and (min-width: 591px)',
  mediaQueryLarge     : 'screen and (min-width: 769px)',
  bpSmall             : false,

  googleScriptUrl: 'https://script.google.com/macros/s/AKfycbyrEVZ_zIMhGSDmrdvnD0My-gsGcGqaTGXAjTo37YWNRGQHr_vv/exec'
};

theme.initCache = function() {
  theme.cache = {
    $window                 : $(window),
    $html                   : $('html'),
    $body                   : $('body'),
    $drawerRight            : $('.drawer--right'),

    $hero                   : $('#Hero'),
    $customSelect           : $('.js-selector'),

    $collectionImage        : $('.collection-hero__image'),

    $siteHeader             : $('.site-header'),
    $siteNav                : $('.site-nav'),
    $siteNavOpen            : $('.site-nav--open'),
    $cartBuggle             : $('.cart-link__bubble'),
    $logoWrapper            : $('.site-header__logo'),
    $logo                   : $('.site-header__logo img'),
    $toggleSearchModal      : $('.js-toggle-search-modal'),
    $searchBox              : $('.site-nav--search__bar'),

    $productImages          : $('.product-single__photos'),
    $productImagePhoto      : $('.product-single__photo'),

    $indentedRteImages      : $('.rte--indented-images'),

    $productGridRows        : $('.collage-grid__row'),
    $productGridPhotosLarge : $('.grid__item--large .grid-product__image-link'),

    // Equal height elements
    $productGridImages      : $('.grid-uniform .grid-product__image-wrapper'),

    $returnLink             : $('.return-link'),

    $propOrientation        : $('.product-box .prop-orientation'),
    $printoutForm           : $('.frm-request-printout'),
    $printoutDimension      : $('.frm-request-printout #ct_dimension'),
  };
};

theme.init = function() {
  theme.initAnnouncement();
  theme.initCache();
  theme.setBreakpoints();
  theme.fitNav();
  theme.cartInit();
  theme.afterCartLoad();
  theme.checkoutIndicator();
  theme.returnLink();
  theme.styleTextLinks();
  theme.searchModal();
  theme.productCardImageLoadingAnimation();
  theme.onChooseCountry();

  // Functions to run on load so image sizes can be calculated
  theme.cache.$window.on('load', theme.resizeLogo);
  theme.cache.$window.on('load', theme.articleImages);

  // Functions to re-run on resize
  theme.cache.$window.on('resize', theme.debounce(theme.resizeLogo, 150));
};

theme.initAnnouncement = function() {
  var mySwiper = new Swiper('.announcement-bar .swiper-container', {
    // Optional parameters
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    loop: true,
    disableOnInteraction: false,
    allowTouchMove: false,
    centeredSlides: true,
    speed: 600,
    autoplay: {
      delay: 5000
    }
  });
};

theme.onChooseCountry = function() {
  // Country | State
  $(document).on('change', '.frm-contact #ct_country', function() {
    var $form = $(this).closest('form');

    // I'm "Country", need to change "State" dropdown selectbox accordingly
    var $selState = $form.find('#ct_state');
    var stateList = [
      'Alabama',
      'Alaska',
      'American Samoa',
      'Arizona',
      'Arkansas',
      'Armed Forces Africa',
      'Armed Forces Americas',
      'Armed Forces Canada',
      'Armed Forces Europe',
      'Armed Forces Middle East',
      'Armed Forces Pacific',
      'California',
      'Colorado',
      'Connecticut',
      'Delaware',
      'District of Columbia',
      'Federated States Of Micronesia',
      'Florida',
      'Georgia',
      'Guam',
      'Hawaii',
      'Idaho',
      'Illinois',
      'Indiana',
      'Iowa',
      'Kansas',
      'Kentucky',
      'Louisiana',
      'Maine',
      'Marshall Islands',
      'Maryland',
      'Massachusetts',
      'Michigan',
      'Minnesota',
      'Mississippi',
      'Missouri',
      'Montana',
      'Nebraska',
      'Nevada',
      'New Hampshire',
      'New Jersey',
      'New Mexico',
      'New York',
      'North Carolina',
      'North Dakota',
      'Northern Mariana Islands',
      'Ohio',
      'Oklahoma',
      'Oregon',
      'Palau',
      'Pennsylvania',
      'Puerto Rico',
      'Rhode Island',
      'South Carolina',
      'South Dakota',
      'Tennessee',
      'Texas',
      'Utah',
      'Vermont',
      'Virgin Islands',
      'Virginia',
      'Washington',
      'West Virginia',
      'Wisconsin',
      'Wyoming'
    ];

    if (this.value === 'CA') {
      stateList = [
        'Alberta',
        'British Columbia',
        'Manitoba',
        'Newfoundland and Labrador',
        'New Brunswick',
        'Nova Scotia',
        'Northwest Territories',
        'Nunavut',
        'Ontario',
        'Prince Edward Island',
        'Quebec',
        'Saskatchewan',
        'Yukon Territory',
      ];
    }

    var html = '<option value="">Please select a region</option>';
    for (let i = 0; i < stateList.length; i++) {
      html += '<option value="' + stateList[i] + '">' + stateList[i] + '</option>';
    }

    $selState.html(html);
  });

  $('.frm-contact #ct_country').trigger('change');
};

theme.returnLink = function() {
  if (!document.referrer || !theme.cache.$returnLink.length || !window.history.length) {
    return;
  }

  theme.cache.$returnLink.on('click', theme.backButton);
};

theme.backButton = function() {
  if (this.attributes.href.value.charAt(0) == '/') {
    return true;
  }

  var referrerDomain = urlDomain(document.referrer);
  var shopDomain = urlDomain(document.url);

  if (shopDomain === referrerDomain) {
    history.back();
    return false;
  }

  function urlDomain(url) {
    var    a      = document.createElement('a');
           a.href = url;
    return a.hostname;
  }
};

theme.setBreakpoints = function() {
    enquire.register(theme.variables.mediaQuerySmall, {
      match: function() {
        if (theme.settings.gridType === 'collage') {
          theme.clearCollageGridHeights();
        }

        theme.variables.bpSmall = true;
      },
      unmatch: function() {
        theme.variables.bpSmall = false;
      }
    });

};

theme.fitNav = function() {
  // Measure children of site nav on load and resize.
  // If wider than parent, switch to mobile nav.
  controlNav();
  theme.cache.$window.on('load', controlNav);
  theme.cache.$window.on('resize', theme.debounce(controlNav, 150));

  function controlNav() {
    /*
    // Subtract 20 from width to account for inline-block spacing
    var navWidth = theme.cache.$siteNav.parent().outerWidth() - 20;
    var navItemWidth = 0;
    theme.cache.$siteNav.find('> li').each(function() {
      var $el = $(this);
      // Round up to be safe
      navItemWidth += Math.ceil($(this).width());
    });

    var isCompress = navItemWidth > navWidth;
    */

    var isCompress = window.innerWidth < 1080;
    var isHome = $('body').hasClass('template-index');

    if (isCompress) {
      theme.cache.$siteNav.addClass('site-nav--compress');
      theme.cache.$siteNav.parent().removeClass('large--eleven-twelfths large--two-thirds').addClass('large--one-sixth');
      theme.cache.$siteNavOpen.addClass('site-nav--open__display');
      theme.cache.$siteNavOpen.parent().removeClass('large--hide');

      if (isHome) {
        theme.cache.$logoWrapper.parent().removeClass('large--one-fifth').addClass('large--four-fifths');
      } else {
        theme.cache.$logoWrapper.parent().removeClass('large--one-twelfth').addClass('large--two-thirds');
      }

      theme.cache.$logoWrapper.removeClass('large--left').addClass('text-center');
      theme.cache.$searchBox.hide();
    } else {
      theme.cache.$siteNav.removeClass('site-nav--compress');
      theme.cache.$siteNav.parent().removeClass('large--one-sixth').addClass('large--eleven-twelfths large--two-thirds');
      theme.cache.$siteNavOpen.removeClass('site-nav--open__display');
      theme.cache.$siteNavOpen.parent().addClass('large--hide');

      if (isHome) {
        theme.cache.$logoWrapper.parent().removeClass('large--four-fifths').addClass('large--one-fifth');
      } else {
        theme.cache.$logoWrapper.parent().removeClass('large--two-thirds').addClass('large--one-twelfth');
      }

      theme.cache.$logoWrapper.removeClass('text-center').addClass('large--left');
      theme.cache.$searchBox.show();
    }

    theme.cache.$siteNav.addClass('site-nav--init');
    theme.cache.$siteNavOpen.addClass('site-nav--init');
  }
};

theme.resizeLogo = function() {
  // Using .each() as there can be a reversed logo too
  theme.cache.$logo.each(function() {
    var $el = $(this),
        logoWidthOnScreen = $el.width(),
        containerWidth = $el.closest('.grid__item').width();
    // If image exceeds container, let's make it smaller
    if (logoWidthOnScreen > containerWidth) {
      $el.css('maxWidth', containerWidth);
    }
    else {
      $el.removeAttr('style');
    }
  });
};

theme.sizeCartDrawerFooter = function() {
  // Stop if our drawer doesn't have a fixed footer
  if (!theme.cache.$drawerRight.hasClass('drawer--has-fixed-footer')) {
    return;
  }

  // Elements are reprinted regularly so selectors are not cached
  var $cartFooter = $('.ajaxcart__footer').removeAttr('style');
  var $cartInner = $('.ajaxcart__inner').removeAttr('style');
  var cartFooterHeight = $cartFooter.outerHeight();
  var cartDrawerTitleHeight = $('.drawer--right .drawer__header').outerHeight();
  var $cartDrawerInner = $('.drawer--right .drawer__inner');

  if(cartDrawerTitleHeight != 80) {
    $cartDrawerInner.css('top', cartDrawerTitleHeight);
  }

  $cartInner.css('bottom', cartFooterHeight);
  $cartFooter.css('height', cartFooterHeight);
};

theme.afterCartLoad = function() {
  theme.cache.$body.on('ajaxCart.afterCartLoad', function(evt, cart) {
    // Open cart drawer
    timber.RightDrawer.open();

    // Size the cart's fixed footer
    theme.sizeCartDrawerFooter();

    // Show cart bubble in nav if items exist
    if (cart.items.length > 0) {
      theme.cache.$cartBuggle.addClass('cart-link__bubble--visible');
    } else {
      theme.cache.$cartBuggle.removeClass('cart-link__bubble--visible');
    }
  });
};

theme.checkoutIndicator = function() {
  // Add a loading indicator on the cart checkout button (/cart and drawer)
  theme.cache.$body.on('click', '.cart__checkout', function() {
    if (!$(this).closest('form').valid()) {
      return false;
    }
    
    $(this).addClass('btn--loading');
  });
};

theme.searchModal = function() {
  if (!theme.cache.$toggleSearchModal.length) {
    return;
  }

  if (theme.cache.$body.hasClass('template-search')) {
    theme.cache.$toggleSearchModal.click(function() {
      $('input[type="search"]').focus();
      return false;
    });

    return;
  }

  theme.cache.$toggleSearchModal.magnificPopup({
    type: 'inline',
    mainClass: 'mfp-fade mfp-fade--search',
    closeOnBgClick: true,
    closeBtnInside: false,
    closeOnContentClick: false,
    tClose: theme.strings.zoomClose,
    alignTop: true,
    removalDelay: 500,
    focus: '.search-bar > input'
  });
}

theme.clearCollageGridHeights = function() {
  if (!theme.cache.$productGridRows.length) {
    return;
  };

  theme.cache.$productGridPhotosLarge.removeAttr('style');
};

theme.articleImages = function() {
  if (!theme.cache.$indentedRteImages.length) {
    return;
  }

  theme.cache.$indentedRteImages.find('img').each(function() {
    var $el = $(this);
    var attr = $el.attr('style');

    // Check if undefined or float: none
    if (!attr || attr == 'float: none;') {
      // Remove grid-breaking styles if image isn't wider than parent
      if ($el.width() < theme.cache.$indentedRteImages.width()) {
        $el.addClass('rte__no-indent');
      }
    }
  });
};

theme.styleTextLinks = function() {
  $('.rte').find('a:not(:has(img))').addClass('text-link');
};

theme.equalHeights = function() {
  var self = this;
  theme.cache.$window.on('load', resizeElements());

  theme.cache.$window.on(
    'resize',
    afterResize(
      function() {
        resizeElements();
      },
      250,
      'equal-heights'
    )
  );

  function resizeElements() {
    self.cache.$productGridImages.css('height', 'auto').equalHeights();
  }
};

theme.cartInit = function() {
  if (!theme.cookiesEnabled()) {
    theme.cache.$body.addClass('cart--no-cookies');
  }
};

theme.cookiesEnabled = function() {
  var cookieEnabled = navigator.cookieEnabled;

  if (!cookieEnabled){
    document.cookie = 'testcookie';
    cookieEnabled = (document.cookie.indexOf('testcookie') !== -1);
  }
  return cookieEnabled;
}

theme.productCardImageLoadingAnimation = function() {
  var selectors = {
    image: '[data-image]',
    imageLink: '[data-image-link]',
  };

  var classes = {
    loadingAnimation: 'grid-product__image-link--loading',
    lazyloaded: '.lazyloaded'
  }

  $(document).on('lazyloaded', function (e) {
    var $target = $(e.target);

    if (!$target.is(selectors.image)) {
      return;
    }

    $target
      .closest(selectors.imageLink)
      .removeClass(classes.loadingAnimation);
  });


  // When the theme loads, lazysizes might load images before the "lazyloaded"
  // event listener has been attached. When this happens, the following function
  // hides the loading placeholders.
  $(selectors.image + classes.lazyloaded)
    .closest(selectors.imageLink)
    .removeClass(classes.loadingAnimation);
}

theme.ColumnPopup = (function() {
  function ColumnPopup(container) {
    this.init(container);
  }
  ColumnPopup.prototype = _.assignIn({}, ColumnPopup.prototype, {
    init: function($parent) {
      var $link = $('a[href="#popup"]', $parent);
      $link.replaceWith('<label for="popup--'+$parent.id+'">'+$link.text()+'</label>')
    }
  });
  return ColumnPopup;
})();

function loadYoutubeAPI(){
  if(!window.YoutubeAPILoading){
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    document.getElementsByTagName('head')[0].appendChild(tag);
    window.YoutubeAPILoading = true;
  }
}
function onYouTubeIframeAPIReady() {
  window.YoutubeAPILoaded = true;
  $('body').trigger('YoutubeAPILoaded');
}

theme.Video = (function() {
  function Video(container) {
    var $container = this.$container = $(container);
    var id = $container.attr('data-section-id');
    var $featuredImage = this.$featuredImage = $('#FeaturedImage-'+id);
    var featuredImageSelector = this.featuredImageSelector = '#FeaturedImage-'+id;
    var parallaxSliderSelector = this.parallaxSliderSelector = '#FeaturedImage-'+id + " .parallax-slider";
    var $autoplay = this.$autoplay = this.$container.find('[data-video-autoplay]');
    var $youtubeWrapper = this.$youtubeWrapper = this.$container.find('[data-youtube-wrapper]');
    var playerID = this.playerID = $youtubeWrapper.attr('id');
    theme.playersArray = [];

    var $currentVideo = $container.find('.popupVideo');
    $currentVideo.magnificPopup({
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      closeBtnInside: false,
      preloader: false,
      fixedContentPos: false,
      iframe: {
        patterns: {
          youtube: {
            src: '//www.youtube.com/embed/%id%?autoplay=1&rel=0&showinfo=0'
          }
        }
      }
    });

    function LoadYoutubeVideo(){
      theme.playersArray[playerID] = new YT.Player(playerID, {
        videoId: videoID,
        playerVars: {
          cc_load_policy: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          autohide: 0,
          controls: 0,
          branding: 0,
          showinfo: 0,
          rel: 0,
          fs: 0,
          wmode: 'opaque'
        },
        events: {
          'onReady': onVideoReady,
          'onStateChange': onVideoStateChange
        }
      });
    }

    function onVideoReady(e) {
      e.target.mute();
      e.target.playVideo();
      $($currentVideo).on('mfpOpen', function() {
          e.target.pauseVideo();
      });
      $($currentVideo).on('mfpClose', function() {
          e.target.playVideo();
      });
    }

    function onVideoStateChange(e) {
      if (e.data == 0) {
        // video is over, replay
        e.target.playVideo();
      }
      if (e.data == 1) {
        // video is playing
        $autoplay.css('opacity', '1');
      }
    }

    if ( $autoplay.length ) {
      var videoID = $autoplay.attr('data-video-id');
      var videoType = $autoplay.attr('data-video-type');

      if ( videoType == 'vimeo'){
        var oembed_url = 'https://vimeo.com/api/oembed.json'
        var vimeo_url = 'https://vimeo.com/' + videoID;

        var params = {
          url: vimeo_url,
          background: true,
          muted: true,
          autoplay: true
        }
        $.getJSON(oembed_url, params, function(data) {
          $autoplay.html(data.html);
        })
      }
      else if ( videoType == 'youtube'){
        $autoplay.css('opacity', '0');
        loadYoutubeAPI();

        var player;
        if(window.YoutubeAPILoaded){
          LoadYoutubeVideo()
        }
        else{
          $('body').on('YoutubeAPILoaded', LoadYoutubeVideo)
        }
      }
    }

    if ($featuredImage.attr('data-parallax-src')) {
      $featuredImage.parallax({
        src: $featuredImage.data('parallax-src'),
        parallax: 'scroll',
        excludeAgents: /(none)/,
        mirrorSelector: featuredImageSelector
      });
      $.each( $(featuredImageSelector).data(), function(key,val){
        if (key == 'widths' ){
         val = "[" + val + "]"
        }
        var kebabKey = "data-" + key;
        kebabKey = kebabKey.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();
        $(parallaxSliderSelector).attr( kebabKey,val);
      });
      $(parallaxSliderSelector).addClass('lazyload');

      var loadCount = 0;
      $(parallaxSliderSelector).on('load', function(){
        loadCount++;
        if (loadCount > 1){
          $featuredImage.css("background-image", '');
        }
      });
      setTimeout(function() {
        $featuredImage.css("background-image", '');
      }, 5000);
    }
  }


  Video.prototype = _.assignIn({}, Video.prototype, {
    onUnload: function() {
      if (this.$container.attr('data-img-src')) {
        this.$container.parallax('destroy');
      }
      var magnificObject = this.$container.find('.popupVideo')
      magnificObject.off('click.magnificpopup');
      magnificObject.removeData('magnificPopup');

      theme.playersArray[this.playerID].destroy();
    }
  });

  return Video;
})();

theme.FreeSwatchHero = (function() {
  function FreeSwatchHero(container) {
    var $container = this.$container = $(container);

    $('.template-page-freeswatch .btn--fabric-info').click(function (e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });
  }

  FreeSwatchHero.prototype = _.assignIn({}, FreeSwatchHero.prototype, {
    onUnload: function() {
      
    }
  });

  return FreeSwatchHero;
})();

theme.FreeSwatchChoose = (function() {

  function FreeSwatchChoose(container) {
    this.$container = $(container);
    this.$form = this.$container.closest('form');
    this.init();
  }

  FreeSwatchChoose.prototype = _.assignIn({}, FreeSwatchChoose.prototype, {
    init: function() {
      this.cache = {
        $checkboxes: this.$container.find('input[type="checkbox"]'),
        $chkAllFabrics: $("#chk_all-fabrics"),
        $chkAllFabricsLeathers: $("#chk_all-fabrics-leathers"),
        $chkBundles: $('.fabrics-bundle input[type="checkbox"]')
      };

      this.bundleLoaded = {};

      this.disableDragImages();
      this.onWhatsIncluded(); 
      this.preloadWhatsIncluded();
      this.onSubmitForm();

      this.$container.on('change', '.fabric-block input[type="checkbox"]', this.onCheckBundle.bind(this));
    },

    disableDragImages: function() {
      this.$container.find('img').attr('draggable', false);
    },

    onWhatsIncluded: function() {
      var self = this;

      self.$container.find('.fabric-block .open_modal_fabric').magnificPopup({
        type: 'inline',
        preloader: true,

        callbacks: {
          open: function() {
            var bundleType = $(this._lastFocusedEl).data("bundleType");
            self.loadWhatsIncluded(bundleType);
          }
        }
      });

    },

    loadWhatsIncluded: function(bundleType) {
      var self = this;

      if (typeof self.bundleLoaded[bundleType] !== 'undefined') {
        return;
      }

      var collection_url = '/collections/' + bundleType;

      $.ajax({
        url: collection_url,
        data: {
          view: "freeswatch-bundle"
        },
        cache: true,
        success: function(html) {
          self.bundleLoaded[bundleType] = true;
          $('#freeswatch-popup-' + bundleType).find('.inner-html').html(html);
        }
      });    
    },

    preloadWhatsIncluded: function() {
      var self = this;

      self.$container.find('.whats-included').each(function() {
        var bundleType = $(this).data('bundleType');
        self.loadWhatsIncluded(bundleType);
      })
    },

    onCheckBundle: function(evt) {
      if ( !evt.target.checked ) {
        return;
      }

      this.$container.find('.alert').alert('close');

      var id = evt.target.id,
          block = $(evt.target).data('block');


      if (block === 'all') {
        // Uncheck the other "All" checkbox
        if (id === 'chk_all-fabrics') {
          this.cache.$chkAllFabricsLeathers.prop('checked', false);
        } else if (id == 'chk_all-fabrics-leathers') {
          this.cache.$chkAllFabrics.prop('checked', false);
        }

        // Uncheck all the "Bundle" checkboxes
        this.cache.$chkBundles.prop('checked', false);

      } else if (block === 'bundle') {
        // Uncheck "All" checkboxes
        this.cache.$chkAllFabrics.prop('checked', false);
        this.cache.$chkAllFabricsLeathers.prop('checked', false);
      }
    },

    onSubmitForm: function() {
      var self = this;

      var $btnVisibleSubmit = self.$form.find('button[data-custom-submit]');
      var $btnHiddenSubmit = self.$form.find('button[type="submit"]');

      this.$form.on('click', '[data-custom-submit]', function(e) {
        e.preventDefault();
        e.stopPropagation();

        self.$form[0].removeAttribute('onsubmit');
        
        if ($btnVisibleSubmit.hasClass('btn--loading')) {
          return;
        }

        // Check if at least one checkbox is checked
        if (self.cache.$checkboxes.filter(":checked").length == 0) {
          e.stopPropagation();

          var $alertWrapper = self.$container.find('.alert-wrapper'),
              $alert = $alertWrapper.find('.alert-warning');

          if ($alert.length == 0) {
            $alertWrapper.html('<div class="alert alert-warning fade show" role="alert"><strong>Free Swatches!</strong> Please check at least one option below. <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div>');
          } else {
            $alert.alert('close');
          }

          $('html, body').animate({
            scrollTop: $("#shopify-section-freeswatch-choose").offset().top
          }, 200);

          return false;
        }

        $btnHiddenSubmit.click();

        return false;
      });


      this.$form.on('submit', function() {
        $btnVisibleSubmit.addClass('btn--loading');

        self.$form.ajaxSubmit({
          url: theme.variables.googleScriptUrl,
          
          success: function() {
            location.href = location.pathname + '?contact_posted=true';
          },

          error: function(response) {
            console.log(response);
            $btnVisibleSubmit.removeClass('btn--loading');
          }
        });

        return false;
      });
    }
  });

  return FreeSwatchChoose;
})();


theme.HomeIntro = (function() {

  function HomeIntro(container) {
    // Animation
    this.$container = $(container);

    this.init();
  }

  HomeIntro.prototype = _.assignIn({}, HomeIntro.prototype, {
    init: function() {
      this.prevWindowWidth = window.innerWidth;

      this.isRunning = {
        collection: true,
        size: false,
        swatch: false,
      };

      this.intervals = {
        collection_fade: 300,
        collection_show: 600,
        size: 150,
        swatch: 2000
      };

      this.intervalObjects = {
        collection: null,
        size: null,
        swatch: null
      };

      this.lastProgress = {
        collection: 0,
        size: 0
      };

      this.intervals.collection = this.intervals.collection_fade * 2 + this.intervals.collection_show + 400;

      // Choose Collection
      this.initCollection();

      // Choose Size
      this.initSize();

      // Choose Swatch
      this.initSwatch();

      // Scroll effects
      this.initScenes();

      $(window).on('resize', this.onResize.bind(this));
    },

    onResize: function() {
      if (window.innerWidth < this.prevWindowWidth) {
        return;
      }

      this.sizeUrlTemplate = this.sizeUrlTemplate1x.replace('_1x.', '_' + this.getWidth() + 'x.');
      this.swatchUrlTemplate = this.swatchUrlTemplate1x.replace('_1x.', '_' + this.getWidth() + 'x.');

      this.prevWindowWidth = window.innerWidth;
    },

    getWidth: function() {
      if (window.innerWidth > 800) {
        return 800;
      }

      return Math.round(window.innerWidth * window.devicePixelRatio);
    },

    initCollection: function() {
      this.$collections = this.$container.find('.collection-images').children();
      this.collectionCount = this.$collections.length;
      this.$currentCollection = null;
      this.currentCollectionKey = this.$collections.first().data('collectionKey');
      this.currentCollectionIndex = 0; // index is 1-based

      this.intervalObjects.collection = setInterval($.proxy(this.collectionCallback, this), this.intervals.collection);
    },

    initSize: function() {
      this.$sizes = this.$container.find('.size-image--item');

      this.sizeUrlTemplate1x = "//cdn.shopify.com/s/files/1/0250/3304/8148/files/[ck]-SOFA-HOME-[inch]_1x.png?95941";
      this.sizeUrlTemplate = this.sizeUrlTemplate1x.replace('_1x.', '_' + this.getWidth() + 'x.');

      this.minSize = 6500;
      this.maxSize = 10000;
      this.sizeStep = 250;
      this.sizeCount = (this.maxSize - this.minSize) / this.sizeStep + 1;
      this.currentSizeIndex = null;
      this.sizeIncrement = 1;

      this.intervalObjects.size = setInterval($.proxy(this.sizeCallback, this), this.intervals.size);
    },

    initSwatch: function() {
      this.swatchUrlTemplate1x = "//cdn.shopify.com/s/files/1/0250/3304/8148/files/home-swatch-[ck][i]_1x.jpg?95941";
      this.swatchUrlTemplate = this.swatchUrlTemplate1x.replace('_1x.', '_' + this.getWidth() + 'x.');

      this.currentSwatchIndex = 1;
      this.swatchCount = 11;
      this.swatchUrls = []; 
      this.isSwatchLoaded = {};
      this.$swatchFront = this.$container.find('.preview-slot--front');
      this.$swatchFrontImg = this.$swatchFront.children('img');
      this.$swatchBack = this.$container.find('.preview-slot--back');
      this.$swatchBackImg = this.$swatchBack.children('img');

      this.reloadSwatches();

      this.intervalObjects.swatch = setInterval($.proxy(this.swatchCallback, this), this.intervals.swatch + 1000);
    },

    initScenes: function() {
      var self = this;

      // init
      var controller = new ScrollMagic.Controller({
        globalSceneOptions: {
          triggerHook: 'onLeave',
          duration: "100%" // this works just fine with duration 0 as well
          // However with large numbers (>20) of pinned sections display errors can occur so every section should be unpinned once it's covered by the next section.
          // Normally 100% would work for this, but here 200% is used, as Panel 3 is shown for more than 100% of scrollheight due to the pause.
        }
      });

      // get all slides
      var slides = document.querySelectorAll("#section_choose_collection, #section_choose_size");

      // Threshold for "Choose Collection" scene
      let tc = {
        startSize: 0.4,
        stopCollection: 0.4
      };

      // Threshold for "Choose Size" scene
      let ts = {
        startSwatch: 0.5,
        stopSize: 0.8
      };

      // create scene for every slide
      for (let i=0; i<slides.length; i++) {
        new ScrollMagic.Scene({
            triggerElement: slides[i]
          })
          .on("progress", function(e) {
            let $elem = e.target.triggerElement(),
                id = $elem.attributes.id.value;

            //console.log(id + ': ' + e.scrollDirection + ', ' + e.progress);

            if (id === 'section_choose_collection') {
              if (e.scrollDirection === 'FORWARD') {
                if (self.lastProgress.collection < tc.startSize && e.progress > tc.startSize) {
                  self.toggleState('size', 'start');
                }

                if (self.lastProgress.collection < tc.stopCollection && e.progress > tc.stopCollection) {
                  self.toggleState('collection', 'stop');
                }

              } else if (e.scrollDirection === 'REVERSE') {
                if (self.lastProgress.collection > tc.startSize && e.progress < tc.startSize) {
                  self.toggleState('size', 'stop');
                }

                if (self.lastProgress.collection > tc.stopCollection && e.progress < tc.stopCollection) {
                  self.toggleState('collection', 'start');
                }
              }

              self.lastProgress.collection = e.progress;

            } else if (id === 'section_choose_size') {
              if (e.scrollDirection === 'FORWARD') {
                if (self.lastProgress.size < ts.startSwatch && e.progress > ts.startSwatch) {
                  self.toggleState('swatch', 'start');
                } else if (self.lastProgress.size < ts.stopSize && e.progress > ts.stopSize) {
                  self.toggleState('size', 'stop');
                }

              } else if (e.scrollDirection === 'REVERSE') {
                if (self.lastProgress.size > ts.startSwatch && e.progress < ts.startSwatch) {
                  self.toggleState('swatch', 'stop');
                } else if (self.lastProgress.size > ts.stopSize && e.progress < ts.stopSize) {
                  self.toggleState('size', 'start');
                }
              }

              self.lastProgress.size = e.progress;
            }
          })
          .setPin(slides[i], {pushFollowers: false})
          .addTo(controller);
      }
    },

    toggleState: function(targetName, action) {
      var self = this;

      if (action === 'start') {
        this.isRunning[targetName] = true;
        console.log("Started: " + targetName);

        if (targetName === 'size') {
          // Replace image sources
          this.reloadSizes();
          this.reloadSwatches();

          if (this.intervalObjects.size) {
            clearInterval(this.intervalObjects.size);
          }

          // Restart immediately
          this.sizeCallback();
          this.intervalObjects.size = setInterval($.proxy(this.sizeCallback, this), this.intervals.size);

        } else if (targetName === 'collection') {
          if (this.currentCollectionIndex === 1) {
            this.currentCollectionIndex = this.collectionCount;
          } else {
            this.currentCollectionIndex--;
          }

          if (this.intervalObjects.collection) {
            clearInterval(this.intervalObjects.collection);
          }

          // Restart immediately
          this.collectionCallback(true);
          this.intervalObjects.collection = setInterval($.proxy(this.collectionCallback, this), this.intervals.collection);

        } else if (targetName === 'swatch') {
          if (this.intervalObjects.swatch) {
            clearInterval(this.intervalObjects.swatch);
          }

          // Restart immediately
          this.swatchCallback();
          this.intervalObjects.swatch = setInterval($.proxy(this.swatchCallback, this), this.intervals.swatch + 1000);

        }

      } else {
        this.isRunning[targetName] = false;
        console.log("(X) Stopped: " + targetName);
      }

      //console.log(this.lastProgress);
    },

    collectionCallback: function(showImmediately) {
      if (!this.isRunning.collection) {
        return;
      }
      
      var self = this;
      this.currentCollectionIndex++;
      if (this.currentCollectionIndex > this.collectionCount) {
        this.currentCollectionIndex = 1;
      }

      //console.log('currentCollectionIndex: ' + this.currentCollectionIndex);

      this.$collections.hide();
      this.$currentCollection = this.$collections.eq(this.currentCollectionIndex - 1);
      this.currentCollectionKey = this.$currentCollection.data('collectionKey');

      let showTime = this.intervals.collection_show;
      if (typeof showImmediately !== 'undefined') {
        // Show immediately
        showTime += this.intervals.collection_fade;
        this.$currentCollection.show();
      } else {
        // Show using Fade In effect
        this.$currentCollection.fadeIn(this.intervals.collection_fade);
      }

      this.$currentCollection.delay(showTime)
        .fadeOut(this.intervals.collection_fade);
    },

    sizeCallback: function() {
      if (!this.isRunning.size) {
        return;
      }

      if (this.currentSizeIndex !== null) {
        this.$sizes.eq(this.currentSizeIndex).hide();
      }

      if (this.sizeIncrement > 0 && this.currentSizeIndex == this.sizeCount - 1) {
        // Large => Small
        this.sizeIncrement = -this.sizeIncrement;
      } else if (this.sizeIncrement < 0 && this.currentSizeIndex == 0) {
        // Small => Large
        this.sizeIncrement = -this.sizeIncrement;
      }

      this.currentSizeIndex += this.sizeIncrement;
      this.$sizes.eq(this.currentSizeIndex).show();
    },

    swatchCallback: function() {
      if (!this.isRunning.swatch) {
        return;
      }

      // Replace back image with front image
      this.$swatchBackImg.attr('src', this.swatchUrls[this.currentSwatchIndex - 1]);
      
      // Replace front image with the next hidden image
      if (this.currentSwatchIndex == this.swatchCount) {
        this.currentSwatchIndex = 1;
      } else {
        this.currentSwatchIndex++;
      }

      this.$swatchFrontImg.attr('src', this.swatchUrls[this.currentSwatchIndex - 1]);
      this.$swatchFront.css('width', 0);

      this.$swatchFront.animate({ width: "100%" }, this.intervals.swatch);
    },

    reloadSizes: function() {
      let self = this;

      $('.size-image--item').each(function() {
        let inch = $(this).data('inch');
        let src = self.sizeUrlTemplate.replace('[ck]', self.currentCollectionKey.toUpperCase()).replace('[inch]', inch);
        $(this).children('img').attr('src', src);
      });      
    },

    reloadSwatches: function() {
      // Preload images for swatches
      this.swatchUrls = [];

      let src = '';
      for (let i=0; i<this.swatchCount; i++) {
        src = this.swatchUrlTemplate.replace('[ck]', this.currentCollectionKey).replace('[i]', i+1);

        if (typeof this.isSwatchLoaded[this.currentCollectionKey + i] === 'undefined') {
          new Image().src = src;
          this.isSwatchLoaded[this.currentCollectionKey + i] = true;
        }

        this.swatchUrls.push(src);
      }

      // Replace back image with front image
      this.$swatchBackImg.attr('src', this.swatchUrls[this.currentSwatchIndex - 1]);
      this.$swatchFront.css('width', '0');
      //this.currentSwatchIndex = 1;
    }
  })

  return HomeIntro;
})();


theme.HomeShipping = (function() {
  function HomeShipping(container) {
    this.$container = $(container);
    this.init();
  }

  HomeShipping.prototype = _.assignIn({}, HomeShipping.prototype, {
    init: function() {
      $('.popup-shipping-days').magnificPopup({
        preloader: false,
        // Delay in milliseconds before popup is removed
        removalDelay: 300,
        mainClass: 'mfp-fade'
      });
    }
  });

  return HomeShipping;
})();


theme.HomeReviews = (function() {
  function HomeReviews(container) {
    this.$container = $(container);

    $(window).one('scroll', this.init.bind(this));
  }

  HomeReviews.prototype = _.assignIn({}, HomeReviews.prototype, {
    init: function() {
      this.$container.find('img').each(function() {
        $(this).attr('src', $(this).data('src'));
      });

      
      this.$container.find('.reviews-slider').slick({
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 1500,
        pauseOnHover: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        cssEase: 'ease-out',
        responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });

      this.$container.find('.review-item').show();
    }
  });

  return HomeReviews;
})();


theme.TradeProgram = (function() {
  function TradeProgram(container) {
    this.$container = $(container);
    this.$form = $('.frm-trade-join');
    this.init();
  }

  TradeProgram.prototype = _.assignIn({}, TradeProgram.prototype, {
    init: function() {
      var self = this;

      self.$form.on('submit', function(e) {
        e.preventDefault();

        var $form = $(this);
        
        $form.find('button[type="submit"]').addClass('btn--loading');
        $form.ajaxSubmit({
          url: theme.variables.googleScriptUrl,
          
          success: function() {
            location.href = location.pathname + '?contact_posted=true';
          },

          error: function(response) {
            console.log(response);
            $form.find('button[type="submit"]').removeClass('btn--loading');
          }
        });
      });
    }
  });

  return TradeProgram;
})();


theme.MyRequests = (function() {
  function MyRequests(container) {
    this.$container = $(container);
    this.init();
  }

  MyRequests.prototype = _.assignIn({}, MyRequests.prototype, {
    init: function() {
      var self = this;

      var email = this.$container.find('input[name="customer_email"]').val();
      if (!email) {
        return false;
      }

      var sourceSwatch = $('#MyRequestsTemplate_swatch').html();
      var templateSwatch = Handlebars.compile(sourceSwatch);

      var sourcePrintout = $('#MyRequestsTemplate_printout').html();
      var templatePrintout = Handlebars.compile(sourcePrintout);

      var sourceTrade = $('#MyRequestsTemplate_trade').html();
      var templateTrade = Handlebars.compile(sourceTrade);

      // Get submission from googleScriptUrl
      $.get(theme.variables.googleScriptUrl, { email: email }, function(data) {
        self.$container.find('.section-body--swatch .list-request').html(templateSwatch(data));

        self.$container.find('.section-body--printout .list-request').html(templatePrintout(data));

        self.$container.find('.section-body--trade .list-request').html(templateTrade(data));
      }, 'json');
    }
  });

  return MyRequests;
})();


$(document).ready(function() {
  theme.init();
  var sections = new theme.Sections();

  sections.register('product-template', theme.Product);
  sections.register('collection-template', theme.Collection);
  sections.register('collection-list', theme.CollectionList);
  sections.register('header-section', theme.HeaderSection);
  sections.register('featured-content-section', theme.FeaturedContentSection);
  sections.register('newsletter-section', theme.NewsletterSection);
  sections.register('slideshow-section', theme.SlideshowSection);
  sections.register('password-header', theme.PasswordHeader);
  sections.register('password-content', theme.PasswordContent);
  sections.register('product-recommendations', theme.ProductRecommendations);
  sections.register('index-columns', theme.ColumnPopup);
  sections.register('map', theme.Maps);
  sections.register('search', theme.Search);
  sections.register('video', theme.Video);
  sections.register('freeswatch-hero', theme.FreeSwatchHero);
  sections.register('freeswatch-choose', theme.FreeSwatchChoose);
  sections.register('home-intro', theme.HomeIntro);
  sections.register('home-shipping', theme.HomeShipping);
  sections.register('home-reviews', theme.HomeReviews);
  sections.register('trade-program', theme.TradeProgram);
  sections.register('my-requests', theme.MyRequests);


  /*
  $('.homepage-double .slideshow').slick();
  $('.about-slideshow > .slideshow').slick({
    adaptiveHeight: true,
    arrows: true
  });
  */
});

/*
 * Run function after window resize
 * http://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed
 */
var afterResize = (function () {
  var t = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (t[uniqueId]) {
      clearTimeout(t[uniqueId]);
    }
    t[uniqueId] = setTimeout(callback, ms);
  };
})();
