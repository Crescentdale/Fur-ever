//This is inspired by my own story of adopting dogs. Based on the choices user makes the dog can be happy or it can lose it's life. 
//This is to show how users that caring for animals especially dogs is very crucial and if they do not treat the dog well, the dog will suffer. 
//This project aims to reflect on animal cruelty and how it is inhumane. And also how much happiness dogs can bring into our lives. 
//This sketch is the final version of the story.

//Dog
let dog

//Scenes
let scenes = []
let currentScene = 13

let MetCookie = true
let Adopted
let LeftBehind
let Abandon
let MorningWalk
let EveningWalk
let Exit
let GameComplete
let MealTime
let Sleeping
let GardenPlay
let Returned
let BedTime
let Death
let DogMirrored = false
let CryPlayed = false
let DiedPlayed = false
let CricketPlayed = false
let ChimePlayed = false
let SquirrelSoundPlayed = false
let SleepPlayed = false
let LullabyPlayed = false
let IntroPlayed = false
let PositivePlayed = false
let EatingPlayed = false
let DangerPlayed = false
let TreatSoundPlayed = false
let EveningWalkCompleted = false
let SleepingCompleted = false
let Rescued = false
let foodAni;
let Training
let TrainingCompleted = false
let Treat
let PantingSoundPlayed = false
let Panting = false

function preload() {
	//Sounds 	
	soundFormats('mp3')
	Cry = loadSound('Dog-whimpering-sound.mp3');
	Died = loadSound('Sad-music.mp3');
	Sleep = loadSound('Dog-sleeping-sound-updated.mp3');
	Lullaby = loadSound('Lullaby-Music-Box.mp3');
	PantingSound = loadSound('Dog-Panting.mp3');
	Cricket = loadSound('Night-cricket-sound-effect.mp3');
	SquirrelSound = loadSound('Squirrel-Sound.mp3');
	Chime = loadSound('Soothing-chime-effect.mp3');
	Intro = loadSound('Game-Intro.mp3');
	Positive = loadSound('Positive-Adopted.mp3');
	Danger = loadSound('Code-Red.mp3');
	Eating = loadSound('Dog-Eating.mp3');
	TreatSound = loadSound('Treat.mp3');

	//Font 
	font = loadFont("PuppyBellies.ttf")

	//Images
	ZZZ = loadImage("ZZZ-White.gif")
	Squirrel = loadImage("Squirrel.gif")
	Owl = loadImage("Owl.gif")

	//Living room setting
	scenes[1] = {
		background: loadImage("Living-Room-Sofa.jpg")
	}

	//Outdoor garden to play
	scenes[2] = {
		background: loadImage("Garden-play.jpg")
	}

	//Outside the house as an intro scene
	scenes[0] = {
		background: loadImage("Outside-the-house.jpg")
	}

	//Morning walk in the park
	scenes[3] = {
		background: loadImage("Park-day.jpg")
	}

	//Evening walk in the park
	scenes[4] = {
		background: loadImage("Park-Night.jpg")
	}

	//Street at night
	scenes[5] = {
		background: loadImage("Street-Night-1.jpg"),
	}

	//Player teaching dog tricks in the backyard
	scenes[6] = {
		background: loadImage("Backyard-play.jpg"),
	}

	//Player chose to abandon the dog
	scenes[7] = {
		background: loadImage("Street-Night-Garbage-Normal.jpg"),
	}

	//Player chose to exit the game
	scenes[8] = {
		background: loadImage("Exit-Game-Over.jpg"),
	}

	//Dog's bedroom
	scenes[9] = {
		background: loadImage("Bed-Room.jpg"),
	}

	//Game completed
	scenes[10] = {
		background: loadImage("Win-Game-Complete.png"),
	}

	//Front Porch
	scenes[11] = {
		background: loadImage("Front-Porch.jpg"),
	}

	//Kitchen
	scenes[12] = {
		background: loadImage("Kitchen-3.png"),
	}

	//Intro Screen for Fur-ever
	scenes[13] = {
		background: loadImage("Fur-ever-title.png"),
	}


	//Sprite for the dog 
	dog = new Sprite()

	//Animations for dog  
	//Idle position dog sprite sheet
	dog.addAni('idle1', 'Idle_dog.png', {
		frameSize: [1280 / 4, 180],
		frames: 3 //using only 3 frames as 4th one has a closing eye animation
	})

	//Running dog sprite sheet
	dog.addAni('run1', 'Run_dog.png', {
		frameSize: [1800 / 6, 200],
		frames: 6
	})

	//Gallop dog sprite sheet
	dog.addAni('gallop1', 'Gallop.png', {
		frameSize: [2700 / 8, 600],
		frames: 8
	})

	//Fainting dog sprite sheet
	dog.addAni('faint1', 'Faint_dog.png', {
		frameSize: [1800 / 6, 230],
		frames: 6
	})

	//Flying dog sprite sheet
	dog.addAni('fly1', 'Fly_dog.png', {
		frameSize: [1800 / 3, 300],
		frames: 3
	})

	//Dizzy dog sprite sheet 
	dog.addAni('dizzy1', 'Dizzy_dog.png', {
		frameSize: [1000 / 3, 250],
		frames: 3
	})

	//Happy dog sprite sheet 
	dog.addAni('happy1', 'Tail-wag-updated.png', {
		frameSize: [1280 / 4, 180],
		frames: 4
	})

	//Sleeping dog sprite sheet 
	dog.addAni('sleeping1', 'Sleeping.png', {
		frameSize: [300, 230],
		frames: 1
	})

	//Laying down dog sprite sheet 
	dog.addAni('down1', 'Down.png', {
		frameSize: [300, 230],
		frames: 1
	})

	//Sad dog sprite sheet 
	dog.addAni('sad1', 'Sad-Dog.png', {
		frameSize: [300, 230],
		frames: 1
	})

	//Dead dog sprite sheet 
	dog.addAni('dead1', 'Dead_Dog.png', {
		frameSize: [300, 230],
		frames: 1
	})
}

