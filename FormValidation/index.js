//get elements
let name = document.getElementById("nameId");
let address = document.getElementById("addressId");
let form = document.getElementById("formId");
let err = document.getElementById("errId");
const nameLength = 5;
const addressLength = 10;


//form event listener
form.addEventListener("submit",(e) => {
    
    let messages = []; //this array will contains the error messages
    messages = handleName(name,messages);
    messages = handleAddress(address,messages);
    
    if (messages.length > 0) {
        e.preventDefault(); //in case of errors,prevent from the user to submit the form.
        err.classList.add("error");
        err.innerHTML = messages.join("<br/>"); //display the error messages with break line.
    }
});


//name validation
function handleName(name,messages) {
    if (name.value === '' || name.value == null) {
        messages.push("Name is requeired");
    }
    else  {
        if(name.value.length < nameLength) {
        messages.push("Name must be at least " + nameLength + " characters");
        }
    }
    return messages;
}


//address validation
function handleAddress(address,messages) {
    if (address.value === '' || address.value == null) {
        messages.push("address is requeired");
    }
    else {
        if (address.value.length < addressLength) {
        messages.push("address must be at least " + addressLength + " characters");
        }
    }
    return messages;
}
