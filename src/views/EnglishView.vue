<template>
  <div class="row center">
    <div class="col s2 pointer" @click="prevCard">
      <i class="material-icons">arrow_back</i>
    </div>
    <div class="col s2 offset-s3">
      <strong>id:</strong> {{ selectedWord }} <strong>total:</strong>
      {{ words.length }}
    </div>
    <div class="col s2 offset-s3 pointer" @click="nextCard">
      <i class="material-icons">arrow_forward</i>
    </div>
  </div>
  <div class="row english-view">
    <div class="col s8 offset-s2">
      <div class="card-container" style="display: flex">
        <transition name="card-animation">
          <div
            :key="selectedWord"
            class="card-word center pointer"
            style="width: 100%; min-height: 250px"
            :class="{ 'show-back': isShowBack }"
            @click="switchAround"
          >
            <div class="card-front">
              <h1>{{ getWord[selectedWord].word }}</h1>
              <div>{{ getWord[selectedWord].transcription }}</div>
              <div>{{ getWord[selectedWord].sound }}</div>
            </div>
            <div class="card-back">
              <h1>{{ getWord[selectedWord].translate }}</h1>
              <div>{{ getWord[selectedWord].transcription }}</div>
              <div>{{ getWord[selectedWord].sound }}</div>
              <h2 class="text-primary">{{ getWord[selectedWord].reading }}</h2>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
  <div class="row center">
    <div
      class="col s2 pointer"
      @click="addIKnowItem(getWord[selectedWord].transcription)"
    >
      {{ iKnow }} {{ listIKnow.length }}
    </div>
    <div class="col s2 offset-s3 center">
      <b>Count word:</b> {{ getWord.length }}
    </div>

    <div
      class="col s2 offset-s3 pointer"
      @click="addIDidNotKnowItem(getWord[selectedWord].transcription)"
    >
      {{ iDidNotKnow }} {{ listIDidNotKnow.length }}
    </div>
  </div>
  <ul v-if="showList.length > 0">
    <li
      class="row card show-list"
      v-for="(item, i) in showList"
      :key="item.transcription"
      :class="{
        active: item.transcription === showList[selectedWord].transcription,
      }"
    >
      <div class="col s1"># {{ i }}</div>
      <div class="col s5">{{ item.word }}</div>
      <div class="col s6">{{ item.translate }}</div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeMount } from 'vue'
import words from '@/moc/words'
import { getStore, setStore, removeItemStore } from '@/helper/store'
import type { Word } from '@/types/IWord'

const isShowBack = ref<Boolean>(false)
const selectedWord = ref<Number>(0)
const iKnow = ref<string>('I know')
const iDidNotKnow = ref<string>("I didn't know")

const getWord = ref<Array<Word>>(words)
const showList = ref<Array<Word>>([])
const listIKnow: Array<string> = reactive([])
const listIDidNotKnow: Array<string> = reactive([])

onBeforeMount(() => {
  showWordsList('main')
})
const showWordsList = (list: string): void => {
  if (list === 'main') {
    showList.value = getWord.value
  }
}
const setHideBack = (): void => {
  isShowBack.value = false
}
const addIKnowItem = (transcription: string): void => {
  if (!listIKnow.includes(transcription)) {
    setHideBack()
    listIKnow.push(transcription)
    nextCard()
  }
}
const addIDidNotKnowItem = (transcription: string): void => {
  if (!listIDidNotKnow.includes(transcription)) {
    setHideBack()
    listIDidNotKnow.push(transcription)
    nextCard()
  }
}

const switchAround = (): void => {
  isShowBack.value = !isShowBack.value
}

const toggleCart = (val: number): void => {
  selectedWord.value = Number(selectedWord.value) + val
}
const nextCard = (): void => {
  if (selectedWord.value < words.length - 1) {
    setHideBack()
    toggleCart(1)
  }
}
const prevCard = (): void => {
  if (selectedWord.value >= 1) {
    setHideBack()
    toggleCart(-1)
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
.show-list.active {
  background-color: pink;
}
.english-view {
  min-height: 250px;
}
.card-container {
  perspective: 1000px;
  width: 100%;
}

.card-word {
  transform-style: preserve-3d;
  transition: transform 0.5s;
  position: relative;
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
