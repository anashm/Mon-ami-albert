import React, { Component } from 'react'
import Lottie from 'react-lottie';
import * as animation from '../../../animation/test.json';

class AnimationLottie extends Component {





    render() {
        
        
        const defaultOptions = {
            loop: false,
            autoplay: true,
            animationData: animation.default,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          };

         

        return (
            <div>
                <h1>Lottie</h1>
                <p>Base animation free from external manipulation</p>
                <Lottie options={defaultOptions}
                    height={200}
                    width={200}
                
                />
            </div>
        )
    }
}

export default AnimationLottie
