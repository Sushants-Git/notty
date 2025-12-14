import { EditorView } from "@codemirror/view";

const COLORS = {
    SELECTION: "#e2e1de",
};

const editorTheme = EditorView.theme({
    "&": {
        borderRadius: "4px"
    },
    ".cm-scroller": {
        fontFamily: "Chillax",
        fontSize: "14px",
    },
    "&.cm-focused": {
        outline: "none",
    },
    ".cm-line": {
        padding: "0px 10px",
    },
    ".cm-activeLine": {
        backgroundColor: "transparent",
    },
    ".cm-gutters": {
        display: "none",
    },
    ".cm-cursor": {
        borderLeft: "none",
        width: "0.6em",
        backgroundColor: COLORS.SELECTION,
    },
    ".cm-layer": {
        animation: "none !important",
    },
    ".cm-selectionBackground": {
        backgroundColor: `${COLORS.SELECTION} !important`,
    },
});

export default editorTheme;
