export const truncateString = (str, max) =>
    str.length > max ? `${str.substring(0,max)}...` : str;
