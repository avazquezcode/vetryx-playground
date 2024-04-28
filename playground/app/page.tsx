"use client"
import { Button } from "@nextui-org/button";
import Editor from '@monaco-editor/react';
import React, { useRef, useState } from 'react';
import { Select, SelectItem } from "@nextui-org/select";
import { Divider } from "@nextui-org/divider";
import { GetFiboSequence } from "@/components/predefined_codes/fibo";


async function interpret(sourceCode: string, outputSetter: any, isCodeRunningSetter: any) {
  // Wait for a second so the button shows the loading animation
  await new Promise(r => setTimeout(r, 1000));

  let host = process.env.NEXT_PUBLIC_INTERPRETER_HOST as string;
  let endpoint = process.env.NEXT_PUBLIC_INTERPRET_ENDPOINT as string;
  var url = host + endpoint;

  // build request body for the API call
  var body = {
    "sourceCode": sourceCode
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    // Set the data to the output
    // Notice that the API must return the output in "data.message" field as a string
    outputSetter("// Output: \n\n" + data.message);
    // stop loading
    isCodeRunningSetter(false)
  } catch (err) {
    alert("an error happened while interpreting the code: " + err);
    console.log(err)
    // stop loading
    isCodeRunningSetter(false)
  }
}

export default function Home() {
  // Load predefined codes
  const fiboCode = GetFiboSequence()

  // States
  const [inputContent, setInputContent] = useState("// Hey there, welcome :)");
  const [outputContent, setOutputContent] = useState("// The output will appear here :)");
  const [isCodeRunning, setIsCodeRunning] = useState(false);

  // Editor refs
  const editorRef = useRef(null);
  const editorOutputRef = useRef(null);

  // Editor handlers
  function handleEditorDidMount(editor: any, _: any) {
    editorRef.current = editor;
  }

  function handleEditorOutputDidMount(editor: any, _: any) {
    editorOutputRef.current = editor;
  }

  function changePredefinedCode(e: any) {
    if (e.target.value == "empty") {
      setInputContent("// You can start typing here...");
    }
    if (e.target.value == "fibo") {
      setInputContent(fiboCode);
    }
  };

  async function interpretCode() {
    interpret(inputContent, setOutputContent, setIsCodeRunning);
  }

  var predefinedCodeOptions = [
    {
      value: "empty",
      text: "Empty Editor"
    },
    {
      value: "fibo",
      text: "Fibonacci Sequence"
    },
  ];

  return (
    <div>
      <div className="flex gap-10 justify-end">
        <Select
          items={predefinedCodeOptions}
          label="Predefined Code"
          placeholder="You can choose :)"
          className="max-w-xs"
          onChange={changePredefinedCode}
        >
          {(code) => <SelectItem key={code.value}>{code.text}</SelectItem>}
        </Select>
        <Button size="md" color="primary" onPress={interpretCode} isLoading={isCodeRunning}>
          Run Code
        </Button>
      </div>
      <Divider className="my-4" />
      <div className="flex gap-10">
        <Editor height="70vh" defaultLanguage="go" value={inputContent} theme="vs-dark" onMount={handleEditorDidMount} />
        <Editor height="70vh" defaultLanguage="go" value={outputContent} theme="vs-dark" onMount={handleEditorOutputDidMount} />
      </div>
    </div>
  );
}
