import React from 'react';
import GameLoader from './GameLoader';
import Header from './Header';
//import { useDrag } from 'react-use-gesture';

const Keys = {
    Up: (code) => {
        return (code === 38 || code === 87)
    },
    Down: (code) => {
        return (code === 40 || code === 83)
    },
    Left: (code) => {
        return (code === 37 || code === 65)
    },
    Right: (code) => {
        return (code === 39 || code === 68)
    }
}

function displayScore(n) {
    var score = "0000" + n;
    if(n >= 10 && n < 100) score = "000" + n;
    if(n >= 100 && n < 1000) score = "00" + n;
    if(n >= 1000 && n < 10000) score = "0" + n;
    if(n > 10000) score = n;
    return score;
}

function GameController({ onDrag }) {
    
    /*
    const bind = useDrag(({ down, movement: [mx, my] }) => {
        const x = down ? mx : 0;
        const y = down ? my : 0;
        onDrag(down, x, y);
    })
    */

    const handleDrag = (e) => {
        e.preventDefault();
        console.log("handle drag")
    }

    //<div {...bind()} onDragOver={event => handleDrag(event)} className="game-controller"></div>
    
    return (
        <>
        <div className="game-controller"></div>
        <style jsx>
        {`
        .game-controller {
            background-color: rgba(255,255,255,0.85);
            position: absolute;
            left: 0px;
            top: 0px;
            width: 100vw;
            height: 100vh;
            z-index: 3;
        }
        `}
        </style>
        </>
    )
}

export default class App extends React.Component {
    
    constructor(props) {

        super(props)
        //this.gameContainer = React.createRef();
        
        this.state = {
            health: 300,
            score: 0,
            gameOver: false,
        }

        this.prevx = 0;
        this.prevy = 0;
        this.down = false;

        this.handleDrag = this.handleDrag.bind(this)
    }

    componentDidMount() {
        
        const that = this;
        
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }
        
        this.orientation = (typeof window.orientation === "undefined")?0:window.orientation;
        
        this.gameContainer.addEventListener("gameEvent", function(event){
            
            if(event.detail.name === "onCrash") {
                const payload = event.detail.payload;
                //const position  = event.detail.position;
                
                let health = that.state.health;
                let score = that.state.score;
                
                health += payload.health;
                score += payload.score;
                if(health > 300) health = 300;
                if(health < 0) health = 0;
                
                that.setState({
                    health: health,
                    score: score,
                    gameOver: (health === 0)?true:false,
                })
                
                if(health === 0) {
                    that.result.destroy()
                }
            }

        })

        this.result = GameLoader(this.gameContainer, 
            { mobile: this.isMobile, orientation: this.orientation});
        
        window.onorientationchange = function(e) {
            that.orientation = (typeof window.orientation === "undefined")?0:window.orientation;
            console.log("orientation change", that.orientation)
        }

        window.addEventListener('resize',function(){
            
            console.log("window resize", that.orientation)

            const width = window.innerWidth;
            const height = window.innerHeight;
            that.result.resize(width, height, that.orientation)
            
        }, false)
        
