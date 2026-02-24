# 📊 Data Science Project Plan: Car Sales Analysis

> **Project**: Aomsin-Tid-Data
> **Dataset**: Raw Car Sales Data Set (Kaggle - Yukesh GK)
> **Goal**: Build a predictive model for car sales analysis

---

## 📁 Dataset Overview

| File | Description | Size |
|------|-------------|------|
| `car_sales_data.csv` | Consolidated car sales records (Manufacturer, Model, Engine size, Fuel type, Year, Mileage, Price) | ~50k records |

---

## Phase 1: Data Cleaning 🧹

### 1.1 Load and Inspect Raw Data
- [x] Load `car_sales_data.csv` using Polars.
- [x] Inspect schema and basic shapes.

### 1.2 Anomaly Detection
- [x] **Duplicate Detection**: Identify exact row duplicates (e.g., identical car specs and price).
- [x] **Casting Checks**: Attempt casting to numeric types to identify non-conformant data (turns to Null).
- [x] **Null Verification**: Inspect rows with Nulls after casting to distinguish between missing data and bad data.

### 1.3 Data Transformations
- [x] **String Standardization**:
    - Title Case for `Manufacturer` and `Fuel type`.
    - Strip whitespace from all string columns.
- [x] **Type Casting**:
    - `Engine size` -> Float
    - `Year` -> Int
    - `Mileage` -> Int
    - `Price` -> Float
- [x] **Deduplication**: Remove exact duplicates.
- [x] **Null Handling**: Drop invalid rows.

### 1.4 Save Cleaned Data
- [x] Export cleaned dataset to `data/cleaned/car_sales_data_cleaned.csv`.

---

## Phase 2: Exploratory Data Analysis 📈

### 2.1 Univariate Analysis
- [ ] **Numerical Distributions**: Histograms and KDE plots for `Price`, `Year of manufacture`, `Mileage`, and `Engine size`.
- [ ] **Categorical Frequencies**: Bar charts for `Manufacturer`, `Model`, `Fuel type`.
- [ ] **Outlier Detection**: Box plots to identify anomalies in `Price`, `Mileage`, and `Engine size`.

### 2.2 Bivariate & Multivariate Analysis
- [ ] **Correlation Analysis**: Heatmap to identify linear relationships between numerical features (`Price`, `Mileage`, `Year`, `Engine size`).
- [ ] **Price Analysis by Category**:
    - Average `Price` per `Manufacturer` and `Fuel type`.
    - Price distributions by `Model`.
- [ ] **Scatter Plots**:
    - `Price` vs. `Mileage` (Depreciation check).
    - `Price` vs. `Engine size` (Performance premium check).

### 2.3 Temporal Analysis
- [ ] **Price Trends**: Analyze average price by `Year of manufacture`.
- [ ] **Depreciation Curve**: Plot `Price` against Age (Derived from `Year`).

### 2.4 Data Quality Check
- [ ] **Category Consistency**: Verify spelling/casing consistency across `Manufacturer` and `Model`.
- [ ] **Logical Validity**: Check for impossible combinations (e.g., negative mileage, future years).

---

## Phase 3: Feature Engineering 🔧

- [x] Apply Principal Component Analysis (PCA) to numerical features (`Year of manufacture`, `Mileage`, `Engine size`) to reduce dimensionality if needed.
- [x] Implement feature scaling (`StandardScaler` or `MinMaxScaler`) for continuous numerical variables (`Year of manufacture`, `Mileage`, `Engine size`, `Price`).
- [x] Perform One-Hot Encoding for low-cardinality nominal variables (`Fuel type`).
- [x] Utilize Target Encoding (`TargetEncoder`) for high-cardinality categorical variables (`Manufacturer`, `Model`).
- [x] Conduct feature selection (`SelectKBest` or RFE) to identify the most predictive variables.
- [x] Generate Polynomial Features for selected numerical variables (`Year of manufacture`, `Mileage`) to capture non-linear relationships.
- [x] Apply Log Transformations to skewed numerical data (`Price`, `Mileage`, `Engine size`) to normalize distributions.
- [x] Perform Binning/Discretization on continuous variables (`Year of manufacture`, `Mileage`, `Engine size`) to create categorical intervals/groups.
- [x] Create Interaction Features between key variables (e.g., `Age` × `Mileage`, `Engine size` × `Fuel type`).

---

## Phase 4: Training the Model 🤖

- [x] HistGradientBoostingRegressor (sklearn)
- [x] XGBoost
- [x] LightGBM
- [x] Random Forest
- [x] AdaBoost
- [x] Gradient Boosting
- [x] Decision Tree
- [x] Linear Regression
- [x] Polynomial Regression
- [x] Ridge Regression
- [x] Lasso Regression
- [x] ElasticNet
- [x] Support Vector Regression (SVR)
- [x] K-Nearest Neighbors (KNN)
- [x] Ensemble

### Metrics
- [x] RMSE (Root Mean Squared Error)
- [x] MAE (Mean Absolute Error)
- [x] Adjusted R²

---

## Phase 5: Save Model and Predict 💾

- [x] Save model
- [x] Predict

### Metrics
- [x] RMSE (Root Mean Squared Error)
- [x] MAE (Mean Absolute Error)
- [x] Adjusted R²

---

## Phase 6: Get Result 📋

- [x] Get result

### Metrics
- [x] RMSE (Root Mean Squared Error)
- [x] MAE (Mean Absolute Error)
- [x] Adjusted R²

---
