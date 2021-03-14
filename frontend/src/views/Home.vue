<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->


    <section class="home app-main">


    <h1>Home sweet home</h1>
        <section v-if="loggedinUser">
            <!-- Hello Master {{loggedinUser.fullname}} -->
            <button @click="logout">Logout</button>
        </section>
        <section v-else>
            <hr />
            <form   @submit.prevent="login">
                <h2>Login</h2>
                <input type="text" placeholder="Your username" v-model="credentials.username" />
                <input type="password" v-model="credentials.password" />
                <button>Login</button>
            </form>
            <hr />
            <form   @submit.prevent="signup">
                <h2>Signup</h2>
                <input type="text" placeholder="Your fullname" v-model="signupCredentials.fullname" />
                <input type="text" placeholder="Your username" v-model="signupCredentials.username" />
                <input type="password" placeholder="Password" v-model="signupCredentials.password" />
                <button>Login</button>
            </form>

        </section>
    </section>

    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',

      
     data() {
        return {
             loggedinUser : false,
             //loggedinUser : userService.getLoggedinUser(),
             credentials: {username: 'puki', password: 'secret'},
             signupCredentials: {username: '', password: '', fullname: ''}
        }
    },
    methods: {
        // login() {
        //     userService.login(this.credentials)
        //         .then(user => this.loggedinUser = user)
        // },
        // signup() {
        //     userService.signup(this.signupCredentials)
        //         .then(user => this.loggedinUser = user)
        // },
        // logout() {
        //     userService.logout()
        //         .then(() => this.loggedinUser = null)
        // }
    },

  components: {
  }
}
</script>
