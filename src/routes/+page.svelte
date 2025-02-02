<script>
    import "../styles/app.css";
    export let data;
</script>

<div class="flex w-full">
  <div class="card bg-base-300 rounded-box grid h-20 grow place-items-center">
  git <textarea class="textarea" placeholder="Paste your Markdown text here" />
  </div>
  <div class="divider divider-horizontal">OR</div>
  <div class="card bg-base-300 rounded-box grid h-20 grow place-items-center">content</div>
</div>

<slot />