function setup() {

	//Food bowl animation
	foodAni = loadAnimation(
		'Food-Bowl-1.png',
		'Food-Bowl-2.png',
		'Food-Bowl-3.png',
		'Food-Bowl-4.png'
	);
	foodAni.frameDelay = 150;

	textFont(font)
	//Fixed size for the canvas
	new Canvas(1920, 1080, 'fullscreen');

	//Starting position of the dog sprite 
	dog.changeAni('idle1')
	dog.x = 400
	dog.y = 750
	dog.scale = 0.8

	//Floor
	floor = new Sprite(0, 900, 4000, 5)
	floor.collider = 'static'
	floor.visible = false

	//PetFinder and Fur-get Me Not Animal Rescue, Inc.
	PetFinder = new Sprite(275, 915)
	PetFinder.collider = 'static'
	PetFinder.scale = 0.7
	PetFinder.img = 'Petfinder-logo.png'
	// PetFinder.debug = true
	PetFinder.width = 435
	PetFinder.height = 110
	PetFinder.visible = false
	dog.overlaps(PetFinder)


	FurgetMeNot = new Sprite(1700, 910)
	FurgetMeNot.collider = 'static'
	FurgetMeNot.img = 'logo-furget-me-not-final-2_1.jpeg'
	// FurgetMeNot.debug = false
	FurgetMeNot.width = 250
	FurgetMeNot.height = 210
	FurgetMeNot.visible = false
	dog.overlaps(FurgetMeNot)
}

function draw() {
	//Background
	background(scenes[currentScene].background);

	KBControls()
	LivingRoom()
	OutsideTheHouse()
	Garden()
	ParkDay()
	ParkEvening()
	StreetNight()
	DogDied()
	BedRoom()
	Situations()
	Kitchen()
	FrontPorch()
	Backyard()
	GameWon()
	TitleScene()

	//Constraining dog to stay within scenes
	dog.x = constrain(dog.x, 100, width - 100);
}

