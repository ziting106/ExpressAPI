"use strict";
let regExp = /ab+c/;
let match = regExp.exec('abcabc');
if (match) {
    console.log(`Match found: ${match[0]}`);
}
