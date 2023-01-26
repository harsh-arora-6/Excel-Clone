
function checkCycle(){
    // let temp_indeg = [...indeg] or indeg; this will create deep copy we don't want that => that will disrupt 
    let temp_indeg = []
    let queue = [];
    let startCell
    for(let i = 0 ;i < rows;i++){
        let temp_indeg_row = []
        for(let j = 0;j < cols;j++){
            temp_indeg_row.push(sheetDB[i][j].indeg);
            if(temp_indeg_row[j] === 0){
                let cell = [i,j];
                queue.push(cell);
            }else{
                startCell = [i,j];
            }
        }
        temp_indeg.push(temp_indeg_row);
    }
    let cycle = 0;
    while(queue.length){
        // console.log('queue.splice : ',queue.splice(0,1));
        let [src] = queue.splice(0,1)
        let srcChildren = sheetDB[src[0]][src[1]].children;
        for(let i = 0;i < srcChildren.length ;i++){
            let childAddress = srcChildren[i];
            let [crid,ccid] = decode_RID_CID(childAddress);
            // console.log("before :  ",'crid: ',crid,'ccid: ',ccid,'temp_indeg: ',temp_indeg[crid][ccid],'indeg: ',indeg[crid][ccid]);
            temp_indeg[crid][ccid]--;
            // console.log("after :  ",'crid: ',crid,'ccid: ',ccid,'temp_indeg: ',temp_indeg[crid][ccid],'indeg: ',indeg[crid][ccid]);
            if(temp_indeg[crid][ccid] === 0){
                queue.push([crid,ccid]);
            }else{
                startCell = [crid,ccid];
            }
        }
        cycle++;
    }
    return (cycle !== rows*cols?startCell:null);
}