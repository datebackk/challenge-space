import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ContestFormTaskSettingsComponent} from './contest-form-task-settings.component';

describe('ContestFormTaskSettingsComponent', () => {
    let component: ContestFormTaskSettingsComponent;
    let fixture: ComponentFixture<ContestFormTaskSettingsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ContestFormTaskSettingsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ContestFormTaskSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
