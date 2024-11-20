import React from 'react';
import { motion } from 'framer-motion'; // Ensure you have this import if you want to use motion

// Define props for the ModelSelection component
interface ModelSelectionProps {
  selectedModel: string; // Type for selectedModel
  setSelectedModel: (model: string) => void; // Type for the setSelectedModel function
}

// Define a model type for better type safety
interface Model {
  value: string;
  label: string;
}

const ModelSelection: React.FC<ModelSelectionProps> = ({ selectedModel, setSelectedModel }) => {
  // Array of models for dynamic rendering with explicit type
  const models: Model[] = [
    { value: 'mobilenet_v2', label: 'Mobilenet_v2' },
    { value: 'resnet50', label: 'ResNet50' },
    { value: 'densenet169', label: 'DenseNet169' },
  ];

  return (
    <div className="my-4">
  <label htmlFor="model" className="block text-2xl font-bold text-white"> {/* Changed text-lg to text-xl */}
    Select Model:
  </label>


      
      {/* Using motion for animation, similar to the heading */}
      <motion.select
        id="model"
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
        className="mt-2 p-2 w-full bg-black border border-black rounded-lg shadow-lg"
        initial={{ opacity: 0 }} // Initial state for animation
        animate={{ opacity: 1 }} // Final state for animation
        transition={{ duration: 0.5 }} // Animation duration
        style={{ 
          WebkitTextFillColor: 'white', 
          WebkitTextStroke: '1px black', // Black outline effect
          fontWeight: 'bold',
        }}
      >
        {models.map((model) => (
          <option 
            key={model.value} 
            value={model.value}
            style={{ 
              WebkitTextFillColor: 'white', 
              WebkitTextStroke: '1px black', // Black outline effect
              fontWeight: 'bold',
            }}
          >
            {model.label}
          </option>
        ))}
      </motion.select>
    </div>
  );
};

export default ModelSelection;
