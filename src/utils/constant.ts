export enum VERIFY_MODE {
  OCR_LIVENESS = 0,
  LIVENESS = 1,
  FaceMatching = 2,
}
export enum DOC_SIDE {
  FRONT = 0,
  BACK = 1,
}

export enum ENUM_STEPS {
  SELECT = 'SELECT',
  DOC_FONT = 'DOC_FONT',
  DOC_BACK = 'DOC_BACK',
  LIVENESS = 'LIVENESS',
  FACEMATCH = 'FACEMATCH',
  RESULT = 'RESULT',
}
