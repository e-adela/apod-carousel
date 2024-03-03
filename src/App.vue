<script setup lang="ts">
import { Carousel } from "carousel-vue3-ts";
import { onMounted, ref } from "vue";
import { DateTime } from 'luxon';
const slides = ref<iAPOD[]>([
  {
    src: "/slides/1.png",
    alt: "a cool pic1",
    explanation: '',
    hdurl: '',
    title: '',
    url: ''
  },
  {
    src: "/slides/2.png",
    alt: "a cool pic2",
    explanation: '',
    hdurl: '',
    title: '',
    url: ''
  },
  {
    src: "/slides/3.png",
    alt: "a cool pic3",
    explanation: '',
    hdurl: '',
    title: '',
    url: ''
  },
  {
    src: "/slides/4.png",
    alt: "a cool pic4",
    explanation: '',
    hdurl: '',
    title: '',
    url: ''
  },
  {
    src: "/slides/5.png",
    alt: "a cool pic5",
    explanation: '',
    hdurl: '',
    title: '',
    url: ''
  },
  {
    src: "/slides/6.png",
    alt: "a cool pic6",
    explanation: '',
    hdurl: '',
    title: '',
    url: ''
  }
]);

interface iAPOD {
  explanation: string
  hdurl: string
  title: string
  url: string
  alt?: string
  src?: string
  copyright?: string
  date?: string
  media_type?: string
  service_version?: string
}

const breakpoints = [
  {
    size: 1600,
    itemsToShow: 6,
  },
  {
    size: 1400,
    itemsToShow: 5,
  },
  {
    size: 486,
    itemsToShow: 4,
  },
  {
    size: 300,
    itemsToShow: 3,
  },
  {
    size: 0,
    itemsToShow: 2
  }
];

const isLoading = ref(true);
const currImg = ref<iAPOD | undefined>(!isLoading.value ? slides.value[0] : undefined);
function viewImgDetails(img: iAPOD) {
  currImg.value = img;
}

onMounted(async () => {
  const today = DateTime.now();
  const startDate = today.minus({ days: 14 }).toFormat('yyyy-LL-dd');
  const endDate = today.toFormat('yyyy-LL-dd');
  try {
    const apods = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=Vbqlnspscue9Cp7GzCsS5Luwj3b9M9tKA8bhk51b&start_date=${startDate}&end_date=${endDate}`
    );
    let res = await apods.json() as iAPOD[];
    res = res.filter(r => {
      r.src = r.url || r.hdurl;
      r.alt = r.explanation;
      return r.media_type === "image";
    }).reverse();
    slides.value = res;
    currImg.value = res[0];
  } catch (error) {
    console.log('api call error', error);
  } finally { isLoading.value = false }
})
</script>

<template>
  <main class="container">
    <section class="carousel-section">
      <div v-if="isLoading" class="loading">
        <img src="/loading.svg" alt="loading icon" />
      </div>
      <Carousel v-else :slides-array="slides" :transition-speed="1" :auto-slide="false" :items-to-show="4"
        :breakpoints="breakpoints" slide-container-class="slideContainer" next-btn-class="slide-btn --next"
        prev-btn-class="slide-btn --prev" @img-clicked="viewImgDetails">
      </Carousel>
    </section>
    <section class="details-section">
      <div class="details-container" v-if="currImg">
        <div class="img-container">
          <img :src="currImg.src" />
        </div>
        <div class="img-desc">
          <h1 class="__title">{{ currImg.title }}</h1>
          <p class="__desc">
            {{ currImg.explanation }}
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss">
$screen-width-xxl: 1124px;
$screen-width-xl: 900px;
$screen-width-l: 729px;
$screen-width-m: 549px;
$screen-width-s: 416px;
$screen-width-xs: 365px;

$section-padding: 16px;

$details-img-xxl: 500px;
$details-img-xl: 400px;
$details-img-l: 300px;
$details-img-m: 260px;
$details-img-s: 200px;
$details-img-xs: 160px;

$border-radius: 8px;

:root {
  --details-img-size: #{$details-img-xxl};
}

.container {
  height: 100%;
}

.carousel-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: $section-padding 0;
  background-color: #303030;
}

.loading {
  height: 100px;
  width: 100px;

  img {
    width: 100%;
    height: 100%;
  }

  @media (max-width: $screen-width-l) and (min-width: calc($screen-width-m + 1px)) {
    height: 75px;
    width: 75px;
  }

  @media (max-width: $screen-width-m) and (min-width: calc($screen-width-s + 1px)) {
    height: 75px;
    width: 75px;
  }

  @media (max-width: $screen-width-s) and (min-width: calc($screen-width-xs + 1px)) {
    height: 50px;
    width: 50px;
  }

  @media (max-width: $screen-width-xs) {
    height: 50px;
    width: 50px;
  }
}

.carousel__container {
  max-width: 100%;
}


.slideContainer * {
  cursor: pointer;
  border-radius: $border-radius;
  border: 0;
  /* box-shadow: 0px 0px 2px 0px #f0e68c; */
}

.slide-btn {
  background-color: #3b3b3b !important;
  border: 0;

  &.--next {
    border-top-left-radius: $border-radius;
    border-bottom-left-radius: $border-radius;
  }

  &.--prev {
    border-top-right-radius: $border-radius;
    border-bottom-right-radius: $border-radius;
  }

  &:hover {
    background-color: #373737 !important;
  }
}

.details-section {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  color: #ede8bf;

  @media (max-width: $screen-width-l) {
    justify-content: center;
  }
}

.details-container {
  display: flex;
  padding: $section-padding;

  @media (max-width: $screen-width-l) {
    flex-direction: column;
    align-items: center;
  }
}



.img-container {
  min-width: var(--details-img-size);
  width: var(--details-img-size);
  min-height: var(--details-img-size);
  height: var(--details-img-size);
  margin-right: $section-padding;

  img {
    border-radius: $border-radius;
    border: 0;
    width: 100%;
    height: 100%;
    /* box-shadow: 0px 0px 2px 0px #f0e68c; */
  }

  @media (max-width: $screen-width-xxl) and (min-width: calc($screen-width-xl + 1px)) {
    --details-img-size: #{$details-img-xl};
  }

  @media (max-width: $screen-width-xl) and (min-width: calc($screen-width-l + 1px)) {
    --details-img-size: #{$details-img-l};
  }

  @media (max-width: $screen-width-l) and (min-width: calc($screen-width-m + 1px)) {
    --details-img-size: #{$details-img-m};
  }

  @media (max-width: $screen-width-m) and (min-width: calc($screen-width-s + 1px)) {
    --details-img-size: #{$details-img-s};
  }

  @media (max-width: $screen-width-s) {
    --details-img-size: #{$details-img-xs};
  }

  @media (max-height: 850px) and (min-width: calc($screen-width-xl + 1px)) {
    --details-img-size: calc(#{$details-img-xxl} - 50px);
  }
}

.img-desc {
  .__title {
    color: #f0e68c;
    padding: $section-padding;
    margin: 0;
  }

  .__desc {
    box-sizing: border-box;
    max-height: calc(var(--details-img-size) / 2.5);
    color: #b1b1b1;
    /* max-width: 60ch; */
    overflow: auto;
    background-color: #2d2d2a8f;
    border: 0;
    border-radius: $border-radius;
    padding: $section-padding;
    padding-right: 6px;
    scrollbar-color: #616161 #2d2d2a8f;
    scrollbar-width: thin;
  }

  @media (max-width: $screen-width-l) {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
  }
}
</style>
