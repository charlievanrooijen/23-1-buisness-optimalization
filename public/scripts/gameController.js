var imageArray = [];
var used_imageArray = [];

//2 library to track awnsers and card numbers used
var ResultArray = {
    numbers_used: [],
    numbers_result: []
};

function setCardImage(number) {
    ResultArray.numbers_used.push(number);
    document.getElementById('cardImage').src = '../Cards/' + imageArray[number]
}

function showCard() {
    if (imageArray.length < 23) {
        for (var i = 0; i != 23; i++) {
            imageArray[i] = JSON.stringify(i + 1) + '.jpg'
        }
    }

    do {
        var random_card = Math.floor(Math.random() * imageArray.length);
    } while (ResultArray.numbers_used.includes(random_card))

    document.getElementById('caption').innerHTML = cardCaptionArray[random_card];

    setCardImage(random_card)
}


function NextCard(questionResult) {
    if (ResultArray.numbers_used.length < 23) {
        showCard();
        ResultArray.numbers_result.push(questionResult);
        document.getElementById('counter').innerHTML = ResultArray.numbers_result.length + 1;
    } else {
        ResultArray.numbers_result.push(questionResult);
        window.localStorage.setItem('numbers_result', ResultArray.numbers_result);
        window.localStorage.setItem('numbers_used', ResultArray.numbers_used);
        window.location.pathname = window.location.pathname.replace('play.html', 'results.html');
    }
}

function getResults() {
    var numbers_result = window.localStorage.getItem('numbers_result').split(',');
    var numbers_used = window.localStorage.getItem('numbers_used').split(',');
    var number_captions = [];

    var vitalityScoreFinal = 0;
    var attractionScoreFinal = 0;
    var basicsScoreFinal = 0;
    var selfdevelopmentScoreFinal = 0;
    var ambitionScoreFinal = 0;

    for (var index = 0; index <= 23; index++) {
        number_captions.push(cardCaptionArray[numbers_used[index]]);
        if (numbers_result[index] == 'yes')
            switch (true) {
                case index <= 1:
                    vitalityScoreFinal++;
                    break;
                case (index <= 3):
                    attractionScoreFinal++;
                    break;
                case (index <= 9):
                    basicsScoreFinal++;
                    break;
                case (index <= 15):
                    selfdevelopmentScoreFinal++;
                    break;
                case (index <= 23):
                    ambitionScoreFinal++;
                    break;
                default:
            }
    }

    console.log('vitalityScoreFinal');
    console.log(vitalityScoreFinal);
    var individual_scores = [number_captions, numbers_result];

    loadAnswer(vitalityScoreFinal, attractionScoreFinal, basicsScoreFinal, selfdevelopmentScoreFinal, ambitionScoreFinal, individual_scores);
}

var cardCaptionArray = [
    'Fit',
    'Health',
    'Aesthetics',
    'Sexuality',
    'Idealism',
    'Loyal',
    'Connected',
    'Caring',
    'Certainty',
    'Safety',
    'Relaxation',
    'Play',
    'Freedom',
    'Creativity',
    'Individuality',
    'Curiosity',
    'Capable',
    'Innovation',
    'Winning',
    'Pride',
    'Recognition',
    'Status',
    'Possession',
    'Dominance',
]