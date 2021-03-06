import { Component } from 'react';

/**
 * RadarLayer class
 */
class RadarLayer extends Component {

  componentDidMount() {

    this.initCanvas();

    this.cursorConfig = {
      width: 14,
      height: 16
    };

    this.indicatorsAlpha = 1;

    this.initCanvas();
  }

  initCanvas() {

    this.clientRect = this.refs.canvas.getBoundingClientRect();

    this.canvas = this.refs.canvas;
    this.ctx = this.canvas.getContext( '2d' );

    // ---- Size
    this.canvas.width = this.width = this.props.size;
    this.canvas.height = this.height = this.props.size;

    this.halfWidth = this.width / 2;
    this.halfHeight = this.height / 2;
  }

  drawBackground() {
    this.setMask( this.halfWidth );
    this.ctx.drawImage( this.radarTexture, 0, 0, this.width, this.height );
  }

  drawIndicators( previousCamPosition = {}, camPosition, fishesPosition ) {

    const camX = this.width * camPosition.x;
    const camY = this.height * camPosition.y;

    const directionVector = {
      x: camPosition.x - previousCamPosition.x,
      y: camPosition.y - previousCamPosition.y
    };

    const yAxis = {
      x: 0,
      y: 1
    };

    let angle = Math.atan2( directionVector.y, directionVector.x ) - Math.atan2( yAxis.y, yAxis.x );

    if ( angle < 0 ) {

      angle += 2 * Math.PI;
    }

    this.ctx.save();

    this.setMask( this.halfWidth - 5 );

    this.ctx.translate( camX, camY );

    this.ctx.globalAlpha = this.indicatorsAlpha;

    this.ctx.beginPath();
    this.ctx.arc( -this.cursorConfig.width / 2, -this.cursorConfig.width / 2, 5, 0, 2 * Math.PI, false );
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fill();


    this.ctx.restore();

    for ( let i = 0; i < fishesPosition.length; i++ ) {
      this.ctx.save();

      this.setMask( this.halfWidth - 5 );

      this.ctx.globalAlpha = this.indicatorsAlpha;

      this.ctx.beginPath();
      this.ctx.arc( fishesPosition[ i ].x * this.width, fishesPosition[ i ].y * this.height, 3, 0, 2 * Math.PI, false );
      this.ctx.fillStyle = '#D4145A';
      this.ctx.fill();

      this.ctx.restore();
    }
  }

  setMask( radius ) {

    this.ctx.beginPath();
    this.ctx.arc( this.halfWidth , this.halfWidth , radius , 0, 2 * Math.PI, false );
    this.ctx.clip();
  }

  update({ previousCamPosition, camPosition, fishesPosition }) {

    TweenMax.killTweensOf( this );

    this.indicatorsAlpha = 1;

    this.ctx.clearRect( 0, 0, this.width, this.height );

    this.drawIndicators( previousCamPosition, camPosition, fishesPosition );

    TweenMax.to( this, 4, { indicatorsAlpha: 0, ease: Expo.easeOut, delay: 1, onUpdate: () => {

      this.ctx.clearRect( 0, 0, this.width, this.height );

      this.drawIndicators( previousCamPosition, camPosition, fishesPosition );

    } });
  }

  render() {

    return (
      <div className="radar__canvas">

        <canvas className="radar__canvas-el" ref="canvas"></canvas>

      </div>
    );
  }
}

export default RadarLayer;
