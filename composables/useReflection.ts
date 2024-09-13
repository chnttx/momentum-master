import { type Chat } from "~/types/chat";
import { type SkillRating } from "~/types/skillRating";

export default function () {
    const chats = ref<Chat[]>([]);
    const moodRating = ref<Number | null>(null);
    const skills = ref<string[]>([]);
    const skillRatings = ref<SkillRating[]>([]);
    const isReflection = ref<Boolean>(true);

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

    onMounted(() => {
        chats.value = getChats();
        moodRating.value = getMoodRating();
        skills.value = getSkills();
        skillRatings.value = getSkillRatings();
        isReflection.value = getIsReflection();
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
        updateMoodRating,
        updateSkillRatings,
        updateSkills,
        toggleIsReflection,
    };
}
