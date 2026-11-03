import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {
  techStack = [
    'Angular', 'TypeScript', 'Node.js', 'Express.js',
    'MongoDB', 'RxJS', 'REST APIs', 'JWT', 'Git', 'Java', 'Prompt Engineering', 'Claude AI'
  ];
}
