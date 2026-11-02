import { Component, signal, OnInit, AfterViewInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements OnInit, AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  private http = inject(HttpClient);

  form: ContactForm = { name: '', email: '', message: '' };
  sending = signal(false);
  sent = signal(false);
  error = signal('');

  contactInfo = [
    {
      icon: 'email',
      label: 'Email',
      value: 'vivek79054@gmail.com',
      href: 'mailto:vivek79054@gmail.com'
    },
    {
      icon: 'phone',
      label: 'Phone',
      value: '+91 7905456461',
      href: 'tel:+917905456461'
    },
    {
      icon: 'location',
      label: 'Location',
      value: 'Greater Noida, UP, India',
      href: null
    },
    {
      icon: 'linkedin',
      label: 'LinkedIn',
      value: 'vivekmishra01',
      href: 'https://www.linkedin.com/in/vivekmishra01'
    }
  ];

  ngOnInit() {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initAnimations();
    }
  }

  private initAnimations() {
    const els = document.querySelectorAll('#contact .fade-up');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach(el => observer.observe(el));
  }

  async submit() {
    if (!this.form.name || !this.form.email || !this.form.message) return;
    if (this.sending()) return;

    this.sending.set(true);
    this.error.set('');

    try {
      await this.http.post('/api/contact', this.form).toPromise();
      this.sent.set(true);
      this.form = { name: '', email: '', message: '' };
    } catch {
      this.error.set('Something went wrong. Please email me directly at vivek79054@gmail.com');
    } finally {
      this.sending.set(false);
    }
  }
}
