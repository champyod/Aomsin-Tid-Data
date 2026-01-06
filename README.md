# Aomsin-Tid-Data

Aomsin likes to collect data, so he built a HAREM of beautiful datasets.

This project provides a comprehensive data analysis environment with Jupyter notebooks and an interactive dashboard for exploring and visualizing datasets.

## ✨ Features

- 📊 **Jupyter Notebooks**: Interactive data analysis with comprehensive visualization templates
- 🎯 **Interactive Dashboard**: Web-based dashboard built with Streamlit
- 🔄 **Cross-Platform**: Works on Windows, Linux (Arch-based, Nix, Fedora, etc.), and macOS
- 📦 **UV Environment Management**: Fast and reliable Python package management
- 📈 **Rich Visualizations**: Support for matplotlib, seaborn, and plotly
- 🎨 **Data Analysis Tools**: pandas, numpy, scipy, and more

## 🚀 Quick Start

### Prerequisites

- Python 3.12 or higher
- UV package manager

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/champyod/Aomsin-Tid-Data.git
   cd Aomsin-Tid-Data
   ```

2. **Install UV** (if not already installed):

   **On Linux/macOS**:
   ```bash
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```

   **On Windows (PowerShell)**:
   ```powershell
   powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
   ```

   **Or using pip**:
   ```bash
   pip install uv
   ```

3. **Create and activate virtual environment**:
   ```bash
   uv sync
   ```

   This will automatically:
   - Create a virtual environment
   - Install all dependencies from `pyproject.toml`

4. **Activate the environment**:

   **On Linux/macOS**:
   ```bash
   source .venv/bin/activate
   ```

   **On Windows**:
   ```powershell
   .venv\Scripts\activate
   ```

## 📖 Usage

### Running Jupyter Notebooks

1. Start Jupyter:
   ```bash
   uv run jupyter notebook
   ```
   or
   ```bash
   uv run jupyter lab
   ```

2. Navigate to the `notebooks/` directory and open `data_analysis_template.ipynb`

### Running the Dashboard

1. Start the Streamlit dashboard:
   ```bash
   uv run streamlit run src/dashboard/app.py
   ```

2. Open your browser and navigate to `http://localhost:8501`

3. Upload your CSV file or explore with sample data

### Alternative: Run without activating environment

You can run commands directly with `uv run`:

```bash
# Run Jupyter
uv run jupyter notebook

# Run dashboard
uv run streamlit run src/dashboard/app.py

# Run Python scripts
uv run python main.py
```

## 📁 Project Structure

```
Aomsin-Tid-Data/
├── data/
│   ├── raw/              # Place your raw data files here
│   └── processed/        # Processed data outputs
├── notebooks/
│   └── data_analysis_template.ipynb  # Jupyter notebook template
├── src/
│   └── dashboard/
│       └── app.py        # Streamlit dashboard application
├── pyproject.toml        # Project dependencies and configuration
├── .gitignore
├── LICENSE
└── README.md
```

## 🔧 Adding Your Own Data

1. Place your CSV, Excel, or other data files in the `data/raw/` directory
2. Open the Jupyter notebook and modify the data loading section
3. Or use the dashboard's file upload feature

## 📊 Dashboard Features

- **Overview Tab**: Key metrics and quick insights
- **Visualizations Tab**: Interactive charts and graphs
  - Time series plots
  - Scatter plots
  - Box plots
  - Histograms
- **Data Table Tab**: Browse and search your data
- **Statistics Tab**: Statistical summaries and correlations

## 🛠️ Development

### Installing Development Dependencies

```bash
uv sync --extra dev
```

This installs additional tools like pytest, black, and ruff for development.

### Code Formatting

```bash
uv run black .
uv run ruff check .
```

## 🌐 Cross-Platform Compatibility

This project is tested and works on:

- ✅ **Windows** (10, 11)
- ✅ **Linux**
  - Arch-based (Arch, Manjaro, EndeavourOS)
  - Debian/Ubuntu
  - Fedora/RHEL
  - NixOS
  - openSUSE
- ✅ **macOS**

## 📦 Key Dependencies

- **Data Analysis**: pandas, numpy, scipy
- **Visualization**: matplotlib, seaborn, plotly
- **Dashboard**: streamlit
- **Notebooks**: jupyter, notebook, ipykernel
- **Data I/O**: openpyxl (for Excel files)

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Add new analysis notebooks
- Improve the dashboard
- Add new visualization types
- Fix bugs or improve documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💡 Tips

- Use `uv add <package>` to add new dependencies
- Use `uv remove <package>` to remove dependencies
- The `.gitignore` is configured to exclude data files and virtual environments
- Sample data is generated automatically if no data file is provided

## 🆘 Troubleshooting

### UV not found after installation
Make sure to restart your terminal or run:
```bash
source ~/.bashrc  # or ~/.zshrc on macOS
```

### Permission errors on Linux
You may need to add execute permissions:
```bash
chmod +x .venv/bin/*
```

### Port already in use (Dashboard)
Specify a different port:
```bash
uv run streamlit run src/dashboard/app.py --server.port 8502
```

## 📞 Support

For issues and questions, please open an issue on the GitHub repository.

---

**Happy Data Analysis! 📊✨**
