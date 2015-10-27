(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {

                WinJS.Application.onsettings = function (e) {
                    e.detail.applicationcommands = {
                        "privacy": { href: "privacypolicy.html", title: "Help & Privacy Policy" }
                    };

                    WinJS.UI.SettingsFlyout.populateSettings(e);
                }
                WinJS.Application.start();
            }
            args.setPromise(WinJS.UI.processAll());
        }
    };

    app.oncheckpoint = function (args) {

    };

    app.start();
})();




WinJS.UI.processAll().then(function () {

    if (document.getElementById("appBar")) {

        document.getElementById("appBar").winControl.getCommandById("cmdNoClock").addEventListener("click", ClockTurn, false);
        document.getElementById("appBar").winControl.getCommandById("cmdSwitch").addEventListener("click", Switch, false);
        document.getElementById("appBar").winControl.getCommandById("cmd24Hours").addEventListener("click", ChangeHours24, false);
        document.getElementById("appBar").winControl.getCommandById("cmdReset").addEventListener("click", replayPuzzle, false);
        document.getElementById("appBar").winControl.getCommandById("cmdColor").addEventListener("click", DisplayColor, false);

        document.getElementById("splash").style.top = (window.innerHeight / 2) - (WinJS.Utilities.getTotalHeight(document.getElementById("splash")) / 2) + "px";
        document.getElementById("splash").style.left = (window.innerWidth / 2) - (WinJS.Utilities.getTotalWidth(document.getElementById("splash")) / 2) + "px";

        document.getElementById("appBar").winControl.getCommandById("cmdSwitch").hidden = pics.length == 1;


        donePuzzle = new Boolean(localStorage["donePuzzle"]);

        if (donePuzzle == false) {
            var alertBox = (new Windows.UI.Popups.MessageDialog("Solve the puzzle to build a clock.", "Welcome to Puzzle Clocks!"));

            alertBox.commands.append(new Windows.UI.Popups.UICommand("Ok", null, 1));

            alertBox.defaultCommandIndex = 0;

            alertBox.showAsync().then(function (command) {
                if (command) {
                    if (command.id == 1) {
                        document.body.style.cursor = "wait";
                        playPuzzle(false);
                    }
                }
            });

        } else {

            gameOver();

        }

    }

    updateTile();

});

window.setInterval(function () {

    updateTile();

}, 60000);