function KBControls() {
	//To move right and left
	if (kb.pressing('left')) {
		dog.changeAni('run1')
		dog.velocity.x = -10
		dog.mirror.x = true
		DogMirrored = true
		Panting = true
	} else if (kb.pressing('right')) {
		dog.changeAni('run1')
		dog.velocity.x = 10
		dog.mirror.x = false
		DogMirrored = false
		Panting = true
	}

	//To gallop
	else if (kb.pressing('up')) {
		dog.changeAni('gallop1')
		dog.velocity.y = -25
		dog.velocity.x = +10
		Panting = true
		if (dog.velocity.y = -25) {
			dog.velocity.y = 0
		}
		if (DogMirrored) {
			dog.velocity.x = -10
		}
	}

	//Idle position
	else if (kb.released('right') || kb.released('left') || kb.released('up') || kb.released('down') || kb.released('h')) {
		dog.changeAni('idle1')
		dog.velocity.y = 0
		dog.velocity.x = 0
		Panting = false
		Treat = false
	}
}

function OutsideTheHouse() {
	//Intro
	if (currentScene === 0) {
		//Instructions
		floor.y = 880
		dog.y = 820
		strokeWeight(1)
		stroke("black")
		fill("teal")
		rect(width / 2 - 10, 40, 755, 60)
		textSize(40)
		noStroke()
		fill("white")
		text("Press arrow keys or WASD to move and gallop", width / 2, 80)

		//If player chooses to adopt
		if (MetCookie === true && kb.pressed('C')) {
			MetCookie = false
			Adopted = true
		}

		//If player chooses to exit
		if (kb.pressing("N")) {
			MetCookie = false
			Abandon = false
			Exit = true
		}
	}
}

function Commands() {
	//To lay down
	if (kb.pressing('down')) {
		dog.changeAni('down1')
		fill("white")
		rect(dog.x - 300, dog.y - 200, 150, 60)
		fill("black")
		textSize(40)
		text("Down!", dog.x - 275, dog.y - 160, 200)
	}

	//To sleep/rest
	else if (kb.pressing('z')) {
		dog.changeAni('sleeping1')
		fill("white")
		rect(dog.x - 300, dog.y - 200, 150, 60)
		fill("black")
		textSize(40)
		text("Sleep!", dog.x - 275, dog.y - 160, 200)
	}

	//Tail wag 
	else if (kb.pressing('h')) {
		dog.changeAni('happy1')
		Treat = true
	}
}

function LivingRoom() {
	if (currentScene === 1) {
		dog.scale = 1.2
		dog.y = 880
		floor.y = 1000

		//Morning walk in the park
		if (kb.pressing("Y")) {
			MetCookie = false
			Abandon = false
			Exit = false
			Adopted = false
			MorningWalk = true
		}
	}
}

function Garden() {
	if (currentScene === 2) {
		floor.y = 800
		dog.y = 750
		dog.ani.y = 750
		dog.scale = 0.8

		//If player lets the dog rest after attempting to play post mealtime
		if (GardenPlay === true && kb.pressing("R")) {
			MetCookie = false
			Abandon = false
			Exit = false
			Adopted = false
			LeftBehind = false
			MealTime = false
			GardenPlay = false
			Sleeping = true
		}
	}
}

function ParkDay() {
	if (currentScene === 3) {

		//If player leaves the dog behind in the park during morning walk
		if (kb.pressing("N")) {
			MetCookie = false
			Abandon = false
			Exit = false
			Adopted = false
			MorningWalk = false
			LeftBehind = true
		}

		//If player takes the dog home to feed it 
		if (MorningWalk === true && kb.pressing("M")) {
			MetCookie = false
			Abandon = false
			Exit = false
			Adopted = false
			LeftBehind = false
			MealTime = true
		}
	}
}

function ParkEvening() {
	if (currentScene === 4) {

		//If player takes the dog home after evening walk
		if (EveningWalk === true && kb.pressing("Y")) {
			MetCookie = false
			Abandon = false
			Exit = false
			Adopted = false
			LeftBehind = false
			MealTime = false
			GardenPlay = false
			EveningWalk = false
			BedTime = true
		}

		//If player leaves the dog behind in the park during evening walk
		if (kb.pressing("V")) {
			MetCookie = false
			Abandon = false
			Exit = false
			Adopted = false
			LeftBehind = true
			MealTime = false
			GardenPlay = false
			EveningWalk = false
		}
	}
}

