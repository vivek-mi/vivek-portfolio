import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Work } from '../work/work';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, Work],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {}
