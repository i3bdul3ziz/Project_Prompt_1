let canvas = document.getElementById("myCanvas")
let ctx = canvas.getContext("2d")
let holderH = 5
let holderW = 40
let holderX = (canvas.width - holderW)/2
let holderY = canvas.height - holderH
let ballX = canvas.width/2
let ballY = canvas.height
let dx = 4
let dy = -4
let ballRadius = 4
let isRightPressed = false
let isLeftPressed = false
let mousedown = false 
let x = 0
let brickRowCount = 3
let brickColumnCount = 6
let brickWidth = 40
let brickHeight = 10
let brickPadding = 5
let brickOffsetTop = 10
let brickOffsetLeft = 18
let bricks = []
for(let c = 0; c < brickColumnCount; c++) {
    bricks[c] = []
    for(let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { 
            x: 0,
            y: 0,
            status: 1
        }
    }
}


// holder event mousedown 
canvas.addEventListener('mousedown', mouseDownHandler)
// holder event mouseup 
canvas.addEventListener('mouseup', mouseUpHandler)
// holder mousemove to stop 
canvas.addEventListener('mousemove', mouseMove)

function mouseDownHandler(e){
    // mouse state set to true 
    mousedown = true
    x = holderX - e.clientX
}

function mouseUpHandler (){
    // mouse state set to false 
    mousedown = false;
}

function mouseMove(e){
    // Is mouse pressed 
    if (mousedown) { 
    // Now we calculate the difference upwards
        holderX = e.clientX + x
        if(holderX < 0){
            holderX = 0
        }
        if (holderX + holderW > canvas.width){
            holderX = canvas.width - holderW
        }
    } 
}

document.addEventListener("keydown", keyDownHandler)
document.addEventListener("keyup", keyUpHandler)

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        isRightPressed = true
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        isLeftPressed = true
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        isRightPressed = false
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        isLeftPressed = false
    }
}

function collisionDetection() {
    for(let c = 0; c < brickColumnCount; c++) {
        for(let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r]
            if(b.status == 1) {
                if(ballX > b.x && ballX < b.x + brickWidth && ballY > b.y && ballY < b.y + brickHeight) {
                    dy = -dy
                    b.status = 0
                }
            }
        }
    }
}

function drawBall(){
    ctx.beginPath()
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2)
    ctx.fillStyle = "white"
    ctx.fill()
    ctx.closePath()
    ballY += dy
    ballX += dx
}

function dwarRect(){
    ctx.beginPath()
    ctx.fillStyle = "black"
    ctx.fillRect(holderX, holderY, holderW, holderH)
    ctx.closePath()
}

function drawBricks() {
    for(let c = 0; c < brickColumnCount; c++) {
        for(let r = 0; r < brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft
                let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop
                bricks[c][r].x = brickX
                bricks[c][r].y = brickY
                ctx.beginPath()
                ctx.rect(brickX, brickY, brickWidth, brickHeight)
                ctx.fillStyle = "#0095DD"
                ctx.fill()
                ctx.closePath()
            }
        }
    }
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBricks()
    drawBall()
    dwarRect()
    collisionDetection()
    if(ballY + dy < (ballRadius*2)) {
        dy = -dy
    } else if(ballY + dy > canvas.height - (ballRadius*2)){
        if(ballX > holderX && ballX < holderX + holderW) {
            dy = -dy
        }else{
            alert("Game Over")
            window.location.reload()
            clearInterval(interval)
        }
    }

    if(ballX + dx > canvas.width - (ballRadius*2) || ballX + dx < (ballRadius*2)){
        dx = -dx
    }

    if(isRightPressed) {
        holderX += 4
        if (holderX + holderW > canvas.width){
            holderX = canvas.width - holderW
        }
    } else if(isLeftPressed) {
        holderX -= 4
        if (holderX < 0){
            holderX = 0
        }
    }
}

let interval = setInterval(draw,40)