function StreetNight() {
	if (currentScene === 5) {

		//If player ignores the dog after leaving it behind in the park 
		if (kb.pressing("Q")) {
			MetCookie = false
			Adopted = false
			LeftBehind = false
			Abandon = false
			MorningWalk = false
			EveningWalk = false
			Exit = false
			GameComplete = false
			MealTime = false
			Sleeping = false
			GardenPlay = false
			Returned = false
			BedTime = false
			Abandon = true
		}

		//If player chooses to rescue the dog after leaving it behind in the park
		if (LeftBehind === true && kb.pressing("R")) {
			MetCookie = false
			Exit = false
			Adopted = false
			LeftBehind = false
			MealTime = false
			GardenPlay = false
			EveningWalk = false
			BedTime = false
			GameComplete = false
			Abandon = false
			Returned = true
		}
	}
}

function DogDied() {
	//Last screen after the death of the dog
	if (currentScene === 7) {

		if (Abandon === true && kb.pressing("E")) {
			MetCookie = false
			Abandon = false
			Adopted = false
			LeftBehind = false
			MealTime = false
			GardenPlay = false
			EveningWalk = false
			BedTime = false
			GameComplete = false
			Exit = true
		}
	}
}

function BedRoom() {
	if (currentScene === 9) {
		if (Sleeping === true && kb.pressing("T")) {
			MetCookie = false
			Abandon = false
			Exit = false
			Adopted = false
			LeftBehind = false
			MealTime = false
			GardenPlay = false
			BedTime = false
			Sleeping = false
			Training = true
		}

		//If player successfully completes the game
		if (BedTime === true && kb.pressing("O")) {
			MetCookie = false
			Abandon = false
			Exit = false
			Adopted = false
			LeftBehind = false
			MealTime = false
			GardenPlay = false
			EveningWalk = false
			BedTime = false
			GameComplete = true
		}
		if (currentScene === 9 && !Sleep.isPlaying() && !SleepPlayed && !Lullaby.isPlaying() && !LullabyPlayed) {
			Sleep.play()
			SleepPlayed = true
			Lullaby.play()
			LullabyPlayed = true
		}
	} else {
		Sleep.stop()
		Lullaby.stop()
	}
}

function GameWon() {
	if (currentScene === 10) {
		GameComplete = true
		MetCookie = false
		dog.visible = false
		PetFinder.visible = true
		FurgetMeNot.visible = true
	}
}

function TitleScene() {
	if (currentScene === 13) {
		MetCookie = false
		dog.visible = false

		if (mouseIsPressed) {
			currentScene = 0
			MetCookie = true
			dog.visible = true
		}
	}
}

