import React from 'react';
import { useDrag } from 'react-use-gesture';
export default function TouchPanel({ mode, onDown, onUp }) {
    
    let origX = 0;
    let origY = 0;
    let flag = false;

    const bind = useDrag(({ down, movement: [mx, my] }) => {
        const x = down ? mx : 0;
        const y = down ? my : 0;
        
        if(!flag) {
            flag = true;
            origX = x;
        } else {
            if(!down) {
                flag = false;
                onUp();
            } else {
                if(mode > 0) {
                    if(origY > y) {
                        onDown(-1)
                    } else if(origY < y) {
                        onDown(1)
                    }
                } else {
                    if(origX > x) {
                        onDown(-1)
                    } else if(origX < x) {
                        onDown(1)
                    }
                }
                origX = x;
                origY = y;
            }
        }
    })
    
    return (
        <>
            <div className="touch-panel" {...bind()} />
            <style jsx>
            {`
            .touch-panel {
                background-color: transparent;
                position: absolute;
                left: 0px;
                top: 0px;
                width: 100vw;
                height: 100vh;
                z-index: 5;
                touch-action: none;
            }
            `}
            </style>
        </>
    )
}

TouchPanel.defaultProps = {
    mode: 0,
}