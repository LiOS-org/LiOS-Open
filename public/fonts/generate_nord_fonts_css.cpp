#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <map>
#include <vector>

// Function to parse a simple JSON file
std::map<std::string, std::vector<std::map<std::string, std::string> > > parse_json(const std::string& json_path) {
    std::ifstream json_file(json_path);
    if (!json_file.is_open()) {
        throw std::runtime_error("Error: JSON file '" + json_path + "' does not exist.");
    }

    std::string line;
    std::string json_content;
    while (std::getline(json_file, line)) {
        json_content += line;
    }

    std::map<std::string, std::vector<std::map<std::string, std::string> > > data;
    size_t pos = 0;
    while ((pos = json_content.find("{", pos)) != std::string::npos) {
        size_t end_pos = json_content.find("}", pos);
        std::string font_entry = json_content.substr(pos + 1, end_pos - pos - 1);
        std::map<std::string, std::string> font_data;
        size_t key_pos = 0;
        while ((key_pos = font_entry.find("\"", key_pos)) != std::string::npos) {
            size_t key_end = font_entry.find("\"", key_pos + 1);
            std::string key = font_entry.substr(key_pos + 1, key_end - key_pos - 1);
            size_t value_pos = font_entry.find("\"", key_end + 1);
            size_t value_end = font_entry.find("\"", value_pos + 1);
            std::string value = font_entry.substr(value_pos + 1, value_end - value_pos - 1);
            font_data[key] = value;
            key_pos = value_end + 1;
        }
        data["fonts"].push_back(font_data);
        pos = end_pos + 1;
    }

    return data;
}

void generate_css_from_json(const std::string& json_path, const std::string& css_path) {
    std::map<std::string, std::vector<std::map<std::string, std::string> > > data;
    try {
        data = parse_json(json_path);
    } catch (const std::exception& e) {
        std::cerr << e.what() << std::endl;
        return;
    }

    if (data.find("fonts") == data.end()) {
        std::cerr << "Error: 'fonts' key not found in JSON file '" << json_path << "'." << std::endl;
        return;
    }

    std::ostringstream css_stream;
    for (const auto& font : data["fonts"]) {
        try {
            std::string common_name = font.at("common-name");
            std::string name = font.at("Name");
            std::string src_url = name + ".ttf";

            // Replace spaces with %20
            size_t pos = 0;
            while ((pos = src_url.find(' ', pos)) != std::string::npos) {
                src_url.replace(pos, 1, "%20");
                pos += 3; // Move past the replacement
            }

            css_stream << "@font-face {\n";
            css_stream << "    font-family: '" << common_name << "';\n";
            css_stream << "    src: url('" << src_url << "');\n";
            css_stream << "}\n\n";
        } catch (const std::exception& e) {
            std::cerr << "Warning: Exception occurred: " << e.what() << std::endl;
        }
    }

    std::ofstream css_file(css_path);
    if (!css_file.is_open()) {
        std::cerr << "Error: Could not open CSS file '" << css_path << "' for writing." << std::endl;
        return;
    }

    css_file << css_stream.str();
    std::cout << "CSS rules generated and saved to " << css_path << std::endl;
}

int main() {
    std::string json_path = "/Users/mdsaifullah/Library/CloudStorage/OneDrive-Personal/Projects/LiOS-Open/public/fonts/nerd-fonts/nerd-fonts.js";
    std::string css_path = "/Users/mdsaifullah/Library/CloudStorage/OneDrive-Personal/Projects/LiOS-Open/public/fonts/nerd-fonts/nerd-fonts.css";
    generate_css_from_json(json_path, css_path);
    return 0;
}