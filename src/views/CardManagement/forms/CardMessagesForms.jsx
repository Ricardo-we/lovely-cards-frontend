import { useState, useEffect } from "react";
import { APIURL } from "../../../App";

export default function AddCardMessageForm({ cardId, actionOnSubmit }){
    const [cardHeading, setCardHeading] = useState('');
    const [cardMessage, setCardMessage] = useState('');
    
    const addCardMessage = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('heading', cardHeading);
        formData.append('content', cardMessage);
        
        const response = await fetch(`${APIURL}/card-contents/${cardId}`,{
            method: 'POST',
            body: formData
        })
        const finalResponse = await response.json();
        if(finalResponse.message === 'success') actionOnSubmit();
        else throw Error('Something went wrong')
    }

    return (
        <>  
            <h1>Add card message</h1>
            <form className="form" style={{width:'80%'}} onSubmit={addCardMessage}>
                <input placeholder="Card heading" type="text" className="form-control" onChange={e => setCardHeading(e.target.value)}/>    
                <textarea rows={5} placeholder="Card message" style={{resize: 'none'}} className="form-control" onChange={e => setCardMessage(e.target.value)}></textarea>    
                <button className="btn btn-secondary" style={{width:'100%'}} type="submit">ADD</button>
            </form>
        </>
    )
}

export function UpdateCardMessageForm({ cardMessage, actionOnSubmit }){
    const [cardHeading, setCardHeading] = useState('');
    const [cardMessageInput, setCardMessageInput] = useState('');
    
    const addCardMessage = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('heading', cardHeading);
        formData.append('content', cardMessageInput);
        
        const response = await fetch(`${APIURL}/card-contents/${cardMessage.id}`,{
            method: 'PUT',
            body: formData
        })
        const finalResponse = await response.json();
        if(finalResponse.message === 'success') actionOnSubmit();
        else throw Error('Something went wrong')
    }

    useEffect(() => {
        setCardHeading(cardMessage.heading);
        setCardMessageInput(cardMessage.content);
    }, [cardMessage])

    return (
        <>  
            <h1>Update card message</h1>
            <form className="form" style={{width:'80%'}} onSubmit={addCardMessage}>
                <input 
                    placeholder="Card heading" 
                    value={cardHeading}
                    type="text" className="form-control" 
                    onChange={e => setCardHeading(e.target.value)}
                />    
                <textarea 
                    rows={5} 
                    value={cardMessageInput}
                    placeholder="Card message" 
                    style={{resize: 'none'}} 
                    className="form-control" 
                    onChange={e => setCardMessageInput(e.target.value)}
                ></textarea>    
                <button className="btn btn-secondary" style={{width:'100%'}} type="submit">ADD</button>
            </form>
        </>
    )
}
