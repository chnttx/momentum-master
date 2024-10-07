<!-- Landing page -->
<template>
    <NuxtLayout :name="layout">
        <div id="dashboard-container">
            <div id="dashboard-left" class="dashboard-content">
                <div
                    id="skill-focused"
                    class="dashboard-box dashboard-left-box"
                >
                    <div id="focus-text" v-if="skills_used.length > 0">
                        Focus
                    </div>
                    <div id="focus-description" v-if="skills_used.length > 0">
                        You have been focusing on
                        <b>{{ skills_used[0].name }}</b>
                    </div>
                    <div v-else>
                        No focus yet, let's start with a reflection
                    </div>
                </div>
                <div
                    id="skill-bar-chart"
                    class="dashboard-box dashboard-left-box"
                >
                    <div>Skills</div>
                    <div
                        v-for="(skill, index) in skills_used"
                        class="skill-proficiency"
                    >
                        <div class="skill-name">{{ skill.name }}</div>
                        <div
                            class="proficiency"
                            :class="
                                skillProficiencyClasses[skill.rating_id - 1]
                            "
                        ></div>
                    </div>
                </div>
                <div id="goals" class="dashboard-box dashboard-left-box">
                    <div id="dashboard-goal-title">Goals</div>
                    <table id="goals-table">
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
                </div>
            </div>
            <div id="dashboard-right" class="dashboard-content">
                <div
                    id="calendar"
                    class="dashboard-box dashboard-right-box"
                ></div>
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
const { data: quote } = await useFetch("/api/quote");
const { data: skills_used } = await useFetch("/api/skills_used/user");
const { data: goals } = await useFetch("/api/goals/user");

const filteredGoals = goals.value.filter(
    (goal) => goal.id_goal_status != GOAL_COMPLETED_STATUS_ID
);

const goalStatuses = reactive({ goals: [] });
for (let goal of filteredGoals) {
    goalStatuses.goals.push({
        goalId: goal.id_goal,
        statusId: goal.id_goal_status,
    });
}

if (skills_used.value.length > 3)
    skills_used.value = skills_used.value.slice(0, 3);
</script>

<style scoped lang="scss">
@use "~/assets/scss/dashboard.scss";
</style>
