import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheFornecedorComponent } from '../../../features/fornecedor/detalhe-fornecedor/detalhe-fornecedor.component';

describe('DetalheFornecedorComponent', () => {
  let component: DetalheFornecedorComponent;
  let fixture: ComponentFixture<DetalheFornecedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheFornecedorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
