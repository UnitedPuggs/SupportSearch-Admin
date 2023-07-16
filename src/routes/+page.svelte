<script>
    import { signIn, signOut } from '@auth/sveltekit/client'
</script>

<div class="flex items-center justify-center h-screen">
    <button on:click={() => signIn("google")} class="bg-black rounded-lg text-white font-mono p-2 hover:opacity-75">Sign in with Clubspeed</button>
</div>