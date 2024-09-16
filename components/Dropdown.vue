<template>
    <div class="question">
        <div class="message-box">
            <div class="label">What skill have you used today?</div>
            <select v-if="!isDisabled" v-model="selectedOption" id="options">
                <option
                    v-for="option in options"
                    :key="option.id"
                    :value="option"
                >
                    {{ option.name }}
                </option>
            </select>
            <div v-else id="skill">{{ skill.name }}</div>
        </div>
        <div v-if="!isDisabled" class="complete-btn" @click="finaliseSelection">
            <UButton
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
import type { Skill } from "~/types/Skill";
const { skill, setSkill } = useSkill();

const selectedOption = ref<Skill | null>(null);
const isDisabled = computed(() => {
    return skill.value != null;
});

// Call api to get skills and ids
const options = [
    { id: 1, name: "Active Listening" },
    { id: 2, name: "Accountability" },
    { id: 3, name: "Constructive Feedback" },
    { id: 4, name: "Collaboration" },
    { id: 5, name: "Conflict Resolution" },
    { id: 6, name: "Inclusive Leadership" },
    { id: 7, name: "Stress Management" },
    { id: 8, name: "Delegation" },
    { id: 9, name: "Critical Thinking" },
    { id: 10, name: "Interpersonal Communication" },
    { id: 11, name: "Conflict Resolution" },
    { id: 12, name: "Time Management" },
    { id: 13, name: "Adaptability" },
];

const finaliseSelection = () => {
    if (selectedOption.value != null && !isDisabled.value) {
        setSkill(selectedOption.value);
    }
};
</script>

<style scoped lang="scss">
@use "~/assets/scss/dropdown.scss";
</style>
