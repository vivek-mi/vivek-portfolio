import { Component, OnInit, OnDestroy, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { monthsSince } from '../experience/experience';

export const EMAIL = 'vivek79054@gmail.com';
// mailto: silently does nothing when no desktop mail app is configured, so open Gmail's web composer instead
export const EMAIL_COMPOSE_URL =
  `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent('Job opportunity for Vivek Mishra')}`;

export const OPEN_ROLES = [
  'Software Developer',
  'Frontend Developer',
  'Backend Developer',
  'Full-Stack / MEAN Stack',
  'Java Developer'
];

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  readonly experienceMonths = monthsSince(2026, 2);
  readonly openRoles = OPEN_ROLES;
  readonly emailUrl = EMAIL_COMPOSE_URL;
  roles = [
    'Software Developer',
    'Full-Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'MEAN Stack Developer',
    'Java Developer'
  ];
  currentRole = 0;
  displayRole = signal(this.roles[0]);
  isDeleting = false;
  private typeTimer?: ReturnType<typeof setTimeout>;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.typeTimer = setTimeout(() => this.startTyping(), 1600);
    }
  }

  ngOnDestroy() {
    clearTimeout(this.typeTimer);
  }

  private startTyping() {
    const role = this.roles[this.currentRole];
    const shown = this.displayRole();
    let delay = this.isDeleting ? 22 : 42;

    if (!this.isDeleting && shown.length < role.length) {
      this.displayRole.set(role.substring(0, shown.length + 1));
    } else if (this.isDeleting && shown.length > 0) {
      this.displayRole.set(shown.substring(0, shown.length - 1));
    } else if (!this.isDeleting) {
      this.isDeleting = true;
      delay = 1600;
    } else {
      this.isDeleting = false;
      this.currentRole = (this.currentRole + 1) % this.roles.length;
      delay = 200;
    }

    this.typeTimer = setTimeout(() => this.startTyping(), delay);
  }

  scrollToProjects() {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToContact() {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  }
}
