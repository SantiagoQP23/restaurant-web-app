import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { InviteUserRespDto } from '../dto/invite-user-resp.dto';
import { InviteUserDto } from '../dto/invite-user.dto';
import { InvitationService } from '../services/invitation.service';
import { queryKeys } from '@/api/query-keys';

/**
 * Hook to send user invitation
 * @version 2.0 - Migrated to React Query v5
 */
export const useSendInvitation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation<InviteUserRespDto, unknown, InviteUserDto>({
    mutationFn: (data: InviteUserDto) => InvitationService.inviteUser(data),
    onSuccess: (data: InviteUserRespDto) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
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
