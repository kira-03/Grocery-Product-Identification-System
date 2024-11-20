# Full-Stack Grocery Product Classifier

This project serves as a **base model** for an image-based grocery product identification system. It leverages pre-trained **TensorFlow models** (ResNet50, MobileNetV2, and DenseNet169) to classify images of grocery products with high accuracy. We developed this base model out of our interest and fascination with concepts like **Amazon Go** and other automated systems. Our goal was to explore the potential of integrating computer vision and machine learning into real-world applications like automatic stock refilling and seamless payments.

## Features

- **Full-Stack Application**: Includes both the frontend and backend, providing an end-to-end solution for grocery product identification.
- **TensorFlow Models**: Uses advanced models (ResNet50, MobileNetV2, and DenseNet169) to classify images and predict the correct product.
- **Image Processing**: Optimized image preprocessing for fast and accurate predictions.
- **FastAPI Backend**: A FastAPI server that serves the models and handles all predictions.
- **React Frontend**: A simple, user-friendly interface that allows easy image uploads and model selection.

## Usage

### Running the Application

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/kira-03/Grocery-Product-Identification-System.git
    cd Grocery-Product-Identification-System
    ```

2. **Backend Setup (FastAPI)**:
   - Install required dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Run the FastAPI backend:
     ```bash
     uvicorn app:app --reload
     ```

3. **Frontend Setup (React)**:
   - Navigate to the frontend directory and install dependencies:
     ```bash
     cd frontend
     npm install
     ```
   - Start the React application:
     ```bash
     npm start
     ```

4. Open your browser and visit `http://localhost:3000` to interact with the app.

### Workflow

- **Select a Model**: Choose from ResNet50, MobileNetV2, or DenseNet169 for image classification.
- **Upload an Image**: Upload a photo of a grocery product to receive predictions.
- **View Prediction**: The predicted class and confidence score will be displayed.

## Features to Explore

This system is designed as a **base model** with plenty of potential for expansion. As we were inspired by advanced concepts like **Amazon Go** and other automated store systems, we believe this base model can be evolved into more advanced functionalities such as:

- **Stock Refilling**: With product identification, the system can be adapted to monitor inventory levels, automatically triggering stock refills when products run low.
- **Automatic Payment**: Inspired by Amazon Go, we envision integrating a system where products are recognized as customers pick them, and the payment process is automated as they leave the store.

These advanced features require further development and refinement, but this base model is a crucial starting point.

## Technologies Used

- **Frontend**: 
  - React.js for the user interface
  - Tailwind CSS for styling
  - Framer Motion for animations
  
- **Backend**:
  - FastAPI for a fast and efficient backend
  - TensorFlow for machine learning models and predictions
  - OpenCV for image preprocessing
  - PIL (Python Imaging Library) for image handling
  
## Future Enhancements

As a **base model**, this project has a lot of room for enhancement:

- **Stock Monitoring & Refill**: Integrating the product identification system with inventory management to automatically reorder products when stock levels are low.
- **Automated Payment System**: Creating a seamless checkout experience where customers are charged automatically as they leave the store, based on product identification.

We’re excited about these possibilities and will continue to explore how the system can be extended to achieve these advanced functionalities.

## Contributing

Feel free to fork the repository, submit issues, or create pull requests. If you’re interested in enhancing the project or exploring any of the ideas above, we welcome your contributions!
