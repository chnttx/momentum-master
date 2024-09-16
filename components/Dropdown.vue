<template>
    <div class="question">
        <div class="message-box">
            <div class="label">What skill have you used today?</div>
            <select
                v-if="skill == null"
                v-model="selectedOption"
                id="options"
                :disabled="isDisabled"
            >
                <option v-for="option in options" :key="option" :value="option">
                    {{ option }}
                </option>
            </select>
            <div v-else id="skill">{{ skill }}</div>
        </div>
        <div class="complete-btn" @click="finaliseSelection">
            <UButton
                v-if="skill == null"
                color="white"
                variant="solid"
                :ui="{ rounded: 'rounded-full' }"
            >
                Finalise Selection
            </UButton>
        </div>
    </div>
</template>

<script setup lang="ts">
const { skill } = useReflection();

const emit = defineEmits(["updateSkills"]);
const selectedOption = ref<string>("");
const isDisabled = ref<Boolean>(false);
const options = [
    "Active Listening",
    "Accountability",
    "Constructive Feedback",
    "Collaboration",
    "Conflict Resolution",
    "Inclusive Leadership",
    "Stress Management",
    "Delegation",
    "Critical Thinking",
    "Interpersonal Communication",
    "Conflict Resolution",
    "Time Management",
    "Adaptability",
];

onMounted(() => {
    console.log(skill.value);
    if (skill.value != null) isDisabled.value = true;
});

const finaliseSelection = () => {
    if (selectedOption.value.length !== 0 && !isDisabled.value) {
        isDisabled.value = true;
        emit("updateSkill", selectedOption.value);
    }
};
</script>

<style scoped lang="scss">
@use "~/assets/scss/dropdown.scss";
</style>
