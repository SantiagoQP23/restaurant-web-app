import { Typography, Link } from '@mui/material';

export function Copyright(props: any) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Santiago Quirumbay
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
