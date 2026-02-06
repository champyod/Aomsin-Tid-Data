# Dashboard Data Contract

This document defines the data structures and conventions used to transfer data from the Python analysis pipeline to the Next.js Dashboard.

**Format**: TOML (`.toml`) - STRICTLY ENFORCED.
**Location**: `input: data/{topic}/*.toml` -> **Dashboard**: `public/data/{topic}/*.toml`

## 1. Manual Data Sync

To update the dashboard data during local development, you must manually copy the generated data from the root `data/` folder to the dashboard's `public/data/` folder.

**Command:**
```bash
cp -r data/analysis data/modeling dashboard/public/data/
```
*Note: The GitHub Actions pipeline handles this automatically for deployments.*

## 2. Universal Chart Structure

The dashboard uses a `UniversalChart` component that expects a specific configuration structure. The `data_manager.py` Python module produces this structure.

### Base Configuration
All charts share this top-level structure in the TOML file:

```toml
title = "Chart Title"
type = "bar" # options: "bar" | "line" | "area" | "pie" | "radar" | "scatter" | "composed"
description = "Optional description"

[xAxis]
dataKey = "name" # The key in the data objects to use for X-axis labels
label = "X Label"

[yAxis]
unit = "$" # Optional unit prefix/suffix
# label = "Y Label" # Optional

# Series Definitions
[[series]]
dataKey = "value"
name = "Revenue"
color = "#8884d8"
# stackId = "a" # Optional, for stacked bars/areas

# Data Points
[[data]]
name = "Jan"
value = 400
[[data]]
name = "Feb"
value = 300
```

### Supported Chart Types

#### Bar Chart (`type = "bar"`)
-   Standard bar chart.
-   Supports stacking via `stackId` in series.

#### Line Chart (`type = "line"`)
-   Standard line chart.
-   dataKey values are plotted on Y-axis.

#### Area Chart (`type = "area"`)
-   Filled area chart.
-   Supports stacking via `stackId`.

#### Pie Chart (`type = "pie"`)
-   Expects `series[0].dataKey` to define the value.
-   Expects `xAxis.dataKey` (default "name") to define the slice label.

#### Radar Chart (`type = "radar"`)
-   Good for comparing multiple metrics across categories.
-   Expects `xAxis.dataKey` for the axis content.

#### Composed Chart (`type = "composed"`)
-   allows mixing types.
-   Add `type = "bar" | "line" | "area"` to individual `[[series]]` entries to override the main type.

## 3. Metrics/Summary Structure

For summary cards (KPIs), the expected structure is:

### Analysis Summary (`analysis_summary.toml`)

```toml
[metrics]
total_revenue = 12345
total_units = 500
average_price = 24.5
top_performing_region = "North"

[project_info]
title = "My Analysis"
description = "Analysis of sales data..."
dataset_name = "Kaggle Sales"
dataset_source_link = "https://kaggle.com/..."
```

### Model Metrics (`model_metrics.toml`)

```toml
model_name = "LSTM-v1"
accuracy = 0.95
r2_score = 0.88
```
