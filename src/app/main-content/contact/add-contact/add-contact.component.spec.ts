import { ComponentFixture, TestBed } from '@angular/core/testing';
import { testProviders } from '../../../../testing/test-providers';

import { AddContactComponent } from './add-contact.component';

describe('AddContactComponent', () => {
  let component: AddContactComponent;
  let fixture: ComponentFixture<AddContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddContactComponent],
      providers: testProviders,
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
