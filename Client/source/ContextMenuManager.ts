import {displayCell} from "./ipynb.js";
import{supprCell} from "./ipynb.js";
import{save} from "./ipynb.js";
import CelluleDTO from "./CelluleDTO.js";
export default class ContextMenuManager
{
    private contextMenu: JQuery<HTMLElement>;
    public constructor()
    {
        this.contextMenu=$("<div id='contextMenu'></div>");
    }
    public initiateContextMenu():void
    {
        var contextMenu = this.contextMenu;
        $(window).contextmenu(function (event){
            event.preventDefault();
        });
        $(window).on("hideContextMenu",function(){
            contextMenu.css("display","none");
        });
        $(window).on("click",function(event)
        {
            if (event.which==1)
            {
                $(window).trigger("hideContextMenu");
            }
        });
        this.createContextMenu();
        $("body").append(contextMenu);
    }
    public addContextMenuTo (cell:JQuery<HTMLElement>):void
    {
        var thisBis:ContextMenuManager=this;
        var contextMenu=this.contextMenu;
        cell.contextmenu(function(event){
            contextMenu.css("top",event.pageY);
            contextMenu.css("left",event.pageX);
            contextMenu.css("display","block");
            $(".menuOption").off("click");
            $("#insertCellCode").click(function(){
                thisBis.addNewCell("code",cell);
            });
            $("#insertCellMarkdown").click(function(){
                thisBis.addNewCell("markdown",cell);
            });
            $("#supprCell").click(function()
            {
                supprCell(cell);
            });
            $("#save").click(function(){
                save();
            });
        });
    }
    public createContextMenu(): void
    {
        var menuOptions:JQuery<HTMLElement> =$("<ul id=menuOptions><ul>");
        this.contextMenu.append(menuOptions);
        menuOptions.append($("<li class='menuOption' id='insertCellCode'>Insérer Cellule Code Après</li>"));
        menuOptions.append($("<li class='menuOption' id='insertCellMarkdown'>Insérer Cellule Markdown Après</li>"));
        menuOptions.append($("<li class='menuOption' id='supprCell'>Supprimer Cellule</li>"));
        menuOptions.append($("<li class='menuOption' id='save'>Enregistrer</li>"));
    }
    private  addNewCell(type:string,previousCellDom: JQuery<HTMLElement>): void
    {
        var cellObj:CelluleDTO=new CelluleDTO();
        cellObj.cell_type=type;
        displayCell(cellObj,previousCellDom,true);
    }
}