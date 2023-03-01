import ILoginResponse from './ILoginResponse';

export default interface ILoginService{

  createLogin(email:string, password:string): Promise<ILoginResponse | null> ;

}
