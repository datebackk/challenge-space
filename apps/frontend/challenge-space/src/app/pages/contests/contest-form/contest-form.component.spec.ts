import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ContestFormComponent} from './contest-form.component';
import {ContestFormModule} from './contest-form.module';
import {provideMockStore} from '@ngrx/store/testing';

describe('ContestFormComponent', () => {
    let component: ContestFormComponent;
    let fixture: ComponentFixture<ContestFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ContestFormModule],
            declarations: [ContestFormComponent],
            providers: [
                provideMockStore({})
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ContestFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
