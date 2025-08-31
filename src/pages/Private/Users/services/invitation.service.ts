import { restauranteApi } from '@/api';
import { InviteUserRespDto } from '../dto/invite-user-resp.dto';
import { InviteUserDto } from '../dto/invite-user.dto';

export class InvitationService {
  static async inviteUser(inviteUserDto: InviteUserDto) {
    const resp = await restauranteApi.post<InviteUserRespDto>(
      `restaurant/invite-user`,
      inviteUserDto
    );

    return resp.data;
  }
}
