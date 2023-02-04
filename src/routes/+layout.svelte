
<svelte:body/>

<body>
    <nav>HexiDeci</nav>
    <slot/>
</body>

<style>
    body {
        background: #121214;
        min-width: 200px;
        font-family: 'Courier New', Courier, monospace;
        color: rgb(47, 247, 47);
    }
    nav {
        text-align: center;
        font-size: 3em;
        margin-bottom: 50px;
    }
</style>