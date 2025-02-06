#!/bin/bash

# Check if directory is provided as argument
if [ $# -eq 0 ]; then
    echo "Usage: $0 <directory_path>"
    exit 1
fi

directory="$1"

# Check if directory exists
if [ ! -d "$directory" ]; then
    echo "Error: Directory '$directory' not found"
    exit 1
fi

# Find all markdown files and process them
find "$directory" -type f -name "*.md" | while read -r file; do
    echo "Processing: $file"
    
    # Create a temporary file
    temp_file=$(mktemp)
    
    # Replace frameborder with frameBorder, being careful to preserve the value
    sed 's/frameborder=\(['"'"'"]\)/frameBorder=\1/g' "$file" > "$temp_file"
    
    # Check if any changes were made
    if cmp -s "$file" "$temp_file"; then
        echo "No changes needed in: $file"
    else
        # Backup original file
        cp "$file" "${file}.bak"
        
        # Move temporary file to original
        mv "$temp_file" "$file"
        echo "Updated: $file (backup created as ${file}.bak)"
    fi
done

echo "Processing complete!"