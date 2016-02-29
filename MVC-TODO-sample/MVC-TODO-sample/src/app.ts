class AppView extends Backbone.View {
    events = {
        "keypress #new-todo-input": "createOnEnter",
        "keyup #new-todo-input": "showTooltip",
        "click .todo-clear a": "clearCompleted",
        "click .mark-all-done": "toggleAllComplete"
    }

    input: JQuery;
    allCheckbox: HTMLInputElement;
    statsTemplate: (params: any) => string;

    constructor() {
        super();

        this.setElement($("#todoapp"), true);

        _.bindAll(this, 'addOne', 'addAll', 'render', 'toggleAllComplete');

        this.input = this.$("#new-todo-input");
        this.allCheckbox = this.$(".mark-all-done")[0];
        this.statsTemplate = _.template($('#stats-template').html());

        Todos.bind('add', this.addOne);
        Todos.bind('reset', this.addAll);
        Todos.bind('all', this.render);

        Todos.fetch();
    }

    render() {
        var done = Todos.done().length;
        var remaining = Todos.remaining().length;

        this.$('#todo-stats').html(this.statsTemplate({
            total: Todos.length,
            done: done,
            remaining: remaining
        }));

        this.allCheckbox.checked = !remaining;
    }

    addOne(todo) {
        var view = new TodoView({ model: todo });
        this.$("#todo-list").append(view.render().el);
    }

    addAll() {
        Todos.each(this.addOne);
    }

    newAttributes() {
        return {
            content: this.input.val(),
            order: Todos.nextOrder(),
            done: false
        };
    }

    createOnEnter(e) {
        if (e.keyCode != 13) return;
        Todos.create(this.newAttributes());
        this.input.val('');
    }

    clearCompleted() {
        _.each(Todos.done(), todo => todo.clear());
        return false;
    }

    tooltipTimeout: number = null;

    showTooltip(e) {
        var tooltip = $(".ui-tooltip-top");
        var val = this.input.val();
        tooltip.fadeOut();
        if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
        if (val == '' || val == this.input.attr('placeholder')) return;
        this.tooltipTimeout = _.delay(() => tooltip.show().fadeIn(), 1000);
    }

    toggleAllComplete() {
        var done = this.allCheckbox.checked;
        Todos.each(todo => todo.save({ 'done': done }));
    }
}

    $(() => {
        new AppView();
    });