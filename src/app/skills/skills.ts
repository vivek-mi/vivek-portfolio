import { Component } from '@angular/core';

interface SkillCategory {
  label: string;
  icon: string;
  skills: { name: string; level: 'expert' | 'proficient' | 'learning' }[];
}

@Component({
  selector: 'app-skills',
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class Skills {
  categories: SkillCategory[] = [
    {
      label: 'Frontend',
      icon: '🖥️',
      skills: [
        { name: 'Angular', level: 'expert' },
        { name: 'TypeScript', level: 'expert' },
        { name: 'RxJS', level: 'proficient' },
        { name: 'Angular Material', level: 'proficient' },
        { name: 'HTML5', level: 'expert' },
        { name: 'CSS3 / SCSS', level: 'expert' },
        { name: 'Angular Signals', level: 'proficient' },
        { name: 'Responsive Design', level: 'expert' },
      ]
    },
    {
      label: 'Backend',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', level: 'expert' },
        { name: 'Express.js', level: 'expert' },
        { name: 'RESTful APIs', level: 'expert' },
        { name: 'JWT Authentication', level: 'proficient' },
        { name: 'Socket.IO', level: 'proficient' },
      ]
    },
    {
      label: 'Database',
      icon: '🗄️',
      skills: [
        { name: 'MongoDB', level: 'expert' },
        { name: 'Mongoose ODM', level: 'expert' },
        { name: 'SQL / SQLite', level: 'proficient' },
        { name: 'Firebase Firestore', level: 'proficient' },
        { name: 'Firebase Realtime DB', level: 'proficient' },
      ]
    },
    {
      label: 'Languages',
      icon: '💻',
      skills: [
        { name: 'JavaScript (ES6+)', level: 'expert' },
        { name: 'TypeScript', level: 'expert' },
        { name: 'Java', level: 'proficient' },
        { name: 'Python', level: 'proficient' },
        { name: 'Kotlin', level: 'learning' },
      ]
    },
    {
      label: 'Mobile',
      icon: '📱',
      skills: [
        { name: 'Android SDK', level: 'proficient' },
        { name: 'Google ML Kit', level: 'proficient' },
        { name: 'CameraX', level: 'proficient' },
        { name: 'Firebase Auth', level: 'proficient' },
        { name: 'Android Studio', level: 'proficient' },
      ]
    },
    {
      label: 'AI & Productivity',
      icon: '🤖',
      skills: [
        { name: 'Prompt Engineering', level: 'expert' },
        { name: 'Claude (Pro)', level: 'expert' },
        { name: 'AI-Assisted Development', level: 'expert' },
        { name: 'Generative AI Tools', level: 'proficient' },
      ]
    },
    {
      label: 'Tools & Practices',
      icon: '🔧',
      skills: [
        { name: 'Git / GitHub', level: 'expert' },
        { name: 'Postman', level: 'expert' },
        { name: 'VS Code', level: 'expert' },
        { name: 'Agile / Scrum', level: 'proficient' },
        { name: 'Code Reviews', level: 'proficient' },
      ]
    },
  ];

  levelLabel = { expert: 'Practical', proficient: 'Working', learning: 'Learning' };
}
