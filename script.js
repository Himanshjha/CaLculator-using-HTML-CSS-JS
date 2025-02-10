
let string = "";
let memory = 0;
let buttons = document.querySelectorAll('.button');
let isDarkMode = false;

// Add theme toggle function
function toggleTheme() {
  isDarkMode = !isDarkMode;
  document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
}

// Initialize theme based on system preference
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  toggleTheme();
}

function calculate(expression) {
  try {
    return eval(expression);
  } catch (error) {
    return "Error";
  }
}

// Handle keyboard input
document.addEventListener('keydown', (e) => {
  const key = e.key;
  if (/[\d\+\-\*\/\.\=]/.test(key) || key === 'Enter') {
    e.preventDefault();
    if (key === 'Enter') {
      string = calculate(string);
    } else {
      string += key;
    }
    document.querySelector('input').value = string;
  } else if (key === 'Escape') {
    string = "";
    document.querySelector('input').value = string;
  } else if (key === 'Backspace') {
    string = string.slice(0, -1);
    document.querySelector('input').value = string;
  }
});

Array.from(buttons).forEach((button) => {
  button.addEventListener('click', (e) => {
    const buttonText = e.target.innerHTML;
    
    switch(buttonText) {
      case '=':
        string = calculate(string);
        break;
      case 'C':
        string = "";
        break;
      case 'M+':
        memory += Number(string) || 0;
        string = "";
        break;
      case 'M-':
        memory -= Number(string) || 0;
        string = "";
        break;
      case 'MC':
        memory = 0;
        break;
      case 'MR':
        string = memory.toString();
        break;
      case '√':
        string = Math.sqrt(Number(string)).toString();
        break;
      case 'x²':
        string = Math.pow(Number(string), 2).toString();
        break;
      default:
        string += buttonText;
    }
    document.querySelector('input').value = string;
  });
});
