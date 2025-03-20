import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

// import { PageTitleWrapper, PageTitle } from "../../../components/ui";
// import { TitlePage } from "../components/TitlePage.component";

export const EditMenu = () => {
  return (
    <>
      <Container maxWidth='lg'>
        {/* <TitlePage
          title='Editar menú'
        />
      */}

        <Outlet />
      </Container>
    </>
  );
};

export default EditMenu;
