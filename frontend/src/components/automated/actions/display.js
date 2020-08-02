export function display_size(size_vector) {
    if (size_vector == '--' || size_vector == undefined)
        return size_vector
    let size_dimensions = size_vector.length;
    console.log(size_vector)
    var size_str = size_vector[0] + ''
    for (var i = 1; i < size_dimensions; i++) {
        size_str = size_str + 'x' + size_vector[i]
    }
    return size_str;
}
export function wordCapitlize(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }