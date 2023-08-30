const forms = document.querySelectorAll('.step-form');
const radioButtons = document.querySelectorAll('input[type="radio"]');
const backBtn = document.getElementById('backBtn');
const progressBar = document.getElementById('progress-bar');
const startOverBtn = document.querySelector('.edit-btn');
const nextButtons = document.querySelectorAll('.next-btn');
const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
const allRadioButtons = document.querySelectorAll('input[type="radio"]');
const removeables = document.querySelectorAll('.removeable');

allRadioButtons.forEach(radio => {
    radio.addEventListener("change", (e) => {

        allRadioButtons.forEach(rad => {
            rad.parentElement.style.background = "rgba(239, 243, 245, 1)"
            rad.parentElement.style.color = "#212529"
        });

        let selectedRadio = document.querySelector(`input[name='${e.target.name}']:checked`)
        selectedRadio.parentElement.style.background = "#006ea5"
        selectedRadio.parentElement.style.color = "#fff"

    })
})
allCheckboxes.forEach(check => {
    check.addEventListener("change", (e) => {

        allCheckboxes.forEach(rad => {
            rad.parentElement.style.background = "rgba(239, 243, 245, 1)"
            rad.parentElement.style.color = "#212529"
        });

        let selectedCheck = document.querySelectorAll(`input[name='${e.target.name}']:checked`)
        selectedCheck.forEach(checked => {
            checked.parentElement.style.background = "#006ea5"
            checked.parentElement.style.color = "#fff"
        });

    })
})

let currentStep = 0;

function updateStep(step) {
    let forms = document.querySelectorAll('.step-form');
    forms.forEach(form => {
        form.classList.remove('active');
    });
    forms[step].classList.add('active');

    if (step === 0) {
        backBtn.disabled = true;
        backBtn.style.display = "none"
    } else {
        backBtn.disabled = false;
        backBtn.style.display = "inline-block"
    }

    resetRadioButtons();
    updateProgressBar()
}

allCheckboxes.forEach(checks => {
    checks.addEventListener("change", () => {
        const currentForm = forms[currentStep];
        const currentRadioButtons = currentForm.querySelectorAll('input[type="radio"]');
        currentRadioButtons.forEach(radios => {
            radios.checked = false;
            radios.parentElement.style.background = "rgba(239, 243, 245, 1)"
            radios.parentElement.style.color = "#212529"
        });
    })
});

allRadioButtons.forEach(radios => {
    radios.addEventListener("change", () => {
        const currentForm = forms[currentStep];
        const currentCheckboxes = currentForm.querySelectorAll('input[type="checkbox"]');
        currentCheckboxes.forEach(checks => {
            checks.checked = false;
            checks.parentElement.style.background = "rgba(239, 243, 245, 1)"
            checks.parentElement.style.color = "#212529"
        });
    })
});

function resetRadioButtons() {
    let forms = document.querySelectorAll('.step-form');
    const currentForm = forms[currentStep];
    const currentRadioButtons = currentForm.querySelectorAll('input[type="radio"]');
    currentRadioButtons.forEach(radioButton => {
        radioButton.checked = false;
    });
    allCheckboxes.forEach(rad => {
        rad.parentElement.style.background = "rgba(239, 243, 245, 1)"
        rad.parentElement.style.color = "#212529"
    });
    allRadioButtons.forEach(rad => {
        rad.parentElement.style.background = "rgba(239, 243, 245, 1)"
        rad.parentElement.style.color = "#212529"
    });
}

