let buttons = document.querySelectorAll('.buttons');
let display = document.querySelector('#show p');
let history = document.querySelector('#statements p');

let first_number = null;
let operation = null;
let second_number = null;

buttons.forEach((button) => {
    button.addEventListener('mouseover', function(){
        button.setAttribute('style', 'opacity : 0.5;');
    });

    button.addEventListener('mouseout', function(){
        button.setAttribute('style', 'opacity : 1;');
    });

    button.addEventListener('click', (e) => {
        let buttonValue = e.target.id;

        if (buttonValue === 'clear') {
            display.textContent = '0';
            history.textContent = '';
            first_number = null;
            operation = null;
            second_number = null;
        } else if (buttonValue === 'sign') {
            display.textContent = display.textContent.startsWith('-') ? 
                                  display.textContent.substring(1) : 
                                  '-' + display.textContent;
        } else if (buttonValue === 'modulus') {
            display.textContent = String(Number(display.textContent) / 100);
        } else if (buttonValue === 'divide' || buttonValue === 'multiply' || 
                   buttonValue === 'difference' || buttonValue === 'addition') {
            if (operation) {
                second_number = Number(display.textContent);
                display.textContent = String(performCalculation());
                first_number = Number(display.textContent);
            } else {
                first_number = Number(display.textContent);
            }
            operation = buttonValue;
            history.textContent = display.textContent + e.target.textContent;
            display.textContent = '0';
        } else if (buttonValue === 'equals') {
            if (operation && first_number !== null) {
                second_number = Number(display.textContent);
                display.textContent = String(performCalculation());
                history.textContent = '';
                first_number = null;
                operation = null;
                second_number = null;
            }
        } else {
            if (display.textContent === '0') {
                display.textContent = '';
            }
            display.textContent += buttonValue;
        }
    });
});

function performCalculation() {
    let result = 0;
    if (operation === 'addition') {
        result = first_number + second_number;
    } else if (operation === 'difference') {
        result = first_number - second_number;
    } else if (operation === 'multiply') {
        result = first_number * second_number;
    } else if (operation === 'divide') {
        result = first_number / second_number;
    }
    return result;
}
