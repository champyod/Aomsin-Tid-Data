import os
import shutil
from pathlib import Path
import toml
from typing import Literal, Optional, Any, Union, Dict, List

# Define valid topics that match dashboard pages/folders
# "general" maps to the Overview/Home page
Topic = Literal["analysis", "modeling", "data", "general"]


class ChartConfig:
    """Helper to build standardized chart configurations.

    All colors are defined via variants in the frontend CSS (Catppuccin Mocha Pink theme).
    Never use hex color codes - only use variant names like 'chart-1', 'pink', 'primary', etc.

    Available color variants:
    - chart-1 through chart-10 (auto-assigned if not specified)
    - Named variants: pink, mauve, blue, green, peach, yellow, maroon, teal, sky, red
    - Semantic variants: primary, secondary, success, warning, error, info

    Size options:
    - 'half': Takes 1 column in 2-column grid (default)
    - 'full': Takes full width (2 columns)
    """

    def __init__(
        self,
        title: str,
        chart_type: Literal[
            "area", "bar", "line", "pie", "radar", "scatter", "composed"
        ],
        description: str = "",
        x_axis_key: str = "name",
        x_axis_label: str = "",
        y_axis_unit: str = "",
        size: Literal["full", "half"] = "half",
        variant: Optional[str] = None,
    ):
        self.config = {
            "title": title,
            "type": chart_type,
            "description": description,
            "xAxis": {"dataKey": x_axis_key, "label": x_axis_label},
            "yAxis": {
                "label": "",  # Can be updated if needed
                "unit": y_axis_unit,
            },
            "series": [],
            "data": [],
            "order": 0,  # Will be set automatically by save_result
            "size": size,  # Layout size: 'full' or 'half'
            "variant": variant,  # Optional color theme variant
        }

    def add_series(
        self,
        data_key: str,
        name: str,
        variant: str = None,
        type: str = None,
        stack_id: str = None,
    ):
        """Add a data series to the chart.

        Args:
            data_key: The key in data objects for this series
            name: Display name for the series
            variant: Color variant name (e.g., 'chart-1', 'pink', 'primary').
                     If None, auto-assigns 'chart-N' based on series index (1-indexed).
                     NEVER use hex color codes - only variant names!
            type: Chart type for composed charts (e.g., 'bar', 'line', 'area')
            stack_id: Stack identifier for stacked charts

        Available variants:
            - chart-1, chart-2, ..., chart-10 (numbered variants)
            - pink, mauve, blue, green, peach, yellow, maroon, teal, sky, red
            - primary, secondary, success, warning, error, info
        """
        # Auto-assign color variant if not provided
        if variant is None:
            series_index = len(self.config["series"]) + 1
            variant = f"chart-{series_index}"

        # Validate that no hex codes are used
        if variant and variant.startswith('#'):
            raise ValueError(
                f"Invalid variant '{variant}': Use variant names like 'chart-1', 'pink', or 'primary' instead of hex codes. "
                "All colors are defined in global.css using Catppuccin Mocha Pink theme."
            )

        s = {"dataKey": data_key, "name": name, "variant": variant}
        if type:
            s["type"] = type  # For composed charts
        if stack_id:
            s["stackId"] = stack_id
        self.config["series"].append(s)
        return self

    def set_data(self, data: List[Dict[str, Any]]):
        """Set the data rows."""
        self.config["data"] = data
        return self

    def to_dict(self):
        return self.config


def get_project_root() -> Path:
    """Helper to find project root."""
    path = Path(os.getcwd())
    while not (path / ".git").exists() and path != path.parent:
        path = path.parent
    return path if (path / ".git").exists() else Path(os.getcwd())


def _resolve_path(subdir: str, filename: str) -> Path:
    """
    Internal helper to resolve absolute paths for data files.
    Ensures the target directory exists.
    """
    root = get_project_root()
    target_dir = root / "data" / subdir
    target_dir.mkdir(parents=True, exist_ok=True)
    return target_dir / filename


def load_from(source: Literal["raw", "cleaned"], filename: str) -> Path:
    """
    Get the absolute path to a file in the specified data source directory.
    Example: load_from("raw", "Cars.csv")
    """
    return _resolve_path(source, filename)


def save_to(destination: Literal["cleaned"], filename: str) -> Path:
    """
    Get the target absolute path for saving a file to the specified destination.
    Example: save_to("cleaned", "Cars_cleaned.csv")
    """
    return _resolve_path(destination, filename)


def save_result(
    data: Any,
    filename: str,
    topic: Topic = "general",
    visual_type: Optional[str] = None,
):
    """
    Saves published data/metrics/configs to the dashboard's data store (data/{topic}).
    Automatically assigns an incremental order index for display ordering.

    Args:
        data (Any): The data to save (dict, list, or ChartConfig).
        filename (str): The output filename (e.g., 'analysis_summary').
        topic (Topic): The dashboard section ('analysis', 'modeling', etc.).
        visual_type (str, optional): Metadata about visualization type (unused currently but kept for compat).

    Note: Always saves as TOML.
    """
    # Ensure extension is .toml
    base_name = os.path.splitext(filename)[0]
    final_filename = f"{base_name}.toml"

    file_path = _resolve_path(topic, final_filename)
    
    # Determine next order index by counting existing files in topic
    topic_dir = get_project_root() / "data" / topic
    existing_files = list(topic_dir.glob("*.toml")) if topic_dir.exists() else []
    next_order = len(existing_files)

    # If data is a ChartConfig object, convert to dict
    if hasattr(data, "to_dict"):
        data = data.to_dict()
    
    # Add order if not present
    if isinstance(data, dict) and "order" not in data:
        data["order"] = next_order

    with open(file_path, "w", encoding="utf-8") as f:
        toml.dump(data, f)

    print(f"✅ [{topic.upper()}] Data saved to: {file_path}")
    
    # Automatically copy to dashboard public data for live updates
    root = get_project_root()
    dashboard_data_dir = root / "dashboard" / "public" / "data" / topic
    
    if dashboard_data_dir.parent.parent.exists(): # Check if dashboard/public/data exists
        dashboard_data_dir.mkdir(parents=True, exist_ok=True)
        dashboard_path = dashboard_data_dir / final_filename
        shutil.copy2(file_path, dashboard_path)
        print(f"✅ [DASHBOARD] Synced to: {dashboard_path}")
