$(document).ready(() => {
  $('#text').on('keyup', (event) => {
    $('.preview').html($(event.currentTarget).val());
  });
  $('#font').on('change', (event) => {
    $('.preview').css('font-family', $(event.currentTarget).val());
  });
  $('#lines').on('change', (event) => {
    $('.preview').css('text-decoration', $(event.currentTarget).val());
  });
  $('#line-style').on('change', (event) => {
    $('.preview').css('text-decoration-style', $(event.currentTarget).val());
  });
  $("#weight").change(function(){
    if($(this).is(":checked")){
        $('.preview').addClass("bold"); 
    }else{
        $('.preview').removeClass("bold");  
    }
  });
  $("#style").change(function(){
    if($(this).is(":checked")){
        $('.preview').addClass("italics"); 
    }else{
        $('.preview').removeClass("italics");  
    }
  });
  $("#variant").change(function(){
    if($(this).is(":checked")){
        $('.preview').addClass("variant"); 
    }else{
        $('.preview').removeClass("variant");  
    }
  });
  $('#size').on('keyup', (event) => {
    let fontSize = $(event.currentTarget).val() +'px';
    $('.preview').css('font-size', fontSize);
  });
  if($("#lines").attr('text-decoration') !== "initial"){
    $("#lines").removeClass('hidden-stuff')
  }
});
