import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ContestCardComponent} from './contest-card.component';
import {ContestListModule} from '../contest-list.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('ContestCardComponent', () => {
    let component: ContestCardComponent;
    let fixture: ComponentFixture<ContestCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ContestListModule, RouterTestingModule],
            declarations: [ContestCardComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ContestCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
