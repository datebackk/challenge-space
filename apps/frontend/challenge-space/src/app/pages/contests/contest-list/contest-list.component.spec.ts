import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ContestListComponent} from './contest-list.component';
import {ContestListModule} from './contest-list.module';

describe('ContestListComponent', () => {
    let component: ContestListComponent;
    let fixture: ComponentFixture<ContestListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ContestListModule],
            declarations: [ContestListComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ContestListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
