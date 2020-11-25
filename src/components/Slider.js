import React from 'react';
import {Slide} from 'react-slideshow-image'


const proprietes = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true
}

class Slider extends React.Component{
    render(){
       
        return(

            <div id="slider">
                <div className="container">
                    <div className="containerSlide">
                        <Slide {...proprietes} >
                            <div className="each-slide">
                                <div>
                                    <img src='../images/home/slide1.jpg' alt="" />
                                </div>
                            </div>
                            <div className="each-slide">
                                <div>
                                    <img src='../images/home/slide2.jpg' alt="" />
                                </div>
                            </div>
                            <div className="each-slide">
                                <div>
                                    <img src='../images/home/slide3.jpg' alt="" />
                                </div>
                            </div>
                        </Slide>
                    </div>
                        
 
                </div>

            </div>    
	
        )
    }
}

export default Slider;