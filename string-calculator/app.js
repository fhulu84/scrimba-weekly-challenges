const mainContainer = document.getElementById("main-container")
const equationField = document.getElementById("equation-field")
const solveBtn = document.getElementById("solve-button")
const solutionDisplay = document.getElementById("solution-display")

const signColors = {
  '+' : 'green',
  '-' : 'yellow',
  '*' : 'orange',
  '/' : 'black',
  '=' : 'red'
};

solveBtn.addEventListener("click", function() {
  // Clear the solution contents on each click
  solutionDisplay.innerHTML = "";
  const equation = trim(equationField.value);
  try {
    const result = eval(equation);
  
    const regex = /^([-+]?\d+)\s?([-+*\/])\s?([-+]?\d+)$/;
    const match = equation.match(regex);
    if(match != null) {
      const equationComponents = [match[1], match[2], match[3], "=", result];
  
      solutionDisplay.innerHTML = equationComponents.map(item => {
        const bgColor = signColors[item] ? `style="background-color:${signColors[item]};"` : "";
        return `<div class="equation-component" ${bgColor}>
                ${item}
               </div>`;
      }).join('');
    } else {
      solutionDisplay.innerHTML = `<div class="equation-component">${result}</div>`;
    }
    
  } catch (e) {
    if(e instanceof SyntaxError) {
      alert("There is a syntax error in your equation!");
    } else {
      throw e;
    }
  }
});

equationField.addEventListener("keypress", function(e) {
if(!/[-+*\/()\s\d]/.test(e.key)) {
    e.preventDefault();
    if(e.key === "Enter"){
      solveBtn.click();
    }
  }
});

equationField.addEventListener("focus", function() {
  this.value = "";
})

function trim(value) {
  return value.replace(/^\s+|\s+$/g,"");
}

