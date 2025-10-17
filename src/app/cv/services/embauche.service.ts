import {computed, Injectable, signal} from '@angular/core';
import { Cv } from '../model/cv';

@Injectable({
  providedIn: 'root',
})
export class EmbaucheService {
  private embauchees =  signal<Cv[]>([]) ;
  readonly public_embauchees = this.embauchees.asReadonly();
  readonly nombre_embauchees = computed(() => this.embauchees.length);

  constructor() {}

  /**
   *
   * Retourne la liste des embauchees
   *
   * @returns CV[]
   *
   */
  getEmbauchees(): Cv[] {
    return this.embauchees();
  }

  /**
   *
   * Embauche une personne si elle ne l'est pas encore
   * Sinon il retourne false
   *
   * @param cv : Cv
   * @returns boolean
   */
  embauche(cv: Cv): boolean {
    const currentEmbauches = this.embauchees();
    if (currentEmbauches.findIndex(e => e.id === cv.id) === -1) {
      this.embauchees.set([...currentEmbauches, cv]);
      return true;
    }
    return false;
  }
}
