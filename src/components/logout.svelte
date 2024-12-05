<script>
    import ApiService from "../util/api-service";
    import Cookies from 'js-cookie';

    let apiService = new ApiService();

    function logout() {
        apiService.logoutUser().then(res => {
            Cookies.remove('session');
            window.location.href = "/";
        }).catch(error => {
            console.log(error);
        })
    }
</script>

<button class="btn btn-outline btn-ghost btn-sm w-20 absolute top-3 right-5" onclick={logout}>Log out</button>