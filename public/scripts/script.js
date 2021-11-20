var drawn = false;

google.charts.load('upcoming', { 'packages': ['vegachart'] }).then(loadCharts);

var vitalityScore = 0;
var attractionScore = 0;
var basicsScore = 0;
var selfdevelopmentScore = 0;
var ambitionScore = 0;


var VitalityArray = [
    'Fit',
    'Health'
]

var AttractionArray = ['Aesthetics',
    'Sexuality',
]

var basicsArray = ['Idealism',
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
        ["Vitality", '', ""],
        ["Attraction", '', ""],
        ["Basics", '', ""],
        ["Self development", '', ""],
        ["Ambition", '', ""]
    ];


    resultArray.forEach(function(element, index) {
        Final[index][1] = (element / categoryArray[index].length);
    });

    buisness_stats = Final;

    var category_table = '';

    buisness_stats.forEach(function(element) {
        category_table += '<tr><td>' + element[0] + '</td><td>' + Math.round(element[1] * 100) + '%</td></tr>'
    });

    document.getElementById('category-results').innerHTML = category_table;


    var individual_table = '';

    for (var i = 0; i < individual_scores[1].length; i++) {
        if (individual_scores[1][i]) {
            individual_table += '<tr><td>' + individual_scores[0][i] + '</td><td>yes</td></tr>';
        } else {
            individual_table += '<tr><td>' + individual_scores[0][i] + '</td><td>no</td></tr>';
        }
    }

    console.log(individual_scores);

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

function setScore(Array) {
    var total = 0;
    for (let i = 0; i < Array.length; i++) {
        if (document.getElementById(Array[i]).checked) {
            total++;
        };
    }
    return total / Array.length;
}


var buisness_stats = [
    ["Vitality", vitalityScore, ""],
    ["Attraction", attractionScore, ""],
    ["Basics", basicsScore, ""],
    ["Self development", selfdevelopmentScore, ""],
    ["Ambition", ambitionScore, ""]
];

function loadCharts() {
    addChart(buisness_stats[0][2], buisness_stats, "#Fa0");
};