function updateProgressBar() {
    let forms = document.querySelectorAll('.step-form');
    const progressPercentage = ((currentStep) / forms.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

function handleRadioChange(event) {
    const currentForm = forms[currentStep];
    const selectedValue = currentForm.querySelector("input[type='radio']:checked")
    currentStep++;

    if (selectedValue?.value == 'Progressives') {
        let removeables = forms[currentStep ].querySelectorAll(".removeable")
        removeables.forEach(item => {
            item.style.display = "none"
        });
        updateStep(currentStep);
    }
    if (forms[currentStep].classList.contains("last-step")) {
        let frameType = document.querySelector("input[name='frame_type']:checked")?.value
        let frameTypePrice = document.querySelector("input[name='frame_type']:checked")?.getAttribute("data-price")
        let prescriptionType = document.querySelectorAll("input[name='prescription_type']:checked")
        let prescriptionTypeValues = []
        prescriptionType.forEach(input => {
            prescriptionTypeValues.push(input.value);
        });
        let prescriptionTypeValuesString = prescriptionTypeValues.join(', ');
        let prescriptionTypePrices = 0
        prescriptionType.forEach(input => {
            let price = parseInt(input.getAttribute("data-price"));
            prescriptionTypePrices += price;
        });

        let polarized = document.querySelector("input[name='polarized']:checked")?.value
        let polarizedPrice = document.querySelector("input[name='polarized']:checked")?.getAttribute("data-price")
        
        let tint = document.querySelector("input[name='tint']:checked")?.value
        let tintPrice = document.querySelector("input[name='tint']:checked")?.getAttribute("data-price")

        let gradient = document.querySelector("input[name='gradient']:checked")?.value
        let gradientPrice = document.querySelector("input[name='gradient']:checked")?.getAttribute("data-price")





        let cardData = `
                ${frameType?'<div class="cart-row"><div><strong>Frame Type</strong> <br> <span>'+frameType+'</span></div><div> $'+frameTypePrice+'</div></div>':''}
                ${prescriptionTypeValuesString.length>=1?'<div class="cart-row"><div><strong>Prescription</strong> <br> <span>'+prescriptionTypeValuesString+'</span></div><div> $'+prescriptionTypePrices+'</div></div>':''}
                ${polarized ? '<div class="cart-row"> <div><strong>Polarized </strong><br><span>' + polarized + '</span></div><div> $' + polarizedPrice + '</div></div>' : ''}
                ${tint ? '<div class="cart-row"> <div><strong>Tint </strong><br><span>' + tint + '</span></div><div> $' + tintPrice + '</div></div>' : ''}
                ${gradient ? '<div class="cart-row"> <div><strong>Gradient </strong><br><span>' + gradient + '</span></div><div> $' + gradientPrice + '</div></div>' : ''}
        `
        document.querySelector(".cart-data").innerHTML = cardData
        updateStep(currentStep)
    }
    else {
        updateStep(currentStep);
    }

    let subtotalContainer = document.querySelector(".subtotal-container")
    let addtocartContainer = document.querySelector(".addtocart-container")
    if (currentStep >= 2) {
        const parent = document.querySelector(".all-steps")

        let frameTypePrice = document.querySelector("input[name='frame_type']:checked")?.getAttribute("data-price")
        let polarizedPrice = document.querySelector("input[name='polarized']:checked")?.getAttribute("data-price")
        let tintPrice = document.querySelector("input[name='tint']:checked")?.getAttribute("data-price")
        let gradientPrice = document.querySelector("input[name='gradient']:checked")?.getAttribute("data-price")
        let prescriptionType = document.querySelectorAll("input[name='prescription_type']:checked")
        let prescriptionTypePrices = 0
        prescriptionType.forEach(input => {
            let price = parseInt(input.getAttribute("data-price"));
            prescriptionTypePrices += price;
        });
        subtotalContainer.style.display = "flex"
        subtotalContainer.style.opacity = "1"
        console.log(parent.querySelector(`.step-form:nth-child(${currentStep + 1})`))
        document.querySelector(".subtotal").innerHTML = "$" + (parseInt(frameTypePrice?frameTypePrice:0) + parseInt(prescriptionTypePrices) + parseInt(polarizedPrice ? polarizedPrice : 0) + parseInt(tintPrice ? tintPrice : 0) + parseInt(gradientPrice ? gradientPrice : 0))
        if (parent.querySelector(`.step-form:nth-child(${currentStep + 1 })`).classList.contains("last-step")) {
            subtotalContainer.style.display = "none"
            subtotalContainer.style.opacity = "0"
            addtocartContainer.style.display = "flex"
            addtocartContainer.style.opacity = "1"
            document.querySelector(".addtocart-btn").innerHTML = "Add to Cart $" + (parseInt(frameTypePrice?frameTypePrice:0) + parseInt(prescriptionTypePrices) + parseInt(polarizedPrice ? polarizedPrice : 0) + parseInt(tintPrice ? tintPrice : 0) + parseInt(gradientPrice ? gradientPrice : 0))
            document.querySelector(".subtotal-2").innerHTML = "$" + (parseInt(frameTypePrice?frameTypePrice:0) + parseInt(prescriptionTypePrices) + parseInt(polarizedPrice ? polarizedPrice : 0) + parseInt(tintPrice ? tintPrice : 0) + parseInt(gradientPrice ? gradientPrice : 0))
        }
        else {
            subtotalContainer.style.display = "flex"
            subtotalContainer.style.opacity = "1"
            addtocartContainer.style.display = "none"
            addtocartContainer.style.opacity = "0"
        }

    } else {
        subtotalContainer.style.opacity = "0"
        subtotalContainer.style.display = "none"
        addtocartContainer.style.display = "none"
        addtocartContainer.style.opacity = "0"

    }

}

nextButtons.forEach(next => {
    next.addEventListener('click', handleRadioChange);
});

backBtn.addEventListener('click', () => {
    const parent = document.querySelector(".all-steps")
    let subtotalContainer = document.querySelector(".subtotal-container")
    let addtocartContainer = document.querySelector(".addtocart-container")
    if (currentStep <= 1) {
        removeables.forEach(item => {
            item.style.display = ""
        });
    }
    if (currentStep <= 2) {
        subtotalContainer.style.opacity = "0"
        subtotalContainer.style.display = "none"
        addtocartContainer.style.display = "none"
        addtocartContainer.style.opacity = "0"
    }
    else {
        subtotalContainer.style.display = "flex"
        subtotalContainer.style.opacity = "1"
        addtocartContainer.style.display = "none"
        addtocartContainer.style.opacity = "0"
    }
    // document.querySelector(`.added-step-${currentStep}`)?.remove()
    currentStep--;
    updateStep(currentStep);
});

startOverBtn.addEventListener('click', () => {
    let subtotalContainer = document.querySelector(".subtotal-container")
    let addtocartContainer = document.querySelector(".addtocart-container")
    subtotalContainer.style.opacity = "0"
    subtotalContainer.style.display = "none"
    addtocartContainer.style.display = "none"
    addtocartContainer.style.opacity = "0"
    currentStep = 0;
    updateStep(currentStep);
});