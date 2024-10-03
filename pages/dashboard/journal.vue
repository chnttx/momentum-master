<template>
    <NuxtLayout :name="layout">
        <div class="flex-container">
            <div class="journal-history">
                <div id="recent">Recent</div>
                <div class="searchbar">
                    <input
                        type="date"
                        v-model="selectedDate"
                        @input="onDateChange"
                        class="date-input"
                        placeholder="Select a date"
                    />
                </div>
                <ul
                    class="reflection-list"
                    v-if="filteredReflections?.length"
                    v-for="reflection in filteredReflections"
                >
                    <li
                        class="reflection-item"
                        @click="
                            () => {
                                selectReflection(reflection.reflection_id);
                            }
                        "
                    >
                        <p style="font-size: smaller">
                            {{ new Date(reflection.date).getDate() }}-{{
                                new Date(reflection.date).getMonth() + 1
                            }}-{{ new Date(reflection.date).getFullYear() }}
                        </p>
                        <div>{{ reflection.summary }}</div>
                    </li>
                </ul>
                <div
                    v-else
                    style="
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100px;
                    "
                >
                    No reflections found.
                </div>
                <div
                    style="
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 0.5rem;
                    "
                ></div>
            </div>
            <div class="chat-loaded">
                <Summary
                    v-if="selectedReflection"
                    :reflectionId="selectedReflection"
                    :key="selectedReflection"
                />
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
// Fetching reflections from API
const { data: reflections } = await useFetch("/api/reflections/user");
const selectedReflection = ref<number | null>(null);

const layout = "board";
const selectedDate = ref("");

// Function to filter reflections based on selected date
const filteredReflections = computed(() => {
    if (!selectedDate.value) return reflections.value || [];

    const targetDate = new Date(selectedDate.value).toISOString().split("T")[0];
    return (
        reflections.value?.filter((reflection) => {
            const reflectionDate = new Date(reflection.date)
                .toISOString()
                .split("T")[0];
            return reflectionDate === targetDate;
        }) || []
    );
});

// Function triggered on date input change
function onDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    selectedDate.value = target.value;
}

function selectReflection(reflectionId: number) {
    selectedReflection.value = reflectionId;
}
</script>

<style scoped lang="scss">
@use "~/assets/scss/journal.scss";
</style>
