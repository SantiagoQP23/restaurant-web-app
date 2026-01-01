import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  Box,
  Stack,
  IconButton,
  Alert
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useUploadMenuExcel } from '../../../hooks/useSections';
import { UploadExcelResponseDto } from '../../../dto/upload-excel.dto';

export const ModalUploadExcel = NiceModal.create(() => {
  const modal = useModal();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadResult, setUploadResult] =
    useState<UploadExcelResponseDto | null>(null);

  const closeModal = () => {
    modal.hide();
    setTimeout(() => {
      setSelectedFile(null);
      setUploadResult(null);
      reset();
    }, 200);
  };

  const { register, handleSubmit, reset } = useForm<{ file: FileList }>();

  const uploadMutation = useUploadMenuExcel();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadResult(null);
    }
  };

  async function onSubmit(form: { file: FileList }) {
    if (!selectedFile) {
      return;
    }

    uploadMutation.mutateAsync(selectedFile).then((data) => {
      setUploadResult(data);
    });
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <Dialog {...muiDialogV5(modal)} maxWidth='sm' fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack sx={{ p: 4 }} gap={3}>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='flex-start'
          >
            <Stack gap={1}>
              <Typography variant='h4'>Importar menú desde Excel</Typography>
              <Typography variant='body2' color='text.secondary'>
                Carga un archivo Excel con tu menú completo
              </Typography>
            </Stack>
            <IconButton onClick={closeModal} size='small'>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Box
            sx={{
              border: '2px dashed',
              borderColor: selectedFile ? 'primary.main' : 'divider',
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
              backgroundColor: selectedFile ? 'action.hover' : 'transparent',
              transition: 'all 0.2s'
            }}
          >
            <input
              id='excel-file-input'
              type='file'
              accept='.xlsx,.xls'
              {...register('file')}
              onChange={onFileChange}
              hidden
            />
            <label htmlFor='excel-file-input'>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  cursor: 'pointer'
                }}
              >
                <UploadFileIcon
                  sx={{ fontSize: 48, color: 'text.secondary' }}
                />
                {selectedFile ? (
                  <Stack spacing={0.5}>
                    <Typography variant='body1' fontWeight='medium'>
                      {selectedFile.name}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {formatFileSize(selectedFile.size)}
                    </Typography>
                  </Stack>
                ) : (
                  <Stack spacing={0.5}>
                    <Typography variant='body1'>
                      Haz clic para seleccionar un archivo
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Solo archivos .xlsx o .xls
                    </Typography>
                  </Stack>
                )}
              </Box>
            </label>
          </Box>

          {uploadResult && (
            <Alert severity='success' sx={{ mt: 1 }}>
              <Typography variant='body2' fontWeight='medium' gutterBottom>
                {uploadResult.message}
              </Typography>
              <Stack spacing={0.5} sx={{ mt: 1 }}>
                <Typography variant='caption'>
                  Secciones: {uploadResult.summary.sectionsCreated} creadas,{' '}
                  {uploadResult.summary.sectionsUpdated} actualizadas,{' '}
                  {uploadResult.summary.sectionsSkipped} omitidas
                </Typography>
                <Typography variant='caption'>
                  Categorías: {uploadResult.summary.categoriesCreated} creadas,{' '}
                  {uploadResult.summary.categoriesUpdated} actualizadas,{' '}
                  {uploadResult.summary.categoriesSkipped} omitidas
                </Typography>
                <Typography variant='caption'>
                  Productos: {uploadResult.summary.productsCreated} creados,{' '}
                  {uploadResult.summary.productsUpdated} actualizados,{' '}
                  {uploadResult.summary.productsSkipped} omitidos
                </Typography>
                <Typography variant='caption' sx={{ mt: 0.5 }}>
                  Total: {uploadResult.summary.processedRows} de{' '}
                  {uploadResult.summary.totalRows} filas procesadas
                </Typography>
              </Stack>
            </Alert>
          )}

          <Stack direction='row' justifyContent='end' gap={2}>
            <Button onClick={closeModal} color='inherit'>
              {uploadResult ? 'Cerrar' : 'Cancelar'}
            </Button>
            {!uploadResult && (
              <LoadingButton
                loading={uploadMutation.isPending}
                variant='contained'
                color='primary'
                type='submit'
                disabled={!selectedFile}
                startIcon={<UploadFileIcon />}
              >
                Importar
              </LoadingButton>
            )}
          </Stack>
        </Stack>
      </form>
    </Dialog>
  );
});
