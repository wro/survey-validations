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
    console.log(errors);
    this.messages = errors.map(error => {

      let messageParams = {}; //error.error_value

      if(error.message.includes('*')){

        // Find nearest object with in parent form with order property to use as message param
        let objectPath = error.full_control_name.substr(0, error.full_control_name.lastIndexOf('.'));
        while(objectPath != ''){
          let parent = objectPath.
              replace(/\[/g, '.').
              replace(/\]/g, '').
              split('.').
              reduce((o, k) => (o || {})[k], this.form.value);

           // Check if parent form has an order property
           if(parent.order){
             messageParams['order'] = parent.order;
             break;
           }

          objectPath = objectPath.substr(0, objectPath.lastIndexOf('.'));
        }
      }

      return {
        text: error.message,
        params: messageParams
      }
    });
    console.log(this.messages);
  }
}
