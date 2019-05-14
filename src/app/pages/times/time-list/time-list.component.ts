import { TimeService } from './../shared/time.service';
import { Component, OnInit } from '@angular/core';
import { Time } from "../shared/time.model";


@Component({
  selector: 'app-time-list',
  templateUrl: './time-list.component.html',
  styleUrls: ['./time-list.component.css']
})
export class TimeListComponent implements OnInit {

  times: Time[] = [];

  constructor(private timeService: TimeService) { }

  ngOnInit() {
    this.timeService.getAll().subscribe(
      times => this.times = times,
      error => alert("Erro ao carregar a lista")
    )
  }

  //Metodo responsavel por deletar um time.
  deleteTime(time){

    const deveDeletar = confirm('Deseja realmente excluir este item?');

    if(deveDeletar){
      this.timeService.delete(time.id).subscribe(
        () => this.times = this.times.filter(element => element != time),
        () => alert("Erro ao tentar excluir!")
      )
    }
  }

}