function Situations() {
	//Intro text
	if (MetCookie) {
		rect(300, 570, 1200, 200)
		fill(0)
		textSize(40)
		text("Hi hooman, I am Cookie, an adorable little pup who needs a home!       If you choose to adopt me, I promise to love you forever! Woof Woof!! (Press C to adopt me OR N to ignore me)", 335, 630, 1150)
		if (currentScene === 0 && !Intro.isPlaying() && !IntroPlayed) {
			Intro.play()
			IntroPlayed = true
		}
	} else {
		Intro.stop()
	}

	//Exit text
	if (Exit) {
		currentScene = 8
		dog.visible = false
		floor.visible = false
		fill(0)
		textSize(40)
		text("Press Ctrl/Cmd + Enter OR Refresh the sketch to play again", 500, 100)
	}

	//Screen to be displayed if the player leaves the dog
	if (LeftBehind) {
		currentScene = 5
		dog.changeAni('sad1')
		dog.x = width / 2
		dog.y = 830
		fill('white')
		rect(250, 300, 1500, 200)
		fill("black")
		textSize(40)
		text("Hooman! Where are you? I am scared and hungry! Could you please come and get me?       I am sorry if I was a bad dog, I promise to listen to you, please hooman, I miss you       (Press R to take Cookie back to home OR Q to ignore)", 320, 355, 1430)
		if (currentScene === 5 && !Cry.isPlaying() && !CryPlayed) {
			Cry.play()
			CryPlayed = true
		}
	} else {
		Cry.stop()
	}

	//When the dog is adopted
	if (Adopted) {
		currentScene = 1
		fill("white")
		rect(250, 300, 1400, 200)
		fill("black")
		textSize(40)
		text("Thank you for adopting me, you are my best friend and I love you unconditionally!        Could you please take me on a walk? Woof Woof!!                                                                        (Press Y to take Cookie on a walk)", 300, 360, 1350)
		if (currentScene === 1 && !Positive.isPlaying() && !PositivePlayed && !Rescued) {
			Positive.play()
			PositivePlayed = true
		}
	} else {
		Positive.stop()
	}

	//Morning walk text
	if (MorningWalk) {
		currentScene = 3
		dog.scale = 1
		image(Squirrel, 1700, 700)

		if (dog.x > 0 && dog.x < width / 1.2) {
			fill("white")
			rect(375, 300, 1200, 130)
			fill("black")
			textSize(40)
			text("I love walks! I can make hooman friends and sniff flowers! Woof Woof!!       (Walk towards the squirrel to continue)", 410, 350, 1200)
		} else if (dog.x > width / 1.2) {
			fill("white")
			rect(250, 300, 1400, 130)
			fill("black")
			textSize(40)
			text("The walk was great! I saw three squirrels! I am hungry, time for my meal! Woof Woof!!         (Press M to take Cookie home and feed OR N to leave Cookie in the park)", 280, 350, 1400)
		}
		if (currentScene === 3 && !SquirrelSound.isPlaying() && !SquirrelSoundPlayed) {
			SquirrelSound.play()
			SquirrelSoundPlayed = true
		}
	} else {
		SquirrelSound.stop()
	}

	//Mealtime text
	if (MealTime) {
		MorningWalk = false
		currentScene = 12
		dog.changeAni('happy1')
		dog.scale = 1.2
		dog.x = width / 2.2
		dog.mirror.x = false
		animation(foodAni, dog.x + 200, dog.y + 60);
		foodAni.scale = 0.7
		foodAni.noLoop()
		fill("white")
		rect(250, 300, 1400, 130)
		fill("black")
		textSize(40)
		text("I love Chimkin! Woof Woof!!                                                                        (Press R to let Cookie rest after the meal OR Press P let Cookie play)", 280, 350, 1350)
		if (currentScene === 12 && !Eating.isPlaying() && !EatingPlayed) {
			Eating.play()
			EatingPlayed = true
		}
	} else {
		Eating.stop()
	}

	//Text to display once the dog is rescued
	if (Returned) {
		MorningWalk = false
		MealTime = false
		Adopted = false
		currentScene = 11
		dog.x = constrain(dog.x, 200, width - 200)
		dog.y = 900
		dog.changeAni('idle1')
		dog.velocity.x = 0
		dog.velocity.y = 0
		KBControls()
		fill("white")
		rect(250, 300, 1400, 130)
		fill("black")
		textSize(40)
		text("Thank you for bringing me back!!!                                                                        (Press K to let Cookie rest)", 280, 350, 1350)
	}

	//Screen to display If player lets the dog play post mealtime
	if (GardenPlay) {
		currentScene = 2
		dog.changeAni('idle1')
		dog.velocity.x = 0
		dog.velocity.y = 0
		KBControls()
		if (dog.x > width / 5 && dog.x < width / 1.5) {
			fill("red")
			rect(250, 300, 1400, 130)
			fill("white")
			textSize(40)
			text("You should never let a dog play right after a meal, their stomach can flip (commonly as bloat or GDV) and it can be fatal (Press R to let Cookie rest after the meal)", 280, 350, 1350)
			if (currentScene === 2 && !Danger.isPlaying() && !DangerPlayed) {
				Danger.play()
				DangerPlayed = true
			}
		} else if (dog.x > width / 1.5 || dog.x < 200) {
			currentScene = 8
			dog.visible = false
			floor.visible = false
			fill(0)
			textSize(40)
			text("Cookie's stomach flipped . Unfortunately, Cookie did not survive. Press Ctrl/Cmd + Enter OR Refresh the sketch to play again", 10, 100, 1500)
			Danger.stop()
		} else {
			Danger.stop()
		}
	}
	//Screen to display when the dog is sleeping
	if (Sleeping) {
		Danger.stop()
		currentScene = 9
		dog.scale = 1
		dog.changeAni('sleeping1')
		dog.x = 970
		dog.y = 575
		image(ZZZ, 815, 445)
		ZZZ.resize(200, 0)
		fill("white")
		rect(260, 140, 1400, 300)
		fill("black")
		textSize(40)
		text("Did you know that puppies need around 18 hours of sleep and adult dogs need around 12 hours of sleep every 24 hours?                                                                                                                                                                                               Cookie had an amazing nap! Now it's time for training!                                                                     (Press T to train Cookie)", 280, 200, 1350)
		SleepingCompleted = true
	}


	//Training  

	if (Training) {
		currentScene = 6
		floor.y = 800
		dog.y = 750
		dog.changeAni('idle1')
		dog.velocity.x = 0
		dog.velocity.y = 0
		KBControls()
		Commands()
		dog.scale = 0.8
		fill("white")
		rect(250, 220, 1400, 250)
		fill("black")
		textSize(40)
		text("Training is a crucial part of a pups development . Let's train Cookie!                                                                                                                                 Hold Down or S for Down Command  |  Hold Z for Sleep Command                                      Hold H to give Cookie a treat  |  (Press I to take Cookie on evening walk)", 280, 280, 1350)
		TrainingCompleted = true
	}

	if (Treat) {
		fill("white")
		rect(dog.x - 300, dog.y - 200, 250, 60)
		fill("black")
		textSize(40)
		text("Good boy!!!", dog.x - 275, dog.y - 160, 300)
		TrainingCompleted = true
		if (currentScene === 6 && !TreatSound.isPlaying() && !TreatSoundPlayed) {
			TreatSound.play()
			TreatSoundPlayed = true
		}
	} else {
		TreatSound.stop()
	}


	//Could not get this to work
	if (Panting) {
		if (!PantingSound.isPlaying()) {
			PantingSound.play()
		}
	} else {
		PantingSound.stop()
	}

	//Evening walk text
	if (EveningWalk) {
		currentScene = 4
		dog.changeAni('idle1')
		dog.velocity.x = 0
		dog.velocity.y = 0
		floor.y = 1000
		dog.y = 950
		EveningWalkCompleted = true
		image(Owl, 1800, 700)
		KBControls()
		if (dog.x < width / 1.15) {
			fill("white")
			rect(375, 300, 1250, 130)
			fill("black")
			textSize(40)
			text("I love stars but I love you more! I will always stay by your side! Woof Woof!!              (Walk towards the owl to continue)", 410, 350, 1350)
		} else if (dog.x > width / 1.15 && dog.x > width / 1.15) {
			fill("white")
			rect(300, 300, 1250, 130)
			fill("black")
			textSize(40)
			text("(big yawn) ahhhh-hhaaaaaa.... I am tired...                                                                        (Press Y to take Cookie home and OR V to leave Cookie in the park)", 375, 350, 1350)
		}

		if (currentScene === 4 && !Cricket.isPlaying() && !CricketPlayed) {
			Cricket.play()
			CricketPlayed = true
		}
	} else {
		Cricket.stop()
	}

	//Bedtime text
	if (BedTime) {
		currentScene = 9
		dog.scale = 1
		dog.changeAni('sleeping1')
		dog.x = 970
		dog.y = 575
		dog.mirror.x = true
		image(ZZZ, 660, 510)
		fill("white")
		rect(250, 300, 1400, 130)
		fill("black")
		textSize(40)
		text("Cookie had an amazing day!                                                                      (Press O to continue)", 280, 350, 1350)
	}


	//Text to display if the game is successfully completed
	if (GameComplete) {

		currentScene = 10
		dog.visible = false
		floor.visible = false

		// 		stroke(2)
		fill("white")
		rect(450, 795, 1100, 200)
		fill("skyblue")
		noStroke()
		rect(0, 1025, 1920, 50)
		fill(0)
		textSize(30)
		text("Press Ctrl/Cmd + Enter OR Refresh the sketch to play again", 630, 1060)
		push()
		textSize(40)
		textAlign(CENTER);
		text("Great job on saving Cookie! Now, let's help another furry friend in need by rescuing them in real life. Are you up for it? :)                       Click on PetFinder to adopt a pet                                                Click on Fur-get Me Not Animal Rescue, Inc. to foster/volunteer", 450, 835, 1100)
		pop()


		if (PetFinder.mouse.pressed()) {
			window.open("https://www.petfinder.com/")
		}
		if (FurgetMeNot.mouse.pressed()) {
			window.open("http://www.furgetmenotrescue.org/")
		}

		if (currentScene === 10 && !Chime.isPlaying() && !ChimePlayed) {
			Chime.play()
			ChimePlayed = true
		}
	} else {
		Chime.stop()
	}

	//Screen to display when the dog is abandoned and died
	if (Abandon) {
		currentScene = 7
		dog.changeAni('dead1')
		dog.x = 970
		dog.y = 850
		dog.mirror.x = false
		fill('white')
		rect(250, 230, 1500, 440)
		fill("black")
		textSize(40)
		text("When you left Cookie behind, he felt completely devastated. Being a domesticated dog, he had never learned how to hunt, find food, or protect himself. Cookie waited for you for several days, hoping that you would return and take him home. However, as time passed, his hope turned into despair. During a cold night, with no food, shelter or warmth, Cookie passed away alone. His once lively bark and wagging tail were gone, leaving behind a lifeless body that was a stark reminder of a loyal dog's fate when abandoned.                                                                                                  (Press E to continue)", 310, 290, 1430)
		if (currentScene === 7 && !Died.isPlaying() && !DiedPlayed) {
			Died.play()
			DiedPlayed = true
		}
	} else {
		Died.stop()
	}
}

