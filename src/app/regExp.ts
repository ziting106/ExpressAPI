let regExp: RegExp = /ab+c/;
// exec() 方法用於執行搜索匹配，返回一個結果陣列或 null。
let match = regExp.exec('abcabc');
if (match) {
  console.log(`Match found: ${match[0]}`); // Match found: abc
}
