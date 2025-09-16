import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import logo from "../../assets/image/logo.png"
import bg from "../../assets/image/backgroundRosa.png"

export const Login = () => {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email.includes("@")) {
      setErro("Digite um email válido")
      return
    }

    if (senha.length < 6) {
      setErro("Senha deve ter pelo menos 6 dígitos.")
      return
    }

    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password: senha,
      })

      // salvar token no localStorage
      localStorage.setItem("token", res.data.token)

      console.log("Usuário logado:", res.data.user)

      navigate("/Home")
    } catch (err: any) {
      setErro(err.response?.data?.error || "Erro no login")
    }
  }

  return (
    <div
      className="bg-center bg-cover h-screen w-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="flex flex-col justify-center items-center 
                      w-[28rem] p-10 rounded-2xl 
                      bg-black/10 shadow-xl">
        
        <div className="rounded-full overflow-hidden w-[12rem] h-[12rem] mb-12">
          <img src={logo} alt="logo" className="w-full h-full object-cover" />
        </div>

        <form className="flex flex-col w-full items-center" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 mb-8 w-full">
            <input
              className="border-2 border-white w-full h-[2.5rem] placeholder:text-white px-4 rounded-lg bg-transparent text-amber-50 focus:outline-none"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="border-2 border-white w-full h-[2.5rem] placeholder:text-white px-4 rounded-lg bg-transparent text-amber-50 focus:outline-none"
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          {erro && <p className="text-red-500 mb-4">{erro}</p>}

          <button className="bg-white w-full h-[2.5rem] rounded-lg shadow-md">
            Login
          </button>

          <a className="mt-4 text-white text-base hover:underline" href="/create-account">
            Criar conta
          </a>
        </form>
      </div>
    </div>
  )
}
