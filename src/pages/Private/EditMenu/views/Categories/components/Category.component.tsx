import { ChangeEvent, FC, useState, KeyboardEvent } from 'react';

import { useNavigate } from 'react-router-dom';

// Material UI
import {
  Typography,
  Box,
  IconButton,
  Card,
  CardContent,
  MenuItem,
  Stack,
  CircularProgress,
  Popover,
  TextField,
  Button
} from '@mui/material/';

import {
  ArrowForward,
  DeleteOutlined,
  EditOutlined,
  MoreHoriz,
  Reply,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { ICategory } from '../../../../../../models';
import { setActiveCategory, updateCategory } from '../../../../../../redux';
import { Label } from '../../../../../../components/ui';
import { useAppDispatch } from '../../../../../../hooks/useRedux';
import {
  usePopupState,
  bindTrigger,
  bindPopover
} from 'material-ui-popup-state/hooks';
import NiceModal from '@ebay/nice-modal-react';
import {
  ModalDeleteCategory,
  Props as MDeleteProps
} from './ModalDeleteCategory.component';
import { UpdateCategoryDto } from '../../../dto';
import { useUpdateCategory } from '../../../hooks/useCategories';
import {
  ModalEditCategory,
  Props as MEditProps
} from './ModalEditCategory.component';

interface Props {
  categoria: ICategory;
}

/**
 *@author Santiago Quirumbay
 *@version 1.1 30/11/2023 Se agrego el componente de Material UI Popover
 */
export const Category: FC<Props> = ({ categoria }) => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { mutateAsync, isPending } = useUpdateCategory();

  const [name, setName] = useState(categoria.name);

  const [isEditing, setIsEditing] = useState(false);

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'categoryMenu'
  });

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const editNameCategory = () => {
    setIsEditing(true);
  };

  const showModalDeleteCategory = () => {
    NiceModal.show(ModalDeleteCategory, {
      category: categoria
    } as MDeleteProps);
  };

  const showModalEditCategory = () => {
    NiceModal.show(ModalEditCategory, {
      category: categoria
    } as MEditProps);
  };

  const showProducts = () => {
    dispatch(setActiveCategory(categoria));
    navigate('/menu/products');
  };

  const handleDelete = () => {
    popupState.close();
    showModalDeleteCategory();
  };

  const handleEdit = () => {
    showModalEditCategory();
    popupState.close();
  };

  const submitUpdateCategory = (updateCategoryDto: UpdateCategoryDto) => {
    mutateAsync(updateCategoryDto).then((category) => {
      dispatch(updateCategory(category));
    });
  };

  const changeVisibility = () => {
    popupState.close();
    submitUpdateCategory({
      id: categoria.id,
      isPublic: !categoria.isPublic
    });
  };

  const enableCategory = () => {
    popupState.close();
    submitUpdateCategory({
      id: categoria.id,
      isActive: true
    });
  };

  const updateNameCategory = async () => {
    setIsEditing(false);
    if (name === categoria.name || name === '') return;

    submitUpdateCategory({
      name,
      id: categoria.id
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // Enter key is pressed, execute your update logic
      updateNameCategory();
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1
            }}
          >
            <Label color={categoria.isActive ? 'success' : 'error'}>
              {categoria.isActive ? 'Activo' : 'Eliminado'}
            </Label>

            <Stack direction='row' spacing={1} alignItems='center'>
              {isPending && <CircularProgress size={18} />}

              <IconButton onClick={changeVisibility}>
                {categoria.isPublic ? <Visibility /> : <VisibilityOff />}
              </IconButton>

              <IconButton {...bindTrigger(popupState)}>
                <MoreHoriz />
              </IconButton>
            </Stack>
          </Box>

          {isEditing ? (
            <>
              <TextField
                autoFocus
                margin='dense'
                type='text'
                fullWidth
                value={name}
                onChange={handleChangeName}
                onBlur={updateNameCategory}
                size='small'
                onKeyDown={handleKeyDown}
              />
            </>
          ) : (
            <Typography variant='h6' onClick={editNameCategory}>
              {categoria.name}
            </Typography>
          )}

          <Stack direction='row' justifyContent='end'>
            <Button
              size='small'
              endIcon={<ArrowForward />}
              onClick={() => showProducts()}
            >{`Productos: ${categoria.products.length}`}</Button>
          </Stack>
        </CardContent>
      </Card>
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              width: 170
            }
          }
        }}
      >
        <MenuItem onClick={handleEdit}>
          <EditOutlined fontSize='small' sx={{ mr: 2 }} />
          Editar
        </MenuItem>
        <MenuItem onClick={showProducts}>
          <Visibility fontSize='small' sx={{ mr: 2 }} />
          Ver Productos
        </MenuItem>

        {categoria.isActive ? (
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <DeleteOutlined fontSize='small' sx={{ mr: 2 }} />
            Eliminar
          </MenuItem>
        ) : (
          <MenuItem onClick={enableCategory}>
            <Reply fontSize='small' sx={{ mr: 2 }} />
            Habilitar
          </MenuItem>
        )}
      </Popover>
    </>
  );
};
