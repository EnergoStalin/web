var list = $(document).find("div.task-container");

for(let o in list)
{
    $(o).find("div.answers-container").each(function() {
        let answers = $(this).find("span.answer");
        if(answers.length == 3)
        {
            $(answers[0]).text($(answers[1]).text());
            $(answers[2]).text(1);
        }
        else if(answers.length == 4)
        {
            if(Number.isInteger(parseInt($(answers[2]).text(),10)))
            {
                $(answers[0]).text($(answers[1]).text());
                $(answers[2]).text($(answers[3]).text());
            }
            else
            {
                $(answers[0]).text($(answers[Math.round(Math.random())+1]).text());
                $(answers[3]).text(1);
            }
        }
        $(answers[0]).css({color:"green"});
    });
}
//Broke style will fix later(maby)
//let last = $(list[list.length-1]).text().split(' ');
//list[list.length-1].innerHTML = (last[0] + ' ' + last[1] + ' ' + last[4] + ' ' + last[3] + ' ' + last[4]);
alert("Dont forget manual change total points count.");