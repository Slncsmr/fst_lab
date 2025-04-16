import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CPipesComponent } from './c-pipes.component';

describe('CPipesComponent', () => {
  let component: CPipesComponent;
  let fixture: ComponentFixture<CPipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CPipesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CPipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
