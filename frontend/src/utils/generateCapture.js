export const generateCapture = (length)=>{
    return Math.random().toString(36).substr(2, length);
}
