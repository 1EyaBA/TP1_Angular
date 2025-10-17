import { Component, OnInit } from '@angular/core';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES } from '../../../config/routes.config';
import { AuthService } from '../../auth/services/auth.service';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-details-cv',
  templateUrl: './details-cv.component.html',
  styleUrls: ['./details-cv.component.css'],
})
export class DetailsCvComponent implements OnInit {
  cv$: Observable<Cv> | null = null ;

  constructor(
    private cvService: CvService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.cv$ = this.cvService.getCvById(+id).pipe(
      catchError((error) => {
        this.router.navigate([APP_ROUTES.cv]);
        return EMPTY;
      })
    );
  }

  deleteCv(cv: Cv) {
    this.cvService.deleteCvById(cv.id).pipe(
      catchError((error) => {
        this.toastr.error(
          `Problème dans la suppression du CV `
        );
        return EMPTY;
      })
    ).subscribe({
      next: () => {
        this.toastr.success(`${cv.name} supprimé avec succès`);
        this.router.navigate([APP_ROUTES.cv]);
      }
    });
  }
}
