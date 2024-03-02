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
    size: 1426,
    itemsToShow: 6,
  },
  {
    size: 1400,
    itemsToShow: 5,
  },
  {
    size: 400,
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
      r.src = r.hdurl || r.url;
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
        :breakpoints="breakpoints" slide-container-class="slideContainer" next-btn-class="slide-btn"
        prev-btn-class="slide-btn" @img-clicked="viewImgDetails">
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

<style>
.container {
  height: 100%;
}

.carousel-section {
  background-color: black;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading {
  height: 100px;
  width: 100px;
}

.loading img {
  width: 100%;
  height: 100%;
}

.carousel__container {
  max-width: 100%;
}


.slideContainer * {
  padding: 2px;
  background-color: #f0e68c;
  cursor: pointer;
  border-radius: 10px;
  border: 0;
}

.details-section {
  background-color: #303030;
  height: 60%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #ede8bf;
}

.details-container {
  display: flex;
  padding: 20px;
}

.img-container {
  min-width: 450px;
  width: 450px;
  min-height: 450px;
  height: 450px;
  margin-right: 20px;

  img {
    padding: 2px;
    background-color: #f0e68c;
    border-radius: 10px;
    border: 0;
    width: 100%;
    height: 100%;
  }
}

.img-desc {
  height: 450px;
}

.img-desc .__title {
  color: #f0e68c;
}

.img-desc .__desc {
  height: 70%;
  color: #b1b1b1;
  /* max-width: 60ch; */
  overflow: auto;
  background-color: #2d2d2a8f;
  border: 0;
  border-radius: 10px;
  padding: 10px;
  padding-right: 6px;
  scrollbar-color: #616161 #2d2d2a8f;
  scrollbar-width: thin;
}

@media (max-width: 1124px) and (min-width: 901px) {
  .carousel-section {
    height: 30%;
  }

  .details-section {
    height: 70%;
  }

  .img-container {
    min-width: 550px;
    width: 550px;
    min-height: 550px;
    height: 550px;
  }

  .img-desc {
    height: 550px;
  }
}

@media (max-width: 900px) and (min-width: 831px) {
  .carousel-section {
    height: 30%;
  }

  .details-section {
    height: 70%;
  }

  .img-container {
    min-width: 500px;
    width: 500px;
    min-height: 500px;
    height: 500px;
  }

  .img-desc {
    height: 500px;
  }
}

@media (max-width: 830px) and (min-width: 791px) {
  .carousel-section {
    height: 30%;
  }

  .details-section {
    height: 70%;
  }

  .img-container {
    min-width: 450px;
    width: 450px;
    min-height: 450px;
    height: 450px;
  }

  .img-desc {
    height: 450px;
  }
}

@media (max-width: 790px) and (min-width: 730px) {
  .carousel-section {
    height: 30%;
  }

  .details-section {
    height: 70%;
  }

  .img-container {
    min-width: 400px;
    width: 400px;
    min-height: 400px;
    height: 400px;
  }

  .img-desc {
    height: 400px;
  }
}

@media (max-width: 729px) and (min-width: 550px) {
  .carousel-section {
    height: 20%;
  }

  .details-section {
    height: 80%;
    justify-content: center;
    align-items: baseline;
  }

  .details-container {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .loading {
    height: 75px;
    width: 75px;
  }

  .img-container {
    min-width: 400px;
    width: 400px;
    min-height: 400px;
    height: 400px;
  }

  .img-desc {
    height: 200px;
  }
}


@media (max-width: 549px) and (min-width: 415px) {
  .carousel-section {
    height: 20%;
  }

  .details-section {
    height: 80%;
    justify-content: center;
    align-items: baseline;
  }

  .details-container {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .loading {
    height: 75px;
    width: 75px;
  }

  .img-container {
    min-width: 350px;
    width: 350px;
    min-height: 350px;
    height: 350px;
  }

  .img-desc {
    height: 175px;
  }
}

@media (max-width: 416px) and (min-width: 366px) {
  .carousel-section {
    height: 20%;
  }

  .details-section {
    height: 80%;
    justify-content: center;
    align-items: baseline;
  }

  .details-container {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .loading {
    height: 50px;
    width: 50px;
  }

  .img-container {
    min-width: 300px;
    width: 300px;
    min-height: 300px;
    height: 300px;
  }

  .img-desc {
    height: 200px;
  }
}

@media (max-width: 365px) {
  .carousel-section {
    height: 20%;
  }

  .details-section {
    height: 80%;
    justify-content: center;
    align-items: baseline;
  }

  .details-container {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .loading {
    height: 50px;
    width: 50px;
  }

  .img-container {
    min-width: 250px;
    width: 250px;
    min-height: 250px;
    height: 250px;
  }

  .img-desc {
    height: 250px;
  }
}
</style>
