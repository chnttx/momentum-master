<template>
    <NuxtLayout :name="layout">
        <div class="reflection-container">
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
                        src="@/assets/images/no_moss_logo.png"
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

            <!-- Message input -->
            <form @submit.prevent="sendMessage" class="message-input">
                <UInput
                    color="white"
                    variant="none"
                    v-model="message"
                    :disabled="
                        // !(moodRated && skillSelected && skillRated)
                        false //Dev
                    "
                    :placeholder="
                        moodRated
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
    </NuxtLayout>
</template>

<script setup lang="ts">
import dummyAvatar from "~/assets/images/dummy-avatar.jpg";
import { type Chat } from "../../types/chat";
import { type skillRating } from "../../types/skillRating";

const { getSession } = useAuth();
const layout = "board";
const message = ref("");
const session = await getSession();
const chats = ref<Chat[]>([]);
const moodRated = ref<Boolean>(false);
const moodRating = ref<Number | null>(null);
const skillSelected = ref<Boolean>(false);
const skills = ref<string[]>([]);
const skillsRated = ref<Boolean>(false);
const skillRatings = ref<skillRating[]>([]);
const chat = ref<HTMLElement | null>(null);
const userImage = session?.user?.image ? session.user.image : dummyAvatar;

const alternate = ref<Boolean>(false); //Dev

const sendMessage = () => {
    /* To ChatGPT API */
    if (message.value.length !== 0) {
        chats.value.push({
            // isUser: true,
            isUser: alternate.value, // Dev
            text: message.value,
            time: Date.now(), //- 86400000,
        });
        message.value = "";

        alternate.value = !alternate.value; // Dev
    }
    chat.value.scrollTo(0, chat.value.scrollHeight);
};

const updateMoodRating = () => {
    // update moodRating
};

const updateSkills = () => {
    // update moodRating
};

const updateSkillRatings = () => {
    // update moodRating
};

watch(
    chats,
    () => {
        localStorage.setItem("chats", JSON.stringify(chats.value));
    },
    { deep: true }
);

watch(moodRating, () => {
    localStorage.setItem("moodRating", JSON.stringify(moodRating.value));
    if (moodRating.value != null) moodRated.value = true;
});

watch(
    skills,
    () => {
        if (skills.value?.length !== 0) skillSelected.value = true;
        localStorage.setItem("skills", JSON.stringify(skills.value));
    },
    { deep: true }
);

watch(
    skillRatings,
    () => {
        if (skillRatings.value?.length !== 0) skillRated.value = true;
        localStorage.setItem(
            "skillRatings",
            JSON.stringify(skillRatings.value)
        );
    },
    { deep: true }
);

onMounted(() => {
    chats.value = getChats();
    moodRating.value = getMoodRating();
    skills.value = getSkills();
    skillRatings.value = getSkillRatings();
    moodRated.value = moodRating.value != null;
    skillSelected.value = skills.value?.length !== 0;
    skillsRated.value = skillRatings.value?.length !== 0;
});
</script>

<style scoped lang="scss">
@use "~/assets/scss/reflection.scss";
</style>
