import { FC, useState, KeyboardEvent } from 'react';
import { ProductionArea } from '../../Common/models/production-area.model';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  ListItemIcon,
  MenuItem,
  Popover,
  Card,
  CardContent
} from '@mui/material';
import {
  Close,
  DeleteOutlined,
  DonutSmall,
  DonutSmallOutlined,
  EditOutlined,
  MoreVert,
  Reply
} from '@mui/icons-material';
import { useUpdateProductionArea } from '../hooks/useProductionArea';
import { UpdateProductionAreaDto } from '../dto/update-production-area.dto';
import {
  bindPopover,
  bindTrigger,
  usePopupState
} from 'material-ui-popup-state/hooks';

interface Props {
  area: ProductionArea;
}

export const ProductionAreaItem: FC<Props> = ({ area }) => {
  const [name, setName] = useState(area.name);
  const { mutateAsync } = useUpdateProductionArea();

  const [isEditing, setIsEditing] = useState(false);

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'areaMenu'
  });

  const submitUpdateArea = async (productionArea: UpdateProductionAreaDto) => {
    await mutateAsync({ id: area.id, productionArea });
  };

  const handleEdit = () => {
    setIsEditing(true);
    popupState.close();
  };

  const handleChangeStatus = () => {
    popupState.close();
    submitUpdateArea({
      isActive: !area.isActive
    });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // Enter key is pressed, execute your update logic
      updateNameArea();
    }
  };

  const updateNameArea = async () => {
    toggleEdit();
    if (name !== area.name) {
      await submitUpdateArea({
        name
      });
    }
  };

  return (
    <Card sx={{ p: 2 }} variant='outlined'>
      <ListItem
        secondaryAction={
          <>
            {!isEditing ? (
              <IconButton {...bindTrigger(popupState)}>
                <MoreVert />
              </IconButton>
            ) : (
              <IconButton onClick={toggleEdit}>
                <Close />
              </IconButton>
            )}
          </>
        }
      >
        <ListItemIcon>
          <DonutSmallOutlined />
        </ListItemIcon>

        {isEditing ? (
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            size='small'
            onKeyDown={handleKeyDown}
            onBlur={updateNameArea}
          />
        ) : (
          <ListItemText
            primary={name}
            secondary={area.description}
            primaryTypographyProps={{
              variant: 'subtitle1',
              color: area.isActive ? 'text.primary' : 'text.disabled'
            }}
          />
        )}

        <Popover
          {...bindPopover(popupState)}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          slotProps={{
            paper: {
              sx: {
                width: 170,
                p: 1
              }
            }
          }}
        >
          <MenuItem onClick={handleEdit}>
            <EditOutlined fontSize='small' sx={{ mr: 2 }} />
            Renombrar
          </MenuItem>

          {area.isActive ? (
            <MenuItem sx={{ color: 'error.main' }} onClick={handleChangeStatus}>
              <DeleteOutlined fontSize='small' sx={{ mr: 2 }} />
              Desactivar
            </MenuItem>
          ) : (
            <MenuItem onClick={handleChangeStatus}>
              <Reply fontSize='small' sx={{ mr: 2 }} />
              Habilitar
            </MenuItem>
          )}
        </Popover>
      </ListItem>
    </Card>
  );
};
