import { GlamMediaItem } from '../lib/models';

const BaseUrl = process.env.REACT_APP_API_URL;

export async function getGlamMediaItems(glamId: string) {
  const response = await fetch(`${BaseUrl}/glam/${glamId}/item`);
  const data = await response.json();
  return data.items as GlamMediaItem[];
}

export async function addMediaItems(glamId: string, items: FileData[]) {
  const response = await fetch(`${BaseUrl}/glam/${glamId}/item`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ items }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error('Error adding item:' + JSON.stringify(data));
  }
  return data.items;
}

export interface FileData {
  title: string;
  file_path: string;
  thumbnail_url: string;
  upload_date: string;
  page_url: string;
}

export async function fetchFileData(fileName: string): Promise<FileData> {
  const response = await fetch(`${BaseUrl}/filedata?fileName=${fileName}`);
  return await response.json();
}

export interface CategoryFileMembersResponse {
  next?: string;
  items: FileData[];
}

export async function fetchFileListByCategory(category: string, next?: string) {
  const queryParams = new URLSearchParams();
  queryParams.append('category', category);
  if (next) {
    queryParams.append('next', next);
  }
  const response = await fetch(`${BaseUrl}/categoryfiles?${queryParams}`);
  const data: CategoryFileMembersResponse = await response.json();
  return data;
}

export async function login(
  glam_id: string,
  username: string,
  password: string
) {
  const response = await fetch(`${BaseUrl}/glam/${glam_id}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error('Bad login');
  }
  return await response.json();
}
