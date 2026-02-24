# Dashboard Data Integration Guide

Complete guide for integrating data from Python notebooks to the Next.js dashboard using TOML files.

---

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Python API Reference](#python-api-reference)
4. [TOML Structure Reference](#toml-structure-reference)
5. [Customization Options](#customization-options)
6. [Field Explanations](#field-explanations)
7. [Chart Types](#chart-types)
8. [Color System](#color-system)
9. [Complete Examples](#complete-examples)
10. [Troubleshooting](#troubleshooting)

---

## Overview

### Data Flow

```
Python Notebook → save_result() → TOML File → Dashboard API → Frontend Render
```

**Key Components:**
- **Python:** `ChartConfig` class + `save_result()` function
- **Storage:** TOML files in `data/{topic}/` (auto-synced to `dashboard/public/data/{topic}/`)
- **Frontend:** Dynamic loading via API, rendering via `UniversalChart`

### File Organization

```
data/
├── general/      # Overview page (/)
├── analysis/     # Analysis page (/analysis)
├── data/         # Data page (/data)
└── modeling/     # Modeling page (/modeling)
```

---

## Quick Start

### 1. Import Required Functions

```python
from src.utils.data_manager import ChartConfig, save_result
```

### 2. Create a Chart

```python
# Create chart configuration
chart = ChartConfig(
    title="Monthly Revenue",
    chart_type="bar",
    description="Revenue trends over the past year",
    x_axis_key="month",
    y_axis_unit="$",
    size="full"  # Full width layout
)

# Add data series
chart.add_series("revenue", "Revenue", variant="pink")

# Set data
chart.set_data([
    {"month": "Jan", "revenue": 10000},
    {"month": "Feb", "revenue": 12000},
    {"month": "Mar", "revenue": 15000}
])
```

### 3. Save to Dashboard

```python
# Save to analysis page
save_result(chart, "monthly_revenue", topic="analysis")
```

**That's it!** The file is automatically:
- Saved to `data/analysis/monthly_revenue.toml`
- Synced to `dashboard/public/data/analysis/monthly_revenue.toml`
- Loaded and rendered on the Analysis page

---

## Python API Reference

### `save_result(data, filename, topic, visual_type)`

Saves data to the dashboard in TOML format.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `ChartConfig \| dict \| list` | ✅ Yes | Data to save (chart config, metrics, or raw data) |
| `filename` | `str` | ✅ Yes | Output filename (without extension) |
| `topic` | `"general" \| "analysis" \| "data" \| "modeling"` | ✅ Yes | Dashboard page/section |
| `visual_type` | `str` | ❌ No | Metadata (unused, kept for compatibility) |

**Returns:** None (prints confirmation message)

**Example:**

```python
# Save a chart
save_result(chart, "revenue_chart", topic="analysis")

# Save metrics
metrics = {"total_revenue": 50000, "avg_price": 2500}
save_result(metrics, "summary_metrics", topic="general")

# Save chart collection
charts = [chart1.config, chart2.config, chart3.config]
save_result({"charts": charts}, "all_charts", topic="data")
```

**Auto-Features:**
- ✅ Assigns incremental `order` field for display sequence
- ✅ Ensures `.toml` extension
- ✅ Creates directories if needed
- ✅ Auto-syncs to `dashboard/public/data/`

---

### `ChartConfig` Class

Main class for building chart configurations.

**Constructor:**

```python
ChartConfig(
    title: str,
    chart_type: Literal["area", "bar", "line", "pie", "radar", "scatter", "composed"],
    description: str = "",
    x_axis_key: str = "name",
    x_axis_label: str = "",
    y_axis_unit: str = "",
    size: Literal["full", "half"] = "half",
    variant: Optional[str] = None
)
```

**Parameters Explained:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `title` | `str` | Required | Chart title displayed at top |
| `chart_type` | `str` | Required | Type of chart (see [Chart Types](#chart-types)) |
| `description` | `str` | `""` | Subtitle/description below title |
| `x_axis_key` | `str` | `"name"` | Data key for X-axis values |
| `x_axis_label` | `str` | `""` | Label displayed on X-axis |
| `y_axis_unit` | `str` | `""` | Unit suffix for Y-axis (e.g., "$", "%") |
| `size` | `str` | `"half"` | Layout size: `"full"` (2 cols) or `"half"` (1 col) |
| `variant` | `str` | `None` | Overall chart color theme (see [Color System](#color-system)) |

**Methods:**

#### `add_series(data_key, name, variant=None, type=None, stack_id=None)`

Adds a data series to the chart.

```python
chart.add_series(
    data_key="revenue",      # Data field name
    name="Revenue",          # Display name in legend
    variant="pink",          # Color variant (optional)
    type="bar",              # For composed charts (optional)
    stack_id="a"             # For stacked charts (optional)
)
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `data_key` | `str` | Key in data objects for this series |
| `name` | `str` | Display name in chart legend |
| `variant` | `str` | Color variant name (auto-assigned if None) |
| `type` | `str` | Chart type for composed charts (`"bar"`, `"line"`, `"area"`, `"scatter"`) |
| `stack_id` | `str` | Stack identifier for stacked charts (same ID = same stack) |

**Returns:** `self` (for method chaining)

#### `set_data(data)`

Sets the data array for the chart.

```python
chart.set_data([
    {"month": "Jan", "revenue": 10000, "cost": 7000},
    {"month": "Feb", "revenue": 12000, "cost": 8000}
])
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `data` | `List[Dict]` | Array of data objects |

**Returns:** `self` (for method chaining)

#### `to_dict()`

Returns the chart configuration as a dictionary.

```python
config_dict = chart.to_dict()
```

**Returns:** `dict` - Chart configuration

---

## TOML Structure Reference

### Chart TOML Format

```toml
# Auto-assigned by save_result()
order = 0

# Chart metadata
type = "bar"              # Chart type
title = "Chart Title"     # Title
description = "..."       # Description (optional)
size = "half"             # Layout size: "full" or "half"
variant = "primary"       # Color theme (optional)

# X-axis configuration
[xAxis]
dataKey = "month"         # Data field for X values
label = "Month"           # Axis label (optional)

# Y-axis configuration
[yAxis]
label = ""                # Axis label (optional)
unit = "$"                # Unit suffix (e.g., "$", "%", "units")

# Data series (can have multiple)
[[series]]
dataKey = "revenue"       # Data field for this series
name = "Revenue"          # Display name
variant = "pink"          # Color variant name

[[series]]
dataKey = "cost"
name = "Cost"
variant = "yellow"

# Data points (can have many)
[[data]]
month = "Jan"
revenue = 10000
cost = 7000

[[data]]
month = "Feb"
revenue = 12000
cost = 8000
```

### Metrics TOML Format

```toml
# Simple metrics (no order field)
total_revenue = 50000
total_units = 250
average_price = 2500

# Nested metrics
[metrics]
total_revenue = 50000
total_units = 250

[project_info]
title = "Project Title"
description = "Description here"
```

---

## Customization Options

### 1. Chart Size

Control chart width in the grid layout.

```python
# Full width (spans 2 columns)
ChartConfig(..., size="full")

# Half width (spans 1 column) - DEFAULT
ChartConfig(..., size="half")
```

**Use Cases:**
- **Full width:** Time series, trends, large bar charts, composed charts
- **Half width:** Pie charts, small bar charts, radar charts

### 2. Color Variants

Set color themes for charts and series.

```python
# Chart-level variant (overall theme)
ChartConfig(..., variant="primary")

# Series-level variant (individual series colors)
chart.add_series("revenue", "Revenue", variant="pink")
chart.add_series("cost", "Cost", variant="yellow")
```

**Available Variants:** See [Color System](#color-system)

### 3. Axis Configuration

```python
ChartConfig(
    x_axis_key="date",        # Data field for X-axis
    x_axis_label="Date",      # X-axis label
    y_axis_unit="$"           # Y-axis unit (e.g., "$", "%", "kg")
)
```

### 4. Stacked Charts

```python
chart = ChartConfig(title="Stacked Bar", chart_type="bar")
chart.add_series("cost", "Cost", variant="yellow", stack_id="a")
chart.add_series("profit", "Profit", variant="green", stack_id="a")
```

**Same `stack_id` = stacked together**

### 5. Composed Charts

Multiple chart types in one chart.

```python
chart = ChartConfig(title="Revenue & Count", chart_type="composed")
chart.add_series("revenue", "Revenue", variant="peach", type="bar")
chart.add_series("count", "Count", variant="blue", type="line")
```

### 6. Display Order

Control the order charts appear on the page.

```python
# Manual order (lower numbers appear first)
chart1 = ChartConfig(...)
chart1.config["order"] = 0  # First

chart2 = ChartConfig(...)
chart2.config["order"] = 10  # Later

# Auto order (based on save sequence)
save_result(chart1, "chart1", topic="analysis")  # order = 0
save_result(chart2, "chart2", topic="analysis")  # order = 1
```

---

## Field Explanations

### Chart Fields

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `order` | `int` | Auto | Display order (lower = first) | `0`, `1`, `2` |
| `type` | `str` | ✅ Yes | Chart type | `"bar"`, `"line"`, `"pie"` |
| `title` | `str` | ✅ Yes | Chart title | `"Monthly Revenue"` |
| `description` | `str` | ❌ No | Chart subtitle/description | `"Revenue trends..."` |
| `size` | `str` | ❌ No | Layout width | `"full"`, `"half"` |
| `variant` | `str` | ❌ No | Color theme | `"primary"`, `"pink"` |

### Axis Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `xAxis.dataKey` | `str` | Data field for X values | `"month"`, `"category"` |
| `xAxis.label` | `str` | X-axis label | `"Month"`, `"Category"` |
| `yAxis.label` | `str` | Y-axis label | `"Revenue"`, `"Count"` |
| `yAxis.unit` | `str` | Y-axis unit suffix | `"$"`, `"%"`, `"units"` |

### Series Fields

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `dataKey` | `str` | ✅ Yes | Data field name | `"revenue"`, `"cost"` |
| `name` | `str` | ✅ Yes | Display name in legend | `"Revenue"`, `"Cost"` |
| `variant` | `str` | ❌ No | Color variant | `"pink"`, `"chart-1"` |
| `type` | `str` | ❌ No | Type for composed charts | `"bar"`, `"line"` |
| `stackId` | `str` | ❌ No | Stack group ID | `"a"`, `"stack1"` |

### Data Fields

Data objects can have any fields. The keys should match:
- `xAxis.dataKey` for X-axis values
- `series[].dataKey` for Y-axis values

```python
# Example data object
{
    "month": "Jan",      # X-axis value
    "revenue": 10000,    # Y-axis value (series 1)
    "cost": 7000,        # Y-axis value (series 2)
    "profit": 3000       # Y-axis value (series 3)
}
```

---

## Chart Types

### 1. Bar Chart (`"bar"`)

Vertical bars for categorical data.

```python
chart = ChartConfig(
    title="Sales by Region",
    chart_type="bar",
    x_axis_key="region",
    y_axis_unit="$"
)
chart.add_series("sales", "Sales", variant="blue")
chart.set_data([
    {"region": "North", "sales": 5000},
    {"region": "South", "sales": 7000}
])
```

**Use For:** Comparisons, categorical data, rankings

### 2. Line Chart (`"line"`)

Connected lines for trends over time.

```python
chart = ChartConfig(
    title="Price Trend",
    chart_type="line",
    x_axis_key="year",
    y_axis_unit="$",
    size="full"
)
chart.add_series("price", "Average Price", variant="pink")
chart.set_data([
    {"year": 2020, "price": 25000},
    {"year": 2021, "price": 27000}
])
```

**Use For:** Time series, trends, continuous data

### 3. Area Chart (`"area"`)

Filled area under line, emphasizing volume.

```python
chart = ChartConfig(
    title="Revenue Over Time",
    chart_type="area",
    x_axis_key="date",
    y_axis_unit="$"
)
chart.add_series("revenue", "Revenue", variant="green")
```

**Use For:** Cumulative data, volume over time

### 4. Pie Chart (`"pie"`)

Circular chart showing proportions.

```python
chart = ChartConfig(
    title="Market Share",
    chart_type="pie",
    x_axis_key="brand"  # Name field
)
chart.add_series("value", "Share", variant="mauve")
chart.set_data([
    {"brand": "Toyota", "value": 30},
    {"brand": "Honda", "value": 25}
])
```

**Use For:** Proportions, percentages, distributions

**Note:** For pie charts, `x_axis_key` is the label field, not actual X-axis.

### 5. Radar Chart (`"radar"`)

Multi-dimensional comparison chart.

```python
chart = ChartConfig(
    title="Brand Comparison",
    chart_type="radar",
    x_axis_key="metric"
)
chart.add_series("Toyota", "Toyota", variant="chart-1")
chart.add_series("Honda", "Honda", variant="chart-2")
chart.set_data([
    {"metric": "Price", "Toyota": 85, "Honda": 75},
    {"metric": "Quality", "Toyota": 90, "Honda": 85}
])
```

**Use For:** Multi-factor comparisons, profiles

### 6. Scatter Chart (`"scatter"`)

Points showing correlation between two variables.

```python
chart = ChartConfig(
    title="Price vs Age",
    chart_type="scatter",
    x_axis_key="age",
    y_axis_unit="$"
)
chart.add_series("price", "Price", variant="sky")
chart.set_data([
    {"age": 5, "price": 15000},
    {"age": 10, "price": 8000}
])
```

**Use For:** Correlations, relationships, outliers

### 7. Composed Chart (`"composed"`)

Combination of multiple chart types.

```python
chart = ChartConfig(
    title="Revenue & Transactions",
    chart_type="composed",
    x_axis_key="month",
    y_axis_unit="$",
    size="full"
)
chart.add_series("revenue", "Revenue", variant="peach", type="bar")
chart.add_series("count", "Transactions", variant="blue", type="line")
```

**Use For:** Comparing metrics with different scales/types

---

## Color System

All colors use **Catppuccin Mocha Pink** theme defined in `dashboard/src/app/globals.css`.

### ❌ Never Use Hex Codes

```python
# ❌ WRONG - Will throw ValueError
chart.add_series("sales", "Sales", variant="#f5c2e7")

# ✅ CORRECT - Use variant names
chart.add_series("sales", "Sales", variant="pink")
```

### Available Variants

#### Chart Variants (Auto-assigned)

| Variant | Color | Hex |
|---------|-------|-----|
| `chart-1` | Pink | #f5c2e7 |
| `chart-2` | Mauve | #cba6f7 |
| `chart-3` | Blue | #89b4fa |
| `chart-4` | Green | #a6e3a1 |
| `chart-5` | Peach | #fab387 |
| `chart-6` | Yellow | #f9e2af |
| `chart-7` | Maroon | #eba0ac |
| `chart-8` | Teal | #94e2d5 |
| `chart-9` | Sky | #89dceb |
| `chart-10` | Red | #f38ba8 |

#### Named Variants

| Variant | Color | Hex |
|---------|-------|-----|
| `pink` | Pink | #f5c2e7 |
| `mauve` | Mauve | #cba6f7 |
| `blue` | Blue | #89b4fa |
| `green` | Green | #a6e3a1 |
| `peach` | Peach | #fab387 |
| `yellow` | Yellow | #f9e2af |
| `maroon` | Maroon | #eba0ac |
| `teal` | Teal | #94e2d5 |
| `sky` | Sky | #89dceb |
| `red` | Red | #f38ba8 |

#### Semantic Variants

| Variant | Maps To | Use For |
|---------|---------|---------|
| `primary` | Pink | Primary data, main focus |
| `secondary` | Mauve | Secondary data |
| `success` | Green | Positive metrics, growth |
| `warning` | Peach | Warnings, costs |
| `error` | Red | Errors, losses |
| `info` | Blue | Informational data |

### Auto-Assignment

If no variant specified, `chart-1`, `chart-2`, etc. are auto-assigned:

```python
chart = ChartConfig(title="Chart", chart_type="bar")
chart.add_series("s1", "Series 1")  # Gets chart-1 (pink)
chart.add_series("s2", "Series 2")  # Gets chart-2 (mauve)
chart.add_series("s3", "Series 3")  # Gets chart-3 (blue)
```

---

## Complete Examples

### Example 1: Simple Bar Chart

```python
from src.utils.data_manager import ChartConfig, save_result

# Create chart
chart = ChartConfig(
    title="Sales by Region",
    chart_type="bar",
    description="Q1 2026 sales performance",
    x_axis_key="region",
    y_axis_unit="$",
    size="half"
)

# Add series
chart.add_series("sales", "Sales", variant="blue")

# Set data
chart.set_data([
    {"region": "North", "sales": 50000},
    {"region": "South", "sales": 75000},
    {"region": "East", "sales": 60000},
    {"region": "West", "sales": 85000}
])

# Save to analysis page
save_result(chart, "regional_sales", topic="analysis")
```

### Example 2: Full-Width Line Chart

```python
# Monthly trend chart
chart = ChartConfig(
    title="Monthly Revenue Trend",
    chart_type="line",
    description="Revenue growth over 12 months",
    x_axis_key="month",
    y_axis_unit="$",
    size="full"  # Full width
)

chart.add_series("revenue", "Revenue", variant="pink")
chart.set_data([
    {"month": "Jan", "revenue": 10000},
    {"month": "Feb", "revenue": 12000},
    {"month": "Mar", "revenue": 15000},
    # ... more months
])

save_result(chart, "monthly_trend", topic="general")
```

### Example 3: Stacked Bar Chart

```python
# Revenue breakdown
chart = ChartConfig(
    title="Revenue Breakdown by Model",
    chart_type="bar",
    x_axis_key="model",
    y_axis_unit="$",
    size="half"
)

# Same stack_id makes them stack
chart.add_series("cost", "Cost", variant="yellow", stack_id="a")
chart.add_series("profit", "Profit", variant="green", stack_id="a")

chart.set_data([
    {"model": "Model A", "cost": 7000, "profit": 3000},
    {"model": "Model B", "cost": 8000, "profit": 4000},
    {"model": "Model C", "cost": 6000, "profit": 2000}
])

save_result(chart, "model_breakdown", topic="modeling")
```

### Example 4: Composed Chart

```python
# Revenue (bars) + Transaction count (line)
chart = ChartConfig(
    title="Revenue & Transaction Volume",
    chart_type="composed",
    description="Monthly performance metrics",
    x_axis_key="month",
    y_axis_unit="$",
    size="full"
)

chart.add_series("revenue", "Revenue", variant="peach", type="bar")
chart.add_series("transactions", "Transactions", variant="sky", type="line")

chart.set_data([
    {"month": "Jan", "revenue": 10000, "transactions": 50},
    {"month": "Feb", "revenue": 12000, "transactions": 60},
    {"month": "Mar", "revenue": 15000, "transactions": 75}
])

save_result(chart, "revenue_composition", topic="analysis")
```

### Example 5: Multiple Charts

```python
# Save multiple charts together
charts_list = []

# Chart 1
c1 = ChartConfig(title="Chart 1", chart_type="bar", size="half")
c1.add_series("value", "Value", variant="chart-1")
c1.set_data([{"name": "A", "value": 10}])
charts_list.append(c1.config)

# Chart 2
c2 = ChartConfig(title="Chart 2", chart_type="line", size="full")
c2.add_series("value", "Value", variant="chart-2")
c2.set_data([{"name": "A", "value": 20}])
charts_list.append(c2.config)

# Save as collection
save_result({"charts": charts_list}, "all_charts", topic="data")
```

### Example 6: Metrics Only

```python
# Save metrics (not a chart)
metrics = {
    "total_revenue": 500000,
    "total_units": 250,
    "average_price": 2000,
    "top_region": "West"
}

save_result(metrics, "summary_metrics", topic="general")
```

---

## Troubleshooting

### Chart Not Showing?

1. **Check file exists:**
   ```bash
   ls -la dashboard/public/data/{topic}/
   ```

2. **Verify TOML is valid:**
   ```python
   import toml
   with open("path/to/file.toml") as f:
       data = toml.load(f)
       print(data)
   ```

3. **Check browser console** for errors (F12 → Console)

4. **Verify order field** is set (should be auto-assigned)

### Wrong Colors?

1. **Check variant name** is correct (see [Color System](#color-system))

2. **Never use hex codes:**
   ```python
   # ❌ Wrong
   variant="#f5c2e7"

   # ✅ Correct
   variant="pink"
   ```

3. **Inspect in browser:**
   - Open DevTools → Elements
   - Find chart element
   - Check computed CSS variable: `var(--color-variant-pink)`

### Layout Issues?

1. **Check size field:**
   ```python
   size="full"  # 2 columns
   size="half"  # 1 column (default)
   ```

2. **Verify responsive breakpoints** - layouts change on mobile

3. **Check grid classes** in page component

### Data Not Loading?

1. **Check API endpoint:**
   ```
   http://localhost:3000/api/files?dir=analysis
   ```

2. **Verify file paths** in API response

3. **Check fetchToml errors** in console

### Python Errors?

1. **Import error:**
   ```python
   # Add project root to path
   import sys
   from pathlib import Path
   sys.path.append(str(Path.cwd()))
   ```

2. **Hex code validation error:**
   ```
   ValueError: Invalid variant '#f5c2e7': Use variant names...
   ```
   **Fix:** Use `variant="pink"` instead

3. **Missing order field:**
   - Should be auto-assigned by `save_result()`
   - Manual override: `chart.config["order"] = 5`

---

## Best Practices

### 1. Use Semantic Variants

```python
# Good - Clear intent
chart.add_series("revenue", "Revenue", variant="success")
chart.add_series("cost", "Cost", variant="warning")
chart.add_series("loss", "Loss", variant="error")

# Also good - Specific colors
chart.add_series("revenue", "Revenue", variant="green")
```

### 2. Choose Appropriate Chart Types

- **Trends over time:** Line or Area
- **Comparisons:** Bar
- **Proportions:** Pie
- **Multi-factor:** Radar
- **Correlations:** Scatter
- **Mixed data:** Composed

### 3. Size Charts Appropriately

- **Full width:** Time series, trends, large datasets
- **Half width:** Simple comparisons, pie charts

### 4. Add Descriptions

```python
ChartConfig(
    title="Monthly Revenue",
    description="Revenue trends showing 20% YoY growth"  # ✅ Helpful context
)
```

### 5. Use Consistent Naming

```python
# Topic names match page URLs
topic="general"   # Overview page (/)
topic="analysis"  # /analysis
topic="data"      # /data
topic="modeling"  # /modeling
```

### 6. Order Your Charts

```python
# Important charts first
chart1.config["order"] = 0  # Summary
chart2.config["order"] = 1  # Details
chart3.config["order"] = 2  # Deep dive
```

---

## Summary

**Key Takeaways:**

1. ✅ Use `ChartConfig` to build charts
2. ✅ Use `save_result()` to save to dashboard
3. ✅ Use variant names, never hex codes
4. ✅ Choose appropriate `size` and `chart_type`
5. ✅ Topics map to dashboard pages
6. ✅ Data is automatically ordered and synced

**Quick Reference:**

```python
from src.utils.data_manager import ChartConfig, save_result

chart = ChartConfig(
    title="Title",
    chart_type="bar",  # area, line, pie, radar, scatter, composed
    size="full",       # full or half
    variant="primary"  # pink, blue, green, etc.
)
chart.add_series("key", "Name", variant="pink")
chart.set_data([{"key": value}])
save_result(chart, "filename", topic="analysis")
```

**That's it!** You're ready to integrate data into the dashboard. 🎉
