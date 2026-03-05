import { FC, useState } from 'react';
import { IProduct } from '../../../../../../models';
import { Add } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material';
import { Check, Close } from '@mui/icons-material';
import {
  useAddTagToProduct,
  useRemoveTagFromProduct
} from '../../../hooks/useProducts';

interface Props {
  product: IProduct;
}

export const ProductTags: FC<Props> = ({ product }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [tagName, setTagName] = useState('');
  const [removingTagId, setRemovingTagId] = useState<string | null>(null);

  const { mutateAsync: addTag, isPending: isAddPending } = useAddTagToProduct();
  const { mutateAsync: removeTag } = useRemoveTagFromProduct();

  const handleOpenAdd = () => {
    setTagName('');
    setIsAdding(true);
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setTagName('');
  };

  const handleConfirmAdd = async () => {
    const trimmed = tagName.trim();
    if (trimmed.length < 2) return;

    await addTag({ productId: product.id, name: trimmed }).catch(() => {});
    setIsAdding(false);
    setTagName('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleConfirmAdd();
    if (e.key === 'Escape') handleCancelAdd();
  };

  const handleDelete = async (tagId: string) => {
    setRemovingTagId(tagId);
    await removeTag({ tagId, productId: product.id }).catch(() => {});
    setRemovingTagId(null);
  };

  return (
    <Card>
      <CardHeader
        title='Etiquetas'
        action={
          !isAdding && (
            <Button startIcon={<Add />} onClick={handleOpenAdd}>
              Añadir
            </Button>
          )
        }
      />
      <CardContent>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {product.tags.map((tag) => (
            <Chip
              key={tag.id}
              label={tag.name}
              onDelete={
                removingTagId === tag.id
                  ? undefined
                  : () => handleDelete(tag.id)
              }
              deleteIcon={
                removingTagId === tag.id ? (
                  <CircularProgress size={16} />
                ) : undefined
              }
              disabled={removingTagId === tag.id}
            />
          ))}
        </Box>

        {isAdding && (
          <Box sx={{ mt: product.tags.length > 0 ? 2 : 0 }}>
            <TextField
              autoFocus
              size='small'
              label='Nombre de la etiqueta'
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isAddPending}
              inputProps={{ minLength: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      size='small'
                      onClick={handleConfirmAdd}
                      disabled={tagName.trim().length < 2 || isAddPending}
                      color='success'
                    >
                      {isAddPending ? (
                        <CircularProgress size={16} />
                      ) : (
                        <Check fontSize='small' />
                      )}
                    </IconButton>
                    <IconButton
                      size='small'
                      onClick={handleCancelAdd}
                      disabled={isAddPending}
                    >
                      <Close fontSize='small' />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
