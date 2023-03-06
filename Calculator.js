export default class Calculator {
    constructor(primaryOperationDisplay,secondaryOperationDisplay,operationDisplay){
        this.#primaryOperationDisplay = primaryOperationDisplay
        this.#secondaryOperationDisplay = secondaryOperationDisplay
        this.#operationDisplay = operationDisplay
        this.clear()
    }
    #primaryOperationDisplay
    #secondaryOperationDisplay
    #operationDisplay
    set secondaryOperand(value){
        this.#secondaryOperationDisplay.dataset.value = value ?? ""
        this.#secondaryOperationDisplay.textContent = displayNumber(value )
    }

    set operation(value){
        this.#operationDisplay.textContent = value ?? ""
    }   
    get operation(){
        return this.#operationDisplay.textContent 
    } 

    get primaryOperand(){
        return parseFloat(this.#primaryOperationDisplay.dataset.value)
    }
    get secondaryOperand(){
        return parseFloat(this.#secondaryOperationDisplay.dataset.value)
    }

    set primaryOperand(value){
        this.#primaryOperationDisplay.dataset.value = value ?? ""
        this.#primaryOperationDisplay.textContent = displayNumber(value )
    }

    clear(){
        this.primaryOperand = 0
        this.secondaryOperand = null
        this.operation = null
    }

    addDigit(Digit){
        if(Digit === '.' && this.#primaryOperationDisplay.dataset.value.includes('.')){
            return
        }
        if(this.primaryOperand === 0){
            this.primaryOperand = Digit
            return
        }

        this.primaryOperand = this.#primaryOperationDisplay.dataset.value + Digit 

        
    }
    removeDigit(){
        const stringNumber = this.#primaryOperationDisplay.dataset.value
        if(stringNumber.length <=1){
            this.primaryOperand = 0
            return
        }

        this.primaryOperand = stringNumber.substr(0,stringNumber.length - 1)
    }

    chooseOperation(operation){
        if(this.operation!== "") return
        this.operation= operation
        this.secondaryOperand = this.primaryOperand
        this.primaryOperand = 0 
    }

    evaluate(){
        let result

        switch (this.operation) {
            case "*":
                result = this.secondaryOperand * this.primaryOperand
                break;
            case "÷":
                result = this.secondaryOperand / this.primaryOperand
                break
            case "+":
                result = this.secondaryOperand + this.primaryOperand
                break;
            case "-":
                result = this.secondaryOperand - this.primaryOperand
                break
        
            default:
                return 
        }

        this.clear()
        this.primaryOperand = result
        return result
    }
}
function displayNumber(number){
    const stringNumber = number?.toString() || ""
    if(stringNumber === "") return ""

    const [integer,decimal] = stringNumber.split(".")

    const formattedInteger = parseInt(integer).toLocaleString('en-IN',{
        maximumFractionDigits: 20,
    })
    //console.log(formattedInteger);
    if(decimal == null) return formattedInteger

    return formattedInteger + "." + decimal
}