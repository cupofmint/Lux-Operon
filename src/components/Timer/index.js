import './styles.scss';

import Emitter from 'helpers/Emitter';

import { Component } from 'react';

import {
  EXP_TIMER_START,
  EXP_TIMER_ENDED,
  EXP_TIMER_TOGGLE_PAUSE
} from 'config/messages';

/**
 * Timer component
 */
class Timer extends Component {

  state = {
    minutes: '03',
    seconds: '00'
  }

  componentWillMount() {

    this.bind();

    this.interval = null;
    this.currentTime = 0;
    this.isPaused = false;
  }

  componentDidMount() {

    this.addEventListeners();
  }

  componentWillUnmount() {

    this.removeEventListeners();
  }

  bind() {

    [ 'startTimer', 'togglePause' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );

  }

  addEventListeners() {

    Emitter.on( EXP_TIMER_START, this.startTimer );
    Emitter.on( EXP_TIMER_TOGGLE_PAUSE, this.togglePause );
  }

  removeEventListerners() {

    Emitter.off( EXP_TIMER_START, this.startTimer );
    Emitter.off( EXP_TIMER_TOGGLE_PAUSE, this.togglePause );
  }

  startTimer( initialTime = false ) {

    if( initialTime ) this.currentTime = initialTime;

    clearInterval( this.interval );

    this.interval = setInterval( ()=>{

      if( this.isPaused ) return;

      if( this.currentTime <= 0 ) {

        this.timerEnds();

      } else {
        this.currentTime--;
        this.updateTimer();
      }

    }, 1000 );

  }

  togglePause( toggle ) {

    this.isPaused = toggle;
  }

  timerEnds() {

    clearInterval( this.interval );

    this.setState({
      minutes: '00',
      seconds: '00'
    });

    Emitter.emit( EXP_TIMER_ENDED );

  }
  updateTimer() {
    let minutes = Math.floor( this.currentTime / 60 );
    let seconds = Math.floor( this.currentTime % 60 );

    if( minutes < 10 ) {
      minutes = '0' + minutes;
    }

    if( seconds < 10 ) {
      seconds = '0' + seconds;
    }

    this.setState({
      minutes,
      seconds
    });
  }

  render() {

    return (
      <div className="timer">

        <span className="timer__minutes">{this.state.minutes}</span>

        :

        <span className="timer__seconds">{this.state.seconds}</span>

      </div>
    );
  }
}

export default Timer;
