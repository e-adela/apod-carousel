<script setup lang="ts">
import { Carousel } from 'carousel-vue3-ts';
import { computed } from 'vue';
import type { iAPOD } from '~/types';

const emit = defineEmits(['select']);

const props = defineProps<{
	apodSlides: iAPOD[];
}>();

const slides = computed<iAPOD[]>(() =>
	props.apodSlides?.length
		? props.apodSlides
		: Array.from({ length: 20 }, () => {
				return { src: '' } as iAPOD;
		  })
);

const breakpoints = [
	{
		size: 1900,
		itemsToShow: 8,
	},
	{
		size: 1800,
		itemsToShow: 7,
	},
	{
		size: 1500,
		itemsToShow: 6,
	},
	{
		size: 1300,
		itemsToShow: 5,
	},
	{
		size: 1100,
		itemsToShow: 4,
	},
	{
		size: 1000,
		itemsToShow: 5,
	},
	{
		size: 900,
		itemsToShow: 4,
	},
	{
		size: 800,
		itemsToShow: 5,
	},
	{
		size: 700,
		itemsToShow: 4,
	},
	{
		size: 300,
		itemsToShow: 3,
	},
	{
		size: 0,
		itemsToShow: 2,
	},
];

function viewImgDetails(img: iAPOD) {
	emit('select', img);
}
</script>
<template>
	<section class="apod__carousel">
		<Carousel
			:slides-array="slides"
			:transition-speed="1"
			:auto-slide="false"
			:items-to-show="4"
			:breakpoints="breakpoints"
			slide-container-class="apod-carousel__slide-container"
			next-btn-class="slide-btn --next"
			prev-btn-class="slide-btn --prev"
			@img-clicked="viewImgDetails"
		>
			<template #slide="slide">
				<img v-if="slide?.src" :src="slide.src" class="apod-carousel__slide" />
				<div v-else class="apod-carousel__slide placeholder" />
			</template>
			<template #prev>
				<svg
					class="__icon"
					id="Layer_1"
					xmlns="http://www.w3.org/2000/svg"
					version="1.1"
					viewBox="0 0 15.6 24"
				>
					<path
						fill="currentColor"
						d="M4.3,12L12.8,3.3c.3-.3.3-.8,0-1.1-.3-.3-.8-.3-1.1,0,0,0,0,0,0,0L2.7,11.5c-.3.3-.3.8,0,1l9,9.2c.3.3.8.3,1.1,0,.3-.3.3-.8,0-1.1,0,0,0,0,0,0L4.3,12Z"
					/>
				</svg>
			</template>
			<template #next>
				<svg
					class="__icon --reversed"
					id="Layer_1"
					xmlns="http://www.w3.org/2000/svg"
					version="1.1"
					viewBox="0 0 15.6 24"
				>
					<path
						fill="currentColor"
						d="M4.3,12L12.8,3.3c.3-.3.3-.8,0-1.1-.3-.3-.8-.3-1.1,0,0,0,0,0,0,0L2.7,11.5c-.3.3-.3.8,0,1l9,9.2c.3.3.8.3,1.1,0,.3-.3.3-.8,0-1.1,0,0,0,0,0,0L4.3,12Z"
					/>
				</svg>
			</template>
		</Carousel>
	</section>
</template>
