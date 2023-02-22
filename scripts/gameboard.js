let gameboard = {
    background: document.getElementById("gameBack"), // Gets the container element
    board: document.querySelector('canvas'), // Gets the canvas element
    ctx: '', // The cavas context - used for drawing.
    clear: function(){
        // Clears the canvas
        this.ctx.clearRect(0, 0, this.board.width, this.board.height)
    },
    scores: document.getElementsByClassName('score'), // Gets the 'score' elements. Used for updating the score.
    scoreboards: document.getElementsByClassName('score-tab'), // Gets the 'score-tab' elements. Used for updating the score.
    startMessage: function (){
        this.ctx.font = "bolder 60px Arial";
        this.ctx.fillStyle = "#F9E3BD";
        this.ctx.textAlign = "center";
        this.ctx.font = "bolder 80px Arial";
        this.ctx.fillText("Let's get started!", gameboard.board.width/2, (gameboard.board.height/2) - 60)
        this.ctx.font = "bolder 40px Arial";
        this.ctx.fillText("Press the  \"space\" bar to start the game.", gameboard.board.width/2, (gameboard.board.height/2) + 80)
    },
    resetScores: function(){
        // Sets the scoreboard to all zeros.
        for(let i=0; i < this.scores.length; i++){
            this.scores[i].textContent = 0
        }
    },
    saveScores: function(){
        // Saves player scores and mode to localstorage
        localStorage.setItem("player1", JSON.stringify(player1.matchScore))
        localStorage.setItem("player2", JSON.stringify(player2.matchScore))
        localStorage.setItem("mode", JSON.stringify(game.mode))
    },
    getScores: function(){
        // Gets player scores and mode from localstorage
        let score1 = JSON.parse(localStorage.getItem("player1"))
        let score2 = JSON.parse(localStorage.getItem("player2"))
        let mode = JSON.parse(localStorage.getItem("mode"))
        
        if(mode){
            game.mode = mode
        } else {
            game.mode = 1
        }

        if(game.mode == '1'){
            this.modes[0].checked = true
        } else {
            this.modes[1].checked = true
        }

        
        if(score1){
            player1.matchScore = score1
        } else {
            player1.matchScore = 0
        }
    
        if(score2){
            player2.matchScore = score2
        } else {
            player2.matchScore = 0
        }

        gameboard.scores[2].textContent = player1.matchScore
        gameboard.scores[3].textContent = player2.matchScore
    },
    setBackground: function(){
        // Sets the container's background to a random image
        let rand = Math.round(Math.random() * (this.backgrounds.length-1))
        while(rand == this.currentBg){
            rand = Math.round(Math.random() * (this.backgrounds.length-1))
        }
        this.currentBg = rand
        console.log(this.backgrounds.length)
        let encoded = window.btoa(this.backgrounds[rand]);

        this.background.style.background = "url(data:image/svg+xml;base64,"+encoded+")";
        this.background.style.backgroundSize = 'cover'
    },
    scoreAnimation: function(board){
        // Flashes a scoreboard green when a point is scored or a match ends.
        this.scoreboards[board].style.backgroundColor = 'var(--success)'
        this.scoreboards[board].style.transform = 'scale(1.2)'
        setTimeout(() => {
            this.scoreboards[board].style.backgroundColor = 'var(--sand)'
            this.scoreboards[board].style.transform = 'scale(1)'
        }, 1500)
    },
    modes: document.getElementsByName('mode'), // Gets the 'mode' elements. Used for selecting game mode.
    bounce: document.getElementById('bounce'), // Gets the 'bounce' audio element
    wall: document.getElementById('wall'), // Gets the 'wall' audio element
    point: document.getElementById('point'), // Gets the 'point' audio element
    victory: document.getElementById('victory'), // Gets the 'point' audio element
    currentBg: 0, // Index of the current background
    backgrounds: []
}

gameboard.ctx = gameboard.board.getContext('2d')
gameboard.backgrounds = backgrounds
gameboard.resetScores()
gameboard.setBackground()