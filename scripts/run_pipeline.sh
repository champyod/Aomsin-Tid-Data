#!/bin/bash

# Dashboard Data Pipeline ORCHESTRATOR
# Uses uv to run python scripts for data processing
# and bash for universal synchronization.

set -e # Exit on error

# Find project root relative to script location
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "🚀 Running Aomsin Tid Data Dashboard Pipeline from $ROOT_DIR..."

# 1. Run Data Enrichment (Python with uv)
echo "------------------------------------------------"
echo "🛠️  Enriching Data & Insights..."
cd "$ROOT_DIR"
uv run python scripts/run_data_updates.py

# 2. Sync to Dashboard (Bash)
echo "------------------------------------------------"
echo "📤 Syncing to Dashboard Public Data..."
bash scripts/sync_dashboard.sh

echo "------------------------------------------------"
echo "🏁 Pipeline Completed Successfully!"