<template>
    <div id="slider-wrapper">
        <div id="text">{{ props.question }}</div>
        <div id="slider">
            <span class="value">1</span>
            <URange
                :min="props.min"
                :max="props.max"
                v-model="sliderValue"
                :disabled="isDisabled"
                color="primary"
            />
            <span class="value">10</span>
        </div>
        <div id="slider-text-wrapper">
            <span v-for="(text, index) in props.texts" :key="index">{{
                text
            }}</span>
        </div>
        <div v-if="!isDisabled" class="complete-btn" @click="submitValue">
            <UButton
                color="white"
                variant="solid"
                :ui="{ rounded: 'rounded-full' }"
            >
                Submit
            </UButton>
        </div>
    </div>
</template>
<script setup lang="ts">
const MOOD_KEY = "mood";
const SKILL_KEY = "skill";
const { moodRating, setMoodRating } = useMoodRating();
const { skillRating, setSkillRating } = useSkillRating();

const props = defineProps<{
    min: number;
    max: number;
    texts: string[];
    question: string;
    rating: string;
}>();

const sliderValue = ref<number>(0);
const isDisabled = computed(() => {
    if (props.rating == MOOD_KEY) return moodRating.value != null;
    if (props.rating == SKILL_KEY) return skillRating.value != null;
    return false;
});

onMounted(() => {
    if (props.rating == MOOD_KEY && moodRating.value != null)
        sliderValue.value = moodRating.value;
    if (props.rating == SKILL_KEY && skillRating.value != null)
        sliderValue.value = skillRating.value;
});

const submitValue = () => {
    if (props.rating == MOOD_KEY && sliderValue.value != 0) {
        setMoodRating(sliderValue.value);
    }
    if (props.rating == SKILL_KEY && sliderValue.value != 0) {
        setSkillRating(sliderValue.value);
    }
};
</script>

<style scoped lang="scss">
@use "~/assets/scss/slider.scss";
</style>
