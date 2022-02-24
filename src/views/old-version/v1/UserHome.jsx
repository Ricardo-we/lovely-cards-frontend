import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { APIURL } from "../App";
import Modal from "./Modal";
import CardUpdateForm, { Input } from "./forms/CardUpdateForm";
import '../css/UserHome.css';

function UserHome() {
    // ------------------------STATES----------------------//
    const [cards, setCards] = useState([{id: 0}]);
    const [modalVisible, setModalVisible] = useState(false);
    const [updateFormData, setUpdateFormData] = useState({id:0, title:'',content:''});
    const [form, setForm] = useState({
        title: '',
        content: '',
        backgroundImage: null,
        firstImage: null,
        secondImage: null,
        music: null
    });

    // ------------------PUBLIC VARS----------------------// 
    const userId = sessionStorage.getItem('user_id');
    const username = sessionStorage.getItem('username');
    const navigate = useNavigate();

    // ------------------FUNCTIONS-------------------//
    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);

    const getCards = async () => {
        const response = await fetch(`${APIURL}/manage-cards/${userId}`)
        const cardsData = await response.json();
        setCards(cardsData); 
    }

    const addCard = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('userId', userId)
        formData.append('title', form.title)
        formData.append('content', form.content)
        formData.append('background-image', form.backgroundImage, form.backgroundImage.name)
        formData.append('first-image', form.firstImage,  form.firstImage.name)
        formData.append('second-image', form.secondImage,  form.secondImage.name)
        formData.append('music', form.music, form.music.name)

        const response = await fetch(`${APIURL}/manage-cards/`, {
            method: 'POST',
            body: formData
        })
        const finalResponse = await response.json();

        cards.push(finalResponse);
        setCards([...cards]);
    }

    useEffect(() =>{
        if(!sessionStorage.getItem('username') || !userId) navigate('/login');
        getCards();
    }, [])

    return ( 
        <div className="container">
            <Modal 
                visible={modalVisible} 
                onHideModal={closeModal} 
                component={<CardUpdateForm id={updateFormData.id} oldContent={updateFormData.content} oldTitle={updateFormData.title} onUpdate={() => {
                    closeModal()
                    getCards()
                }}/>}
            />

            <h1>Add a card!</h1>
            <form onSubmit={addCard} method="POST" className="form">
                <Input name="title" onChange={(e) => setForm({...form, title: e.target.value})}/>
                <textarea 
                    name="content" 
                    className="form-control"
                    style={{resize:'none'}} 
                    onChange={(e) => setForm({...form, content: e.target.value})}
                    placeholder="Content"
                ></textarea>

                <label htmlFor="">Background image</label>
                <Input type="file" name="background" onChange={(e) => setForm({...form, backgroundImage: e.target.files[0]})}/>

                <label htmlFor="">First image</label>
                <Input type="file" placeholder="image-1" onChange={(e) =>{ 
                    setForm({...form, firstImage: e.target.files[0]})
                }}/>

                <label htmlFor="">Second image</label>
                <Input type="file" placeholder="image-2" onChange={(e) => setForm({...form, secondImage: e.target.files[0]})}/>

                <label htmlFor="">Music</label>
                <Input type="file" placeholder="music" onChange={(e) => setForm({...form, music: e.target.files[0]})}/>
                <button title="add card" type="submit" className="btn btn-primary" style={{width: '100%'}}>CREATE</button>
            </form>
            
            <div className="container d-flex flex-wrap align-items-center justify-content-evenly">
                {cards.map(card => (
                    <CardLink 
                        key={card.id}
                        card={card} 
                        openModal={openModal} 
                        updateCardData={(card) => setUpdateFormData(card)}
                    />
                ))}
            </div>
        </div>    
    );
}

const CardLink = ({ card, openModal, updateCardData=(card) => {} }) => {
    const [cardVisible, setCardVisible] = useState(true);

    const deleteCard = async (e) => {
        await fetch(`${APIURL}/manage-cards/${card.id}`, {method: 'DELETE'})
        setCardVisible(false)
    } 

    return (
        <div className={cardVisible?"card card-link":'d-none'}>
            <Link className="card-link-body" to={`/card-view/${card.id}`}>
                <img className="card-img-top card-link-img" src={card['background-image']}/>
                <div className="card-body" style={{marginBottom: '0'}}>
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-text">{card.title}</p>
                </div>
            </Link>
            <div className="card-options">
                <button className="btn btn-danger" onClick={deleteCard}>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
                <button className="btn btn-success" onClick={() => {
                    updateCardData(card)
                    openModal()
                }}>
                    <i className="fas fa-edit"></i>
                </button>
            </div>
        </div>
    )
}

export default UserHome;