import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabRecomendacionPage } from './tab-recomendacion.page';

describe('TabRecomendacionPage', () => {
  let component: TabRecomendacionPage;
  let fixture: ComponentFixture<TabRecomendacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabRecomendacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
