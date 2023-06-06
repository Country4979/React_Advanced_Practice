import Button from "../shared/Button"
import { signup } from "./service";

const Signup = () => {
    const handleSubmit = async event => {
        console.log('submit', event)
        event.preventDefault();
        

        const response = await signup(
            {
            email: event.target.usermail.value,
            password:  event.target.password.value,
            usersname: event.target.usersname.value,
            name: event.target.name.value,
            }
        )
        console.log(response);
    }

    return (
        <div className="infoContainer"> 
            <div className="leftSide">
                <h1 className="textCreateUser">Hello new user!</h1>
                <h3>Please fill the fields to access AlaPop and be able to buy and sell your items.</h3>
            </div>
            <div className="rigthSide">
                <form id="createUser" onSubmit={handleSubmit}>
                    <label htmlFor="usermail">Email:</label>
                    <input type="email" name="usermail" id="usermail" required /> <br />

                    
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" minLength="4" required /><br />

                    <label htmlFor="passwordConfirm">Password confirm:</label>
                    <input type="password" name="password-confirm" id="passwordConfirm" minLength="4" required /><br />
                    
                    <label htmlFor="usersname">Username:</label>
                    <input type="text" name="usersname" id="usersname" required /><br />
                    
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name" required /><br />
                    
                    <Button type="submit" variant="primary" className="buttons" id="signupButton">Create user</Button><br />
                </form>
            </div>
        </div>        
    )
}

export default Signup