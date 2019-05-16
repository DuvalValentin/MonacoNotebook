import CelluleDTO from "./CelluleDTO";

export default class NotebookInfosDTO
{
    public metadata:Metadata;

    public nbformat:number;
    public nbformat_minor:number;

    public cells:Array<CelluleDTO>
}

class Metadata
{
    public jupytext:Jupytext;
    public kernelspec:Kernelspec;
    public language_info:Language;
}


class Jupytext
{
    public formats:string;
}

class Kernelspec
{
    public display_name:string;
    public language:string;
    public name:string;

}

class Language
{
    public codemirror_mode:CodeMirror;
    public file_extension:string;
    public mimetype:string;
    public name:string;
    public nbconvert_exporter:string;
    public pygments_lexer:string;
    public version:string;
}

class CodeMirror
{
    public name:string;
    public version:string;
}