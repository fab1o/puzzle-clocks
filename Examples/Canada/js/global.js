var donePuzzle = false;

var digitalColor = "#000000";

var WidthSize = window.innerWidth;
var HeightSize = window.innerHeight;

var Hours12 = false;

var NoAnalogClock = true;
var counterClock = 0;

var ClockTypes = ["Analog", "Digital", "None"];

var counterPics = 0;
var pics = [
    "1.jpg"
    , "2.jpg"
    , "3.jpg"
    , "4.jpg"
];

var g_layer;

var g_backg_layer;

var g_stage;

var g_imagepath;
//var g_ownimage;
//var g_own_orientation;
var g_imageObj;
var g_windowswidth;
var g_windowsheight;
var g_canvaswidth;
var g_canvasheight;
//var g_portrait = "";
var g_zeilen = 4;
var g_spalten = 6;
var g_genauigkeit = 15;
var g_gesetzt = 0;
var g_buildpuzzle = false;
var g_ready = false;
var g_rotate = false;
var g_elastic = false;
var g_shape = true;
var g_backg_grid = true;
var g_backg_image = true;
var g_sound = true;
var g_zindex;
var g_pieceAbsoluteRotation;
var g_piece2AbsoluteRotation;
var g_firstonload = true;
var g_currentpiece;
var g_tap = false;
var g_img_nostroke;

var g_startX;
var g_startY;
var g_breite;
var g_hoehe;
var g_hvswitch = 1;

function ChangeHours24() {
    Hours24(true);
};

function Hours24(change) {

    if (change) {
        if (Hours12 == true) 
            Hours12 = false;
        else
            Hours12 = true;
    }

    if (Hours12 == true) {
        document.getElementById("appBar").winControl.getCommandById("cmd24Hours").label = "24 Hours";
        document.getElementById("appBar").winControl.getCommandById("cmd24Hours").tooltip = "24 Hours";
        document.getElementById("appBar").winControl.getCommandById("cmd24Hours").icon = "priority";

        localStorage["Hours12"] = 1;

    } else {
        document.getElementById("appBar").winControl.getCommandById("cmd24Hours").label = "12 Hours";
        document.getElementById("appBar").winControl.getCommandById("cmd24Hours").tooltip = "12 Hours";
        document.getElementById("appBar").winControl.getCommandById("cmd24Hours").icon = "important";

        localStorage["Hours12"] = 0;
    }

};

function ClockTurn() {
    NoClock(true);
};

function NoClock(turn) {

    if (turn) {
        if (++counterClock >= ClockTypes.length)
            counterClock = 0;
    }

    switch (ClockTypes[counterClock]) {
        case "Analog":
            document.getElementById("appBar").winControl.getCommandById("cmdNoClock").label = "Digital";
            document.getElementById("appBar").winControl.getCommandById("cmdNoClock").tooltip = "Digital";
            document.getElementById("appBar").winControl.getCommandById("cmdNoClock").icon = "switchapps";

            ctx.clearRect((WidthSize / 2) * -1, (HeightSize / 2) * -1, WidthSize, HeightSize);
            animFrame.stop();

            document.getElementById("canvas").style.display = "block";
            document.getElementById("canvas2").style.display = "none";

            //ctx.translate(+200, +200);

            NoAnalogClock = false;
            break;

        case "Digital":

            NoAnalogClock = true;
            document.getElementById("canvas").style.display = "none";
            document.getElementById("canvas2").style.display = "block";

            //ctx.clearRect((WidthSize / 2) * -1, (HeightSize / 2) * -1, WidthSize, HeightSize);

            //ctx.translate(-200, -200);
            animFrame.start();

            document.getElementById("appBar").winControl.getCommandById("cmdNoClock").label = "Hide";
            document.getElementById("appBar").winControl.getCommandById("cmdNoClock").tooltip = "Hide";
            document.getElementById("appBar").winControl.getCommandById("cmdNoClock").icon = "cancel";

            break;

        case "Digital":
        case "None":

            NoAnalogClock = true;

            animFrame.stop();
            document.getElementById("canvas").style.display = "none";
            document.getElementById("canvas2").style.display = "none";

            //ctx.translate(+200, +200);

            ctx.clearRect((WidthSize / 2) * -1, (HeightSize / 2) * -1, WidthSize, HeightSize);

            document.getElementById("appBar").winControl.getCommandById("cmdNoClock").label = "Analog";
            document.getElementById("appBar").winControl.getCommandById("cmdNoClock").tooltip = "Analog";
            document.getElementById("appBar").winControl.getCommandById("cmdNoClock").icon = "clock";

            break;

    }

    localStorage["counterClock"] = counterClock;

};

