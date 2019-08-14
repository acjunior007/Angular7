import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteFormComponent } from '../cliente-form/cliente-form.component';
import { ClienteService } from 'src/app/cliente/services/cliente.service';
import { ClienteViewModel } from 'src/app/cliente/models/cliente-view-model';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  clientes: ClienteViewModel[]=[];

  constructor(
    private modalServices: NgbModal,
    private clienteServices: ClienteService
    
    ) { }

  ngOnInit() {
    this.mostrarClientes();
  }

  addCliente(){
    const modal = this.modalServices.open(ClienteFormComponent);
    modal.result.then(
      this.handleModalClienteFormComponent.bind(this),
      this.handleModalClienteFormComponent.bind(this));
  }

  handleModalClienteFormComponent(_response) {
    if(_response === Object(_response)){
      if(_response.modoInsercao){
        _response.cliente.id = _response.id;
        this.clientes.unshift(_response.cliente); 
      }
      else{
        let index = this.clientes.findIndex(value => value.id == _response.id);
        this.clientes[index] = _response.cliente;
      }
    }
  }

  editarClientes(cliente: ClienteViewModel){
    const modal = this.modalServices.open(ClienteFormComponent);
    modal.result.then(
      this.handleModalClienteFormComponent.bind(this),
      this.handleModalClienteFormComponent.bind(this));

      modal.componentInstance.modoInsercao = false;
      modal.componentInstance.cliente = cliente;
  }
  
  mostrarClientes(){
    this.clienteServices.getClientes().subscribe(response => {
      this.clientes = [];
      response.docs.forEach(value => {
        const data = value.data();
        const id = value.id;
        const cliente: ClienteViewModel={
          id: id,
          nome: data.nome,
          endereco: data.endereco,
          casado: data.casado,
          dataMod: data.dataMod.toDate()
        };
        this.clientes.push(cliente);
      });
    });
  }

  checkedCasado(index: number){
    const novoValor = !this.clientes[index].casado;
    this.clientes[index].casado = novoValor;
    const obj = {casado: novoValor};
    const id = this.clientes[index].id;
    this.clienteServices.editarClientesParcial(id, obj);
  }

  deletarCliente(id: string, index: number){
    this.clienteServices.deletarCliente(id)
    .then(() => {this.clientes.splice(index, 1)})
    .catch(err => console.error(err));
  }
}
