import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { InviteUserRespDto } from '../dto/invite-user-resp.dto';
import { InviteUserDto } from '../dto/invite-user.dto';
import { InvitationService } from '../services/invitation.service';

/**
 * Hook to send user invitation
 * @version 2.0 - Migrated to React Query v5
 */
export const useSendInvitation = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation<InviteUserRespDto, unknown, InviteUserDto>({
    mutationFn: (data: InviteUserDto) => InvitationService.inviteUser(data),
    onSuccess: (data: InviteUserRespDto) => {
      enqueueSnackbar('Invitacion enviada correctament', {
        variant: 'success'
      });
    },
    onError: (error: unknown) => {
      console.error(error);
      enqueueSnackbar('No se pudo enviar la invitacion', {
        variant: 'error'
      });
    }
  });
};
