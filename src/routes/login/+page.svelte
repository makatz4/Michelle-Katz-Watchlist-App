<script>
	import '../../app.css';
	import AuthService from '../../utils/authService';

	let username = '';
	let password = '';

	function login() {
		console.log(username);
		console.log(password);
		AuthService.login(username, password);
	}
</script>

<div class="container mx-auto flex flex-col w-3/5 mt-14">
	<div class="flex flex-col w-3/5 mx-auto bg-indigo-50 p-8 border-solid border-neutral-200 rounded-lg shadow">
		<h1 class="text-xl font-bold text-indigo-700">Welcome to Michelle's Watchlist</h1>
		<h2 class="text-lg font-semi-bold text-indigo-600">Please log in to continue</h2>
		<div class="flex flex-col my-1">
		<!-- label and input boxes from daisyui template -->
		<label class="input input-bordered input-md flex items-center gap-2 my-1">
			<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
			fill="currentColor"
			class="h-4 w-4 opacity-70">
			<path
				d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
			</svg>
			<input type="text" class="grow" placeholder="Username" bind:value={username} />
		</label>
		<label class="input input-bordered input-md flex items-center gap-2 my-1">
			<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
			fill="currentColor"
			class="h-4 w-4 opacity-70">
			<path
				fill-rule="evenodd"
				d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
				clip-rule="evenodd" />
			</svg>
			<input type="password" class="grow " bind:value={password} placeholder="Password" />
		</label>
		<button class="btn btn-primary rounded-full w-3/5 my-1 shadow" onclick={login()}>Log in</button>
		</div>
	</div>
</div>
