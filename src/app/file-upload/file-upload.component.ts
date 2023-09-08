import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUploadService } from '../services/file-upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  curentUser: any;
  fileInfos?: Observable<any>;

  constructor(
    private uploadService: FileUploadService,
    private authService: AuthService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    //this.fileInfos = this.uploadService.getFiles();
    this.userService.getUsersByUsername(this.authService.username).subscribe({
      next: (data) => {
        this.userService.userCourant = data;
        this.curentUser = data;
      },
    });
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService
          .upload(this.currentFile, this.authService.username)
          .subscribe({
            next: (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round((100 * event.loaded) / event.total);
              } else if (event instanceof HttpResponse) {
                this.message = event.body.message;
                this.fileInfos = this.uploadService.getFiles();
              }
            },
            error: (err: any) => {
              console.log(err);
              this.progress = 0;

              if (err.error && err.error.message) {
                this.message = err.error.message;
              } else {
                this.message = 'Could not upload the file!';
              }

              this.currentFile = undefined;
            },
            complete: () => {
              this.userService
                .getUsersByUsername(this.authService.username)
                .subscribe({
                  next: (data) => {
                    this.userService.userCourant = data;
                    this.curentUser = data;
                  },
                });
            },
          });
      }

      this.selectedFiles = undefined;
    }
  }

  deleteFile(fileName: string) {
    this.uploadService.deleteFile(fileName).subscribe({
      next: (date) => {
        this.fileInfos = this.uploadService.getFiles();
      },
      error: (e) => {},
    });
  }
}
