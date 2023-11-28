import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {
  personas: any;

  constructor(private http: HttpClient) {
    this.getData();
  }

  ngOnInit() {
  }

  getData() {
    this.http.get('http://localhost:3000/usuarios').subscribe((data: any) => {
      this.personas = data;
    });
  }
}