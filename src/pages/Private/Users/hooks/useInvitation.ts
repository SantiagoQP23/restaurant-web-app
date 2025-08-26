import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { InviteUserRespDto } from '../dto/invite-user-resp.dto';
import { InviteUserDto } from '../dto/invite-user.dto';
import { InvitationService } from '../services/invitation.service';

export const useSendInvitation = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation<InviteUserRespDto, unknown, InviteUserDto>(
    InvitationService.inviteUser,
    {
      onSuccess: (data) => {
        enqueueSnackbar('Usuario creado correctamente', { variant: 'success' });
      },
      onError: (error) => {
        console.error(error);
        enqueueSnackbar('No se pudo crear el usuario', { variant: 'error' });
      }
    }
  );
};
