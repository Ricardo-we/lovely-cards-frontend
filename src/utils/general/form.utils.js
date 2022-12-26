export const getFormChangeHandler = (setState) => {
	return (e) => {
		return setState((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
};

export const jsonToFormData = (jsonForm={}) => {
	const formData = new FormData();
	Object.entries(jsonForm).forEach(([key, value]) =>
		value?.name
			? formData.append(key, value, value.name)
			: formData.append(key, value),
	);
    return formData;
};
