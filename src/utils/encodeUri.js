// ensuring the user cannot crash the application via the URL
export const encodeURIComponent = (address) => {
    let newAddress = ''
    for (let char of address)
        char === '?' ? newAddress += '%3F' : newAddress += char
    return newAddress
}