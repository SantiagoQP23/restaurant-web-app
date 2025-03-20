import {
  Box,
  Card,
  Typography,
  Container,
  Divider,
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
  styled
} from '@mui/material';
// import { Helmet } from 'react-helmet-async';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

const MainContent = styled(Box)(
  ({ theme }) => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
`
);

const ButtonSearch = styled(Button)(
  ({ theme }) => `
    margin-right: -${theme.spacing(1)};
`
);

function Status404() {
  return (
    <>
      {/*  <Helmet>
        <title>Status - 404</title>
      </Helmet> */}
      <MainContent>
        <Container maxWidth='md'>
          <Box textAlign='center'>
            <img alt='404' height={180} src='/static/images/status/404.svg' />
            <Typography variant='h5' sx={{ my: 2 }}>
              La página que estás buscando no existe
            </Typography>
          </Box>
          <Container maxWidth='sm'>
            <Card sx={{ textAlign: 'center', mt: 3, p: 4 }}>
              <FormControl variant='outlined' fullWidth>
                <OutlinedInputWrapper
                  type='text'
                  placeholder='Search terms here...'
                  endAdornment={
                    <InputAdornment position='end'>
                      <ButtonSearch variant='contained' size='small'>
                        Search
                      </ButtonSearch>
                    </InputAdornment>
                  }
                  startAdornment={
                    <InputAdornment position='start'>
                      <SearchTwoToneIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Divider sx={{ my: 4 }}>O</Divider>
              <Button href='/menu' variant='outlined'>
                Ir a menú principal
              </Button>
            </Card>
          </Container>
        </Container>
      </MainContent>
    </>
  );
}

export default Status404;
