export const firebaseErrorsEn = {
  'auth/app-not-authorized':
    "This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.",
  'auth/credential-already-in-use':
    'This credential is already associated with a different user account.',
  'auth/custom-token-mismatch': 'The custom token corresponds to a different audience.',
  'auth/requires-recent-login':
    'This operation is sensitive and requires recent authentication. Log in again before retrying this request.',
  'auth/dynamic-link-not-activated':
    'Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.',
  'auth/email-change-needs-verification': 'Multi-factor users must always have a verified email.',
  'auth/email-already-in-use': 'The email address is already in use by another account.',
  'auth/expired-action-code': 'The action code has expired. ',
  'auth/cancelled-popup-request':
    'This operation has been cancelled due to another conflicting popup being opened.',
  'auth/internal-error': 'An internal error has occurred.',
  'auth/invalid-app-credential':
    'The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.',
  'auth/invalid-app-id': 'The mobile app identifier is not registed for the current project.',
  'auth/invalid-user-token':
    "This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.",
  'auth/invalid-auth-event': 'An internal error has occurred.',
  'auth/invalid-verification-code':
    'The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure use the verification code provided by the user.',
  'auth/invalid-continue-uri': 'The continue URL provided in the request is invalid.',
  'auth/invalid-cordova-configuration':
    'The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.',
  'auth/invalid-custom-token':
    'The custom token format is incorrect. Please check the documentation.',
  'auth/invalid-dynamic-link-domain':
    'The provided dynamic link domain is not configured or authorized for the current project.',
  'auth/invalid-email': 'The email address is badly formatted.',
  'auth/invalid-api-key': 'Your API key is invalid, please check you have copied it correctly.',
  'auth/invalid-cert-hash': 'The SHA-1 certificate hash provided is invalid.',
  'auth/invalid-credential': 'The supplied auth credential is malformed or has expired.',
  'auth/invalid-message-payload':
    'The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.',
  'auth/invalid-multi-factor-session':
    'The request does not contain a valid proof of first factor successful sign-in.',
  'auth/invalid-oauth-provider':
    'EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.',
  'auth/invalid-oauth-client-id':
    'The OAuth client ID provided is either invalid or does not match the specified API key.',
  'auth/unauthorized-domain':
    'This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.',
  'auth/invalid-action-code':
    'The action code is invalid. This can happen if the code is malformed, expired, or has already been used.',
  'auth/wrong-password': 'The password is invalid.',
  'auth/invalid-persistence-type':
    'The specified persistence type is invalid. It can only be local, session or none.',
  'auth/invalid-phone-number':
    'The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].',
  'auth/invalid-provider-id': 'The specified provider ID is invalid.',
  'auth/invalid-recipient-email':
    'The email corresponding to this action failed to send as the provided recipient email address is invalid.',
  'auth/invalid-sender':
    'The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.',
  'auth/invalid-verification-id':
    'The verification ID used to create the phone auth credential is invalid.',
  'auth/invalid-tenant-id': "The Auth instance's tenant ID is invalid.",
  'auth/multi-factor-info-not-found':
    'The user does not have a second factor matching the identifier provided.',
  'auth/multi-factor-auth-required':
    'Proof of ownership of a second factor is required to complete sign-in.',
  'auth/missing-android-pkg-name':
    'An Android Package Name must be provided if the Android App is required to be installed.',
  'auth/auth-domain-config-required':
    'Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.',
  'auth/missing-app-credential':
    'The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.',
  'auth/missing-verification-code':
    'The phone auth credential was created with an empty SMS verification code.',
  'auth/missing-continue-uri': 'A continue URL must be provided in the request.',
  'auth/missing-iframe-start': 'An internal error has occurred.',
  'auth/missing-ios-bundle-id': 'An iOS Bundle ID must be provided if an App Store ID is provided.',
  'auth/missing-multi-factor-info': 'No second factor identifier is provided.',
  'auth/missing-multi-factor-session':
    'The request is missing proof of first factor successful sign-in.',
  'auth/missing-or-invalid-nonce':
    'The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.',
  'auth/missing-phone-number':
    'To send verification codes, provide a phone number for the recipient.',
  'auth/missing-verification-id':
    'The phone auth credential was created with an empty verification ID.',
  'auth/app-deleted': 'This instance of FirebaseApp has been deleted.',
  'auth/account-exists-with-different-credential':
    'An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.',
  'auth/network-request-failed':
    'A network error (such as timeout, interrupted connection or unreachable host) has occurred.',
  'auth/no-auth-event': 'An internal error has occurred.',
  'auth/no-such-provider': 'User was not linked to an account with the given provider.',
  'auth/null-user':
    'A null user object was provided as the argument for an operation which requires a non-null user object.',
  'auth/operation-not-allowed':
    'The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.',
  'auth/operation-not-supported-in-this-environment':
    'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',
  'auth/popup-blocked':
    'Unable to establish a connection with the popup. It may have been blocked by the browser.',
  'auth/popup-closed-by-user':
    'The popup has been closed by the user before finalizing the operation.',
  'auth/provider-already-linked': 'User can only be linked to one identity for the given provider.',
  'auth/quota-exceeded': "The project's quota for this operation has been exceeded.",
  'auth/redirect-cancelled-by-user':
    'The redirect operation has been cancelled by the user before finalizing.',
  'auth/redirect-operation-pending': 'A redirect sign-in operation is already pending.',
  'auth/rejected-credential': 'The request contains malformed or mismatching credentials.',
  'auth/second-factor-already-in-use': 'The second factor is already enrolled on this account.',
  'auth/maximum-second-factor-count-exceeded':
    'The maximum allowed number of second factors on a user has been exceeded.',
  'auth/tenant-id-mismatch': "The provided tenant ID does not match the Auth instance's tenant ID",
  'auth/timeout': 'The operation has timed out.',
  'auth/user-token-expired':
    "The user's credential is no longer valid. The user must sign in again.",
  'auth/too-many-requests':
    'We have blocked all requests from this device due to unusual activity. Try again later.',
  'auth/unauthorized-continue-uri':
    'The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.',
  'auth/unsupported-first-factor':
    'Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.',
  'auth/unsupported-persistence-type':
    'The current environment does not support the specified persistence type.',
  'auth/unsupported-tenant-operation': 'This operation is not supported in a multi-tenant context.',
  'auth/unverified-email': 'The operation requires a verified email.',
  'auth/user-cancelled': 'The user did not grant your application the permissions it requested.',
  'auth/user-not-found':
    'There is no user record corresponding to this identifier. The user may have been deleted.',
  'auth/user-disabled': 'The user account has been disabled by an administrator.',
  'auth/user-mismatch':
    'The supplied credentials do not correspond to the previously signed in user.',
  'auth/user-signed-out': '',
  'auth/weak-password': 'The password must be 6 characters long or more.',
  'auth/web-storage-unsupported':
    'This browser is not supported or 3rd party cookies and data may be disabled.',
};
