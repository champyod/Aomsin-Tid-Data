import os
import shutil
from pathlib import Path
import toml
from typing import Literal, Optional, Any, Union, Dict, List

# Define valid topics that match dashboard pages/folders
# "general" maps to the Overview/Home page
Topic = Literal["analysis", "modeling", "data", "general"]

class ChartConfig:
    """Helper to build standardized chart configurations."""
    def __init__(self, 
                 title: str, 
                 chart_type: Literal["area", "bar", "line", "pie", "radar", "scatter", "composed"],
                 description: str = "",
                 x_axis_key: str = "name",
                 x_axis_label: str = "",
                 y_axis_unit: str = ""):
        self.config = {
            "title": title,
            "type": chart_type,
            "description": description,
            "xAxis": {
                "dataKey": x_axis_key,
                "label": x_axis_label
            },
            "yAxis": {
                "label": "", # Can be updated if needed
                "unit": y_axis_unit
            },
            "series": [],
            "data": []
        }

    def add_series(self, data_key: str, name: str, color: str = "#8884d8", type: str = None, stack_id: str = None):
        """Add a data series to the chart."""
        s = {"dataKey": data_key, "name": name, "color": color}
        if type: s["type"] = type # For composed charts
        if stack_id: s["stackId"] = stack_id
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
    while not (path / '.git').exists() and path != path.parent:
        path = path.parent
    return path if (path / '.git').exists() else Path(os.getcwd())

def _resolve_path(subdir: str, filename: str) -> Path:
    """
    Internal helper to resolve absolute paths for data files.
    Ensures the target directory exists.
    """
    root = get_project_root()
    target_dir = root / 'data' / subdir
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

def save_result(data: Any, filename: str, topic: Topic = "general", visual_type: Optional[str] = None):
    """
    Saves published data/metrics/configs to the dashboard's data store (data/{topic}).
    
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
    
    # If data is a ChartConfig object, convert to dict
    if hasattr(data, "to_dict"):
        data = data.to_dict()
    
    with open(file_path, 'w', encoding='utf-8') as f:
        toml.dump(data, f)
        
    print(f"✅ [{topic.upper()}] Data saved to: {file_path}")
