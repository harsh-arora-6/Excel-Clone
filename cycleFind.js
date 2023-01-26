function colorPromise(){
    return new Promise((resolve,reject) => {
        setTimeout(function(){
            resolve();
        },1000);
    })
}
async function traceCycle(srci,srcj){
    let visited = [];
    for(let i = 0;i < rows;i++){
        let visitedRow = [];
        for(let j = 0;j < cols;j++){
            visitedRow.push(false);
        }
        visited.push(visitedRow);
    }
    await trace(srci,srcj,visited);
}
async function trace(srci,srcj,visited){
    visited[srci][srcj] = true;
    let cell = document.querySelector(`.cell[rid="${srci}"][cid="${srcj}"]`);
    let cellProp = sheetDB[srci][srcj];
    let children = cellProp.children;
    cell.style.backgroundColor = 'lightblue';
    await colorPromise();// we want a pause here otherwise we won't be able to see the changes 
    for(let i = 0;i < children.length;i++){
        let [crid,ccid]=decode_RID_CID(children[i]);
        if(visited[crid][ccid] == false){
            await trace(crid,ccid,visited);
        }else{
            let ncell = document.querySelector(`.cell[rid="${crid}"][cid="${ccid}"]`);
            ncell.style.backgroundColor = 'lightsalmon';
            await colorPromise();
            ncell.style.backgroundColor = 'transparent';
            await colorPromise();
        }
    }
    cell.style.backgroundColor = 'transparent';
    await colorPromise();
}