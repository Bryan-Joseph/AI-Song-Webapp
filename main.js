song1 = "";
song2 = "";

rwX = 0;
rwY = 0;
rwC = 0;

lwX = 0;
lwY = 0;
lwC = 0;

function preload() {
    song1 = loadSound("music/monster.mp3");
    song2 = loadSound("music/harryPotter.mp3");
}

function setup() {
    canv = createCanvas(500,400);
    cam = createCapture(VIDEO);
    cam.size(500,400);
    // cam.center();
    cam.hide();

    document.getElementById('canvHolder').append(canv.elt);

    poseNet = ml5.poseNet(cam,()=>{
        console.log('model is initialized');
    });

    poseNet.on('pose',results =>{
        console.log(results);
        if (results.length > 0) {
            rwX = results[0].pose.rightWrist.x;
            rwY = results[0].pose.rightWrist.y;
            rwC = results[0].pose.keypoints[10].score;

            lwX = results[0].pose.leftWrist.x;
            lwY = results[0].pose.leftWrist.y;
            lwC = results[0].pose.keypoints[9].score;
        }
    });
}

function draw() {
    image(cam,0,0,500,400);

    song1Status = song1.isPlaying();
    
    stroke('red');
    fill('red');
    if (lwC > 0.2) {
        circle(lwX,lwY,20);
        song2.stop();

        if (song1Status == false) {
            song1.play();
            document.getElementById("songNameL").innerHTML = "Song - Monster by Imagine Dragons";
        }
    }

    song2Status = song2.isPlaying();
    if (rwC > 0.2) {
        circle(rwX,rwY,20);
        song1.stop();

        if (song2Status == false) {
            song2.play();
            document.getElementById("songNameL").innerHTML = "Song - Harry Potter Theme Song";
        }
    }
}