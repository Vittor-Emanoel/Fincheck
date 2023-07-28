import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useLoginController } from "./useLoginController";

export function Login() {
  const { handleSubmit, register, errors } = useLoginController();

  return (
    <>
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-gray-900 text-2xl font-bold tracking-[-1px]">
          Entre em sua conta
        </h1>

        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px] leading-6 ">
            Novo por aqui?
          </span>
          <Link
            to="/register"
            className="text-teal-900 font-medium tracking-[-0.5px]"
          >
            Crie uma conta
          </Link>
        </p>
      </header>

      <form onSubmit={handleSubmit} className="mt-[60px] flex flex-col gap-4">
        <Input
          type="email"
          placeholder="E-mail"
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          type="password"
          placeholder="Senha"
          {...register("password")}
          error={errors.password?.message}
        />

        <Button type="submit" className="mt-2 bg-teal-900 ">
          Entrar
        </Button>
      </form>
    </>
  );
}
