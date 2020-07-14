import React from 'react';

export interface CurrentUser {
  token: string;
  glam_id: string;
  username: string;
}

interface GlamContextProps {
  currentUser?: CurrentUser;
  setCurrentUser: (user: CurrentUser) => void;
  removeCurrentUser: () => void;
}

const GlamContext = React.createContext<GlamContextProps>({
  setCurrentUser: () => {},
  removeCurrentUser: () => {},
});

export default GlamContext;
