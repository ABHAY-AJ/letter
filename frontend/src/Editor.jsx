import { useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { $getRoot } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import axios from "axios";
import { apiUrl } from "./api";

const theme = {
  paragraph: "editor-paragraph",
};

function Placeholder() {
  return <div className="editor-placeholder">Start writing your letter...</div>;
}

function SaveButton({ title }) {
  const [editor] = useLexicalComposerContext(); // Get the editor instance

  const handleSave = async () => {
    editor.update(() => {
      const root = $getRoot();
      const content = root.getTextContent();

      axios
        .post(
          `${apiUrl}/letters/save`,
          { title, content },
          { withCredentials: true }
        )
        .then((response) => alert("Saved to Google Drive! File ID: " + response.data.fileId))
        .catch(() => alert("Failed to save letter."));
    });
  };

  return (
    <button onClick={handleSave} className="save-btn">
      Save to Google Drive
    </button>
  );
}

export default function Editor() {
  const [title, setTitle] = useState("");

  const initialConfig = {
    namespace: "LetterEditor",
    theme,
    onError(error) {
      console.error(error);
    },
  };

  return (
    <div className="editor-container">
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="title-input"
      />

      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin contentEditable={<ContentEditable className="editor-content" />} placeholder={<Placeholder />} />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <SaveButton title={title} />
      </LexicalComposer>
    </div>
  );
}
