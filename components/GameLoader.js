import Lib from '../lib/utils';
import { scaleLinear } from "d3-scale";

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

const colorScale = scaleLinear()
  .domain([1, 10])
  .range(["#dedede", "#00ff00"]);

export default (containerElement, options) => {
    var obstacles = [];
    
    var ismobile = (options && options.hasOwnProperty('mobile'))?options.mobile:false;
    var orientation = (options && options.hasOwnProperty('orientation'))?options.orientation:0;
    
    console.log("init", "ismobile=", ismobile, "orientation=", orientation)

    const { offsetWidth, offsetHeight } = containerElement;
    var _width = offsetWidth;
    var _height = offsetHeight;
    
    //console.log("orig", _width, _height)

    const mrbean = new Image(40, 40);
    mrbean.src = "/mrbean.jpg";

    const taroaso = new Image(40, 40);
    taroaso.src = "/aso.jpg";

    const shinzoabe = new Image(40, 40);
    shinzoabe.src = "/shinzo.jpg";

    const koike = new Image(40, 40);
    koike.src = "/koike.jpg";

    const suzuki = new Image(40, 40);
    suzuki.src = "/suzuki.jpg";

    const trump = new Image(40, 40);
    trump.src = "/trump.jpg";

    const boris = new Image(40, 40);
    boris.src = "/boris.jpg";
    
    const xijinping = new Image(40, 40);
    xijinping.src = "/xijinping.jpg";

    const akimoto = new Image(40, 40);
    akimoto.src = "/akimoto.jpg";
    const facemask = new Image(40, 40);
    facemask.src = "/facemask.jpg";
    const hundredkyen = new Image(40, 40);
    hundredkyen.src = "/hundredkyen.jpg";
    const ubereats = new Image(40, 40);
    ubereats.src = "/ubereats.jpg";
    const who = new Image(40, 40);
    who.src = "/who.jpg";
    const osamu = new Image(40, 40);
    osamu.src = "/osamu.jpg";
    const osaka = new Image(40, 40);
    osaka.src = "/osaka.jpg";
    const taro = new Image(40, 40);
    taro.src = "/taro.jpg";
    const donald = new Image(40, 40);
    donald.src = "/donald.jpg";
    const kimjong = new Image(40, 40);
    kimjong.src = "/kimjong.jpg";
    const toiletpaper = new Image(40, 40);
    toiletpaper.src = "/toiletpaper.jpg";

    //const birds = new Image();
    //birds.src = "/bird-cells-new.svg";

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

    //image_files.set('ubereats', '_ubereats.png');
    //image_files.set('toiletpaper', '_toiletpaper.png');
    //image_files.set('facemask', '_facemask.png');
    //image_files.set('hundredyen', '_hundredyen.png');
    //image_files.set('mrbean', '_mrbean.png');
    
    const image_objects = [];
    for (var i = 0; i < image_files.length; i++) {
        image_objects[i] = new Image(40, 40);
        image_objects[i].onload = function() {
            //console.log("load", this.src.lastIndexOf)
        }
        image_objects[i].src = "./" + image_files[i];
    }
    //console.log("length", image_objects.length)

    const image_player = new Image(40, 40);
    image_player.src = "./_mrbean.png";

    const canvas = document.createElement('canvas');
    canvas.width = _width;
    canvas.height = _height;

    canvas.addEventListener('mousedown', _handleDown, false);
    canvas.addEventListener('mousemove', _handleMove, false);
    canvas.addEventListener('mouseup', _handleUp, false);
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

    var frameNo = 0;
    var timer = setInterval(() => {
        _update()
    }, 20)

    function _clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    function _drawGuide() {
        if(ismobile && orientation === 0) {
            context.fillStyle = "#CCAAAA";
            context.fillRect(0, 0, 40, _height);
            context.fillStyle = "#AAAADD";
            context.fillRect(_width - 40, 0, _width, _height);
        } else {
            context.fillStyle = "#CCAAAA";
            context.fillRect(0, 0, _width, 40);
            context.fillStyle = "#AAAADD";
            context.fillRect(0, _height - 40, _width, _height);
        }
    }

    function _update() {
        var x, height, gap, minHeight, maxHeight, minGap, maxGap;
        
        for (var i = 0; i < obstacles.length; i += 1) {
            if (!obstacles[i].delete && player.crashWith(obstacles[i])) {
                
                //if(obstacles[i].elemType === 2) {
                if(obstacles[i].caseType === 0) {
                    //const eltype = obstacles[i].elemType;
                    
                    if(obstacles[i].elemType > 16) {

                        var payload = {};
                        if(obstacles[i].elemType === 17) payload = { score: 10, health: 0 }; //uber
                        if(obstacles[i].elemType === 18) payload = { score: 20, health: 0 }; //toilet
                        if(obstacles[i].elemType === 19) payload = { score: 0, health: 100 }; //face
                        if(obstacles[i].elemType === 20) payload = { score: 100, health: 0 }; //100k
                        
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
                    //obstacles[i].delete = true;
                } else if(obstacles[i].caseType === 2 || obstacles[i].caseType === 3) {
                    //obstacles[i].delete = true;
                    
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
                    //console.log("return", obstacles[i].caseType)
                    return;
                }
                //return;
            } 
        }

        _clear();
        frameNo += 1;

        // draw borders
        _drawGuide();

        //if (frameNo === 1 || everyInterval(150)) {
        if (frameNo === 1 || everyInterval(200)) {
            
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
                    const gap1 = (y0 - 60) - minHeight;
                    const gap2 = maxHeight - (y0 + 60);
                    const gapOK = [];
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

            //obstacles.push(new MyComponent(10, height, "green", x, 0));
            //obstacles.push(new MyComponent(10, x - height - gap, "green", x, height + gap));
            
            //obstacles.push(new MyComponent(10, height, "green", x, 0));
            //obstacles.push(new MyComponent(10, x - height - gap, "green", x, height + gap));
            
        }

        obstacles = obstacles.filter(item => {
            return !item.delete || item.x <= 40;
        })

        for (var i = 0; i < obstacles.length; i += 1) {
            if(ismobile && orientation === 0) {
                obstacles[i].y += 1;
            } else {
                obstacles[i].x += -1;
            }
            obstacles[i].update();
        }

        player.newPos();
        player.update();

        /*
        document.addEventListener('keydown', function(event){
            if(Keys.Up(event.keyCode)) {
                //console.log("UP");
                //player.speedY = -1;
                player.speedY = -1;

            } else if(Keys.Down(event.keyCode)){
                //console.log("DOWN");
                player.speedY = 1;

            } else if(Keys.Left(event.keyCode)) {
                //console.log("LEFT");

            } else if(Keys.Right(event.keyCode)){
                //console.log("RIGHT");

            }
        })
        document.addEventListener('keyup', function(event){
            console.log("up")
            player.speedX = 0;
            player.speedY = 0;
        })*/

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


        //1-3 normal
        //5-6 asymptomatic
        //6-7 symptomatic
        //8 mask: health
        //9 100k: score
        //10-12 delivery i.e. bento, dry grocery, fresh grocery: points
        this.elemType = (type === "player")?0:Lib.getRandomInt(1,20);
        this.caseType = (type === "player"|| this.elemType > 16)?0:Lib.getRandomInt(1,3);
        
        this.delete = false;
        this.bias = 10;
        this.radius = 0;

        /*
        this.chance = Lib.getRandomInt(0,3);
        if(this.chance === 3 && type !== "player") {
            color = "magenta";
        } else if(this.chance === 2 && type !== "player") {
            color = "cyan";
        }*/

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
                //ctx.drawImage(mrbean,0,0); //image_player
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

            } else if (this.type === "playerx") {
                //ctx.font = this.width + " " + this.height;
                //ctx.fillStyle = color;
                //ctx.fillText(this.text, this.x, this.y);
                
                //const sx = 300;
                //const px = sx*this.index;
                //ctx.drawImage(birds, px, 0, sx, 42, this.x, this.y, 20, 20)
                //this.index = (this.index + 1)%10

            } else {
                ///////////////////////////////////
                var _color = color;
                if(this.delete){
                    this.bias-=1;
                    if(this.bias <= 1) this.bias = 1;
                    _color = colorScale(this.bias)
                }
                if(this.elemType === 1) {
                    _color = color;
                }

                //ctx.fillStyle = _color;
                //ctx.fillRect(this.x, this.y, this.width, this.height);
                /////////////////////////////////////

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
                
                //var linecolor = (this.elemType === 1)?"#ff1a75":"#ffd11a";
                //linecolor = (this.elemType === 3)?"#4dff4d":linecolor;
                //linecolor = (this.elemType === 4)?"#944dff":linecolor;

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

                //////////////////////////////////////
                //ctx.drawImage(mrbean, this.x, this.y)
                
                /*
                var rad = 0;
                if(this.direction > 0) {
                    rad = 90 - (10*this.angle)
                } else {
                    rad = -90 + (10*this.angle);
                }
                rad = rad * Math.PI/180;
                
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(rad);
                ctx.translate(-15,-15);
                ctx.drawImage(mrbean,0,0);
                ctx.restore();

                this.angle = (this.angle + 1)%18;
                if(this.angle === 0) {
                    this.direction = (this.direction > 0)?0:1;
                }
                */

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

    /*
    var event = new CustomEvent(
        "gameEvent", 
        {
            detail: {
                name: `HELLO FROM GAME`,
            },
            bubbles: true,
            cancelable: true
        }
    );
    containerElement.dispatchEvent(event);
    */
    
    var _start = false;
    var _prevx = 0;
    var _prevy = 0;
    function _handleDown(e) {
        //console.log('down', e.button, e.clientX, e.clientY)
        _start = true;
        _prevx = e.clientX;
        _prevy = e.clientY;
    }
    function _handleMove(e) {
        //console.log('move', e.button, e.clientX, e.clientY)
        if(!_start) return;
        const dx = e.clientX - _prevx;
        const dy = e.clientY - _prevy;
        
        /*
        if(Math.abs(dx) > Math.abs(dy)) {
            //player.speedX = (dx < 0)?0:1;
            //player.speedY = dx;
        } else if(Math.abs(dx) < Math.abs(dy)) {
            //player.speedY = (dy < 0)?-1:1;
            player.speedY = dy;
        }*/
        
        player.speedY = dy;

        _prevx = e.clientX;
        _prevy = e.clientY;
    }

    function _handleUp(e) {
        //console.log('up', e.button, e.clientX, e.clientY)
        _start = false;
        //player.speedX = 0;
        //player.speedY = 0;
        setTimeout(()=>{
            player.speedX = 0;
            player.speedY = 0;
        }, 100)
    }

    function resize(width, height, _orientation) {
        //console.log("resize", width, height)

        // pause game
        clearInterval(timer)

        const _prev_orientation = orientation;
        orientation = _orientation;

        const prev_width = _width;
        const prev_height = _height;
        
        var new_x = player.x * width / prev_width;
        var new_y = player.y * height / prev_height;

        console.log("AAA")
        if(_prev_orientation !== orientation) {
            console.log("BBB", orientation, ismobile)
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
        
        // restart
        timer = setInterval(() => {
            _update()
        }, 20)
    }

    function destroy() {
        clearInterval(timer);
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
        console.log("gravity", player.gravitySpeed)
        player.speedX = 0;
        player.speedY = 0;
    }
    
    var flagAccel = false;
    var timAccel;
    function accelerate(n) {
        if(flagAccel) return;
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
        deccelerate,
    }
}