let votoPara = document.querySelector('.d11 span');
let cargo = document.querySelector('.d12 span');
let descricao = document.querySelector('.d14');
let aviso = document.querySelector('.div2'); 
let lateral = document.querySelector('.d1right');
let numeros = document.querySelector('.d13'); 

let etapaAtual  = 0;  
let numero = '';
let brancos = false;
let votos = [];

function initEtapa(){
    let etapa = candidate[etapaAtual];

    let numeroHtml =  '';
    numero = '';
    brancos = false;

    for(let i = 0; i < etapa.numeros; i++){
        if(i===0){
            numeroHtml += '<div class="squarenum blink"></div>';
        }else{
            numeroHtml += '<div class="squarenum"></div>';
        }
    }

    votoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function updateInterface(){
    let etapa = candidate[etapaAtual];
    let candidato = etapa.candidatos.filter((item) =>{
        if(item.numero === numero){
            return true;
        }else{
            return false;
        }
    });
    if(candidato.length > 0){
        candidato = candidato[0]
        votoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br> Partido: ${candidato.partido}`;

        let fotosHtml = '';
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="d1image small"><img src="./images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
            }else{
                fotosHtml += `<div class="d1image"><img src="./images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
        }
    }
        lateral.innerHTML = fotosHtml;
    }else{
        votoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="big-warn blink">VOTO NULO </div>';
    }
}

//função dos números
function clickou(n){
    let elNum = document.querySelector('.squarenum.blink');
    if(elNum != null){
        elNum.innerHTML = n;
        numero = `${numero}${n}`;

        elNum.classList.remove('blink');
        if(elNum.nextElementSibling !== null){
        elNum.nextElementSibling.classList.add('blink');
        }else{
            updateInterface();
        }
    }
}

//Voto em branco
function white(){
        numero  = '';
        brancos = true;
        votoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="big-warn blink">VOTO EM BRANCO </div>';   
        lateral.innerHTML = ''; 
}

//Função corrige
function yellow(){
    initEtapa();
}

//Função confirma
function green(){
    let etapa = candidate[etapaAtual];
    let votoConfirmado = false;
    if(brancos === true){
        votoConfirmado = true;
        votos.push({
            etapa: candidate[etapaAtual].titulo,
            voto: 'Branco',
        })
    }else if(numero.length === etapa.numeros){
        votoConfirmado = true;
        votos.push({
            etapa: candidate[etapaAtual].titulo,
            voto: numero,
        })
    }
    if(votoConfirmado){
        etapaAtual++;
        if(candidate[etapaAtual] !== undefined){
            initEtapa();
        }else{
            document.querySelector('.tela').innerHTML = '<div class="big-warn2 blink">FIM DE VOTO</div>'
            console.log(votos);
        }
    }
}

initEtapa();