function addChart(title, data, color) {
    const dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'string', 'id': 'key' });
    dataTable.addColumn({ type: 'number', 'id': 'value' });
    dataTable.addColumn({ type: 'string', 'id': 'category' });
    dataTable.addRows(data);

    const options = {
        'vega': {
            "$schema": "https://vega.github.io/schema/vega/v5.json",
            "width": 500,
            "height": 500,
            "autosize": "none",
            "signals": [
                { "name": "radius", "update": "180" }
            ],
            "data": [{
                    "name": "table",
                    "source": "datatable",
                },
                {
                    "name": "keys",
                    "source": "table",
                    "transform": [{
                        "type": "aggregate",
                        "groupby": ["key"]
                    }]
                }
            ],
            "scales": [{
                    "name": "angular",
                    "type": "point",
                    "range": { "signal": "[-PI, PI]" },
                    "padding": 0.5,
                    "domain": { "data": "table", "field": "key" }
                },
                {
                    "name": "radial",
                    "type": "linear",
                    "range": { "signal": "[0, radius]" },
                    "zero": true,
                    "nice": false,
                    "domain": [0, 1],
                }
            ],
            "encode": {
                "enter": {
                    "x": { "signal": "width/2" },
                    "y": { "signal": "height/2 + 20" }
                }
            },
            "marks": [{
                    "type": "group",
                    "name": "categories",
                    "zindex": 1,
                    "from": {
                        "facet": { "data": "table", "name": "facet", "groupby": ["category"] }
                    },
                    "marks": [{
                            "type": "line",
                            "name": "category-line",
                            "from": { "data": "facet" },
                            "encode": {
                                "enter": {
                                    "interpolate": { "value": "linear-closed" },
                                    "x": { "signal": "scale('radial', datum.value) * cos(scale('angular', datum.key))" },
                                    "y": { "signal": "scale('radial', datum.value) * sin(scale('angular', datum.key))" },
                                    "stroke": { "value": color },
                                    "strokeWidth": { "value": 1.5 },
                                    "fill": { "value": color },
                                    "fillOpacity": { "value": 0.1 }
                                }
                            }
                        },
                        {
                            "type": "text",
                            "name": "value-text",
                            "from": { "data": "category-line" },
                            "encode": {
                                "enter": {
                                    "x": { "signal": "datum.x + 14 * cos(scale('angular', datum.datum.key))" },
                                    "y": { "signal": "datum.y + 14 * sin(scale('angular', datum.datum.key))" },
                                    "text": { "signal": "format(datum.datum.value,'.1%')" },
                                    "opacity": { "signal": "datum.datum.value > 0.01 ? 1 : 0" },
                                    "align": { "value": "center" },
                                    "baseline": { "value": "middle" },
                                    "fontWeight": { "value": "bold" },
                                    "fill": { "value": color },
                                }
                            }
                        }
                    ]
                },
                {
                    "type": "rule",
                    "name": "radial-grid",
                    "from": { "data": "keys" },
                    "zindex": 0,
                    "encode": {
                        "enter": {
                            "x": { "value": 0 },
                            "y": { "value": 0 },
                            "x2": { "signal": "radius * cos(scale('angular', datum.key))" },
                            "y2": { "signal": "radius * sin(scale('angular', datum.key))" },
                            "stroke": { "value": "lightgray" },
                            "strokeWidth": { "value": 1 }
                        }
                    }
                },
                {
                    "type": "text",
                    "name": "key-label",
                    "from": { "data": "keys" },
                    "zindex": 1,
                    "encode": {
                        "enter": {
                            "x": { "signal": "(radius + 11) * cos(scale('angular', datum.key))" },
                            "y": [{
                                    "test": "sin(scale('angular', datum.key)) > 0",
                                    "signal": "5 + (radius + 11) * sin(scale('angular', datum.key))"
                                },
                                {
                                    "test": "sin(scale('angular', datum.key)) < 0",
                                    "signal": "-5 + (radius + 11) * sin(scale('angular', datum.key))"
                                },
                                {
                                    "signal": "(radius + 11) * sin(scale('angular', datum.key))"
                                }
                            ],
                            "text": { "field": "key" },
                            "align": {
                                "value": "center"
                            },
                            "baseline": [{
                                    "test": "scale('angular', datum.key) > 0",
                                    "value": "top"
                                },
                                {
                                    "test": "scale('angular', datum.key) == 0",
                                    "value": "middle"
                                },
                                {
                                    "value": "bottom"
                                }
                            ],
                            "fill": { "value": "black" },
                            "fontSize": { "value": 12 }
                        }
                    }
                },
                {
                    "type": "line",
                    "name": "twenty-line",
                    "from": { "data": "keys" },
                    "encode": {
                        "enter": {
                            "interpolate": { "value": "linear-closed" },
                            "x": { "signal": "0.2 * radius * cos(scale('angular', datum.key))" },
                            "y": { "signal": "0.2 * radius * sin(scale('angular', datum.key))" },
                            "stroke": { "value": "lightgray" },
                            "strokeWidth": { "value": 1 }
                        }
                    }
                },
                {
                    "type": "line",
                    "name": "fourty-line",
                    "from": { "data": "keys" },
                    "encode": {
                        "enter": {
                            "interpolate": { "value": "linear-closed" },
                            "x": { "signal": "0.4 * radius * cos(scale('angular', datum.key))" },
                            "y": { "signal": "0.4 * radius * sin(scale('angular', datum.key))" },
                            "stroke": { "value": "lightgray" },
                            "strokeWidth": { "value": 1 }
                        }
                    }
                },
                {
                    "type": "line",
                    "name": "sixty-line",
                    "from": { "data": "keys" },
                    "encode": {
                        "enter": {
                            "interpolate": { "value": "linear-closed" },
                            "x": { "signal": "0.6 * radius * cos(scale('angular', datum.key))" },
                            "y": { "signal": "0.6 * radius * sin(scale('angular', datum.key))" },
                            "stroke": { "value": "lightgray" },
                            "strokeWidth": { "value": 1 }
                        }
                    }
                },
                {
                    "type": "line",
                    "name": "eighty-line",
                    "from": { "data": "keys" },
                    "encode": {
                        "enter": {
                            "interpolate": { "value": "linear-closed" },
                            "x": { "signal": "0.8 * radius * cos(scale('angular', datum.key))" },
                            "y": { "signal": "0.8 * radius * sin(scale('angular', datum.key))" },
                            "stroke": { "value": "lightgray" },
                            "strokeWidth": { "value": 1 }
                        }
                    }
                },
                {
                    "type": "line",
                    "name": "outer-line",
                    "from": { "data": "radial-grid" },
                    "encode": {
                        "enter": {
                            "interpolate": { "value": "linear-closed" },
                            "x": { "field": "x2" },
                            "y": { "field": "y2" },
                            "stroke": { "value": "lightgray" },
                            "strokeWidth": { "value": 2 }
                        }
                    }
                }
            ]
        }
    };

    if (typeof($('#dataChart')) != 'undefined') {
        $('#dataChart').remove();
    }

    const elem = document.createElement("div");
    elem.setAttribute("style", " width: 100%; height: 100%; display: flex;align-items: center;justify-content: center;");
    elem.id = 'dataChart';
    const chart = new google.visualization.VegaChart(elem);

    chart.draw(dataTable, options);
    drawn = true;


    document.getElementById("chart-area").appendChild(elem);
}