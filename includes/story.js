
/////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//PRELOADER
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

// ;(function(){
// function id(v){return document.getElementById(v); }
// function loadbar() {
//     var ovrl = id("preloadOverlay"),
//         //prog = id("preloadProgress"),
//         stat = id("preloadProgstat"),
//         img = document.images,
//         style = document.styleSheets,
//         script = document.scripts,
//         c = 0;
//         tot = img.length;
//         totAll = tot + style.length + script.length;

//     function imgLoaded(){
//     c += 1;
//     var perc = ((100/totAll*c) << 0)-1 + "%"; //I added "-1" to it will only go up to 99% and not get hung up on 100%
//     //prog.style.width = perc;
//     stat.innerHTML = "Loading: " + perc;
//     stat.style.top = "-30px";
//     if(c===tot) return doneLoading();
//     }

//     function doneLoading(){
//         //I put stuff to trigger down below, based on window load
//     }

//     for(var i=0; i<tot; i++) {
//     var tImg     = new Image();
//     tImg.onload  = imgLoaded;
//     tImg.onerror = imgLoaded;
//     tImg.src     = img[i].src;
//     }    
// }

// document.addEventListener('DOMContentLoaded', loadbar, false);

// }());

/////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//ON PAGE LOAD
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function() {
    
    window.onload = function() {
        document.getElementById("enterBtn").style.display = "block";
        document.getElementById("preloadProgstat").innerHTML = "Loading: 100%";
        $("#preloadProgstat").fadeOut(500);
    };

});

/////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//BEGIN
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

    let musicOn = false;
    let imInvisible = true;
    let locationTimeout;
    let startTimeout;
    let storyStarted = false;
    let answeredJob = false;

    document.getElementById("enterBtn").onclick = function() {  
        document.getElementById("enterBtn").style.display = "none";
        document.getElementById("loadScreen").style.display = "none";
        document.getElementById("introMusic").currentTime = 0;
        document.getElementById("introMusic").volume = .4;
        document.getElementById("introMusic").play();

        console.log("begin experience");

        locationTimeout = setTimeout(function(){
            document.getElementById("locationName").style.opacity = 1;
        }, 2000);

        startTimeout = setTimeout(function(){
            document.getElementById("titleImage").style.display = "none";
            document.getElementById("titleImageOverlay").style.display = "none";
            document.getElementById("locationName").style.display = "none";
            document.getElementById("mainWrapper").style.display = "block";
            setWaypoints();
            //document.getElementById("mainWrapper").style.height = "auto";
            //document.getElementById("mainWrapper").style.overflow = "auto";
            document.getElementById("introMusic").pause();
            storyStarted = true;
            //document.body.style.overflow = "visible";
        }, 4500);
    }
    
/////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//PLAY
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////


    document.getElementById("choiceYes").onclick = function() {  
        document.getElementById("apron").style.opacity = "1";
        document.getElementById("jobTalk__hidden").style.opacity = "1";
        document.getElementById("headChef__hidden").style.opacity = "1";
        document.getElementById('monologueText').innerHTML = "damn...";
        document.getElementById('jobTalk').innerHTML = "Now get to work!!";
        document.getElementById('choicesParent').style.display = "none";
        answeredJob = true;
    };

    document.getElementById("choiceNo").onclick = function() {  
        document.getElementById('jobTalk').innerHTML = "Then get the @%#$ out!!";
        document.getElementById('monologueText').innerHTML = "uhhh...";
        document.getElementById('choicesParent').style.display = "none";
        answeredJob = true;
        let gameOverSaidNo = setTimeout(function(){
            document.getElementById("loadScreen").style.display= "block";
            document.getElementById("enterBtn").style.display= "none";
            document.getElementById("mainWrapper").style.display= "none";
            document.getElementById("theEndParent").style.display= "block";
            document.getElementById("theEndText").innerHTML = "You gots lots of sleep, but made zero dollars.";
            document.getElementById('streetSound').pause();
e();
            document.getElementById('kitchenSound').pause();
            document.getElementById("introMusic").currentTime = 0;
            document.getElementById("introMusic").play();
        }, 2500);
    };

    document.getElementById("goShow").onclick = function() {  
        document.getElementById("mainVideo").style.left = "0%";
        document.getElementById("mainVideo").style.opacity = "1";
        document.getElementById("mainVideo").volume = "0";
        document.getElementById("mainVideo").play();
        $("#mainVideo").animate({volume: 1}, 1000);
        document.getElementById('kitchenSound').pause();
    }
        

    document.getElementById("dontGoShow").onclick = function() {  
        document.getElementById("loadScreen").style.display= "block";
        document.getElementById("enterBtn").style.display= "none";
        document.getElementById("mainWrapper").style.display= "none";
        document.getElementById("theEndParent").style.display= "block";
        document.getElementById("theEndText").innerHTML = "You didn't go and regretted it for the rest of your life.";
        document.getElementById('streetSound').pause();
        document.getElementById('insideSound').pause();
        document.getElementById('kitchenSound').pause();
        document.getElementById("introMusic").currentTime = 0;
        document.getElementById("introMusic").play();
    };

    document.addEventListener('scroll', function (event) {
        console.log("scrolling");
        document.getElementById("walkingPerson").style.opacity = "1";
        document.getElementById("standingPerson").style.opacity = "0";
    });

    var timer = null;
    document.addEventListener('scroll', function() {
    if(timer !== null) {
        clearTimeout(timer);  
        document.getElementById("walkingPerson").style.opacity = "1";
        document.getElementById("standingPerson").style.opacity = "0";      
    }
    timer = setTimeout(function() {
        document.getElementById("walkingPerson").style.opacity = "0";
        document.getElementById("standingPerson").style.opacity = "1";
    }, 150);
    }, false);









