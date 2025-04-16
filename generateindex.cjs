const fs = require("fs");
const path = require("path");

// 👇 Customize these paths
const iconsDir = "public/icons";
const outputDir = "public/data";
const outputFile = path.join(outputDir, "icons.json");

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read only .svg files
fs.readdir(iconsDir, (err, files) => {
  if (err) {
    console.error("❌ Failed to read icons folder:", err);
    return;
  }

  const svgFiles = files.filter(file => {
    const fullPath = path.join(iconsDir, file);
    return fs.statSync(fullPath).isFile() && file.endsWith(".svg");
  });

  fs.writeFile(outputFile, JSON.stringify(svgFiles, null, 2), (err) => {
    if (err) {
      console.error("❌ Failed to write icons.json:", err);
    } else {
      console.log(`✅ icons.json created with ${svgFiles.length} SVG file(s)`);
    }
  });
});