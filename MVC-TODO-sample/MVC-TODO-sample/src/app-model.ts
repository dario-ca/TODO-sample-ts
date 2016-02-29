
class Todo extends Backbone.Model {

    //defaults todo attributes
    defaults() {
        return { content: "empty todo...", done: false };
    }

    //be sure all todos have a content
    initialize() {
        if (!this.get("content")) {
            this.set({ "content": this.defaults().content });
        };
    }

    //toggle the done status of this todo
    toggle() {
        this.save({ done: !this.get("done") });
    }

    //remove todo
    clear() {
        this.destroy();
    }
}

//Collection of TODOs inserted
class Todolist extends Backbone.Collection<Todo> {
    model = Todo;

    localStorage = new Store("todos-backbone");

    //filter the done todos
    done() {
        return this.filter(todo => todo.get("done"));
    }

    //filter not finished items
    remaining() {
        return this.without.apply(this, this.done());
    }

    nextOrder() {
        if (!this.length) return 1;
        return this.last().get("order") + 1;
    }

    //sort todos by their insertion order
    
    comparator(todo: Todo) {
        return todo.get("order");
    }

}

var Todos = new Todolist();