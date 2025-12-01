export function getNonEmptyFields(data) {
    return Object.fromEntries(
        Object.entries(data).filter(
            ([_, value]) => value != "" && value !== null && value !== undefined
        )
    );
}

export function resetForm(setForm, initialFormState) {
    return setForm(initialFormState);
}