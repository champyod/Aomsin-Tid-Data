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
- [x] Export cleaned dataset to `data/car_sales_data_cleaned.csv`.

---

## Phase 2: Exploratory Data Analysis 📈

### 2.1 Univariate Analysis
- [ ] **Numerical Distributions**: Histograms and KDE plots for `Price`, `Year`, and customer `Age`
- [ ] **Categorical Frequencies**: Bar charts for `Brand`, `Model`, `Engine_Type`, `Transmission`, and `Region`
- [ ] **Outlier Detection**: Box plots to identify anomalies in `Price` and `Quantity`

### 2.2 Bivariate & Multivariate Analysis
- [ ] **Correlation Analysis**: Heatmap to identify linear relationships between numerical features
- [ ] **Sales Performance by Category**: 
    - Average `Price` per `Brand` and `Engine_Type`
    - Sales volume per `Region` and `Payment_Method`
- [ ] **Scatter Plot Matrix**: Pairwise relationships to identify clusters or non-linear patterns

### 2.3 Temporal Analysis (Time-Series)
- [ ] **Sales Trends**: Line plots of sales volume and revenue over time
- [ ] **Seasonality**: Analyze sales patterns by month/quarter or day of the week

### 2.4 Data Integrity Check
- [ ] **Data Shape Verify**: Confirm row/column counts across joins
- [ ] **Cross-Table Consistency**: Ensure `Car_ID` and `Customer_ID` integrity between `Sales` and primary tables

---

## Phase 3: Feature Engineering 🔧

- [ ] Apply Principal Component Analysis (PCA) to numerical features (`Year`, `Price`, `Quantity_In_Stock` from `Cars_cleaned.csv`, `Age` from `Customers_cleaned.csv`, `Quantity`, `Sale_Price` from `Sales_cleaned.csv`) to reduce dimensionality.
- [ ] Implement feature scaling (`StandardScaler` or `MinMaxScaler`) for continuous numerical variables (`Year`, `Price`, `Quantity_In_Stock`, `Age`, `Quantity`, `Sale_Price`).
- [ ] Perform One-Hot Encoding for nominal categorical variables (`Brand`, `Model`, `Color`, `Engine_Type`, `Transmission`, `Status`, `Gender`, `Region`, `Payment_Method`).
- [ ] Utilize Label Encoding for ordinal or high-cardinality categorical variables (`Brand`, `Model`, `Color`, `Engine_Type`, `Transmission`, `Status`, `Gender`, `State`, `Region`, `Payment_Method`).
- [ ] Use Target Encoding for high-cardinality features (`Brand`, `Model`, `Salesperson`) by replacing categories with the mean outcome.
- [ ] Conduct feature selection (`SelectKBest` or RFE) across numerical features to identify the most predictive variables.
- [ ] Generate Polynomial Features for selected numerical variables (`Year`, `Price`, `Age`, `Quantity`) to capture non-linear relationships.
- [ ] Apply Log Transformations to skewed numerical data (`Price`, `Sale_Price`, `Quantity_In_Stock`) to normalize distributions.
- [ ] Perform Binning/Discretization on continuous variables (`Age`, `Price`, `Year`, `Quantity_In_Stock`) to create categorical intervals.
- [ ] Create Interaction Features between key variables (e.g., `Year` × `Brand`, `Engine_Type` × `Transmission`, `Age` × `Region`).

---

## Phase 4: Training the Model 🤖

- [ ] CatBoost
- [ ] XGBoost
- [ ] LightGBM
- [ ] Random Forest
- [ ] AdaBoost
- [ ] Gradient Boosting
- [ ] Decision Tree
- [ ] Linear Regression
- [ ] Polynomial Regression
- [ ] Ridge Regression
- [ ] Lasso Regression
- [ ] ElasticNet
- [ ] Support Vector Regression (SVR)
- [ ] K-Nearest Neighbors (KNN)
- [ ] **Ultimate Model Emsemble of L.O.V.E.**

### Metrics
- [ ] RMSE (Root Mean Squared Error)
- [ ] MAE (Mean Absolute Error)
- [ ] Adjusted R²

---

## Phase 5: Save Model and Predict 💾

- [ ] Save model
- [ ] Predict

### Metrics
- [ ] RMSE (Root Mean Squared Error)
- [ ] MAE (Mean Absolute Error)
- [ ] Adjusted R²

---

## Phase 6: Get Result 📋

- [ ] Get result

### Metrics
- [ ] RMSE (Root Mean Squared Error)
- [ ] MAE (Mean Absolute Error)
- [ ] Adjusted R²

---