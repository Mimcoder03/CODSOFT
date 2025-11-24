const expressionEl = document.getElementById('expression');
const miniResultEl = document.getElementById('miniResult');
const historyList = document.getElementById('historyList');
const toggleSciBtn = document.getElementById('toggleSci');
const sciRow = document.getElementById('sciRow');
const degToggleBtn = document.getElementById('degToggle');
const clearHistoryBtn = document.getElementById('clearHistory');

// Inverse Toggle Elements
const invToggleBtn = document.getElementById('invToggle');
const btnSin = document.getElementById('btnSin');
const btnCos = document.getElementById('btnCos');
const btnTan = document.getElementById('btnTan');

let expression = '';
let isDegrees = true; // Default to Degrees
let isInverse = false; // Default to Normal Trig
let history = JSON.parse(localStorage.getItem('calcHistory')) || [];

// Initialize
const themeToggleBtn = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'light') {
  document.body.classList.add('light-mode');
  themeToggleBtn.textContent = '☾';
}

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  themeToggleBtn.textContent = isLight ? '☾' : '☀';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

renderHistory();
updateDisplay();

// Keyboard Support
document.addEventListener('keydown', (e) => {
  const key = e.key;

  // Numbers and Operators
  if (/[0-9.\+\-\*\/\(\)\%\^\!]/.test(key)) {
    e.preventDefault();
    handleInput(key);
  }
  // Enter / Equals
  else if (key === 'Enter' || key === '=') {
    e.preventDefault();
    calculate();
  }
  // Backspace
  else if (key === 'Backspace') {
    e.preventDefault();
    handleInput('DEL');
  }
  // Escape (AC)
  else if (key === 'Escape') {
    e.preventDefault();
    handleInput('AC');
  }
  // 'c' for Clear/Delete
  else if (key.toLowerCase() === 'c') {
    e.preventDefault();
    handleInput('DEL');
  }
});

// Event Listeners
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.dataset.val;
    if (val && val !== 'INV') handleInput(val); // Ignore INV click here
  });
});

toggleSciBtn.addEventListener('click', () => {
  const isHidden = sciRow.getAttribute('aria-hidden') === 'true';
  sciRow.setAttribute('aria-hidden', !isHidden);
  sciRow.style.display = isHidden ? 'grid' : 'none';
  toggleSciBtn.innerHTML = isHidden ? '&#9650;' : '&#9660;';
});

invToggleBtn.addEventListener('click', () => {
  isInverse = !isInverse;
  invToggleBtn.classList.toggle('active');

  if (isInverse) {
    btnSin.textContent = 'sin⁻¹';
    btnSin.dataset.val = 'asin(';
    btnCos.textContent = 'cos⁻¹';
    btnCos.dataset.val = 'acos(';
    btnTan.textContent = 'tan⁻¹';
    btnTan.dataset.val = 'atan(';
  } else {
    btnSin.textContent = 'sin';
    btnSin.dataset.val = 'sin(';
    btnCos.textContent = 'cos';
    btnCos.dataset.val = 'cos(';
    btnTan.textContent = 'tan';
    btnTan.dataset.val = 'tan(';
  }
});

degToggleBtn.addEventListener('click', () => {
  isDegrees = !isDegrees;
  degToggleBtn.textContent = isDegrees ? 'Deg' : 'Rad';
  degToggleBtn.dataset.val = isDegrees ? 'DEG' : 'RAD'; // Update for consistency
});

clearHistoryBtn.addEventListener('click', () => {
  history = [];
  localStorage.removeItem('calcHistory');
  renderHistory();
});

// Input Handler
function handleInput(val) {
  if (val === 'AC-top' || val === 'AC') {
    expression = '';
    miniResultEl.textContent = '—';
  } else if (val === 'DEL') {
    expression = expression.slice(0, -1);
  } else if (val === '=') {
    calculate();
    return; // Calculate handles display update
  } else if (val === 'DEG' || val === 'RAD') {
    // Handled by specific listener, but prevent adding to expression
    return;
  } else {
    expression += val;
  }
  updateDisplay();
  if (val !== '=') calculate(true); // Live preview
}

