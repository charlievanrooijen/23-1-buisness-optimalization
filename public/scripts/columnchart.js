var drawnColumnChart = false;

function addColumnChart(title, data, color) {
    const dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'string', 'id': 'key' });
    dataTable.addColumn({ type: 'number', 'id': 'value' });
    dataTable.addColumn({ type: 'string', 'id': 'category' });
    dataTable.addRows(data);

    var data = google.visualization.arrayToDataTable([
        ['data', 'wgaasdhyb', { role: 'style' }],
        [data[0][0] + "%", (data[0][1] * 100), '3fbace'],
        [data[1][0] + "%", (data[1][1] * 100), 'e3006d'],
        [data[2][0] + "%", (data[2][1] * 100), '78b142'],
        [data[3][0] + "%", (data[3][1] * 100), 'f9a61a'],
        [data[4][0] + "%", (data[4][1] * 100), 'a74d96'],
    ]);

    const options = {
        "width": 700,
        "height": 300,
        bar: {
            padding: '20px',
            groupWidth: "100%",
            'stroke-width': 100
        },
        legend: { position: "none" },
    };

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
        {
            calc: "stringify",
            sourceColumn: 1,
            type: "string",
            role: "annotation",
            colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6']
        },
        2
    ]);


    if (typeof($('#dataChartColumn')) != 'undefined') {
        $('#dataChartColumn').remove();
    }

    const elem = document.createElement("div");
    elem.setAttribute("style", " width: 100%; display: flex;align-items: flex-start;justify-content: center; rounded");
    elem.id = 'dataChartColumn';
    const chart = new google.visualization.ColumnChart(elem);

    chart.draw(view, options);
    drawnRadarChart = true;


    document.getElementById("line-chart-area").appendChild(elem);



    // var data = google.visualization.arrayToDataTable([
    //     ["Element", "Density", { role: "style" }],
    //     ["Copper", 8.4, "#b87333"],
    //     ["Silver", 10.49, "silver"],
    //     ["Gold", 19.30, "gold"],
    //     ["Platinum", 21.45, "color: #e5e4e2"]
    // ]);

    // var view = new google.visualization.DataView(data);
    // view.setColumns([0, 1,
    //     {
    //         calc: "stringify",
    //         sourceColumn: 1,
    //         type: "string",
    //         role: "annotation"
    //     },
    //     2
    // ]);

    // var options = {
    //     title: "Density of Precious Metals, in g/cm^3",
    //     width: 600,
    //     height: 400,
    //     bar: { groupWidth: "95%" },
    //     legend: { position: "none" },
    // };
    // var chart = new google.visualization.ColumnChart(document.getElementById("line-chart-area"));
    // chart.draw(view, options);
}