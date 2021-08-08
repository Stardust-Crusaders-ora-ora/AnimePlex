import React, { Fragment, useRef, useState } from "react";
import { ReactComponent as Logo } from "../../icons/logo.svg";
import { Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";

export const Navbar = (props) => {
	const [userName, setUserName] = useState("Otaku");
	let [isOpen, setIsOpen] = useState(false);
	let [isError, setIsError] = useState(false);
	let [isLogged, setIsLogged] = useState(false);
	const [regModal, setRegModal] = useState(false);
	let completeButtonRefr = useRef(null);
	let completeButtonRefl = useRef(null);
	async function closeModal() {
		let username = document.getElementById("username").value;
		let password = document.getElementById("password").value;

		let res = await fetch("http://localhost:8000/login", {
			method: "POST",
			body: JSON.stringify({
				username: username,
				password: password,
			}),
			headers: {
				"content-type": "application/json",
			},
		});
		let data1 = await res.json();
		console.log(data1);
		if (data1.error) {
			setIsError(true);
		} else {
			localStorage.setItem("username", username);
			setUserName(username);
			setIsLogged(true);
			props.onLog(true);
			setIsOpen(false);
		}
	}

	function openModal() {
		setIsOpen(true);
	}
	function openRegModal() {
		setRegModal(true);
	}
	async function closeRegModal() {
		let username = document.getElementById("username1").value;
		let password = document.getElementById("password1").value;
		let email = document.getElementById("email1").value;

		let res = await fetch("http://localhost:8000/register", {
			method: "POST",
			body: JSON.stringify({
				username: username,
				password: password,
				email: email,
			}),
			headers: {
				"content-type": "application/json",
			},
		});
		let data1 = await res.json();

		if (data1.error) {
			setIsError(true);
			setIsLogged(true);
		} else {
			localStorage.setItem("username", data1.username);
			setUserName(data1.username);
			setIsOpen(false);
			setRegModal(false);
		}
	}
	return (
		<>
			<nav className="relative bg-gray-900 shadow-md py-4 px-6 md:px-10 text-sm md:text-base mb-2 overflow-x-hidden flex items-center">
				<div className="w-36 md:w-52  md:ml-1 ">
					<Link to="/">
						<Logo />
					</Link>
				</div>
				{isLogged && (
					<a href="#down">
						<button className="mt-2 bg-blue-300 rounded-full p-2 text-black hover:bg-blue-500">
							Show Recommendations
						</button>
					</a>
				)}
				<div
					id="links"
					className="relative ml-auto gap-7 md:gap-10 flex text-sm md:text-base"
				>
					{isLogged && <p>Hello, {userName}!</p>}
					{!isLogged && (
						<div className="flex gap-2">
							<button
								type="button"
								onClick={openModal}
								className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
							>
								Login
							</button>
						</div>
					)}
					{!isLogged && (
						<div className="flex gap-2">
							<button
								type="button"
								onClick={openRegModal}
								className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
							>
								Register
							</button>
						</div>
					)}
					<div id="log-out" className="flex gap-2 hidden">
						<a href="#">Logout</a>
					</div>
				</div>
			</nav>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-10 overflow-y-auto "
					onClose={closeModal}
					initialFocus={completeButtonRefl}
				>
					<div className="min-h-screen px-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-70"
							leave="ease-in duration-200"
							leaveFrom="opacity-70"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0 bg-black opacity-70" />
						</Transition.Child>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className="inline-block h-screen align-middle"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
								<Dialog.Title
									as="h3"
									className="text-lg font-medium leading-6 text-gray-900"
								>
									Login
								</Dialog.Title>
								<div className="mt-2">
									<p className="text-sm text-gray-500">MAL username:</p>
									<input
										type="text"
										id="username"
										className="border-2 border-blue-200 focus:outline-none"
									/>
									<p className="text-sm text-gray-500">Password:</p>
									<input
										type="password"
										id="password"
										className="border-2 border-blue-200 focus:outline-none"
									/>
								</div>

								<div className="mt-4">
									<button
										type="button"
										className=" inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
										onClick={closeModal}
										initialFocus={completeButtonRefl}
									>
										LOGIN
									</button>
									<button
										type="button"
										className=" inline-flex ml-10 justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
										onClick={() => {
											setIsOpen(false);
										}}
									>
										Cancel
									</button>
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
			<Transition appear show={regModal} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-10 overflow-y-auto "
					onClose={closeRegModal}
					initialFocus={completeButtonRefr}
				>
					<div className="min-h-screen px-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-70"
							leave="ease-in duration-200"
							leaveFrom="opacity-70"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0 bg-black opacity-70" />
						</Transition.Child>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className="inline-block h-screen align-middle"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
								<Dialog.Title
									as="h3"
									className="text-lg font-medium leading-6 text-gray-900"
								>
									Register
								</Dialog.Title>
								<div className="mt-2">
									<p className="text-sm text-gray-500">Email:</p>
									<input
										type="text"
										id="email1"
										className="border-2 border-blue-200 focus:outline-none"
									/>
									<p className="text-sm text-gray-500">MAL username:</p>
									<input
										type="text"
										id="username1"
										className="border-2 border-blue-200 focus:outline-none"
									/>
									<p className="text-sm text-gray-500">Password:</p>
									<input
										type="password"
										id="password1"
										className="border-2 border-blue-200 focus:outline-none"
									/>
								</div>

								<div className="mt-4">
									<button
										type="button"
										className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
										onClick={closeRegModal}
										initialFocus={completeButtonRefr}
									>
										Register
									</button>
									<button
										type="button"
										className=" inline-flex ml-10 justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
										onClick={() => {
											setRegModal(false);
										}}
									>
										Cancel
									</button>
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};
