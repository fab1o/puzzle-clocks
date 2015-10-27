var Clock = (function () {
    /* Constructor */
    function F() { }

    /* Inheritance */
    F.prototype = new AnimCanvas();
    F.prototype.__super__ = AnimCanvas.prototype;
    F.prototype.init = function () {
        this.__super__.init.apply(this, arguments);

        //var servertime = new Date();
        //servertime.setYear(serverYear);
        //servertime.setMonth(serverMonth);
        //servertime.setDate(serverDay);
        //servertime.setHours(serverHour);
        //servertime.setMinutes(serverMinute);
        //servertime.setSeconds(serverSecond);
        //unixservertime = servertime.getTime();
    };

    /* Private Valuables (don't change the values) */
    //var time;

    var canvas, context, time;

    var unixservertime,
		currenttime;
    var hour,
		minute,
		second,
		millisecond;
    var scaleValue = 1;
    var secObserver;

    /* Private Functions */
    function countTime() {
        currenttime = new Date();
        //currenttime.setTime(unixservertime + time);
        hour = currenttime.getHours();
        minute = currenttime.getMinutes();
        second = currenttime.getSeconds();
        millisecond = currenttime.getMilliseconds()
    }

    /* Public Methods */
    F.prototype.setScale = function (val) {
        scaleValue = val;
    };
    F.prototype.draw = function () {
        canvas = this.canvas;
        context = this.context;
        time = this.time;

        context = this.context;

        /* Clear and save initial setting  */

        context.save();
        context.beginPath();
        context.clearRect(0, 0, digitalSize, digitalSize / 3);

        //context.save();

        /********* Draw from here *********/
        countTime();

        context.scale(scaleValue, scaleValue);

        // Clear the canvas
        context.fillStyle = digitalColor;

        var ampm = "A";

        // Get the rendered Numbers.
        var sec2d, sec1d, sec = second.toString();
        if (sec.length == 1) {
            sec2d = "0";
            sec1d = sec;
        } else {
            sec2d = sec.substr(0, 1);
            sec1d = sec.substr(1, 1);
        }
        var min2d, min1d, min = minute.toString();
        if (min.length == 1) {
            min2d = "0";
            min1d = min;
        } else {
            min2d = min.substr(0, 1);
            min1d = min.substr(1, 1);
        }

        var hr2d, hr1d, hr = hour;
        hr = (function () {
            if (hr >= 12 && Hours12 == true) {
                ampm = "P";
                return (hr == 12) ? 12 : hr - 12;
            } else {
                return hr;
            }
        })();
        hr = hr.toString();
        if (hr.length == 1) {
            hr2d = "0";
            hr1d = hr;
        } else {
            hr2d = hr.substr(0, 1);
            hr1d = hr.substr(1, 1);
        }

        // embed the main Numbers
        context.font = "88px time-normal";
        context.textBaseline = "baseline";
        context.textAlign = "right";

        // Hour
        context.fillText(hr2d, 50, 74);
        context.fillText(hr1d, 92, 74);

        // Comma
        context.save();
        context.font = "82px time-normal";
        var secTemp = parseInt(sec);
        if (secObserver != secTemp) {
            context.fillText(":", 105, 58);
            secObserver = secTemp;
        }
        context.restore();

        // Minutes
        context.fillText(min2d, 152, 74);
        context.fillText(min1d, 196, 74);

        // Seconds
        context.font = "36px time-normal";
        context.fillText(sec2d, 216, 72);
        context.fillText(sec1d, 234, 72);

        // AM/PM
        if (Hours12 == true) {
            context.font = "34px time-normal";
            context.fillText(ampm, 216, 38);
            context.fillText("M", 234, 38);
        }

        /********* Revert to initial setting *********/
        context.restore();
    }
    return F;
})();

var digitalSize = 960; //480
var baseSize = 240;

var clock = new Clock();
clock.setCanvas("canvas2");
clock.setFps(2);
clock.setScale(digitalSize / baseSize);

var animFrame = new AnimFrame();
animFrame.push(clock);


