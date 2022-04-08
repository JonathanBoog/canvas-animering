let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = "100%";
canvas.style.height = "100%";

let c = canvas.getContext("2d");

// Startläge kvadraterna
// Slumpas fram med lite marginal från kanterna
// (minst 200 px till vänstermarginal, max 20 % av bredd till högermarginal)
let xPosRed = Math.floor(Math.random() * (0.8 * canvas.width - 200) + 200);
let yPosRed = Math.floor(Math.random() * (0.8 * canvas.height - 200) + 200);
let xPosYellow = Math.floor(Math.random() * (0.8 * canvas.width - 100) + 100);
let yPosYellow = Math.floor(Math.random() * (0.8 * canvas.height - 100) + 100);

// Hastighet för respektive kvadrat, i x- och y-led
// kan slumpas fram inom lämpligt intervall enl. samma metod som startläget.
let dxRed = 3;
let dyRed = 4;
let dxYellow = 5;
let dyYellow = 3;
let moveSpeed = Math.round(Math.random()*15+5)

// Sidlängd för respektive kvadrat
const sizeRed = 30;
const sizeYellow = 30;

// Variabler som håller reda på respektive kvadrats mittkoordinat
let xCenterRed = (xPosRed + xPosRed + sizeRed) / 2;
let yCenterRed = (yPosRed + yPosRed + sizeRed) / 2;
let xCenterYellow = (xPosYellow + xPosYellow + sizeYellow) / 2;
let yCenterYellow = (yPosYellow + yPosYellow + sizeYellow) / 2;

// Variabler för tidsmätning
let ticks = 0;
let runtime = 0;
const updateFrequency = 10; // millisekunder per steg

// Variabler som håller koll på antalet studsar
let redBounces = 0;
let yellowBounces = 0;

let rectX = Math.round(Math.random()*300+50)
let rectY = Math.round(Math.random()*300+50)
let rectHeight = canvas.height-2*rectY;
let rectWidth = canvas.width-2*rectX

let rectTouches = 0;
let touchR = false;
let touchY = false;

let arrayRed = [];
let arrayYellow = [];

let snakeLength = 100;

let rectLength = Math.round(Math.random()*100 +2)

let color = ["red", "orange", "yellow", "green", "ligthBlue", "blue", "purple"];
let boo = 0;
let colorR = ["GreenYellow ","Chartreuse","LawnGreen ", "Lime", "LimeGreen", "PaleGreen","LightGreen ","MediumSpringGreen ","SpringGreen ", "MediumSeaGreen ", "SeaGreen ", "ForestGreen","Green","DarkGreen","YellowGreen", "OliveDrab","DarkOliveGreen", "MediumAquaMarine ", "DarkSeaGreen","LightSeaGreen","DarkCyan","Teal"]
let bru = 0;
// Reagerar på tangenttryckningar
// Varje tangent har sin keycode, se https://keycode.info
document.onkeydown = function (e) {
  const key = e.key;
  switch (key) {
    case "ArrowUp":
      console.log("upp");
      dxRed = 0;
      dyRed = -moveSpeed;
      break;
    case "ArrowDown":
      console.log("ner");
      dxRed = 0;
      dyRed = moveSpeed;
      break;
    
    case "ArrowLeft":
      console.log("vänster");
      dxRed = -moveSpeed;
      dyRed = 0;
      break;
      
    case "ArrowRight":
      console.log("höger");
      dxRed = moveSpeed;
      dyRed = 0;  
      break;    

    case "a":
      console.log("vänster");
      dxYellow = -moveSpeed;
      dyYellow = 0;
      break;
    case "s":
      console.log("ner");
      dxYellow = 0;
      dyYellow = moveSpeed;
      break;

    case "w":
      console.log("upp");
      dxYellow = 0;
      dyYellow = -moveSpeed;
      break;
    case "d":
      console.log("höger");
      dxYellow = moveSpeed;
      dyYellow = 0;
      break;
    case "r":
      console.log("reset");
      dxRed = 3; 
      dyRed = 4;
      dxYellow = 5;
      dyYellow = 3;
      break;
    case " ": // Mellanslag
      console.log(`Runtime: ${runtime} sekunder.`);
      break;
    default:
      console.log("Tangenten använd inte");
  }
};

let myTimer = setInterval(drawRects, updateFrequency);


