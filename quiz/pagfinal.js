//Salva o recorde no Local Storage;
salvarRecorde = e => {
    e.preventDefault();

    let pontuacao = {
        pontuacao: pontuacaMaisRecenteEl,
    };

    recordes.push(pontuacao);

    recordes.sort((a, b) => {
        return b.pontuacao - a.pontuacao;
    })

    recordes.splice(5);

    localStorage.setItem('recordes', JSON.stringify(recordes));
    window.location.assign('/');
}
//Variaveis da pontuação
let botPontuacao = document.querySelector('#saveScoreBtn');
let pontuacaoFinalEl = document.querySelector('#finalScore');
let pontuacaMaisRecenteEl = localStorage.getItem('recordeRecente');

//Pega a pontuação mais recente do local storage
let recordes = JSON.parse(localStorage.getItem('recordes')) || [];

pontuacaoFinalEl.innerText = pontuacaMaisRecenteEl;
