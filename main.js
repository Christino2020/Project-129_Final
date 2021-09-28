song_1_status = ""
song_2_status = ""



function setup(){
    canvas = createCanvas(450, 450)
    canvas.center()

    video = createCapture(VIDEO)
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses)

}
harryPotter = "";
yesterday = "";

function preload(){
    song1 = loadSound("hp.mp3")
    song2 = loadSound("yesterday.mp3") 
     
}
scoreLeftWrist = 0;
scoreRightWrist = 0;
leftWristX = 0 
rightWristX = 0
leftWristY = 0
rightWristY = 0

function modelLoaded(){
    console.log('Posenet is ready')
}




function gotPoses(results){
    if (results.length > 0){
console.log(results)
scoreLeftWrist = results[0].pose.keypoints[9].score;
scoreRightWrist = results[0].pose.keypoints[10].score;
console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreRightWrist = " + scoreRightWrist)

rightWristX = results[0].pose.rightWrist.x
leftWristX = results[0].pose.leftWrist.x
rightWristY = results[0].pose.rightWrist.y
leftWristY = results[0].pose.leftWrist.y
console.log("leftWristY = "+ leftWristY+ "rightWristY = " + rightWristY + "rightWristX = " + rightWristX + "leftwristX = "+ leftWristX)

    }
}
function draw() {
	image(video, 0, 0, 450, 450);
	
	song_1_status = song1.isPlaying();
	song_2_status = song2.isPlaying();

	if (scoreRightWrist > 0.2 && scoreLeftWrist < 0.2) {
		fill (250, 5, 5);
		stroke (250, 5, 5);
		circle(rightWristX, rightWristY, 20);

		song2.stop();

		if(song_1_status == false){
			song1.play()
			document.getElementById("Results").innerHTML ="Playing - Harry Potter"
		}
	}

if(scoreLeftWrist > 0.2 && scoreRightWrist < 0.2)
	{
		fill (250, 5, 5);
			stroke (250, 5, 5);
		circle(leftWristX,leftWristY,20);

			song1.stop();

		if(song_2_status == false)
		{
			song2.play();
			document.getElementById("Results").innerHTML = "Playing - Yesterday";
		}
	}

}

