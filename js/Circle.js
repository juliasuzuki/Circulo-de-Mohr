
let circle1;

function setup() {
  createCanvas(400,400)
  circle1 = new Circle(100,50,25,degrees_to_radians(50));
}
function draw(){
  background(0);
  var xc=(circle1.sigmax+circle1.sigmay)/2
  console.log(xc);
  ellipse(200+xc, 200+0,circle1.Radius());
}


function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}
class Circle{
    // =======================  Constructor  =========================
    // Protected: tipo de public restrito as subclasses
     constructor(sigmax, sigmay, tauxy, theta){
        // '''* TensÃ£o normal na direÃ§Ã£o x'''
        this.sigmax= sigmax;
        // ''' * TensÃ£o normal na direÃ§Ã£o y '''
        this.sigmay= sigmay;
        // ''' * TensÃ£o de cisalhamento '''
        this.tauxy= tauxy;
        // '''* Ã‚ngulo da normal do plano em relaÃ§Ã£o ao eixo x (no sentido anti-horÃ¡rio) '''
        this.theta= theta;
        console.log(this.sigmax, this.sigmay,this.tauxy,this.theta);
        return this;
    }
    // =======================  Constructor  =========================*/
    // **  * Cria um objeto p com valores default.



    /*======================  ChkNullStateStr  ========================*/

    // * Verifica se as componentes de tensÃ£o passadas como parÃ¢metros
    //   foram um estado de tensÃµes nulo.

      ChkNullStateStr(){
        if (Math.sqrt(this.sigmax*this.sigmax + this.sigmay*this.sigmay + this.tauxy*this.tauxy) < 0.1){
            return True
          }
        else{
            return False
          }
    }
    // =========================  ResetSolver  =========================
    // **
    //   * Inicializa os parÃ¢metros do objeto MohrSolver com valores default.

     ResetSolver(){
        this.sigmax = 100.0
        this.sigmay = 50.0
        this.tauxy = 25.0
        this.theta = degrees_to_radians( 52.0 )
    }

     setSigmaX( t, sigmax ){
        if (ChkNullStateStr( sigmax, t.sigmay, t.tauxy )){
            return
          }
        else{
            t.sigmax = sigmax
          }
}

    // ========================  setSigmaY  =========================
    //  **
    //   * Altera o valor corrente da tensÃ£o normal sigmay.

     setSigmaY( t, sigmay ){
        if (ChkNullStateStr( t.sigmax, sigmay, t.tauxy )){
            return
          }
        else{
            t.sigmay = sigmay
          }

    }
    // ========================  setTauXY  =========================
    // **
    //   * Altera o valor corrente da tensÃ£o de cisalhamento tauxy.

     setTauXY( t, tauxy ){
        if (ChkNullStateStr( t.sigmax, t.sigmay, tauxy )){
            return
          }
        else{
            t.tauxy = tauxy
          }

    }
     // ========================  setTheta  =========================
     //
     //  * Altera o valor corrente do Ã¢ngulo da normal do plano de
     //  * resposta (em radianos).  O valor do Ã¢ngulo Ã© sempre
     //  * transformado para a faixa entre 0 e 180 graus.

    setTheta( t, theta ){

         // Primeiro corrige o Ã¢ngulo para um valor com
         //     * mÃ³dulo menor que 360 graus.
         //
        fp = theta / (2.0*Math.pi)  //fp "fraction" part
        ip = int(fp)                //ip: integer part
        theta = theta - (ip*2.0*Math.pi)

        // Agora transforma Ã¢ngulo para a faixa entre 0 e 180 graus.
        if (theta < 0.0 ){
            theta = Math.pi + theta
          }
        else if (theta > Math.pi) {
            theta = theta - Math.p
          }

        t.theta = theta
  }


    // ========================  getSigmaX  =========================
     //  * Retorna o valor corrente da tensÃ£o normal sigmax.
    getSigmaX(){

         return this.sigmax;
       }

     // ========================  getSigmaY  =========================
      // * Retorna o valor corrente da tensÃ£o normal sigmay.

    getSigmaY(){

        return this.sigmay;
      }


     // ========================  getTauXY  =========================
     // **
     //  * Retorna o valor corrente da tensÃ£o de cisalhamento.

    getTauXY(){

        return this.tauxy;
      }

     // ========================  getTheta  =========================
     //
     //  * Retorna o valor corrente do Ã¢ngulo que define a direÃ§Ã£o do
     //  * plano de resposta (em radianos).

    getTheta(){

        return this.theta;
      }

