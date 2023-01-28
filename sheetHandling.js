
const sheetAddBtn = document.querySelector('.sheet-add-icon');
const sheetsFolderCont = document.querySelector('.sheets-folder-cont');

sheetAddBtn.addEventListener('click',(e)=>{
    // create new sheet
    const sheet = document.createElement('div');
    sheet.setAttribute('class','sheet-folder');
    //each time we click we want to know id for this sheet
    let allSheetsFolder = document.querySelectorAll('.sheet-folder');
    sheet.setAttribute('id',allSheetsFolder.length);
    const sheetContent = document.createElement('div');
    sheetContent.setAttribute('class','sheet-content');
    sheetContent.setAttribute('id',allSheetsFolder.length)
    sheetContent.innerText = `Sheet - ${allSheetsFolder.length + 1}`;
    sheet.appendChild(sheetContent);
    sheetsFolderCont.appendChild(sheet);

    // on overflowing ,automatically scrolls to this;
    sheet.scrollIntoView();
    //create new sheetDB
    createSheetDB();    
    handleSheetActiveness(sheet);
    handleSheetRemoval(sheet);

    sheet.click();// after creating ,activate this sheet.
})

sheetAddBtn.click();//create first sheet

function createSheetDB(){
    let temp_sheetDB = [];
    for(let i = 0;i < rows;i++){
        let sheetRow = [];
        for(let j = 0;j < cols;j++){
            let cellProp = {
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
            sheetRow.push(cellProp);
        }
        temp_sheetDB.push(sheetRow);
    }
    collectedSheetDB.push(temp_sheetDB);
}
function handleSheetRemoval(sheet){
    sheet.addEventListener('mousedown',(e)=>{
        if(e.button <= 1)return;
        // right clicked;
        let response = confirm('Are you sure you want to delete the sheet ?');
        if(!response)return;
        let allSheetsFolder = document.querySelectorAll('.sheet-folder');
        if(allSheetsFolder.length === 1){
            alert('Atleast 1 Sheet is needed!!');
            return;
        }
        let id = Number(sheet.getAttribute('id'));
        //remove from database
        collectedSheetDB.splice(id,1);
        //remove from ui
        sheet.remove();
        // update the indexing;
        allSheetsFolder = document.querySelectorAll('.sheet-folder');
        allSheetsFolder.forEach((sheetFolder,index) => {
            sheetFolder.setAttribute('id',index);
            sheetFolder.querySelector('.sheet-content').innerText = `Sheet - ${index + 1}`;
        })
        allSheetsFolder[0].click();
    })
}
function handleSheetDB(sheetIdx){
    sheetDB = collectedSheetDB[sheetIdx];
}
function handleSheetCellProp(){
    for(let i = 0;i < rows;i++){
        for(let j = 0;j < cols;j++){
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            // click the cell to update ui
            cell.click();
        }
    }
    //click the first cell 
    document.querySelector('.cell').click();
}
function handleSheetUI(sheet){
    // change sheet selection UI
    let allSheetsFolder = document.querySelectorAll('.sheet-folder');
    allSheetsFolder.forEach((sheetFolder)=>{
        sheetFolder.style.backgroundColor = inactiveColor;
    })
    sheet.style.backgroundColor = activeColor;
}
function handleSheetActiveness(sheet){
    sheet.addEventListener('click',(e)=>{
        let sheetIdx = Number(sheet.getAttribute('id'));
        handleSheetDB(sheetIdx);
        handleSheetCellProp();
        handleSheetUI(sheet);
    })
}

