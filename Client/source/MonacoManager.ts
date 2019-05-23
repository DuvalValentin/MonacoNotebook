//import * as monaco from 'monaco-editor';
import * as monacoclient from "monaco-languageclient";
import CelluleDTO from "./CelluleDTO.js";
export default class MonacoManager {
    private language: string;
    private arrayMonacos: Array<any>;
    public constructor(language: string) {
        this.language = language;
        this.arrayMonacos = new Array<any>();
        console.log(monaco.languages.getLanguages());
    }

    public divToMonaco(monacoDiv: HTMLElement, cellObj: CelluleDTO, index: number) {
        var source:string= this.jsonSourceToString(cellObj.source);
        monacoDiv.innerHTML = "";
        var type: string = cellObj.cell_type;
        var cellLanguage: string;
        if (type == "code") {
            cellLanguage = this.language;
        }
        else {
            cellLanguage = type;
        }
       var newWindow:monaco.editor.IStandaloneCodeEditor=monaco.editor.create(monacoDiv, {
            model:monaco.editor.createModel(source,cellLanguage),
            language: cellLanguage,
            theme: "vs-dark",
            autoIndent: true,
            contextmenu:true,
            cursorStyle: "line",
            dragAndDrop: true,
            fontFamily: "URW Chancery L",
            fontSize: 20,
            fontWeight: "bold",
            lineNumbers: "relative",
            mouseWheelZoom: true,
            readOnly: false,
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            glyphMargin:true,
            //tabCompletion: true
        });
        console.log(monacoclient.getLanguages());
        //monacoclient.MonacoServices.install(newWindow);
        newWindow.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S,function(){
            alert("Fichier sauvegardé");
        },"");
        this.arrayMonacos.splice(index,0,newWindow);

        
    }

    public getSource(index:number): Array<string>
    {
        var stringSource:string=this.arrayMonacos[index].getValue();
        var arraySource:Array<string>=stringSource.split("\n");
        arraySource.forEach(function(value,index){
            value+="\n";
            if(index!=arraySource.length-1)
            {
                arraySource[index]=value;
            }
        });
        return arraySource;
    }
    public supprCell(index:number):void
    {
        this.arrayMonacos.splice(index,1);
    }

    private jsonSourceToString(sourceJson:Array<string>):string
    {
        var source: string = "";
        if(sourceJson)
        {
            for (var i = 0; i < sourceJson.length; i++) 
            {
                source += sourceJson[i];
            }
        }
        return source;
    }
}