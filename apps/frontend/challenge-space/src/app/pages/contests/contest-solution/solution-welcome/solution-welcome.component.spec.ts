import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SolutionWelcomeComponent} from './solution-welcome.component';

describe('SolutionWelcomeComponent', () => {
    let component: SolutionWelcomeComponent;
    let fixture: ComponentFixture<SolutionWelcomeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SolutionWelcomeComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SolutionWelcomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
