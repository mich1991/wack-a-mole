window.addEventListener('load', () => {
    console.log('loaded')
    const square = document.querySelectorAll('.square');
    const mole = document.querySelectorAll('.mole');
    const timeLeft = document.querySelector('#timeleft')
    const gameSound = document.querySelector('#gameSound')
    const finalCountDown = document.querySelector('#countDown')
    const gameOver = document.querySelector('#gameOver')
    const popUp = document.querySelector('.pop-up')
    let score = document.querySelector('#score')
    let highScore = document.querySelector('.highScore h3')
    let gameStart;
    const wackAMole = () => {
        gameStart = true
        let result = 0
        let currentTime = timeLeft.textContent

        gameSound.play()

        function randomSquare(currentTime) {
            square.forEach(className => {
                className.classList.remove('mole')
            })
            let randomPosition = square[Math.floor(Math.random() * 9)]
            randomPosition.classList.add('mole')

            // assign the id of the randomPosition to hitPosition for us to later use
            hitPosition = randomPosition.id
        }

        square.forEach(id => {
            id.addEventListener('mouseup', () => {
                if (id.id === hitPosition) {
                    result = result + 1
                    score.textContent = result
                }
            })
        })

        function moveMole() {
            let timerId = null
            timerId = setInterval(function () {
                randomSquare()
                if (currentTime === 0) {
                    clearInterval(timerId)
                }
            }, 1000)

        }


        function countDown() {
            currentTime--
            timeLeft.textContent = currentTime

            if (currentTime === 11) {
                finalCountDown.play()
            }
            if (currentTime === 0) {
                clearInterval(timerId)
                gameOver.play()
                popUp.classList.remove('hidden')
                popUp.childNodes[1].textContent = result
                result > highScore.textContent ? highScore.textContent = result : highScore.textContent
                gameStart = false
            }
        }

        let timerId = setInterval(countDown, 1000)
        moveMole()
    }
    wackAMole()

    const playAgain = document.querySelector('.pop-up button')
    playAgain.addEventListener('click', () => {
        timeLeft.textContent = 60
        score.textContent = 0
        popUp.classList.add('hidden')
        wackAMole()
    })

})