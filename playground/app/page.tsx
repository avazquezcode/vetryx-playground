"use client"
import { Button } from "@nextui-org/button";
import Editor from '@monaco-editor/react';
import React, { useRef, useState } from 'react';
import { Select, SelectItem } from "@nextui-org/select";
import { Divider } from "@nextui-org/divider";
import { Chip } from "@nextui-org/chip";
import { GetNthFibo } from "@/components/predefined_codes/fibo";
import { GetMinMax } from "@/components/predefined_codes/minmax";
import { GetSleep } from "@/components/predefined_codes/sleep";
import { GetPrintOdd } from "@/components/predefined_codes/printodd";


async function interpret(sourceCode: string, outputSetter: any, isCodeRunningSetter: any) {
  isCodeRunningSetter(true)
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
    outputSetter("# Output: \n\n" + data.message);
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
  const fiboCode = GetNthFibo()
  const minAndMaxCode = GetMinMax()
  const sleepCode = GetSleep()
  const printOddCode = GetPrintOdd()


  // States
  const [inputContent, setInputContent] = useState("# Hey there, welcome :)");
  const [outputContent, setOutputContent] = useState("# The output will appear here :)");
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

  function changePredefinedCode(e: any) {
    if (e.target.value == "empty") {
      setInputContent("# You can start typing here...");
    }
    if (e.target.value == "fibo") {
      setInputContent(fiboCode);
    }
    if (e.target.value == "minmax") {
      setInputContent(minAndMaxCode);
    }
    if (e.target.value == "sleep") {
      setInputContent(sleepCode);
    }
    if (e.target.value == "printodd") {
      setInputContent(printOddCode);
    }
  };

  async function interpretCode() {
    var current = editorRef.current;
    var value = "";

    if (current) {
      value = current.getValue()
    }
    interpret(value, setOutputContent, setIsCodeRunning);
  }

  var predefinedCodeOptions = [
    {
      value: "empty",
      text: "Empty Editor"
    },
    {
      value: "fibo",
      text: "Nth Fibonacci Number"
    },
    {
      value: "minmax",
      text: "Min and Max"
    },
    {
      value: "printodd",
      text: "Print Odd Numbers"
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
      <div className="flex gap-10 justify-center">
        <Editor height="40vh" width="150vh" defaultLanguage="python" value={inputContent} theme="vs-dark" onMount={handleEditorDidMount} />
      </div>
      <div className="flex py-3 justify-end">
      <Chip color="primary" variant="solid">Output</Chip>
      </div>
      <div className="flex gap-10 justify-center">
        <Editor height="20vh" width="150vh" defaultLanguage="python" value={outputContent} theme="vs-dark" onMount={handleEditorOutputDidMount} />
      </div>
    </div>
  );
}
