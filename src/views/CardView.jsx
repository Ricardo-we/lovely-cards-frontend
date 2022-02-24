import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'
import { APIURL } from '../App';
import { EffectCoverflow, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import '../css/CardView.css'

function CardView() {
    const [cardContents, setCardContents] = useState([{}]);

    const { cardID } = useParams();
    const song = new Audio();
    
    const getCard = async () => {
        const response = await fetch(`${APIURL}/card/${cardID}`);
        const finalResponse = await response.json();

        const response1 = await fetch(`${APIURL}/card-contents/${cardID}`);
        const cardMessages = await response1.json();

        const response2 = await fetch(`${APIURL}/card-images/${cardID}`);
        const cardImages = await response2.json();

        let mixedCards = [...cardMessages, ...cardImages] 

        for(let i in mixedCards){
            for(let j = 1; j < mixedCards.length; j++){
                if(mixedCards[j-1].id > mixedCards[j].id){
                    let tmpVar = mixedCards[j-1];
                    mixedCards[j-1] = mixedCards[j];
                    mixedCards[j] = tmpVar;
                }
            }
        }

        setCardContents(mixedCards)
        song.src = finalResponse[0].music;
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