import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../css/CardView.css";

import { EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useLayoutEffect, useState } from "react";

import { Button } from "react-bootstrap";
import getCardData from "../utils/requests/CardViewFuncs";
import { useParams } from "react-router-dom";

function CardView({}) {
	const [cardContents, setCardContents] = useState([{}]);
	const [song, setSong] = useState(new Audio());
	const [isPlaying, setIsPlaying] = useState(false);

	const { cardID } = useParams();

	const getCard = async () => {
		const response = await getCardData(cardID);
		setCardContents(response);
		song.src = response.music;
	};

	useEffect(() => {
		getCard();
	}, []);

	useEffect(() => {
		if (isPlaying) song.play();
		else song.pause();
	}, [isPlaying]);

	const togglePlay = () => {
		setIsPlaying((prev) => !prev);
	};

	return (
		<div
			className="d-flex flex-column align-center justify-center"
			style={{ marginTop: "0px" }}
		>
			<div className="d-flex flex-row justify-content-start align-items-center">
				<Button
					variant="outline-info"
					style={{
						padding: 0,
						width: 50,
						height: 50,
						display: "inline-block",
						color: "white",
                        marginRight: 20
					}}
					onClick={togglePlay}
				>
					{isPlaying ? (
						<i className="fas fa-pause"></i>
					) : (
						<i className="fas fa-play"></i>
					)}
				</Button>
				<label htmlFor="">Music</label>
			</div>

			<h2 className="w-100 text-center">{cardContents?.card_name}</h2>
			<div style={{ marginTop: 10}}>
				<Swiper
					effect={"coverflow"}
					grabCursor={true}
					centeredSlides={true}
					slidesPerView={"auto"}
					coverflowEffect={{
						rotate: 50,
						stretch: 0,
						depth: 100,
						modifier: 1,
						slideShadows: true,
					}}
					pagination={true}
					modules={[EffectCoverflow, Pagination]}
					className="mySwiper"
				>
					{cardContents?.mixedCards?.map((contents) => (
						<SwiperSlide style={{backgroundColor: contents?.card_color}} key={contents.id * Math.random()}>
							{contents.image ? (
								<img src={contents.image} />
							) : (
								<div className="container d-flex flex-column text-center align-items-center justify-content-center">
									<h2>{contents.heading}</h2>
									<p>{contents.content}</p>
								</div>
							)}
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
}

export default CardView;
