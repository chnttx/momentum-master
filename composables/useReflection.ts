import { type Chat } from "~/types/chat";

/**
 * Contains reactive variables and functions for the reflection function
 * @returns reactive varaibles and state mutation functions
 */
export default function () {
    const chats = ref<Chat[]>([]);
    const moodRating = ref<Number | null>(null);
    const skill = ref<string | null>(null);
    const skillRating = ref<number | null>(null);
    const isReflection = ref<Boolean>(true);
    const learnNewSkill = ref<Boolean>(false);
    const endSession = ref<Boolean>(false);

    const moodRated = computed(() => {
        return moodRating.value != null;
    });

    const skillSelected = computed(() => {
        return skill.value != null;
    });

    const skillsRated = computed(() => {
        return skillRating.value !== null;
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

    watch(skill, () => {
        localStorage.setItem("skill", JSON.stringify(skill.value));
    });

    watch(skillRating, () => {
        localStorage.setItem("skillRating", JSON.stringify(skillRating.value));
    });

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

    function updateSkill(selectedSkill: string) {
        console.log(selectedSkill);
        console.log("updated");
        skill.value = selectedSkill;
    }

    function updateSkillRating(newSkillRating: number) {
        skillRating.value = newSkillRating;
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
        skill.value = getSkill();
        skillRating.value = getSkillRating();
        isReflection.value = getIsReflection();
        learnNewSkill.value = getLearnNewSkill();
        endSession.value = getEndSession();
    });

    return {
        chats,
        moodRating,
        moodRated,
        skill,
        skillSelected,
        skillRating,
        skillsRated,
        isReflection,
        learnNewSkill,
        endSession,
        updateMoodRating,
        updateSkillRating,
        updateSkill,
        toggleIsReflection,
        toggleLearnNewSkill,
        toggleEndSession,
    };
}
