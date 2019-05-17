import { Ferias } from './../shared/ferias.model';
import { FeriasService } from './../shared/ferias.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-ferias-list',
  templateUrl: './ferias-list.component.html',
  styleUrls: ['./ferias-list.component.css']
})
export class FeriasListComponent implements OnInit {

  ferias: Ferias[] = [];

  constructor(private feriasService: FeriasService) { }

  ngOnInit() {
    this.feriasService.getAll().subscribe(
      ferias => this.ferias = ferias,
      error => alert("Erro ao carregar a lista")
    )

    console.log(this.ferias);
  }

  //Metodo responsavel por deletar um time.
  deleteFerias(ferias){

    const deveDeletar = confirm('Deseja realmente excluir este item?');

    if(deveDeletar){
      this.feriasService.delete(ferias.id).subscribe(
        () => this.ferias = this.ferias.filter(element => element != ferias),
        () => alert("Erro ao tentar excluir!")
      )
    }
  }

}
