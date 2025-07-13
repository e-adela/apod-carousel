<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { DateTime } from 'luxon';
import type { iAPOD } from './types';
import ImageViewer from './components/image-viewer.vue';
import ImageSelector from './components/image-selector.vue';

const slides = ref<iAPOD[]>([]);

const isLoading = ref(true);
const currImg = ref<iAPOD | undefined>(
	!isLoading.value ? slides.value[0] : undefined
);
function viewImgDetails(img: iAPOD) {
	currImg.value = img;
}

onMounted(async () => {
	const today = DateTime.now();
	const startDate = today.minus({ days: 14 }).toFormat('yyyy-LL-dd');
	const endDate = today.toFormat('yyyy-LL-dd');
	const url = `https://api.nasa.gov/planetary/apod?api_key=Vbqlnspscue9Cp7GzCsS5Luwj3b9M9tKA8bhk51b&start_date=${startDate}&end_date=${endDate}`;
	try {
		const apods = await fetch(url);
		if (!apods) throw 'empty apods returned';
		let res = (await apods.json()) as iAPOD[];
		if (!res) throw 'empty json res returned';
		res = res
			.filter((r) => {
				r.src = r.url || r.hdurl;
				r.alt = r.explanation;
				return r.media_type === 'image';
			})
			.reverse();
		slides.value = res;
		currImg.value = res[0];
	} catch (error) {
		console.log('api call error', error);
	} finally {
		isLoading.value = false;
	}
});
</script>

<template>
	<main class="apod" :class="{ '--loading': isLoading }">
		<ImageSelector @select="viewImgDetails" :apod-slides="slides" />
		<ImageViewer :selected-img="currImg" />
	</main>
</template>
