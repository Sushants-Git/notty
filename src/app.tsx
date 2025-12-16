import CodeMirror from "@uiw/react-codemirror";
import editorTheme from "./theme";
import { DIFF_TYPES, LINE_ENDINGS } from "./constants";

const oldText = `SUSHANT
MISHRA
RAJPUT
`;

const newText = `SUSHANT
SINGH
RAJPUT
`;

// const oldText = `
// Hello there,
// Sushant Mishra
// my name is
// are you sure`;
//
// const newText = `
// Hello there,
// Anuj Mishra
// my name is
// What is going ver here
// `;

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

function getLCSLength(oldText: string, newText: string) {
    const oldLines = oldText.split(LINE_ENDINGS.LF);
    const newLines = newText.split(LINE_ENDINGS.LF);

    const dp = Array.from({ length: oldLines.length + 1 }, () =>
        Array.from({ length: newLines.length + 1 }).fill(0)
    ) as number[][];

    for (let i = 1; i <= oldLines.length; i++) {
        for (let j = 1; j <= newLines.length; j++) {
            if (oldLines[i - 1] === newLines[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp;
}

function getLCS(oldText: string, newText: string, lcsMatrix: number[][]) {
    const oldLines = oldText.split(LINE_ENDINGS.LF);
    const newLines = newText.split(LINE_ENDINGS.LF);

    const lcsLines = [];

    let i = oldLines.length;
    let j = newLines.length;

    while (i > 0 && j > 0) {
        if (oldLines[i - 1] === newLines[j - 1]) {
            lcsLines.push({ line: oldLines[i - 1] });

            i--;
            j--;
        } else if (lcsMatrix[i][j - 1] <= lcsMatrix[i - 1][j]) {
            i--;
        } else {
            j--;
        }
    }

    return lcsLines.reverse();
}

function getDiff(oldText: string, newText: string) {
    const oldLines = oldText.split(LINE_ENDINGS.LF);
    const newLines = newText.split(LINE_ENDINGS.LF);

    const lcsMatrix = getLCSLength(oldText, newText);

    const lcs = getLCS(oldText, newText, lcsMatrix);

    return lcs;
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
            <div>length of lcs : {JSON.stringify(diff, null, 2)}</div>
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
