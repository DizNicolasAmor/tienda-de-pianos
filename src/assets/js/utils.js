import * as _cloneDeep from 'lodash/cloneDeep';

export const truncateString = (str, max) =>
    str.length > max ? `${str.substring(0,max)}...` : str;

export const copyProducts = productsArray => productsArray.map(obj => _cloneDeep(obj));
