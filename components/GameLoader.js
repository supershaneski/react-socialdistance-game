import Lib from '../lib/utils';
import { scaleLinear } from "d3-scale";

const colorScale = scaleLinear()
  .domain([1, 10])
  .range(["#dedede", "#00ff00"]);

function GameSound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.setAttribute("loop", "true");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
}

export default (containerElement, options) => {
    
    var gameMusic = new GameSound('/c3aqua.mp3');
    
    var obstacles = [];
    
    var isGameOver = false;
    var isGameStarted = false;

    var ismobile = (options && options.hasOwnProperty('mobile'))?options.mobile:false;
    var orientation = (options && options.hasOwnProperty('orientation'))?options.orientation:0;
    
    const { offsetWidth, offsetHeight } = containerElement;
    var _width = offsetWidth;
    var _height = offsetHeight;
    
    const image_files = [];
    image_files.push('_akimoto.png');
    image_files.push('_boris.png');
    image_files.push('_kimjong.png');
    image_files.push('_koike.png');
    image_files.push('_macron.png');
    image_files.push('_putin.png');
    image_files.push('_shinzo1.png');
    image_files.push('_shinzo2.png');
    image_files.push('_suzuki.png');
    image_files.push('_taro1.png');
    image_files.push('_taro2.png');
    image_files.push('_trump1.png');
    image_files.push('_trump2.png');
    image_files.push('_whotedros1.png');
    image_files.push('_whotedros2.png');
    image_files.push('_xijinping.png');
    
    image_files.push('_ubereats.png');
    image_files.push('_toiletpaper.png');
    image_files.push('_facemask.png');
    image_files.push('_hundredyen.png');
    
    const image_objects = [];
    for (var i = 0; i < image_files.length; i++) {
        image_objects[i] = new Image(40, 40);
        image_objects[i].src = "./" + image_files[i];
    }
    
    const image_player = new Image(40, 40);
    image_player.src = "./_mrbean.png";

    const canvas = document.createElement('canvas');
    canvas.width = _width;
    canvas.height = _height;
    containerElement.appendChild(canvas)

    const context = canvas.getContext("2d");
    
    var cx = 100; //((_width - 20)/2); //10;
    var cy = ((_height - 20)/2)
    
    if(ismobile && orientation === 0) {
        cx = ((_width - 20)/2);
        cy = _height - 200;
    }

    const player = new MyComponent(40, 40, "blue", cx, cy, "player");
    player.gravity = 0; //0.001; //0.05;

    /*
    var frameNo = 0;    
    var timer = setInterval(() => {
        _update()
    }, 20)
    */

   var frameNo = 0;
   var timer = null;

    function startGame() {

        var event = new CustomEvent(
            "gameEvent", 
            {
                detail: {
                    name: `onStart`,
                    payload: null,
                },
                bubbles: true,
                cancelable: true
            }
        );
        containerElement.dispatchEvent(event);
        
        gameMusic.play();

        isGameStarted = true;
        frameNo = 0;    
        timer = setInterval(() => {
            _update()
        }, 20)
    }

    function _clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    function _update() {
        if(!isGameStarted) return;

        var x, height, gap, minHeight, maxHeight, minGap, maxGap;
        
        for (var i = 0; i < obstacles.length; i += 1) {
            if (!obstacles[i].delete && player.crashWith(obstacles[i])) {
                
                if(obstacles[i].caseType === 0) {
                    
                    if(obstacles[i].elemType > 16) {

                        var payload = {};
                        if(obstacles[i].elemType === 17) payload = { score: 20, health: 0 }; //uber
                        if(obstacles[i].elemType === 18) payload = { score: 50, health: 0 }; //toilet
                        if(obstacles[i].elemType === 19) payload = { score: 0, health: 50 }; //face
                        if(obstacles[i].elemType === 20) payload = { score: 1000, health: 0 }; //100k
                        
                        var event = new CustomEvent(
                            "gameEvent", 
                            {
                                detail: {
                                    name: `onCrash`,
                                    payload: payload,
                                    position: {
                                        x: obstacles[i].x,
                                        y: obstacles[i].y,
                                    }
                                },
                                bubbles: true,
                                cancelable: true
                            }
                        );
                        containerElement.dispatchEvent(event);
                        
                    }

                    obstacles[i].delete = true;

                } else if(obstacles[i].caseType === 1) {
                    
                    var payload = {
                        health: 0,
                        score: 10,
                    }

                    var event = new CustomEvent(
                        "gameEvent", 
                        {
                            detail: {
                                name: `onCrash`,
                                payload: payload,
                                position: {
                                    x: obstacles[i].x,
                                    y: obstacles[i].y,
                                }
                            },
                            bubbles: true,
                            cancelable: true
                        }
                    );
                    containerElement.dispatchEvent(event);
                    
                    obstacles[i].delete = true;
                    
                } else if(obstacles[i].caseType === 2 || obstacles[i].caseType === 3) {
                    
                    var payload = {};
                    if(obstacles[i].caseType === 2) payload = { health: - 50, score: 0 }
                    if(obstacles[i].caseType === 3) payload = { health: - 100, score: 0 }
                    
                    var event = new CustomEvent(
                        "gameEvent", 
                        {
                            detail: {
                                name: `onCrash`,
                                payload: payload,
                                position: {
                                    x: obstacles[i].x,
                                    y: obstacles[i].y,
                                }
                            },
                            bubbles: true,
                            cancelable: true
                        }
                    );
                    containerElement.dispatchEvent(event);
                    
                    obstacles[i].delete = true;

                } else {
                    return;
                }

                //return;
            } 
        }

        _clear();
        if(!isGameOver) frameNo += 1;
        
        if (!isGameOver && (frameNo === 1 || everyInterval(200))) {
            
            if(ismobile && orientation === 0) {
                
                const minWidth = 40;
                const maxWidth = _width - 40;
                const x0 = Lib.getRandomInt(minWidth, maxWidth);
                const y0 = 0;
                obstacles.push(new MyComponent(40, 40, "green", x0, y0));
                
                if(frameNo > 1000) {
                    const gap1 = (x0 - 60) - minWidth;
                    const gap2 = maxWidth - (x0 + 60);
                    const gapOK = [];
                    if(gap1 > 0) {
                        gapOK.push({ min: minWidth, max: (minWidth + gap1)});
                    }
                    if(gap2 > 0) {
                        gapOK.push({ min: (maxWidth - gap2), max: maxWidth });
                    }
                    let chance = 0;
                    if(gapOK.length > 1) chance = Lib.getRandomInt(0, (gapOK.length - 1));
                    
                    const min1 = gapOK[chance].min;
                    const max1 = gapOK[chance].max;
                    const x1 = Lib.getRandomInt(min1, max1);
                    const y1 = y0;
                    
                    obstacles.push(new MyComponent(40, 40, "green", x1, y1));
                    
                }

            } else {
                
                minHeight = 40;
                maxHeight = _height - 40;
                const x0 = canvas.width;
                const y0 = Lib.getRandomInt(minHeight, maxHeight); 
                obstacles.push(new MyComponent(40, 40, "green", x0, y0));
                
                if(frameNo > 1000) {
                    var gap1 = (y0 - 60) - minHeight;
                    var gap2 = maxHeight - (y0 + 60);
                    var gapOK = [];
                    
                    if(gap1 > 0) {
                        gapOK.push({ min: minHeight, max: (minHeight + gap1)});
                    }
                    if(gap2 > 0) {
                        gapOK.push({ min: (maxHeight - gap2), max: maxHeight });
                    }

                    let chance = 0;
                    if(gapOK.length > 1) chance = Lib.getRandomInt(0, (gapOK.length - 1));
                    
                    const min1 = gapOK[chance].min;
                    const max1 = gapOK[chance].max;
                    const x1 =x0;
                    const y1 = Lib.getRandomInt(min1, max1);
                    obstacles.push(new MyComponent(40, 40, "green", x1, y1));
                    
                }
            }

        }

        obstacles = obstacles.filter(item => {
            return !item.delete || item.x <= 40;
        })

        for (var i = 0; i < obstacles.length; i += 1) {
            if(!isGameOver){
                if(ismobile && orientation === 0) {
                    obstacles[i].y += 1;
                } else {
                    obstacles[i].x += -1;
                }
            }
            obstacles[i].update();
        }

        if(!isGameOver) player.newPos();
        player.update();
        
    }
    
    function everyInterval(n) {
        if ((frameNo / n) % 1 === 0) {return true;}
        return false;
    }

    function MyComponent(width, height, color, x, y, type) {
        this.type = type;
        this.score = 0;
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;    
        this.x = x;
        this.y = y;
        this.gravity = 0;
        this.gravitySpeed = 0;
        this.text = "";
        this.textCount = 0;
        
        let chance = 0;
        this.elemType = (type === "player")?0:Lib.getRandomInt(1,20);
        if(type !== "player") {
            chance = Lib.getRandomInt(1,10);
            if(chance <= 7) { // people
                this.elemType = Lib.getRandomInt(1,16);
            } else {
                chance = Lib.getRandomInt(1,10);
                if(chance <= 3) {
                    this.elemType = 17;
                } else if(chance > 3 && chance <= 6) {
                    this.elemType = 18;
                } else if(chance > 6 && chance <= 9) {
                    this.elemType = 19;
                } else {
                    this.elemType = 20;
                }
            }
        }

        this.caseType = 0;//(type === "player"|| this.elemType > 16)?0:Lib.getRandomInt(1,3);
        if(type === "player"|| this.elemType > 16) {
            this.caseType = 0;
        } else {
            chance = Lib.getRandomInt(1,10);
            if(chance <= 4) {
                this.caseType = 1;
            } else if(chance > 4 && chance < 8) {
                this.caseType = 2;
            } else {
                this.caseType = 3;
            }
        }

        this.delete = false;
        this.bias = 10;
        this.radius = 0;
        
        if(this.elemType === 1) color = "magenta";

        this.angle = Lib.getRandomInt(0, 4);
        this.direction = 0;
        this.index = 0;

        this.update = function() {
            var ctx = context;
            if (this.type === "text") {
                
                ctx.font = this.width + " " + this.height;
                ctx.fillStyle = color;
                ctx.fillText(this.text, this.x, this.y);
                this.y+=this.textCount;
                this.textCount++;
                if(this.textCount > 9) this.delete = true;

            } else if (this.type === "player") {

                var rad = 0;
                if(this.direction > 0) {
                    rad = 45 - (3*this.angle)
                } else {
                    rad = -45 + (3*this.angle);
                }
                rad = rad * Math.PI/180;
                
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(rad);
                ctx.translate(-20,-20);
                ctx.drawImage(image_player,0,0); //image_player
                ctx.restore();

                var radius = 20 + this.radius;
                ctx.beginPath();
                ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);
                ctx.strokeStyle = "#7ec0ee"; //"#FFA500";
                ctx.lineWidth = 1;
                ctx.stroke();

                this.radius = (this.radius + 1)%20;
                
                this.angle = (this.angle + 1)%30;
                if(this.angle === 0) {
                    this.direction = (this.direction > 0)?0:1;
                }

            } else {
                
                var _color = color;
                if(this.delete){
                    this.bias-=1;
                    if(this.bias <= 1) this.bias = 1;
                    _color = colorScale(this.bias)
                }
                if(this.elemType === 1) {
                    _color = color;
                }

                var rad = 0;
                if(this.direction > 0) {
                    rad = 45 - (3*this.angle)
                } else {
                    rad = -45 + (3*this.angle);
                }
                rad = rad * Math.PI/180;

                var imeji = image_objects[0];
                if(this.elemType === 2) imeji = image_objects[1];
                if(this.elemType === 3) imeji = image_objects[2];
                if(this.elemType === 4) imeji = image_objects[3];
                if(this.elemType === 5) imeji = image_objects[4];
                if(this.elemType === 6) imeji = image_objects[5];
                if(this.elemType === 7) imeji = image_objects[6];
                if(this.elemType === 8) imeji = image_objects[7];
                if(this.elemType === 9) imeji = image_objects[8];
                if(this.elemType === 10) imeji = image_objects[9];
                if(this.elemType === 11) imeji = image_objects[10];
                if(this.elemType === 12) imeji = image_objects[11];
                if(this.elemType === 13) imeji = image_objects[12];
                if(this.elemType === 14) imeji = image_objects[13];
                if(this.elemType === 15) imeji = image_objects[14];
                if(this.elemType === 16) imeji = image_objects[15];
                if(this.elemType === 17) imeji = image_objects[16];
                if(this.elemType === 18) imeji = image_objects[17];
                if(this.elemType === 19) imeji = image_objects[18];
                if(this.elemType === 20) imeji = image_objects[19];
                
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(rad);
                ctx.translate(-20,-20);
                ctx.drawImage(imeji,0,0);
                ctx.restore();
                
                var linecolor = "#79ff4d";
                if(this.caseType === 1) linecolor = "#7ec0ee"; //"#1affff";
                if(this.caseType === 2) linecolor = "#ffd11a";
                if(this.caseType === 3) linecolor = "#ff1a75";

                var radius = 20 + this.radius;
                ctx.beginPath();
                ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);
                ctx.strokeStyle = linecolor; //"#ff1a75"; //"#FFA500";
                ctx.lineWidth = 1;
                ctx.stroke();

                this.radius = (this.radius + 1)%20;
                
                this.angle = (this.angle + 1)%30;
                if(this.angle === 0) {
                    this.direction = (this.direction > 0)?0:1;
                }

            }
        }
        this.newPos = function() {
            this.gravitySpeed += this.gravity;

            if(ismobile && orientation === 0) {

                if(flagDeccel) {
                    if(this.gravitySpeed < 0.1 && this.gravitySpeed > -0.1) {
                        this.gravitySpeed = 0;
                        this.gravity = 0;
                        flagDeccel = false;
                    }
                }

                this.x += this.speedX + this.gravitySpeed;
                this.y += this.speedY;
                
                const minX = 40;
                const maxX = _width - 40;
                if(this.x < minX) this.x = minX;
                if(this.x > maxX) this.x = maxX;

            } else {
                
                if(flagDeccel) {
                    if(this.gravitySpeed < 0.1 && this.gravitySpeed > -0.1) {
                        this.gravitySpeed = 0;
                        this.gravity = 0;
                        flagDeccel = false;
                    }
                }

                this.x += this.speedX;
                this.y += this.speedY + this.gravitySpeed;
                
                const minY = 40;
                const maxY = _height - 40;
                if(this.y < minY) this.y = minY;
                if(this.y > maxY) this.y = maxY;
            
            }

            this.hitBottom();
        }
        this.hitBottom = function() {
            if(ismobile && orientation === 0) {
                var rockbottom = canvas.width - this.width;
                if (this.x > rockbottom) {
                    this.x = rockbottom;
                    this.gravitySpeed = 0;
                }
            } else {
                var rockbottom = canvas.height - this.height;
                if (this.y > rockbottom) {
                    this.y = rockbottom;
                    this.gravitySpeed = 0;
                }
            }
        }
        this.crashWith = function(otherobj) {
            var myleft = this.x;
            var myright = this.x + (this.width);
            var mytop = this.y;
            var mybottom = this.y + (this.height);
            var otherleft = otherobj.x;
            var otherright = otherobj.x + (otherobj.width);
            var othertop = otherobj.y;
            var otherbottom = otherobj.y + (otherobj.height);
            var crash = true;
            
            if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
                crash = false;
            }

            return crash;
        }
    }
    
    function resize(width, height, _orientation) {
        if(!isGameStarted) return;

        clearInterval(timer)

        const _prev_orientation = orientation;
        orientation = _orientation;

        const prev_width = _width;
        const prev_height = _height;
        
        var new_x = player.x * width / prev_width;
        var new_y = player.y * height / prev_height;

        if(_prev_orientation !== orientation) {
            if(ismobile && orientation === 0) {
                new_x = ((width - 20)/2);
                new_y = height - 200;
            } else {
                new_x = 100;
                new_y =  ((height - 20)/2);
            }
        }

        player.x = new_x;
        player.y = new_y;

        for(var i = 0; i < obstacles.length; i++) {
            new_x = obstacles[i].x * width / prev_width;
            new_y = obstacles[i].y * height / prev_height;
            obstacles[i].x = new_x;
            obstacles[i].y = new_y;
        }

        _width = width;
        _height = height;

        canvas.width = _width;
        canvas.height = _height;
        
        timer = setInterval(() => {
            _update()
        }, 20)

    }

    function destroy() {
        clearInterval(timer);
        isGameOver = true;
    }

    function moveY(n) {
        if(n > 0) {
            if(player.speedY === 0) {
                player.speedY = 1;
            } else {
                player.speedY += 0.01;
            }
        } else {
            if(player.speedY === 0) {
                player.speedY = -1;
            } else {
                player.speedY -= 0.01;
            }
        }
        
    }

    function clearMove() {
        //console.log("gravity", player.gravitySpeed)
        player.speedX = 0;
        player.speedY = 0;
    }
    
    var flagAccel = false;
    function accelerate(n) {
        if(flagAccel) return;
        flagAccel = true;
        flagDeccel = false;
        player.gravity = n;
    }

    function accelerate2(n) {

        flagAccel = true;
        flagDeccel = false;
        player.gravity = n;
    }

    var flagDeccel = false;
    function deccelerate() {
        flagAccel = false;
        if(player.gravitySpeed < 0) {
            player.gravity = 0.05;
            flagDeccel = true;
        } else if(player.gravitySpeed > 0) {
            player.gravity = -0.05;
            flagDeccel = true;
        } else {
            player.gravity = 0;
        }
    }

    return {
        resize,
        destroy,
        moveY,
        clearMove,
        accelerate,
        accelerate2,
        deccelerate,
        startGame,
    }
}