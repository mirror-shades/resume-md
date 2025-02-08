<script lang="ts">
  import { onMount } from 'svelte';
  import '../styles/app.css';
  // Import the marked library for Markdown-to-HTML conversion.
  import { marked } from 'marked';
  
  // Optionally, import GitHub Markdown CSS for styling the preview.
  // Ensure the dependency is installed: npm install github-markdown-css
  import 'github-markdown-css/github-markdown.css';

  // Declare reactive variables for the Markdown input and HTML output.
  let markdownInput = '';
  let htmlOutput = '';

  // Conversion function using "marked" to parse Markdown and update the preview.
  function convertMarkdown() {
    htmlOutput = marked.parse(markdownInput);
  }
</script>

<div class="h-screen">
  <div class="flex items-center p-4">
    <select class="select select-bordered w-full max-w-xs">
      <option>Github</option>
      <option>VSCode</option>
    </select>
    <details class="dropdown ml-4">
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
    <div class="w-1/2 p-4 overflow-auto">
      <h2 class="text-xl font-bold mb-4">Preview</h2>
      <!-- 
           The "markdown-body" class applies GitHub Markdown styling.
           Ensure you've imported the GitHub Markdown CSS in your project.
      -->
      <div class="w-full h-full p-4 border rounded-lg bg-white markdown-body">
        {@html htmlOutput}
      </div>
    </div>
  </div>
</div>