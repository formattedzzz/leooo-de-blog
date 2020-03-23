aaa = 'leo';
console.log(aaa);
var fun = function (val) {
    return {
        val: val
    };
};
console.log(fun('leo'));
function test(para) {
    return {
        key1: para.age,
        key2: para.name
    };
}
console.log(test({
    name: 'xiaoyue',
    age: 22
}));
var arr = ['', 2, []];
