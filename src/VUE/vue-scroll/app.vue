<template>
  <div></div>
</template>
<script>
var mockdata = new Array(100).fill(1).map((v, k) => {
  return {
    id: k + 1,
    name: `name-${Math.random()
      .toString(36)
      .slice(8)}`
  }
})

export default {
  name: '',
  data() {
    return {
      mockdata
    }
  },
  computed: {},
  methods: {},
  components: {}
}
</script>
<style scoped>
</style>
