const {
  add,
  throwError,
  fetchData,
  fetchResolved,
  fetchCatched
} = require('./index')

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3)
})

/**
 * @description之匹配器
 */
test('test operator', () => {
  // expect('abc').toBeFalsy()
  expect([]).toBeTruthy()
  // expect(null).not.toBeNull()
  expect(null).toBeDefined()
  expect([1, 2, 3]).toContain(1)
})

test('test throw', () => {
  expect(throwError).toThrow(/leo/)
})

/**
 * @description之异步回调
 */
// 反面示例 怎么测都是对的 因为测试执行完fetchData就算是测试通过了
// test('the fetch data is leooo', () => {
//   function cb(data) {
//     expect(data).toEqual('')
//   }
//   fetchData(cb)
// })

// 这样才是对的 cb函数是异步执行 只有done执行完了才算是测试完成
// 但是要保证done能够执行 这里cb函数有可能不执行
test('the fetch data is leooo', done => {
  function cb(data) {
    expect(data).toEqual({ name: 'pop' })
    done()
  }
  fetchData(cb)
})

/**
 * @description之Promise
 */
// 那我不想用done怎么办呢
// 我们可以让它在expect执行完拿到promise对象 注意一定要return
test('test promise struct NO.1', () => {
  return expect(fetchCatched()).rejects.toEqual({ message: 'error' })
})
test('test promise struct NO.2', () => {
  // 测试catch的情况需要先申明
  expect.assertions(1)
  return fetchCatched().catch(err => {
    expect(err).toEqual({ message: 'error' })
  })
})

// 这样必然失败 因为你断定它会resolve
// test('the fetchData is catched', () => {
//   return expect(fetchCatched()).resolves.toEqual({ message: 'success' })
// })

/**
 * @description之async及await函数
 */

test('test async/await func', async () => {
  const res = await fetchResolved()
  expect(res).toEqual({
    name: 'leooo',
    age: 23
  })
})

/**
 * @description之Setup及Teardown
 */
beforeAll(() => console.log('1 - beforeAll'))
afterAll(() => console.log('1 - afterAll'))
