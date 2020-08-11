import React, { useEffect, useState, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

// interface PlayerOptionsFromUser extends videojs.PlayerOptions {
//   autoplay?: boolean | 'muted' | 'play' | 'any';
//   controls?: boolean;
//   loop?: boolean;  // 어디에도 없음
//   muted?: boolean; // 어디에도 없음
//   src: string;
//   poster?: string; // Player 인터페이스
//   preload: 'auto' | 'metadata' | 'none';
//   width: string | number;
//   height: string | number;
// }

interface IPlayerOptions extends videojs.PlayerOptions {
  poster?: string;
  loop?: boolean;
  muted?: boolean;
  preload?: 'auto' | 'metadata' | 'none';
  // autoplay?: boolean | 'muted' | 'play' | 'any';
}

interface PlayerProps {
  playerOptions: IPlayerOptions;
  // Custom Event Handlers
  onProgress?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onWaiting?: () => void;
  onTimeUpdate?: () => void;
  onSeeking?: () => void;
  onSeeked?: () => void;
  onEnded?: () => void;
  onError?: () => void;
  onLoadedData?: () => void;
  onLoadedMetadata?: () => void;
}

// props로 전달된 각 이벤트 리스너들을 대응되는 이벤트가 발생시 실행되도록 초기화
function initializeEventListeners(props: PlayerProps): void {

}

function Player(props: PlayerProps):JSX.Element {
  const playerOptions: IPlayerOptions = props.playerOptions;
  let playerRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const player = videojs(
      playerRef.current,
      playerOptions,
      () => {
        if (playerOptions.src !== undefined)
          player.src(playerOptions.src)
      }
    );

    return (): void => {
      if (player)
        player.dispose();
    }
  }, []);

  return (
    <div data-vjs-player>
      <video
        ref={playerRef}
        className={`video-js`}
      />
    </div>
  );
}

export default Player
