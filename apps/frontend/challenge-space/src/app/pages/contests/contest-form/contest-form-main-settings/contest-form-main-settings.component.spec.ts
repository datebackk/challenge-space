import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestFormMainSettingsComponent } from './contest-form-main-settings.component';
import {ContestFormModule} from '../contest-form.module';

describe('ContestFormMainSettingsComponent', () => {
  let component: ContestFormMainSettingsComponent;
  let fixture: ComponentFixture<ContestFormMainSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [ContestFormModule],
        declarations: [ ContestFormMainSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContestFormMainSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
