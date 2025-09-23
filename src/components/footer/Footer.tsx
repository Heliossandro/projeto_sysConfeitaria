import { useNavigate } from "react-router-dom";
import logo from "../../assets/image/logo.png"

export const Footer = () =>{
    const navigate = useNavigate();

    const goHome = () =>{
        navigate("/home")    
    }
    return (
        <footer className="bg-[#ffcde0] py-12 px-8 flex flex-col md:flex-row md:justify-between md:items-start gap-8">
        {/* Redes sociais */}
        <div>
            <h1 className="text-[#e29db7] font-bold text-xl mb-2">Redes sociais</h1>
            <ul>
            <li className="py-1">
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#e29db7] text-lg hover:underline">
                Facebook
                </a>
            </li>
            <li className="py-1">
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#e29db7] text-lg hover:underline">
                WhatsApp
                </a>
            </li>
            <li className="py-1">
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#e29db7] text-lg hover:underline">
                Instagram
                </a>
            </li>
            </ul>
        </div>

        {/* Contactos */}
        <div>
            <h1 className="text-[#e29db7] font-bold text-xl mb-2">Contactos</h1>
            <ul>
            <li className="py-1 text-[#e29db7] text-lg">940123508</li>
            <li className="py-1 text-[#e29db7] text-lg">zenosama892@gmail.com</li>
            </ul>
        </div>

        {/* Sobre */}
        <div>
            <h1 className="text-[#e29db7] font-bold text-xl mb-2">Sobre</h1>
            <a href="./config" className="text-[#e29db7] text-lg hover:underline">
            Configuração
            </a>
        </div>

        <div className="rounded-full overflow-hidden w-[6rem] h-[6rem]">
            <img src={logo} alt="logo" className="w-full h-full object-cover cursor-pointer" onClick={goHome} />
        </div>
        </footer>
    )
}