import { useState } from "react"
import { useNavigate } from "react-router-dom"
import logo from "../../assets/image/logo.png"
import bg from "../../assets/image/backgroundRosa.png"

export const Login =()=>{
    const [nome, setNome] = useState("")
    const [senha, setSenha] = useState("")
    const [erro, setErro] = useState("")
    const navigate = useNavigate()
    const goCreate_account = ()=> navigate("/Create_account")

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const partesNome = nome.trim().split(" ")
    if (partesNome.length < 2) {
        setErro("Digite dois nomes no mínimo")
        return
    }

    if (senha.length < 6) {
        setErro("Digite uma senha com 6 dígitos.")
        return
    }

    setErro("")
    alert("login feito")
    }

    return(
        <div 
            className="bg-center bg-cover h-screen w-screen flex items-center justify-center"
            style={{ backgroundImage: `url(${bg})` }}
        >
            {/* Container central com efeito vidro/água */}
            <div className="flex flex-col justify-center items-center 
                            w-[28rem] p-10 rounded-2xl 
                            bg-white/5  shadow-xl">
                
                {/* Logo redonda */}
                <div className="rounded-full overflow-hidden w-[12rem] h-[12rem] mb-12">
                    <img src={logo} alt="logo" className="w-full h-full object-cover" />
                </div>

                {/* Formulário */}
                <form className="flex flex-col w-full items-center" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4 mb-8 w-full">
                        <input className="border-2 border-white w-full h-[2.5rem] placeholder:text-white px-4 rounded-lg bg-transparent text-amber-50 focus:outline-none" type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
                        <input className="border-2 border-white w-full h-[2.5rem] placeholder:text-white px-4 rounded-lg bg-transparent text-amber-50 focus:outline-none" type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)}/>
                    </div>

                     {/* Exibir mensagem de erro */}
                    {erro && <p className="text-red-500 mb-4">{erro}</p>}

                    <button className="bg-white w-full h-[2.5rem] rounded-lg shadow-md">
                        Login
                    </button>
                    <a className="mt-4 text-white text-base hover:underline" href="" onClick={goCreate_account}> Criar conta </a>
                    <a className="mt-4 text-white text-base hover:underline" href=""> Esqueceu a senha? </a>
                </form>
            </div>
        </div>
    )
}