// Ritar upp kvadraterna
function drawRects() {
  // Håller koll på tiden som programmet varit igång
  ticks += 1;
  runtime = (ticks / 1000) * updateFrequency; // i sekunder

  if (redBounces >= 100 || yellowBounces >= 100) {
    clearInterval(myTimer);
    alert("Stop it! \nGet some help");

  }
  if (rectTouches >= rectLength){
    clearInterval(myTimer);
    alert("sus \ndu nudda rektangeln för mycket...");
  }
  // Rensar gammalt visuellt innehåll

  c.beginPath()
  c.rect(rectX,rectY,rectWidth,rectHeight)
  c.stroke()
  // Kolla om riktningsändring ska göras pga kant
  checkBounce();

  //Kolla antalet gångar som kvadraterna har gått genom den mindre
  checkTouch();
  checkSUS();
  console.log(rectTouches)

  // Beräkna nytt läge
  xPosRed += dxRed;
  yPosRed += dyRed;
  xPosYellow += dxYellow;
  yPosYellow += dyYellow;


  let hexCode = '#' + bru.toString(16).padStart(1, "0"); 
  bru++;
  c.fillStyle = hexCode
  c.fillRect(xPosRed, yPosRed, sizeRed, sizeRed);
  arrayRed.push(xPosRed);
  arrayRed.push(yPosRed);
  arrayRed.push(sizeRed);
  arrayRed.push(sizeRed);

  // Den gula kvadraten ritas i sitt nya läge
  
  
  if (boo == colorR.length){boo = 0;}
  c.fillStyle = colorR[boo];
  boo++;
   c.fillRect(xPosYellow, yPosYellow, sizeYellow, sizeYellow);
  arrayYellow.push(xPosYellow)
  arrayYellow.push(yPosYellow) 
  arrayYellow.push(sizeYellow)
  arrayYellow.push(sizeYellow)
  
  if ((arrayRed.length && arrayYellow.length) == snakeLength){
  c.clearRect(arrayRed.splice(0,1),arrayRed.splice(0,1),arrayRed.splice(0,1),arrayRed.splice(0,1));
  c.clearRect(arrayYellow.splice(0,1),arrayYellow.splice(0,1),arrayYellow.splice(0,1),arrayYellow.splice(0,1));
  }
  
  // Variablerna för mittenkoordinaten för respektive
  // kvadrat uppdateras
  xCenterRed = (xPosRed + xPosRed + sizeRed) / 2;
  yCenterRed = (yPosRed + yPosRed + sizeRed) / 2;
  xCenterYellow = (xPosYellow + xPosYellow + sizeYellow) / 2;
  yCenterYellow = (yPosYellow + yPosYellow + sizeYellow) / 2;
}

function checkSUS(){

}
// Då respektive kvadrat kommer till en ytterkant ska de studsa
function checkTouch() {
  
  if (xPosRed < rectX || xPosRed > (canvas.width - rectX - sizeRed)){
    if (touchR == false){
      rectTouches+=1;
      touchR = true;
    }
    
  } else if (yPosRed < rectY || yPosRed > (canvas.height - rectY - sizeRed)) {
    
    if (touchR == false){
      rectTouches+=1;
      touchR = true;
    }
    
  } else {touchR = false;}


  if (xPosYellow < rectX || xPosYellow > (canvas.width - rectX - sizeYellow)) {
    if (touchY == false){
      rectTouches+=1;
      touchY = true;
    }
    
  } else if (yPosYellow < rectY || yPosYellow > (canvas.height - rectY - sizeYellow)) {
    if (touchY == false){
      rectTouches+=1;
      touchY = true;
    }
    
  } else {touchY = false;}

   
} 
function checkBounce() {
  if (xPosRed < 0 || xPosRed > canvas.width - sizeRed) {
    dxRed = -dxRed;
    redBounces += 1;
  }

  if (xPosYellow < 0 || xPosYellow > canvas.width - sizeYellow) {
    dxYellow = -dxYellow;
    yellowBounces += 1;
  }

  if (yPosRed < 0 || yPosRed > canvas.height - sizeRed) {
    dyRed = -dyRed;
    redBounces += 1;
  }
  if (yPosYellow < 0 || yPosYellow > canvas.height - sizeYellow) {
    dyYellow = -dyYellow;
    yellowBounces += 1;
  }
}
