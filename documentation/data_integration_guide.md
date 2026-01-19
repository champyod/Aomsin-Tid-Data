# 📊 Data Integration & Visualization Guide

This guide explains how to generate, save, and visualize data in the Aomsin-Tid-Data project. The system uses a **Config-Driven Approach** where Python defines the data *and* how it should be visualized, allowing the Dashboard to render charts dynamically without frontend code changes.

---

## 🏗️ Architecture Overview

1.  **Python (Notebooks)**:
    *   Compiles dataframes.
    *   Defines `ChartConfig` (Type, Title, Axes, Series).
    *   Saves outputs as `TOML` or `JSON` to `data/{topic}/`.
2.  **CI/CD Pipeline**:
    *   Executes notebooks.
    *   Artifacts the `data/` folder.
    *   Injects data into the Dashboard's `public/data/` directory.
3.  **Dashboard (Next.js)**:
    *   Fetches the config files.
    *   Renders them using `UniversalChart`.

---

## 🐍 Python SDK (`src.utils.data_manager`)

We provide a robust Python utility to handle paths and file saving.

### 1. `save_result`

Save your final data/configs.

```python
from src.utils.data_manager import save_result, ChartConfig

save_result(
    data: Any,                          # Dict, List, or ChartConfig object
    filename: str,                      # e.g. "sales_overview"
    topic: Literal["analysis", ...],    # Target folder: "analysis", "modeling", "general"
    file_format: Literal["toml", "json"] = "toml" # Default is TOML
)
```

### 2. `ChartConfig` Builder

Use this helper to generate the correct dictionary structure for the Dashboard.

```python
class ChartConfig:
    def __init__(self, 
                 title: str,
                 chart_type: Literal["area", "bar", "line", "pie", "radar", "scatter", "composed"],
                 description: str = "",
                 x_axis_key: str = "name", # Key in data for X-Axis labels
                 x_axis_label: str = ""):
        ...

    def add_series(self, 
                   data_key: str,       # Key in data for values
                   name: str,           # Legend name
                   color: str = "...",  # Hex color or HSL
                   type: str = None):   # Optional override for Composed charts
        ...
        
    def set_data(self, data: List[Dict]): ...
```

---

## 📈 Chart Types & Examples

Below are the configurations for each supported chart type.

### 1. Bar Chart
Standard vertical bar chart.

*   **Python Setup**:
    ```python
    chart = ChartConfig("Revenue by Product", "bar", x_axis_key="product")
    chart.add_series("revenue", "Revenue", color="#8884d8")
    chart.set_data([
        {"product": "A", "revenue": 500},
        {"product": "B", "revenue": 750}
    ])
    save_result(chart, "bar_demo", topic="analysis")
    ```

### 2. Line Chart
smooth or monotone lines.

*   **Python Setup**:
    ```python
    chart = ChartConfig("Stock Trend", "line", x_axis_key="time")
    chart.add_series("value", "Price", color="#82ca9d")
    # ... set_data
    ```

### 3. Area Chart
Filled area under the line with gradients.

*   **Python Setup**:
    ```python
    chart = ChartConfig("User Growth", "area", x_axis_key="month")
    chart.add_series("users", "Active Users", color="#ffc658")
    ```

### 4. Pie Chart
Circular chart.
*   **Special Note**: Ensure your data has a label key (passed to `x_axis_key` or `name`) and a value key (first series).
*   **Python Setup**:
    ```python
    # x_axis_key maps to the slice Label
    chart = ChartConfig("Market Share", "pie", x_axis_key="company")
    # The first series added is the numeric Value
    chart.add_series("share", "Percent Share") 
    chart.set_data([
        {"company": "Apple", "share": 40},
        {"company": "Google", "share": 35},
        {"company": "Others", "share": 25}
    ])
    ```

### 5. Radar Chart
Spider/Web chart for comparing multiple variables.

*   **Python Setup**:
    ```python
    chart = ChartConfig("Skill Assessment", "radar", x_axis_key="skill")
    chart.add_series("score", "Candidate Score", color="#f5c2e7")
    ```

### 6. Composed Chart (Mixed)
Combine Bar, Line, Area, and Scatter in one view.

*   **Python Setup**:
    ```python
    chart = ChartConfig("Complex Metrics", "composed", x_axis_key="month")
    # Specify 'type' for each series
    chart.add_series("sales", "Sales", type="bar", color="#8884d8")
    chart.add_series("trend", "Trend", type="line", color="#ff7300")
    chart.add_series("coverage", "Coverage", type="area", color="#82ca9d")
    ```

---

## ⚛️ Dashboard Integration (Frontend)

For developers working on `src/app/`.

### `UniversalChart` Component

The `UniversalChart` component is the single entry point for rendering `ChartConfig` objects.

**Props**:
```typescript
interface UniversalChartProps {
  config: ChartConfig;
  className?: string; // For Tailwind classes (width, margin, etc.)
}
```

**Usage Pattern**:

1.  **Import**:
    ```tsx
    import { fetchToml } from "@/utils/tomlLoader";
    import { UniversalChart, ChartConfig } from "@/components/UniversalChart";
    ```

2.  **Fetch & Render**:
    ```tsx
    const [config, setConfig] = useState<ChartConfig | null>(null);

    useEffect(() => {
      // 1. Get Base Path (for GitHub Pages compatibility)
      const basePath = getBasePath(); 
      
      // 2. Fetch the TOML file generated by Python
      fetchToml(`${basePath}/data/analysis/sales_overview.toml`)
        .then((data: any) => setConfig(data as ChartConfig))
        .catch(console.error);
    }, []);

    if (!config) return <LoadingSpinner />;

    return (
        <UniversalChart config={config} className="h-[400px]" />
    );
    ```

---

## 📂 Data Directory Structure

All data is managed via the `src.utils.data_manager` helper.

| Name | Role | Path | Python Access |
| :--- | :--- | :--- | :--- |
| **Raw** | Source CSVs (Cars, Sales, etc.) | `data/raw/` | `get_data_path('raw')` |
| **Cleaned** | Processed Parquet/CSVs | `data/cleaned/` | `get_data_path('cleaned')` |
| **Analysis** | Dashboard: Analysis Page | `data/analysis/` | `save_result(..., topic='analysis')` |
| **Modeling** | Dashboard: Modeling Page | `data/modeling/` | `save_result(..., topic='modeling')` |

### Helper Functions

```python
from src.utils.data_manager import get_data_path

# Get Path objects (auto-creates folder if missing)
raw_path = get_data_path("raw") 
cleaned_path = get_data_path("cleaned")

print(raw_path / "MyFile.csv")
# Output: /abs/path/to/repo/data/raw/MyFile.csv
```
