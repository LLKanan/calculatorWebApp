function add(num1,num2){
    return Number(num1) + Number(num2);
}

function subtract(num1,num2){
    return num1-num2;
}

function multiply(num1,num2){
    console.log(num1,num2);
    return num1 * num2;
}

function divide(num1,num2){
    return num1 / num2;
}

function operate(num1,num2,operator){
    switch(operator){
        case '+':
            return add(num1,num2);
        case '-':
            return subtract(num1,num2);
        case '*':
            return multiply(num1,num2);
        case '/':
            return divide(num1,num2);
    }
}

const currentNum = document.getElementsByClassName("currentNum")[0];
const topButtons = document.getElementsByClassName("topButton");
const equation = document.getElementsByClassName("equation")[0];
function clearCurrent(){
    currentNum.dataset.cvalue = "0";
    currentNum.dataset.dot = "0";
    currentNum.innerHTML = "0";
    equation.dataset.num1 = "";
    equation.dataset.num2 = "";
    equation.dataset.operator = "";
    equation.innerHTML = "";
}
function deleteCurrent(){
    if(currentNum.dataset.cvalue != "0"){
        if(currentNum.dataset.cvalue.slice(-1) == '.'){
            currentNum.dataset.dot = "0";
        }
        newValue = currentNum.dataset.cvalue.slice(0,-1);
        currentNum.innerHTML = newValue;
        currentNum.dataset.cvalue = newValue;
    }
    if(currentNum.cvalue == ""){
    currentNum.dataset.cvalue = "0";
    currentNum.dataset.dot = "0";
    currentNum.innerHTML = "0";
    }
}
topButtons[0].addEventListener("click",function(){
    clearCurrent();
});
topButtons[1].addEventListener("click",function(){
    deleteCurrent();
});


function updateCurrentNum(value){
    if(value == '.'){
        if(currentNum.dataset.dot == '0'){
            currentNum.dataset.dot = '1';
        }
        else{
            return;
        }
    }
    if (((currentNum.dataset.cvalue == "0")||(currentNum.dataset.cvalue == ""))
        && (value != '.')){
            currentNum.dataset.cvalue = value;
    }
    else{
        currentNum.dataset.cvalue += value;
    }
    currentNum.innerHTML = currentNum.dataset.cvalue;
}
const numberButtons = document.getElementsByClassName("numberButton");
for(let i = 0; i < numberButtons.length;i++){
    numberButtons[i].addEventListener("click",function(){
        const value = event.target.innerHTML;
        updateCurrentNum(value);
    });
}

function operatorExecute(operator){
    if(equation.dataset.num1 == ""){
        equation.dataset.operator = operator;
        equation.dataset.num1 = currentNum.dataset.cvalue;
        equation.innerHTML = currentNum.dataset.cvalue + " " + operator;
        currentNum.dataset.cvalue = "";
        currentNum.dataset.dot = "0";
    }
    else if((currentNum.innerHTML == equation.dataset.num1) &&
        (currentNum.dataset.cvalue == "")){
        equation.dataset.operator = operator;
        equation.innerHTML = equation.dataset.num1 + " " + operator;
    }
    else{
        let result = "";
        equation.dataset.num2 = currentNum.dataset.cvalue;
        switch(equation.dataset.operator){
            case '÷':
                if (equation.dataset.num2 == 0){
                    alert("Don't divide by zero, resetting calculator");
                    clearCurrent();
                    return;
                }
                result = divide(equation.dataset.num1,equation.dataset.num2);
                break;
            case 'x':
                result = multiply(equation.dataset.num1,equation.dataset.num2);
                break;
            case '-':
                result = subtract(equation.dataset.num1,equation.dataset.num2);
                break;
            case '+':
                result = add(equation.dataset.num1,equation.dataset.num2);
                break;
        }
        currentNum.innerHTML = result;
        currentNum.dataset.cvalue = "";
        currentNum.dataset.dot = "0";
        equation.dataset.operator = operator;
        equation.dataset.num1 = result;
        equation.dataset.num2 = "";
        equation.innerHTML = equation.dataset.num1 + " " + operator;
    }
}

const operatorButtons = document.getElementsByClassName("operatorButton");
console.log(operatorButtons);
for(let i = 0; i<operatorButtons.length;i++){
    operatorButtons[i].addEventListener("click",function(){
        let operator = event.target.innerHTML;
        operatorExecute(operator);
    });
}

function execute(){
    equation.dataset.num2 = currentNum.dataset.cvalue;
    if (equation.dataset.operator == ""){
        return;
    }
    let result = "";
    switch(equation.dataset.operator){
        case '÷':
            if (equation.dataset.num2 == 0){
                alert("Don't divide by zero, resetting calculator");
                clearCurrent();
                return;
            }
        case 'x':
            result = multiply(equation.dataset.num1,equation.dataset.num2);
            break;
        case '-':
            result = subtract(equation.dataset.num1,equation.dataset.num2);
            break;
        case '+':
            result = add(equation.dataset.num1,equation.dataset.num2);
            break;
    }
    equation.innerHTML = equation.dataset.num1 + " " + 
        equation.dataset.operator + " " + equation.dataset.num2 + " =";
    currentNum.innerHTML = result;
    currentNum.dataset.cvalue = result;
    currentNum.dataset.dot = "0";
    for(let i = 0; i < result.length;i++){
        if(result[i] == '.'){
            currentNum.dataset.dot = '1';
            break;
        }
    }
    equation.dataset.num1 = "";
    equation.dataset.num2 = "";
    equation.dataset.operator = "";

}
const executeButton = document.getElementsByClassName("executeButton")[0];
executeButton.addEventListener("click",function(){execute()});

function convertOperator(keyboardOperator) {
  if (keyboardOperator === '/') return '÷'
  if (keyboardOperator === '*') return 'x'
  if (keyboardOperator === '-') return '−'
  if (keyboardOperator === '+') return '+'
}

function handleKeyboardInput(e){
  if (e.key >= 0 && e.key <= 9) updateCurrentNum(e.key);
  if (e.key === '.') updateCurrentNum(e.key);
  if (e.key === '=' || e.key === 'Enter') execute(); 
  if (e.key === 'Backspace') deleteCurrent()
  if (e.key === 'Escape') clearCurrent()
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    operatorExecute(convertOperator(e.key))
}
window.addEventListener('keydown', handleKeyboardInput)

