<template>
    <div class="question">
        <div class="message-box">
            <div class="label">What skill have you used today?</div>
            <!-- <select v-if="!isDisabled" v-model="selectedOption" id="options">
                <option
                    v-for="option in options"
                    :key="option.id"
                    :value="option"
                >
                    {{ option.name }}
                </option>
            </select>
            <div v-else id="skill">{{ skill.name }}</div> -->
            <select v-if="!isDisabled" v-model="selectedOption" id="options">
                <option
                    v-for="skill in skills"
                    :key="skill.id_skill"
                    :value="{ id: skill.id_skill, name: skill.name }"
                >
                    {{ skill.name }}
                </option>
            </select>
            <div v-else id="skill">{{ skill?.name }}</div>
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

const { data: skills } = await useFetch("/api/skills", {
    method: "GET",
});

const finaliseSelection = () => {
    if (selectedOption.value != null && !isDisabled.value) {
        setSkill(selectedOption.value);
    }
};
</script>

<style scoped lang="scss">
@use "~/assets/scss/dropdown.scss";
</style>
