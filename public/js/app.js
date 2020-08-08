const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')
/* const messageThree = document.getElementById('message-3') */
/* const messageFour = document.getElementById('message-4') */





weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = search.value;
 

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  fetch(`/weather?address=${location}`).then((response) => {
  response.json().then((data) => {
    if(data.error) {
      messageOne.textContent = data.error;
    }else {
       
      const imgSrc = data.forecast.weatherIcons;
     
      messageOne.textContent = data.location
      messageTwo.textContent = `${data.forecast.temperature}°C`
      /* messageThree.textContent = `${data.forecast.weatherDescription}` */
      let images = document.getElementById('images');
      let image = images.querySelectorAll('img')[0];
      image.src = imgSrc;
      imgSrc.alt = title;
      
    }
  })
})  
})

















 



/* async function fetchAsync () {
  
  let response = await fetch('http://localhost:3000/weather?address=terracina');

  let data = await response.json();

 return data;
}


fetchAsync()
    .then(data => console.log(data))
    .catch(reason => console.log(reason.message)) */