<template>
  <div id="app">
        <header>
      <div>
        <h1>Labb 3</h1>
      </div>
      <div>
        <nav>
          <router-link to="/hem">Hem</router-link>
          <router-link to="/api1">API 1</router-link>
          <router-link to="/api2">API 2</router-link>
          <router-link to="/api3">API 3</router-link>
        </nav>
      </div>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <div>Copyright &copy; Hugo Viklund, All rights reserved.</div>
    </footer>
  </div>
</template>