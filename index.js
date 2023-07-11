const form1 = document.getElementById('form1')

// hata aldıktan sonra inputa değer verince otomatik hata mesajını silinmesi
form1.watchValidate()

// submit edildikten sonra validasyon yap
form1.addEventListener('submit', function(e) {

    // https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
    e.preventDefault()

    // tüm elemanları kontrol eder
    this.validate()

    // artık tüm form elemanları geçerli
    this.isFormValidAndSend()
});

form1.getResult('ajax.php', function(response) {
    console.log(response.currentTarget.response)
});


const form2 = document.getElementById('form2')
form2.watchValidate()
form2.addEventListener('submit', function(e) {
    e.preventDefault()
    this.validate()
    this.isFormValidAndSend()
})

form2.getResult('ajax2.php', function(response) {
    console.log(response.currentTarget.response)
})
