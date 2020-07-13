import { CategoryFileMembersResponse } from './wikipedia';
import { GlamMediaItem } from '../lib/models';

const MockMediaList: GlamMediaItem[] = [
  {
    glam_id: '',
    title: 'Sphinx Metropolitan.jpg',
    file_path: '/wikipedia/commons/9/96/Sphinx_Metropolitan.jpg',
    thumbnail_url:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sphinx_Metropolitan.jpg/150px-Sphinx_Metropolitan.jpg',
    page_url: 'http://commons.wikimedia.org/wiki/File:Sphinx_Metropolitan.jpg',
    upload_date: '2008-02-29T15:04:26Z',
    created_at: '2008-02-29T15:04:26Z',
    updated_at: '2008-02-29T15:04:26Z',
  },
  {
    glam_id: '',
    title: 'The Burghers of Calais NY.jpg',
    file_path: '/wikipedia/commons/2/21/The_Burghers_of_Calais_NY.jpg',
    thumbnail_url:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/The_Burghers_of_Calais_NY.jpg/112px-The_Burghers_of_Calais_NY.jpg',
    page_url:
      'http://commons.wikimedia.org/wiki/File:The_Burghers_of_Calais_NY.jpg',
    upload_date: '2008-02-29T13:43:37Z',
    created_at: '2008-02-29T15:04:26Z',
    updated_at: '2008-02-29T15:04:26Z',
  },
  {
    glam_id: '',
    title: "Nicolas Poussin - L'Enlèvement des Sabines (1634-5).jpg",
    file_path:
      "/wikipedia/commons/a/a8/Nicolas_Poussin_-_L'Enlèvement_des_Sabines_(1634-5).jpg",
    thumbnail_url:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Nicolas_Poussin_-_L%27Enl%C3%A8vement_des_Sabines_%281634-5%29.jpg/150px-Nicolas_Poussin_-_L%27Enl%C3%A8vement_des_Sabines_%281634-5%29.jpg',
    page_url:
      "http://commons.wikimedia.org/wiki/File:Nicolas_Poussin_-_L'Enlèvement_des_Sabines_(1634-5).jpg",
    upload_date: '2018-04-01T10:40:42Z',
    created_at: '2008-02-29T15:04:26Z',
    updated_at: '2008-02-29T15:04:26Z',
  },
];

const BaseUrl = process.env.REACT_APP_API_URL;

export const getInstMediaItems = async () => {
  return MockMediaList;
};

export const getMedia = (filePath: string) =>
  MockMediaList.find((item) => item.file_path === filePath);

export async function addMediaItem(glamId: string, item: GlamMediaItem) {
  return item;
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