    // ========================  Center  =========================
    //   * Retorna o valor mÃ©dio da tensÃ£o normal do estado corrente.
    Center(){

        return (this.sigmax + this.sigmay)*0.5;
      }

     // ========================  Radius  =========================
     //  * Retorna o valor do raio do cÃ­rculo de Mohr correspondente
     //  * ao estado de tensÃ£o corrente.

    Radius(){ //Raio = tau max
        var sigmaux = Math.abs(this.sigmax - this.sigmay) * 0.5

        return Math.sqrt(sigmaux*sigmaux + this.tauxy*this.tauxy);
      }


     // ========================  Sigma1  =========================
     //  * Retorna o valor da tensÃ£o normal mÃ¡xima do estado corrente.

     Sigma1(){
      return( this.Center( ) + this.Radius( ) );
     }

     // ========================  Sigma2  =========================
     //  * Retorna o valor da tensÃ£o normal mÃ­nima do estado corrente.

     Sigma2(){
      return( this.Center( ) - this.Radius( ) );
     }

     // ========================  TauMax  =========================
     //  * Retorna o valor mÃ¡ximo em mÃ³dulo da tensÃ£o de cisalhamento.

     TauMax(){
      return( this.Radius( ) );
     }

     // ========================  SigmaTheta  =========================
     //  * Retorna o valor da tensÃ£o normal no plano cuja normal Ã© defina
     //  * pelo valor corrente de theta.

     SigmaTheta(){
      var sigmaux = (sigmax - sigmay) * 0.5;
      var thetaux = 2.0*theta;

      return( this.Center( )+sigmaux*Math.cos(thetaux)+tauxy*Math.sin(thetaux) );
     }

     // ========================  SigmaTheta90  ========================
     //
     //  * Retorna o valor da tensÃ£o normal no plano cuja normal Ã© defina
     //  * pelo valor corrente de theta + 90 graus.

     SigmaTheta90(){
      var sigmaux = (sigmax - sigmay) * 0.5;
      var thetaux = 2.0*(theta+(Math.PI/4.0));

      return( this.Center( )+sigmaux*Math.cos(thetaux)+tauxy*Math.sin(thetaux) );
     }

    // ========================  TauTheta  =========================
    //
    //   * Retorna o valor da tensÃ£o de cisalhamento no plano cuja normal
    //   * Ã© defina pelo valor corrente de theta.
    //
     TauTheta(){
      var sigaux = (sigmax - sigmay) * 0.5;
      var thetaux = 2.0*theta;

      return( sigaux*Math.sin(thetaux) - tauxy*Math.cos(thetaux) );
     }

     // ========================  ThetaP  =========================
     //
     //  * Retorna o valor do Ã¢ngulo que a normal do plano onde
     //  * ocorre a tensÃ£o normal principal mÃ¡xima faz com o eixo x
     //  * (em radianos).  O valor do Ã¢ngulo Ã© sempre transformado
     //  * para a faixa entre 0 e 180 graus.

     ThetaP(){
      var sigmaux = (sigmax - sigmay) * 0.5;
      var thetap;

      if( Math.abs( sigmaux ) > 0.0 ){
       thetap = 0.5 * Math.atan2(tauxy,sigmaux);
     }
      else if( tauxy > 0.0 ){
       thetap = Math.PI / 4.0;
     }
      else if( tauxy < 0.0 ){
       thetap = -Math.PI / 4.0;
     }
      else {
       thetap = 0.0;
     }

     // Transforma Ã¢ngulo para a faixa entre 0 e 180 graus.

      if( thetap < 0.0 ){
       thetap = Math.PI + thetap;
     }

      return( thetap );
     }

    // =====================  IsHydrostatic  ======================
    //
    //   * Retorna um flag para estado hidrostÃ¡tico de tensÃµes:
    //   * se verdadeiro, estado de tensÃµes corrente Ã© hidrostÃ¡tico,
    //   * se falso, nÃ£o Ã© hidrostÃ¡tico.

      IsHydrostatic(){

      if( (Math.abs( sigmax - sigmay ) < 0.01) &&
          (Math.abs( tauxy ) < 0.01) )
      {
       return( true );
      }

      return( false );
     }

     /*========================  PoleX  ========================*/
     /**
      * Retorna coordenada horizontal do polo.
      */
     PoleX(){
      return( sigmay );
     }

     /*========================  PoleY  ========================*/
     /**
      * Retorna coordenada vertical do polo.
      */
     PoleY(){
     {
      return( -tauxy );
     }

    }


}
