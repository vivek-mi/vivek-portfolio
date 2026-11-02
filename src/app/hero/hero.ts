import { Component, OnInit, ElementRef, ViewChild, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { monthsSince } from '../experience/experience';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero implements OnInit {
  private platformId = inject(PLATFORM_ID);
  @ViewChild('heroRef') heroRef!: ElementRef;

  readonly experienceMonths = monthsSince(2026, 2);
  roles = ['Software Developer', 'Full-Stack Developer', 'MEAN Stack Engineer', 'Angular Specialist'];
  currentRole = 0;
  displayRole = '';
  isDeleting = false;
  private typeTimer: any;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.startTyping();
      this.initAnimations();
    }
  }

  private startTyping() {
    const role = this.roles[this.currentRole];
    const speed = this.isDeleting ? 40 : 70;

    if (!this.isDeleting && this.displayRole.length < role.length) {
      this.displayRole = role.substring(0, this.displayRole.length + 1);
    } else if (this.isDeleting && this.displayRole.length > 0) {
      this.displayRole = this.displayRole.substring(0, this.displayRole.length - 1);
    } else if (!this.isDeleting) {
      setTimeout(() => { this.isDeleting = true; this.startTyping(); }, 2200);
      return;
    } else {
      this.isDeleting = false;
      this.currentRole = (this.currentRole + 1) % this.roles.length;
    }

    this.typeTimer = setTimeout(() => this.startTyping(), speed);
  }

  private async initAnimations() {
    try {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero__badge', { opacity: 0, y: 20, duration: 0.6, delay: 0.2 })
        .from('.hero__title-line', { opacity: 0, y: 60, stagger: 0.15, duration: 0.9 }, '-=0.2')
        .from('.hero__subtitle', { opacity: 0, y: 20, duration: 0.7 }, '-=0.4')
        .from('.hero__description', { opacity: 0, y: 20, duration: 0.7 }, '-=0.5')
        .from('.hero__actions', { opacity: 0, y: 20, duration: 0.7 }, '-=0.4')
        .from('.hero__social', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
        .from('.hero__photo-wrapper', { opacity: 0, scale: 0.92, duration: 1.0 }, '-=1.2');
    } catch (e) {}
  }

  scrollToProjects() {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToContact() {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  }
}
