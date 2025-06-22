
const state = {
    pontuacao:{
        pontosJogador:0,
        pontosComputador:0,
        pontos:document.getElementById("saldo-ponto"),
    },
    fotoCartas:{
        avatar: document.getElementById("carta-foto"),
        nomeCarta: document.getElementById("carta-nome"),
        tipoCarta: document.getElementById("carta-tipo")
    },
    cartaSelecionada:{
        cartaJogador:document.getElementById("cartaJogador"),
        cartaComputador:document.getElementById("cartaInimigo")
    },
    acao:{
        botao:document.getElementById("proximo-duelo")
    },


    };
    
const ladoJogadores ={
    jogador1: "jogador-1",
    jogador2: "jogador-2"
}



const pathImagens = "./src/assets/icons/";
const registroDeCartas =[ 
    {
        id:0,
        nome: "Dragão Branco",
        tipo: "Papel",
        img: `${pathImagens}dragon.png`,
        ganhaDe: [2,5],
        perdeDe: [1,4],
    },
    {
        id:1,
        nome: "Exodia",
        tipo: "Tesoura",
        img: `${pathImagens}exodia.png`,
        ganhaDe: [0,3],
        perdeDe: [2,5],
    },
    {
        id:2,
        nome: "Mago Negro",
        tipo: "Pedra",
        img: `${pathImagens}magician.png`,
        ganhaDe: [1,4],
        perdeDe: [0,3],
    },
    {
        id:3,
        nome: "Castor",
        tipo: "Papel",
        img: `${pathImagens}castor.png`,
        ganhaDe: [2,5],
        perdeDe: [1,4],
    },
    {
        id:4,
        nome: "Kariboh",
        tipo: "Tesoura",
        img: `${pathImagens}kariboh.png`,
        ganhaDe: [0,3],
        perdeDe: [2,5],
    },
    {
        id:5,
        nome: "Maga",
        tipo: "Pedra",
        img: `${pathImagens}Maga.png`,
        ganhaDe: [1,4],
        perdeDe: [0,3],
    },
    
    
]




async function getCartaAleatoriaId(){
    const indexAleatorio = Math.floor (Math.random() * registroDeCartas.length)
    return registroDeCartas[indexAleatorio].id;
}




async function createCartaImagen(idCarta, qualJogador){
const cartaImagen = document.createElement("img");

cartaImagen.setAttribute("height", "130px");
cartaImagen.setAttribute("src","./src/assets/icons/card-back.png");
cartaImagen.setAttribute("data-id", idCarta);
cartaImagen.classList.add("carta");


if (qualJogador ===ladoJogadores.jogador2){
    cartaImagen.addEventListener("click", ()=>{
        setCartaCampo(cartaImagen.getAttribute("data-id"));
    });
    cartaImagen.addEventListener("mouseover", ()=> {
        PlayerCartaSelecionada(idCarta);
    });
}
 

    return cartaImagen;
};



async function setCartaCampo(idCarta){


await removerTodasCartas();


let computadorCartaId =  await getCartaAleatoriaId();

state.cartaSelecionada.cartaJogador.style.display ="block";
state.cartaSelecionada.cartaComputador.style.display ="block";


state.cartaSelecionada.cartaComputador.src= registroDeCartas [computadorCartaId].img;
state.cartaSelecionada.cartaJogador.src = registroDeCartas [idCarta].img;

let resultadoDoDuelo = await checarResultadoDuelo(idCarta, computadorCartaId);

 await atualizarPlacar();
 await butaoResultasdo(resultadoDoDuelo);


}


async function butaoResultasdo(text) {
    state.acao.botao.innerText = text;
    state.acao.botao.style.display = "block";
}




async function atualizarPlacar(){
state.pontuacao.pontos.innerText =`Win:${state.pontuacao.pontosJogador} | Losse: ${state.pontuacao.pontosComputador}`
}




async function checarResultadoDuelo(jogador1CartaId, jogador2CartaId) {
    let resultadoDuelos = "Empate";
    const cartaJogador = registroDeCartas[jogador1CartaId];

    if (cartaJogador.ganhaDe.includes(jogador2CartaId)) {
        resultadoDuelos = "Ganhou";
        state.pontuacao.pontosJogador++;
    } 
    if (cartaJogador.perdeDe.includes(jogador2CartaId)) {
        resultadoDuelos = "Perdeu";
        state.pontuacao.pontosComputador++;
    }

    return resultadoDuelos;
}





async function removerTodasCartas(){
    let cartas = document.querySelector("#jogador-1");
    let imgElementos = cartas.querySelectorAll("img")
    imgElementos.forEach((img)=>img.remove());

    cartas = document.querySelector("#jogador-2");
    imgElementos = cartas.querySelectorAll("img")
    imgElementos.forEach((img)=>img.remove());
}





async function PlayerCartaSelecionada (id){
    state.fotoCartas.avatar.src = registroDeCartas[id].img;
    state.fotoCartas.nomeCarta.innerText = registroDeCartas[id].nome;
    state.fotoCartas.tipoCarta.innerText = "Atributo: " + registroDeCartas[id].tipo;
}






async function comprarCartas(numeroCartas, qualJogador){
    for (let i = 0; i < numeroCartas; i++ ){
        const cartaAleatoria = await getCartaAleatoriaId();
        const cartaImagen = await createCartaImagen(cartaAleatoria, qualJogador);
        
        document.getElementById(qualJogador).appendChild(cartaImagen);
    }
}



async function resetarDuelo(){
state.fotoCartas.avatar.src ="./src/assets/icons/card-back.png";
state.acao.botao.style.display="none";
state.fotoCartas.nomeCarta.innerHTML = "Carregando";
state.fotoCartas.tipoCarta.innerHTML= "Carregando";



main()
}



function main(){
comprarCartas(5, ladoJogadores.jogador1);
comprarCartas(5, ladoJogadores.jogador2);

};

main();