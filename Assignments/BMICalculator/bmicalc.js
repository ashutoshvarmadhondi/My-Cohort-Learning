const us_units = document.getElementById('us-units');
const international_units = document.getElementById('international-units');

const us_height = document.getElementById('us-height')
const international_height = document.getElementById('intl-height');
const weightLabel = document.getElementById('weight-label')

function updateUnitDisplay() {
    if (us_units.checked) {
      us_height.style.display = 'block';
      international_height.style.display = 'none';
      weightLabel.textContent = 'Pounds (lbs)';
    } else if (international_units.checked) {
        us_height.style.display = 'none';
        international_height.style.display = 'block';
        weightLabel.textContent = 'Kilograms (kg)';
    }
  }
  
  us_units.addEventListener('change', updateUnitDisplay);
  international_units.addEventListener('change', updateUnitDisplay);

  document.getElementById('reset-btn').addEventListener('click', () => {
    // Clear all input fields
    document.querySelectorAll('input[type="text"]').forEach(input => {
      input.value = '';
    });
    document.getElementById('bmi-result').innerHTML = '';
});

document.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('input', () => {
      input.value = input.value
        .replace(/[^0-9.]/g, '')      // remove non-numeric and non-dot
        .replace(/(\..*)\./g, '$1');  // allow only one dot
    });
  });

const calculateButton = document.getElementById('calc-button');
  function calculateBMI() {
    let heightInMeters = 0;
    let weightInKg = 0;
    const resultBox = document.getElementById('bmi-result');
    // If US units selected
    if (document.getElementById('us-units').checked) {
      const feet = parseFloat(document.getElementById('feet').value) || 0;
      const inches = parseFloat(document.getElementById('inches').value) || 0;
      const weight = parseFloat(document.getElementById('weight').value) || 0;
  
      const totalInches = feet * 12 + inches;
      heightInMeters = totalInches * 0.0254;
      weightInKg = weight * 0.453592;
  
    } else if (document.getElementById('international-units').checked) {
      const cm = parseFloat(document.getElementById('centimeters').value) || 0;
      heightInMeters = cm / 100;
      weightInKg = parseFloat(document.getElementById('weight').value) || 0;
    }
  
    // Calculate BMI
  if (heightInMeters > 0 && weightInKg > 0) {
    const bmi = weightInKg / (heightInMeters * heightInMeters);
    const result = bmi.toFixed(2);

    let category = '';
    let color = '';

    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'blue';
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'Normal / Healthy';
      color = 'green';
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
      color = 'orange';
    } else {
      category = 'Obese';
      color = 'red';
    }

    resultBox.innerHTML = `
      <p style="color: ${color}; font-size: 20px;">
        Your BMI is: <strong>${result}</strong> (${category})
      </p>
      <hr>
      <div style="text-align: left; font-size: 16px;">
        <strong>BMI Categories:</strong><br>
        🔵 Underweight: &lt; 18.5<br>
        🟢 Normal / Healthy: 18.5 – 24.9<br>
        🟠 Overweight: 25 – 29.9<br>
        🔴 Obese: 30 and above
      </div>
    `;
  } else {
    resultBox.innerHTML = '<span style="color:red;">Please enter valid height and weight.</span>';
  }
}

calculateButton.addEventListener('click', () => {
    calculateBMI();
});

