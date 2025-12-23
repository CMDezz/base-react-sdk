export enum SDK_ERROR_TYPES {
  INITIALIZE = 'INITIALIZE',
  AUTH = 'AUTH',
  PERMISSION = 'PERMISSION',
  NETWORKING = 'NETWORKING',
  UNKNOWN = 'UNKNOWN',
}
export enum SDK_ERROR_MESSAGES {
  INVALID_CONFIG = 'INVALID CONFIGS, PLEASE CHECK CONFIGS',
  NOT_INITIALIZED = 'PLEASE INITIALIZE THE SDK FIRST',
  MISSING_API_KEY = 'MISSING API KEY, PLEASE CHECK AGAIN',
  MISSING_TARGET = 'MISSING TARGET FRAMEWORK, PLEASE CHECK AGAIN',
  INVALID_API_KEY = 'IVVALID API KEY, PLEASE CHECK AGAIN',
  MISSING_CONTAINER = 'MISSING CONTAINER ZONE, PLEASE CHECK AGAIN',
}

export class SDKError extends Error {
  readonly type: SDK_ERROR_TYPES;
  readonly recoverable: boolean;

  constructor(
    message: string,
    type: SDK_ERROR_TYPES = SDK_ERROR_TYPES.UNKNOWN,
    recoverable: boolean = false
  ) {
    super(message);
    this.type = type;
    this.recoverable = recoverable;

    Object.setPrototypeOf(this, SDKError.prototype);
  }
}

export class InitializeError extends SDKError {
  constructor(message: string, recoverable: boolean = false) {
    super(message, SDK_ERROR_TYPES.INITIALIZE, recoverable);
    Object.setPrototypeOf(this, InitializeError.prototype);
  }
}
