(function(e){function t(e,t){return function(n){return u(e.call(this,n),t)}}function n(e){return function(t){return this.lang().ordinal(e.call(this,t))}}function r(){}function a(e){i(this,e)}function o(e){var t=this._data={},n=e.years||e.year||e.y||0,r=e.months||e.month||e.M||0,a=e.weeks||e.week||e.w||0,o=e.days||e.day||e.d||0,i=e.hours||e.hour||e.h||0,u=e.minutes||e.minute||e.m||0,l=e.seconds||e.second||e.s||0,c=e.milliseconds||e.millisecond||e.ms||0;this._milliseconds=c+1e3*l+6e4*u+36e5*i,this._days=o+7*a,this._months=r+12*n,t.milliseconds=c%1e3,l+=s(c/1e3),t.seconds=l%60,u+=s(l/60),t.minutes=u%60,i+=s(u/60),t.hours=i%24,o+=s(i/24),o+=7*a,t.days=o%30,r+=s(o/30),t.months=r%12,n+=s(r/12),t.years=n}function i(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}function s(e){return 0>e?Math.ceil(e):Math.floor(e)}function u(e,t){for(var n=e+"";t>n.length;)n="0"+n;return n}function l(e,t,n){var r,a=t._milliseconds,o=t._days,i=t._months;a&&e._d.setTime(+e+a*n),o&&e.date(e.date()+o*n),i&&(r=e.date(),e.date(1).month(e.month()+i*n).date(Math.min(r,e.daysInMonth())))}function c(e){return"[object Array]"===Object.prototype.toString.call(e)}function d(e,t){var n,r=Math.min(e.length,t.length),a=Math.abs(e.length-t.length),o=0;for(n=0;r>n;n++)~~e[n]!==~~t[n]&&o++;return o+a}function f(e,t){return t.abbr=e,F[e]||(F[e]=new r),F[e].set(t),F[e]}function p(e){return e?(!F[e]&&Y&&require("./lang/"+e),F[e]):A.fn._lang}function h(e){return e.match(/\[.*\]/)?e.replace(/^\[|\]$/g,""):e.replace(/\\/g,"")}function m(e){var t,n,r=e.match(z);for(t=0,n=r.length;n>t;t++)r[t]=at[r[t]]?at[r[t]]:h(r[t]);return function(a){var o="";for(t=0;n>t;t++)o+="function"==typeof r[t].call?r[t].call(a,e):r[t];return o}}function g(e,t){function n(t){return e.lang().longDateFormat(t)||t}for(var r=5;r--&&I.test(t);)t=t.replace(I,n);return tt[t]||(tt[t]=m(t)),tt[t](e)}function v(e){switch(e){case"DDDD":return H;case"YYYY":return P;case"YYYYY":return V;case"S":case"SS":case"SSS":case"DDD":return $;case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":case"a":case"A":return J;case"X":return W;case"Z":case"ZZ":return U;case"T":return q;case"MM":case"DD":case"YY":case"HH":case"hh":case"mm":case"ss":case"M":case"D":case"d":case"H":case"h":case"m":case"s":return B;default:return RegExp(e.replace("\\",""))}}function b(e,t,n){var r,a=n._a;switch(e){case"M":case"MM":a[1]=null==t?0:~~t-1;break;case"MMM":case"MMMM":r=p(n._l).monthsParse(t),null!=r?a[1]=r:n._isValid=!1;break;case"D":case"DD":case"DDD":case"DDDD":null!=t&&(a[2]=~~t);break;case"YY":a[0]=~~t+(~~t>68?1900:2e3);break;case"YYYY":case"YYYYY":a[0]=~~t;break;case"a":case"A":n._isPm="pm"===(t+"").toLowerCase();break;case"H":case"HH":case"h":case"hh":a[3]=~~t;break;case"m":case"mm":a[4]=~~t;break;case"s":case"ss":a[5]=~~t;break;case"S":case"SS":case"SSS":a[6]=~~(1e3*("0."+t));break;case"X":n._d=new Date(1e3*parseFloat(t));break;case"Z":case"ZZ":n._useUTC=!0,r=(t+"").match(X),r&&r[1]&&(n._tzh=~~r[1]),r&&r[2]&&(n._tzm=~~r[2]),r&&"+"===r[0]&&(n._tzh=-n._tzh,n._tzm=-n._tzm)}null==t&&(n._isValid=!1)}function y(e){var t,n,r=[];if(!e._d){for(t=0;7>t;t++)e._a[t]=r[t]=null==e._a[t]?2===t?1:0:e._a[t];r[3]+=e._tzh||0,r[4]+=e._tzm||0,n=new Date(0),e._useUTC?(n.setUTCFullYear(r[0],r[1],r[2]),n.setUTCHours(r[3],r[4],r[5],r[6])):(n.setFullYear(r[0],r[1],r[2]),n.setHours(r[3],r[4],r[5],r[6])),e._d=n}}function k(e){var t,n,r=e._f.match(z),a=e._i;for(e._a=[],t=0;r.length>t;t++)n=(v(r[t]).exec(a)||[])[0],n&&(a=a.slice(a.indexOf(n)+n.length)),at[r[t]]&&b(r[t],n,e);e._isPm&&12>e._a[3]&&(e._a[3]+=12),e._isPm===!1&&12===e._a[3]&&(e._a[3]=0),y(e)}function _(e){for(var t,n,r,o,s=99;e._f.length;){if(t=i({},e),t._f=e._f.pop(),k(t),n=new a(t),n.isValid()){r=n;break}o=d(t._a,n.toArray()),s>o&&(s=o,r=n)}i(e,r)}function w(e){var t,n=e._i;if(Z.exec(n)){for(e._f="YYYY-MM-DDT",t=0;4>t;t++)if(G[t][1].exec(n)){e._f+=G[t][0];break}U.exec(n)&&(e._f+=" Z"),k(e)}else e._d=new Date(n)}function T(t){var n=t._i,r=R.exec(n);n===e?t._d=new Date:r?t._d=new Date(+r[1]):"string"==typeof n?w(t):c(n)?(t._a=n.slice(0),y(t)):t._d=n instanceof Date?new Date(+n):new Date(n)}function x(e,t,n,r,a){return a.relativeTime(t||1,!!n,e,r)}function E(e,t,n){var r=O(Math.abs(e)/1e3),a=O(r/60),o=O(a/60),i=O(o/24),s=O(i/365),u=45>r&&["s",r]||1===a&&["m"]||45>a&&["mm",a]||1===o&&["h"]||22>o&&["hh",o]||1===i&&["d"]||25>=i&&["dd",i]||45>=i&&["M"]||345>i&&["MM",O(i/30)]||1===s&&["y"]||["yy",s];return u[2]=t,u[3]=e>0,u[4]=n,x.apply({},u)}function S(e,t,n){var r=n-t,a=n-e.day();return a>r&&(a-=7),r-7>a&&(a+=7),Math.ceil(A(e).add("d",a).dayOfYear()/7)}function C(e){var t=e._i,n=e._f;return null===t||""===t?null:("string"==typeof t&&(e._i=t=p().preparse(t)),A.isMoment(t)?(e=i({},t),e._d=new Date(+t._d)):n?c(n)?_(e):k(e):T(e),new a(e))}function M(e,t){A.fn[e]=A.fn[e+"s"]=function(e){var n=this._isUTC?"UTC":"";return null!=e?(this._d["set"+n+t](e),this):this._d["get"+n+t]()}}function D(e){A.duration.fn[e]=function(){return this._data[e]}}function N(e,t){A.duration.fn["as"+e]=function(){return+this/t}}for(var A,L,j="2.0.0",O=Math.round,F={},Y="undefined"!=typeof module&&module.exports,R=/^\/?Date\((\-?\d+)/i,z=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g,I=/(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,B=/\d\d?/,$=/\d{1,3}/,H=/\d{3}/,P=/\d{1,4}/,V=/[+\-]?\d{1,6}/,J=/[0-9]*[a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF]+\s*?[\u0600-\u06FF]+/i,U=/Z|[\+\-]\d\d:?\d\d/i,q=/T/i,W=/[\+\-]?\d+(\.\d{1,3})?/,Z=/^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/,K="YYYY-MM-DDTHH:mm:ssZ",G=[["HH:mm:ss.S",/(T| )\d\d:\d\d:\d\d\.\d{1,3}/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],X=/([\+\-]|\d\d)/gi,Q="Month|Date|Hours|Minutes|Seconds|Milliseconds".split("|"),et={Milliseconds:1,Seconds:1e3,Minutes:6e4,Hours:36e5,Days:864e5,Months:2592e6,Years:31536e6},tt={},nt="DDD w W M D d".split(" "),rt="M D H h m s w W".split(" "),at={M:function(){return this.month()+1},MMM:function(e){return this.lang().monthsShort(this,e)},MMMM:function(e){return this.lang().months(this,e)},D:function(){return this.date()},DDD:function(){return this.dayOfYear()},d:function(){return this.day()},dd:function(e){return this.lang().weekdaysMin(this,e)},ddd:function(e){return this.lang().weekdaysShort(this,e)},dddd:function(e){return this.lang().weekdays(this,e)},w:function(){return this.week()},W:function(){return this.isoWeek()},YY:function(){return u(this.year()%100,2)},YYYY:function(){return u(this.year(),4)},YYYYY:function(){return u(this.year(),5)},a:function(){return this.lang().meridiem(this.hours(),this.minutes(),!0)},A:function(){return this.lang().meridiem(this.hours(),this.minutes(),!1)},H:function(){return this.hours()},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},s:function(){return this.seconds()},S:function(){return~~(this.milliseconds()/100)},SS:function(){return u(~~(this.milliseconds()/10),2)},SSS:function(){return u(this.milliseconds(),3)},Z:function(){var e=-this.zone(),t="+";return 0>e&&(e=-e,t="-"),t+u(~~(e/60),2)+":"+u(~~e%60,2)},ZZ:function(){var e=-this.zone(),t="+";return 0>e&&(e=-e,t="-"),t+u(~~(10*e/6),4)},X:function(){return this.unix()}};nt.length;)L=nt.pop(),at[L+"o"]=n(at[L]);for(;rt.length;)L=rt.pop(),at[L+L]=t(at[L],2);for(at.DDDD=t(at.DDD,3),r.prototype={set:function(e){var t,n;for(n in e)t=e[n],"function"==typeof t?this[n]=t:this["_"+n]=t},_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),months:function(e){return this._months[e.month()]},_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),monthsShort:function(e){return this._monthsShort[e.month()]},monthsParse:function(e){var t,n,r;for(this._monthsParse||(this._monthsParse=[]),t=0;12>t;t++)if(this._monthsParse[t]||(n=A([2e3,t]),r="^"+this.months(n,"")+"|^"+this.monthsShort(n,""),this._monthsParse[t]=RegExp(r.replace(".",""),"i")),this._monthsParse[t].test(e))return t},_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdays:function(e){return this._weekdays[e.day()]},_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysShort:function(e){return this._weekdaysShort[e.day()]},_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),weekdaysMin:function(e){return this._weekdaysMin[e.day()]},_longDateFormat:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D YYYY",LLL:"MMMM D YYYY LT",LLLL:"dddd, MMMM D YYYY LT"},longDateFormat:function(e){var t=this._longDateFormat[e];return!t&&this._longDateFormat[e.toUpperCase()]&&(t=this._longDateFormat[e.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(e){return e.slice(1)}),this._longDateFormat[e]=t),t},meridiem:function(e,t,n){return e>11?n?"pm":"PM":n?"am":"AM"},_calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[last] dddd [at] LT",sameElse:"L"},calendar:function(e,t){var n=this._calendar[e];return"function"==typeof n?n.apply(t):n},_relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},relativeTime:function(e,t,n,r){var a=this._relativeTime[n];return"function"==typeof a?a(e,t,n,r):a.replace(/%d/i,e)},pastFuture:function(e,t){var n=this._relativeTime[e>0?"future":"past"];return"function"==typeof n?n(t):n.replace(/%s/i,t)},ordinal:function(e){return this._ordinal.replace("%d",e)},_ordinal:"%d",preparse:function(e){return e},postformat:function(e){return e},week:function(e){return S(e,this._week.dow,this._week.doy)},_week:{dow:0,doy:6}},A=function(e,t,n){return C({_i:e,_f:t,_l:n,_isUTC:!1})},A.utc=function(e,t,n){return C({_useUTC:!0,_isUTC:!0,_l:n,_i:e,_f:t})},A.unix=function(e){return A(1e3*e)},A.duration=function(e,t){var n,r=A.isDuration(e),a="number"==typeof e,i=r?e._data:a?{}:e;return a&&(t?i[t]=e:i.milliseconds=e),n=new o(i),r&&e.hasOwnProperty("_lang")&&(n._lang=e._lang),n},A.version=j,A.defaultFormat=K,A.lang=function(t,n){return t?(n?f(t,n):F[t]||p(t),A.duration.fn._lang=A.fn._lang=p(t),e):A.fn._lang._abbr},A.langData=function(e){return e&&e._lang&&e._lang._abbr&&(e=e._lang._abbr),p(e)},A.isMoment=function(e){return e instanceof a},A.isDuration=function(e){return e instanceof o},A.fn=a.prototype={clone:function(){return A(this)},valueOf:function(){return+this._d},unix:function(){return Math.floor(+this._d/1e3)},toString:function(){return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},toDate:function(){return this._d},toJSON:function(){return A.utc(this).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")},toArray:function(){var e=this;return[e.year(),e.month(),e.date(),e.hours(),e.minutes(),e.seconds(),e.milliseconds()]},isValid:function(){return null==this._isValid&&(this._isValid=this._a?!d(this._a,(this._isUTC?A.utc(this._a):A(this._a)).toArray()):!isNaN(this._d.getTime())),!!this._isValid},utc:function(){return this._isUTC=!0,this},local:function(){return this._isUTC=!1,this},format:function(e){var t=g(this,e||A.defaultFormat);return this.lang().postformat(t)},add:function(e,t){var n;return n="string"==typeof e?A.duration(+t,e):A.duration(e,t),l(this,n,1),this},subtract:function(e,t){var n;return n="string"==typeof e?A.duration(+t,e):A.duration(e,t),l(this,n,-1),this},diff:function(e,t,n){var r,a,o=this._isUTC?A(e).utc():A(e).local(),i=6e4*(this.zone()-o.zone());return t&&(t=t.replace(/s$/,"")),"year"===t||"month"===t?(r=432e5*(this.daysInMonth()+o.daysInMonth()),a=12*(this.year()-o.year())+(this.month()-o.month()),a+=(this-A(this).startOf("month")-(o-A(o).startOf("month")))/r,"year"===t&&(a/=12)):(r=this-o-i,a="second"===t?r/1e3:"minute"===t?r/6e4:"hour"===t?r/36e5:"day"===t?r/864e5:"week"===t?r/6048e5:r),n?a:s(a)},from:function(e,t){return A.duration(this.diff(e)).lang(this.lang()._abbr).humanize(!t)},fromNow:function(e){return this.from(A(),e)},calendar:function(){var e=this.diff(A().startOf("day"),"days",!0),t=-6>e?"sameElse":-1>e?"lastWeek":0>e?"lastDay":1>e?"sameDay":2>e?"nextDay":7>e?"nextWeek":"sameElse";return this.format(this.lang().calendar(t,this))},isLeapYear:function(){var e=this.year();return 0===e%4&&0!==e%100||0===e%400},isDST:function(){return this.zone()<A([this.year()]).zone()||this.zone()<A([this.year(),5]).zone()},day:function(e){var t=this._isUTC?this._d.getUTCDay():this._d.getDay();return null==e?t:this.add({d:e-t})},startOf:function(e){switch(e=e.replace(/s$/,"")){case"year":this.month(0);case"month":this.date(1);case"week":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===e&&this.day(0),this},endOf:function(e){return this.startOf(e).add(e.replace(/s?$/,"s"),1).subtract("ms",1)},isAfter:function(t,n){return n=n!==e?n:"millisecond",+this.clone().startOf(n)>+A(t).startOf(n)},isBefore:function(t,n){return n=n!==e?n:"millisecond",+this.clone().startOf(n)<+A(t).startOf(n)},isSame:function(t,n){return n=n!==e?n:"millisecond",+this.clone().startOf(n)===+A(t).startOf(n)},zone:function(){return this._isUTC?0:this._d.getTimezoneOffset()},daysInMonth:function(){return A.utc([this.year(),this.month()+1,0]).date()},dayOfYear:function(e){var t=O((A(this).startOf("day")-A(this).startOf("year"))/864e5)+1;return null==e?t:this.add("d",e-t)},isoWeek:function(e){var t=S(this,1,4);return null==e?t:this.add("d",7*(e-t))},week:function(e){var t=this.lang().week(this);return null==e?t:this.add("d",7*(e-t))},lang:function(t){return t===e?this._lang:(this._lang=p(t),this)}},L=0;Q.length>L;L++)M(Q[L].toLowerCase().replace(/s$/,""),Q[L]);M("year","FullYear"),A.fn.days=A.fn.day,A.fn.weeks=A.fn.week,A.fn.isoWeeks=A.fn.isoWeek,A.duration.fn=o.prototype={weeks:function(){return s(this.days()/7)},valueOf:function(){return this._milliseconds+864e5*this._days+2592e6*this._months},humanize:function(e){var t=+this,n=E(t,!e,this.lang());return e&&(n=this.lang().pastFuture(t,n)),this.lang().postformat(n)},lang:A.fn.lang};for(L in et)et.hasOwnProperty(L)&&(N(L,et[L]),D(L.toLowerCase()));N("Weeks",6048e5),A.lang("en",{ordinal:function(e){var t=e%10,n=1===~~(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th";return e+n}}),Y&&(module.exports=A),"undefined"==typeof ender&&(this.moment=A),"function"==typeof define&&define.amd&&define("moment",[],function(){return A})}).call(this),moment.lang("sv",{months:"januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),weekdays:"söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split("_"),weekdaysShort:"sön_mån_tis_ons_tor_fre_lör".split("_"),weekdaysMin:"sö_må_ti_on_to_fr_lö".split("_"),longDateFormat:{LT:"HH:mm",L:"YYYY-MM-DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:"[Idag klockan] LT",nextDay:"[Imorgon klockan] LT",lastDay:"[Igår klockan] LT",nextWeek:"dddd [klockan] LT",lastWeek:"[Förra] dddd[en klockan] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"för %s sedan",s:"några sekunder",m:"en minut",mm:"%d minuter",h:"en timme",hh:"%d timmar",d:"en dag",dd:"%d dagar",M:"en månad",MM:"%d månader",y:"ett år",yy:"%d år"},ordinal:function(e){var t=e%10,n=1===~~(e%100/10)?"e":1===t?"a":2===t?"a":3===t?"e":"e";return e+n},week:{dow:1,doy:4}}),function(){var e=[/Midori/,/MSIE [7-9]\./,/Opera.*Version\/(10\.[5-9]|(11|12)\.)/,/Chrome\/([1-9]|10)\./,/Version\/[2-4][\.0-9]+ Safari\//,/Version\/(4\.0\.[4-9]|4\.[1-9]|5\.0)[\.0-9]+? Mobile\/.*Safari\//,/Android [1-2]\./,/BlackBerry.*WebKit/],t=function(){for(var t=navigator.userAgent,n=0;e.length>n;n++)if(e[n].test(t))return!0};if(t()){window.console&&console.log("Running Symbolset script...");var n={"notifications disabled":"🔕",notificationsdisabled:"🔕","notification disabled":"🔕",notificationdisabled:"🔕","telephone disabled":"",telephonedisabled:"","writing disabled":"","calendar remove":"","pencil disabled":"",writingdisabled:"","delete calendar":"","calendar delete":"","remove calendar":"","check calendar":"",pencildisabled:"",deletecalendar:"","navigate right":"▻",calendardelete:"","cloud download":"","phone disabled":"","calendar check":"",removecalendar:"","medium battery":"",calendarremove:"","battery medium":"","female avatar":"👧",notifications:"🔔","navigate left":"◅",clouddownload:"","navigate down":"","bell disabled":"🔕","shopping cart":"",phonedisabled:"",calendarcheck:"","call disabled":"","empty battery":"",navigateright:"▻",mediumbattery:"","battery empty":"",batterymedium:"",checkcalendar:"","direct right":"▹","high battery":"",calldisabled:"",notification:"🔔","rotate right":"↻",navigatedown:"",navigateleft:"◅",femaleavatar:"👧",batteryempty:"",emptybattery:"","battery high":"",shoppingcart:"","fast forward":"⏩","cloud upload":"","full battery":"🔋",belldisabled:"🔕","skip forward":"⏭","battery full":"🔋","add calendar":"","calendar add":"","mobile phone":"📱","remove date":"",directright:"▹","direct left":"◃",information:"ℹ",cloudupload:"","male avatar":"👤",batteryhigh:"",skipforward:"⏭","female user":"👧","low battery":"","navigate up":"",videocamera:"📹",photographs:"🌄",rotateright:"↻","thumbs down":"👎","high volume":"🔊","credit card":"💳","volume high":"🔊",highbattery:"","dollar sign":"💲",fullbattery:"🔋","delete date":"","rotate left":"↺","battery low":"",addcalendar:"",fastforward:"⏩",calendaradd:"",batteryfull:"🔋",mobilephone:"📱","direct down":"▾",highvolume:"🔊",navigation:"",smartphone:"📱",screenshot:"⌖",dollarsign:"💲",creditcard:"💳","hard drive":"",femaleuser:"👧",maleavatar:"👤",removedate:"","check date":"",microphone:"🎤",eyedropper:"",deletedate:"","volume low":"🔉","low volume":"🔉",volumehigh:"🔊","half heart":"",directions:"",navigateup:"","cell phone":"📱",thumbsdown:"👎",photograph:"🌄",disapprove:"👎",batterylow:"",lowbattery:"","down right":"⬊",thumbnails:"",attachment:"📎",visibility:"👀",connection:"",descending:"▾",directdown:"▾",rotateleft:"↺",directleft:"◃","pull quote":"“","down left":"⬋",backspace:"⌫",paperclip:"📎","direct up":"▴",dashboard:"","male user":"👤",cellphone:"📱",checkmark:"✓",checkdate:"",harddrive:"",halfheart:"","pie chart":"",downright:"⬊",musicnote:"♫",telephone:"📞",briefcase:"💼","bar chart":"📊",ascending:"▴","skip back":"⏮",crosshair:"⌖","thumbs up":"👍",volumelow:"🔉","open book":"📖",pullquote:"“","half star":"",lowvolume:"🔉",stopwatch:"⏱",maleuser:"👤",typeface:"",redirect:"↪",contract:"",document:"📄",skipback:"⏮",question:"❓",computer:"💻","sign out":"",subtract:"-",settings:"⚙",pictures:"🌄",database:"",location:"",signpost:"",navigate:"",calendar:"📅",piechart:"",barchart:"📊","add date":"",openbook:"📖",envelope:"✉",facetime:"","end call":"",halfstar:"",favorite:"⋆",thumbsup:"👍",bookmark:"🔖",keywords:"",trashcan:"",previous:"◅",insecure:"🔓","up right":"⬈",unlocked:"🔓",downleft:"⬋",directup:"▴","zoom out":"",dropdown:"▾",download:"",notebook:"📓",desktop:"💻",endcall:"",display:"💻",monitor:"💻",loading:"",syncing:"",visible:"👀",approve:"👍","zoom in":"",signout:"",refresh:"↻","private":"🔒","log out":"",caution:"⛔",warning:"⚠",battery:"🔋","package":"📦",dislike:"👎",dictate:"🎤",descend:"▾",forward:"➡",speaker:"🔈",windows:"",avatars:"👥",zoomout:"","up left":"⬉",printer:"⎙",compass:"",droplet:"💧",keyword:"",comment:"💬",shuffle:"🔀",airplay:"",retweet:"",picture:"🌄",upright:"⬈",compose:"📝",adddate:"",columns:"",checked:"✓",mobile:"📱",cursor:"",search:"🔎",zoomin:"",iphone:"📱",attach:"📎",pencil:"✎",ascend:"▴",upleft:"⬉",tablet:"",laptop:"",eraser:"✐",locked:"🔒",secure:"🔒",unlock:"🔓","public":"🔓",target:"◎",folder:"📁",tagged:"",sample:"",layers:"",avatar:"👤",locate:"",replay:"↺",upload:"",repeat:"🔁",volume:"🔈",camera:"📷",layout:"",action:"","delete":"␡",images:"🌄",photos:"🌄",remove:"-",expand:"⤢",hyphen:"-",videos:"📹",rewind:"⏪",logout:"",record:"●",alert:"⚠",clock:"⏲",pause:"",merge:"",write:"✎",erase:"✐",nodes:"",video:"📹",right:"➡",trash:"",quote:"“",minus:"-",eject:"⏏",visit:"",check:"✓",photo:"🌄",share:"",heart:"♥",close:"␡",image:"🌄",cloud:"☁",zelda:"",phone:"📞",sound:"🔈",reply:"↩",email:"✉",inbox:"📥",audio:"♫",music:"♫",users:"👥",price:"💲",globe:"🌎",print:"⎙",earth:"🌎",world:"🌎",timer:"⏱",skip:"⏭",font:"",time:"⏲",fork:"",home:"⌂",zoom:"",exit:"",cost:"💲",cart:"",view:"👀",text:"",user:"👤",talk:"💬",chat:"💬",look:"👀",bell:"🔔",stop:"■",send:"",redo:"↻",link:"🔗",call:"📞",list:"",undo:"↺",crop:"",book:"📕",star:"⋆",gear:"⚙",work:"💼",move:"",drop:"💧",love:"♥",edit:"✎",like:"👍",flag:"⚑",date:"📅",next:"▻",tags:"",info:"ℹ",page:"📄",cell:"📱",ipad:"",play:"▶",sync:"",grid:"",plus:"+",file:"📄",help:"❓",rows:"",down:"⬇",lock:"🔒",wifi:"",left:"⬅",back:"⬅",mail:"✉",key:"🔑",ban:"🚫",add:"+",tag:"",out:"",cog:"⚙",rss:"",map:"",mic:"🎤",eye:"👀",hdd:"",pin:"📍",box:"📦",fax:"📠",up:"⬆"};if("object"!=typeof r){var r=n,a=[];for(var o in n)a.push(o)}else for(var o in n)r[o]=n[o],a.push(o);if("function"!=typeof i){!function(e,t){"undefined"!=typeof module?module.exports=t():"function"==typeof define&&"object"==typeof define.amd?define(t):this[e]=t()}("ss_ready",function(e){function t(e){for(f=1;e=r.shift();)e()}var n,r=[],a=!1,o=document,i=o.documentElement,s=i.doScroll,u="DOMContentLoaded",l="addEventListener",c="onreadystatechange",d="readyState",f=/^loade|c/.test(o[d]);return o[l]&&o[l](u,n=function(){o.removeEventListener(u,n,a),t()},a),s&&o.attachEvent(c,n=function(){/^c/.test(o[d])&&(o.detachEvent(c,n),t())}),e=s?function(t){self!=top?f?t():r.push(t):function(){try{i.doScroll("left")}catch(n){return setTimeout(function(){e(t)},50)}t()}()}:function(e){f?e():r.push(e)}});var i=function(e){if(!e instanceof Object)return!1;if(e.length)for(var t=0;e.length>t;t++)i(e[t]);else e.value?e.value=u(e.value):e.nodeValue?e.nodeValue=u(e.nodeValue):e.innerHTML&&(e.innerHTML=u(e.innerHTML))},s=function(e,t){for(var n=[],r=RegExp("(^| )"+t+"( |$)"),a=e.getElementsByTagName("*"),o=0,i=a.length;i>o;o++)r.test(a[o].className)&&n.push(a[o]);return n},u=function(e){var t=RegExp(a.join("|").replace(/[-[\]{}()*+?.,\\^$#\s]/g,"\\$&"),"gi");return e.replace(t,function(e){return r[e.toLowerCase()]})};ss_ready(function(){document.getElementsByClassName?i(document.getElementsByClassName("ss-icon")):i(s(document.body,"ss-icon"))})}}}(),function(){"use strict";var e,t,n,r,a;ko.bindingHandlers.enterKey={init:function(e,t,n,r){var a,o;return o=function(e,n){13===n.keyCode&&t().call(this)},a=function(){return{keyup:o}},ko.bindingHandlers.event.init(e,a,n,r)}},ko.bindingHandlers.randomPlaceholder={init:function(e,t,n,r){var a,o;return o=t(),a=function(){var e;for(e=Math.floor(Math.random()*o.length);e===r.placeholderNumber();)e=Math.floor(Math.random()*o.length);return r.placeholderNumber(e),"ex. "+o[e]},e.setAttribute("placeholder",a())}},ko.bindingHandlers.title={init:function(e,t){var n,r,a;return n=function(){return moment(t()).fromNow()},a=function(){return e.setAttribute("title",n())},r=setInterval(a,6e4),a()}},e=function(e,t,n,r){this.title=ko.observable(e),this.completed=ko.observable(t),this.date=n,this.important=ko.computed(function(){return"!"===this.title()[this.title().length-1]},this),this.trimmedTitle=ko.computed(function(){return this.title().substr(0,[this.title().length-1])},this),this.important.subscribe(function(e){return e===!1&&r.importantTodos.indexOf(this)>-1&&(document.activeElement.blur(),r.regularTodos.push(this),r.importantTodos.remove(this)),e===!0&&r.regularTodos.indexOf(this)>-1?(document.activeElement.blur(),r.importantTodos.push(this),r.regularTodos.remove(this)):void 0},this),this.title.subscribe(function(e){return""===e?(document.activeElement.blur(),r.regularTodos.remove(this)):void 0},this),this.completed.subscribe(function(){return this.important()===!0?r.stats.completedImportant(r.stats.completedImportant()+1):r.stats.completedRegular(r.stats.completedRegular()+1)},this)},t=function(t){var n,a,o,i,s;this.parseTodos=function(t){var n,r,a,o,i;for(n=[],a=0,o=t.length;o>a;a++)r=t[a],n.push(new e(r.title,r.completed,null!=(i=r.date)?i:new Date,this));return n},this.regularTodos=ko.observableArray(this.parseTodos(null!=(n=t.regularTodos)?n:[])),this.importantTodos=ko.observableArray(this.parseTodos(null!=(a=t.importantTodos)?a:[])),this.completedRegularTodos=ko.observableArray(this.parseTodos(null!=(o=t.completedRegularTodos)?o:[])),this.completedImportantTodos=ko.observableArray(this.parseTodos(null!=(i=t.completedImportantTodos)?i:[])),t.stats||(t.stats={}),this.placeholderNumber=ko.observable(null!=(s=t.placeholderNumber)?s:0),this.stats={completedImportant:ko.observable(t.stats.completedImportant||0),completedRegular:ko.observable(t.stats.completedRegular||0)},this.stats.completed=ko.computed(function(){return this.stats.completedImportant()+this.stats.completedRegular()},this),this.inputValue=ko.observable(""),this.completedImportantVisible=ko.observable(!1),this.completedRegularVisible=ko.observable(!1),this.showing=ko.observable("active"),this.showCompleted=function(){return"active"===this.showing()?(this.showing("completed"),this.hideCompletedImportant(),this.hideCompletedRegular()):void 0},this.showActive=function(){return this.showing("active")},this.add=function(){var t,n,r;return n=this.inputValue().trim(),t=function(){return"!"===n[n.length-1]},r=new e(n,!1,new Date,this),n&&(t()===!1?this.regularTodos.push(r):this.importantTodos.push(r)),this.inputValue("")},this.remove=function(e){return e.important()===!0?r.completedImportantTodos.remove(e):r.completedRegularTodos.remove(e)},this.hideCompletedImportant=function(){return this.importantTodos.remove(function(e){return e.completed()===!0}),this.completedImportantVisible(!1)},this.hideCompletedRegular=function(){return this.regularTodos.remove(function(e){return e.completed()===!0}),this.completedRegularVisible(!1)},this.clearCompletedImportant=function(){return this.completedImportantTodos.removeAll()},this.clearCompletedRegular=function(){return this.completedRegularTodos.removeAll()},this.complete=function(e){e.completed(!0),e.important()===!0?(r.completedImportantVisible(!0),r.completedImportantTodos.push(e)):(r.completedRegularVisible(!0),r.completedRegularTodos.push(e))},this.placeholderTexts=["sov en tupplur","städa hela toan","åka till ikea","dricka kaffe!","skriv dagboksinlägg"],Modernizr.localstorage&&ko.computed(function(){var e,t,n;e=ko.utils.arrayFilter(this.importantTodos(),function(e){return e.completed()===!1?e:void 0}),t=ko.utils.arrayFilter(this.regularTodos(),function(e){return e.completed()===!1?e:void 0}),n={placeholderNumber:this.placeholderNumber(),importantTodos:e,regularTodos:t,completedImportantTodos:this.completedImportantTodos(),completedRegularTodos:this.completedRegularTodos(),stats:{completedImportant:this.stats.completedImportant(),completedRegular:this.stats.completedRegular()}},localStorage.setItem("todos",ko.toJSON(n))},this).extend({throttle:500})},Modernizr.localstorage&&(n=null!=(a=ko.utils.parseJson(localStorage.getItem("todos")))?a:{}),r=new t(n),ko.applyBindings(r),Modernizr.load({test:"placeholder"in document.createElement("input"),nope:"scripts/vendor/placeholders.min.js"})}.call(this);