export const baseStyle = 
`/*! normalize.css v1.1.3 | MIT License | git.io/normalize */

/* ==========================================================================
   HTML5 display definitions
   ========================================================================== */

/**
 * Correct block display not defined in IE 6/7/8/9 and Firefox 3.
 */

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
main,
nav,
section,
summary {
    display: block;
}

/**
 * Correct inline-block display not defined in IE 6/7/8/9 and Firefox 3.
 */

audio,
canvas,
video {
    display: inline-block;
    *display: inline;
    *zoom: 1;
}

/**
 * Prevent modern browsers from displaying audio without controls.
 * Remove excess height in iOS 5 devices.
 */

audio:not([controls]) {
    display: none;
    height: 0;
}

/**
 * Address styling not present in IE 7/8/9, Firefox 3, and Safari 4.
 * Known issue: no IE 6 support.
 */

[hidden] {
    display: none;
}

/* ==========================================================================
   Base
   ========================================================================== */

/**
 * 1. Correct text resizing oddly in IE 6/7 when body font-size is set using
 *    em units.
 * 2. Prevent iOS text size adjust after orientation change, without disabling
 *    user zoom.
 */

html {
    font-size: 100%; /* 1 */
    -ms-text-size-adjust: 100%; /* 2 */
    -webkit-text-size-adjust: 100%; /* 2 */
}

/**
 * Address font-family inconsistency between textarea and other form
 * elements.
 */

html,
button,
input,
select,
textarea {
    font-family: sans-serif;
}

/**
 * Address margins handled incorrectly in IE 6/7.
 */

body {
    margin: 0;
}

/* ==========================================================================
   Links
   ========================================================================== */

/**
 * Address outline inconsistency between Chrome and other browsers.
 */

a:focus {
    outline: thin dotted;
}

/**
 * Improve readability when focused and also mouse hovered in all browsers.
 */

a:active,
a:hover {
    outline: 0;
}

/* ==========================================================================
   Typography
   ========================================================================== */

/**
 * Address font sizes and margins set differently in IE 6/7.
 * Address font sizes within section and article in Firefox 4+, Safari 5,
 * and Chrome.
 */

h1 {
    font-size: 2em;
    margin: 0.67em 0;
}

h2 {
    font-size: 1.5em;
    margin: 0.83em 0;
}

h3 {
    font-size: 1.17em;
    margin: 1em 0;
}

h4 {
    font-size: 1em;
    margin: 1.33em 0;
}

h5 {
    font-size: 0.83em;
    margin: 1.67em 0;
}

h6 {
    font-size: 0.67em;
    margin: 2.33em 0;
}

/**
 * Address styling not present in IE 7/8/9, Safari 5, and Chrome.
 */

abbr[title] {
    border-bottom: 1px dotted;
}

/**
 * Address style set to bolder in Firefox 3+, Safari 4/5, and Chrome.
 */

b,
strong {
    font-weight: bold;
}

blockquote {
    margin: 1em 40px;
}

/**
 * Address styling not present in Safari 5 and Chrome.
 */

dfn {
    font-style: italic;
}

/**
 * Address differences between Firefox and other browsers.
 * Known issue: no IE 6/7 normalization.
 */

hr {
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    height: 0;
}

/**
 * Address styling not present in IE 6/7/8/9.
 */

mark {
    background: #ff0;
    color: #000;
}

/**
 * Address margins set differently in IE 6/7.
 */

p,
pre {
    margin: 1em 0;
}

/**
 * Correct font family set oddly in IE 6, Safari 4/5, and Chrome.
 */

code,
kbd,
pre,
samp {
    font-family: monospace, serif;
    _font-family: 'courier new', monospace;
    font-size: 1em;
}

/**
 * Improve readability of pre-formatted text in all browsers.
 */

pre {
    white-space: pre;
    white-space: pre-wrap;
    word-wrap: break-word;
}

/**
 * Address CSS quotes not supported in IE 6/7.
 */

q {
    quotes: none;
}

/**
 * Address quotes property not supported in Safari 4.
 */

q:before,
q:after {
    content: '';
    content: none;
}

/**
 * Address inconsistent and variable font size in all browsers.
 */

small {
    font-size: 80%;
}

/**
 * Prevent sub and sup affecting line-height in all browsers.
 */

sub,
sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
}

sup {
    top: -0.5em;
}

sub {
    bottom: -0.25em;
}

/* ==========================================================================
   Lists
   ========================================================================== */

/**
 * Address margins set differently in IE 6/7.
 */

dl,
menu,
ol,
ul {
    margin: 1em 0;
}

dd {
    margin: 0 0 0 40px;
}

/**
 * Address paddings set differently in IE 6/7.
 */

menu,
ol,
ul {
    padding: 0 0 0 40px;
}

/**
 * Correct list images handled incorrectly in IE 7.
 */

nav ul,
nav ol {
    list-style: none;
    list-style-image: none;
}

/* ==========================================================================
   Embedded content
   ========================================================================== */

/**
 * 1. Remove border when inside a element in IE 6/7/8/9 and Firefox 3.
 * 2. Improve image quality when scaled in IE 7.
 */

img {
    border: 0; /* 1 */
    -ms-interpolation-mode: bicubic; /* 2 */
}

/**
 * Correct overflow displayed oddly in IE 9.
 */

svg:not(:root) {
    overflow: hidden;
}

/* ==========================================================================
   Figures
   ========================================================================== */

/**
 * Address margin not present in IE 6/7/8/9, Safari 5, and Opera 11.
 */

figure {
    margin: 0;
}

/* ==========================================================================
   Forms
   ========================================================================== */

/**
 * Correct margin displayed oddly in IE 6/7.
 */

form {
    margin: 0;
}

/**
 * Define consistent border, margin, and padding.
 */

fieldset {
    border: 1px solid #c0c0c0;
    margin: 0 2px;
    padding: 0.35em 0.625em 0.75em;
}

/**
 * 1. Correct color not being inherited in IE 6/7/8/9.
 * 2. Correct text not wrapping in Firefox 3.
 * 3. Correct alignment displayed oddly in IE 6/7.
 */

legend {
    border: 0; /* 1 */
    padding: 0;
    white-space: normal; /* 2 */
    *margin-left: -7px; /* 3 */
}

/**
 * 1. Correct font size not being inherited in all browsers.
 * 2. Address margins set differently in IE 6/7, Firefox 3+, Safari 5,
 *    and Chrome.
 * 3. Improve appearance and consistency in all browsers.
 */

button,
input,
select,
textarea {
    font-size: 100%; /* 1 */
    margin: 0; /* 2 */
    vertical-align: baseline; /* 3 */
    *vertical-align: middle; /* 3 */
}

/**
 * Address Firefox 3+ setting line-height on input using !important in
 * the UA stylesheet.
 */

button,
input {
    line-height: normal;
}

/**
 * Address inconsistent text-transform inheritance for button and select.
 * All other form control elements do not inherit text-transform values.
 * Correct button style inheritance in Chrome, Safari 5+, and IE 6+.
 * Correct select style inheritance in Firefox 4+ and Opera.
 */

button,
select {
    text-transform: none;
}

/**
 * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native audio
 *    and video controls.
 * 2. Correct inability to style clickable input types in iOS.
 * 3. Improve usability and consistency of cursor style between image-type
 *    input and others.
 * 4. Remove inner spacing in IE 7 without affecting normal text inputs.
 *    Known issue: inner spacing remains in IE 6.
 */

button,
html input[type="button"], /* 1 */
input[type="reset"],
input[type="submit"] {
    -webkit-appearance: button; /* 2 */
    cursor: pointer; /* 3 */
    *overflow: visible;  /* 4 */
}

/**
 * Re-set default cursor for disabled elements.
 */

button[disabled],
html input[disabled] {
    cursor: default;
}

/**
 * 1. Address box sizing set to content-box in IE 8/9.
 * 2. Remove excess padding in IE 8/9.
 * 3. Remove excess padding in IE 7.
 *    Known issue: excess padding remains in IE 6.
 */

input[type="checkbox"],
input[type="radio"] {
    box-sizing: border-box; /* 1 */
    padding: 0; /* 2 */
    *height: 13px; /* 3 */
    *width: 13px; /* 3 */
}

/**
 * 1. Address appearance set to searchfield in Safari 5 and Chrome.
 * 2. Address box-sizing set to border-box in Safari 5 and Chrome
 *    (include -moz to future-proof).
 */

input[type="search"] {
    -webkit-appearance: textfield; /* 1 */
    -moz-box-sizing: content-box;
    -webkit-box-sizing: content-box; /* 2 */
    box-sizing: content-box;
}

/**
 * Remove inner padding and search cancel button in Safari 5 and Chrome
 * on OS X.
 */

input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
}

/**
 * Remove inner padding and border in Firefox 3+.
 */

button::-moz-focus-inner,
input::-moz-focus-inner {
    border: 0;
    padding: 0;
}

/**
 * 1. Remove default vertical scrollbar in IE 6/7/8/9.
 * 2. Improve readability and alignment in all browsers.
 */

textarea {
    overflow: auto; /* 1 */
    vertical-align: top; /* 2 */
}

/* ==========================================================================
   Tables
   ========================================================================== */

/**
 * Remove most spacing between table cells.
 */

table {
    border-collapse: collapse;
    border-spacing: 0;
}


/*! HTML5 Boilerplate v4.3.0 | MIT License | http://h5bp.com/ */

/*
 * What follows is the result of much research on cross-browser styling.
 * Credit left inline and big thanks to Nicolas Gallagher, Jonathan Neal,
 * Kroc Camen, and the H5BP dev community and team.
 */

/* ==========================================================================
   Base styles: opinionated defaults
   ========================================================================== */

html,
button,
input,
select,
textarea {
    color: #222;
}

html {
    font-size: 1em;
    line-height: 1.4;
}

/*
 * Remove text-shadow in selection highlight: h5bp.com/i
 * These selection rule sets have to be separate.
 * Customize the background color to match your design.
 */

::-moz-selection {
    background: #b3d4fc;
    text-shadow: none;
}

::selection {
    background: #b3d4fc;
    text-shadow: none;
}

/*
 * A better looking default horizontal rule
 */

hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #ccc;
    margin: 1em 0;
    padding: 0;
}

/*
 * Remove the gap between images, videos, audio and canvas and the bottom of
 * their containers: h5bp.com/i/440
 */

audio,
canvas,
img,
video {
    vertical-align: middle;
}

/*
 * Remove default fieldset styles.
 */

fieldset {
    border: 0;
    margin: 0;
    padding: 0;
}

/*
 * Allow only vertical resizing of textareas.
 */

textarea {
    resize: vertical;
}

/* Helpers */

.clear {
	clear:both;
	height:1px;
	margin:0;
	padding:0;
	font-size: 1px;
	line-height: 0;
}
.clearfix:after {
	content: ".";
	display: block;
	height: 0;
	clear: both;
	visibility: hidden;
}
#accessibility, .invisible {
	position: absolute;
	top: -999em;
	left: -999em;
}
a {
	outline: 0 !important;
}

.block {
	display:block !important;
}
.inline {
	display: inline !important;
}
.pointer {
	cursor:pointer !important;
}
.indent {
	text-indent: -9000px !important;
}
.noborder_t {
	border-top:0 !important;
}
.noborder_r {
	border-right:0 !important;
}
.noborder_b {
	border-bottom:0 !important;
}
.noborder_l {
	border-left:0 !important;
}
.left {
	text-align:left;
}
.right {
	text-align:right;
}
.center {
	text-align:center;
}
.justify {
	text-align:justify;
}
.imgLeft {
	float:left;
	margin:5px 9px 10px 0;
}
.imgRight {
	float:right;
	margin:5px 0 10px 9px;
}
.imgCenter {
	text-align:center;
	padding:15px 0;
}
img, a img {
	border:0;
}
.no-border {
	border: 0 none !important;
}
.no-bg {
	background: none !important;
}
.no-margin {
	margin: 0 !important;
}
.float-left,
.fleft {
	float: left;
}
.float-right,
.fright {
	float: right;
}
.list-reset, .list-reset li {
	margin: 0;
	padding: 0;
	list-style: none;
}
.list-reset {
	margin: 0 0 1em;
}
.no-padding {
	padding: 0 !important;
}
.no-bold {
	font-weight: 300 !important;
}
.no-underline {
	text-decoration: none !important;
}
.no-underline:hover {
	text-decoration: none !important;
}

/* Typography*/

body {
	text-align:left;
	font-size: 13px;
	color: #262626;
	font-family: Arial, Verdana, Helvetica, sans-serif;
}
img {
	border: 0;
}
a, a:link a:active {
	text-decoration: none;
	color: #000;
}
a:visited {
}
a:hover {
	text-decoration: none;
}
h1 {
	font-size: 48px;
	margin: 0 0 1em;
	font-weight: normal;
	padding: 0;
	line-height: 1.2em;
	font-family: 'GothamRounded-Bold', Verdana, Arial, Helvetica;
}
h2 {
	font-size: 30px;
	font-weight: normal;
	margin: 0 0 1em;
	line-height: 1.2em;
	font-family: 'GothamRounded-Bold', Verdana, Arial, Helvetica;
}
h3 {
	font-size: 24px;
	font-weight: normal;
	margin: 0 0 1em 0;
	line-height: 1.2em;
	font-family: 'GothamRounded-Bold', Verdana, Arial, Helvetica;
}
h4 {
	font-size: 24px;
	font-weight: normal;
	margin: 0 0 1em;
	padding: 0;
	line-height: 1.1em;
	font-family: 'GothamRounded-Medium', Verdana, Arial, Helvetica;

}
h5 {
	font-size: 1em;
	margin: 0;
	padding:0;
	font-family: 'GothamRounded-Bold', Verdana, Arial, Helvetica;
}
h6 {
	font-size: 1em;
	margin: 0 0 0 0;
	padding:0;
}
p {
	font-size: 1em;
	margin:0 0 1em;
	padding:0;
	line-height:1.5em;
}
blockquote {
	border-left:10px solid #ddd;
	margin-left:10px;
}
pre {
	display: block;
	font-family: "Courier New", Courier, monospace;
	font-size: 1em;
	background-color: #eee;
	margin: 0 16px 10px 16px;
	padding: 2px;
}
code {
	display: block;
	font-family: "Courier New", Courier, monospace;
	font-size: 1em;
	background-color: #eee;
}
strong, b {
	font-weight: bold;
}
em, i {
	font-style:italic;
}
ul {
	margin: 0 0 1.5em 0;
	padding: 0;
	font-size:1em;
}
ul li {
	margin: 0 0 0.25em 10px;
	padding: 0;
	line-height:1.4em;
}
ol {
	margin: 0 0 1.5em 20px;
	padding:0;
	line-height: 1.4em;
	font-size:1em;
}
ol li {
	margin: 0 0 0.25em 10px;
	padding: 0;
}
dl {
	margin: 0 0 1.5em 0;
	padding: 0;
	line-height:130%;
	font-size:1em;
}
dl dt {
	margin: 0.25em 0 0 0;
	padding: 0;
}
dl dd {
	margin: 0 0 0 20px;
	padding: 0;
}
table {
	margin: 0 0 1.5em 0;
	font-size: 1em;
}
table caption {
	font-weight: bold;
	margin: 0 0 0 0;
	padding: 0 0 0.5em 0;
	text-align: left;
}
th {
	font-weight: bold;
	text-align: left;
}
form {
	margin: 0;
	padding: 0;
	color:  #000;
}
fieldset {
	border: 0;
	margin: 0 0;
	padding: 0;
}
label, .label {
	cursor: pointer;
	font-size: 1em;
	margin-right:4px;
}
input, input.text, input.password, input.btn, #searchsubmit {
	font: 1em Arial, Verdana, Helvetica, sans-serif;
	padding: 2px 4px;
	color:  #262626;
	font-family: 'GothamRounded-Book', Verdana, Arial, Helvetica;
}
textarea {
	font: 1em/1.2em Arial, Verdana, Helvetica, sans-serif;
	height: 108px;
	margin-top: 0;
	padding: 2px 4px;
	overflow: auto;
	color:  #262626;
	font-family: 'GothamRounded-Book', Verdana, Arial, Helvetica;
}
input.text, textarea {
	background: #FFF;
	border: #7E9DB9 solid 1px;
	font-family: 'GothamRounded-Book', Verdana, Arial, Helvetica;
}
select {
	font: 1em Arial, Verdana, Helvetica, sans-serif;
	overflow:hidden;
	vertical-align:middle;
	margin-right:4px;
	color:  #262626;
	font-family: 'GothamRounded-Book', Verdana, Arial, Helvetica;
}
optgroup {
	font-weight:bold;
	font-style:normal;
	vertical-align:middle;
	border-top:1px solid #DDD;
}
option {
	border-top:1px solid #DDD;
	padding:2px 5px;
	vertical-align:middle;
	font-family: 'GothamRounded-Book', Verdana, Arial, Helvetica;
}
form dl, form dt, form dd {
	margin: 0;
	padding: 0;
}
form dl {
	padding: 0;
}
form dt {
	width:100%;
}
form dd {
	width:100%;
	margin-bottom: 5px;
}
button {
	cursor: pointer;
	font: 1em Arial, Verdana, Helvetica, sans-serif;
	font-family: 'GothamRounded-Book', Verdana, Arial, Helvetica;
	vertical-align:bottom;
	padding: 0 5px;
}
.entry-meta {
	margin-bottom: 10px;
}
.hentry, .widget, .comment, .navigation-links {
	margin-bottom: 20px;
}
.page-title {
	font-size: 14px;
	font-weight: bold;
}
.page-title span {
	font-style: italic;
	font-weight: normal;
}
.entry-title, .entry-title a {
	color: #000;
	font-size: 24px;
	line-height: 28px;
}
.entry-title a:hover {
	color: #2361a1;
	text-decoration: none;
}
address {
	font-style: italic;
}
abbr[title], acronym[title], dfn[title] {
	cursor: help;
	border-bottom: 1px dotted #666;
}
blockquote {
	color: #666;
	font-style: italic;
	border-left: 1px solid #ddd;
	margin-left: 15px;
	padding-left: 10px;
}
code, pre {
	line-height: 15px;
}
var, kbd, samp, code, pre {
	font: 12px/1.4 Consolas, "Andale Mono", Courier, "Courier New", monospace;
	background: #fafafa;
}
kbd {
	font-weight: bold;
}
samp, var {
	font-style: italic;
}
pre {
	white-space: pre;
	overflow: auto;
	padding: 10px;
	border: 1px solid #ddd;
	clear: both;
}
code {
	padding: 0px 3px;
}

a:focus {
outline: none;
}

/* important wordpress classes don't delete */

.comment-list, .comment-list .children {
	list-style: none;
}
.comment-list {
	margin-left: 10px;
}
.comment {
	margin-bottom: 40px;
}
.comment-list .children {
	margin-top: 40px;
}
.comment-meta {
	margin-bottom: 10px;
}
.commenter {
	font-size: 16px;
}
.avatar {
	/**/
}
#comment-form .form-section input {
	margin-right: 10px;
}
.form-section {
	margin-bottom: 10px;
}
.form-section label {
	cursor: pointer;
}
#commenter-details input {
	margin-right: 10px;
}
#allowed-tags {
	font: 11px Verdana, Arial, Helvetica, sans-serif;
	padding: 5px 10px;
	background: #fff;
	border: 1px #ddd dotted;
	border-top: none;
	width: 573px;
}
img.alignleft {
	float: left;
	margin: 0 1em 1em 0;
}
img.alignright {
	display: block;
	float: right;
	margin: 0 0 1em 1em;
}
img.aligncenter {
	margin-left: auto;
	margin-right: auto;
	display: block;
	clear: both;
	margin-bottom: 1em;
}
.wp-caption {
	text-align: center;
}
.wp-caption img {
	margin: 0;
	padding: 0;
	border: 0 none;
}
.wp-caption .wp-caption-text {
	margin: 0;
	padding: 5px;
}
.wp-caption {
	margin-top: 0.4em;
}
.wp-caption {
	background: #eee;
	margin-bottom: 1.625em;
	max-width: 96%;
	padding: 9px;
}
.wp-caption img {
	display: block;
	margin: 0 auto;
	max-width: 98%;
}
.wp-caption .wp-caption-text, .gallery-caption {
	color: #666;
	font-family: Georgia, serif;
	font-size: 12px;
}
.wp-caption .wp-caption-text {
	margin-bottom: 0;
	padding: 10px 20px;
	position: relative;
}
#content .gallery {
	margin: 0 auto 1.625em;
}
#content .gallery a img {
	border: none;
}

.alignleft {
	float: left;
	margin: 0 1em 1em 0;
}
.alignright {
	float: right;
	margin: 0 0 1em 1em;
}
.aligncenter {
	margin-left: auto;
	margin-right: auto;
	display: block;
	clear: both;
}

/* Navigation */

.navigation {
	padding: 1em 0;
}
#wp-calendar {
	width:100%;
}
#wp-calendar caption {
	font-weight: bold;
	color: #222;
	text-align: left;
	font-size:14px;
	padding-bottom: 4px;
}
#wp-calendar thead {
	font-size:11px;
}
#wp-calendar thead th {
	text-align: center;
}
#wp-calendar tbody {
	color: #aaa;
}
#wp-calendar tbody td {
	padding: 3px 0 2px;
	background: #f5f5f5;
	border:1px solid #fff;
	text-align: center;
}
#wp-calendar tbody .pad {
	background: none;
}
#wp-calendar tfoot #next {
	text-align: right;
}
.entry ul {
	list-style: disc;
}
.entry ol {
	list-style: decimal;
}

.ui-tabs-hide {
	display: none;
}

.image_no_margin {
	display:block;
	border:none;
	font-size:0;
	letter-spacing:-1px;
}
.min_height {
	height:auto !important;
	min-height:100px;
	height:100px;
}

.header input[type="search"] {
-webkit-appearance: none;
-webkit-appearance: caret;
   -moz-appearance: caret;
     -o-appearance: caret;
        appearance: caret;
}

@media print,
       (-o-min-device-pixel-ratio: 5/4),
       (-webkit-min-device-pixel-ratio: 1.25),
       (min-resolution: 120dpi) {
    /* Style adjustments for high resolution devices */
}

/* ==========================================================================
   Print styles.
   Inlined to avoid required HTTP connection: h5bp.com/r
   ========================================================================== */

@media print {
    * {
        background: transparent !important;
        color: #000 !important; /* Black prints faster: h5bp.com/s */
        box-shadow: none !important;
        text-shadow: none !important;
    }

    a,
    a:visited {
        text-decoration: underline;
    }

    a[href]:after {
        content: " (" attr(href) ")";
    }

    abbr[title]:after {
        content: " (" attr(title) ")";
    }

    /*
     * Don't show links for images, or javascript/internal links
     */

    .ir a:after,
    a[href^="javascript:"]:after,
    a[href^="#"]:after {
        content: "";
    }

    pre,
    blockquote {
        border: 1px solid #999;
        page-break-inside: avoid;
    }

    thead {
        display: table-header-group; /* h5bp.com/t */
    }

    tr,
    img {
        page-break-inside: avoid;
    }

    img {
        max-width: 100% !important;
    }

    @page {
        margin: 0.5cm;
    }

    p,
    h2,
    h3 {
        orphans: 3;
        widows: 3;
    }

    h2,
    h3 {
        page-break-after: avoid;
    }
}
.back-btn {
    display: none;
}
`


