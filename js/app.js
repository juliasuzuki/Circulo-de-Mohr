$(function () {
    var xVal = 150;
    var yVal = 150;
    var rVal = 100;

    drawCircle(150, 150, 100, 'canvas');
    $('#radius').change(function () {
        $('#rVal').text($(this).val());
        rVal = $(this).val();
        drawCircle(xVal, yVal, rVal, 'canvas');

    });

    $('#x').change(function () {
        $('#xVal').text($(this).val());
        xVal = $(this).val();
        drawCircle(xVal, yVal, rVal, 'canvas');
    });

    $('#y').change(function () {
        $('#yVal').text($(this).val());
        yVal = $(this).val();
        drawCircle(xVal, yVal, rVal, 'canvas');
    });

});

function drawCircle(xs, ys, r, canvas) {
    var canvas = document.getElementById(canvas);
    canvas.width=canvas.width;
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(xs, ys, r, 0, 2 * Math.PI);
        ctx.stroke();
    }
}
