import { Injectable } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { I18n } from 'aws-amplify/utils';
import { translations } from '@aws-amplify/ui-angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AmplifyConfigService {
  constructor() {
    I18n.putVocabularies(translations);
    I18n.setLanguage('pt');

    I18n.putVocabularies({
      pt: {
        Email: 'Email',
        'Enter your email': 'Digite seu e-mail',
        'Reset Password': 'Redefinir Senha',
      },
    });
  }

  async configure(): Promise<void> {
    Amplify.configure({
      auth: {
        aws_region: environment.awsRegion,
        mfa_methods: [],
        standard_required_attributes: ['email'],
        username_attributes: ['email'],
        user_verification_types: ['email'],
        groups: [],
        mfa_configuration: 'NONE',
        password_policy: {
          min_length: 8,
          require_lowercase: true,
          require_numbers: true,
          require_symbols: true,
          require_uppercase: true,
        },
        unauthenticated_identities_enabled: true,
        ...environment.amplifyConfig,
      },
      version: '1.4',
    });
  }
}

export function initAmplifyFactory(amplifyService: AmplifyConfigService) {
  return () => amplifyService.configure();
}
