console.log('Client side javascript file is loaded!')

//FETCH: only available in client side javascript....
//test...
//fetch('http://puzzle.mead.io/puzzle').then((response) => {
//    response.json().then((data) => {
//       console.log(data)
//
//    })
//})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //prevents reloading of webpage, e = event

    const location = search.value
    //console.log(location)

    messageOne.textContent = "Loading...."
    messageTwo.textContent = ""

    //Fetch our weather from our weather page.....
    //fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            //console.log(data)
            //console.log('Error: ' + data.error)
            //console.log('Response: ' + data.location)
            if (data.error) {
                //console.log(data.error)
                messageOne.textContent = data.error
                messageTwo.textContent = ""
            } else {
                //console.log(data.location)
                //console.log(data.forecast)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
            //console.log(data)
        })
    })
    
})

