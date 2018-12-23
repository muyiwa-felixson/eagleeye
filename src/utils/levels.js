import { Theme } from '../components/flex/theme';

const levelAttribute = [
  {
    name: 'state',
    color: Theme.PrimaryRed,
    abrv: 'ST'
  },
  {
    name: 'lga',
    color: Theme.PrimaryOrange,
    abrv: 'LG'
  },
  {
    name: 'ward',
    color: Theme.PrimaryMint,
    abrv: 'WD'
  },
  {
    name: 'settlement',
    color: Theme.PrimaryColor,
    abrv: 'SM'
  },
];

const getLevelAttr = (level) => {
  let levelAttr;
  levelAttribute.map(elem =>
    elem.name === level.toLowerCase() && (levelAttr = elem)
  );
  return levelAttr;
}
export {
  levelAttribute,
  getLevelAttr
};