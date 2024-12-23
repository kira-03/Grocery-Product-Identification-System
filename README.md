# Grocery Product Identification System

An advanced image-based grocery product identification system using pre-trained TensorFlow models (ResNet50, MobileNetV2, and DenseNet169). Inspired by Amazon Go, this project combines computer vision and machine learning for automated stock monitoring and seamless payments.

## 🚀 Features

- **End-to-End Full-Stack Solution**: React frontend with FastAPI backend
- **Pre-trained TensorFlow Models**: ResNet50, MobileNetV2, and DenseNet169 for high-accuracy classification
- **Optimized Image Processing**: Combined OpenCV and PIL for efficient preprocessing
- **Custom Model Selection**: Multiple models for tailored predictions based on accuracy/speed needs

## 🌐 Demo

Click the image below to watch the live demo:

[![Demo Thumbnail](https://github.com/kira-03/Grocery-Product-Identification-System/blob/main/my-classification-app/Landing%20Page.png)](https://youtu.be/S112_SrtCnQ)

## 💻 Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/kira-03/Grocery-Product-Identification-System.git
cd Grocery-Product-Identification-System
```

### 2. Backend Setup (FastAPI)
```bash
pip install -r requirements.txt
uvicorn app:app --reload
```

### 3. Frontend Setup (React)
```bash
cd my-classification-app
npm install
npm start
```

### 4. Access Application
Open `http://localhost:3000` in your browser

## 🔄 Workflow

1. **Select Model**: Choose between ResNet50, MobileNetV2, or DenseNet169
2. **Upload Image**: Submit grocery product image for prediction
3. **View Results**: See predicted class and confidence score

## 🛠️ Technology Stack

### Frontend
- **React.js**: Interactive user interface
- **Tailwind CSS**: Modern, responsive styling
- **Framer Motion**: Fluid animations

### Backend
- **FastAPI**: High-performance framework
- **TensorFlow**: Machine learning models
- **OpenCV & PIL**: Image preprocessing

## 🌟 Extended Features

- **Stock Monitoring & Refill**: Automated inventory tracking and restocking
- **Automated Payments**: Seamless checkout through product recognition
- **Inventory Management**: Real-time stock level monitoring

## 🚧 Future Enhancements

- Automated inventory monitoring with reorder triggers
- Seamless checkout system implementation
- Enhanced model accuracy with advanced architectures

## 🤝 Contributing

We welcome contributions! Feel free to:
- Fork the repository
- Create issues
- Submit pull requests
