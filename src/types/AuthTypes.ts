// StepperProps
export type StepperProps = {
  step: Step;
  setStep: (step: Step) => void;
  currentStep: Step;
};

// Register Modal

export type Step = 0 | 1 | 2 | 3;

export interface RegistrationData {
  email: string;
  tempUserId: string;
  userId: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  verificationCode: string;
}

// Step0Email
export interface Step0EmailProps {
  onSuccess: (tempUserId: string, email: string) => void;
}

export interface StartRegistrationResponse {
  tempUserId: string;
  email: string;
}

// Step1Verification

export interface Step1VerificationProps {
  email: string;
  tempUserId: string;
  onSuccess: (userId: string) => void;
  goBack: () => void;
}

export interface VerifyEmailResponse {
  message: string;
  userId: string;
}
// Step2Password

export interface Step2PasswordProps {
  userId: string;
  onSuccess: () => void;
  goBack: () => void;
}

export interface Step2PasswordValues {
  phoneNumber: string;
  password: string;
}
// Step3Login
export interface Step3LoginProps {
  onSuccess: () => void;
}

export interface LoginValues {
  email: string;
  password: string;
}
