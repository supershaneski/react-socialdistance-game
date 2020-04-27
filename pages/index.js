import React from 'react';
import App from '../components/App';
//import { useDrag, useGesture } from 'react-use-gesture';

export default function Index() {
    
    /*const bind = useDrag(({ down, movement: [mx, my] }) => {
        const x = down ? mx:0;
        const y = down ? my:0;
        console.log(x,y);
    })*/
    /*
    const bind = useGesture({
        onDrag: state => doSomethingWith(state),
        onDragStart: state => doSomethingWith(state),
        onDragEnd: state => doSomethingWith(state),
        onMove: state => doSomethingWith(state),
        onMoveStart: state => doSomethingWith(state),
        onMoveEnd: state => doSomethingWith(state),
    });

    const doSomethingWith = (state) => {
        console.log("bind", state)
    }
    <App {...bind()} />
    */

    return (
        <App />
    )
}