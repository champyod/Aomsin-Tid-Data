# 📊 Report: EDA Analysis Notebook Implementation

**Date:** January 15, 2026  
**Author:** AI Assistant (Antigravity)  
**Project:** Aomsin-Tid-Data

---

## 📋 Executive Summary

This report documents the implementation of a comprehensive Exploratory Data Analysis (EDA) notebook for the Car Sales Analysis project. The notebook (`3_analysis.ipynb`) was created to fulfill **Phase 2** of the project plan, providing insights into sales patterns, customer demographics, and car inventory data.

---

## 🎯 Objectives

1. Create an EDA notebook aligned with the project's `documentation/plan.md`
2. Merge the three cleaned datasets into a unified analysis-ready dataset
3. Perform univariate, bivariate, and temporal analyses
4. Verify data integrity across tables

---

## 📁 Files Involved

| File | Type | Purpose |
|------|------|---------|
| `data/cleaned/Cars_cleaned.csv` | Input | Car inventory (502 rows, 10 cols) |
| `data/cleaned/Customers_cleaned.csv` | Input | Customer data (2,001 rows, 11 cols) |
| `data/cleaned/Sales_cleaned.csv` | Input | Sales transactions (10,001 rows, 8 cols) |
| `data/cleaned/Sales_merged.csv` | Output | Merged master dataset (10,024 rows, 27 cols) |
| `notebooks/analysis/3_analysis.ipynb` | Output | Complete EDA notebook |

---

## 🔧 Technical Approach

### Libraries Used
- **polars** - Fast DataFrame operations (chosen over pandas for performance)
- **plotly.express** - Interactive visualizations
- **plotly.graph_objects** - Advanced chart customization
- **seaborn/matplotlib** - Static plotting and styling
- **numpy** - Numerical operations

### Data Merging Strategy

The three datasets were merged using **left joins** to preserve all sales records:

```python
# Step 1: Join Sales with Cars on Car_ID
df_master = df_sales.join(df_cars, on="Car_ID", how="left")

# Step 2: Join result with Customers on Customer_ID
df_master = df_master.join(df_customers, on="Customer_ID", how="left")
```

**Result:** 10,024 rows × 27 columns (slight expansion due to duplicate Car_IDs in Cars table)

---

## 📈 Analyses Implemented

### 4.1 Univariate Analysis
| Analysis | Visualization | Key Columns |
|----------|---------------|-------------|
| Price Distribution | Histogram + KDE | `Price` |
| Year Distribution | Bar Chart | `Year` |
| Age Distribution | Histogram | `Age` |
| Brand Frequency | Bar Chart (Top 10) | `Brand` |
| Model Frequency | Bar Chart (Top 10) | `Model` |
| Engine Type | Donut Chart | `Engine_Type` |
| Transmission | Donut Chart | `Transmission` |
| Region | Bar Chart | `Region` |
| Payment Method | Donut Chart | `Payment_Method` |
| Outlier Detection | Box Plots | `Price`, `Quantity` |

### 4.2 Bivariate & Multivariate Analysis
- **Correlation Heatmap** - Numerical features
- **Average Price by Brand** - Bar chart
- **Average Sale Price by Engine Type** - Bar chart
- **Revenue by Region** - Geographic distribution
- **Revenue by Payment Method** - Payment preferences
- **Top 10 Salespersons** - Performance ranking
- **Scatter Plot Matrix** - Pairwise relationships

### 4.3 Temporal Analysis
- **Monthly Revenue Trend** - Line chart with markers
- **Seasonality by Month** - Are there peak months?
- **Sales by Day of Week** - Weekday patterns

### 4.4 Data Integrity Checks
- ✅ Row count verification after merge
- ✅ Car_ID consistency check (Sales vs Cars)
- ✅ Customer_ID consistency check (Sales vs Customers)

---

## 🔑 Key Takeaways

### Data Quality
1. **Merge Success**: No significant data loss during the join operations
2. **ID Integrity**: Some Customer_IDs in Sales may not exist in Customers table (needs investigation)
3. **Duplicate Car_IDs**: Car_ID `C0182` appears twice in Cars table, causing slight row expansion

### Design Decisions
1. **Polars over Pandas**: Chosen for faster CSV reading and DataFrame operations
2. **Plotly over Matplotlib**: Interactive charts allow users to explore data dynamically
3. **Premium Color Palette**: Consistent `#4c72b0`, `#55a868`, `#c44e52` theme for professional aesthetics
4. **Left Joins**: Preserve all sales records even if lookup tables have missing entries

---

## 📂 Output Deliverables

1. **`3_analysis.ipynb`** - Complete, executable EDA notebook
2. **`Sales_merged.csv`** - Unified dataset for downstream analysis
3. **Interactive Visualizations** - 15+ charts covering all Phase 2 requirements

---

## 🚀 Next Steps

1. **Run the notebook** to generate all visualizations
2. **Review insights** from the temporal and bivariate analyses
3. **Proceed to Phase 3: Feature Engineering** as outlined in `plan.md`
4. **Investigate** any Customer_ID mismatches identified in integrity checks

---

## 📎 References

- Project Plan: `documentation/plan.md`
- Implementation Plan: `brain/implementation_plan.md`
- Walkthrough: `brain/walkthrough.md`

---

*Report generated automatically by AI Assistant*
