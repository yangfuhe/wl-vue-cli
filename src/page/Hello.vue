<template>
  <div id="app">
   
 
  <el-button type="primary">主要按钮</el-button>
  这是一个示例{{name}}

  </div>
</template>

<script>
 import {
        mapGetters
    } from 'vuex'
export default {
  computed: {
     data(){
        return{
          name:""
        }
     },
			...mapGetters([
				'name'
			])
		},
		mounted() {
			this.$store.dispatch('setName',{name:"页面"});
		}
}
</script>
<!-- 加入scoped不会影响其他页面 -->
<style scoped>
#id{
  width: 100px;
}
</style>
