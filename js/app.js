$(function () {
    var xVal = 200;
    var yVal = 200;
    var rVal = 100;

    var sigmaxVal = 100;
    var sigmayVal = 50;
    var tauxy = 25;

    console.log("hello");
    // drawCircle(200, 200, 100, 'canvas');
    console.log("Olá");
    $('#sigmax').change(function () {
        $('#sigmaxVal').text($(this).val());
        sigmaxVal = $(this).val();
        // drawCircle(xVal, yVal, rVal, 'canvas');

    });

    $('#sigmay').change(function () {
        $('#sigmayVal').text($(this).val());
        sigmayVal = $(this).val();
        // drawCircle(xVal, yVal, rVal, 'canvas');
    });

    $('#tauxy').change(function () {
        $('#tauxyVal').text($(this).val());
        tauxyVal = $(this).val();
        // drawCircle(xVal, yVal, rVal, 'canvas');
    });

});

// function drawCircle(xs, ys, r, canvas) {
//     var canvas = document.getElementById(canvas);
//     canvas.width=canvas.width;
//     if (canvas.getContext) {
//         var ctx = canvas.getContext('2d');
//         ctx.beginPath();
//         ctx.arc(xs, ys, r, 0, 2 * Math.PI);
//         ctx.stroke();
//     }
// }
