export const useSkillRating = () => {
    const skillRating = useState<number | null>("skillRating", () => null);
    const skillRated = useState<Boolean>(
        "skillRated",
        () => skillRating.value != null
    );
    const setSkillRating = (newSkillRating: number | null) => {
        if (!skillRating.value && newSkillRating != null) {
            skillRating.value = newSkillRating;
            if (import.meta.client)
                localStorage.setItem(
                    "skillRating",
                    JSON.stringify(skillRating.value)
                );
            skillRated.value = true;
        }
    };

    const initSkillRating = () => {
        setSkillRating(getSkillRating());
    };

    return { skillRating, skillRated, setSkillRating, initSkillRating };
};
