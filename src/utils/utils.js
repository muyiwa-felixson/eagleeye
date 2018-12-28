/**
 * @file export all the common utils files here
 */

// Third party imports

// Local importas
// N/A

const projectTypes = [
  {
    name: "Solar Street Light"
  },
  {
    name: "Procurement"
  },
  {
    name: "Construction"
  },
  {
    name: "Establishment"
  },
  {
    name: "Rehabilitation"
  },
  {
    name: "Production"
  },
  {
    name: "Motorized Borehole"
  },
  {
    name: "Solar Powered Borehole"
  },
  {
    name: "Road Construction"
  },
  {
    name: "Renovation"
  },
  {
    name: "Water"
  },
  {
    name: "Solar Inverter"
  }
];

const natureOfProject = [
  {
    name: "Capital"
  },
  {
    name: "Recurrent"
  }
];

const sourceOfFunding = [
  {
    name: "Budgetary"
  },
  {
    name: "Donor"
  }
];

const targetUnits = [
  {
    name: "Unit Placeholder 1"
  },
  {
    name: "Unit Placeholder 2"
  }
];

const contractors = [
  {
    name: "Web Script Solutions Limited"
  },
  {
    name: "Sample Contractor"
  }
];

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

const getMonth = num => {
  return month[num];
};

const getOptions = element => {
  let levelAttr = [];
  element.map(elem => levelAttr.push({ value: elem.name, label: elem.name }));
  return levelAttr;
};
/**
 * Generates a GUID string.
 * @returns {String} The generated GUID.
 * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
 * @author Slavik Meltser (slavik@meltser.info).
 * @link http://slavik.meltser.info/?p=142
 */
export const guid = () => {
  function _p8(s) {
    var p = (Math.random().toString(16) + "000000000").substr(2, 8);
    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
};
/**
 * @function fileFilter
 */
export const videoFilter = extension => {
  const fileExtension = extension;
  const acceptedExtensions = [
    "mp4",
    "ogx",
    "3gp",
    "ogg",
    "flv",
    "avi",
    "quicktime",
    "mpeg-4",
    "xdcam",
    "dnxhd",
    "vob"
  ];
  if (acceptedExtensions.indexOf(fileExtension) < 0) {
    return false;
  } else {
    return true;
  }
};
/**
 * @function getExtension
 */
export const getExtension = filename => {
  return filename.split(".").pop();
};

export {
  projectTypes,
  getOptions,
  natureOfProject,
  sourceOfFunding,
  contractors,
  targetUnits,
  getMonth
};
