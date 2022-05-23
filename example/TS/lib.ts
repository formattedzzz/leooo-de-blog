export const run2 = (...x: any): void => {
  console.log(globalThis)
  const arr = Array.from(x)
  console.log(Object.entries(arr))
}

run2('bob', 2, true, Symbol('h'))
