import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certifications',
  imports: [CommonModule],
  templateUrl: './certifications.html',
  styleUrl: './certifications.scss'
})
export class Certifications {
  adobeCourses = [
    'Design Fundamentals with AI',
    'Generative AI Content Creation',
    'Digital Marketing',
    'Social Media Content and Strategy',
    'Multichannel Content Marketing'
  ];

  adobeCertificates = [
    {
      id: 'FBBNR44E32U8',
      title: 'Generative AI Content Creation',
      desc: 'Using generative AI tools to plan, produce and refine on-brand visual and written content faster.'
    },
    {
      id: 'YX9QIFHTARUZ',
      title: 'Social Media Content and Strategy',
      desc: 'Planning platform-specific content, growing engagement and measuring social campaign performance.'
    },
    {
      id: 'C7RSFBJEHD0Y',
      title: 'Multichannel Content Marketing',
      desc: 'Running consistent campaigns across web, email and social, and adapting one message to each channel.'
    }
  ];
}
