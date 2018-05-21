<template>
	<div id="app">
		<p>i am father</p>
		<son></son>
	</div>
</template>
<script>
import son from './components/son.vue'
	export default{
		name:'app',
		components:{
			son
		},
		methods:{
			promise(name){
				return "hello vue "+ name
			},
			hello(){
				console.log(()=>{
					return "hello vue"
				})
			}
		},
		mounted(){
			this.hello();
		}
	}
</script>
<style>
#app{
	color: #ff0000;
}
</style>