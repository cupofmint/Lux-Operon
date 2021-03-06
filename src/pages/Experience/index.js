import { Component } from 'react';
import DocumentTitle from 'react-document-title';
import connect from 'decorators/connect';
import Emitter from 'helpers/Emitter';
import SoundManager from 'helpers/SoundManager';
import Radar from 'components/Radar';
import LuxBar from 'components/LuxBar';
import DepthBar from 'components/DepthBar';
import LevelInfos from 'components/LevelInfos';
import Timer from 'components/Timer';
import FishCounter from 'components/FishCounter';
import ExperienceOverlay from 'components/ExperienceOverlay';
import LevelIntroduction from 'components/LevelIntroduction';
import PausePopin from 'components/PausePopin';
import EndPopin from 'components/EndPopin';
import VideoPopin from 'components/VideoPopin';
import FishName from 'components/FishName';
import FlashMessages from 'components/FlashMessages';
import WebGLExperience from 'components/WebGLExperience';
import { mezaleConfig } from 'config/levels';

import { EXP_INTRO_START, TOOLBAR_TOGGLE } from 'config/messages';

/**
 * Experience class
 */
@connect( state => ({ loading: state.resources.loading, resources: state.resources.resources }) )
class Experience extends Component {

  componentWillEnter( callback ) {

    this.startIntroduction( 3000 );
    TweenMax.from( this.refs.experience, 3, { opacity: 0, ease: Expo.easeIn, delay: 1, onComplete: () => callback() });
  }

  componentWillReceiveProps( nextProps ) {

    if( nextProps.loading === false ) {

      this.startIntroduction( 500 );
    }
  }


  componentWillLeave( callback ) {
    window.location.href = "";

    callback();
  }

  startIntroduction( delay ) {

    setTimeout( () => {
      Emitter.emit( EXP_INTRO_START );
      Emitter.emit( TOOLBAR_TOGGLE, false );
      this.refs.levelIntro.beginTitle();

      const diveSound = SoundManager.get( 'dive' );

      diveSound.fadeOut( 0, 1000, () => {
        diveSound.stop();
      });

    }, delay );
  }

  render() {

    const { loading, resources } = this.props;

    const content = (
      <div className="page__container">
        <ExperienceOverlay />

        <LevelIntroduction
          config={mezaleConfig}
          ref="levelIntro"
        />

        <PausePopin />

        <EndPopin />

        <VideoPopin />

        <Radar />

        <LevelInfos config={mezaleConfig} />

        <FishCounter />

        <Timer />

        <LuxBar />

        <DepthBar config={mezaleConfig} />

        <FlashMessages />

        <FishName />

        <WebGLExperience resources={resources} />
      </div>
    );

    return (
      <DocumentTitle title="Luxoperon | Experience - Discover deep seas through a WebGL experience">

        <div
          className="page page--experience"
          ref="experience"
        >
          {! loading && content}
        </div>

      </DocumentTitle>
    );
  }
}

export default Experience;
