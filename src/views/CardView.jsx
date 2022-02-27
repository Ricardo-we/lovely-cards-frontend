import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination } from "swiper";
import getCardData from '../utils/requests/CardViewFuncs';

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import '../css/CardView.css'

function CardView() {
    const [cardContents, setCardContents] = useState([{}]);

    const { cardID } = useParams();
    const song = new Audio();
    
    const getCard = async () => {
        const { mixedCards, music } = await getCardData(cardID);
        setCardContents(mixedCards)
        song.src = music;
    }
    
    useEffect(() => {
        getCard()
    }, [])

    const playSong = (song) => song.play() 
    
    document.addEventListener('click', () => playSong(song))

    return (    
        <div className="" style={{marginTop: '150px'}}>

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
                {cardContents.map(contents => (
                    <SwiperSlide key={contents.id * Math.random()}>
                        {
                            contents.image?
                                <img src={contents.image}/> 
                            : 
                            <div className="container d-flex flex-column text-center align-items-center justify-content-center">
                                <h2>{contents.heading}</h2>
                                <p>{contents.content}</p>
                            </div>
                        }
                        
                    </SwiperSlide>
                ))}
            </Swiper>
        </div> 
    );
}

export default CardView;