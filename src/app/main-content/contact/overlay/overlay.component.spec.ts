import { ComponentFixture, TestBed } from '@angular/core/testing';
import { testProviders } from '../../../../testing/test-providers';

import { OverlayComponent } from './overlay.component';

describe('ContactOverlayComponent', () => {
  let component: OverlayComponent;
  let fixture: ComponentFixture<OverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayComponent],
      providers: testProviders,
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
