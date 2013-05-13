"use strict"

ko.bindingHandlers.enterKey =
	init: (element, valueAccessor, allBindings, viewModel) ->
		handler = (viewModel, event) ->
			if event.keyCode == 13
				valueAccessor().call(this)
			return

		eventValueAccessor = ->
			keyup: handler

		ko.bindingHandlers.event.init(element, eventValueAccessor, allBindings, viewModel)


ko.bindingHandlers.randomPlaceholder =
	init: (element, valueAccessor, allBindings, viewModel) ->
		placeholders = valueAccessor()
		placeholder = ->
			number = Math.floor(Math.random() * placeholders.length)

			while (number == viewModel.placeholderNumber())
				number = Math.floor(Math.random() * placeholders.length)

			viewModel.placeholderNumber(number)
			"ex. #{placeholders[number]}"

		element.setAttribute("placeholder", placeholder())

ko.bindingHandlers.title =
	init: (element, valueAccessor) ->
		getDate = ->
			moment(valueAccessor()).fromNow()

		setTitle = ->
			element.setAttribute("title", getDate())

		interval = setInterval(setTitle, 60000)

		setTitle()



Todo = (title, completed, date, viewModel) ->
	@title = ko.observable(title)
	@completed = ko.observable(completed)
	@date = date

	@important = ko.computed(->
		@title()[@title().length - 1] == "!"
	, @)
	@trimmedTitle = ko.computed(->
		@title().substr(0, [@title().length - 1])
	, @)

	@important.subscribe((value) ->
		if (value == false and viewModel.importantTodos.indexOf(@) > -1)
			document.activeElement.blur()
			viewModel.regularTodos.push(@)
			viewModel.importantTodos.remove(@)

		if (value == true and viewModel.regularTodos.indexOf(@) > -1)
			document.activeElement.blur()
			viewModel.importantTodos.push(@)
			viewModel.regularTodos.remove(@)
	, @)

	@title.subscribe((value) ->
		if (value == "")
			document.activeElement.blur()
			viewModel.regularTodos.remove(@)
	, @)

	@completed.subscribe((value) ->
		if @important() == true
			viewModel.stats.completedImportant(viewModel.stats.completedImportant() + 1)
		else
			viewModel.stats.completedRegular(viewModel.stats.completedRegular() + 1)
	, @)

	return



ViewModel = (savedTodos) ->

	# Parses saved data from localStorage that populates storage array onload
	@parseTodos = (array) ->
		returnArray = []

		for todo in array
			returnArray.push(new Todo(todo.title, todo.completed, todo.date ? new Date(), @))

		returnArray

	# Main todo storage arrays. Populate with localStorage data
	@regularTodos = ko.observableArray(@parseTodos(savedTodos.regularTodos ? []))
	@importantTodos = ko.observableArray(@parseTodos(savedTodos.importantTodos ? []))

	# Completed todos storage arrays
	@completedRegularTodos = ko.observableArray(@parseTodos(savedTodos.completedRegularTodos ? []))
	@completedImportantTodos = ko.observableArray(@parseTodos(savedTodos.completedImportantTodos ? []))

	savedTodos.stats = {} unless savedTodos.stats

	@placeholderNumber = ko.observable(savedTodos.placeholderNumber ? 0)

	# Storage object for stats on completed todos
	@stats =
		completedImportant: ko.observable(savedTodos.stats.completedImportant || 0)
		completedRegular: ko.observable(savedTodos.stats.completedRegular || 0)

	@stats.completed = ko.computed(->
		@stats.completedImportant() + @stats.completedRegular()
	, @)

	# Always current value in input
	@inputValue = ko.observable("")

	@completedImportantVisible = ko.observable(false)
	@completedRegularVisible = ko.observable(false)


	# Regulate showing of active vs completed tasks
	@showing = ko.observable("active")
	@showCompleted = ->
		if (@showing() == "active")
			@showing("completed")
			@hideCompletedImportant()
			@hideCompletedRegular()

	@showActive = ->
		@showing("active")


	@add = ->
		input = @inputValue().trim()
		important = ->
			input[input.length - 1] == "!"
		todo = new Todo(input, false, new Date(), @)

		if (input)
			if (important() == false)
				@regularTodos.push(todo)
			else
				@importantTodos.push(todo)

		@inputValue("")


	@hideCompletedImportant = ->
		@importantTodos.remove((todo) ->
			todo.completed() == true
		)

		@completedImportantVisible(false)

	@hideCompletedRegular = ->
		@regularTodos.remove((todo) ->
			todo.completed() == true
		)

		@completedRegularVisible(false)

	# Empty arrays of completed todos
	@clearCompletedImportant = ->
		@completedImportantTodos.removeAll()

	@clearCompletedRegular = ->
		@completedRegularTodos.removeAll()


	@complete = (todo) ->
		todo.completed(true)

		if (todo.important() == true)
			viewModel.completedImportantVisible(true)
			viewModel.completedImportantTodos.push(todo)
		else
			viewModel.completedRegularVisible(true)
			viewModel.completedRegularTodos.push(todo)

		return


	# Used in combination with randomPlaceholder bidning for setting a random placeholder
	@placeholderTexts = [
		"sov en tupplur"
		"städa hela toan"
		"åka till ikea"
		"dricka kaffe!"
		"skriv dagboksinlägg"
	]


	# Save todos to localStorage. At most every half second
	if (Modernizr.localstorage)
		ko.computed(->
			importantTodosSave = ko.utils.arrayFilter(@importantTodos(), (todo) ->
				if (todo.completed() == false)
					todo
			)
			regularTodosSave = ko.utils.arrayFilter(@regularTodos(), (todo) ->
				if (todo.completed() == false)
					todo
			)

			todosSave =
				placeholderNumber: @placeholderNumber()
				importantTodos: importantTodosSave
				regularTodos: regularTodosSave
				completedImportantTodos: @completedImportantTodos()
				completedRegularTodos: @completedRegularTodos()

				stats:
					completedImportant: @stats.completedImportant()
					completedRegular: @stats.completedRegular()

			localStorage.setItem("todos", ko.toJSON(todosSave))
			return


		, @).extend(throttle: 500)

	return


savedTodos = ko.utils.parseJson(localStorage.getItem("todos")) ? {} if Modernizr.localstorage
viewModel = new ViewModel(savedTodos)

ko.applyBindings(viewModel);

Modernizr.load(
	test: "placeholder" of document.createElement("input")
	nope: "scripts/vendor/placeholders.js"
)