import { Navbar,Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import sideImg from '../img/lovely-cards-img.png';
import { useState } from 'react';

// SWIPER DEPENDENCIES
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import '../css/CardView.css'

function HomePage() {
    const [fileInput, setFileInput] = useState('');
    const [cardHeading, setCardHeading] = useState('')
    const [cardMessage,setCardMessage] = useState('');
    const [allCardContents, setAllCardContents] = useState([]);

    const addCardMessage = e => {
        e.preventDefault();
        setAllCardContents([...allCardContents, {message:cardMessage, heading: cardHeading}]);
        setCardHeading('');
        setCardMessage('')
    }

    const addCardImage = e => {
        e.preventDefault();
        const finalImage = URL.createObjectURL(fileInput);
        setAllCardContents([...allCardContents, {image: finalImage}]);
    }

    return ( 
        <>
            <Navbar bg="primary" expand="lg">
                <div className='container text-white'>
                    <Navbar.Brand className='text-white'>LovelyCards</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Link className='nav-link text-white px-2' to='/login'>
                                Login
                            </Link>
                            <Link className='nav-link btn-secondary px-2 text-white' to='/create-user'>
                                Sign up
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>

            <div className='container-xxl'>
                {/* EXPLANATION */}
                <div className="row">
                    <img src={sideImg} className="img-fluid col-lg" alt="lovely cards img" style={{height: '250px', objectFit: 'cover'}} />
                    <div className="col">
                        <h1>Create your cards</h1>
                        <p>
                            Register and create one! Just want to try how it works?
                            <br />
                            <a className="btn btn-primary mt-2" href='#testing'>
                                Try it!
                            </a>
                        </p>
                    </div>
                </div>
            </div> 

            {/* CREATE CARDS FORM */}
            <a href="#testing"></a>
            <div className="row my-5 bg-black text-white" style={{width: '100%', margin: '400px 0px!important'}}>
                <h1 className='text-center'>Try it</h1>
                <form 
                    onSubmit={addCardMessage} 
                    className="form col-lg p-4 bg-black d-flex flex-column align-items-center justify-content-evenly" style={{width: '80%', margin: '0 40px'}}
                >
                    <h2>Add card message</h2>
                    <input 
                        type="text"
                        placeholder="Heading" 
                        className="form-control" 
                        onChange={e => setCardHeading(e.target.value) } 
                        value={cardHeading}
                    />
                    <input 
                        type="text"
                        placeholder="Message" 
                        className="form-control" 
                        onChange={e => setCardMessage(e.target.value) } 
                        value={cardMessage}
                    />
                    <button className='btn btn-primary' style={{width: '100%'}}>ADD MESSAGE</button>
                </form>

                <form 
                    onSubmit={addCardImage} 
                    className="form col-lg p-4 bg-black d-flex flex-column align-items-center justify-content-evenly" style={{width: '80%', margin: '0 40px'}} 
                >
                    <h2>Add a image</h2>
                    <input 
                        type="file"
                        accept='image/*'
                        placeholder="Image" 
                        className="form-control" 
                        onChange={e => setFileInput(e.target.files[0]) } 
                    />
                    <button className='btn btn-primary' style={{width:'100%'}}>ADD IMAGE</button>
                </form>

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
                    {allCardContents.map(content => (
                        <SwiperSlide key={Math.random() * 100000}>
                            {
                            content.image? 
                                <img src={content.image}/> 
                            :
                                <div className="container d-flex flex-column align-items-center justify-content-evenly">
                                    <h2>{content.heading}</h2>
                                    <p>{content.message}</p>
                                </div>
                            }
                        </SwiperSlide>
                    ))}

                </Swiper>
            </div>
        </>
    );
}

export default HomePage;