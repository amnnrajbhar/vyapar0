import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports:[CommonModule],
  template: `
    <div class="file-upload">
      <label class="file-upload-label" [class.has-file]="hasFile">
        <input 
          type="file" 
          [accept]="accept" 
          (change)="onFileSelect($event)"
          class="file-upload-input"
        >
        <div class="file-upload-content">
          <div class="upload-icon" *ngIf="!preview">📁</div>
          <img 
            *ngIf="preview && accept.includes('image')" 
            [src]="preview" 
            alt="Preview" 
            class="preview-image"
          >
          <span class="upload-text">{{ uploadText }}</span>
        </div>
      </label>
    </div>
  `,
  styles: [`
    .file-upload {
      width: 100%;
    }

    .file-upload-label {
      display: block;
      padding: 20px;
      border: 2px dashed #CBD5E0;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: center;
      background: #F8FAFC;
    }

    .file-upload-label:hover {
      border-color: #3B82F6;
      background: #EBF8FF;
    }

    .file-upload-label.has-file {
      border-color: #10B981;
      background: #ECFDF5;
    }

    .file-upload-input {
      display: none;
    }

    .file-upload-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .upload-icon {
      font-size: 24px;
    }

    .preview-image {
      max-width: 100px;
      max-height: 100px;
      object-fit: cover;
      border-radius: 4px;
    }

    .upload-text {
      font-size: 14px;
      color: #6B7280;
      font-weight: 500;
      text-align: center;
    }

    @media (max-width: 768px) {
      .file-upload-label {
        padding: 15px;
      }

      .upload-icon {
        font-size: 20px;
      }

      .preview-image {
        max-width: 80px;
        max-height: 80px;
      }

      .upload-text {
        font-size: 12px;
      }
    }

    @media (max-width: 480px) {
      .file-upload-label {
        padding: 12px;
      }

      .upload-icon {
        font-size: 18px;
      }

      .preview-image {
        max-width: 60px;
        max-height: 60px;
      }

      .upload-text {
        font-size: 11px;
      }
    }
  `]
})
export class FileUploadComponent {
  @Input() accept: string = 'image/*';
  @Input() uploadText: string = 'Click to upload';
  @Output() fileSelect = new EventEmitter<string>();

  preview: string | null = null;
  hasFile: boolean = false;

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.hasFile = true;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.preview = e.target.result;
        this.fileSelect.emit(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
}