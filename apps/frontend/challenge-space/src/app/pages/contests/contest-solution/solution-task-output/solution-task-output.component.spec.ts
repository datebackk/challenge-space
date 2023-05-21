import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SolutionTaskOutputComponent} from './solution-task-output.component';

describe('SolutionTaskOutputComponent', () => {
    let component: SolutionTaskOutputComponent;
    let fixture: ComponentFixture<SolutionTaskOutputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SolutionTaskOutputComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SolutionTaskOutputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
