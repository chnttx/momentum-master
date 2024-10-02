<template>
    <NuxtLayout :name="layout">
        <div class="flex-container">
            <div class="journal-history">
                <div id="recent">Recent</div>
                <div class="searchbar">
                    <input type="date" v-model="selectedDate" @input="onDateChange" class="date-input" placeholder="Select a date"/>
                </div>
                    <ul class="reflection-list" v-if="reflections.length" v-for="reflection in reflections">
                        <li class="reflection-item" onclick="window.location.href='/dashboard/reflection'">
                            <p style="font-size: smaller">{{ reflection.date }}</p>
                            <div>{{ reflection.summary }}</div>
                        </li>
                    </ul> 
                    <div v-else style="display: flex; justify-content: center; align-items: center; height: 100px;">No reflections found.</div>
                    <div style="display: flex; justify-content: center; align-items: center;padding:0.5rem" >
                    </div>
            </div>
            <div class="chat-loaded">
                Right panel
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
// import { getReflectionById } from '~/server/services/reflection';
// import { onMounted, ref } from 'vue';
const reflections = [
    {
        date: "2023-01-01",
        summary: "Team meeting for preparation"
    },
    {
        date: "2023-01-02",
        summary: "Discuss marketing strategy"
    },
    {
        date: "2023-01-03",
        summary: "Finish new client business model"
    },
    {
        date: "2023-01-04",
        summary: "Attend HR meeting"
    },
    {
        date: "2023-01-05",
        summary: "Update HR policies"
    },
    {
        date: "2023-01-06",
        summary: "Team meeting for preparation"
    },
    {
        date: "2023-01-07",
        summary: "Review sales reports"
    },
    {
        date: "2023-01-08",
        summary: "Meet with new client"
    },
    {
        date: "2023-01-09",
        summary: "Develop social media campaign"
    },
    {
        date: "2023-01-10",
        summary: "Attend industry conference"
    },
    {
        date: "2023-01-11",
        summary: "Create new product roadmap"
    },
    {
        date: "2023-01-12",
        summary: "Conduct team training session"
    },
    {
        date: "2023-01-13",
        summary: "Review customer feedback"
    },
    {
        date: "2023-01-14",
        summary: "Meet with investors"
    },
    {
        date: "2023-01-15",
        summary: "Launch new marketing initiative"
    },
    {
        date: "2023-01-16",
        summary: "Analyze website analytics"
    },
    {
        date: "2023-01-17",
        summary: "Develop new business partnerships"
    },
    {
        date: "2023-01-18",
        summary: "Create new content calendar"
    },
    {
        date: "2023-01-19",
        summary: "Attend networking event"
    },
    {
        date: "2023-01-20",
        summary: "Review company financials"
    },
    {
        date: "2023-01-21",
        summary: "Meet with product team"
    }
]

const reflectionsWithIsoDates = reflections.map(reflection => ({
    ...reflection,
    date: new Date(reflection.date).toISOString().split('T')[0],
}));



const layout = "board"
const selectedDate = ref('')


// // Get all reflections for the user
// const {data: reflections} = await useFetch("/api/reflections/user/", {
//     query: {
//         page: page.value,
//         limit: limit.value,
//         date: selectedDate.value
//     }
// })

function findReflections(date: string) {
    const reflections = reflectionsWithIsoDates.filter(reflection => reflection.date === date);
    console.log("Reflections for date:", date, ":", reflections);
    // reflections.value = reflections;
}

function onDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log("Selected date: ", target.value);
    selectedDate.value = target.value;
    findReflections(selectedDate.value);
}


</script>

<style scoped lang="scss">
@use "~/assets/scss/journal.scss";
</style>
