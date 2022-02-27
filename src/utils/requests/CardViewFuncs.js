import { APIURL } from "../../App";

export default async function getCardData(cardID){
    const response = await fetch(`${APIURL}/card/${cardID}`);
    const finalResponse = await response.json();

    const response1 = await fetch(`${APIURL}/card-contents/${cardID}`);
    const cardMessages = await response1.json();

    const response2 = await fetch(`${APIURL}/card-images/${cardID}`);
    const cardImages = await response2.json();

    let mixedCards = [...cardMessages, ...cardImages] 

    for(let i in mixedCards){
        for(let j = 1; j < mixedCards.length; j++){
            if(mixedCards[j-1].id > mixedCards[j].id){
                let tmpVar = mixedCards[j-1];
                mixedCards[j-1] = mixedCards[j];
                mixedCards[j] = tmpVar;
            }
        }
    }

    return {mixedCards, music: finalResponse[0].music};

}