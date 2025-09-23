import fs from "fs";
import { spawn } from "child_process";
import path from "path";

const MARKDOWN_DIR = "markdown";

console.log(`🔍 Watching ${MARKDOWN_DIR}/ for changes...`);

// Function to run the MDX conversion pipeline
function runConversion() {
  console.log("📝 Markdown changes detected, converting to MDX...");

  // Run the asset moving script
  const moveAssets = spawn("bash", ["scripts/movePostAssets.sh"], { stdio: "inherit" });

  moveAssets.on("close", (code) => {
    if (code === 0) {
      // Run the MDX creation script
      const createMDX = spawn("node", ["scripts/createMDX.js"], { stdio: "inherit" });

      createMDX.on("close", (code) => {
        if (code === 0) {
          // Run the property conversion script
          const convertProp = spawn("python", ["scripts/convertProp.py"], { stdio: "inherit" });

          convertProp.on("close", (code) => {
            if (code === 0) {
              console.log("✅ MDX conversion completed successfully");
            } else {
              console.error("❌ Property conversion failed");
            }
          });
        } else {
          console.error("❌ MDX creation failed");
        }
      });
    } else {
      console.error("❌ Asset moving failed");
    }
  });
}

// Watch for changes in the markdown directory
fs.watch(MARKDOWN_DIR, { recursive: true }, (eventType, filename) => {
  if (filename && (filename.endsWith('.md') || !filename.includes('.'))) {
    console.log(`📁 ${eventType}: ${filename}`);

    // Debounce the conversion to avoid multiple rapid executions
    clearTimeout(runConversion.timeout);
    runConversion.timeout = setTimeout(runConversion, 500);
  }
});

console.log("🚀 Markdown watcher is running. Press Ctrl+C to stop.");