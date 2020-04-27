import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-use-gesture'

export default function Test() {
    const [state, setState] = useState('')

    useEffect(() => {

        // check navigator if exist
        //console.log("navigator", navigator.userAgent)

        // mobile test
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            console.log("mobile")
        } else {
            console.log("desktop")
        }

        // orientation
        window.onorientationchange = function(e) {
            console.log("orientation", e)
            let str = 'orientation<br>';
            /*for(var k in e) {
                str+=k+':'+e[k]+'<br>';
            }*/
            str+=window.orientation; //0 up +/-90 landscape
            setState(str)
        }

    })
    
    // Set the drag hook and define component movement based on gesture data
    const bind = useDrag(({ down, movement: [mx, my] }) => {
        const x = down ? mx : 0;
        const y = down ? my : 0;
        console.log("bind", x, y, down)
        //set({ x: down ? mx : 0, y: down ? my : 0 })
    })

    return (
        <>
            <div className="container">
                <span>test page</span>
                <p>
                    { state }
                </p>
                <div {...bind()} className="test"></div>
            </div>
            <style jsx>
            {`
            .container {
                background-color: lightpink;
                position: relative;
                margin: 20px;
                height: 200px;
            }
            .test {
                background-color: yellow;
                position: absolute;
                left: 0px;
                top: 40px;
                width: 100%;
                height: 50px;
            }
            `}
            </style>
        </>
    )
}