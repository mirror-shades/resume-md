<script lang="ts">
  import { onMount } from 'svelte';
  import '../styles/app.css';
  // Import the marked library for Markdown-to-HTML conversion.
  import { marked } from 'marked';
  
  // Import html2pdf for generating PDFs from HTML.
  let html2pdf: any;

  // Optionally, import GitHub Markdown CSS for styling the preview.
  // Ensure the dependency is installed: npm install github-markdown-css
  import 'github-markdown-css/github-markdown.css';

  // Declare reactive variables for the Markdown input and HTML output.
  let markdownInput = '';
  let htmlOutput = '';

  // Conversion function using "marked" to parse Markdown and update the preview.
  async function convertMarkdown() {
    htmlOutput = await marked.parse(markdownInput);
  }

  // Function to download the preview as a PDF.
  async function downloadPDF() {
    const element = document.getElementById('preview');
    if (!element) return;

    // Clone the element to avoid potential Svelte reactivity issues.
    const clonedElement = element.cloneNode(true) as HTMLElement;

    const opt = {
      margin: 0.5,
      filename: 'output.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    if (!html2pdf) {
      console.error("html2pdf not loaded yet.");
      return;
    }

    console.log("attempting to save");
    // Use a short timeout to yield control to the UI thread.
    setTimeout(() => {
      html2pdf().set(opt).from(clonedElement).save().then(() => {
          console.log("saved");
      }).catch((e: Error) => {
          console.error("Error generating PDF:", e);
      });
    }, 0);
  }

  onMount(async () => {
    // Dynamically import html2pdf.js on the client side
    const module = await import("html2pdf.js");
    html2pdf = module.default;

    // Use html2pdf as needed, e.g., generate PDF from an element
    // const element = document.getElementById("content");
    // html2pdf().from(element).save();
  });
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
        <li>
          <button type="button" on:click={downloadPDF}>PDF</button>
        </li>
        <li>
          <!-- Optionally, you can also offer to download the raw HTML -->
          <a href={"data:text/html;charset=utf-8," + encodeURI(htmlOutput)} download="output.html">HTML</a>
        </li>
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
        id="preview"
        class="w-full max-h-[calc(100vh-150px)] p-4 border rounded-lg bg-white markdown-body overflow-auto"
      >
        {@html htmlOutput}
      </div>
    </div>
  </div>
</div>