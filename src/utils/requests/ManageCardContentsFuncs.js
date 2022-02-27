import { APIURL } from "../../App";

export default async function getAllCardContents(cardId){
    const response1 = await fetch(`${APIURL}/card-contents/${cardId}`);
    const cardMessages = await response1.json();

    const response2 = await fetch(`${APIURL}/card-images/${cardId}`);
    const cardImages = await response2.json();

    return {cardMessages, cardImages};
}   
// --------------------------CARD IMAGES REQUESTS-----------------------//

export async function submitCardImage(cardImage, cardId){
    const formData = new FormData();
    formData.append('card-image', cardImage, cardImage.name);
    
    const response = await fetch(`${APIURL}/card-images/${cardId}`,{
        method: 'POST',
        body: formData
    })
    const finalResponse = await response.json();

    return await finalResponse;
}

export async function submitCardImageDelete(cardData){
    const formData = new FormData();
    formData.append('image-id',cardData.image_id);

    return await fetch(`${APIURL}/card-images/${cardData.id}`, {method: 'DELETE', body:formData})
}

// --------------------------CARD MESSAGES REQUESTS-----------------------//

export async function submitCardMessage(cardHeading, cardMessage, cardId){
    const formData = new FormData();
    formData.append('heading', cardHeading);
    formData.append('content', cardMessage);
    
    const response = await fetch(`${APIURL}/card-contents/${cardId}`,{
        method: 'POST',
        body: formData
    })
    const finalResponse = await response.json();

    return await finalResponse;
}

export async function submitCardMessageUpdate(cardHeading, cardMessage, cardMessageId){
    const formData = new FormData();
    formData.append('heading', cardHeading);
    formData.append('content', cardMessage);
    
    const response = await fetch(`${APIURL}/card-contents/${cardMessageId}`,{
        method: 'PUT',
        body: formData
    })
    const finalResponse = await response.json();

    return await finalResponse;
}

export const submitCardMessageDelete = async (id) => await fetch(`${APIURL}/card-contents/${id}`, {method: 'DELETE'})


// export function getAllCardContents2(cardId){
//     const response1 = fetch(`${APIURL}/card-contents/${cardId}`);
//     const response2 = fetch(`${APIURL}/card-images/${cardId}`);

//     return Promise.all([response1, response2])
//     .then(values => {
//         values.forEach(value => {
//             value.json()
//             .then(finalRes => {
//                 console.log(finalRes)
//             })
//         })
//     })
// 3}