// asdfghjkl are the keys for the patatap clone

var originalColor = [32, 9, 18];
var backgroundColor = [...originalColor]
var flashCounter = 0
var flashInterval
var divState = 'up' // up, down, movingup, movingdown
let isMovingRight = true;

let sounds = {}

function preload() {

  sounds["a"] = loadSound('assets/sounds/clap.wav')
  sounds["s"] = loadSound('assets/sounds/808.wav')
  sounds["d"] = loadSound('assets/sounds/shutter.wav')
  sounds["f"] = loadSound('assets/sounds/rise.wav')
  sounds["g"] = loadSound('assets/sounds/8082.wav')
  sounds["h"] = loadSound('assets/sounds/click.wav')
  sounds["j"] = loadSound('assets/sounds/impact.wav')
  sounds["k"] = loadSound('assets/sounds/slide.wav')
  sounds["l"] = loadSound('assets/sounds/snare.wav')
  
}

function setup() {
  createCanvas(windowWidth, windowHeight)
   circleDiv = select('#circleDiv');
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(backgroundColor)


  
}

function keyPressed() {
  // for a
  if (key === 'a'|| key ==='A') {
    sounds["a"].play()
    flashCounter = 0
    if (flashInterval) {
      clearInterval(flashInterval)
    }
    flashInterval = setInterval(flashPink, 40)
    return false;  // prevent default
  }



  // for s
  if (key === 's' || key ==='S') {
    sounds["s"].play()
    var secondMotionDiv = document.querySelector('.second-motion')

    // if div currently animating, do nothing
    if (divState === 'movingUp' || divState === 'movingDown') {
      return
    }

    if (divState === 'up') { // moves from up to down
      divState = 'movingDown'
      secondMotionDiv.style.top = "0%"

      setTimeout(function() {
      secondMotionDiv.style.top = "100%"

      secondMotionDiv.addEventListener('transitionend', function() {
      divState = 'down' // update the state after the transition ends
      }, { once: true })  // ensure the event listener is called only once
    }, 800) // pause time

  } else if (divState === 'down') { // moves from down to up
      divState = 'movingUp'
      secondMotionDiv.style.top = "0%"

      setTimeout(function() {
      secondMotionDiv.style.top = "-100%"

      secondMotionDiv.addEventListener('transitionend', function() {
      divState = 'up' // update the state after the transition ends
      }, { once: true })  // ensure the event listener is called only once
    }, 800) // pause time
  }

   return false  // prevent default
  }


  // for d
  if (key === 'd' || key === 'D') {
    animateCircleDiv();
    sounds["d"].play()
}


  // for f
  if (key === 'f' || key === 'F') {
    sounds["f"].play()
    animateRectangle()
  }

// for g
if (key === 'g' || key === 'G') {
    sounds["g"].play()
  var fourthMotionDiv = document.querySelector('.fourth-motion')
  var fourthMotionState = 'left'; // initialize the state for the fourth-motion div

  // if div currently animating, do nothing
  if (fourthMotionState === 'movingLeft' || fourthMotionState === 'movingRight') {
      return;
  }

  if (fourthMotionState === 'left') { // moves from left to right
      fourthMotionState = 'movingRight'
      fourthMotionDiv.style.left = "0%"

      setTimeout(function() {
          fourthMotionDiv.style.left = "100%"

          fourthMotionDiv.addEventListener('transitionend', function() {
              fourthMotionState = 'right' // update the state after the transition ends
          }, { once: true })  // ensure the event listener is called only once
      }, 800) // pause time

  } else if (fourthMotionState === 'right') { // moves from right to left
      fourthMotionState = 'movingLeft'
      fourthMotionDiv.style.left = "0%"

      setTimeout(function() {
          fourthMotionDiv.style.left = "-100%"

          fourthMotionDiv.addEventListener('transitionend', function() {
              fourthMotionState = 'left' // update the state after the transition ends
          }, { once: true })  // ensure the event listener is called only once
      }, 800) // pause time
  }

  return false  // prevent default
}


// for h
if (key === 'h' || key === 'H') {
  circleFade();
  setTimeout(function() {
    sounds["h"].play();
  }, 500); // Delays the sound playing by 500ms
}



//for j
if (key === 'j' || key === 'J') {
  sounds["j"].play()
  animateZigzag()
}


// for k
if (key === 'k' || key === 'K') {
  sounds["k"].play()
  animateLine()
}

 // for l
 if (key === 'l' || key === 'L') {
  sounds["l"].play()
  flashCounter = 0
  if (flashInterval) {
    clearInterval(flashInterval)
  }
  flashInterval = setInterval(flashDark, 40)
  return false;  // prevent default
}

}




