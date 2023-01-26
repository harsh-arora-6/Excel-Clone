const rows = 100,cols = 26;
const addressColCont = document.querySelector('.address-col-cont');
const addressRowCont = document.querySelector('.address-row-cont');
const cellsCont = document.querySelector('.cells-cont');
const addressBar = document.querySelector('.address-bar');

for(let i = 0;i < rows;i++){
    let addressCol = document.createElement("div");
    addressCol.innerText = i + 1;
    addressCol.setAttribute('class','address-col');
    addressColCont.appendChild(addressCol);
}

for(let i = 0;i < cols;i++){
    let addressRow = document.createElement("div");
    addressRow.innerText = String.fromCharCode(65 + i);
    addressRow.setAttribute('class','address-row');
    addressRowCont.appendChild(addressRow);
}

for(let i = 0;i < rows;i++){
    let rowElem = document.createElement("div");
    rowElem.setAttribute('class','row-cont');
    for(let j = 0;j < cols;j++){
        let colElem = document.createElement("div");
        colElem.setAttribute('class','cell');
        colElem.setAttribute('contenteditable',true);
        colElem.setAttribute('spellcheck',false);
        // Attributes for cell identification
        colElem.setAttribute('rid',`${i}`);
        colElem.setAttribute('cid',`${j}`);
        colElem.addEventListener('click',(e)=>{
            const rowNum = i + 1;
            const colNum = String.fromCharCode(65 + j);
            addressBar.value = `${colNum}${rowNum}`
        })
        rowElem.appendChild(colElem);
    }
    cellsCont.appendChild(rowElem);
}