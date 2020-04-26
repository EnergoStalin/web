var successData = [];
var tdindex = 0;
var list = $("table#list").find("tr").each(function(){
    tdindex = 0;
    $(this).find("td:nth-child(3)").nextAll().each(function() {
        if($(this).hasClass("success"))
        {
           successData[tdindex] = ($(this).text());
        }
        tdindex++;
    });
});
var tr = $("table#list").find("tr:nth-child(3)");
var td = $(tr).find("td:nth-child(3)");
$(tr).find("td:nth-child(3)").text(successData.reduce((a,b) => parseInt(a,10)+parseInt(b,10),0));
var index = 0;
$(td).nextAll().each(function() {
    if(index+1 <= successData.length)
    {
        $(this).removeClass().addClass("success").text(successData[index++]);
    }
})
console.log(successData);
