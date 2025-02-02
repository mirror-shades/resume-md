<script lang="ts">
  import { onMount } from 'svelte';
  // Import the internal directive (ensure the path is correct based on your project structure)
  import DirectiveConfig from '$lib/directiveConfig';

  // Declare reactive variables for the Markdown input and HTML output.
  let markdownInput = '';
  let htmlOutput = '';

  // Conversion function: for demonstration, we'll convert newlines to <br> tags.
  // Replace with your actual Markdown conversion logic or an internal conversion service if available.
  function convertMarkdown() {
    // Example: very basic replacement to demonstrate changes.
    htmlOutput = markdownInput.replace(/\n/g, '<br>');
  }

  // Initialize preview on component mount.
  onMount(() => {
    convertMarkdown();
  });
</script>

<div class="h-screen">
  <div class="flex ">
    <select class="select select-bordered w-full max-w-xs">
      <option>Github</option>
      <option>VSCode</option>
    </select>
    <details class="dropdown">
      <summary class="btn m-1">Download</summary>
      <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        <li><a>PDF</a></li>
        <li><a>HTML</a></li>
      </ul>
    </details>
  </div>
  <div class="h-9/10 flex">
    <div class="w-1/2 p-4">
      <h2 class="text-xl font-bold mb-4">Markdown</h2>
      <textarea
        class="w-full h-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        bind:value={markdownInput}
        on:input={convertMarkdown}
        placeholder="Enter your Markdown here..."
      ></textarea>
    </div>

    <div class="w-1/2 p-4">
      <h2 class="text-xl font-bold mb-4">Preview</h2>
      <div
        class="w-full h-full p-4 border rounded-lg bg-white"
        use:DirectiveConfig={htmlOutput}
      ></div>
    </div>
  </div>
</div>