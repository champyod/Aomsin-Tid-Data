#!/usr/bin/env python3
"""
Setup verification script for Aomsin Tid Data project.

This script verifies that all dependencies are properly installed
and the environment is set up correctly.
"""

import sys
import importlib
from pathlib import Path


def check_python_version():
    """Check if Python version is 3.12 or higher."""
    print("🐍 Checking Python version...")
    version = sys.version_info
    if version >= (3, 12):
        print(f"   ✅ Python {version.major}.{version.minor}.{version.micro}")
        return True
    else:
        print(f"   ❌ Python {version.major}.{version.minor}.{version.micro} (requires 3.12+)")
        return False


def check_package(package_name, display_name=None):
    """Check if a package is installed."""
    if display_name is None:
        display_name = package_name
    
    try:
        module = importlib.import_module(package_name)
        version = getattr(module, "__version__", "unknown")
        print(f"   ✅ {display_name} ({version})")
        return True
    except ImportError:
        print(f"   ❌ {display_name} not found")
        return False


def check_directories():
    """Check if required directories exist."""
    print("\n📁 Checking project directories...")
    project_root = Path(__file__).parent
    directories = [
        "data/raw",
        "data/cleaned",
        "notebooks",
        "dashboard/src",
    ]
    
    all_exist = True
    for dir_path in directories:
        full_path = project_root / dir_path
        if full_path.exists():
            print(f"   ✅ {dir_path}/")
        else:
            print(f"   ❌ {dir_path}/ not found")
            all_exist = False
    
    return all_exist


def check_files():
    """Check if required files exist."""
    print("\n📄 Checking project files...")
    project_root = Path(__file__).parent
    files = [
        "pyproject.toml",
        "notebooks/preprocessing/1_cleaning.ipynb",
        "dashboard/package.json",
        "README.md",
    ]
    
    all_exist = True
    for file_path in files:
        full_path = project_root / file_path
        if full_path.exists():
            print(f"   ✅ {file_path}")
        else:
            print(f"   ❌ {file_path} not found")
            all_exist = False
    
    return all_exist


def main():
    """Main verification function."""
    print("=" * 60)
    print("🔍 Aomsin Tid Data - Setup Verification")
    print("=" * 60)
    print()
    
    # Check Python version
    python_ok = check_python_version()
    
    # Check core packages
    print("\n📦 Checking core data analysis packages...")
    packages_ok = all([
        check_package("pandas", "pandas"),
        check_package("numpy", "numpy"),
        check_package("matplotlib", "matplotlib"),
        check_package("seaborn", "seaborn"),
        check_package("plotly", "plotly"),
        check_package("scipy", "scipy"),
    ])
    
    # Check notebook packages
    print("\n📓 Checking Jupyter packages...")
    jupyter_ok = all([
        check_package("jupyter", "jupyter"),
        check_package("notebook", "notebook"),
        check_package("ipykernel", "ipykernel"),
    ])
    
    # Check dashboard packages
    print("\n🎯 Checking dashboard packages...")
    dashboard_ok = check_package("streamlit", "streamlit")
    
    # Check project structure
    dirs_ok = check_directories()
    files_ok = check_files()
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 Summary")
    print("=" * 60)
    
    all_checks = [
        ("Python version", python_ok),
        ("Data analysis packages", packages_ok),
        ("Jupyter packages", jupyter_ok),
        ("Dashboard packages", dashboard_ok),
        ("Project directories", dirs_ok),
        ("Project files", files_ok),
    ]
    
    for check_name, status in all_checks:
        status_icon = "✅" if status else "❌"
        print(f"{status_icon} {check_name}")
    
    print()
    
    if all(status for _, status in all_checks):
        print("🎉 All checks passed! Your environment is ready.")
        print("\nNext steps:")
        print("  1. Run Jupyter: uv run jupyter notebook")
        print("  2. Run Dashboard: uv run streamlit run src/dashboard/app.py")
        return 0
    else:
        print("⚠️  Some checks failed. Please run 'uv sync' to install dependencies.")
        return 1


if __name__ == "__main__":
    sys.exit(main())
