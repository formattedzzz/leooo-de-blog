var now = +new Date();
while (+new Date() - now < 1000) {}
console.log('lib');
module.exports = function() {
  console.log(123);
};
