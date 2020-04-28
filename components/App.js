import React from 'react';
import GameLoader from './GameLoader';
import Header from './Header';
import TouchPanel from './TouchPanel';

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

export default class App extends React.Component {
    
    constructor(props) {

        super(props)
        
        this.state = {
            health: 300,
            score: 0,
            gameOver: false,
            gameStart: true,
            isMobile: false,
            orientation: 0,
        }
        
        this.prevx = 0;
        this.prevy = 0;
        this.down = false;
        
        this.handleDrag = this.handleDrag.bind(this)

        this.handleDown = this.handleDown.bind(this)
        this.handleUp = this.handleUp.bind(this)

        this.setStartGame = this.setStartGame.bind(this)
        
    }

    componentDidMount() {
        
        const that = this;
        
        let isMobile;
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            isMobile = true;
        } else {
            isMobile = false;
        }        
        const orientation = (typeof window.orientation === "undefined")?0:window.orientation;
        this.setState({
            isMobile: isMobile,
            orientation: orientation,
        })

        this.gameContainer.addEventListener("gameEvent", function(event){
            
            if(event.detail.name === "onCrash") {
                const payload = event.detail.payload;
                //const position  = event.detail.position;
                
                let health = that.state.health;
                let score = that.state.score;
                
                if(health === 250 && payload.health === -100) {
                    health = 200;
                } else if(health === 150 && payload.health === -100) {
                    health = 100;
                } else {
                    health += payload.health;
                }                
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
            } else if(event.detail.name === "onStart"){
                that.setState({
                    gameStart: false,
                })
            }

        })

        this.result = GameLoader(this.gameContainer, 
            { mobile: isMobile, orientation: orientation});
        
        window.onorientationchange = function(e) {
            const orientation = (typeof window.orientation === "undefined")?0:window.orientation;
            that.setState({
                orientation: orientation,
            })
        }

        window.addEventListener('resize',function(){
            const orientation = (typeof window.orientation === "undefined")?0:window.orientation;
            const width = window.innerWidth;
            const height = window.innerHeight;
            that.result.resize(width, height, orientation);
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
                if(this.state.isMobile && this.state.orientation === 0) {
                    if(dx > 0) {
                        this.result.accelerate(0.1);
                    } else {
                        this.result.accelerate(-0.1);
                    }
                } else {
                    if(dy > 0) {
                        this.result.accelerate(0.1);
                    } else {
                        this.result.accelerate(-0.1);
                    }
                }
            } else {
                this.result.deccelerate()
            }
        }
    }
    
    handleDown(value) {
        if(value > 0) {
            this.result.accelerate2(0.1)
        } else {
            this.result.accelerate2(-0.1)
        }
    }

    handleUp() {
        this.result.deccelerate()
    }
    
    setStartGame() {
        this.result.startGame();
    }

    render() {
        
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

        const touchMode = (this.state.isMobile && this.state.orientation === 0)?0:1;
        const welcomeMessage = "Click Start to Play";

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
                    <TouchPanel mode={touchMode} 
                        onDown={this.handleDown} 
                        onUp={this.handleUp} />
                </div>
                {
                    (this.state.gameStart || this.state.gameOver) && 
                        <div className="gameover-container">
                            {
                                this.state.gameOver &&
                                <h1>Game Over</h1>
                            }
                            {
                                this.state.gameStart &&
                                <div className="start-panel">
                                    <h2>Japan State Of Emergency Game</h2>
                                    <button onClick={this.setStartGame} className="start-button">Start Game</button>
                                </div>
                            }
                        </div>
                }
                <style jsx>
                {`
                .start-panel {
                    text-align: center;
                    padding: 5px;
                }
                .start-panel h2 {
                    text-shadow: 1px 1px 3px #999;
                    font-size: 1.6em;
                    user-select: none;
                }
                .start-button {
                    background-color: #000;
                    border: 2px solid crimson;
                    padding: 10px 20px;
                    border-radius: 6px;
                    letter-spacing: 1px;
                    color: #fff;
                    outline: none;
                }
                .start-button:active {
                    transform: translate(0, 1px);
                }
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
                    animation-name: show-ani;
                    animation-duration: 0.7s;
                    animation-fill-mode: forwards;
                    user-select: none; 
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
                    background-color: white;
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    width: 100vw;
                    height: 100vh;
                    z-index: 1;
                }
                .topnav {
                    background-color: transparent;
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    width: 100vw;
                    /*height: 50px;*/
                    z-index: 2;
                    display: grid;
                    grid-template-columns: minmax(100px,15%) auto minmax(100px,15%);
                    grid-gap: 5px;
                    overflow: hidden;
                }
                .score-container, .title-head, .life-container {
                    background-color: transparent;
                }
                .title-head {
                    /*padding: 20px 0px;*/
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