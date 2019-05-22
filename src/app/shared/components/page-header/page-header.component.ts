import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  //parametro recebido via prop bind.
  @Input('page-title') pageTitle: string
  @Input('button-class') buttonClass: string
  @Input('button-text') buttonText: string
  @Input('button-link') buttonLink: string


  constructor() { }

  ngOnInit() {
  }

}
