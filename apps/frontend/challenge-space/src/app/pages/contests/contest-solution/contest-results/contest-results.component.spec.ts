import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ContestResultsComponent} from './contest-results.component';

describe('ContestResultsComponent', () => {
    let component: ContestResultsComponent;
    let fixture: ComponentFixture<ContestResultsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ContestResultsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ContestResultsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
