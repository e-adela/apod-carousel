<script setup lang="ts">
import type { iAPOD } from '~/types';
import { ref } from 'vue';
const props = defineProps<{
	selectedImg?: iAPOD;
}>();

function onOutsideClick(e: Event) {
	const target = e.target as HTMLElement;
	if (target.id === imgModal.value?.id) {
		hideModal();
	}
}

const imgModal = ref<HTMLDialogElement>();
function showModal() {
	imgModal.value?.showModal();
}
function hideModal() {
	imgModal.value?.close();
}
</script>
<template>
	<section class="apod__viewer">
		<figure class="apod__img-wrapper">
			<img
				v-if="selectedImg"
				class="apod__img"
				:src="selectedImg.src"
				:alt="selectedImg.title"
				@click="showModal"
			/>
			<div v-else class="apod__img placeholder" />
		</figure>
		<figure class="apod__desc-wrapper">
			<h1 v-if="props.selectedImg?.title" class="apod__title">
				{{ props.selectedImg?.title }}
			</h1>
			<div v-else class="apod__title placeholder --text" />
			<blockquote v-if="props.selectedImg?.explanation" class="apod__desc">
				<p class="apod__explanation">
					{{ props.selectedImg?.explanation }}
				</p>
			</blockquote>
			<template v-else>
				<div class="apod__desc placeholder --text" />
				<div class="apod__desc placeholder --text" />
				<div class="apod__desc placeholder --text" />
			</template>
			<figcaption class="apod__ref" v-if="selectedImg">
				<cite class="apod__cite">
					<a
						class="apod__ref-url"
						href="https://apod.nasa.gov/apod/"
						target="_blank"
					>
						...more here
					</a>
				</cite>
			</figcaption>
		</figure>
	</section>
	<dialog
		v-if="selectedImg"
		id="image-viewer-modal"
		class="apod__img-expanded-wrapper"
		ref="imgModal"
		@click="onOutsideClick"
	>
		<button class="apod__close" @click="hideModal">
			<svg width="24px" height="24px" viewBox="0 0 24 24">
				<path
					fill="#f7f7f7"
					d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z"
				/>
			</svg>
		</button>
		<img
			class="apod__img-expanded"
			:src="selectedImg.src"
			:alt="selectedImg.title"
		/>
	</dialog>
</template>
