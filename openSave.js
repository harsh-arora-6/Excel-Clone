
let downloadBtn = document.querySelector('.download');
let uploadBtn = document.querySelector('.upload');

downloadBtn.addEventListener('click',(e)=>{
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sheetDB));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", 'sheetData' + ".json");
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
});

uploadBtn.addEventListener('click',(e)=>{
    //reading local text file using js
    let input = document.createElement('input');
    input.setAttribute('type','file');
    input.click();
    input.addEventListener('change',(e)=>{
        var fr=new FileReader();
        
        fr.addEventListener('load',function(){
            sheetAddBtn.click();
            collectedSheetDB[collectedSheetDB.length - 1] = JSON.parse(fr.result);
            sheetDB = collectedSheetDB[collectedSheetDB.length - 1];
            handleSheetCellProp();
        })
        fr.readAsText(input.files[0]);
        
    })
})