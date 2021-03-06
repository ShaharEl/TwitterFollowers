export const dynamicSort = (property) => {
    let sortOrder = 1;
    return function (a, b) {
        let result = (a[property].toLowerCase() < b[property].toLowerCase()) ? -1 : (a[property].toLowerCase() > b[property].toLowerCase()) ? 1 : 0;
        return result * sortOrder;
    }
};

export const isEmptyObject = (obj) => (!obj || Object.keys(obj).length === 0);
