import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { EMAIL_COMPOSE_URL } from '../hero/hero';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  private platformId = inject(PLATFORM_ID);
  year = new Date().getFullYear();
  readonly emailUrl = EMAIL_COMPOSE_URL;

  scrollTo(id: string) {
    if (isPlatformBrowser(this.platformId)) {
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
