// C:\Windows\System32\cmd.exe /k "C:\Program Files\nodejs\nodevars.bat" // To start from VSC terminal node env
import { Component } from '@angular/core';

// TODO:
// Write unit tests
// Deploy on github and gh-pages
// Deploy on codepen

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    currentValue = '0';
    stateString = '0';
    prevOp = '';
    equalPressed = false;

    regExpOp = /[\/\*\-\+]/;
    regExpNumAndDot = /^\d+\.?$/;
    regExpNumAndDotAndNum = /^\d+\.?\d+$/;

    addValue(val: string) {

        if (this.stateString === 'Digit Limit Met' || this.equalPressed) {
            this.allClear();
        }

        if (this.currentValue === '0') {
            if (val === '0') {
                return;
            } else if (val >= '0' && val <= '9') {
                this.currentValue = val;
            } else {  // Dot pressed
                if (this.regExpNumAndDot.test(this.currentValue + val) || this.regExpNumAndDotAndNum.test(this.currentValue + val)) {
                    this.currentValue += val;

                    val = '0.';
                }
            }
        } else if (this.regExpOp.test(this.currentValue)) {

            if (this.currentValue === '/' && val === '0') {
                return;
            }

            if (val === '.') {
                val = '0.';
            }

            this.currentValue = val;

        } else {

            if (this.regExpNumAndDot.test(this.currentValue + val) || this.regExpNumAndDotAndNum.test(this.currentValue + val)) {
                this.currentValue += val;
            }
        }

        this.updateState(val);

        if (this.currentValue.length === 9) {
            // alert('Too much numbers');
            this.currentValue = '0';
            this.stateString = 'Digit Limit Met';
        }
    }

    callOperator(opVal: string) {

        if (this.stateString === 'Digit Limit Met' || this.equalPressed) {
            this.allClear();
        }

        if (this.currentValue === '0' && this.stateString === '0') {
            return;
        } else {

            if (this.regExpOp.test(this.currentValue)) {
                return;
            } else {
                if (opVal !== '=') {

                    if (this.equalPressed) {
                        this.stateString = this.currentValue;
                        this.equalPressed = false;
                    }

                    if (!this.regExpOp.test(this.stateString[this.stateString.length - 1])) {

                        if (this.currentValue[this.currentValue.length - 1] !== '.') {
                            this.updateState(opVal);
                            this.currentValue = opVal;
                        }
                    }
                } else {
                    if (!this.equalPressed) {
                        if (!this.regExpOp.test(this.stateString[this.stateString.length - 1])) {
                            const result: string = this.getResult();

                            if (result.length >= 12) {
                                this.currentValue = '0';
                                this.stateString = 'Digit Limit Met';
                            } else {
                                this.stateString += '=' + result;
                                this.currentValue = result;
                                this.equalPressed = true;
                            }
                        }
                    }
                }
            }
        }
    }

    updateState(val: string) {

        if (this.stateString === '0') {
            this.stateString = val;
        } else {
            this.stateString += val;
        }
    }

    getResult(): string {

        let numStart = 0;
        let numEnd = 0;
        let result = 0;
        let prevOperator = '';

        // Let's parse the result
        for (let i = 0; i < this.stateString.length; i++) {
            if (this.regExpOp.test(this.stateString[i]) || i + 1 === this.stateString.length) {
                numEnd = i + 1 === this.stateString.length ? i : i - 1;

                if (result === 0) {
                    result = parseFloat(this.stateString.substr(numStart, numEnd - numStart + 1));
                    // alert('substr: ' + this.stateString.substr(numStart, numEnd - numStart + 1) + 'initial result: ' + result);
                } else {
                    const tmpCurNum = parseFloat(this.stateString.substr(numStart, numEnd - numStart + 1));

                    // alert('tmpCurNum: ' + tmpCurNum);

                    switch (prevOperator) {
                        case '-': {
                            result -= tmpCurNum;
                            break;
                        }
                        case '+': {
                            result += tmpCurNum;
                            break;
                        }
                        case '*': {
                            result *= tmpCurNum;
                            break;
                        }
                        case '/': {
                            result /= tmpCurNum;
                            break;
                        }
                    }
                }

                if (i + 1 < this.stateString.length && !this.regExpOp.test(this.stateString[i + 1])) {
                    numStart = i + 1;
                }

                prevOperator = i + 1 === this.stateString.length ? '' : this.stateString[i];
            }
        }

        // alert('result is: ' + result);

        return result.toString();
    }

    allClear() {
        this.currentValue = '0';
        this.stateString = '0';
        this.equalPressed = false;
    }

    currentClear() {
        if (this.currentValue !== '0') {
            if (this.equalPressed) {
                this.allClear();
            } else {
                this.stateString = this.stateString.substr(0, this.stateString.length - this.currentValue.length);
                this.currentValue = '0';
                if (this.stateString === '') {
                    this.stateString = '0';
                }
            }
        }
    }
}
