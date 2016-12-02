function Payments() {
  var self = this;
  this.walletAmt = 1000;
  this.cartAmt = 100;

  this.init = function() {
    self.bindEvent();
    var amount = formatPrice(this.walletAmt);
    element('#wallet-amount').innerHTML = amount;
    element('#use-wallet-amount').innerHTML = '(' + amount + ')';
    element('#woption').click(); 
  }

  this.bindEvent = function() {
    element('#woption').addEventListener('click', function(e) {
      var overlay = element('#overlay'); 
      var wpayment = element('#wallet-payment');
      if(this.checked && getWalletBalance() >= 0){
        overlay.classList.add('block-payments');
      } else {
        overlay.classList.remove('block-payments');
      }

      if(this.checked) {
        fillAmounts();
        fillWalletBalance();
        wpayment.style.display= 'block';
      } else {
        removeWalletAmount();
        wpayment.style.display= 'none';
      }
    });

    element('.payment-options').addEventListener('click', function(e) {
      if(e.target.className == 'type'){
        var type = e.target.parentNode;
        var typeid = type.getAttribute('data-id');
        var options = element('.poption', 'all');
        for(var i=0; i< options.length; i ++) {
          options[i].classList.remove('current');
        }
        var options = element('.options', 'all');
        for(var i=0; i< options.length; i ++) {
          options[i].classList.remove('current');
        }
        type.classList.add('current');
        element('#'+typeid).classList.add('current');
      }
    });

    element('#walletbtn').addEventListener('click', function(e) {
        selectPaymentOption();
    });

    element('#optionpay').addEventListener('click', function(e) {
        selectPaymentOption();
    });

  } 
  
  function getWalletBalance() {
    return self.walletAmt - self.cartAmt;
  }

  function selectPaymentOption() {
    if(element('#woption').checked && getWalletBalance() > 0){
      location.href = '/success.html';   
    } else {
      var type = element('.poption.current').getAttribute('data-id');
      var bankObj = element('#' + type).querySelector('input:checked');
      if(bankObj) {
        var page = '/verification.html';
        if(type == 'nb') {
          page = '/success.html';
        }
        location.href = page;
      } else {
        alert('Please select atleast one payment option');
        return false;
      }
    }
  }

  function fillAmounts() {
    var balance = getWalletBalance();
    element('#payment-bal').innerHTML = formatPrice(self.walletAmt);
    element('#cartamt').innerHTML = formatPrice(self.cartAmt);
    
    if(balance < 0) {
      var box1Obj = element('#box1');
      var box2Obj = element('#box2');
      var box1 = box1Obj.innerHTML;
      var box2 = box2Obj.innerHTML;
      box1Obj.innerHTML = box2;
      box2Obj.innerHTML = box1;
      balance = balance * -1;
    }
    element('#remaining').innerHTML = formatPrice(balance);
  } 

  function fillWalletBalance() {
    var balance = getWalletBalance();
    
    var walletText = element('.use-wallet');
    var balanceText = element('.balance-text');
    if(balance > 0) {
      balanceText.style.display = 'block';
      walletText.style.display = 'none';
      var ele = document.createElement('div');
      ele.classList.add('layer');
    } else {
      balanceText.style.display = 'none';
      walletText.style.display = 'block';
      element('#use-wallet-amount').style.display = 'none';
    }
  }

  function removeWalletAmount() {
    element('.use-wallet').style.display = 'block';
    element('.balance-text').style.display = 'none';
    if(getWalletBalance() < 0) {
      element('#use-wallet-amount').style.display= 'block';
    }
  }


  function formatPrice(price) {
    return 'Rs.' + price; 
  }

  function element(str, all) {
    if(typeof all != 'undefined') {
      return document.querySelectorAll(str);
    } else {
      return document.querySelector(str);
    }
  }
}

window.onload = function() {
  var payments = new Payments();
  payments.init();
}
