//Vetor de objetos com as perguntas;
let perguntas = [{
        pergunta: "My city is (old) _______ than yours",
        q1: 'Order',
        q2: 'Older',
        q3: 'Old',
        q4: 'Others',
        correta: 2,
    },
    {
        pergunta: "Jane is (tall) _______ than Melissa.",
        q1: "taller",
        q2: "tellers",
        q3: "tallest",
        q4: "tally",
        correta: 1,
    },
    {
        pergunta: "Dogs are usually (heavy) _______ than cats.",
        q1: "heave",
        q2: "heal",
        q3: "heavier",
        q4: "heap",
        correta: 3,
    },
    {
        pergunta: "Watching a film in DVD is (cheap) _______ than going to the theatre.",
        q1: "cheaper",
        q2: "cheep",
        q3: "cheeper",
        q4: "cheat",
        correta: 1,
    },
    {
        pergunta: "This brand of pastry is (good) _______ than the brand I usually buy.",
        q1: "gooder",
        q2: "better",
        q3: "gooded",
        q4: "beth",
        correta: 2,
    },
    {
        pergunta: "The book I'm reading is much (interesting) _______ than all the books I've read in the past.",
        q1: "interesting",
        q2: "insterester",
        q3: "much interesreing",
        q4: "more interesting",
        correta: 4,
    },
    {
        pergunta: "_______ a post-office near the house.",
        q1: "is there",
        q2: "there are",
        q3: "there is",
        q4: "are there",
        correta: 3,
    },
    {
        pergunta: "_______ a few eggs in the fridge.",
        q1: "is there",
        q2: "there are",
        q3: "there is",
        q4: "are there",
        correta: 2,
    },
    {
        pergunta: "______ a good movie on TV later.",
        q1: "there is",
        q2: "there was",
        q3: "were",
        q4: "is there",
        correta: 1,
    },
    {
        pergunta: "_______  two universities in this city. There's also a small college.",
        q1: "has",
        q2: "there is",
        q3: "there are",
        q4: "there was",
        correta: 3,
    },
    {
        pergunta: "_______ so much meat in the fridge! Let's have some of that for dinner.",
        q1: "there is",
        q2: "there was",
        q3: "has",
        q4: "hasn't",
        correta: 1,
    },
    {
        pergunta: "______ several kinds of toys to choose from.",
        q1: "is there",
        q2: "are there",
        q3: "there will",
        q4: "there are",
        correta: 4,
    },
    {
        pergunta: "I saw Joe this morning. (He, go) _______ to the supermarket.",
        q1: "He is going",
        q2: "He goes",
        q3: "He was going",
        q4: "He are going",
        correta: 3,
    },
    {
        pergunta: "(It, rain) _______ this morning, so we had to take an umbrella with us.",
        q1: "Were raining",
        q2: "It rains",
        q4: "It was raining",
        q5: "It was not raining",
        correta: 3,
    },
    {
        pergunta: "Tom was home yesterday. (He, fix) _______ the computer.",
        q1: "He was fixing",
        q2: "He is fixing",
        q3: "He fixed",
        q4: "He doesn't fixed",
        correta: 1,
    },
    {
        pergunta: "(you, park) _______ your car just ten minutes ago? I think I saw you at the parking garage.",
        q1: "Are you parking",
        q2: "Were you parking",
        q3: "Where are you parking",
        q4: "you parked",
        correta: 2,
    },
    {
        pergunta: "Linda always wears skirts, but yesterday (she, not, wear) _______ one.",
        q1: "were wasn't wearing",
        q2: "she is wearing",
        q3: "she was",
        q4: "she wasn't wearing",
        correta: 4,
    },
    {
        pergunta: "I saw Mark at the theater. (He, talk) _______ to our friends.",
        q1: "He had talked",
        q2: "He was talked",
        q3: "He talked",
        q4: "He was talking",
        correta: 4,
    }
];
//Elementos do quiz;
let pergunta = document.querySelector('#question');
let alternativas = Array.from(document.querySelectorAll('.choice-text'));
let progresso = document.querySelector('#progressText');
let pontuacaoEl = document.querySelector('#score');
let barraDeProgressoFimEl = document.querySelector('#progressBarFull');

let perguntaAtual = {}
let certaResposta = true;
let pontuacao = 0;
let cont = 0;
let questoesDisponiveis = []

let pontos = 100;
let numPerguntas = 18;

//Função que inica o quiz
comecarQuiz = () => {
    cont = 0;
    pontuacao = 0;
    questoesDisponiveis = [...perguntas];//Vetor com as perguntas
    proximaPergunta();
}

//For que alcança todas alternativas do vetor alternativas
alternativas.forEach(alternativa => {
    alternativa.addEventListener('click', e => {
        if (!certaResposta) return;

        certaResposta = false;
        let alternativaSelecionada = e.target;
        let respostaSelecionada = alternativaSelecionada.dataset['number'];

        let novaClasse = respostaSelecionada == perguntaAtual.correta ? 'correct' : 'incorrect';

        if (novaClasse === 'correct') {
            aumentarPontuacao(pontos);
        }

        alternativaSelecionada.parentElement.classList.add(novaClasse);

        setTimeout(() => {
            alternativaSelecionada.parentElement.classList.remove(novaClasse);
            proximaPergunta();

        }, 1000)
    });
});

//Função que leva a próxima pergunta
proximaPergunta = () => {
    if (questoesDisponiveis.length === 0 || cont > numPerguntas) {
        localStorage.setItem('recordeRecente', pontuacao);

        return window.location.assign('pagfinal.html');
    }
    //Atualiza o contator
    cont++;
    progresso.innerText = `Pergunta ${cont} de ${numPerguntas}`;
    barraDeProgressoFimEl.style.width = `${(cont / numPerguntas) * 100}%`;

    //Escolhe uma questão aleatória;
    let indice = Math.floor(Math.random() * questoesDisponiveis.length);
    perguntaAtual = questoesDisponiveis[indice];
    pergunta.innerText = perguntaAtual.pergunta;

    alternativas.forEach(alternativa => {
        let num = alternativa.dataset['number'];
        alternativa.innerText = perguntaAtual['q' + num];
    });

    questoesDisponiveis.splice(indice, 1);

    certaResposta = true;
}

aumentarPontuacao = num => {
    pontuacao += num;
    pontuacaoEl.innerText = pontuacao;
}

comecarQuiz();