/**\
 *@file Define schema for loading xls files 
 */
 const schema = {
    'S/No': {
        prop: 'seriallNumber',
        type: Number,
        required: false
    },
    'Project Name': {
        prop: 'name',
        type: String,
        required: true
    },
    'File Number': {
        prop: 'fileNumber',
        type: Number,
        required: true
    },
    'Description': {
        prop: 'description',
        type: String,
        required: true
    },
    'State': {
        prop: 'STATE',
        type: String,
        required: true
    },
    'LGA': {
        prop: 'LGA',
        type: String,
        required: true
    },
    'Town': {
        prop: 'TOWN',
        type: String,
        required: true
    },
    'State_1': {
        prop: 'STATE',
        type: String,
        required: true
    },
    'LGA_1': {
        prop: 'LGA',
        type: String,
        required: true
    },
    'Town_1': {
        prop: 'TOWN',
        type: String,
        required: true
    },
    'State_2': {
        prop: 'STATE',
        type: String,
        required: true
    },
    'LGA_2': {
        prop: 'LGA',
        type: String,
        required: true
    },
    'Town_2': {
        prop: 'TOWN',
        type: String,
        required: true
    },
    'Date of Award': {
        prop: 'dateOfAward',
        type: String,
        required: true
    },
    'Category': {
        prop: 'category',
        type: String,
        required: true
    },
    'Nature of Project': {
        prop: 'nature',
        type: String,
        required: true
    },
    'Project Target Unit': {
        prop: 'unit',
        type: String,
        required: true
    },
    'Performance Level': {
        prop: 'completed',
        type: Number,
        required: true
    },
    'Source of Funding': { 
        prop: 'funding',
        type: Number,
        required: true
    },
    'Project Duration': {
        prop: 'duration',
        type: Number,
        required: true
    },
    'Duration Unit': {
        prop: 'durationType',
        type: String,
        required: true
    },
    'Project Cost': {
        prop: 'cost',
        type: String,
        required: true
    },
    'Contractor': {
        prop: 'contractor',
        type: String,
        required: true
    },
    'Remarks': {
        prop: 'paid',
        type: String,
        required: true
    },
    'Project Status': {
        prop: 'status',
        type: String,
        required: true
    }
}

module.exports = { 
    schema
}