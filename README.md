# stopWatch
A simple JavaScript library implementing a stopwatch typically used in timing middle distance fun runs/races.
## Background
Note this is a simple stopwatch timer using the setInterval function, be aware of the [caveats](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval) when using.
## Installation
To use with the browser:
```html
<script src="path/to/yourCopyOf/stopwatch.js"></script>
```
you can also import the named exports stopWatch and msToTime from stopwatch.js using ES6 module static import statement: 

```javascript
import { stopWatch, msToTime } from './path/to/yourCopyOf/stopwatch.js';
```
## Usage
`stopwatch.js` exports the stopWatch object and the msToTime function.

msToTime is a simple function that translates ms to "hh:mm:ss:---" format.

The stopWatch objects encapsulates all the functions needed for implementing a basic stopWatch.

### **To configure stopWatch:**
```javascript
stopWatch.setConfig = {
        tickerFunction:()=>{},
        tickerInterval:250,
        distanceMarkers:[]
}
```
- **tickerFunction**
is the function you wish to be executed on every tick of the clock. Defaults to 
```javascript
() => {console.log("Time Elapsed ",this.getElapsedTime," ms")
```
- **tickerInterval**
is the interval in ms between function calls.  Defaults to 250 ms.
- **distanceMarkers**
is an array containing the distance markers at which you want the pace calculated for.  For example ```[2.5,5.0,7.5]``` could be used for a 10 km run with a 2.5 km lap, allowing pace feedback to runners after every lap.
#### **stopWatch functions**
#### ```stopWatch.startTimer()```
Starts the timer, firing the tickerFunction after every interval, and records the starting time.
#### ```stopWatch.stopTimer()```
Stops the timer and records the elapsed time, and finishing time.
#### ```stopWatch.togglePause()```
Pauses the timer, and records the time when paused, so that on restart the time paused is subtracted from the start - finish time.
#### ```stopWatch.resetTimer()```
Resets the stopWatch, without clearing the configuration set by ```stopWatch.setConfig```
#### ```stopWatch.clearConfig()```
Equivalent to 
```javascript
stopWatch.setConfig = {
    tickerFunction: null,
    tickerInterval: null,
    distanceMarkers: []
}
```
#### ```stopWatch.calculatePace```
a getter that returns an Array containing the pace at every distancemarker based on the elapsed time.
### ```stopWatch.getTickerTime```
a getter that returns the last time setInterval executed the callback.  Use JavaScript ```.toLocaleTimeString()``` to convert to localized time format.
#### ```stopWatch.getElapsedTime```
a getter returning the time elapsed from the start time to the last time setInterval executed the callback.
#### ```stopWatch.recordSplit()```
Pushes the last split time onto the splits Array.
#### ```stopWatch.getSplits```
a getter that returns an Array of the splits.
#### ```msToTime(time)```
Converts ```time``` in ms to "HH:MM:SS:sss" format