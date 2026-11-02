import { Component } from '@angular/core';

interface Product {
  title: string;
  tag: string;
  description: string;
  stack: string[];
  link?: { href: string; label: string };
}

@Component({
  selector: 'app-work',
  templateUrl: './work.html',
  styleUrl: './work.scss'
})
export class Work {
  boardColumns = [
    { name: 'In Progress', issues: [{ type: 'Story', p: 'high' }, { type: 'Bug', p: 'med' }] },
    { name: 'In Review', issues: [{ type: 'Story', p: 'med' }] },
    { name: 'Done', issues: [{ type: 'Bug', p: 'low' }, { type: 'Story', p: 'low' }] }
  ];

  leadRows = [
    { source: 'Contact Form', status: 'Contacted' },
    { source: 'Conference Room', status: 'Not Contacted' },
    { source: 'Contact Form', status: 'Contacted' },
    { source: 'Conference Room', status: 'Lost' }
  ];

  compact: Product[] = [
    {
      title: 'StartWorks Website',
      tag: 'Live · Public website',
      description: 'Public site for StartWorks, a business centre on Barakhamba Road, New Delhi. Workspace listings, locations, amenities and tour bookings, with enquiries feeding straight into the lead portal.',
      stack: ['Angular', 'Node.js', 'MongoDB'],
      link: { href: 'https://startworks.co.in/', label: 'startworks.co.in' }
    },
    {
      title: 'Connect Bharat Platform',
      tag: 'Production platform',
      description: 'Front-end modules for the Connect Bharat platform. I turn product requirements into responsive, reusable Angular components that are shared across features and backed by Node.js APIs.',
      stack: ['Angular', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB']
    }
  ];
}
