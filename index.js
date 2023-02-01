const characters = {
    all: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"],
    alphabets: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
    withNumbers: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    withSymbols: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"]
}

let passEl1 = document.querySelector("#passwords p:first-child")
let passEl2 = document.querySelector("#passwords p:nth-child(2)")
let passError = document.getElementById("pw-error")

function getRandomChar() {
    let characterSet = characters.all
    let pwSpecials = document.getElementById("pw_specials").checked
    let pwNumbers = document.getElementById("pw_numbers").checked
    if (pwSpecials && pwNumbers) {
        characterSet = characters.all
    } else if (pwSpecials === false && pwNumbers === false) {
        characterSet = characters.alphabets
    } else if (pwSpecials === true && pwNumbers === false) {
        characterSet = characters.withSymbols
    } else if (pwSpecials === false && pwNumbers === true) {
        characterSet = characters.withNumbers
    }
    randomIndex = Math.floor( Math.random() * characterSet.length )
    randomChar = characterSet[randomIndex]
    return randomChar
}

function pwGen() {
    let pass1 = []
    let pass2 = []
    let pwLength = parseInt(document.getElementById("pw_length").value)
    if (!pwLength || pwLength < 10 || pwLength > 20) {
        passError.textContent = "Please enter a length between 10 and 20"
    } else {
        passError.textContent = ""
        
        for (i = 0; i < pwLength; i++) {
            pass1.push(getRandomChar())
            pass2.push(getRandomChar())
        }
        
        passEl1.textContent = pass1.join("")
        passEl2.textContent = pass2.join("")
    }
}

function copy() {
    let passwordEl = event.target
    let copyText = passwordEl.textContent
    if (!copyText) {
        return
    } else {
        navigator.clipboard.writeText(copyText)
        passwordEl.classList.add("copied")
        setTimeout(function() {
            passwordEl.classList.remove("copied")
        }, 2000)
    }
}