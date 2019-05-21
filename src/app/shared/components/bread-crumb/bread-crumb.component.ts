import { Component, OnInit, Input } from '@angular/core';

//define os atributos do breadCrumb de item
interface BreadCrumbItem {
  text: string,
  link?: string;
}

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.css']
})
export class BreadCrumbComponent implements OnInit {

  @Input() items: Array<BreadCrumbItem> = [];

  constructor() { }

  ngOnInit() {
  }

  //Verifica se o item é o ultimo do array, se for marca como checked
  isTheLastItem(item: BreadCrumbItem): boolean {
    const index = this.items.indexOf(item);
    return index + 1 == this.items.length;
  }

}
