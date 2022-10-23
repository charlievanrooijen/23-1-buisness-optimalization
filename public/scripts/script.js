google.charts.load('upcoming', { 'packages': ['vegachart'] }).then(loadCharts);
google.charts.load("current", { packages: ['corechart'] });

var vitalityScore = 0;
var attractionScore = 0;
var basicsScore = 0;
var selfdevelopmentScore = 0;
var ambitionScore = 0;


var VitalityArray = [
    'Fit',
    'Health'
]

var AttractionArray = [
    'Aesthetics',
    'Sexuality',
]

var basicsArray = [
    'Idealism',
    'Loyal',
    'Connected',
    'Caring',
    'Certainty',
    'Safety'
]

var SelfdevelopmentArray = [
    'Relaxation',
    'Play',
    'Freedom',
    'Creativity',
    'Individuality',
    'Curiosity'
]
var AmbitionArray = [
    'Capable',
    'Innovation',
    'Winning',
    'Pride',
    'Recognition',
    'Status',
    'Possession',
    'Dominance',
]

var buisness_stats = [
    ["Vitality", vitalityScore, ""],
    ["Attraction", attractionScore, ""],
    ["Basics", basicsScore, ""],
    ["Self development", selfdevelopmentScore, ""],
    ["Ambition", ambitionScore, ""]
];


function loadCharts() {
    addRadarChart(buisness_stats[0][2], buisness_stats, "#Fa0");
    addColumnChart(buisness_stats[0][2], buisness_stats, "#Fa0");
};



function setScore(Array) {
    var total = 0;
    for (let i = 0; i < Array.length; i++) {
        if (document.getElementById(Array[i]).checked) {
            total++;
        };
    }
    return total / Array.length;
}


function loadAnswer(vitalityScoreFinal, attractionScoreFinal, basicsScoreFinal, selfdevelopmentScoreFinal, ambitionScoreFinal, individual_scores) {
    var resultArray = [
        vitalityScoreFinal,
        attractionScoreFinal,
        basicsScoreFinal,
        selfdevelopmentScoreFinal,
        ambitionScoreFinal
    ];


    var categoryArray = [
        VitalityArray,
        AttractionArray,
        basicsArray,
        SelfdevelopmentArray,
        AmbitionArray
    ]
    var Final = [
        ["Vitality", null, ""],
        ["Attraction", null, ""],
        ["Basics", null, ""],
        ["Self development", null, ""],
        ["Ambition", null, ""]
    ];

    var category_table = '';
    var individual_table = '';

    resultArray.forEach(function(element, index) {
        Final[index][1] = element / categoryArray[index].length;
        Final[index][2] = "red";
    });

    buisness_stats = Final;
    buisness_stats.forEach(function(element) {
        category_table += '<tr><td>' + element[0] + '</td><td>' + Math.round(element[1] * 100) + '%</td></tr>'
    });

    document.getElementById('category-results').innerHTML = category_table;

    for (var i = 0; i < individual_scores[1].length; i++) {
        if (individual_scores[1][i] == 'yes') {
            individual_table += '<tr><td>' + individual_scores[0][i] + '</td><td>yes</td></tr>';
        } else {
            individual_table += '<tr><td>' + individual_scores[0][i] + '</td><td>no</td></tr>';
        }
    }

    document.getElementById('individual-results').innerHTML = individual_table;
    loadCharts();
}

function getScores(category) {

    switch (category) {
        case 'Vitality':
            vitalityScore = setScore(VitalityArray);
            break;
        case 'Attraction':
            attractionScore = setScore(AttractionArray);
            break;
        case 'Basics':
            basicsScore = setScore(basicsArray);
            break;
        case 'Selfdevelopment':
            selfdevelopmentScore = setScore(SelfdevelopmentArray);
            break;
        case 'Ambition':
            ambitionScore = setScore(AmbitionArray);
            break;
        default:
    }

    buisness_stats = [
        ["Vitality", vitalityScore, ""],
        ["Attraction", attractionScore, ""],
        ["Basics", basicsScore, ""],
        ["Self development", selfdevelopmentScore, ""],
        ["Ambition", ambitionScore, ""]
    ];


    loadCharts();
}