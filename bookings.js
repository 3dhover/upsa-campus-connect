// Store bookings in localStorage
const BOOKINGS_KEY = 'userBookings';

function getBookings() {
  return JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]');
}

function saveBooking(booking) {
  const bookings = getBookings();
  bookings.push(booking);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}

function handleBooking(listing) {
  // Show payment modal
  const paymentModal = document.createElement('div');
  paymentModal.className = 'payment-modal';
  paymentModal.innerHTML = `
    <div class="payment-content">
      <h2>Payment Details</h2>
      <div class="payment-form">
        <div class="form-group">
          <label>Payment Method</label>
          <select id="paymentMethod" onchange="togglePaymentFields()">
            <option value="">Select payment method</option>
            <option value="momo">Mobile Money</option>
            <option value="card">Credit/Debit Card</option>
            <option value="cash">Cash</option>
          </select>
        </div>
        
        <div id="momoFields" style="display:none">
          <div class="form-group">
            <label>Network</label>
            <select id="network">
              <option value="mtn">MTN</option>
              <option value="voda">Vodafone</option>
              <option value="airteltigo">AirtelTigo</option>
            </select>
          </div>
          <div class="form-group">
            <label>Mobile Number</label>
            <input type="tel" id="momoNumber" placeholder="Enter mobile number">
          </div>
        </div>

        <div id="cardFields" style="display:none">
          <div class="form-group">
            <label>Card Number</label>
            <input type="text" id="cardNumber" placeholder="Enter card number">
          </div>
          <div class="form-group">
            <label>Expiry Date</label>
            <input type="text" id="expiryDate" placeholder="MM/YY">
          </div>
          <div class="form-group">
            <label>CVV</label>
            <input type="text" id="cvv" placeholder="CVV">
          </div>
        </div>

        <button onclick="processPayment('${encodeURIComponent(JSON.stringify(listing))}')">Pay Now</button>
        <button onclick="closePaymentModal()">Cancel</button>
      </div>
    </div>
  `;
  document.body.appendChild(paymentModal);
}

function togglePaymentFields() {
  const method = document.getElementById('paymentMethod').value;
  document.getElementById('momoFields').style.display = method === 'momo' ? 'block' : 'none';
  document.getElementById('cardFields').style.display = method === 'card' ? 'block' : 'none';
}

function closePaymentModal() {
  document.querySelector('.payment-modal').remove();
}

function processPayment(listingStr) {
  const listing = JSON.parse(decodeURIComponent(listingStr));
  const method = document.getElementById('paymentMethod').value;
  
  if (!method) {
    alert('Please select a payment method');
    return;
  }

  // Validate fields based on payment method
  if (method === 'momo') {
    const number = document.getElementById('momoNumber').value;
    const network = document.getElementById('network').value;
    if (!number) {
      alert('Please enter mobile number');
      return;
    }
  } else if (method === 'card') {
    const cardNum = document.getElementById('cardNumber').value;
    const expiry = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    if (!cardNum || !expiry || !cvv) {
      alert('Please fill all card details');
      return;
    }
  }

  // Save booking
  const booking = {
    id: Date.now(),
    date: new Date().toISOString(),
    listing: listing,
    paymentMethod: method
  };
  
  saveBooking(booking);
  closePaymentModal();
  alert('Booking completed successfully!');
}