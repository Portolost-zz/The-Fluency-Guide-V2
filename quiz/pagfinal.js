let botPontuacao = document.querySelector('#saveScoreBtn');
let pontuacaoFinalEl = document.querySelector('#finalScore');
let pontuacaMaisRecenteEl = localStorage.getItem('mostRecentScore');

let recordes = JSON.parse(localStorage.getItem('recordes')) || [];

pontuacaoFinalEl.innerText = pontuacaMaisRecenteEl;

salvarRecorde = e => {
    e.preventDefault();

    let pontuacao = {
        pontuacao: pontuacaMaisRecenteEl,
    };

    recordes.push(pontuacao);

    highScores.sort((a, b) => {
        return b.pontuacao - a.pontuacao;
    })

    recordes.splice(5);

    localStorage.setItem('recordes', JSON.stringify(recordes));
    window.location.assign('/');
}