import { useState } from "react"
import { useNavigate } from "react-router-dom"
import logo from "../../assets/image/logo.png"
import bg from "../../assets/image/backgroundRosa.png"
import axios from "axios"

export const Create_Account = () => {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // validações
    const partesNome = nome.trim().split(" ")
    if (partesNome.length < 2) {
      setErro("Digite nome e sobrenome.")
      return
    }

    if (!email.includes("@")) {
      setErro("Digite um email válido.")
      return
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.")
      return
    }
    try{
      const res = await axios.post("http://localhost:5000/users", {
          name: nome, email: email, password: senha,
      })
  
      alert("Conta criada com sucesso!")
      console.log("Resposta do backend: ", res.data)
  
      navigate("/Login")
  
  }catch(err){
      setErro("Erro ao criar conta.")
      console.error(err)
  }
}



  return (
    <div
      className="bg-center bg-cover h-screen w-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Container vidro/água */}
      <div className="flex flex-col justify-center items-center 
                      w-[28rem] p-10 rounded-2xl 
                      bg-black/10 shadow-xl">

        {/* Logo redonda */}
        <div className="rounded-full overflow-hidden w-[12rem] h-[12rem] mb-12">
          <img src={logo} alt="logo" className="w-full h-full object-cover" />
        </div>

        {/* Formulário */}
        <form className="flex flex-col w-full items-center" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 mb-8 w-full">
            <input
              className="border-2 border-white w-full h-[2.5rem] placeholder:text-white px-4 rounded-lg bg-transparent text-amber-50 focus:outline-none"
              type="text"
              placeholder="Nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
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

          {/* Mensagem de erro */}
          {erro && <p className="text-red-500 mb-4">{erro}</p>}

          <button className="bg-white w-full h-[2.5rem] rounded-lg shadow-md">
            Criar conta
          </button>

          <a className="mt-4 text-white text-base hover:underline" href="/login">
            Já tem uma conta? Faça login
          </a>
        </form>
      </div>
    </div>
  )
}
