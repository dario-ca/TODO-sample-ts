var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Todo = (function (_super) {
    __extends(Todo, _super);
    function Todo() {
        _super.apply(this, arguments);
    }
    //defaults todo attributes
    Todo.prototype.defaults = function () {
        return { content: "empty todo...", done: false };
    };
    //be sure all todos have a content
    Todo.prototype.initialize = function () {
        if (!this.get("content")) {
            this.set({ "content": this.defaults().content });
        }
        ;
    };
    //toggle the done status of this todo
    Todo.prototype.toggle = function () {
        this.save({ done: !this.get("done") });
    };
    //remove todo
    Todo.prototype.clear = function () {
        this.destroy();
    };
    return Todo;
})(Backbone.Model);
//Collection of TODOs inserted
var Todolist = (function (_super) {
    __extends(Todolist, _super);
    function Todolist() {
        _super.apply(this, arguments);
        this.model = Todo;
        this.localStorage = new Store("todos-backbone");
    }
    //filter the done todos
    Todolist.prototype.done = function () {
        return this.filter(function (todo) { return todo.get("done"); });
    };
    //filter not finished items
    Todolist.prototype.remaining = function () {
        return this.without.apply(this, this.done());
    };
    Todolist.prototype.nextOrder = function () {
        if (!this.length)
            return 1;
        return this.last().get("order") + 1;
    };
    //sort todos by their insertion order
    Todolist.prototype.comparator = function (todo) {
        return todo.get("order");
    };
    return Todolist;
})(Backbone.Collection);
var Todos = new Todolist();
//# sourceMappingURL=app-model.js.map