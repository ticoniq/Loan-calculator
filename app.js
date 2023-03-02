document.getElementById('loan-form').addEventListener('submit', function (e) {
  // hide results 
  document.getElementById('results').style.display = 'none';

  // show loader
  document.getElementById('loading').style.display = 'block';

  // set timer 
  setTimeout(calculateResults, 2000);
  e.preventDefault();
});

// calculate Results 
function calculateResults() {
  // UI Vars 
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayment = parseFloat(years.value) * 12;

  // cumpute monthly payment 
  const x = Math.pow(1 + calculatedInterest, calculatedPayment);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayment).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayment) - principal).toFixed(2);

    // show results 
    document.getElementById('results').style.display = 'block';

    // hide loader
    document.getElementById('loading').style.display = 'none';
  } else {
    showError('Please check your numbers');
  }
}

//  show error 
function showError(error) {
  // show results 
  document.getElementById('results').style.display = 'none';

  // hide loader
  document.getElementById('loading').style.display = 'none';
  
  // create div 
  const errorDiv = document.createElement('div');

  // get Elements 
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add class 
  errorDiv.className = "alert alert-danger";

  // create textNode and append to class 
  errorDiv.appendChild(document.createTextNode(error));

  card.insertBefore(errorDiv, heading);

  setTimeout(clearError, 3000);

}

function clearError() {
  document.querySelector('.alert').remove();
}