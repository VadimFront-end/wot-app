export const getPrettyNumber = (number = '', result = '', index = number.length): string => {
    if (index - 3 < 0) {
        return number.substring(0, index) + ' ' + result.trim() + (number.indexOf('.') === -1 ? '' : number.substring(number.indexOf('.'), number.length));
    }

    const newIndex = !result && !Number.isInteger(+number) ? number.indexOf('.') : index;

    return getPrettyNumber(number, number.substring(newIndex - 3, newIndex) + ' ' + result, newIndex - 3)
};