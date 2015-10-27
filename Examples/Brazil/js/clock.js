//var outputstring = "";

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

//var servertimeloaded = false;
//var serverdate = new Date();

canvas.width = WidthSize;
canvas.height = HeightSize;

ctx.fillRect(0, 0, WidthSize, HeightSize);

canvas.style.top = Math.floor(WidthSize / 2) + "px";
canvas.style.left = Math.floor(HeightSize / 2) + "px";

var pic = document.getElementById("g_imageObj");

//pic.src = "/images/flags/" + pics[0];

pic.style.width = WidthSize + "px";
pic.style.height = HeightSize + "px";

var canvasSize = HeightSize;

var clockSize = (canvasSize - (canvasSize / 70));

ctx.translate(WidthSize / 2, HeightSize / 2);

clockTic();

window.setInterval(function () {

    clockTic();

}, 1000);

// Main function to refresh clock animation every second
function clockTic() {

    if (NoAnalogClock)
        return;

    var now = new Date();

    ctx.save(); //Save initial State

    // Draw Background
    ctx.beginPath();
    ctx.clearRect((WidthSize / 2) * -1, (HeightSize / 2) * -1, WidthSize, HeightSize);

    //	ctx.rotate(-Math.PI / 2);
    //  ctx.strokeStyle = "#666666"; // All strokes use grey in this clock

    var sec = now.getSeconds();
    var min = now.getMinutes();
    var hr = now.getHours();

    //outputstring = hr + ":" + min + ":" + sec;

    hr = (hr >= 12) ? hr - 12 : hr;


    ctx.rotate(-Math.PI / 2);
    ctx.strokeStyle = "#d1d1d1"; // All strokes use grey in this clock

    // Hour hand
    SetShadows(1, 1, 2);
    ctx.save(); // Save and restore to keep rotation from screwing up
    ctx.rotate(hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) * sec);
    ctx.lineWidth = clockSize / 28;
    ctx.beginPath();

    ctx.moveTo(0, 0);

    ctx.lineTo(clockSize / 4, 0);
    ctx.lineCap = "square";
    ctx.stroke();
    ctx.restore();

    // Minute Hand
    SetShadows(1, 1, 2);
    ctx.strokeStyle = "#d1d1d1";
    ctx.save();
    ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
    ctx.lineWidth = clockSize / 38;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(((clockSize / 4.5) * 2), 0);
    ctx.stroke();
    ctx.restore();

    // Second Hand
    ctx.strokeStyle = "#580505";
    SetShadows(2, 2, 2);
    ctx.save();
    ctx.rotate(sec * Math.PI / 30);
    ctx.lineWidth = clockSize / 160;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(((clockSize / 4) * 2), 0);
    ctx.stroke();

    // Rear of second hand
    ctx.lineWidth = clockSize / 60;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-clockSize / 10, 0);
    ctx.lineCap = "square";
    ctx.stroke();
    ctx.restore();

    // Center pivot point
    ctx.fillStyle = "#d1d1d1";
    ctx.beginPath();
    ctx.arc(0, 0, clockSize / 100, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();
};

function SetShadows(x, y, blur) {
    ctx.shadowBlur = blur;
    ctx.shadowColor = "#3f3f3f";
    ctx.shadowOffsetX = x;
    ctx.shadowOffsetY = y;
};