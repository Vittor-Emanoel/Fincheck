import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export function Register() {
  return (
    <div>
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-gray-900 text-2xl font-bold tracking-[-1px]">
          Crie sua conta
        </h1>

        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px] leading-6 ">
            Já possui uma conta?
          </span>
          <Link
            to="/register"
            className="text-teal-900 font-medium tracking-[-0.5px]"
          >
            Fazer Login
          </Link>
        </p>
      </header>

      <form className="mt-[60px] flex flex-col gap-4">
        <Input type="email" placeholder="Nome" name="Name" />
        <Input type="email" placeholder="E-mail" name="email" />
        <Input type="password" placeholder="Senha" name="password" />

        <Button type="submit" className="mt-2 bg-teal-900">
          Entrar
        </Button>
      </form>
    </div>
  );
}
