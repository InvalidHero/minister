<div>
    <nav>
        <ul>
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <a href="/settings">Settings</a>
            </li>
        </ul>
    </nav>
    <slot />
</div>

<style>
    :global(*, *::before, *::after) {
        box-sizing: border-box;
    }

    :global(:root) {
        --mobileMin: 480px;
        --mobileMax: 959px;
        --tabletMin: 960px;
        --tabletMax: 1199px;
        --desktopMin: 1200px;
    }

    div {
        min-height: 100vh;
        padding: 20px;
        /* margin: 25px auto; */
        max-width: 1500px;
    }

    ul {
        display: flex;
        flex-direction: row;
        padding-inline-start: 0px;
    }

    li {
        padding-left: 0px;
        padding-right: 25px;
        list-style: none;
    }
</style>
