import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SolutionTaskComponent} from './solution-task.component';

describe('SolutionTaskComponent', () => {
    let component: SolutionTaskComponent;
    let fixture: ComponentFixture<SolutionTaskComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SolutionTaskComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SolutionTaskComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
