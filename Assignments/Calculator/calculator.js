const input = document.getElementById("calc-display");
const buttons = document.querySelectorAll('.btn-group button');
const deleteButton = document.querySelector('.btn-danger');
const calculator = document.getElementById("calculator-wrapper");
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const themeLabel = document.querySelector("label[for='themeToggle']");

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add("dark-mode");
  themeToggle.checked = true;
  themeLabel.textContent = "Dark Mode";
  themeLabel.classList.replace('text-dark', 'text-light');
}

// Toggle theme
themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
    themeLabel.textContent = "Dark Mode ON";
    themeLabel.classList.replace('text-dark', 'text-light');
  } else {
    body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
    themeLabel.textContent = "Dark Mode OFF";
    themeLabel.classList.replace('text-light', 'text-dark');
  }
});
let isDragging = false;
let offsetX, offsetY;

// Get header height
const headerHeight = document.querySelector('header')?.offsetHeight || 100;

calculator.addEventListener("mousedown", (e) => {
  if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT') {
    isDragging = true;
    offsetX = e.clientX - calculator.offsetLeft;
    offsetY = e.clientY - calculator.offsetTop;
  }
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const newLeft = e.clientX - offsetX;
    const newTop = e.clientY - offsetY;

    // Clamp position within the viewport
    const maxLeft = window.innerWidth - calculator.offsetWidth;
    const maxTop = window.innerHeight - calculator.offsetHeight;

    calculator.style.left = Math.min(Math.max(0, newLeft), maxLeft) + "px";
    calculator.style.top = Math.min(Math.max(headerHeight, newTop), maxTop) + "px";
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

let justEvaluated = false;

const operators = ['+', '-', '*', '/'];

window.addEventListener('DOMContentLoaded', () => {
    input.focus();
    input.value = 0;
  });

  function sanitizeExpression(expr) {
    return expr.replace(/[\+\-\*\/]+$/, ''); // remove trailing + - * /
  }

  // Helper to check if character is operator
function isOperator(char) {
    return operators.includes(char);
  }
  
  // Function to update display
  function updateDisplay(value) {
    const current = input.value;
    const lastChar = current.slice(-1);
  
    if (value === '.') {
        const parts = input.value.split(/[\+\-\*\/]/); // split by operators
        const lastNumber = parts[parts.length - 1];
      
        // if current number already contains a dot, block further dots
        if (lastNumber.includes('.')) {
          return; // ignore this dot
        }
      }
    // Handle reset after evaluation
    if (justEvaluated) {
      if (/[0-9]/.test(value)) {
        input.value = value;
      } else if (operators.includes(value)) {
        input.value += value;
      }
      justEvaluated = false;
      return;
    }
    

    if (current === '0' && /[0-9]/.test(value)) {
        input.value = value;
        return;
      }

       // Prevent multiple operators
       if (isOperator(value)) {
        if (current === '' || current === '0') {
          // 🛑 Don't allow operators at the beginning (except minus)
          if (value === '-') {
            input.value = value;
          }
          return;
        }
      
        if (isOperator(lastChar)) {
          // Allow '-' after * or / (e.g., 5*-3)
          if ((lastChar === '*' || lastChar === '/') && value === '-') {
            input.value += value;
          } else {
            // ✅ Replace the last operator with the new one
            input.value = current.slice(0, -1) + value;
          }
        } else {
          input.value += value;
        }
        return;
      }
      

  // Normal case
  input.value += value;
}
  

  // Add click listeners to all calculator buttons
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const value = button.textContent.trim();

      if (value === '=') {
        try {
          let expr = sanitizeExpression(input.value);
          let result = eval(expr);
          if (typeof result === 'number' && result % 1 !== 0) {
            result = Number(result).toFixed(4);
          }
          input.value = result;
        } catch {
          input.value = 'Error';
        }
        justEvaluated = true;
      }
       else {
            updateDisplay(value);
      }
      input.focus();
    const len = input.value.length;
    input.setSelectionRange(len, len);
    });
  });

  input.addEventListener("keydown", function (e) {
    const key = e.key;
    const allowedKeys = ['0','1','2','3','4','5','6','7','8','9','+','-','*','/','.','Backspace','Delete','ArrowLeft','ArrowRight','Enter','Tab'];
  
    // Prevent invalid keys
    if (!allowedKeys.includes(key)) {
      e.preventDefault();
      return;
    }
  
    // Handle Enter key
    if (key === "Enter") {
      try {
        let expr = sanitizeExpression(input.value);
        let result = eval(expr);
        if (typeof result === 'number' && result % 1 !== 0) {
            result = parseFloat(result.toFixed(4));
          }
          input.value = result;
      } catch {
        input.value = "Error";
      }
      justEvaluated = true;
  
      input.focus();
      const len = input.value.length;
      input.setSelectionRange(len, len);
      e.preventDefault();
      return;
    }
  
    // Reset to 0 if just evaluated and 0 is typed
    if (/[0-9+\-*/.]/.test(key)) {
        updateDisplay(key);
        e.preventDefault(); // prevent default key insert
        return;
        }
    });

  // Delete button functionality
  deleteButton.addEventListener('click', () => {
    input.value = input.value.slice(0, -1);
    if (input.value === '' || input.value === '-') {
      input.value = '0';
    }
    input.focus();
  });

  // Maintain '0' if input becomes empty (from manual input)
  input.addEventListener('input', () => {
    if (input.value.trim() === '') {
      input.value = '0';
    }
  });
