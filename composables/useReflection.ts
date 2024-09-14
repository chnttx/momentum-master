import { type Chat } from "~/types/chat";
import { type SkillRating } from "~/types/skillRating";

/**
 * Contains reactive variables and functions for the reflection function
 * @returns reactive varaibles and state mutation functions
 */
export default function () {
    const chats = ref<Chat[]>([]);
    const moodRating = ref<Number | null>(null);
    const skills = ref<string[]>([]);
    const skillRatings = ref<SkillRating[]>([]);
    const isReflection = ref<Boolean>(true);
    const learnNewSkill = ref<Boolean>(false);
    const endSession = ref<Boolean>(false);

    const moodRated = computed(() => {
        return moodRating.value != null;
    });

    const skillSelected = computed(() => {
        return skills.value?.length !== 0;
    });

    const skillsRated = computed(() => {
        return skillRatings.value?.length !== 0;
    });

    watch(
        chats,
        () => {
            localStorage.setItem("chats", JSON.stringify(chats.value));
        },
        { deep: true }
    );

    watch(moodRating, () => {
        localStorage.setItem("moodRating", JSON.stringify(moodRating.value));
    });

    watch(
        skills,
        () => {
            localStorage.setItem("skills", JSON.stringify(skills.value));
        },
        { deep: true }
    );

    watch(
        skillRatings,
        () => {
            localStorage.setItem(
                "skillRatings",
                JSON.stringify(skillRatings.value)
            );
        },
        { deep: true }
    );

    watch(isReflection, () => {
        localStorage.setItem(
            "isReflection",
            JSON.stringify(isReflection.value)
        );
    });

    watch(learnNewSkill, () => {
        localStorage.setItem(
            "learnNewSkill",
            JSON.stringify(learnNewSkill.value)
        );
    });

    watch(endSession, () => {
        localStorage.setItem("endSession", JSON.stringify(endSession.value));
    });

    function updateMoodRating(rating: Number) {
        moodRating.value = rating;
    }

    function updateSkills(selectedSkills: string[]) {
        skills.value = selectedSkills;
    }

    function updateSkillRatings(newSkillRatings: SkillRating[]) {
        skillRatings.value = newSkillRatings;
    }

    function toggleIsReflection() {
        isReflection.value = !isReflection.value;
    }

    function toggleLearnNewSkill() {
        learnNewSkill.value = !learnNewSkill.value;
    }

    function toggleEndSession() {
        endSession.value = !endSession.value;
    }

    onMounted(() => {
        chats.value = getChats();
        moodRating.value = getMoodRating();
        skills.value = getSkills();
        skillRatings.value = getSkillRatings();
        isReflection.value = getIsReflection();
        learnNewSkill.value = getLearnNewSkill();
        endSession.value = getEndSession();
    });

    return {
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
    };
}
