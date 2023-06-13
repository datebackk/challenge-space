import {monacoEditorConfig} from './monaco-editor-config.const';

export const readOnlyMonacoEditorConfig = {
    ...monacoEditorConfig,
    defaultOptions: {
        ...monacoEditorConfig.defaultOptions,
        readOnly: true,
    }
}
