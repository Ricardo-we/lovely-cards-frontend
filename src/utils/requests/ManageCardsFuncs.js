import { APIURL } from '../../App';

export default async function submitCard(cardName, music, userId){
    const formData = new FormData();
    formData.append("card-name", cardName);
    formData.append("music", music, music.name);

    const response = await fetch(`${APIURL}/manage-cards/${userId}`, {
        method: "POST",
        body: formData,
    });

    return await response.json();
}

export async function submitCardUpdate(cardName, music, id){
    const formData = new FormData();
    if (music) formData.append("music", music, music.name);
    formData.append("card-name", cardName);

    const response = await fetch(`${APIURL}/manage-cards/${id}`, {
        method: "PUT",
        body: formData,
    });

    return response.json();
}

export async function submitDelete(cardId){
    const response = await fetch(`${APIURL}/manage-cards/${cardId}`, {
        method: "DELETE",
    });
    return await response.json()
}

export async function getAllCards(userId){
    const response = await fetch(`${APIURL}/manage-cards/${userId}`);
    return await response.json();
}