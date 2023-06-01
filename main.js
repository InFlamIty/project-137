status = ""
valuez = ""
wavesArray = []
function setup()
{
    canvas = createCanvas(700 , 600)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    video.size(700 , 600)
}
function start()
{
    objectDetector = ml5.objectDetector("cocossd" , modelloaded)
    document.getElementById("status").innerHTML = "STATUS : Detecting Objects"
    valuez = document.getElementById("input").value
}
function modelloaded()
{
    console.log("it finally worked . . . . . . . wait, what NOOOOOOOOOOOOOOOOOOO!!!!!!!!!!")
    status = true
}
function draw()
{
    image(video , 0 , 0 , 700 , 600)
    if (status != "") {
        objectDetector.detect(video , gotResults)
        for (let i = 0; i < wavesArray.length; i++) {
            fill("cyan")
            percent = floor(wavesArray[i].confidence * 100)
            text(wavesArray[i].label + percent + "%" , wavesArray[i].x , wavesArray[i].y)
            noFill()
            stroke("cyan")
            rect(wavesArray[i].x , wavesArray[i].y , wavesArray[i].width , wavesArray[i].height)
            if (wavesArray[i].label == valuez) {
                video.stop()
                objectDetector.detect(gotResults)
                document.getElementById("status").innerHTML = valuez + " found!"
            }
            else
            {
                document.getElementById("status").innerHTML = valuez + " not found :_("
            }
        }
    }
}
function gotResults(error , results)
{
    if (error) {
        console.log(error)
    } else {
        console.log(results)
        wavesArray = results
    }
}