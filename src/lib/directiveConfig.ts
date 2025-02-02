// src/lib/directiveConfig.ts
  /**
   * DirectiveConfig is a Svelte action that safely binds a provided HTML string as innerHTML
   * to the target node. It updates the node's content when the value changes.
   *
   * Usage in a Svelte component:
   * <div use:DirectiveConfig.bind.innerhtml={htmlOutput}></div>
   */
  
  export default function DirectiveConfig(node: HTMLElement, htmlContent: string) {
    // Function to update the innerHTML of the node
    function update(content: string) {
      node.innerHTML = content;
    }
  
    // Set the initial content
    update(htmlContent);
  
    return {
      // Called when the action's parameter (htmlContent) changes
      update(newContent: string) {
        update(newContent);
      },
      // Cleanup if necessary when the element is removed from the DOM
      destroy() {
        // No cleanup needed in this simple implementation
      }
    };
  }