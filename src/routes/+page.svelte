<script>
    import "../styles/app.css";
    export let data;
</script>

<p class="text-3xl font-bold underline">Hello world!</p>

<button
  class="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
  Button
</button>

<slot />
