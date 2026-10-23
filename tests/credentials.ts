function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Falta definir la variable de entorno ${name}. Configúrala en .env.`);
  }
  return value;
}

export function getURLCredentials(){
  return {
   url: requiredEnv('URL'),
}

}

export function getAdminCredentials() {
  return {
    email: requiredEnv('ADMIN_EMAIL'),
    password: requiredEnv('ADMIN_PASSWORD'),
  };
}

export function getCustomerCredentials() {
  return {
    email: requiredEnv('CUSTOMER_EMAIL'),
    password: requiredEnv('CUSTOMER_PASSWORD'),
  };
}

export function getCheckoutAddress() {
  return {
    postalCode: requiredEnv('CODE_POSTAL'),
    number: requiredEnv('NUMBER'),
    street: requiredEnv('STREET'),
    city: requiredEnv('CITY'),
    state: requiredEnv('STATE'),
  };
}

export function getBankTransferDetails() {
  return {
    bankName: requiredEnv('NAME_BANK'),
    accountHolder: requiredEnv('NAME_USER'),
    accountNumber: requiredEnv('NUMBER_ACCOUNT'),
  };
}

export function getCreditCardDetails() {
  return {
    number: requiredEnv('NUMBER_CARD_CREDIT'),
    expirationDate: requiredEnv('EXPIRATION_DATE'),
    cvv: requiredEnv('CVV'),
    cardholder: requiredEnv('NAME_USER'),
  };
}

export function getGiftCardDetails() {
  return {
    number: requiredEnv('NUMBER_GIF_CARD'),
    validationCode: requiredEnv('CODE_VALIDATION'),
  };
}
