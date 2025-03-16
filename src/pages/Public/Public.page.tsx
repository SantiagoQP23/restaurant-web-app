import { useRoutes } from 'react-router-dom';
import { PublicRouter } from './router/Public.router';

export const Public = () => {
  const content = useRoutes(PublicRouter);

  return <>{content}</>;
};
