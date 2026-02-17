#!/usr/bin/env python3
"""
Sync data files from data/ to dashboard/public/data/

This script copies generated TOML files from the data analysis pipeline
to the dashboard's public data directory.

Usage:
    python sync_dashboard_data.py              # Sync all topics
    python sync_dashboard_data.py --topic analysis  # Sync specific topic
    python sync_dashboard_data.py --clean      # Remove all before syncing
"""

import shutil
import argparse
from pathlib import Path


def get_project_root() -> Path:
    """Find project root by locating .git directory."""
    path = Path(__file__).parent
    while not (path / ".git").exists() and path != path.parent:
        path = path.parent
    return path if (path / ".git").exists() else Path(__file__).parent


def sync_data(topic: str = None, clean: bool = False, verbose: bool = True):
    """
    Sync data from data/{topic} to dashboard/public/data/{topic}

    Args:
        topic: Specific topic to sync (analysis, modeling, data, general).
               If None, syncs all topics.
        clean: If True, removes destination before syncing
        verbose: If True, prints detailed output
    """
    import json

    root = get_project_root()
    source_base = root / "data"
    dest_base = root / "dashboard" / "public" / "data"

    # Valid topics
    topics = ["analysis", "modeling", "data", "general"] if topic is None else [topic]

    if verbose:
        print("🔄 Syncing dashboard data...")
        print(f"   Source: {source_base}")
        print(f"   Destination: {dest_base}\n")

    # Ensure destination base exists
    dest_base.mkdir(parents=True, exist_ok=True)

    total_synced = 0

    for t in topics:
        source_dir = source_base / t
        dest_dir = dest_base / t

        if not source_dir.exists():
            if verbose:
                print(f"⚠️  Skipping {t}: source directory not found")
            continue

        # Clean destination if requested
        if clean and dest_dir.exists():
            if verbose:
                print(f"🗑️  Cleaning {dest_dir}")
            shutil.rmtree(dest_dir)

        # Create destination directory
        dest_dir.mkdir(parents=True, exist_ok=True)

        # Sync all TOML files
        toml_files = list(source_dir.glob("*.toml"))

        if not toml_files:
            if verbose:
                print(f"⚠️  No TOML files found in {t}/")
            # Create empty manifest
            manifest_path = dest_dir / "manifest.json"
            with open(manifest_path, 'w') as f:
                json.dump({"files": []}, f)
            continue

        file_list = []
        for source_file in toml_files:
            dest_file = dest_dir / source_file.name
            shutil.copy2(source_file, dest_file)
            total_synced += 1
            file_list.append({
                "name": source_file.name,
                "path": f"/data/{t}/{source_file.name}"
            })
            if verbose:
                print(f"✅ [{t.upper()}] {source_file.name}")

        # Generate manifest.json for static export compatibility
        manifest_path = dest_dir / "manifest.json"
        with open(manifest_path, 'w') as f:
            json.dump({"files": file_list}, f, indent=2)

        if verbose:
            print(f"📝 [{t.upper()}] Generated manifest.json")

    if verbose:
        print(f"\n✨ Sync complete! {total_synced} file(s) synced.")

    return total_synced


def main():
    parser = argparse.ArgumentParser(
        description="Sync data files from data/ to dashboard/public/data/"
    )
    parser.add_argument(
        "--topic",
        choices=["analysis", "modeling", "data", "general"],
        help="Sync only a specific topic (default: sync all)"
    )
    parser.add_argument(
        "--clean",
        action="store_true",
        help="Remove destination directory before syncing"
    )
    parser.add_argument(
        "--quiet",
        action="store_true",
        help="Suppress output messages"
    )

    args = parser.parse_args()

    sync_data(
        topic=args.topic,
        clean=args.clean,
        verbose=not args.quiet
    )


if __name__ == "__main__":
    main()
