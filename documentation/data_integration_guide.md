# 📊 Data Integration: Python ➡ Dashboard

This guide explains strictly how data flows from your Python notebooks into the Dashboard, and how to configure it.

## 🔄 The Data Flow Architecture

1.  **Python Generation**: You run a notebook. It calculates stats/models.
2.  **Saving (**Crucial**)**: You use `save_result()` to save data to a **Topic Folder** (e.g., `data/analysis/`).
3.  **CI/CD Pipeline**:
    - Detects changes.
    - Runs notebooks.
    - Zips `data/` folder.
    - **Injects** it into `dashboard/public/data/`.
4.  **Dashboard Consumption**:
    - The dashboard frontend fetches `basePath + /data/{topic}/{filename}`.
    - Example: `fetch('/data/analysis/analysis_summary.json')`.

---

## 🛠️ Python Side: Saving Data

We have a strict utility to handle this. **Do not use `open()` manually.**

### `save_result` Function

```python
from src.utils.data_manager import save_result

# Signature
save_result(
    data: Any, 
    filename: str, 
    topic: Literal["analysis", "modeling", "cleaning"], 
    visual_type: Optional[str] = None
)
```

### Parameters
| Parameter | Description | Valid Values |
| :--- | :--- | :--- |
| `data` | The dictionary/list to save. | Any JSON-serializable object. |
| `filename` | Output filename. | `analysis_summary.json`, `model_metrics.json`, etc. |
| `topic` | **Target Dashboard Page**. Determines the subfolder. | `"analysis"` ➡ `data/analysis/`<br>`"modeling"` ➡ `data/modeling/`<br>`"cleaning"` ➡ `data/cleaning/` |
| `visual_type` | Metadata (Internal use/Documentation). | `"chart"`, `"table"`, `"metric"`, `"scatter"` |

### 📝 Examples by Page

#### 1. Analysis Page (`/analysis`)
Target folder: `data/analysis/`

```python
analysis_data = {
    "price_trend": [{"year": "2020", "avg_price": 50000}, ...],
    "engine_distribution": [...]
}

# 🚀 SAVING
save_result(
    analysis_data, 
    "analysis_summary.json", 
    topic="analysis", 
    visual_type="chart"
)
```

#### 2. Modeling Page (`/modeling`)
Target folder: `data/modeling/`

```python
model_metrics = {
    "accuracy": 0.95,
    "feature_importance": [...]
}

# 🚀 SAVING
save_result(
    model_metrics, 
    "model_metrics.json", 
    topic="modeling", 
    visual_type="metric"
)
```

---

## 🖥️ Dashboard Side: Fetching Data

(For Frontend Developers)

Each page knows where to look based on its topic.

```typescript
// src/app/analysis/page.tsx

useEffect(() => {
  // 1. Get Base Path (handles GitHub Pages subdirectory)
  const basePath = getBasePath(); 
  
  // 2. Fetch from strict public path match
  // Maps to: dashboard/public/data/analysis/analysis_summary.json
  fetch(`${basePath}/data/analysis/analysis_summary.json`)
    .then(res => res.json())
    .then(setData);
}, []);
```

## 💻 Local Development

1.  Run Notebooks ➡ Generates `data/analysis/...` in root.
2.  **Sync Data**:
    ```bash
    # Copy generated data to dashboard public folder
    cp -r data/* dashboard/public/data/
    ```
## 🗂️ Advanced: Handling Multiple Files & Sorting

If your page needs to show a list of files (e.g., "Monthly Reports") or sort them (First/Last), you cannot rely on the browser's file system.

**The Solution: Generate a Manifest.**

When Python runs, have it save a `manifest.json` listing the available files.

```python
# Python side
manifest = {
    "latest": "report_2024.json",
    "history": [
        {"id": "2024", "file": "report_2024.json", "date": "2024-01-01"},
        {"id": "2023", "file": "report_2023.json", "date": "2023-01-01"}
    ]
}
save_result(manifest, "manifest.json", topic="analysis")
```

**Dashboard Side:**
1. Fetch `manifest.json` first.
2. Read the list.
3. Sort it in JavaScript.
4. Fetch the specific file you want (or loop through them).

### ❌ What to Avoid
- Do not assume `public/data` has any files in the repo initially. The pipeline fills it.
- **Fallback**: If you strictly need fallback data (so the build doesn't crash locally), you can keep a minimal set in `dashboard/public/data` and check it in. The pipeline will overwrite strictly named files, but others will remain. **Best practice:** Use the pipeline artifacts.

---

## 🚀 Advanced: Config-Driven Charts (TOML)

We now support a configuration-driven approach using TOML files and the `UniversalChart` component. This allows you to define the chart type, labels, and data entirely from Python, without changing frontend code.

### 1. Python Side: Using `ChartConfig`

```python
from src.utils.data_manager import save_result, ChartConfig

# 1. Create Config
chart = ChartConfig(
    title="Sales Performance", 
    chart_type="composed", # options: bar, line, area, pie, radar, scatter, composed
    description="Monthly revenue and profit comparison",
    x_axis_key="month",
    x_axis_label="Month"
)

# 2. Add Series
chart.add_series("revenue", "Revenue", color="#8884d8", type="bar")
chart.add_series("profit", "Profit", color="#82ca9d", type="line")

# 3. Set Data
data = [
    {"month": "Jan", "revenue": 4000, "profit": 2400},
    {"month": "Feb", "revenue": 3000, "profit": 1398}
]
chart.set_data(data)

# 4. Save as TOML
save_result(chart, "sales_chart", topic="analysis", file_format="toml")
```

### 2. Dashboard Side: `UniversalChart`

The dashboard can now render these TOML files automatically using the `UniversalChart` component.

```tsx
// Example usage in a page
import { fetchToml } from "@/utils/tomlLoader";
import { UniversalChart } from "@/components/UniversalChart";

// ... inside component ...
const [config, setConfig] = useState(null);

useEffect(() => {
    fetchToml('/data/analysis/sales_chart.toml').then(setConfig);
}, []);

return config ? <UniversalChart config={config} /> : null;
```

### Why TOML?
- **Readability**: Easier to inspect raw data files.
- **Performance**: Smaller file size and faster parsing for configuration-heavy structures.
- **Flexibility**: Define chart types dynamically.
