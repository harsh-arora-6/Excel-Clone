
const sheetAddBtn = document.querySelector('.sheet-add-icon');
const sheetsFolderCont = document.querySelector('.sheets-folder-cont');
let sheetNumber = 1;
sheetAddBtn.addEventListener('click',(e)=>{
    // create new sheet
    const sheet = document.createElement('div');
    sheet.setAttribute('class','sheet-folder');
    //each time we click we want to know id for this sheet
    let allSheetsFolder = document.querySelectorAll('.sheet-folder');
    sheet.setAttribute('id',allSheetsFolder.length);
    const sheetContent = document.createElement('textarea');
    sheetContent.setAttribute('class','sheet-content');
    sheetContent.setAttribute('id',allSheetsFolder.length)
    sheetContent.setAttribute('spellcheck',false);
    sheetContent.setAttribute('readonly',true);
    sheetContent.setAttribute('editedbyuser',false);
    sheetContent.innerText = `Sheet-${sheetNumber++}`;
    sheet.appendChild(sheetContent);
    sheetsFolderCont.appendChild(sheet);

    // on overflowing ,automatically scrolls to this;
    sheet.scrollIntoView();
    //create new sheetDB
    createSheetDB();    
    handleSheetActiveness(sheet);
    handleSheetRemoval(sheet);
    handleSheetRenaming(sheet);
    sheet.click();// after creating ,activate this sheet.
})

sheetAddBtn.click();//create first sheet
// sheet name edited by user won't be affected by this function.
function handleSheetRenaming(sheet){
    let sheetContent = sheet.children[0];
    // double click to rename a file
    sheetContent.addEventListener('dblclick',(e)=>{
        sheetContent.removeAttribute('readonly');
        sheetContent.setAttribute('editedbyuser',true);// marking if name was edited by user.
    })
    
    // after renaming make the sheet name readonly
    sheetContent.addEventListener('blur',(e)=>{
        sheetContent.setAttribute('readonly',true);
        // if current sheet edited , then renaming of all sheets are done
        let currentSheetNameEdited = sheetContent.getAttribute('editedbyuser');
        if(currentSheetNameEdited === "false")return;
        let allSheetsFolder = document.querySelectorAll('.sheet-folder');
        sheetNumber = 1;
        allSheetsFolder.forEach((sheetFolder,index) => {
            let sheetContent = sheetFolder.querySelector('.sheet-content');
            let edited = sheetContent.getAttribute('editedbyuser');
            if(edited === "false")sheetContent.value = `Sheet-${sheetNumber++}`;
        })
    })

}
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
        // update the indexing and naming.
        allSheetsFolder = document.querySelectorAll('.sheet-folder');
        sheetNumber = 1;
        allSheetsFolder.forEach((sheetFolder,index) => {
            sheetFolder.setAttribute('id',index);
            let sheetContent = sheetFolder.querySelector('.sheet-content');
            let edited = sheetContent.getAttribute('editedbyuser');
            if(edited === "false")sheetContent.value = `Sheet-${sheetNumber++}`;
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
        sheetFolder.children[0].classList.remove('active');
    })
    sheet.children[0].classList.add('active')
}
function handleSheetActiveness(sheet){
    sheet.addEventListener('click',(e)=>{
        let sheetIdx = Number(sheet.getAttribute('id'));
        handleSheetDB(sheetIdx);
        handleSheetCellProp();
        handleSheetUI(sheet);
    })
}

