const tela = document.getElementById('calculadoraDisplay');
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operadores]');

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador != undefined;

const calcular = () => {
    if (operacaoPendente()){
        const numeroAtual = parseFloat(tela.textContent.replace(',','.'));
        novoNumero = true;
        if (operador == '+'){
            atualizarDisplay(numeroAnterior + numeroAtual);
        }else if (operador == '-'){
            atualizarDisplay(numeroAnterior - numeroAtual);
        }else if (operador == '*'){
            atualizarDisplay(numeroAnterior * numeroAtual);
        }else if(operador == '/'){
            atualizarDisplay(numeroAnterior / numeroAtual);
        }
    }
}

const atualizarDisplay = (texto) => {
    if(novoNumero){
        tela.textContent = texto.toLocaleString('BR');
        novoNumero = false;
    }else{
        tela.textContent += texto.toLocaleString('BR');
    }
}



const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
numeros.forEach (numero => numero.addEventListener('click', inserirNumero));

const selecionarOperadores = (evento) => {
    if (!novoNumero){
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(tela.textContent.replace(',','.'));
    }
    
}

operadores.forEach (operador => operador.addEventListener('click', selecionarOperadores));

acionarIgual = () =>{
    calcular();
    operador = undefined;    
}

document.getElementById('igual').addEventListener('click', acionarIgual);

const limparCalculo = () =>{
    displayLimpar();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}
document.getElementById('displayLimparCalculo').addEventListener('click', limparCalculo);

const displayLimpar = () => tela.textContent = '0';
document.getElementById('displayLimpar').addEventListener('click', displayLimpar);

const limparUltimoNumero = () => tela.textContent = tela.textContent.slice(0, -1);
document.getElementById('displayBackspace').addEventListener('click', limparUltimoNumero);

const inverterSinal = () => {
    novoNumero = true
    atualizarDisplay(tela.textContent * -1);
}
document.getElementById('inversaoSinal').addEventListener('click', inverterSinal);


const existeDecimal = () => tela.textContent.indexOf(',') !== -1;
const existeValor = () => tela.textContent.length > 0;
const inserirDecimal = () => {
    if(!existeDecimal()){
        if(existeValor()){
          atualizarDisplay(',');  
        }else{
        atualizarDisplay('0,');        
        }
    }
}

document.getElementById('casaDecimal').addEventListener('click', inserirDecimal);

const mapaTeclado = {
    '0' : 'tecla0',
    '1' : 'tecla1',
    '2' : 'tecla2',
    '3' : 'tecla3',
    '4' : 'tecla4',
    '5' : 'tecla5',
    '6' : 'tecla6',
    '7' : 'tecla7',
    '8' : 'tecla8',
    '9' : 'tecla9',
    '*' : 'operadoresMultiplicacao',
    '/' : 'operadoresDividir',
    '-' : 'operadoresSubtracao',
    '+' : 'operadoresSomar',
    '=' : 'igual',
    'Enter' : 'igual',
    'Backspace' : 'displayBackspace',
    'c' : 'displayLimparCalculo',
    'Escape' : 'displayLimpar',
    ',' : 'casaDecimal'
}

const mapearTeclado = (evento) => {
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
    if(teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
}
document.addEventListener('keydown', mapearTeclado);