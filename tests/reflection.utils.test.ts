// @vitest-environment happy-dom
import { afterEach, describe, expect, test, vi } from "vitest";
import resetReflectionLocalStorage from "~/utils/reflection/resetReflectionLocalStorage";

const CHATS_KEY = "chats";
const END_SESSION_KEY = "endSession";
const IS_REFLECTION_KEY = "isReflection";
const LEARN_NEW_SKILL_KEY = "learnNewSkill";
const MOOD_RATING_KEY = "moodRating";
const SKILL_RATING_KEY = "skillRating";
const SKILL_KEY = "skill";
const DAY_IN_MILLISECONDS = 8.64e7;

describe("Reflection Utils", () => {
    const getItemSpy = vi.spyOn(localStorage, "getItem");
    const setItemSpy = vi.spyOn(localStorage, "setItem");
    const removeItemSpy = vi.spyOn(localStorage, "removeItem");

    afterEach(() => {
        localStorage.clear();
        getItemSpy.mockClear();
        setItemSpy.mockClear();
    });

    describe("getChats", () => {
        test("gets chats from LocalStorage when it exists", () => {
            const chats = [
                {
                    isUser: false,
                    isReflection: false,
                    text: "This is a message",
                    time: Date.now(),
                },
                {
                    isUser: true,
                    isReflection: true,
                    text: "This is a message",
                    time: Date.now(),
                },
            ];
            localStorage.setItem(CHATS_KEY, JSON.stringify(chats));
            expect(getChats()).toStrictEqual(chats);
            expect(getItemSpy).toHaveBeenCalledWith(CHATS_KEY);
        });

        test("gets empty chats from LocalStorage for a new day", () => {
            const chats = [
                {
                    isUser: false,
                    isReflection: false,
                    text: "This is a message",
                    time: Date.now() - DAY_IN_MILLISECONDS,
                },
                {
                    isUser: true,
                    isReflection: true,
                    text: "This is a message",
                    time: Date.now() - DAY_IN_MILLISECONDS,
                },
            ];
            localStorage.setItem(CHATS_KEY, JSON.stringify(chats));
            expect(getChats()).toHaveLength(0);
            expect(getItemSpy).toHaveBeenCalledWith(CHATS_KEY);
        });

        test("gets empty chats from LocalStorage when it doesn't exist", () => {
            expect(getChats()).toHaveLength(0);
            expect(getItemSpy).toHaveBeenCalledWith(CHATS_KEY);
        });
    });

    describe("getEndSession", () => {
        test("gets endSession from LocalStorage when it exists", () => {
            const endSession = false;
            localStorage.setItem(END_SESSION_KEY, JSON.stringify(endSession));
            expect(getEndSession()).toStrictEqual(endSession);
            expect(getItemSpy).toHaveBeenCalledWith(END_SESSION_KEY);
        });

        test("gets endSession from LocalStorage when it doesn't exist", () => {
            expect(getEndSession()).toStrictEqual(false);
            expect(getItemSpy).toHaveBeenCalledWith(END_SESSION_KEY);
        });
    });

    describe("getIsReflection", () => {
        test("gets isReflection from LocalStorage when it exists", () => {
            const isReflection = false;
            localStorage.setItem(
                IS_REFLECTION_KEY,
                JSON.stringify(isReflection)
            );
            expect(getIsReflection()).toStrictEqual(isReflection);
            expect(getItemSpy).toHaveBeenCalledWith(IS_REFLECTION_KEY);
        });

        test("gets isReflection from LocalStorage when it doesn't exist", () => {
            expect(getIsReflection()).toStrictEqual(true);
            expect(getItemSpy).toHaveBeenCalledWith(IS_REFLECTION_KEY);
        });
    });

    describe("getLearnNewSkill", () => {
        test("gets learnNewSkill from LocalStorage when it exists", () => {
            const learnNewSkill = false;
            localStorage.setItem(
                LEARN_NEW_SKILL_KEY,
                JSON.stringify(learnNewSkill)
            );
            expect(getLearnNewSkill()).toStrictEqual(learnNewSkill);
            expect(getItemSpy).toHaveBeenCalledWith(LEARN_NEW_SKILL_KEY);
        });

        test("gets learnNewSkill from LocalStorage when it doesn't exist", () => {
            expect(getLearnNewSkill()).toStrictEqual(false);
            expect(getItemSpy).toHaveBeenCalledWith(LEARN_NEW_SKILL_KEY);
        });
    });

    describe("getMoodRating", () => {
        test("gets moodRating from LocalStorage when it exists", () => {
            const moodRating = 1;
            localStorage.setItem(MOOD_RATING_KEY, JSON.stringify(moodRating));
            expect(getMoodRating()).toStrictEqual(moodRating);
            expect(getItemSpy).toHaveBeenCalledWith(MOOD_RATING_KEY);
        });

        test("gets moodRating from LocalStorage when it doesn't exist", () => {
            expect(getMoodRating()).toBeNull();
            expect(getItemSpy).toHaveBeenCalledWith(MOOD_RATING_KEY);
        });
    });

    describe("getSkillRating", () => {
        test("gets skillRating from LocalStorage when it exists", () => {
            const skillRating = 7;
            localStorage.setItem(SKILL_RATING_KEY, JSON.stringify(skillRating));
            expect(getSkillRating()).toStrictEqual(skillRating);
            expect(getItemSpy).toHaveBeenCalledWith(SKILL_RATING_KEY);
        });

        test("gets null skillRating from LocalStorage when it doesn't exist", () => {
            expect(getSkillRating()).toBeNull();
            expect(getItemSpy).toHaveBeenCalledWith(SKILL_RATING_KEY);
        });
    });

    describe("getSkill", () => {
        test("gets skill from LocalStorage when it exists", () => {
            const skill = "This is a skill";
            localStorage.setItem(SKILL_KEY, JSON.stringify(skill));
            expect(getSkill()).toStrictEqual(skill);
            expect(getItemSpy).toHaveBeenCalledWith(SKILL_KEY);
        });

        test("gets empty skill from LocalStorage when it doesn't exist", () => {
            expect(getSkill()).toBeNull();
            expect(getItemSpy).toHaveBeenCalledWith(SKILL_KEY);
        });
    });

    describe("resetReflectionLocalStorage", () => {
        test("reset reflection LocalStorage", () => {
            resetReflectionLocalStorage();
            expect(removeItemSpy).toHaveBeenCalledWith(CHATS_KEY);
            expect(removeItemSpy).toHaveBeenCalledWith(END_SESSION_KEY);
            expect(removeItemSpy).toHaveBeenCalledWith(IS_REFLECTION_KEY);
            expect(removeItemSpy).toHaveBeenCalledWith(LEARN_NEW_SKILL_KEY);
            expect(removeItemSpy).toHaveBeenCalledWith(MOOD_RATING_KEY);
            expect(removeItemSpy).toHaveBeenCalledWith(SKILL_RATING_KEY);
            expect(removeItemSpy).toHaveBeenCalledWith(SKILL_KEY);
        });
    });
});
