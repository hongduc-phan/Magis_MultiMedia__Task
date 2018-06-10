function throttle(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last, deferTimer;
    return function() {
        var context = scope || this;
        var now = +new Date
            , args = arguments;
        if (last && now < last + threshhold) {
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function() {
                last = now;
                fn.apply(context, args)
            }, threshhold)
        } else {
            last = now;
            fn.apply(context, args)
        }
    }
}

function updateP() {
    const scrollPosition = document.documentElement.scrollTop;
    document.querySelectorAll('.p').forEach(function (p) {
        const el = p.querySelector('.p-img');
        if(el.offsetTop < (scrollPosition + window.innerHeight)) {
            var pos, maxPos, posFactor, objY;
            pos = (el.offsetTop  + (el.offsetHeight / 2)) - (scrollPosition + (window.innerHeight / 2));
            maxPos = (window.innerHeight / 2) + (el.offsetHeight / 2);
            posFactor = Math.abs(pos) / maxPos;
            objY = 60 * posFactor;
            if (pos < 0) {
                objY = objY * -1
            }
            objY = objY + 'px';
        }
        el.style.transform = 'translate3d(0,' + objY + ',0)';
    })
}

window.addEventListener('scroll', throttle(function () {
    updateP();
    // console.log('throttle');
}, 30));

window.addEventListener('scroll', function () {
    //console.log('no-throttle');
});