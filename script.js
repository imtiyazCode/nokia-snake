
document.addEventListener('DOMContentLoaded', ()=>{
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 20;
    let currentIndex = 0 //so first div in our grid
    let appleIndex = 0 //so first div in our grid
    let currentSnake = [2,1,0];
    let direction = 1;
    let score = 0;
    let speed = 10;
    let intervalTime = 0;
    let interval = 0;


    // to start and restart game
    function startGame(){

        currentSnake.forEach(Index => squares[Index].classList.remove('snake'));
        squares[appleIndex].classList.remove('apple');
        clearInterval(interval);
        score = 0;
        randomApple();
        direction = 1;
        scoreDisplay.innerHTML = score;
        intervalTime = 1000;
        currentSnake = [2,1,0];
        currentIndex = 0;
        currentSnake.forEach( Index => squares[Index].classList.add('snake'));
        interval = setInterval(moveOutcomes, intervalTime)
        startBtn.classList.toggle('red');
    }

    //generate new apple once apple is eaten
    function randomApple() {
        do{
            appleIndex = Math.floor(Math.random() * squares.length)
        } while(squares[appleIndex].classList.contains('snake')) //making sure apples dont appear on the snake

        squares[appleIndex].classList.add('apple');
    }
    
    //function that deals with ALL the ove outcomes of the Snake
    function moveOutcomes() {

        //deals with snake hitting border and snake hitting self
        if(
            (currentSnake[0] % width === width -1 && direction === 1) ||    //if snake hits right wall
            (currentSnake[0] + width >= (width*width) && direction === width ) || //if snake hits bottom
            (currentSnake[0] % width === 0 && direction === -1) ||  // if snake hir left wall
            (currentSnake[0] - width < 0 && direction === -width) ||    // if snake hit top wall
            squares[currentSnake[0]+direction].classList.contains('snake') //if snake goes into itself
        ) {
            alert(`Game Over! Your Score Is : ${score}`)
            return clearInterval(interval);
        }

        const tail = currentSnake.pop()
        squares[tail].classList.remove('snake');  //removes class of snake from the TAIL
        currentSnake.unshift(currentSnake[0]+direction);     //gives direction to the head of the array

        if(squares[currentSnake[0]].classList.contains('apple')){
            squares[currentSnake[0]].classList.remove('apple');
            squares[tail].classList.add('snake');
            currentSnake.push(tail);
            score++;
            scoreDisplay.textContent = score;
            randomApple();
            clearInterval(interval);
            intervalTime = intervalTime - speed;
            interval = setInterval(moveOutcomes, intervalTime);
        }
        squares[currentSnake[0]].classList.add('snake');

    }


    //assign functions to keycodes
    function control(e) {
        squares[currentIndex].classList.remove('snake')

        if(e.keyCode === 39) {
            direction = 1 //if we press the right arrow on our keyboard, the snake will go right one
        } else if (e.keyCode === 38) {
            direction = -width // if we press the up arrow, the snake will go back ten divs, appearing to go up
        } else if (e.keyCode === 37) {
            direction = -1 // if we press left, the snake will go left one div
        } else if (e.keyCode === 40) {
            direction = +width //if we press down, the snake head will instantly appear in the div ten divs from where you are now
        }
        moveOutcomes();
    }

    document.addEventListener('keyup', control);
    startBtn.addEventListener('click',startGame);

})