export const layout = 
`
*, *:before, *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.color {
  color: #7D064A;
}

.bg-color {
  background-color: #7D064A;
}

button:focus,
a:focus,
a.active { 
  outline: none; 
}

.transition {
	-o-transition: all 0.5s ease;
	-ms-transition: all 0.5s ease;
	-moz-transition: all 0.5s ease;
	-webkit-transition: all 0.5s ease;
	transition: all 0.5s ease;
}

/*@font-face {
  font-family: 'GothamRounded-Book';
  src:  url('../fonts/GothamRounded-Book.eot?#iefix') format('embedded-opentype'),  
        url('../fonts/GothamRounded-Book.otf')  format('opentype'),
        url('../fonts/GothamRounded-Book.woff') format('woff'), 
        url('../fonts/GothamRounded-Book.ttf')  format('truetype'), 
        url('../fonts/GothamRounded-Book.svg#GothamRounded-Book') format('svg');
  font-weight: normal;
  font-style: normal;
}


@font-face {
  font-family: 'GothamRounded-Medium';
  src:  url('../fonts/GothamRounded-Medium.eot?#iefix') format('embedded-opentype'),  
        url('../fonts/GothamRounded-Medium.otf')  format('opentype'),
        url('../fonts/GothamRounded-Medium.woff') format('woff'), 
        url('../fonts/GothamRounded-Medium.ttf')  format('truetype'), 
        url('../fonts/GothamRounded-Medium.svg#GothamRounded-Medium') format('svg');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'GothamRounded-Bold';
  src:  url('../fonts/GothamRounded-Bold.eot?#iefix') format('embedded-opentype'),  
        url('../fonts/GothamRounded-Bold.otf')  format('opentype'),
        url('../fonts/GothamRounded-Bold.woff') format('woff'), 
        url('../fonts/GothamRounded-Bold.ttf')  format('truetype'), 
        url('../fonts/GothamRounded-Bold.svg#GothamRounded-Bold') format('svg');
  font-weight: normal;
  font-style: normal;
}*/



body {
  font-family: 'GothamRounded-Book', Verdana, Arial, Helvetica;
}

a[href^=tel]{
    color:inherit;
    text-decoration:none;
}


/* Place Holder CSS */
::-webkit-input-placeholder {
  color: #D7D7D7;
  opacity: 1;
  -webkit-transition: opacity 0.35s ease-in-out;
  transition: opacity 0.35s ease-in-out;
}
:-moz-placeholder {
  color: #D7D7D7;
  opacity: 1;
  -moz-transition: opacity 0.35s ease-in-out;
  transition: opacity 0.35s ease-in-out;
}
::-moz-placeholder {
  color: #D7D7D7;
  opacity: 1;
  -moz-transition: opacity 0.35s ease-in-out;
  transition: opacity 0.35s ease-in-out;
}
:-ms-input-placeholder {  
  color: #D7D7D7;
  opacity: 1;
  -ms-transition: opacity 0.35s ease-in-out;
  transition: opacity 0.35s ease-in-out;
}

/* Place Holder CSS for Focus */
:hover::-webkit-input-placeholder {
  opacity: 1;
  -webkit-transition: opacity 0.35s ease-in-out;
  transition: opacity 0.35s ease-in-out;
}
:hover:-moz-placeholder {
  opacity: 1;
  -moz-transition: opacity 0.35s ease-in-out;
  transition: opacity 0.35s ease-in-out;
}
:hover::-moz-placeholder {
  opacity: 1;
  -moz-transition: opacity 0.35s ease-in-out;
  transition: opacity 0.35s ease-in-out;
}
:hover:-ms-input-placeholder {  
  opacity: 1;
  -ms-transition: opacity 0.35s ease-in-out;
  transition: opacity 0.35s ease-in-out;
}

/* Place Holder CSS for Focus */
:focus::-webkit-input-placeholder {
  opacity: 0;
  -webkit-transition: opacity 0.35s ease-in-out;
  transition: opacity 0.35s ease-in-out;
}
:focus:-moz-placeholder {
  opacity: 0;
  -moz-transition: opacity 0.35s ease-in-out;
  transition: opacity 0.35s ease-in-out;
}
:focus::-moz-placeholder {
  opacity: 0;
  -moz-transition: opacity 0.35s ease-in-out;
  transition: opacity 0.35s ease-in-out;
}
:focus:-ms-input-placeholder {  
  opacity: 0;
  -ms-transition: opacity 0.35s ease-in-out;
  transition: opacity 0.35s ease-in-out;
}

.nav, 
.nav li {
	margin: 0;
	padding: 0;
	list-style: none;
}

.nav {
	margin: 0;
	z-index: 2;
	padding: 1em 0;
}

.nav ul {
	margin: 0 -15px;
	padding: 0;
}

.nav li {
	position: relative;
  margin: 0 15px;
  display: inline-block;
}

.nav .menu > li > a {
	display: block;
	height: 1em;
	line-height: 1em;
	text-align: center;
	color: #f2eed8;
	font-weight: normal;
	font-size: 16px;
  text-transform: uppercase;
  font-family: 'GothamRounded-Medium', Verdana, Arial, Helvetica;
  -o-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.nav .menu > li > .active,
.nav .menu > li > .over,
.nav .menu > li > a:hover,
.nav .menu > li.current_page_item > a,
.nav .menu > li.current-post-ancestor > a,
.nav .menu > li.current-post-parent > a,
.nav .menu > li.current-menu-item > a,
.nav .menu > li.current-category-ancestor > a,
.nav .menu > li.current-page-ancestor > a {
  color: #FFF;
  text-decoration: none;
  o-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.nav .children,
.nav .sub-menu {
	margin: 0;
	padding: 0;
	position: absolute;
	left: 0;
	top: 44px;
	width: 130px;
	z-index: 2;
	border-bottom: 1px solid #2C2F52;
	border-top: 0;
	/*display: none;*/
  visibility: hidden; /* hides sub-menu */
  opacity: 0;
  position: absolute;
  top: 100%;
  left: 0;
  transform: translateY(-2em);
  z-index: -1;
  transition: all 0.3s ease-in-out 0s, visibility 0s linear 0.3s, z-index 0s linear 0.01s;
}

.menu-item-has-children:hover .sub-menu {
  visibility: visible; /* shows sub-menu */
  opacity: 1;
  z-index: 1;
  transform: translateY(0%);
  transition-delay: 0s, 0s, 0.3s; /* this removes the transition delay so the menu will be visible while the other styles transition */
}

.nav .children li,
.nav .sub-menu li {
	float: none;
	margin:0;
}


.nav .children a,
.nav .sub-menu a {
	display: block;
	background: #000024;
	border-top: 1px solid #2C2F52;
	padding: 5px 10px;
	color: #FFF;
	text-decoration: none;
}

.nav .children a:hover,
.nav .sub-menu a:hover {
	background: #49494B;
}

/* new nav */

.mh-main-nav {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    position: relative;
    background-color: blue;
    z-index: 5;
}

.mh-main-nav ul {
  margin: 0;
}

.mh-main-nav-wrap { background: #2a2a2a; }
.mh-main-nav { text-transform: uppercase; border-bottom: 5px solid #e64946; }
.mh-main-nav li { float: left; position: relative; font-weight: 700; transition: 0.25s ease-out; }
.mh-main-nav li:hover { background: #e64946; }
.mh-main-nav li:hover a { color: #fff; }
.mh-main-nav li a { display: block; color: #fff; padding: 10px 20px; border-left: 1px solid rgba(255, 255, 255, 0.1); }
.mh-main-nav li:first-child a, .mh-main-nav .sub-menu li a { border: none; }
.mh-main-nav ul li:hover > ul { display: block; background: #2a2a2a; z-index: 9999; }
.mh-main-nav ul ul { display: none; position: absolute; }
.mh-main-nav ul ul li { width: 100%; min-width: 16em; }
.mh-main-nav ul ul ul { left: 100%; top: 0; }
.mh-main-nav .menu > .current-menu-item { background: #e64946; }
.mh-navigation .menu-item-has-children > a:after { font-family: 'FontAwesome'; font-weight: 400; line-height: 1; content: '\f107'; margin-left: 5px; }
.mh-navigation .sub-menu .menu-item-has-children > a:after { content: '\f105'; margin-left: 10px; }
.mh-navigation img { vertical-align: inherit; }


/**/

/* menu mobile */

.nav .menu > .menu-item > a:after,
.icon-nav-arrow-down {
  color: #FFF;
  font-family: FontAwesome;
  content: "\f107";
  margin: 0 0 0 1em;
  display: none;
  position: absolute;
  right: 0;
  top: 0;
}

.icon-nav-arrow-down {
  display: none;
}

.menu-item-has-children .icon-nav-arrow-down {
    color: #000;
    font-size: 2em;
    background-color: #FFF;
    height: 26px;
    width: 26px;
    text-align: center;
    line-height: 26px;
    z-index: 10;
    display: none;
  }

.nav .menu > .menu-item-has-children > .icon-nav-arrow-down {
  display: block;
  display: none;
}

.nav-toggle {
     width: 35px;
     height: 35px;
     display: block;
     float: right;
     cursor: pointer;
     position: relative;
     top: 0;
     display: none;
}

.nav-toggle span,
.nav-toggle span:before,
.nav-toggle span:after {
    cursor: pointer;
    border-radius: 1px;
    height: 5px;
    width: 35px;
    background: white;
    position: absolute;
    display: block;
    content: '';
}
.nav-toggle span:before {
    top: -10px;
}
.nav-toggle span:after {
    bottom: -10px;
}
.nav-toggle span,
.nav-toggle span:before,
.nav-toggle span:after {
    -webkit-transition: all 300ms ease-in-out;
    -moz-transition: all 300ms ease-in-out;
    -o-transition: all 300ms ease-in-out;
    transition: all 300ms ease-in-out;
}
.nav-toggle.active span {
    background-color: transparent;
}

.nav-toggle.active span:before,
.nav-toggle.active span:after {
    top: 0;
}
.nav-toggle.active span:before {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
}
.nav-toggle.active span:after {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
}

/* menu mobile */

html, body {
	margin: 0;
	padding: 0;
}

body {
	/*background: url(../images/body.jpg) repeat-x left top;*/
}

.wrapper {
	width: 100%;
	margin: 0 auto;
}

.header {
	position: relative;
  background-color: rgba(0, 0, 0, 0.8);
  background-color: #7D064A;
  /*height: 70px;*/
  /*width: 100%;*/
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.header.fixed {
  position: fixed;
}

.inner {
  width: 1173px;
  margin: 0 auto;
}

.header-flex {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.logo-image {
  margin: 0;
  float: left;
  line-height: 1em;
  font-size: 0;
}

.logo-image img {
  max-width: 264px;
  height: auto;
}

.image-svg {
	width: 10%;
	float: left;
}

.header-inner {
	padding: 0
}

.content {
	background: #FFFCF5;
	zoom: 1;
	position:relative;
	z-index: 1;
}
.content-inner {
	padding: 70px 0;
	zoom: 1;
}
.main-content {
	width: 100%;
}

.main-content-full {
  width: 100%;
  float: none;
}

.main-content-inner {
	padding: 0;
}
.sidebar {
	width: 40%;
	float: right;
	background: none;
	background: #DFDFDF none;
}
.sidebar-inner {
	padding: 20px;
	zoom: 1;
}

.footer {
	margin:0 auto;
	clear: both;
	float: none;
  color: #FFF;
}

.footer-inner {
	padding: 0;
}

.footer-top {
  padding: 54px 0;
  background-color: #7D064A;
  color: #F3EED8;
}

.footer-middle {
  padding: 54px 0 43px;
    background-color: #292929;
}

.footer-top .social-footer {
  text-align: right;
}

.footer-top h4 {
  margin: 0 0 2em;
  text-transform: uppercase;
}

.footer-top .social-footer a {
  color: #F3EED8;
  text-decoration: none;
  font-size: 2em;
  display: inline-block;
  margin: 0 0 0 26px;
  -o-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.footer-top .social-footer a:hover {
  color: #FFF;
}

.footer-bottom {
  padding: 18px 0;
  background-color: #131313;
  font-size: 12px;
}

.footer-bottom p {
  font-size: 11px;
  color: #f0ecd7;
}

.footer-top .inner,
.footer-middle .inner {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.newsletter-content {
  max-width: 392px;
  width: 100%;
  position: relative;
}

#mc_signup_form {
  position: relative;
}

.newsletter-content .mc_input {
  width: 100%;
  padding: 10px 0;
  border: 0;
  height: 40px;
  border-bottom: 1px solid #F3EED8;
  background-color: transparent;
}

.newsletter-content .mc_signup_submit {
  position: absolute;
  right: 0;
  top: 0;
  height: 40px;
  width: 22px;
}

.newsletter-content .button {
  height: 40px;
  line-height: 40px;
  background-color: transparent;
  border: 0;
  padding: 0;
  text-align: center;
  color: #F1EFD8;
  display: inline-block;
  width: 100%;
  font-size: 15px;
}


.newsletter-content label {
  display: none;
}

.footer .menu-icon {
  display: none;
}

.footer .nav li {
    margin: 0 0 0 35px;
}


/** FIX for Bootstrap and Google Maps Info window styes problem **/
img[src*="gstatic.com/"], 
img[src*="googleapis.com/"] {
	max-width: none;
}

/* menu mobile */

.open-menu-mobile {
  display: none;
}

.open-menu-mobile a {
  display: block;
  padding: 0.5em 1em;
  text-align: center;
  border-top: 1px solid red;
  font-size: 1.2em;
}

.open-menu-mobile li:nth-child(1) a {
  border-top: 0;
}

/* menu mobile */

.fancybox-lock {
    overflow: hidden;
    margin-right:0 !important;
}

.fancybox-lock .fancybox-overlay {
    overflow: hidden;
    overflow-y: hidden;
}

/**/

.flexslider .flex-direction-nav .flex-next {
    right: 5px; 
    opacity: .8; 
}

.flexslider .flex-direction-nav .flex-prev {
    left: 5px; 
    opacity: .8; 
}


.flexslider .flex-direction-nav a {
    font-family: FontAwesome;
    color: #FFF;
    font-size: 1.5em;
    font-weight: 300;
    background-color: red;
    text-indent: 0;
    width: 36px;
    height: 36px;
    line-height: 36px;
    background: rgba(0,0,0,0.9) none;
    display: inline-block;
    text-align: center;
    border-radius: 50%;
}

/*
.slider .flex-direction-nav .flex-next {
    right: 0;
    opacity: 1;
}

.slider .flex-direction-nav .flex-right {
    left: 0;
    opacity: 1;
}
*/

.flexslider .flex-direction-nav .flex-prev:before {
    content: "\f053";
}

.flexslider .flex-direction-nav .flex-next:before {
    content: "\f054";
}

.search-field {
	outline:none;
    -webkit-appearance: none;
}

.arrow-down {
  position: absolute;
  left: 50%;
  bottom: 2em;
  margin: 0 0 0 -30px;
  z-index: 10;
  text-indent: 0;
  font-size: 2.2em;
  cursor: pointer;
}

@-moz-keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    -moz-transform: translateY(0);
    transform: translateY(0);
  }
  40% {
    -moz-transform: translateY(-30px);
    transform: translateY(-30px);
  }
  60% {
    -moz-transform: translateY(-15px);
    transform: translateY(-15px);
  }
}
@-webkit-keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  40% {
    -webkit-transform: translateY(-30px);
    transform: translateY(-30px);
  }
  60% {
    -webkit-transform: translateY(-15px);
    transform: translateY(-15px);
  }
}
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    -moz-transform: translateY(0);
    -ms-transform: translateY(0);
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  40% {
    -moz-transform: translateY(-30px);
    -ms-transform: translateY(-30px);
    -webkit-transform: translateY(-30px);
    transform: translateY(-30px);
  }
  60% {
    -moz-transform: translateY(-15px);
    -ms-transform: translateY(-15px);
    -webkit-transform: translateY(-15px);
    transform: translateY(-15px);
  }
}

.bounce {
  -moz-animation: bounce 2s infinite;
  -webkit-animation: bounce 2s infinite;
  animation: bounce 2s infinite;
}

body div.wpcf7-response-output {
    margin: 2em 0;
    padding: 0.5em 0;
}

body div.wpcf7-response-output {
    border: 0;
    color: red;
}

body div.wpcf7-mail-sent-ok {
    border: 0;
    color: green;
}

.back-top {
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    background: gray;
    position:fixed;
    bottom: 2em;
    right: 1em;
    display:none;
    opacity:0.8;
    color: #FFF;
    display: inline-block;
    font-size: 2em;
}

/* fancybox buttons */

.button-close,
.button-previous,
.button-next {
  position: absolute;
  width: 44px;
  height: 44px;
  background: #000;
  text-align: center;
  line-height: 44px;
  color: #fff;
  text-decoration: none;
  border-radius: 50%;
  font-size: 2.5em;
}

.button-previous,
.button-next {
  top: 50%;
  margin-top: -22px;
  line-height: 42px;
}

.button-previous {
    left: -50px;
}

.button-next {
    right: -50px;
}

.button-close {
  top: -44px;
  right: -44px;
  font-size: 22px;
  color: rgba(255,255,255,0.8);
}

/* slick arrows */

.slick-prev,
.slick-next {
    font-size: 0;
    position: absolute;
    top: 50%;
    color: #7D064A;
    border: 0;
    background: none;
    z-index: 1;
    display: inline-block;
    width: 22px;
    height: 30px;
    background-color: transparent;
    text-align: center;
    line-height: 30px;
    border-radius: 50%;
    -o-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.slick-disabled {
  opacity: 0.3;
}

.slick-prev {
    left: -22px;
}

.slick-prev:after {
    content: "\f104";
    font: 40px/1 'FontAwesome';
}

.slick-next {
    right: -22px;
}

.slick-next:after {
     content: "\f105";
     font: 40px/1 'FontAwesome';
}

.slick-prev:hover:after,
.slick-next:hover:after {
    color: #7e7e7e;
}

/* slick arrows */

.home-section-one-inner {
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
}

.home-section-one-item {
  width: 55.5%;
  background-color: transparent;
  max-width: 614px;
}

.home-section-one-item:first-child {
  width: 45%;
  max-width: 528px;
  /*overflow: hidden;*/
}

.home-section-one-item:first-child  .item-grid h3 {
    font-size: 30px;
}


/* contact us */

.contact-us-home-inner {
  padding: 60px 0 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
}

.contact-us-home-form {
  width: 80%;
  max-width: 802px;
}

.contact-us-home-form h3 {
  font-size: 42px;
  color: #7c064a;
}

.selectric,
.contact-us-home-form .wpcf7-text,
.contact-us-home-form .wpcf7-textarea,
.contact-us-home-form .wpcf7-select,
.comment-form .text-field,
.comment-form textarea {
  width: 100%;
  padding: 0 34px;
  border: 1px solid #D7D7D7;
  border-radius: 5px;
  height: 61px;
  line-height: 61px;
  background-color: #FFF;
  font-size: 16px;
  color: #D7D7D7;
  font-family: 'GothamRounded-Medium', Verdana, Arial, Helvetica;
}

input:focus,
textarea:focus {
  color: #000 !important;
}

.comment-form .text-field,
.comment-form textarea {
  background-color: transparent;
}

.comment-form .text-field {
    width: 48%;
}

.selectric .label {
  margin: 0;
  height: 61px;
  line-height: 61px;
  font-size: 16px;
  color: #D7D7D7;
  font-family: 'GothamRounded-Medium', Verdana, Arial, Helvetica;
}

.selectric .button {
    top: 10px;
}

.contact-us-home-form .wpcf7-textarea,
.comment-form textarea { 
  padding: 34px;
  height: 211px;
  line-height: 1em;
}

.comment-form .text-field,
.comment-form textarea {
  margin: 0 0 17px;
}

.contact-us-home-form .wpcf7-form-control-wrap {
  display: block;
  margin: 0 0 15px;
}

.contact-us-home-form .acceptance-680 {
  margin: 0;
}

.contact-us-home-form span.wpcf7-list-item {
    margin: 0;
}

.contact-us-home-form .wpcf7-acceptance .wpcf7-list-item-label {
  color: #7D064A;
  padding-left: 35px;
  font-family: 'GothamRounded-Medium', Verdana, Arial, Helvetica;
  font-size: 16px;
}

.contact-us-home-form br {
  display: none;
}

.contact-us-home-form .form-inner {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
}

.contact-us-home-form .form-inner-bottom {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 1em;
}

.form-contact-side {
  width: 49%;
  max-width: 406px;
}

.form-contact-side-left { 
  width: 48%;
  max-width: 379px;
}

.btn-default {
  border: 0;
  padding: 0 66px;
  height: 56px;
  line-height: 56px;
  border-radius: 30px;
  color: #FFF;
  background-color: #7D064A;
  font-weight: normal;
  text-transform: uppercase;
  -webkit-box-shadow: -7px 6px 24px -10px rgba(0,0,0,0.75);
  -moz-box-shadow: -7px 6px 24px -10px rgba(0,0,0,0.75);
  box-shadow: -7px 6px 24px -10px rgba(0,0,0,0.75);
  font-family: 'GothamRounded-Medium', Verdana, Arial, Helvetica;
  font-size: 16px;
  -o-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.btn-default:hover {
  background-color: #E90C8B;
}

.slider-videos-home-section {
  padding: 50px 0;
  background-color: #FFF;
}

.slider-videos-home-section h2 {
  font-size: 24px;
  color: #7d084b;
  text-transform: uppercase;
  margin: 0 0 1.5em;
}

.slider-videos-home {
  margin: 0 -11px;
}

.item-slider-videos-home {
  margin: 0;
  width: 25%;
}

/*
.search .item-slider-videos-home {
    width: 50%;
}
*/

.item-slider-videos-home p {
  margin: 0;
}

.item-slider-videos-home h3 {
  font-size: 22px;
}

.item-slider-videos-home-inner {
  padding: 0 11px;
}

.home .content-inner {
    padding: 0;
    zoom: 1;
}

.home-section-one {
  padding: 70px 0;
}


/* grids */


.container-grid {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  margin: 0 -30px;
}

.item-grid {
  width: 50%;
  margin: 30px 0 0;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}

.container-grid-single .item-grid {
  width: 100%;
  margin: 0;
}

.container-grid-single .item-grid:nth-child(1) {
    margin: 0 0 1em;
}

.content-flex {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  width: 100%;
}

.item-grid-inner {
  margin: 0 30px;
  -webkit-flex: 1 0 auto;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
  background-color: #FFF;
  border-radius: 5px;
  overflow: hidden;
  -webkit-box-shadow: 0px 0px 10px 4px rgba(235, 233, 233, 1);
  -moz-box-shadow: 0px 0px 10px 4px rgba(235, 233, 233, 1);
  box-shadow: 0px 0px 10px 4px rgba(235, 233, 233, 1);
}

.home-section-one-item:first-child .item-grid-inner {
    /*background-color: gray;*/
}

/*.home-section-one-item:first-child .item-grid-inner {
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
*/

.info-grid {
  padding: 25px 20px;
  text-align: center;
}

.item-grid h3 {
  font-size: 18px;
  margin: 0 0 0.75em;
  font-weight: normal;
}

.item-grid h3 a {
  -o-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.item-grid h3 a:hover {
  color: #7D064A;
}

.item-post-grid-media {
  overflow: hidden;
  position: relative;
}

.item-grid img {
  width: 100%;
  height: auto;
  transition:all .5s ease-in-out;
}


.item-post-grid-media:hover img {
  -webkit-transform:scale(1.3);
  transform:scale(1.3);
  filter: saturate(180%);
}


.info-grid small {
  display: block;
  font-size: 12px;
  text-transform: uppercase;
  margin: 0 0 0.75em;
  font-weight: 400;
}

.item-grid:nth-child(1),
.item-grid:nth-child(2) {
  margin: 0;
}

/* end items grids */

.item-post-grid-cat {
  display: block;
  margin: 0 0 1em;
  color: #7d084b;
  font-size: 11px;
  font-weight: normal;
  font-family: 'GothamRounded-Medium', Verdana, Arial, Helvetica;
  text-transform: uppercase;
}

.item-post-grid-cat a {
  color: #7d084b;
}

.featured-post-home {
  background-color: #F7F0DE;
  padding: 80px 0;
}

.featured-post-home-inner {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
}

.featured-post-home-inner .container-grid {
  width: 80%;
  max-width: 872px;
  margin: 0;
}

.featured-post-home-inner .container-grid .item-grid {
  width: 100%;
}

.featured-post-home-inner .item-grid-inner {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  background-color: transparent;
  -webkit-box-shadow: none;
-moz-box-shadow: none;
box-shadow: none;
}

.featured-post-home-inner .item-post-grid-media,
.featured-post-home-inner .info-grid {
  width: 50%;
}

.featured-post-home-inner .item-post-grid-media {
  border-radius: 5px;
  overflow: hidden;
}

.featured-post-home-inner .info-grid {
  background-color: transparent;
    padding: 25px 40px 25px 20px;
    font-size: 15px;
    text-align: left;
}

.featured-post-home-inner .info-grid h3 {
  font-size: 22px;
}

.featured-post-home-inner .item-grid-inner {
    margin: 0;
}

.banner-full-width a {
  display: block;
}

.banner-full-width img {
  width: 100%; 
  height: auto;
}

.post-background-box {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 195px 20px;
  font-size: 18px;
}

.post-background-box h2 {
  font-size: 42px;
}

.post-background-box .item-post-grid-cat,
.post-background-box .item-post-grid-cat a,
.post-background-box a,
.post-background-box h2 a  {
    color: #FFF;
    -o-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.post-background-box .item-post-grid-cat a:hover,
.post-background-box a:hover,
.post-background-box h2 a:hover  {
    color: #34A16A;
}

.post-background-box-content {
  width: 80%;
  max-width: 590px;
  padding: 50px;
  margin: 0 auto;
  background-color: rgba(125, 6, 74, 0.8);
  text-align: center;
  color: #FFF;
}

.item-slider-videos-home-media {
  margin: 0 0 24px;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
}

.item-slider-videos-home-media:before {
  content: "";
  display: block;
  width: 78px;
  height: 78px;
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 2;
  /*background-image: url(../images/play-watch.png);*/
  margin: -39px 0 0 -39px;
}

.item-slider-videos-home-media img {
  width: 100%;
  height: auto;
  
  transition:all .5s ease-in-out;
}


.item-slider-videos-home-media:hover img {
  -webkit-transform:scale(1.3);
  transform:scale(1.3);
  filter: saturate(180%);
}


.item-post-grid-meta a,
.item-post-grid-meta span {
  margin: 0 11px;
  margin: 0 5px;
  display: inline-block;
}

/* Base for label styling */
[type="checkbox"]:not(:checked),
[type="checkbox"]:checked {
  position: absolute;
  left: -9999px;
}
[type="checkbox"]:not(:checked) + span,
[type="checkbox"]:checked + span {
  position: relative;
  padding-left: 1.95em;
  cursor: pointer;
}

/* checkbox aspect */

[type="checkbox"]:not(:checked) + span:before,
[type="checkbox"]:checked + span:before {
  content: '';
  position: absolute;
  left: 0; top: 0;
  width: 21px; 
  height: 21px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 3px;
  /*box-shadow: inset 0 1px 3px rgba(0,0,0,.1);*/
}

/* checked mark aspect */
[type="checkbox"]:not(:checked) + span:after,
[type="checkbox"]:checked + span:after {
  position: absolute;
  top: 2px;
  left: 3px;
  font-size: 1em;
  line-height: 1em;
  color: #545454;
  transition: all .2s;
  /*font-family: 'Lucida Sans Unicode', 'Arial Unicode MS', Arial;*/
  font-family: FontAwesome;
  content: "\f00c";
}

/* checked mark aspect changes */
[type="checkbox"]:not(:checked) + span:after {
  opacity: 0;
  transform: scale(0);
}
[type="checkbox"]:checked + span:after {
  opacity: 1;
  transform: scale(1);
}

/* accessibility */
[type="checkbox"]:checked:focus + span:before,
[type="checkbox"]:not(:checked):focus + span:before {
  /*border: 2px dotted blue;*/
}

.item-post-grid-meta {
  font-family: 'GothamRounded-Bold', Verdana, Arial, Helvetica;
  font-size: 12px;
  color: #000;
}

.item-post-grid-meta span {
    color: #34a06a;
}

.footer .nav ul {
    margin: 0;
}

/* single */

.single .content-inner {
    padding: 0;

}

.single-box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  padding: 70px 0;
}

.single-left {
  width: 15%;
  max-width: 166px; 
   font-size: 12px;
}

.single-middle {
  width: 70%;
  max-width: 700px; 
}

.single-right {
  width: 15%;
  max-width: 160px; 
}

.content-commnets {
  padding: 70px 20px;
  background-color: #FFFCF5;
}

.content-commnets-inner {
  width: 80%;
  max-width: 663px;
  margin: 0 auto;
}

.related-post-box {
  padding: 70px 0;
  background-color: #FFF;
}

.related-post-box .item-grid:nth-child(1), 
.related-post-box .item-grid:nth-child(2) {
    margin: 0;
}

.related-post-box .item-grid {
    width: 25%;
    margin: 0;   
}

.related-post-box .info-grid {
    padding: 25px 0 0;
    text-align: left;
}

.related-post-box .container-grid {
    margin: 0 -10px;
}

.related-post-box .item-post-grid-media {
    border-radius: 5px;
    overflow: hidden;
}

.related-post-box .item-grid-inner {
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  margin: 0 10px 20px;
}

.related-post-box .item-post-grid-meta {
    text-align: left;
}

.related-post-box .item-post-grid-meta a, 
.related-post-box .item-post-grid-meta span {
    margin: 0 22px 0 0;
}

.share-post {
  width: 90px;
  margin: 0 0 2.5em;
}

.share-post h4,
.title_latest {
  font-weight: normal;
  font-family: 'GothamRounded-Medium', Verdana, Arial, Helvetica;
  font-size: 16px;
  margin: 0 0 2em;
  text-transform: uppercase;
}

.share-post a {
  display: inline-block;
  width: 64px;
  height: 64px;
  line-height: 64px;
  text-align: center;
  margin: 0 0 6px;
  border: 1px solid #ECE1CB;
  border-radius: 50%;
  color: #262626;
  text-decoration: none;
  font-size: 2em;
}

.commentlist > li,
#respond {
  padding: 57px 0 0 107px;
  position: relative;
  border-top: 1px solid #ECE1CB;
  margin: 57px 0 0;
}

#respond {
  padding-left: 0;
}

.commentlist > li:first-child {
    margin: 0;
}

.avatar {
  position: absolute;
  left: 0;
  top: 57px;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  overflow: hidden;
}

.autor-excerpt-box {
  padding: 0 27px 0;
  border-left: 1px solid #EBE0CA;
  margin: 0 0 78px;
}

.header-autor-excerpt-box {
  position: relative;
  padding: 0 0 20px 87px;
  min-height: 90px;
}

.avatar-author-box {
  position: absolute;
  display: inline-block;
  left: 0;
  top: 0;
}

.author-avatar-resize {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
}

.comments-title {
  color: #7d084b;
  text-transform: uppercase;
}

.wp-caption {
    background: transparent;
    margin-bottom: 1.625em;
    max-width: 100%;
    padding: 0;
}

.wp-caption .wp-caption-text {
    margin-bottom: 0;
    padding: 10px 0;
    position: relative;
    text-align: left;
    font-family: 'GothamRounded-Medium', Verdana, Arial, Helvetica;
    font-style: italic;
    color: #898989;
    font-size: 13px;

}

.wp-caption img {
    max-width: 100%;
}

.single h1 {
  font-size: 48px;
}


.single-left p {
  margin: 0 0 2.5em;
  line-height: 1.5em;
  color: #898989;
  font-size: 12px;
}

.single-left p strong {
  font-size: 16px;
  font-weight: normal;
  font-family: 'GothamRounded-Medium', Verdana, Arial, Helvetica;
  color: #262626;
}

.single .entry,
.content-autor-excerpt-box p {
  font-size: 18px;
}

.single .entry p,
.content-autor-excerpt-box p {
  line-height: 1.5em;
  margin: 0 0 1.8em;
}

.content-autor-excerpt-box p {
  font-style: italic;
}

.header-autor-excerpt-box h4 {
  font-size: 20px;
}

.header-autor-excerpt-box p a {
  font-size: 14px;
  color: #34a06a;
}

.related-post-box h2 {
  text-align: center;
  font-size: 24px;
  color: #7d084b;
  margin: 0 0 1.8em;
  text-transform: uppercase;
}

.related-post-box .item-grid h3 {
    font-size: 22px;   
}

.header-autor-excerpt-box p a i {
    font-size: 18px;
}

.comment-author .fn {
  font-size: 18px;
  font-family: 'GothamRounded-Bold', Verdana, Arial, Helvetica;
  font-style: normal;
  display: inline-block;
  margin: 0 0 0.75em;
}

.comment-meta {
    font-size: 11px;
    margin: 0 0 1.5em;
}

.single .copete {
  font-size: 22px;
}

.single .navigation,
.single .navigation a {
  color: #7d084b;
  font-family: 'GothamRounded-Medium', Verdana, Arial, Helvetica;
}

.content-fields-comments {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center; 
}

.single .entry img {
  width: 100%;
  height: auto;
}

.item-post-grid-media a {
  display: block;
  overflow: hidden;
}

.single .item-post-grid-media a,
.author .item-post-grid-media a,
.archive .item-post-grid-media a {
  /*max-height: 137px;*/
}

/* auhtor page */

.author-block-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0; 
}

.author-top-content {
  padding: 0 0 70px;
  border-bottom: 1px solid #EBE0CA;
}

.author-bottom-content {
  padding: 70px 0 0; 
}

.author-block-content-left {
  width: 20%;
  max-width: 207px;
}

.author-block-content-left img {
  width: 207px;
  height: 207px;
  width: 100%;
  max-width: 207px;
  height: auto;
  border-radius: 50%;
}

.author-block-content-right {
  width: 78%;
  max-width: 918px;
}

.author .container-grid,
.archive .container-grid {
    margin: 0 -15px;
}

.author .item-grid,
.archive .item-grid {
    width: 33.3%;
    margin: 0 0 30px;
}

.author .item-grid:nth-child(1), 
.author .item-grid:nth-child(2),
.archive .item-grid:nth-child(1), 
.archive .item-grid:nth-child(2) {
    margin: 0 0 30px;
}

.author .item-grid-inner,
.archive .item-grid-inner {
    margin: 0 15px;
}

.author-top-content .author-block-content-right {
  font-size: 18px;
}

.title-page {
  font-size: 48px;
  color: #7c064a;
  margin: 0 0 0.75em;
}

.author_position {
  font-size: 16px;
  font-family: 'GothamRounded-Medium', Verdana, Arial, Helvetica;
  text-transform: uppercase;
  color: #7d084b;
}

.author_social_links,
.author_social_links a {
  font-size: 16px;
  color: #34a06a;
  font-family: 'GothamRounded-Medium', Verdana, Arial, Helvetica;
}

.navigation {
  margin: 3em 0 0;
}

.navigation a {
  font-size: 14px;
  color: #7d084b;
  font-family: 'GothamRounded-Medium', Verdana, Arial, Helvetica;
}

.author .item-grid h3 {
    font-size: 22px;
    margin: 0 0 0.75em;
    font-weight: normal;
}

/* category */

.archive-block-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0; 
}

.archive-block-content-left {
  width: 20%;
  max-width: 220px;
}

.archive-block-content-right {
  width: 78%;
  max-width: 918px;
}

/**/

.about-top-box {
  /*background-image: url(../images/about-top-box.jpg);*/
  /*padding: 0 515px 80px 0;
  padding: 0 0 80px 0 0;
  /*min-height: 453px;*/
  background-position: right bottom;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
}

.content-image-about {
  margin: 0;
  width: 50%;
  max-width: 424px;
}

.about-top-box article {
  width: 50%;
  padding: 0 0 80px;
  font-size: 18px;
}

.content-image-about img {
  width: 100%;
  height: auto;
  /*display: none;*/
}

.author-block-content-right .title-page {
    margin: 0 0 0.35em;
}

/**/

.page-template-about .author-top-content {
  padding: 80px 0;
}

.page-template-about .author-top-content h2 {
  font-size: 32px;
  color: #262626;
}

.row-founder-content .row-founder:first-of-type {
  background-color: #F7F0DE;
  border: 0;
}

.row-founder-content .row-founder:first-of-type .author-top-content {
    border: 0;
}

.list-team-block-item {
  width: 33.3%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0 0 40px;
  padding: 0 15px;
}

.list-team-block-item-left {
  width: 28%;
}

.list-team-block-item-right {
  width: 70%;
}

.list-team-block-item-left img {
  width: 97px;
  height: 97px;
  width: 100%;
  height: auto;
  max-width: 97px;
  border-radius: 50%;
}

.list-team-block {
  padding: 50px 0 0;
}

.list-team-block .inner {
  border-bottom: 1px solid #EBE0CA;
}

.list-team-block h2 {
  font-size: 36px;
  color: #7c064a;
  margin: 0 0 1.5em;

}

.list-team-block-item-right h4 {
  margin: 0 0 0.5em;
}

.list-team-block-inner {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /*justify-content: space-between;*/
  align-items: flex-start;
  margin: 0 -15px;
  padding: 0 0 20px;
}

.container-grid-featured-archive .item-grid {
    width: 50%;
}

.archive .container-grid-featured-archive {
  margin-bottom: 3em;
}

.image-container-default {
  display: block;
  width: 100%;
  /*min-height: 153px;*/
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.image-container-default img {
  visibility: hidden;
}

/* search form */

.header .inner {
  position: relative;
}

.header .search-form {
  position: absolute;
  right: 0;
  bottom: -50px;
  z-index: 5;
  background-color: #7D064A;
  padding: 10px;
  width: 250px;
  opacity: 0;
  -o-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.header .search-form.active {
  opacity: 1;
}

.header input[type="search"] {
    border: 0;
    border-radius: 3px;
    background-color: #FFF;
    padding: 0 10px;
    height: 30px;
    width: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    font-family: 'GothamRounded-Medium', Verdana, Arial, Helvetica;
  color: #262626;
}

.header .search-form button {
  display: none;
}

.list-reset .cat-item {
  margin: 0 0 1.5em;
}

.cat-item a {
  font-size: 14px;
  font-family: 'GothamRounded-Medium', Verdana, Arial, Helvetica;
}

.search-toggle-mobile {
  display: none;
}

/*.home-section-one-item:first-child,
.home-section-one-item:first-child .container-grid,
.home-section-one-item:first-child .item-grid,
.home-section-one-item:first-child .content-flex {
  height: 100%;
}

.home-section-one-item:first-child .item-grid-inner {
    flex-direction: column;
}

.container-grid-single .item-post-grid-media,
.container-grid-single .info-grid {
  display: flex;
  flex-direction: column;
  justify-content: center;
}



*/

.container-grid-single .info-grid {
  display: flex;
  /*flex-direction: column;*/
  flex-wrap: wrap;
  justify-content: space-between;
  /*align-items: center;*/
}


.container-grid-single .item-post-grid-excerpt {
  font-size: 16px;
}

.archive .item-slider-videos-home {
    width: 33.3%;
    margin: 0 0 30px;
}

.entry h2 {
  color: #7c064a;
}


.collaborate-section {
  padding: 40px 0 0;
  background-color: #34A16A;
  background-color: #00A167;
  color: #FFF;
}

.collaborate-section span.wpcf7-not-valid-tip {
    color: #CCC;
}

.collaborate-section-inner {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
}

.collaborate-section-form {
  width: 82%;
  /*max-width: 991px;*/
  padding: 0 48px 0 0;
  padding: 0 0 30px;
}

.collaborate-section-media {
  width: 20%;
  max-width: 182px; 
}

.collaborate-section-media img {
  width: 100%;
  height: auto;
  max-width: 156px;
}

.collaborate-section-form h3 {
  font-size: 36px;
  margin: 0 0 0.5em;
}

.collaborate-section-form br {
  display: none;
}

.collaborate-section-form-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  margin: 0 0 15px;
}

.collaborate-section-form-bottom {
  margin: 0;
}

.collaborate-section-form-content .wpcf7-form-control-wrap {
  width: 45%;
  max-width: 377px;
  padding: 0 15px 0 0;
}

.collaborate-section-form-bottom .wpcf7-form-control-wrap {
  width: 85%;
  max-width: 756px;
}

.collaborate-section-form-content .wpcf7-form-control-wrap input,
.collaborate-section-form-content .wpcf7-form-control-wrap textarea {
    width: 100%;
    padding: 0 22px;
    border: 1px solid #9AD0B6;
    border-radius: 5px;
    height: 61px;
    line-height: 61px;
    background-color: transparent;
    font-size: 16px;
    color: #9AD0B6;
    font-family: 'GothamRounded-Medium', Verdana, Arial, Helvetica;
}

.collaborate-section-form-content .wpcf7-form-control-wrap textarea {
  height: 85px;
  line-height: 1em;
  padding: 22px;
}

.collaborate-section-form-content .btn-default {
    height: 61px;
    line-height: 61px;
    color: #34A16A;
    background-color: #FFFCF5;
}

.collaborate-section-form div.wpcf7-response-output {
    color: #FFF;
}

.collaborate-section-form div.wpcf7-mail-sent-ok {
    color: #FFF;
}

.slick-dots {
  margin: 0;
  padding: 0;
  list-style: none;
  text-align: center;
}

.slick-dots li {
  list-style: none;
  margin: 0 0.5em;
  display: inline-block;
}

.slick-dots li button:before, 
.slick-dots li button:before {
    color: #FFF;
    opacity: 1;
    font-size: 16px;
}
.slick-dots li button {
    border: 2px solid #7D064A;
    border-radius: 100%;
    background-color: transparent;
    color: #7D064A;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    -o-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.slick-dots li.slick-active button {
    background-color: #7D064A;
    color: #FFF;
}

.slick-dots li button:before {
    color: transparent;
}

#mc_message {
  color: #FFF;
}

.widget ul {
  margin: 0 0 1em;
}

.widget ul li {
  margin: 0 0 1em;
}

.collaborate-text {
  font-size: 1.1em;
  margin: 1em 0 1.5em;
  width: 80%;
}

.home-section-one-item-two .item-grid-inner {
    margin: 0 15px;
}

.home-section-one-item-two .container-grid {
    margin: 0 -15px;
}



.home-section-one-item:first-child {
    width: 40%;
    max-width: 528px;
}

.home-section-one-item-two {
    width: 58%;
    max-width: 700px;
}



.home p:empty {
  display: none;
  margin: 0;
}

.tags p {
  font-size: 0.9em;
}

.tags p a {
  font-size: 0.9em;
  color: #7d084b;
}

.item-slider-carrusel-home .item-slider-videos-home-media:before {
    display: none;
}

.search .item-grid {
    width: 33.3%;
    margin: 0 0 30px;
}
`


