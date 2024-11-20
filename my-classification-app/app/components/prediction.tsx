import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ModelSelection from './ModelSelection';

interface PredictionResult {
  predictedClass: string;
  confidence: number;
}

const Prediction = () => {
  const [selectedModel, setSelectedModel] = useState('resnet50');
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const getPrediction = async () => {
    if (!selectedFile) {
      setErrorMessage('Please upload an image file.');
      return;
    }

    const formData = new FormData();
    formData.append('model', selectedModel);
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.detail || response.statusText}`);
      }

      const data = await response.json();
      setPredictionResult(data);
      setErrorMessage(null);
    } catch (error) {
      console.error('Error fetching prediction:', error);
      setErrorMessage(`Error occurred during prediction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        setImagePreview(URL.createObjectURL(file));
        setErrorMessage(null);
      } else {
        setErrorMessage('Please upload a valid image file.');
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center', color: 'white', fontWeight: 'bold' }}>
      {/* Animate Model Selection */}
      <motion.div
        initial={{ opacity: 0, translateY: -20 }} // Start off-screen
        animate={{ opacity: 1, translateY: 0 }} // Slide in to position
        exit={{ opacity: 0, translateY: -20 }} // Slide out
        transition={{ duration: 0.5 }} // Smooth transition
      >
        <ModelSelection selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
      </motion.div>

      {/* Image Upload Box */}
      <motion.div
        style={{
          marginTop: '20px',
          width: '100%',
          height: '200px',
          border: '2px dashed white',
          borderRadius: '10px',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        whileHover={{ borderColor: '#000', scale: 1.05 }} // Change hover border color to black
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300 }}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        {imagePreview ? (
          <motion.img
            src={imagePreview}
            alt="Selected"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            whileHover={{ scale: 1.1 }} // Scale effect on hover
            transition={{ duration: 0.3 }}
          />
        ) : (
          <p className="text-white font-bold text-1xl">Click to upload an image</p> // Increased font size
        )}

        <input
          id="file-input"
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
      </motion.div>

      {/* Conditionally Render Predict Button */}
      {imagePreview && (
        <motion.button
          onClick={getPrediction}
          initial={{ opacity: 0, translateY: 20 }} // Start below
          animate={{ opacity: 1, translateY: 0 }} // Slide in
          exit={{ opacity: 0, translateY: 20 }} // Slide out
          transition={{ duration: 0.5, type: 'spring', stiffness: 300 }} // Smooth transition
          style={{
            marginTop: '20px',
            padding: '12px 24px', // Adjusted padding
            backgroundColor: 'black', // Changed to black
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%',
            fontWeight: 'bold', // Make button text bold
            fontSize: '1.2rem', // Increased button text size
          }}
          whileHover={{ backgroundColor: '#333' }} // Darker shade on hover
        >
          Predict
        </motion.button>
      )}

      {/* Error Message Animation */}
      {errorMessage && (
        <motion.div
          style={{ color: 'red', marginTop: '10px' }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
        >
          <p style={{ color: 'red', fontWeight: 'bold', fontSize: '1.1rem' }}>{errorMessage}</p> {/* Increased error message size */}
        </motion.div>
      )}

      {/* Prediction Result Animation */}
      {predictionResult && (
        <motion.div
        style={{ marginTop: '20px' }}
        initial={{ opacity: 0, translateY: -20 }} // Start off-screen
        animate={{ opacity: 1, translateY: 0 }} // Slide in to position
        exit={{ opacity: 0, translateY: -20 }} // Slide out
        transition={{ duration: 0.5 }} // Smooth transition
      >
        <h3 style={{ margin: '0', fontSize: '1.5em', color: 'white' }}>Prediction Result:</h3>
        <div style={{ backgroundColor: 'black', padding: '8px', borderRadius: '10px' }}> {/* Smaller borderRadius and padding */}
          <motion.p
            initial={{ opacity: 0, translateY: 10 }} // Start below
            animate={{ opacity: 1, translateY: 0 }} // Fade and slide up
            exit={{ opacity: 0, translateY: 10 }} // Fade and slide down
            transition={{ duration: 0.5, delay: 0.2 }} // Delay for emphasis
            style={{
              margin: '5px 0',
              color: 'white', // Set text color to white
              fontWeight: 'bold',
              fontSize: '1.2rem', // Increased font size
            }}
          >
            Predicted Class: <span style={{ color: 'white' }}>{predictionResult.predictedClass}</span> {/* Keep span color white */}
          </motion.p>
        </div>
     
      
          <motion.p
            initial={{ opacity: 0, translateY: 10 }} // Start below
            animate={{ opacity: 1, translateY: 0 }} // Fade and slide up
            exit={{ opacity: 0, translateY: 10 }} // Fade and slide down
            transition={{ duration: 0.5, delay: 0.4 }} // Delay for emphasis
            style={{
              margin: '5px 0',
              color: 'white', // Set to plain white
              fontWeight: 'bold',
              fontSize: '1.2rem', // Increased font size
            }}
          >
            Confidence: <span style={{ color: 'white' }}>{predictionResult.confidence.toFixed(2)}</span> {/* Change span color to white */}
          </motion.p>
        </motion.div>
      )}
    </div>
  );
};

export default Prediction;
