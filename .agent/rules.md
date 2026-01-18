# Project Context & Rules

## 1. Environment & Tech Stack
- **OS**: Linux
- **PackageManager**: **Bun** (Preferred for all JS/TS tasks)
- **Frontend Framework**: **Next.js 15** (App Router)
- **Styling**: **Tailwind CSS v4**
    - Configured via CSS variables in `src/app/globals.css`.
    - Uses `@theme` directive.
- **Python**: Used for data processing and helper scripts.

## 2. Directory Structure
```
/
├── dashboard/              # Next.js Application (Root for frontend)
│   ├── public/data/        # JSON Data Contract location (Analysis/Modeling)
│   ├── src/app/            # App Router Pages
│   └── src/components/     # Shared React Components
├── documentation/          # Project Documentation & AI Reports
├── src/utils/              # Python Utilities (e.g., dashboard_helper.py)
├── notebooks/              # Jupyter Notebooks (Data Science work)
├── data/                   # Raw & Cleaned CSV Datasets
└── .github/workflows/      # CI/CD Pipelines
```

## 3. Key Workflows
### Dashboard Deployment
- **Command**: `bun run build` (inside `dashboard/`)
- **Output**: `out/` (Static HTML export)
- **CI/CD**: `.github/workflows/dashboard.yml`
    - Pushing to `main` triggers deployment to GitHub Pages.
    - Pull Requests trigger build verification.

### Data Integration
- **Source**: Notebooks process data and use `src/utils/dashboard_helper.py` to export JSON.
- **Destination**: `dashboard/public/data/{category}/{filename}.json`
- **Schema**:
    - `analysis_summary.json`: Car market stats, price trends, brand distribution.
    - `model_metrics.json`: AI model performance (Accuracy, R2, Feature Importance).

## 4. Branching Strategy
- Reference: `BRANCHING_GUIDE.md`
- Pattern: `category/description` (e.g., `feat/dashboard-integration`, `fix/table-sorting`).

## 5. Design Guidelines
- **Theme**: Glassmorphism (Dark Mode).
- **Colors**: defined in `globals.css` (`--color-primary`, `--color-surface`, etc.).
- **Components**: Reusable UI components in `src/components/` (Glass panels, Stat cards).
