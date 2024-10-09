<template>
    <div id="modal-container">
        <div id="modal" role="dialog" aria-modal="true">
            <div id="modal-header">
                <h1><b>Create a new goal</b></h1>
                <div @click="$emit('close')">
                    <UButton
                        icon="i-heroicons-x-mark"
                        size="sm"
                        color="white"
                        square
                        variant="solid"
                    />
                </div>
            </div>
            <div>Description</div>
            <UInput
                v-model="description"
                placeholder="Enter your goal description"
                color="sky"
            ></UInput>
            <div id="submit-button" @click="createGoal">
                <UButton
                    size="sm"
                    color="black"
                    square
                    variant="solid"
                    label="Submit"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const description = ref<string>("");
const emit = defineEmits(["create", "close"]);
const createGoal = () => {
    let trimmedDescription = description.value.trim();
    if (trimmedDescription.length !== 0) emit("create", trimmedDescription);
};
</script>

<style lang="scss" scoped>
@use "~/assets/scss/modalCreateGoal.scss";
</style>
