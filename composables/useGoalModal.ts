const component = ref();
const show = ref(false);

export function useGoalModal() {
    return {
        component,
        show,
        showModal: () => (show.value = true),
        hideModal: () => (show.value = false),
    };
}
