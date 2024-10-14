<template>
    <div class="summary-page-container">
        <div class="header">
            <h1>Date: {{ currentDate }}</h1>
        </div>

        <div class="summary-content">
            <div class="skills">
                <p>Skill Used:</p>
                <span class="skill-item">{{ reflection?.skill_used }}</span>
            </div>
            <div class="summary">
                <h1>Summary:</h1>
                <p>{{ reflection?.summary }}</p>
            </div>
            <div class="dropdown">
                <div @click="toggleDropdown" class="dropdown-toggle">
                    <div>History</div>
                    <span v-if="!isOpen" class="material-icons"
                        >keyboard_arrow_down</span
                    >
                    <span v-else class="material-icons">keyboard_arrow_up</span>
                </div>
                <div v-if="isOpen" class="dropdown-content">
                    <div class="scrollable-area">
                        <!-- <p>
                            {{ reflection?.summary }}
                        </p> -->
                        <div
                            v-for="(
                                questionResponse, index
                            ) in reflection?.question_responses"
                            :key="index"
                            class="message-box"
                        >
                            <div class="message ai-message">
                                <img
                                    src="@/assets/images/ai.jpg"
                                    class="ai-img"
                                    alt="AI"
                                />
                                <div class="text ai-text">
                                    {{ questionResponse.question }}
                                </div>
                            </div>
                            <div
                                v-if="
                                    questionResponse?.answer &&
                                    questionResponse.questionId !==
                                        RECOMMENDATION_QUESTION.id
                                "
                                class="message user-message"
                            >
                                <div class="text user-text">
                                    {{ questionResponse.answer }}
                                </div>
                                <img :src="userImage" alt="user" />
                            </div>
                            <div
                                v-if="
                                    questionResponse.questionId ==
                                    RECOMMENDATION_QUESTION.id
                                "
                                class="message ai-message"
                            >
                                <img
                                    src="@/assets/images/ai.jpg"
                                    class="ai-img"
                                    alt="AI"
                                />
                                <div class="text ai-text">
                                    <div
                                        class="resource"
                                        v-for="(
                                            resource, index
                                        ) in recommendationArr"
                                        :key="index"
                                    >
                                        {{ index + 1 }}. {{ resource }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import dummyAvatar from "~/assets/images/dummy-avatar.jpg";
const { RECOMMENDATION_QUESTION } = useChat();
const { getSession } = useAuth();
const session = await getSession();

const props = defineProps(["reflectionId"]);
const id = ref(props.reflectionId);
const { data: reflection } = await useFetch(
    `/api/reflections?reflectionId=${id.value}`
);

const userImage = session?.user?.image ? session.user.image : dummyAvatar;

const currentDate = computed(() => {
    const dateString = reflection.value?.date;
    let today = dateString ? new Date(dateString) : new Date();

    return today.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
});

const isOpen = ref(false);

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

const recommendationArr = computed(() => {
    let recommendation = null;
    if (!reflection.value?.question_responses) return null;
    for (let question of reflection.value.question_responses) {
        if (question.questionId == RECOMMENDATION_QUESTION.id) {
            recommendation = question.answer
                .replaceAll("[", "")
                .replaceAll("]", "");
            let arr = recommendation.split(",");
            return arr.map((resource) => resource.trim());
        }
    }
    return null;
});

console.log(reflection.value?.question_responses);
</script>

<style scoped lang="scss">
@use "~/assets/scss/summary.scss";
</style>
