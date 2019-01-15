/**
 * @file - search and query parameter
 *
 */

export const filterTypes = {
  date: "BY_DATE",
  alpha: "ALPHA",
  number: "NUMBER"
};

const sortByDate = (arr, dateField, desc = false) => {
  const sortFunction = (a, b) => {
    const date1 = a.doc[dateField];
    const date2 = b.doc[dateField];
    if (!desc) {
      if (date1 < date2) return 1;
      if (date1 > date2) return -1;
      return 0;
    } else {
      if (date1 > date2) return 1;
      if (date1 > date2) return -1;
      return 0;
    }
  };
  return arr.sort(sortFunction);
};
export const filterByDate = (arr, dateField, dateFilter) => {
  return arr.filter(item => {
    return (
      new Date(item.doc[dateField]).getFullYear() ===
      new Date(dateFilter).getFullYear()
    );
  });
};
export const filterByCompletion = (arr, completionField, completionFilter) => {
  return arr.filter(item => {
    return item.doc[completionField] == completionFilter;
  });
};
const sortByAlpha = (arr, alphaField, desc = false, isNumber = false) => {
  const sortFunction = (a, b) => {
    let alpha1 = a.doc;
    let alpha2 = b.doc;
    if (!isNumber) {
      alpha1 = a.doc[alphaField] ? a.doc[alphaField].toLowerCase() : "";
      alpha2 = b.doc[alphaField] ? b.doc[alphaField].toLowerCase() : "";
    }
    if (!desc) {
      if (alpha1 > alpha2) return 1;
      if (alpha1 < alpha2) return -1;
      return 0;
    } else {
      if (alpha1 < alpha2) return 1;
      if (alpha1 > alpha2) return -1;
    }
  };
  return arr.sort(sortFunction);
};

export const sortArrayOfObjects = (
  array,
  filterType,
  filterField,
  desc = false
) => {
  switch (filterType) {
    case filterTypes.date:
      return sortByDate(array, filterField, desc);
    case filterTypes.alpha:
      return sortByAlpha(array, filterField, desc);
    case filterTypes.number:
      return sortByAlpha(array, filterField, desc, true);
    default:
      return sortByAlpha(array, filterField, desc);
  }
};

export const filterByBoolean = (field, context, arr) => {
  return arr.filter(item => item.doc[field] === context);
};
export const filterByValue = (field, context, arr) => {
  return arr.filter(item => {
    const itemval = item.doc[field] ? item.doc[field].toLowerCase() : "";
    context = context.toLowerCase();
    return itemval.includes(context);
  });
};
export const filterQuantify = (field, context, arr, lessThan) => {
  if (!lessThan) {
    return arr.filter(item => {
      return item.doc[field] > context;
    });
  } else {
    return arr.filter(item => {
      return item.doc[field] < context;
    });
  }
};

/**
 * Get years from item
 * @param {*} obj
 * @param {*} q
 * @param {*} array
 */
export const getYears = (projects, dateField) => {
  const years = [];
  projects.map(docum => {
    const year = new Date(docum.doc[dateField]).getFullYear();
    const indexOfYear = years.findIndex(val => val.label == year);
    if (indexOfYear < 0) {
      years.push({ value: new Date(docum.doc[dateField]), label: year });
    }
  });
  return years;
};
export const getLocations = projects => {
  let locationsItems = [];
  projects.filter(project => {
    const { locations } = project.doc;
    if (locations) {
      locations.map(location => {
        const { STATE, TOWN, LGA } = location;
        locationsItems = [
          ...locationsItems,
          { value: STATE, label: `${STATE}` },
          { value: LGA, label: `${LGA} Lga` },
          { value: TOWN, label: `${TOWN}` }
        ];
      });
    }
  });
  return locationsItems;
};

export const getNature = projects => {
  const natureObjects = [];
  projects.map(pj => {
    if (pj.doc.nature) {
      const obj = {
        label: pj.doc.nature,
        value: pj.doc.nature
      };
      const indexOfNature = natureObjects.findIndex(
        val => val.label === pj.doc.nature
      );
      if (indexOfNature < 0) {
        natureObjects.push(obj);
      }
    }
  });
  return natureObjects;
};
export const filterByLocation = (arr, value) => {
  return arr.filter(val => {
    const { locations } = val.doc;
    let itContains = false;
    if (locations) {
      itContains =
        locations.filter(location => {
          return (
            location.STATE === value ||
            location.LGA === value ||
            location.TOWN === value
          );
        }).length > 0;
    }
    return itContains;
  });
};

export const filterByNature = (arr, nature) => {
  return arr.filter(val => {
    return val.doc.nature === nature;
  });
};
/**
 * WOrks only for this impleentation has it has an attribute that has to get do
 */
export const wildSearch = (obj, q, array) => {
  let keys = [];
  Object.keys(obj).map(key => {
    if (
      (!isNaN(parseInt(obj[key], 10)) &&
        typeof parseInt(obj[key].toString()) === "number") ||
      typeof obj[key] === "string"
    ) {
      keys.push({
        key,
        type:
          !isNaN(parseInt(obj[key], 10)) &&
          typeof parseInt(obj[key].toString()) === "number"
            ? "number"
            : "string",
        val: obj[key]
      });
    }
  });

  let arr = [];
  keys.map(val => {
    const { key, type } = val;
    if (type !== "number") {
      arr = [...arr, ...filterByValue(key, q, array)];
    } else {
      arr = [...arr, ...filterQuantify(key, parseInt(q), array, true)];
    }
  });
  // get unique ids

  const uniqueIds = [
    ...new Set(
      arr.map(item => {
        return item.id;
      })
    )
  ];
  return uniqueIds.map(id => {
    const itemIndex = arr.findIndex(val => val.id === id);
    return arr[itemIndex];
  });
};
