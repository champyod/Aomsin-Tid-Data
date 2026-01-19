import json
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
                 x_axis_label: str = ""):
        self.config = {
            "title": title,
            "type": chart_type,
            "description": description,
            "xAxis": {
                "dataKey": x_axis_key,
                "label": x_axis_label
            },
            "yAxis": {
                "label": "" # Can be updated
            },
            "series": [],
            "data": []
        }

    def add_series(self, data_key: str, name: str, color: str = "#8884d8", type: str = None):
        """Add a data series to the chart."""
        s = {"dataKey": data_key, "name": name, "color": color}
        if type: s["type"] = type # For composed charts
        self.config["series"].append(s)
        return self

    def set_data(self, data: List[Dict[str, Any]]):
        """Set the data rows."""
        self.config["data"] = data
        return self
    
    def to_dict(self):
        return self.config

def save_result(data: Any, filename: str, topic: Topic = "general", visual_type: Optional[str] = None, file_format: Literal["json", "toml"] = "toml"):
    """
    Saves data to a specific topic folder in 'data/', for use by the Dashboard.
    
    Args:
        data (Any): The data to save (dict, list, etc.).
        filename (str): The filename (e.g., 'analysis_summary'). Extension added automatically if missing.
        topic (Topic): The dashboard section ('analysis', 'modeling', etc.).
                       This determines the subfolder: data/analysis/, data/modeling/
        visual_type (str, optional): Metadata about how this should be visualized (e.g. 'bar_chart', 'table').
        file_format (str): 'json' or 'toml'. Defaults to 'toml'.
    """
    root_path = _get_project_root()
    
    # Map topic to folder path
    target_dir = root_path / 'data' / topic
    target_dir.mkdir(parents=True, exist_ok=True)
    
    # Ensure extension matches format
    base_name = os.path.splitext(filename)[0]
    final_filename = f"{base_name}.{file_format}"
    file_path = target_dir / final_filename
    
    # If data is a ChartConfig object, convert to dict
    if hasattr(data, "to_dict"):
        data = data.to_dict()
    
    with open(file_path, 'w', encoding='utf-8') as f:
        if file_format == 'json':
            json.dump(data, f, indent=2, ensure_ascii=False)
        elif file_format == 'toml':
            toml.dump(data, f)
        
    print(f"✅ [{topic.upper()}] Data saved to: {file_path}")

# Backward compatibility or low-level usage
def save_json(data: dict, filename: str, folder: str = "results"):
    """Legacy/Low-level saver. Use save_result for dashboard data."""
    root_path = _get_project_root()
    target_dir = root_path / 'data' / folder
    target_dir.mkdir(parents=True, exist_ok=True)
    file_path = target_dir / filename
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"✅ Data saved to: {file_path}")

def load_raw_data(filename: str) -> str:
    """Returns the absolute path to a raw data file."""
    return str(_get_project_root() / 'data' / 'raw' / filename)

def _get_project_root() -> Path:
    """Helper to find project root."""
    path = Path(os.getcwd())
    while not (path / '.git').exists() and path != path.parent:
        path = path.parent
    return path if (path / '.git').exists() else Path(os.getcwd())
