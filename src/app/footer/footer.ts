import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  private platformId = inject(PLATFORM_ID);
  year = new Date().getFullYear();

  scrollTo(id: string) {
    if (isPlatformBrowser(this.platformId)) {
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
