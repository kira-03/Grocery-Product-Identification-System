'use client';

import { motion } from 'framer-motion';
import Prediction from './components/prediction'; // Ensure the path is correct

const Home: React.FC = () => {
  return (
    <div
      className="relative flex flex-col h-[100vh] items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url(/img.png)', // Reference the image from the public directory
        backgroundSize: 'cover', // Ensure the image covers the entire div
        backgroundPosition: 'center', // Center the background image
      }}
    >
      {/* Overlay for reducing intensity */}
      <div
        className="absolute inset-0 bg-black opacity-30" // Adjust opacity as needed
        style={{ mixBlendMode: 'multiply' }} // Optional: This helps blend the overlay with the background image
      />

<motion.h1
  className="text-4xl font-bold text-white mb-8 relative z-20 bg-black rounded-md p-4" // Added background, padding, and rounded corners
  initial={{ opacity: 0, y: -50 }} // Initial state for animation
  animate={{ opacity: 1, y: 0 }} // Final state for animation
  transition={{ duration: 0.5 }} // Animation duration
  style={{
    WebkitTextFillColor: 'white',
    WebkitTextStroke: '1px black', // Black outline effect
    fontWeight: 'bold',
  }}
>
  Product Identification
</motion.h1>


      <motion.div
        className="mt-6 w-full max-w-md relative z-20" // Keep it above the background
        initial={{ opacity: 0 }} // Initial state for animation
        animate={{ opacity: 1 }} // Final state for animation
        transition={{ duration: 0.5, delay: 0.4 }} // Animation duration and delay
      >
        <Prediction /> {/* Prediction component to display results */}
      </motion.div>
    </div>
  );
};

export default Home;
