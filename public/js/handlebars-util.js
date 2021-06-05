window.addEventListener('DOMContentLoaded', function() {
    // {{#xIf list.length '>' 0 '&&' public '==' true}} <p>condition satisfied</p>{{/xIf}}
    Handlebars.registerHelper('xIf', function (v1,o1,v2,mainOperator,v3,o2,v4,options) {
        let operators = {
            '==': function(a, b){ return a==b},
            '===': function(a, b){ return a===b},
            '!=': function(a, b){ return a!=b},
            '!==': function(a, b){ return a!==b},
            '<': function(a, b){ return a<b},
            '<=': function(a, b){ return a<=b},
            '>': function(a, b){ return a>b},
            '>=': function(a, b){ return a>=b},
            '&&': function(a, b){ return a&&b},
            '||': function(a, b){ return a||b},
          }
        let a1 = operators[o1](v1,v2);
        let a2 = operators[o2](v3,v4);
        let isTrue = operators[mainOperator](a1, a2);
        return isTrue ? options.fn(this) : options.inverse(this);
    });
});