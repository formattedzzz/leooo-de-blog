<template>
  <div>
    <span class="span">{{name}}</span>
    <div class="div">{{conf}}</div>
  </div>
</template>
<script>
import { conf } from "./lib";
import Vue from "vue";
console.log(Vue.version);
console.log(123);
export default {
  name: "",
  data() {
    return {
      name: "leooo",
      age: 23,
      arr: [1, 2, 3, 4],
      conf
    };
  },
  computed: {},
  methods: {},
  components: {}
};
</script>
<style scoped>
.span {
  background: #555;
  color: #fff;
}
.div {
  background: #fff;
  color: #555;
  padding: 20px;
}
</style>
