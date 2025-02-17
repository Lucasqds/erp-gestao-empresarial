import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarFornecedoresComponent } from '../../../features/fornecedor/listar-fornecedores/listar-fornecedores.component';

describe('ListarFornecedoresComponent', () => {
  let component: ListarFornecedoresComponent;
  let fixture: ComponentFixture<ListarFornecedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarFornecedoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarFornecedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
