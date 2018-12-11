

function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}
//class Circleclass{
    // =======================  Constructor  =========================
    // Protected: tipo de public restrito as subclasses
     function Circle(sigmax, sigmay, tauxy, theta){
        // '''* TensÃ£o normal na direÃ§Ã£o x'''
        this._sigmax= sigmax;
        // ''' * TensÃ£o normal na direÃ§Ã£o y '''
        this._sigmay= sigmay;
        // ''' * TensÃ£o de cisalhamento '''
        this._tauxy= tauxy;
        // '''* Ã‚ngulo da normal do plano em relaÃ§Ã£o ao eixo x (no sentido anti-horÃ¡rio) '''
        this._theta= theta;
        console.log(this._sigmax, this._sigmay,this._tauxy,this._theta);
        return this;
    }
    // =======================  Constructor  =========================*/
    // **  * Cria um objeto p com valores default.

    var p= new Circle( 100.0, 50.0, 25.0, degrees_to_radians(52.0));
    console.log("Olá",p._sigmax, p._sigmay, p._tauxy, p._theta);

    /*======================  ChkNullStateStr  ========================*/

    // * Verifica se as componentes de tensÃ£o passadas como parÃ¢metros
    //   foram um estado de tensÃµes nulo.

     function _ChkNullStateStr( sigmax, sigmay, tauxy ){
        if (Math.sqrt(sigmax*sigmax + sigmay*sigmay + tauxy*tauxy) < 0.1){
            return True
          }
        else{
            return False
          }
    }
    // =========================  ResetSolver  =========================
    // **
    //   * Inicializa os parÃ¢metros do objeto MohrSolver com valores default.

     function ResetSolver(){
        sigmax = 100.0
        sigmay = 50.0
        tauxy = 25.0
        theta = degrees_to_radians( 52.0 )
    }

     function setSigmaX( t, sigmax ){
        if (_ChkNullStateStr( sigmax, t._sigmay, t._tauxy )){
            return
          }
        else{
            t._sigmax = sigmax
          }
}

    // ========================  setSigmaY  =========================
    //  **
    //   * Altera o valor corrente da tensÃ£o normal sigmay.

     function setSigmaY( t, sigmay ){
        if (_ChkNullStateStr( t._sigmax, sigmay, t._tauxy )){
            return
          }
        else{
            t._sigmay = sigmay
          }

    }
    // ========================  setTauXY  =========================
    // **
    //   * Altera o valor corrente da tensÃ£o de cisalhamento tauxy.

     function setTauXY( t, tauxy ){
        if (_ChkNullStateStr( t._sigmax, t._sigmay, tauxy )){
            return
          }
        else{
            t._tauxy = tauxy
          }

    }
     // ========================  setTheta  =========================
     //
     //  * Altera o valor corrente do Ã¢ngulo da normal do plano de
     //  * resposta (em radianos).  O valor do Ã¢ngulo Ã© sempre
     //  * transformado para a faixa entre 0 e 180 graus.

    function setTheta( t, theta ){

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

        t._theta = theta
  }


    // ========================  getSigmaX  =========================
     //  * Retorna o valor corrente da tensÃ£o normal sigmax.
    function getSigmaX(self){

         return self._sigmax;
       }

     // ========================  getSigmaY  =========================
      // * Retorna o valor corrente da tensÃ£o normal sigmay.

    function getSigmaY(self){

        return self._sigmay;
      }


     // ========================  getTauXY  =========================
     // **
     //  * Retorna o valor corrente da tensÃ£o de cisalhamento.

    function getTauXY(self){

        return self._tauxy;
      }

     // ========================  getTheta  =========================
     //
     //  * Retorna o valor corrente do Ã¢ngulo que define a direÃ§Ã£o do
     //  * plano de resposta (em radianos).

    function getTheta(self){

        return self._theta;
      }

    // ========================  Center  =========================
    //   * Retorna o valor mÃ©dio da tensÃ£o normal do estado corrente.
    function Center(self){

        return (self._sigmax + self._sigmay)*0.5;
      }

     // ========================  Radius  =========================
     //  * Retorna o valor do raio do cÃ­rculo de Mohr correspondente
     //  * ao estado de tensÃ£o corrente.

    function Radius(self){ //Raio = tau max
        sigmaux = Math.abs(self._sigmax - self._sigmay) * 0.5

        return Math.sqrt(sigmaux*sigmaux + self._tauxy*self._tauxy);
      }


     // ========================  Sigma1  =========================
     //  * Retorna o valor da tensÃ£o normal mÃ¡xima do estado corrente.

     function Sigma1( ){
      return( this.Center( ) + this.Radius( ) );
     }

     // ========================  Sigma2  =========================
     //  * Retorna o valor da tensÃ£o normal mÃ­nima do estado corrente.

     function Sigma2( ){
      return( this.Center( ) - this.Radius( ) );
     }

     // ========================  TauMax  =========================
     //  * Retorna o valor mÃ¡ximo em mÃ³dulo da tensÃ£o de cisalhamento.

     function TauMax( ){
      return( this.Radius( ) );
     }

     // ========================  SigmaTheta  =========================
     //  * Retorna o valor da tensÃ£o normal no plano cuja normal Ã© defina
     //  * pelo valor corrente de theta.

     function SigmaTheta(  ){
      var sigmaux = (sigmax - sigmay) * 0.5;
      var thetaux = 2.0*theta;

      return( this.Center( )+sigmaux*Math.cos(thetaux)+tauxy*Math.sin(thetaux) );
     }

     // ========================  SigmaTheta90  ========================
     //
     //  * Retorna o valor da tensÃ£o normal no plano cuja normal Ã© defina
     //  * pelo valor corrente de theta + 90 graus.

     function SigmaTheta90(  ){
      var sigmaux = (sigmax - sigmay) * 0.5;
      var thetaux = 2.0*(theta+(Math.PI/4.0));

      return( this.Center( )+sigmaux*Math.cos(thetaux)+tauxy*Math.sin(thetaux) );
     }

    // ========================  TauTheta  =========================
    //
    //   * Retorna o valor da tensÃ£o de cisalhamento no plano cuja normal
    //   * Ã© defina pelo valor corrente de theta.
    //
     function TauTheta(  ){
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

     function ThetaP(  ){
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

     function IsHydrostatic( ){

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
     function PoleX( ){
      return( sigmay );
     }

     /*========================  PoleY  ========================*/
     /**
      * Retorna coordenada vertical do polo.
      */
     function PoleY( ){
     {
      return( -tauxy );
     }

    }


//}
