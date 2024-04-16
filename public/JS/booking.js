function submit() {
    const date = document.getElementById('date').value;
    console.log(date);
    const selected_date = new Date(date);
    const Current_Date = new Date();

    const diff = selected_date.getTime() - Current_Date.getTime();
    if (diff < 0) {
        alert('Invalid Date');
        return false;
    } else {
        return true;
    }
}



document.addEventListener('DOMContentLoaded', function () {

    const date_block = document.getElementById('date').setAttribute('min', new Date().toLocaleDateString('en-CA'));
    const appointmentTimeSelect = document.getElementById('appointmentTime');
    const appointmentDateSelect = document.getElementById('date');
    const doctorSelect = document.getElementById('doctor');

    appointmentDateSelect.addEventListener('change', function () {
        appointmentTimeSelect.addEventListener('change', function () {
            const selectedTimezone = appointmentTimeSelect.value;
            const selectedDate = appointmentDateSelect.value;

            fetch(`/available-doctors?date=${selectedDate}&time=${selectedTimezone}`)
                .then(response => response.json())
                .then(data => {
                    doctorSelect.innerHTML = '<option value="">Select</option>';
                    data.forEach(doctorName => {
                        const option = document.createElement('option');
                        option.text = doctorName;
                        option.value = doctorName;
                        doctorSelect.appendChild(option);
                    });
                })
                .catch(error => {
                    console.error('Error fetching available doctors:', error);
                });
        });

    });
});