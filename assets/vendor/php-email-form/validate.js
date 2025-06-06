function php_email_form_submit(thisForm, action, formData) {
  fetch(action, {
    method: 'POST',
    body: formData,
    headers: { 'X-Requested-With': 'XMLHttpRequest' }
  })
  .then(response => response.text())
  .then(data => {
    thisForm.querySelector('.loading').classList.remove('d-block');

    try {
      let json = JSON.parse(data);
      if (json.success) {
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.reset();
      } else {
        throw new Error(json.message || 'Form submission failed.');
      }
    } catch (err) {
      // Fallback: check for plain "OK"
      if (data.trim() === 'OK') {
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.reset();
      } else {
        throw new Error(data ? data : 'Unknown response from server');
      }
    }
  })
  .catch((error) => {
    displayError(thisForm, error);
  });
}
