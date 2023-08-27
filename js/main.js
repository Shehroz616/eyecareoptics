const forms = document.querySelectorAll('.step-form');
const radioButtons = document.querySelectorAll('input[type="radio"]');
const backBtn = document.getElementById('backBtn');
const progressBar = document.getElementById('progress-bar');
const startOverBtn = document.querySelector('.edit-btn');

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

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function resetRadioButtons() {
    let forms = document.querySelectorAll('.step-form');
    const currentForm = forms[currentStep];
    const currentRadioButtons = currentForm.querySelectorAll('input[type="radio"]');
    currentRadioButtons.forEach(radioButton => {
        radioButton.checked = false;
    });
}

function updateProgressBar() {
    let forms = document.querySelectorAll('.step-form');
    const progressPercentage = ((currentStep ) / forms.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
  }

function handleRadioChange(event) {
    const selectedValue = event.target.value;
    currentStep++;
    
    if (selectedValue === 'Single-vision') {
        const nextNextForm = forms[currentStep + 1];
        nextNextForm.remove()
        updateStep(currentStep);
    }
    else if (selectedValue === 'Non-prescription') {
        const nextForm = forms[currentStep];
        const nextNextForm = forms[currentStep + 1];
        nextForm.remove()
        nextNextForm.remove()
        updateStep(currentStep);
    }
    else if (selectedValue === 'Progressives') {
        const nextForm = forms[currentStep];
        const nextNextForm = forms[currentStep + 1];
        nextForm.remove()
        nextNextForm.remove()
        updateStep(currentStep);
    }
    else if(selectedValue === 'Readers'){
        const parent = document.querySelector(".all-steps")
        const specificChild = parent.querySelector(`.step-form:nth-child(${currentStep})`);
        specificChild.nextElementSibling.remove()
        updateStep(currentStep);
    }
    else if(selectedValue === 'Classic'){
        const parent = document.querySelector(".all-steps")
        const specificChild = parent.querySelector(`.step-form:nth-child(${currentStep})`);
        specificChild.nextElementSibling.remove()
        updateStep(currentStep);
    }
    else if(selectedValue === 'Blue-light-filtering'){
        const parent = document.querySelector(".all-steps")
        const specificChild = parent.querySelector(`.step-form:nth-child(${currentStep})`);
        specificChild.nextElementSibling.remove()
        updateStep(currentStep);
    }
    else if(selectedValue === 'Polycarbonate' || selectedValue === '1.67 high-index'){
        let frameWidth = document.querySelector("input[name='width']:checked").value
        let prescriptionType = document.querySelector("input[name='prescription_type']:checked").value
        let prescriptionPrice = document.querySelector("input[name='prescription_type']:checked").getAttribute("data-price")
        let singleVision = document.querySelector("input[name='single_vision']:checked")?.value
        let singleVisionPrice = document.querySelector("input[name='single_vision']:checked")?.getAttribute("data-price")
            singleVisionPrice = singleVisionPrice=="0"?"Free":"$"+singleVisionPrice
        let readersStrength = document.querySelector("input[name='readers_strength']:checked")?.value
        let lenseType = document.querySelector("input[name='lense_type']:checked").value
        let lenseTypePrice = document.querySelector("input[name='lense_type']:checked").getAttribute("data-price")
            lenseTypePrice = lenseTypePrice=="0"?"Free":"$"+lenseTypePrice
        let lenseColor = document.querySelector("input[name='lense_color']:checked")?.value
        let lenseMaterial = document.querySelector("input[name='lense_material']:checked").value
        let lenseMaterialPrice = document.querySelector("input[name='lense_material']:checked").getAttribute("data-price")
            lenseMaterialPrice = lenseMaterialPrice=="0"?"Free":"$"+lenseMaterialPrice

        

        let cardData = `
                    <div class="cart-row">
                        <div>
                            <strong>Frame width</strong> <br>
                            <span>${frameWidth}</span>
                        </div>
                    </div>
                    <div class="cart-row">
                        <div>
                            <strong>Prescription</strong> <br>
                            <span>${prescriptionType} ${readersStrength?'('+readersStrength+')':''}</span>
                        </div>
                        <div>
                            $${prescriptionPrice}
                        </div>
                    </div>
                    ${singleVision?'<div class="cart-row"> <div><strong>Single vision options</strong><br><span>'+singleVision+'</span></div><div>'+singleVisionPrice+'</div></div>' :''}
                    <div class="cart-row">
                        <div>
                            <strong>Lens type</strong> <br>
                            <span>${lenseType} ${lenseColor?'('+lenseColor+')':''}</span>
                        </div>
                        <div>
                            ${lenseTypePrice}
                        </div>
                    </div>
                    <div class="cart-row">
                        <div>
                            <strong>Lens material</strong> <br>
                            <span>${lenseMaterial}</span>
                        </div>
                        <div>
                            ${lenseMaterialPrice}
                        </div>
                    </div>
                    <hr>
                    <div class="cart-row">
                        <div>
                            <strong>Subtotal</strong>
                        </div>
                        <div class="subtotal-2">
                            ${lenseMaterialPrice}
                        </div>
                    </div>
        `
        console.log(frameWidth)
        document.querySelector(".cart-data").innerHTML = cardData
        updateStep(currentStep)
    }
    else {
        updateStep(currentStep);
    }

    let subtotalContainer = document.querySelector(".subtotal-container")
    let addtocartContainer = document.querySelector(".addtocart-container")
    if (currentStep>=2) {
        const parent = document.querySelector(".all-steps")
        
        let prescriptionPrice = document.querySelector("input[name='prescription_type']:checked")?.getAttribute("data-price")
        let singleVisionPrice = document.querySelector("input[name='single_vision']:checked")?.getAttribute("data-price")
        let lenseTypePrice = document.querySelector("input[name='lense_type']:checked")?.getAttribute("data-price")
        let lenseMaterialPrice = document.querySelector("input[name='lense_material']:checked")?.getAttribute("data-price")
        subtotalContainer.style.display = "flex"
        subtotalContainer.style.opacity = "1"
        document.querySelector(".subtotal").innerHTML = "$"+(parseInt(prescriptionPrice) + parseInt( singleVisionPrice?singleVisionPrice:0) + parseInt( lenseTypePrice?lenseTypePrice:0) + parseInt( lenseMaterialPrice?lenseMaterialPrice:0))
        document.querySelector(".subtotal-2").innerHTML = "$"+(parseInt(prescriptionPrice) + parseInt( singleVisionPrice?singleVisionPrice:0) + parseInt( lenseTypePrice?lenseTypePrice:0) + parseInt( lenseMaterialPrice?lenseMaterialPrice:0))
        
        if (parent.querySelector(`.step-form:nth-child(${currentStep + 1})`).classList.contains("last-step")) {
            subtotalContainer.style.display = "none"
            subtotalContainer.style.opacity = "0"
            addtocartContainer.style.display = "flex"
            addtocartContainer.style.opacity = "1"
            document.querySelector(".addtocart-btn").innerHTML = "Add to Cart $" + (parseInt(prescriptionPrice) + parseInt( singleVisionPrice?singleVisionPrice:0) + parseInt( lenseTypePrice?lenseTypePrice:0) + parseInt( lenseMaterialPrice?lenseMaterialPrice:0))
        }
        else{
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

radioButtons.forEach(radioButton => {
    radioButton.addEventListener('change', handleRadioChange);
});

backBtn.addEventListener('click', () => {
    const parent = document.querySelector(".all-steps")
    let subtotalContainer = document.querySelector(".subtotal-container")
    let addtocartContainer = document.querySelector(".addtocart-container")
    if (currentStep == 2) {
        const specificChild = parent.querySelector(`.step-form:nth-child(${currentStep})`);
        parent.insertBefore(forms[currentStep], specificChild.nextSibling)
        const specificChild2 = parent.querySelector(`.step-form:nth-child(${currentStep + 1})`);
        parent.insertBefore(forms[currentStep + 1], specificChild2.nextSibling)
    }
    if (currentStep == 4) {
        const specificChild2 = parent.querySelector(`.step-form:nth-child(${currentStep})`);
        console.log(forms[currentStep + 1])
        parent.insertBefore(forms[currentStep + 1], specificChild2.nextSibling)
    }
    if (currentStep<=2) {
        subtotalContainer.style.opacity = "0"
        subtotalContainer.style.display = "none"
        addtocartContainer.style.display = "none"
        addtocartContainer.style.opacity = "0"
    }
    else{
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
    currentStep = 0;
    updateStep(currentStep);
});