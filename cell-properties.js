let sheetDB = [];
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
            children:[]
        }
        sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}
const activeColor = "#c8d6e5";
const inactiveColor = "#f1f2f6";

// Application of two way binding (changing both storage and UI)
const bold = document.querySelector('.bold');
const italic = document.querySelector('.italic');
const underline = document.querySelector('.underline');
const fontSize = document.querySelector('.font-size-prop');
const fontFamily = document.querySelector('.font-family-prop');
const fontColor = document.querySelector('.font-color-prop');
const backgroundColor = document.querySelector('.background-color-prop');
const alignments = document.querySelectorAll('.alignment');
const leftAlign = alignments[0];
const centerAlign = alignments[1];
const rightAlign = alignments[2];
let formulaBar = document.querySelector('.formula-bar');

const cells = document.querySelectorAll('.cell');

// Text events
bold.addEventListener('click',(e)=>{
    //array is passed as referrence;
    let [cell,cellprop] = getCellAndCellProps(addressBar.value);
    
    //change in storage
    cellprop.bold = !cellprop.bold;
    //change in ui
    cell.style.fontWeight = cellprop.bold?"bold":"normal";//font change
    bold.style.backgroundColor = cellprop.bold?activeColor:inactiveColor;//bold button
})
italic.addEventListener('click',(e)=>{
    let [cell,cellprop] = getCellAndCellProps(addressBar.value);
    
    //change in storage
    cellprop.italic = !cellprop.italic;
    //change in ui
    cell.style.fontStyle = cellprop.italic?"italic":"normal";//font change
    italic.style.backgroundColor = cellprop.italic?activeColor:inactiveColor;//italic button
})
underline.addEventListener('click',(e)=>{
    let [cell,cellprop] = getCellAndCellProps(addressBar.value);
    
    //change in storage
    cellprop.underline = !cellprop.underline;
    //change in ui
    cell.style.textDecoration = cellprop.underline?"underline":"none";//font change
    underline.style.backgroundColor = cellprop.underline?activeColor:inactiveColor;//underline button
})

//font events
fontFamily.addEventListener('change',(e)=>{
    let [cell,cellprop] = getCellAndCellProps(addressBar.value);

    let selectedFont = e.target.value;
    cellprop.fontFamily = selectedFont;
    cell.style.fontFamily = selectedFont;
})
fontSize.addEventListener('change',(e) => {
    let [cell,cellprop] = getCellAndCellProps(addressBar.value);

    let selectedSize = e.target.value;
    cellprop.fontSize = selectedSize ;
    cell.style.fontSize = selectedSize + "px";
})

//color events
fontColor.addEventListener('change',(e) => {
    let [cell,cellprop] = getCellAndCellProps(addressBar.value);

    let selectedColor = e.target.value;
    cellprop.fontColor = selectedColor;
    cell.style.color = selectedColor;
})
backgroundColor.addEventListener('change',(e) => {
    let [cell,cellprop] = getCellAndCellProps(addressBar.value);

    let selectedColor = e.target.value;
    cellprop.backgroundColor = selectedColor;
    cell.style.backgroundColor = selectedColor;
})

//Alignment events
alignments.forEach((alignment) => {
    alignment.addEventListener('click',(e) => {
        let [cell,cellprop] = getCellAndCellProps(addressBar.value);

        let to_align = e.target.classList[1];
        switch(to_align){
            case "left":
                //change in storage
                cellprop.alignment = to_align;
                //change in ui
                cell.style.textAlign = to_align;
                //change in ui
                leftAlign.style.backgroundColor = activeColor;
                centerAlign.style.backgroundColor = inactiveColor;
                rightAlign.style.backgroundColor = inactiveColor;
                break;
            case "center":
                //change in storage
                cellprop.alignment = to_align;
                //change in ui
                cell.style.textAlign = to_align;
                //change in ui
                leftAlign.style.backgroundColor = inactiveColor;
                centerAlign.style.backgroundColor = activeColor;
                rightAlign.style.backgroundColor = inactiveColor;
                break;
            case "right":
                //change in storage
                cellprop.alignment = to_align;
                //change in ui
                cell.style.textAlign = to_align;
                //change in ui
                leftAlign.style.backgroundColor = inactiveColor;
                centerAlign.style.backgroundColor = inactiveColor;
                rightAlign.style.backgroundColor = activeColor;
                break;
        }
    })
})
//attach event listener for clicking each cell.
cells.forEach((cell)=>{
    attachEventListenerToAll(cell);
})

function attachEventListenerToAll(cell){
    cell.addEventListener('click',(e) => {
        let [cell,cellprop] = getCellAndCellProps(addressBar.value);
        // change in ui(1);
        cell.style.fontWeight = cellprop.bold?"bold":"normal";//font change
        cell.style.fontStyle = cellprop.italic?"italic":"normal";//font change
        cell.style.textDecoration = cellprop.underline?"underline":"none";//font change
        cell.style.fontFamily = cellprop.fontFamily;
        cell.style.fontSize = cellprop.fontSize + "px";
        cell.style.color = cellprop.color;
        cell.style.backgroundColor = cellprop.backgroundColor;

        //change in ui container
        bold.style.backgroundColor = cellprop.bold?activeColor:inactiveColor;//bold button
        italic.style.backgroundColor = cellprop.italic?activeColor:inactiveColor;//italic button
        underline.style.backgroundColor = cellprop.underline?activeColor:inactiveColor;//underline button
        fontFamily.value = cellprop.fontFamily;
        fontSize.value = cellprop.fontSize;
        formulaBar.value = cellprop.formula;
        switch(cellprop.alignment){
            case "left":
                //change in ui
                cell.style.textAlign = cellprop.alignment;
                //change in ui
                leftAlign.style.backgroundColor = activeColor;
                centerAlign.style.backgroundColor = inactiveColor;
                rightAlign.style.backgroundColor = inactiveColor;
                break;
            case "center":
                
                //change in ui
                cell.style.textAlign = cellprop.alignment;
                //change in ui
                leftAlign.style.backgroundColor = inactiveColor;
                centerAlign.style.backgroundColor = activeColor;
                rightAlign.style.backgroundColor = inactiveColor;
                break;
            case "right":
                
                //change in ui
                cell.style.textAlign = cellprop.alignment;
                //change in ui
                leftAlign.style.backgroundColor = inactiveColor;
                centerAlign.style.backgroundColor = inactiveColor;
                rightAlign.style.backgroundColor = activeColor;
                break;
        }
    })
}
function getCellAndCellProps(address){
    let [rid,cid] = decode_RID_CID(address);
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellprop = sheetDB[rid][cid];
    return [cell,cellprop]
}

function decode_RID_CID(pos){
    let rid = Number(pos[1]) - 1;
    let cid = pos.charCodeAt(0) - 65;
    return [rid,cid];
}