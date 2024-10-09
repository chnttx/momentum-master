<template>
    <div id="modal-container">
        <div id="modal" role="dialog" aria-modal="true">
            <div id="modal-header">
                <h1><b>Update goal</b></h1>
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
            <div>Goal Status</div>
            <URadio
                v-for="option of options"
                :key="option.value"
                v-model="statusId"
                v-bind="option"
            />
            <div id="submit-button" @click="updateGoal">
                <UButton
                    size="sm"
                    color="black"
                    square
                    variant="solid"
                    label="Update"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { goal, GoalStatus, setGoal } = useGoal();

const description = ref<string>(goal.value.description);
const statusId = ref<number>(goal.value.statusId);

const emit = defineEmits(["update", "close"]);

const options = [
    { value: GoalStatus.NOT_STARTED, label: "Not Started" },
    { value: GoalStatus.IN_PROGRESS, label: "In Progress" },
    { value: GoalStatus.COMPLETE, label: "Complete" },
];

const updateGoal = () => {
    let trimmedDescription = description.value.trim();
    let isUpdated =
        description.value !== goal.value.description ||
        statusId.value !== goal.value.statusId;
    if (isUpdated && trimmedDescription.length !== 0) {
        emit("update", {
            description: trimmedDescription,
            goalId: goal.value.goalId,
            statusId: statusId.value,
        });
    }

    if (!isUpdated) {
        setGoal(null);
        emit("close");
    }
};
</script>

<style lang="scss" scoped>
@use "~/assets/scss/modalCreateGoal.scss";
</style>
