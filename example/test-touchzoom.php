<!DOCTYPE html>
<html>
<head>
    <title>Test</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>

<div id="test" style="width: 100px; height: 100px; background: green; position: fixed; margin: auto; top: 0; left: 0; bottom: 0; right: 0;"></div>

<script type="text/javascript">
function onScale(el, callback) {
    let hypo = undefined,
        sess = 0;
        
    el.addEventListener('touchmove', function(event) {
        if (event.touches.length == 2) {
            let touchX = (event.touches[0].pageX - event.touches[1].pageX),
                touchY = (event.touches[0].pageY - event.touches[1].pageY);

            let hypo1  = Math.hypot( touchX, touchY );
            if (hypo === undefined) {
                hypo = hypo1;
            }
            sess = (hypo1/hypo);
            callback(sess, true);
        }
    }, false);

    el.addEventListener('touchend', function(event) {
        callback(sess, false);
        hypo = undefined;
    }, false);
}

let elem = document.querySelector('#test');
let resAkhir    = 1,
    resAwal     = undefined;

onScale(window, (scale, ev) => {
    if ( resAwal == undefined ) {
        resAwal = scale;
    }

    let onres = ( resAkhir + -( (resAwal - scale) * 0.1) );
        onres = Math.min(Math.max(.125, onres), 4);

    elem.style.transform = `matrix(${onres},0,0,${onres}, 0,0)`;
    resAkhir = onres;

    if ( ev == false ) {
        resAwal = undefined;
    }
});
</script>
</body>
</html>