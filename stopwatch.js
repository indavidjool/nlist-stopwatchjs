var WarningMessages = [
    "TickerInterval not Set, using 250 ms",
    "TickerFunction not Set, logging elapsed time to console"
];

const isNumber = (element) => {return typeof element==='number'}

function getSettingWarnings(warnString, curValue, curIndex) {
    return curValue? warnString:warnString + '\n' + WarningMessages[curIndex];
}

var stopWatch = {
    set setStartTime(date) {
        this.startTime = date;
        this.running = true;
    },
    get getStartTime() {
        return this.startTime;
    },
    startTime: null,
    running: false,
    set setPauseTime(date) {
        this.pauseTime=date;
    },
    get getPauseTime() {
        return this.pauseTime;
    },
    pauseTime: null,
    set setPauseDuration(time) {
        this.pauseDuration = time
    },
    get getPauseDuration() {
        return this.pauseDuration;
    },
    pauseDuration: 0,
    set setStopTime(date) {
        this.stopTime = date;
        clearInterval(this.timerID);
        this.running = false;
    },
    stopTime: null,
    set setTickerFunction(func) {
            if(typeof func === "function") {
                this.tickerFunction = () => {
                    this.setTickerTime = new Date();
                    this.setElapsedTime = this.getTickerTime-this.getStartTime-this.getPauseDuration;
                    func();
                }
            } else {
                throw "tickerFunction: value passed not a function!";
            }
    },
    tickerFunction: null,
    set setTickerInterval(delay) {
        this.tickerInterval = delay;
    },
    tickerInterval: null,
    recordSplit () {
        if(this.running) {
            this.splits.push(this.elapsedTime);
        } else {
            throw "stopWatch is not running";
        }
    },
    get getSplits() {
        return this.splits;
    },
    splits: [],
    distanceMarkers: [],
    startTimer() {
        if (this.stopTime===null && this.pauseTime===null) {
            let checkSettings = [this.tickerInterval,this.tickerFunction];
            let settingError = checkSettings.reduce(getSettingWarnings,"");
            if(settingError==="") {
                this.setStartTime=new Date();
                this.timerID=setInterval(this.tickerFunction,this.tickerInterval);
            } else {
                console.warn("Missing Settings Defaults Used:\n",settingError);
                this.setStartTime=new Date();
                this.setTickerFunction = () => {console.log("Time Elapsed ",this.getElapsedTime," ms")};
                this.setTickerInterval=250;
                this.timerID=setInterval(this.tickerFunction,this.tickerInterval);
            };
        } else {
            throw "StopWatch has been stopped, reset required before start"
        }
    },
    stopTimer() {
        if (this.running===true) {
            this.setStopTime=new Date();
            clearInterval(this.timerID);
            this.timerID=null;
        } else {
            throw "stopTimer Error: StopWatch not running"
        }
    },
    togglePause() {
        if (this.startTime!==null) {
            if (this.stopTime===null) {
                if(this.pauseTime===null) {
                    this.setPauseTime = new Date();
                    clearInterval(this.timerID);
                    this.running=false;
                } else {
                    let upTime = new Date();
                    this.setPauseDuration = this.getPauseDuration+(upTime-this.getPauseTime);
                    this.setPauseTime = null;
                    this.timerID=setInterval(
                        this.tickerFunction,
                        this.tickerInterval
                    );
                    this.running=true;
                }
            } else {
                throw "Can not pause, stopWatch has been stopped.  Reset required"
            }
        } else {
            throw "Can not pause, stopWatch not started";
        }
    },
    resetTimer() {
        if (!this.running && (this.pauseTime===null)) {
            [
                this.startTime,
                this.stopTime,
                this.elapsedTime,
                this.pauseDuration
            ] = new Array(4).fill(null);
            this.splits=[];
        } else {
            throw "Error: Can not reset StopWatch while running!"
        }
    },
    set setConfig({tickerFunction, tickerInterval, distanceMarkers}) {
        this.setTickerFunction = tickerFunction;
        this.setTickerInterval = tickerInterval;
        if (Array.isArray(distanceMarkers)) {
            if (distanceMarkers.every(isNumber)) {
                this.distanceMarkers = distanceMarkers;
            } else {
                throw 'setConfig Error: distanceMarkers not numbers!'
            }
        } else {
            throw 'setConfig Error: distanceMarkers is not an Array!'
        }
    },
    clearConfig() {
        if (!this.running && (this.pauseTime===null)) {
            [
                this.tickerFunction,
                this.tickerInterval
            ] = new Array(2).fill(null);
            this.distanceMarkers=[];
        }
    },
    timerID: null,
    set setElapsedTime(timeDelta) {
        this.elapsedTime = timeDelta;
    },
    get getElapsedTime() {
        return this.elapsedTime;
    },
    elapsedTime: null,
    set setTickerTime(date) {
        this.tickerTime=date;
    },
    get getTickerTime() {
        return this.tickerTime;
    },
    tickerTime: null,
    paceArray: [],
    get calculatePace() {
        this.paceArray = [];
        if (this.distanceMarkers.length>0) {
            this.distanceMarkers.forEach(
                (value)=>{
                    this.paceArray.push(this.elapsedTime/value);
                }
            );
            return this.paceArray;
        }
    }
}

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000))
        , seconds = parseInt((duration / 1000) % 60)
        , minutes = parseInt((duration / (1000 * 60)) % 60)
        , hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "00" + milliseconds :
        (milliseconds < 100) ? "0" + milliseconds : milliseconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

export { stopWatch, msToTime }