export const responsive = `
/*

 
@media (max-width: 1173px) { 
	.header {
		background: blue;
	}
}
 
@media (max-width: 960px) { 
	.header {
		background: red;
	}
}
 
@media (max-width: 480px) { 
	.header {
		background: green;
	}
}

*/



/* responsive */


 
@media (max-width: 1173px) { 

	.inner {
		width: 100%;
		max-width: 100%;
		padding: 0 2em;
	}

	.header .nav {
	    display: none;
	}

	.home-section-one-item:first-child,
	.home-section-one-item {
	    width: 100%;
	    max-width: 100%;
	    margin: 0 0 30px;
	}

	.container-grid {
	    margin: 0 -15px;
	}

	.item-grid-inner {
	    margin: 0 15px;
	}

	.featured-post-home-inner .container-grid {
	    width: 100%;
	    max-width: 100%;
	}

	.banner-300-250 {
    width: 100%;
    text-align: center;
	}

	.home .slick-prev, 
	.home .slick-next {
	    display: none !important;
	}

	.post-background-box-content {
	    width: 80%;
	    max-width: 80%;
	    padding: 30px;
	}

	.contact-us-home-form {
	    width: 100%;
	    max-width: 100%;
	}

	.form-contact-side-left, 
	.form-contact-side {
	    width: 100%;
	    max-width: 100%;
	    margin: 0 0 24px;
	}


	.image-contact {
		width: auto;
		margin: 0 auto;
	}

	.newsletter-content,
	.social-footer {
	    max-width: 48%;
	    width: 48%;
	}

	.footer-middle .inner {
	    flex-direction: column;
	}

	.logo-footer {
		display: inline-block;
		margin: 0 0 1em;
	}

	.footer-bottom {
		text-align: center;
	}

	.header .inner {
		position: relative;
	}

	.nav-toggle {
	    display: block;
	    position: absolute;
	    position: relative;
	    left: auto;
	    top: auto;
	}

	.search-toggle-mobile,
	.nav-toggle {
	  display: block;
	  color: #FFF;
	  font-size: 2em;
	  width: 30px;
	  height: 30px;
	  text-align: center;
	  line-height: 30px;
	  background-color: #7D064A;
	} 

	.header .nav {
	    width: 100%;
	    padding: 1em 0;
	}

	.nav li {
	    margin: 0;
	    display: block;
	    text-align: right;
	}

	.nav li.search-toggle {
		display: none;
	}

	.nav .menu > li > a {
	    display: block;
	    padding: 0.5em 1em;
	    height: auto;
	    line-height: 1em;
	}

	.header .search-form {
	    position: relative;
	    right: 0;
	    bottom: auto;    
	    padding: 1em 0;
	    width: 100%;
	    opacity: 1;
	    display: none;

	}

	.header .nav .search-form {
	    display: block;
	}

	.list-team-block-item {
	    width: 50%;
	}

	.container-grid-single .info-grid {
	    height: auto !important;
	    display: block;
	}

	.collaborate-section-form-bottom .wpcf7-form-control-wrap {
	    width: 100%;
	    max-width: 100%;
	}

	.collaborate-section-form-content .wpcf7-form-control-wrap {
	    width: 100%;
	    margin: 0 0 1em;
	    padding: 0;
	    max-width: 100%;
	}

	
		
}
 
@media (max-width: 960px) {

	.author .item-grid, .archive .item-grid,
	.related-post-box .item-grid,
	.search .item-grid {
	    width: 50%;
	}

	.featured-post-home-inner .item-grid-inner {
	    flex-direction: column;
	}

	.featured-post-home-inner .item-post-grid-media, 
	.featured-post-home-inner .info-grid {
	    width: 100%;
	}

	.archive-block-content-left {
	    display: none;
	}

	.archive-block-content-right {
	    width: 100%;
	    max-width: 100%;
	}

	.single-box {    
	    flex-direction: column;
	}

	.single-left {
		display: none;
	}

	.single-middle,
	.single-right,
	.content-commnets-inner {
	    width: 100%;
	    max-width: 100%;
	}

	.contact-us-home-form .form-inner-bottom {
	    flex-direction: column;
	    margin: 2em 0 3em;
	}

	.about-top-box {
	    flex-direction: column;
	}

	.about-top-box article {
	    width: 100%;
	    padding: 0 0 30px;    
	}

	.content-image-about {
	    margin: 0;
	    width: 100%;
	    max-width: 100%;
	    text-align: center;
	}

	.content-image-about img {
	    width: 90%;
	    max-width: 424px;
	    margin: 0 auto
	}

	.author-block-content-left {
	    width: 10%;
	}

	.author-block-content-right {
	    width: 87%;
	}

	.list-team-block-item-left {
	    width: 20%;
	}

	.list-team-block-item-right {
	    width: 72%;
	}

	.form-contact-side-left, .form-contact-side {
	    margin: 0;
	}
	
	.collaborate-section-form {
	    width: 60%;
	    max-width: 60%;
	    padding: 0;
	}

	.collaborate-section-form-content {
    	flex-direction: column;
	}



	.collaborate-section-form-content .wpcf7-form-control-wrap {
	    max-width: 100%;
	}

	.collaborate-section {
	    padding: 30px 0;
	}

}
 
@media (max-width: 480px) {


	.author .item-grid, .archive .item-grid,
	.related-post-box .item-grid,
	.item-grid,
	.item-grid:nth-child(1), 
	.item-grid:nth-child(2),
	.search .item-grid {
	    width: 100%;
	    margin: 0 0 30px;
	}

	
	.footer-top .inner, 
	.footer-middle .inner {
	    flex-direction: column;
	}

	.newsletter-content, .social-footer {
	    max-width: 100%;
	    width: 100%;
	    text-align: left;
	}

	.newsletter-content {
		margin: 0 0 3em;
	}

	.footer-top .social-footer {
	    text-align: left;
	}

	.inner {
	    padding: 0 1em;

	}

	.container-grid-single .item-grid {
    	margin: 0;
	}

	.home-section-one,
	.featured-post-home,
	.slider-videos-home-section,
	.post-background-box,
	.footer-middle,
	.footer-top,
	.related-post-box,
	.content-inner,
	.single-box {
    	padding: 30px 0;
	}

	.content-commnets {
	    padding: 30px 1em;
	}

	.post-background-box {
		padding: 0;
	}
	
	.contact-us-home-inner {
		padding: 30px 0 0;
	}

	.form-contact-side-left, .form-contact-side {
	    margin: 0;
	}

	.post-background-box-content {
	    width: 100%;
	    max-width: 100%;
	    padding: 30px 1em;
	    margin: 0;
	}

	.logo-image img {
		height: 60px;
		width:  auto;
	}

	.comment-form .text-field {
	    width: 100%;
	}

	.single-right {
		text-align: center;
	}

	.avatar {
	    width: 35px;
	    height: 35px;
	}

	.commentlist > li, #respond {
	    padding: 30px 0 0;
	    margin: 30px 0 0;
	}

	.btn-default {
	    width: 100%;
	}

	.list-team-block-item {
	    width: 100%;
	}

	.list-team-block-item {
	    margin: 0 0 20px;
	    padding: 0 1em;
	}

	.list-team-block-item-left {
	    width: 10%;
	}

	.list-team-block-item-right {
	    width: 86%;
	}

	.image-contact {
	    width: 50%;
	}

	.content-image-about img {
	    width: 50%;
	}

	.collaborate-section-form {
	    width: 100%;
	    max-width: 100%;
	    padding: 0 0 2em;
	}

	.collaborate-section-media {
	    width: 100%;
	    text-align: center;
	    max-width: 100%;
	}

	.collaborate-section {
	    padding: 30px 0 0;
	}

	.title-page,
	.home-section-one-item:first-child .item-grid h3,
	.post-background-box h2 {
	    font-size: 2em;
	}

	body {
		overflow-x: hidden;
	}

	
}
`

