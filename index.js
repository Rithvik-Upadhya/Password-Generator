const characters = {
    all: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"],
    alphabets: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
    withNumbers: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    withSymbols: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"]
}

let passEl1 = document.querySelector("#passwords p:first-child")
let passEl2 = document.querySelector("#passwords p:nth-child(2)")
let passwordsEl = document.getElementById("passwords")
let passError = document.getElementById("pw-error")
let copyPrompt = document.getElementById("copy-prompt")
let randomIndex = 0
let randomChar = ""
let characterSet = characters.all

function getRandomChar(charSet) {
    randomIndex = Math.floor( Math.random() * charSet.length )
    randomChar = charSet[randomIndex]
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
        
        for (i = 0; i < pwLength; i++) {
            pass1.push(getRandomChar(characterSet))
            pass2.push(getRandomChar(characterSet))
        }
        
        passEl1.textContent = pass1.join("")
        passEl2.textContent = pass2.join("")
        copyPrompt.textContent = "Click to copy"
    }
}

function copy() {
    let passEl = event.currentTarget
    let copyText = passEl.textContent
    if (!copyText) {
        return
    } else {
        navigator.clipboard.writeText(copyText)
        passEl.classList.add("copied")
        passwordsEl.classList.add("copied")
        setTimeout(function() {
            passEl.classList.remove("copied")
            passwordsEl.classList.remove("copied")
        }, 2000)
    }
}