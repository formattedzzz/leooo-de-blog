<template>
  <div class="page-demo" @click="count++">男男女女说{{count}}</div>
</template>
<script>
export default {
  name: 'PageDemo',
  components: {},
  data() {
    return {
      count: 0
    }
  },
  computed: {},
  mounted() {
    console.log('mounted')
  },
  methods: {}
}
</script>

<style>
.page-demo {
  position: relative;
  color: #f33;
}
</style>