import { APIURL } from "../../../App";
import '../../../css/ManageCardContents.css'

export default function MessageManagementCard({ cardData, onActionsMethod, openUpdateModal }) {
    
    const deleteCard = async () => {
        await fetch(`${APIURL}/card-contents/${cardData.id}`, {method: 'DELETE'})
        onActionsMethod()
    }

    return ( 
        <div className="card-contents">
            <h1 style={{fontSize:'35px', transition: '500ms'}}>{cardData.heading}</h1>
            <p style={{fontSize: '20px'}}>{cardData.content}</p>
            <div className="options-container">
                <button className="btn btn-danger" onClick={deleteCard}>
                    <i className="fas fa-trash-alt"></i>
                </button> 
                <button className="btn btn-success" onClick={openUpdateModal}>
                    <i className="fas fa-edit"></i>
                </button> 
            </div>
        </div>
    );
}

export function ImageManagementCard({ cardData, onActionsMethod }){
    const deleteCard = async () => {
        const formData = new FormData();
        formData.append('image-id',cardData.image_id);

        await fetch(`${APIURL}/card-images/${cardData.id}`, {method: 'DELETE', body:formData})
        onActionsMethod()
    }

    return(
        <div className="card-contents">
            <img src={cardData.image} alt="" />
            <div className="options-container">
                <button className="btn btn-danger" onClick={deleteCard}>
                    <i className="fas fa-trash-alt"></i>
                </button> 
            </div>
        </div>
    )
}


