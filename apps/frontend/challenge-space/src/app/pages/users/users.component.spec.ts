import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UsersComponent} from './users.component';
import {UserModule} from '../../../../../../backend/challenge-space-api/src/app/user/user.module';

describe('UsersComponent', () => {
    let component: UsersComponent;
    let fixture: ComponentFixture<UsersComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UserModule],
            declarations: [UsersComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(UsersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
