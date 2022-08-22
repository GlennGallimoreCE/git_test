const player = document.querySelector('#you');
let posX = 0;
let posY = 0;

const canvas = document.querySelector('#area');

const enemyBars = document.querySelector('#bars');
const enemyBars1 = document.querySelector('#bars1');
const enemyBars2 = document.querySelector('#bars2');
const enemyBars3 = document.querySelector('#bars3');
const ptn = document.getElementsByClassName('potion')
const ptnText = document.getElementById('#potionId');
const yourScore = document.querySelector('#yourScore');
const hpText = document.querySelector('#hitPoints');

let hp = 100;
let score = 0;
let potionCount = 3;





//resetBtn.addEventListener("click", resetGame);


//Moving the player icon around the area.  I found this on StackOverflow though I wish I recalled the author.  
//Honestly, I could have done a more simplistic version but I've had issues with it so I went with this.

document.addEventListener('keydown', (e) => {
    let direction = (e.key.match( /(?<=^Arrow)\w+/ ) || [] )[0];
    
    if (!direction) return; // Use this to determine if it's an arrow key pressed
    

    e.preventDefault(); //Use this to prevent icon going past the browser limit



    ({
          Up:    () => posY -= 8, 
          Down:  () => posY += 8,

          Left:  () => posX -= 8,
          Right: () => posX += 8,

    } [direction]) (), 

    
    

    player.style.transform = `translate(${posX}px, ${posY}px)`
    
    //Creating the border so the player icon can't leave.
    //Since the pos was set for 0,0 just make it to where the player can't exceed the boundaries using the inspect tool for that game area div.
    //The pos is larger than the regular movement to create the "bounce" effect.
    if (posX < -280) {
        posX += 10;
    }
    else if (posX > 294) {
        posX -= 10;
    }
    else if (posY < -203) {
        posY += 10;
    }    
    else if (posY > 215) {
        posY -= 10;
    }
});


//Taking hits from the bars.  This is a variable which is a set interval function.
//This took me days to figure out, but I needed to get the element properties and create every possible collision.
//This also has be be set as an interval, otherwise you only take damage when moving.  
//Including the setInterval, meaning the browser checks for hits even when standing idle.
let checkHit = setInterval(function() {


    

    let obj1 = document.getElementById('you').getBoundingClientRect();
    let obj2 = document.getElementById('bars').getBoundingClientRect();
    let obj3 = document.getElementById('bars1').getBoundingClientRect();
    let obj4 = document.getElementById('bars2').getBoundingClientRect();
    let obj5 = document.getElementById('bars3').getBoundingClientRect();
    

    if (obj1.x + obj1.width >= obj2.x &&
        obj1.x <= obj2.x + obj2.width &&
        obj1.y + obj1.height >= obj2.y &&
        obj1.y <= obj2.y + obj2.height){
            hpText.textContent = hp;
            hp -= 1;
        document.getElementById('you').style.backgroundColor = "#8B0000";
        console.log("touching");

    } else if (obj1.x + obj1.width >= obj3.x &&
        obj1.x <= obj3.x + obj3.width &&
        obj1.y + obj1.height >= obj3.y &&
        obj1.y <= obj3.y + obj3.height){
            hpText.textContent = hp;
            hp -= 1;
        document.getElementById('you').style.backgroundColor = "#8B0000";
        console.log("touching");

    } else if (obj1.x + obj1.width >= obj4.x &&
        obj1.x <= obj4.x + obj4.width &&
        obj1.y + obj1.height >= obj4.y &&
        obj1.y <= obj4.y + obj4.height){
            hpText.textContent = hp;
            hp -= 1;
        document.getElementById('you').style.backgroundColor = "#8B0000";
        console.log("touching");

    } else if (obj1.x + obj1.width >= obj5.x &&
        obj1.x <= obj5.x + obj5.width &&
        obj1.y + obj1.height >= obj5.y &&
        obj1.y <= obj5.y + obj5.height){
            hpText.textContent = hp;
            hp -= 1;
        document.getElementById('you').style.backgroundColor = "#8B0000";
        console.log("touching");



    } else {
        
        document.getElementById('you').style.backgroundColor = "red";
        console.log("NOT touching");
        
    }
}, 200);



//Accumulating points
//For every second the game is up and your HP is above 1, you get 10 points.

let playerScore = setInterval(function() {
    yourScore.textContent = score;
    score += 10;
}, 1000);

//Increased difficulty
//The more points you gain, the more obstacles appear.
//Also the border and bars change color


//Game Over = or, player HP falls to 0.
let gameOver = setInterval(function() {
    
    if (hp === 0) {
        hpText.textContent = hp;
        hp = 0;
        clearInterval(playerScore);
        clearInterval(checkHit);
        player.remove();
        enemyBars.remove();
        enemyBars1.remove();
        enemyBars2.remove();
        enemyBars3.remove();

        let gameOverDiv = document.querySelector('#GameOver');
        let grid = document.querySelector('#area');
        grid.style.display = "none";
        gameOverDiv.style.display = "block";
    }


}, 10);


//Potions -- to give the player an extra edge to heal
ptn.document.addEventListener("click", potions);
function potions() {
    
    console.log("You take a potion, 15 HP restored!")
    if (potionCount >= 0 ) {
        ptnText.textContent = potionCount;
        potionCount -= 1;
        
        hp += 15;
    } else {
        return;
    }

};

