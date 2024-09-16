<template>
    <body>
        <div class="slider-box">
            <h3 class="question"> {{ title }} </h3>
            <div class="range-slider-box">
                <p class="min">1</p>
                <input type="range" min="0" max="10" v-model="sliderValue" class="slider" :disabled="isDisabled">
                <p class="max">10</p>
            </div>
            <div class="text">
                <h2> {{ min }} </h2>
                <h2> {{ mid }} </h2>
                <h2> {{ max }} </h2>
            </div>
            <button @click="toggleDisable">Done</button>
        </div>
    </body>
</template>
  
<script>
export default {
	data() 
	{
		return {
			sliderValue: 5,
			isDisabled: false
		};
	},
	methods:
	{
		// Disables the slider
		toggleDisable(){
			this.isDisabled = true;
		} 
	},
	props:{
		title:{
			type: String,
			default: ""
		},
		min:{
			type: String,
			default: ""
		},
		max:{
			type: String,
			default: ""
		},
		mid:{
			type: String,
			default: ""
		}
	}
}
</script>
	
<style scoped lang="scss">
@use "~/assets/scss/slider.scss";
</style>
