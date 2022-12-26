import { APIURL } from "../../App";

export default async function getCardData(cardID) {
	const response = await fetch(`${APIURL}/full-card/${cardID}`);
	return await response.json();
}
