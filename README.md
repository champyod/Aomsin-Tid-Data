# Aomsin Tid Data: Second-Hand Car Sales Analytics Platform

A comprehensive data science project for analyzing second-hand car sales, featuring advanced machine learning models, exploratory data analysis, and an interactive web dashboard for data visualization.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.12+](https://img.shields.io/badge/python-3.12+-blue.svg)](https://www.python.org/downloads/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Dataset](#dataset)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Workflow](#workflow)
- [Dashboard](#dashboard)
- [Development](#development)
- [CI/CD Pipeline](#cicd-pipeline)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This project implements a complete data science pipeline for analyzing second-hand car sales data, including:

1. **Data Preprocessing**: Cleaning, transformation, and feature engineering
2. **Exploratory Data Analysis (EDA)**: Statistical analysis and visualization
3. **Machine Learning**: Predictive modeling with XGBoost and model evaluation
4. **Interactive Dashboard**: Next.js-based web application for data visualization

The system is designed to provide actionable insights into automotive market trends, pricing patterns, and predictive analytics for second-hand vehicle valuations.

---

## Dataset

### Source

**Mock Dataset of Second Hand Car Sales**

- **Provider**: Mohammad Saleh Nematbakhsh Behdani
- **Platform**: Kaggle
- **URL**: [https://www.kaggle.com/datasets/msnbehdani/mock-dataset-of-second-hand-car-sales](https://www.kaggle.com/datasets/msnbehdani/mock-dataset-of-second-hand-car-sales)

### Dataset Description

The dataset contains comprehensive information about second-hand car sales, including:

- **Vehicle Attributes**: Make, model, year, mileage, engine specifications
- **Sales Information**: Price, transaction date, location
- **Customer Demographics**: Buyer information and preferences
- **Market Indicators**: Regional trends, seasonal patterns

### Citation

We acknowledge and credit Mohammad Saleh Nematbakhsh Behdani for providing this dataset, which enables the analytical capabilities of this project.

```
Behdani, M. S. N. (2024). Mock Dataset of Second Hand Car Sales.
Kaggle. https://www.kaggle.com/datasets/msnbehdani/mock-dataset-of-second-hand-car-sales
```

---

## Features

### Data Processing
- ✅ Automated data cleaning and validation
- ✅ Feature engineering and transformation
- ✅ Missing value imputation strategies
- ✅ Outlier detection and handling

### Analysis
- 📊 Comprehensive exploratory data analysis (EDA)
- 📈 Statistical hypothesis testing
- 🔍 Correlation analysis and feature importance
- 📉 Time series trend analysis

### Machine Learning
- 🤖 XGBoost regression models for price prediction
- 🎯 Hyperparameter optimization
- 📊 Model performance evaluation (R², RMSE, MAE)
- 🧪 Train/test split with cross-validation

### Dashboard
- 🌐 Interactive Next.js web application
- 🎨 Catppuccin Mocha Pink themed UI
- 📱 Responsive design for all devices
- 📊 Dynamic chart generation (7+ chart types)
- 🔄 Real-time data updates

### Infrastructure
- 🚀 Automated CI/CD pipeline with GitHub Actions
- 📦 UV package manager for fast dependency resolution
- 🐍 Python 3.12+ with modern tooling
- 🎨 Next.js 15 with Tailwind CSS 4

---

## Project Structure

```
aomsin-tid-data/
├── .github/
│   └── workflows/
│       └── main.yml                    # CI/CD pipeline configuration
│
├── dashboard/                          # Next.js dashboard application
│   ├── public/
│   │   └── data/                       # Generated TOML data files
│   │       ├── general/                # Overview page data
│   │       ├── analysis/               # Analysis page data
│   │       ├── data/                   # Data explorer page data
│   │       └── modeling/               # Model performance data
│   ├── src/
│   │   ├── app/
│   │   │   ├── globals.css             # Catppuccin theme definitions
│   │   │   ├── page.tsx                # Overview page
│   │   │   ├── analysis/               # Analysis page
│   │   │   ├── data/                   # Data explorer page
│   │   │   └── modeling/               # Modeling page
│   │   ├── components/
│   │   │   ├── UniversalChart.tsx      # Chart rendering component
│   │   │   └── ui/                     # UI components
│   │   └── utils/
│   │       ├── basePath.ts             # Base path configuration
│   │       └── tomlLoader.ts           # TOML file loader
│   └── package.json
│
├── data/                               # Data directory (gitignored except raw/)
│   ├── raw/                            # Raw datasets (tracked)
│   ├── cleaned/                        # Cleaned datasets (generated)
│   ├── analysis/                       # Analysis outputs (generated)
│   ├── modeling/                       # Model outputs (generated)
│   └── general/                        # General metrics (generated)
│
├── notebooks/                          # Jupyter notebooks
│   ├── preprocessing/
│   │   └── 1_cleaning.ipynb            # Data cleaning pipeline
│   ├── analysis/
│   │   └── 2_analysis.ipynb            # Exploratory data analysis
│   └── modeling/
│       ├── train/
│       │   └── 3_model_training.ipynb  # Model training
│       └── test/
│           └── 4_model_testing.ipynb   # Model evaluation
│
├── src/
│   └── utils/
│       └── data_manager.py             # Data management utilities
│
├── documentation/
│   ├── data_integration_guide.md       # Dashboard integration guide
│   ├── plan.md                         # Project planning document
│   └── Report.md                       # Analysis report
│
├── .gitattributes                      # Git attributes for notebook filtering
├── .gitignore                          # Git ignore patterns
├── .pre-commit-config.yaml             # Pre-commit hooks configuration
├── pyproject.toml                      # Python project configuration
├── uv.lock                             # UV lock file
└── README.md                           # This file
```

---

## Installation

### Prerequisites

- **Python**: 3.12 or higher
- **Node.js**: 18.0 or higher
- **Bun**: Latest version (for dashboard)
- **UV**: Package manager for Python

### Step 1: Clone Repository

```bash
git clone https://github.com/champyod/Aomsin-Tid-Data.git
cd Aomsin-Tid-Data
```

### Step 2: Install UV Package Manager

**Linux/macOS:**
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

**Windows (PowerShell):**
```powershell
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

**Using pip:**
```bash
pip install uv
```

### Step 3: Setup Python Environment

```bash
# Install dependencies and create virtual environment
uv sync

# Activate virtual environment
# On Linux/macOS:
source .venv/bin/activate

# On Windows:
.venv\Scripts\activate
```

### Step 4: Install Pre-commit Hooks

```bash
# Install nbstripout for notebook output management
uv pip install nbstripout pre-commit

# Setup git filters
nbstripout --install

# Install pre-commit hooks
pre-commit install
```

### Step 5: Setup Dashboard (Optional)

```bash
cd dashboard

# Install Bun (if not already installed)
curl -fsSL https://bun.sh/install | bash

# Install dependencies
bun install

# Return to project root
cd ..
```

---

## Usage

### Running Jupyter Notebooks

The analysis pipeline consists of four sequential notebooks:

#### 1. Data Cleaning
```bash
uv run jupyter notebook notebooks/preprocessing/1_cleaning.ipynb
```

Performs data cleaning, validation, and preprocessing.

#### 2. Exploratory Data Analysis
```bash
uv run jupyter notebook notebooks/analysis/2_analysis.ipynb
```

Generates statistical analyses, visualizations, and dashboard data.

#### 3. Model Training
```bash
uv run jupyter notebook notebooks/modeling/train/3_model_training.ipynb
```

Trains machine learning models and optimizes hyperparameters.

#### 4. Model Testing
```bash
uv run jupyter notebook notebooks/modeling/test/4_model_testing.ipynb
```

Evaluates model performance and generates predictions.

#### Alternative: JupyterLab

```bash
uv run jupyter lab
```

### Running the Dashboard

#### Development Mode

```bash
cd dashboard
bun run dev
```

Access at: [http://localhost:3000](http://localhost:3000)

#### Production Build

```bash
cd dashboard
bun run build
bun run start
```

#### Static Export

```bash
cd dashboard
bun run build
# Output: dashboard/out/
```

---

## Workflow

### Local Development Workflow

```
1. Data Preparation
   └─> Place raw data in data/raw/

2. Run Notebooks Sequentially
   ├─> 1_cleaning.ipynb      (data/cleaned/)
   ├─> 2_analysis.ipynb      (data/analysis/, data/general/)
   ├─> 3_model_training.ipynb (data/modeling/)
   └─> 4_model_testing.ipynb (data/modeling/)

3. Data Auto-Sync
   └─> TOML files copied to dashboard/public/data/

4. Run Dashboard
   └─> bun run dev

5. Commit Changes
   └─> Pre-commit hooks strip notebook outputs
```

### CI/CD Workflow

GitHub Actions automatically:

1. **On Push/PR**: Runs full pipeline
   - Data cleaning
   - Analysis
   - Model training
   - Model testing

2. **Artifact Generation**:
   - Uploads processed data
   - Stores model outputs

3. **Dashboard Build**:
   - Downloads artifacts
   - Builds Next.js application
   - Deploys to GitHub Pages (main branch only)

**Workflow File**: `.github/workflows/main.yml`

---

## Dashboard

### Pages

#### Overview (`/`)
- Project summary and key metrics
- Quick insights from analysis
- Recent trends and highlights

#### Analysis (`/analysis`)
- Detailed exploratory data analysis
- Interactive charts and visualizations
- Statistical summaries

#### Data Explorer (`/data`)
- Raw data exploration
- Filtering and sorting capabilities
- Dataset information

#### Modeling (`/modeling`)
- Model performance metrics
- Training/testing results
- Feature importance analysis

### Chart Types

The dashboard supports 7 chart types:

1. **Bar Charts** - Categorical comparisons
2. **Line Charts** - Trends over time
3. **Area Charts** - Cumulative data
4. **Pie Charts** - Proportions and distributions
5. **Radar Charts** - Multi-dimensional comparisons
6. **Scatter Plots** - Correlations and relationships
7. **Composed Charts** - Mixed chart types

### Color Theme

**Catppuccin Mocha Pink** - A modern, accessible color palette:

- Primary: `#f5c2e7` (Pink)
- Secondary: `#cba6f7` (Mauve)
- Accent Colors: Blue, Green, Peach, Yellow, etc.

All colors defined in `dashboard/src/app/globals.css` using CSS custom properties.

---

## Development

### Python Development

#### Code Formatting
```bash
uv run ruff check .          # Linting
uv run ruff format .         # Formatting
```

#### Adding Dependencies
```bash
uv add <package-name>        # Add package
uv remove <package-name>     # Remove package
uv sync                      # Sync dependencies
```

#### Running Scripts
```bash
uv run python script.py      # Run Python script
```

### Dashboard Development

#### Development Server
```bash
cd dashboard
bun run dev                  # Start dev server
```

#### Type Checking
```bash
cd dashboard
bun run lint                 # ESLint
```

#### Build
```bash
cd dashboard
bun run build                # Production build
```

### Notebook Management

#### Clean Outputs Manually
```bash
# Clean all notebooks
jupyter nbconvert --clear-output --inplace notebooks/**/*.ipynb
```

#### Pre-commit Hook
Automatically strips outputs on commit:
```bash
git commit -m "Update analysis"  # Outputs auto-stripped
```

---

## CI/CD Pipeline

### Workflow Overview

```yaml
Jobs:
1. changes        # Detect changed files
2. cleaning       # Run cleaning notebooks
3. analysis       # Run analysis notebooks
4. modeling       # Run modeling notebooks
5. dashboard-build # Build dashboard with data
6. dashboard-deploy # Deploy to GitHub Pages (main only)
```

### Triggering Workflows

- **Push to `main`**: Full pipeline + deployment
- **Pull Request**: Full pipeline (no deployment)
- **Manual**: Via GitHub Actions tab

### Artifacts

Artifacts are retained for 5 days:
- `clean-data` - Cleaned datasets
- `analysis-data` - Analysis outputs
- `model-data` - Model outputs

---

## Contributing

### Guidelines

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards

- Python code must pass `ruff` checks
- Notebooks must have outputs cleared before commit
- Follow existing code style and patterns
- Add tests for new features
- Update documentation as needed

### Commit Messages

Use conventional commits:
```
feat: Add new chart type
fix: Resolve data loading issue
docs: Update installation guide
chore: Update dependencies
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- **Dataset**: Mohammad Saleh Nematbakhsh Behdani for the mock second-hand car sales dataset
- **UI Theme**: [Catppuccin](https://github.com/catppuccin/catppuccin) for the beautiful color palette
- **Tools**: UV, Bun, Next.js, Jupyter, and the open-source community

---

## Contact

**Project Maintainer**: [champyod](https://github.com/champyod)

**Repository**: [https://github.com/champyod/Aomsin-Tid-Data](https://github.com/champyod/Aomsin-Tid-Data)

For issues and questions, please open an issue on the GitHub repository.

---

## Roadmap

- [ ] Add more machine learning models (Random Forest, Neural Networks)
- [ ] Implement automated hyperparameter tuning
- [ ] Add real-time data update capabilities
- [ ] Expand dashboard with more interactive features
- [ ] Add API endpoints for programmatic access
- [ ] Implement user authentication for dashboard

---

**Last Updated**: 2026-02-07
