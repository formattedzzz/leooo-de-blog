<template>
  <div class="page-demo" @click="count++">
    <span>count:{{count}}</span>
    <button>{{count**2}}</button>
  </div>
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