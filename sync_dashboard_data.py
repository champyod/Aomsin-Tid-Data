import os
import shutil
import json
import argparse
from pathlib import Path

def sync_data(topic=None, clean=False):
    """
    Syncs data from the root 'data' directory to 'dashboard/public/data'.
    Generates manifest.json for each topic folder.
    """
    root_dir = Path(__file__).parent
    source_base = root_dir / "data"
    dest_base = root_dir / "dashboard" / "public" / "data"

    topics = ["analysis", "modeling", "data", "general"]
    if topic:
        if topic not in topics:
            print(f"❌ Error: Topic '{topic}' is not valid. Choose from {topics}")
            return
        topics = [topic]

    print(f"🔄 Syncing data to dashboard...")

    for t in topics:
        source_dir = source_base / t
        dest_dir = dest_base / t

        if not source_dir.exists():
            print(f"⚠️  Source directory not found: {source_dir}. Skipping...")
            continue

        # Clean destination if requested
        if clean and dest_dir.exists():
            print(f"🧹 Cleaning {dest_dir}...")
            shutil.rmtree(dest_dir)

        dest_dir.mkdir(parents=True, exist_ok=True)

        # Collect files to sync and create manifest
        synced_files = []

        # Get all TOML files
        toml_files = sorted(list(source_dir.glob("*.toml")))

        for src_file in toml_files:
            dest_file = dest_dir / src_file.name
            shutil.copy2(src_file, dest_file)

            # Read and parse TOML content to include in manifest
            try:
                import toml
                with open(src_file, "r", encoding="utf-8") as f:
                    content = toml.load(f)

                synced_files.append({
                    "name": src_file.stem,
                    "path": f"/data/{t}/{src_file.name}",
                    "data": content
                })
                print(f"  ✅ Synced & Parsed: {t}/{src_file.name}")
            except Exception as e:
                print(f"  ⚠️  Error parsing {src_file.name}: {e}")
                synced_files.append({
                    "name": src_file.stem,
                    "path": f"/data/{t}/{src_file.name}"
                })

        # Generate manifest.json
        manifest = {
            "topic": t,
            "files": synced_files,
            "total": len(synced_files)
        }

        manifest_path = dest_dir / "manifest.json"
        with open(manifest_path, "w", encoding="utf-8") as f:
            json.dump(manifest, f, indent=2)

        print(f"  📄 Generated manifest: {t}/manifest.json")

    print(f"✨ Sync complete!")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Sync data from notebooks to dashboard.")
    parser.add_argument("--topic", type=str, help="Specific topic to sync (analysis, modeling, data, general)")
    parser.add_argument("--clean", action="store_true", help="Clean destination directory before syncing")

    args = parser.parse_args()
    sync_data(topic=args.topic, clean=args.clean)
