HTMLElement.prototype.validate = function() {
    // formdaki tüm elemanları teker teker kontrol eder
    ;[... this.elements].forEach(formElement => { formElement.isValidElement() })
}

HTMLElement.prototype.isValidElement = function() {
    let parent = this

    if (this.getAttribute('type') == 'radio' || this.getAttribute('type') == 'checkbox') {
        parent = this.closest('.checkbox-container') || this.closest('.radio-container')
    }

    if( !this.checkValidity()) {

        // eğer hata varsa ve css üzerinden bir şey yapmak istiyorsan bu lzm
        // else ise aşağıdaki remove() çalışıyor
        // this.closest('li').classList.add('error')

        // eğer error-msg sınıfı yoksa yeni bir small elementi oluşturuyor ve
        // className error-msg yapıyor.
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/nextElementSibling
        if(parent.nextElementSibling?.className !== 'error-msg') {
            const error = document.createElement('small')
            error.className = 'error-msg'
            error.textContent = this.validationMessage

            // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement
            parent.insertAdjacentElement('afterend', error)
        } else {
            parent.nextElementSibling.textContent = this.validationMessage
        }
        
    } else {

        // this.closest('li').classList.remove('error')

        if (parent.nextElementSibling?.className === 'error-msg') {
            parent.nextElementSibling.remove()
        }
    }
}

HTMLElement.prototype.watchValidate = function() {
    [... this.elements].forEach(formElement => {
        ['change', 'keyup'].forEach(method => {
            formElement.addEventListener(method, () => formElement.isValidElement())
        })
    })
}

HTMLElement.prototype.isFormValidAndSend = function() {
    if (this.checkValidity()) {
        new FormData(this)
    }
}

HTMLElement.prototype.getResult = function(callback) {
    this.addEventListener('formdata', function(e) {
        const data = e.formData
        var request = new XMLHttpRequest()
        request.open('POST', this.action)
        // request.addEventListener('load', function(response) {
        //     console.log(response.currentTarget.response)
        // })
        request.addEventListener('load', callback)
        request.send(data)
    })
}