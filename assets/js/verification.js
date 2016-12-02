document.querySelector('.submit').addEventListener('click', function(e) {
  var otpObj = document.querySelector('.otp');
  var otp = otpObj.value;
  if(otp.length <=0 || isNaN(otp)) {
    otpObj.style.border= '1px solid #bb0000';
  } else {
    otpObj.style.border= '0px';
    location.href = '/success.html';
  }
});
