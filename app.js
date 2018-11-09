(function()){
  var xVal=150;
  var yVal =150;
  var rVal=150;
  $('#x').change(function () { //Jquery code.
          $('#xVal').text($(this).val());
          xVal = $(this).val();
          drawCircle(xVal, yVal, rVal, 'canvas');
      });

      $('#y').change(function () {
          $('#yVal').text($(this).val());
          yVal = $(this).val();
          drawCircle(xVal, yVal, rVal, 'canvas');
      });
};

function drawCircle (x,y,r,canvas){
  var canvasx=document.getElementById(canvas);
  canvasx.width=canvas.width;
  if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(xs, ys, r, 0, 2 * Math.PI); 
        ctx.stroke();
    }
}
