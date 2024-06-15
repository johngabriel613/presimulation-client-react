import React from 'react';
import Player from '../components/Player';
import CircularProgress from '../components/CircularProgress';
import { useGlobalContext } from '../hooks/useGlobalContext';

const Prediction = () => {
  const {prediction} = useGlobalContext()
  const {oldModelPrediction, newModelPrediction} = prediction

  const formatConfidenceValue = (confidence) => {
    const percentage = confidence * 100;
    return percentage.toFixed(1);
  };
  
  
  return (
    <div className='bg-[#121212] text-white font-medium min-h-screen flex justify-center items-center'>
      <div className='flex flex-col gap-4'>
        <Player/>
        <div className='flex gap-4'>
          <div className='w-full bg-[#242424] px-12 py-4 rounded-lg text-center'>
            <h2 className='text-lg font-semibold mb-2'>CNN Model <br/><span className='text-[#808080]'>&#40;Old&#41;</span></h2>
            <CircularProgress value={formatConfidenceValue(oldModelPrediction.confidence)} text={oldModelPrediction.prediction}/>
          </div>
          <div className='w-full bg-[#242424] px-12 py-4 rounded-lg text-center'>
            <h2 className='text-lg font-semibold mb-2'>Hybrid CNN-LSTM Model <br/><span className='text-[#808080]'>&#40;Proposed&#41;</span></h2>
            <CircularProgress value={formatConfidenceValue(newModelPrediction.confidence)} text={newModelPrediction.prediction}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Prediction
