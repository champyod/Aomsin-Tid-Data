# 📊 Data Science Project Plan: Car Sales Analysis

> **Project**: Aomsin-Tid-Data  
> **Dataset**: Raw Car Sales Data Set (Kaggle - Yukesh GK)  
> **Goal**: Build a predictive model for car sales analysis

---

## 📁 Dataset Overview

| File | Description | Size |
|------|-------------|------|
| `Cars.csv` | Car inventory data (ID, Brand, Model, Year, Color, Engine, Transmission, Price, Stock, Status) | ~500 records |
| `Customers.csv` | Customer information | ~235KB |
| `Sales.csv` | Sales transaction records | ~650KB |

---

## Phase 1: Data Cleaning 🧹

### 1.1 Load and Inspect Raw Data
- [x] Load all CSV files (`Cars.csv`, `Customers.csv`, `Sales.csv`)
- [x] Display first/last few rows of each dataset
- [x] Check data types with `df.dtypes`
- [x] Get basic statistics with `df.describe()` and `df.info()`

### 1.2 Handle Missing Values
- [x] Identify missing values with `df.isnull().sum()`
- [x] Visualize missing data patterns (e.g., using `missingno` library)
- [x] Strategy decisions:
  - **Numerical columns**: Impute with mean/median or drop
  - **Categorical columns**: Impute with mode or create "Unknown" category
  - **Critical IDs**: Drop rows with missing IDs
- [x] Document missing data in `Brand` column (rows with empty Brand observed in raw data)

### 1.3 Handle Duplicates
- [x] Check for duplicate rows: `df.duplicated().sum()`
- [x] Check for duplicate Car_IDs (e.g., C0182 appears twice)
- [x] Remove or flag duplicates based on business logic

### 1.4 Data Type Corrections
- [x] Ensure `Year` is integer type
- [x] Ensure `Price` is float type
- [x] Convert date columns to datetime format (if applicable)
- [x] Handle extra empty columns in Cars.csv (trailing commas)

### 1.5 Standardize Categorical Values
- [x] `Transmission` column: Standardize variants (`auto`, `A`, `M`, `manaul` → `Automatic`/`Manual`)
- [x] `Status` column: Verify only valid values (`Available`, `Reserved`, `Sold`)
- [x] `Engine_Type`: Ensure consistent naming (`Petrol`, `Diesel`, `Electric`, `Hybrid`)

### 1.6 Save Cleaned Data
- [x] Export cleaned datasets to `data/cleaned/` directory
- [x] Document all cleaning steps performed

---

## Phase 2: EDA 📈

- [ ] Correlation matrices
- [ ] etc.

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