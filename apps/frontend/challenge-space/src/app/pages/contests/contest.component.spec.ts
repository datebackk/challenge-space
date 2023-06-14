import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ContestComponent} from './contest.component';
import {ContestModule} from './contest.module';

describe('ContestComponent', () => {
    let component: ContestComponent;
    let fixture: ComponentFixture<ContestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ContestModule],
            declarations: [ContestComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ContestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
