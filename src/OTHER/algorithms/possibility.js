const ballList = [
  { id: 1, ok: true },
  { id: 2, ok: false },
  { id: 3, ok: false },
  { id: 4, ok: false }
]
const res = { A: 0, B: 0, C: 0, D: 0 }
// 第一次选择
for (let select_1 = 1; select_1 <= ballList.length; select_1++) {
  // 第一次选完剩下的
  const select_1_LeftBalls = ballList.filter(
    b => b.id !== select_1 && b.ok !== true
  )
  // 第一次排除
  for (let exclude_1 = 0; exclude_1 < select_1_LeftBalls.length; exclude_1++) {
    // 第一次排除剩下可供选择的
    const exclude_1_leftBalls = ballList.filter(
      v => v.id !== select_1_LeftBalls[exclude_1].id
    )
    // 第二次选择
    exclude_1_leftBalls.forEach(ball => {
      // 第二次选完剩下可以排除的
      const select_2_LeftBalls = exclude_1_leftBalls.filter(
        v => v.id !== ball.id && v.ok !== true
      )
      // 第二次排除
      select_2_LeftBalls.forEach(ball2 => {
        // 第二次排除剩下可供选择的
        const exclude_2_leftBalls = exclude_1_leftBalls.filter(
          v => v.id !== ball2.id
        )
        exclude_2_leftBalls.forEach(ball3 => {
          console.log(`
            第一次选择id=${select_1}
            第一次排除id=${select_1_LeftBalls[exclude_1].id}
            第二次选择id=${ball.id}
            第二次排除id=${ball2.id}
            第三次选择id=${ball3.id}
          `)
          if (select_1 === ball.id && ball.id === ball3.id) res.A++
          if (select_1 === ball.id && ball.id !== ball3.id) res.B++
          if (select_1 !== ball.id && ball.id === ball3.id) res.C++
          if (select_1 !== ball.id && ball.id !== ball3.id) res.D++
        })
      })
    })
  }
}
console.log(JSON.stringify(res, null, 2))

// 枚举法
