import PropTypes from 'prop-types';

const self = PropTypes.shape({
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}).isRequired;

const Links2 = PropTypes.shape({
  self,
}).isRequired;

const Small = PropTypes.shape({
  url: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}).isRequired;

const Regular = PropTypes.shape({
  url: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}).isRequired;

const Large = PropTypes.shape({
  url: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}).isRequired;

const Thumbnail = PropTypes.shape({
  url: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}).isRequired;

const Images = PropTypes.shape({
  THUMBNAIL: Thumbnail,
  SMALL: Small,
  REGULAR: Regular,
  LARGE: Large,
}).isRequired;

const Ingredient = PropTypes.shape({
  text: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  measure: PropTypes.string,
  food: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  foodCategory: PropTypes.string,
  foodId: PropTypes.string.isRequired,
  image: PropTypes.string,
}).isRequired;

const elemData = PropTypes.shape({
  label: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
}).isRequired;

const TotalNutrients = PropTypes.shape({
  ENERC_KCAL: elemData,
  FAT: elemData,
  FASAT: elemData,
  FATRN: elemData,
  FAMS: elemData,
  FAPU: elemData,
  CHOCDF: elemData,
  FIBTG: elemData,
  SUGAR: elemData,
  PROCNT: elemData,
  CHOLE: elemData,
  NA: elemData,
  CA: elemData,
  MG: elemData,
  K: elemData,
  FE: elemData,
  ZN: elemData,
  P: elemData,
  VITA_RAE: elemData,
  VITC: elemData,
  THIA: elemData,
  RIBF: elemData,
  NIA: elemData,
  VITB6A: elemData,
  FOLDFE: elemData,
  FOLFD: elemData,
  FOLAC: elemData,
  VITB12: elemData,
  VITD: elemData,
  TOCPHA: elemData,
  VITK1: elemData,
  WATER: elemData,
}).isRequired;

const Sub = PropTypes.shape({
  label: PropTypes.string,
  tag: PropTypes.string,
  schemaOrgTag: PropTypes.string,
  total: PropTypes.number,
  hasRDI: PropTypes.bool,
  daily: PropTypes.number,
  unit: PropTypes.string,
}).isRequired;

const Digest = PropTypes.shape({
  label: PropTypes.string,
  tag: PropTypes.string,
  schemaOrgTag: PropTypes.string,
  total: PropTypes.number,
  hasRDI: PropTypes.bool,
  daily: PropTypes.number,
  unit: PropTypes.string,
  sub: PropTypes.arrayOf(Sub),
}).isRequired;

const Recipe = PropTypes.shape({
  uri: PropTypes.string,
  label: PropTypes.string,
  image: PropTypes.string,
  images: Images,
  source: PropTypes.string,
  url: PropTypes.string,
  shareAs: PropTypes.string,
  yield: PropTypes.number,
  dietLabels: PropTypes.arrayOf(PropTypes.string),
  healthLabels: PropTypes.arrayOf(PropTypes.string),
  cautions: PropTypes.arrayOf(PropTypes.string),
  ingredientLines: PropTypes.arrayOf(PropTypes.string),
  ingredients: PropTypes.arrayOf(Ingredient),
  calories: PropTypes.number,
  totalWeight: PropTypes.number,
  totalTime: PropTypes.number,
  cuisineType: PropTypes.arrayOf(PropTypes.string),
  mealType: PropTypes.arrayOf(PropTypes.string),
  dishType: PropTypes.arrayOf(PropTypes.string),
  totalNutrients: TotalNutrients,
  totalDaily: TotalNutrients,
  digest: PropTypes.arrayOf(Digest),
}).isRequired;

export const HitPropType = PropTypes.shape({
  recipe: Recipe,
  _links: Links2,
}).isRequired;

export const Next = PropTypes.shape({
  href: PropTypes.string,
  title: PropTypes.string,
});

export const Links = PropTypes.shape({
  next: Next,
});

export const SearchResultProps = PropTypes.shape({
  from: PropTypes.number,
  to: PropTypes.number,
  count: PropTypes.number,
  _links: Links,
  hits: PropTypes.arrayOf(HitPropType),
}).isRequired;
