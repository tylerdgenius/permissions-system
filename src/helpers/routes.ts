export const routes = {
  entry: 'api',
  user: {
    entry: 'user',
    create: 'create',
    login: 'login',
    system: 'system/generate',
  },
  product: {
    entry: 'product',
    create: 'create',
    getAll: 'all',
    getOwned: 'owned',
    getInitiator: 'initiator',
    getSingle: 'single/:id',
  },
  organization: {
    entry: 'organization',
    createDefault: 'create',
  },
  order: {
    entry: 'order',
    create: 'create',
    getAll: 'all',
    getSingle: 'single/:id',
    getOrganization: 'organization/all',
    getOrganizationSingleOrder: 'organization/single/:id',
  },
  permissions: {
    entry: 'permissions',
    createDefault: 'create/defaults',
    getAll: 'all',
    getSingle: 'single/:id',
    getViews: 'views/all',
    add: 'add',
  },
  roles: {
    entry: 'roles',
    create: 'create',
    getAll: 'all',
  },
};
