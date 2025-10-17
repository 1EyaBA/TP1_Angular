import {Component, signal,computed} from '@angular/core';
import {CurrencyPipe, DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-ttc',
  standalone: true,
  imports: [
    CurrencyPipe,
    DecimalPipe
  ],
  templateUrl: './ttc.component.html',
  styleUrl: './ttc.component.css'
})
export class TtcComponent {

  prixHT=signal(0);
  tauxTVA=signal(18);
  quantite=signal(1);

  remise=computed(()=>{
    const q=this.quantite();
    if(q>=10 && q <= 15) return 20;
    if(q>15) return 30;
    return 0;
  })
  prixUnitaireTTC = computed(() => {
    const prixHT = this.prixHT();
    const tauxTVA = this.tauxTVA();
    const remise = this.remise();
    return prixHT * (1 + tauxTVA/100) * (1 - remise/100);
  })

  prixTotalTTC=computed(()=>{
    const prixHT=this.prixHT();
    const tauxTVA=this.tauxTVA();
    const remise=this.remise();
    const quantite=this.quantite();
    return prixHT * (1 + tauxTVA/100) * (1 - remise/100) * quantite;
  })



}
