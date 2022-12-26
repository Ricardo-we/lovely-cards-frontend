import {
	submitCardMessage,
	submitCardMessageUpdate,
} from "../../../utils/requests/ManageCardContentsFuncs";
import { useEffect, useState } from "react";

import { getFormChangeHandler } from "../../../utils/general/form.utils";

export default function CardMessageForm({
	cardId,
	buttonText = "Submit",
	title = "Add card message",
	defaultValues,
	onSubmit,
}) {
	const [formState, setFormState] = useState({ ...defaultValues });
	const handleChange = getFormChangeHandler(setFormState);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit && onSubmit(formState);
	};

	useEffect(() => {
		if (defaultValues) setFormState(defaultValues);
	}, [defaultValues]);

	return (
		<>
			<h1>{title}</h1>
			<form
				className="form"
				style={{ width: "80%" }}
				onSubmit={handleSubmit}
			>
				<input
					placeholder="Card heading"
					type="text"
					className="form-control"
					name="heading"
					value={formState?.heading}
					onChange={handleChange}
				/>
				<textarea
					rows={5}
					placeholder="Card message"
					name="content"
					style={{ resize: "none" }}
					className="form-control"
					value={formState?.content}
					onChange={handleChange}
				></textarea>
				<input
					placeholder="Card heading"
					type="color"
					className="form-control form-control-color w-100"
					name="card_color"
					value={formState?.card_color}
					onChange={handleChange}
				/>

				<button
					className="btn btn-secondary"
					style={{ width: "100%" }}
					type="submit"
				>
					{buttonText}
				</button>
			</form>
		</>
	);
}
