// asdfghjkl are the keys for the patatap clone

var originalColor = [32, 9, 18];
var backgroundColor = [...originalColor];

let isMovingRight = true;

let data = {
	a: {
		keys: ["a", "A"],
		src: "clap.wav",
		sound: null,
		run: () => {
			data["a"].sound.play();
			flash(originalColor, [177, 114, 138]);
		},
	},
	s: {
		keys: ["s", "S"],
		src: "808.wav",
		sound: null,
		run: () => {
			data["s"].sound.play();
			wipe(".second-motion", "top", [0, 100, 0, -100]);
		},
	},
	d: {
		keys: ["d", "D"],
		src: "shutter.wav",
		sound: null,
		run: () => {
			data["d"].sound.play();
			animateCircleDiv();
		},
	},
	f: {
		keys: ["f", "F"],
		src: "rise.wav",
		sound: null,
		run: () => {
			data["f"].sound.play();
			animateRectangle();
		},
	},
	//, "d", "f", "g", "h", "j", "k", ""
	g: {
		keys: ["g", "G"],
		src: "8082.wav",
		sound: null,
		run: () => {
			data["g"].sound.play();
			wipe(".fourth-motion", "left", [0, 100, 0, -100]);
		},
	},
	h: {
		keys: ["h", "H"],
		src: "click.wav",
		sound: null,
		run: () => {
			data["h"].sound.play();
			circleFade();
		},
	},
	j: {
		keys: ["j", "J"],
		src: "impact.wav",
		sound: null,
		run: () => {
			data["j"].sound.play();
			animateZigzag();
		},
	},
	k: {
		keys: ["k", "K"],
		src: "slide.wav",
		sound: null,
		run: () => {
			data["k"].sound.play();
			animateLine();
		},
	},
	l: {
		keys: ["l", "L"],
		src: "snare.wav",
		sound: null,
		run: () => {
			data["l"].sound.play();
			flash(originalColor, [10, 2, 5]);
		},
	},
};

// sounds["h"] = loadSound("assets/sounds/.wav");
// sounds["j"] = loadSound("assets/sounds/impact.wav");
// sounds["k"] = loadSound("assets/sounds/slide.wav");

function init() {
	// bind all keys, preload sounds for each key in data object
	for (var input in data) {
		if (data.hasOwnProperty(input)) {
			// bind keys to listen for
			Mousetrap.bind(data[input].keys, data[input].run);
			// preload the sound source
			data[input].sound = new Howl({
				src: [`assets/sounds/${data[input].src}`],
			});
			// console.log(input, data[input]);
		}
	}
	setBackground(originalColor);
}
init();

/****************** FUNCTIONS ******************/

function setBackground(color) {
	// console.log(color);
	document.body.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}

// toggle between color1 and color2
function flash(color1, color2) {
	var counter = 0;
	var int = setInterval(function () {
		if (counter % 2 === 0) {
			setBackground(color2);
		} else {
			setBackground(color1);
		}
		// stop flash
		if (++counter >= 6) {
			clearInterval(int);
		}
	}, 40);
	setBackground(color1); // reset
}

// controls CSS animation
function wipe(selector, prop, positions) {
	var div = document.querySelector(selector);
	console.log(div.style[prop], div.dataset.state);

	// if div currently animating, do nothing
	if (div.dataset.state === "moving") {
		return;
	}

	if (div.dataset.state === "pos1") {
		// moves pos1 > pos2
		div.dataset.state = "moving";
		div.style[prop] = positions[0] + "%";

		setTimeout(() => {
			div.style[prop] = positions[1] + "%";
			div.addEventListener(
				"transitionend",
				() => {
					// update the state after the transition ends
					div.dataset.state = "pos2";
				},
				// ensure the event listener is called only once
				{ once: true }
			);
		}, 800); // pause time
	} else if (div.dataset.state === "pos2") {
		// moves from down to up
		div.dataset.state = "moving";
		div.style[prop] = positions[2] + "%";
		setTimeout(() => {
			div.style[prop] = positions[3] + "%";
			div.addEventListener(
				"transitionend",
				() => {
					div.dataset.state = "pos1";
				},
				{ once: true }
			);
		}, 800);
	}
}

function animateCircleDiv() {
	const circleDivs = document.querySelectorAll(".circleDiv");

	circleDivs.forEach((div) => {
		div.style.display = "none";
	});

	// pick a random div
	const randomDiv = circleDivs[Math.floor(Math.random() * circleDivs.length)];
	randomDiv.style.display = "block"; // display the selected div

	let animationProps; // determine animation based on div id
	switch (randomDiv.id) {
		case "topLeft":
		case "topRight":
			animationProps = { top: ["-100%", "40%"] }; // coming down into view
			break;
		case "bottomLeft":
		case "bottomRight":
			animationProps = { top: ["100%", "40%"] }; // coming up into view
			break;
	}

	anime({
		// animation
		targets: randomDiv,
		...animationProps,
		scale: [1, 5],
		duration: 1000,
		easing: "easeOutCubic",
		direction: "alternate",
	});
}

const rectangleDiv = document.querySelector(".rectangleDiv");

function animateRectangle() {
	const targetX = isMovingRight ? "800%" : "-810%";
	const animationDuration = 3000;

	anime({
		targets: rectangleDiv,
		translateX: targetX,
		duration: animationDuration,
		easing: "easeOutCubic",
	});

	isMovingRight = !isMovingRight;
}

const colors = [
	"rgba(189, 139, 236, 1)",
	"rgba(83, 226, 23, 1)",
	"rgba(220, 187, 43, 1)",
	"rgba(181, 158, 29, 1)",
	"rgba(105, 47, 47, 1)",
	"rgba(116, 121, 168, 1)",
];

function circleFade() {
	// selects circles
	const circles = document.querySelectorAll(".circle-fade");

	circles.forEach((circle) => {
		// randomize position within window
		const maxX = document.documentElement.clientWidth - circle.offsetWidth;
		const maxY =
			document.documentElement.clientHeight - circle.offsetHeight;
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
			easing: "easeOutCubic",
			duration: 1000,
			left: `${randomX}px`, // random left
			top: `${randomY}px`, // random top
			update: function (anim) {
				const progress = anim.progress; // 0 to 100
				// fade from center
				circle.style.background = `radial-gradient(circle at center, ${color} ${progress}%, rgba(0, 0, 0, 0) ${
					progress + 30
				}%)`;
			},
		});
	});
}

function animateZigzag() {
	var svgs = document.querySelectorAll("svg");
	var randomIndex = Math.floor(Math.random() * svgs.length);
	var svg = svgs[randomIndex];

	// clone the SVG to reset the animation
	var newSvg = svg.cloneNode(true);

	var path = newSvg.querySelector(".vertical-zigzag");

	path.setAttribute("stroke-dashoffset", "2000");
	path.setAttribute("stroke-opacity", "0");

	// replace svg
	svg.parentNode.replaceChild(newSvg, svg);

	path.classList.add("animate-zigzag");
}

const lineDiv = document.querySelector(".line-animation");

function animateLine() {
	const targetX = isMovingRight ? "800%" : "-810%";
	const animationDuration = 2000;

	anime({
		targets: lineDiv,
		translateX: targetX,
		duration: animationDuration,
		easing: "easeOutCubic",
	});

	isMovingRight = !isMovingRight;
}
