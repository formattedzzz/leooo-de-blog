export default React.createClass({
  getInitialState() {
    return { num: this.getRandomNumber() }
  },

  getRandomNumber() {
    return Math.ceil(Math.random() * 6)
  },

  render() {
    return (
      <div>
        Your dice roll:
        {this.state.num}
      </div>
    )
  }
})
