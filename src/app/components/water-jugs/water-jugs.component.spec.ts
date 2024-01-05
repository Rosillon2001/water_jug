import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterJugsComponent } from './water-jugs.component';

describe('WaterJugsComponent', () => {
  let component: WaterJugsComponent;
  let fixture: ComponentFixture<WaterJugsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaterJugsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WaterJugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
