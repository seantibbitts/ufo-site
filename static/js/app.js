// from data.js
var tableData = data;

// Fill table initially
var rows = d3.select("#ufo-table tbody")
    .selectAll('tr')
    .data(tableData)
    .enter().append('tr');

var cells = rows.selectAll('td')
    .data(function(d, i){ return Object.values(d); })
    .enter().append('td')
        .text(function(d) { return d; });

// Select input field and button
var date_field = d3.select('#datetime');
var city_field = d3.select('#city-input');
var state_field = d3.select('#state-input');
var country_field = d3.select('#country-input');
var shape_field = d3.select('#shape-input');
var submit_button = d3.select('#filter-btn');
var reset_button = d3.select('#reset-btn');

// Create filtering function to filter on non-empty fields
function filter_func(obj) {
    // Capture field values
    var date_value = date_field.node().value.trim().toLowerCase();
    var city_value = city_field.node().value.trim().toLowerCase();
    var state_value = state_field.node().value.trim().toLowerCase();
    var country_value = country_field.node().value.trim().toLowerCase();
    var shape_value = shape_field.node().value.trim().toLowerCase();

    // Set output defaults (don't filter on empty fields)
    let date_output = true;
    let city_output = true;
    let state_output = true;
    let country_output = true;
    let shape_output = true;

    // Reset output values if non-empty
    if (date_value !== '') {
        date_output = obj.datetime === date_value;
    }
    if (city_value !== '') {
        city_output = obj.city === city_value;
    }
    if (state_value !== '') {
        state_output = obj.state === state_value;
    }
    if (country_value !== '') {
        country_output = obj.country === country_value;
    }
    if (shape_value !== '') {
        shape_output = obj.shape === shape_value;
    }
    return date_output && city_output && state_output && country_output && shape_output;
}

// Create event handlers
// Function to filter and display data
function handleClick() {
    // Filter data using filter_func
    filtered_data = tableData.filter(filter_func);

    // Clear table
    d3.select('#ufo-table tbody')
        .selectAll('tr')
        .remove();
    // Recreate table with filtered data
    var rows = d3.select('#ufo-table tbody')
        .selectAll('tr')
        .data(filtered_data)
        .enter().append('tr');
    
    var cells = rows. selectAll('td')
        .data(function(d, i) { return Object.values(d); })
        .enter().append('td')
            .text(function(d) { return d; });
}

// Function to reset form and display all data
function performReset() {
    date_field.node().value = '';
    city_field.node().value = '';
    state_field.node().value = '';
    country_field.node().value = '';
    shape_field.node().value = '';
    handleClick();
}

// Hook buttons up to event handlers
submit_button.on('click', handleClick);
reset_button.on('click', performReset);
