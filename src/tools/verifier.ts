export function verifyUserData(password: string, name: string, email: string): boolean {
  const isNameOk = /^[a-zA-Z ]+$/.test(name);
  const isPassOk = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);
  const isEmailOk = /\S+@\S+\.\S+/.test(email);
  return (isEmailOk && isNameOk && isPassOk);
}
