document.querySelector('#error').addEventListener(
  'click',
  () => {
    throw new Error('oooh my god')
  },
  true
)

document.querySelector('#reject').addEventListener(
  'click',
  () => {
    fetch('https://a.com')
  },
  false
)
