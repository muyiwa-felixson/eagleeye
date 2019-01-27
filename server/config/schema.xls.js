/**\
 *@file Define schema for loading xls files 
 */

export const schema =  {
    'S/No': {
        prop: 'serialNumber',
        type: Number,
        required: false
      },
      'Project Name': {
        prop: 'name',
        type:String,
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
        prop: 'state',
        type: String,
        required: true
      },
      'LGA': {
        prop: 'LGA',
        type: String,
        required: true
      },
      'Town': { 
        prop: 'Town',
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
      'Performance level': { 
        prop: 'performanceLevel',
        type: number,
        required: true      
      },
      'Project Duration': { 
        prop: 'projectDuration',
        type: String,
        required: true      
      },
      'Duration Unit': {
            prop: 'durationUnit',
            type: String,
            required: true     
      }
 }