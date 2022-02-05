const weatherform = document.querySelector("form")
const input = document.querySelector("input")
let message1 = document.querySelector("#message-1")
let message2 = document.querySelector("#message-2")

weatherform.addEventListener("submit", (event)=>{
    event.preventDefault()
    let useraddress = input.value
    if(!useraddress){
        return message1.textContent="Please enter a search term"
    }
    message1.textContent = "Loading...Please Wait"
    message2.textContent = ""
    fetch("http://localhost:3000/weather?address=" + useraddress).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            message1.textContent=data.error
        }else{
            message1.textContent=data.location
            message2.textContent=data.forecast
        }
    })
})

})