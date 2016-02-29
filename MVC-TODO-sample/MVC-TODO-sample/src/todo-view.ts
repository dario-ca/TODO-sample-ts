//this is the DOM element for a todo item
class TodoView extends Backbone.View {
    template: (data: any) => string;

    model: Todo;
    input: JQuery;

    constructor(options?) {
        this.tagName = "li";

        this.events = {
            "click.check": "toggleDone",
            "dblclick label.todo-content": "edit",
            "click span.todo-destroy": "clear",
            "keypress .todo-input": "updateOnEnter",
            "blur .todo-input": "close"
        }

        super(options);

        this.template = _.template($('#item-template').html());

        _.bindAll(this, 'render', 'close', 'remove');
        this.model.bind('change', this.render);
        this.model.bind('destroy', this.remove);

    }

    render() {
        this.$el.html(this.template(this.model.toJSON()));
        this.input = this.$('.todo-input');
        return this;
    }

    toggleDone() {
        this.model.toggle();
    }

    edit() {
        this.$el.addClass("editing");
        this.input.focus();
    }

    close() {
        this.model.save({ content: this.input.val() });
        this.$el.removeClass("editing");
    }

    updateOnEnter(e) {
        if (e.keycode == 13) close();
    }

    clear() {
        this.model.clear();
    }
}  