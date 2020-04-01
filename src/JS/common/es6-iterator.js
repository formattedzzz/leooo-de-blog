var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
arr.forEach((v, i, a) => {
  if (v > 3) {
    // console.log(a === arr);
    a.splice(i);
    console.log(a);
    return;
  }
  console.log(v, i);
});
