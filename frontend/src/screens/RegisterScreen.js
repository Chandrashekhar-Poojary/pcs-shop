/* eslint-disable no-empty */
/* eslint-disable no-alert */

import { register } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, redirectUser, showLoading, showMessage } from "../utils";

/* eslint-disable arrow-body-style */
const RegisterScreen = {
    after_render: () =>{
        document.getElementById("register-form")
        .addEventListener("submit", async(e) =>{
            e.preventDefault();
            showLoading();
            const data = await register({
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                password: document.getElementById('password').value,
            }); 
            hideLoading();

            if(data.error){
                showMessage(data.error); // show validation message from the util.js
                document.getElementById("email").value = "";
                document.getElementById('password').value="";
            }else{
                setUserInfo(data);
                redirectUser();
            }

        });
    },
    render: () =>{
        if(getUserInfo().name){
            redirectUser();
        }
        return `
            <div class="form-container">
                <form id="register-form">
                    <ul class="form-items">
                        <li>
                            <h1>Create Account</h1>
                        </li>
                        <li>
                            <label for="name">Name</label>
                            <input type="text" name="name" id="name"placeholder="Enter Your Name"/>
                        </li>
                        <li>
                            <label for="email">Email</label>
                            <input type="email" name="email" id="email"placeholder="Enter Your Email"/>
                        </li>
                        <li>
                            <label for="password">Password</label>
                            <input type="password" name="password" id="password" placeholder="Enter Your Password"/>
                        </li>
                        <li>
                            <label for="repassword">Re-Enter Password</label>
                            <input type="password" name="repassword" id="repassword" placeholder="Re-Enter Your Password"/>
                        </li>
                        <li>
                            <button type="submit" class="primary">Register</button>
                        </li>
                        <li>
                            <div>
                                Already have an account?
                                <a href="/#/signin">Sign-In</a>
                            </div>
                        </li>
                    </ul>
                </form>
            </div>
        `;
    },
};
export default RegisterScreen;