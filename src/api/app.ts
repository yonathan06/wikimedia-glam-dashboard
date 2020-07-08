
export interface MediaItem {
  name: string,
  descriptionHTML?: string,
  filePath: string,
  uploadDate: string
}

const MockMediaList: MediaItem[] = [
  {
    name: 'Sphinx',
    filePath: '/wikipedia/commons/9/96/Sphinx_Metropolitan.jpg',
    descriptionHTML: 'Sphinx, Metropolitan Museum of Art, NY',
    uploadDate: '2007-09-01T06:22:18Z',
  },
  {
    name: 'The Burghers of Calais',
    filePath: '/wikipedia/commons/2/21/The_Burghers_of_Calais_NY.jpg',
    uploadDate: '2007-04-08T06:22:18Z',
  },
  {
    name: 'The Abduction of the Sabine Women',
    filePath: '/wikipedia/commons/a/a8/Nicolas_Poussin_-_L\'Enlèvement_des_Sabines_(1634-5).jpg',
    uploadDate: '2007-01-013T06:22:18Z',
  }
]

export const getInstMediaItems = async () => {
  return MockMediaList;
}

export const getMedia =
  (filePath: string) => MockMediaList.find(item => item.filePath === filePath);