import { FC } from 'react';

// Material UI
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider
} from '@mui/material/';

interface IContentModal {
  title: string;
  text: string;
  clickConfirm: () => void;
}

interface Props {
  open: boolean;
  handleClose: () => void;
  children: JSX.Element;
  content: IContentModal;
}

export const Modal: FC<Props> = ({ open, handleClose, children, content }) => {
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id='alert-dialog-title' color='white'>
          {content.title}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {content.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant='contained' color='error'>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
