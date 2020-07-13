export interface FormValues {
  filePath: string;
  start: Date;
  end: Date;
}

export interface GlamMediaItem {
  glam_id: string;
  file_path: string;
  title: string;
  page_url: string;
  thumbnail_url: string;
  upload_date: string;
  created_at: string;
  updated_at: string;
}

export interface Glam {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}
