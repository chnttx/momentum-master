<template>
    <NuxtLayout :name="layout">
        <div class="page-container">
            <div v-if="endSession" id="end-session">
                Today's reflection session is completed
            </div>
            <div
                class="reflection-container"
                :class="endSession ? 'zero-padding-top' : ''"
            >
                <!-- Chat -->
                <div id="chat" ref="chat">
                    <!-- Mood Rating Slider -->
                    <!-- Skill Selection Dropdown Menu -->
                    <!-- Skill Rating Slider -->
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
                                // !(moodRated && skillSelected && skillRated) ||
                                (!isReflection && !learnNewSkill) ||
                                endSession ||
                                false
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
import { type Chat } from "../../types/chat";
import { type SkillRating } from "../../types/skillRating";

const { getSession } = useAuth();
const session = await getSession();
const layout = "board";
const userImage = session?.user?.image ? session.user.image : dummyAvatar;

const {
    chats,
    moodRating,
    moodRated,
    skills,
    skillSelected,
    skillRatings,
    skillsRated,
    isReflection,
    learnNewSkill,
    endSession,
    updateMoodRating,
    updateSkillRatings,
    updateSkills,
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
</script>

<style scoped lang="scss">
@use "~/assets/scss/reflection.scss";
</style>
