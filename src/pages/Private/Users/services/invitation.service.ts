import { restauranteApi } from '@/api';
import { InviteUserDto } from '../dto/invite-user.dto';

export const inviteUser = async (inviteUserDto: InviteUserDto) => {
  const resp = await restauranteApi.post<{ token: string }>(
    `restaurant/invite-user`,
    inviteUserDto
  );

  return resp.data;
};
