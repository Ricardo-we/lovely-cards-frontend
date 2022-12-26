import { submitCardImage } from "../../../utils/requests/ManageCardContentsFuncs";
import { useState } from "react";

export default function AddCardImageForm({ cardId, actionOnSubmit }) {
    const [cardImage, setCardImage] = useState('');
    
    const addCardImage = async (e) => {
        e.preventDefault();
        await submitCardImage(cardImage, cardId)
        actionOnSubmit && actionOnSubmit();
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
                <button className="btn btn-secondary" style={{width:'100%'}} type="submit">Submit</button>
            </form>
        </>
    )
}
