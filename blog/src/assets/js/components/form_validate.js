//
//
//
// function CustomValidation(){
//     this.invalidities = [];
//     this.validityChecks = [];
//
// }
// CustomValidation.prototype = {
//     addInvalidity: function (message){
//         this.invalidities.push(message);
//     },
//     getInvalidities: function (){
//         return this.invalidities.join('. \n');
//     },
//     checkValidity: function (input){
//
//         for (let i = 0; i < this.validityChecks.length; i++){
//
//             let isInvalid = this.validityChecks[i].isInvalid(input);
//             if(isInvalid){
//                 this.addInvalidity(this.validityChecks[i].invalidityMessage);
//             }
//
//             let requirementElement = this.validityChecks[i].element;
//             if (requirementElement){
//                 if(isInvalid){
//                     requirementElement.classList.add('invalid');
//                     requirementElement.classList.remove('valid');
//                 } else {
//                     requirementElement.classList.remove('invalid');
//                     requirementElement.classList.add('valid');
//                 }
//             } // end if requirementElement
//         }
//     }
// };
// // inputs id
// // let username = 'form-item-type-username';
//
//
// let usernameValidityChecks = [
//     {
//         isInvalid: function (input){
//             return input.value.length < 3;
//         },
//         invalidityMessage: 'This input to be al least 3 characters long',
//         element: document.querySelector('label[for="form-item-type-username"] ul li:nth-child(1)'),
//     },
//     {
//         isInvalid: function (input){
//             let illegalCharacters = input.value.match(/[^a-zA-Z0-9]/g);
//             return illegalCharacters ? true : false;
//         },
//         invalidityMessage: 'Only letters and numbers are allowed',
//         element: document.querySelector('label[for="form-item-type-username"] ul li:nth-child(2)')
//     },
// ];
//
//
// let passwordValidityChecks = [
//     {
//         isInvalid: function (input){
//             return input.value.length < 8 | input.value.length > 100;
//         },
//         invalidityMessage: 'This input needs to between 8 and 100 characters',
//         element: document.querySelector('label[for="form-item-type-password"] ul li:nth-child(1)')
//     },
//     {
//         isInvalid: function (input){
//             return  !input.value.match(/[0-9]/g);
//         },
//         invalidityMessage: 'At least 1 number is required',
//         element: document.querySelector('label[for="form-item-type-password"] ul li:nth-child(2)')
//     },
//     {
//         isInvalid: function (input){
//             return  !input.value.match(/[a-z]/g);
//         },
//         invalidityMessage: 'At least 1 lowercase letter is required',
//         element: document.querySelector('label[for="form-item-type-password"] ul li:nth-child(3)')
//     },
//     {
//         isInvalid: function (input){
//             return  !input.value.match(/[A-Z]/g);
//         },
//         invalidityMessage: 'At least 1 uppercase letter is required',
//         element: document.querySelector('label[for="form-item-type-password"] ul li:nth-child(4)')
//     },
//     {
//         isInvalid: function(input) {
//             return !input.value.match(/[\!\@\#\$\%\^\&\*]/g);
//         },
//         invalidityMessage: 'You need one of the required special characters',
//         element: document.querySelector('label[for="form-item-type-password"] ul li:nth-child(5)')
//     }
// ];
//
// let passwordRepeatValidityChecks = [
//     {
//         isInvalid: function (input){
//             return passwordRepeatInput.value != passwordInput.value;
//         },
//         invalidityMessage: 'This password needs to match the first one',
//     },
// ];
//
// function checkInput (input){
//
//     // input.CustomValidation.invalidities = [];
//     input.CustomValidation.checkValidity(input);
//
//     if ( (input.CustomValidation.invalidities.length === 0) && (input.value !== '') )
//     {
//         input.setCustomValidity('');
//     } else{
//         let message = input.CustomValidation.getInvalidities();
//         input.setCustomValidity(message);
//     }
// }
// /* -------------------------------
//
//     Setup CustomValidation
//
// ---------------------------------- */
//
//
//
// let usernameInput = document.getElementById('form-item-type-username');
// let passwordInput = document.getElementById('form-item-type-password');
// // let passwordRepeatInput = document.getElementById('form-item-type-password-repeat');
//
// // username
// usernameInput.CustomValidation = new CustomValidation();
// usernameInput.CustomValidation.validityChecks = usernameValidityChecks;
// // password
// passwordInput.CustomValidation = new CustomValidation();
// passwordInput.CustomValidation.validityChecks = passwordValidityChecks;
// //password Repeats
// // passwordRepeatInput.CustomValidation = new CustomValidation();
// // passwordRepeatInput.CustomValidation.validityChecks = passwordRepeatValidityChecks;
//
// let inputs = document.querySelectorAll('input:not([type="submit"])');
// let submit = document.querySelector('.form input[type="submit"]');
// for (let i = 0; i < inputs.length; i++){
//     inputs[i].addEventListener('keyup',function (){
//        checkInput(this);
//     });
// }
// submit.addEventListener('click', function (){
//     for (let i = 0; i < inputs.length; i++){
//         checkInput(this);
//     }
// });
//


