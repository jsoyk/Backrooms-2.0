
/////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//PRELOADER
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

let preloadComplete = false;

;(function(){
function id(v){return document.getElementById(v); }
function loadbar() {
        // var ovrl = id("preloadOverlay"),
        //prog = id("preloadProgress"),
        loadText = id("loadingText"),
        loadTextParent = id("loadTextParent"),
        dots = id("dots"),
        img = document.images,
        style = document.styleSheets,
        script = document.scripts,
        c = 0;
        tot = img.length;
        totAll = tot + style.length + script.length;

    function imgLoaded(){
        console.log(c);
        c += 1;
        var perc = ((100/totAll*c) << 0)-1 + "%"; //I added "-1" to it will only go up to 99% and not get hung up on 100%
        //prog.style.width = perc;
        //stat.innerHTML = "Loading: " + perc;
        //stat.style.top = "-30px";
        if(c===tot) return doneLoading();
    }

    function doneLoading(){
        //I put stuff to trigger down below, based on window load
        console.log("done loading");

        let loadedTimeout = setTimeout(function(){
            //document.getElementById("locationName").style.opacity = 1;
            //document.getElementById("titleImage").style.opacity = "1";   
            loadText.innerHTML = "ENTER";
            dots.style.display = "none";
            loadTextParent.style.textAlign = "center";
            loadTextParent.style.left = "50%";
            loadTextParent.style.transform = "translateX(-50%)";
            preloadComplete = true;
            document.getElementById("loadTextParent").addClassName = "addHover";
        }, 3500);

    }

    for(var i=0; i<tot; i++) {
        var tImg     = new Image();
        tImg.onload  = imgLoaded;
        tImg.onerror = imgLoaded;
        tImg.src     = img[i].src;
    }    
}

document.addEventListener('DOMContentLoaded', loadbar, false);

}());

/////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//ON PAGE LOAD
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function() {
    
window.onload = function() {



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


    document.getElementById("loadTextParent").onclick = function() {  
        if (preloadComplete == true) {
            console.log("begin experience");
            document.getElementById("introShot").currentTime = 1.5;
            document.getElementById("introShot").play();
            document.getElementsByClassName('blood')[0].style.opacity = "1";
            document.getElementById("loadTextParent").style.display = "none";

            let beginTimeout = setTimeout(function(){
                document.getElementById("titleImage").style.opacity = "1";
                document.getElementById("titleImageBG").style.opacity = "1";
                document.getElementsByClassName('loading-window')[0].style.display = "none";
                document.getElementById("introMusic").currentTime = 0;
                document.getElementById("introMusic").volume = .4;
                document.getElementById("introMusic").play();
            }, 750);

            startTimeout = setTimeout(function(){
                document.getElementById("titleImage").style.display = "none";
                document.getElementById("titleImageBG").style.display = "none";
                document.getElementById("mainWrapper").style.display = "block";
                setWaypoints();
                document.getElementById("introMusic").pause();
                storyStarted = true;
        }, 9800);

        }
    }

    document.getElementById("loadTextParent").onmouseover = function() {  
        if (preloadComplete == true) {
            this.style.cursor = "pointer";
            this.style.opacity = "0.7";
        }
    }

    document.getElementById("loadTextParent").onmouseout = function() {  
        if (preloadComplete == true) {
            this.style.opacity = "1";
        }
    }

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
    element: document.getElementById('theStage'),
    handler: function(direction) {
        if (direction == "down") {
            //document.getElementById('streetSound').currentTime = 0;
            //document.getElementById('streetSound').pause();
            $('#insideSound').animate({volume: 0}, 1500);
            document.getElementById('stageSound').currentTime = 0;
            document.getElementById('stageSound').volume = 0;
            document.getElementById('stageSound').play();
            $('#stageSound').animate({volume: 1}, 1500);
            console.log("kitchen sound triggered");
        }
        else if (direction == "up") {
            $('#insideSound').animate({volume: 1}, 1500);
            $('#stageSound').animate({volume: 0}, 1500);
        }
        },
    offset: '90%'
})

var waypoint = new Waypoint({
    element: document.getElementById('headChef'),
    handler: function(direction) {
        if (direction == "down") {
            // document.getElementById('choicesParent').style.opacity = "1";
            document.getElementById('jobTalk').style.opacity = "1";
        }
        else if (direction == "up") {
            document.getElementById('jobTalk').style.opacity = "0";
            // document.getElementById('choicesParent').style.opacity = "0";
        }
        },
    offset: '45%'
})

}//end setWaypoints

}

});