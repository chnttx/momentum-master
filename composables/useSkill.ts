import type { Skill } from "~/types/Skill";

export const useSkill = () => {
    const skill = useState<Skill | null>("skill", () => null);
    const skillSelected = useState<Boolean>(
        "skillSelected",
        () => skill.value != null
    );
    const setSkill = (newSkill: Skill | null) => {
        if (!skill.value && newSkill != null) {
            skill.value = newSkill;
            if (import.meta.client)
                localStorage.setItem("skill", JSON.stringify(skill.value));
            skillSelected.value = true;
        }
    };

    const initSkill = () => {
        setSkill(getSkill());
    };

    return { skill, skillSelected, setSkill, initSkill };
};
