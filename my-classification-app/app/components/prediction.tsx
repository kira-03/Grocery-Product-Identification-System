import React, { useState, useRef, useEffect } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  
  // Add ref for the results section
  const resultsRef = useRef<HTMLDivElement>(null);

  // Effect to handle scrolling when results are available
  useEffect(() => {
    if (predictionResult && resultsRef.current) {
      resultsRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [predictionResult]);

  const getPrediction = async () => {
    if (!selectedFile) {
      setErrorMessage('Please upload an image file.');
      return;
    }

    const formData = new FormData();
    formData.append('model', selectedModel);
    formData.append('image', selectedFile);

    setIsLoading(true);
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
      setErrorMessage(
        `Error occurred during prediction: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    } finally {
      setIsLoading(false);
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
    <div
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        textAlign: 'center',
        padding: '25px',
        borderRadius: '15px',
        background: '#000000',
        color: '#ffffff',
        boxShadow: '0 8px 24px rgba(75, 0, 130, 0.5)',
        border: '1px solid #800080',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: '20px' }}
      >
        <p style={{ fontSize: '1.1rem', color: '#a3a3a3', fontWeight: '300' }}>
          Upload an image and get predictions instantly!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
        style={{
          marginBottom: '20px',
          padding: '20px',
          borderRadius: '15px',
          background: 'rgba(47, 47, 62, 0.7)',
          boxShadow: '0 4px 20px rgba(155, 89, 182, 0.5)',
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            fontSize: '1.5rem',
            color: '#9b59b6',
            marginBottom: '15px',
            fontWeight: '600',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          }}
        >
          Choose Your Model
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            fontSize: '1rem',
            color: '#a3a3a3',
            marginBottom: '20px',
            fontWeight: '300',
            letterSpacing: '0.5px',
          }}
        >
          Select a model to get the best predictions tailored to your needs!
        </motion.p>

        <motion.div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            flexWrap: 'wrap',
          }}
        >
          {['resnet50', 'mobilenet_v2', 'densenet169'].map((model) => (
            <motion.button
              key={model}
              onClick={() => setSelectedModel(model)}
              whileHover={{
                scale: 1.1,
                boxShadow: '0 5px 15px rgba(155, 89, 182, 0.6)',
              }}
              whileTap={{
                scale: 0.98,
                background: 'linear-gradient(to right, #9b59b6, #8e44ad)', // Color change on click
              }}
              transition={{ duration: 0.01 }}  // Faster hover transition
              style={{
                padding: '10px 20px',
                borderRadius: '25px',
                border: selectedModel === model ? '2px solid #9b59b6' : 'none',
                background:
                  selectedModel === model
                    ? 'linear-gradient(to right, #9b59b6, #8e44ad)' // Selected model's color
                    : 'rgba(47, 47, 62, 0.8)', // Non-selected button background
                color: '#ffffff',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
              }}
            >
              {model.toUpperCase()}
            </motion.button>
          ))}
        </motion.div>

      </motion.div>

      <motion.div
        style={{
          marginTop: '20px',
          width: '100%',
          height: '250px',
          border: '2px dashed rgba(155, 89, 182, 0.5)',
          borderRadius: '15px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          background: 'rgba(47, 47, 62, 0.7)',
        }}
        whileHover={{ borderColor: '#9b59b6', scale: 1.02 }}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        {imagePreview ? (
          <motion.img
            src={imagePreview}
            alt="Selected"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            whileHover={{ scale: 1.1 }}
          />
        ) : (
          <p style={{ fontSize: '1.1rem', color: '#a3a3a3', fontWeight: '300' }}>
            Click to upload an image
          </p>
        )}

        <input
          id="file-input"
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
      </motion.div>

      {isLoading ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            marginTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9b59b6',
          }}
        >
          <motion.div
            style={{
              width: '50px',
              height: '50px',
              border: '5px solid rgba(155, 89, 182, 0.3)',
              borderTop: '5px solid #9b59b6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </motion.div>
      ) : (
        imagePreview && (
          <motion.button
            onClick={getPrediction}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              marginTop: '20px',
              padding: '12px 24px',
              background: 'linear-gradient(to right, #9b59b6, #8e44ad)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '25px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(155, 89, 182, 0.5)',
            }}
          >
            Predict
          </motion.button>
        )
      )}

      {errorMessage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            marginTop: '15px',
            color: '#e74c3c',
            fontSize: '1rem',
            fontWeight: '400',
          }}
        >
          {errorMessage}
        </motion.div>
      )}

      {predictionResult && (
        <motion.div
          ref={resultsRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            marginTop: '25px',
            padding: '15px',
            borderRadius: '10px',
            background: 'rgba(47, 47, 62, 0.7)',
            color: '#ffffff',
          }}
        >
          <p style={{ marginBottom: '10px', fontSize: '1.2rem', fontWeight: '600' }}>
            Prediction Result:
          </p>
          <p style={{ fontSize: '1rem', fontWeight: '400' }}>
            <strong>Class:</strong> {predictionResult.predictedClass}
          </p>
          <p style={{ fontSize: '1rem', fontWeight: '400' }}>
            <strong>Confidence:</strong> {(predictionResult.confidence * 100).toFixed(2)}%
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Prediction;