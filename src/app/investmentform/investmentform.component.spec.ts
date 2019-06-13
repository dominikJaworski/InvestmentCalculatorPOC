import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentformComponent } from './investmentform.component';

describe('InvestmentformComponent', () => {
  let component: InvestmentformComponent;
  let fixture: ComponentFixture<InvestmentformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmentformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
