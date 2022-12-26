import "../../css/Modal.css";

import ReactDOM from "react-dom";

function Modal({ visible = true, component = <></>, onHideModal, children }) {
	if (!visible) return null;
	return ReactDOM.createPortal(
		<div
			onClick={onHideModal}
			className={
				visible ? "modal-background" : "modalbackground modal-hidden"
			}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className={visible ? "modal bg-primary" : "modal modal-hidden"}
			>
				<button
					className="close-modal-btn"
					style={{ alignSelf: "flex-end" }}
					onClick={onHideModal}
				>
					<strong>X</strong>
				</button>
				{children ? children : component}
			</div>
		</div>,
		document.getElementById("modals-container"),
	);
}

export default Modal;
