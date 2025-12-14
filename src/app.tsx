import CodeMirror from "@uiw/react-codemirror";
import editorTheme from "./theme";
import { LINE_ENDINGS } from "./constants";

const oldText = `Hello there,
my name is
Sushant Mishra`;

const newText = `Hello there,
my name is
Anuj Mishra`;

function App() {
    return (
        <div className="mt-3 w-max mx-auto font-chillax text-[14px]">
            {/* <div className="flex gap-4 items-start"> */}
            {/*     <Editor /> */}
            {/*     <UndoTree /> */}
            {/* </div> */}
            <div>
                <DiffView oldText={oldText} newText={newText} />
            </div>
        </div>
    );
}

function getLengthOfLCS(oldText: string, newText: string) {
    const oldTokens = oldText.split(LINE_ENDINGS.LF);
    const newTokens = newText.split(LINE_ENDINGS.LF);

    const lcsMatrix = Array.from({ length: oldTokens.length + 1 }, () =>
        Array.from({ length: newTokens.length + 1 }).fill(0)
    ) as number[][];

    for (let i = 1; i < lcsMatrix.length; i++) {
        for (let j = 1; j < lcsMatrix[i].length; j++) {
            if (oldTokens[i - 1] === newTokens[j - 1]) {
                lcsMatrix[i][j] = lcsMatrix[i - 1][j - 1] + 1;
            } else {
                lcsMatrix[i][j] = Math.max(
                    lcsMatrix[i][j - 1],
                    lcsMatrix[i - 1][j]
                );
            }
        }
    }

    return lcsMatrix[oldTokens.length][newTokens.length];
}

function getDiff(oldText: string, newText: string) {
    const lengthOfLCS = getLengthOfLCS(oldText, newText);
    return lengthOfLCS;
}

function DiffView({ oldText, newText }: { oldText: string; newText: string }) {
    const diff = getDiff(oldText, newText);

    return (
        <div className="mt-10 font-chillax">
            <div className="flex gap-14">
                <pre className="font-chillax">{oldText}</pre>
                <pre className="font-chillax">{newText}</pre>
            </div>
            -----
            <div>length of lcs : {diff}</div>
            {/* <div className="border mt-4"> */}
            {/* </div> */}
        </div>
    );
}

function Editor() {
    return (
        <div className="w-[80vw] max-w-[700px] border rounded-sm">
            <MarkdownEditor />
        </div>
    );
}

function UndoTree() {
    return (
        <div className="border px-2 py-1 w-[300px] rounded-sm">UndoTree</div>
    );
}

function MarkdownEditor() {
    return (
        <CodeMirror
            height="100%"
            extensions={[editorTheme]}
            autoFocus
            onChange={(value) => console.log(value)}
        />
    );
}

export default App;
