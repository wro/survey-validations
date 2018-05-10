import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidationService} from "./validation.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public form:FormGroup;
  public messages:any[] = [];

  constructor(builder:FormBuilder, private validationService:ValidationService, translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
    this.form = builder.group({
      translations: builder.group({
        title: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
        description: ['', Validators.required]
      }),
      questionBlocks: builder.array([
        builder.group({
          questions: builder.array([
            builder.group({
              question: ['', Validators.required],
              type: ['', Validators.required],
              answer: ['', Validators.required]
            }),
            builder.group({
              question: ['', Validators.required],
              type: ['', Validators.required],
              answer: ['', Validators.required]
            })
          ])
        }),
        builder.group({
          questions: builder.array([
            builder.group({
              question: ['', Validators.required],
              type: ['', Validators.required],
              answer: ['', Validators.required]
            }),
            builder.group({
              question: ['', Validators.required],
              type: ['', Validators.required],
              answer: ['', Validators.required]
            })
          ])
        })
      ])
    });
  }

  get questionBlocks(): FormArray {
    return this.form.get('questionBlocks') as FormArray;
  }

  validate() {
    let errors = this.validationService.getErrors(this.form.controls);
    this.messages = errors.map(error => {
      return {
        text: error.message,
        params: error.error_value || {}
      }
    });
    console.log(this.messages);
  }
}
