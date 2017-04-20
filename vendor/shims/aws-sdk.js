(function() {
  /* global AWS */
  function globalModule() {
    'use strict';

    return {
      // 'default': self['amazon-cognito-identity-js'],
      __esModule: true,
      util: AWS.util
    };
  }

  function cognitoModule() {
    'use strict';

    return {
      'default': AWS.CognitoIdentityServiceProvider
    };
  }

  define('aws-sdk/global', [], globalModule);
  define('aws-sdk/clients/cognitoidentityserviceprovider', [], cognitoModule);
})();
