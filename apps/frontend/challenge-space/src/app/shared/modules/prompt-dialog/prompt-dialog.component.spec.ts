import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PromptDialogComponent} from './prompt-dialog.component';
import {PromptDialogModule} from './prompt-dialog.module';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';

describe('PromptDialogComponent', () => {
    let component: PromptDialogComponent;
    let fixture: ComponentFixture<PromptDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PromptDialogModule],
            declarations: [PromptDialogComponent],
            providers: [
                {
                    provide: POLYMORPHEUS_CONTEXT,
                    useValue: {
                        completeWith() {},
                        data: {},
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(PromptDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
