// Format price in USD currency 
export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
    // return new Intl.NumberFormat('bn-BD', { style: 'currency', currency: 'BDT' }).format(price)
    // return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'BDT' }).format(price)
}
