"use client"
import { Button } from "@nextui-org/button";
import Editor from '@monaco-editor/react';
import React, { useRef, useState } from 'react';
import { Select, SelectItem } from "@nextui-org/select";
import { Chip } from "@nextui-org/chip";
import { predefinedCodeOptions } from "@/components/predefined_codes/main";
import { changePredefinedCode } from "@/components/predefined_codes/main";
import { interpret } from "@/clients/govetryx/interpret";

export default function Home() {
  // States
  const [inputContent, setInputContent] = useState("# Hey there, welcome!");
  const [outputContent, setOutputContent] = useState("# The output will appear here...");
  const [isCodeRunning, setIsCodeRunning] = useState(false);

  // Editor refs
  const editorRef = useRef<any>();
  const editorOutputRef = useRef<any>();

  // Editor handlers
  function handleEditorDidMount(editor: any, _: any) {
    editorRef.current = editor;
  }

  function handleEditorOutputDidMount(editor: any, _: any) {
    editorOutputRef.current = editor;
  }

  async function interpretCode() {
    setIsCodeRunning(true)
    // Wait for a second so the button shows the loading animation
    await new Promise(r => setTimeout(r, 1000));

    var current = editorRef.current;
    var result = await interpret(current.getValue());
    if (result != "") {
      setOutputContent("# Output: \n\n" + result.message);
    }

    setIsCodeRunning(false)
  }

  function changeCode(e: any) {
    changePredefinedCode(e, setInputContent)
  }

  return (
    <div>
      <div className="flex gap-10 justify-end items-center py-2">
        <Select
          items={predefinedCodeOptions()}
          label="Predefined Code"
          placeholder="You can choose :)"
          className="max-w-xs"
          onChange={changeCode}
        >
          {(code) => <SelectItem key={code.value}>{code.text}</SelectItem>}
        </Select>
        <Button size="md" color="primary" onPress={interpretCode} isLoading={isCodeRunning}>
          Run Code
        </Button>
      </div>
      <div className="flex gap-10 justify-center">
        <Editor height="40vh" width="100%" defaultLanguage="python" value={inputContent} theme="vs-dark" onMount={handleEditorDidMount} />
      </div>
      <div className="flex py-3 justify-end">
        <Chip color="primary" variant="solid">Output</Chip>
      </div>
      <div className="flex gap-10 justify-center">
        <Editor height="20vh" width="100%" defaultLanguage="python" value={outputContent} theme="vs-dark" onMount={handleEditorOutputDidMount} />
      </div>
    </div>
  );
}
