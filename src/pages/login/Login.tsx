const Login = () => {
    return (
        <>
            <h1>Login</h1>
            <input type="text" placeholder="Username" />
            <input type="text" placeholder="Password" />
            <button>Signin</button>
            <label htmlFor="remember-me">Remember me</label>
            <input type="checkbox" id="remember-me" />
            <a href="">Forgot password</a>
        </>
    );
};

export default Login;
