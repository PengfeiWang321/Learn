//512考试网试题获取
var str = "";
var questionSuffix = ["A", "B", "C", "D", "E", "F"];
$.each($(".ques-container"), function (index, ques) {
    var title = $(ques).find(".ques-content p").text();
    str += (index + 1) + "." + title + "\n";
    var options = $(ques).find(".option-content p");
    var answer = $(ques).find(".ques-standard-answer span").text();
    options.each(function (index, option) {
        str += questionSuffix[index] + ":" + $(option).text() + "\n";
    });
    str += "参考答案:" + answer + "\n";
    options.each(function (index, option) {
        if (answer.indexOf(questionSuffix[index]) != -1) {
            str += $(option).text() + "\n";
        }
    });

});
console.info(str);

var concantQuestion = {};
$.get({
    url: "https://api.512ks.cn/server/myOnlineExamRecDetails?onlineExamRecId=138668",
    headers: {
        Authorization: "Bearer 76609f6c-e86f-4b89-8716-8cb50e27be9b",
        KyeeNecCode: "mulkc26p4so"
    }
}, function (data) {
    $.each(data.paper.parts, function (index, part) {
        $.each(part.qusList, function (index, qus) {
            var quesion = {
                id: qus.question.id,
                title: qus.question.qusContent.qusStem
            };
            quesion.options = [];
            if (qus.question && qus.question.qusContent && qus.question.qusContent.options) {
                $.each(qus.question.qusContent.options, function (index, option) {
                    quesion.options.push({
                        id: option.id,
                        content: option.content,
                        isRight: (qus.question.qusContent.answer.indexOf(option.id) != -1)
                    });
                });
            }
            concantQuestion[qus.id] = quesion;
        });
    });
    console.info(concantQuestion);
});