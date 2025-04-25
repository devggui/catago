export enum authStatusEnum {
  authenticated = "authenticated",
  logged_out = "logged_out",
}

export enum authMiddlewareEnum {
  guest = "guest",
  auth = "auth",
}

export type UseAuthProps = {
  middleware?: authMiddlewareEnum
  redirectIfAuthenticated?: string
}

export type GetAuthConfigProps = {
  redirectIfNoToken?: string
}

export type SignUpProps = {
  name: string
  email: string
  password: string
}

export type SignInProps = {
  email: string
  password: string
}

export type ForgotPasswordProps = {
  email: string
}
