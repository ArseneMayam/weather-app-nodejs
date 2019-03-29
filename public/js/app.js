console.log('Client side javascript');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2'); 

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location =search.value;
    console.log(location);
    messageOne.textContent ='Loading ...';
    messageOne.textContent = '';
    fetch('/weather?address='+location).then((res)=>{
    res.json().then((data)=>{
        if(data.error){
            console.log(data.error);
            messageOne.textContent =data.error;
        }else{
            console.log(data.location);
            console.log(data.forecast);
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
          
        }

    })
});
})