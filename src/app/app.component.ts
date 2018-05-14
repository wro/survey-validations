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
          order : [1, Validators.required],
          title : ['', Validators.required],
          questions: builder.array([
            builder.group({
              question: ['', Validators.required],
              order: [1, Validators.required],
              type: ['', Validators.required],
              answer: ['', Validators.required],
              params: builder.group({
                feedback : ['', Validators.required]
              })
            }),
            builder.group({
              question: ['', Validators.required],
              order: [2, Validators.required],
              type: ['', Validators.required],
              answer: ['', Validators.required],
              params: builder.group({
                feedback : ['', Validators.required]
              })
            })
          ])
        }),
        builder.group({
          order : [2, Validators.required],
          title : ['', Validators.required],
          questions: builder.array([
            builder.group({
              question: ['', Validators.required],
              order: [3, Validators.required],
              type: ['', Validators.required],
              answer: ['', Validators.required],
              params: builder.group({
                feedback : ['', Validators.required]
              })
            }),
            builder.group({
              question: ['', Validators.required],
              order: [4, Validators.required],
              type: ['', Validators.required],
              answer: ['', Validators.required],
              params: builder.group({
                feedback : ['', Validators.required]
              })
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
    console.log('errors', errors);
    this.messages = errors.map(error => {

      let messageParams = {}; //error.error_value

      let parts = error.full_control_name.split('.');
      parts.forEach((part, idx) => {
        let isNumberRegex = /[0-9]+/;
        if (isNumberRegex.test(part)) {
          let arrayName = parts[idx - 1];
          messageParams[arrayName + 'Idx'] = part
        }
      });

      return {
        text: error.message.replace(/\d+/g, '*'),
        params: messageParams
      }
    });
    console.log('messages', this.messages);
  }
}
