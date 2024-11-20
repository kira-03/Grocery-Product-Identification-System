import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Import Next.js Image component

// Define props for the ImageUploader component
interface ImageUploaderProps {
  setImage: (file: File) => void; // Type for the setImage function
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ setImage }) => {
  const [preview, setPreview] = useState<string | null>(null); // State to hold the image preview
  const [error, setError] = useState<string | null>(null); // State to hold error messages

  // Type for the event is React.ChangeEvent<HTMLInputElement>
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Use optional chaining to safely access the first file
    if (file) {
      if (file.type.startsWith('image/')) { // Check if the selected file is an image
        setImage(file); // Call the setImage function to pass the file to the parent component
        setPreview(URL.createObjectURL(file)); // Create a preview URL for the selected image
        setError(null); // Reset any previous error
      } else {
        setError('Please upload a valid image file.'); // Set an error message for invalid file type
      }
    } else {
      setError('No file selected.'); // Set an error message if no file is selected
    }
  };

  // Cleanup object URL when the component unmounts
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="my-4">
      <label htmlFor="image-upload" className="block text-lg font-medium text-white">Upload an Image:</label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mt-2 p-2 w-full bg-gray-800 text-white border border-gray-700 rounded-lg"
      />
      {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error messages */}
      {preview && (
        <div className="mt-4 relative w-full h-64"> {/* Set a height for the preview container */}
          <Image 
            src={preview} 
            alt="Image Preview" 
            layout="fill" 
            objectFit="contain" // Adjust the fit as needed
            className="border border-gray-700 rounded-lg" 
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
