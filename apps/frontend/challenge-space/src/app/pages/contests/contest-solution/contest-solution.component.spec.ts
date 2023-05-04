import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ContestSolutionComponent} from './contest-solution.component';

describe('ContestSolutionComponent', () => {
    let component: ContestSolutionComponent;
    let fixture: ComponentFixture<ContestSolutionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ContestSolutionComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ContestSolutionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
