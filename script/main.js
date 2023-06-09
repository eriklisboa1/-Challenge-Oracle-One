const textareaInput = document.querySelector('#textarea');
const btnEncrypt = document.querySelector('#btn-encrypt');
const btnDecrypt = document.querySelector('#btn-decrypt');
const sectionOutput = document.getElementById('section-output');


const replacements = {
    a: 'ai',
    e: 'enter',
    i: 'imes',
    o: 'ober',
    u: 'ufat',
};


const replaceVowels = (event, str) => {
    const vowels = /[aeiou]/g;
    const regexSubs = /(ai|enter|imes|ober|ufat)/g;

    if (event.target === btnEncrypt) {
        return str.replace(vowels, match => replacements[match]);
    }

    if (event.target === btnDecrypt) {
        const invertedSubstitutions = {};
        for (let vowel in replacements) {
        invertedSubstitutions[replacements[vowel]] = vowel;
        }
        return str.replace(regexSubs, match => invertedSubstitutions[match]);
    }
};


const textareaOutput = document.createElement('textarea');
textareaOutput.id = 'text-result';

const btnCopy = document.createElement('button');
btnCopy.classList.add('btn-general');
btnCopy.id = 'btn-copy';
btnCopy.type = 'submit';
btnCopy.textContent = 'Copiar';


const displayResult = str => {
    if (textareaInput.value !== '') {
        sectionOutput.innerHTML = '';
        textareaOutput.value = ''
        sectionOutput.appendChild(textareaOutput);
        sectionOutput.appendChild(btnCopy);

        let i = 0;
        const intervalId = setInterval(() => {
            textareaOutput.value += str[i];
            i++;
            if (i === str.length) {
                clearInterval(intervalId);
            }
        }, 15); 
    }
};


const encrypt = event => {
    const str = textareaInput.value.toLowerCase();
    const newStr = replaceVowels(event, str);
    displayResult(newStr);
    setTimeout(() => changeText('Criptografado', 'Criptografar', btnEncrypt), 10);
};


const decrypt = event => {
    const str = textareaInput.value;
    const newStr = replaceVowels(event, str);
    displayResult(newStr);
    setTimeout(() => changeText('Descriptografado', 'Descriptografar', btnDecrypt), 10);
};

const changeText = (strtemporary, strOriginal, btn) => {
    textareaInput.placeholder = "Digite seu texto aqui"
    if (textareaInput.value !== '') {
        btn.textContent = strtemporary;
        setTimeout(() => {
        btn.textContent = strOriginal;
        }, 1500);
    } else{
        textareaInput.placeholder = "Primeiro digite seu texto aqui"
    }
};


const copyContent = () => {
    const text = textareaOutput.value;
    const elementTemporary = document.createElement('textarea');
    elementTemporary.value = text;
    document.body.appendChild(elementTemporary);
    elementTemporary.select();
    document.execCommand('copy');
    document.body.removeChild(elementTemporary);

    setTimeout(() => changeText('Copiado', 'Copiar', btnCopy), 10);
};

btnEncrypt.addEventListener('click', encrypt);
btnDecrypt.addEventListener('click', decrypt);
btnCopy.addEventListener('click', copyContent);