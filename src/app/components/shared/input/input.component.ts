import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControlName, FormControl, Form } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input('labelName') labelName:string; 
  @Input('invalidMsg') invalidMsg:string; 
  @Input('form') form:FormGroup; 
  @Input('inputName') inputName:FormControl; 

  constructor() { }

  ngOnInit() {
  }
}
