/**
 * FirstPersonControls class
 *
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author paulirish / http://paulirish.com/
 */
class FirstPersonControls {

  /**
   * Constructor
   * @param  {object} object     Object
   * @param  {object} domElement Dom element
   */
  constructor( object, domElement = document ) {

    this.object = object;
    this.target = new THREE.Vector3( 0, 0, 0 );

    this.domElement = domElement;

    this.enabled = true;

    this.movementSpeed = 1.0;
    this.lookSpeed = 0.005;

    this.lookVertical = true;
    this.autoForward = false;

    this.activeLook = true;

    this.heightSpeed = false;
    this.heightCoef = 1.0;
    this.heightMin = 0.0;
    this.heightMax = 1.0;

    this.constrainVertical = false;
    this.verticalMin = 0;
    this.verticalMax = Math.PI;

    this.autoSpeedFactor = 0.0;

    this.mouseX = 0;
    this.mouseY = 0;

    this.lat = 0;
    this.lon = 0;
    this.phi = 0;
    this.theta = 0;

    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;

    this.mouseDragOn = false;
    this.mouseDown = false;
    this.isTweening = false;

    this.viewHalfX = 0;
    this.viewHalfY = 0;

    if ( this.domElement !== document ) {
      this.domElement.setAttribute( 'tabindex', - 1 );
    }

    this._contextMenu = ::this.contextMenu;
    this._onMouseMove = ::this.onMouseMove;
    this._onMouseDown = ::this.onMouseDown;
    this._onMouseUp = ::this.onMouseUp;
    this._onKeyDown = ::this.onKeyDown;
    this._onKeyUp = ::this.onKeyUp;

    this.handleResize();
    this.bindEvents();
  }

  /**
   * HandleResize function
   */
  handleResize() {

    this.viewHalfX = parseInt( this.domElement.style.width ) / 2;
    this.viewHalfY = parseInt( this.domElement.style.height ) / 2;
  }

  /**
   * BindEvents function
   */
  bindEvents() {

    this.domElement.addEventListener( 'contextmenu', this._contextmenu, false );
    this.domElement.addEventListener( 'mousemove', this._onMouseMove, false );
    this.domElement.addEventListener( 'mousedown', this._onMouseDown, false );
    this.domElement.addEventListener( 'mouseup', this._onMouseUp, false );

    window.addEventListener( 'keydown', this._onKeyDown, false );
    window.addEventListener( 'keyup', this._onKeyUp, false );
  }

  /**
   * OnMouseDown function
   * @param  {object} event Event
   */
  onMouseDown( event ) {

    if ( this.domElement !== document ) {
      this.domElement.focus();
    }

    event.preventDefault();
    event.stopPropagation();

    if ( this.activeLook ) {
      switch ( event.button ) {
        case 0: this.moveForward = true; break;
        case 2: this.moveBackward = true; break;
      }
    }

    this.mouseDown = true;
    this.mouseDragOn = true;

    this.onMouseMove( event );

    TweenMax.killTweensOf( this, {
      actualMoveSpeed: true,
      mouseX: true,
      mouseY: true
    });

    this.isTweening = false;

  }

  /**
   * OnMouseUp function
   * @param  {object} event Event
   */
  onMouseUp( event ) {

    event.preventDefault();
    event.stopPropagation();

    this.isTweening = true;

    this.mouseDown = false;
    this.mouseDragOn = false;

    TweenMax.to( this, 3, {
      actualMoveSpeed: 0,
      ease: Expo.easeOut,
      onComplete: () => {
        if ( this.activeLook ) {
          this.moveForward = false;
          this.moveBackward = false;
        }

        this.isTweening = false;
      }
    });

    TweenMax.to( this, 3, {
      mouseX: 0,
      mouseY: 0,
      ease: Expo.easeOut
    });
  }

  /**
   * OnMouseMove function
   * @param  {object} event Event
   */
  onMouseMove ( event ) {

    if( this.mouseDown ) {
      if ( this.domElement === document ) {

        this.mouseX = event.pageX - this.viewHalfX;
        this.mouseY = event.pageY - this.viewHalfY;

      } else {

        this.mouseX = event.pageX - this.domElement.offsetLeft - this.viewHalfX;
        this.mouseY = event.pageY - this.domElement.offsetTop - this.viewHalfY;
      }
    }
  }

