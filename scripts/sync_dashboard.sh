#!/bin/bash

# Sync dashboard data using Bash
# Replaces sync_dashboard_data.py for universal OS usage

# Set directories relative to the script location
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
SOURCE_BASE="$ROOT_DIR/data"
DEST_BASE="$ROOT_DIR/dashboard/public/data"

# Topics to sync
TOPICS=("analysis" "modeling" "data" "general")

echo "🔄 Syncing dashboard data (Bash)..."
echo "   Source: $SOURCE_BASE"
echo "   Destination: $DEST_BASE"

# Ensure destination exists
mkdir -p "$DEST_BASE"

# Sync each topic
for topic in "${TOPICS[@]}"; do
    source_dir="$SOURCE_BASE/$topic"
    dest_dir="$DEST_BASE/$topic"

    if [ ! -d "$source_dir" ]; then
        echo "⚠️  Skipping $topic: source directory not found"
        continue
    fi

    # Create destination
    mkdir -p "$dest_dir"

    # Copy files and build manifest JSON using a more robust Bash array
    manifest_entries=()
    
    # Loop over all toml files
    while IFS= read -r toml; do
        [ -e "$toml" ] || continue
        name=$(basename "$toml")
        cp "$toml" "$dest_dir/"
        # Correctly formatted JSON object
        entry="{\"name\":\"$name\",\"path\":\"/data/$topic/$name\"}"
        manifest_entries+=("$entry")
        echo "✅ [$topic] $name"
    done < <(find "$source_dir" -maxdepth 1 -name "*.toml")
    
    # Combine entries with commas
    IFS=','
    joined_entries="${manifest_entries[*]}"
    
    # Construct final JSON and pipe to jq
    echo "{\"files\":[$joined_entries]}" | jq . > "$dest_dir/manifest.json"
    
    echo "📝 [$topic] Generated manifest.json"
done

echo -e "\n✨ Sync complete!"
