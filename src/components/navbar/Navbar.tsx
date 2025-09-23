import carrinho from "../../assets/image/carrinho.png"

export const NavBar = () =>{
    return(
        <div className="flex mr-10 cursor-pointer gap-6 ">
            <ul className="flex gap-8 ">
                <li className="hover:text-[#ffffff81] text-xl"><a href="/home">Home</a></li>
                <li className="hover:text-[#ffffff81] text-xl"><a href="/shop">Loja</a></li>
            </ul>
            <img src={carrinho} alt="carrinho" className="w-[1.8rem] l-[1.8rem]" />
        </div>
    )
}