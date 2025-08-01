import { Component, effect, input, signal, computed, ViewChild, ElementRef } from '@angular/core';
import { FieldDto, FileFieldDto } from '../field-dto';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormUtils } from '../form-utils';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface FileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  url?: string;
  uploadProgress?: number;
  isUploading?: boolean;
  error?: string;
}

@Component({
  selector: 'lite-file',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: `./lite-file.html`,
  styleUrls: [`../lite-styles.scss`]
})
export class LiteFile {
  file_icon = `<svg xmlns="http://www.w3.org/2000/svg" class="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14,2 14,8 20,8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10,9 9,9 8,9"></polyline></svg>`
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('cameraInput') cameraInput!: ElementRef<HTMLInputElement>;

  inEdit = input<boolean>(true);
  control = input<FileFieldDto>({ label: '', formControl: new FormControl<FileItem[]>([]) });
  
  readonly FormUtils = FormUtils;
  
  // State signals
  files = signal<FileItem[]>([]);
  showPanel = signal<boolean>(false);
  isDragOver = signal<boolean>(false);
  isUploading = signal<boolean>(false);

  // Computed values
  fileCount = computed(() => this.files().length);
  totalSize = computed(() => 
    this.files().reduce((total, file) => total + file.size, 0)
  );
  hasErrors = computed(() => 
    this.files().some(file => file.error)
  );
  
  // Get configuration from control
  multiple = computed(() => this.control().multiple ?? true);
  accept = computed(() => this.control().accept ?? '*/*');
  maxFileSize = computed(() => this.control().maxFileSize ?? 10 * 1024 * 1024);
  maxFiles = computed(() => this.control().maxFiles ?? 10);
  showPreview = computed(() => this.control().showPreview ?? true);

  constructor(private sanitizer: DomSanitizer) {
    effect(() => {
      console.log('LiteFile initialized with control:', this.control());
      
      // Sync files with form control
      const controlValue = this.control().formControl.value || [];
      if (Array.isArray(controlValue)) {
        this.files.set(controlValue);
      }
    });

    // Watch files changes and update form control
    effect(() => {
      const currentFiles = this.files();
      this.control().formControl.setValue(currentFiles);
    });
  }

  isRequired() {
    return this.FormUtils.isRequired(this.control().formControl);
  }

  hasFormErrors(): boolean {
    return FormUtils.hasErrors(this.control().formControl);
  }

  getErrorMessage(): string[] {
    return FormUtils.getErrorMessages(this.control().formControl, this.control().label);
  }

  // File operations
  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(Array.from(input.files));
    }
    // Reset input
    input.value = '';
  }

  onCameraCapture(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(Array.from(input.files));
    }
    // Reset input
    input.value = '';
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);

    const files = Array.from(event.dataTransfer?.files || []);
    this.handleFiles(files);
  }
  svgToBase64DataUrl(svgString: string): SafeHtml {
    const base64 = btoa(svgString);
    const img = `data:image/svg+xml;base64,${base64}`;
    return this.sanitizer.bypassSecurityTrustUrl(img);
  }

  private handleFiles(newFiles: File[]) {
    const currentFiles = this.files();
    const processedFiles: FileItem[] = [];

    for (const file of newFiles) {
      // Check file count limit
      if (!this.multiple() && currentFiles.length >= 1) {
        console.warn('Multiple files not allowed');
        break;
      }

      if (currentFiles.length + processedFiles.length >= this.maxFiles()) {
        console.warn(`Maximum ${this.maxFiles()} files allowed`);
        break;
      }

      // Validate file
      const validation = this.validateFile(file);
      
      const fileItem: FileItem = {
        id: this.generateFileId(),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        error: validation.error
      };

      // Create preview URL for images
      if (this.showPreview() && file.type.startsWith('image/')) {
        fileItem.url = URL.createObjectURL(file);
      }

      processedFiles.push(fileItem);
    }

    // Update files
    if (this.multiple()) {
      this.files.set([...currentFiles, ...processedFiles]);
    } else {
      this.files.set(processedFiles.slice(0, 1));
    }
  }

  private validateFile(file: File): { valid: boolean; error?: string } {
    // Check file size
    if (file.size > this.maxFileSize()) {
      return {
        valid: false,
        error: `File size exceeds ${this.formatFileSize(this.maxFileSize())}`
      };
    }

    // Check file type if accept is specified
    const acceptTypes = this.accept();
    if (acceptTypes && acceptTypes !== '*/*') {
      const allowedTypes = acceptTypes.split(',').map((type: string) => type.trim());
      const isAllowed = allowedTypes.some((allowedType: string) => {
        if (allowedType.startsWith('.')) {
          return file.name.toLowerCase().endsWith(allowedType.toLowerCase());
        }
        return file.type.match(new RegExp(allowedType.replace('*', '.*')));
      });

      if (!isAllowed) {
        return {
          valid: false,
          error: `File type not allowed. Accepted: ${acceptTypes}`
        };
      }
    }

    return { valid: true };
  }

  removeFile(fileId: string) {
    const currentFiles = this.files();
    const fileToRemove = currentFiles.find(f => f.id === fileId);
    
    // Revoke object URL to prevent memory leaks
    if (fileToRemove?.url) {
      URL.revokeObjectURL(fileToRemove.url);
    }

    this.files.set(currentFiles.filter(f => f.id !== fileId));
  }

  clearAllFiles() {
    // Revoke all object URLs
    this.files().forEach(file => {
      if (file.url) {
        URL.revokeObjectURL(file.url);
      }
    });

    this.files.set([]);
  }

  // UI actions
  togglePanel() {
    this.showPanel.set(!this.showPanel());
  }

  closePanel() {
    this.showPanel.set(false);
  }

  openFileDialog() {
    this.fileInput.nativeElement.click();
  }

  openCameraDialog() {
    this.cameraInput.nativeElement.click();
  }

  // Utility methods
  private generateFileId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getFileIcon(fileType: string): string {
    if (fileType.startsWith('image/')) return '🖼️';
    if (fileType.startsWith('video/')) return '🎥';
    if (fileType.startsWith('audio/')) return '🎵';
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word')) return '📝';
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return '📊';
    if (fileType.includes('powerpoint') || fileType.includes('presentation')) return '📋';
    if (fileType.includes('zip') || fileType.includes('rar')) return '🗜️';
    return '📁';
  }

  isImage(fileType: string): boolean {
    return fileType.startsWith('image/');
  }

  getTotalSizeFormatted(): string {
    return this.formatFileSize(this.totalSize());
  }
}