/* ----------------------------
	CustomValidation prototype
	- Keeps track of the list of invalidity messages for this input
	- Keeps track of what validity checks need to be performed for this input
	- Performs the validity checks and sends feedback to the front end
---------------------------- */

// function CustomValidation(input) {
//     this.invalidities = [];
//     this.validityChecks = [];
//
//     //add reference to the input node
//     this.inputNode = input;
//
//     //trigger method to attach the listener
//     this.registerListener();
// }

// CustomValidation.prototype = {
//     addInvalidity: function(message) {
//         this.invalidities.push(message);
//     },
//     getInvalidities: function() {
//         return this.invalidities.join('. \n');
//     },
//     checkValidity: function(input) {
//         for ( let i = 0; i < this.validityChecks.length; i++ ) {
//
//             let isInvalid = this.validityChecks[i].isInvalid(input);
//             if (isInvalid) {
//                 this.addInvalidity(this.validityChecks[i].invalidityMessage);
//             }
//
//             let requirementElement = this.validityChecks[i].element;
//
//             if (requirementElement) {
//                 if (isInvalid) {
//                     requirementElement.classList.add('invalid');
//                     requirementElement.classList.remove('valid');
//                 } else {
//                     requirementElement.classList.remove('invalid');
//                     requirementElement.classList.add('valid');
//                 }
//
//             } // end if requirementElement
//         } // end for
//     },
//     checkInput: function() { // checkInput now encapsulated
//
//         this.inputNode.CustomValidation.invalidities = [];
//         this.checkValidity(this.inputNode);
//
//         if ( this.inputNode.CustomValidation.invalidities.length === 0 && this.inputNode.value !== '' ) {
//             this.inputNode.setCustomValidity('');
//         } else {
//             let message = this.inputNode.CustomValidation.getInvalidities();
//             this.inputNode.setCustomValidity(message);
//         }
//     },
//     registerListener: function() { //register the listener here
//
//         let CustomValidation = this;
//
//         this.inputNode.addEventListener('keyup', function() {
//             CustomValidation.checkInput();
//         });
//
//
//     }
//
// };
//
//
//
// /* ----------------------------
// 	Validity Checks
// 	The arrays of validity checks for each input
// 	Comprised of three things
// 		1. isInvalid() - the function to determine if the input fulfills a particular requirement
// 		2. invalidityMessage - the error message to display if the field is invalid
// 		3. element - The element that states the requirement
// ---------------------------- */
//
// let usernameValidityChecks = [
//     {
//         isInvalid: function(input) {
//             return input.value.length < 3;
//         },
//         invalidityMessage: 'This input needs to be at least 3 characters',
//         element: document.querySelector('label[for="username"] .input-requirements li:nth-child(1)')
//     },
//     {
//         isInvalid: function(input) {
//             let illegalCharacters = input.value.match(/[^a-zA-Z0-9]/g);
//             return illegalCharacters ? true : false;
//         },
//         invalidityMessage: 'Only letters and numbers are allowed',
//         element: document.querySelector('label[for="username"] .input-requirements li:nth-child(2)')
//     }
// ];
//
// let passwordValidityChecks = [
//     {
//         isInvalid: function(input) {
//             return input.value.length < 8 | input.value.length > 100;
//         },
//         invalidityMessage: 'This input needs to be between 8 and 100 characters',
//         element: document.querySelector('label[for="password"] .input-requirements li:nth-child(1)')
//     },
//     {
//         isInvalid: function(input) {
//             return !input.value.match(/[0-9]/g);
//         },
//         invalidityMessage: 'At least 1 number is required',
//         element: document.querySelector('label[for="password"] .input-requirements li:nth-child(2)')
//     },
//     {
//         isInvalid: function(input) {
//             return !input.value.match(/[a-z]/g);
//         },
//         invalidityMessage: 'At least 1 lowercase letter is required',
//         element: document.querySelector('label[for="password"] .input-requirements li:nth-child(3)')
//     },
//     {
//         isInvalid: function(input) {
//             return !input.value.match(/[A-Z]/g);
//         },
//         invalidityMessage: 'At least 1 uppercase letter is required',
//         element: document.querySelector('label[for="password"] .input-requirements li:nth-child(4)')
//     },
//     {
//         isInvalid: function(input) {
//             return !input.value.match(/[\!\@\#\$\%\^\&\*]/g);
//         },
//         invalidityMessage: 'You need one of the required special characters',
//         element: document.querySelector('label[for="password"] .input-requirements li:nth-child(5)')
//     }
// ];
//
// let passwordRepeatValidityChecks = [
//     {
//         isInvalid: function() {
//             return passwordRepeatInput.value != passwordInput.value;
//         },
//         invalidityMessage: 'This password needs to match the first one'
//     }
// ];
//
//
// /* ----------------------------
// 	Setup CustomValidation
// 	Setup the CustomValidation prototype for each input
// 	Also sets which array of validity checks to use for that input
// ---------------------------- */
//
// let usernameInput = document.getElementById('form-item-type-username');
// let passwordInput = document.getElementById('form-item-type-password');
// let passwordRepeatInput = document.getElementById('form-item-type-password-repeat');
//
// usernameInput.CustomValidation = new CustomValidation(usernameInput);
// usernameInput.CustomValidation.validityChecks = usernameValidityChecks;
//
// passwordInput.CustomValidation = new CustomValidation(passwordInput);
// passwordInput.CustomValidation.validityChecks = passwordValidityChecks;
//
// passwordRepeatInput.CustomValidation = new CustomValidation(passwordRepeatInput);
// passwordRepeatInput.CustomValidation.validityChecks = passwordRepeatValidityChecks;
//
//
//
//
// /* ----------------------------
// 	Event Listeners
// ---------------------------- */
//
// let inputs = document.querySelectorAll('input:not([type="submit"])');
//
//
// let submit = document.querySelector('input[type="submit"]');
// let form = document.getElementById('registration');
//
// function validate() {
//     for (let i = 0; i < inputs.length; i++) {
//         inputs[i].CustomValidation.checkInput();
//     }
// }
//
// submit.addEventListener('click', validate);
// form.addEventListener('submit', validate);


