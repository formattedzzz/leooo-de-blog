let obj1: object = {
  name: 'xiaolin',
  age: 22
};
let obj2: object = {
  name: 'xiaoyue',
  age: 24
};
export {obj1};
export {obj2};
export interface abc {
  name: string
};
export default function func(s: string): string {
  return s.substr(0, 4);
};
// export default {
//   obj,
//   abc
// };