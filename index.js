const characters = {
    all: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"],
    alphabets: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
    withNumbers: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    withSymbols: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"]
};

const passwordsEl = document.getElementById("passwords");
var passEls = document.querySelectorAll("#passwords p");
const passEl1 = document.querySelector("#passwords p:first-child");
const passEl2 = document.querySelector("#passwords p:nth-child(2)");
let pass1 = [];
let pass2 = [];
const passError = document.getElementById("pw-error");
const passGen = document.getElementById("pw_gen");
let pwSpecials;
let pwNumbers;
let randomIndex;
let randomChar;
let characterSet = characters.all;
let copyText;

function getRandomChar(charSet) {
    randomIndex = Math.floor( Math.random() * charSet.length );
    randomChar = charSet[randomIndex];
    return randomChar;
};

passGen.addEventListener("click", function() {
    pass1 = [];
    pass2 = [];
    let pwLength = parseInt(document.getElementById("pw_length").value);
    if (!pwLength || pwLength < 10 || pwLength > 20) {
        passError.textContent = "Please enter a length between 10 and 20";
    } else {
        passError.textContent = "";
        pwSpecials = document.getElementById("pw_specials").checked;
        pwNumbers = document.getElementById("pw_numbers").checked;
        if (pwSpecials && pwNumbers) {
            characterSet = characters.all;
        } else if (pwSpecials === false && pwNumbers === false) {
            characterSet = characters.alphabets;
        } else if (pwSpecials === true && pwNumbers === false) {
            characterSet = characters.withSymbols;
        } else if (pwSpecials === false && pwNumbers === true) {
            characterSet = characters.withNumbers;
        }
        
        for (i = 0; i < pwLength; i++) {
            pass1.push(getRandomChar(characterSet));
            pass2.push(getRandomChar(characterSet));
        }
        
        passEl1.textContent = pass1.join("");
        passEl2.textContent = pass2.join("");
        passwordsEl.classList.add("can-copy");
    }
});

passEls.forEach(function(passEl) {
    passEl.addEventListener("click", function() {
        copyText = passEl.textContent;
        if (!copyText) {
            return;
        } else {
            navigator.clipboard.writeText(copyText);
            passEl.classList.add("copied");
            passwordsEl.classList.add("copied");
            setTimeout(function() {
                passEl.classList.remove("copied");
                passwordsEl.classList.remove("copied");
            }, 2000);
        }
    });
});