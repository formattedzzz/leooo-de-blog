# js 实现复数类

```js
function Complex(R, I) {
  if (isNaN(R) || isNaN(I)) {
    throw new TypeError('Complex params require Number')
  }
  this.r = R
  this.i = I
}
// 加法
Complex.prototype.add = function(that) {
  return new Complex(this.r + that.r, this.i + that.i)
}
// 负运算
Complex.prototype.neg = function() {
  return new Complex(-this.r, -this.i)
}
// 乘法
Complex.prototype.multiply = function(that) {
  if (this.r === that.r && this.i + that.i === 0) {
    return this.r * this.r + this.i * this.i
  }
  return new Complex(
    this.r * that.r - this.i * that.i,
    this.r * that.i + this.i * that.r
  )
}
// 除法
Complex.prototype.divide = function(that) {
  var a = this.r
  var b = this.i
  var c = that.r
  var d = that.i
  return new Complex(
    (a * c + b * d) / (c * c + d * d),
    (b * c - a * d) / (c * c + d * d)
  )
}
// 模长
Complex.prototype.mo = function() {
  return Math.sqrt(this.r * this.r + this.i * this.i)
}
Complex.prototype.toString = function() {
  return '{' + this.r + ',' + this.i + '}'
}
// 判断两个复数相等
Complex.prototype.equal = function(that) {
  return (
    that !== null &&
    that.constructor === Complex &&
    this.r === that.r &&
    this.i === that.i
  )
}
// 加入三个静态属性 返回常用的Complex
Complex.ZERO = new Complex(0, 0)
Complex.ONE = new Complex(1, 0)
Complex.I = new Complex(0, 1)
// 从普通字符串解析为复数
Complex.parse = function(s) {
  try {
    var execres = Complex.parseRegExp.exec(s)
    return new Complex(parseFloat(execres[1]), parseFloat(execres[2]))
  } catch (e) {
    throw new TypeError("Can't parse '" + s + "'to a complex")
  }
}
Complex.parseRegExp = /^\{([\d\s]+[^,]*),([\d\s]+[^}]*)\}$/
// console.log(/^\{([\d\s]+[^,]*),([\d\s]+[^}]*)\}$/.exec('{2,3}'));
```

测试

```js
// 示例代码
var c = new Complex(2, 3)
var d = new Complex(2, 5)

console.log(c.add(d).toString())
console.log(
  Complex.parse(c.toString())
    .add(c.neg())
    .equal(Complex.ZERO)
)
console.log(c.divide(d).toString(), Complex.parse('{2h, 09d}').mo())

// 共轭复数 得出的结果是普通实数了
console.log(new Complex(2, 3).multiply(new Complex(2, -3)))
```
