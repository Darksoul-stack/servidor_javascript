import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarrypotterComponent } from './harrypotter.component';

describe('HarrypotterComponent', () => {
  let component: HarrypotterComponent;
  let fixture: ComponentFixture<HarrypotterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HarrypotterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HarrypotterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
