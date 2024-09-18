<template>
    <NuxtLayout :name="layout">
        <div class="page-container">
            <div v-if="endSession" id="end-session">
                <p>Today's reflection session is completed (read-only)</p>
            </div>
            <div
                class="reflection-container"
                :class="
                    endSession
                        ? `end-session-reflection-container`
                        : `in-session-reflection-container`
                "
            >
                <!-- Chat -->
                <div id="chatbox" ref="chatbox">
                    <!-- Mood Rating Slider -->
                    <div class="message ai-message">
                        <img
                            src="@/assets/images/ai.jpg"
                            class="ai-img"
                            alt="AI"
                        />
                        <Slider
                            :min="1"
                            :max="10"
                            :texts="[`Terrible`, `Perfect`]"
                            :question="`How was your day?`"
                            :rating="`mood`"
                        />
                    </div>
                    <!-- Skill Selection Dropdown Menu -->
                    <div v-if="moodRated" class="message ai-message">
                        <img
                            src="@/assets/images/ai.jpg"
                            class="ai-img"
                            alt="AI"
                        />
                        <Dropdown />
                    </div>
                    <!-- Skill Rating Slider -->
                    <div v-if="skillSelected" class="message ai-message">
                        <img
                            src="@/assets/images/ai.jpg"
                            class="ai-img"
                            alt="AI"
                        />
                        <Slider
                            :min="1"
                            :max="3"
                            :texts="[`Shu`, `Ha`, `Ri`]"
                            :question="`How would you rate your skill?`"
                            :rating="`skill`"
                        />
                    </div>
                    <!-- Reflection messages -->
                    <div
                        v-if="moodRated && skillSelected && skillRated"
                        v-for="questionResponse in chat.questionResponses"
                        :key="questionResponse.id"
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
                                questionResponse?.response &&
                                questionResponse.id !==
                                    RECOMMENDATION_QUESTION.id
                            "
                            class="message user-message"
                        >
                            <div class="text user-text">
                                {{ questionResponse.response }}
                            </div>
                            <img :src="userImage" alt="user" />
                        </div>
                        <div
                            v-if="
                                questionResponse.id ==
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
                <div v-if="!endSession" class="container">
                    <!-- Buttons -->
                    <div class="horizontal-container">
                        <div
                            v-if="
                                isReflection &&
                                hasAtLeastMinNumberResponses &&
                                waitingForResponse
                            "
                            class="complete-btn"
                            @click="() => setIsReflection(false)"
                        >
                            <UButton
                                color="black"
                                icon="i-heroicons-check"
                                :ui="{ rounded: 'rounded-full' }"
                            >
                                Complete reflection
                            </UButton>
                        </div>
                        <div
                            v-if="
                                isReflection &&
                                hasAtLeastMinNumberResponses &&
                                waitingForResponse
                            "
                            class="complete-btn"
                            @click="
                                async () => {
                                    await getOneMoreQuestion();
                                }
                            "
                        >
                            <UButton
                                color="white"
                                trailing-icon="i-heroicons-arrow-right"
                                :ui="{ rounded: 'rounded-full' }"
                            >
                                Next question
                            </UButton>
                        </div>
                        <div
                            v-if="!isReflection && !learnNewSkill"
                            class="complete-btn"
                            @click="
                                async () => {
                                    if (skill != null)
                                        await fetchRecommendation(skill.name);
                                    setLearnNewSkill(true);
                                    setEndSession(true);
                                    postReflection();
                                }
                            "
                        >
                            <UButton
                                color="black"
                                :ui="{ rounded: 'rounded-full' }"
                            >
                                Would you like to learn a new skill
                            </UButton>
                        </div>

                        <div
                            v-if="!isReflection && !endSession"
                            class="complete-btn"
                            @click="
                                () => {
                                    setEndSession(true);
                                    postReflection();
                                }
                            "
                        >
                            <UButton
                                color="white"
                                :ui="{ rounded: 'rounded-full' }"
                            >
                                End today's session
                            </UButton>
                        </div>
                    </div>

                    <!-- Message input -->
                    <form
                        v-if="isReflection"
                        @keyup.enter.prevent="async () => await sendMessage()"
                        class="message-input"
                    >
                        <UTextarea
                            autoresize
                            :maxrows="5"
                            :row="1"
                            color="white"
                            variant="none"
                            v-model="message"
                            :disabled="
                                (waitingForResponse ||
                                !(moodRated && skillSelected && skillRated) ||
                                !isReflection) as boolean
                            "
                            :placeholder="
                                learnNewSkill
                                    ? `Enter a skill you like to learn`
                                    : moodRated
                                    ? skillSelected
                                        ? skillRated
                                            ? `Enter message`
                                            : `Rate the selected skill`
                                        : `Select a skill`
                                    : `Rate your mood first`
                            "
                        />
                    </form>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import dummyAvatar from "~/assets/images/dummy-avatar.jpg";
import type { Reflection } from "~/types/payload/Reflection";
const MIN_RESPONSES_COUNT = 1; // 8
const { moodRated, moodRating, initMoodRating } = useMoodRating();
const { skillRated, skillRating, initSkillRating } = useSkillRating();
const { skill, skillSelected, initSkill } = useSkill();
const {
    isReflection,
    learnNewSkill,
    endSession,
    setIsReflection,
    setLearnNewSkill,
    setEndSession,
    initReflectionState,
} = useReflectionState();

const {
    chat,
    waitingForResponse,
    recommendationArr,
    initChat,
    fetchNewQuestion,
    addUserResponse,
    fetchRecommendation,
    RECOMMENDATION_QUESTION,
} = useChat();

const { getSession } = useAuth();
const session = await getSession();
const layout = "board";
const userImage = session?.user?.image ? session.user.image : dummyAvatar;

const message = ref("");
const chatbox = ref<HTMLElement | null>(null);
const lastUserResponse = ref<string>("");
const hasAtLeastMinNumberResponses = computed(() => {
    return (
        chat.value.questionResponses.length > MIN_RESPONSES_COUNT &&
        chat.value.questionResponses[MIN_RESPONSES_COUNT - 1].response != null
    );
});

const sendMessage = async () => {
    let text = message.value.trim();
    message.value = "";
    if (text.length !== 0) {
        addUserResponse(text);

        if (!hasAtLeastMinNumberResponses.value) await fetchNewQuestion(text);
    }
    lastUserResponse.value = text;

    await nextTick();
    scrollToBottom();
};

const getOneMoreQuestion = async () => {
    await fetchNewQuestion(lastUserResponse.value);
    await nextTick();
    scrollToBottom();
};

const scrollToBottom = () => {
    if (chatbox.value != null)
        chatbox.value.scrollTo({
            top: chatbox.value.scrollHeight + 500000,
            behavior: "smooth",
        });
};

const postReflection = async () => {
    // POST reflection data to server
    console.log("posting reflection");
    const questionsAndResponses = chat.value.questionResponses.map((item) => ({
        questionId: item.id,
        response: item.response as string,
    }));
    const skillId = skill.value ? skill.value.id : -1;
    const payload: Reflection = {
        date: chat.value.date,
        moodRating: moodRating.value as number,
        skillId: skillId,
        skillRatingId: skillRating.value as number,
        questionsAndResponses,
    };
    console.log(payload);
};

onMounted(() => {
    initMoodRating();
    initSkill();
    initSkillRating();
    initChat();
    initReflectionState();
});
</script>

<style scoped lang="scss">
@use "~/assets/scss/reflection.scss";
</style>
