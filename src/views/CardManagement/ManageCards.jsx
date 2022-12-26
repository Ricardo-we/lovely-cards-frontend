import "../../css/UserHome.css";

import submitCard, { getAllCards, submitCardUpdate, submitDelete } from "../../utils/requests/ManageCardsFuncs";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Modal from "../public-components/Modal";
import NavBar from "../public-components/Navbar";
import { useNavigate } from "react-router-dom";

const UpdateCardForm = ({ oldCardName, id, onSubmitAction }) => {
    const [cardName, setCardName] = useState(oldCardName);
    const [music, setMusic] = useState("");

    const updateCard = async e => {
        e.preventDefault();
        await submitCardUpdate(cardName, music)
        onSubmitAction();
    };

    useEffect(() => {
        setCardName(oldCardName);
    }, [oldCardName]);

    return (
        <form className="form" action="POST" onSubmit={updateCard}>
            <h1>{oldCardName}</h1>
            <input
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                required
                type="text"
                className="form-control"
                placeholder="Card name"
            />
            <input
                type="file"
                onChange={(e) => setMusic(e.target.files[0])}
                placeholder="Background music"
                className="form-control"
                required={false}
            />
            <button
                onClick={updateCard}
                className="btn btn-primary"
                style={{ width: "100%" }}
            >
                ADD
            </button>
        </form>
    );
};

function ManageCards() {
    const [cardName, setCardName] = useState("");
    const [music, setMusic] = useState("");
    const [allCards, setAllCards] = useState([{ id: 0, card_name: "", music: "" },]);
    const [modalVisible, setModalVisible] = useState(false);
    const [updateFormData, setUpdateFormData] = useState({id: 0, oldCardName: "",});

    const userId = sessionStorage.getItem("user_id");
    const navigate = useNavigate();

    const addCard = async (e) => {
        e.preventDefault();
        await submitCard(cardName, music, userId)
        getCards();
    };

    const deleteCard = async (cardId) => {
        await submitDelete(cardId)
        getCards();
    };

    const getCards = async () => {
        const allCards = await getAllCards(userId);
        setAllCards(allCards);
    };

    useEffect(() => {
        if (!sessionStorage.getItem("username") || !userId) navigate("/login");
        getCards();
    }, []);

    return (
        <>
            <NavBar />
            <Modal
                visible={modalVisible}
                component={
                    <UpdateCardForm
                        onSubmitAction={getCards}
                        id={updateFormData.id}
                        oldCardName={updateFormData.oldCardName}
                    />
                }
                onHideModal={() => setModalVisible(false)}
            />
            <div className="container">
                <form className="form" onSubmit={addCard}>
                    <h1>Create a card</h1>
                    <input
                        onChange={(e) => setCardName(e.target.value)}
                        required
                        type="text"
                        className="form-control"
                        placeholder="Card name"
                    />
                    <label htmlFor="">Music</label>
                    <input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => setMusic(e.target.files[0])}
                        required
                        placeholder="Background music"
                        className="form-control"
                    />
                    <button className="btn btn-primary" style={{ width: "100%" }}>
                        ADD
                    </button>
                </form>
                <div className="container-xl d-flex flex-row flex-wrap align-items-center justify-content-evenly">
                    {allCards.map((card) => (
                        <div className="card card-link" key={card.id}>
                            <Link
                                className="card-link-body"
                                title="Manage card contents"
                                to={`/manage-card-contents/${card.id}`}
                            >
                                <strong>Manage card</strong>
                                <h3>{card.card_name}</h3>
                            </Link>
                            <div className="card-options">
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteCard(card.id)}
                                >
                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                </button>
                                <button
                                    className="btn btn-success"
                                    onClick={() => {
                                        setUpdateFormData({
                                            id: card.id,
                                            oldCardName: card.card_name,
                                        });
                                        setModalVisible(true);
                                    }}
                                >
                                    <i className="fas fa-edit"></i>
                                </button>
                                <Link
                                    title="Check card"
                                    to={`/card-view/${card.id}`}
                                    className="btn btn-secondary"
                                >
                                    <i className="far fa-eye"></i>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ManageCards;
