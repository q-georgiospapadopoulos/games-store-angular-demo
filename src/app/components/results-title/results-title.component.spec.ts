import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsTitleComponent } from './results-title.component';

describe('ResultsTitleComponent', () => {
  let component: ResultsTitleComponent;
  let fixture: ComponentFixture<ResultsTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
