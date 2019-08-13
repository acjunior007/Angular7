import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteFormComponent } from '../cliente-form/cliente-form.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(private modalServices: NgbModal) { }

  ngOnInit() {
  }

  addCliente(){
    const modal = this.modalServices.open(ClienteFormComponent);
    modal.result.then(
      this.handleModalClienteFormComponent.bind(this),
      this.handleModalClienteFormComponent.bind(this));
  }

  handleModalClienteFormComponent(_response) {
    //alert("Fechar janela");
  }
}
