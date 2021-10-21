module.exports = function(content, map, meta) {
  console.log(content)
  console.log('meta', meta)
  return `export default [{label: 'h1', content: 'nihao!'},{label: 'h2', content: 'haiixngba!'}]`
}
