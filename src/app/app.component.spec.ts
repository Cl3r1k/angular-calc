import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    describe('#addValue', () => {
        it('stateString should be "0" after init', async(() => {
            // Arrange
            const fixture = TestBed.createComponent(AppComponent);
            const app = fixture.debugElement.componentInstance;

            // Act

            // Assert
            expect(app.stateString).toEqual('0');
        }));

        it('stateString should be "0." if input is "."', async(() => {
            // Arrange
            const fixture = TestBed.createComponent(AppComponent);
            const app = fixture.debugElement.componentInstance;

            // Act
            app.addValue('.');

            // Assert
            expect(app.stateString).toEqual('0.');
        }));

        it('stateString should be "0." if input is "." and "." again', async(() => {
            // Arrange
            const fixture = TestBed.createComponent(AppComponent);
            const app = fixture.debugElement.componentInstance;

            // Act
            app.addValue('.');
            app.addValue('.');

            // Assert
            expect(app.stateString).toEqual('0.');
        }));

        it('stateString should be "0.1" if input is "." and "1"', async(() => {
            // Arrange
            const fixture = TestBed.createComponent(AppComponent);
            const app = fixture.debugElement.componentInstance;

            // Act
            app.addValue('.');
            app.addValue('1');

            // Assert
            expect(app.stateString).toEqual('0.1');
        }));

        it('stateString should be "0.1" if input is "." and "1" and "." again', async(() => {
            // Arrange
            const fixture = TestBed.createComponent(AppComponent);
            const app = fixture.debugElement.componentInstance;

            // Act
            app.addValue('.');
            app.addValue('1');
            app.addValue('.');

            // Assert
            expect(app.stateString).toEqual('0.1');
        }));

        it('stateString should be "12345678" if input is from "1" to "8"', async(() => {
            // Arrange
            const fixture = TestBed.createComponent(AppComponent);
            const app = fixture.debugElement.componentInstance;

            // Act
            for (let i = 1; i < 9; i++) {
                app.addValue(i.toString());
            }

            // Assert
            expect(app.stateString).toEqual('12345678');
        }));

        it('stateString should be "Digit Limit Met" if input is from "1" to "9" (the max length of input is 8)', async(() => {
            // Arrange
            const fixture = TestBed.createComponent(AppComponent);
            const app = fixture.debugElement.componentInstance;

            // Act
            for (let i = 1; i <= 9; i++) {
                app.addValue(i.toString());
            }

            // Assert
            expect(app.stateString).toEqual('Digit Limit Met');
        }));
    });

    describe('#callOperator', () => {
        it('stateString should be "1+" with next sequence: "1++/*"', async(() => {
            // Arrange
            const fixture = TestBed.createComponent(AppComponent);
            const app = fixture.debugElement.componentInstance;

            // Act
            app.addValue('1');
            app.callOperator('+');
            app.callOperator('+');
            app.callOperator('/');
            app.callOperator('*');

            // Assert
            expect(app.stateString).toEqual('1+');
        }));


        it('currentValue should be "2" with next sequence: "1+1="', async(() => {
            // Arrange
            const fixture = TestBed.createComponent(AppComponent);
            const app = fixture.debugElement.componentInstance;

            // Act
            app.addValue('1');
            app.callOperator('+');
            app.addValue('1');
            app.callOperator('=');

            // Assert
            expect(app.currentValue).toEqual('2');
        }));

        it('currentValue should be "0" with next sequence: "1-1="', async(() => {
            // Arrange
            const fixture = TestBed.createComponent(AppComponent);
            const app = fixture.debugElement.componentInstance;

            // Act
            app.addValue('1');
            app.callOperator('-');
            app.addValue('1');
            app.callOperator('=');

            // Assert
            expect(app.currentValue).toEqual('0');
        }));

        it('currentValue should be "4" with next sequence: "2*2="', async(() => {
            // Arrange
            const fixture = TestBed.createComponent(AppComponent);
            const app = fixture.debugElement.componentInstance;

            // Act
            app.addValue('2');
            app.callOperator('*');
            app.addValue('2');
            app.callOperator('=');

            // Assert
            expect(app.currentValue).toEqual('4');
        }));

        it('currentValue should be "2" with next sequence: "4/2="', async(() => {
            // Arrange
            const fixture = TestBed.createComponent(AppComponent);
            const app = fixture.debugElement.componentInstance;

            // Act
            app.addValue('4');
            app.callOperator('/');
            app.addValue('2');
            app.callOperator('=');

            // Assert
            expect(app.currentValue).toEqual('2');
        }));

        it('currentValue should be "33" with next sequence: "5+6*3="', async(() => {
            // Arrange
            const fixture = TestBed.createComponent(AppComponent);
            const app = fixture.debugElement.componentInstance;

            // Act
            app.addValue('5');
            app.callOperator('+');
            app.addValue('6');
            app.callOperator('*');
            app.addValue('3');
            app.callOperator('=');

            // Assert
            expect(app.currentValue).toEqual('33');
        }));
    });

    describe('#updateState', () => {
        it('stateString should be "1" with next sequence: "1"', async(() => {
            // Arrange
            const fixture = TestBed.createComponent(AppComponent);
            const app = fixture.debugElement.componentInstance;

            // Act
            app.updateState('1');

            // Assert
            expect(app.stateString).toEqual('1');
        }));


        it('stateString should be "12345678" with next sequence: "12345678"', async(() => {
            // Arrange
            const fixture = TestBed.createComponent(AppComponent);
            const app = fixture.debugElement.componentInstance;

            // Act
            for (let i = 1; i < 9; i++) {
                app.updateState(i.toString());
            }

            // Assert
            expect(app.stateString).toEqual('12345678');
        }));
    });

    describe('#getResult', () => {
        it('should return "2" with next sequence: "1+1"', async(() => {
            // Arrange
            const fixture = TestBed.createComponent(AppComponent);
            const app = fixture.debugElement.componentInstance;

            // Act
            app.updateState('1+1');

            // Assert
            expect(app.getResult()).toEqual('2');
        }));


        it('stateString should be "150" with next sequence: "1+2+3+4+5+6+7+8*10-60/2"', async(() => {
            // Arrange
            const fixture = TestBed.createComponent(AppComponent);
            const app = fixture.debugElement.componentInstance;

            // Act
            app.updateState('1+2+3+4+5+6+7+8*10-60/2');

            // Assert
            expect(app.getResult()).toEqual('150');
        }));
    });
});
