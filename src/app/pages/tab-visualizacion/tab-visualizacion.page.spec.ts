import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabVisualizacionPage } from './tab-visualizacion.page';

describe('TabVisualizacionPage', () => {
  let component: TabVisualizacionPage;
  let fixture: ComponentFixture<TabVisualizacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabVisualizacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
