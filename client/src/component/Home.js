import React from "react";
import { Header } from "./Header";
import { Trending } from "./Trending";
import './Home.css';
import { Artists } from "./Artists";

export function Home() {
    return (
        <div className="elementStyle">
            {/* <Header /> */}
            <Trending  />
            <Artists  />
        </div>

    );
}