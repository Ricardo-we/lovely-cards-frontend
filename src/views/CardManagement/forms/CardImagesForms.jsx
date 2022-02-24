import { useState } from "react";
import { APIURL } from "../../../App";

export default function AddCardImageForm({ cardId, actionOnSubmit }) {
    const [cardImage, setCardImage] = useState('');
    
    const addCardImage = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('card-image', cardImage, cardImage.name);
        
        const response = await fetch(`${APIURL}/card-images/${cardId}`,{
            method: 'POST',
            body: formData
        })
        const finalResponse = await response.json();
        if(finalResponse.message === 'success') actionOnSubmit();
        else throw Error('Something went wrong')
    }

    return (
        <>  
            <h1>Add card image</h1>
            <form className="form" style={{width:'80%'}} onSubmit={addCardImage}>
                <input 
                    accept="image/*"
                    placeholder="Card image" 
                    type="file" 
                    className="form-control" 
                    onChange={e => setCardImage(e.target.files[0])}
                />    
                <button className="btn btn-secondary" style={{width:'100%'}} type="submit">ADD</button>
            </form>
        </>
    )
}
