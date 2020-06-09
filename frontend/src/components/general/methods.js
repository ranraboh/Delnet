export function float_precision(number, precision) {
    let temp =  Math.pow(10, precision)
    console.log('float precision')
    console.log((Math.round(number * temp) / temp).toFixed(precision).toString().substr(0, precision + 2))
    return (Math.round(number * temp) / temp).toFixed(precision).toString().substr(0, precision + 2);

}
export function color_by_result(result) {
    result = result * 100
    if (result > 85)
        return 'green';
    else if (result > 70)
        return 'blue';
    else if (result > 60)
        return 'aqua';
    else if (result > 50)
        return 'orange';
    else if (result > 25)
        return 'pink';
    else 
        return 'red';
}