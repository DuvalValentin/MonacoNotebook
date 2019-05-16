export default class CelluleDTO
{
    public source: Array<string>;
    public language: string;
    public cell_type:string;
    public execution_count:number;
    public outputs: Array<Output>;
    //public metadata:Metadata;

    public initializeOutputs()
    {
        this.outputs=new Array<Output>(1);
        this.outputs[0]=new Output();
    }

    /*public initializeMetadata()
    {
        this.metadata=new Metadata();
    }*/
}

class Output
{
    public name:string;
    public output_type:string;
    public text:string;
}

/*class Metadata
{
    public scrolled:boolean;
    public kernel: string;
}*/