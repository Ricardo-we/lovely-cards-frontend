import { useState, useEffect } from "react";
import { APIURL } from "../../App";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "../public-components/Modal";
import '../../css/ManageCardContents.css'
import AddCardMessageForm, { UpdateCardMessageForm }from './forms/CardMessagesForms';
import AddCardImageForm from "./forms/CardImagesForms";
import MessageManagementCard, { ImageManagementCard } from "./components/Card";
import NavBar from "../public-components/Navbar";

// MANAGE ANY CARD MESSAGE OR IMAGE
function ManageCardContents() {
    const navigate = useNavigate()
    if(!sessionStorage.getItem('username') || !sessionStorage.getItem('user_id'))navigate('/login')
    const { cardId } = useParams(); 
    const [cardMessages, setCardMessages] = useState([{id:0}]);
    const [cardImages, setCardImages] = useState([{id:0}])
    const [addCardImageModal, setAddCardImageModal] = useState(false);
    const [addCardMessageModal, setAddCardMessageModal] = useState(false);
    const [updateCardMessageModal, setUpdateCardMessageModal] = useState(false);
    const [actualCardMessage, setActualCardMessage] = useState('')

    const getCardContents = async () => {
        const response1 = await fetch(`${APIURL}/card-contents/${cardId}`);
        const cardMessages = await response1.json();

        const response2 = await fetch(`${APIURL}/card-images/${cardId}`);
        const cardImages = await response2.json();

        setCardMessages(cardMessages)
        setCardImages(cardImages)
    }

    useEffect(() => {
        getCardContents()
    }, [])

    return ( 
        <>
        <NavBar/>
            <Modal 
                visible={updateCardMessageModal} 
                component={<UpdateCardMessageForm actionOnSubmit={getCardContents} cardMessage={actualCardMessage}/>} 
                onHideModal={() => setUpdateCardMessageModal(false)}
            />
            <Modal 
                visible={addCardImageModal} 
                component={<AddCardImageForm actionOnSubmit={getCardContents} cardId={cardId}/>} 
                onHideModal={() => setAddCardImageModal(false)}
            />
            <Modal 
                visible={addCardMessageModal} 
                component={<AddCardMessageForm actionOnSubmit={getCardContents} cardId={cardId}/>} 
                onHideModal={() => setAddCardMessageModal(false)}
            />
            <main className="container-xxl d-flex flex-row flex-wrap align-items-center justify-content-around">

                <button 
                    className="btn bg-primary add-content-btn" 
                    title="Add message" 
                    onClick={() => setAddCardMessageModal(true)}
                    >
                    <h4 className="add-content-btn-title">Add message</h4>
                    <i className="far fa-plus-square"></i>
                </button>

                <button 
                    className="btn bg-primary add-content-btn" 
                    title="Add image"
                    onClick={() => setAddCardImageModal(true)}
                    >
                    <h4 className="add-content-btn-title">Add image</h4>
                    <i className="far fa-plus-square"></i>
                </button>
                {cardMessages.map(card => <MessageManagementCard 
                    openUpdateModal={() =>{
                        setUpdateCardMessageModal(true);
                        setActualCardMessage(card);
                    }} 
                    onActionsMethod={getCardContents} 
                    key={card.id} 
                    cardData={card}
                />)}
                {cardImages.map(card => <ImageManagementCard onActionsMethod={getCardContents} key={card.id} cardData={card}/>)}
            </main>
        </>
    );
}

export default ManageCardContents;