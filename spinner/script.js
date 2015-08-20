/*
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 */
EasingFunctions = {
    // no easing, no acceleration
    linear: function (t) { return t },
    // accelerating from zero velocity
    easeInQuad: function (t) { return t*t },
    // decelerating to zero velocity
    easeOutQuad: function (t) { return t*(2-t) },
    // acceleration until halfway, then deceleration
    easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
    // accelerating from zero velocity
    easeInCubic: function (t) { return t*t*t },
    // decelerating to zero velocity
    easeOutCubic: function (t) { return (--t)*t*t+1 },
    // acceleration until halfway, then deceleration
    easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
    // accelerating from zero velocity
    easeInQuart: function (t) { return t*t*t*t },
    // decelerating to zero velocity
    easeOutQuart: function (t) { return 1-(--t)*t*t*t },
    // acceleration until halfway, then deceleration
    easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
    // accelerating from zero velocity
    easeInQuint: function (t) { return t*t*t*t*t },
    // decelerating to zero velocity
    easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
    // acceleration until halfway, then deceleration
    easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
};

var circleCount = 25;
var startTime = Date.now();
var outerLoopPeriod = 15 * 1000;
var lineWidth = 20;
var arcSize = Math.PI / 2;
var ease = EasingFunctions.easeInOutQuad;

var canvas = document.getElementById("canvas");
var size = Math.min(window.innerWidth, window.innerHeight);
canvas.width = size;
canvas.height = size;

var context = canvas.getContext("2d");
context.lineWidth = lineWidth;
context.lineCap = "round";


var draw = function(progress)
{
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;

    for (var index = 0; index < circleCount; index++)
    {
        var path = new Path2D();
        var radius = centerX / circleCount * index;
        var startDegree = Math.PI * 2 * ((progress * (circleCount - index)) % 1);
        path.arc(centerX, centerY, radius, startDegree, startDegree + arcSize, true);
        context.stroke(path);
    }
};

var update = function()
{
    var delta = Date.now() - startTime;
    var progress = (delta % outerLoopPeriod) / outerLoopPeriod;
    context.clearRect(0, 0, canvas.width, canvas.height);
    draw(ease(progress));
};

setInterval(update, 0);
