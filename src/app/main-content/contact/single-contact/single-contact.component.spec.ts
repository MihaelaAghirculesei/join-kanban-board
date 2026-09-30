import { ComponentFixture, TestBed } from '@angular/core/testing';
import { testProviders } from '../../../../testing/test-providers';

import { SingleContactComponent } from './single-contact.component';

describe('SingleContactComponent', () => {
  let component: SingleContactComponent;
  let fixture: ComponentFixture<SingleContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleContactComponent],
      providers: testProviders,
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
