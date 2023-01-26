for(let i = 0;i < rows;i++){
    for(let j = 0;j < cols;j++){
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        // when you move out of current cell
        cell.addEventListener('blur',(e)=>{
            let currentCellAddr = addressBar.value;
            let [cell,cellProp] = getCellAndCellProps(currentCellAddr);
            let enteredData = cell.innerText;
            // triple equal to will produce different result in case a cell value is evaluated using eval 
            // so after evaluation when we come back to a cell and then again move out then in blur event these two will become unequal hence formula will be reset.
            // console.log(typeof(cellProp.value),typeof(enteredData)); first one is number , second is string 
            if(cellProp.value == enteredData)return;
            removeChildFromParents(cellProp.formula,currentCellAddr);
            // console.log('blur event: ',enteredData,cell);
            storeValueAndFormula(enteredData,"",currentCellAddr);
            updateChildrenCells(currentCellAddr);
        })
    }
}


formulaBar.addEventListener('keydown',async (e)=>{
    let inputFormula = formulaBar.value;
    if(e.key === 'Enter' && inputFormula){
        let [cell,cellProp] = getCellAndCellProps(addressBar.value);
        if(inputFormula !== cellProp.formula){
            //remove from previous graph
            //If previous formula was there, then remove previous graph edges;
            if(cellProp.formula !== "")removeChildFromParents(cellProp.formula,addressBar.value);
            // add child to graph
            addChildToParent(inputFormula,addressBar.value);

            //check for cycle
            let cycle = checkCycle();
            // console.log('cell : ',cell);
            // console.log(isCyclic);
            if(cycle){
                let response = confirm('Your Formula is Cyclic. Do you want to trace it ?');
                while(response === true){
                    await traceCycle(cycle[0],cycle[1]);
                    response = confirm('Your Formula is Cyclic. Do you want to trace it ?');
                }
                removeChildFromParents(inputFormula,addressBar.value);
                return;
            }

            //evaluate new formula
            let evaluatedValue = evaluate(inputFormula);
            //change the value and formula
            storeValueAndFormula(evaluatedValue,inputFormula,addressBar.value);
            //change values for children
            updateChildrenCells(addressBar.value);
        }
        
    }
})

function evaluate(formula){
    let encodedFormula = formula.split(' ');
    for(let i = 1;i < encodedFormula.length;i++){
        if('A' <= encodedFormula[i][0] && encodedFormula[i][1] <= 'Z'){
            let [cell,cellProp] = getCellAndCellProps(encodedFormula[i]);
            encodedFormula[i] = cellProp.value;
        }
    }
    let decodedFormula = encodedFormula.join(' ');
    // This will return data type of Number that is why we used '==' instead of ' === ' in blur event.
    return eval(decodedFormula);
}
function addChildToParent(formula,currentCellAddr){
    let encodedFormula = formula.split(' ');
    for(let i = 1;i < encodedFormula.length;i++){
        if('A' <= encodedFormula[i][0] && encodedFormula[i][1] <= 'Z'){
            let [parentCell,parentCellProp] = getCellAndCellProps(encodedFormula[i])
            parentCellProp.children.push(currentCellAddr);
            let [cell,cellProp] = getCellAndCellProps(currentCellAddr);
            cellProp.indeg++;
        }
    }
}
//remove cell from previous parent's children array
function removeChildFromParents(formula,currentCellAddr){
    let encodedFormula = formula.split(' ');
    for(let i = 1;i < encodedFormula.length;i++){
        if('A' <= encodedFormula[i][0] && encodedFormula[i][1] <= 'Z'){
            let [parentCell,parentCellProp] = getCellAndCellProps(encodedFormula[i])
            let childIdx = parentCellProp.children.indexOf(currentCellAddr);
            parentCellProp.children.splice(childIdx,1);
            let [cell,cellProp] = getCellAndCellProps(currentCellAddr);
            cellProp.indeg--;
        }
    }
}
// store the formula and the evaluated value
function storeValueAndFormula(value,formula,currentCellAddr){
    let [cell,cellProp] = getCellAndCellProps(currentCellAddr);
    cellProp.value = value;
    cellProp.formula = formula;

    cell.innerText = value;
}

function updateChildrenCells(currentCellAddr){
    let [cell,cellProp] = getCellAndCellProps(currentCellAddr);
    let children = cellProp.children;

    for(let i = 0;i < children.length;i++){
        let childAddress = children[i]
        let [childCell,childCellProp] = getCellAndCellProps(childAddress);
        let childFormula = childCellProp.formula;
        let evaluatedValue = evaluate(childFormula);
        storeValueAndFormula(evaluatedValue,childFormula,childAddress);
        updateChildrenCells(childAddress);
    }

}