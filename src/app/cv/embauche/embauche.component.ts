import { Component } from '@angular/core';
import { EmbaucheService } from '../services/embauche.service';
import { Cv } from '../model/cv';
import {Observable} from "rxjs";

@Component({
  selector: 'app-embauche',
  templateUrl: './embauche.component.html',
  styleUrls: ['./embauche.component.css'],
})
export class EmbaucheComponent {
  public embauchees$: Observable<Cv[]> | null  = null
  constructor(private embaucheService: EmbaucheService) {
    this.embauchees$ = this.embaucheService.getEmbauchees();
  }
}
