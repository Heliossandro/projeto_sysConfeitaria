export const Login =()=>{
    return(
        <div className="flex flex-col justify-center items-center">
            <div>
                <img src="" alt="" />
            </div>
            <form className="flex flex-col" action="">
                <div className="flex flex-col">
                    <input className="b" type="text"  placeholder="Nome"/>
                    <input type="password" placeholder="Senha"/>
                </div>

                <button>Login</button>
                <a href="">esqueceu a senha</a>
            </form>
        </div>
    )
}