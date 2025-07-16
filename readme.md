# 🏠 Bangalore House Price Prediction

A full-stack machine learning project that predicts the price of a house in Bangalore based on key features such as location, area type, BHK, bathrooms, and square footage. This project combines data cleaning, feature engineering, regression modeling, and a web interface built using **FastAPI** for the backend and **HTML/CSS/JavaScript** for the frontend.

---

## 🚀 Project Overview

This project takes a real-world housing dataset from Kaggle and walks through the complete lifecycle of a machine learning model — from data preprocessing and model training to deployment via a modern web API.

---

## 📊 Dataset

* **Source**: [Kaggle - Bangalore House Price Dataset](https://www.kaggle.com/datasets/amitabhajoy/bengaluru-house-price-data)
* **Description**: The dataset contains various features of houses in Bangalore, including:

  * Area Type
  * Availability
  * Location
  * Size
  * Total Square Feet
  * Bath
  * Price

---

## 🧹 Data Cleaning & Preprocessing

* Removed irrelevant and null columns
* Extracted numerical values from mixed-format columns (e.g., converting "2100 - 2850" sqft range to a mean value)
* Dropped rows with extreme or inconsistent entries

---

## 🛠️ Feature Engineering

* Converted BHK from text to numeric
* Engineered new features such as **price per square foot**
* Removed outliers based on domain knowledge (e.g., properties with unrealistic price/sqft ratios)

---

## 🧪 Outlier Removal

* Dropped price-per-square-foot and BHK anomalies using grouped statistics and logic
* Ensured a cleaner training set to improve model accuracy

---

## 🧬 Categorical Encoding

* **Label Encoding** for `area_type`
* **One-Hot Encoding** for `location` using Pandas’ `get_dummies()`

---

## 📈 Model Training

* Used **Linear Regression** as the base model
* Split the dataset into training and testing sets using `train_test_split` with an 80-20 ratio
* Achieved a solid R² score and low RMSE on the test set

---

## 🧠 Model Serialization

* Trained model was saved as `model.pkl` using Python’s `pickle` module
* Feature column metadata saved as `columns.json` for consistent inference during deployment

---

## 🧰️ Backend - FastAPI

* A lightweight, high-performance API was built using **FastAPI**
* Endpoints:

  * `POST /predict`: Accepts house features and returns predicted price
* On request:

  * Loads `model.pkl` and `columns.json`
  * Maps user input to model features
  * Returns a prediction rounded to 2 decimal places

---

## 🌐 Frontend

* Built using **HTML, CSS, and Vanilla JavaScript**
* Inputs collected from users:

  * `sqft`, `BHK`, `bathrooms`, `area_type`, `location`
* On submission:

  * Sends a POST request to FastAPI backend
  * Displays the predicted price in INR using Indian number formatting

---

## 📦 Project Structure

```
├── model.pkl
├── columns.json
├── backend/
│   ├── main.py           # FastAPI app
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── data/
│   └── Bangalore_House_Data.csv
├── notebooks/
│   └── data_cleaning_and_model_training.ipynb
└── README.md
```

---

## 📌 How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/house-price-predictor.git
cd house-price-predictor
```

### 2. Set Up Python Environment

```bash
pip install -r requirements.txt
```

### 3. Start the FastAPI Server

```bash
uvicorn backend.main:app --reload
```

### 4. Open Frontend

Open `frontend/index.html` in your browser.

---

## ✅ Tech Stack

* **Language**: Python, JavaScript
* **Frontend**: HTML5, CSS3, JS
* **Backend**: FastAPI
* **ML Model**: Scikit-learn (Linear Regression)
* **Deployment**: Localhost / Render / (or your deployment platform of choice)

---

## 📊 Future Improvements

* Add multiple model options (Ridge, Lasso, XGBoost)
* Implement user-based search filters
* Add authentication (user login/session)
* Deploy on cloud using AWS/GCP + CI/CD

---

## 📜 License

MIT License. Feel free to fork and build on top of this project.

---

## 🙌 Acknowledgements

* Kaggle for the dataset
* Scikit-learn and Pandas teams
* FastAPI for the blazing-fast backend
