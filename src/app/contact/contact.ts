import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EMAIL, EMAIL_COMPOSE_URL, OPEN_ROLES } from '../hero/hero';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  private http = inject(HttpClient);

  readonly openRoles = OPEN_ROLES;
  readonly emailUrl = EMAIL_COMPOSE_URL;
  form: ContactForm = { name: '', email: '', message: '' };
  sending = signal(false);
  sent = signal(false);
  error = signal('');
  copied = signal(false);

  contactInfo = [
    {
      icon: 'email',
      label: 'Email',
      value: EMAIL,
      href: EMAIL_COMPOSE_URL
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

  async copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      window.prompt('Copy my email address:', EMAIL);
    }
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
