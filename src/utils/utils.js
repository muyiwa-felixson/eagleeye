/**
 * @file export all the common utils files here 
 */

// Third party imports 

// Local importas
// N/A

const projectTypes = [
    {
        name: 'Solar Street Light'
    },
    {
        name: 'Procurement'
    },
    {
        name: 'Construction'
    },
    {
        name: 'Establishment'
    },
    {
        name: 'Rehabilitation'
    },
    {
        name: 'Production'
    },
    {
        name: 'Motorized Borehole'
    },
    {
        name: 'Solar Powered Borehole'
    },
    {
        name: 'Road Construction'
    },
    {
        name: 'Renovation'
    },
    {
        name: 'Water'
    },
    {
        name: 'Solar Inverter'
    },
];

const natureOfProject = [
    {
        name: 'Capital'
    },
    {
        name: 'Recurrent'
    }
];

const sourceOfFunding = [
    {
        name: 'Budgetary'
    },
    {
        name: 'Donor'
    }
];


const targetUnits = [
    {
        name: 'Unit Placeholder 1'
    },
    {
        name: 'Unit Placeholder 2'
    }
];


const contractors = [
    {
        name: 'Web Script Solutions Limited'
    },
    {
        name: 'Sample Contractor'
    }
];

const getOptions = (element) => {
    let levelAttr = [];
    element.map(elem =>
        levelAttr.push({ value: elem.name, label: elem.name })
    );
    return levelAttr;
}
export {
    projectTypes,
    getOptions,
    natureOfProject,
    sourceOfFunding,
    contractors,
    targetUnits
};