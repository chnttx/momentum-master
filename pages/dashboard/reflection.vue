<template>
    <NuxtLayout :name="layout">
        <div class="page-container">
            <div v-if="endSession" id="end-session">
                Today's reflection session is completed (read-only)
            </div>
            <div class="reflection-container">
                <!-- Chat -->
                <div id="chat" ref="chat">
                    <!-- Mood Rating Slider -->
                    <div class="message ai-message">
                        <img
                            src="@/assets/images/ai.jpg"
                            class="ai-img"
                            alt="AI"
                        />
                        <Slider
                            :min="0"
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
                            :min="0"
                            :max="10"
                            :texts="[`Shu`, `Ha`, `Ri`]"
                            :question="`How would you rate your skill?`"
                            :rating="`skill`"
                        />
                    </div>
                    <!-- Reflection messages -->
                    <div
                        v-for="(chat, i) in chats"
                        :key="i"
                        class="message"
                        :class="chat.isUser ? 'user-message' : 'ai-message'"
                    >
                        <img
                            v-if="!chat.isUser"
                            src="@/assets/images/ai.jpg"
                            class="ai-img"
                            alt="AI"
                        />
                        <div
                            class="text"
                            :class="chat.isUser ? 'user-text' : 'ai-text'"
                        >
                            {{ chat.text }}
                        </div>
                        <img v-if="chat.isUser" :src="userImage" alt="user" />
                    </div>
                </div>

                <div class="container">
                    <!-- Buttons -->
                    <div
                        v-if="isReflection"
                        class="complete-btn"
                        @click="toggleIsReflection"
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
                        v-if="!isReflection && !learnNewSkill"
                        class="complete-btn"
                        @click="toggleLearnNewSkill"
                    >
                        <UButton
                            color="black"
                            :ui="{ rounded: 'rounded-full' }"
                        >
                            Would you like to learn a new skill
                        </UButton>
                    </div>

                    <div
                        v-if="!isReflection && learnNewSkill && !endSession"
                        class="complete-btn"
                        @click="toggleEndSession"
                    >
                        <UButton
                            color="black"
                            :ui="{ rounded: 'rounded-full' }"
                        >
                            End today's session
                        </UButton>
                    </div>

                    <!-- Message input -->
                    <form
                        v-if="!endSession"
                        @keyup.enter.prevent="sendMessage"
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
                                !(moodRated && skillSelected && skillRated) ||
                                (!isReflection && !learnNewSkill) ||
                                endSession
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
import { type Chat } from "../../types/Chat";

const { moodRated, moodRating, initMoodRating } = useMoodRating();
const { skillRated, initSkillRating } = useSkillRating();
const { skillSelected, initSkill } = useSkill();
const { getSession } = useAuth();
const session = await getSession();
const layout = "board";
const userImage = session?.user?.image ? session.user.image : dummyAvatar;

const {
    chats,
    isReflection,
    learnNewSkill,
    endSession,
    toggleIsReflection,
    toggleLearnNewSkill,
    toggleEndSession,
} = useReflection();

const message = ref("");
const chat = ref<HTMLElement | null>(null);

const alternate = ref<Boolean>(false); //Dev

const sendMessage = () => {
    let text = message.value.trim();
    if (text.length !== 0) {
        chats.value.push({
            // isUser: true,
            isUser: alternate.value, // Dev
            isReflection: isReflection.value,
            text: text,
            time: Date.now(),
        });
        message.value = "";

        alternate.value = !alternate.value; // Dev
    }

    // Get chatgpt response and add to chat
    chat.value.scrollTo(0, chat.value.scrollHeight);
};

onMounted(() => {
    initMoodRating();
    initSkill();
    initSkillRating();
    console.log(moodRated.value);
});
</script>

<style scoped lang="scss">
@use "~/assets/scss/reflection.scss";
</style>
