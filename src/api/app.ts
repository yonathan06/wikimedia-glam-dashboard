
export interface MediaItem {
  title: string,
  description?: string,
  filePath: string,
  date: string
}

const MockMediaList: MediaItem[] = [
  {
    title: 'Sphinx',
    filePath: '/wikipedia/commons/9/96/Sphinx_Metropolitan.jpg',
    description: 'Sphinx, Metropolitan Museum of Art, NY',
    date: '23 October 2004',
  },
  {
    title: 'The Burghers of Calais',
    filePath: '/wikipedia/commons/2/21/The_Burghers_of_Calais_NY.jpg',
    date: '23 October 2004',
  },
  {
    title: 'The Abduction of the Sabine Women',
    filePath: '/wikipedia/commons/a/a8/Nicolas_Poussin_-_L%27Enlèvement_des_Sabines_%281634-5%29.jpg',
    date: '1 April 2018',
  }
]

export const getInstMediaItems = async () => {
  return MockMediaList;
}

export const getMedia =
  (filePath: string) => MockMediaList.find(item => item.filePath === filePath);