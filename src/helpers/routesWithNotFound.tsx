import { Routes, Route } from 'react-router-dom';
import Status404 from '../pages/Status/Status404/index';

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export const RoutesWithNotFound = ({ children }: Props) => {
  return (
    <Routes>
      {children}
      <Route path='*' element={<Status404 />} />
    </Routes>
  );
};
