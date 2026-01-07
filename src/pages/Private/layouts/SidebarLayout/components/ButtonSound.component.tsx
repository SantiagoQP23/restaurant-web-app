import { VolumeUp, VolumeOff } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useNotificationSound } from '../../../../../hooks';

/**
 * Sound toggle button component for the header
 * Allows users to mute/unmute notification sounds
 * @version 1.0 2026-01-07
 */
export const ButtonSound = () => {
  const { isMuted, toggleMute } = useNotificationSound(0.5);

  return (
    <Tooltip
      title={
        isMuted
          ? 'Activar sonido de notificaciones'
          : 'Silenciar notificaciones'
      }
    >
      <IconButton onClick={toggleMute} size='small'>
        {isMuted ? (
          <VolumeOff fontSize='small' />
        ) : (
          <VolumeUp fontSize='small' />
        )}
      </IconButton>
    </Tooltip>
  );
};
