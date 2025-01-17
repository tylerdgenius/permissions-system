import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { constants } from './constants';
import { routes } from './routes';

const getDevelopmentStatus = () => {
  switch (constants.ENVIRONMENT_VARIABLES.NODE_ENV) {
    case 'production':
      return false;
    default:
      return true;
  }
};

const getConfigService = () => {
  return new ConfigService<typeof constants.ENVIRONMENT_VARIABLES>();
};

const getLogger = () => {
  return new Logger();
};

const getCurrentAppVersion = () => {
  return getConfigService().get<number>('APP_VERSION');
};

const getRoutesByAppVersion = () => {
  const appVersion = getCurrentAppVersion();

  const allRoutesConversion: Record<number, 'v1' | 'v2'> = {
    1: 'v1',
  };

  return routes[allRoutesConversion[appVersion]];
};

const getRoute = (extendedRoutes: string[] | string) => {
  let returnedRoute = `${routes.entry}/v1/`; // This runs before the config service is injected so i will have to find a way to still grab the current app version out of my env later

  if (Array.isArray(extendedRoutes)) {
    returnedRoute = `${returnedRoute}${extendedRoutes.join('/')}`;
  }

  if (typeof extendedRoutes === 'string') {
    returnedRoute = `${returnedRoute}${extendedRoutes}`;
  }

  return returnedRoute;
};

export const getters = {
  getDevelopmentStatus,
  getConfigService,
  getLogger,
  getCurrentAppVersion,
  getRoutesByAppVersion,
  getRoute,
};
