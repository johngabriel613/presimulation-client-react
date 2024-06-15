import React, {useEffect, useRef, useState} from 'react'
import Dropzone from 'react-dropzone'
import { Icon } from '@iconify-icon/react/dist/iconify.js'
import { axios } from '../config/axios'
import CircularProgress from '../components/CircularProgress'
import { useGlobalContext } from '../hooks/useGlobalContext'
import { useNavigate } from 'react-router-dom'

const Upload = () => {
  const browseFileRef = useRef(null)
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef(null);
  const [data, setData] = useState({})
  const {prediction, setPrediction, setAudioFile} = useGlobalContext()


  const navigate = useNavigate()
  const fileUpload = async(acceptedFiles) => {
  
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    setUploadProgress(0)

    const formData = new FormData();
    formData.append('audio_file', selectedFile);

    try {
      const response = await axios.post('/prediction', formData,
        {onUploadProgress: progressEvent => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          updateProgress(percentCompleted);
        }}
      )

      
      setData({response, audio: formData.get('audio_file')})
      
    } catch (error) {
      throw error
    }
  }

  const updateProgress = (percentCompleted) => {
    let start = uploadProgress;
    const end = percentCompleted;

    if (start < end) {
      const interval = setInterval(() => {
        start += 1;
        setUploadProgress(start);
        if (start >= end) {
          clearInterval(interval);
        }
      }, 20); // Adjust the interval speed as necessary
    } else {
      setUploadProgress(end);
    }
  };

  useEffect(() => {
    if(uploadProgress == 100){
      setPrediction(data.response)
      setAudioFile(data.audio)

      navigate('/prediction')
    }
  },[uploadProgress])

  return (
    <div className='bg-[#121212]'>
      <div className='container text-white font-medium min-h-screen flex justify-between items-center '>
        <div className='w-full '>
          <p className='bg-primary w-fit rounded-full px-4 py-1 mb-2'>Pre-Simulation</p>
          <h1 className='max-w-[650px] font-bold text-3xl mb-4 leading-[120%]'>Enhancing Detection of Abnormal Heartbeat for Timely Intervention of Cardiovascular Disease (CVD) using Audio Spectrogram and Hybrid CNN-LSTM Model</h1>
          <p className='text-[#808080]'>
            Researchers:
              <ul className='mt-2 '>
                <li><p>Bernal, Kyla Marie</p></li>
                <li><p>Fabregas, Mike Angelo</p></li>
                <li><p>Paderog, John Gabriel</p></li>
                <li><p>Quilatan, Denzel</p></li>
              </ul>
          </p>
        </div>
        <Dropzone onDrop={fileUpload}>
          {({getRootProps, getInputProps, isDragActive}) => (
            <section>
              <div {...getRootProps({ onClick: (event) => event.stopPropagation() })} className={`aspect-square w-[300px] rounded-full flex flex-col items-center justify-center gap-2 p-4 ${isDragActive ? 'bg-primary' : 'bg-[#242424]'} dragzone`}>
                <input {...getInputProps()} ref={browseFileRef}/>
                
                {uploadProgress > 0 ? 
                  <CircularProgress value={uploadProgress} text={'Processing'}/>
                  :
                  isDragActive ? 
                    <p className='text-3xl font-bold'>Drop it here!</p>
                    :
                    <>
                      <Icon icon="lucide:file-audio" width={62} className='text-primary'/>
                      <p className='font-bold text-xl text-center'><span className='text-primary'>Drag & Drop</span> Your Audio Files Here</p>
                      <div className='text-[#808080]'>or, <button className='underline' onClick={() => browseFileRef.current.click()}>Browse Audio File</button></div> 
                    </>
                }
              </div>
              
            </section>
          )}
        </Dropzone>
      </div>
    </div>
  )
}

export default Upload