export const styleWebView = `

@media only screen and (min-width: 415px)
/*and (max-width: 480px)*/

{
	.clearfix.content:after,
	.clearfix.content-inner:after {
		content: unset !important;
	}
	.archive-block-content-left {
		max-width: 220px;
		display: none;
	}
	body,
	.content {
		background: #F5F5F5 !important;
	}
	body {
		margin-top: 0 !important;
	}
	header {
		/* display: none !important; */
	}
	.footer-blog.ant-layout-footer {
		display: none;
	}
	.archive-block-content-right {
		width: 100%;
		max-width: 918px;
		display: table;
		margin: 0 auto;
	}
	.back-btn {
		display: none;
	}
	.content-inner {
		padding: 10px 0;
	}
	.smartbar-popup {
		display: none;
	}
	.archive-block-content-right .title-page {
		display: none;
	}
	.archive-block-content-right .title_latest {
		display: none;
	}
	.banner-full-width {
		display: none;
	}
	.contact-us-home {
		display: none;
	}
	.footer {
		/* display: none; */
	}
	.archive .container-grid {
		margin: 0 !important;
	}
	.container-grid + .navigation {
		display: block !important;
	}
	.info-grid {
		padding: 20px;
	}
	.item-grid h3 {
		font-size: 18px !important;
		color: rgb(238, 64, 54);
	}
	.item-grid h3 a,
	.item-grid h3 a:hover {
		color: rgb(238, 64, 54);
	}
	.item-post-grid-autor {
		color: rgb(52, 64, 76);
	}
	.container-grid-single .item-post-grid-cat.fix-cat-size,
	.item-post-grid-cat {
		font-size: 14px !important;
		font-weight: 700 !important;
	}
	.container-grid-single .item-post-grid-excerpt p,
	.item-post-grid-excerpt p {
		font-size: 12px;
		font-weight: 400;
		color: rgb(52, 64, 76);
	}
	.item-post-grid-cat a {
		color: rgb(238, 64, 54) !important;
	}
	.item-post-grid-meta span {
		color: rgb(238, 64, 54) !important;
	}
	.item-post-grid-meta {
		font-size: 12px !important;
		font-weight: 400 !important;
	}
	.hfeed .inner {
		padding: 0 !important;
	}
	.author .item-grid-inner,
	.archive .item-grid-inner {
		margin: 0 10px !important;
		border-radius: 2px;
	}
	.item-grid {
		margin: 0 0 15px !important;
	}
	.navigation {
		margin: 0 !important;
	}
	.alignright,
	.alignleft {
		float: none !important;
		margin: 0 !important;
		text-align: center;
	}
	.navigation a {
		font-size: 14px !important;
		font-weight: 700 !important;
		color: rgb(238, 64, 54) !important;
	}
	.list-reset {
		//display: none;
      display: block;
	}
	.single-box {
		padding: 15px 10px;
		position: relative;
		padding-bottom: 70px;
	}
	.single-left {
		display: block;
		width: auto;
		max-width: 100%;
		position: absolute;
		bottom: 0;
	}
	.single-left p {
		display: none;
	}
	.share-post {
		width: 100%;
		margin: 0;
		display: table;
	}
	.share-post h4 {
		margin: 0 0 10px 0;
		color: rgb(52, 64, 76);
	}
	.share-post a {
		margin: 0 10px 6px 0;
		color: rgb(238, 64, 54);
		border: 1px solid rgb(238, 64, 54);
	}
	.list-reset-old {
		display: none;
	}
	.single h1 {
		font-size: 18px !important;
		color: rgb(238, 64, 54);
		margin: 0 0 10px 0;
		font-family: 'GothamRounded-Bold', Verdana, Arial, Helvetica;
	}
	.entry h3,
	.entry h4 span strong {
		font-size: 18px !important;
		color: rgb(238, 64, 54);
		margin-bottom: 10px;
		line-height: 18px;
		font-weight: 400;
	}
	.entry h4 {
		margin: 0 0 10px 0;
		font-size: 18px !important;
		color: rgb(238, 64, 54);
		line-height: 18px;
		font-weight: 400;
	}
	.entry h4 span {
		color: rgb(238, 64, 54) !important;
	}
	.entry h2 {
		margin: 0 0 10px 0;
		font-size: 18px !important;
		color: rgb(238, 64, 54);
		line-height: 18px;
		font-weight: 400;
	}
	.entry h2 strong {
		font-weight: 400;
	}
	.entry h2 span {
		color: rgb(238, 64, 54) !important;
	}
	.entry h3 span {
		font-size: 18px !important;
		Color: rgb(238, 64, 54) !important;
	}
	.entry h3 span strong {
		font-weight: 400;
	}
	.single .entry p {
		font-size: 12px;
		font-weight: 400 !important;
		margin: 0 0 10px;
		color: rgb(52, 64, 76);
	}
	.single .entry p a strong {
		color: rgb(238, 64, 54) !important;
	}
	.single .entry p strong span {
		color: rgb(238, 64, 54) !important;
	}
	.wp-caption {
		margin-bottom: 10px;
	}
	.tags {
		display: none;
	}
	.tags+p {
		display: none;
	}
	.autor-excerpt-box {
		display: none;
	}
	.single-right {
		display: none;
	}
	.main-content-inner .navigation {
		margin: 0;
		display: none;
	}
	.related-post-box {
		display: none;
	}
	.content-commnets {
		padding: 10px;
		background: transparent;
	}
	.hentry {
		margin-bottom: 0;
	}
	.hentry h5 {
		font-size: 14px !important;
		font-weight: 700 !important;
	}
	.hentry hr {
		display: none;
	}
	#respond {
		margin: 0;
		padding: 0;
		border: none;
	}
	.comments-title {
		font-size: 18px !important;
		Color: rgb(238, 64, 54);
		margin-bottom: 10px;
	}
	.comment-form textarea {
		font-size: 12px !important;
		font-weight: 400 !important;
	}
	.btn-default {
		font-size: 14px !important;
		font-weight: 700 !important;
		background-color: rgb(238, 64, 54);
	}
	.btn-default:hover {
		background-color: rgb(238, 64, 54);
	}
	p strong,
	p strong a {
		color: rgb(52, 64, 76) !important;
	}
	.entry ul li {
		font-size: 12px;
		
		font-weight: 400 !important;
	}
	.entry ul li span {
		Color: rgb(52, 64, 76) !important;
	}
	.entry ul li span:first-child strong {
		color: rgb(238, 64, 54) !important;
	}
	.entry ul li strong:first-child span {
		color: rgb(238, 64, 54) !important;
	}
	.entry ul li strong,
	.entry ul li b {
		color: rgb(52, 64, 76);
	}
	p iframe {
		display: none;
	}
	.comment-form textarea {
		margin: 0 0 10px;
		padding: 10px;
		background: #fff;
		height: 120px;
	}
	.comment-form .text-field {
		height: 40px;
	}
	.content-fields-comments input,
	.content-fields-comments select {
		padding: 10px !important;
		font-size: 12px !important;
		font-weight: 400 !important;
		background: #fff !important;
		margin-bottom: 10px !important;
		line-height: inherit !important;
	}
	.item-post-grid-cat {
		display: none;
	}
	.mobhide {
		display: none;
	}
	blockquote p span,
	blockquote p span strong,
	blockquote h5 span {
		color: rgb(238, 64, 54) !important;
		font-weight: 400;
	}
	blockquote h2 {
		color: rgb(238, 64, 54) !important;
		font-weight: 400;
		font-size: 12px !important;
	}
	.comment-form p {
		font-size: 12px !important;
		font-weight: 400 !important;
		color: rgb(52, 64, 76);
	}
	.instagram-media {
		display: none !important;
	}
	.commentmetadata {
		margin: 4px 0 15px 43px;
	}
	.commentlist > li {
		padding-top: 10px;
	}
	.avatar {
		top: 35px;
	}
	.sumo-form-wrapper {
		display: none;
	}
	.item-post-grid-meta a {
		pointer-events: none;
	}
	.textareastyle {
			height: 100px !important;
	}
	.content-commnets label {
		font-size: 14px;
    color: #4a4a4a;
	}
	.content-commnets .ant-form-item {
		margin-bottom: 0;
		padding: 0 5px;
	}
	.content-commnets .comments-title {
		padding: 0 5px;
	}
	.content-commnets input {
		height: 40px;
	}
	.content-commnets button {
		background: #ef3d37;
    color: #fff;
    border: none;
    border-radius: 25px;
    margin: 0 auto;
    display: block;
    width: 150px;
    font-size: 16px;
    min-height: 32px;
	}
	.content-commnets .btn-block {
		display: inline-block;
    width: 100%;
    margin: 20px 0;
	}
}
@media only screen and (min-width: 376px) and (max-width: 414px) {
	body,
	.content {
		background: #F5F5F5 !important;
	}
	body {
		margin-top: 0 !important;
	}
	header {
		display: none !important;
	}
	.footer-blog.ant-layout-footer {
		display: none;
	}
	.archive-block-content-left {
		max-width: 220px;
		display: none;
	}
	.archive-block-content-right {
		width: 100%;
		max-width: 918px;
		display: table;
		margin: 0 auto;
	}
	.back-btn {
		display: none;
	}
	.content-inner {
		padding: 10px 0;
	}
	.smartbar-popup {
		display: none;
	}
	.archive-block-content-right .title-page {
		display: none;
	}
	.archive-block-content-right .title_latest {
		display: none;
	}
	.banner-full-width {
		display: none;
	}
	.contact-us-home {
		display: none;
	}
	.footer {
		display: none;
	}
	.archive .container-grid {
		margin: 0 !important;
	}
	.container-grid + .navigation {
		display: block !important;
	}
	.info-grid {
		padding: 20px;
	}
	.item-grid h3 {
		font-size: 18px !important;
		color: rgb(238, 64, 54);
	}
	.item-grid h3 a,
	.item-grid h3 a:hover {
		color: rgb(238, 64, 54);
	}
	.item-post-grid-autor {
		color: rgb(52, 64, 76);
	}
	.container-grid-single .item-post-grid-cat.fix-cat-size,
	.item-post-grid-cat {
		font-size: 14px !important;
		font-weight: 700 !important;
	}
	.container-grid-single .item-post-grid-excerpt p,
	.item-post-grid-excerpt p {
		font-size: 12px;
		font-weight: 400;
		color: rgb(52, 64, 76);
	}
	.item-post-grid-cat a {
		color: rgb(238, 64, 54) !important;
	}
	.item-post-grid-meta span {
		color: rgb(238, 64, 54) !important;
	}
	.item-post-grid-meta {
		font-size: 12px !important;
		font-weight: 400 !important;
	}
	.hfeed .inner {
		padding: 0 !important;
	}
	.author .item-grid-inner,
	.archive .item-grid-inner {
		margin: 0 10px !important;
		border-radius: 2px;
	}
	.item-grid {
		margin: 0 0 15px !important;
	}
	.navigation {
		margin: 0 !important;
	}
	.alignright,
	.alignleft {
		float: none !important;
		margin: 0 !important;
		text-align: center;
	}
	.navigation a {
		font-size: 14px !important;
		font-weight: 700 !important;
		color: rgb(238, 64, 54) !important;
	}
	.list-reset {
		display: none;
	}
	.single-box {
		padding: 15px 10px;
		position: relative;
		padding-bottom: 70px;
	}
	.single-left {
		display: block;
		width: auto;
		max-width: 100%;
		position: absolute;
		bottom: 0;
	}
	.single-left p {
		display: none;
	}
	.share-post {
		width: 100%;
		margin: 0;
		display: table;
	}
	.share-post h4 {
		margin: 0 0 10px 0;
		color: rgb(52, 64, 76);
	}
	.share-post a {
		margin: 0 10px 6px 0;
		color: rgb(238, 64, 54);
		border: 1px solid rgb(238, 64, 54);
	}
	.list-reset-old {
		display: none;
	}
	.single h1 {
		font-size: 18px !important;
		color: rgb(238, 64, 54);
		margin: 0 0 10px 0;
	}
	.entry h3,
	.entry h4 span strong {
		font-size: 18px !important;
		color: rgb(238, 64, 54);
		margin-bottom: 10px;
		line-height: 18px;
		font-weight: 400;
	}
	.entry h4 {
		margin: 0 0 10px 0;
		font-size: 18px !important;
		color: rgb(238, 64, 54);
		line-height: 18px;
		font-weight: 400;
	}
	.entry h4 span {
		color: rgb(238, 64, 54) !important;
	}
	.entry h2 {
		margin: 0 0 10px 0;
		font-size: 18px !important;
		color: rgb(238, 64, 54);
		line-height: 18px;
		font-weight: 400;
	}
	.entry h2 strong {
		font-weight: 400;
	}
	.entry h2 span {
		color: rgb(238, 64, 54) !important;
	}
	.entry h3 span {
		font-size: 18px !important;
		Color: rgb(238, 64, 54) !important;
	}
	.entry h3 span strong {
		font-weight: 400;
	}
	.single .entry p {
		font-size: 12px;
		font-weight: 400 !important;
		margin: 0 0 10px;
		color: rgb(52, 64, 76);
	}
	.single .entry p a strong {
		color: rgb(238, 64, 54) !important;
	}
	.single .entry p strong span {
		color: rgb(238, 64, 54) !important;
	}
	.wp-caption {
		margin-bottom: 10px;
	}
	.tags {
		display: none;
	}
	.tags+p {
		display: none;
	}
	.autor-excerpt-box {
		display: none;
	}
	.single-right {
		display: none;
	}
	.main-content-inner .navigation {
		margin: 0;
		display: none;
	}
	.related-post-box {
		display: none;
	}
	.content-commnets {
		padding: 10px;
		background: transparent;
	}
	.hentry {
		margin-bottom: 0;
	}
	.hentry h5 {
		font-size: 14px !important;
		
		font-weight: 700 !important;
	}
	.hentry hr {
		display: none;
	}
	#respond {
		margin: 0;
		padding: 0;
		border: none;
	}
	.comments-title {
		font-size: 18px !important;
		Color: rgb(238, 64, 54);
		margin-bottom: 10px;
	}
	.comment-form textarea {
		font-size: 12px !important;
		font-weight: 400 !important;
	}
	.btn-default {
		font-size: 14px !important;
		font-weight: 700 !important;
		background-color: rgb(238, 64, 54);
	}
	.btn-default:hover {
		background-color: rgb(238, 64, 54);
	}
	p strong,
	p strong a {
		color: rgb(52, 64, 76) !important;
	}
	.entry ul li {
		font-size: 12px;
		font-weight: 400 !important;
	}
	.entry ul li span {
		Color: rgb(52, 64, 76) !important;
	}
	.entry ul li span:first-child strong {
		color: rgb(238, 64, 54) !important;
	}
	.entry ul li strong:first-child span {
		color: rgb(238, 64, 54) !important;
	}
	.entry ul li strong,
	.entry ul li b {
		color: rgb(52, 64, 76);
	}
	p iframe {
		display: none;
	}
	.comment-form textarea {
		margin: 0 0 10px;
		padding: 10px;
		background: #fff;
		height: 120px;
	}
	.comment-form .text-field {
		height: 40px;
	}
	.content-fields-comments input,
	.content-fields-comments select {
		padding: 10px !important;
		font-size: 12px !important;
		font-weight: 400 !important;
		background: #fff !important;
		margin-bottom: 10px !important;
		line-height: inherit !important;
	}
	.item-post-grid-cat {
		display: none;
	}
	.mobhide {
		display: none;
	}
	blockquote p span,
	blockquote p span strong,
	blockquote h5 span {
		color: rgb(238, 64, 54) !important;
		font-weight: 400;
	}
	blockquote h2 {
		color: rgb(238, 64, 54) !important;
		font-weight: 400;
		font-size: 12px !important;
	}
	.comment-form p {
		font-size: 12px !important;
		font-weight: 400 !important;
		color: rgb(52, 64, 76);
	}
	.instagram-media {
		display: none !important;
	}
	.commentmetadata {
		margin: 4px 0 15px 43px;
	}
	.commentlist > li {
		padding-top: 10px;
	}
	.avatar {
		top: 35px;
	}
	.sumo-form-wrapper {
		display: none;
	}
	.item-post-grid-meta a {
		pointer-events: none;
	}
	.textareastyle {
			height: 100px !important;
	}
	.content-commnets label {
		font-size: 14px;
    color: #4a4a4a;
	}
	.content-commnets .ant-form-item {
		margin-bottom: 0;
		padding: 0 5px;
	}
	.content-commnets .comments-title {
		padding: 0 5px;
	}
	.content-commnets input {
		height: 40px;
	}
	.content-commnets button {
		background: #ef3d37;
    color: #fff;
    border: none;
    border-radius: 25px;
    margin: 0 auto;
    display: block;
    width: 150px;
    font-size: 16px;
    min-height: 32px;
	}
	.content-commnets .btn-block {
		display: inline-block;
    width: 100%;
    margin: 20px 0;
	}
}
@media only screen and (min-width: 321px) and (max-width: 375px) {
	body,
	.content {
		background: #F5F5F5 !important;
	}
	body {
		margin-top: 0 !important;
	}
	header {
		display: none !important;
	}
	.footer-blog.ant-layout-footer {
		display: none;
	}
	.archive-block-content-left {
		max-width: 220px;
		display: none;
	}
	.archive-block-content-right {
		width: 100%;
		max-width: 918px;
		display: table;
		margin: 0 auto;
	}
	.back-btn {
		display: none;
	}
	.content-inner {
		padding: 10px 0;
	}
	.smartbar-popup {
		display: none;
	}
	.archive-block-content-right .title-page {
		display: none;
	}
	.archive-block-content-right .title_latest {
		display: none;
	}
	.banner-full-width {
		display: none;
	}
	.contact-us-home {
		display: none;
	}
	.footer {
		display: none;
	}
	.archive .container-grid {
		margin: 0 !important;
	}
	.container-grid + .navigation {
		display: block !important;
	}
	.info-grid {
		padding: 20px;
	}
	.item-grid h3 {
		font-size: 18px !important;
		color: rgb(238, 64, 54);
	}
	.item-grid h3 a,
	.item-grid h3 a:hover {
		color: rgb(238, 64, 54);
	}
	.item-post-grid-autor {
		color: rgb(52, 64, 76);
	}
	.container-grid-single .item-post-grid-cat.fix-cat-size,
	.item-post-grid-cat {
		font-size: 14px !important;
		font-weight: 700 !important;
	}
	.container-grid-single .item-post-grid-excerpt p,
	.item-post-grid-excerpt p {
		font-size: 12px;
		font-weight: 400;
		color: rgb(52, 64, 76);
	}
	.item-post-grid-cat a {
		color: rgb(238, 64, 54) !important;
	}
	.item-post-grid-meta span {
		color: rgb(238, 64, 54) !important;
	}
	.item-post-grid-meta {
		font-size: 12px !important;
		font-weight: 400 !important;
	}
	.hfeed .inner {
		padding: 0 !important;
	}
	.author .item-grid-inner,
	.archive .item-grid-inner {
		margin: 0 10px !important;
		border-radius: 2px;
	}
	.item-grid {
		margin: 0 0 15px !important;
	}
	.navigation {
		margin: 0 !important;
	}
	.alignright,
	.alignleft {
		float: none !important;
		margin: 0 !important;
		text-align: center;
	}
	.navigation a {
		font-size: 14px !important;
		font-weight: 700 !important;
		color: rgb(238, 64, 54) !important;
	}
	.list-reset {
		display: none;
	}
	.single-box {
		padding: 15px 10px;
		position: relative;
		padding-bottom: 70px;
	}
	.single-left {
		display: block;
		width: auto;
		max-width: 100%;
		position: absolute;
		bottom: 0;
	}
	.single-left p {
		display: none;
	}
	.share-post {
		width: 100%;
		margin: 0;
		display: table;
	}
	.share-post h4 {
		margin: 0 0 10px 0;
		color: rgb(52, 64, 76);
	}
	.share-post a {
		margin: 0 10px 6px 0;
		color: rgb(238, 64, 54);
		border: 1px solid rgb(238, 64, 54);
	}
	.list-reset-old {
		display: none;
	}
	.single h1 {
		font-size: 18px !important;
		color: rgb(238, 64, 54);
		margin: 0 0 10px 0;
	}
	.entry h3,
	.entry h4 span strong {
		font-size: 18px !important;
		color: rgb(238, 64, 54);
		margin-bottom: 10px;
		line-height: 18px;
		font-weight: 400;
	}
	.entry h4 {
		margin: 0 0 10px 0;
		font-size: 18px !important;
		color: rgb(238, 64, 54);
		line-height: 18px;
		font-weight: 400;
	}
	.entry h4 span {
		color: rgb(238, 64, 54) !important;
	}
	.entry h2 {
		margin: 0 0 10px 0;
		font-size: 18px !important;
		color: rgb(238, 64, 54);
		line-height: 18px;
		font-weight: 400;
	}
	.entry h2 strong {
		font-weight: 400;
	}
	.entry h2 span {
		color: rgb(238, 64, 54) !important;
	}
	.entry h3 span {
		font-size: 18px !important;
		Color: rgb(238, 64, 54) !important;
	}
	.entry h3 span strong {
		font-weight: 400;
	}
	.single .entry p {
		font-size: 12px;
		font-weight: 400 !important;
		margin: 0 0 10px;
		color: rgb(52, 64, 76);
	}
	.single .entry p a strong {
		color: rgb(238, 64, 54) !important;
	}
	.single .entry p strong span {
		color: rgb(238, 64, 54) !important;
	}
	.wp-caption {
		margin-bottom: 10px;
	}
	.tags {
		display: none;
	}
	.tags+p {
		display: none;
	}
	.autor-excerpt-box {
		display: none;
	}
	.single-right {
		display: none;
	}
	.main-content-inner .navigation {
		margin: 0;
		display: none;
	}
	.related-post-box {
		display: none;
	}
	.content-commnets {
		padding: 10px;
		background: transparent;
	}
	.hentry {
		margin-bottom: 0;
	}
	.hentry h5 {
		font-size: 14px !important;
		
		font-weight: 700 !important;
	}
	.hentry hr {
		display: none;
	}
	#respond {
		margin: 0;
		padding: 0;
		border: none;
	}
	.comments-title {
		font-size: 18px !important;
		Color: rgb(238, 64, 54);
		margin-bottom: 10px;
	}
	.comment-form textarea {
		font-size: 12px !important;
		font-weight: 400 !important;
	}
	.btn-default {
		font-size: 14px !important;
		font-weight: 700 !important;
		background-color: rgb(238, 64, 54);
	}
	.btn-default:hover {
		background-color: rgb(238, 64, 54);
	}
	p strong,
	p strong a {
		color: rgb(52, 64, 76) !important;
	}
	.entry ul li {
		font-size: 12px;
		
		font-weight: 400 !important;
	}
	.entry ul li span {
		Color: rgb(52, 64, 76) !important;
	}
	.entry ul li span:first-child strong {
		color: rgb(238, 64, 54) !important;
	}
	.entry ul li strong:first-child span {
		color: rgb(238, 64, 54) !important;
	}
	.entry ul li strong,
	.entry ul li b {
		color: rgb(52, 64, 76);
	}
	p iframe {
		display: none;
	}
	.comment-form textarea {
		margin: 0 0 10px;
		padding: 10px;
		background: #fff;
		height: 120px;
	}
	.comment-form .text-field {
		height: 40px;
	}
	.content-fields-comments input,
	.content-fields-comments select {
		padding: 10px !important;
		font-size: 12px !important;
		font-weight: 400 !important;
		background: #fff !important;
		margin-bottom: 10px !important;
		line-height: inherit !important;
	}
	.item-post-grid-cat {
		display: none;
	}
	.mobhide {
		display: none;
	}
	blockquote p span,
	blockquote p span strong,
	blockquote h5 span {
		color: rgb(238, 64, 54) !important;
		font-weight: 400;
	}
	blockquote h2 {
		color: rgb(238, 64, 54) !important;
		font-weight: 400;
		font-size: 12px !important;
	}
	.comment-form p {
		font-size: 12px !important;
		font-weight: 400 !important;
		color: rgb(52, 64, 76);
	}
	.instagram-media {
		display: none !important;
	}
	.commentmetadata {
		margin: 4px 0 15px 43px;
	}
	.commentlist > li {
		padding-top: 10px;
	}
	.avatar {
		top: 35px;
	}
	.sumo-form-wrapper {
		display: none;
	}
	.item-post-grid-meta a {
		pointer-events: none;
	}
	.textareastyle {
			height: 100px !important;
	}
	.content-commnets label {
		font-size: 14px;
    color: #4a4a4a;
	}
	.content-commnets .ant-form-item {
		margin-bottom: 0;
		padding: 0 5px;
	}
	.content-commnets .comments-title {
		padding: 0 5px;
	}
	.content-commnets input {
		height: 40px;
	}
	.content-commnets button {
		background: #ef3d37;
    color: #fff;
    border: none;
    border-radius: 25px;
    margin: 0 auto;
    display: block;
    width: 150px;
    font-size: 16px;
    min-height: 32px;
	}
	.content-commnets .btn-block {
		display: inline-block;
    width: 100%;
    margin: 20px 0;
	}
}
@media only screen and (max-width: 320px) {
	body,
	.content {
		background: #F5F5F5 !important;
	}
	body {
		margin-top: 0 !important;
	}
	header {
		display: none !important;
	}
	.footer-blog.ant-layout-footer {
		display: none;
	}
	.archive-block-content-left {
		max-width: 220px;
		display: none;
	}
	.archive-block-content-right {
		width: 100%;
		max-width: 918px;
		display: table;
		margin: 0 auto;
	}
	.back-btn {
		display: none;
	}
	.content-inner {
		padding: 10px 0;
	}
	.smartbar-popup {
		display: none;
	}
	.archive-block-content-right .title-page {
		display: none;
	}
	.archive-block-content-right .title_latest {
		display: none;
	}
	.banner-full-width {
		display: none;
	}
	.contact-us-home {
		display: none;
	}
	.footer {
		display: none;
	}
	.archive .container-grid {
		margin: 0 !important;
	}
	.container-grid + .navigation {
		display: block !important;
	}
	.info-grid {
		padding: 20px;
	}
	.item-grid h3 {
		font-size: 18px !important;
		color: rgb(238, 64, 54);
	}
	.item-grid h3 a,
	.item-grid h3 a:hover {
		color: rgb(238, 64, 54);
	}
	.item-post-grid-autor {
		color: rgb(52, 64, 76);
	}
	.container-grid-single .item-post-grid-cat.fix-cat-size,
	.item-post-grid-cat {
		font-size: 14px !important;
		font-weight: 700 !important;
	}
	.container-grid-single .item-post-grid-excerpt p,
	.item-post-grid-excerpt p {
		font-size: 12px;
		font-weight: 400;
		color: rgb(52, 64, 76);
	}
	.item-post-grid-cat a {
		color: rgb(238, 64, 54) !important;
	}
	.item-post-grid-meta span {
		color: rgb(238, 64, 54) !important;
	}
	.item-post-grid-meta {
		font-size: 12px !important;
		font-weight: 400 !important;
	}
	.hfeed .inner {
		padding: 0 !important;
	}
	.author .item-grid-inner,
	.archive .item-grid-inner {
		margin: 0 10px !important;
		border-radius: 2px;
	}
	.item-grid {
		margin: 0 0 15px !important;
	}
	.navigation {
		margin: 0 !important;
	}
	.alignright,
	.alignleft {
		float: none !important;
		margin: 0 !important;
		text-align: center;
	}
	.navigation a {
		font-size: 14px !important;
		font-weight: 700 !important;
		color: rgb(238, 64, 54) !important;
	}
	.list-reset {
		display: none;
	}
	.single-box {
		padding: 15px 10px;
		position: relative;
		padding-bottom: 70px;
	}
	.single-left {
		display: block;
		width: auto;
		max-width: 100%;
		position: absolute;
		bottom: 0;
	}
	.single-left p {
		display: none;
	}
	.share-post {
		width: 100%;
		margin: 0;
		display: table;
	}
	.share-post h4 {
		margin: 0 0 10px 0;
		color: rgb(52, 64, 76);
	}
	.share-post a {
		margin: 0 10px 6px 0;
		color: rgb(238, 64, 54);
		border: 1px solid rgb(238, 64, 54);
	}
	.list-reset-old {
		display: none;
	}
	.single h1 {
		font-size: 18px !important;
		color: rgb(238, 64, 54);
		margin: 0 0 10px 0;
	}
	.entry h3,
	.entry h4 span strong {
		font-size: 18px !important;
		color: rgb(238, 64, 54);
		margin-bottom: 10px;
		line-height: 18px;
		font-weight: 400;
	}
	.entry h4 {
		margin: 0 0 10px 0;
		font-size: 18px !important;
		color: rgb(238, 64, 54);
		line-height: 18px;
		font-weight: 400;
	}
	.entry h4 span {
		color: rgb(238, 64, 54) !important;
	}
	.entry h2 {
		margin: 0 0 10px 0;
		font-size: 18px !important;
		color: rgb(238, 64, 54);
		line-height: 18px;
		font-weight: 400;
	}
	.entry h2 strong {
		font-weight: 400;
	}
	.entry h2 span {
		color: rgb(238, 64, 54) !important;
	}
	.entry h3 span {
		font-size: 18px !important;
		Color: rgb(238, 64, 54) !important;
	}
	.entry h3 span strong {
		font-weight: 400;
	}
	.single .entry p {
		font-size: 12px;
		font-weight: 400 !important;
		margin: 0 0 10px;
		color: rgb(52, 64, 76);
	}
	.single .entry p a strong {
		color: rgb(238, 64, 54) !important;
	}
	.single .entry p strong span {
		color: rgb(238, 64, 54) !important;
	}
	.wp-caption {
		margin-bottom: 10px;
	}
	.tags {
		display: none;
	}
	.tags+p {
		display: none;
	}
	.autor-excerpt-box {
		display: none;
	}
	.single-right {
		display: none;
	}
	.main-content-inner .navigation {
		margin: 0;
		display: none;
	}
	.related-post-box {
		display: none;
	}
	.content-commnets {
		padding: 10px;
		background: transparent;
	}
	.hentry {
		margin-bottom: 0;
	}
	.hentry h5 {
		font-size: 14px !important;
		font-weight: 700 !important;
	}
	.hentry hr {
		display: none;
	}
	#respond {
		margin: 0;
		padding: 0;
		border: none;
	}
	.comments-title {
		font-size: 18px !important;
		Color: rgb(238, 64, 54);
		margin-bottom: 10px;
	}
	.comment-form textarea {
		font-size: 12px !important;
		font-weight: 400 !important;
	}
	.btn-default {
		font-size: 14px !important;
		font-weight: 700 !important;
		background-color: rgb(238, 64, 54);
	}
	.btn-default:hover {
		background-color: rgb(238, 64, 54);
	}
	p strong,
	p strong a {
		color: rgb(52, 64, 76) !important;
	}
	.entry ul li {
		font-size: 12px;
		font-weight: 400 !important;
	}
	.entry ul li span {
		Color: rgb(52, 64, 76) !important;
	}
	.entry ul li span:first-child strong {
		color: rgb(238, 64, 54) !important;
	}
	.entry ul li strong:first-child span {
		color: rgb(238, 64, 54) !important;
	}
	.entry ul li strong,
	.entry ul li b {
		color: rgb(52, 64, 76);
	}
	p iframe {
		display: none;
	}
	.comment-form textarea {
		margin: 0 0 10px;
		padding: 10px;
		background: #fff;
		height: 120px;
	}
	.comment-form .text-field {
		height: 40px;
	}
	.content-fields-comments input,
	.content-fields-comments select {
		padding: 10px !important;
		font-size: 12px !important;
		font-weight: 400 !important;
		background: #fff !important;
		margin-bottom: 10px !important;
		line-height: inherit !important;
	}
	.item-post-grid-cat {
		display: none;
	}
	.mobhide {
		display: none;
	}
	blockquote p span,
	blockquote p span strong,
	blockquote h5 span {
		color: rgb(238, 64, 54) !important;
		font-weight: 400;
	}
	blockquote h2 {
		color: rgb(238, 64, 54) !important;
		font-weight: 400;
		font-size: 12px !important;
	}
	.comment-form p {
		font-size: 12px !important;
		font-weight: 400 !important;
		color: rgb(52, 64, 76);
	}
	.instagram-media {
		display: none !important;
	}
	.commentmetadata {
		margin: 4px 0 15px 43px;
	}
	.commentlist > li {
		padding-top: 10px;
	}
	.avatar {
		top: 35px;
	}
	.sumo-form-wrapper {
		display: none;
	}
	.item-post-grid-meta a {
		pointer-events: none;
	}
	.textareastyle {
			height: 100px !important;
	}
	.content-commnets label {
		font-size: 14px;
    color: #4a4a4a;
	}
	.content-commnets .ant-form-item {
		margin-bottom: 0;
		padding: 0 5px;
	}
	.content-commnets .comments-title {
		padding: 0 5px;
	}
	.content-commnets input {
		height: 40px;
	}
	.content-commnets button {
		background: #ef3d37;
    color: #fff;
    border: none;
    border-radius: 25px;
    margin: 0 auto;
    display: block;
    width: 150px;
    font-size: 16px;
    min-height: 32px;
	}
	.content-commnets .btn-block {
		display: inline-block;
    width: 100%;
    margin: 20px 0;
	}
}
@media only screen and (min-width: 416px) and (max-width: 8000px) {
	.archive-block-content-left {
		max-width: 220px;
		display: block;
	}
	body,
	.content {
		background: #ffffff !important;
	}
	.archive-block-content-right {
		width: 72%;
		max-width: 918px;
		display: table;
		margin: 0 auto;
	}
	.list-reset-old {
		display: none;
	}
	.popular-pp {
		display: none!important;
	}
	.single-middle {
		width: 70%;
		//max-width: 100%;
		// display: table;
		margin: 0 auto;
	}
	.single-left {
		display: block;
		width: 15%;
		max-width: 166px;
		position: absolute;
		top: 0;
	}
	.single-left p {
		display: block;
	}
	.share-post a {
		display: block;
	}
	.content-commnets-inner {
		width: 70%;
		max-width: 700px;
		margin: 0 auto;
	}
	h2.title-page {
		font-size: 36px !important;
		color: rgb(238, 64, 54);
		margin: 5px 0 10px 0;
	}
	.single .entry p {
		font-size: 16px!important;
	}
	.entry ul li {
		font-size: 16px!important;
	}
	.container-grid-single .item-post-grid-excerpt p,
	.item-post-grid-excerpt p {
		font-size: 14px;
	}
	.archive-block-content-right .title-page {
		display: block;
	}
	.navigation {
		margin: 0 !important;
	}
	.navigation a {
		font-size: 14px !important;
		font-weight: 700 !important;
		color: rgb(238, 64, 54) !important;
	}
	.single h1 {
		font-size: 36px !important;
		color: rgb(238, 64, 54);
		margin: 5px 0 10px 0;
	}
	.footer-blog {
		display: -ms-flexbox;
		display: flex;
		-ms-flex-direction: column;
		flex-direction: column;
		-ms-flex-pack: center;
		justify-content: center;
		background-color: #000;
		width: 100%;
	}
	.ant-layout-footer {
		padding: 24px 50px;
		font-size: 12px;
	}
	.ant-layout-footer,
	.ant-layout-header {
		-ms-flex: 0 0 auto;
		flex: 0 0 auto;
	}
	.footer-blog img {
		-ms-flex-item-align: center;
		-ms-grid-row-align: center;
		align-self: center;
		max-width: 100%;
		margin-bottom: 20px;
	}
	.footer-blog .social {
		display: -ms-flexbox;
		display: flex;
		-ms-flex-pack: justify;
		justify-content: space-between;
		max-width: 300px;
		width: 100%;
		margin: 0 auto;
	}
	.social a {
		font-family: Montserrat, sans-serif;
		color: #f7efdf;
		font-size: 14px;
	}
	.content-inner {
		padding: 50px 0 0 0;
	}
	iframe html {
		background-color: rgb(0, 0, 0);
	}
	.footer-blog .social a.facebook,
	.footer-blog .social a.twitter {
		width: 20px;
		height: 20px;
		background-color: red;
		background: url('https://vinoapp.co/facebook.svg') no-repeat center;
		background-size: cover;
	}
	.footer-blog .social a.twitter {
		background: url('https://vinoapp.co/twitter.svg') no-repeat center;
		background-size: cover;
	}
	.alignright {
		float: right!important;
		margin: 0 0 1em 1em!important;
	}
	.alignleft {
		float: left!important;
		margin: 0 1em 1em 0!important;
	}
	.single-box {
		padding-bottom: 20px;
		margin-top: 50px;
		padding-top: 0;
	}
	.footer-blog.ant-layout-footer {
		display: flex;
	}
	.back-btn a {
		color: rgb(238, 64, 54);
		font-weight: bold;
		font-size: 16px;
	}
	.back-btn {
		display: block;
	}
	.list-reset {
		margin-left: 40px;
	}
	.textareastyle {
			height: 100px !important;
	}
	.content-commnets label {
		font-size: 14px;
    color: #4a4a4a;
	}
	.content-commnets .ant-form-item {
		margin-bottom: 0;
		padding: 0 5px;
	}
	.content-commnets .comments-title {
		padding: 0 5px;
	}
	.content-commnets input {
		height: 40px;
	}
	.content-commnets button {
		background: #ef3d37;
    color: #fff;
    border: none;
    border-radius: 25px;
    margin: 0 auto;
    display: block;
    width: 150px;
    font-size: 16px;
    min-height: 32px;
	}
	.content-commnets .btn-block {
		display: inline-block;
    width: 100%;
    margin: 20px 0;
	}.textareastyle {
			height: 100px !important;
	}
	.content-commnets label {
		font-size: 14px;
    color: #4a4a4a;
	}
	.content-commnets .ant-form-item {
		margin-bottom: 0;
		padding: 0 5px;
	}
	.content-commnets .comments-title {
		padding: 0 5px;
	}
	.content-commnets input {
		height: 40px;
	}
	.content-commnets button {
		background: #ef3d37;
    color: #fff;
    border: none;
    border-radius: 25px;
    margin: 0 auto;
    display: block;
    width: 150px;
    font-size: 16px;
    min-height: 32px;
	}
	.content-commnets .btn-block {
		display: inline-block;
    width: 100%;
    margin: 20px 0;
	}
}
`
