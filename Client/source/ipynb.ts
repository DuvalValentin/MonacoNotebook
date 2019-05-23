import CelluleDTO from "./CelluleDTO.js";
import ContextMenuManager from "./ContextMenuManager.js";
import MonacoManager from "./MonacoManager.js";
import NotebookInfosDTO from "./NotebookInfosDTO.js";

//Si on transforme le tout en classe ici ça sera les attributs
var notebooks = ["firstNotebook", "python3Kernel", "SOS","test"];
var contextMenuManager = new ContextMenuManager();
var monacoManager:MonacoManager;
var bodyDom: JQuery<HTMLElement>;
var listCellsDom: JQuery<HTMLElement>;
var theNotebook:NotebookInfosDTO = new NotebookInfosDTO();

$(document).ready(function ()
{
    construct();
    var i = 3;
    var request = new XMLHttpRequest();
    request.open('GET', "/n/"+notebooks[i]+".ipynb");
    request.responseType = 'json';
    request.send();
    request.onload = function () 
    {
        displayNotebook(request);
    }
    defineKeyMacros();
});

//Ici ça serait le constructeur
function construct():void
{
    bodyDom=$("body");
    listCellsDom= $("<ul id='cellsList'></ul>");
    bodyDom.append(listCellsDom);
    contextMenuManager.initiateContextMenu();
}

function displayNotebook(request: XMLHttpRequest): void 
{
    theNotebook = JSON.parse(JSON.stringify(request.response));
    displayNotebookInfos();
    monacoManager= new MonacoManager(theNotebook.metadata.language_info.name);
    displayCells();
    console.log("Notebook fini d'afficher");
}

function displayNotebookInfos()
{
    $("<h1 id='kernelLanguage'>"+theNotebook.metadata.kernelspec.display_name+"</h1>").prependTo(bodyDom);
}

function displayCells(): void 
{
    theNotebook.cells.forEach(function(value:CelluleDTO)
    {
        displayCell(value,listCellsDom.children().last(),false);
    });
}

export function displayCell(cellDTO:CelluleDTO,previousCellDom: JQuery<HTMLElement>,isNew:boolean):void
{
    var cellDom: JQuery<HTMLElement> = addCellDom(previousCellDom);
    
    if(cellDTO.execution_count)
    {
        addExecutionCount(cellDom,cellDTO.execution_count);
    }
    addMonaco(cellDom,cellDTO,isNew);
    if (cellDTO.outputs&&cellDTO.outputs[0])
    {
        addOutputs(cellDom,cellDTO.outputs[0].text)
    }
    contextMenuManager.addContextMenuTo(cellDom);
}

function addCellDom(previousCellDom: JQuery<HTMLElement>):JQuery<HTMLElement>
{
    var cellDom: JQuery<HTMLElement> = $("<li class='cell' draggable='true' ></li>");
    if(previousCellDom.length!=0)
    {
        cellDom.insertAfter(previousCellDom);
    }
    else
    {
        cellDom.appendTo(listCellsDom);
    }
    cellDom.mousedown(function(){
        $(".cell").css("border","solid black 1px");
        $(this).css("border","solid blue 1px");
    });
    return cellDom;
}

function addExecutionCount(cellDom: JQuery<HTMLElement>,executionCount:number)
{
    var executionCountDom:JQuery<HTMLElement>=$("<p class='executionCount'>["+executionCount+"]</p>");
    cellDom.append(executionCountDom);
}

function addMonaco(cellDom: JQuery<HTMLElement>,cellDTO:CelluleDTO,isNew:boolean)//changer le nom de cette fonction
{
    var monacoSource:JQuery<HTMLElement> = $("<div class='monaco source'></div>");
    cellDom.append(monacoSource);
    monacoManager.divToMonaco(monacoSource.get(0),cellDTO,cellDom.index());
    if(isNew)
    {
        theNotebook.cells.splice(cellDom.index(),0,cellDTO);
    }
}

function addOutputs(cellDom:JQuery<HTMLElement>,outputs:string)
{
    var outputsDom:JQuery<HTMLElement> = $("<div class='output'></div>").text(outputs);
    cellDom.append(outputsDom);
}

export function supprCell(cellDom: JQuery<HTMLElement>)
{
    theNotebook.cells.splice(cellDom.index(),1);
    monacoManager.supprCell(cellDom.index());
    cellDom.remove();
}

export function save()
{
    theNotebook.cells.forEach(function(cellDTO:CelluleDTO,index:number){
        cellDTO.source=monacoManager.getSource(index);
    });
    generateJSON();
}

function generateJSON()
{
    var JSONString:string=JSON.stringify(theNotebook,null,"\t");
    var request = new XMLHttpRequest();
    request.open('POST', "/n");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSONString);
}

function defineKeyMacros()
{
    $(document).keydown(function(e){
        if(e.keyCode==83 && e.ctrlKey){
            save();
            alert("l'alerte empêche d'enregistrer la page html");
        }
    });
}