(function() {
	"use strict";


	ko.bindingHandlers.enterKey = {
		init: function(element, valueAccessor, allBindings, viewModel) {

			var handler = function(viewModel, event) {
					if (event.keyCode === 13) {

						//If not .call()ed, it simply returns function body
						valueAccessor().call(this);
					}
				},
				eventValueAccessor = function() {
					return {
						keyup: handler
					};
				};

			// Set event binding with value "keyup: handler". All four arguments must be passed
			ko.bindingHandlers.event.init(element, eventValueAccessor, allBindings, viewModel);
		}
	};

	ko.bindingHandlers.randomPlaceholder = {
		init: function(element, valueAccessor, allBindings, viewModel) {
			var placeholders = valueAccessor(),
				placeholder = function() {
					var number = Math.floor(Math.random() * placeholders.length);

					while (number === viewModel.placeholderNumber()) {
						number = Math.floor(Math.random() * placeholders.length);
					}

					viewModel.placeholderNumber(number);
					return ("ex. " + placeholders[number]);
				};

			element.setAttribute("placeholder", placeholder());
		}
	};

	ko.bindingHandlers.title = {
		init: function(element, valueAccessor) {
			var getDate = function() {
					return moment(valueAccessor()).fromNow();
				},
				setTitle = function() {
					element.setAttribute("title", getDate());
				},
				interval = setInterval(setTitle, 60000);

			setTitle();
		}
	};


	// Todo constructor
	var Todo = function(title, completed, date, viewModel) {

		// Variables
		this.title = ko.observable(title);
		this.completed = ko.observable(completed);
		this.date = date;

		// Computeds
		this.important = ko.computed(function() {
			return this.title()[this.title().length-1] === "!";
		}, this);
		this.trimmedTitle = ko.computed(function() {
			return this.title().substr(0, [this.title().length-1]);
		}, this);

		// Subscriptions
		this.important.subscribe(function(value) {
			if (value === false && viewModel.importantTodos.indexOf(this) > -1) {
				document.activeElement.blur();
				viewModel.regularTodos.push(this);
				viewModel.importantTodos.remove(this);
			}
			if (value === true && viewModel.regularTodos.indexOf(this) > -1) {
				document.activeElement.blur();
				viewModel.importantTodos.push(this);
				viewModel.regularTodos.remove(this);
			}
		}, this);

		// Delete self when all content of todo has been erased
		this.title.subscribe(function(value) {
			if (value === "") {
				document.activeElement.blur();
				viewModel.regularTodos.remove(this);
			}
		}, this);

		this.completed.subscribe(function() {
			if (this.important() === true) {
				viewModel.stats.completedImportant(viewModel.stats.completedImportant()+1);
			} else {
				viewModel.stats.completedRegular(viewModel.stats.completedRegular()+1);
			}
		}, this);
	};


	var ViewModel = function(savedTodos) {

		// Parses saved data from localStorage that populates storage array onload
		this.parseTodos = function(array) {
			var returnArray = [];

			for (var i = 0; i < array.length; i++) {
				returnArray.push(new Todo(array[i].title, array[i].completed, array[i].date || new Date(), this));
			}

			return returnArray;
		};

		// Main todo storage arrays. Populate with localStorage data
		this.regularTodos = ko.observableArray(this.parseTodos(savedTodos.regularTodos || []));
		this.importantTodos = ko.observableArray(this.parseTodos(savedTodos.importantTodos || []));

		// Completed todos storage arrays
		this.completedRegularTodos = ko.observableArray(this.parseTodos(savedTodos.completedRegularTodos || []));
		this.completedImportantTodos = ko.observableArray(this.parseTodos(savedTodos.completedImportantTodos || []));

		if (!savedTodos.stats) {
			savedTodos.stats = {};
		}
		this.placeholderNumber = ko.observable((savedTodos.placeholderNumber !== undefined) ? savedTodos.placeholderNumber : 0);

		// Storage object for stats on completed todos
		this.stats = {
			completedImportant: ko.observable(savedTodos.stats.completedImportant || 0),
			completedRegular: ko.observable(savedTodos.stats.completedRegular || 0)
		};

		this.stats.completed = ko.computed(function() {
			return this.stats.completedImportant() + this.stats.completedRegular();
		}, this);

		// Always current value in input
		this.inputValue = ko.observable("");

		this.completedImportantVisible = ko.observable(false);
		this.completedRegularVisible = ko.observable(false);

		// Metadata for the current list
		this.listName = ko.observable("Att göra");


		// Regulate showing of active vs completed tasks
		this.showing = ko.observable("active");
		this.showCompleted = function() {
			if (this.showing() === "active") {
				this.showing("completed");
				this.hideCompletedImportant();
				this.hideCompletedRegular();
			}
		};

		this.showActive = function() {
			this.showing("active");
		};


		this.add = function() {
			var input = this.inputValue().trim(),
				important = function() {
					return input[input.length-1] === "!";
				},
				todo = new Todo(input, false, new Date(), this);

			if (input) {
				if (important() === false) {
					this.regularTodos.push(todo);
				} else if (important() === true) {
					this.importantTodos.push(todo);
				}

				// Clear input element
				this.inputValue("");
			}
		};


		// Remove completed todos from their respective arrays
		this.hideCompletedImportant = function() {
			this.importantTodos.remove(function(todo) {
				return todo.completed() === true;
			});

			this.completedImportantVisible(false);
		};

		this.hideCompletedRegular = function() {
			this.regularTodos.remove(function(todo) {
				return todo.completed() === true;
			});

			this.completedRegularVisible(false);
		};

		// Empty arrays of completed todos
		this.clearCompletedImportant = function() {
			this.completedImportantTodos.removeAll();
		};

		this.clearCompletedRegular = function() {
			this.completedRegularTodos.removeAll();
		};


		this.complete = function(todo) {
			todo.completed(true);

			if (todo.important() === true) {
				viewModel.completedImportantVisible(true);
				viewModel.completedImportantTodos.push(todo);
			} else {
				viewModel.completedRegularVisible(true);
				viewModel.completedRegularTodos.push(todo);
			}
		};


		// Used in combination with randomPlaceholder bidning for setting a random placeholder
		this.placeholderTexts = [
			"sov en tupplur",
			"städa hela toan",
			"åka till ikea",
			"dricka kaffe!",
			"skriv dagboksinlägg"
		];

		// Save todos to localStorage. At most every half second
		if (Modernizr.localstorage) {
			ko.computed(function() {
				var importantTodosSave = ko.utils.arrayFilter(this.importantTodos(), function(todo) {
						if (todo.completed() === false) {
							return todo;
						}
					}),
					regularTodosSave = ko.utils.arrayFilter(this.regularTodos(), function(todo) {
						if (todo.completed() === false) {
							return todo;
						}
					}),

					todosSave = {
						placeholderNumber: this.placeholderNumber(),
						importantTodos: importantTodosSave,
						regularTodos: regularTodosSave,
						completedImportantTodos: this.completedImportantTodos(),
						completedRegularTodos: this.completedRegularTodos(),

						stats: {
							completedImportant: this.stats.completedImportant(),
							completedRegular: this.stats.completedRegular()
						}
					};

				localStorage.setItem("todos", ko.toJSON(todosSave));
			}, this).extend({
				throttle: 500
			});
		}

	};


	var savedTodos = (Modernizr.localstorage) ? ko.utils.parseJson(localStorage.getItem("todos")) || {} : {},
		viewModel = new ViewModel(savedTodos);

	ko.applyBindings(viewModel);

	Modernizr.load({
		test: "placeholder" in document.createElement("input"),
		nope: "scripts/vendor/placeholders.js"
	});

} ());