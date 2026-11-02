import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience',
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.scss'
})
export class Experience {
  readonly tenure = formatTenure(monthsSince(2026, 2));
}

export function monthsSince(year: number, monthIndex: number): number {
  const now = new Date();
  return Math.max(1, (now.getFullYear() - year) * 12 + (now.getMonth() - monthIndex));
}

function formatTenure(months: number): string {
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts = [];
  if (y) parts.push(`${y} yr${y > 1 ? 's' : ''}`);
  if (m) parts.push(`${m} mo${m > 1 ? 's' : ''}`);
  return parts.join(' ');
}
