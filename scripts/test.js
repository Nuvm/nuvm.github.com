var clickedTiles = [];
var resetStatus;
var selectedColor = 'whitesmoke';
var o = true;
function onLoad(){
  for(e=0;e<25;e++){
    for(i=0;i<25;i++){
      $('#tileContainer').append('<div id='+'tile'+(i+e*25)+' class="tile" style="top:-50px;left:-50px;"></div>');
      $('#tile'+(i+e*25)).css("top",(i*20)+4+'px');
      $('#tile'+(i+e*25)).css("left",(e*20)+4+'px');
    }
  }
}
var isReady = setInterval(function(){if(document.readyState==='complete')onReady();},200);
function onReady(){
  clearInterval(isReady);
  document.getElementById('tileContainer').addEventListener('click',tileClick);
}
function tileClick(e){
  if(e.target.id!=='tileContainer'&&e.target.id.slice(0,4)==='tile'&&clickedTiles.indexOf(e.target.id)===-1){
    $('#'+e.target.id).css("border","1px solid whitesmoke");
    $('#'+e.target.id).css("background-color",selectedColor);
    clickedTiles.push(e.target.id);
  }
}
function workSave(){
  localStorage.setItem("tileDraw",JSON.stringify(clickedTiles));
  clearTimeout(resetStatus);
  document.getElementById('saveStatus').innerHTML = 'Saved!';
  resetStatus = setTimeout(statusReset,4000);
}
function workLoad(){
  var toGet = JSON.parse(localStorage.tileDraw);
  clickedTiles = [];
  for(i=0;i<625;i++){
    $('#tile'+i).remove();
  }
  document.getElementById('tileContainer').removeEventListener('click',tileClick);
  setTimeout(onLoad,200);
  setTimeout(onReady,400);
  setTimeout(function(){for(i=0;i<toGet.length;i++){$('#'+toGet[i]).click();clickedTiles.push(toGet[i]);}},600);
  clearTimeout(resetStatus);
  document.getElementById('saveStatus').innerHTML = 'Loaded!';
  resetStatus = setTimeout(statusReset,4000);
}
function workReset(){
  if(confirm("Are you sure to reset your work?")){
    clickedTiles = [];
    for(i=0;i<625;i++){
      $('#tile'+i).remove();
    }
    document.getElementById('tileContainer').removeEventListener('click',tileClick);
    setTimeout(onLoad,200);
    setTimeout(onReady,400);
    clearTimeout(resetStatus);
    setTimeout(function(){document.getElementById('saveStatus').innerHTML= 'Reset.';},500);
    document.getElementById('saveStatus').innerHTML = 'Resetting...';
    resetStatus = setTimeout(statusReset,4500);
  }
}
function statusReset(){
  document.getElementById('saveStatus').innerHTML = '';
}
function colorSelect(e){
  selectedColor = e;
  $('#colorSelectorSelected').css("background-color",e);
}
/*function colorEraser(){
  if(o){
    document.getElementById('tileContainer').removeEventListener('click',tileClick);
    document.getElementById('tileContainer').addEventListener('click',tileRemove);
    o = false;
  } else {
    document.getElementById('tileContainer').removeEventListener('click',tileRemove);
    document.getElementById('tileContainer').addEventListener('click',tileClick);
    o = true;
  }
}
function tileRemove(e){
  var oTop = $('#'+e.target.id).css("top");
  var oLeft = $('#'+e.target.id).css("left");
  $('#'+e.target.id).remove();
  clickedTiles[e.target.id.slice(4,7)].pop();
  $('#tileContainer').append('<div id='+e.target.id+' class="tile" style="top:-50px;left:-50px;"></div>');
  $('#'+e.target.id).css("top",oTop);
  $('#'+e.target.id).css("left",oLeft);
  $('#'+e.target.id).on("hover",)
}*/