        document.addEventListener('keydown', function(event){
            if(Keys.Up(event.keyCode)) {
                that.result.accelerate(-0.1)
            } else if(Keys.Down(event.keyCode)){
                that.result.accelerate(0.1)
            } else if(Keys.Left(event.keyCode)) {
                //
            } else if(Keys.Right(event.keyCode)){
                //
            }
        })
        document.addEventListener('keyup', function(event){
            that.result.deccelerate()
        })

    }

    componentWillUnmount() {
        this.result.destroy()
    }

    handleDrag(down, x, y) {
        if(!this.down && down) {
            //console.log("START")
            this.down = down;
            this.prevx = x;
            this.prevy = y;
        } else {
            
            var dx = x - this.prevx;
            var dy = y - this.prevy;
            
            this.down = down;
            this.prevx = x;
            this.prevy = y;

            if(down) {
                if(this.isMobile && this.orientation === 0) {
                    console.log("DRAG1", dx, dy);
                    if(dx > 0) {
                        this.result.accelerate(0.1);
                    } else {
                        this.result.accelerate(-0.1);
                    }
                } else {
                    console.log("DRAG2", dx, dy);
                    if(dy > 0) {
                        this.result.accelerate(0.1);
                    } else {
                        this.result.accelerate(-0.1);
                    }
                }
            } else {
                //console.log("END")
                this.result.deccelerate()
            }
        }
    }

    checkGame() {
        const score = this.state.score;
        const health = this.state.health;
    }

    render() {
        //ザ・ソーシャル・ディスタンス・ザ・ゲーム
        //<Header text="Social-Distance-Game" />

        const score = displayScore(this.state.score);

        let classLife0 = "";
        let classLife1 = "";
        let classLife2 = "";

        switch(this.state.health) {
            case 300:
                classLife0 = "redheart-icon";
                classLife1 = "redheart-icon";
                classLife2 = "redheart-icon";
                break;
            case 250:
                classLife0 = "orangeheart-icon";
                classLife1 = "redheart-icon";
                classLife2 = "redheart-icon";
                break;
            case 200:
                classLife0 = "heart-icon";
                classLife1 = "redheart-icon";
                classLife2 = "redheart-icon";
                break;
            
            case 150:
                classLife0 = "heart-icon";
                classLife1 = "orangeheart-icon";
                classLife2 = "redheart-icon";
                break;
            case 100:
                classLife0 = "heart-icon";
                classLife1 = "heart-icon";
                classLife2 = "redheart-icon";
                break;
            case 50:
                classLife0 = "heart-icon";
                classLife1 = "heart-icon";
                classLife2 = "orangeheart-icon";
                break;
            
            default:
                classLife0 = "heart-icon";
                classLife1 = "heart-icon";
                classLife2 = "heart-icon";
        }
        
        return (
            <>
                <div className="root">
                    <div className="game-container" ref={el => this.gameContainer = el} />
                    <div className="topnav">
                        <div className="life-container">
                            <div className="life-label">
                                <span className={classLife2}></span>
                                <span className={classLife1}></span>
                                <span className={classLife0}></span>
                            </div>
                        </div>
                        <div className="title-head">
                            <span></span>
                        </div>
                        <div className="score-container">
                            <span className="label-score">{ score }</span>
                        </div>
                    </div>
                    <div className="footer">
                        <span>&copy; 2020</span>
                    </div>
                </div>
                {
                    this.state.gameOver && 
                        <div className="gameover-container">
                            <h1>Game Over</h1>
                        </div>
                }
                <style jsx>
                {`
                .root {
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    width: 100vw;
                    height: 100vh;
                    overflow: hidden;
                }
                .gameover-container {
                    background-color: transparent;
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    width: 100vw;
                    height: 100vh;
                    z-index: 5;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                }
                .gameover-container h1{
                    font-size: 1.5em;
                    color: #000;
                    /*text-shadow: 0px 0px 3px #444;*/
                    animation-name: show-ani;
                    animation-duration: 0.7s;
                    animation-fill-mode: forwards;
                    user-select: none; 
                }
                .show-title {
                    animation-name: show-ani;
                    animation-duration: 0.7s;
                    animation-fill-mode: forwards;
                }
                @keyframes show-ani {
                    from { 
                        transform: rotate(0deg) scale(2);
                        opacity: 0.25;
                    }
                    to { 
                        transform: rotate(720deg) scale(1);
                        opacity: 1.0;
                    }
                }

                .game-container {
                    /*background-color: #dedede;*/
                    background-color: white;
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    width: 100vw;
                    height: 100vh;
                    z-index: 1;
                }
                .topnav {
                    /*background-color: lightpink;*/
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    width: 100vw;
                    height: 50px;
                    z-index: 2;
                    display: grid;
                    grid-template-columns: minmax(120px,15%) auto minmax(120px,15%);
                    grid-gap: 5px;
                    overflow: hidden;
                }
                .footer {
                    position: absolute;
                    left: 0px;
                    bottom: 0px;
                    z-index: 2;
                    padding: 5px 10px;;
                    display: none;
                }
                .footer span {
                    font-size: 0.7em;
                    color: #444;
                    display: none;
                }
                .score-container, .title-head, .life-container {
                    background-color: transparent;
                }
                .title-head {
                    padding: 20px 0px;
                    text-align: center;
                }
                .life-container, .score-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .life-label {
                    font-size: 1.2em;
                }
                .label-score {
                    font-size: 1.2em;
                    font-weight: 600;
                    user-select: none;
                }
                `}
                </style>
            </>
        )
    }
}