// import md from './read.md'

// console.log(md)
import('./read.md').then((res) => {
  console.log(res)
})

export default {
  add: (a, b) => {
    return a + b
  }
}
window.process = process
document.write('123')