/////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//ON PAGE LOAD
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
    
function setWaypoints() {

    console.log("set waypoints");

var waypoint = new Waypoint({
    element: document.getElementById('wall_1'),
    handler: function(direction) {
        if (direction == "down") {
            document.getElementById('streetSound').currentTime = 0;
            document.getElementById('streetSound').volume = .3;
            document.getElementById('streetSound').play();
            console.log("street sound triggered");
        }
        else if (direction == "up") {

        }
    },
    offset: '195%'
})

var waypoint = new Waypoint({
    element: document.getElementById('wall_1'),
    handler: function(direction) {
        if (direction == "down") {
            //document.getElementById('streetSound').currentTime = 0;
            //document.getElementById('streetSound').pause();
            $('#streetSound').animate({volume: 0}, 1500);
            document.getElementById('insideSound').currentTime = 0;
            document.getElementById('insideSound').volume = 0;
            document.getElementById('insideSound').play();
            $('#insideSound').animate({volume: 1}, 1500);
            console.log("restaurant sound triggered");
            document.getElementById('innerMonologue').style.opacity = "1";
        }
        else if (direction == "up") {
            $('#insideSound').animate({volume: 0}, 1500);
            $('#streetSound').animate({volume: .3}, 1500);
            document.getElementById('innerMonologue').style.opacity = "0";
        }
    },
    offset: '50%'
})

var waypoint = new Waypoint({
    element: document.getElementById('theKitchen'),
    handler: function(direction) {
        if (direction == "down") {
            //document.getElementById('streetSound').currentTime = 0;
            //document.getElementById('streetSound').pause();
            $('#insideSound').animate({volume: 0}, 1500);
            document.getElementById('kitchenSound').currentTime = 0;
            document.getElementById('kitchenSound').volume = 0;
            document.getElementById('kitchenSound').play();
            $('#kitchenSound').animate({volume: .1}, 1500);
            console.log("kitchen sound triggered");
        }
        else if (direction == "up") {
            $('#insideSound').animate({volume: 1}, 1500);
            $('#kitchenSound').animate({volume: 0}, 1500);
        }
        },
    offset: '90%'
})

var waypoint = new Waypoint({
    element: document.getElementById('headChef'),
    handler: function(direction) {
        if (direction == "down") {
            document.getElementById('choicesParent').style.opacity = "1";
            document.getElementById('jobTalk').style.opacity = "1";
        }
        else if (direction == "up") {
            document.getElementById('jobTalk').style.opacity = "0";
            document.getElementById('choicesParent').style.opacity = "0";
        }
        },
    offset: '45%'
})

var waypoint = new Waypoint({
    element: document.getElementById('chef'),
    handler: function(direction) {
        if (direction == "down") {

            document.getElementById('chefTalk').style.opacity = "1";

            if (answeredJob == true) {
                document.getElementById('chefText').innerHTML = "Wanna go to a show?";
                document.getElementById('monologueText').innerHTML = "hmmm...";
                document.getElementById('choicesParent2').style.opacity = "1";
                document.getElementById('ramones').style.display = "block";
            } else if (answeredJob == false) {
                document.getElementById('chefText').innerHTML = "Who the @%#$ are you?? GET HIM!!"; 
                document.getElementById('ramones').style.display = "none";
                let gameOverNoJOb = setTimeout(function(){
                    document.getElementById("loadScreen").style.display= "block";
                    document.getElementById("enterBtn").style.display= "none";
                    document.getElementById("mainWrapper").style.display= "none";
                    document.getElementById("theEndParent").style.display= "block";
                    document.getElementById("theEndText").innerHTML = "You got arrested for trespassing. Loser.";
                    document.getElementById('streetSound').pause();
                    document.getElementById('insideSound').pause();
                    document.getElementById('kitchenSound').pause();
                    document.getElementById("introMusic").currentTime = 0;
                    document.getElementById("introMusic").play();
                }, 2250);
            }
        }
        else if (direction == "up") {
            
        }
        },
    offset: '60%'
})

}//end setWaypoints