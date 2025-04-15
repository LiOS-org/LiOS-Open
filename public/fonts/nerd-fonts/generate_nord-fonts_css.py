import json
import os

def generate_css_from_json(json_path, css_path):
    print(f"Checking if JSON file exists at: {json_path}")
    if not os.path.exists(json_path):
        print(f"Error: JSON file '{json_path}' does not exist.")
        return

    with open(json_path, 'r') as json_file:
        try:
            data = json.load(json_file)
        except json.JSONDecodeError as e:
            print(f"Error: Failed to parse JSON file '{json_path}': {e}")
            return

    if 'fonts' not in data:
        print(f"Error: 'fonts' key not found in JSON file '{json_path}'.")
        return

    css_lines = []
    for font in data['fonts']:
        try:
            common_name = font['common-name']
            name = font['Name']
            parent = font['parent']
            src_url = f"{name.replace(' ', '%20')}.ttf"
            
            css_lines.append(f"@font-face {{")
            css_lines.append(f"    font-family: '{common_name}';")
            css_lines.append(f"    src: url('{src_url}');")
            css_lines.append(f"}}\n")
        except KeyError as e:
            print(f"Warning: '{str(e)}' not found in font entry: {font}")

    with open(css_path, 'w') as css_file:
        css_file.write('\n'.join(css_lines))

    print("CSS rules generated and saved to", css_path)

if __name__ == "__main__":
    # Use absolute paths
    json_path = "/Users/mdsaifullah/Library/CloudStorage/OneDrive-Personal/Projects/LiOS-Open/public/fonts/nerd-fonts/nerd-fonts.js"
    css_path = "/Users/mdsaifullah/Library/CloudStorage/OneDrive-Personal/Projects/LiOS-Open/public/fonts/nerd-fonts/nerd-fonts.css"
    generate_css_from_json(json_path, css_path)