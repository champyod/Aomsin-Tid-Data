"""
Aomsin Tid Data - Main Entry Point

This script provides quick access to common tasks.
"""

import sys
import subprocess
from pathlib import Path


def show_help():
    """Display help information."""
    help_text = """
    Aomsin Tid Data - Data Analysis Tool
    
    Available commands:
    
    1. Start Dashboard:
       uv run streamlit run src/dashboard/app.py
    
    2. Start Jupyter Notebook:
       uv run jupyter notebook
    
    3. Start Jupyter Lab:
       uv run jupyter lab
    
    4. Run this help:
       uv run python main.py
    
    For more information, see README.md
    """
    print(help_text)


def main():
    """Main function."""
    print("🎯 Aomsin Tid Data - Data Analysis Project")
    print("=" * 50)
    
    # Show project structure
    project_root = Path(__file__).parent
    print(f"\n📁 Project Location: {project_root}")
    print(f"\n📂 Project Structure:")
    print(f"  ├── data/           # Your datasets")
    print(f"  ├── notebooks/      # Jupyter notebooks")
    print(f"  ├── src/dashboard/  # Dashboard application")
    print(f"  └── pyproject.toml  # Dependencies")
    
    show_help()


if __name__ == "__main__":
    main()

