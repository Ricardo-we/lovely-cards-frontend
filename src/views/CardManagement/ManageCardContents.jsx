import "../../css/ManageCardContents.css";

import MessageManagementCard, { ImageManagementCard } from "./components/Card";
import getAllCardContents, {
	submitCardMessage,
	submitCardMessageUpdate,
} from "../../utils/requests/ManageCardContentsFuncs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AddCardImageForm from "./forms/CardImagesForms";
import CardMessageForm from "./forms/CardMessagesForms";
import Modal from "../public-components/Modal";
import NavBar from "../public-components/Navbar";

// MANAGE ANY CARD MESSAGE OR IMAGE
function ManageCardContents() {
	const navigate = useNavigate();
	if (
		!sessionStorage.getItem("username") ||
		!sessionStorage.getItem("user_id")
	)
		navigate("/login");
	const { cardId } = useParams();
	const [cardMessages, setCardMessages] = useState([{ id: 0 }]);
	const [cardImages, setCardImages] = useState([{ id: 0 }]);
	const [addCardImageModal, setAddCardImageModal] = useState(false);
	const [addCardMessageModal, setAddCardMessageModal] = useState(false);
	const [updateCardMessageModal, setUpdateCardMessageModal] = useState(false);
	const [actualCardMessage, setActualCardMessage] = useState("");

	const closeAllModals = () => {
		setAddCardImageModal(false);
		setAddCardMessageModal(false);
		setUpdateCardMessageModal(false);
	};

	const getCardContents = async () => {
		const { cardMessages, cardImages } = await getAllCardContents(cardId);
        closeAllModals();
		setCardMessages(cardMessages);
		setCardImages(cardImages);
	};

	useEffect(() => {
		getCardContents();
	}, []);

	return (
		<>
			<NavBar />

			<Modal
				visible={updateCardMessageModal}
				onHideModal={() => setUpdateCardMessageModal(false)}
			>
				<CardMessageForm
					buttonText="Update"
					title="Update card"
					defaultValues={actualCardMessage}
					onSubmit={(formData) => {
						submitCardMessageUpdate(
							formData,
							actualCardMessage?.id,
						).then(getCardContents);
					}}
				/>
			</Modal>

			<Modal
				visible={addCardImageModal}
				onHideModal={() => setAddCardImageModal(false)}
			>
				<AddCardImageForm
					actionOnSubmit={getCardContents}
					cardId={cardId}
				/>
			</Modal>

			<Modal
				visible={addCardMessageModal}
				onHideModal={() => setAddCardMessageModal(false)}
			>
				<CardMessageForm
					cardId={cardId}
					onSubmit={(formData) => {
						console.log(formData);
						submitCardMessage(formData, cardId).then(
							getCardContents,
						);
					}}
				/>
			</Modal>

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

				{cardMessages.map((card) => (
					<MessageManagementCard
						openUpdateModal={() => {
							setActualCardMessage(card);
							console.log(card);
							setUpdateCardMessageModal(true);
						}}
						onActionsMethod={getCardContents}
						key={card.id}
						cardData={card}
					/>
				))}
				{cardImages.map((card) => (
					<ImageManagementCard
						onActionsMethod={getCardContents}
						key={card.id}
						cardData={card}
					/>
				))}
			</main>
		</>
	);
}

export default ManageCardContents;
