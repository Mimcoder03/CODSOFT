#  Scientific Calculator

A sleek, feature-rich scientific calculator with a modern UI, supporting both basic and advanced mathematical operations. Built with vanilla HTML, CSS, and JavaScript.

Screnshort:
![alt text](<Screenshot 2025-11-25 003045.png>) ![alt text](<Screenshot 2025-11-25 002953.png>)


![Calculator Screenshot](https://img.shields.io/badge/version-1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎨 User Interface
- **Dual Theme Support**: Toggle between dark and light modes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Live Preview**: See calculation results in real-time as you type
- **Collapsible Scientific Panel**: Expand/collapse advanced functions as needed

### 🔢 Calculator Capabilities

#### Basic Operations
- Addition, Subtraction, Multiplication, Division
- Percentage calculations
- Decimal support
- Delete (⌫) and Clear (AC) functions

#### Scientific Functions
- **Trigonometry**: sin, cos, tan (with inverse functions)
- **Angle Modes**: Switch between Degrees (Deg) and Radians (Rad)
- **Logarithmic**: log₁₀ and natural log (ln)
- **Powers & Roots**: x^y (power), √x (square root)
- **Advanced Functions**: 
  - Factorial (x!)
  - Reciprocal (1/x)
  - Mathematical constants (π, e)
  - Parentheses support for complex expressions

### 📜 History
- **Persistent History**: Saves up to 20 recent calculations
- **Local Storage**: History persists across browser sessions
- **Reusable Results**: Click any history item to reuse the result
- **Clear History**: One-click history management

### ⌨️ Keyboard Support
- **Numbers & Operators**: `0-9`, `.`, `+`, `-`, `*`, `/`, `%`, `^`, `!`, `(`, `)`
- **Calculate**: `Enter` or `=`
- **Delete**: `Backspace` or `C`
- **Clear All**: `Escape`

## 🚀 Getting Started

### Installation

1. Clone or download this repository:
```bash
git clone <repository-url>
cd calculator
```

2. Open `index.html` in your web browser:
```bash
# Simply double-click index.html, or
# Open with your preferred browser
```

No build process or dependencies required!

### File Structure

```
calculator/
├── index.html      # Main HTML structure
├── style.css       # Styling and themes
├── script.js       # Calculator logic and functionality
└── README.md       # This file
```

## 💻 Usage

### Basic Calculations
1. Click number buttons or type on your keyboard
2. Use operator buttons (+, -, ×, ÷) or keyboard equivalents
3. Press `=` or `Enter` to calculate
4. Use `AC` to clear, `⌫` to delete last character

### Scientific Functions
1. Click the `▼` button below the display to expand the scientific panel
2. Toggle between `Rad` and `Deg` modes for trigonometric functions
3. Click `Inv` to access inverse trigonometric functions (sin⁻¹, cos⁻¹, tan⁻¹)
4. Use parentheses for complex expressions (auto-closes on calculation)

### Theme Toggle
- Click the `☀` (sun) or `☾` (moon) icon in the top-right to switch themes
- Your theme preference is saved automatically

### History Management
- View recent calculations in the History panel on the right
- Click any history item to load its result into the calculator
- Click "Clear" to delete all history

## 🎯 Examples

```
Basic: 15 + 25 × 2 = 65
Percentage: 200 × 25% = 50
Power: 2^8 = 256
Factorial: 5! = 120
Trigonometry: sin(30) = 0.5 (in Deg mode)
Complex: sqrt(16) + 2^3 = 12
Nested: (5 + 3) × (10 - 2) = 64
```

## 🎨 Customization

### Modifying Colors
Edit `style.css` to customize the color scheme. Key CSS variables:
- Theme colors are defined in the `:root` and `.light-mode` selectors
- Main calculator colors: background, buttons, display, etc.
- Adjust gradients and shadows for different visual effects

### Adding Functions
To add new mathematical functions:
1. Add a button in `index.html` within the `#sciRow` div
2. Add the function mapping in `script.js` in the `calculate()` function
3. Style the button in `style.css` if needed

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic structure with ARIA labels for accessibility
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **Vanilla JavaScript**: No frameworks or libraries

### Browser Compatibility
- Chrome/Edge: ✅ Fully supported
- Firefox: ✅ Fully supported
- Safari: ✅ Fully supported
- Opera: ✅ Fully supported

### Features Implementation
- **Local Storage**: History and theme preferences
- **Function Constructor**: Safe expression evaluation
- **Regular Expressions**: Input parsing and function replacement
- **Event Delegation**: Efficient event handling

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

For questions or feedback, please open an issue on the repository.

---

**Enjoy calculating!** 🧮✨
