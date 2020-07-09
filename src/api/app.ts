export interface MediaItem {
  name: string,
  filePath: string,
  uploadDate: string,
  thumbnailURL?: string,
  fileURL?: string
}

const MockMediaList: MediaItem[] = [
  {
    name: "Sphinx Metropolitan.jpg",
    filePath: "/wikipedia/commons/9/96/Sphinx_Metropolitan.jpg",
    thumbnailURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sphinx_Metropolitan.jpg/150px-Sphinx_Metropolitan.jpg",
    fileURL: "http://commons.wikimedia.org/wiki/File:Sphinx_Metropolitan.jpg",
    uploadDate: "2008-02-29T15:04:26Z"
  },
  {
    name: "The Burghers of Calais NY.jpg",
    filePath: "/wikipedia/commons/2/21/The_Burghers_of_Calais_NY.jpg",
    thumbnailURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/The_Burghers_of_Calais_NY.jpg/112px-The_Burghers_of_Calais_NY.jpg",
    fileURL: "http://commons.wikimedia.org/wiki/File:The_Burghers_of_Calais_NY.jpg",
    uploadDate: "2008-02-29T13:43:37Z",
  },
  {
    name: "Nicolas Poussin - L'Enlèvement des Sabines (1634-5).jpg",
    filePath: "/wikipedia/commons/a/a8/Nicolas_Poussin_-_L'Enlèvement_des_Sabines_(1634-5).jpg",
    thumbnailURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Nicolas_Poussin_-_L%27Enl%C3%A8vement_des_Sabines_%281634-5%29.jpg/150px-Nicolas_Poussin_-_L%27Enl%C3%A8vement_des_Sabines_%281634-5%29.jpg",
    fileURL: "http://commons.wikimedia.org/wiki/File:Nicolas_Poussin_-_L'Enlèvement_des_Sabines_(1634-5).jpg",
    uploadDate: "2018-04-01T10:40:42Z"
  }
]

export const getInstMediaItems = async () => {
  return MockMediaList;
}

export const getMedia =
  (filePath: string) => MockMediaList.find(item => item.filePath === filePath);


export async function addMediaItem(glamId: string, item: MediaItem) {
  return item;
}

export async function fetchMediaDataFromFileName(fileName: string) {
  const response = await fetch(`http://localhost:5000/commonsapi?fileName=${fileName}`);
  const text = await response.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, 'text/xml');
  const name = xml.querySelector('response>file>name')?.textContent ?? '';
  const filePath = xml.querySelector('response>file>urls>file')?.textContent?.replace('https://upload.wikimedia.org', '') ?? '';
  const uploadDate = xml.querySelector('response>file>upload_date')?.textContent ?? '';
  const thumbnailURL = xml.querySelector('response>file>urls>thumbnail')?.textContent ?? '';
  const fileURL = xml.querySelector('response>file>urls>description')?.textContent ?? '';
  const fileData: MediaItem = { 
    name, 
    // need to decode because encoded later on mediarequest fetch
    filePath: decodeURIComponent(filePath ?? ''), 
    thumbnailURL, 
    fileURL, 
    uploadDate 
  };
  return fileData;
}