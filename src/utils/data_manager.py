import json
import os
import shutil
from pathlib import Path

from typing import Literal, Optional, Any

# Define valid topics that match dashboard pages/folders
Topic = Literal["analysis", "modeling", "cleaning", "general"]

def save_result(data: Any, filename: str, topic: Topic = "general", visual_type: Optional[str] = None):
    """
    Saves data to a specific topic folder in 'data/', for use by the Dashboard.
    
    Args:
        data (Any): The data to save (dict, list, etc.).
        filename (str): The filename (e.g., 'analysis_summary.json').
        topic (Topic): The dashboard section ('analysis', 'modeling', etc.).
                       This determines the subfolder: data/analysis/, data/modeling/
        visual_type (str, optional): Metadata about how this should be visualized (e.g. 'bar_chart', 'table').
                                     If provided, data might be wrapped or just used for documentation.
    """
    root_path = _get_project_root()
    
    # Map topic to folder path
    # e.g. topic='analysis' -> data/analysis/
    target_dir = root_path / 'data' / topic
    target_dir.mkdir(parents=True, exist_ok=True)
    
    file_path = target_dir / filename
    
    # If visual_type is passed, we could optionally wrap the data. 
    # But for now, existing dashboard expects raw structure. 
    # We will save the raw data as is, but this param enforces intent.
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        
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
