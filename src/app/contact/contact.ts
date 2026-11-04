import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { EMAIL, EMAIL_COMPOSE_URL, OPEN_ROLES } from '../hero/hero';

// Must match the backend's validation in backend/src/routes/contact.js
const MIN_MESSAGE_LENGTH = 10;

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

  readonly minMessageLength = MIN_MESSAGE_LENGTH;
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

  get messageLength() {
    return this.form.message.trim().length;
  }

  async submit() {
    if (!this.form.name || !this.form.email || !this.form.message) return;
    if (this.sending()) return;

    if (this.messageLength < MIN_MESSAGE_LENGTH) {
      this.error.set(`Please write a little more: your message needs at least ${MIN_MESSAGE_LENGTH} characters.`);
      return;
    }

    this.sending.set(true);
    this.error.set('');

    try {
      await firstValueFrom(this.http.post('/api/contact', this.form));
      this.sent.set(true);
      this.form = { name: '', email: '', message: '' };
    } catch (err) {
      this.error.set(this.errorMessage(err));
    } finally {
      this.sending.set(false);
    }
  }

  // Show the server's reason for problems the visitor can fix; fall back to email for everything else
  private errorMessage(err: unknown): string {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 400 && err.error?.errors?.length) return err.error.errors[0].msg;
      if (err.status === 429) return `You've sent several messages already. Please try again later or email me at ${EMAIL}.`;
    }
    return `Something went wrong. Please email me directly at ${EMAIL}`;
  }
}
