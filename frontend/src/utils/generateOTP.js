export function generateOTP() {
    var digits = '0123456789';
    var otpLength = 5;
    var otp = '';
    for (let i = 1; i <= otpLength; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
}