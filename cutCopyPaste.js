let cmdKey;

document.addEventListener('keydown',(e)=>{
    if(e.key === 'Meta'){
        cmdKey = true;
    }
})
document.addEventListener('keyup',(e)=>{
    if(e.key === 'Meta')
        cmdKey = false;
})

let copyBtn = document.querySelector('.copy');
let cutBtn = document.querySelector('.cut');
let pasteBtn = document.querySelector('.paste');

let rangeStorage = [];
for(let i = 0;i < rows;i++){
    for(let j = 0;j < cols;j++){
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.addEventListener('click',(e)=>{
            if(!cmdKey)return;
            if(rangeStorage.length >= 2){
                defaultCellUI();
                rangeStorage = [];
            }
            cell.style.border = "3px solid #009432";
            rangeStorage.push([i,j]);
        })
    }
}
function defaultCellUI(){
    
    let cell = document.querySelector(`.cell[rid="${rangeStorage[0][0]}"][cid="${rangeStorage[0][1]}"]`);
    cell.style.border = "1px solid #dfe4ea";
    cell = document.querySelector(`.cell[rid="${rangeStorage[1][0]}"][cid="${rangeStorage[1][1]}"]`);
    cell.style.border = "1px solid #dfe4ea";
}

let copyData = [];
copyBtn.addEventListener('click',(e)=>{
    if(rangeStorage.length < 2)return;
    copyData = [];
    let [strow,endrow,stcol,endcol] = [rangeStorage[0][0],rangeStorage[1][0],rangeStorage[0][1],rangeStorage[1][1]];
    for(let i = strow;i <= endrow;i++){
        let copyRow = [];
        for(let j = stcol;j <= endcol;j++){
            let copyCellProp = {};
            let data = sheetDB[i][j];
            copyCellProp.bold = data.bold;
            copyCellProp.italic = data.italic;
            copyCellProp.underline = data.underline;
            copyCellProp.fontFamily = data.fontFamily;
            copyCellProp.fontSize = data.fontSize;
            copyCellProp.fontColor = data.fontColor;
            copyCellProp.backgroundColor = data.backgroundColor;
            copyCellProp.value = data.value;

            copyRow.push(copyCellProp);
        }
        copyData.push(copyRow);
    }
    defaultCellUI();
})
cutBtn.addEventListener('click',(e)=>{
    if(rangeStorage.length < 2)return;
    copyData = [];
    let [strow,endrow,stcol,endcol] = [rangeStorage[0][0],rangeStorage[1][0],rangeStorage[0][1],rangeStorage[1][1]];
    for(let i = strow;i <= endrow;i++){
        let copyRow = [];
        for(let j = stcol;j <= endcol;j++){
            let copyCellProp = {};
            let data = sheetDB[i][j];
            copyCellProp.bold = data.bold;
            copyCellProp.italic = data.italic;
            copyCellProp.underline = data.underline;
            copyCellProp.fontFamily = data.fontFamily;
            copyCellProp.fontSize = data.fontSize;
            copyCellProp.fontColor = data.fontColor;
            copyCellProp.backgroundColor = data.backgroundColor;
            copyCellProp.value = data.value;

            sheetDB[i][j] = {
                bold:false,
                italic:false,
                underline:false,
                fontFamily:"monospace",
                fontSize:14,
                alignment:"left",
                fontColor:"#000000",
                backgroundColor:"transparent",
                value:"",
                formula:"",
                children:[],
                indeg:0
            }
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            cell.click();
            copyRow.push(copyCellProp);
        }
        copyData.push(copyRow);
    }
    defaultCellUI();
})

pasteBtn.addEventListener('click',(e)=>{
    if(rangeStorage.length < 2)return;
    let [strow,stcol] = decode_RID_CID(addressBar.value);
    let rowDiff = Math.abs(rangeStorage[0][0]-rangeStorage[1][0]);
    let colDiff = Math.abs(rangeStorage[0][1]-rangeStorage[1][1]);
    let endrow = strow + rowDiff;
    let endcol = stcol + colDiff;
    for(let i = strow;i<=Math.min(99,endrow);i++){
        for(let j = stcol;j<= Math.min(25,endcol);j++){
            // DB 
            sheetDB[i][j].bold =            copyData[i-strow][j-stcol].bold;
            sheetDB[i][j].italic =          copyData[i-strow][j-stcol].italic;
            sheetDB[i][j].underline =       copyData[i-strow][j-stcol].underline;
            sheetDB[i][j].fontFamily =      copyData[i-strow][j-stcol].fontFamily;
            sheetDB[i][j].fontSize =        copyData[i-strow][j-stcol].fontSize;
            sheetDB[i][j].fontColor =       copyData[i-strow][j-stcol].fontColor;
            sheetDB[i][j].backgroundColor = copyData[i-strow][j-stcol].backgroundColor;
            sheetDB[i][j].value =           copyData[i-strow][j-stcol].value;

            // UI 
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            cell.click();
        }
    }
})