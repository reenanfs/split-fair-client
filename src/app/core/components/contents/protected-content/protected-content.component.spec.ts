import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectedContentComponent } from './protected-content.component';

describe('ProtectedContentComponent', () => {
  let component: ProtectedContentComponent;
  let fixture: ComponentFixture<ProtectedContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProtectedContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtectedContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
