const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

message1.textContent = 'Use the "Search" button to search for a weather in the selected location.'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    message1.textContent = 'Loading...'
    message2.textContent = ''
    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
            } else {
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        })
    })
})