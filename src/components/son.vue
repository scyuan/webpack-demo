<template>
	<div id="son">
		<p>i am son</p>
		<sonson></sonson>
	</div>
</template>
<script>
import sonson from './sonson.vue'
	export default{
		name:'son',
		components:{
			sonson
		}
	}
</script>
<style scoped>
#son{
	font-size: 40px;
}
</style>