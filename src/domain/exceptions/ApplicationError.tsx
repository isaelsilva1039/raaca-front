export default class ApplicationError extends Error {
  constructor(public readonly mensagem: string) {
    super(mensagem);
  }
}