function updateDisplay() {
  expressionEl.textContent = expression || '0';
  // Auto-scroll to end
  expressionEl.scrollLeft = expressionEl.scrollWidth;
}

function calculate(isPreview = false) {
  try {
    let evalStr = expression;
    if (!evalStr) {
      if (!isPreview) miniResultEl.textContent = '0';
      return;
    }

    // Auto-close parentheses
    const openParens = (evalStr.match(/\(/g) || []).length;
    const closeParens = (evalStr.match(/\)/g) || []).length;
    if (openParens > closeParens) {
      evalStr += ')'.repeat(openParens - closeParens);
    }

    // 1. Handle Factorial (!)
    // Replace x! with factorial(x)
    // Regex looks for a number or ) followed by !
    evalStr = evalStr.replace(/(\d+|\))!/g, (match, p1) => {
      return `factorial(${p1})`;
    });

    // 2. Replace Constants
    evalStr = evalStr.replace(/π/g, 'Math.PI');
    evalStr = evalStr.replace(/e/g, 'Math.E');

    // 3. Replace Functions
    // Handle Trig functions with Degree conversion
    const trigFuncs = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan'];
    trigFuncs.forEach(func => {
      const regex = new RegExp(`${func}\\(`, 'g');
      evalStr = evalStr.replace(regex, isDegrees ? `trig('${func}', ` : `Math.${func}(`);
    });

    evalStr = evalStr.replace(/log10\(/g, 'Math.log10(');
    evalStr = evalStr.replace(/ln\(/g, 'Math.log(');
    evalStr = evalStr.replace(/sqrt\(/g, 'Math.sqrt(');
    evalStr = evalStr.replace(/\^/g, '**');

    // Evaluate
    // Define helper functions for eval scope
    const factorial = (n) => {
      if (typeof n === 'string') n = parseFloat(n); // Handle parens result
      if (n < 0) return NaN;
      if (n === 0 || n === 1) return 1;
      let result = 1;
      for (let i = 2; i <= n; i++) result *= i;
      return result;
    };

    const trig = (type, val) => {
      const rad = val * (Math.PI / 180);
      // Fix precision issues (e.g. sin(180) should be 0)
      let res = Math.sin(rad); // Default
      if (type === 'cos') res = Math.cos(rad);
      if (type === 'tan') res = Math.tan(rad);
      if (type === 'asin') return Math.asin(val) * (180 / Math.PI);
      if (type === 'acos') return Math.acos(val) * (180 / Math.PI);
      if (type === 'atan') return Math.atan(val) * (180 / Math.PI);

      return parseFloat(res.toFixed(10));
    };

    // Safe evaluation using Function
    // We expose Math, factorial, trig to the function scope
    const result = new Function('Math', 'factorial', 'trig', `return ${evalStr}`)(Math, factorial, trig);

    if (!isFinite(result) || isNaN(result)) {
      throw new Error('Invalid');
    }

    // Success
    const formattedResult = parseFloat(result.toFixed(8)); // Clean up float errors
    miniResultEl.textContent = formattedResult;

    if (!isPreview) {
      addToHistory(expression, formattedResult);
      expression = String(formattedResult);
      updateDisplay();
    }

  } catch (e) {
    if (!isPreview) {
      miniResultEl.textContent = 'Error';
    }
    // In preview mode, ignore errors (incomplete expression)
  }
}

function addToHistory(exp, res) {
  history.unshift({ exp, res });
  if (history.length > 20) history.pop(); // Limit to 20
  localStorage.setItem('calcHistory', JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = '';
  history.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="hist-exp">${item.exp}</div>
      <div class="hist-res">= ${item.res}</div>
    `;
    li.addEventListener('click', () => {
      expression = String(item.res); // Or item.exp if preferred
      updateDisplay();
    });
    historyList.appendChild(li);
  });
}