class FormValidator{
    constructor(form, fields) {
        this.form = form;
        this.fields = fields;
    }
    initialize(){
        this.validateOnSubmit();
        this.validateOnEntry();
    }
    validateOnSubmit(){
        let self = this;
        this.form.addEventListener('submit', e=> {
           e.preventDefault();
            self.fields.forEach(fields => {
                const input = document.querySelector(`#${fields}`);
                self.validateFields(input);
                // console.log(input);
           });
        });
    }
    validateOnEntry(){
        let self = this;
        this.fields.forEach(fields => {
            const input = document.querySelector(`#${fields}`);
            input.addEventListener('input',event => {
                self.validateFields(input);
            })
        });
    }
    validateFields(field){
        if (field.value.trim() === ""){
            this.setStatus(field, `${field.previousElementSibling.innerText} cannot be blank`, "error" )
        } else {
            this.setStatus(field,null, "success" )
        }
        if(field.type === 'email'){
            const  re = /^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$/;
            if (re.test(field.value)){
                this.setStatus(field,null,"success");
            } else{
                this.setStatus(field, "please enter a valid email", "error")
            }
        }
        if(field.type === 'password'){
            const  re = /.*([a-z]+[A-Z]+[0-9]+|[a-z]+[0-9]+[A-Z]+|[A-Z]+[a-z]+[0-9]+|[A-Z]+[0-9]+[a-z]+|[0-9]+[a-z]+[A-Z]+|[0-9]+[A-Z]+[a-z]+).*/
            if (re.test(field.value)){
                this.setStatus(field,null,"success");
            } else{
                this.setStatus(field, "please enter a valid password", "error")
            }
        }
        if(field.type === 'password'){
            const  passwordField = this.form.querySelector('input[type="password"]');
            if (field.classList.contains('password-repeat')){
                if (field.value.trim() === "" ){
                    this.setStatus(field, "password confirmation required", "error");
                } else if (field.value !== passwordField.value){
                    this.setStatus(field, "password does not match", "error");
                } else {
                    this.setStatus(field, null, "success");
                }
            }
        }
    }
    setStatus(field,message,status){
        const successIcon = field.parentElement.querySelector('.form-icon-success');
        const errorIcon = field.parentElement.querySelector('.form-icon-error');
        const errorMessage = field.parentElement.querySelector('.form-error-message');
        if (status === "success"){
            if (errorIcon){
                errorIcon.classList.add('hidden');
            }
            if (errorMessage){
                errorMessage.innerText = "";
            }
            successIcon.classList.remove('hidden');
            field.classList.remove('form-input-error');
            field.classList.add('form-input-success');
        }
        if (status === "error"){
            if (successIcon){
                successIcon.classList.add('hidden');
                errorMessage.innerText = message;
                errorIcon.classList.remove('hidden');
                field.classList.add('form-input-error');
                field.classList.remove('form-input-success');
            }
        }
    }
}

const form = document.getElementById('form-2');
const fields = [ "form-item-type-username-2","form-item-type-email-2",
    "form-item-type-password-2","form-item-type-password-repeat-2"];

const validator = new FormValidator(form,fields);

validator.initialize();

