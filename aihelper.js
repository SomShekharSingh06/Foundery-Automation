// aiHelper.js
import fetch from "node-fetch";

/**
 * Ask the local MCP AI server for a code suggestion or fix.
 * @param {string} filePath - Relative path of the file to analyze
 * @param {number} line - Line number where the issue occurred
 */
export async function getAISuggestion(filePath, line) {
  try {
    const response = await fetch("http://localhost:8080/mcp/suggest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: filePath, line,content :"" }),
    });

    if (!response.ok) {
      console.error(`AI Suggestion API error: ${response.status}`);
      return null;
    }

    const data = await response.json();
    console.log(`💡 AI Suggestion for ${filePath}:${line}\n`);
    console.log(data.suggestion);
    return data.suggestion;
  } catch (err) {
    console.error("AI suggestion failed:", err.message);
    return null;
  }
}
