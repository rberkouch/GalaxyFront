import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {catchError, map, Observable, throwError} from "rxjs";

import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
}
