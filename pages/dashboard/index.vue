<!-- Landing page -->
<template>
    <NuxtLayout :name="layout">
        <div id="dashboard-container">
            <div id="dashboard-left" class="dashboard-content">
                <div
                    id="skill-focused"
                    class="dashboard-box dashboard-left-box"
                >
                    <div id="focus-text"><b>Focus</b></div>
                    <div id="focus-description" v-if="skillsUsed.length > 0">
                        You have been focusing on
                        <b>{{ skillsUsed[0].name }}</b>
                    </div>
                    <div v-else class="no-reflection">
                        No focus yet, let's start with a reflection!
                    </div>
                </div>
                <div
                    id="skill-bar-chart"
                    class="dashboard-box dashboard-left-box"
                >
                    <div v-if="filteredSkills.length > 0">
                        <b>Skills</b>
                    </div>
                    <div
                        v-if="filteredSkills.length > 0"
                        v-for="(skill, index) in filteredSkills"
                        class="skill-proficiency"
                    >
                        <div class="skill-name">
                            {{ titleCase(skill.name) }}
                        </div>
                        <div
                            class="proficiency"
                            :class="skillProficiencyClasses[skill.ratingId - 1]"
                        ></div>
                    </div>
                    <div v-else class="no-reflection">
                        No skill used yet, let's start with a reflection!
                    </div>
                </div>
                <div id="goals" class="dashboard-box dashboard-left-box">
                    <div
                        v-if="filteredGoals.length > 0"
                        id="dashboard-goal-title"
                    >
                        <b>Goals</b>
                    </div>
                    <table id="goals-table" v-if="filteredGoals.length > 0">
                        <thead>
                            <tr>
                                <th id="dashboard-goal-description">
                                    <b>Description</b>
                                </th>
                                <th id="dashboard-goal-status">
                                    <b>Not started</b>
                                </th>
                                <th id="dashboard-goal-status">
                                    <b>In progress</b>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(goal, index) in filteredGoals">
                                <td class="td-goal-description">
                                    {{ goal.description }}
                                </td>
                                <td class="goal-radio">
                                    <URadio
                                        :ui="{
                                            wrapper:
                                                'relative flex items-center justify-center',
                                            base: 'disabled:opacity-100',
                                        }"
                                        label=""
                                        :value="1"
                                        :model-value="
                                            goalStatuses.goals[index].statusId
                                        "
                                        :name="`goal` + index"
                                        disabled
                                    />
                                </td>
                                <td class="goal-radio">
                                    <URadio
                                        :ui="{
                                            wrapper:
                                                'relative flex items-center justify-center',
                                            base: 'disabled:opacity-100',
                                        }"
                                        label=""
                                        :value="2"
                                        :model-value="
                                            goalStatuses.goals[index].statusId
                                        "
                                        :name="`goal` + index"
                                        disabled
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-else class="no-reflection">
                        No goals, let's create one!
                    </div>
                </div>
            </div>
            <div id="dashboard-right" class="dashboard-content">
                <div id="calendar" class="dashboard-box dashboard-right-box">
                    <VCalendar expanded :attributes="attrs" />
                </div>
                <div id="quote" class="dashboard-box dashboard-right-box">
                    <div>"{{ quote.quote }}"</div>
                    <div id="breakline"></div>
                    <div>{{ quote.author }}</div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
const GOAL_COMPLETED_STATUS_ID = 3;
const skillProficiencyClasses = ["shu", "ha", "ri"];
const layout = "board";
const dateHighlight = {
    color: "purple",
    fillMode: "solid",
};
const { data: quote } = await useFetch("/api/quote");
const { data: skillsUsed } = await useFetch("/api/skills_used/user");
const { data: goals } = await useFetch("/api/goals/user");
const { data: reflections } = await useFetch("/api/reflections/user");

const attrs = ref([]);

reflections.value.forEach((reflection) => {
    attrs.value.push({
        key: reflection.date,
        highlight: dateHighlight,
        dates: new Date(reflection.date),
    });
});

const filteredGoals = goals.value.filter(
    (goal) => goal.id_goal_status != GOAL_COMPLETED_STATUS_ID
);

const filteredSkills = [];
for (let skill of skillsUsed.value) {
    let isNewSkill = filteredSkills.every((s) => s?.name !== skill.name);
    if (isNewSkill) {
        filteredSkills.push({ name: skill.name, ratingId: skill.rating_id });
    }

    if (filteredSkills.length > 2) break;
}

const goalStatuses = reactive({ goals: [] });
for (let goal of filteredGoals) {
    goalStatuses.goals.push({
        goalId: goal.id_goal,
        statusId: goal.id_goal_status,
    });
}

if (skillsUsed.value.length > 3)
    skillsUsed.value = skillsUsed.value.slice(0, 3);

console.log(reflections);
</script>

<style scoped lang="scss">
@use "~/assets/scss/dashboard.scss";
</style>
