import type { NextPage } from "next";
import { useCallback, useEffect } from "react";
import copy from "copy-text-to-clipboard";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import TransformStep from "../components/TransformStep";
import { validateTransformers } from "../lib/validators";
import { generateOutput } from "../lib/output-generator";
import { steps } from "../data/steps";
import { example as value } from "../data/examples";
import useEditorState from "../hooks/useEditorState";

const Home: NextPage = () => {
  const [inputJson, setInputJson, inputJsonRef] = useEditorState(value);
  const [
    transformers,
    setTransformers,
    transformersRef,
    transformersErrors,
    setTransformersErrors,
  ] = useEditorState({});
  const [generatedOutput, setGenerateOut] = useEditorState();
  const [transformersEditor, setTransformersEditor, transformersEditorRef] = useEditorState();

  transformersEditorRef.current = transformersEditor;

  const copyToClipboard = (message: string, payload: any) => {
    copy(payload);

    toast.success(`${message} copied to clipboard`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const validateTransformersEditor = useCallback(
    async ({ input, transformers }: { input?: any; transformers?: any }) => {
      const { editor, monaco } = transformersEditorRef.current;

      const errors = await validateTransformers(
        input || inputJsonRef.current,
        transformers || transformersRef.current,
        editor
      );
      const model = editor.getModel();
      monaco.editor.setModelMarkers(model, "Example", errors);
      setTransformersErrors(errors);
    },
    [inputJsonRef, transformersEditorRef, transformersRef, setTransformersErrors]
  );

  const generateEditorOutput = useCallback(async () => {
    const output = await generateOutput(inputJsonRef.current, transformersRef.current);
    setGenerateOut(output);
  }, [inputJsonRef, transformersRef, setGenerateOut]);

  // Try to generate output if any values change in the flow
  useEffect(() => {
    try {
      if (transformers) {
        generateEditorOutput();
      }
    } catch (error) {}
  }, [inputJson, generateEditorOutput, transformers]);

  // If things are empty then clear editors
  useEffect(() => {
    if (!inputJson) {
      setTransformers(null);
      setGenerateOut(null);
    }
  }, [inputJson, transformers, setGenerateOut, setTransformers]);

  const outPutErrorMessage =
    transformersErrors.length > 0
      ? "Failed to render output. Please fix the transformers errors"
      : "";

  return (
    <div className="bg-gray-900">
      <div className="">
        {/* The Editor Grid */}
        <div
          className={`grid grid-cols-1 space-y-10 md:space-y-0 md:gap-3 justify-between mx-10 rounded-md ${"md:grid-cols-3"}`}
        >
          <TransformStep
            id="input"
            color="blue"
            title={<>Input JSON &rarr;</>}
            subtitle="Your source JSON you want to transform."
            value={inputJson}
            onCopy={(value) => copyToClipboard("Input JSON", JSON.stringify(value, null, 4))}
            onChange={(value: any) => {
              try {
                const input = value ? JSON.parse(value) : null;
                setInputJson(input);
                if (input) {
                  validateTransformersEditor({ input });
                }
              } catch (error) {}
            }}
            renderEditorWhenEmpty
          />
          <TransformStep
            id="transformers"
            color="orange"
            title={<>Transformers &rarr;</>}
            subtitle="Define transformations."
            value={transformers}
            onCopy={(value) => copyToClipboard("Transformers", JSON.stringify(value, null, 4))}
            errors={transformersErrors}
            onInit={(editor, monaco) => {
              setTransformersEditor({ editor, monaco });
            }}
            onChange={(value: any) => {
              try {
                const transformers = value ? JSON.parse(value || {}) : null;
                setTransformers(transformers);
                if (transformers) {
                  validateTransformersEditor({ transformers });
                }
              } catch (error) {}
            }}
            renderEditorWhenEmpty
          />

          <TransformStep
            id="output"
            color="green"
            title={<>Output</>}
            subtitle="Output based on your transformation rules."
            value={generatedOutput}
            onCopy={(value) => copyToClipboard("Output JSON", JSON.stringify(value, null, 4))}
            errors={[]}
            errorOverLayMessage={outPutErrorMessage}
            readOnly
          />
        </div>

        <div className="mx-10 mt-10 mb-20"></div>
      </div>

      <div className="bg-gray-100" id="how-to-use-it">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-12">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">How to use the tool?</h2>
              <p className="mt-4 text-base text-gray-500">
                Use the custom editors to create JSON transformation using{" "}
                <a
                  className="text-underline text-blue-500 underline"
                  href="https://docs.jsonata.org/overview.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  JSONata
                </a>{" "}
                library.
              </p>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-2">
              <dl className="space-y-12">
                {steps.map((step) => (
                  <div key={step.title}>
                    <dt className="text-lg leading-6 font-medium text-gray-900">{step.title}</dt>
                    <dd className="mt-2 text-base text-gray-500">{step.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
