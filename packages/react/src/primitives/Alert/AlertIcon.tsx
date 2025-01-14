import * as React from 'react';

import { ComponentClassNames } from '../shared/constants';
import { AlertVariations } from '../types';
import {
  IconInfo,
  IconError,
  IconWarning,
  IconCheckCircle,
  useIcons,
} from '../Icon';

interface AlertIconProps {
  variation?: AlertVariations;
  ariaHidden?: boolean;
}

/**
 * @internal For internal Amplify UI use only. May be removed in a future release.
 */
export const AlertIcon: React.FC<AlertIconProps> = ({
  variation,
  ariaHidden,
}) => {
  const icons = useIcons('alert');
  let icon;
  switch (variation) {
    case 'info':
      icon = icons?.info ?? <IconInfo aria-hidden={ariaHidden} />;
      break;
    case 'error':
      icon = icons?.error ?? <IconError aria-hidden={ariaHidden} />;
      break;
    case 'warning':
      icon = icons?.warning ?? <IconWarning aria-hidden={ariaHidden} />;
      break;
    case 'success':
      icon = icons?.success ?? <IconCheckCircle aria-hidden={ariaHidden} />;
      break;
  }

  return icon ? (
    <span className={ComponentClassNames.AlertIcon}>{icon}</span>
  ) : null;
};

AlertIcon.displayName = 'AlertIcon';