function Switch() {

    if (++counterPics >= pics.length)
        counterPics = 0;

    document.getElementById("g_imageObj").src = "/images/flags/" + pics[counterPics];

    localStorage["counterPics"] = counterPics;
};

function DisplayColor() {

    if (ClockTypes[counterClock] != "Digital")
        return;

    switch (digitalColor) {
        case "#000000":
            digitalColor = '#cc0000';
            break;
        case "#cc0000":
            digitalColor = '#4e77a0';
            break;
        case "#4e77a0":
            digitalColor = '#ff5300';
            break;
        case "#ff5300":
            digitalColor = '#ffcc00';
            break;
        case "#ffcc00":
            digitalColor = '#0c4e15';
            break;
        case "#0c4e15":
            digitalColor = '#00ff21';
            break;
        case "#00ff21":
            digitalColor = '#ff6699';
            break;
        case "#ff6699":
            digitalColor = '#663399';
            break;
        case "#663399":
            digitalColor = '#0026ff';
            break;
        case "#0026ff":
            digitalColor = '#00ffff';
            break;
        case "#00ffff":
            digitalColor = '#666666';
            break;
        case "#666666":
            digitalColor = '#ffffff';
            break;
        default:
            digitalColor = '#000000';
            break;
    }

    localStorage["digitalColor"] = digitalColor;
};

function updateTile() {

    var hey = "";

    var d = new Date()
    var time = d.getHours()
    if (time < 10) {
        hey = "Good morning";
    }
    else if (time > 10 && time < 16) {
        hey = "Good afternoon";
    }
    else {
        hey = "Good evening";
    }

    var tileContent = NotificationsExtensions.TileContent.TileContentFactory.createTileSquare310x310Text09();
    tileContent.textHeadingWrap.text = hey + "! " + (Hours12 ? moment().format('h:mm a') : moment().format('HH:mm'));

    // Create a notification for the Wide310x150 tile using one of the available templates for the size.
    var wide310x150Content = NotificationsExtensions.TileContent.TileContentFactory.createTileWide310x150Text03();
    wide310x150Content.textHeadingWrap.text = hey + "! " + (Hours12 ? moment().format('h:mm a') : moment().format('HH:mm'));

    // Create a notification for the Square150x150 tile using one of the available templates for the size.
    var square150x150Content = NotificationsExtensions.TileContent.TileContentFactory.createTileSquare150x150Text04();
    square150x150Content.textBodyWrap.text = hey + "! " + (Hours12 ? moment().format('h:mm a') : moment().format('HH:mm'));

    // Attach the Square150x150 template to the Wide310x150 template.
    wide310x150Content.square150x150Content = square150x150Content;

    // Attach the Wide310x150 template to the Square310x310 template.
    tileContent.wide310x150Content = wide310x150Content;

    // Send the notification to the application’s tile.
    Windows.UI.Notifications.TileUpdateManager.createTileUpdaterForApplication().update(tileContent.createNotification());
};


function gameOver() {

    localStorage["donePuzzle"] = true;
    donePuzzle = true;

    Hours12 = new Boolean(parseInt(localStorage["Hours12"]));
    Hours24(false);

    digitalColor = localStorage["digitalColor"];

    if (!digitalColor)
        digitalColor = "#000000";

    counterClock = localStorage["counterClock"];
    if (!counterClock || counterClock == 2)
        counterClock = 0;

    NoClock(false);

    document.getElementById("appBar").winControl.getCommandById("cmdNoClock").disabled = false;
    document.getElementById("appBar").winControl.getCommandById("cmdSwitch").disabled = false;
    document.getElementById("appBar").winControl.getCommandById("cmdColor").disabled = false;
    document.getElementById("appBar").winControl.getCommandById("cmd24Hours").disabled = false;

    document.getElementById("appBar").winControl.getCommandById("cmdReset").icon = "play"
    document.getElementById("appBar").winControl.getCommandById("cmdReset").label = "Play"
    document.getElementById("appBar").winControl.getCommandById("cmdReset").tooltip = "Play"

    document.getElementById("splash").style.display = "none";
    document.getElementById("container").style.display = "none";
    document.getElementById("clock_bg").style.display = "block";
    document.getElementById("g_imageObj").style.display = "block";

    counterPics = localStorage["counterPics"];
    if (!counterPics)
        counterPics = 0;

    if (!g_imagepath)
        g_imagepath = "/images/flags/" + pics[counterPics];

    document.getElementById("g_imageObj").src = g_imagepath;
};