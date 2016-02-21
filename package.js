Package.describe({
  name: 'ivansglazunov:history',
  version: '0.0.0',
  summary: 'History for logging.',
  git: 'https://github.com/ivansglazunov/meteor-history.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  api.use('ecmascript');
  api.use('mongo');
  api.use('accounts-base');
  
  api.use('stevezhu:lodash@4.3.0');
  
  api.use('ivansglazunov:refs@0.1.0');
  api.use('aldeed:collection2@2.8.0');
  
  api.addFiles('history.js');
  
  api.export('History');
});
