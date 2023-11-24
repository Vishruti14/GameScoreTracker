import React, { useState } from 'react'
//import './home.css'
import Register from '../Components/Register'
import Login from '../Components/Login'
import trophy from '../Components/trophy.jpg'
import axios from 'axios'
function Home() {


    return (
        <div id="containerhome">
            <nav class="navbar navbar-expand-lg navbar-light bg-light custom-navbar" >
            <img src={trophy} style={{ height: "30px", width: "40px" }} alt="Trophy" />
            <p style={{ fontSize: "20px",marginTop:"15px"}}>KeepTheScore</p>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                {/* <div className="container"> 
                    <div className="row align-items-center"> 
                        <div className="col-auto">
                        </div>
                        <div className="col">
                        </div>
                    </div>
                </div> */}
               

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item active">
                            <Register />
                        </li> &emsp;
                        <li class="nav-item">
                            <Login />
                        </li>

                    </ul>

                </div>
            </nav>
            <div className="content" >
                <h1> GAME SCORE TRACKER</h1>
                <p>Your ultimate companion for effortlessly recording and managing  <br /> game scores with precision and ease.</p>

            </div>

        </div>
    )
}

export default Home;
