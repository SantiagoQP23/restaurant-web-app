import { ChangeEvent, FC, useState, KeyboardEvent } from 'react';

import { useNavigate } from 'react-router-dom';

import { CSS } from '@dnd-kit/utilities';

import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  TextField,
  Stack,
  CircularProgress,
  Button
} from '@mui/material';

import {
  ArrowForward,
  ArrowRight,
  DragIndicator,
  MoreHorizOutlined,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { ISection } from '../../../../../../models';

import {
  setActiveCategories,
  setActiveCategory,
  setActiveProducts,
  setActiveSection
} from '../../../../../../redux';
import { useDispatch } from 'react-redux';
import { Label } from '../../../../../../components/ui';
import { useSnackbar } from 'notistack';
import { useFetchAndLoad } from '../../../../../../hooks/useFetchAndLoad';
import { useUpdateSection } from '../../../hooks/useSections';
import { useSortable } from '@dnd-kit/sortable';

interface Props {
  seccion: ISection;
  handleOpenMenu: (event: any, seccion: ISection) => void;
  draggable?: boolean;
}

export const Section: FC<Props> = ({ seccion, handleOpenMenu, draggable }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: seccion.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const [name, setName] = useState(seccion.name);

  const { enqueueSnackbar } = useSnackbar();

  const { loading, callEndpoint } = useFetchAndLoad();

  const updateSectionMutation = useUpdateSection();

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const editarCategorias = () => {
    dispatch(setActiveSection(seccion));
    navigate(`${seccion.name.toLowerCase()}`);
  };

  const editNameSection = () => {
    setIsEditing(true);
  };

  const editarSeccion = () => {
    dispatch(setActiveSection(seccion));

    dispatch(setActiveCategories(seccion!.categories));

    if (seccion!.categories.length > 0) {
      dispatch(setActiveCategory(seccion!.categories[0]));

      dispatch(setActiveProducts(seccion!.categories[0].products));
    } else {
      dispatch(setActiveProducts([]));
    }

    navigate(`seccion`);
  };

  const updateNameSection = async () => {
    setIsEditing(false);
    if (name === seccion.name || name === '') return;

    await updateSectionMutation
      .mutateAsync({ name, id: seccion.id })
      .then((section) => {
        dispatch(setActiveSection(section));
      });
  };

  const toggleVisibility = async () => {
    await updateSectionMutation.mutateAsync({
      id: seccion.id,
      isPublic: !seccion.isPublic
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // Enter key is pressed, execute your update logic
      updateNameSection();
    }
  };

  const showCategories = () => {
    navigate(`/menu/categories`);
    setActiveSection(seccion);
  };

  return (
    <>
      <div ref={setNodeRef} style={style} {...attributes}>
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
              <Label color={seccion.isActive ? 'success' : 'error'}>
                {seccion.isActive ? 'Activo' : 'Eliminado'}
              </Label>
              <Stack direction='row' spacing={2} alignItems='center'>
                {updateSectionMutation.isPending && (
                  <CircularProgress size={18} />
                )}
                {draggable ? (
                  <>
                    <IconButton {...listeners}>
                      <DragIndicator />
                    </IconButton>
                  </>
                ) : (
                  <>
                    {/* // <IconButton onClick={toggleVisibility}> */}
                    {/* //   {seccion.isPublic ? <Visibility /> : <VisibilityOff />} */}
                    {/* // </IconButton> */}
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenMenu(e, seccion);
                      }}
                    >
                      <MoreHorizOutlined />
                    </IconButton>
                  </>
                )}
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
                  onBlur={updateNameSection}
                  size='small'
                  onKeyDown={handleKeyDown}
                />
              </>
            ) : (
              <Typography variant='h6' onClick={editNameSection}>
                {seccion.name}
              </Typography>
            )}
            <Stack direction='row' justifyContent='end'>
              <Button
                size='small'
                endIcon={<ArrowForward />}
                onClick={() => showCategories()}
              >{`Categorías: ${seccion.categories.length}`}</Button>
            </Stack>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
