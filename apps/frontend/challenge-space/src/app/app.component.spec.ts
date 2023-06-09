import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {AppComponent} from './app.component';
import {AppModule} from './app.module';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, AppModule],
            declarations: [AppComponent],
        }).compileComponents();
    });

    it('should render tui-root', () => {
        const fixture = TestBed.createComponent(AppComponent);

        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;

        expect(compiled.querySelector('tui-root')).toBeTruthy();
    });

    it(`should have as title 'frontend-challenge-space'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;

        expect(app.title).toEqual('frontend-challenge-space');
    });
});