function Kitchen() {

	if (currentScene === 12) {
		//If player chooses to play with the dog post mealtime
		if (MealTime === true && kb.pressing("P")) {
			MetCookie = false
			Abandon = false
			Exit = false
			Adopted = false
			LeftBehind = false
			MealTime = false
			GardenPlay = true
		}

		//If player lets the dog rest after mealtime
		if (MealTime === true && kb.pressing("R")) {
			MetCookie = false
			Abandon = false
			Exit = false
			Adopted = false
			LeftBehind = false
			MealTime = false
			GardenPlay = false
			Sleeping = true
		}
	}
}

function FrontPorch() {

	if (currentScene === 11) {
		//If player lets the dog rest after rescusing it
		if (Returned === true && kb.pressing("K") && SleepingCompleted) {
			Rescued = true
			MetCookie = false
			Abandon = false
			Adopted = false
			LeftBehind = false
			MealTime = false
			GardenPlay = false
			EveningWalk = false
			BedTime = true
			GameComplete = false
			Exit = false
			Sleeping = false
			Returned = false
		}

		if (Returned === true && kb.pressing("K") && !SleepingCompleted) {
			MetCookie = false
			Abandon = false
			Adopted = false
			LeftBehind = false
			MealTime = false
			GardenPlay = false
			EveningWalk = false
			BedTime = false
			GameComplete = false
			Exit = false
			Sleeping = true
		}
	}
}

function Backyard() {
	if (currentScene === 6) {
		//If player takes the dog on evening walk
		if (TrainingCompleted && kb.pressing("I")) {
			Training = false
			EveningWalk = true
			MetCookie = false
			Abandon = false
			Exit = false
			Adopted = false
			LeftBehind = false
			MealTime = false
			GardenPlay = false
			Sleeping = false
			Abandon = false
			Returned = false
		}
		if (kb.pressing("H")) {
			Treat = true
		} else(Treat = false)
	}
}