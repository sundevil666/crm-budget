<template>
  <div class="row english-view">
    <div class="col s8 offset-s2">
      <div class="card-container" style="display: flex">
        <transition name="card-animation">
          <div
            :key="selectedWord"
            class="card-word center pointer"
            style="width: 100%"
            :class="{ 'show-back': isShowBack }"
            @click="switchAround"
          >
            <div class="card-front">
              <p>{{ iKnow }}</p>
              <h1>{{ lexicon[selectedWord].word }}</h1>
              <div>{{ lexicon[selectedWord].sound }}</div>
            </div>
            <div class="card-back">
              <p>{{ iDidKnow }}</p>
              <h1>{{ lexicon[selectedWord].transcription }}</h1>
              <div>{{ lexicon[selectedWord].sound }}</div>
              <h2 class="text-primary">{{ lexicon[selectedWord].reading }}</h2>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
  <div class="row center">
    <div class="col s2 offset-s3 pointer" @click="nextCard">know</div>
    <div class="col s2 pointer"><b>count word:</b> {{ lexicon.length }}</div>
    <div class="col s2 pointer">don't know</div>
  </div>
</template>

<script setup lang="ts">
const lexicon = [
  {
    id: 1,
    word: 'hi',
    transcription: '[haɪ]',
    reading: 'хай',
    sound: 'sound hi',
  },
  {
    id: 2,
    word: 'hello',
    transcription: `['he'ləu]`,
    reading: 'хэлоу',
    sound: 'sound хэлон',
  },
]
import { ref } from 'vue'

const isShowBack = ref<Boolean>(false)
const selectedWord = ref<Number>(0)
const iKnow = ref<string>('I know this word')
const iDidKnow = ref<string>("I didn't know this word")

const switchAround = (): void => {
  isShowBack.value = !isShowBack.value
}
const nextCard = (): void => {
  isShowBack.value = false
  if (selectedWord.value < lexicon.length - 1) {
    selectedWord.value = selectedWord.value + 1
  } else {
    selectedWord.value = 0
  }
}
</script>

<style>
.card-animation-enter-active,
.card-animation-leave-active {
  transition: transform 0.5s, opacity 0.5s;

  transform: translateX(-100%);
  opacity: 0;
}

.card-animation-enter,
.card-animation-leave-to {
  transform: translateX(100%);
  position: absolute;
  opacity: 1;
}
.english-view {
  overflow: hidden;
}
.card-container {
  perspective: 1000px;
}

.card-word {
  transform-style: preserve-3d;
  transition: transform 0.5s;
}

.card-word.show-back {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 8px;
}

.card-front {
  background-color: #f1c40f;

  position: absolute;
  top: 0;
  left: 0;
}

.card-back {
  background-color: #3498db;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: rotateY(180deg);
  min-height: 100%;
}
</style>