  /**
   * OnKeyDown function
   * @param  {object} event Event
   */
  onKeyDown( event ) {

    switch ( event.keyCode ) {

      case 38: /*up*/
      case 87: /*W*/ this.moveForward = true; break;

      case 37: /*left*/
      case 65: /*A*/ this.moveLeft = true; break;

      case 40: /*down*/
      case 83: /*S*/ this.moveBackward = true; break;

      case 39: /*right*/
      case 68: /*D*/ this.moveRight = true; break;

      case 82: /*R*/ this.moveUp = true; break;
      case 70: /*F*/ this.moveDown = true; break;
    }
  }

  /**
   * OnKeyUp function
   * @param  {object} event Event
   */
  onKeyUp( event ) {

    switch ( event.keyCode ) {

      case 38: /*up*/
      case 87: /*W*/ this.moveForward = false; break;

      case 37: /*left*/
      case 65: /*A*/ this.moveLeft = false; break;

      case 40: /*down*/
      case 83: /*S*/ this.moveBackward = false; break;

      case 39: /*right*/
      case 68: /*D*/ this.moveRight = false; break;

      case 82: /*R*/ this.moveUp = false; break;
      case 70: /*F*/ this.moveDown = false; break;
    }
  }

  /**
   * Update function
   * @param  {object} delta Delta
   */
  update( delta ) {

    if ( this.enabled === false ) return;

    if ( this.heightSpeed ) {

      const y = THREE.Math.clamp( this.object.position.y, this.heightMin, this.heightMax );
      const heightDelta = y - this.heightMin;

      this.autoSpeedFactor = delta * ( heightDelta * this.heightCoef );

    } else {

      this.autoSpeedFactor = 0.0;
    }

    if( ! this.isTweening ) {
      this.actualMoveSpeed = delta * this.movementSpeed;
    }

    if ( this.moveForward || ( this.autoForward && ! this.moveBackward ) ) this.object.translateZ( - ( this.actualMoveSpeed + this.autoSpeedFactor ) );
    if ( this.moveBackward ) this.object.translateZ( this.actualMoveSpeed );

    if ( this.moveLeft ) this.object.translateX( - this.actualMoveSpeed );
    if ( this.moveRight ) this.object.translateX( this.actualMoveSpeed );

    if ( this.moveUp ) this.object.translateY( this.actualMoveSpeed );
    if ( this.moveDown ) this.object.translateY( - this.actualMoveSpeed );

    let actualLookSpeed = delta * this.lookSpeed;

    if ( ! this.activeLook ) {

      actualLookSpeed = 0;
    }

    let verticalLookRatio = 1;

    if ( this.constrainVertical ) {

      verticalLookRatio = Math.PI / ( this.verticalMax - this.verticalMin );
    }

    this.lon += this.mouseX * actualLookSpeed;
    if ( this.lookVertical ) this.lat -= this.mouseY * actualLookSpeed * verticalLookRatio;

    this.lat = Math.max( - 85, Math.min( 85, this.lat ) );
    this.phi = THREE.Math.degToRad( 90 - this.lat );

    this.theta = THREE.Math.degToRad( this.lon );

    if ( this.constrainVertical ) {

      this.phi = THREE.Math.mapLinear( this.phi, 0, Math.PI, this.verticalMin, this.verticalMax );
    }

    const targetPosition = this.target,
      position = this.object.position;

    targetPosition.x = position.x + 100 * Math.sin( this.phi ) * Math.cos( this.theta );
    targetPosition.y = position.y + 100 * Math.cos( this.phi );
    targetPosition.z = position.z + 100 * Math.sin( this.phi ) * Math.sin( this.theta );

    this.object.lookAt( targetPosition );
  }

  /**
   * ContextMenu function
   * @param  {object} event Event
   */
  contextMenu( event ) {

    event.preventDefault();
  }

  /**
   * Dispose function
   */
  dispose() {

    this.domElement.removeEventListener( 'contextmenu', this._contextmenu, false );
    this.domElement.removeEventListener( 'mousedown', this._onMouseDown, false );
    this.domElement.removeEventListener( 'mousemove', this._onMouseMove, false );
    this.domElement.removeEventListener( 'mouseup', this._onMouseUp, false );

    window.removeEventListener( 'keydown', this._onKeyDown, false );
    window.removeEventListener( 'keyup', this._onKeyUp, false );
  }
}

export default FirstPersonControls;