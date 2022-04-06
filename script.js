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

let rectX = 200
let rectY = 200
let rectHeight = canvas.height-2*rectY;
let rectWidth = canvas.width-2*rectX

let rectTouches = 0;

let touchR = false;
let touchY = false;
// Reagerar på tangenttryckningar
// Varje tangent har sin keycode, se https://keycode.info
document.onkeydown = function (e) {
  const key = e.key;
  switch (key) {
    case "ä":
      console.log("Röd kvadrat ska byta riktning i x-led");
      dxRed = -dxRed;
      break;
    case "ö":
      console.log("Röd kvadrat ska byta riktning i y-led");
      dyRed = -dyRed;
      break;
    case "a":
      console.log("Gul kvadrat ska byta riktning i x-led");
      dxYellow = -dxYellow;
      break;
    case "s":
      console.log("Gul kvadrat ska byta riktning i y-led");
      dyYellow = -dyYellow;
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
    alert("Nog med studsar!\nNu vet du hur en animering avslutas.");

  }
  if (rectTouches >= 10){
    clearInterval(myTimer);
    alert("Nog med studsar!\nDu har gått genom rektangeln för mycket");
  }
  // Rensar gammalt visuellt innehåll
  c.clearRect(0, 0, canvas.width, canvas.height);
 
  c.beginPath()
  c.rect(rectX,rectY,rectWidth,rectHeight)
  c.stroke()
  // Kolla om riktningsändring ska göras pga kant
  checkBounce();

  checkTouch();

  // Beräkna nytt läge
  xPosRed += dxRed;
  yPosRed += dyRed;
  xPosYellow += dxYellow;
  yPosYellow += dyYellow;

  // Den röda kvadraten ritas i sitt nya läge
  c.fillStyle = "red";
  c.fillRect(xPosRed, yPosRed, sizeRed, sizeRed);

  // Den gula kvadraten ritas i sitt nya läge
  c.fillStyle = "yellow";
  c.fillRect(xPosYellow, yPosYellow, sizeYellow, sizeYellow);

  // Variablerna för mittenkoordinaten för respektive
  // kvadrat uppdateras
  xCenterRed = (xPosRed + xPosRed + sizeRed) / 2;
  yCenterRed = (yPosRed + yPosRed + sizeRed) / 2;
  xCenterYellow = (xPosYellow + xPosYellow + sizeYellow) / 2;
  yCenterYellow = (yPosYellow + yPosYellow + sizeYellow) / 2;
}

// Då respektive kvadrat kommer till en ytterkant ska de studsa
function checkTouch() {
  console.log(touchR,touchY)
  if (xPosRed < rectX || xPosRed > (canvas.width - rectX - sizeRed)){
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
    
  } else {touchY = false;}

  if (yPosRed < rectY || yPosRed > (canvas.height - rectY - sizeRed)) {
    if (touchR == false){
      rectTouches+=1;
      touchR = true;
    }
    
  } else {touchR = false;}

  if (yPosYellow < rectY || yPosYellow > (canvas.height - rectY - sizeYellow)) {
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
