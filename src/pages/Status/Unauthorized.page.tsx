import {
  Container,
  Box,
  Typography,
  Card,
  FormControl,
  InputAdornment,
  Divider,
  Button,
  styled,
  OutlinedInput
} from '@mui/material';

const MainContent = styled(Box)(
  ({ theme }) => `
    margin-top: 100px;
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

export const UnauthorizedPage = () => {
  return (
    <MainContent>
      <Container maxWidth='md'>
        <Box textAlign='center'>
          <Typography variant='h3' sx={{ my: 2 }}>
            No estas autorizado para ver esta página
          </Typography>
          <Typography
            variant='h6'
            color='text.secondary'
            fontWeight='normal'
            sx={{ mb: 4 }}
          >
            Por favor, solicite permisos al administrador
          </Typography>
        </Box>
      </Container>
    </MainContent>
  );
};
