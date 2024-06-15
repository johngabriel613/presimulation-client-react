import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { AudioVisualizer } from 'react-audio-visualize';
import { useGlobalContext } from '../hooks/useGlobalContext';
import { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify-icon/react/dist/iconify.js';
import { Link } from 'react-router-dom';

const Player = () => {
  const {audioFile} = useGlobalContext()
  const [audioSrc, setAudioSrc] = useState(null)


  useEffect(() => {
    if (audioFile) {
      const audioUrl = URL.createObjectURL(audioFile);
      setAudioSrc(audioUrl);

      // Cleanup the object URL to avoid memory leaks
      return () => {
        URL.revokeObjectURL(audioUrl);
      };
    }
  }, [audioFile]);
  
  return (
    <div className='flex flex-col bg-[#242424] p-8 rounded-lg'>
      <div className='flex justify-between items-center mb-2'>
        <h2>{audioFile.path}</h2>
        <Link to='/' className='bg-primary py-2 px-4 rounded flex items-center gap-2' >
          <Icon icon="oi:audio" />
          New Audio File
        </Link>
      </div>
      <AudioVisualizer 
        blob={audioFile} 
        width={700}
        height={75}
        barWidth={4}
        gap={5}
        barColor={'#f76565'}
      />
      <AudioPlayer
        autoPlay={false}
        src={audioSrc}
        onPlay={e => console.log("onPlay")}
        className='player'
      />
    </div>
  )
};

export default Player