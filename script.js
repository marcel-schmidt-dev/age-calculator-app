const inputRefs = document.querySelectorAll('input');
const outputsRefs = document.querySelectorAll('.output-container span');
const buttonRef = document.querySelector('button');
const InputContainerRefs = document.querySelectorAll('.input-container div');

const isNumberPressed = (event) => {
    const allowedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];
    if (!allowedKeys.includes(event.key)) {
        event.preventDefault();
    }
}

const validateRealDate = (day, month, year) => {
    const date = new Date(year, month - 1, day);
    return (
        date.getFullYear() === parseInt(year) &&
        date.getMonth() === (month - 1) &&
        date.getDate() === parseInt(day)
    );
}

const calcAge = (day, month, year) => {
    const today = new Date();

    if (year >= today.getFullYear()) {
        InputContainerRefs[2].classList.add('error');
        InputContainerRefs[2].querySelector('span').innerHTML = 'Must be in the past';
        return;
    } else {
        InputContainerRefs[2].classList.remove('error');
        InputContainerRefs[2].querySelector('span').innerHTML = '';
    }

    if (!validateRealDate(day, month, year)) {
        InputContainerRefs.forEach((inputContainer) => {
            inputContainer.classList.add('error');
            inputContainer.querySelector('span').innerHTML = 'Invalid date';
        });
        return;
    }

    const birthday = new Date(year, month - 1, day);
    let ageYears = today.getFullYear() - birthday.getFullYear();
    let ageMonths = today.getMonth() - birthday.getMonth();
    let ageDays = today.getDate() - birthday.getDate();

    if (ageDays < 0) {
        const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        ageDays += previousMonth.getDate();
        ageMonths--;
    }

    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    outputsRefs[0].textContent = ageYears;
    outputsRefs[1].textContent = ageMonths;
    outputsRefs[2].textContent = ageDays;
}

const validateInput = () => {
    let validation = [false, false, false];
    InputContainerRefs.forEach((InputContainerRef, index) => {
        validation[index] = isInputEmpty(InputContainerRef);
        if (isInputEmpty(InputContainerRef)) {
            InputContainerRef.classList.add('error');
            InputContainerRef.querySelector('span').innerHTML = 'This field is required';
        } else {
            InputContainerRef.classList.remove('error');
            InputContainerRef.querySelector('span').innerHTML = '';
        }
    });

    return validation.every((valid) => valid === false);
}

const isInputEmpty = (inputRef) => {
    const input = inputRef.querySelector('input');
    return input.value === "";
}

inputRefs.forEach((input) => {
    input.addEventListener('keydown', (e) => isNumberPressed(e));
});

buttonRef.addEventListener('click', () => {
    if (validateInput()) {
        calcAge(inputRefs[0].value, inputRefs[1].value, inputRefs[2].value);
    }
});
