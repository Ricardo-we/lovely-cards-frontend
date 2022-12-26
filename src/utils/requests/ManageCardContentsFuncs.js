import { APIURL } from "../../App";
import { jsonToFormData } from "../general/form.utils";

export default async function getAllCardContents(cardId) {
	const response1 = await fetch(`${APIURL}/card-contents/${cardId}`);
	const cardMessages = await response1.json();

	const response2 = await fetch(`${APIURL}/card-images/${cardId}`);
	const cardImages = await response2.json();

	return { cardMessages, cardImages };
}
// --------------------------CARD IMAGES REQUESTS-----------------------//

export async function submitCardImage(cardImage, cardId) {
	const formData = new FormData();
	formData.append("card-image", cardImage, cardImage.name);

	const response = await fetch(`${APIURL}/card-images/${cardId}`, {
		method: "POST",
		body: formData,
	});
	const finalResponse = await response.json();

	return await finalResponse;
}

export async function submitCardImageDelete(cardData) {
	const formData = new FormData();
	formData.append("image-id", cardData.image_id);

	return await fetch(`${APIURL}/card-images/${cardData.id}`, {
		method: "DELETE",
		body: formData,
	});
}

// --------------------------CARD MESSAGES REQUESTS-----------------------//

export async function submitCardMessage(cardData, cardId) {
    const formData = jsonToFormData(cardData);

	const response = await fetch(`${APIURL}/card-contents/${cardId}`, {
		method: "POST",
		body: formData,
	});
	const finalResponse = await response.json();

	return await finalResponse;
}

export async function submitCardMessageUpdate(
	cardData,
	cardMessageId,
) {
	const formData = jsonToFormData(cardData);
    
	const response = await fetch(`${APIURL}/card-contents/${cardMessageId}`, {
		method: "PUT",
		body: formData,
	});
	const finalResponse = await response.json();

	return await finalResponse;
}

export const submitCardMessageDelete = async (id) =>
	await fetch(`${APIURL}/card-contents/${id}`, { method: "DELETE" });
