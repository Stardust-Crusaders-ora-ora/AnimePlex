import React, { useState } from "react";
import { ReactComponent as Logo } from "../../icons/logo.svg";
export const Navbar = () => {
	const [userName, setUserName] = useState("Otaku");
	return (
		<nav className="relative bg-gray-900 shadow-md py-4 px-6 md:px-10 text-sm md:text-base mb-2 overflow-x-hidden flex items-center">
			<div className="w-36 md:w-52  md:ml-1 ">
				<Logo />
			</div>

			<div
				id="links"
				className="relative ml-auto gap-7 md:gap-10 flex text-sm md:text-base"
			>
				<p>Hello, {userName}!</p>
				<div className="flex gap-2">
					{/* <Link to="/search">Search</Link> */}
					<a href="#">Sign In</a>
				</div>
				<div id="log-out" className="flex gap-2 hidden">
					<a href="#">Logout</a>
				</div>
			</div>
		</nav>
	);
};