function flashPink() { // toggle between the flash color and original color
  if (flashCounter % 2 === 0) { 
    backgroundColor = [177, 114, 138]
  } else {
    backgroundColor = [...originalColor]
  }
  
  flashCounter++
  
  // stops flash
  if (flashCounter >= 6) {
    clearInterval(flashInterval)
    backgroundColor = [...originalColor]
  }

  redraw()  // reset canvas
}

function flashDark() { // toggle between the flash color and original color
  if (flashCounter % 2 === 0) { 
    backgroundColor = [10, 2, 5]
  } else {
    backgroundColor = [...originalColor]
  }
  
  flashCounter++
  
  // stops flash
  if (flashCounter >= 6) {
    clearInterval(flashInterval)
    backgroundColor = [...originalColor]
  }

  redraw()  // reset canvas
}


function animateCircleDiv() {
  const circleDivs = document.querySelectorAll('.circleDiv');
  
  circleDivs.forEach(div => {
    div.style.display = 'none';
  });
  
  // pick a random div
  const randomDiv = circleDivs[Math.floor(Math.random() * circleDivs.length)];
  randomDiv.style.display = 'block';  // display the selected div
  
  
  let animationProps; // determine animation based on div id
  switch (randomDiv.id) {
    case 'topLeft':
    case 'topRight':
      animationProps = {top: ['-100%', '40%']};  // coming down into view
      break;
    case 'bottomLeft':
    case 'bottomRight':
      animationProps = {top: ['100%', '40%']};  // coming up into view
      break;
  }

  anime({   // animation
      targets: randomDiv,
      ...animationProps,
      scale: [1, 5],
      duration: 1000,
      easing: 'easeOutCubic',
      direction: 'alternate'
  });
}




const rectangleDiv = document.querySelector(".rectangleDiv");

function animateRectangle() {
  const targetX = isMovingRight ? '800%' : '-810%';
  const animationDuration = 3000;

  anime({
    targets: rectangleDiv,
    translateX: targetX,
    duration: animationDuration,
    easing: 'easeOutCubic',
  });

  isMovingRight = !isMovingRight; 
}

const colors = [
  'rgba(189, 139, 236, 1)',
  'rgba(83, 226, 23, 1)',
  'rgba(220, 187, 43, 1)',
  'rgba(181, 158, 29, 1)', 
  'rgba(105, 47, 47, 1)',
  'rgba(116, 121, 168, 1)'
];

function circleFade() {
  // selects circles
  const circles = document.querySelectorAll('.circle-fade');

  circles.forEach(circle => {
    // randomize position within window
    const maxX = document.documentElement.clientWidth - circle.offsetWidth;
    const maxY = document.documentElement.clientHeight - circle.offsetHeight;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    // assign random color from array
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Set initial background before animation
    circle.style.background = `radial-gradient(circle at center, ${color} 0%, rgba(0, 0, 0, 0) 70%)`;

    anime({
      targets: circle,
      scale: [0, 1], // small then scale
      opacity: [0, 1, 0], // transparent, opaque, fade out
      easing: 'easeOutCubic',
      duration: 1000,
      left: `${randomX}px`, // random left
      top: `${randomY}px`, // random top
      update: function(anim) {
        const progress = anim.progress; // 0 to 100
        // fade from center
        circle.style.background = `radial-gradient(circle at center, ${color} ${progress}%, rgba(0, 0, 0, 0) ${progress + 30}%)`;
      },
    });
  });
}

function animateZigzag() {
  var svgs = document.querySelectorAll('svg'); 
  var randomIndex = Math.floor(Math.random() * svgs.length); 
  var svg = svgs[randomIndex];
  
  // clone the SVG to reset the animation
  var newSvg = svg.cloneNode(true);


  var path = newSvg.querySelector('.vertical-zigzag');
  

  path.setAttribute('stroke-dashoffset', '2000');
  path.setAttribute('stroke-opacity', '0');

  // replace svg
  svg.parentNode.replaceChild(newSvg, svg);

  path.classList.add('animate-zigzag');
}

const lineDiv = document.querySelector(".line-animation");

function animateLine() {
  const targetX = isMovingRight ? '800%' : '-810%';
  const animationDuration = 2000;

  anime({
    targets: lineDiv,
    translateX: targetX,
    duration: animationDuration,
    easing: 'easeOutCubic',
  });

  isMovingRight = !isMovingRight; 
}