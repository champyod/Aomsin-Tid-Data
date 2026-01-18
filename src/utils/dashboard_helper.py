import os
import json
import pandas as pd
import numpy as np
from pathlib import Path
from typing import Dict, Any, Union

# Define allowed folders to maintain structure
ALLOWED_FOLDERS = ["analysis", "modeling", "preprocessing"]
BASE_OUTPUT_DIR = Path(__file__).resolve().parent.parent.parent / "dashboard" / "public" / "data"

class DashboardExporter:
    @staticmethod
    def export(folder_name: str, file_name: str, data: Dict[str, Any]):
        """
        Exports data to a JSON file for the web dashboard.
        
        Args:
            folder_name (str): The logical folder name (e.g., 'analysis', 'modeling'). 
                               Must be one of ['analysis', 'modeling', 'preprocessing'].
            file_name (str): The name of the output JSON file (e.g., 'analysis_summary.json').
            data (dict): The dictionary of data to export.
        """
        
        if folder_name not in ALLOWED_FOLDERS:
            raise ValueError(f"Invalid folder_name '{folder_name}'. Must be one of {ALLOWED_FOLDERS}")
        
        # Ensure output directory exists
        # We put everything in public/data, potentially namespaced by folder_name if needed, 
        # but for now let's keep it simple or allow subfolders.
        # Let's put it in public/data/<folder_name>/<file_name> to be organized.
        output_dir = BASE_OUTPUT_DIR / folder_name
        output_dir.mkdir(parents=True, exist_ok=True)
        
        output_path = output_dir / file_name
        
        # Custom encoder to handle numpy types
        class NumpyEncoder(json.JSONEncoder):
            def default(self, obj):
                if isinstance(obj, (np.integer, np.int64, np.int32)):
                    return int(obj)
                if isinstance(obj, (np.floating, np.float64, np.float32)):
                    return float(obj)
                if isinstance(obj, np.ndarray):
                    return obj.tolist()
                return super(NumpyEncoder, self).default(obj)
        
        try:
            with open(output_path, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2, cls=NumpyEncoder)
            print(f"✅ Successfully exported to: {output_path}")
        except Exception as e:
            print(f"❌ Error exporting data: {e}")

# Example usage helper
def export_dashboard_data(folder_name: str, file_name: str, data: Dict[str, Any]):
    DashboardExporter.export(folder_name, file_name, data)
