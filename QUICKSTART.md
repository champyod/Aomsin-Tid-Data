# Quick Start Guide

This guide helps you get started with the Aomsin Tid Data project quickly.

## 🚀 Super Quick Start (One-liner)

After cloning the repository:

### Linux/macOS
```bash
pip install uv && uv sync && uv run python verify_setup.py
```

### Windows (PowerShell)
```powershell
pip install uv; uv sync; uv run python verify_setup.py
```

## 📋 Step-by-Step Guide

### 1. Install UV

**Option A: Using pip (Recommended for all platforms)**
```bash
pip install uv
```

**Option B: Using curl (Linux/macOS)**
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

**Option C: Using PowerShell (Windows)**
```powershell
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

### 2. Install Dependencies

```bash
uv sync
```

This command will:
- Create a virtual environment in `.venv/`
- Install all required packages
- Set up Python 3.12

### 3. Verify Installation

```bash
uv run python verify_setup.py
```

Expected output:
```
🎉 All checks passed! Your environment is ready.
```

### 4. Start Working

**Option A: Launch Jupyter Notebook**
```bash
uv run jupyter notebook
```

**Option B: Launch Jupyter Lab**
```bash
uv run jupyter lab
```

**Option C: Launch Dashboard**
```bash
uv run streamlit run src/dashboard/app.py
```

## 🎯 Common Commands

| Action | Command |
|--------|---------|
| Install dependencies | `uv sync` |
| Run verification | `uv run python verify_setup.py` |
| Start Jupyter Notebook | `uv run jupyter notebook` |
| Start Jupyter Lab | `uv run jupyter lab` |
| Start Dashboard | `uv run streamlit run src/dashboard/app.py` |
| Add new package | `uv add <package-name>` |
| Remove package | `uv remove <package-name>` |
| Show installed packages | `uv pip list` |

## 🔧 Platform-Specific Notes

### Arch Linux / Manjaro / EndeavourOS
```bash
# UV should work out of the box
pip install uv
uv sync
```

### NixOS
```bash
# You may need to use a Python environment
nix-shell -p python312 python312Packages.pip
pip install uv
uv sync
```

### Fedora / RHEL / CentOS
```bash
# Install pip if not available
sudo dnf install python3-pip
pip install uv
uv sync
```

### Ubuntu / Debian
```bash
# Install pip if not available
sudo apt update
sudo apt install python3-pip
pip install uv
uv sync
```

### Windows
```powershell
# Make sure Python 3.12+ is installed
python --version

# Install UV
pip install uv

# Sync dependencies
uv sync
```

## 🆘 Troubleshooting

### Issue: "uv: command not found"
**Solution**: Restart your terminal or add UV to PATH:
```bash
# Linux/macOS
export PATH="$HOME/.local/bin:$PATH"

# Or restart your shell
```

### Issue: "Python version 3.12 not found"
**Solution**: Install Python 3.12 or higher:
```bash
# Ubuntu/Debian
sudo apt install python3.12

# Fedora
sudo dnf install python3.12

# Arch
sudo pacman -S python

# macOS (with Homebrew)
brew install python@3.12
```

### Issue: Dashboard won't start
**Solution**: Check if port 8501 is available:
```bash
# Use a different port
uv run streamlit run src/dashboard/app.py --server.port 8502
```

### Issue: Permission errors on Linux
**Solution**: Give execute permissions:
```bash
chmod +x .venv/bin/*
```

## 📚 Next Steps

1. ✅ Verify your setup: `uv run python verify_setup.py`
2. 📊 Open the sample notebook: `uv run jupyter notebook`
3. 🎨 Explore the dashboard: `uv run streamlit run src/dashboard/app.py`
4. 📁 Add your data to `data/raw/`
5. 🔬 Start analyzing!

## 💡 Tips

- Use `uv run` before any Python command to ensure you're using the project environment
- The sample notebook includes examples for common data analysis tasks
- The dashboard works with any CSV file you upload
- Check `README.md` for more detailed information

---

Happy analyzing! 📊✨
