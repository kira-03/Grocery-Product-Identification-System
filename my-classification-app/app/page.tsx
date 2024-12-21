'use client';

import { motion } from 'framer-motion';
import Prediction from './components/prediction';
import BackgroundGradientAnimation from './components/BackgroundGradientAnimation';

// Importing Google Fonts
import '@fontsource/poppins'; // Ensure this is installed via npm/yarn

const Home: React.FC = () => {
  return (
    <div className="min-h-screen relative">
      {/* Background wrapper that takes full height */}
      <div className="fixed inset-0">
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(20, 20, 30)"
          gradientBackgroundEnd="rgb(10, 10, 20)"
          firstColor="18, 113, 255"
          secondColor="221, 74, 255"
          thirdColor="100, 220, 255"
          fourthColor="200, 50, 50"
          fifthColor="180, 180, 50"
          pointerColor="140, 100, 255"
          size="55%"
          blendingValue="hard-light"
          animationSpeed="9s"
        />
      </div>

      {/* Content wrapper that allows scrolling */}
      <div className="relative min-h-screen">
        <div className="flex flex-col items-center justify-start w-full px-4 py-8">
          {/* Title with light purplish shade and custom font */}
          <motion.h1
            className="text-5xl font-bold relative z-20 mb-8"
            style={{
              color: '#a873d1', // Light purplish shade
              fontFamily: '"Poppins", sans-serif', // Font set to Poppins
            }}
            initial={{
              opacity: 0,
              y: -50,
              scale: 1.1,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                opacity: { duration: 0.6 },
                scale: { duration: 0.5 },
                y: { duration: 0.5, ease: 'easeOut' },
              },
            }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3 },
            }}
          >
            Product Identification System
          </motion.h1>

          {/* Prediction Component */}
          <motion.div
            className="mt-6 w-full max-w-lg relative z-20 bg-gray-800 p-6 rounded-lg shadow-lg shadow-indigo-500/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Prediction />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
